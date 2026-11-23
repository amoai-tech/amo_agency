# Supabase Architecture Overview

> AMO AI — Developer System Blueprint
> Visual reference at: `/docs/supabase` route
> Last updated: 2026-03-07 (v0.10.0 — post KV-to-tables refactor)

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React + TypeScript + Vite         |
| Backend    | Supabase Edge Functions (Deno/Hono) |
| Database   | Postgres + pgvector (RAG)         |
| AI Engine  | Google Gemini 2.0 Flash           |
| Infra      | Auth + Realtime + Storage         |
| Deploy     | Vercel (frontend) + Supabase (backend) |

## Three-Tier Architecture

```
Frontend (React App)
       ↓
Supabase Client SDK
       ↓
┌──────────────────────────────────┐
│       Supabase Platform          │
│                                  │
│  Auth │ Database │ Edge Functions │
│  Realtime │ Storage              │
└──────────────────────────────────┘
       ↓
┌──────────────────────────────────┐
│       External Services          │
│                                  │
│  Gemini AI │ Stripe │ Email      │
│  WhatsApp                        │
└──────────────────────────────────┘
```

---

## Database Tables (21 tables)

### Identity & Access
- `organizations` — Multi-tenant root (id, name, slug, plan)
- `profiles` — User profiles (FK → organizations)
- `team_members` — Org membership (FK → organizations)

### Projects
- `clients` — Client records (FK → organizations)
- `projects` — Project records (FK → organizations, clients)
- `tasks` — Project tasks (FK → projects)
- `milestones` — Project milestones (FK → projects)
- `deliverables` — Milestone deliverables (FK → milestones)

### Wizard ← **Now actively used by edge functions**
- `wizard_sessions` — 5-step wizard state (id, user_id, current_step, status, context_snapshot jsonb, timestamps)
- `wizard_answers` — Step-level answers + AI results (session_id FK, step_number, answers jsonb, ai_results jsonb)
  - Unique constraint on `(session_id, step_number)` for upserts

### Roadmap
- `context_snapshots` — Business context snapshots (FK → organizations)
- `roadmaps` — Generated roadmaps (FK → organizations)
- `roadmap_phases` — Roadmap phases (FK → roadmaps)

### Services
- `services` — Service catalog
- `systems` — AI system definitions
- `system_services` — System ↔ service mapping
- `project_services` — Project ↔ service assignments

### AI ← **Now actively used by edge functions**
- `ai_cache` — Response cache with TTL (`input_hash` text PK, `response` jsonb, `model`, `tokens_used`, `expires_at` timestamptz)
- `ai_run_logs` — Audit log for all AI calls (`session_id` FK, `org_id`, `prompt_type`, `model`, `tokens_used`, `duration_ms`, `success`, `error_message`)

### Billing
- `invoices` — Invoice records (FK → organizations)
- `payments` — Payment records (FK → invoices)

### Legacy (Preserved)
- `kv_store_283466b6` — Original Figma Make generic KV store. **No longer referenced by any edge function code.** Preserved for historical data; scheduled for cleanup.

---

## Multi-Tenant Pattern

All org-scoped tables include `org_id` with RLS policies:
```sql
-- Example: projects table
CREATE POLICY "org_isolation" ON projects
  USING (org_id IN (
    SELECT org_id FROM team_members
    WHERE user_id = auth.uid()
  ));
```

---

## Edge Function Files

| File | ID | Purpose | Tables Used |
|------|-----|---------|-------------|
| `server/index.tsx` | S00 | Main Hono server — mounts all routes, CORS, logger | — |
| `server/gemini.tsx` | S01 | Gemini AI client — API calls, caching, run logging | `ai_cache`, `ai_run_logs` |
| `server/auth.tsx` | S02 | Auth utilities — signup, token validation, RLS context | — (uses Supabase Auth API) |
| `server/wizard-routes.tsx` | S03 | Wizard persistence — save/load via relational tables | `wizard_sessions`, `wizard_answers` |
| `server/ai-routes.tsx` | S04 | AI analysis routes — 5 Gemini-powered endpoints | `wizard_answers` (ai_results) |
| `server/db.tsx` | S05 | Supabase client factory — adminClient + userClient | — (shared utility) |

---

## Client Factory Pattern (db.tsx)

```
┌─────────────────────────────────────────┐
│           db.tsx — S05-DB               │
│                                         │
│  adminClient()                          │
│  ├─ Service-role key                    │
│  ├─ Bypasses RLS                        │
│  └─ Used by: ai_cache, ai_run_logs,    │
│     saveAIResult (wizard_answers)       │
│                                         │
│  userClient(authHeader)                 │
│  ├─ Anon key + caller's JWT            │
│  ├─ Respects RLS policies              │
│  └─ Used by: wizard_sessions,          │
│     wizard_answers (user reads/writes)  │
└─────────────────────────────────────────┘
```

---

## Edge Function Routes

| Method | Route | Auth | Purpose | AI Step | DB Writes |
|--------|-------|------|---------|---------|-----------|
| GET | `/health` | No | Server health check | — | — |
| POST | `/signup` | No | Create user account | — | Supabase Auth |
| POST | `/wizard/save` | Anon OK | Save wizard state | — | `wizard_sessions`, `wizard_answers` |
| GET | `/wizard/:sessionId` | Anon OK | Load wizard session | — | — (reads) |
| GET | `/wizard/list/:userId` | Anon OK | List user sessions | — | — (reads) |
| POST | `/analyze-business` | Anon OK | Company URL analysis | Industry classification | `wizard_answers` (step 1 ai_results) |
| POST | `/industry-diagnostics` | Anon OK | Diagnostic insights | Pain-point analysis | `wizard_answers` (step 2 ai_results) |
| POST | `/system-recommendations` | Anon OK | AI system matching | Priority scoring | `wizard_answers` (step 3 ai_results) |
| POST | `/readiness-score` | Anon OK | AI readiness assessment | Maturity assessment | `wizard_answers` (step 4 ai_results) |
| POST | `/generate-roadmap` | Anon OK | Phased implementation plan | Phase planning + costing | `wizard_answers` (step 5 ai_results) |

All routes prefixed with `/make-server-283466b6`

---

## Data Flows

### Wizard Save Flow
```
Wizard UI → POST /wizard/save
  → userClient(JWT)
  → UPSERT wizard_sessions (session state)
  → UPSERT wizard_answers (step data)
  → Return { success, sessionId, updatedAt }
```

### Wizard Load Flow
```
Wizard UI → GET /wizard/:sessionId
  → userClient(JWT)
  → SELECT wizard_sessions WHERE id = sessionId
  → SELECT wizard_answers WHERE session_id ORDER BY step_number
  → Return { session, answers[], progress }
```

### AI Analysis Flow
```
Wizard UI → POST /analyze-business
  → callGemini("analyze-business", prompts, input, sessionId)
    → getCachedResult() → SELECT ai_cache WHERE input_hash AND expires_at > now()
    → If cache miss: Gemini API call
    → logAIRun() → INSERT ai_run_logs
    → setCachedResult() → UPSERT ai_cache
  → saveAIResult(sessionId, 1, result) → UPSERT wizard_answers SET ai_results
  → Return { success, analysis, timestamp }
```

### Frontend Persistence (Dual-Save)
```
User fills wizard form
  → localStorage (immediate, 500ms debounce)
  → Supabase cloud via wizardApi.save() (2s debounce)
  → Session ID assigned on first cloud save
  → Session ID stored in localStorage for reconnection
```

---

## AI Pipeline

```
User Input
  ↓
Edge Function (ai-routes.tsx)
  ↓
callGemini() (gemini.tsx)
  ├─→ Check ai_cache table (SELECT WHERE input_hash, expires_at > now)
  │   └─→ Cache HIT → return cached response
  │
  ├─→ Cache MISS → Gemini 2.0 Flash API
  │   ├─ Structured JSON output (responseMimeType: application/json)
  │   ├─ Temperature 0.7, topP 0.95, maxTokens 4096
  │   └─ Parse response → JSON
  │
  ├─→ Log run → INSERT ai_run_logs (session_id, prompt_type, model, tokens, duration, success)
  │
  └─→ Cache result → UPSERT ai_cache (input_hash PK, response, model, tokens, expires_at)
        └─ TTL: 24h (analyze-business) or 7 days (all others)
  ↓
saveAIResult() → UPSERT wizard_answers.ai_results
  ↓
Return to frontend
```

### AI Results Mapping

| Endpoint | Wizard Step | ai_results Content |
|----------|-------------|-------------------|
| `/analyze-business` | Step 1 | `{ analysis, analyzedAt }` |
| `/industry-diagnostics` | Step 2 | `{ diagnostics, analyzedAt }` |
| `/system-recommendations` | Step 3 | `{ recommendations, generatedAt }` |
| `/readiness-score` | Step 4 | `{ readiness, scoredAt }` |
| `/generate-roadmap` | Step 5 | `{ roadmap, generatedAt }` |

---

## Authentication

```
User Login → Supabase Auth → JWT Token → RLS Policies → Database Access
```

### Client Types

| Client | Key Used | RLS | Purpose |
|--------|----------|-----|---------|
| `userClient(authHeader)` | Anon key + JWT | Yes | Wizard reads/writes scoped to user |
| `adminClient()` | Service-role key | Bypass | AI cache, run logs, AI result saves |

### Auth Utilities (auth.tsx)

- `createUser({ email, password, name })` — Admin signup with auto email confirm
- `getUserFromToken(authHeader)` — Extract user ID from JWT; returns `"anonymous"` for anon key
- `requireAuth(authHeader)` — Guard for protected routes; throws if not authenticated

JWT contains: user_id, org_id, role claims
RLS enforces: org_id isolation at database level

---

## Realtime Channels (Planned)

| Channel          | Table            | Events              | UI Effect                    |
|-----------------|------------------|----------------------|------------------------------|
| project-tasks   | tasks            | INSERT, UPDATE, DELETE| Dashboard task board refresh  |
| wizard-progress | wizard_sessions  | UPDATE               | Processing page live progress |
| team-activity   | team_members     | INSERT, DELETE        | Team list live updates        |
| milestones      | milestones       | UPDATE               | Timeline markers update       |
| ai-runs         | ai_run_logs      | INSERT               | AI activity feed updates      |

---

## API Base URL

```
https://{projectId}.supabase.co/functions/v1/make-server-283466b6/{route}
```

Auth header: `Authorization: Bearer {access_token}`
Public access: `Authorization: Bearer {publicAnonKey}`

---

## Component Reference (Architecture Page)

| Component File                              | ID        |
|--------------------------------------------|-----------  |
| ArchDiagramBlock.tsx                       | C80-ARCH  |
| SystemArchitectureDiagram.tsx              | C81-SYS   |
| DatabaseStructure.tsx                      | C82-DB    |
| FrontendDataFlow.tsx                       | C83-FE    |
| EdgeFunctionArch.tsx                       | C84-EDGE  |
| AuthFlow.tsx                               | C85-AUTH  |
| RealtimeSystem.tsx                         | C86-RT    |
| AIPipeline.tsx                             | C87-AI    |
| APIReference.tsx                           | C88-API   |
| FrontendHooks.tsx                          | C89-HOOK  |
| SupabaseArchitecturePage.tsx               | C80-PAGE  |

---

## Migration History

| Migration | Purpose | Status |
|-----------|---------|--------|
| 000000 | Baseline schema (organizations, profiles, team_members) | Applied |
| 000001 | Projects schema (clients, projects, tasks, milestones, deliverables) | Applied |
| 000002 | Wizard schema (wizard_sessions, wizard_answers) | Applied |
| 000003 | AI schema (ai_cache, ai_run_logs) | Applied |
| 000004 | Services schema (services, systems, system_services, project_services) | Applied |
| 000005 | Add `ai_results` jsonb column to wizard_answers (if needed) | Pending verification |

---

## Remaining Work

1. Wire `StepExecutiveSummary` (C33) to call `/readiness-score` for live AI readiness
2. Wire `StepLaunchProject` (C34) to call `/generate-roadmap` for AI-generated roadmaps
3. Build login/signup UI with user-scoped wizard sessions
4. Add Supabase Storage for document uploads in wizard Step 1
5. Implement Supabase Realtime subscriptions for live wizard collaboration
6. Add RLS policies for anonymous wizard access (`user_id IS NULL`)
7. Add pg_cron job to expire old `ai_cache` rows
8. Schedule cleanup of legacy `kv_store_283466b6` table
