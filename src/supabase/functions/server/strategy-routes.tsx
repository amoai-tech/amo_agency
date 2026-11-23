// S14-STRATEGY — Lean Strategy Engine CRUD + AI routes (Phase 14)
// Reads/writes lean_canvases, lean_canvas_versions, strategy_insights,
// automation_opportunities, strategy_recommendations, strategy_actions,
// strategy_budgets, strategy_agent_memory, strategy_signals
// Uses adminClient for service-level access. Auth via requireAuth.
// Pattern: follows pipeline-routes.tsx

import { Hono } from "npm:hono";
import { adminClient } from "./db.tsx";
import { requireAuth } from "./auth.tsx";
import { callGemini } from "./gemini.tsx";
import { getHonestyProtocol } from "./fragments/honesty-protocol.ts";

const strategy = new Hono();
const PREFIX = "/make-server-283466b6";

const CANVAS_BLOCKS = [
  "problem", "customer_segments", "value_proposition", "solution", "channels",
  "revenue_streams", "cost_structure", "key_metrics", "unfair_advantage",
] as const;
type CanvasBlock = (typeof CANVAS_BLOCKS)[number];
function isCanvasBlock(value: unknown): value is CanvasBlock {
  return typeof value === "string" &&
    (CANVAS_BLOCKS as readonly string[]).includes(value);
}
function asRecord(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}


function errorResponse(c: any, context: string, error: unknown) {
  const msg = String(error);
  const isAuthError = msg.includes("Authentication required") || msg.includes("Auth validation error") || msg.includes("No Authorization header");
  const status = isAuthError ? 401 : 500;
  console.log(`[Strategy] ${context} (${status}): ${msg}`);
  return c.json({ error: context }, status);
}

// ── Wizard → Canvas seeding helper ──
function seedCanvasFromWizard(wizardAnswers: any[]): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const now = new Date().toISOString();

  function makeItem(text: string, confidence = 0.85): any {
    return { id: crypto.randomUUID(), text, source: "ai", confidence, updatedAt: now };
  }

  for (const answer of wizardAnswers) {
    const step = answer.step_number;
    const ai = answer.ai_results || {};
    const ans = answer.answers || {};

    if (step === 1) {
      // Business Analysis → problem, customer_segments, value_proposition
      const analysis = ai.analysis || ai;
      const painPoints = analysis.painPoints || analysis.aiOpportunities || [];
      const targetAudience = analysis.targetAudience || [];
      const opportunities = analysis.opportunities || analysis.productsServices || [];

      if (Array.isArray(painPoints) && painPoints.length > 0) {
        result.problem = painPoints.map((p: string) => makeItem(p));
      }
      if (Array.isArray(targetAudience) && targetAudience.length > 0) {
        result.customer_segments = targetAudience.map((t: string) => makeItem(t));
      }
      if (Array.isArray(opportunities) && opportunities.length > 0) {
        result.value_proposition = opportunities.map((o: string) => makeItem(o));
      }

      // Metadata from answers
      result.metadata = {
        industry: ans.industry || analysis.detectedIndustry || "",
        companySize: ans.companySize || analysis.teamSizeEstimate || "",
      };
    }

    if (step === 2) {
      // Industry Diagnostics → key_metrics, channels
      const diagnostics = ai.diagnostics || ai;
      const signals = diagnostics.signals || diagnostics.technologySignals || [];
      const channelAnalysis = diagnostics.channelAnalysis || diagnostics.channels || [];

      if (Array.isArray(signals) && signals.length > 0) {
        result.key_metrics = signals.slice(0, 3).map((s: any) =>
          makeItem(typeof s === "string" ? s : s.name || s.signal || JSON.stringify(s))
        );
      }
      if (Array.isArray(channelAnalysis) && channelAnalysis.length > 0) {
        result.channels = channelAnalysis.map((ch: any) =>
          makeItem(typeof ch === "string" ? ch : ch.name || ch.channel || JSON.stringify(ch))
        );
      }
    }

    if (step === 3) {
      // System Recommendations → solution, cost_structure
      const selectedSystems = ans.selectedSystems || [];
      const recommendations = ai.recommendations || [];

      if (Array.isArray(selectedSystems) && selectedSystems.length > 0) {
        result.solution = selectedSystems.map((s: string) => makeItem(s));
      }
      if (Array.isArray(recommendations) && recommendations.length > 0) {
        result.cost_structure = recommendations.slice(0, 4).map((r: any) =>
          makeItem(typeof r === "string" ? r : `${r.name || r.system}: ${r.pricing || r.cost || "TBD"}`)
        );
      }
    }

    if (step === 4) {
      // Readiness Score → unfair_advantage + metadata.readinessScore
      const readiness = ai.readiness || ai;
      const strengths = readiness.strengths || [];
      const gaps = readiness.gaps || [];

      if (Array.isArray(strengths) && strengths.length > 0) {
        result.unfair_advantage = strengths.map((s: string) => makeItem(s));
      }
      // Append gaps to problem
      if (Array.isArray(gaps) && gaps.length > 0) {
        const existingProblems = (result.problem as any[]) || [];
        const gapItems = gaps.map((g: any) =>
          makeItem(typeof g === "string" ? g : g.area || g.description || JSON.stringify(g), 0.7)
        );
        result.problem = [...existingProblems, ...gapItems];
      }

      // Readiness score to metadata
      const meta = (result.metadata as Record<string, unknown>) || {};
      meta.readinessScore = readiness.overallScore || readiness.overall_score || 0;
      result.metadata = meta;
    }

    if (step === 5) {
      // Roadmap → metadata.phases, revenue_streams
      const roadmap = ai.roadmap || ai;
      const phases = roadmap.phases || [];
      const totalInvestment = roadmap.totalInvestment || "";

      const meta = (result.metadata as Record<string, unknown>) || {};
      if (Array.isArray(phases) && phases.length > 0) {
        meta.phases = phases;
      }
      result.metadata = meta;

      if (totalInvestment) {
        result.revenue_streams = [makeItem(`Target investment: ${totalInvestment}`)];
      }
    }
  }

  return result;
}

// ── Compute canvas completeness (0-100) ──
function computeCompleteness(canvas: any): number {
  const blocks = [
    "problem", "customer_segments", "value_proposition", "solution",
    "channels", "revenue_streams", "cost_structure", "key_metrics", "unfair_advantage",
  ];
  let filled = 0;
  for (const key of blocks) {
    const arr = canvas[key];
    if (Array.isArray(arr) && arr.length > 0) filled++;
  }
  return Math.round((filled / blocks.length) * 100);
}

// ── Compute metrics from DB data ──
function computeMetrics(
  canvas: any,
  insights: any[],
  opportunities: any[],
  recommendations: any[],
  budget: any
): any {
  const completeness = canvas ? computeCompleteness(canvas) : 0;
  const pendingRecs = recommendations.filter((r: any) => r.approval_status === "pending").length;
  const activeOpps = opportunities.filter((o: any) => !["completed", "dismissed"].includes(o.status));
  const approvedOpps = opportunities.filter((o: any) => ["approved", "in_progress", "completed"].includes(o.status));

  const automationCoverage = opportunities.length > 0
    ? Math.round((approvedOpps.length / opportunities.length) * 100) : 0;

  // Health score = weighted average of key dimensions
  const strategyClarity = completeness;
  const aiReadiness = canvas?.metadata?.readinessScore || 0;
  const automationProgress = automationCoverage;
  const engagementQuality = Math.min(100, insights.length * 10);
  const strategyFreshness = canvas
    ? Math.max(0, 100 - Math.floor((Date.now() - new Date(canvas.updated_at).getTime()) / 86400000) * 10)
    : 0;

  const healthScore = Math.round(
    (strategyClarity * 0.25 + aiReadiness * 0.2 + automationProgress * 0.15 +
      engagementQuality * 0.15 + strategyFreshness * 0.1 + 50 * 0.15) // placeholder for pipeline/revenue/ops
  );

  return {
    healthScore: Math.min(100, Math.max(0, healthScore)),
    healthBreakdown: {
      strategyClarity,
      aiReadiness: aiReadiness || 0,
      pipelineHealth: 50, // populated when CRM data cross-referenced
      automationProgress,
      revenueTrajectory: 50,
      operationalEfficiency: 50,
      engagementQuality,
      strategyFreshness,
    },
    automationCoverage,
    insightCount: insights.length,
    pendingApprovals: pendingRecs,
    pendingSignals: 0,
    opportunitiesDetected: activeOpps.length,
    totalROIEstimate: activeOpps.length > 0
      ? `${activeOpps.reduce((sum: number, o: any) => sum + (parseInt(o.roi_estimate) || 0), 0)}%`
      : "N/A",
    canvasCompleteness: completeness,
    tokenBudgetUsed: budget?.tokens_used_this_month || 0,
    tokenBudgetRemaining: (budget?.monthly_token_limit || 500000) - (budget?.tokens_used_this_month || 0),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// CANVAS CRUD
// ═══════════════════════════════════════════════════════════════════════════

// ── GET /strategy/canvas — Get current canvas for user ──
strategy.get(`${PREFIX}/strategy/canvas`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const sessionId = c.req.query("session_id");
    const projectId = c.req.query("project_id");
    const db = adminClient();

    let query = db.from("lean_canvases").select("*").eq("is_current", true);
    if (sessionId) query = query.eq("session_id", sessionId);
    else if (projectId) query = query.eq("project_id", projectId);
    else query = query.eq("user_id", userId);

    const { data, error } = await query.order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (error) {
      console.log(`[Strategy] GET canvas error: ${error.message}`);
      return c.json({ error: `Failed to load canvas: ${error.message}` }, 500);
    }
    return c.json({ canvas: data });
  } catch (err) {
    return errorResponse(c, "GET /strategy/canvas", err);
  }
});

// ── POST /strategy/canvas — Create new canvas ──
strategy.post(`${PREFIX}/strategy/canvas`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);
    const body = await c.req.json();
    const db = adminClient();

    // Mark any existing canvas as not-current
    await db.from("lean_canvases").update({ is_current: false }).eq("user_id", userId).eq("is_current", true);

    let canvasData: Record<string, unknown> = {
      user_id: userId,
      session_id: body.session_id || null,
      project_id: body.project_id || null,
      version: 1,
      is_current: true,
    };

    // Seed from wizard if session_id provided
    if (body.session_id) {
      const { data: wizardAnswers } = await db
        .from("wizard_answers")
        .select("step_number, answers, ai_results")
        .eq("session_id", body.session_id)
        .order("step_number");

      if (wizardAnswers?.length) {
        canvasData = { ...canvasData, ...seedCanvasFromWizard(wizardAnswers) };
        console.log(`[Strategy] Seeded canvas from wizard session ${body.session_id} (${wizardAnswers.length} steps)`);
      }
    }

    const { data: canvas, error } = await db.from("lean_canvases").insert(canvasData).select().single();
    if (error) {
      console.log(`[Strategy] CREATE canvas error: ${error.message}`);
      return c.json({ error: `Failed to create canvas: ${error.message}` }, 500);
    }

    // Create initial version snapshot
    await db.from("lean_canvas_versions").insert({
      canvas_id: canvas.id,
      version: 1,
      snapshot: canvas,
      change_summary: body.session_id ? "Created from wizard data" : "Created fresh canvas",
      changed_by: "system",
      user_id: userId,
    });

    // Auto-assign admin role
    await db.from("strategy_roles").insert({ user_id: userId, canvas_id: canvas.id, role: "admin" });

    // Create default budget
    await db.from("strategy_budgets").insert({
      canvas_id: canvas.id,
      budget_month: new Date().toISOString().slice(0, 7),
      user_id: userId,
    });

    console.log(`[Strategy] Canvas created: ${canvas.id} for user ${userId}`);
    return c.json({ canvas });
  } catch (err) {
    return errorResponse(c, "POST /strategy/canvas", err);
  }
});

// ── PUT /strategy/canvas/:id — Update canvas blocks ──
strategy.put(`${PREFIX}/strategy/canvas/:id`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);
    const canvasId = c.req.param("id");
    const { blocks, change_summary } = await c.req.json();
    const db = adminClient();

    const { data: current, error: fetchErr } = await db
      .from("lean_canvases").select("*").eq("id", canvasId).eq("user_id", userId).single();
    if (fetchErr || !current) return c.json({ error: "Canvas not found" }, 404);

    const newVersion = current.version + 1;

    // Apply block updates
    const updates: Record<string, unknown> = {
      version: newVersion,
      updated_at: new Date().toISOString(),
    };
    for (const [key, items] of Object.entries(blocks || {})) {
      updates[key] = items;
    }

    const { data: updated, error } = await db
      .from("lean_canvases").update(updates).eq("id", canvasId).select().single();
    if (error) {
      console.log(`[Strategy] UPDATE canvas error: ${error.message}`);
      return c.json({ error: `Failed to update canvas: ${error.message}` }, 500);
    }

    // Create version snapshot
    const { data: version } = await db.from("lean_canvas_versions").insert({
      canvas_id: canvasId,
      version: newVersion,
      snapshot: updated,
      change_summary: change_summary || `Updated ${Object.keys(blocks || {}).join(", ")} blocks`,
      changed_by: "user",
      user_id: userId,
    }).select().single();

    console.log(`[Strategy] Canvas ${canvasId} updated to v${newVersion}`);
    return c.json({ canvas: updated, version });
  } catch (err) {
    return errorResponse(c, "PUT /strategy/canvas/:id", err);
  }
});

// ── GET /strategy/canvas/:id/versions — List version history ──
strategy.get(`${PREFIX}/strategy/canvas/:id/versions`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);
    const canvasId = c.req.param("id");
    const db = adminClient();

    // Verify canvas ownership
    const { data: canvas } = await db.from("lean_canvases").select("id").eq("id", canvasId).eq("user_id", userId).maybeSingle();
    if (!canvas) return c.json({ error: "Canvas not found" }, 404);

    const { data, error } = await db
      .from("lean_canvas_versions").select("*").eq("canvas_id", canvasId)
      .order("version", { ascending: false });
    if (error) return c.json({ error: `Failed to load versions: ${error.message}` }, 500);
    return c.json({ versions: data || [] });
  } catch (err) {
    return errorResponse(c, "GET /strategy/canvas/:id/versions", err);
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// INSIGHTS CRUD
// ═══════════════════════════════════════════════════════════════════════════

// ── GET /strategy/insights ──
strategy.get(`${PREFIX}/strategy/insights`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const db = adminClient();
    const status = c.req.query("status");
    const type = c.req.query("type");
    const limit = Math.min(parseInt(c.req.query("limit") || "50") || 50, 200);

    let query = db.from("strategy_insights").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(limit);
    if (status) query = query.eq("status", status);
    if (type) query = query.eq("insight_type", type);

    const { data, error } = await query;
    if (error) return c.json({ error: `Failed to load insights: ${error.message}` }, 500);
    return c.json({ insights: data || [] });
  } catch (err) {
    return errorResponse(c, "GET /strategy/insights", err);
  }
});

// ── PUT /strategy/insights/:id ──
strategy.put(`${PREFIX}/strategy/insights/:id`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);
    const id = c.req.param("id");
    const body = await c.req.json();
    const db = adminClient();

    const updates: Record<string, unknown> = {};
    if (body.status) updates.status = body.status;
    if (body.action_taken !== undefined) updates.action_taken = body.action_taken;

    const { data, error } = await db.from("strategy_insights").update(updates).eq("id", id).eq("user_id", userId).select().single();
    if (error) return c.json({ error: `Failed to update insight: ${error.message}` }, 500);
    return c.json({ insight: data });
  } catch (err) {
    return errorResponse(c, "PUT /strategy/insights/:id", err);
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// OPPORTUNITIES CRUD
// ═══════════════════════════════════════════════════════════════════════════

// ── GET /strategy/opportunities ──
strategy.get(`${PREFIX}/strategy/opportunities`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const db = adminClient();
    const { data, error } = await db
      .from("automation_opportunities").select("*").eq("user_id", userId)
      .order("impact_score", { ascending: false });
    if (error) return c.json({ error: `Failed to load opportunities: ${error.message}` }, 500);
    return c.json({ opportunities: data || [] });
  } catch (err) {
    return errorResponse(c, "GET /strategy/opportunities", err);
  }
});

// ── PUT /strategy/opportunities/:id ──
strategy.put(`${PREFIX}/strategy/opportunities/:id`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);
    const id = c.req.param("id");
    const body = await c.req.json();
    const db = adminClient();

    const allowedFields = ["status", "impact_score", "complexity", "roi_estimate", "estimated_weeks", "estimated_cost"];
    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) updates[field] = body[field];
    }

    const { data, error } = await db.from("automation_opportunities").update(updates).eq("id", id).eq("user_id", userId).select().single();
    if (error) return c.json({ error: `Failed to update opportunity: ${error.message}` }, 500);
    return c.json({ opportunity: data });
  } catch (err) {
    return errorResponse(c, "PUT /strategy/opportunities/:id", err);
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// RECOMMENDATIONS CRUD
// ═══════════════════════════════════════════════════════════════════════════

// ── GET /strategy/recommendations ──
strategy.get(`${PREFIX}/strategy/recommendations`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const db = adminClient();
    const status = c.req.query("status");

    let query = db.from("strategy_recommendations").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    if (status) query = query.eq("approval_status", status);

    const { data, error } = await query;
    if (error) return c.json({ error: `Failed to load recommendations: ${error.message}` }, 500);
    return c.json({ recommendations: data || [] });
  } catch (err) {
    return errorResponse(c, "GET /strategy/recommendations", err);
  }
});

// ── POST /strategy/recommendations/:id/approve ──
strategy.post(`${PREFIX}/strategy/recommendations/:id/approve`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);
    const id = c.req.param("id");
    const { approved, comment } = await c.req.json();
    const db = adminClient();

    // Load the recommendation
    const { data: rec, error: fetchErr } = await db
      .from("strategy_recommendations").select("*").eq("id", id).eq("user_id", userId).single();
    if (fetchErr || !rec) return c.json({ error: "Recommendation not found" }, 404);

    const newStatus = approved ? "approved" : "rejected";

    // Update recommendation
    const { data: updated, error: updateErr } = await db
      .from("strategy_recommendations")
      .update({
        approval_status: newStatus,
        approved_by: userId,
        approved_at: new Date().toISOString(),
      })
      .eq("id", id).select().single();
    if (updateErr) return c.json({ error: `Failed to update recommendation: ${updateErr.message}` }, 500);

    let canvasResult = null;
    let versionResult = null;

    // If approved and type is canvas_update, apply changes to canvas
    if (approved && rec.recommendation_type === "canvas_update" && rec.canvas_id) {
      const proposed = asRecord(rec.proposed_changes);
      // Never let agent-generated JSON select arbitrary database columns.
      const targetBlock = isCanvasBlock(proposed.target_block) ? proposed.target_block : null;
      const items = Array.isArray(proposed.items) ? proposed.items : [];
      const action = proposed.action === "replace" ? "replace" : "add";

      if (targetBlock && items.length > 0) {
        const { data: canvas } = await db
          .from("lean_canvases").select("*").eq("id", rec.canvas_id).single();

        if (canvas) {
          const storedItems = canvas[targetBlock];
          const currentItems = Array.isArray(storedItems) ? storedItems : [];
          let mergedItems;
          if (action === "replace") {
            mergedItems = items;
          } else {
            // add
            const newItems = items.map((item: any) => ({
              id: crypto.randomUUID(),
              text: item.text,
              source: "ai",
              confidence: item.confidence || 0.85,
              updatedAt: new Date().toISOString(),
            }));
            mergedItems = [...currentItems, ...newItems];
          }

          const newVersion = canvas.version + 1;
          const { data: updatedCanvas } = await db
            .from("lean_canvases")
            .update({ [targetBlock]: mergedItems, version: newVersion, updated_at: new Date().toISOString() })
            .eq("id", rec.canvas_id).select().single();

          if (updatedCanvas) {
            canvasResult = updatedCanvas;
            const { data: ver } = await db.from("lean_canvas_versions").insert({
              canvas_id: rec.canvas_id,
              version: newVersion,
              snapshot: updatedCanvas,
              change_summary: `Applied recommendation: ${rec.title}`,
              changed_by: rec.agent_name,
              user_id: userId,
            }).select().single();
            versionResult = ver;
          }
        }
      }
    }

    // Log the action
    await db.from("strategy_actions").insert({
      canvas_id: rec.canvas_id,
      session_id: rec.session_id,
      agent_name: "user",
      action_type: approved ? "approve_recommendation" : "reject_recommendation",
      input_summary: `Recommendation: ${rec.title}`,
      output_summary: comment || `${newStatus} by user`,
      tokens_used: 0,
      duration_ms: 0,
      success: true,
      user_id: userId,
    });

    // Log event
    await db.from("strategy_events").insert({
      canvas_id: rec.canvas_id,
      event_type: `recommendation_${newStatus}`,
      source_table: "strategy_recommendations",
      source_id: id,
      payload: { recommendation_type: rec.recommendation_type, title: rec.title },
      user_id: userId,
    });

    console.log(`[Strategy] Recommendation ${id} ${newStatus} by ${userId}`);
    return c.json({ recommendation: updated, canvas: canvasResult, version: versionResult });
  } catch (err) {
    return errorResponse(c, "POST /strategy/recommendations/:id/approve", err);
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// ACTIONS (AUDIT LOG)
// ═══════════════════════════════════════════════════════════════════════════

// ── GET /strategy/actions ──
strategy.get(`${PREFIX}/strategy/actions`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const db = adminClient();
    const limit = Math.min(parseInt(c.req.query("limit") || "25") || 25, 100);

    const { data, error } = await db
      .from("strategy_actions").select("*").eq("user_id", userId)
      .order("created_at", { ascending: false }).limit(limit);
    if (error) return c.json({ error: `Failed to load actions: ${error.message}` }, 500);
    return c.json({ actions: data || [] });
  } catch (err) {
    return errorResponse(c, "GET /strategy/actions", err);
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// METRICS
// ═══════════════════════════════════════════════════════════════════════════

// ── GET /strategy/metrics ──
strategy.get(`${PREFIX}/strategy/metrics`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);

    const db = adminClient();

    // Load canvas — scoped to user
    const { data: canvas } = await db.from("lean_canvases").select("*")
      .eq("is_current", true).eq("user_id", userId)
      .order("created_at", { ascending: false }).limit(1).maybeSingle();

    // Load aggregation data — scoped to user
    const [insightsRes, oppsRes, recsRes, budgetRes] = await Promise.all([
      db.from("strategy_insights").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(100),
      db.from("automation_opportunities").select("*").eq("user_id", userId),
      db.from("strategy_recommendations").select("*").eq("user_id", userId),
      canvas ? db.from("strategy_budgets").select("*").eq("canvas_id", canvas.id).maybeSingle() : Promise.resolve({ data: null }),
    ]);

    const metrics = computeMetrics(
      canvas,
      insightsRes.data || [],
      oppsRes.data || [],
      recsRes.data || [],
      budgetRes.data
    );

    return c.json(metrics);
  } catch (err) {
    return errorResponse(c, "GET /strategy/metrics", err);
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// AI ENDPOINTS
// ═══════════════════════════════════════════════════════════════════════════

// ── POST /strategy/analyze — Full 5-agent analysis ──
strategy.post(`${PREFIX}/strategy/analyze`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);
    const { canvas_id, session_id } = await c.req.json();
    const db = adminClient();

    if (!canvas_id) return c.json({ error: "canvas_id is required" }, 400);

    // 1. Budget check
    const { data: budget } = await db
      .from("strategy_budgets").select("*").eq("canvas_id", canvas_id).maybeSingle();

    if (budget) {
      if (budget.analyses_today >= budget.max_analyses_per_day) {
        return c.json({ error: "Daily analysis limit reached. Try again tomorrow." }, 429);
      }
      if (budget.last_analysis_at) {
        const elapsed = (Date.now() - new Date(budget.last_analysis_at).getTime()) / 60000;
        if (elapsed < budget.min_analysis_interval_minutes) {
          return c.json({ error: `Please wait ${Math.ceil(budget.min_analysis_interval_minutes - elapsed)} minutes before running another analysis.` }, 429);
        }
      }
    }

    // 2. Load context
    const { data: canvas } = await db.from("lean_canvases").select("*").eq("id", canvas_id).eq("user_id", userId).single();
    if (!canvas) return c.json({ error: "Canvas not found" }, 404);

    const { data: wizardAnswers } = session_id
      ? await db.from("wizard_answers").select("step_number, answers, ai_results").eq("session_id", session_id).order("step_number")
      : { data: [] };

    // Load agent memory for context continuity
    const { data: memories } = await db
      .from("strategy_agent_memory").select("*")
      .eq("canvas_id", canvas_id).gt("relevance_score", 0.3);

    // Build context string
    const contextStr = JSON.stringify({
      canvas: {
        problem: canvas.problem,
        customer_segments: canvas.customer_segments,
        value_proposition: canvas.value_proposition,
        solution: canvas.solution,
        channels: canvas.channels,
        revenue_streams: canvas.revenue_streams,
        cost_structure: canvas.cost_structure,
        key_metrics: canvas.key_metrics,
        unfair_advantage: canvas.unfair_advantage,
        metadata: canvas.metadata,
      },
      wizardData: wizardAnswers?.slice(0, 5) || [],
      agentMemory: (memories || []).slice(0, 10),
    });

    const startTime = Date.now();
    const agentResults: any[] = [];

    // 3. Phase A — 3 agents in parallel
    const systemPromptBase = `You are an AI strategy analyst for AMO AI. Analyze the business data and Lean Canvas below.\n\n${getHonestyProtocol()}`;

    const [synthResult, oppResult, metricsResult] = await Promise.all([
      (async () => {
        const t = Date.now();
        try {
          const result = await callGemini(
            "strategy-synthesize",
            `${systemPromptBase} Generate strategic insights about the business. Return JSON: { "insights": [{ "insight_type": "opportunity|risk|trend", "title": "...", "description": "...", "priority": "high|medium|low", "impact_score": 0-100, "confidence": 0.0-1.0 }] }`,
            `Business context:\n${contextStr}\n\nGenerate 3-5 strategic insights.`,
            { canvas_id },
            session_id
          );
          agentResults.push({ agent: "strategy-synthesize", duration_ms: Date.now() - t, tokens_used: 0, success: true, summary: "Generated insights" });
          return result;
        } catch (e) {
          agentResults.push({ agent: "strategy-synthesize", duration_ms: Date.now() - t, tokens_used: 0, success: false, summary: "", error: String(e) });
          return null;
        }
      })(),
      (async () => {
        const t = Date.now();
        try {
          const result = await callGemini(
            "opportunity-detect",
            `${systemPromptBase} Identify automation opportunities. Return JSON: { "opportunities": [{ "title": "...", "description": "...", "process_area": "sales|operations|support|marketing", "current_state": "...", "proposed_state": "...", "impact_score": 0-100, "roi_estimate": "100-300%", "complexity": "low|medium|high", "estimated_weeks": 2-12 }] }`,
            `Business context:\n${contextStr}\n\nIdentify 2-4 automation opportunities.`,
            { canvas_id },
            session_id
          );
          agentResults.push({ agent: "opportunity-detect", duration_ms: Date.now() - t, tokens_used: 0, success: true, summary: "Detected opportunities" });
          return result;
        } catch (e) {
          agentResults.push({ agent: "opportunity-detect", duration_ms: Date.now() - t, tokens_used: 0, success: false, summary: "", error: String(e) });
          return null;
        }
      })(),
      (async () => {
        const t = Date.now();
        try {
          const result = await callGemini(
            "metrics-interpret",
            `${systemPromptBase} Suggest recommendations for improving the business strategy. Return JSON: { "recommendations": [{ "recommendation_type": "canvas_update|roadmap_change|new_system", "title": "...", "rationale": "...", "proposed_changes": { "target_block": "problem|solution|...", "action": "add", "items": [{"text": "...", "confidence": 0.85}] } }] }`,
            `Business context:\n${contextStr}\n\nGenerate 2-4 strategic recommendations.`,
            { canvas_id },
            session_id
          );
          agentResults.push({ agent: "metrics-interpret", duration_ms: Date.now() - t, tokens_used: 0, success: true, summary: "Generated recommendations" });
          return result;
        } catch (e) {
          agentResults.push({ agent: "metrics-interpret", duration_ms: Date.now() - t, tokens_used: 0, success: false, summary: "", error: String(e) });
          return null;
        }
      })(),
    ]);

    const totalDuration = Date.now() - startTime;

    // 4. Parse and persist results
    const newInsights: any[] = [];
    const newOpps: any[] = [];
    const newRecs: any[] = [];

    // Parse insights
    if (synthResult && typeof synthResult === "object") {
      const parsed = (synthResult as any).insights || [];
      for (const i of Array.isArray(parsed) ? parsed : []) {
        newInsights.push({
          canvas_id,
          session_id: session_id || null,
          agent_name: "strategy-synthesize",
          insight_type: i.insight_type || "trend",
          title: i.title || "Untitled Insight",
          description: i.description || "",
          priority: i.priority || "medium",
          impact_score: i.impact_score || null,
          confidence: i.confidence || null,
          data_sources: [],
          status: "draft",
          user_id: userId,
        });
      }
    }

    // Parse opportunities
    if (oppResult && typeof oppResult === "object") {
      const parsed = (oppResult as any).opportunities || [];
      for (const o of Array.isArray(parsed) ? parsed : []) {
        newOpps.push({
          canvas_id,
          session_id: session_id || null,
          title: o.title || "Untitled Opportunity",
          description: o.description || "",
          process_area: o.process_area || null,
          current_state: o.current_state || null,
          proposed_state: o.proposed_state || null,
          impact_score: o.impact_score || 50,
          roi_estimate: o.roi_estimate || null,
          complexity: o.complexity || "medium",
          estimated_weeks: o.estimated_weeks || null,
          status: "detected",
          user_id: userId,
        });
      }
    }

    // Parse recommendations
    if (metricsResult && typeof metricsResult === "object") {
      const parsed = (metricsResult as any).recommendations || [];
      for (const r of Array.isArray(parsed) ? parsed : []) {
        newRecs.push({
          canvas_id,
          session_id: session_id || null,
          agent_name: "metrics-interpret",
          recommendation_type: r.recommendation_type || "canvas_update",
          title: r.title || "Untitled Recommendation",
          rationale: r.rationale || "",
          proposed_changes: r.proposed_changes || {},
          approval_status: "pending",
          user_id: userId,
        });
      }
    }

    // Batch persist
    if (newInsights.length > 0) {
      const { error: insErr } = await db.from("strategy_insights").insert(newInsights);
      if (insErr) console.log(`[Strategy] Insights insert error: ${insErr.message}`);
    }
    if (newOpps.length > 0) {
      const { error: oppErr } = await db.from("automation_opportunities").insert(newOpps);
      if (oppErr) console.log(`[Strategy] Opportunities insert error: ${oppErr.message}`);
    }
    if (newRecs.length > 0) {
      const { error: recErr } = await db.from("strategy_recommendations").insert(newRecs);
      if (recErr) console.log(`[Strategy] Recommendations insert error: ${recErr.message}`);
    }

    // Log agent actions
    for (const ar of agentResults) {
      await db.from("strategy_actions").insert({
        canvas_id,
        session_id: session_id || null,
        agent_name: ar.agent,
        action_type: "analyze",
        input_summary: `Canvas ${canvas_id}`,
        output_summary: ar.summary || ar.error || "",
        tokens_used: ar.tokens_used || 0,
        duration_ms: ar.duration_ms || 0,
        success: ar.success,
        error_message: ar.error || null,
        user_id: userId,
      });
    }

    // Update budget
    if (budget) {
      await db.from("strategy_budgets").update({
        analyses_today: (budget.analyses_today || 0) + 1,
        analysis_count_this_month: (budget.analysis_count_this_month || 0) + 1,
        last_analysis_at: new Date().toISOString(),
      }).eq("id", budget.id);
    }

    // Log event
    await db.from("strategy_events").insert({
      canvas_id,
      event_type: "analysis_complete",
      source_table: "lean_canvases",
      source_id: canvas_id,
      payload: { duration_ms: totalDuration, agents: agentResults.length, insights: newInsights.length, opportunities: newOpps.length, recommendations: newRecs.length },
      user_id: userId,
    });

    // Compute fresh metrics
    const allInsights = [...(await db.from("strategy_insights").select("*").eq("canvas_id", canvas_id)).data || [], ...newInsights];
    const allOpps = [...(await db.from("automation_opportunities").select("*").eq("canvas_id", canvas_id)).data || [], ...newOpps];
    const allRecs = [...(await db.from("strategy_recommendations").select("*").eq("canvas_id", canvas_id)).data || [], ...newRecs];

    const metrics = computeMetrics(canvas, allInsights, allOpps, allRecs, budget);

    console.log(`[Strategy] Analysis complete for canvas ${canvas_id}: ${newInsights.length} insights, ${newOpps.length} opps, ${newRecs.length} recs (${totalDuration}ms)`);

    return c.json({
      insights: newInsights,
      opportunities: newOpps,
      recommendations: newRecs,
      metrics,
      agentResults,
    });
  } catch (err) {
    return errorResponse(c, "POST /strategy/analyze", err);
  }
});

// ── POST /strategy/synthesize-block — Per-block AI suggestion ──
strategy.post(`${PREFIX}/strategy/synthesize-block`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);
    const { canvas_id, block, context } = await c.req.json();
    const db = adminClient();

    if (!canvas_id || !block) return c.json({ error: "canvas_id and block are required" }, 400);
    if (!isCanvasBlock(block)) return c.json({ error: "Invalid canvas block" }, 400);

    const { data: canvas } = await db.from("lean_canvases").select("*").eq("id", canvas_id).eq("user_id", userId).single();
    if (!canvas) return c.json({ error: "Canvas not found" }, 404);

    // Load wizard data for extra context
    let wizardContext = "";
    if (canvas.session_id) {
      const { data: wizardAnswers } = await db
        .from("wizard_answers").select("step_number, ai_results")
        .eq("session_id", canvas.session_id).order("step_number");
      if (wizardAnswers?.length) {
        wizardContext = `\nWizard analysis data: ${JSON.stringify(wizardAnswers.map((w: any) => w.ai_results).filter(Boolean).slice(0, 3))}`;
      }
    }

    const blockLabels: Record<string, string> = {
      problem: "Problem", customer_segments: "Customer Segments",
      value_proposition: "Unique Value Proposition", solution: "Solution",
      channels: "Channels", revenue_streams: "Revenue Streams",
      cost_structure: "Cost Structure", key_metrics: "Key Metrics",
      unfair_advantage: "Unfair Advantage",
    };

    const startTime = Date.now();
    const result = await callGemini(
      "strategy-synthesize-block",
      `You are analyzing the "${blockLabels[block] || block}" section of a Lean Canvas.
Given the current items, adjacent block context, and business analysis, suggest 2-4 improvements or additions.
Return JSON: { "suggestions": [{ "text": "...", "confidence": 0.0-1.0 }], "rationale": "Brief explanation of why these suggestions are relevant." }`,
      `Current "${block}" items: ${JSON.stringify(canvas[block] || [])}
Adjacent blocks: solution=${JSON.stringify(canvas.solution || [])}, customer_segments=${JSON.stringify(canvas.customer_segments || [])}
Metadata: ${JSON.stringify(canvas.metadata || {})}
${context ? `User context: ${context}` : ""}${wizardContext}

Suggest improvements for the "${blockLabels[block] || block}" block.`,
      { canvas_id, block },
      canvas.session_id ?? undefined
    );
    const duration = Date.now() - startTime;

    // Log action
    await db.from("strategy_actions").insert({
      canvas_id,
      session_id: canvas.session_id,
      agent_name: "strategy-synthesize-block",
      action_type: "synthesize-block",
      input_summary: `Block: ${block}`,
      output_summary: `Generated suggestions for ${block}`,
      tokens_used: 0,
      duration_ms: duration,
      success: true,
      user_id: userId,
    });

    // Parse result
    const parsed = result as any;
    const suggestions = (parsed?.suggestions || []).map((s: any) => ({
      id: crypto.randomUUID(),
      text: s.text || "",
      source: "ai" as const,
      confidence: s.confidence || 0.85,
      updatedAt: new Date().toISOString(),
    }));

    console.log(`[Strategy] Synthesize-block "${block}" for canvas ${canvas_id}: ${suggestions.length} suggestions (${duration}ms)`);
    return c.json({ suggestions, rationale: parsed?.rationale || "" });
  } catch (err) {
    return errorResponse(c, "POST /strategy/synthesize-block", err);
  }
});

export { strategy };
