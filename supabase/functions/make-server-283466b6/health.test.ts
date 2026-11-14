import { healthStatus } from "./health-status.tsx";

Deno.test("healthy databases return 200 and migrated status", () => {
  const out = healthStatus({ok:true},{ok:true});
  if (out.statusCode !== 200 || out.response.status !== "ok" ||
      out.response.schema !== "migrated" || out.response.onboardingSchema !== "migrated") {
    throw new Error("Healthy readiness returned an incorrect response");
  }
});
Deno.test("AI data failure must return 503 without leaking DB internals", () => {
  const out = healthStatus({ok:false,error:"postgresql://private:password@host"}, {ok:true});
  if (out.statusCode !== 503 || out.response.status !== "degraded" ||
      JSON.stringify(out.response).includes("password")) {
    throw new Error("Failed AI database readiness is misreported or leaks details");
  }
});
Deno.test("onboarding database failure must return 503", () => {
  const out = healthStatus({ok:true},{ok:false,error:"not found"});
  if (out.statusCode !== 503 || out.response.onboardingSchema !== "unavailable") {
    throw new Error("Failed onboarding readiness is misreported");
  }
});
