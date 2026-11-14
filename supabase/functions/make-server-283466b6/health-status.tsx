import type { SchemaResult } from "./ensure-schema.tsx";

export function healthStatus(ai: SchemaResult, onboarding: SchemaResult) {
  const healthy = ai.ok && onboarding.ok;
  return {
    statusCode: healthy ? 200 as const : 503 as const,
    response: {
      status: healthy ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      schema: ai.ok ? "migrated" : "unavailable",
      onboardingSchema: onboarding.ok ? "migrated" : "unavailable",
    },
  };
}
