# PR #3 — Release evidence and remaining gates (14 November 2026)

This PR keeps GitHub as the deployable source; Figma Make is design/source reference only.

## Implemented on PR branch

- Restored NEXUS routes, deterministic action dispatcher, expanded agent catalog and onboarding/roadmap integration from the existing deployed function, retaining AMO AI branding.
- Replaced privileged auto-confirm signup with Supabase Auth email verification; legacy signup POST now returns 410.
- Added verified-user atomic AI request quota (single Postgres upsert RPC), user-owned AI run logs, and private per-user Realtime topics.
- Removed exposure of global cached-AI analytics to signed-in customers.
- Restricted wizard session save/load/list to the owning user, including atomic claiming of guest sessions.
- Restricted CRM clients, contacts, deals, moves, interactions and per-pipeline deal counts to the signed-in user. CRM pipelines/stages are shared templates.
- Validated AI-written Lean Canvas target column names; guarded malformed JSON and stage/client/contact references.
- Fixed small-phone overflow on web-design page.
- Added GitHub Actions PR validation including strict Deno check, static security-contract tests, Vite production build and Playwright browser tests.
- Added generated Supabase DB schema types to the Edge Function build in `supabase/functions/_shared/database.types.ts`.

## Verified with concrete evidence

| Gate | Result | Scope |
|---|---|---|
| Deno strict check | PASS: **0 diagnostics** (was 86) | Full deployed Edge Function entry graph |
| Frontend Vite build | PASS, bundle size warning | Local release build |
| Source-contract tests | PASS: **8/8** | Static code and route assertions |
| Playwright browser tests | PASS: **19/19** | Public routes, logged-out guards, static assets, 390px mobile, mocked authentication |
| PostgreSQL 17 migration test | PASS | 3 users; log ownership, RLS, private broadcasts, RPC grants |
| Concurrent per-user quotas | PASS | 20 parallel calls: 5 allowed, 15 blocked; other user unaffected |
| Fresh local Supabase stack | PASS with local bootstrap workaround | Existing migrations + hardened migration |
| Real local Supabase email verification | PASS | Two signups; emails delivered to local Mailpit; verification links followed; sign-in and JWT getUser passed |
| Authenticated wizard integration | PASS | 3-step save/load; separate user cannot read/write/list another's wizard |
| Authenticated CRM integration | PASS | Client, contact, deal, move and interaction; cross-user read/write/delete denied; fixtures removed |
| Authenticated onboarding/NEXUS integration | PASS | 7 phases, 3 dispatched job records, private status; gate blocks premature advance |
| Real authenticated browser UI | PASS | Actual local Supabase login; dashboard, CRM, AI agents; desktop 1280px + phone 390px, no page JS errors |
| Hosted Supabase migration | **APPLIED** | AMO AI Supabase project; remote migration version `20261114094419` |
| Hosted SQL security verification | PASS | Private RLS policies, service-only RPC, old executable helper revoked, 0 preexisting AI log rows |

The hosted security advisor no longer reports the prior PUBLIC-executable `rls_auto_enable()` finding. It still notes leaked-password protection disabled; the RLS-no-policy information item on the service-only quota table is intentional (no client access).

## Remaining production release gates (not certified)

1. **Hosted email delivery and URL configuration.** Public Supabase Auth settings show signups enabled and `mailer_autoconfirm=false`. This proves hosted email confirmation is required, not that hosted SMTP delivery or `https://www.amoai.ca/auth/callback` is correctly configured. Local Mailpit is not a hosted email test.
2. **Real Gemini output and jobs.** NEXUS created 3 job records, but no Gemini API key was used locally; downstream successful AI inference and external actions remain unverified.
3. **Backend readiness/health.** Local health endpoint returned HTTP 200 despite an error in `schema` and `onboardingSchema` direct-Postgres checks (`getaddrinfo ENOTFOUND` inside local edge runtime). Treat this as a separate launch blocker; don't rely on HTTP 200 only.
4. **New GitHub CI with strict Deno gate.** Confirm green on latest commit, not merely a local pass.
5. **Production release sequencing.** The DB migration is installed, but the new Edge Function and AMO AI Vercel frontend are **not deployed**; PR #3 is **not merged**. Verify complete preview, deep-route canonical links, redirects, and rollback before merging.
6. **Auth password security.** Supabase advisor reports leaked-password protection disabled; enable in Supabase Auth settings if supported by plan.
7. **AI log provenance / caching.** Some Gemini invocations lack wizard session and may not assign an AI log owner; shared `ai_cache` keys should be reviewed before multi-tenant use.

## Schema migration note

- Local migration filename now matches Supabase's **actual remote history version `20261114094419`** to prevent duplicate application during `supabase db push`.
- Existing migrations `20260618000001`–`04` were **not modified in GitHub**.
- A fresh local Supabase 2026 startup failed on the older migration's `ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY` due protected table ownership. That one statement was removed **temporarily in the isolated local test checkout**, then the original migration file was restored; fresh-install compatibility requires a separate forward fix or appropriate versioned setup.
- Production project had 0 `ai_run_logs` rows before migration; backfill was a no-op.

## Safe release order

Verify latest GitHub checks + hosted email delivery + AI job output + backend health and SEO preview → deploy matching Edge Function → authenticated production-safe smoke tests → review/merge PR #3 → deploy Vercel frontend and verify domain → monitor/rollback if needed.

No PR merge, production Edge Function deployment, Vercel production deployment, or production test-user signup was performed during this round. Only the forward-only database migration was applied to the hosted AMO AI Supabase project.
