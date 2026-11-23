// S09-ONBOARDING — Onboarding Agent (task 064)
// When a user completes the 5-step wizard, this endpoint:
//   1. Reads wizard_sessions + wizard_answers
//   2. UPSERTs a clients record
//   3. INSERTs a projects record (idempotent on wizard_session_id)
//   4. INSERTs a roadmaps record
//   5. INSERTs roadmap_phases rows
//   6. Updates wizard_sessions.user_id
//   7. Logs activity event
//   8. Returns summary with all created IDs
//
// Auth: requireAuth — post-login only (creates real DB records)
// Idempotent: checks for existing project by wizard_session_id

import { Hono } from "npm:hono";
import { adminClient } from "./db.tsx";
import { requireAuth } from "./auth.tsx";
import { NEXUS_PHASES } from "./agent-loader.tsx";

const onboarding = new Hono();
const PREFIX = "/make-server-283466b6";

// ── Helper: structured error response with logging ──
function errorResponse(c: any, context: string, error: unknown) {
  const msg = String(error);
  const isAuthError = msg.includes("Authentication required") || msg.includes("Auth validation error") || msg.includes("No Authorization header");
  const status = isAuthError ? 401 : 500;
  console.log(`[Onboarding] ${context} (${status}): ${msg}`);
  return c.json({ error: context }, status);
}

// ══════════════════════════════════════════════════════════════════════════
// POST /onboarding/complete — Main onboarding agent endpoint
// Body: { sessionId: string }
// Returns: { success, client, project, roadmap, phases[], activity }
// ══════════════════════════════════════════════════════════════════════════
onboarding.post(`${PREFIX}/onboarding/complete`, async (c) => {
  const startMs = Date.now();
  try {
    // ── 0. Authenticate ──
    const authHeader = c.req.header("Authorization");
    const userId = await requireAuth(authHeader ?? null);

    const body = await c.req.json();
    const { sessionId } = body;

    if (!sessionId) {
      return c.json(
        { error: "Missing sessionId in request body" },
        400
      );
    }

    console.log(
      `[Onboarding] Starting completion for session ${sessionId}, user ${userId}`
    );

    const db = adminClient();

    // ── 1. Read wizard data: wizard_sessions + wizard_answers ──
    const [sessionRes, answersRes] = await Promise.all([
      db.from("wizard_sessions").select("*").eq("id", sessionId).maybeSingle(),
      db
        .from("wizard_answers")
        .select("step_number, answers, ai_results")
        .eq("session_id", sessionId)
        .order("step_number"),
    ]);

    if (sessionRes.error) {
      console.log(
        `[Onboarding] Session read error: ${sessionRes.error.message}`
      );
      return c.json(
        { error: `Failed to read wizard session: ${sessionRes.error.message}` },
        500
      );
    }

    if (!sessionRes.data) {
      return c.json({ error: `Session ${sessionId} not found` }, 404);
    }

    const session = sessionRes.data;
    // The service-role client bypasses RLS; verify owner before reading
    // or creating any project, client or roadmap records from this session.
    if (session.user_id && session.user_id !== userId) {
      return c.json({ error: "Wizard session not found" }, 404);
    }
    if (!session.user_id) {
      // Allow a logged-in user to claim their unowned guest session by
      // possessing its randomly generated session ID. Claim atomically.
      const { data: claimed, error: claimError } = await db
        .from("wizard_sessions")
        .update({ user_id: userId, updated_at: new Date().toISOString() })
        .eq("id", sessionId)
        .is("user_id", null)
        .select("id")
        .maybeSingle();
      if (claimError || !claimed) {
        return c.json({ error: "Guest session claim failed; reload and retry" }, 409);
      }
    }
    const answers = answersRes.data || [];

    // ── Validate wizard completeness ──
    const stepNumbers = answers.map((a: any) => a.step_number);
    const requiredSteps = [1, 2, 3]; // Steps 1-3 are essential; 4-5 are optional
    const missingSteps = requiredSteps.filter((s) => !stepNumbers.includes(s));

    if (missingSteps.length > 0) {
      console.log(
        `[Onboarding] Incomplete wizard — missing steps: ${missingSteps.join(", ")}`
      );
      return c.json(
        {
          error: `Wizard incomplete: missing step(s) ${missingSteps.join(", ")}`,
          missingSteps,
        },
        400
      );
    }

    // ── 2. Extract business profile from Step 1 answers ──
    const step1 = answers.find((a: any) => a.step_number === 1);
    const readObject = (value: unknown): Record<string, any> =>
      value !== null && typeof value === "object" && !Array.isArray(value)
        ? value as Record<string, any>
        : {};
    const readText = (obj: Record<string, any>, ...keys: string[]): string => {
      for (const key of keys) {
        if (typeof obj[key] === "string") return obj[key];
      }
      return "";
    };
    const step1Data = readObject(step1?.answers);
    const companyName = readText(step1Data, "companyName", "company_name") || "Unnamed Company";
    const industry = readText(step1Data, "industry");
    const companySize = readText(step1Data, "companySize", "company_size");
    const websiteUrl = readText(step1Data, "websiteUrl", "website_url");
    const goal = readText(step1Data, "goal");
    const challenge = readText(step1Data, "challenge");

    // ── Step 3: selected systems ──
    const step3 = answers.find((a: any) => a.step_number === 3);
    const step3Data = readObject(step3?.answers);
    const selectedSystemsSource = step3Data.selectedSystems ?? step3Data.selected_systems;
    const selectedSystems: string[] = Array.isArray(selectedSystemsSource)
      ? selectedSystemsSource.filter((v: unknown): v is string => typeof v === "string")
      : [];

    // ── 3. Extract roadmap from Step 5 AI results (or Step 5 answers) ──
    const step5 = answers.find((a: any) => a.step_number === 5);
    const step5AI = readObject(step5?.ai_results);
    const step5Answers = readObject(step5?.answers);
    const roadmapSource = step5AI.roadmap ?? step5?.ai_results ?? step5Answers.roadmap;
    const aiRoadmap = roadmapSource && typeof roadmapSource === "object" && !Array.isArray(roadmapSource)
      ? readObject(roadmapSource)
      : null;

    // ── 4. Check for existing project (idempotent) ──
    const { data: existingProject } = await db
      .from("projects")
      .select("id, client_id")
      .eq("wizard_session_id", sessionId)
      .maybeSingle();

    if (existingProject) {
      console.log(
        `[Onboarding] Project already exists for session ${sessionId}: ${existingProject.id}`
      );

      // Load associated data and return
      const [roadmapRes, phasesRes] = await Promise.all([
        db
          .from("roadmaps")
          .select("*")
          .eq("project_id", existingProject.id)
          .maybeSingle(),
        db
          .from("roadmap_phases")
          .select("*")
          .eq(
            "roadmap_id",
            (
              await db
                .from("roadmaps")
                .select("id")
                .eq("project_id", existingProject.id)
                .maybeSingle()
            ).data?.id || ""
          )
          .order("phase_number"),
      ]);

      return c.json({
        success: true,
        idempotent: true,
        message: "Project already exists for this wizard session",
        project: { id: existingProject.id },
        client: { id: existingProject.client_id },
        roadmap: roadmapRes.data ? { id: roadmapRes.data.id } : null,
        phases: (phasesRes.data || []).map((p: any) => ({ id: p.id })),
        durationMs: Date.now() - startMs,
      });
    }

    // ── 5. UPSERT clients record ──
    // If user already has a client record, update it; otherwise create new
    let clientId: string | null = null;

    if (userId) {
      // Check for existing client by user (created_by field)
      const { data: existingClient } = await db
        .from("clients")
        .select("id")
        .eq("created_by", userId)
        .maybeSingle();

      if (existingClient) {
        // Update existing client with latest wizard info
        const { error: updateErr } = await db
          .from("clients")
          .update({
            name: companyName,
            industry,
            status: "onboarding",
            notes: `Goal: ${goal}. Challenge: ${challenge}`,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingClient.id);

        if (updateErr) {
          console.log(
            `[Onboarding] Client update error: ${updateErr.message}`
          );
        }
        clientId = existingClient.id;
        console.log(`[Onboarding] Updated existing client: ${clientId}`);
      }
    }

    if (!clientId) {
      // Create new client
      const { data: newClient, error: clientErr } = await db
        .from("clients")
        .insert({
          name: companyName,
          industry,
          status: "onboarding",
          health_score: 50,
          contact_email: "",
          contact_name: "",
          revenue: 0,
          notes: `Goal: ${goal}. Challenge: ${challenge}. Website: ${websiteUrl}`,
          created_by: userId,
          user_id: userId,
          updated_at: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (clientErr) {
        console.log(
          `[Onboarding] Client create error: ${clientErr.message}`
        );
        return c.json(
          { error: `Failed to create client: ${clientErr.message}` },
          500
        );
      }
      clientId = newClient.id;
      console.log(`[Onboarding] Created new client: ${clientId}`);
    }

    // ── 6. INSERT project record ──
    const projectName = aiRoadmap?.title ||
      `${companyName} — AI Transformation`;
    const totalWeeks = aiRoadmap?.totalWeeks || 12;
    const totalInvestment = aiRoadmap?.totalInvestment || "";

    // Build wizard snapshot (trimmed to essentials)
    const wizardSnapshot = {
      step1: step1Data,
      step3: { selectedSystems },
      completedSteps: stepNumbers,
      sessionId,
    };

    const { data: project, error: projectErr } = await db
      .from("projects")
      .insert({
        client_id: clientId,
        user_id: userId,
        wizard_session_id: sessionId,
        name: projectName,
        description: `AI transformation project for ${companyName}. Goal: ${goal}`,
        industry,
        company_size: companySize,
        selected_systems: JSON.stringify(selectedSystems),
        status: "active",
        current_phase: 1,
        total_weeks: totalWeeks,
        total_investment: totalInvestment,
        wizard_snapshot: JSON.stringify(wizardSnapshot),
      })
      .select("id")
      .single();

    if (projectErr) {
      console.log(
        `[Onboarding] Project create error: ${projectErr.message}`
      );
      return c.json(
        { error: `Failed to create project: ${projectErr.message}` },
        500
      );
    }

    console.log(`[Onboarding] Created project: ${project.id}`);

    // ── 7. INSERT roadmap record ──
    const roadmapData = {
      project_id: project.id,
      title: aiRoadmap?.title || projectName,
      total_weeks: totalWeeks,
      total_investment: totalInvestment,
      quick_wins: JSON.stringify(aiRoadmap?.quickWins || []),
      risk_factors: JSON.stringify(aiRoadmap?.riskFactors || []),
      success_metrics: JSON.stringify(aiRoadmap?.successMetrics || []),
      ai_response: aiRoadmap ? JSON.stringify(aiRoadmap) : null,
      user_id: userId,
    };

    const { data: roadmap, error: roadmapErr } = await db
      .from("roadmaps")
      .insert(roadmapData)
      .select("id")
      .single();

    if (roadmapErr) {
      console.log(
        `[Onboarding] Roadmap create error: ${roadmapErr.message}`
      );
      // Non-fatal — project was created; return partial success
      console.log(
        `[Onboarding] Continuing without roadmap — project ${project.id} was created`
      );
    }

    // ── 8. INSERT roadmap_phases from roadmap phases array (NEXUS-aware) ──
    let createdPhases: { id: string }[] = [];

    const aiPhases = Array.isArray(aiRoadmap?.phases) ? aiRoadmap.phases : [];
    if (roadmap && aiPhases.length > 0) {
      const phaseRows = aiPhases.map(
        (phase: any, idx: number) => {
          // NEXUS: look up phase config for agent assignments
          const nexusPhaseNum = phase.nexusPhase ?? idx;
          const nexusConfig = NEXUS_PHASES.find((p) => p.phase === nexusPhaseNum);

          return {
            roadmap_id: roadmap.id,
            phase_number: phase.phaseNumber || idx + 1,
            title: phase.title || nexusConfig?.name || `Phase ${idx + 1}`,
            week_range: phase.weekRange || "",
            systems: JSON.stringify(phase.systems || []),
            deliverables: JSON.stringify(phase.deliverables || []),
            milestones: JSON.stringify(phase.milestones || []),
            estimated_cost: phase.estimatedCost || "",
            status: idx === 0 ? "active" : "upcoming",
            progress: 0,
            user_id: userId,
            // NEXUS columns
            nexus_phase: nexusPhaseNum,
            assigned_agents: JSON.stringify(
              nexusConfig
                ? [...nexusConfig.primary, ...nexusConfig.secondary]
                : []
            ),
            gate_status: "pending",
            gate_keeper: nexusConfig?.gateKeeper || "",
          };
        }
      );

      const { data: phases, error: phasesErr } = await db
        .from("roadmap_phases")
        .insert(phaseRows)
        .select("id, nexus_phase");

      if (phasesErr) {
        console.log(
          `[Onboarding] Phases create error: ${phasesErr.message}`
        );
      } else {
        createdPhases = phases || [];
        console.log(
          `[Onboarding] Created ${createdPhases.length} NEXUS roadmap phases`
        );

        // ── 8b. INSERT phase_gates for each phase ──
        for (let i = 0; i < (phases || []).length; i++) {
          const phaseRow = phases![i];
          const aiPhase = aiPhases[i];
          const gateCriteria = aiPhase?.gateCriteria || [];

          if (gateCriteria.length > 0) {
            const gateRows = gateCriteria.map((gc: any, gIdx: number) => ({
              phase_id: phaseRow.id,
              criterion: gc.criterion || `Gate ${gIdx + 1}`,
              description: gc.description || "",
              check_type: gc.checkType === "ai" ? "ai" : "system",
              status: "pending",
              sort_order: gIdx,
              user_id: userId,
            }));

            const { error: gateErr } = await db
              .from("phase_gates")
              .insert(gateRows);

            if (gateErr) {
              console.log(
                `[Onboarding] Gates create error for phase ${i}: ${gateErr.message}`
              );
            } else {
              console.log(
                `[Onboarding] Created ${gateRows.length} gates for phase ${phaseRow.nexus_phase}`
              );
            }
          }
        }
      }
    } else if (roadmap) {
      // No AI phases — create default 7 NEXUS phases
      const defaultPhaseRows = NEXUS_PHASES.map((np, idx) => ({
        roadmap_id: roadmap.id,
        phase_number: idx + 1,
        title: np.name,
        week_range: np.defaultDuration,
        systems: JSON.stringify(idx < 3 ? selectedSystems.slice(0, 2) : []),
        deliverables: JSON.stringify([`${np.name} deliverables`]),
        milestones: JSON.stringify([`${np.name} milestone`]),
        estimated_cost: "",
        status: idx === 0 ? "active" : "upcoming",
        progress: 0,
        user_id: userId,
        nexus_phase: np.phase,
        assigned_agents: JSON.stringify([...np.primary, ...np.secondary]),
        gate_status: "pending",
        gate_keeper: np.gateKeeper,
      }));

      const { data: defaultPhases, error: defErr } = await db
        .from("roadmap_phases")
        .insert(defaultPhaseRows)
        .select("id");

      if (!defErr && defaultPhases) {
        createdPhases = defaultPhases;
        console.log(`[Onboarding] Created ${defaultPhases.length} default NEXUS phases`);
      }
    }

    // ── 9. UPDATE wizard_sessions.user_id if not already set ──
    if (userId && !session.user_id) {
      const { error: sessUpdateErr } = await db
        .from("wizard_sessions")
        .update({
          user_id: userId,
          status: "completed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", sessionId);

      if (sessUpdateErr) {
        console.log(
          `[Onboarding] Session user_id update error: ${sessUpdateErr.message}`
        );
      } else {
        console.log(
          `[Onboarding] Updated session ${sessionId} with user_id ${userId}`
        );
      }
    }

    // ── 10. INSERT activity event ──
    const activityData = {
      user_id: userId,
      project_id: project.id,
      session_id: sessionId,
      type: "onboarding",
      action: "Project created from wizard",
      detail: `Created project "${projectName}" for ${companyName} with ${selectedSystems.length} AI systems selected and ${createdPhases.length} roadmap phases.`,
      metadata: JSON.stringify({
        client_id: clientId,
        roadmap_id: roadmap?.id || null,
        phase_count: createdPhases.length,
        selected_systems: selectedSystems,
        total_weeks: totalWeeks,
      }),
    };

    const { data: activity, error: activityErr } = await db
      .from("activities")
      .insert(activityData)
      .select("id")
      .single();

    if (activityErr) {
      console.log(
        `[Onboarding] Activity log error: ${activityErr.message}`
      );
      // Non-fatal
    } else {
      console.log(`[Onboarding] Logged activity: ${activity.id}`);
    }

    // ── Return summary ──
    const durationMs = Date.now() - startMs;
    console.log(
      `[Onboarding] Completed in ${durationMs}ms — project ${project.id}`
    );

    return c.json({
      success: true,
      idempotent: false,
      client: { id: clientId },
      project: { id: project.id, name: projectName },
      roadmap: roadmap ? { id: roadmap.id } : null,
      phases: createdPhases.map((p) => ({ id: p.id })),
      activity: activity ? { id: activity.id } : null,
      summary: {
        companyName,
        industry,
        selectedSystems,
        totalWeeks,
        totalInvestment,
        phaseCount: createdPhases.length,
      },
      durationMs,
    });
  } catch (error) {
    return errorResponse(c, "Onboarding completion failed", error);
  }
});

// ══════════════════════════════════════════════════════════════════════════
// GET /onboarding/status/:sessionId — Check onboarding status
// Returns whether a project has been created for this wizard session
// ══════════════════════════════════════════════════════════════════════════
onboarding.get(`${PREFIX}/onboarding/status/:sessionId`, async (c) => {
  try {
    const userId = await requireAuth(c.req.header("Authorization") ?? null);
    const sessionId = c.req.param("sessionId");
    if (!sessionId) {
      return c.json({ error: "Missing sessionId parameter" }, 400);
    }

    const db = adminClient();

    // Check for existing project — scoped to authenticated user
    const { data: project, error } = await db
      .from("projects")
      .select("id, name, status, current_phase, total_weeks, created_at")
      .eq("wizard_session_id", sessionId)
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      // If table doesn't exist yet, return graceful empty state
      if (error.message?.includes("does not exist")) {
        return c.json({
          onboarded: false,
          project: null,
          message: "Onboarding tables not yet created",
        });
      }
      console.log(
        `[Onboarding] Status check error: ${error.message}`
      );
      return c.json(
        { error: `Status check failed: ${error.message}` },
        500
      );
    }

    return c.json({
      onboarded: !!project,
      project: project || null,
    });
  } catch (error) {
    return errorResponse(c, "Onboarding status check failed", error);
  }
});

export { onboarding };
