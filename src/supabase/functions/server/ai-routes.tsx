// S04-AI — AI analysis Edge Function routes
// analyze-business, industry-diagnostics, system-recommendations,
// readiness-score, generate-roadmap
// Results stored in wizard_answers.ai_results (per-step) instead of KV

import { Hono } from "npm:hono";
import { adminClient } from "./db.tsx";
import { requireAuth } from "./auth.tsx";
import { callGemini, GEMINI_MODELS } from "./gemini.tsx";
import { ensureAISchema } from "./ensure-schema.tsx";

const ai = new Hono();
const PREFIX = "/make-server-283466b6";

function errorResponse(c: any, context: string, error: unknown) {
  const msg = String(error);
  const isAuthError = msg.includes("Authentication required") || msg.includes("Auth validation error") || msg.includes("No Authorization header");
  const status = isAuthError ? 401 : 500;
  console.log(`[AI] ${context} (${status}): ${msg}`);
  return c.json({ error: context }, status);
}

/** Save AI result to the wizard_answers table for the given step */
async function saveAIResult(
  sessionId: string,
  stepNumber: number,
  result: unknown
): Promise<void> {
  try {
    const db = adminClient();
    const { error } = await db.from("wizard_answers").upsert(
      {
        session_id: sessionId,
        step_number: stepNumber,
        ai_results: result,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "session_id,step_number" }
    );
    if (error) {
      console.log(
        `[AI] Failed to save AI result for session ${sessionId} step ${stepNumber}: ${error.message}`
      );
    }
  } catch (e) {
    console.log(`[AI] saveAIResult exception: ${e}`);
  }
}

// ── POST /analyze-business ──
ai.post(`${PREFIX}/analyze-business`, async (c) => {
  try {
    await requireAuth(c.req.header("Authorization") ?? null);
    const body = await c.req.json();
    const { url, description, industry, sessionId } = body;

    if (!description && !url) {
      return c.json(
        { error: "Either url or description is required for analysis" },
        400
      );
    }

    const systemPrompt = `You are a senior business analyst at AMO AI. Analyze the company information provided and return a structured JSON analysis.

Return this exact JSON structure:
{
  "companySummary": "2-3 sentence company overview",
  "detectedIndustry": "most likely industry sector",
  "productsServices": ["list of key products/services"],
  "teamSizeEstimate": "estimated team size range",
  "technologySignals": ["detected technologies"],
  "aiOpportunities": ["top 4 AI opportunities"],
  "competitivePosition": "brief competitive analysis",
  "readinessIndicators": {
    "digital_maturity": "low|medium|high",
    "automation_level": "none|basic|moderate|advanced",
    "data_readiness": "low|medium|high"
  }
}`;

    const userPrompt = `Analyze this business:
${url ? `Website URL: ${url}` : ""}
${description ? `Description: ${description}` : ""}
${industry ? `Industry hint: ${industry}` : ""}

Provide a thorough analysis considering the business context, market position, and AI transformation potential.`;

    const result = await callGemini(
      "analyze-business",
      systemPrompt,
      userPrompt,
      { url, description, industry },
      sessionId
    );

    // Persist analysis to wizard_answers step 1
    if (sessionId) {
      await saveAIResult(sessionId, 1, {
        analysis: result,
        analyzedAt: new Date().toISOString(),
      });
    }

    console.log(
      `[AI] analyze-business complete for ${url || "description-only"}`
    );

    return c.json({
      success: true,
      analysis: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return errorResponse(c, "Business analysis failed", error);
  }
});

// ── POST /industry-diagnostics ──
ai.post(`${PREFIX}/industry-diagnostics`, async (c) => {
  try {
    await requireAuth(c.req.header("Authorization") ?? null);
    const body = await c.req.json();
    const { industryId, companyProfile, sessionId } = body;

    if (!industryId) {
      return c.json({ error: "industryId is required" }, 400);
    }

    const systemPrompt = `You are an AI diagnostics specialist at AMO AI. Generate industry-specific diagnostic insights based on the company profile and industry.

Return this JSON structure:
{
  "painPoints": [
    { "id": "string", "label": "pain point name", "severity": "high|medium|low", "description": "brief description" }
  ],
  "opportunities": [
    { "id": "string", "label": "opportunity name", "potentialROI": "percentage range", "description": "brief description" }
  ],
  "benchmarks": {
    "industryAverage": "key industry metrics",
    "topPerformers": "what leaders do differently"
  },
  "priorityActions": ["top 3 recommended immediate actions"]
}`;

    const userPrompt = `Industry: ${industryId}
Company Profile: ${JSON.stringify(companyProfile || {})}

Analyze this business in the context of their industry and provide diagnostic insights with actionable recommendations.`;

    const result = await callGemini(
      "industry-diagnostics",
      systemPrompt,
      userPrompt,
      { industryId, companyProfile },
      sessionId
    );

    // Persist diagnostics to wizard_answers step 2
    if (sessionId) {
      await saveAIResult(sessionId, 2, {
        diagnostics: result,
        analyzedAt: new Date().toISOString(),
      });
    }

    console.log(`[AI] industry-diagnostics complete for ${industryId}`);

    return c.json({
      success: true,
      diagnostics: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return errorResponse(c, "Industry diagnostics failed", error);
  }
});

// ── POST /system-recommendations ──
ai.post(`${PREFIX}/system-recommendations`, async (c) => {
  try {
    await requireAuth(c.req.header("Authorization") ?? null);
    const body = await c.req.json();
    const { sessionId, wizardAnswers, industry, signals } = body;

    const systemPrompt = `You are an AI systems architect at AMO AI. Based on the wizard answers and diagnostic signals, rank and recommend AI systems.

Available systems: support-engine, growth-engine, operations-autopilot, data-intelligence, content-engine, onboarding-system, cart-recovery, recommendation-engine, sales-automation, loyalty-system, booking-engine, compliance-automation

Return this JSON structure:
{
  "rankedSystems": [
    {
      "systemId": "string",
      "rank": 1,
      "fitScore": 0.95,
      "personalizedWhy": "why this system fits their specific situation",
      "expectedROI": "projected ROI range",
      "quickWin": true
    }
  ],
  "combinedStrategy": "2-3 sentence strategic overview",
  "implementationOrder": ["systemId1", "systemId2"],
  "estimatedTimeline": "total weeks",
  "investmentTier": "starter|growth|enterprise"
}`;

    const userPrompt = `Wizard answers: ${JSON.stringify(wizardAnswers || {})}
Industry: ${industry || "unknown"}
Diagnostic signals: ${JSON.stringify(signals || [])}

Rank and recommend the most impactful AI systems for this business, considering their industry, maturity level, and stated challenges.`;

    const result = await callGemini(
      "system-recommendations",
      systemPrompt,
      userPrompt,
      { wizardAnswers, industry, signals },
      sessionId
    );

    // Persist recommendations to wizard_answers step 3
    if (sessionId) {
      await saveAIResult(sessionId, 3, {
        recommendations: result,
        generatedAt: new Date().toISOString(),
      });
    }

    console.log(`[AI] system-recommendations complete`);

    return c.json({
      success: true,
      recommendations: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return errorResponse(c, "System recommendations failed", error);
  }
});

// ── POST /readiness-score ──
ai.post(`${PREFIX}/readiness-score`, async (c) => {
  try {
    await requireAuth(c.req.header("Authorization") ?? null);
    const body = await c.req.json();
    const { sessionId } = body;

    // Load all prior step answers and AI results from wizard_answers table
    let sessionData: Record<string, unknown> = {};
    if (sessionId) {
      const db = adminClient();
      const { data: answers, error } = await db
        .from("wizard_answers")
        .select("step_number, answers, ai_results")
        .eq("session_id", sessionId)
        .in("step_number", [1, 2, 3])
        .order("step_number");

      if (error) {
        console.log(`[AI] readiness-score data load error: ${error.message}`);
      }

      if (answers) {
        const step1 = answers.find((a: any) => a.step_number === 1);
        const step2 = answers.find((a: any) => a.step_number === 2);
        const step3 = answers.find((a: any) => a.step_number === 3);
        sessionData = {
          businessContext: step1?.answers || null,
          analysis: step1?.ai_results || null,
          industryDiagnostics: step2?.answers || null,
          diagnosticsAI: step2?.ai_results || null,
          systemSelections: step3?.answers || null,
          recommendationsAI: step3?.ai_results || null,
        };
      }
    }

    const systemPrompt = `You are an AI readiness assessment expert at AMO AI. Calculate an AI readiness score based on all available data about the business.

Return this JSON structure:
{
  "overallScore": 72,
  "scoreBreakdown": {
    "digitalMaturity": { "score": 80, "label": "Digital Infrastructure" },
    "dataReadiness": { "score": 65, "label": "Data & Analytics" },
    "processAutomation": { "score": 70, "label": "Process Automation" },
    "teamCapability": { "score": 75, "label": "Team & Culture" },
    "strategicAlignment": { "score": 68, "label": "Strategic Alignment" }
  },
  "maturityLevel": "developing|emerging|established|advanced",
  "gaps": [
    { "area": "gap area", "description": "what's missing", "priority": "high|medium|low" }
  ],
  "strengths": ["key strength 1", "key strength 2"],
  "nextSteps": ["recommended next step 1", "recommended next step 2"]
}`;

    const userPrompt = `Full session data: ${JSON.stringify(sessionData)}

Assess this company's AI readiness based on all available information. Be specific and actionable in your recommendations.`;

    const result = await callGemini(
      "readiness-score",
      systemPrompt,
      userPrompt,
      { sessionId, sessionData },
      sessionId,
      "pro" // Complex multi-dimensional scoring needs deeper reasoning
    );

    // Persist readiness score to wizard_answers step 4
    if (sessionId) {
      await saveAIResult(sessionId, 4, {
        readiness: result,
        scoredAt: new Date().toISOString(),
      });
    }

    console.log(
      `[AI] readiness-score complete: ${JSON.stringify(result).slice(0, 100)}`
    );

    return c.json({
      success: true,
      readiness: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return errorResponse(c, "Readiness scoring failed", error);
  }
});

// ── POST /generate-roadmap ──
ai.post(`${PREFIX}/generate-roadmap`, async (c) => {
  try {
    await requireAuth(c.req.header("Authorization") ?? null);
    const body = await c.req.json();
    const { sessionId, selectedSystems, industry, companySize } = body;

    if (!selectedSystems || selectedSystems.length === 0) {
      return c.json({ error: "At least one system must be selected" }, 400);
    }

    const systemPrompt = `You are a senior project manager at AMO AI. Create a phased implementation roadmap for the selected AI systems.

Return this JSON structure:
{
  "title": "AI Transformation Roadmap for [Company]",
  "totalWeeks": 12,
  "totalInvestment": "$XX,XXX - $XX,XXX",
  "phases": [
    {
      "phaseNumber": 1,
      "title": "Foundation",
      "weekRange": "Weeks 1-4",
      "systems": ["systemId1"],
      "deliverables": ["deliverable 1", "deliverable 2"],
      "milestones": ["milestone 1"],
      "estimatedCost": "$X,XXX",
      "teamInvolvement": "description of team needs"
    }
  ],
  "quickWins": ["quick win 1", "quick win 2"],
  "riskFactors": [
    { "risk": "risk description", "mitigation": "how to mitigate" }
  ],
  "successMetrics": [
    { "metric": "metric name", "target": "target value", "timeframe": "by when" }
  ]
}`;

    const userPrompt = `Selected systems: ${JSON.stringify(selectedSystems)}
Industry: ${industry || "unknown"}
Company size: ${companySize || "unknown"}

Create a realistic, phased implementation roadmap. Consider dependencies between systems, team capacity, and quick wins. Be specific about timelines and deliverables.`;

    const result = await callGemini(
      "generate-roadmap",
      systemPrompt,
      userPrompt,
      { selectedSystems, industry, companySize },
      sessionId,
      "pro" // Multi-phase roadmap planning needs deeper reasoning
    );

    // Persist roadmap to wizard_answers step 5
    if (sessionId) {
      await saveAIResult(sessionId, 5, {
        roadmap: result,
        generatedAt: new Date().toISOString(),
      });
    }

    console.log(
      `[AI] generate-roadmap complete for ${selectedSystems.length} systems`
    );

    return c.json({
      success: true,
      roadmap: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return errorResponse(c, "Roadmap generation failed", error);
  }
});

// ── POST /dashboard-insights ──
// Generates AI-powered next-best-action recommendations from project state
// NOTE: This route is registered directly in index.tsx (not via sub-router)
// to avoid Hono sub-router mounting issues. See index.tsx for the handler.

// ── GET /ai/run-logs — Query ai_run_logs for agent management dashboard ──
ai.get(`${PREFIX}/ai/run-logs`, async (c) => {
  try {
    await requireAuth(c.req.header("Authorization") ?? null);

    // Ensure schema is up-to-date before querying
    await ensureAISchema();

    const limit = Math.min(Math.max(1, parseInt(c.req.query("limit") || "50") || 50), 200);
    const offset = Math.max(0, parseInt(c.req.query("offset") || "0") || 0);
    const promptType = c.req.query("prompt_type") || null;

    const db = adminClient();
    let query = db
      .from("ai_run_logs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (promptType) {
      query = query.eq("prompt_type", promptType);
    }

    const { data: logs, error, count } = await query;

    if (error) {
      console.log(`[AI] run-logs query error: ${error.message}`);
      return c.json({ error: `Failed to fetch run logs: ${error.message}` }, 500);
    }

    console.log(`[AI] run-logs returned ${logs?.length || 0} of ${count} total`);
    return c.json({ logs: logs || [], total: count || 0 });
  } catch (error) {
    return errorResponse(c, "AI run logs query failed", error);
  }
});

// ── GET /ai/cache-stats — Aggregate cache stats from ai_cache table ──
ai.get(`${PREFIX}/ai/cache-stats`, async (c) => {
  try {
    await requireAuth(c.req.header("Authorization") ?? null);

    // Ensure schema is up-to-date before querying
    await ensureAISchema();

    const db = adminClient();

    // Fetch all cache entries
    const { data: entries, error } = await db
      .from("ai_cache")
      .select("input_hash, model, tokens_used, expires_at, created_at")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      console.log(`[AI] cache-stats query error: ${error.message}`);
      return c.json({ error: `Failed to fetch cache stats: ${error.message}` }, 500);
    }

    const now = new Date().toISOString();
    const active = (entries || []).filter(e => e.expires_at > now);
    const expired = (entries || []).filter(e => e.expires_at <= now);
    const totalTokensCached = active.reduce((sum, e) => sum + (e.tokens_used || 0), 0);

    console.log(`[AI] cache-stats: ${active.length} active, ${expired.length} expired`);

    return c.json({
      totalEntries: (entries || []).length,
      activeEntries: active.length,
      expiredEntries: expired.length,
      totalTokensCached,
      entries: (entries || []).slice(0, 50),
    });
  } catch (error) {
    return errorResponse(c, "Cache stats query failed", error);
  }
});

// ── GET /ai/aggregate-stats — Summary stats for agent dashboard header ──
ai.get(`${PREFIX}/ai/aggregate-stats`, async (c) => {
  try {
    await requireAuth(c.req.header("Authorization") ?? null);

    // Ensure schema is up-to-date before querying
    await ensureAISchema();

    const db = adminClient();

    // Total runs + success/failure counts
    const { data: allRuns, error: runsErr } = await db
      .from("ai_run_logs")
      .select("prompt_type, tokens_used, duration_ms, success, created_at")
      .order("created_at", { ascending: false })
      .limit(500);

    if (runsErr) {
      console.log(`[AI] aggregate-stats runs error: ${runsErr.message}`);
      return c.json({ error: `Failed to aggregate stats: ${runsErr.message}` }, 500);
    }

    const runs = allRuns || [];
    const totalRuns = runs.length;
    const successRuns = runs.filter(r => r.success).length;
    const failedRuns = runs.filter(r => !r.success).length;
    const totalTokens = runs.reduce((sum, r) => sum + (r.tokens_used || 0), 0);
    const avgDuration = totalRuns > 0
      ? Math.round(runs.reduce((sum, r) => sum + (r.duration_ms || 0), 0) / totalRuns)
      : 0;

    // Runs grouped by prompt_type
    const byType: Record<string, { count: number; tokens: number; avgMs: number; successRate: number }> = {};
    for (const r of runs) {
      const type = r.prompt_type || "unknown";
      if (!byType[type]) byType[type] = { count: 0, tokens: 0, avgMs: 0, successRate: 0 };
      byType[type].count++;
      byType[type].tokens += r.tokens_used || 0;
      byType[type].avgMs += r.duration_ms || 0;
      if (r.success) byType[type].successRate++;
    }
    for (const type of Object.keys(byType)) {
      byType[type].avgMs = Math.round(byType[type].avgMs / byType[type].count);
      byType[type].successRate = Math.round((byType[type].successRate / byType[type].count) * 100);
    }

    // Cache hit rate (from run logs — cache hits don't generate run logs, so approximate)
    const { data: cacheEntries } = await db
      .from("ai_cache")
      .select("input_hash")
      .gt("expires_at", new Date().toISOString());

    const activeCacheEntries = cacheEntries?.length || 0;

    console.log(`[AI] aggregate-stats: ${totalRuns} runs, ${totalTokens} tokens`);

    return c.json({
      totalRuns,
      successRuns,
      failedRuns,
      successRate: totalRuns > 0 ? Math.round((successRuns / totalRuns) * 100) : 0,
      totalTokens,
      avgDuration,
      activeCacheEntries,
      byType,
      models: GEMINI_MODELS,
    });
  } catch (error) {
    return errorResponse(c, "Aggregate stats query failed", error);
  }
});

export { ai };