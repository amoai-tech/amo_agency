# TODO — AMO AI

**Last verified:** 2026-03-28 (deep codebase audit) | **Version:** v0.31.0 | **Overall Completion:** ~72%
**Production:** https://www.amoai.ca | **API:** https://necxcwhuzylsumlkkmlk.supabase.co/functions/v1/make-server-283466b6
**Edge Function:** `make-server-283466b6` (19 .tsx files, 74 endpoints, 33/33 auth tests passing)
**Database:** 57 tables, 233 RLS policies, 270 indexes, 14 migration files
**Frontend:** 54 routes (30 public, 18 dashboard, 3 auth, 2 wizard, 1 redirect)

---

## A. Core Platform

| Task | Description | Status | % | ✅ Confirmed | ⚠️ Missing/Failing | 💡 Next Action |
|------|-------------|--------|---|-------------|---------------------|----------------|
| Frontend Routes | 54 routes across public, dashboard, wizard, auth | 🟢 Done | 100% | routes.tsx verified: 30 public + 18 dashboard + 3 auth + 2 wizard + 1 redirect | — | — |
| Edge Functions | 74 endpoints across 12 route modules + index | 🟢 Done | 100% | All deployed, health check 200 OK | CLAUDE.md said "68+" — actual is 74 | Update docs |
| Database Schema | 57 tables, 14 migrations, auto-schema | 🟢 Done | 100% | All 14 migrations applied to prod | — | — |
| RLS Policies | 233 policies, user_id scoping | 🟡 Partial | 90% | 180 user_id-scoped, 2 intentional `USING(true)` | 10 strategy tables have permissive `true` — no user scoping | Add org_id columns to strategy tables |
| Auth Hardening | requireAuth on all routes, 33/33 tests | 🟢 Done | 100% | `smoke-test-auth.sh prod` passes | — | — |
| CORS | ALLOWED_ORIGINS whitelist | 🟢 Done | 100% | amoai.ca allowed, evil.com blocked | — | — |
| Error Boundary | Global crash recovery UI | 🟢 Done | 100% | ErrorBoundary class in App.tsx (lines 7-40) wraps AuthProvider + RouterProvider | — | — |

---

## B. Authentication & Authorization

| Task | Description | Status | % | ✅ Confirmed | ⚠️ Missing/Failing | 💡 Next Action |
|------|-------------|--------|---|-------------|---------------------|----------------|
| Email Auth | Signup + signin via Supabase Auth | 🟢 Done | 100% | createUser with email_confirm:true | — | — |
| Google OAuth | Google Cloud Console + Supabase | 🟢 Done | 100% | 302 redirect to accounts.google.com verified | — | — |
| LinkedIn OIDC | LinkedIn Developer Portal config | 🔴 Not Started | 0% | Button exists in AuthPage.tsx | Provider not configured in Supabase | Configure LinkedIn app + add to Supabase |
| Guest Access | Anonymous wizard flow | 🟢 Done | 100% | wizard/save returns 200 without auth | — | — |
| Frontend 401 Handling | Auth failure → signout → redirect | 🟢 Done | 100% | AUTH_FAILURE_EVENT → AuthContext clears user → redirect to /auth | — | — |
| Password Reset | Forgot password flow | 🔴 Not Started | 0% | "Forgot password?" button exists in AuthPage.tsx (line 514) | onClick is empty placeholder comment | Build reset form + email flow |
| Email Verification | Verify email on signup | 🔴 Not Started | 0% | — | Not enforced in Supabase | Enable email confirmation |
| Role-based Route Guards | Admin vs client access | 🔴 Not Started | 0% | — | All routes accessible to any authenticated user | Add role middleware to DashboardLayout |
| Session Refresh | Auto-refresh token on expiry | 🟡 Unknown | ~50% | Basic Supabase auto-refresh works | Edge cases not tested | Verify refresh under expiry conditions |

---

## C. Wizard (5-Step AI Pipeline)

| Task | Description | Status | % | ✅ Confirmed | ⚠️ Missing/Failing | 💡 Next Action |
|------|-------------|--------|---|-------------|---------------------|----------------|
| Step 1: Business Context | Company form + Gemini analysis | 🟢 Done | 100% | Real `POST /analyze-business` with URL Context + Google Search | `simulateAnalysis()` removed ✅ | — |
| Step 2: Industry Diagnostics | Pain points + benchmarks | 🟢 Done | 100% | Real `POST /industry-diagnostics`, 8 questions per industry | — | — |
| Step 3: System Recommendations | AI system ranking + selection | 🟢 Done | 100% | Real `POST /system-recommendations`, 12 systems | — | — |
| Step 4: Executive Summary | Readiness score (pro model) | 🟢 Done | 100% | Real `POST /readiness-score`, 7-section brief | — | — |
| Step 5: Launch Project | Roadmap + onboarding | 🟢 Done | 100% | Real `POST /generate-roadmap` + `/onboarding/complete` | — | — |
| Wizard State | localStorage + cloud sync | 🟢 Done | 100% | WizardContext.tsx, debounced 2s, 7-day TTL | — | — |

---

## D. Dashboard Pages

| Task | Description | Status | % | ✅ Confirmed | ⚠️ Missing/Failing | 💡 Next Action |
|------|-------------|--------|---|-------------|---------------------|----------------|
| `/app/dashboard` | Home with live AI insights | 🟢 Done | 100% | DashboardHome.tsx, real Gemini call via dashboard-insights | — | — |
| `/app/projects` | Projects list | 🟢 Done | 100% | ProjectsList.tsx, wired to projects table | — | — |
| `/app/projects/:id` | Project detail + breadcrumbs | 🟢 Done | 100% | ProjectDetail.tsx with breadcrumb navigation | — | — |
| `/app/roadmap` | Phase timeline view | 🟢 Done | 100% | RoadmapPage.tsx reads roadmap_phases | — | — |
| `/app/settings` | Settings + system health panel | 🟢 Done | 100% | SettingsPage.tsx + SystemHealthPanel.tsx | — | — |
| `/app/insights` | AI insights + readiness radar | 🟢 Done | 100% | InsightsPage.tsx + 5 sub-components | — | — |
| `/app/clients` | Clients list | 🟢 Done | 100% | ClientsListPage.tsx with user_id scoping | — | — |
| `/app/clients/:id` | Client detail + contacts | 🟢 Done | 100% | ClientDetailPage.tsx | — | — |
| `/app/crm/pipelines` | CRM kanban pipeline | 🟢 Done | 100% | CRMPipelinePage.tsx, DealCard.tsx v2, drag-drop, live realtime broadcast | — | — |
| `/app/documents` | Document management | 🟢 Done | 100% | Grid/list, upload to Supabase Storage, share, search, categories | — | — |
| `/app/workflows` | Workflow automation | 🟡 Partial | 70% | CRUD + toggle + templates work | Execution is **SIMULATED** (`success: true` hardcoded, `Math.random()` duration) | Build real action dispatcher |
| `/app/financial` | Financial dashboard | 🟡 Partial | 90% | Invoices, payments, charts, profitability — full CRUD | `mrr_trend: 8.2` and `revenue_trend: 12.1` are hardcoded constants; no PDF export; no Stripe | Fix trends + add PDF export |
| `/app/strategy` | Strategy engine | 🟢 Done | 100% | 3x3 lean canvas, 5-agent parallel Gemini analysis, versioning, intelligence panel | Canvas presence tracking missing | — |
| `/app/agents` | Agent monitoring | 🟢 Done | 100% | Run logs, cache stats, token usage, performance chart | — | — |
| `/app/agents/catalog` | Agent catalog (131 agents) | 🟢 Done | 100% | AgentCatalogPage: browse, filter, search, division tags | — | — |
| `/app/agents/catalog/:slug` | Agent detail page | 🟢 Done | 100% | Full profile, capabilities, related agents | — | — |
| `/app/agents/catalog/:slug/run` | Agent runner | 🟢 Done | 100% | Real Gemini call via 4-layer prompt compiler | — | — |
| `/app/agents/system-map` | System architecture diagram | 🟢 Done | 100% | Interactive system map | — | — |

---

## E. Edge Functions (API — 74 endpoints)

| Task | Description | Status | % | ✅ Confirmed | ⚠️ Missing/Failing | 💡 Next Action |
|------|-------------|--------|---|-------------|---------------------|----------------|
| `index.tsx` | Hono entry, health, signup, dashboard-insights | 🟢 Done | 100% | 4 endpoints, all modules mounted | — | — |
| `ai-routes.tsx` | 5 wizard AI + 3 monitoring | 🟢 Done | 100% | 8 endpoints: analyze-business, diagnostics, recommendations, readiness, roadmap + stats | — | — |
| `wizard-routes.tsx` | Session CRUD | 🟢 Done | 100% | 3 endpoints: create, get, save | — | — |
| `crm-routes.tsx` | Clients + contacts CRUD | 🟢 Done | 100% | 6 endpoints with user_id scoping | — | — |
| `pipeline-routes.tsx` | Pipelines, deals, interactions | 🟢 Done | 100% | 9 endpoints, N+1 query fixed, realtime broadcast | — | — |
| `document-routes.tsx` | Document CRUD + Supabase Storage | 🟢 Done | 100% | 7 endpoints, filename sanitization | — | — |
| `workflow-routes.tsx` | Workflow CRUD + execution | 🟡 Partial | 70% | 8 endpoints, CRUD works | `/run` returns `success: true` unconditionally (line 255); `Math.random()` duration (line 261) | Build real action dispatcher |
| `financial-routes.tsx` | Invoices, payments, charts | 🟢 Done | 95% | 10 endpoints, status workflow enforced | `mrr_trend: 8.2` hardcoded (line 67) | Compute from data |
| `strategy-routes.tsx` | Canvas, insights, analyze | 🟢 Done | 100% | 14 endpoints, 5-agent parallel analysis, budget/rate limiting | — | — |
| `onboarding-routes.tsx` | Wizard → DB conversion | 🟢 Done | 100% | 2 endpoints, idempotent | — | — |
| `agent-routes.tsx` | Agent run, match, history | 🟢 Done | 100% | 3 endpoints, honesty + calibration fragments injected | — | — |
| `insight-routes.tsx` | Insight cards CRUD | 🟢 Done | 100% | 3 endpoints, correct slugs + compilePrompt (fixed v0.31.0) | No UI trigger for generation | Wire to dashboard |
| `gemini.tsx` | AI client wrapper | 🟢 Done | 100% | 3 models (flash/pro/lite), SHA-256 cache, 30s timeout, ai_run_logs | — | — |
| `agent-loader.tsx` | 4-layer prompt compiler | 🟡 Partial | 12% | extractExcerpt, compilePrompt work | Only 16 of 131 agents runtime-compilable (115 are catalog-only) | Expand agent registry |
| `auth.tsx` | JWT validation, requireAuth, createUser | 🟢 Done | 100% | Rejects null, invalid, expired, anonymous tokens | — | — |
| `rate-limit.tsx` | Sliding window rate limiter | 🟡 Bug | 60% | Wired to 5 route patterns | **Global not per-user** — query has no `.eq("user_id", userId)` filter (line 32) | Add user_id filter |
| `kv_store.tsx` | DEPRECATED | 🟥 Legacy | 0% | Marked deprecated (line 1), zero imports | File still on disk (3.2KB) | Delete file |

---

## F. AI Agent System

| Task | Description | Status | % | ✅ Confirmed | ⚠️ Missing/Failing | 💡 Next Action |
|------|-------------|--------|---|-------------|---------------------|----------------|
| Gemini Client | Flash + Pro + Lite models | 🟢 Done | 100% | `gemini-3-flash-preview`, `gemini-3.1-pro-preview`, `gemini-3.1-flash-lite-preview` | — | — |
| AI Caching | SHA-256 prompt cache | 🟢 Done | 100% | ai_cache table, 24h/7d TTL | — | — |
| AI Run Logging | All calls logged | 🟢 Done | 100% | ai_run_logs: tokens, duration, success/fail | — | — |
| Agent Catalog (DB) | 131 agents seeded | 🟢 Done | 100% | agent-index.json (131 entries), agent_catalog table | — | — |
| Agent Catalog (UI) | Browse, search, filter | 🟢 Done | 100% | AgentCatalogPage, AgentDetailPage, AgentRunnerPage | — | — |
| Agent Execution | POST /agents/run | 🟢 Done | 100% | Real 4-layer prompt → Gemini, honesty + calibration injected | — | — |
| Agent Matching | POST /agents/match | 🟢 Done | 100% | Deterministic scoring (+25 system, +15 industry, +10 goal, +12 extras) | — | — |
| Team Templates | 17 pre-built templates | 🟢 Done | 100% | agent_team_templates table, 73 agent roles, 7 industries | — | — |
| Agent Monitoring | Run logs, cache, token usage | 🟢 Done | 100% | AgentsPage.tsx with realtime auto-refresh | — | — |
| Prompt Fragments | 3 reusable fragments | 🟢 Done | 100% | honesty-protocol.ts, stage-calibration.ts, scoring-rubrics.ts | — | — |
| Strategy AI Analysis | 5 parallel agents on canvas | 🟢 Done | 100% | strategy-synthesize, opportunity-detect, metrics-interpret + 2 more | — | — |
| Insight Cards | Per-project AI insights | 🟢 Done | 100% | 3 endpoints, correct slugs + signatures (fixed v0.31.0) | — | — |
| Runtime Agent Registry | Agents with compilable prompts | 🟡 Partial | 12% | 16 of 131 agents have runtime excerpts | 115 agents are catalog-only (no prompt compilation) | Expand agent-loader.tsx registry |
| Agent Assignment | Assign agents to client projects | 🔴 Not Started | 0% | — | No assignment UI, no workflow | Build assignment flow |
| AI Cost Tracking | Dollar cost per generation | 🔴 Not Started | 0% | Token counts logged but not priced | No cost calculation anywhere | Add estimatedCostCents to ai_run_logs |
| Chat / AI Assistant | Multi-turn conversation UI | 🔴 Not Started | 0% | Design doc exists at `/plan/plan/04-chatbot/` | No chat component, no routes, no history table | Design + build chat UI + backend |

---

## G. CRM Pipeline

| Task | Description | Status | % | ✅ Confirmed | ⚠️ Missing/Failing | 💡 Next Action |
|------|-------------|--------|---|-------------|---------------------|----------------|
| Kanban Board | Drag-drop pipeline view | 🟢 Done | 100% | CRMPipelinePage.tsx, StageColumn.tsx | — | — |
| Deal Cards | Cards with health bar + agent attribution | 🟢 Done | 100% | DealCard.tsx v2, DealHealthBar, keyboard nav (Enter) | — | — |
| Deal Scoring | 5-factor deterministic score | 🟢 Done | 100% | dealScoring.ts | — | — |
| Deal CRUD | Create, update, move, delete | 🟢 Done | 100% | pipeline-routes.tsx (9 endpoints), DealQuickCreate | — | — |
| Contacts | Contact management per deal/client | 🟢 Done | 100% | first_name, last_name, job_title columns | — | — |
| Interactions | Call, email, meeting, note logging | 🟢 Done | 100% | crm_interactions table + API | — | — |
| Forecast | Pipeline forecast visualization | 🟢 Done | 100% | ForecastChart.tsx | — | — |
| Realtime | Live deal updates via broadcast | 🟢 Done | 100% | useRealtimeDealUpdates hook | — | — |
| Stale Deal Alerts | Auto-flag deals inactive 14+ days | 🔴 Not Started | 0% | Prompt 068 planned | No cron, no notification system | Implement as cron + notification |
| Deal Analytics | Conversion rates, time-in-stage | 🔴 Not Started | 0% | — | No per-deal analytics | Add metrics |

---

## H. Strategy Engine

| Task | Description | Status | % | ✅ Confirmed | ⚠️ Missing/Failing | 💡 Next Action |
|------|-------------|--------|---|-------------|---------------------|----------------|
| Lean Canvas | 9-block editable canvas | 🟢 Done | 100% | LeanCanvasPanel.tsx, inline editing | — | — |
| Version History | Canvas snapshots with diff | 🟢 Done | 100% | CanvasVersionHistory.tsx, lean_canvas_versions table | — | — |
| 5-Agent Analysis | Parallel Gemini analysis | 🟢 Done | 100% | POST /strategy/analyze, AnalysisProgressSheet | — | — |
| Per-block AI | AI suggestions per canvas block | 🟢 Done | 100% | POST /strategy/synthesize-block | — | — |
| Intelligence Panel | Insights, opportunities, recommendations | 🟢 Done | 100% | IntelligencePanel.tsx | — | — |
| Budget/Rate Limiting | Analysis frequency controls | 🟢 Done | 100% | strategy_budgets table | — | — |
| Agent Memory | Persistent memory for strategy agents | 🟢 Done | 100% | strategy_agent_memory table with relevance_score | — | — |
| Realtime Sync | Live canvas collaboration | 🟢 Done | 100% | useRealtimeCanvasSync hook | Presence tracking missing | Add cursor presence |
| Strategy RLS | Table-level security | 🟡 Issue | 50% | Policies exist | 10 tables have permissive `true` — no user_id scoping | Add org_id columns |
| Export to PDF | Strategy export | 🔴 Not Started | 0% | — | No export functionality | Add PDF export |

---

## I. Workflow & Automation

| Task | Description | Status | % | ✅ Confirmed | ⚠️ Missing/Failing | 💡 Next Action |
|------|-------------|--------|---|-------------|---------------------|----------------|
| Workflow CRUD | Create, update, delete, toggle | 🟢 Done | 100% | All with requireAuth + user_id scoping | — | — |
| Workflow Templates | Install pre-built templates | 🟢 Done | 100% | POST /install-template works | — | — |
| Workflow Execution | Run actions (email, webhook) | 🔴 Simulated | 5% | — | `success: true` hardcoded (line 255), `Math.random()` duration (line 261) | Build real action dispatcher |
| Cron Jobs | Scheduled workflow execution | 🔴 Not Started | 0% | — | No pg_cron, no vercel.json cron, no scheduler | Add cron infrastructure |
| Stale Deal Alerts | Flag deals inactive 14+ days | 🔴 Not Started | 0% | Prompt 068 exists | No implementation | Implement as cron + notification |
| Health Check Cron | Weekly client health scoring | 🔴 Not Started | 0% | Prompt 067 exists | No implementation | Build as scheduled function |

---

## J. Realtime

| Task | Description | Status | % | ✅ Confirmed | ⚠️ Missing/Failing | 💡 Next Action |
|------|-------------|--------|---|-------------|---------------------|----------------|
| CRM Pipeline | Live deal updates via broadcast | 🟢 Done | 100% | useRealtimeDealUpdates hook + broadcast trigger | — | — |
| Wizard Sync | Multi-tab session sync | 🟢 Done | 100% | Via Supabase channel | — | — |
| Canvas Sync | Live canvas collaboration | 🟢 Done | 100% | useRealtimeCanvasSync hook | — | — |
| DB Triggers | Broadcast triggers on tables | 🟢 Done | 100% | 5 triggers: ai_run_logs, wizard_sessions, crm_deals, lean_canvases, lean_canvas_versions | — | — |
| Dashboard Realtime | Live updates on other pages | 🔴 Not Started | 0% | — | Financial, docs, workflows are static (no realtime) | Add broadcast to other modules |
| Canvas Presence | Who's editing what | 🔴 Not Started | 0% | — | No presence tracking | Build with Supabase presence |

---

## K. Database

| Task | Description | Status | % | ✅ Confirmed | ⚠️ Missing/Failing | 💡 Next Action |
|------|-------------|--------|---|-------------|---------------------|----------------|
| Tables | 57 tables across 14 migrations | 🟢 Done | 100% | All applied to production | — | — |
| RLS Policies | 233 policies | 🟡 Partial | 90% | 180 user_id-scoped, 2 intentional permissive | 10 strategy tables permissive | Add org_id scoping |
| Indexes | 270 indexes, duplicates cleaned | 🟢 Done | 100% | 27 redundant dropped (incl. 2 IVFFlat at 1.6MB each) | — | — |
| Realtime Triggers | 5 broadcast triggers | 🟢 Done | 100% | Verified on 5 tables | — | — |
| Agent Tables | agent_catalog, agent_runs, insight_cards | 🟢 Done | 100% | 131 agents seeded, 17 team templates | — | — |
| Migration Naming | Timestamp collision | 🟡 Issue | — | Both applied manually | Two files at 20260310120000 → renamed to ...120001 | Verify db push works |
| Vector Extension | pgvector installed | 🟡 Unused | 10% | Extension present in `extensions` schema | IVFFlat indexes intentionally dropped; no embedding tables | Build when RAG starts |
| Database Backups | Scheduled backups | 🔴 Not Started | 0% | — | No backup schedule configured | Configure in Supabase |

---

## L. Marketing Site (Public Pages)

| Task | Description | Status | % | ✅ Confirmed | ⚠️ Missing/Failing | 💡 Next Action |
|------|-------------|--------|---|-------------|---------------------|----------------|
| Homepage | Landing page (HomePageV3) | 🟢 Done | 100% | Full marketing layout with hero, services, CTA | — | — |
| Solutions | Solutions overview | 🟢 Done | 100% | SolutionsPage.tsx | — | — |
| Industries | Industry vertical pages (8+) | 🟢 Done | 100% | SaaS, real-estate, fashion, ecommerce, events, agencies, legal, professional-services | — | — |
| About | Company info | 🟢 Done | 100% | AboutPage.tsx | — | — |
| Process | Process overview | 🟢 Done | 100% | ProcessPage.tsx | — | — |
| Projects | Case studies | 🟢 Done | 100% | ProjectsPage.tsx | — | — |
| Agents | AI agents showcase | 🟢 Done | 100% | AgentsPage.tsx (public) | — | — |
| Chatbots | Chatbot services | 🟢 Done | 100% | ChatbotsPage.tsx (marketing only — not functional chat) | — | — |
| Booking | Consultation scheduling | 🟢 Done | 100% | BookingPage.tsx | — | — |
| Style Guide | Design system showcase | 🟢 Done | 100% | StyleGuidePage.tsx + StyleGuideComponents.tsx | — | — |
| Services (6 pages) | Web design, MVP, AI agents, CRM, web apps, WhatsApp | 🟢 Done | 100% | Service-specific pages under /services/ | — | — |
| Cloudinary Images | Service card images | 🟡 Partial | 71% | 10/14 migrated | 4 remaining (Story, 3 Specialized Services) | Migrate remaining images |

---

## M. DevOps & Quality

| Task | Description | Status | % | ✅ Confirmed | ⚠️ Missing/Failing | 💡 Next Action |
|------|-------------|--------|---|-------------|---------------------|----------------|
| Vercel Deployment | Frontend at www.amoai.ca | 🟢 Done | 100% | Project sunaiagencyproject100, team amo100 | — | — |
| Edge Function Deploy | make-server-283466b6 | 🟢 Done | 100% | 1.048MB deployed, 33/33 auth tests | Manual deploy only | Automate with CI |
| Auth Smoke Tests | 33 endpoint verification | 🟢 Done | 100% | scripts/smoke-test-auth.sh | — | — |
| CI/CD Pipeline | GitHub Actions auto-deploy | 🔴 Not Started | 0% | — | No `.github/workflows/` directory | Create workflow: build + type-check + smoke test |
| Test Runner | Vitest for components | 🔴 Not Started | 0% | — | No vitest.config, no test scripts in package.json, zero .test.tsx files | Set up Vitest + first tests |
| Error Monitoring | Sentry | 🔴 Not Started | 0% | — | Only marketing mention in ServicesTechStack.tsx; no actual integration | Add @sentry/react to frontend + edge functions |
| Bundle Splitting | Code-split 2.6MB main chunk | 🔴 Not Started | 0% | — | Single large bundle | Add dynamic imports + manualChunks in vite.config |
| Input Validation | Zod schemas on endpoints | 🔴 Not Started | 0% | — | POST/PUT accept any values | Add zod or manual validation |
| userClient + RLS | Replace adminClient pattern | 🔴 Not Started | 0% | — | All routes use service-role bypass | Major architectural migration |

---

## N. Advanced Features (Not Started)

| Task | Description | Status | % | ✅ Confirmed | ⚠️ Missing/Failing | 💡 Next Action |
|------|-------------|--------|---|-------------|---------------------|----------------|
| Chat/AI Assistant | RAG-powered client concierge | 🔴 Not Started | 0% | 200+ line design doc at `/plan/plan/04-chatbot/`; ChatbotInterfaceDemo.tsx is marketing mockup only | No chat routes, no history table, no message UI, no conversation state | Design + build: intent orchestrator → chat UI → backend |
| RAG/Embeddings | pgvector semantic search | 🔴 Not Started | 0% | pgvector installed; IVFFlat indexes intentionally dropped (migration 20260310140000) | No embedding tables, no queries, no pipeline | Build embedding pipeline when needed |
| Industry Packs | 8 verticals, 7-layer structure | 🔴 Not Started | 0% | Planning at `/plan/plan/05-services-industry/`; agent team templates done (17 templates) | No industry_packs table, no services/playbooks per vertical | Seed 8 packs |
| Services Catalog | 98 services, 15 families | 🔴 Not Started | 0% | Planning at `/plan/plan/09-revenue/` | No services_catalog table, no schema, no UI, no routes | Create schema + seed |
| Playbooks/SOPs | Operational knowledge base | 🔴 Not Started | 0% | Planning at `/plan/plan/05-services-industry/` | No playbooks table, no content, no pipeline | Build after RAG |
| Stripe Billing | Subscription management | 🔴 Not Started | 0% | Financial dashboard has invoices/payments but no Stripe | No Stripe Elements, no checkout, no payment processing | Build after services catalog |
| Invoice PDF | Generate downloadable invoices | 🔴 Not Started | 0% | — | Financial dashboard has no export | Add PDF generation |
| Cmd+K Command Bar | Dashboard command palette | 🔴 Not Started | 0% | — | No implementation | Build after chat |
| Canvas Presence | Who's editing which block | 🔴 Not Started | 0% | — | No cursor tracking | Build with Supabase presence |
| Agent Assignment | Assign agents to client projects | 🔴 Not Started | 0% | — | No assignment UI or workflow | Build UI + API |

---

## O. Tech Debt & Cleanup

| Task | Description | Status | % | ✅ Confirmed | ⚠️ Missing/Failing | 💡 Next Action |
|------|-------------|--------|---|-------------|---------------------|----------------|
| Delete kv_store.tsx | Deprecated KV abstraction | 🟡 Pending | 0% | Marked deprecated (line 1), zero imports, 3.2KB | File still on disk | Delete file |
| Remove useSupabaseRealtime | Legacy postgres_changes hook | 🟡 Pending | 0% | Replaced by broadcast hooks | Still in codebase | Remove hook |
| Fix migration collision | Two files at 20260310120000 | 🟡 Pending | 0% | One renamed to ...120001 | Verify `db push` works | Test push |
| Expand agent registry | 16 → 131 runtime agents | 🟡 Planned | 12% | 16 agents have excerpts | 115 are catalog-only | Expand agent-loader.tsx |

---

## Bug Fixes Needed

| Bug | Severity | File | Line | Details |
|-----|----------|------|------|---------|
| Rate limiter is global not per-user | 🟡 Medium | rate-limit.tsx | 32 | Query counts ALL ai_run_logs — no `.eq("user_id", userId)` filter. One heavy user blocks everyone. |
| Financial trends hardcoded | 🟡 Low | financial-routes.tsx | 67-69 | `mrr_trend: 8.2` and `revenue_trend: 12.1` are constants, not computed from data |
| ensure-schema retry blocked | 🟡 Low | ensure-schema.tsx | 138 | `migrationDone = true` on failure prevents retry on next request |
| Strategy RLS permissive | 🟡 Medium | 10 strategy tables | — | Policies use `USING(true)` with no user_id scoping |
| ~~insight-routes.tsx bugs~~ | 🟢 Fixed | insight-routes.tsx | — | Fixed in v0.31.0: correct slugs, compilePrompt signature |
| ~~Financial forecast Math.random()~~ | 🟢 Fixed | financial-routes.tsx | — | Fixed in v0.30.0: deterministic average-based projection |

---

## Priority Next Steps

### P0 — Quick Wins (< 1 hour each)
1. **Fix per-user rate limiting** — Add `.eq("user_id", userId)` to rate-limit.tsx line 32
2. **Delete kv_store.tsx** — Zero imports, deprecated since v0.28.0

### P1 — Launch Readiness (1-3 days)
3. **LinkedIn OIDC** — Configure provider in Supabase Dashboard
4. **Password reset flow** — Build form + email flow (AuthPage placeholder exists)
5. **Skills Phase 2** — Wire scoring-rubrics into strategy-routes `/analyze`
6. **Strategy RLS fix** — Add org_id columns to 10 permissive strategy tables

### P2 — Production Quality (1-2 weeks)
7. **CI/CD** — GitHub Actions: build + type-check + smoke test on PR, auto-deploy on merge
8. **Sentry** — Error monitoring for frontend + edge functions
9. **Test suite** — Set up Vitest, write first component + API tests
10. **Chat/AI assistant** — Multi-turn conversation UI (biggest new feature gap)
11. **Real workflow execution** — Action dispatcher for email/webhook/notification triggers
12. **Bundle splitting** — Dynamic imports for 2.6MB main chunk

### P3 — Growth Features (1+ months)
13. **Services catalog** — Schema + seed + UI for 98 planned services
14. **Industry packs** — Full 7-layer packs beyond agent templates
15. **RAG/Embeddings** — Build embedding pipeline for vector search
16. **Stripe billing** — Payment processing integration

---

## Completed History

<details>
<summary>v0.31.0 — Skills Integration Phase 1 (2026-03-18)</summary>

- Fixed 3 bugs in insight-routes.tsx (wrong slugs, wrong sections, wrong compilePrompt signature)
- Created 3 prompt fragments: honesty-protocol, stage-calibration, scoring-rubrics
- Wired honesty + calibration into agent-routes and strategy-routes
- Created skills integration plan (02-skills-plan.md) + 9 mermaid diagrams (03-skills-diagrams.md)
- Edge function deployed (1.048MB), 6/6 verification tests passing
</details>

<details>
<summary>v0.30.1 — Frontend 401 Handling + Error Boundary (2026-03-18)</summary>

- api() auth failure event replaces silent anon-key fallback
- AuthContext auto-signout on persistent 401 → redirect to /auth
- DealDetailPanel, FinancialDashboardPage, WorkflowAutomationPage token fixes
- Global React ErrorBoundary added to App.tsx
- All 12 dashboard files use consistent 'use-fresh-token' pattern
</details>

<details>
<summary>v0.30.0 — Auth Hardening (2026-03-18)</summary>

- 11 critical + 12 high + 16 medium security findings fixed
- All 13 route modules use `requireAuth()`, user_id scoping, ownership verification
- N+1 pipeline query fixed, rate limiter fixed, insight query bug fixed
- Dead code cleaned, stale dirs deleted, singleton adminClient
- 33/33 production auth tests passing
</details>

<details>
<summary>v0.29.1 — RLS Migration + Schema Fix (2026-03-15)</summary>

- 13 tables hardened with user_id columns + scoped RLS policies
- Onboarding schema fix, ensure-schema self-healing
- Google OAuth verified, edge function v52 deployed
</details>

<details>
<summary>v0.29.0 — Security & Rate Limiting (2026-03-15)</summary>

- Gemini client hardened (API key in header, 30s timeout, system_instruction)
- CORS restriction, RLS migration, rate limiting, tech debt cleanup
- 20 orphan edge functions deleted
</details>

<details>
<summary>v0.28.0 — KV Migration + Gemini Model Update (2026-03-13)</summary>

- 3 route modules migrated from KV to Supabase tables
- Gemini model: gemini-2.0-flash → gemini-3-flash-preview
</details>

<details>
<summary>v0.27.0 — Agent Catalog + CRM Scoring (2026-03-13)</summary>

- 131-agent catalog, deal health scoring, agent team widget
</details>

<details>
<summary>v0.26.x — Agent Loader + Strategy Engine (2026-03-13)</summary>

- Agent-loader.tsx, 6 shared components, strategy engine complete
- Architecture diagrams, system map, ER diagram
</details>

<details>
<summary>v0.25.0 — Onboarding Agent (2026-03-10)</summary>

- Wizard → project/client/roadmap record creation
</details>

<details>
<summary>v0.22.0-v0.24.x — Dashboard + Realtime + Auth (2026-03-07-09)</summary>

- All 14 dashboard phases, CRM pipeline with realtime
- Auth split-screen UI, Google OAuth, 4 realtime channels
</details>

<details>
<summary>v0.11.0-v0.21.0 — Wizard + Edge Functions + Content (2026-03-07)</summary>

- 5-step wizard, Supabase integration, all content pages
</details>

---

## Project Stats

| Metric | Value | Source |
|--------|-------|--------|
| Frontend Routes | 54 (30 public + 18 dashboard + 3 auth + 2 wizard + 1 redirect) | routes.tsx |
| Dashboard Components | 64 .tsx files across 8 subdirectories | src/components/dashboard/ |
| Edge Function Endpoints | 74 across 12 modules + index | Verified count |
| Server Source Files | 19 .tsx in make-server-283466b6/ | Listing |
| Realtime Channels | 2 active hooks (CRM pipeline + canvas sync) + 5 DB triggers | Codebase |
| Auth Methods | 4 working (email, signup, Google OAuth, guest) + 1 not configured (LinkedIn) | AuthPage.tsx |
| Database Tables | 57 | Migrations |
| RLS Policies | 233 (180 user_id-scoped, 10 permissive strategy, 2 intentional shared) | Audit |
| Migrations | 14 .sql files | supabase/migrations/ |
| Agent Catalog | 131 agents, 10 divisions | agent-index.json |
| Agent Runtime | 16 runtime-compilable (12%) | agent-loader.tsx |
| Team Templates | 17 templates, 73 roles, 7 industries | agent_team_templates |
| Prompt Fragments | 3 (honesty-protocol, stage-calibration, scoring-rubrics) | fragments/ |
| Auth Tests | 33/33 production passing | smoke-test-auth.sh |
| Test Coverage | 0% (no test framework, zero test files) | package.json |
| CI/CD | None (manual deploy) | No .github/workflows/ |
| Error Boundary | Global ErrorBoundary in App.tsx | App.tsx:7-40 |
| Build Size (JS) | ~2.6MB (single chunk, no splitting) | vite build |
| Edge Function Size | 1.048MB | Deploy log |
| Current Version | v0.31.0 | CHANGELOG.md |

---

## Status Legend

- 🟢 **Done** — Fully functional, deployed, and verified
- 🟡 **Partial / Issue** — Built but incomplete or has known issues
- 🔴 **Not Started / Simulated** — Planned but no real implementation
- 🟥 **Blocked / Legacy** — Deprecated or missing dependency
