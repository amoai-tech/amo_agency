# Agency Agents Integration — Roadmap

**Version:** 1.0
**Date:** 2026-03-12
**Status:** Active
**PRD:** `prompts/prd-agency.md` (v1.0)
**Parent Roadmap:** `roadmap.md` (v3.0)
**Methodology:** `system.md` (PRD → Diagrams → Tasks → Roadmap → Milestones)

---

## How to Read This Roadmap

Four phases, each with diagrams, tasks, and exit criteria. Follows `system.md` exactly:
- **Diagrams** define behavior (source of truth)
- **Tasks** do the work (generated from diagrams)
- **Milestones** prove completion (validate outcomes, not effort)
- Nothing moves to the next phase until all diagrams in the current phase are complete.

**Relationship to parent roadmap:** This roadmap runs as a **parallel track** alongside `roadmap.md`. It can start after M3 (Wizard Steps 1-2 working) and runs through M7 (AI Wiring). It does NOT block or replace any existing milestones.

---

## Current State (2026-03-12)

| Area | Status |
|---|---|
| PRD | Done (`prompts/prd-agency.md`) |
| Wireframes (16 files) | Done (`prompts/wireframes/00-16`) |
| Mermaid diagrams (26) | Done (`prompts/wireframes/11-16`) |
| Integration plan | Done (`prompts/plan/01-04`) |
| Agency repo cloned | Done (`/home/sk/sunv2/agency/`) |
| Agent files installed | Done (`~/.claude/agents/`) |
| Supabase tables | Not started |
| Edge function changes | Not started |
| Frontend components | Not started |

---

# PHASE 1: CORE

> Can agent prompts improve AI output at all?

**Purpose:** Establish the agent-loader foundation and prove that agent-augmented prompts produce measurably better output than generic prompts. Zero UI changes. Zero new tables.

## Diagrams

| Diagram ID | Name | Source | Phase |
|---|---|---|---|
| AGT-COMPILE-01 | Prompt Compiler 4-layer assembly | `wireframes/13` diagram 1 | CORE |
| AGT-COMPILE-02 | Excerpt extraction flow | `wireframes/13` diagram 2 | CORE |
| AGT-COMPILE-03 | Agent selection decision tree | `wireframes/13` diagram 3 | CORE |
| AGT-FLOW-01 | Cache and fallback flow | `wireframes/12` diagram 4 | CORE |

## Tasks

| Task ID | Diagram | Title | Skill | Priority | Status |
|---|---|---|---|---|---|
| AGT-COMPILE-01-01 | AGT-COMPILE-01 | Create `agent-loader.tsx` with `compilePrompt()` | backend | P0 | Open |
| AGT-COMPILE-01-02 | AGT-COMPILE-01 | Implement Layer 1 (AMO AI base role) as constant | backend | P0 | Open |
| AGT-COMPILE-01-03 | AGT-COMPILE-01 | Implement Layer 4 (JSON schema always last) | backend | P0 | Open |
| AGT-COMPILE-02-01 | AGT-COMPILE-02 | Implement `extractExcerpt()` with section selection | backend | P0 | Open |
| AGT-COMPILE-02-02 | AGT-COMPILE-02 | Add 2,000-token truncation with sentence boundary | backend | P0 | Open |
| AGT-COMPILE-02-03 | AGT-COMPILE-02 | Implement route-to-section mapping | backend | P1 | Open |
| AGT-COMPILE-03-01 | AGT-COMPILE-03 | Implement `selectAgents()` with multi-dimensional scoring | backend | P0 | Open |
| AGT-COMPILE-03-02 | AGT-COMPILE-03 | Add goal/industry/size/challenge scoring weights | backend | P1 | Open |
| AGT-FLOW-01-01 | AGT-FLOW-01 | Add fallback: skip agent excerpt on load failure | backend | P0 | Open |
| AGT-FLOW-01-02 | AGT-FLOW-01 | Add ROI guardrail to compilePrompt | backend | P1 | Open |

## Milestone: MA1 — Agent Loader Works

**Exit criteria:**
- `compilePrompt()` assembles 4-layer prompts correctly
- `extractExcerpt()` returns < 2,000 tokens for any agent file
- `selectAgents()` returns relevant agents for 5 test profiles
- Fallback works: load failure → AMO AI base prompt only
- ROI guardrail present in compiled prompt

**Validation:** Unit test 5 client profiles (dental clinic, e-commerce, SaaS, restaurant, game studio). Compare compiled prompt structure against spec.

---

# PHASE 2: MVP

> Do agent-augmented wizard outputs solve the main problem (generic recommendations)?

**Purpose:** Wire agent-loader into wizard routes. Users complete the wizard and get measurably better output. New "Your AI Team" section appears in Steps 4-5. First database tables created.

## Diagrams

| Diagram ID | Name | Source | Phase |
|---|---|---|---|
| AGT-WIZ-01 | Wizard Step 3 agent-augmented flow | `wireframes/15` diagram 3 | MVP |
| AGT-WIZ-02 | Wizard Steps 3-5 sequential flow | `wireframes/12` diagram 2 | MVP |
| AGT-WIZ-03 | Wizard agent enhancement journey (state machine) | `wireframes/14` diagram 2 | MVP |
| AGT-DB-01 | Agent system ER diagram | `wireframes/11` diagram 1 | MVP |
| AGT-DB-02 | Full system ER diagram | `wireframes/11` diagram 2 | MVP |

## Tasks

| Task ID | Diagram | Title | Skill | Priority | Status |
|---|---|---|---|---|---|
| AGT-WIZ-01-01 | AGT-WIZ-01 | Modify `ai-routes.tsx` `/system-recommendations` to use compiled prompt | backend | P0 | Open |
| AGT-WIZ-01-02 | AGT-WIZ-01 | Modify `ai-routes.tsx` `/readiness-score` to use compiled prompt | backend | P0 | Open |
| AGT-WIZ-01-03 | AGT-WIZ-01 | Modify `ai-routes.tsx` `/generate-roadmap` to use compiled prompt | backend | P0 | Open |
| AGT-WIZ-02-01 | AGT-WIZ-02 | Test Step 3 output: verify client-specific reasoning present | testing | P0 | Open |
| AGT-WIZ-02-02 | AGT-WIZ-02 | Test Step 4 output: verify proposal references client data | testing | P0 | Open |
| AGT-WIZ-02-03 | AGT-WIZ-02 | Test Step 5 output: verify roadmap uses PM methodology | testing | P1 | Open |
| AGT-WIZ-02-04 | AGT-WIZ-02 | A/B comparison: agent vs no-agent output for 5 profiles | testing | P1 | Open |
| AGT-WIZ-03-01 | AGT-WIZ-03 | Build `AITeamSection` component (wizard Step 4) | frontend | P0 | Open |
| AGT-WIZ-03-02 | AGT-WIZ-03 | Build `AgentTeamCard` component | frontend | P0 | Open |
| AGT-WIZ-03-03 | AGT-WIZ-03 | Build `AgentTeamGrid` component (wizard Step 5) | frontend | P0 | Open |
| AGT-DB-01-01 | AGT-DB-01 | Create Supabase migration: `agent_catalog` table | backend | P0 | Open |
| AGT-DB-01-02 | AGT-DB-01 | Create Supabase migration: `agent_assignments` table | backend | P0 | Open |
| AGT-DB-01-03 | AGT-DB-01 | Create Supabase migration: `agent_runs` table | backend | P0 | Open |
| AGT-DB-01-04 | AGT-DB-01 | Create Supabase migration: `insight_cards` table | backend | P0 | Open |
| AGT-DB-01-05 | AGT-DB-01 | Create Supabase migration: `agent_team_templates` + junction | backend | P0 | Open |
| AGT-DB-01-06 | AGT-DB-01 | Create Supabase migration: `deal_scores` table | backend | P1 | Open |
| AGT-DB-01-07 | AGT-DB-01 | Add RLS policies for all new tables | backend | P0 | Open |
| AGT-DB-02-01 | AGT-DB-02 | Build `parse-agents` script to populate `agent_catalog` | backend | P0 | Open |
| AGT-DB-02-02 | AGT-DB-02 | Create 8-10 preset team templates (seed data) | backend | P1 | Open |
| AGT-DB-02-03 | AGT-DB-02 | Wire wizard Step 5 to create `agent_assignments` on project create | backend | P0 | Open |

## Milestone: MA2 — Wizard Agent Integration

**Exit criteria:**
- Wizard Steps 3-5 produce agent-augmented output
- JSON schema compliance maintained (zero parsing errors)
- "Your AI Team" section visible in Step 4 with 3-5 agent cards
- Agent team grid visible in Step 5 with roles and first tasks
- Agent assignments saved to database on project creation
- Token cost per wizard session < $0.005
- A/B comparison shows agent output is more specific

**Validation:** Run 5 complete wizard sessions with sample client profiles. Verify agent assignment rows in database. Compare output specificity.

---

# PHASE 3: ADVANCED

> Does the agent system help users do better beyond the wizard?

**Purpose:** Build the catalog, dashboard widgets, insights, CRM scoring, and Agent Runner. Users discover agents, see their team status, receive insights, and run agents on demand.

## Diagrams

| Diagram ID | Name | Source | Phase |
|---|---|---|---|
| AGT-CAT-01 | Frontend component hierarchy — agent pages | `wireframes/16` diagram 1 | ADVANCED |
| AGT-CAT-02 | Edge function route map — new + modified | `wireframes/16` diagram 2 | ADVANCED |
| AGT-DASH-01 | End-to-end agent data flow | `wireframes/12` diagram 1 | ADVANCED |
| AGT-DASH-02 | Insight generation flow | `wireframes/12` diagram 3 | ADVANCED |
| AGT-ORCH-01 | Single agent run sequence | `wireframes/15` diagram 1 | ADVANCED |
| AGT-ORCH-02 | Multi-agent proposal sequence | `wireframes/15` diagram 2 | ADVANCED |
| AGT-ORCH-03 | CRM deal scoring sequence | `wireframes/15` diagram 4 | ADVANCED |
| AGT-ORCH-04 | Insight refresh sequence | `wireframes/15` diagram 5 | ADVANCED |
| AGT-JOURNEY-01 | Full user journey state machine | `wireframes/14` diagram 1 | ADVANCED |
| AGT-JOURNEY-02 | Insight card lifecycle | `wireframes/14` diagram 3 | ADVANCED |
| AGT-JOURNEY-03 | Agent assignment lifecycle | `wireframes/14` diagram 4 | ADVANCED |
| AGT-JOURNEY-04 | Drop-off risk points | `wireframes/14` diagram 5 | ADVANCED |

## Tasks — Agent Catalog + Detail

| Task ID | Diagram | Title | Skill | Priority | Status |
|---|---|---|---|---|---|
| AGT-CAT-01-01 | AGT-CAT-01 | Create `agent-routes.tsx` (GET catalog, detail, team, templates) | backend | P0 | Open |
| AGT-CAT-01-02 | AGT-CAT-01 | Build `AgentCatalogPage` with `DivisionTabBar` + search | frontend | P0 | Open |
| AGT-CAT-01-03 | AGT-CAT-01 | Build `AgentCard` with emoji avatar, description, division badge | frontend | P0 | Open |
| AGT-CAT-01-04 | AGT-CAT-01 | Build `AgentCardGrid` responsive layout (2-col desktop, 1-col mobile) | frontend | P0 | Open |
| AGT-CAT-01-05 | AGT-CAT-01 | Implement curated toggle (15-20 default, "Show all" for 120+) | frontend | P1 | Open |
| AGT-CAT-01-06 | AGT-CAT-01 | Build `AgentDetailPage` with profile header + tabbed content | frontend | P0 | Open |
| AGT-CAT-01-07 | AGT-CAT-01 | Build `AgentAboutSection`, `AgentCapabilitiesSection`, `AgentUseCasesSection` | frontend | P1 | Open |
| AGT-CAT-01-08 | AGT-CAT-01 | Build `AgentRunHistory` table (past runs from `agent_runs`) | frontend | P1 | Open |
| AGT-CAT-01-09 | AGT-CAT-01 | Add routes: `/app/agents/catalog`, `/app/agents/:slug` | frontend | P0 | Open |

## Tasks — Dashboard Enhancements

| Task ID | Diagram | Title | Skill | Priority | Status |
|---|---|---|---|---|---|
| AGT-DASH-01-01 | AGT-DASH-01 | Build `AgentTeamWidget` for dashboard home | frontend | P0 | Open |
| AGT-DASH-01-02 | AGT-DASH-01 | Build `AgentStatusRow` component | frontend | P0 | Open |
| AGT-DASH-01-03 | AGT-DASH-01 | Build `AgentAvatar` reusable component (emoji + colored circle) | frontend | P0 | Open |
| AGT-DASH-01-04 | AGT-DASH-01 | Build `AgentBadge` reusable component (compact: emoji + name) | frontend | P1 | Open |
| AGT-DASH-02-01 | AGT-DASH-02 | Create `insight-routes.tsx` (GET list, PATCH status, POST refresh) | backend | P0 | Open |
| AGT-DASH-02-02 | AGT-DASH-02 | Build `InsightCard` with agent badge, priority color, impact label | frontend | P0 | Open |
| AGT-DASH-02-03 | AGT-DASH-02 | Implement insight status lifecycle (new, viewed, acted, dismissed) | frontend | P1 | Open |
| AGT-DASH-02-04 | AGT-DASH-02 | Add 4-hour cache for insight refresh | backend | P1 | Open |

## Tasks — Agent Runner

| Task ID | Diagram | Title | Skill | Priority | Status |
|---|---|---|---|---|---|
| AGT-ORCH-01-01 | AGT-ORCH-01 | Add POST `/agents/:slug/run` endpoint to `agent-routes.tsx` | backend | P0 | Open |
| AGT-ORCH-01-02 | AGT-ORCH-01 | Implement input validation (4K char limit) + rate limit (10/hr) | backend | P0 | Open |
| AGT-ORCH-01-03 | AGT-ORCH-01 | Build `AgentRunnerPage` with split-pane layout | frontend | P0 | Open |
| AGT-ORCH-01-04 | AGT-ORCH-01 | Build `TaskInputPanel` (context, task, format radio) | frontend | P0 | Open |
| AGT-ORCH-01-05 | AGT-ORCH-01 | Build `TaskOutputPanel` with loading/empty/result states | frontend | P0 | Open |
| AGT-ORCH-01-06 | AGT-ORCH-01 | Build `RunMetadataFooter` (tokens, duration, model) | frontend | P1 | Open |
| AGT-ORCH-01-07 | AGT-ORCH-01 | Build `RunOutputActions` (copy, save, share) | frontend | P1 | Open |
| AGT-ORCH-01-08 | AGT-ORCH-01 | Add route: `/app/agents/:slug/run` | frontend | P0 | Open |

## Tasks — CRM Scoring

| Task ID | Diagram | Title | Skill | Priority | Status |
|---|---|---|---|---|---|
| AGT-ORCH-03-01 | AGT-ORCH-03 | Add deal scoring endpoint (POST `/crm/deals/:id/score`) | backend | P1 | Open |
| AGT-ORCH-03-02 | AGT-ORCH-03 | Build `DealHealthBar` component (score bar + risk label) | frontend | P1 | Open |
| AGT-ORCH-03-03 | AGT-ORCH-03 | Build `DealScoreCard` component (recommendation + breakdown) | frontend | P1 | Open |
| AGT-ORCH-03-04 | AGT-ORCH-03 | Add 1-hour cache for deal scores | backend | P1 | Open |

## Tasks — Multi-Agent Orchestration

| Task ID | Diagram | Title | Skill | Priority | Status |
|---|---|---|---|---|---|
| AGT-ORCH-02-01 | AGT-ORCH-02 | Implement parallel agent calls (Promise.all with independent fallback) | backend | P1 | Open |
| AGT-ORCH-02-02 | AGT-ORCH-02 | Implement merger prompt (combine 3 perspectives, flag disagreements) | backend | P1 | Open |
| AGT-ORCH-02-03 | AGT-ORCH-02 | Add Reality Checker QA step for proposal output | backend | P2 | Open |

## Milestone: MA3 — Agent Catalog + Dashboard

**Exit criteria:**
- Agent Catalog loads 15-20 curated agents in < 2 seconds
- Agent Detail shows full profile parsed from .md files
- Dashboard shows Agent Team widget with real agent status
- Insight cards display with agent badges and priority colors
- Agent Runner returns output in < 5 seconds
- CRM deal cards show health score bar

**Validation:** Complete user journey: wizard → dashboard → catalog → detail → run agent. Verify all components render. Check mobile responsiveness.

---

# PHASE 4: PRODUCTION

> Can the agent system be trusted at scale?

**Purpose:** Ensure agent features are reliable, performant, monitored, and secure. Add workflow integration. Polish mobile UX.

## Diagrams

| Diagram ID | Name | Source | Phase |
|---|---|---|---|
| AGT-DEPLOY-01 | Agent catalog parse + deploy pipeline | `wireframes/16` diagram 4 | PRODUCTION |
| AGT-DEPLOY-02 | Phase rollout Gantt | `wireframes/16` diagram 6 | PRODUCTION |
| AGT-WORKFLOW-01 | Workflow agent node execution | `wireframes/16` diagram 3 | PRODUCTION |
| AGT-BUDGET-01 | Token budget breakdown | `wireframes/16` diagram 5 | PRODUCTION |

## Tasks

| Task ID | Diagram | Title | Skill | Priority | Status |
|---|---|---|---|---|---|
| AGT-DEPLOY-01-01 | AGT-DEPLOY-01 | Automate `parse-agents` on deploy (Vercel build hook) | devops | P1 | Open |
| AGT-DEPLOY-01-02 | AGT-DEPLOY-01 | Add admin button to manually trigger re-parse | backend | P2 | Open |
| AGT-DEPLOY-01-03 | AGT-DEPLOY-01 | Add `lint-agents` validation before parse | backend | P2 | Open |
| AGT-WORKFLOW-01-01 | AGT-WORKFLOW-01 | Add agent node type to workflow engine | backend | P1 | Open |
| AGT-WORKFLOW-01-02 | AGT-WORKFLOW-01 | Build `AgentNodeConfig` component (select agent, task template, format) | frontend | P1 | Open |
| AGT-WORKFLOW-01-03 | AGT-WORKFLOW-01 | Implement 30s timeout + fallback for workflow agent nodes | backend | P1 | Open |
| AGT-BUDGET-01-01 | AGT-BUDGET-01 | Add token usage monitoring dashboard | frontend | P2 | Open |
| AGT-BUDGET-01-02 | AGT-BUDGET-01 | Add rate limit enforcement for Agent Runner (free vs Pro) | backend | P1 | Open |
| AGT-PROD-01 | — | E2E test: wizard with agents → dashboard → run agent | testing | P1 | Open |
| AGT-PROD-02 | — | Security audit: RLS on 7 new tables, agent input sanitization | security | P1 | Open |
| AGT-PROD-03 | — | Mobile optimization for catalog, detail, runner pages | frontend | P2 | Open |
| AGT-PROD-04 | — | Performance: agent catalog query < 200ms, runner < 5s | backend | P1 | Open |

## Milestone: MA4 — Agent System Production Ready

**Exit criteria:**
- Parse-agents runs automatically on deploy
- Workflow agent nodes execute reliably with timeout + fallback
- Token usage visible in admin dashboard
- Rate limits enforced on Agent Runner
- E2E test passes: full wizard + dashboard + agent run flow
- RLS verified on all 7 new tables
- Mobile renders correctly for all agent pages
- Agent catalog query < 200ms, runner response < 5s

**Validation:** Run security audit. Execute E2E test. Load test with 100 concurrent users. Mobile testing on iOS Safari + Android Chrome.

---

## Phase Dependencies

```
CORE (MA1)
  agent-loader.tsx works
  |
MVP (MA2)                              PARALLEL: Parent roadmap M3-M4
  wizard uses agent-augmented prompts   (wizard steps must exist first)
  agent_assignments saved to DB
  |
ADVANCED (MA3)                         PARALLEL: Parent roadmap M5-M7
  catalog, dashboard, insights, runner  (dashboard must exist for widgets)
  |
PRODUCTION (MA4)                       PARALLEL: Parent roadmap M14-M17
  workflow nodes, monitoring, security  (testing infra shared)
```

**Critical path:** CORE (MA1) can start immediately. MVP (MA2) requires parent M3-M4 (wizard steps working). ADVANCED (MA3) requires parent M5 (client dashboard exists).

---

## Task Summary

| Phase | Diagrams | Tasks | Open | P0 | P1 | P2 |
|---|---|---|---|---|---|---|
| CORE | 4 | 10 | 10 | 6 | 4 | 0 |
| MVP | 5 | 20 | 20 | 14 | 6 | 0 |
| ADVANCED | 12 | 29 | 29 | 16 | 11 | 2 |
| PRODUCTION | 4 | 12 | 12 | 0 | 8 | 4 |
| **Total** | **25** | **71** | **71** | **36** | **29** | **6** |

---

## Diagram Index

All 25 diagrams referenced in this roadmap:

| ID | Name | Phase | Source File |
|---|---|---|---|
| AGT-COMPILE-01 | Prompt Compiler 4-layer assembly | CORE | `wireframes/13-mermaid-prompt-compiler.md` |
| AGT-COMPILE-02 | Excerpt extraction flow | CORE | `wireframes/13-mermaid-prompt-compiler.md` |
| AGT-COMPILE-03 | Agent selection decision tree | CORE | `wireframes/13-mermaid-prompt-compiler.md` |
| AGT-FLOW-01 | Cache and fallback flow | CORE | `wireframes/12-mermaid-data-flow.md` |
| AGT-WIZ-01 | Wizard Step 3 agent-augmented flow | MVP | `wireframes/15-mermaid-agent-orchestration.md` |
| AGT-WIZ-02 | Wizard Steps 3-5 sequential flow | MVP | `wireframes/12-mermaid-data-flow.md` |
| AGT-WIZ-03 | Wizard enhancement journey | MVP | `wireframes/14-mermaid-user-journey.md` |
| AGT-DB-01 | Agent system ER diagram | MVP | `wireframes/11-mermaid-er-diagram.md` |
| AGT-DB-02 | Full system ER diagram | MVP | `wireframes/11-mermaid-er-diagram.md` |
| AGT-CAT-01 | Frontend component hierarchy | ADVANCED | `wireframes/16-mermaid-additional.md` |
| AGT-CAT-02 | Edge function route map | ADVANCED | `wireframes/16-mermaid-additional.md` |
| AGT-DASH-01 | End-to-end agent data flow | ADVANCED | `wireframes/12-mermaid-data-flow.md` |
| AGT-DASH-02 | Insight generation flow | ADVANCED | `wireframes/12-mermaid-data-flow.md` |
| AGT-ORCH-01 | Single agent run sequence | ADVANCED | `wireframes/15-mermaid-agent-orchestration.md` |
| AGT-ORCH-02 | Multi-agent proposal sequence | ADVANCED | `wireframes/15-mermaid-agent-orchestration.md` |
| AGT-ORCH-03 | CRM deal scoring sequence | ADVANCED | `wireframes/15-mermaid-agent-orchestration.md` |
| AGT-ORCH-04 | Insight refresh sequence | ADVANCED | `wireframes/15-mermaid-agent-orchestration.md` |
| AGT-JOURNEY-01 | Full user journey state machine | ADVANCED | `wireframes/14-mermaid-user-journey.md` |
| AGT-JOURNEY-02 | Insight card lifecycle | ADVANCED | `wireframes/14-mermaid-user-journey.md` |
| AGT-JOURNEY-03 | Agent assignment lifecycle | ADVANCED | `wireframes/14-mermaid-user-journey.md` |
| AGT-JOURNEY-04 | Drop-off risk points | ADVANCED | `wireframes/14-mermaid-user-journey.md` |
| AGT-DEPLOY-01 | Parse + deploy pipeline | PRODUCTION | `wireframes/16-mermaid-additional.md` |
| AGT-DEPLOY-02 | Phase rollout Gantt | PRODUCTION | `wireframes/16-mermaid-additional.md` |
| AGT-WORKFLOW-01 | Workflow agent node execution | PRODUCTION | `wireframes/16-mermaid-additional.md` |
| AGT-BUDGET-01 | Token budget breakdown | PRODUCTION | `wireframes/16-mermaid-additional.md` |

---

## References

| Document | Path |
|---|---|
| Agency PRD | `prompts/prd-agency.md` |
| Parent PRD | `prd.md` |
| Parent Roadmap | `roadmap.md` |
| Methodology | `system.md` |
| Wireframes (16 files) | `prompts/wireframes/` |
| Integration Plan | `prompts/plan/` |
| Agency Repo | `agency/` |
| Summary | `summary.md` |
