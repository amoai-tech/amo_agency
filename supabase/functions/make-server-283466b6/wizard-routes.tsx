// S03-WIZARD — Wizard session persistence routes
// Save/load wizard state to wizard_sessions & wizard_answers tables
// Uses adminClient for writes (supports both anonymous and authenticated users)
// DB columns on wizard_sessions: id, current_step, user_id, status, context_snapshot, created_at, updated_at
// user_id is nullable (null = anonymous guest). status: in_progress | completed | abandoned.

import { Hono } from "npm:hono";
import { adminClient } from "./db.tsx";
import { getUserFromToken, requireAuth } from "./auth.tsx";

const wizard = new Hono();
const PREFIX = "/make-server-283466b6";

/** Generate a unique session ID (must be valid UUID for the DB column) */
function generateSessionId(): string {
  return crypto.randomUUID();
}

/** Check if a string is a valid UUID */
function isValidUUID(s: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
}

// ── GET /wizard/list/:userId — List user's wizard sessions ──
// IMPORTANT: Must be registered BEFORE /wizard/:sessionId to prevent route collision
// Lists sessions belonging only to the authenticated user; never falls back to unfiltered data.
wizard.get(`${PREFIX}/wizard/list/:userId`, async (c) => {
  try {
    const callerId = await requireAuth(c.req.header("Authorization") ?? null);
    const paramUserId = c.req.param("userId");
    // Enforce identity: caller can only list their own sessions
    if (callerId !== paramUserId) {
      return c.json({ error: "Access denied: cannot list another user's sessions" }, 403);
    }
    const userId = callerId;
    const db = adminClient();

    // Schema is known; never fall back to an unscoped service-role read.
    const { data: sessions, error: queryError } = await db
      .from("wizard_sessions")
      .select("id, current_step, user_id, status, created_at, updated_at")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(20);

    if (queryError) {
      console.log(`[Wizard] List error: ${queryError.message}`);
      return c.json({ error: "Failed to list wizard sessions" }, 500);
    }

    // Use status column if present, otherwise derive from current_step
    const enriched = (sessions || []).map((s: any) => ({
      ...s,
      status: s.status || (s.current_step >= 5 ? "completed" : "in_progress"),
    }));

    return c.json({ sessions: enriched });
  } catch (error) {
    const msg = String(error);
    const isAuthError = msg.includes("Authentication required") || msg.includes("No Authorization header");
    console.log(`[Wizard] List error (${isAuthError ? 401 : 500}): ${msg}`);
    return c.json({ error: isAuthError ? "Authentication required" : "Failed to list wizard sessions" }, isAuthError ? 401 : 500);
  }
});

// ── POST /wizard/save — Save wizard step data ──
wizard.post(`${PREFIX}/wizard/save`, async (c) => {
  try {
    const authHeader = c.req.header("Authorization");

    // An invalid/expired user JWT is not an anonymous session.
    const { userId, error: authError } = await getUserFromToken(authHeader ?? null);
    if (authHeader && authError) {
      return c.json({ error: "Invalid authentication" }, 401);
    }
    const callerKey = userId && userId !== "anonymous" ? userId : null;

    const body = await c.req.json();
    const { sessionId, step, data, fullState } = body;
    if (sessionId !== undefined && (!sessionId || !isValidUUID(sessionId))) {
      return c.json({ error: "Invalid wizard session ID" }, 400);
    }
    if (!sessionId && !fullState) {
      return c.json({ error: "Missing sessionId or fullState" }, 400);
    }
    if (step !== undefined && (!Number.isInteger(step) || step < 1 || step > 5)) {
      return c.json({ error: "Invalid wizard step" }, 400);
    }

    const sid = sessionId || generateSessionId();
    const db = adminClient();
    const { data: existing, error: readError } = await db
      .from("wizard_sessions")
      .select("id, user_id, current_step")
      .eq("id", sid)
      .maybeSingle();
    if (readError) return c.json({ error: "Failed to read wizard session" }, 500);
    if (existing?.user_id && existing.user_id !== callerKey) {
      return c.json({ error: "Wizard session access denied" }, 403);
    }

    const currentStep =
      typeof fullState?.currentStep === "number" && Number.isInteger(fullState.currentStep)
        ? fullState.currentStep
        : step ?? existing?.current_step ?? 1;
    if (currentStep < 1 || currentStep > 5) {
      return c.json({ error: "Invalid wizard step" }, 400);
    }
    const updatedAt = new Date().toISOString();
    const sessionRow = {
      current_step: currentStep,
      updated_at: updatedAt,
      ...(currentStep >= 5 ? { status: "completed" } : {}),
      ...(callerKey ? { user_id: callerKey } : {}),
    };

    if (existing) {
      // Check ownership atomically when updating; avoid racing a guest claim.
      const base = db.from("wizard_sessions").update(sessionRow).eq("id", sid);
      const scoped = existing.user_id
        ? base.eq("user_id", callerKey!)
        : base.is("user_id", null);
      const { data: updated, error: updateError } = await scoped.select("id").maybeSingle();
      if (updateError) return c.json({ error: "Failed to update wizard session" }, 500);
      if (!updated) return c.json({ error: "Wizard session ownership changed" }, 409);
    } else {
      const { error: insertError } = await db.from("wizard_sessions").insert({
        id: sid,
        user_id: callerKey,
        ...sessionRow,
      });
      if (insertError?.code === "23505") {
        return c.json({ error: "Wizard session was created concurrently; retry" }, 409);
      }
      if (insertError) return c.json({ error: "Failed to create wizard session" }, 500);
    }

    if (step !== undefined && data !== undefined) {
      // Owner check above must finish successfully before service-role answer writes.
      const { error: ansError } = await db.from("wizard_answers").upsert({
        session_id: sid,
        step_number: step,
        answers: JSON.parse(JSON.stringify(data ?? null)),
        updated_at: updatedAt,
      }, { onConflict: "session_id,step_number" });

      if (ansError) return c.json({ error: "Failed to save wizard answers" }, 500);
    }

    console.log(
      `[Wizard] Saved session ${sid}, step ${step ?? "full"} for user ${callerKey ?? "anonymous"}`
    );

    return c.json({
      success: true,
      sessionId: sid,
      updatedAt,
    });
  } catch (error) {
    console.log(`[Wizard] Save error: ${error}`);
    return c.json(
      { error: `Failed to save wizard session: ${error}` },
      500
    );
  }
});

// ── GET /wizard/:sessionId — Load wizard session ──
wizard.get(`${PREFIX}/wizard/:sessionId`, async (c) => {
  try {
    // Require auth — session ID alone is not sufficient access control
    const callerId = await requireAuth(c.req.header("Authorization") ?? null);
    const sessionId = c.req.param("sessionId");

    if (!sessionId) {
      return c.json({ error: "Missing sessionId parameter" }, 400);
    }

    const db = adminClient();

    // Load session from wizard_sessions table
    const { data: session, error: sessError } = await db
      .from("wizard_sessions")
      .select("*")
      .eq("id", sessionId)
      .eq("user_id", callerId)
      .maybeSingle();

    if (sessError) {
      console.log(`[Wizard] Session load error: ${sessError.message}`);
      return c.json(
        { error: `Failed to load session: ${sessError.message}` },
        500
      );
    }

    if (!session) {
      return c.json({ error: `Session ${sessionId} not found` }, 404);
    }

    // Load step answers from wizard_answers table
    const { data: answers, error: ansError } = await db
      .from("wizard_answers")
      .select("step_number, answers, ai_results, updated_at")
      .eq("session_id", sessionId)
      .order("step_number");

    if (ansError) {
      console.log(`[Wizard] Answers load error: ${ansError.message}`);
    }

    console.log(`[Wizard] Loaded session ${sessionId}`);

    return c.json({
      session,
      answers: answers || [],
      progress: {
        currentStep: session.current_step || 1,
        // Derive completedSteps from answers (context_snapshot column doesn't exist in DB)
        completedSteps: (answers || []).map((a: any) => a.step_number),
      },
    });
  } catch (error) {
    const msg = String(error);
    const isAuthError = msg.includes("Authentication required") || msg.includes("No Authorization header");
    console.log(`[Wizard] Load error (${isAuthError ? 401 : 500}): ${msg}`);
    return c.json({ error: isAuthError ? "Authentication required" : "Failed to load wizard session" }, isAuthError ? 401 : 500);
  }
});

export { wizard };