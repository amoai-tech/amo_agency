// S08-INSIGHT-ROUTES — Insight card retrieval, status updates, multi-agent generation
// GET /insights/:projectId, PATCH /insights/:id/status
// POST /insights/:projectId/generate

import { Hono } from "npm:hono";
import { adminClient } from "./db.tsx";
import { requireAuth } from "./auth.tsx";
import { callGemini } from "./gemini.tsx";
import { compilePrompt } from "./agent-loader.tsx";

const insights = new Hono();
const PREFIX = "/make-server-283466b6";

// ── GET /insights/:projectId ──
insights.get(`${PREFIX}/insights/:projectId`, async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const userId = await requireAuth(authHeader ?? null);
    const projectId = c.req.param("projectId");

    const db = adminClient();

    // Verify project ownership
    const { data: project } = await db
      .from("projects")
      .select("id")
      .eq("id", projectId)
      .eq("user_id", userId)
      .maybeSingle();

    if (!project) return c.json({ error: "Project not found" }, 404);

    const status = c.req.query("status") || null;
    const priority = c.req.query("priority") || null;
    const limit = Math.min(50, Math.max(1, parseInt(c.req.query("limit") || "10")));
    const offset = parseInt(c.req.query("offset") || "0");

    let query = db
      .from("insight_cards")
      .select("*")
      .eq("project_id", projectId)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
      .order("priority", { ascending: true }) // high < low alphabetically, so ascending
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) query = query.eq("status", status);
    if (priority) query = query.eq("priority", priority);

    const { data: cards, error } = await query;
    if (error) return c.json({ error: `Insights query failed: ${error.message}` }, 500);

    // Enrich with agent names
    const slugs = [...new Set((cards || []).map((c) => c.agent_slug))];
    let agentMap: Record<string, { name: string; emoji: string }> = {};

    if (slugs.length > 0) {
      const { data: agentData } = await db
        .from("agent_catalog")
        .select("slug, name, emoji")
        .in("slug", slugs);

      for (const a of agentData || []) {
        agentMap[a.slug] = { name: a.name, emoji: a.emoji ?? "" };
      }
    }

    const enriched = (cards || []).map((card) => ({
      ...card,
      agent: agentMap[card.agent_slug] || { name: card.agent_slug, emoji: "" },
    }));

    return c.json({ insights: enriched });
  } catch (error) {
    const msg = String(error);
    const isAuth = msg.includes("Authentication required") || msg.includes("No Authorization header") || msg.includes("Auth validation error");
    return c.json({ error: isAuth ? "Authentication required" : "Request failed" }, isAuth ? 401 : 500);
  }
});

// ── PATCH /insights/:id/status ──
insights.patch(`${PREFIX}/insights/:id/status`, async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const userId = await requireAuth(authHeader ?? null);
    const insightId = c.req.param("id");
    const body = await c.req.json();
    const { status } = body;

    if (!status || !["viewed", "acted", "dismissed"].includes(status)) {
      return c.json({ error: "status must be: viewed, acted, dismissed" }, 400);
    }

    const db = adminClient();

    // Get the insight and verify project ownership
    const { data: insight } = await db
      .from("insight_cards")
      .select("id, project_id")
      .eq("id", insightId)
      .maybeSingle();

    if (!insight) return c.json({ error: "Insight not found" }, 404);

    const { data: project } = await db
      .from("projects")
      .select("id")
      .eq("id", insight.project_id)
      .eq("user_id", userId)
      .maybeSingle();

    if (!project) return c.json({ error: "Not authorized to modify this insight" }, 403);

    const { data: updated, error } = await db
      .from("insight_cards")
      .update({ status })
      .eq("id", insightId)
      .select()
      .single();

    if (error) return c.json({ error: `Update failed: ${error.message}` }, 500);

    return c.json({ insight: updated });
  } catch (error) {
    const msg = String(error);
    const isAuth = msg.includes("Authentication required") || msg.includes("No Authorization header") || msg.includes("Auth validation error");
    return c.json({ error: isAuth ? "Authentication required" : "Update failed" }, isAuth ? 401 : 500);
  }
});

// ── POST /insights/:projectId/generate ──
insights.post(`${PREFIX}/insights/:projectId/generate`, async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const userId = await requireAuth(authHeader ?? null);
    const projectId = c.req.param("projectId");

    const db = adminClient();

    // Verify project ownership
    const { data: project } = await db
      .from("projects")
      .select("id, name, wizard_session_id")
      .eq("id", projectId)
      .eq("user_id", userId)
      .maybeSingle();

    if (!project) return c.json({ error: "Project not found" }, 404);

    // Rate limit: 1 generation per project per 4 hours
    const fourHoursAgo = new Date(Date.now() - 4 * 3600000).toISOString();
    const { count: recentInsights } = await db
      .from("insight_cards")
      .select("id", { count: "exact", head: true })
      .eq("project_id", projectId)
      .gte("created_at", fourHoursAgo);

    if ((recentInsights || 0) >= 3) {
      return c.json({ error: "Rate limit: insights can be regenerated every 4 hours" }, 429);
    }

    // Load project context
    // Use project's wizard_session_id (not projectId) to query wizard_answers
    const { data: wizardAnswers } = project.wizard_session_id
      ? await db
          .from("wizard_answers")
          .select("step_number, answers, ai_results")
          .eq("session_id", project.wizard_session_id)
          .order("step_number")
      : { data: [] };

    const projectContext = JSON.stringify({
      projectName: project.name,
      wizardData: wizardAnswers || [],
    });

    // Multi-agent insight generation (parallel)
    const insightSchema = `Return this exact JSON:
{
  "priority": "high|medium|low",
  "title": "Short headline (max 80 chars)",
  "body": "2-4 sentence insight with specific, actionable advice",
  "impact_label": "Quantified impact like '+35% bookings' or '$14.9K/year savings' (or null)",
  "action_label": "CTA button text like 'Set Up Review Requests' (or null)",
  "action_url": "Deep link path like '/app/crm' (or null)"
}`;

    // Agent configs — slugs must match AGENT_REGISTRY in agent-loader.tsx
    const agentConfigs = [
      {
        slug: "project-shepherd",
        focus: "Operational insight: project health, milestone risks, process bottlenecks, and timeline concerns.",
      },
      {
        slug: "growth-hacker",
        focus: "Growth insight: market opportunities, competitor gaps, quick wins for user acquisition or revenue growth.",
      },
      {
        slug: "pipeline-analyst",
        focus: "Financial insight: cost savings opportunities, ROI projections, budget optimization, or spending alerts.",
      },
    ];

    // Run all agents in parallel
    const basePrompt = `You are a specialist insight generator at AMO AI. Analyze project data and produce one high-value business insight.

RULES:
- Be specific and actionable — reference concrete data from the project context
- Label any estimates or projections explicitly
- Include only internal deep-link paths (starting with /app/) for action_url`;

    const results = await Promise.allSettled(
      agentConfigs.map(async (config) => {
        // compilePrompt(baseInstructions, agentSlugs[], routeInstructions, jsonSchema?)
        const compiled = compilePrompt(
          basePrompt,
          [config.slug],
          config.focus,
          insightSchema
        );

        const userPrompt = `Project data:\n${projectContext}\n\nGenerate one insight for this project.`;

        const result = await callGemini(
          `insight:${config.slug}`,
          compiled.systemPrompt,
          userPrompt,
          { projectId, agent: config.slug },
          undefined
        );

        return { slug: config.slug, result };
      })
    );

    // Insert successful insights
    const newCards: any[] = [];
    const expiresAt = new Date(Date.now() + 4 * 3600000).toISOString();

    for (const r of results) {
      if (r.status !== "fulfilled") {
        console.log(`[Insights] Agent failed: ${r.reason}`);
        continue;
      }

      const { slug, result } = r.value;
      const insight = result as any;

      if (!insight?.title || !insight?.body) {
        console.log(`[Insights] Invalid output from ${slug}`);
        continue;
      }

      const { data: card, error } = await db
        .from("insight_cards")
        .insert({
          project_id: projectId,
          agent_slug: slug,
          priority: ["high", "medium", "low"].includes(insight.priority) ? insight.priority : "medium",
          title: String(insight.title).slice(0, 80),
          body: String(insight.body).slice(0, 1000),
          impact_label: insight.impact_label || null,
          action_label: insight.action_label || null,
          action_url: insight.action_url || null,
          status: "new",
          expires_at: expiresAt,
        })
        .select()
        .single();

      if (!error && card) newCards.push(card);
    }

    console.log(`[Insights] Generated ${newCards.length} insights for project ${projectId.slice(0, 8)}`);

    return c.json({
      success: true,
      insights: newCards,
      generated: newCards.length,
    });
  } catch (error) {
    const msg = String(error);
    const isAuth = msg.includes("Authentication required") || msg.includes("No Authorization header") || msg.includes("Auth validation error");
    return c.json({ error: isAuth ? "Authentication required" : "Insight generation failed" }, isAuth ? 401 : 500);
  }
});

export { insights };
