# Frontend and Backend Wiring

> Figma Make: Create a technical architecture diagram showing the frontend component tree on the left (pages and components as nested boxes), the API layer in the middle (edge function routes as horizontal bars), and the database tables on the right (small table icons). Show arrows for data flow. Use a blueprint/technical drawing aesthetic with dark blue background and white lines.

---

## Frontend Component Hierarchy

```
App
 |
 +-- WizardPage (/wizard)
 |    +-- WizardLayout
 |    +-- WizardSidebar (steps 1-5)
 |    +-- StepBusinessContext         (no change)
 |    +-- StepIndustryDiagnostics     (smarter questions)
 |    +-- StepSystemRecommendations   (ENHANCED)
 |    |    +-- RecommendationCard     (existing, enhanced content)
 |    |    +-- AgentReasoningBadge    (NEW: shows which agent powered this rec)
 |    +-- StepExecutiveSummary        (ENHANCED)
 |    |    +-- ProposalSection        (existing, agent-written content)
 |    |    +-- AITeamSection          (NEW)
 |    |    |    +-- AgentTeamCard     (NEW: avatar, name, role, first task)
 |    |    +-- ReadinessScorePanel    (existing, enhanced by Reality Checker)
 |    +-- StepLaunchProject           (ENHANCED)
 |         +-- AgentTeamGrid          (NEW: full team with first tasks)
 |         +-- RoadmapPreview         (existing, enhanced by Project Shepherd)
 |         +-- QuickWinsChecklist     (existing)
 |
 +-- DashboardLayout (/app)
      +-- DashboardSidebar
      +-- DashboardHeader
      +-- DashboardHome (/app/dashboard)
      |    +-- MetricCards            (existing)
      |    +-- AgentTeamWidget        (NEW)
      |    |    +-- AgentStatusRow    (NEW: agent name, status, last output)
      |    +-- InsightsFeed           (NEW: latest 3 insight cards)
      |    +-- RoadmapTimeline        (existing)
      |
      +-- InsightsPage (/app/insights)
      |    +-- InsightFilters         (All / High / New tabs)
      |    +-- InsightCard            (ENHANCED: agent attribution badge)
      |
      +-- AgentsPage (/app/agents)
      |    +-- AgentsTabs             (NEW: Catalog | Monitor)
      |    +-- AgentCatalog           (NEW)
      |    |    +-- DivisionTabs      (Engineering, Sales, Marketing, ...)
      |    |    +-- AgentSearch        (search input)
      |    |    +-- AgentCardGrid      (grid of AgentCard)
      |    |    +-- AgentCard          (emoji, name, desc, division, actions)
      |    +-- AgentMonitor           (existing run logs, moved to tab)
      |
      +-- AgentDetailPage (/app/agents/:slug)
      |    +-- AgentProfileHeader     (emoji, name, vibe, division)
      |    +-- AgentDetailTabs        (About | Capabilities | Use Cases | History)
      |    +-- AgentAbout             (description, mission, rules, metrics)
      |    +-- AgentCapabilities      (detailed methodology)
      |    +-- AgentUseCases          (example tasks)
      |    +-- AgentRunHistory        (table of past runs)
      |
      +-- AgentRunnerPage (/app/agents/:slug/run)
      |    +-- AgentRunnerInput       (context textarea, task textarea, format radio)
      |    +-- AgentRunnerOutput      (formatted output, metadata, copy/save/share)
      |
      +-- CRMPipelinePage (/app/crm/pipelines)
      |    +-- DealCard               (ENHANCED: health score bar + agent badge)
      |
      +-- FinancialPage (/app/financial)
      |    +-- AgentProjectionCard    (NEW: Finance Tracker projections)
      |
      +-- WorkflowsPage (/app/workflows)
           +-- WorkflowCanvas         (ENHANCED: agent node type)
           +-- AgentNodeConfig         (NEW: select agent, write task, set output format)
```

---

## New Reusable UI Components

| Component | Used In | Props |
|---|---|---|
| AgentAvatar | Everywhere agents appear | slug, size (sm/md/lg) — shows emoji in colored circle |
| AgentBadge | Insight cards, deal cards, recommendations | slug — compact: emoji + name |
| AgentTeamCard | Wizard Step 4, Step 5, Dashboard | slug, roleDescription, firstTask, status |
| AgentStatusRow | Dashboard Agent Team Widget | slug, status, lastOutput, lastRunAt |
| InsightCard | Insights page, Dashboard feed | priority, agentSlug, title, body, impactLabel |
| DealHealthBar | CRM Pipeline deal cards | score (0-100), riskLabel, agentSlug |

---

## Route Structure

```
/wizard                          (existing)
/wizard/processing               (existing)
/wizard/proposal                 (existing)
/app/dashboard                   (existing, enhanced)
/app/agents                      (existing, add Catalog tab)
/app/agents/catalog              (NEW — agent catalog)
/app/agents/:slug                (NEW — agent detail)
/app/agents/:slug/run            (NEW — agent runner)
/app/insights                    (existing, enhanced)
/app/crm/pipelines               (existing, enhanced)
/app/financial                   (existing, enhanced)
/app/workflows                   (existing, enhanced)
```

---

## State Management

```
Agent Team state:
- Fetched from agent_assignments table via agentApi.getTeam(projectId)
- Stored in useDashboardData() hook alongside existing data
- Refreshed on dashboard mount and after agent runs

Agent Catalog state:
- Static JSON index loaded once (agent-index.json, generated at build time)
- Division filter + search = client-side filtering (no API call)
- Assignment counts fetched separately via agentApi.getAssignmentCounts()

Agent Runner state:
- Local state: input fields (context, task, format)
- Submitted via agentApi.runAgent(slug, context, task, format)
- Response displayed in output panel
- Run saved to agent_runs table automatically

Insight Cards state:
- Fetched via insightApi.getInsights(projectId, filters)
- Status updates (viewed, acted, dismissed) via insightApi.updateStatus(id, status)
```

---

## Loading, Error, and Empty States

| Component | Loading | Error | Empty |
|---|---|---|---|
| Agent Team Widget | Skeleton: 3 rows with pulse animation | "Unable to load your team. Retry." | "No agents assigned yet. Complete the wizard to get your team." |
| Agent Catalog | Skeleton: 6 card placeholders | "Unable to load agents. Retry." | Never empty (static data) |
| Agent Runner Output | "Agent is thinking..." with spinner | "Agent run failed. Check your input and try again." | "Run the agent to see output here." |
| Insight Cards | Skeleton: 3 card placeholders | "Unable to load insights. Retry." | "No insights yet. Your agents will generate insights as they analyze your project." |
| CRM Deal Health | Small skeleton bar | Score hidden, deal card shows normally | "Score pending" badge |

---

## Backend — Edge Function Updates

### Existing routes to modify

| Route | File | Change |
|---|---|---|
| POST /system-recommendations | ai-routes.tsx | Load agent excerpt via agent-loader, compile prompt |
| POST /readiness-score | ai-routes.tsx | Add Reality Checker + Finance Tracker excerpts |
| POST /generate-roadmap | ai-routes.tsx | Add Project Shepherd + Sprint Prioritizer excerpts |
| POST /industry-diagnostics | ai-routes.tsx | Context-based agent selection for questions |

### New routes to add

| Route | Method | Purpose | File |
|---|---|---|---|
| /agents/catalog | GET | Return agent_catalog with optional division filter | agent-routes.tsx (NEW) |
| /agents/:slug | GET | Return single agent detail with assignment count | agent-routes.tsx |
| /agents/:slug/run | POST | Execute agent on user task, return output | agent-routes.tsx |
| /agents/team/:projectId | GET | Return agent_assignments for project | agent-routes.tsx |
| /agents/team/:projectId | POST | Assign agent to project (manual) | agent-routes.tsx |
| /insights/:projectId | GET | Return insight_cards with filters | insight-routes.tsx (NEW) |
| /insights/:id/status | PATCH | Update insight status (viewed/dismissed) | insight-routes.tsx |
| /crm/deals/:id/score | POST | Run Pipeline Analyst on deal, return score | crm-routes.tsx (modify) |

### New edge function file: agent-routes.tsx

Handles agent catalog, detail, runner, and team management.

### New edge function file: agent-loader.tsx

Core utility for loading and compiling agent prompts.

Contains:
- extractExcerpt(filePath, sections) — parse agent .md, return selected sections
- selectAgents(route, clientContext) — choose agents based on goal + industry + size
- compilePrompt(base, excerpt, instructions, schema) — assemble 4-layer prompt
- getAgentMeta(slug) — return parsed frontmatter for a single agent

### How agent prompts are loaded at runtime

```
1. Route receives request with client context
2. selectAgents() determines which agent(s) to use
3. extractExcerpt() reads agent .md file, strips frontmatter, extracts sections
4. compilePrompt() assembles: AMO AI base + agent excerpt + route instructions + JSON schema
5. callGemini() receives the compiled prompt (existing function, no changes)
6. Response logged to agent_runs table
7. Response cached in ai_cache table (existing)
```

### How structured outputs are enforced

JSON schema instructions are ALWAYS the last section of the compiled prompt. This is critical because LLMs prioritize the end of the prompt for output formatting. The agent excerpt goes in the middle — it provides reasoning methodology but does not control output format.

### How multi-agent calls work

For proposals and insights, run 2-3 calls in parallel:

```
Request arrives
    |
    +---> callGemini(agent1prompt, ...) ---+
    |                                       |
    +---> callGemini(agent2prompt, ...) ---+---> merge outputs
    |                                       |
    +---> callGemini(agent3prompt, ...) ---+
    |
    v
Return merged result
```

Each call is independent. If one fails, the others still return. Failed agent output is replaced with a "This perspective is unavailable" placeholder.

### How failures and fallbacks work

```
Agent call fails?
    |
    +-- Retry 1 (1s delay)
    |
    +-- Retry 2 (2s delay)
    |
    +-- Retry 3 (4s delay)
    |
    +-- Give up: use existing AMO AI prompt WITHOUT agent excerpt
        (graceful degradation to current behavior)
```

Existing callGemini() already has retry logic with backoff. Agent loading adds one new failure mode: agent .md file not found. Fallback: skip agent excerpt, use AMO AI base prompt only.

---

## Implementation Plan

### Phase 1 — Prompt Layer (Week 1-2)

Features:
- agent-loader.tsx utility (extractExcerpt, selectAgents, compilePrompt)
- Update 3 routes: system-recommendations, readiness-score, generate-roadmap
- No new tables, no new UI, no new routes

Tasks:
- Create agent-loader.tsx with excerpt extraction and prompt compilation
- Modify ai-routes.tsx to import agent-loader and use compiled prompts
- Test: compare output quality before/after for 5 sample clients
- Deploy edge function update

### Phase 2 — Dashboard + Catalog (Week 3-5)

Features:
- agent_catalog table + seed script
- agent_assignments table
- insight_cards table
- Agent Team widget on dashboard
- Agent Catalog page (browse + search)
- Agent Detail page
- Agent-attributed insight cards
- "Your AI Team" section in wizard Step 4 and 5

Tasks:
- Create Supabase migration for 4 new tables
- Build parse-agents script to populate agent_catalog
- Create agent-routes.tsx edge function
- Create insight-routes.tsx edge function
- Build AgentTeamWidget, AgentCatalog, AgentDetail components
- Build AITeamSection for wizard Step 4
- Build AgentTeamGrid for wizard Step 5
- Enhance InsightCard with agent badge
- Add Catalog tab to existing Agents page

### Phase 3 — Runner + Workflows + CRM (Week 6-8)

Features:
- Agent Runner page
- Agent workflow nodes
- CRM deal scoring with Pipeline Analyst
- Finance Tracker projection widget

Tasks:
- Build AgentRunnerPage with input/output split pane
- Add agent node type to workflow builder
- Modify CRM deal cards with health score
- Build AgentProjectionCard for financial page
- Add deal scoring route to crm-routes.tsx

---

## Risks and Recommendations

| Risk | Impact | Recommendation |
|---|---|---|
| Agent .md files too large for Deno.readTextFile in edge functions | Medium | Pre-parse at build time, store excerpts in agent_catalog.sections jsonb column |
| Agent catalog gets stale if repo updates | Low | Pin to commit hash, re-parse only on manual trigger |
| Multi-agent calls hit Gemini rate limits | Medium | Sequential fallback if parallel fails, respect 60 RPM limit |
| Users confused by "agent" concept | High | Use "Your AI Team" language, never say "prompt" or "system message" |
| Empty agent team for users who skip wizard | Medium | Show "Complete onboarding to get your AI team" CTA |
