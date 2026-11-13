# CHANGELOG — AMO AI

**Project:** AMO AI — AI Consulting & Solutions Website
**Stack:** Vite + React + Tailwind CSS v4 + Supabase + Vercel
**Design System:** BCG Consulting-Inspired (Calm Luxury Editorial)
**Current Version:** v0.31.0
**Last Updated:** 2026-03-18

---

## [0.31.0] — 2026-03-18 — Skills Integration Phase 1: Fragments + Insight Route Fix

### Summary

Connected the skills library to production edge functions via a new **prompt fragment system**. Fixed 3 critical bugs in `insight-routes.tsx` that caused all 3 insight agents to silently produce degraded output (wrong slugs, wrong function signatures, wrong section names). Created 3 reusable prompt fragments — honesty protocol, stage calibration, and scoring rubrics — and wired them into agent execution and strategy analysis. Produced comprehensive skills integration plan with 9 mermaid diagrams.

### Fixed — insight-routes.tsx (3 bugs)

- **Bug 1**: Agent slugs didn't exist in AGENT_REGISTRY (`"project-management-project-shepherd"` → `"project-shepherd"`, `"marketing-growth-hacker"` → `"growth-hacker"`, `"support-finance-tracker"` → `"pipeline-analyst"`)
- **Bug 2**: `extractExcerpt()` called with wrong section names (`["Core Mission", "Critical Rules"]` are not valid — valid values are `"capabilities" | "rules" | "mission"`)
- **Bug 3**: `compilePrompt()` called with wrong signature — was passing `AgentExcerpt` object where `string[]` expected. Fixed to `compilePrompt(base, [slug], focus, schema)`
- **Removed** unused `extractExcerpt` import (compilePrompt calls it internally)

### Added — Prompt Fragment System

- **`fragments/honesty-protocol.ts`** — Global guardrail: labels assumptions, prevents invented metrics, declares unknowns. `getHonestyProtocol()` and `getHonestyFields()` exports.
- **`fragments/stage-calibration.ts`** — Pre-PMF defaults: bootstrap-first, this-week deliverables, TCO framework, constraint context. `getStageCalibration()` and `getConstraintContext()` exports.
- **`fragments/scoring-rubrics.ts`** — PCV scoring (0-24, 4 verdicts) + opportunity matrix (/30, 4 ranks). LLM extracts factors, **code computes totals deterministically**. `computePCVVerdict()` and `computeOpportunityRank()` exports.

### Changed — Fragment Wiring

- **`agent-routes.tsx`** — Injected honesty protocol + stage calibration into all `/agents/run` system prompts
- **`strategy-routes.tsx`** — Injected honesty protocol into strategy analysis base prompt (3-agent parallel analysis)
- **`insight-routes.tsx`** — Complete rewrite of agent config section with correct `compilePrompt` usage

### Added — Planning Documents

- `tasks/skills/02-skills-plan.md` — Full integration plan: top 10 components, 3 phases, gap analysis
- `tasks/skills/03-skills-diagrams.md` — 9 mermaid diagrams: architecture, flows, gaps, roadmap

### Deployment

- Edge function deployed (1.048MB) — 6/6 verification tests passing
- Insight routes: GET (401), PATCH (401), POST generate (401) — all properly auth-gated
- Agent routes: honesty + calibration fragments active
- Strategy: honesty protocol injected into 3-agent analysis

---

## [0.30.1] — 2026-03-18 — Frontend 401 Handling + Error Boundary

### Summary

Fixed 5 frontend auth issues exposed by the v0.30.0 backend auth hardening. The `api()` helper was silently falling back to the anon key after 401 (which also 401'd on hardened endpoints), leaving users stuck on broken dashboard pages. Now emits an auth failure event that triggers automatic sign-out and redirect to `/auth`. Also fixed 3 dashboard components using stale or hardcoded tokens, and added a global React Error Boundary.

### Fixed — Auth Failure Flow

- **`src/lib/supabase.ts`** — Removed silent anon-key fallback after failed token refresh. Now emits `AUTH_FAILURE_EVENT` custom event when 401 persists after refresh, triggering automatic sign-out instead of returning blank data.
- **`src/components/AuthContext.tsx`** — Added `AUTH_FAILURE_EVENT` listener that clears user state and calls `supabase.auth.signOut()`. DashboardLayout guard then redirects to `/auth?return=<path>`.

### Fixed — Token Patterns

- **`DealDetailPanel.tsx`** — Was hardcoding `publicAnonKey` as the auth token (every deal detail request would 401). Replaced with `useAuth()` + `'use-fresh-token'` sentinel.
- **`FinancialDashboardPage.tsx`** — Was passing raw `accessToken` from context (may be stale). Changed to `'use-fresh-token'` sentinel.
- **`WorkflowAutomationPage.tsx`** — Same stale-token fix as Financial.

### Added — Error Boundary

- **`src/App.tsx`** — Added global `ErrorBoundary` class component wrapping `AuthProvider` + `RouterProvider`. Catches uncaught render errors and shows a recovery UI with "Return to Home" button instead of a blank white screen.

### Deployment

- Frontend deployed to Vercel: https://www.sunai.one (3025 modules, 0 errors)
- Backend: 9/9 auth smoke tests passing post-deploy
- All 12 dashboard files now use consistent `'use-fresh-token'` pattern
- Zero stale-token or hardcoded-anon patterns remaining

---

## [0.30.0] — 2026-03-18 — Edge Function Auth Hardening (Security Audit + 33/33 Production Tests)

### Summary

Complete security audit and hardening of all 13 edge function route modules. Fixed 11 critical, 12 high, and 16 medium findings. Every endpoint now requires `requireAuth()` (JWT validation + anonymous rejection). All collection queries scoped by `user_id`. Ownership verified on all by-ID operations. Rate limiter fixed. N+1 query eliminated. Dead code cleaned. Stale deploy directories removed. **33/33 auth tests passing in production.**

### Critical Fixes

- **`workflow-routes.tsx`** — Fixed `ReferenceError: userId is not defined` crash in `/run` handler (line 250)
- **`financial-routes.tsx`** — 7 of 10 endpoints had **zero authentication** — now all require `requireAuth`
- **`ai-routes.tsx`** — 5 AI generation endpoints had **zero auth** + 3 stats endpoints were header-presence-only — now all require `requireAuth`
- **`crm-routes.tsx`** — Anon-key bypass: `getUserFromToken` returned truthy `"anonymous"` — replaced with `requireAuth`
- **`pipeline-routes.tsx`** — Same anon-key bypass on all 9 endpoints — replaced with `requireAuth`
- **`document-routes.tsx`** — Same anon-key bypass + no tenant scoping — fixed both
- **`agent-routes.tsx`** — Header-presence-only auth (`if (!authHeader)`) — replaced with `requireAuth`
- **`wizard-routes.tsx`** — List/load endpoints had zero auth — now require JWT (save preserved for anonymous guest wizard)
- **`strategy-routes.tsx`** — `getUserFromToken` on 8 read routes + no tenant scoping on 6 collection queries — all fixed
- **`onboarding-routes.tsx`** — Anonymous fallback in catch block defeated `requireAuth` — removed; status endpoint had zero auth — fixed
- **`index.tsx` dashboard-insights** — Token not validated, only header presence checked — now uses `requireAuth`

### Auth Architecture Changes

- **`requireAuth`** replaces `getUserFromToken` + `if (!userId)` as the standard auth gate (rejects null, invalid, expired, AND anonymous tokens)
- **`errorResponse`** in all route modules now detects auth errors ("Authentication required", "Auth validation error", "No Authorization header") and returns proper **401** instead of 500
- **Global error handler** in `index.tsx` also returns 401 for auth errors
- **All `userId === "anonymous" ? null : userId` ternaries removed** — dead code since `requireAuth` blocks anonymous
- **CORS dev fallback** now requires explicit `DENO_ENV=development` instead of activating when `ALLOWED_ORIGINS` is unset

### Tenant Isolation (user_id Scoping)

Every collection query in these modules now includes `.eq("user_id", userId)`:
- `crm-routes` (5 queries), `document-routes` (6), `workflow-routes` (9), `financial-routes` (11), `strategy-routes` (17), `onboarding-routes` (1), `insight-routes` (2)
- All by-ID GET/PUT/DELETE operations verify ownership before proceeding

### Performance & Reliability

- **N+1 query fixed** in `pipeline-routes.tsx` — was `1 + 2N` DB round-trips per pipeline list, now `1 + 2` (constant)
- **Singleton `adminClient`** — `db.tsx` now reuses Supabase client instance across requests
- **Rate limiter fixed** — was querying `session_id = userId` (never matched) — now counts globally by time window
- **Insight bug fixed** — `wizard_answers` was queried with `projectId` instead of `project.wizard_session_id`
- **Filename sanitization** — document upload paths now sanitize filenames to prevent traversal

### Cleanup

- **Deleted stale `supabase/functions/server/`** — 15 files, 6 modules behind, different entrypoint (risk of wrong-target deploy)
- **Deleted empty `supabase/functions/onboarding-agent/`** — orphaned directory
- **Removed `getUserFromToken` import** from 8 route files (only auth.tsx, rate-limit.tsx, wizard-routes.tsx retain it)

### Audit Reports

- `tasks/audit/09-edge-audit.md` — Original audit findings
- `tasks/audit/10-edge-audit-report.md` — Detailed report with mermaid diagrams
- `tasks/audit/11-fixes-applied.md` — Fix documentation with proof

### Deployment & Verification

- Edge function deployed (1.04MB) — **33/33 production auth tests passing**
- Health: `GET /health` → 200 (public, correct)
- All 31 protected endpoints → 401 (unauthenticated)
- `POST /wizard/save` → 200 (intentional anonymous support)
- Verification script: `scripts/smoke-test-auth.sh prod`

---

## [0.29.1] — 2026-03-15 — RLS Migration Applied + Onboarding Schema Fix + Google OAuth Verified

### Summary

Applied RLS hardening migration to production database. Fixed onboarding table schema mismatch (roadmaps, roadmap_phases, activities had columns from older migration that didn't match edge function code). Made `ensureOnboardingSchema()` self-healing with `ALTER TABLE ADD COLUMN IF NOT EXISTS` for all critical columns. Deployed edge function v52. Archived all 24 implementation prompts.

### Applied — RLS Policy Hardening (3 Migrations)

- **`fix_onboarding_table_schema`** — Added missing columns to `roadmaps` (project_id, title, total_weeks, etc.), `roadmap_phases` (roadmap_id, phase_number, systems, deliverables, etc.), `activities` (project_id, activity_type, title, description, metadata)
- **`rls_hardening_remaining_tables`** — 5 core tables: `dashboard_documents`, `dashboard_payments`, `strategy_events`, `strategy_event_triggers`, `workflow_executions` — added `user_id` column, dropped `USING(true)` policies, created `user_id = (SELECT auth.uid())` scoped policies with indexes
- **`rls_hardening_strategy_tables`** — 8 strategy tables: `automation_opportunities`, `lean_canvas_versions`, `strategy_actions`, `strategy_agent_memory`, `strategy_budgets`, `strategy_insights`, `strategy_recommendations`, `strategy_signals` — same pattern, backfilled user_id from `lean_canvases.user_id` via `canvas_id`

### Changed

- **`ensure-schema.tsx`** — Made `ensureOnboardingSchema()` self-healing: roadmaps, roadmap_phases, activities tables now use `ALTER TABLE ADD COLUMN IF NOT EXISTS` for all columns that `onboarding-routes.tsx` requires, preventing schema drift
- **`20260315120000_rls_hardening.sql`** — Rewritten to match what was actually applied to production (13 tables, not 22 — CRM/org tables already had proper org-based policies via `team_members` JOINs)

### Policy Audit Results

- **180 user_id-scoped policies** across all user-data tables
- **2 intentional `USING(true)` READ policies** remaining: `ai_cache` (shared cache), `system_services` (shared reference)
- **Org-scoped policies preserved**: clients, crm_contacts, crm_pipelines, crm_stages, crm_deals, crm_interactions, projects, roadmaps, roadmap_phases, activities

### Verified — Google OAuth

- **Google OAuth** configured in Google Cloud Console + Supabase Dashboard
- Client ID: `62485774686-2h3vn2up7j2m69ins75esf421iu4ci04.apps.googleusercontent.com`
- Redirect URI: `https://necxcwhuzylsumlkkmlk.supabase.co/auth/v1/callback`
- Verified: Supabase returns HTTP 302 → `accounts.google.com` with correct `client_id`, `scope=email+profile`, authorization code flow
- Frontend: `AuthPage.tsx` → `signInWithGoogle()` → `supabase.auth.signInWithOAuth({ provider: 'google' })` → `AuthCallbackPage.tsx` handles session

### Housekeeping

- **Prompts archived** — All 24 implementation prompts (01–24) moved from `prompts/prompts/` to `prompts/archive/` with status updated to "Done". `README.md` kept in `prompts/prompts/`.

### Deployment

- Edge function v52 deployed (1.039MB)
- Health check: `{ status: "ok", schema: "migrated", onboardingSchema: "migrated" }`
- Frontend deployed to Vercel: https://www.sunai.one

---

## [0.29.0] — 2026-03-15 — Security Hardening, Rate Limiting & Tech Debt Cleanup

### Summary

Comprehensive security and reliability release. Five implementation prompts (20-24) executed sequentially: (1) Gemini client hardened with 5 fixes — API key moved from URL to header, 30s AbortController timeout, temperature corrected to 1.0, system prompt moved to `system_instruction` field, optional `responseSchema` parameter added. (2) CORS restriction — replaced `origin: "*"` with `ALLOWED_ORIGINS` env var validation and localhost dev fallback. (3) RLS policy hardening — created migration adding `user_id` columns to 22 tables with scoped policies, updated 7 route files to include `user_id` on INSERT. (4) Per-user AI rate limiting — new `rate-limit.tsx` module with sliding window (10 req/min auth, 3 req/min anon) wired to 5 AI route patterns. (5) Tech debt cleanup — deleted `kv_store.tsx`, removed `simulateAnalysis()` mock, fixed migration timestamp collision, cleaned stale comments, deleted 20 orphan edge functions from Supabase.

### Changed — Gemini Client Security (Prompt 20)

- **`gemini.tsx`** — API key moved from URL query param `?key=` to `x-goog-api-key` header
- **`gemini.tsx`** — 30s `AbortController` timeout with `finally` cleanup (replaces bare `fetch()`)
- **`gemini.tsx`** — Temperature `0.7` → `1.0` (Gemini 3 best practice)
- **`gemini.tsx`** — System prompt moved from `contents[0]` concatenation to `system_instruction` field
- **`gemini.tsx`** — New optional 7th param `responseSchema` for structured JSON output
- **`gemini.tsx`** — `AbortError` detection with friendly timeout message

### Changed — CORS Origin Restriction (Prompt 21)

- **`index.tsx`** — Replaced `cors({ origin: "*" })` with function-based origin validation
- **`index.tsx`** — Reads `ALLOWED_ORIGINS` env var (comma-separated whitelist)
- **`index.tsx`** — Dev fallback: allows `localhost` origins when no env var set

### Added — RLS Policy Hardening (Prompt 22)

- **`20260315120000_rls_hardening.sql`** — Migration adding `user_id` columns to 22 tables, backfilling from parent FKs, dropping `USING(true)` policies, creating `_select_own`/`_insert_own`/`_update_own`/`_delete_own` scoped policies, adding 21 indexes
- **`strategy-routes.tsx`** — Added `user_id` to 12 INSERT operations
- **`pipeline-routes.tsx`** — Added `user_id` to 2 INSERT operations
- **`crm-routes.tsx`** — Added `user_id` to 2 INSERT operations
- **`onboarding-routes.tsx`** — Added `user_id` to 4 INSERT operations
- **`document-routes.tsx`** — Added `user_id` to 1 INSERT operation
- **`workflow-routes.tsx`** — Added `user_id` to 1 INSERT operation
- **`financial-routes.tsx`** — Added `user_id` to 1 INSERT operation

### Added — Rate Limiting (Prompt 23)

- **`rate-limit.tsx`** — New module: `checkRateLimit()` and `rateLimitMiddleware()` using `ai_run_logs` as sliding window counter. 10 req/min authenticated, 3 req/min anonymous, configurable via `AI_RATE_LIMIT` env var. `X-RateLimit-Remaining` and `Retry-After` headers. Fail-open on DB error.
- **`index.tsx`** — Rate limit middleware wired to `ai/*`, `agents/run`, `strategy/analyze`, `strategy/synthesize-block`, `dashboard-insights`

### Removed — Tech Debt Cleanup (Prompt 24)

- **`kv_store.tsx`** — Deleted (93 lines dead code, zero imports confirmed)
- **`StepBusinessContext.tsx`** — Removed `simulateAnalysis()` mock function (23 lines) and mock fallback path in `analyzeBusinessUrl()`. Now throws proper error on API failure.
- **`agent-routes.tsx`** — Fixed stale comment referencing "kv_store" → "agent_runs table"

### Fixed — Infrastructure (Prompt 24)

- **Migration collision** — Renamed `20260310120000_create_strategy_engine_tables.sql` → `20260310120001_create_strategy_engine_tables.sql` (was colliding with `create_onboarding_tables`)
- **20 orphan edge functions deleted** — analyst, analytics, analyze-business, assess-readiness, assistant, crm-intelligence, extractor, generate-diagnostics, generate-roadmap, intelligence-stream, monitor, onboarding-agent, optimizer, orchestrator, planner, recommend-systems, scorer, server, summary, task-generator. Only `make-server-283466b6` remains.

### Deployment

- Edge function v51 deployed (1.039MB)
- Health check verified: `{ status: "ok" }`
- Build verified: 3025 modules, 0 errors

### Pending (Manual)

- Apply RLS migration `20260315120000_rls_hardening.sql` to production DB
- Verify/set `ALLOWED_ORIGINS` secret in Supabase

---

## [0.28.0] — 2026-03-13 — KV Store Migration + Gemini Model Update

### Summary

Migrated all 3 remaining KV store consumers to proper Supabase tables with typed columns, RLS policies, indexes, and triggers. Created new `dashboard_documents` table. Updated all Gemini model references from deprecated `gemini-2.0-flash` to `gemini-3-flash-preview`.

### Changed — KV Store Migration (25 endpoints)

- **`workflow-routes.tsx`** — Migrated from `kv.getByPrefix("workflow:")` / `kv.set()` to `adminClient().from("workflows")` and `.from("workflow_executions")`. 8 endpoints.
- **`financial-routes.tsx`** — Migrated from `kv.getByPrefix("invoice:")` / `kv.set()` to `adminClient().from("dashboard_invoices")` and `.from("dashboard_payments")`. 10 endpoints.
- **`document-routes.tsx`** — Migrated from `kv.get("doc:")` / `kv.set()` to `adminClient().from("dashboard_documents")`. 7 endpoints.
- **`kv_store.tsx`** — Marked deprecated. No route modules import it.

### Added

- `supabase/migrations/20260313120000_create_dashboard_documents.sql` — New table with RLS, 3 indexes, `updated_at` trigger

### Changed — Gemini Model Update

- `gemini.tsx` — `GEMINI_MODEL` constant: `gemini-2.0-flash` → `gemini-3-flash-preview`
- `ai-routes.tsx` — Hardcoded model string in aggregate-stats response
- `agent-routes.tsx` — Model strings in run response and ai_run_logs insert
- `ensure-schema.tsx` — Default column values for `ai_run_logs.model` and `ai_cache.model`

---

## [0.27.0] — 2026-03-13 — Dashboard Agent Team Widget, CRM Deal Scoring, 116-Agent Catalog

### Summary

Three major deliverables: (1) Rebuilt the Dashboard Agent Team Widget with AgentAvatar, live API matching via POST /agents/match, fit score badges, running/online/idle status indicators, and scrollable agent list. (2) Integrated CRM deal scoring into the pipeline kanban — deterministic health score (0-100). (3) Expanded agent catalog from 16 to 116 agents across 10 divisions.

### Added

- `/components/wizard/data/agentCatalogExpanded.ts` — 100 additional agents across 10 divisions
- `/lib/dealScoring.ts` — Deterministic deal health scoring
- `/docs/agency/09-agents-list.md` — Complete 116-agent reference doc

### Changed

- `/components/dashboard/AgentTeamWidget.tsx` (v2) — Complete rebuild with AgentAvatar, API matching, fit scores
- `/components/dashboard/crm/DealCard.tsx` (v2) — Uses DealHealthBar with agent attribution
- `/components/dashboard/crm/CRMPipelinePage.tsx` — Auto-scores all deals via scoreDeals()
- `/components/wizard/data/agentCatalog.ts` — Added ALL_CATALOG_AGENTS export (116 total)

---

## [0.26.2] — 2026-03-13 — Agent Loader, 6 Reusable UI Components, Wizard AI Team Wiring

### Summary

Built server-side `agent-loader.tsx` (16-agent registry, 4-layer prompt assembly, deterministic matching). Created 6 reusable UI components in `/components/shared/agents/`. Wired `POST /agents/match` into wizard Steps 3-5.

### Added

- **`agent-loader.tsx`** — Server-side agent prompt utility (16-agent registry, `selectAgents()`, `compilePrompt()`)
- **6 shared agent components** — AgentAvatar, AgentBadge, AgentTeamCard, AgentStatusRow, InsightCard, DealHealthBar

### Changed

- **`agent-routes.tsx`** — Match uses deterministic scoring, run uses `compilePrompt()`
- **Wizard Steps 3-5** — Agent team display using shared components

---

## [0.26.1] — 2026-03-13 — Full-Stack Architecture Diagram

### Added

- **`AgentArchitectureDiagram.tsx`** — Interactive three-column SVG architecture diagram at `/app/agents/architecture-diagram`

---

## [0.26.0] — 2026-03-13 — Agency Agents: Server Wiring, Live API, System Map & Data Model ERD

### Summary

Fixed critical bug where `agent-routes.tsx` (3 endpoints) was defined but never mounted. Added `agentCatalogApi` frontend API. Created Agent System Map and ER Diagram visualizations.

### Fixed

- **`index.tsx`** — Imported and mounted agent routes (3 endpoints were unreachable)

### Added

- **`agentCatalogApi`** — 3 typed methods (run, match, history)
- **`AgentSystemMap.tsx`** — Interactive SVG (9 product areas → 13 agents)
- **`AgentERDiagram.tsx`** — Interactive SVG (5 tables, PK/FK badges, relationship arrows)

---

## [0.25.0] — 2026-03-10 — Onboarding Agent (Task 064) + Home Page Cleanup

### Summary

Full implementation of Onboarding Agent — converts completed wizard sessions into database records (client, project, roadmap, phases, activity). Removed Strategic Framework and Testimonial sections from home page.

### Added

- **`onboarding-routes.tsx`** — 2 endpoints: `POST /onboarding/complete`, `GET /onboarding/status/:sessionId`
- **`onboardingApi`** — Frontend API module
- **Auto-migration** — `ensureOnboardingSchema()` creates 4 tables on first request

---

## [0.24.6] — 2026-03-09 — Service Card Content & Cloudinary Image Migration

- Renamed "Industry Chatbot Packages" → "AI Automations" with updated copy
- 3 more service card images migrated to Cloudinary (10/12 total)

## [0.24.5] — 2026-03-09 — Auth Split-Screen UI: Full Spec Alignment

- Complete rewrite of AuthPage.tsx matching 15 spec requirements
- Route changed from `/login` to `/auth` with redirect alias

## [0.24.4] — 2026-03-09 — Full Broadcast Migration + Canvas Realtime Sync

- All 4 Realtime channels migrated to broadcast pattern
- Added `useRealtimeCanvasSync` for collaborative editing

## [0.24.3] — 2026-03-09 — CRM Pipeline Realtime: Live Multi-User Kanban

- `useRealtimeDealUpdates` hook for pipeline-scoped broadcast
- Self-write suppression via `markLocalWrite()`

## [0.24.2] — 2026-03-09 — Supabase Realtime Channels: ai-runs + wizard-progress

- 3-layer hook architecture: `useSupabaseRealtime` → domain hooks
- AI run monitoring + multi-tab wizard sync

## [0.24.1] — 2026-03-09 — Sitemap v13 Update (51 Routes)

## [0.24.0] — 2026-03-09 — Lean Strategy Engine: Complete (Phase 14 — 26/26 Tasks)

- AnalysisProgressSheet, RoadmapExecutionPanel, CanvasVersionHistory, Mobile Tab Bar
- Full 3x3 Lean Canvas with 5-agent AI analysis

## [0.23.0] — 2026-03-09 — Lean Strategy Engine: Full Data Pipeline + UI (Phase 14a)

- TypeScript types, 14 backend routes, strategyApi, useStrategyData hook
- 3x3 canvas grid, intelligence panel, AI synthesis, sidebar nav

## [0.22.5] — 2026-03-09 — Supabase Database Plan with ERD & Data Flow Diagrams

## [0.22.4] — 2026-03-09 — Lean Strategy Engine Plan Expanded (16 Docs)

## [0.22.3] — 2026-03-09 — Lean Strategy Engine Initial Planning (10 Docs)

## [0.22.2] — 2026-03-08 — Hono Sub-Router 404 Fix for Dashboard Insights

## [0.22.1] — 2026-03-07 — CRM Auth Hardening + Fresh Token Pattern

## [0.22.0] — 2026-03-07 — Phase 11: Workflow Automation + Phase 13: Financial Dashboard

- Workflow CRUD (8 routes) + Financial Dashboard (10 routes)
- All 13 dashboard phases complete

## [0.20.0] — 2026-03-07 — Phase 8: Document Management with Supabase Storage

- 7 backend routes, private storage bucket, drag-drop upload, share links

## [0.19.1] — 2026-03-07 — PerformanceChart Recharts Fix

## [0.19.0] — 2026-03-07 — Phase 7: CRM Pipeline Kanban Board

- 9 backend routes, drag-drop kanban, deal detail panel, forecast chart

## [0.18.0] — 2026-03-07 — Database Migrations + Auto-Schema Utility

- 5 SQL migration files + ensure-schema.tsx runtime utility

## [0.17.0] — 2026-03-07 — LinkedIn OIDC Auth + Multi-Provider Login

## [0.16.0] — 2026-03-07 — Google OAuth + Auth Flow Hardening

- Full OAuth flow with race-condition-proof callback, 6 bug fixes

## [0.15.0] — 2026-03-07 — Phase 9 AI Insights + Phase 10 AI Agents + Phase 6 CRM

- 3 full dashboard phases, 9 server routes, 17 components

## [0.14.0] — 2026-03-07 — Live AI Insights, Wizard 401 Fix, Progress Tracker

## [0.13.0] — 2026-03-07 — Dashboard Phases 2–5: Roadmap, Projects, Insights API, Settings

## [0.12.0] — 2026-03-07 — Phase 1: Dashboard Shell + Home

## [0.11.0] — 2026-03-07 — Wizard + Supabase + Edge Functions (5-Step AI Pipeline)

## [0.10.0] — 2026-03-07 — Wizard State Management: localStorage + Cloud Hybrid

## [0.5.0] — 2026-03-01 — Full Content Pages

- Services, Solutions, Industries, Case Studies, Booking, How It Works

## [0.2.0] — 2026-02-28 — Layout & Navigation

## [0.1.0] — 2026-02-27 — Project Foundation

- Vite + React + Tailwind CSS v4, BCG design tokens, shadcn/ui

---

## Architecture Notes

### Data Persistence

All data persistence uses Supabase relational tables with RLS, foreign keys, and indexing. The legacy `kv_store_283466b6` table is preserved for historical data but no code references it.

### Authentication

Supabase Auth handles signup/sign-in. JWT tokens via `Authorization: Bearer {token}` headers. `adminClient()` (singleton, service-role) used for edge function DB operations with application-level `user_id` filtering on all queries. Auth validation via `requireAuth()` which throws for null, invalid, expired, AND anonymous tokens. The legacy `getUserFromToken()` is retained only for rate-limit middleware (needs userId for counting) and wizard save (intentional anonymous support). Frontend `api()` helper includes 401-retry-with-anon-key fallback.

### AI Pipeline

All AI calls go through `callGemini()`: checks `ai_cache` → calls Gemini 3 Flash Preview API with `x-goog-api-key` header, `system_instruction` field, 30s timeout → logs to `ai_run_logs` → caches result → returns parsed JSON.

### Edge Function

Single Hono monolith `make-server-283466b6`. 19 .tsx source files, ~7,000 LOC, 88 routes. CORS restricted via `ALLOWED_ORIGINS` (dev fallback requires `DENO_ENV=development`). Rate limited on AI endpoints. Auth: 33/33 endpoints verified returning 401 for unauthenticated requests.
