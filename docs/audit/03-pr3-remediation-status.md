# PR #3 — Remediation and release gates (November 14, 2026)

This branch keeps GitHub as the primary source; it does not overwrite the existing React app with Figma Make.

## Changes in this PR

- Restore the NEXUS backend from the active Supabase Edge Function: orchestrator routes, action dispatcher, expanded agent catalog, onboarding and AI roadmap integration.
- Replace public admin-created, automatically confirmed signup with Supabase Auth's client-side email-verification flow. The legacy POST `/signup` endpoint now returns HTTP 410.
- Limit costly AI routes per **verified account ID** through an atomic Postgres RPC instead of globally counting unrelated customers' AI runs.
- Add an additive, forward-only Supabase migration for user-owned AI logs, per-user Realtime topics and per-user atomic quota.
- Scope AI run history and metrics to the signed-in user; suppress globally shared cache telemetry until per-user cache ownership is implemented.
- Repair a 390px mobile overflow on the web-design comparison section.
- Add Playwright smoke tests and GitHub Actions PR validation.

## Verified on isolated local PR checkout

- `npm ci`: PASS.
- `npm run build`: PASS (Vite bundle-size warnings).
- `npm run test:security`: 5/5 source-contract checks PASS. These are **not** database or API integration tests.
- `npm run test:e2e`: 16/16 browser tests PASS against a locally built site.
- CI-equivalent build/browser run using fake public Supabase variables: PASS.
- Logged-out routes `/app/dashboard`, `/app/crm/pipelines`, `/app/agents` redirect to sign-in.
- Signup test uses a mocked Supabase response; NO real user account created.

## Blockers before production deployment / merge

1. **Migration not deployed:** `supabase/migrations/20261114082405_harden_ai_logs_and_rate_limits.sql` is required **before** the new Edge Function rate-limiting code. Review, test in staging, apply via normal migration workflow, verify policy/RPC behavior with two separate users.
2. **Deno type-check FAIL:** `deno check --node-modules-dir=auto --min-dep-age=0 supabase/functions/make-server-283466b6/index.ts` produced **86 TS diagnostics**, including existing strategy/workflow typing and NEXUS code from the active function. Must resolve/type-check before backend release; the Vite build does not type-check the Edge Function.
3. **Supabase Auth settings:** enable and test *Confirm email* plus approved redirect URLs for `https://www.amoai.ca/auth/callback`. Signup must not auto-confirm; test real email delivery separately.
4. **Authenticated end-to-end tests not certified:** add test identities and fixtures to verify wizard save/load, dashboard, CRM interactions, agent execution, two-user data isolation, NEXUS dispatch and approval, and quota concurrent requests. Existing browser checks cover public pages, signed-out guards and mocked signup only.
5. **Tenant-scoped caching:** `ai_cache` is shared by design. Client cache metrics are blocked to prevent cross-account data disclosure, but cache-key isolation and privacy should be reviewed.
6. **Wizard ownership:** the existing service-role wizard endpoints need an ownership/security audit, especially session ID-based loads/saves.
7. **SEO:** inspect canonical links on deep routes, indexable pages and deployed static robots/sitemap on the Vercel preview; do not blindly merge.
8. **CI:** inspect actual GitHub Actions run for this PR commit (local pass is not proof of hosted CI).

## Safe release sequence

Staging tests → review & apply forward-only database migration → verify auth, RLS, quota and NEXUS → deploy updated Edge Function → certify signed-in user journeys and Deno check → merge PR and release frontend on Vercel → production smoke/rollback check.

**No production SQL migrations, Edge Function redeployments, or PR merge were performed in this round.**
