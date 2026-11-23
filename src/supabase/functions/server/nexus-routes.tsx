// S-NEXUS-ROUTES — NEXUS execution engine API endpoints
// Endpoints:
//   POST /nexus/dispatch     — dispatch agents for current phase (create + run jobs)
//   POST /nexus/evaluate     — evaluate quality gates for a phase
//   POST /nexus/advance      — try to advance to next phase (checks gates)
//   GET  /nexus/status/:id   — get NEXUS status for a project (phases + gates + jobs)
//   POST /nexus/jobs/:id/approve — approve a pending job
//   GET  /nexus/jobs          — list jobs for a project
//
// The orchestrator is deterministic code (NOT AI).
// AI agents provide input. Code makes structural decisions.

import { Hono } from "npm:hono";
import type { Context } from "npm:hono";
import { requireAuth } from "./auth.tsx";
import { adminClient } from "./db.tsx";
import { dispatchAction, shouldAutoApprove, isAgentCircuitBroken } from "./action-dispatcher.tsx";
import { getNexusPhase, extractExcerpt, compilePrompt } from "./agent-loader.tsx";
import { callGemini } from "./gemini.tsx";
import type { AgentJob } from "./action-dispatcher.tsx";

const PREFIX = "/make-server-283466b6";
export const nexus = new Hono();

function errorResponse(c: Context, msg: string, err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  const isAuth = message.includes("Authentication") || message.includes("Auth") || message.includes("Authorization");
  console.error(`[NEXUS] ${msg}: ${message}`);
  return c.json({ error: msg, detail: message }, isAuth ? 401 : 500);
}

/* ════════════════════════════════════════════════════════════════════
   POST /nexus/dispatch — Run agents for current phase
   Creates agent_jobs for each primary agent's task and executes auto-approved ones.
   ════════════════════════════════════════════════════════════════════ */

nexus.post(`${PREFIX}/nexus/dispatch`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);
    const { phase_id } = await c.req.json();

    if (!phase_id) return c.json({ error: "phase_id required" }, 400);

    const db = adminClient();

    // 1. Get phase details
    const { data: phase, error: phaseErr } = await db
      .from("roadmap_phases")
      .select("*")
      .eq("id", phase_id)
      .eq("user_id", userId)
      .single();

    if (phaseErr || !phase) return c.json({ error: "Phase not found" }, 404);
    if (phase.gate_status === "passed") return c.json({ error: "Phase already completed" }, 400);

    const nexusConfig = getNexusPhase(phase.nexus_phase ?? 0);
    if (!nexusConfig) return c.json({ error: "Invalid NEXUS phase" }, 400);

    // 2. Check circuit breaker — skip agents with 5+ consecutive failures
    const agentsToDispatch: string[] = [];
    for (const slug of nexusConfig.primary) {
      const broken = await isAgentCircuitBroken(slug, phase_id, db);
      if (broken) {
        console.log(`[NEXUS] Circuit broken for ${slug} in phase ${phase_id} — skipping`);
      } else {
        agentsToDispatch.push(slug);
      }
    }

    // 3. Check job count limit per phase
    const { count: existingJobs } = await db
      .from("agent_jobs")
      .select("id", { count: "exact", head: true })
      .eq("phase_id", phase_id);

    if ((existingJobs || 0) >= 50) {
      return c.json({ error: "Phase job limit reached (50). Review existing jobs." }, 429);
    }

    // 4. Resolve project_id from roadmap
    let projectId: string | null = null;
    if (phase.roadmap_id) {
      const { data: roadmapRow } = await db
        .from("roadmaps")
        .select("project_id")
        .eq("id", phase.roadmap_id)
        .single();
      projectId = roadmapRow?.project_id || null;
    }

    // 5. Create jobs for each agent using compilePrompt (4-layer)
    const createdJobs: string[] = [];
    const results: Array<{ agent: string; job_id: string; status: string }> = [];

    for (const slug of agentsToDispatch) {
      const excerpt = extractExcerpt(slug);
      if (!excerpt) continue;

      // Use the 4-layer prompt compiler for full context
      const compiled = compilePrompt(
        `You are an AI specialist at AMO AI. Phase: ${nexusConfig.name}. Objective: ${nexusConfig.description}.`,
        [slug],
        `Deliver your analysis and recommendations for this phase. Be specific, actionable, and evidence-based.`
      );

      // Create the job
      const { data: job, error: jobErr } = await db
        .from("agent_jobs")
        .insert({
          phase_id,
          project_id: projectId,
          agent_slug: slug,
          action_type: "ai_generate",
          payload: {
            prompt_type: `nexus-phase-${phase.nexus_phase}`,
            system_prompt: compiled.systemPrompt,
            user_prompt: `Phase: ${nexusConfig.name}\nObjective: ${nexusConfig.description}\nDeliver your analysis and recommendations for this phase.`,
            model: "flash",
          },
          priority: "medium",
          status: "pending",
          user_id: userId,
        })
        .select("*")
        .single();

      if (jobErr || !job) {
        console.error(`[NEXUS] Failed to create job for ${slug}: ${jobErr?.message}`);
        continue;
      }

      createdJobs.push(job.id);

      // Auto-execute if approved
      if (shouldAutoApprove(job as AgentJob)) {
        const dispatchResult = await dispatchAction(job as AgentJob, db);
        results.push({
          agent: slug,
          job_id: job.id,
          status: dispatchResult.status,
        });
      } else {
        results.push({ agent: slug, job_id: job.id, status: "pending_approval" });
      }
    }

    // 5. Update phase status to active
    if (phase.status !== "active") {
      await db
        .from("roadmap_phases")
        .update({ status: "active", progress: 10 })
        .eq("id", phase_id);
    }

    console.log(`[NEXUS] Dispatched ${results.length} agents for phase ${phase.nexus_phase} (${nexusConfig.name})`);

    return c.json({
      success: true,
      phase: nexusConfig.name,
      dispatched: results.length,
      jobs: results,
    });
  } catch (error) {
    return errorResponse(c, "Dispatch failed", error);
  }
});

/* ════════════════════════════════════════════════════════════════════
   POST /nexus/evaluate — Evaluate quality gates for a phase
   Runs system checks first, then AI for qualitative criteria.
   ════════════════════════════════════════════════════════════════════ */

nexus.post(`${PREFIX}/nexus/evaluate`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);
    const { phase_id } = await c.req.json();

    if (!phase_id) return c.json({ error: "phase_id required" }, 400);

    const db = adminClient();

    // 1. Get phase + its gates
    const { data: phase } = await db
      .from("roadmap_phases")
      .select("*")
      .eq("id", phase_id)
      .eq("user_id", userId)
      .single();

    if (!phase) return c.json({ error: "Phase not found" }, 404);

    const { data: gates } = await db
      .from("phase_gates")
      .select("*")
      .eq("phase_id", phase_id)
      .order("sort_order", { ascending: true });

    if (!gates || gates.length === 0) {
      return c.json({ error: "No gates defined for this phase" }, 400);
    }

    // 2. Evaluate each gate
    const evaluations: Array<{
      gate_id: string;
      criterion: string;
      check_type: string;
      status: string;
      evidence: string;
    }> = [];

    for (const gate of gates) {
      let newStatus = "pending";
      let evidence = "";

      if (gate.check_type === "system") {
        // System check: query agent_jobs for completion
        const { count } = await db
          .from("agent_jobs")
          .select("id", { count: "exact", head: true })
          .eq("phase_id", phase_id)
          .eq("status", "completed");

        // Simple check: at least one completed job exists
        if ((count || 0) > 0) {
          newStatus = "passed";
          evidence = `${count} agent jobs completed for this phase`;
        } else {
          newStatus = "failed";
          evidence = "No completed agent jobs found — dispatch agents first";
        }
      } else {
        // AI check: use gate keeper agent to evaluate
        const nexusConfig = getNexusPhase(phase.nexus_phase ?? 0);
        const gateKeeperSlug = nexusConfig?.gateKeeper || "reality-checker";

        try {
          const aiResult = await callGemini(
            `gate-eval-${gate.id}`,
            `You are a quality gate evaluator. Assess whether this criterion is met based on the available evidence. Be strict — default to FAIL unless clear evidence supports PASS.`,
            `Phase: ${nexusConfig?.name || "Unknown"}\nCriterion: ${gate.criterion}\nDescription: ${gate.description}\n\nRespond with JSON: {"verdict": "pass" | "fail", "evidence": "explanation"}`,
            { phase_id, gate_id: gate.id },
            undefined,
            "flash"
          );

          const parsed = typeof aiResult === "string" ? JSON.parse(aiResult) : aiResult;
          newStatus = parsed.verdict === "pass" ? "passed" : "failed";
          evidence = parsed.evidence || "AI evaluation completed";
        } catch {
          newStatus = "failed";
          evidence = "AI evaluation failed — treating as not passed";
        }
      }

      // Update gate
      await db
        .from("phase_gates")
        .update({
          status: newStatus,
          evidence,
          evaluated_by: gate.check_type === "system" ? "system" : (getNexusPhase(phase.nexus_phase ?? 0)?.gateKeeper || ""),
          evaluated_at: new Date().toISOString(),
        })
        .eq("id", gate.id);

      evaluations.push({
        gate_id: gate.id,
        criterion: gate.criterion,
        check_type: gate.check_type,
        status: newStatus,
        evidence,
      });
    }

    // 3. Determine overall gate status
    const allPassed = evaluations.every((e) => e.status === "passed");
    const anyFailed = evaluations.some((e) => e.status === "failed");
    const overallStatus = allPassed ? "passed" : anyFailed ? "failed" : "pending";

    await db
      .from("roadmap_phases")
      .update({
        gate_status: overallStatus,
        progress: allPassed ? 100 : Math.round((evaluations.filter((e) => e.status === "passed").length / evaluations.length) * 90),
      })
      .eq("id", phase_id);

    console.log(`[NEXUS] Evaluated ${evaluations.length} gates for phase ${phase.nexus_phase}: ${overallStatus}`);

    return c.json({
      success: true,
      phase_id,
      overall_status: overallStatus,
      gates: evaluations,
    });
  } catch (error) {
    return errorResponse(c, "Gate evaluation failed", error);
  }
});

/* ════════════════════════════════════════════════════════════════════
   POST /nexus/advance — Try to advance to next phase
   Checks if current phase gates are all passed, then activates next.
   ════════════════════════════════════════════════════════════════════ */

nexus.post(`${PREFIX}/nexus/advance`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);
    const { project_id } = await c.req.json();

    if (!project_id) return c.json({ error: "project_id required" }, 400);

    const db = adminClient();

    // 1. Get all phases for this project's roadmap
    const { data: roadmap } = await db
      .from("roadmaps")
      .select("id")
      .eq("project_id", project_id)
      .eq("user_id", userId)
      .single();

    if (!roadmap) return c.json({ error: "Roadmap not found" }, 404);

    const { data: phases } = await db
      .from("roadmap_phases")
      .select("*")
      .eq("roadmap_id", roadmap.id)
      .order("phase_number", { ascending: true });

    if (!phases || phases.length === 0) {
      return c.json({ error: "No phases found" }, 404);
    }

    // 2. Find current active phase
    const activePhase = phases.find((p: any) => p.status === "active");
    if (!activePhase) {
      // No active phase — activate first one
      const first = phases[0];
      await db
        .from("roadmap_phases")
        .update({ status: "active", progress: 0 })
        .eq("id", first.id);
      return c.json({ success: true, action: "activated_first", phase: first.title });
    }

    // 3. Check if active phase gate is passed
    if (activePhase.gate_status !== "passed") {
      return c.json({
        success: false,
        action: "blocked",
        reason: `Phase "${activePhase.title}" gate status is "${activePhase.gate_status}" — must be "passed" to advance`,
        current_phase: activePhase.nexus_phase,
      });
    }

    // 4. Mark current phase as completed
    await db
      .from("roadmap_phases")
      .update({ status: "completed", progress: 100 })
      .eq("id", activePhase.id);

    // 5. Activate next phase
    const nextPhase = phases.find(
      (p: any) => p.phase_number > activePhase.phase_number && p.status === "upcoming"
    );

    if (!nextPhase) {
      return c.json({
        success: true,
        action: "project_complete",
        message: "All phases completed",
      });
    }

    await db
      .from("roadmap_phases")
      .update({ status: "active", progress: 0 })
      .eq("id", nextPhase.id);

    console.log(`[NEXUS] Advanced from phase ${activePhase.nexus_phase} to ${nextPhase.nexus_phase}`);

    return c.json({
      success: true,
      action: "advanced",
      completed_phase: activePhase.title,
      active_phase: nextPhase.title,
      nexus_phase: nextPhase.nexus_phase,
    });
  } catch (error) {
    return errorResponse(c, "Phase advance failed", error);
  }
});

/* ════════════════════════════════════════════════════════════════════
   GET /nexus/status/:projectId — Full NEXUS status for a project
   ════════════════════════════════════════════════════════════════════ */

nexus.get(`${PREFIX}/nexus/status/:projectId`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);
    const projectId = c.req.param("projectId");

    const db = adminClient();

    // Get roadmap
    const { data: roadmap } = await db
      .from("roadmaps")
      .select("id")
      .eq("project_id", projectId)
      .eq("user_id", userId)
      .single();

    if (!roadmap) return c.json({ error: "Roadmap not found" }, 404);

    // Get phases with their gates
    const { data: phases } = await db
      .from("roadmap_phases")
      .select("*")
      .eq("roadmap_id", roadmap.id)
      .order("phase_number", { ascending: true });

    // Get gates and jobs for all phases (guard against empty array)
    const phaseIds = (phases || []).map((p: { id: string }) => p.id);

    let gates: Array<Record<string, unknown>> = [];
    let recentJobs: Array<Record<string, unknown>> = [];

    if (phaseIds.length > 0) {
      const { data: gateData } = await db
        .from("phase_gates")
        .select("*")
        .in("phase_id", phaseIds)
        .order("sort_order", { ascending: true });
      gates = gateData || [];

      const { data: jobData } = await db
        .from("agent_jobs")
        .select("*")
        .eq("user_id", userId)
        .in("phase_id", phaseIds)
        .order("created_at", { ascending: false })
        .limit(20);
      recentJobs = jobData || [];
    }

    // Build response
    const phaseStatuses = (phases || []).map((phase: any) => {
      const phaseGates = (gates || []).filter((g: any) => g.phase_id === phase.id);
      const phaseJobs = (recentJobs || []).filter((j: any) => j.phase_id === phase.id);
      const nexusConfig = getNexusPhase(phase.nexus_phase ?? 0);

      return {
        id: phase.id,
        nexus_phase: phase.nexus_phase,
        name: phase.title,
        description: nexusConfig?.description || "",
        status: phase.status,
        progress: phase.progress,
        gate_status: phase.gate_status,
        gate_keeper: phase.gate_keeper,
        assigned_agents: phase.assigned_agents || [],
        gates: phaseGates.map((g: any) => ({
          id: g.id,
          criterion: g.criterion,
          check_type: g.check_type,
          status: g.status,
          evidence: g.evidence,
        })),
        recent_jobs: phaseJobs.slice(0, 5).map((j: any) => ({
          id: j.id,
          agent_slug: j.agent_slug,
          action_type: j.action_type,
          status: j.status,
          created_at: j.created_at,
        })),
      };
    });

    return c.json({
      success: true,
      project_id: projectId,
      total_phases: phaseStatuses.length,
      active_phase: phaseStatuses.find((p: any) => p.status === "active")?.nexus_phase ?? null,
      phases: phaseStatuses,
    });
  } catch (error) {
    return errorResponse(c, "Status fetch failed", error);
  }
});

/* ════════════════════════════════════════════════════════════════════
   POST /nexus/jobs/:id/approve — Approve a pending job
   ════════════════════════════════════════════════════════════════════ */

nexus.post(`${PREFIX}/nexus/jobs/:jobId/approve`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);
    const jobId = c.req.param("jobId");

    const db = adminClient();

    const { data: job, error: jobErr } = await db
      .from("agent_jobs")
      .select("*")
      .eq("id", jobId)
      .eq("user_id", userId)
      .single();

    if (jobErr || !job) return c.json({ error: "Job not found" }, 404);
    if (job.status !== "pending") {
      return c.json({ error: `Job status is "${job.status}", expected "pending"` }, 400);
    }

    // Mark as approved and execute
    await db
      .from("agent_jobs")
      .update({
        status: "approved",
        approved_by: userId,
        approved_at: new Date().toISOString(),
      })
      .eq("id", jobId);

    // Execute immediately
    const updatedJob = { ...job, status: "approved" } as AgentJob;
    const result = await dispatchAction(updatedJob, db);

    return c.json({
      success: true,
      job_id: jobId,
      execution_result: result,
    });
  } catch (error) {
    return errorResponse(c, "Job approval failed", error);
  }
});

/* ════════════════════════════════════════════════════════════════════
   GET /nexus/jobs — List jobs for a project
   ════════════════════════════════════════════════════════════════════ */

nexus.get(`${PREFIX}/nexus/jobs`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);
    const projectId = c.req.query("project_id") ?? null;
    const status = c.req.query("status") ?? null;

    const db = adminClient();

    let query = db
      .from("agent_jobs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);

    if (projectId) query = query.eq("project_id", projectId);
    if (status) query = query.eq("status", status);

    const { data: jobs, error } = await query;

    if (error) throw error;

    return c.json({
      success: true,
      count: (jobs || []).length,
      jobs: jobs || [],
    });
  } catch (error) {
    return errorResponse(c, "Jobs list failed", error);
  }
});
