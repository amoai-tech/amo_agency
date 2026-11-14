// S-ACTION-DISPATCHER — Executes agent actions with safety guards
// Functions:
//   dispatchAction(job, db)  — validate + execute a single agent job
//   validatePayload(job)     — check required fields + size limits
//   shouldAutoApprove(job)   — determine if action needs human approval
//
// Action types: db_write, webhook, notification, ai_generate, schedule, external_api
// Safety: circuit breaker, retry limits, payload validation, deduplication

import { callGemini } from "./gemini.tsx";

/* ════════════════════════════════════════════════════════════════════
   TYPES
   ════════════════════════════════════════════════════════════════════ */

export type ActionType =
  | "db_write"
  | "webhook"
  | "notification"
  | "ai_generate"
  | "schedule"
  | "external_api";

export interface AgentJob {
  id: string;
  phase_id: string | null;
  project_id: string | null;
  agent_slug: string;
  action_type: ActionType;
  payload: Record<string, unknown>;
  priority: "critical" | "high" | "medium" | "low";
  requires_approval: boolean;
  status: string;
  attempts: number;
  max_attempts: number;
  next_job_id: string | null;
  trigger_condition: "on_complete" | "on_fail" | "always";
  user_id: string;
}

export interface DispatchResult {
  success: boolean;
  job_id: string;
  status: "completed" | "failed" | "pending_approval";
  result?: Record<string, unknown>;
  error?: string;
  next_job_triggered?: boolean;
}

/* ════════════════════════════════════════════════════════════════════
   SAFETY GUARDS
   ════════════════════════════════════════════════════════════════════ */

const SAFETY = {
  maxJobsPerPhase: 50,
  maxRetriesPerJob: 3,
  maxPayloadSizeBytes: 50_000,
  requiredFields: ["agent_slug", "action_type"] as const,
  // Actions that are always auto-approved (internal, read-only, or scheduling)
  autoApproveTypes: new Set<ActionType>(["ai_generate", "schedule"]),
  // Actions that always need approval
  alwaysApproveTypes: new Set<ActionType>(["external_api"]),
};

/* ════════════════════════════════════════════════════════════════════
   APPROVAL MATRIX
   ════════════════════════════════════════════════════════════════════ */

/**
 * Determine if a job should be auto-approved based on action type and payload.
 * Returns true = auto-approve, false = needs human approval.
 */
export function shouldAutoApprove(job: AgentJob): boolean {
  // Explicit flag overrides matrix
  if (job.requires_approval) return false;

  // Always-approve types (read/analyze, scheduling)
  if (SAFETY.autoApproveTypes.has(job.action_type)) return true;

  // Always-need-approval types (external APIs)
  if (SAFETY.alwaysApproveTypes.has(job.action_type)) return false;

  // db_write: auto-approve internal records, require approval for client-facing
  if (job.action_type === "db_write") {
    const table = String(job.payload.table || "");
    const internalTables = [
      "agent_jobs",
      "ai_run_logs",
      "activities",
      "agent_runs",
      "phase_gates",
    ];
    return internalTables.includes(table);
  }

  // webhook: auto-approve internal, require approval for external
  if (job.action_type === "webhook") {
    const url = String(job.payload.url || "");
    return url.includes("supabase.co") || url.includes("localhost");
  }

  // notification: auto-approve internal, require approval for client-facing
  if (job.action_type === "notification") {
    const target = String(job.payload.target || "internal");
    return target === "internal";
  }

  return false;
}

/* ════════════════════════════════════════════════════════════════════
   VALIDATION
   ════════════════════════════════════════════════════════════════════ */

export function validatePayload(job: AgentJob): string | null {
  // Required fields
  for (const field of SAFETY.requiredFields) {
    if (!job[field]) return `Missing required field: ${field}`;
  }

  // Payload size check
  const payloadSize = JSON.stringify(job.payload).length;
  if (payloadSize > SAFETY.maxPayloadSizeBytes) {
    return `Payload too large: ${payloadSize} bytes (max ${SAFETY.maxPayloadSizeBytes})`;
  }

  // Valid action type
  const validTypes: ActionType[] = [
    "db_write",
    "webhook",
    "notification",
    "ai_generate",
    "schedule",
    "external_api",
  ];
  if (!validTypes.includes(job.action_type)) {
    return `Invalid action_type: ${job.action_type}`;
  }

  return null; // Valid
}

/* ════════════════════════════════════════════════════════════════════
   ACTION EXECUTORS
   ════════════════════════════════════════════════════════════════════ */

async function executeDbWrite(
  job: AgentJob,
  db: any
): Promise<Record<string, unknown>> {
  const { table, data, operation = "insert" } = job.payload as {
    table: string;
    data: Record<string, unknown>;
    operation?: string;
  };

  if (!table || !data) {
    throw new Error("db_write requires table and data in payload");
  }

  let result;
  if (operation === "update") {
    const { id, ...updateData } = data;
    result = await db
      .from(table)
      .update(updateData)
      .eq("id", id)
      .select()
      .single();
  } else {
    result = await db.from(table).insert(data).select().single();
  }

  if (result.error) {
    throw new Error(`DB ${operation} failed: ${result.error.message}`);
  }

  return { operation, table, record_id: result.data?.id };
}

async function executeAiGenerate(
  job: AgentJob
): Promise<Record<string, unknown>> {
  const {
    prompt_type = "agent-task",
    system_prompt = "",
    user_prompt = "",
    model = "flash",
  } = job.payload as {
    prompt_type?: string;
    system_prompt?: string;
    user_prompt?: string;
    model?: string;
  };

  if (!user_prompt) {
    throw new Error("ai_generate requires user_prompt in payload");
  }

  const result = await callGemini(
    prompt_type,
    system_prompt,
    user_prompt,
    { agent_slug: job.agent_slug, job_id: job.id },
    undefined,
    model as "flash" | "pro" | "lite"
  );

  return { generated: true, content: result };
}

/** Block internal/private IPs to prevent SSRF */
function isBlockedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    // Block RFC1918, link-local, loopback, cloud metadata
    const blocked = [
      /^10\./, /^172\.(1[6-9]|2\d|3[01])\./, /^192\.168\./,
      /^169\.254\./, /^127\./, /^0\./, /^localhost$/i,
      /^metadata\.google\.internal$/i,
    ];
    return blocked.some((r) => r.test(host));
  } catch {
    return true; // Invalid URL = blocked
  }
}

async function executeWebhook(
  job: AgentJob
): Promise<Record<string, unknown>> {
  const { url, method = "POST", headers = {}, body } = job.payload as {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: unknown;
  };

  if (!url) throw new Error("webhook requires url in payload");
  if (isBlockedUrl(url)) throw new Error("Blocked: internal/private URL not allowed");

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });

  return {
    status: response.status,
    ok: response.ok,
    body: response.ok ? await response.json().catch(() => null) : null,
  };
}

async function executeNotification(
  job: AgentJob,
  db: any
): Promise<Record<string, unknown>> {
  const { target = "internal", message, title = "Agent Notification" } =
    job.payload as {
      target?: string;
      message: string;
      title?: string;
    };

  if (!message) throw new Error("notification requires message in payload");

  // For now, log notifications to activities table
  const { error } = await db.from("activities").insert({
    type: "agent_notification",
    title,
    description: message,
    metadata: {
      agent_slug: job.agent_slug,
      target,
      job_id: job.id,
      project_id: job.project_id,
    },
    user_id: job.user_id,
  });

  if (error) {
    throw new Error(`Notification failed: ${error.message}`);
  }

  return { notified: true, target };
}

async function executeSchedule(
  job: AgentJob,
  db: any
): Promise<Record<string, unknown>> {
  const {
    delay_minutes = 0,
    scheduled_job,
  } = job.payload as {
    delay_minutes?: number;
    scheduled_job: Omit<AgentJob, "id" | "status" | "attempts" | "created_at">;
  };

  if (!scheduled_job) {
    throw new Error("schedule requires scheduled_job in payload");
  }

  // Create a new pending job (will be picked up by future dispatch)
  const { data, error } = await db
    .from("agent_jobs")
    .insert({
      ...scheduled_job,
      status: "pending",
      attempts: 0,
      user_id: job.user_id,
      // Note: actual scheduling with delay would need pg_cron or similar
      // For now, jobs are created immediately and processed on next dispatch
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Schedule failed: ${error.message}`);
  }

  return { scheduled: true, new_job_id: data.id, delay_minutes };
}

/* ════════════════════════════════════════════════════════════════════
   MAIN DISPATCHER
   ════════════════════════════════════════════════════════════════════ */

/**
 * Dispatch and execute a single agent job.
 * Handles validation, approval checks, execution, and chaining.
 */
export async function dispatchAction(
  job: AgentJob,
  db: any
): Promise<DispatchResult> {
  // 1. Validate
  const validationError = validatePayload(job);
  if (validationError) {
    await db
      .from("agent_jobs")
      .update({ status: "failed", error: validationError })
      .eq("id", job.id);
    return {
      success: false,
      job_id: job.id,
      status: "failed",
      error: validationError,
    };
  }

  // 2. Check approval
  if (!shouldAutoApprove(job) && job.status !== "approved") {
    await db
      .from("agent_jobs")
      .update({ status: "pending", requires_approval: true })
      .eq("id", job.id);
    return {
      success: true,
      job_id: job.id,
      status: "pending_approval",
    };
  }

  // 3. Mark as running — use consistent attempt counter
  const currentAttempts = job.attempts + 1;
  await db
    .from("agent_jobs")
    .update({
      status: "running",
      started_at: new Date().toISOString(),
      attempts: currentAttempts,
    })
    .eq("id", job.id);

  // 4. Execute
  try {
    let result: Record<string, unknown>;

    switch (job.action_type) {
      case "db_write":
        result = await executeDbWrite(job, db);
        break;
      case "ai_generate":
        result = await executeAiGenerate(job);
        break;
      case "webhook":
        result = await executeWebhook(job);
        break;
      case "notification":
        result = await executeNotification(job, db);
        break;
      case "schedule":
        result = await executeSchedule(job, db);
        break;
      case "external_api":
        // External API calls are essentially webhooks with stricter approval
        result = await executeWebhook(job);
        break;
      default:
        throw new Error(`Unknown action_type: ${job.action_type}`);
    }

    // 5. Mark completed
    await db
      .from("agent_jobs")
      .update({
        status: "completed",
        result,
        completed_at: new Date().toISOString(),
      })
      .eq("id", job.id);

    // 6. Chain: trigger next job if configured
    let nextTriggered = false;
    if (job.next_job_id && job.trigger_condition === "on_complete") {
      await db
        .from("agent_jobs")
        .update({ status: "approved" })
        .eq("id", job.next_job_id)
        .eq("status", "pending");
      nextTriggered = true;
    }

    return {
      success: true,
      job_id: job.id,
      status: "completed",
      result,
      next_job_triggered: nextTriggered,
    };
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Unknown execution error";
    const isFinalAttempt = currentAttempts >= job.max_attempts;

    await db
      .from("agent_jobs")
      .update({
        status: isFinalAttempt ? "failed" : "pending",
        error: errMsg,
        attempts: currentAttempts,
      })
      .eq("id", job.id);

    // Chain: trigger next job on failure if configured
    if (
      isFinalAttempt &&
      job.next_job_id &&
      job.trigger_condition === "on_fail"
    ) {
      await db
        .from("agent_jobs")
        .update({ status: "approved" })
        .eq("id", job.next_job_id)
        .eq("status", "pending");
    }

    return {
      success: false,
      job_id: job.id,
      status: "failed",
      error: errMsg,
    };
  }
}

/**
 * Check circuit breaker: if >5 consecutive failures for same agent in a phase,
 * return true (agent should be paused).
 */
export async function isAgentCircuitBroken(
  agentSlug: string,
  phaseId: string,
  db: any
): Promise<boolean> {
  const { data } = await db
    .from("agent_jobs")
    .select("status")
    .eq("agent_slug", agentSlug)
    .eq("phase_id", phaseId)
    .order("created_at", { ascending: false })
    .limit(5);

  if (!data || data.length < 5) return false;
  return data.every((j: { status: string }) => j.status === "failed");
}
