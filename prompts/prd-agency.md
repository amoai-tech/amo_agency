# Agency Agents Integration — Product Requirements Document

**Version:** 1.0
**Date:** 2026-03-12
**Status:** Active
**Parent PRD:** `/prd.md` (AMO AI v3.0)
**Source Repo:** [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) (MIT License)

---

## 1. Product Vision

AMO AI becomes an **AI team platform** — not just an AI tool. Every client gets a curated team of named AI specialists matched to their industry, goals, and company size. Agents are structured prompt templates (Markdown files with YAML frontmatter) that turn generic Gemini output into domain-expert reasoning.

**Before:** One AI generates everything. Output feels generic.
**After:** Named specialists power every recommendation. Output feels like a $10K consulting engagement.

**Core principle:** Agents augment — they never replace AMO AI's product logic. The 4-layer Prompt Compiler pattern ensures AMO AI's voice, JSON schemas, and guardrails always take precedence.

---

## 2. What Agency Agents Are

Each agent is a `.md` file with:

- **YAML frontmatter:** name, description, color, emoji, vibe
- **Structured body:** Identity, Core Mission, Critical Rules, Deliverables, Workflow, Success Metrics

They are **not** running software. They are expert instructions fed to Gemini as system prompts. The AI then follows the agent's methodology, rules, and quality standards instead of giving generic answers.

**Source library:** 120+ agents across 12 divisions (Engineering, Sales, Marketing, Design, Product, PM, Testing, Paid Media, Support, Specialized, Game Dev, Spatial Computing).

**File sizes:** 53 lines (Growth Hacker) to 238 lines (Reality Checker). Average ~150 lines.

---

## 3. Users & Personas

All users from the parent PRD apply. Agent-specific behaviors:

| User | Agent Interaction | Primary Value |
|---|---|---|
| **Client** | Sees "Your AI Team" in wizard and dashboard. Receives agent-powered insights. Runs agents on tasks. | Feels like hiring a real agency team |
| **Agency** | Manages agent assignments. Monitors agent runs. Configures workflow agent nodes. Uses CRM scoring. | Delivers better client outcomes at scale |
| **Guest** | Sees agent-powered recommendations in wizard. No agent catalog access. | Better wizard output quality |

---

## 4. Architecture

### 4.1 Prompt Compiler — 4-Layer Pattern

Every AI call assembles a prompt from 4 layers:

```
┌─────────────────────────────────────────────┐
│ Layer 1: AMO AI Base Role (ALWAYS FIRST)    │
│ Consistent voice, brand, constraints        │
│ "Never claim >3x improvement without proof" │
├─────────────────────────────────────────────┤
│ Layer 2: Agent Expertise Excerpt            │
│ Selected sections from agent .md file       │
│ Max 2,000 tokens. Route-relevant only.      │
├─────────────────────────────────────────────┤
│ Layer 3: Route-Specific Instructions        │
│ What to analyze, what to focus on           │
│ Unique to each wizard step / dashboard      │
├─────────────────────────────────────────────┤
│ Layer 4: JSON Schema (ALWAYS LAST)          │
│ Strict output format. No deviations.        │
│ LLMs prioritize end-of-prompt for format.   │
└─────────────────────────────────────────────┘
```

**Critical rules:**
- Layer 1 is never omitted — AMO AI identity always present
- Layer 4 is always last — JSON compliance depends on it
- Agent excerpts are max 2,000 tokens — truncated if longer
- If agent load fails, skip Layer 2 — degrade gracefully to current behavior

### 4.2 Agent Selection — Multi-Dimensional Matching

Agents are selected by **goal + industry + company_size + challenge** — never by industry alone.

```
selectAgents(route, clientContext) → agent_slugs[]
  1. Check agent_team_templates for exact match
  2. If no template, score each curated agent:
     - industry match: +3 points
     - goal match: +3 points
     - company_size match: +2 points
     - challenge match: +2 points
  3. Pick top N agents (N depends on route type)
  4. Max 3 agents per call to control token cost
```

### 4.3 Excerpt Extraction

```
extractExcerpt(agentFile, sections, maxTokens=2000)
  1. Strip YAML frontmatter
  2. Split body by ## headings
  3. Select route-relevant sections (Identity, Core Mission, Critical Rules, etc.)
  4. Join selected sections
  5. Truncate at 2,000 tokens (complete sentences)
```

**Section selection by route:**

| Route | Sections Used |
|---|---|
| system-recommendations | Identity, Core Mission, Critical Rules, Deliverables |
| readiness-score | Identity, Success Metrics, Critical Rules, Workflow |
| generate-roadmap | Identity, Core Mission, Workflow, Deliverables |
| agent-runner | All sections (full context, user explicitly chose this agent) |

### 4.4 Output Combination Patterns

| Pattern | Used For | How It Works |
|---|---|---|
| **Parallel + Merge** | Proposals | 3 agents run in parallel → merger prompt combines into unified output. Flag disagreements. |
| **Primary + Augmentation** | Wizard steps | Primary agent does the work, secondary agent's excerpt injected into same prompt. 1 AI call. |
| **Independent + Display** | Dashboard insights | Each agent runs independently. Results shown as separate insight cards. No merging. |

### 4.5 Fallback & Error Handling

```
Agent .md file not found?     → Skip agent excerpt, use AMO AI base prompt only
Agent excerpt empty?          → Same fallback
AI call fails?                → Existing retry logic (3 retries, 1s/2s/4s backoff)
All retries exhausted?        → Return error + log failure
Multi-agent: one agent fails? → Other agents still return. Failed = "Perspective unavailable"
```

---

## 5. Data Model

### 5.1 New Tables (7 total)

#### agent_catalog

Index of all available agents. Populated by `parse-agents` script at build/deploy time.

| Column | Type | Description |
|---|---|---|
| id | uuid PK | Auto-generated |
| slug | text UNIQUE | e.g. `engineering-rapid-prototyper` |
| name | text | From frontmatter |
| description | text | One-liner from frontmatter |
| division | text | Parent folder: `engineering`, `sales`, etc. |
| emoji | text | From frontmatter |
| color | text | Hex or name from frontmatter |
| vibe | text (null) | Tagline from frontmatter |
| file_path | text | Relative path in repo |
| line_count | int | Proxy for depth/quality |
| tags | text[] | Derived: industries, goals, use cases |
| sections | jsonb | Pre-parsed excerpts for fast loading |
| is_curated | boolean | Show in default catalog view (15-20 agents) |
| is_active | boolean | Can be disabled without deleting |
| created_at | timestamptz | When parsed |
| updated_at | timestamptz | Last re-parse |

**Indexes:** slug (unique), division, tags (GIN)

#### agent_assignments

Links agents to projects. Created on wizard completion or manual assignment.

| Column | Type | Description |
|---|---|---|
| id | uuid PK | Auto-generated |
| project_id | uuid FK | References projects.id |
| agent_slug | text FK | References agent_catalog.slug |
| role_description | text | e.g. "Builds your booking bot MVP" |
| assigned_by | text | `wizard`, `manual`, or user_id |
| status | text | `active`, `paused`, `completed` |
| first_task | text (null) | Initial task description |
| last_output_summary | text (null) | Truncated last output |
| last_run_at | timestamptz (null) | When agent last ran |
| created_at | timestamptz | When assigned |
| updated_at | timestamptz | Last status change |

**Indexes:** project_id, agent_slug
**Constraint:** UNIQUE(project_id, agent_slug)

#### agent_runs

Audit log of every agent execution.

| Column | Type | Description |
|---|---|---|
| id | uuid PK | Auto-generated |
| agent_slug | text FK | Which agent ran |
| project_id | uuid FK (null) | Project context (nullable for catalog runs) |
| user_id | uuid FK | Who initiated |
| route | text | e.g. `wizard-recommendations`, `agent-runner`, `crm-scoring` |
| input_summary | text | First 500 chars of input |
| output_summary | text | First 500 chars of output |
| full_output | jsonb | Complete response |
| tokens_input | int | Input token count |
| tokens_output | int | Output token count |
| duration_ms | int | Call duration |
| model | text | e.g. `gemini-2.0-flash` |
| success | boolean | Completed without error |
| error_message | text (null) | Error details if failed |
| created_at | timestamptz | When run started |

**Indexes:** agent_slug, project_id, user_id, created_at

#### insight_cards

Agent-generated business insights for the dashboard.

| Column | Type | Description |
|---|---|---|
| id | uuid PK | Auto-generated |
| project_id | uuid FK | Which project |
| agent_slug | text FK | Which agent generated it |
| priority | text | `high`, `medium`, `low` |
| title | text | Short headline |
| body | text | 2-4 sentence insight |
| impact_label | text (null) | e.g. "+35% bookings" |
| action_label | text (null) | e.g. "Set Up Review Requests" |
| action_url | text (null) | Deep link for action |
| status | text | `new`, `viewed`, `acted`, `dismissed` |
| expires_at | timestamptz | Auto-dismiss after this date |
| created_at | timestamptz | When generated |

**Indexes:** project_id + status (composite), priority

#### agent_team_templates

Pre-built agent teams for common client profiles.

| Column | Type | Description |
|---|---|---|
| id | uuid PK | Auto-generated |
| name | text | e.g. "Healthcare MVP Team" |
| industry | text | e.g. `healthcare` |
| goal | text | e.g. `launch-mvp` |
| company_size | text | e.g. `1-10` |
| description | text | Why this team works |
| is_active | boolean | Can be disabled |
| created_at | timestamptz | When created |

#### agent_team_templates_agents

Junction table for template-to-agent relationships.

| Column | Type | Description |
|---|---|---|
| id | uuid PK | Auto-generated |
| template_id | uuid FK | References agent_team_templates.id |
| agent_slug | text FK | References agent_catalog.slug |
| role | text | Role in this template |
| first_task | text | Default first task |
| sort_order | int | Display order |

#### deal_scores

CRM deal health scores generated by Pipeline Analyst agent.

| Column | Type | Description |
|---|---|---|
| id | uuid PK | Auto-generated |
| deal_id | uuid FK | References crm_deals.id |
| agent_slug | text FK | Which agent scored |
| health_score | int | 0-100 |
| risk_label | text | e.g. "No exec sponsor" |
| recommendation | text | Next step suggestion |
| scoring_breakdown | jsonb | Detailed score factors |
| scored_at | timestamptz | When scored |
| expires_at | timestamptz | Cache TTL (1 hour default) |

### 5.2 Existing Tables Used (No Schema Changes)

- `projects` — agent_assignments references projects.id
- `users` — agent_runs references auth.users.id
- `ai_cache` — agent outputs cached with existing pattern
- `ai_run_logs` — agent runs logged with existing pattern
- `crm_deals` — deal_scores references deals
- `wizard_sessions`, `wizard_answers` — context for agent selection

### 5.3 RLS Policies

All new tables follow existing patterns:
- `agent_catalog` — public read (no auth required for catalog browsing)
- `agent_assignments` — read/write scoped to project owner (via projects.user_id)
- `agent_runs` — read scoped to user_id; write via edge function only
- `insight_cards` — read/write scoped to project owner
- `deal_scores` — read/write scoped to deal owner (via crm_deals)
- `agent_team_templates` — public read, admin write

---

## 6. Screens & Routes

### 6.1 Existing Screens Enhanced (7 screens)

#### Wizard Step 3 — System Recommendations (P1)

**What changes:** Recommendations powered by specialist agents. "Why this fits YOUR business" reasoning replaces generic descriptions.

**Agent involvement:** Software Architect (primary) + goal-specific agent (Growth Hacker if marketing, Pipeline Analyst if sales, Rapid Prototyper if MVP).

**User sees:** Better content in existing recommendation cards. No new UI components. Agent reasoning badge (subtle, optional).

**Acceptance criteria:**
- Recommendations reference client-specific data (industry, company size, challenge)
- ROI claims use ranges, not exact numbers
- No ROI claim exceeds 3x without evidence citation
- JSON output schema unchanged — zero frontend breakage

#### Wizard Step 4 — Executive Summary (P1)

**What changes:** Proposal narrative written by Proposal Strategist agent. New "Your AI Team" section showing assigned agents with roles.

**New components:**
- `AITeamSection` — horizontal card row showing 3-5 agent cards
- `AgentTeamCard` — avatar (emoji in colored circle), name, role description, first task

**Agent involvement:** Proposal Strategist (narrative) + domain agent (varies) + Finance Tracker (cost projections). Multi-agent: 3 parallel calls, merged.

**Acceptance criteria:**
- Proposal references client-specific numbers and challenges
- "Your AI Team" section shows 3-5 agents with clear role descriptions
- Each agent card shows: emoji, name, one-line role, first task
- Team assignment saved to `agent_assignments` table

#### Wizard Step 5 — Launch Project (P1)

**What changes:** Full agent team grid with roles and first tasks. Agents assigned to project on creation.

**New components:**
- `AgentTeamGrid` — grid of agent cards with expanded details

**Acceptance criteria:**
- Agent team visible before project creation
- All assignments persisted to `agent_assignments` on project create
- Each agent shows: name, role for this project, first task

#### Dashboard Home (P2)

**New widget:** "Your AI Team" card showing assigned agents with status.

**New components:**
- `AgentTeamWidget` — card with agent status rows
- `AgentStatusRow` — agent name, current status, last output summary, last run time

**Acceptance criteria:**
- Widget shows all active agents for the current project
- Status updates reflect actual `agent_assignments.status`
- "View full team" links to Agent Catalog
- Empty state: "Complete onboarding to get your AI team"

#### Dashboard Insights (P2)

**What changes:** Insight cards attributed to source agents. Agent badge on each card.

**Enhanced components:**
- `InsightCard` — add agent emoji + name badge, priority color coding

**Agent involvement:** Growth Hacker (opportunities), Reality Checker (risks), Finance Tracker (projections). Multi-agent: 2-3 parallel, independent display.

**Acceptance criteria:**
- Each insight shows which agent generated it
- Priority color: red (high), orange (medium), gray (low)
- Impact label shows specific metrics ("+35% bookings", "$14.9K/yr savings")
- Cards have action buttons ("Set Up Review Requests")
- Status lifecycle: new → viewed → acted/dismissed
- Cache: 4 hours between refreshes

#### CRM Pipeline (P2)

**What changes:** Deal cards show health score bar and risk label from Pipeline Analyst.

**New components:**
- `DealHealthBar` — score bar (0-100) + risk label + agent badge
- `DealScoreCard` — recommendation + scoring breakdown

**Agent involvement:** Pipeline Analyst. Single agent, runs on deal stage change, cached 1 hour.

**Acceptance criteria:**
- Health score updates within 30 seconds of deal change
- Score bar color: green (70+), yellow (40-69), red (0-39)
- Risk label shown inline on deal card
- Recommendation shown on deal detail view
- Cache: 1 hour TTL

#### Workflows (P3)

**What changes:** Agent-as-workflow-node. Users can add an agent step to any workflow.

**New components:**
- `AgentNodeConfig` — select agent from catalog, define task template, set output format

**Acceptance criteria:**
- Agent node available in workflow builder
- User selects agent from dropdown (curated list)
- Task can use template variables from previous steps
- Output format: structured, free-form, or JSON
- Timeout: 30 seconds default
- Fallback: if agent fails, workflow continues with default prompt output

### 6.2 New Screens (3 screens)

#### Agent Catalog — `/app/agents/catalog` (P2)

**Purpose:** Browse all available AI agents organized by division.

**Layout:** Standard sidebar + main content. Division tab bar (horizontal, scrollable on mobile). Search input. 2-column card grid (desktop), 1-column (mobile).

**Components:**
- `DivisionTabBar` — All, Engineering, Sales, Marketing, Design, Product, PM, Testing, Paid Media, Support, Specialized
- `SearchBar` — instant client-side filter on name, description, tags
- `AgentCardGrid` — responsive grid
- `AgentCard` — emoji avatar, name, description, division badge, assignment count, View/Run buttons

**Default view:** 15-20 curated agents (is_curated = true). Full catalog (120+) behind "Show all agents" toggle.

**Data source:** `agent_catalog` table. Static-ish data, can be cached aggressively.

**Acceptance criteria:**
- Page loads in < 2 seconds
- Division tabs filter instantly (client-side)
- Search filters by name, description, and tags
- Default shows curated agents only
- "Show all" reveals full catalog
- Each card links to Agent Detail and Agent Runner
- Mobile: single column, horizontal scrollable tabs

#### Agent Detail — `/app/agents/:slug` (P2)

**Purpose:** View a single agent's full profile, capabilities, and run history.

**Layout:** Profile header + tabbed content.

**Components:**
- `AgentProfileHeader` — emoji (large), name, division, vibe tagline, "Run This Agent" + "Assign to Project" buttons
- `AgentTabBar` — About, Capabilities, Use Cases, Run History
- `AgentAboutSection` — description, core mission, critical rules, success metrics (parsed from .md)
- `AgentCapabilitiesSection` — detailed methodology sections
- `AgentUseCasesSection` — example tasks with sample outputs
- `AgentRunHistory` — table of past runs (from agent_runs): date, input, output, tokens, duration

**Data source:** `agent_catalog` (metadata + sections jsonb) + `agent_runs` (history).

**Acceptance criteria:**
- All content parsed from agent .md file
- Tabs load without full page refresh
- Run History shows most recent 20 runs
- "Run This Agent" navigates to Agent Runner
- "Assign to Project" shows project selector dropdown
- Mobile: tabs become scrollable pills

#### Agent Runner — `/app/agents/:slug/run` (P3)

**Purpose:** Execute any agent on a specific task with input/output.

**Layout:** Split-pane — input form (left), output panel (right). Mobile: stacked vertically.

**Components:**
- `TaskInputPanel` — context textarea (optional, pre-filled from project), task textarea (required), output format radio (structured/free-form/JSON)
- `TaskOutputPanel` — formatted output display, loading state, empty state
- `RunMetadataFooter` — tokens used, duration, model
- `RunOutputActions` — Copy, Save (to project), Share

**Constraints:**
- Input limit: 4,000 characters
- Rate limit: 10 runs/hour (free tier), unlimited (Pro)
- Output target: 200-400 words (structured report)

**Acceptance criteria:**
- Output returns in < 5 seconds
- Output format matches selected radio option
- Tokens and duration shown in footer
- Copy button copies full output to clipboard
- Save button persists to `agent_runs` with project_id
- Rate limit shows friendly message when exceeded
- Mobile: input above, output below

### 6.3 Screens NOT Building (Explicitly Deferred)

| Screen | Why Not | When |
|---|---|---|
| Agent Team Builder (drag-and-drop) | Wizard auto-assigns. Manual building adds complexity without value. | Phase 4 if demand |
| Agent Marketplace (public page) | Marketing page, not core product | Phase 4 |
| Agent-to-agent communication | Over-engineering. Agents are prompts, not processes. | Never |
| Custom agent creation | Users writing their own .md files | Phase 4 if demand |
| Agent memory/learning | Agents don't persist state between runs | Not applicable |

---

## 7. Agent-to-Product Mapping

| Product Area | Agents Used | Pattern | Calls |
|---|---|---|---|
| Wizard Step 3 (Recommendations) | Software Architect + goal-specific agent | Primary + Augmentation | 1 |
| Wizard Step 4 (Proposal) | Proposal Strategist + domain agent + Finance Tracker | Parallel + Merge | 3 |
| Wizard Step 4 (Readiness) | Reality Checker + Finance Tracker | Primary + Augmentation | 1 |
| Wizard Step 5 (Roadmap) | Project Shepherd + Sprint Prioritizer | Primary + Augmentation | 1 |
| Dashboard (Agent Team) | All assigned agents | No AI call (reads DB) | 0 |
| Dashboard (Insights) | Growth Hacker + Reality Checker + Finance Tracker | Independent + Display | 2-3 |
| CRM (Deal Scoring) | Pipeline Analyst | Single agent | 1 |
| Workflows (Agent Nodes) | Any agent (user-configured) | Single agent per node | 1 |
| Financial (Projections) | Finance Tracker | Single agent | 1 |
| Agent Runner | User-selected agent | Single agent | 1 |

---

## 8. Backend — Edge Functions

### 8.1 New Files

| File | Purpose |
|---|---|
| `agent-loader.tsx` | Core utility: `extractExcerpt()`, `selectAgents()`, `compilePrompt()`, `getAgentMeta()` |
| `agent-routes.tsx` | 6 endpoints: catalog, detail, team, run, assign, templates |
| `insight-routes.tsx` | 3 endpoints: list, update status, refresh |

### 8.2 Existing Files Modified

| File | Change |
|---|---|
| `ai-routes.tsx` | Import agent-loader, use compiled prompts in 4 routes |
| `crm-routes.tsx` (if exists) | Add deal scoring endpoint |

### 8.3 New API Endpoints

| Method | Route | Purpose | Auth |
|---|---|---|---|
| GET | `/agents/catalog` | List agents, filter by division | Public |
| GET | `/agents/:slug` | Agent detail with assignment count | Public |
| GET | `/agents/team/:projectId` | Agent team for a project | Authenticated |
| POST | `/agents/:slug/run` | Execute agent on task | Authenticated |
| POST | `/agents/assign` | Assign agent to project | Authenticated |
| GET | `/agents/templates` | List preset team templates | Public |
| GET | `/insights/:projectId` | List insight cards | Authenticated |
| PATCH | `/insights/:id/status` | Update insight status | Authenticated |
| POST | `/insights/refresh/:projectId` | Regenerate insights | Authenticated |
| POST | `/crm/deals/:id/score` | Score a deal | Authenticated |
| GET | `/crm/deals/:id/score` | Get deal score | Authenticated |

### 8.4 No Changes Required

| File | Why |
|---|---|
| `gemini.tsx` | Already accepts system prompt string. Agents slot into existing parameter. |
| Auth system | Existing JWT + RLS patterns sufficient. |
| Realtime | Existing subscription patterns work for live updates. |

---

## 9. Frontend Components

### 9.1 New Reusable Components (6)

| Component | Used In | Props |
|---|---|---|
| `AgentAvatar` | Everywhere agents appear | slug, size (sm/md/lg) — emoji in colored circle |
| `AgentBadge` | Insight cards, deal cards, recommendations | slug — compact: emoji + name |
| `AgentTeamCard` | Wizard Step 4, Step 5, Dashboard | slug, roleDescription, firstTask, status |
| `AgentStatusRow` | Dashboard Agent Team Widget | slug, status, lastOutput, lastRunAt |
| `InsightCard` | Insights page, Dashboard feed | priority, agentSlug, title, body, impactLabel, actionLabel |
| `DealHealthBar` | CRM Pipeline deal cards | score, riskLabel, agentSlug |

### 9.2 State Management

| Feature | Data Source | Caching |
|---|---|---|
| Agent Team | `agent_assignments` via API | Refresh on mount + after runs |
| Agent Catalog | `agent_catalog` via API | Cache aggressively (changes only on deploy) |
| Agent Runner | Local state (input) + API (output) | No cache (each run is unique) |
| Insight Cards | `insight_cards` via API | 4-hour cache, manual refresh available |
| Deal Scores | `deal_scores` via API | 1-hour cache, refresh on deal update |

### 9.3 Loading, Error, Empty States

| Component | Loading | Error | Empty |
|---|---|---|---|
| Agent Team Widget | 3-row skeleton | "Unable to load team. Retry." | "Complete onboarding to get your AI team." |
| Agent Catalog | 6-card skeleton | "Unable to load agents. Retry." | Never empty (static data) |
| Agent Runner Output | "Agent is thinking..." + spinner | "Agent run failed. Check input and retry." | "Run the agent to see output here." |
| Insight Cards | 3-card skeleton | "Unable to load insights. Retry." | "Your agents will generate insights as they analyze your project." |
| Deal Health Bar | Small skeleton bar | Score hidden, deal shows normally | "Score pending" badge |

---

## 10. Guardrails

| Guardrail | Where | Rule |
|---|---|---|
| Token budget | agent-loader | Max 2,000 tokens per agent excerpt. Truncate at sentence boundary. |
| ROI claims | compilePrompt | "Never claim more than 3x improvement without citing evidence. Use ranges, not exact numbers." |
| Fallback prompt | ai-routes | If agent file load fails or excerpt is empty, use existing AMO AI prompt unchanged. |
| JSON last | compilePrompt | JSON schema is always the LAST section. Agent excerpt goes in the MIDDLE. |
| Agent cap | Catalog | Default view: 15-20 curated agents. Full catalog behind "Show all" toggle. |
| Output QA | Proposals only | Reality Checker excerpt reviews proposal output before display. |
| Input limit | Agent Runner | Max 4,000 characters. Rate limit 10 runs/hour on free tier. |
| Cache | Insights, CRM | Insights: 4-hour cache. CRM scores: 1-hour cache. |
| Agent language | All UI | Use "Your AI Team" — never "agents", "prompts", or "system messages" in client-facing UI. |

---

## 11. Token & Cost Budget

| Feature | Input Tokens | Output Tokens | Calls | Cost (Gemini Flash) |
|---|---|---|---|---|
| Wizard Step 3 (recommendations) | ~1,500 | ~1,000 | 1 | $0.0002 |
| Wizard Step 4 (proposal, 3 agents) | ~5,000 | ~3,000 | 3 | $0.001 |
| Wizard Step 4 (readiness) | ~1,500 | ~800 | 1 | $0.0002 |
| Wizard Step 5 (roadmap) | ~1,500 | ~1,500 | 1 | $0.0003 |
| Dashboard insight refresh | ~4,000 | ~2,000 | 3 | $0.0008 |
| CRM deal score (single) | ~800 | ~400 | 1 | $0.0001 |
| Agent Runner (single) | ~2,000 | ~2,000 | 1 | $0.0004 |
| **Full wizard session** | | | **6** | **~$0.002** |
| **Daily active user** | | | **4** | **~$0.001** |

**At 1,000 DAU:** ~$90/month AI cost. Not a concern at any foreseeable scale.

---

## 12. Implementation Plan

### Phase 1 — Prompt Layer (Week 1-2)

**Goal:** Better AI output quality with zero UI changes.

**Ships:**
- Agent-powered wizard Steps 3, 4, 5
- `agent-loader.tsx` utility
- Token budget + ROI + fallback guardrails

**Tasks:**
1. Create `agent-loader.tsx` (extractExcerpt, selectAgents, compilePrompt)
2. Modify `ai-routes.tsx` — import agent-loader, update 3 routes
3. Add guardrails: token budget (2K max), ROI cap (3x), JSON-last
4. Add fallback: if agent load fails, use existing prompt
5. Test: A/B comparison with 5 sample client profiles

**Risk:** LOW — same JSON output, same frontend, just better prompts.

**Success criteria:**
- Agent-augmented output is measurably more specific than current output
- Zero JSON parsing errors
- Token cost < $0.005 per wizard session

**Dependencies:** Agency repo cloned at `/home/sk/sunv2/agency` (done)

### Phase 2 — Dashboard + Catalog (Week 3-5)

**Goal:** Visible product upgrade. Users see their AI team.

**Ships:**
- "Your AI Team" in wizard Steps 4-5
- Agent Team widget on dashboard
- Agent Catalog page + Agent Detail page
- Agent-attributed insight cards
- 7 new Supabase tables
- `parse-agents` script

**Tasks:**
1. Supabase migration: 7 new tables
2. Build `parse-agents` script (populate agent_catalog from .md files)
3. Create `agent-routes.tsx` (catalog, detail, team, assign, templates)
4. Create `insight-routes.tsx` (list, update status, refresh)
5. Build `AITeamSection` + `AgentTeamCard` (wizard)
6. Build `AgentTeamWidget` + `AgentStatusRow` (dashboard)
7. Build `AgentCatalogPage` + `DivisionTabBar` + `AgentCard` + `AgentCardGrid`
8. Build `AgentDetailPage` + tabs
9. Enhance `InsightCard` with agent badge + priority colors
10. Create 8-10 preset team templates

**Risk:** MEDIUM — new tables + new UI + new routes.
**Mitigate:** Ship catalog as read-only first, add assignment logic second.

**Success criteria:**
- Wizard shows "Your AI Team" for every completed session
- Dashboard agent widget shows real status
- Catalog loads in < 2 seconds
- At least 15 agents curated with AMO AI descriptions

**Dependencies:** Phase 1 complete (agent-loader working)

### Phase 3 — Runner + CRM + Workflows (Week 6-8)

**Goal:** Full agent platform. Users run agents on demand.

**Ships:**
- Agent Runner page
- CRM deal scoring
- Workflow agent nodes
- Multi-agent proposal generation
- Finance Tracker projection widget

**Tasks:**
1. Build `AgentRunnerPage` (split-pane input/output)
2. Add POST `/agents/:slug/run` endpoint
3. Add deal scoring to CRM routes
4. Build `DealHealthBar` + `DealScoreCard` components
5. Add agent node type to workflow engine
6. Build multi-agent orchestration for proposals
7. Add Reality Checker QA step for proposal output
8. Build `AgentProjectionCard` for financial page

**Risk:** MEDIUM — multi-agent calls could hit rate limits.
**Mitigate:** Sequential fallback if parallel fails, cache aggressively, respect 60 RPM.

**Success criteria:**
- Agent Runner returns output in < 5 seconds
- CRM deal scores update within 30 seconds of deal change
- Multi-agent proposals show 3 distinct specialist perspectives
- Workflow agent nodes execute reliably

**Dependencies:** Phase 2 complete (tables, catalog, assignments working)

---

## 13. User Journey

```
Visitor → Sign Up → Wizard Steps 1-2 (no agents)
    → Step 3: Agent-powered recommendations (trust: "this knows my business")
    → Step 4: Agent-written proposal + "Your AI Team" revealed (trust: "named specialists")
    → Step 5: Team + roadmap confirmed, project created
    → Dashboard: Agent Team widget + first insights arrive
    → Agent Catalog: browse, discover, run agents on tasks
    → CRM: deal scores with risk labels
    → Ongoing: rotating insights, agent-powered workflows
```

**Drop-off risks and mitigations:**

| Risk Point | Mitigation |
|---|---|
| Step 3: recommendations feel generic | Agent specificity: reference client data, not boilerplate |
| Step 4: proposal too vague | Multi-agent: 3 perspectives, specific numbers |
| Dashboard: feels empty | Agent widget shows "Setting up..." with expected timeline |
| Users don't understand "agents" | Use "Your AI Team" language. Show name + role + task. Never say "prompt." |

**Trust-building moments:**
1. Specific numbers in recommendations (Step 3)
2. Named agents with clear roles (Step 4)
3. Quick wins section (Step 5)
4. Agent activity on dashboard ("Rapid Prototyper: Building bot spec — 2 hours ago")
5. Verifiable outputs (Agent Runner)
6. ROI tracking (Financial page)

---

## 14. Risks

### Technical

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| JSON breaks with long agent prompts | HIGH | HIGH | Max 2K tokens. JSON schema ALWAYS last. |
| Agent .md files too large for Deno | MEDIUM | MEDIUM | Pre-parse at build time → sections jsonb column |
| Multi-agent rate limits | LOW | MEDIUM | Sequential fallback. Max 3 parallel. Cache results. |
| Agent catalog stale after repo update | LOW | LOW | Pin to commit. Re-parse on deploy or manual trigger. |

### Product

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Unrealistic ROI claims | MEDIUM | HIGH | "Use ranges, cite evidence, never claim 3x+ without proof" |
| Wrong agent selected | MEDIUM | HIGH | Multi-dimensional selection (goal + industry + size + challenge) |
| Too many agents overwhelm users | MEDIUM | MEDIUM | Curate 15-20. Full catalog behind toggle. |
| Agent tone conflicts with brand | MEDIUM | MEDIUM | AMO AI base prompt always Layer 1. Agent never overrides. |
| Users don't understand agents | MEDIUM | LOW | "Your AI Team" language. Show role + task, not technical details. |

### Business

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Token costs increase 3-5x | HIGH | LOW | Even 5x is under $0.01/session. Not a concern. |
| Upstream repo changes | LOW | LOW | Pinned to cloned commit. Treat as one-time import. |

---

## 15. Success Metrics

### Product

| Metric | Target | How Measured |
|---|---|---|
| Wizard output specificity | 80%+ reference client data | Manual review of 50 sessions |
| Agent team visibility | 100% wizard completions show team | Query agent_assignments |
| Insight engagement | 30%+ acted or viewed within 24h | Query insight_cards status |
| Agent Runner usage | 5+ runs/week per active user | Query agent_runs |
| Catalog browse rate | 40%+ dashboard users visit catalog | Analytics event |

### Technical

| Metric | Target | How Measured |
|---|---|---|
| Agent augmented response time | < 5 seconds (Flash) | agent_runs.duration_ms |
| JSON schema compliance | 99%+ | Parse success rate in ai_run_logs |
| Fallback rate | < 5% (agent load failures) | Error logs in agent_runs |
| Cache hit rate | > 60% for insights, > 80% for catalog | ai_cache hit/miss ratio |

### Cost

| Metric | Target | How Measured |
|---|---|---|
| Cost per wizard session | < $0.01 | Sum tokens x rate |
| Monthly AI cost at 1K DAU | < $150 | Aggregate ai_run_logs |

---

## 16. Design System Alignment

All new components follow the parent PRD design system:

| Element | Specification |
|---|---|
| Agent card radius | 4px or 8px (matches existing cards) |
| Agent avatar | Emoji character in 40px colored circle (color from frontmatter) |
| Priority colors | High: `#EF4444` (red), Medium: `#F59E0B` (amber), Low: `#9CA3AF` (gray) |
| Division badge | Pill-shaped, 12px text, division-specific background tint |
| Fonts | Playfair Display (headings), Lora (body) — same as parent |
| Spacing | 8px unit — same as parent |
| Shadows | None (use borders) — same as parent |
| Max content width | 1200px — same as parent |

---

## 17. File References

| Path | Contents |
|---|---|
| `prompts/wireframes/00-executive-summary.md` | 3-phase overview |
| `prompts/wireframes/01-screen-inventory.md` | All screens: 10 enhanced + 3 new + 5 rejected |
| `prompts/wireframes/02-wizard-enhancements.md` | Steps 3-5 wireframes with sample content |
| `prompts/wireframes/03-dashboard-enhancements.md` | Agent Team widget, insights, CRM scoring |
| `prompts/wireframes/04-new-screens.md` | Agent Catalog, Detail, Runner wireframes |
| `prompts/wireframes/05-user-journey.md` | 8-stage journey with sample client walkthroughs |
| `prompts/wireframes/06-agent-system-mapping.md` | Agent-to-product mapping, combination patterns |
| `prompts/wireframes/07-data-model.md` | Table schemas with sample data |
| `prompts/wireframes/08-frontend-backend-wiring.md` | Component hierarchy, routes, state management |
| `prompts/wireframes/09-implementation-plan.md` | 3-phase rollout with guardrails |
| `prompts/wireframes/10-risks-and-guardrails.md` | Risk matrix, all review corrections applied |
| `prompts/wireframes/11-mermaid-er-diagram.md` | ER diagrams |
| `prompts/wireframes/12-mermaid-data-flow.md` | Data flow diagrams |
| `prompts/wireframes/13-mermaid-prompt-compiler.md` | Prompt compilation diagrams |
| `prompts/wireframes/14-mermaid-user-journey.md` | User journey state machines |
| `prompts/wireframes/15-mermaid-agent-orchestration.md` | Sequence diagrams |
| `prompts/wireframes/16-mermaid-additional.md` | Component trees, Gantt, token budget |
| `prompts/plan/01-corrected-integration-plan.md` | Prompt Compiler architecture + code |
| `prompts/plan/02-reusable-assets-inventory.md` | Agent file inventory + rankings |
| `prompts/plan/03-prompt-pack.md` | 6 reusable prompt templates |
| `prompts/plan/04-risks-and-limitations.md` | Risk assessment |
| `summary.md` | Integration summary with 10 real-world examples |
| `agency/` | Cloned agency-agents repo (120+ .md files) |
| `prd.md` | Parent PRD (AMO AI v3.0) |

---

## 18. Relationship to Parent PRD

This document extends `/prd.md` (v3.0). It does **not** replace it.

| Parent PRD Section | This PRD |
|---|---|
| S6 Screens & Routes | Adds 3 new routes, enhances 7 existing |
| S7 AI Agents | Adds 120+ agent personas via Prompt Compiler |
| S8 Data Model | Adds 7 new tables, no changes to existing |
| S10 Services Catalog | Agents complement services — agents power recommendations, services are what gets recommended |
| S11 Workflows | Adds agent-as-workflow-node |
| S14 Performance | Agent calls target < 5s. Same budget constraints. |

**What this PRD does NOT change:**
- Auth system
- Wizard structure (still 5 steps)
- Dashboard layout (sidebar + main)
- Design system (colors, fonts, spacing)
- Billing/payments
- Existing Edge Functions (gemini.tsx unchanged)

---

## Document History

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-03-12 | Initial PRD based on wireframe set (00-16), integration plan, and review corrections (90/100 validated score) |
