# CLAUDE.md — AMO AI Platform

> Context file for AI assistants working on the AMO AI codebase.
> Last updated: 2026-03-28 | Version: v0.31.0 | Overall: ~79% complete

---

## Project Summary

**AMO AI** is an AI consulting platform that guides businesses through structured discovery into actionable projects. Think of it as a digital consultant — observant, structured, transparent, and human-controlled.

**Core flow:** 5-step wizard → Executive brief → Project dashboard → Ongoing delivery

**Philosophy:** Structure first. Intelligence second. Automation last.

**Core principle:** AI proposes, human decides. Never surprise the user. Never auto-commit changes. Always explain reasoning.

**Owner:** Sanjiovani (solo founder/developer)
**Production:** https://www.amoai.ca (Vercel)
**API:** Supabase Edge Functions (`make-server-283466b6`, 19 files, 74 endpoints)
**Database:** 57 tables, 233 RLS policies, 270 indexes, 14 migration files
**Repository:** /home/sk/sunv2/

---

## Tech Stack

| Layer | Technology | Status |
|-------|------------|--------|
| Frontend | React 18.3 + TypeScript 5 + Vite 6 (SWC) | ✅ Live |
| Routing | React Router v7+ (`createBrowserRouter`) | ✅ Live |
| Styling | Tailwind CSS v4 + shadcn/ui (48 base components on Radix UI) | ✅ Live |
| Variants | CVA (class-variance-authority) + `cn()` (clsx + tailwind-merge) | ✅ Live |
| Animation | Motion library (motion/react) | ✅ Live |
| Charts | Recharts | ✅ Live |
| Forms | React Hook Form | ✅ Live |
| Backend | Supabase Edge Functions (Deno runtime, 17 functions) | ✅ Live |
| Database | Supabase PostgreSQL (57 tables, RLS on all) | ✅ Live |
| Auth | Supabase Auth (email/password ✅, Google OAuth ✅, LinkedIn OIDC ❌) | Partial |
| Realtime | Supabase Realtime (WebSocket broadcast channels) | ✅ Live |
| Storage | Supabase Storage (document uploads) | ✅ Live |
| Vector DB | pgvector extension installed | Not yet used |
| AI (Primary) | Google Gemini 3 (`gemini-3.1-pro-preview`, `gemini-3-flash-preview`, `gemini-3.1-flash-lite-preview`) | ✅ Live |
| AI SDK | `@google/genai` >= 1.33.0 | ✅ Live |
| AI Embeddings | `gemini-embedding-001` | Planned |
| Payments | Stripe | Not started |
| Deploy | Vercel (frontend) + Supabase Edge Functions (backend) | ✅ Live |

---

## Design System (V11 — Calm Luxury Editorial)

**Design Philosophy:** Premium editorial aesthetic. No clutter, no shadows, no rounded buttons. Strong typography, structured borders, generous whitespace.

**Full reference:** `src/docs/style-guide.md` (927 lines, V11)
**Live components:** `src/components/StyleGuidePage.tsx` + `src/components/style-guide/StyleGuideComponents.tsx`
**Route:** `/style-guide`

### Fonts
| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Display/Headlines | Playfair Display (serif) | 400, 600, 700 | H1, H2, page titles, metric values |
| Body/Navigation | Lora (serif) | 400, 500, 600 | Body text, buttons, descriptions, navigation |
| UI (secondary) | Inter (sans-serif) | 400, 500, 600 | H3-H4 subsections, labels, small UI text |

**Note:** The live components (`StyleGuidePage.tsx`, `StyleGuideComponents.tsx`) primarily use Playfair Display + Lora. Inter appears in the V11 style-guide.md for sub-headings and labels but is not used in the rendered style guide components.

### Colors — Primary Palette (from StyleGuidePage.tsx)
| Name | Hex | Usage |
|------|-----|-------|
| Dark Teal | `#0F3D3E` | Hero sections, premium backgrounds, dark cards |
| Lime Green | `#84CC16` | CTAs, accents, highlights, icon backgrounds, hover borders |
| White | `#FFFFFF` | Backgrounds, cards |
| Light Gray | `#F3F4F6` | Alternate sections, subtle backgrounds |
| Gray 900 | `#111827` | Primary text, headings |
| Gray 600 | `#4B5563` | Secondary text, body copy |

### Colors — Spruced Palette (from StyleGuidePage.tsx)
| Name | Hex | Usage |
|------|-----|-------|
| Warm Beige | `#F4F3EE` | Light backgrounds, homepage sections |
| Deep Green | `#1E3D36` | Headlines, primary text on light backgrounds |
| Muted Sage | `#DCE5DD` | Subtle cards, secondary backgrounds |
| Accent Green | `#2E6F5E` | Accents, highlights, secondary CTAs |
| Lime Green | `#84CC16` | Energy accents, animations, CTAs |

### Colors — V11 Marketing Palette (from style-guide.md)
```css
/* Backgrounds */
--bg-primary: #FDFCFB      /* Warm off-white page background */
--bg-surface: #FFFFFF      /* Cards, elevated surfaces */
--bg-alt: #FAF8F6          /* Alternate section background */
--bg-dark: #1A1A1A         /* Footer, dark CTA sections */

/* Text */
--text-primary: #1A1A1A    /* Headings */
--text-secondary: #666666  /* Body text */
--text-tertiary: #999999   /* Labels, metadata */

/* Accent */
--accent-amber: #F59E0B    /* CTAs, progress, highlights */
--accent-light: #FCD34D    /* Hover states */

/* Borders */
--border-primary: #EFE9E4  /* Cards, dividers */
--border-input: #D1C7BD    /* Form fields */
```

### Colors — Dashboard (globals.css tokens)
```css
/* Light Mode */
--background: #ffffff       --foreground: #1b1b1b
--primary: #030213          --secondary: #ececf0
--muted-foreground: #717182 --destructive: #d4183d
--border: rgba(0,0,0,0.1)  --radius: 0.625rem

/* Dark Mode */
--background: #1b1b1b       --foreground: #f7f7f7
--primary: #f7f7f7          --secondary: #3a3a3a
--muted-foreground: #a3a3a3 --destructive: #7f2315
```

### Design Rules
- **No rounded buttons** — square or near-square edges
- **No shadows** — use 1px borders for structure (`border-gray-200`)
- **No gradients** on marketing pages
- **Generous whitespace** — `py-24` to `py-32` for sections
- **Hover pattern:** `whileHover={{ borderColor: '#84CC16' }}` on cards
- **Aesthetic:** BCG/McKinsey consulting firm — NOT tech-startup

---

## Architecture

### Layouts

**Wizard (Steps 1-4):** Three-panel layout
| Panel | Width | Role |
|-------|-------|------|
| Left | 240px fixed | Context (read-only) — progress, signals, selections |
| Center | flex-1, max 640px | Work (human-first) — forms, decisions |
| Right | 320px fixed | Intelligence (read-only) — AI reasoning, previews |

**Step 5:** Centered single-column, max-width 800px. No three-panel.
**Dashboard:** Standard sidebar + main content. No three-panel.
**Mobile:** Single-column (center only). Tablet: two-panel (center + right).

### Edge Function Routes (74 endpoints)

| Module | Routes | Status |
|--------|--------|--------|
| `index.tsx` | Health, signup, insights | ✅ |
| `ai-routes.tsx` | 5 wizard AI + 3 monitoring | ✅ |
| `wizard-routes.tsx` | Session CRUD | ✅ |
| `crm-routes.tsx` | Clients + contacts | ✅ |
| `pipeline-routes.tsx` | Pipelines, deals, interactions (9 routes) | ✅ |
| `document-routes.tsx` | Documents + Storage (7 routes) | ✅ |
| `workflow-routes.tsx` | Workflow CRUD (execution simulated) | 🟡 85% |
| `financial-routes.tsx` | Invoices, payments, charts (10 routes) | ✅ |
| `strategy-routes.tsx` | Canvas, insights, 5-agent analysis (13 routes) | ✅ |
| `onboarding-routes.tsx` | Wizard → DB conversion | ✅ |
| `agent-routes.tsx` | Agent run, match, history | ✅ |
| `insight-routes.tsx` | Insight cards CRUD | ✅ |
| `gemini.tsx` | AI client (SHA-256 cache, 30s timeout, 3-retry) | ✅ |
| `agent-loader.tsx` | 4-layer prompt compiler (16 of 131 agents runtime-compilable) | 🟡 12% |
| `auth.tsx` | JWT validation, requireAuth, createUser | ✅ |

### AI Agent System

- **131 agents** seeded in `agent_catalog` table (parsed from .md files)
- **16 agents** have runtime prompt excerpts (compilable via `agent-loader.tsx`)
- **17 team templates** across 7 industries
- **4-layer prompt compiler:** system → agent → industry → route instructions
- **3 prompt fragments:** honesty-protocol, stage-calibration, scoring-rubrics
- **Agent matching:** Deterministic scoring (+25 system, +15 industry, +10 goal, +12 extras)
- **All AI calls** go through Edge Functions — no client-side Gemini calls

### Auth (33/33 tests passing)

- `requireAuth()` on all protected endpoints (rejects null, invalid, expired, anonymous)
- All collection queries scoped by `user_id`
- Ownership verified on all by-ID operations
- `AUTH_FAILURE_EVENT` → auto signout → redirect to `/auth`
- All 12 dashboard files use consistent `'use-fresh-token'` pattern

---

## What's Done (~79%)

### Core Platform (100%)
- 54 frontend routes (30 public, 18 dashboard, 3 auth, 2 wizard, 1 redirect)
- 74 endpoints across 12 route modules + index
- 57 database tables, 14 migrations, 233 RLS policies
- Auth hardening with requireAuth on all routes
- CORS whitelist (amoai.ca allowed)
- Production deploy on Vercel + Supabase

### Wizard (100%)
- All 5 steps fully wired to Gemini edge functions
- Step 1: Business Context (analyze-business with URL Context + Google Search)
- Step 2: Industry Diagnostics (8 questions per industry, signal detection)
- Step 3: System Recommendations (12 systems, ranked by impact/effort)
- Step 4: Executive Brief (readiness score, 7-section AI-generated brief)
- Step 5: Launch Project (creates project + roadmap + phases in DB)
- State: localStorage + cloud sync (debounced 2s, 7-day TTL)

### Dashboard Pages (14 pages, ~95%)
- Dashboard Home with live Gemini-powered AI insights
- Projects list/detail, Roadmap, Settings, AI Insights
- Clients list/detail with contacts
- CRM Pipeline (Kanban, drag-drop, deal scoring, realtime broadcast)
- Documents (upload, share, delete via Supabase Storage)
- Financial (invoices, payments, charts, profitability)
- Strategy Engine (3x3 lean canvas, 5-agent parallel Gemini analysis, versioning)
- Agents Catalog (131 agents, run/match/history, real Gemini execution)
- Workflows (CRUD + templates — execution is **simulated**, not real)

### Security (Done)
- 33/33 auth smoke tests passing in production
- All endpoints require JWT validation
- User-scoped RLS policies on all tables
- Rate limiting on AI endpoints (sliding window)
- CORS origin restriction
- API key in header (not URL), 30s timeout, system_instruction field

---

## What's Not Done

### Active Bugs
| Bug | Severity | Details |
|-----|----------|---------|
| Rate limiter is global, not per-user | Medium | One heavy user can exhaust the limit for everyone |
| Financial trends hardcoded | Low | `mrr_trend: 8.2` and `revenue_trend: 12.1` are constants |
| ensure-schema retry blocked | Low | `migrationDone = true` on failure prevents retry |

### Not Started
| Feature | Priority | Notes |
|---------|----------|-------|
| Chat/AI Assistant | P2 | No chat component, no routes, no history — biggest feature gap |
| CI/CD Pipeline | P2 | No GitHub Actions, manual deploys only |
| Error Monitoring (Sentry) | P2 | No error tracking |
| Real Workflow Execution | P2 | Actions return `success: true` unconditionally |
| LinkedIn OIDC | P1 | Button exists, provider not configured |
| Role-based Route Guards | P2 | All routes accessible to any authenticated user |
| RAG/Embeddings | P3 | pgvector installed but no embedding tables or queries |
| Industry Packs | P3 | Planning complete, not implemented |
| Services Catalog | P3 | Planning complete, not implemented |
| Playbooks/SOPs | P3 | Planning complete, not implemented |
| Stripe Billing | P3 | No integration |
| Test Suite | P2 | Zero test coverage |
| Bundle Splitting | P2 | Single 2.6MB main chunk |
| Input Validation (Zod) | P2 | POST/PUT accept any values |
| userClient + RLS migration | P2 | All routes use service-role bypass |

### Priority Next Steps
1. **P0 Quick Win:** Fix per-user rate limiting (filter `ai_run_logs` by `user_id`)
2. **P1 Launch:** LinkedIn OIDC, production smoke test, Skills Phase 2-3
3. **P2 Quality:** CI/CD, Sentry, Chat/AI assistant, real workflow execution

---

## Development Guidelines

### Code Organization
```
/src
  /components        — All React components (200+)
    /ui              — shadcn/ui base components (48)
    /style-guide     — Style guide examples
  /hooks             — Custom React hooks
  /services          — API and business logic
  /agents            — AI agent definitions
  /types             — TypeScript definitions
  /utils             — Helper functions
  /pages             — Route-level page components
  /lib               — Supabase client wrapper
  /docs              — Internal documentation (style-guide.md)
  /styles            — globals.css (design tokens)
  /imports           — Design system overview docs
```

### Coding Patterns
1. **TypeScript strict** — No `any` types.
2. **Functional components only** — Hooks, not class components.
3. **Service layer** — Business logic in `/services`, not components.
4. **Deterministic + AI hybrid** — Deterministic logic for scores. AI for narratives. AI never computes numbers.
5. **Supabase first** — All data through Supabase. No LocalStorage for production features.
6. **`'use-fresh-token'` pattern** — All dashboard API calls use this sentinel for auth.

### AI Implementation Rules
1. All AI calls go through Supabase Edge Functions (never client-side)
2. All agent responses use Gemini Structured Outputs (JSON schema)
3. Every AI call is logged to `ai_run_logs` (tokens, duration, success/fail)
4. Responses cached in `ai_cache` (SHA-256 prompt hash, 24h/7d TTL)
5. Controller Agent must approve actions that change pricing, send communications, modify data, or commit resources
6. Prompt fragments (honesty-protocol, stage-calibration, scoring-rubrics) injected into all agent system prompts

### Communication Style (for copy/content)
- **Outcome-first** — Lead with what the business gets, not what the tech does
- **Plain language** — No jargon unless absolutely necessary
- **Direct** — Get to the point, use real-world examples

---

## Key Documents

| Document | Location | Purpose |
|----------|----------|---------|
| PRD v3 (authoritative) | `/prd.md` | Full product spec — wizard, dashboard, agents, data model |
| PRD v2 (outdated) | `/plan/prd.md` | Old spec from Jan 2025 — do NOT use for current state |
| Style Guide V11 | `/src/docs/style-guide.md` | Complete design system (927 lines) |
| TODO tracker | `/TODO.md` | Current progress, bugs, priorities |
| CHANGELOG | `/CHANGELOG.md` | Version history (v0.28.0 → v0.31.0) |
| Index Progress | `/tasks/index-progress.md` | Detailed verified progress (verified 2026-03-14) |
| Design System Overview | `/src/imports/design-system-overview.md` | Wizard-specific design tokens |
| Design System Rules | `/.claude/rules/design-system.md` | shadcn/ui component inventory |

---

## How Claude Should Assist

1. **Check current state first** — Read relevant files before making changes. Don't assume the CLAUDE.md is current — always verify against TODO.md and the codebase.

2. **Use Gemini as primary AI** — This project uses Google Gemini 3 (not OpenAI). Use Gemini's native features: URL Context, Search Grounding, Structured Outputs, Thinking Mode.

3. **Respect layouts** — Wizard steps 1-4 use the three-panel pattern. Step 5 and dashboard do NOT. Never put AI execution in the left panel.

4. **Deterministic scores, AI narratives** — Scores and rankings use deterministic logic (formulas, weights). AI only explains "why."

5. **Follow the agent pattern** — Each agent needs: role, tools, system prompt, input/output schema, Controller approval for risky actions.

6. **Supabase first** — All data through Supabase client, RLS policies, and Edge Functions.

7. **Keep it simple** — Plain language, direct answers, real-world examples. Build one thing at a time.

8. **Follow the style guide** — Use Playfair Display for headlines, Inter for UI/body, Lora for narrative text. No shadows, no rounded buttons, no gradients on marketing pages. Reference `src/docs/style-guide.md` for specifics.

9. **Test what you build** — Even basic smoke tests. The project has 0% automated test coverage.

10. **Reference PRD v3** — The file at `/prd.md` (Version 3.0, March 2026) is the authoritative spec. Ignore `/plan/prd.md` (outdated v2).

### Things to avoid
- Don't add new UI frameworks or state management libraries without discussion
- Don't use CopilotKit (removed — project is Gemini-native)
- Don't skip the Controller Agent pattern for any AI action that modifies data
- Don't use `any` types in TypeScript
- Don't create new design tokens — use the existing Playfair Display + Lora + lime green (#84CC16) + dark teal (#0F3D3E) system
- Don't use shadows, rounded buttons, or gradients on marketing pages
- Don't make client-side Gemini API calls — all AI goes through Edge Functions
