// S00-SERVER — Main Hono server entry point
// Mounts all route modules: health, wizard, AI, auth
// All data persistence uses proper Supabase tables (no KV store)
// Runs auto-migration on startup to ensure AI tables have correct columns

import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { wizard } from "./wizard-routes.tsx";
import { ai } from "./ai-routes.tsx";
import { crm } from "./crm-routes.tsx";
import { pipeline } from "./pipeline-routes.tsx";
import { documents } from "./document-routes.tsx";
import { workflows } from "./workflow-routes.tsx";
import { financial } from "./financial-routes.tsx";
import { strategy } from "./strategy-routes.tsx";
import { onboarding } from "./onboarding-routes.tsx";
import { agents } from "./agent-routes.tsx";
import { insights } from "./insight-routes.tsx";
import { nexus } from "./nexus-routes.tsx";
import { requireAuth } from "./auth.tsx";
import { ensureAISchema } from "./ensure-schema.tsx";
import { ensureOnboardingSchema } from "./ensure-schema.tsx";
import { healthStatus } from "./health-status.tsx";
import { callGemini } from "./gemini.tsx";
import { rateLimitMiddleware } from "./rate-limit.tsx";

const app = new Hono();
const PREFIX = "/make-server-283466b6";

// Enable logger
app.use("*", logger(console.log));

// CORS — restrict origins via ALLOWED_ORIGINS env var (comma-separated)
const allowedOrigins = (() => {
  const envOrigins = Deno.env.get("ALLOWED_ORIGINS");
  if (envOrigins) return envOrigins.split(",").map((o) => o.trim());
  return [];
})();

app.use(
  "/*",
  cors({
    origin: (origin) => {
      // No origin header = same-origin or non-browser client — allow
      if (!origin) return origin;
      // Check whitelist
      if (allowedOrigins.includes(origin)) return origin;
      // Dev fallback — allow localhost ONLY when explicit DENO_ENV=development is set
      const isDev = Deno.env.get("DENO_ENV") === "development" || Deno.env.get("ENVIRONMENT") === "development";
      if (isDev && origin.startsWith("http://localhost"))
        return origin;
      // Reject — empty string causes browser to block the response
      return "";
    },
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  })
);

// ── Health check ──
app.get(`${PREFIX}/health`, async (c) => {
  // Fresh checks on each request: do not report cached success during an outage.
  // Avoid direct Postgres URLs; the application itself uses Supabase's Data API.
  const [ai, onboarding] = await Promise.all([
    ensureAISchema(true), ensureOnboardingSchema(true),
  ]);
  const result = healthStatus(ai, onboarding);
  c.header("Cache-Control", "no-store");
  return c.json(result.response, result.statusCode);
});

// ── Legacy signup route disabled: use Supabase Auth email-verification flow ──
app.post(`${PREFIX}/signup`, (c) =>
  c.json({ error: "Use the verified Supabase Auth signup flow" }, 410)
);

// ── Mount wizard routes ──
app.route("/", wizard);

// ── Rate limiting on AI endpoints ──
// Match actual paid AI routes (these do NOT use /ai/*).
for (const route of [
  "analyze-business",
  "industry-diagnostics",
  "system-recommendations",
  "readiness-score",
  "generate-roadmap",
  "nexus/dispatch",
]) {
  app.use(`${PREFIX}/${route}`, rateLimitMiddleware());
}
app.use(`${PREFIX}/agents/run`, rateLimitMiddleware());
app.use(`${PREFIX}/strategy/analyze`, rateLimitMiddleware());
app.use(`${PREFIX}/strategy/synthesize-block`, rateLimitMiddleware());
app.use(`${PREFIX}/dashboard-insights`, rateLimitMiddleware());

// ── Mount AI routes ──
// Run auto-migration before first AI request
app.use(`${PREFIX}/ai/*`, async (c, next) => {
  await ensureAISchema();
  await next();
});
app.route("/", ai);

// ── POST /dashboard-insights — Registered directly on main app ──
// (Avoids Hono sub-router mounting issues that caused 404s)
app.post(`${PREFIX}/dashboard-insights`, async (c) => {
  try {
    const body = await c.req.json();
    const { sessionId, orgData, readinessScore, projectState, recentActivities } =
      body;

    // Validate auth — must be a real authenticated user (not just header presence)
    await requireAuth(c.req.header("Authorization") ?? null);

    const systemPrompt = `You are a senior AI strategy consultant at AMO AI. Based on the client's project state, readiness score, and recent activity, generate 2-4 prioritized action recommendations.

Each recommendation should be specific, actionable, and tied to their actual data. Avoid generic advice.

Return this JSON structure:
{
  "insights": [
    {
      "id": "unique-id",
      "title": "Short action title (max 60 chars)",
      "description": "2-3 sentence explanation with specific data points from their profile",
      "priority": "high|medium|low",
      "actionLabel": "Button text for the action",
      "actionRoute": "/app/route-to-navigate"
    }
  ],
  "greeting": "One-sentence contextual greeting referencing their industry or progress",
  "summary": "2-sentence summary of their current status and top priority"
}`;

    const userPrompt = `Client Data:
Organization: ${JSON.stringify(orgData || {})}
AI Readiness Score: ${readinessScore || "unknown"}
Project State: ${JSON.stringify(projectState || {})}
Recent Activities: ${JSON.stringify(recentActivities || [])}

Generate personalized, data-driven recommendations. Reference specific scores, gaps, and milestones from their data.`;

    const result = await callGemini(
      "dashboard-insights",
      systemPrompt,
      userPrompt,
      { sessionId, orgData, readinessScore },
      sessionId
    );

    console.log(`[AI] dashboard-insights complete for session ${sessionId}`);

    return c.json({
      success: true,
      insights: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const msg = String(error);
    const isAuthError = msg.includes("Authentication required") || msg.includes("No Authorization header");
    console.log(`[AI] dashboard-insights error (${isAuthError ? 401 : 500}): ${msg}`);
    return c.json({ error: isAuthError ? "Authentication required" : "Dashboard insights generation failed" }, isAuthError ? 401 : 500);
  }
});

// ── Mount CRM routes ──
app.route("/", crm);

// ── Mount Pipeline routes (Phase 7) ──
app.route("/", pipeline);

// ── Mount Document routes (Phase 8) ──
app.route("/", documents);

// ── Mount Workflow routes (Phase 11) ──
app.route("/", workflows);

// ── Mount Financial routes (Phase 13) ──
app.route("/", financial);

// ── Mount Strategy routes (Phase 14 — Lean Strategy Engine) ──
app.route("/", strategy);

// ── Mount Onboarding routes (Task 064 — Onboarding Agent) ──
app.use(`${PREFIX}/onboarding/*`, async (c, next) => {
  await ensureOnboardingSchema();
  await next();
});
app.route("/", onboarding);

// ── Mount Agent Catalog routes (Agency Agents feature) ──
app.use(`${PREFIX}/agents/*`, async (c, next) => {
  await ensureAISchema();
  await next();
});
app.route("/", agents);

// ── Mount Insight Card routes ──
app.route("/", insights);

// ── Mount NEXUS execution engine routes (production parity) ──
app.route("/", nexus);

// ── 404 handler ──
app.notFound((c) => {
  console.log(`[Server] 404: ${c.req.method} ${c.req.url}`);
  return c.json({ error: `Route not found: ${c.req.url}` }, 404);
});

// ── Global error handler ──
app.onError((err, c) => {
  const msg = err.message || String(err);
  const isAuthError = msg.includes("Authentication required") || msg.includes("Auth validation error") || msg.includes("No Authorization header");
  const status = isAuthError ? 401 : 500;
  console.log(`[Server] Unhandled error (${status}): ${msg}`);
  return c.json({ error: isAuthError ? "Authentication required" : "Internal server error" }, status);
});

Deno.serve(app.fetch);