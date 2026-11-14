// S15-RATELIMIT — Atomic, per-user quota for authenticated AI requests.
// Requires migration 20261114082405_harden_ai_logs_and_rate_limits.sql.
// Do not count global ai_run_logs rows: that causes cross-customer throttling.
import { adminClient } from "./db.tsx";
import { requireAuth } from "./auth.tsx";

const DEFAULT_LIMIT = 10;
const WINDOW_SECONDS = 60;

type QuotaDecision = {
  allowed: boolean;
  remaining: number;
  retryAfter: number;
  unavailable?: boolean;
};

function configuredLimit(): number {
  const value = Number.parseInt(Deno.env.get("AI_RATE_LIMIT") || "", 10);
  return Number.isFinite(value) && value > 0
    ? Math.min(value, 1000)
    : DEFAULT_LIMIT;
}

export async function checkRateLimit(
  verifiedUserId: string,
  windowSeconds: number = WINDOW_SECONDS
): Promise<QuotaDecision> {
  // User ID MUST come from requireAuth(getUser), never from a request body or header.
  const limit = configuredLimit();
  const { data, error } = await adminClient().rpc("consume_ai_rate_limit", {
    p_user_id: verifiedUserId,
    p_limit: limit,
    p_window_seconds: windowSeconds,
  });

  if (error) {
    console.error("[RateLimit] Atomic quota RPC unavailable:", error.message);
    return { allowed: false, remaining: 0, retryAfter: windowSeconds, unavailable: true };
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row || typeof row.allowed !== "boolean") {
    console.error("[RateLimit] Invalid quota RPC response");
    return { allowed: false, remaining: 0, retryAfter: windowSeconds, unavailable: true };
  }
  return {
    allowed: row.allowed,
    remaining: Number(row.remaining) || 0,
    retryAfter: Number(row.retry_after) || windowSeconds,
  };
}

export function rateLimitMiddleware() {
  return async (c: any, next: () => Promise<void>) => {
    let userId: string;
    try {
      userId = await requireAuth(c.req.header("Authorization") ?? null);
    } catch {
      return c.json({ error: "Authentication required for AI requests" }, 401);
    }

    let quota: QuotaDecision;
    try {
      quota = await checkRateLimit(userId);
    } catch (error) {
      console.error("[RateLimit] Quota check failed:", error);
      quota = { allowed: false, remaining: 0, retryAfter: WINDOW_SECONDS, unavailable: true };
    }

    c.header("X-RateLimit-Limit", String(configuredLimit()));
    c.header("X-RateLimit-Remaining", String(quota.remaining));
    if (!quota.allowed) {
      c.header("Retry-After", String(quota.retryAfter));
      if (quota.unavailable) {
        return c.json({ error: "AI is temporarily unavailable. Please try again." }, 503);
      }
      return c.json(
        { error: "AI request limit reached. Please try again shortly.", retryAfter: quota.retryAfter },
        429
      );
    }

    await next();
  };
}
