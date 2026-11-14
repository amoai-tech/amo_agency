# Prompt: Frontend-Backend Wiring Audit & Completion

> Target: Ensure every frontend component that calls an edge function is fully wired with error handling, loading states, fallbacks, and correct auth token passing.

---

## Current State

The AMO AI platform has a three-tier architecture: React frontend, Hono edge functions on Supabase, and a Postgres database with four active tables (wizard_sessions, wizard_answers, ai_cache, ai_run_logs).

The frontend API layer lives in lib/supabase.ts with three modules: wizardApi, aiApi, and authApi. All calls go through a shared api helper that sets Authorization headers with either the user's access token or the public anon key.

Five edge function routes handle AI: analyze-business, industry-diagnostics, system-recommendations, readiness-score, and generate-roadmap. Three wizard routes handle persistence: save, load, and list. One auth route handles signup.

The db.tsx factory provides two Supabase clients: adminClient (service-role, bypasses RLS) for cache and logs, and userClient (anon key plus caller JWT, respects RLS) for wizard data.

AuthContext.tsx wraps Supabase Auth state and provides useAuth with signIn, signUp, signOut, and session restoration. WizardContext.tsx passes the accessToken to wizardApi.save for user-scoped cloud persistence.

## What Needs Wiring

### StepBusinessContext (C30, Step 1)

Currently calls aiApi.analyzeBusiness on URL blur. Verify it passes sessionId from WizardContext so the result persists to wizard_answers step 1 ai_results. Confirm the mock fallback activates cleanly when Gemini is unreachable. Ensure the analysis result card populates autofill suggestions that actually update step1 fields through updateStep1.

### StepIndustryDiagnostics (C31, Step 2)

Check whether this step calls aiApi.industryDiagnostics at all. If it still uses only local diagnostic question logic, wire it to call the endpoint when the user completes the diagnostic form. The endpoint needs the industryId from step1.industry and the companyProfile assembled from step1 answers and step1 ai_results. Pass sessionId for persistence.

### StepSystemRecommendations (C32, Step 3)

Check whether this step calls aiApi.systemRecommendations. If it only uses local getIndustryPrioritizedSystems ordering, wire it to call the endpoint once on mount or when the user first arrives. Pass sessionId, the full wizard answers from steps 1 and 2, the industry, and the diagnostic signals. Use the AI ranking to reorder the system cards while preserving the user's ability to toggle selections.

### StepExecutiveSummary (C33, Step 4)

Already wired to call aiApi.readinessScore on mount. Verify it handles the case where sessionId is null (anonymous user who hasnt cloud-saved yet). Verify the response shape matches the ReadinessData interface. Verify the retry function resets fetchedRef properly.

### StepLaunchProject (C34, Step 5)

Already wired to call aiApi.generateRoadmap on mount. Verify it passes all required params (selectedSystems, industry, companySize). Verify the AI phases replace the static ROADMAP_PHASES correctly. Verify the quickWins and successMetrics render from the live response.

### WizardContext Cloud Save

Verify the dual-save debounce works correctly: localStorage at 500ms, cloud at 2s. Verify that when a new sessionId comes back from the first save, it gets stored in both state and localStorage. Verify that switching from anonymous to authenticated (user signs in mid-wizard) correctly starts passing the new accessToken.

### Auth Flow

Verify signup calls POST /signup on the edge function, then auto-signs-in via Supabase client signInWithPassword. Verify the onAuthStateChange listener in AuthContext picks up the new session. Verify Header.tsx shows the user menu dropdown after auth. Verify sign-out clears the auth state and the wizard continues working in anonymous mode.

### Error Handling Patterns

Every edge function call in the frontend should: show a loading indicator while pending, display a descriptive error message on failure, log the error to console with enough context to debug, offer a retry button where appropriate, and fall back to local/mock behavior so the wizard never blocks.

### Token Passing Consistency

Audit every call to api() in lib/supabase.ts. Any call that touches wizard_sessions or wizard_answers should pass the user's accessToken so the edge function creates a userClient with the JWT. Calls to AI endpoints should also pass the token when available so the edge function can extract the userId for logging. The anon key fallback should still work for guest users.

## Acceptance Criteria

Every wizard step that has a corresponding AI endpoint calls that endpoint at the right moment (mount, blur, form complete, or explicit trigger). Every call passes sessionId for result persistence. Every call handles loading, success, error, and fallback states. The wizard is fully usable both as an anonymous guest and as an authenticated user. Cloud saves are user-scoped via RLS when authenticated.
