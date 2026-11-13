// S-AGENT-CATALOG — Edge function routes for Agent Catalog feature
// POST /agents/run     — Execute a catalog agent on a task via Gemini
// POST /agents/match   — Match agents to a client profile (industry, goals, size)
// GET  /agents/history — Fetch run history for a specific agent slug

import { Hono } from "npm:hono";
import { adminClient } from "./db.tsx";
import { requireAuth } from "./auth.tsx";
import { callGemini, logAIRun, GEMINI_MODELS } from "./gemini.tsx";
import { getHonestyProtocol } from "./fragments/honesty-protocol.ts";
import { getStageCalibration } from "./fragments/stage-calibration.ts";

function errorResponse(c: any, context: string, error: unknown) {
  const msg = String(error);
  const isAuthError = msg.includes("Authentication required") || msg.includes("Auth validation error") || msg.includes("No Authorization header");
  const status = isAuthError ? 401 : 500;
  console.log(`[Agent] ${context} (${status}): ${msg}`);
  return c.json({ error: context }, status);
}
import { ensureAISchema } from "./ensure-schema.tsx";
import { selectAgents, compilePrompt, extractExcerpt, getAgentMeta, type ClientContext, type AgentMatch } from "./agent-loader.tsx";

const agents = new Hono();
const PREFIX = "/make-server-283466b6";

/* ── POST /agents/run ──────────────────────────────────────────────
   Execute a catalog agent on a task.
   Body: { slug, agentName, task, context?, format? }
   Returns: { output, tokens, durationMs }
   ────────────────────────────────────────────────────────────────── */
agents.post(`${PREFIX}/agents/run`, async (c) => {
  try {
    await requireAuth(c.req.header("Authorization") ?? null);

    const body = await c.req.json();
    const { slug, agentName, task, context, format } = body;

    if (!slug || !task) {
      return c.json(
        { error: "slug and task are required to run an agent" },
        400
      );
    }

    const outputFormat = format || "structured";

    // Use agent-loader to compile a proper 4-layer prompt
    const agentMeta = getAgentMeta(slug);
    const agentExcerpt = extractExcerpt(slug);

    const baseInstructions = `You are "${agentName || agentMeta?.name || slug}", a specialist AI agent at AMO AI.
Your role is to execute tasks with expert-level quality, providing actionable, specific output.

OUTPUT FORMAT: ${outputFormat === "json" ? "Return valid JSON only." : outputFormat === "freeform" ? "Return natural prose." : "Return a well-structured report with clear headers, bullet points, and sections."}

${getHonestyProtocol()}

${getStageCalibration()}`;

    const routeInstructions = `RULES:
- Be specific and actionable — no vague advice
- Include concrete numbers, timelines, and costs when relevant
- Cite tools, frameworks, or methodologies by name
- Keep output concise but thorough (aim for 300-800 words for structured, 200-500 for freeform)`;

    const compiled = compilePrompt(baseInstructions, [slug], routeInstructions);
    const systemPrompt = compiled.systemPrompt;
    const userPrompt = `${context ? `CONTEXT:\n${context}\n\n` : ""}TASK:\n${task}`;

    const startMs = Date.now();

    const result = await callGemini(
      `agent-run:${slug}`,
      systemPrompt,
      userPrompt,
      { slug, task, context: context || "", format: outputFormat },
      undefined // no wizard session
    );

    const durationMs = Date.now() - startMs;

    // Convert result to string for the frontend
    let outputText: string;
    if (typeof result === "string") {
      outputText = result;
    } else if (
      typeof result === "object" &&
      result !== null &&
      "rawText" in (result as Record<string, unknown>)
    ) {
      outputText = (result as Record<string, unknown>).rawText as string;
    } else if (outputFormat === "json") {
      outputText = JSON.stringify(result, null, 2);
    } else {
      // For structured/freeform, try to extract text or stringify
      outputText = JSON.stringify(result, null, 2);
    }

    // Estimate tokens from response length (rough: ~4 chars per token)
    const estimatedTokens = Math.round(
      (systemPrompt.length + userPrompt.length + outputText.length) / 4
    );

    // Also log to ai_run_logs with agent-specific prompt_type
    // (callGemini already logs, but we add a second entry with the slug for catalog filtering)
    await logAgentRun({
      slug,
      agentName: agentName || slug,
      task,
      context: context || "",
      format: outputFormat,
      output: outputText,
      tokens: estimatedTokens,
      durationMs,
      success: true,
    });

    console.log(
      `[Agent] Run complete: ${slug} — ${durationMs}ms, ~${estimatedTokens} tokens`
    );

    return c.json({
      success: true,
      output: outputText,
      tokens: estimatedTokens,
      durationMs,
      model: GEMINI_MODELS.flash,
      cached: false,
    });
  } catch (error) {
    return errorResponse(c, "Agent execution failed", error);
  }
});

/* ── POST /agents/match ────────────────────────────────────────────
   Match agents to a client profile.
   Body: { industry, goals[], companySize, systemIds[]? }
   Returns: { matches: [{ slug, name, reason, fitScore }] }
   ────────────────────────────────────────────────────────────────── */
agents.post(`${PREFIX}/agents/match`, async (c) => {
  try {
    await requireAuth(c.req.header("Authorization") ?? null);

    const body = await c.req.json();
    const { industry, goals, companySize, systemIds } = body;

    if (!industry) {
      return c.json({ error: "industry is required for agent matching" }, 400);
    }

    const clientContext: ClientContext = {
      industry,
      goals: Array.isArray(goals) ? goals : [],
      companySize,
      systemIds: Array.isArray(systemIds) ? systemIds : [],
    };

    // Use the agent-loader's deterministic matching algorithm
    const matches = selectAgents(clientContext);

    console.log(
      `[Agent] Match complete: ${matches.length} agents matched for ${industry}`
    );

    return c.json({ success: true, matches });
  } catch (error) {
    return errorResponse(c, "Agent matching failed", error);
  }
});

/* ── GET /agents/history/:slug ─────────────────────────────────────
   Fetch run history for a specific agent from agent_runs table.
   ────────────────────────────────────────────────────────────────── */
agents.get(`${PREFIX}/agents/history/:slug`, async (c) => {
  try {
    await requireAuth(c.req.header("Authorization") ?? null);

    const slug = c.req.param("slug");
    const limit = Math.min(Math.max(1, parseInt(c.req.query("limit") || "20") || 20), 100);

    await ensureAISchema();
    const db = adminClient();

    // Query ai_run_logs for this agent's runs (prompt_type = "agent-run:<slug>")
    const { data: runs, error } = await db
      .from("ai_run_logs")
      .select("*")
      .eq("prompt_type", `agent-run:${slug}`)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.log(`[Agent] History query error: ${error.message}`);
      return c.json(
        { error: `Failed to fetch agent history: ${error.message}` },
        500
      );
    }

    console.log(
      `[Agent] History for ${slug}: ${runs?.length || 0} runs found`
    );

    return c.json({ runs: runs || [] });
  } catch (error) {
    return errorResponse(c, "Agent history query failed", error);
  }
});

/* ── Helper: Log agent catalog run ──────────────────────────────── */
async function logAgentRun(params: {
  slug: string;
  agentName: string;
  task: string;
  context: string;
  format: string;
  output: string;
  tokens: number;
  durationMs: number;
  success: boolean;
  errorMessage?: string;
}): Promise<void> {
  try {
    await ensureAISchema();
    const db = adminClient();

    // Store in ai_run_logs with a catalog-specific prompt_type
    await db.from("ai_run_logs").insert({
      prompt_type: `agent-run:${params.slug}`,
      model: GEMINI_MODELS.flash,
      tokens_used: params.tokens,
      duration_ms: params.durationMs,
      success: params.success,
      error_message: params.errorMessage || null,
      // Store task + output in the session_id/org_id fields is not ideal,
      // but ai_run_logs doesn't have custom columns — we use the generic fields
      session_id: null,
      org_id: null,
    });
  } catch (e) {
    console.log(`[Agent] logAgentRun exception: ${e}`);
  }
}

export { agents };