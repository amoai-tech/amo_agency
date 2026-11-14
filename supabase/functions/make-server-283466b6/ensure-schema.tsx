// Read-only readiness probes via the Supabase Data API.
// This exercises the same backend path used by application requests, avoiding
// direct Postgres DNS/pooler assumptions in hosted and local Edge Functions.
// Migrations and SQL security checks remain the source of truth for RLS.

import { adminClient } from "./db.tsx";

export type SchemaResult = { ok: boolean; error?: string };

const AI_TABLE_COLUMNS: Record<string, string[]> = {
  ai_run_logs: [
    "id", "session_id", "org_id", "user_id", "prompt_type", "model",
    "tokens_used", "duration_ms", "success", "error_message", "created_at",
  ],
  ai_cache: [
    "input_hash", "response", "model", "tokens_used", "expires_at", "created_at",
  ],
};

const ONBOARDING_TABLE_COLUMNS: Record<string, string[]> = {
  projects: [
    "id", "user_id", "wizard_session_id", "name", "description", "industry",
    "company_size", "selected_systems", "status", "created_at",
  ],
  roadmaps: [
    "id", "user_id", "project_id", "title", "total_weeks", "quick_wins",
    "risk_factors", "success_metrics", "created_at",
  ],
  roadmap_phases: [
    "id", "user_id", "roadmap_id", "phase_number", "name", "description",
    "duration_weeks", "deliverables", "created_at",
  ],
  activities: [
    "id", "user_id", "project_id", "activity_type", "title", "description",
    "metadata", "created_at",
  ],
};

let aiSchemaVerified = false;
let onboardingVerified = false;

async function verifySchema(tables: Record<string, string[]>): Promise<SchemaResult> {
  try {
    // Table/column checks are dynamic by nature; use the typed factory everywhere
    // else and localize the dynamic PostgREST API invocation here.
    const client = adminClient() as any;
    const results = await Promise.all(Object.entries(tables).map(async ([table, columns]) => {
      // head + limit 0 does not read customer rows. PostgREST still validates
      // the requested columns and checks that the table is reachable.
      const { error } = await client.from(table).select(columns.join(","), { head: true }).limit(0);
      if (error) throw new Error(`${table}: ${error.message}`);
    }));
    void results;
    return { ok: true };
  } catch (error) {
    // Detailed failure belongs only in server logs, not public /health JSON.
    console.error("[Readiness] Schema validation failed:", error);
    return { ok: false, error: "Database schema unavailable" };
  }
}

/** fresh=true forces a live check, even if this worker passed on a prior call. */
export async function ensureAISchema(fresh = false): Promise<SchemaResult> {
  if (aiSchemaVerified && !fresh) return { ok: true };
  const result = await verifySchema(AI_TABLE_COLUMNS);
  aiSchemaVerified = result.ok;
  return result;
}

/** fresh=true forces a live check, even if this worker passed on a prior call. */
export async function ensureOnboardingSchema(fresh = false): Promise<SchemaResult> {
  if (onboardingVerified && !fresh) return { ok: true };
  const result = await verifySchema(ONBOARDING_TABLE_COLUMNS);
  onboardingVerified = result.ok;
  return result;
}
