# Supabase Implementation Guide

> Production files for the AMO AI platform integration
> Last updated: 2026-03-07 (v0.10.0 — post KV-to-tables refactor)

---

## Files Created / Modified

### Backend (Edge Functions)

| File | ID | Purpose | Tables Used |
|------|-----|---------|-------------|
| `/supabase/functions/server/index.tsx` | S00 | Main Hono server — mounts all routes, CORS, logger, health, signup | — |
| `/supabase/functions/server/gemini.tsx` | S01 | Gemini AI client — API calls, caching via `ai_cache`, logging via `ai_run_logs` | `ai_cache`, `ai_run_logs` |
| `/supabase/functions/server/auth.tsx` | S02 | Auth utilities — signup, token validation, user extraction | Supabase Auth API |
| `/supabase/functions/server/wizard-routes.tsx` | S03 | Wizard persistence — save/load via relational tables | `wizard_sessions`, `wizard_answers` |
| `/supabase/functions/server/ai-routes.tsx` | S04 | AI analysis routes — 5 Gemini-powered endpoints | `wizard_answers` (ai_results) |
| `/supabase/functions/server/db.tsx` | S05 | Supabase client factory — `adminClient()` + `userClient(authHeader)` | Shared utility |

### Frontend

| File | ID | Purpose |
|------|-----|---------|
| `/lib/supabase.ts` | L01 | Supabase client singleton + typed API helpers (wizardApi, aiApi, authApi) |
| `/components/wizard/WizardContext.tsx` | C29 | Cloud save to Supabase alongside localStorage (dual persistence) |
| `/components/wizard/steps/StepBusinessContext.tsx` | C30 | Real Gemini analysis with mock fallback |
| `/components/wizard/steps/StepSystemRecommendations.tsx` | C32 | Industry-prioritized system ordering |

---

## API Endpoints

All routes prefixed with `/make-server-283466b6`

| Method | Route | Auth | Purpose | Response Shape |
|--------|-------|------|---------|---------------|
| GET | `/health` | No | Server health check | `{ status, timestamp }` |
| POST | `/signup` | No | Create user account | `{ success, user: { id, email } }` |
| POST | `/wizard/save` | Anon OK | Save wizard state | `{ success, sessionId, updatedAt }` |
| GET | `/wizard/:sessionId` | Anon OK | Load wizard session | `{ session, answers[], progress }` |
| GET | `/wizard/list/:userId` | Anon OK | List user sessions | `{ sessions[] }` |
| POST | `/analyze-business` | Anon OK | Gemini business analysis | `{ success, analysis, timestamp }` |
| POST | `/industry-diagnostics` | Anon OK | Industry diagnostic insights | `{ success, diagnostics, timestamp }` |
| POST | `/system-recommendations` | Anon OK | AI system ranking | `{ success, recommendations, timestamp }` |
| POST | `/readiness-score` | Anon OK | AI readiness assessment | `{ success, readiness, timestamp }` |
| POST | `/generate-roadmap` | Anon OK | Phased implementation plan | `{ success, roadmap, timestamp }` |

---

## Database Tables (Active)

### wizard_sessions

| Column | Type | Notes |
|--------|------|-------|
| `id` | text PK | Session ID (e.g. `wz-1741234567890-abc12345`) |
| `org_id` | uuid FK | Nullable — null for anonymous sessions |
| `user_id` | uuid FK | Nullable — null for anonymous sessions |
| `current_step` | integer | Current wizard step (1-5) |
| `status` | text | `in_progress`, `completed`, `abandoned` |
| `context_snapshot` | jsonb | Full wizard state snapshot |
| `created_at` | timestamptz | Auto-set |
| `updated_at` | timestamptz | Updated on each save |

### wizard_answers

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | Auto-generated |
| `session_id` | text FK | → wizard_sessions.id |
| `step_number` | integer | 1-5 |
| `answers` | jsonb | User-entered form data |
| `ai_results` | jsonb | AI-generated results for this step |
| `created_at` | timestamptz | Auto-set |
| `updated_at` | timestamptz | Updated on each save |

**Unique constraint:** `(session_id, step_number)` — enables upserts

**ai_results by step:**

| Step | Endpoint | ai_results Content |
|------|----------|--------------------|
| 1 | `/analyze-business` | `{ analysis: {...}, analyzedAt }` |
| 2 | `/industry-diagnostics` | `{ diagnostics: {...}, analyzedAt }` |
| 3 | `/system-recommendations` | `{ recommendations: {...}, generatedAt }` |
| 4 | `/readiness-score` | `{ readiness: {...}, scoredAt }` |
| 5 | `/generate-roadmap` | `{ roadmap: {...}, generatedAt }` |

### ai_cache

| Column | Type | Notes |
|--------|------|-------|
| `input_hash` | text PK | SHA-256 hash of `{ fn, ...input }` |
| `response` | jsonb | Cached Gemini response |
| `model` | text | e.g. `gemini-2.0-flash` |
| `tokens_used` | integer | Total tokens (prompt + completion) |
| `expires_at` | timestamptz | TTL expiry (24h for analysis, 7d for others) |
| `created_at` | timestamptz | Auto-set |

### ai_run_logs

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | Auto-generated |
| `session_id` | text FK | → wizard_sessions.id (nullable) |
| `org_id` | uuid FK | → organizations.id (nullable) |
| `prompt_type` | text | Function name (e.g. `analyze-business`) |
| `model` | text | e.g. `gemini-2.0-flash` |
| `tokens_used` | integer | Total tokens consumed |
| `duration_ms` | integer | Wall-clock duration |
| `success` | boolean | Whether the call succeeded |
| `error_message` | text | Error details if failed (nullable) |
| `created_at` | timestamptz | Auto-set |

---

## Client Factory (db.tsx)

Two client types handle different authorization contexts:

```typescript
// Service-role: bypasses RLS, used for server-internal operations
adminClient() → ai_cache, ai_run_logs, saveAIResult (wizard_answers)

// User-scoped: respects RLS, forwards caller's JWT
userClient(authHeader) → wizard_sessions, wizard_answers (user reads/writes)
```

**Why two clients?**
- `userClient` ensures wizard data respects RLS policies (org isolation)
- `adminClient` allows AI pipeline to write cache/logs without user context
- AI results are written via `adminClient` because the AI endpoint may not have the user's JWT, but the session_id provides traceability

---

## Data Flow: Wizard Save

```
Frontend (WizardContext.tsx)
  │
  ├─ localStorage.setItem("wizard-state", state)   ← 500ms debounce
  │
  └─ wizardApi.save(sessionId, fullState)           ← 2s debounce
       │
       └─ POST /make-server-283466b6/wizard/save
            │
            ├─ getUserFromToken(authHeader)
            │   └─ userId or "anonymous"
            │
            ├─ UPSERT wizard_sessions
            │   { id, user_id, current_step, status, context_snapshot, updated_at }
            │
            └─ UPSERT wizard_answers (if step + data provided)
                { session_id, step_number, answers, updated_at }
                ON CONFLICT (session_id, step_number) DO UPDATE
```

## Data Flow: Wizard Load

```
Frontend → GET /wizard/:sessionId
  │
  ├─ SELECT * FROM wizard_sessions WHERE id = :sessionId
  │
  ├─ SELECT step_number, answers, ai_results, updated_at
  │   FROM wizard_answers
  │   WHERE session_id = :sessionId
  │   ORDER BY step_number
  │
  └─ Return {
       session: { id, user_id, current_step, status, context_snapshot, ... },
       answers: [{ step_number, answers, ai_results, updated_at }, ...],
       progress: { currentStep, completedSteps }
     }
```

## Data Flow: AI Analysis (e.g. analyze-business)

```
Frontend → POST /analyze-business { url, description, industry, sessionId }
  │
  ├─ callGemini("analyze-business", systemPrompt, userPrompt, input, sessionId)
  │   │
  │   ├─ SHA-256 hash of input → check ai_cache
  │   │   SELECT response FROM ai_cache
  │   │   WHERE input_hash = :hash AND expires_at > now()
  │   │
  │   ├─ Cache MISS → fetch Gemini API
  │   │   POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
  │   │   { contents, generationConfig: { responseMimeType: "application/json" } }
  │   │
  │   ├─ INSERT INTO ai_run_logs
  │   │   { session_id, prompt_type, model, tokens_used, duration_ms, success }
  │   │
  │   └─ UPSERT INTO ai_cache
  │       { input_hash, response, model, tokens_used, expires_at }
  │
  ├─ saveAIResult(sessionId, 1, { analysis: result, analyzedAt })
  │   UPSERT INTO wizard_answers
  │   SET ai_results = :result
  │   WHERE session_id = :sid AND step_number = 1
  │
  └─ Return { success: true, analysis: result, timestamp }
```

## Data Flow: Readiness Score (Aggregation)

```
Frontend → POST /readiness-score { sessionId }
  │
  ├─ SELECT step_number, answers, ai_results
  │   FROM wizard_answers
  │   WHERE session_id = :sessionId AND step_number IN (1, 2, 3)
  │
  ├─ Assemble context:
  │   step1.answers → businessContext
  │   step1.ai_results → analysis
  │   step2.answers → industryDiagnostics
  │   step2.ai_results → diagnosticsAI
  │   step3.answers → systemSelections
  │   step3.ai_results → recommendationsAI
  │
  ├─ callGemini("readiness-score", prompts, sessionData, sessionId)
  │
  ├─ saveAIResult(sessionId, 4, { readiness: result, scoredAt })
  │
  └─ Return { success: true, readiness: result, timestamp }
```

---

## Gemini Integration

| Config | Value |
|--------|-------|
| Model | `gemini-2.0-flash` |
| Response format | `application/json` (structured output) |
| Temperature | 0.7 |
| Top P | 0.95 |
| Max output tokens | 4096 |
| Cache storage | `ai_cache` table (PK: SHA-256 input hash) |
| Cache TTL | 24h (analyze-business), 7d (all others) |
| Run logging | `ai_run_logs` table (every call, success or failure) |
| Fallback | Mock simulation when Gemini unavailable |

---

## Frontend API Layer (lib/supabase.ts)

### Client Singleton

```typescript
getSupabaseClient() → createClient(SUPABASE_URL, publicAnonKey)
```

### API Helper

```typescript
api<T>(route, { method, body, token }) → { data: T | null, error: string | null }
```

### Typed API Modules

**wizardApi:**
- `save(sessionId, fullState)` → POST /wizard/save
- `saveStep(sessionId, step, data)` → POST /wizard/save
- `load(sessionId)` → GET /wizard/:sessionId

**aiApi:**
- `analyzeBusiness({ url, description, industry, sessionId })` → POST /analyze-business
- `industryDiagnostics({ industryId, companyProfile, sessionId })` → POST /industry-diagnostics
- `systemRecommendations({ sessionId, wizardAnswers, industry, signals })` → POST /system-recommendations
- `readinessScore(sessionId)` → POST /readiness-score
- `generateRoadmap({ sessionId, selectedSystems, industry, companySize })` → POST /generate-roadmap

**authApi:**
- `signup(email, password, name)` → POST /signup (via Edge Function)
- `signIn(email, password)` → Supabase Auth (client-side)
- `signOut()` → Supabase Auth (client-side)
- `getSession()` → Supabase Auth (client-side)

### TypeScript Interfaces

- `WizardSaveResponse` — `{ success, sessionId, updatedAt }`
- `WizardLoadResponse` — `{ session, answers[], progress }`
- `AnalysisResponse` — `{ success, analysis: { companySummary, detectedIndustry, ... }, timestamp }`
- `RoadmapResponse` — `{ success, roadmap: { title, totalWeeks, phases[], ... }, timestamp }`

---

## Industry System Priority

`getIndustryPrioritizedSystems()` drives Step 3 ordering:
- Systems ordered by `INDUSTRY_SYSTEM_PRIORITY` map
- Signal-matching provides secondary boost (2+ signal difference overrides)
- All 12 systems shown (6 original + 6 new)

---

## Refactor History: KV → Tables

**Completed in v0.10.0** — All edge function files migrated from `kv_store_283466b6` to proper relational tables.

| Before (KV) | After (Table) |
|---|---|
| `kv.set("wizard:session:{id}", data)` | `db.from("wizard_sessions").upsert(row)` |
| `kv.set("wizard:answer:{id}:step{n}", data)` | `db.from("wizard_answers").upsert(row, { onConflict })` |
| `kv.get("ai:cache:{hash}")` | `db.from("ai_cache").select().eq("input_hash", hash).gt("expires_at", now)` |
| `kv.set("ai:log:{ts}", data)` | `db.from("ai_run_logs").insert(row)` |
| `kv.set("wizard:analysis:{id}", result)` | `db.from("wizard_answers").upsert({ ai_results: result })` (step 1) |

**Benefits gained:**
- RLS enforcement on wizard data (org isolation)
- Foreign key integrity (session_id → wizard_sessions)
- Proper indexing (PK lookups, no full table scans)
- Type safety (defined columns vs arbitrary JSONB blobs)
- TTL via `expires_at` column (vs convention-based key patterns)
- Audit trail with structured columns (vs opaque KV entries)

---

## Environment Variables

| Variable | Where Used | Purpose |
|----------|-----------|---------|
| `SUPABASE_URL` | db.tsx, auth.tsx | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | db.tsx (adminClient), auth.tsx | Service-role access (bypasses RLS) |
| `SUPABASE_ANON_KEY` | db.tsx (userClient), auth.tsx | Anonymous/public access key |
| `GEMINI_API_KEY` | gemini.tsx | Google Gemini API authentication |

---

## Prerequisites (Database Setup)

These tables must exist in the Supabase project before the edge functions will work:

1. **wizard_sessions** — with columns: `id` (text PK), `org_id`, `user_id`, `current_step`, `status`, `context_snapshot` (jsonb), `created_at`, `updated_at`
2. **wizard_answers** — with columns: `id` (uuid PK), `session_id` (text FK), `step_number` (int), `answers` (jsonb), `ai_results` (jsonb), `created_at`, `updated_at`; unique constraint on `(session_id, step_number)`
3. **ai_cache** — with columns: `input_hash` (text PK), `response` (jsonb), `model` (text), `tokens_used` (int), `expires_at` (timestamptz), `created_at`
4. **ai_run_logs** — with columns: `id` (uuid PK), `session_id` (text FK), `org_id` (uuid FK), `prompt_type` (text), `model` (text), `tokens_used` (int), `duration_ms` (int), `success` (bool), `error_message` (text), `created_at`

If `wizard_answers` is missing the `ai_results` column, add it:
```sql
ALTER TABLE wizard_answers ADD COLUMN IF NOT EXISTS ai_results jsonb;
```

---

## Remaining Work

1. Wire `StepExecutiveSummary` (C33) → `/readiness-score`
2. Wire `StepLaunchProject` (C34) → `/generate-roadmap`
3. Build login/signup UI with user-scoped sessions
4. Add Supabase Storage for document uploads
5. Implement Realtime subscriptions
6. Add RLS policy for anonymous wizard inserts
7. Schedule `kv_store_283466b6` cleanup
8. Add pg_cron for ai_cache expiry
