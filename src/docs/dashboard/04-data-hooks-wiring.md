# 04 — DATA HOOKS & BACKEND WIRING
# Frontend Hooks, API Layer, Edge Functions, Data Flow

**Status:** NOT STARTED
**Parent Doc:** `00-dashboard-master.md`

---

## PURPOSE

This document specifies every data hook the dashboard needs, every API call those hooks make, every edge function endpoint involved, and the exact data flow from Supabase tables through the edge function through the frontend API layer through the hook into the React component. No ambiguity about where data comes from or how it gets to the screen.

---

## DATA FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          FRONTEND                                       │
│                                                                         │
│  DashboardHome                                                          │
│       │                                                                 │
│       ▼                                                                 │
│  useDashboardData()                                                     │
│       │                                                                 │
│       ├── wizardApi.list(userId, token)                                 │
│       │       │                                                         │
│       │       ▼                                                         │
│       │   GET /wizard/list/:userId ──→ wizard_sessions (RLS)           │
│       │       │                                                         │
│       │       ▼                                                         │
│       │   Returns: [{ id, current_step, status, updated_at }]          │
│       │       │                                                         │
│       │       ▼                                                         │
│       ├── wizardApi.load(sessionId, token)                              │
│       │       │                                                         │
│       │       ▼                                                         │
│       │   GET /wizard/:sessionId ──→ wizard_sessions + wizard_answers  │
│       │       │                                                         │
│       │       ▼                                                         │
│       │   Returns: { session, answers[], progress }                    │
│       │       │                                                         │
│       │       ▼                                                         │
│       ├── PARSE ai_results from each step                              │
│       │   ├── Step 1: answers.companyName, ai_results.analysis         │
│       │   ├── Step 2: ai_results.diagnostics                           │
│       │   ├── Step 3: ai_results.recommendations + selectedSystems     │
│       │   ├── Step 4: ai_results.readiness (score, dims, gaps)         │
│       │   └── Step 5: ai_results.roadmap (phases, wins, metrics)       │
│       │       │                                                         │
│       │       ▼                                                         │
│       ├── DERIVE dashboard state                                        │
│       │   ├── org: { name, industry, size }                            │
│       │   ├── readiness: { overall, breakdown, maturity, gaps }        │
│       │   ├── project: { name, phases, progress, systems }             │
│       │   ├── activities: [derived from answer timestamps]             │
│       │   └── metrics: { score, systemsCount, phase, roi }            │
│       │       │                                                         │
│       │       ▼                                                         │
│       └── Optional: aiApi call for /dashboard-insights                 │
│               │                                                         │
│               ▼                                                         │
│           POST /dashboard-insights ──→ callGemini ──→ ai_cache         │
│               │                                                         │
│               ▼                                                         │
│           Returns: { insights: [{ title, description, priority }] }    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## HOOKS SPECIFICATION

### useDashboardData

Location: /lib/hooks/useDashboardData.ts

Purpose: fetch and assemble all data the dashboard home page needs from a single hook call.

Input: userId (from useAuth), accessToken (from useAuth).

Returns:
- org: { name, industry, size, goal } or null
- readiness: { overallScore, scoreBreakdown, maturityLevel, gaps, strengths, nextSteps } or null
- project: { name, totalWeeks, investment, phases, quickWins, successMetrics, riskFactors } or null
- systems: { selected: string[], count: number }
- activities: { id, action, timestamp, entityType }[]
- metrics: { readinessScore, systemsCount, currentPhase, phaseCount, estimatedROI }
- sessionId: string or null
- sessionStatus: string (in_progress, completed)
- loading: boolean
- error: string or null
- refresh: () => void

Behavior:
1. On mount, if userId is available, call wizardApi.list(userId, accessToken)
2. From the list, find the most recent session (prefer status completed, fallback to in_progress)
3. Call wizardApi.load(sessionId, accessToken) to get full data
4. Parse ai_results from each answer row into typed dashboard state
5. Derive activities from answer updated_at timestamps
6. Derive metrics from parsed data
7. Set loading false
8. Expose a refresh function that re-runs the entire fetch

Caching: store the parsed result in a ref so navigating between dashboard pages does not re-fetch. The refresh function clears the cache and re-fetches. Consider a 60-second auto-refresh interval for the activity feed.

Error handling: if list returns empty, set sessionId null (triggers empty state). If load fails, set error message and expose retry via refresh. If individual ai_results are null for a step, that section shows "Not available" rather than crashing.

### useActivities

Location: /lib/hooks/useActivities.ts

Purpose: fetch activity feed data, initially derived from wizard data, later from activities table.

Input: sessionId, accessToken.

Returns:
- activities: { id, action, entityType, timestamp, metadata }[]
- loading: boolean
- error: string or null

MVP behavior: call wizardApi.load(sessionId) and derive activities from answer rows. Each answer row with ai_results generates an activity like "Business analyzed" with the updated_at timestamp. The session itself generates "Wizard completed" if status is completed.

Future behavior: call GET /activities/list/:sessionId and return proper activity rows.

### useProjectTasks

Location: /lib/hooks/useProjectTasks.ts

Purpose: manage task status for project detail and roadmap pages.

Input: sessionId, phases (from useDashboardData).

Returns:
- tasksByPhase: Record of phaseNumber to array of { index, title, status }
- toggleTask: (phaseNumber, taskIndex) => void
- phaseProgress: (phaseNumber) => { completed, total, percentage }
- loading: boolean

MVP behavior: task statuses stored in localStorage keyed by sessionId. Tasks are derived from the deliverables array in each roadmap phase. toggleTask cycles through not-started → in-progress → completed → not-started. phaseProgress calculates from current statuses.

Future behavior: task statuses stored in the tasks table via PATCH /tasks/:id. Real-time updates via Supabase Realtime subscription on tasks table.

### useDashboardInsights

Location: /lib/hooks/useDashboardInsights.ts

Purpose: fetch AI-generated insights for the insights panel.

Input: sessionId, accessToken.

Returns:
- insights: { id, priority, title, description, actionLabel, actionRoute }[]
- loading: boolean
- error: string or null
- refresh: () => void

MVP behavior (before /dashboard-insights endpoint exists): derive 2-4 insights locally from the readiness gaps and quick wins already in ai_results. Rules:
- If readiness has gaps with priority high, create a "HIGH" insight for the top gap
- If roadmap has quickWins, create a "SUGGESTION" insight for the first quick win
- If diagnostics has painPoints with severity high, create a "MEDIUM" insight
- Always include: "Schedule kickoff call" suggestion

Future behavior: call POST /dashboard-insights with sessionId and project state. Use the AI-generated response instead of derived insights.

---

## API LAYER ADDITIONS

Add to lib/supabase.ts:

### dashboardApi module

- getInsights: calls POST /dashboard-insights with sessionId and optional projectState, returns typed InsightsResponse
- getActivities: calls GET /activities/list/:sessionId, returns typed ActivitiesResponse
- updateTaskStatus: calls PATCH /tasks/:id with new status, returns success boolean (future, not MVP)

### Type additions

DashboardData: the full return type of useDashboardData

InsightsResponse: { insights: DashboardInsight[] }, where DashboardInsight has id, priority, title, description, actionLabel, actionRoute

ActivitiesResponse: { activities: ActivityItem[] }, where ActivityItem has id, action, entityType, entityId, timestamp, metadata

TaskStatusUpdate: { taskId, status, updatedBy }

---

## EDGE FUNCTION ADDITIONS

### POST /dashboard-insights (in ai-routes.tsx)

New route added to the ai Hono router.

Accepts: sessionId in request body. Optionally projectState with currentPhase, completedTasks, overdueMilestones.

Behavior:
1. Load wizard_answers for the session (all 5 steps) using adminClient
2. Extract readiness gaps, diagnostic pain points, system recommendations, roadmap quick wins, and success metrics
3. Assemble a context object summarizing the org's current state
4. Call callGemini with prompt type "dashboard-insights", a system prompt about project management recommendations, and the assembled context as user prompt
5. Parse the structured JSON response (2-4 insights)
6. Cache with 4-hour TTL
7. Return the insights array

System prompt: "You are a senior project advisor at AMO AI. The client has completed a discovery wizard and has an active AI transformation project. Based on their readiness score, diagnostic findings, selected systems, and roadmap progress, recommend 2-4 specific next actions they should take this week. Each recommendation must be actionable, specific (include numbers and data points from their analysis), and prioritized. Return JSON."

Response JSON structure: array of objects each with id (string), priority (high, medium, suggestion), title (string, max 60 chars), description (string, 2-3 sentences with specific data), actionLabel (string, button text), actionRoute (string, relative URL).

### GET /activities/list/:sessionId (in wizard-routes.tsx)

New route added to the wizard Hono router.

Accepts: sessionId as URL param.

Behavior:
1. Load wizard_answers for the session ordered by updated_at desc
2. Load wizard_sessions for the session
3. For each answer row, generate a derived activity based on step_number and whether ai_results exists
4. Add session-level activities (created, completed)
5. Sort all activities by timestamp desc
6. Return the activities array

Activity derivation map:
- Step 1 with ai_results → "Business profile analyzed"
- Step 1 without ai_results → "Business context entered"
- Step 2 with ai_results → "Industry diagnostics completed"
- Step 3 with ai_results → "AI systems recommended"
- Step 3 without ai_results → "Systems selected"
- Step 4 with ai_results → "Readiness scored: [score]/100"
- Step 4 without ai_results → "Executive summary drafted"
- Step 5 with ai_results → "Implementation roadmap generated"
- Session status completed → "Wizard completed"
- Session created → "Discovery session started"

---

## AUTH FLOW FOR DASHBOARD

```
User navigates to /app/dashboard
        │
        ▼
DashboardLayout renders
        │
        ▼
useAuth() checks for user
        │
        ├── user exists → render sidebar + header + Outlet
        │       │
        │       ▼
        │   useDashboardData(userId, accessToken)
        │       │
        │       ▼
        │   wizardApi.list(userId, accessToken)
        │       │
        │       ├── sessions found → load most recent → render dashboard
        │       │
        │       └── no sessions → render EmptyDashboard
        │
        └── user null, loading false → redirect to /login?return=/app/dashboard
                │
                ▼
            User signs in at /login
                │
                ▼
            Auth redirects to /app/dashboard (from return param)
                │
                ▼
            Dashboard renders with data
```

---

## DATA FRESHNESS STRATEGY

The dashboard should feel current without hammering the API.

| Data | Freshness | Strategy |
|------|-----------|----------|
| Wizard session + answers | Load once per page visit | Cached in hook ref, re-fetched on manual refresh |
| AI insights | Every 4 hours | Gemini cache TTL handles this server-side; frontend re-fetches on each mount |
| Activities | Every 60 seconds | Auto-refresh interval in useActivities, or Supabase Realtime when available |
| Task statuses | Real-time | Stored in localStorage (MVP), or Realtime subscription on tasks table (future) |
| Readiness score | On-demand | Only re-calculated when user clicks "Re-run Analysis" |

---

## ERROR HANDLING MATRIX

| Scenario | Frontend Behavior |
|----------|-------------------|
| wizardApi.list returns network error | Show full-page error card with retry button |
| wizardApi.list returns empty array | Show EmptyDashboard with wizard CTA |
| wizardApi.load returns 404 | Show "Session not found" with option to start new wizard |
| wizardApi.load returns 500 | Show error card with retry, log to console |
| ai_results null for step 4 | ReadinessScoreCard shows "—" with "Run analysis" link |
| ai_results null for step 5 | RoadmapTimeline shows static fallback phases |
| /dashboard-insights fails | AIInsightsPanel shows derived insights (local fallback) |
| Auth token expired | Supabase client auto-refreshes; if refresh fails, redirect to /login |
| Slow connection (> 3s) | Skeleton screens visible immediately, data fills in progressively |

---

## PROGRESSIVE ENHANCEMENT PATH

### Phase 1 — MVP (zero new tables)
All data from wizard_sessions and wizard_answers via existing endpoints. Tasks in localStorage. Activities derived from timestamps. Insights derived locally.

### Phase 2 — With activities table
Activities read from the activities table. Task changes and milestone completions log activities. Activity feed is live via Realtime subscription.

### Phase 3 — With projects + tasks tables
Projects read from the projects table. Tasks read from the tasks table with proper status persistence. Milestones read from the milestones table. Phase progress calculated from task rows.

### Phase 4 — With AI insights endpoint
POST /dashboard-insights returns Gemini-generated contextual recommendations. Insights are cached server-side with 4-hour TTL.

### Phase 5 — With Realtime
Task status changes broadcast via Realtime. Activity feed updates in real-time. Presence shows connected collaborators.

Each phase is independently deployable. The hooks abstract the data source so components never know whether they are reading from ai_results jsonb or a proper table.

---

## CLIENT MANAGEMENT HOOKS & WIRING

### useClients

Location: /lib/hooks/useClients.ts

Purpose: fetch paginated, filtered, sorted client list for the CRM table.

Input: filters (search, status, industry, consultantId), sort (column, direction), pagination (page, pageSize), accessToken.

Returns:
- clients: ClientListItem[] (name, industry, status, primary contact, wizard progress, project count, last activity, health score, consultant)
- total: number
- filterOptions: { industries: string[], consultants: { id, name }[] }
- loading: boolean
- error: string or null
- refresh: () => void

Behavior: calls POST /dashboard/clients with filters, sort, page, pageSize. Edge function queries clients with joins to crm_contacts (primary), wizard_sessions, wizard_answers (step count), projects (count), activities (max date), team_members (consultant). Health score computed in handler.

URL sync: filters, sort column, sort direction, page, and pageSize sync to URL search params via useSearchParams from react-router. Changing any filter resets page to 1. This makes filtered views shareable via URL.

Debounce: search input debounces 300ms before updating filters.search and triggering refetch.

Refetch triggers: after createClient, updateStatus, or assignConsultant mutations.

### useClientDetail

Location: /lib/hooks/useClientDetail.ts

Purpose: fetch full profile for a single client (used by the detail panel).

Input: clientId (string or null), accessToken.

Returns:
- client: ClientDetail or null (all fields plus contacts array, projects array, readiness score)
- activities: ActivityItem[] (last 20 engagement events)
- loading: boolean
- error: string or null

Behavior: when clientId is non-null, calls POST /dashboard/clients/:id. Returns full client with all crm_contacts, all projects, recent activities, wizard progress, and readiness score. When clientId is null, returns null (panel closed).

### useClientMutations

Location: /lib/hooks/useClientMutations.ts

Purpose: create, update, assign, and export clients.

Returns:
- createClient(input): inserts into clients + crm_contacts, returns new ClientListItem
- updateStatus(clientIds[], status): bulk update via PUT /dashboard/clients/status
- assignConsultant(clientIds[], consultantId): bulk assign via PUT /dashboard/clients/assign
- exportCSV(clientIds[]): calls POST /dashboard/clients/export, returns Blob for download
- isLoading: boolean

Each mutation calls refresh on useClients after success.

### API Layer Additions (lib/supabase.ts)

clientApi module:
- list(filters, sort, pagination, token): POST /dashboard/clients
- detail(clientId, token): POST /dashboard/clients/:id
- create(input, token): POST /dashboard/clients/create
- updateStatus(clientIds, status, token): PUT /dashboard/clients/status
- assignConsultant(clientIds, consultantId, token): PUT /dashboard/clients/assign
- exportCSV(clientIds, token): POST /dashboard/clients/export

### Edge Function Routes (new file: client-routes.tsx)

POST /dashboard/clients: paginated list with filters. Joins clients, crm_contacts, wizard_sessions, wizard_answers, projects, activities, team_members. Computes health score per client. Returns clients array plus total count plus filter option values.

POST /dashboard/clients/:id: single client detail. All contacts, all projects, recent 20 activities, wizard progress, readiness score from step 4.

POST /dashboard/clients/create: insert into clients, optionally insert into crm_contacts with is_primary true. Returns new client.

PUT /dashboard/clients/status: batch update clients.status where id in array. Returns count updated.

PUT /dashboard/clients/assign: batch update clients.assigned_consultant_id where id in array. Returns count updated.

POST /dashboard/clients/export: query selected clients with all fields, format as CSV string, return with Content-Type text/csv.

POST /dashboard/clients/health: recompute health scores for specified clients (or all). Health formula: activity_frequency * 0.3 + wizard_completion * 0.3 + milestone_completion * 0.2 + recency * 0.2.

### MVP Without Tables

Before clients and crm_contacts tables exist, derive client data from wizard_sessions. Each session with a unique user_id becomes a virtual "client." Company name from step 1 answers.companyName. Industry from step 1 answers.industry. Wizard progress from step completion. No contacts, no consultant assignment, no bulk actions. Read-only list with progress indicators.

---

## PROJECT DELIVERY HOOKS & WIRING

### useProject

Location: /lib/hooks/useProject.ts

Purpose: fetch project metadata, phases, and selected systems for the project detail page.

Input: projectId (or sessionId for MVP), accessToken.

Returns:
- project: { name, clientName, status, totalWeeks, investment, overallProgress }
- phases: { phaseNumber, title, weekRange, systems, progress, status, deliverables, milestones }[]
- selectedSystems: { id, name, description }[]
- quickWins: string[]
- riskFactors: { risk, mitigation }[]
- successMetrics: { metric, target, timeframe }[]
- loading: boolean
- error: string or null

MVP behavior: calls wizardApi.load(sessionId) and parses step 5 ai_results.roadmap into typed project state. Systems from step 3 selections mapped to AI_SYSTEMS static data. Phase progress calculated from task statuses (from useProjectTasks).

Future behavior: calls GET /projects/:id which returns project with phases, systems, milestones from proper tables.

### useProjectTasks

Location: /lib/hooks/useProjectTasks.ts

Purpose: manage tasks per phase with status toggling and creation.

Input: sessionId, phases (from useProject).

Returns:
- tasksByPhase: Record of phaseNumber to { id, title, status, priority, assigneeId, dueDate }[]
- tasksByStatus: (phaseNumber) => { todo, inProgress, review, done } grouped arrays
- moveTask: (taskId, newStatus) => void — optimistic update + persist
- createTask: (phaseNumber, title, priority, assigneeId) => void
- updateTask: (taskId, updates) => void
- phaseProgress: (phaseNumber) => { completed, total, percentage }
- loading: boolean

MVP behavior: tasks derived from deliverables arrays in roadmap phases. Each deliverable string becomes a task with a generated ID (sessionId-phase-index). Status stored in localStorage keyed by task ID. moveTask updates localStorage and recalculates phase progress. createTask adds to localStorage. No server persistence.

Future behavior: tasks read from tasks table via GET /projects/:id/tasks. moveTask calls PATCH /tasks/:id. createTask calls POST /tasks. Optimistic update with rollback on error. Activity logged on every status change.

### useMilestones

Location: /lib/hooks/useMilestones.ts

Purpose: manage milestones and deliverable checklists.

Input: sessionId, phases (from useProject).

Returns:
- milestones: { id, title, dueDate, status, phaseNumber, deliverables: { id, title, completed }[] }[]
- toggleDeliverable: (milestoneId, deliverableId) => void
- milestoneStatus: (milestoneId) => upcoming | at-risk | completed | overdue
- loading: boolean

MVP behavior: milestones derived from phases[n].milestones arrays. Deliverables derived from a subset of phase deliverables associated with each milestone. Due dates derived from phase week ranges. Completion states stored in localStorage.

At-risk logic: if days until due date < 3 AND has uncompleted deliverables, status = at-risk. If current date > due date AND not all deliverables completed, status = overdue.

Future behavior: milestones and deliverables read from tables. toggleDeliverable calls PATCH /deliverables/:id. Auto-phase-advancement triggered server-side when all milestones complete.

### useTeam

Location: /lib/hooks/useTeam.ts

Purpose: fetch team members assigned to a project with workload data.

Input: orgId, projectId, accessToken.

Returns:
- members: { id, name, role, avatarUrl, taskCount, assignedTasks: string[] }[]
- loading: boolean

MVP behavior: returns empty array (no team_members table). Team avatar row hidden until data available.

Future behavior: queries team_members where org_id, counts tasks per member from tasks table.

### API Layer Additions (lib/supabase.ts)

projectApi module:
- getProject(projectId, token): GET /projects/:id
- getTasks(projectId, phaseNumber, token): GET /projects/:id/tasks
- createTask(task, token): POST /tasks
- updateTask(taskId, updates, token): PATCH /tasks/:id
- updateMilestone(milestoneId, updates, token): PATCH /milestones/:id
- updateDeliverable(deliverableId, updates, token): PATCH /deliverables/:id
- generateTasks(projectId, phaseNumber, token): POST /projects/:id/generate-tasks

---

## DATA FRESHNESS — Extended

| Data | Freshness | Strategy |
|------|-----------|----------|
| Client list | On filter/sort/page change | Refetch on parameter change, no auto-refresh |
| Client detail | On panel open | Fetched when clientId changes, cached during panel session |
| Client health scores | Daily or on-demand | Recomputed server-side, cached in clients table |
| Project metadata | Load once per visit | Cached in hook ref, refreshed on manual action |
| Task statuses | Real-time (MVP: instant localStorage) | MVP: localStorage, Future: Realtime subscription |
| Milestone statuses | On change | MVP: localStorage, Future: Realtime subscription |
| Team workload | On project load | Fetched alongside project data |

---

## ERROR HANDLING — Extended

| Scenario | Frontend Behavior |
|----------|-------------------|
| /dashboard/clients returns 500 | Show full-page error with retry button |
| /dashboard/clients returns empty | Show "No clients yet" empty state with add CTA |
| /dashboard/clients/:id returns 404 | Close detail panel, show toast "Client not found" |
| Client create fails | Show error in form dialog, keep form open |
| Bulk status update fails | Show toast error with count of failures |
| CSV export fails | Show toast "Export failed, try again" |
| Project load fails (no session) | Show "Project not found" with back link |
| Task drag-drop persist fails | Revert card to original column, show toast error |
| Milestone toggle fails | Revert checkbox, show toast error |
| Task create fails | Remove optimistic card, show error in form |

---

## PROGRESSIVE ENHANCEMENT — Extended

### Phase 6 — With clients + crm_contacts tables
Client list reads from proper tables. Full CRUD available. Bulk actions work. Health scores persist. Consultant assignment stores in clients.assigned_consultant_id.

### Phase 7 — With tasks + milestones + deliverables tables
Project delivery reads from proper tables. Drag-and-drop persists server-side. Task creation, assignment, and commenting work. Milestone and deliverable completion persists. Activity logging on all changes. AI task generation for new phases.

### Phase 8 — With team_members table
Team avatar row populates. Workload balancing visible. Suggested assignments from AI. Consultant filtering in client table works.

---

## CRM PIPELINE HOOKS & WIRING

### usePipeline

Location: /lib/hooks/usePipeline.ts

Purpose: fetch pipeline metadata, stages, and deals for the kanban board.

Input: pipelineId (string), accessToken.

Returns:
- pipeline: { id, name, stageCount, totalDeals, totalValue }
- stages: { id, name, position, color, dealCount, totalValue }[]
- loading: boolean
- error: string or null

Behavior: calls GET /crm/pipelines/:id. Edge function queries crm_pipelines, crm_stages (ordered by position), and crm_deals (grouped by stage_id) with joins to crm_contacts for contact names.

### useDeals

Location: /lib/hooks/useDeals.ts

Purpose: manage deals within a pipeline with drag-and-drop stage changes.

Input: pipelineId, accessToken.

Returns:
- dealsByStage: Record of stageId to DealCard[] (title, value, probability, contact, daysInStage, staleLevel)
- moveDeal: (dealId, newStageId) => void — optimistic update + PATCH /crm/deals/:id
- createDeal: (deal) => void — POST /crm/deals
- totalWeightedValue: number — sum(value × probability) across all active deals
- loading: boolean

Stale calculation: daysInStage = daysSince(stage_changed_at). staleLevel = none (<7d), amber (7-14d), red (>14d).

MVP: derive deals from wizard sessions. Each completed session = a deal in "Qualified" stage. Value estimated from system count × $8K. No drag-and-drop. Read-only.

### useDealDetail

Location: /lib/hooks/useDealDetail.ts

Purpose: fetch full deal profile for the detail panel.

Input: dealId (string or null), accessToken.

Returns:
- deal: { id, title, value, probability, stage, expectedClose, contact, owner, createdAt } or null
- interactions: { id, type, notes, createdAt, loggedBy }[]
- wizardData: { readinessScore, selectedSystems, topPainPoint, industry } or null
- loading: boolean

Behavior: calls GET /crm/deals/:id with interactions and linked wizard data via the deal's contact → client → org → wizard_sessions → wizard_answers.

### useInteractions

Location: /lib/hooks/useInteractions.ts

Purpose: log and display interactions on a deal.

Input: dealId, accessToken.

Returns:
- interactions: { id, type, notes, createdAt, loggedBy }[]
- logInteraction: (type, notes) => Promise<void> — POST /crm/interactions
- loading: boolean

### useForecast

Location: /lib/hooks/useForecast.ts

Purpose: compute weighted pipeline forecast by month for the chart.

Input: pipelineId, accessToken.

Returns:
- months: { month, dealCount, weightedValue }[]
- totalWeightedPipeline: number
- loading: boolean

Behavior: calls GET /crm/forecast. Edge function queries crm_deals grouped by month(expected_close_date), computes sum(value × probability / 100) per month.

### API Layer Additions (lib/supabase.ts)

crmApi module:
- listPipelines(token): GET /crm/pipelines
- getPipeline(pipelineId, token): GET /crm/pipelines/:id
- createDeal(deal, token): POST /crm/deals
- updateDeal(dealId, updates, token): PATCH /crm/deals/:id
- getDealDetail(dealId, token): GET /crm/deals/:id (with interactions + wizard data)
- logInteraction(dealId, type, notes, token): POST /crm/interactions
- getInteractions(dealId, token): GET /crm/deals/:id/interactions
- getForecast(pipelineId, token): GET /crm/forecast

### Edge Function Routes (new file: crm-routes.tsx)

GET /crm/pipelines: list all pipelines for the org.
GET /crm/pipelines/:id: pipeline with stages (ordered by position) and deals per stage.
POST /crm/deals: create a deal with title, value, probability, stage_id, contact_id.
PATCH /crm/deals/:id: update stage_id (drag-and-drop), value, probability, expected_close_date. Updates stage_changed_at when stage changes.
GET /crm/deals/:id: full deal with contact, interactions, linked wizard data.
POST /crm/interactions: log an interaction (type, notes, deal_id, logged_by).
GET /crm/deals/:id/interactions: interaction timeline for a deal.
GET /crm/forecast: weighted pipeline value grouped by month.

---

## AI INSIGHTS HOOKS & WIRING

### useWizardInsights

Location: /lib/hooks/useWizardInsights.ts

Purpose: fetch all 5 wizard steps' AI results assembled into a single typed structure for the insights page.

Input: sessionId, accessToken.

Returns:
- data: WizardInsightsData or null (contains business_profile, diagnostics, recommendations, readiness, roadmap, run_stats)
- loading: boolean
- error: string or null
- refetch: () => Promise<void>

Behavior: calls POST /dashboard/insights with session_id. Edge function queries wizard_answers for all 5 steps plus ai_run_logs for the session. Assembles typed response from ai_results jsonb per step.

### useReRunAnalysis

Location: /lib/hooks/useReRunAnalysis.ts

Purpose: orchestrate re-running all 5 AI agents with progress tracking.

Input: sessionId, accessToken.

Returns:
- reRun: () => Promise<void>
- progress: { step: number, total: 5, currentAgent: string } or null
- isRunning: boolean
- error: string or null

Behavior: first calls POST /dashboard/insights/snapshot to save current state. Then sequentially calls each AI agent endpoint (analyze-business, generate-diagnostics, recommend-systems, scorer, generate-roadmap), updating progress state after each completes. On completion, triggers refetch on useWizardInsights. If a step fails, continues with remaining steps and reports partial success.

### useSnapshots

Location: /lib/hooks/useSnapshots.ts

Purpose: list and compare historical analysis snapshots.

Input: sessionId, accessToken.

Returns:
- snapshots: ContextSnapshot[] (id, created_at, readiness_score, dimensions, source)
- loading: boolean
- compare: (snapshotId) => void — sets activeComparison
- activeComparison: ContextSnapshot or null

Behavior: calls POST /dashboard/insights/snapshots with session_id. Returns array ordered by created_at desc. compare() sets the active comparison snapshot, which the InsightsPage passes to DimensionRow components for delta display.

### API Layer Additions (lib/supabase.ts)

insightsApi module:
- getInsights(sessionId, token): POST /dashboard/insights
- listSnapshots(sessionId, token): POST /dashboard/insights/snapshots
- saveSnapshot(sessionId, token): POST /dashboard/insights/snapshot
- reRunAnalysis(sessionId, token): POST /dashboard/insights/rerun

---

## AI AGENT MANAGEMENT HOOKS & WIRING

### useAgentPerformance

Location: /lib/hooks/useAgentPerformance.ts

Purpose: fetch aggregated metrics for all agents over a time period. Powers the metrics row, catalog stats, and all performance charts.

Input: period ('7d' | '30d' | '90d'), accessToken.

Returns:
- summary: { totalRuns, successRate, cacheHitRate, estimatedCost } or null
- perAgent: { agentName, totalRuns, successRate, avgDurationMs, p95DurationMs, totalTokens, estimatedCost, cacheHitRate }[]
- dailyMetrics: { date, agentName, runs, avgDurationMs, totalTokens, successRate, estimatedCost }[]
- loading: boolean
- error: string or null

Behavior: calls POST /dashboard/agents/performance with period. Edge function queries ai_run_logs where created_at >= periodStart, groups by prompt_type for per-agent metrics, groups by date for daily time-series.

### useAIRunLogs

Location: /lib/hooks/useAIRunLogs.ts

Purpose: paginated, filterable run history for the History tab table.

Input: filters (agent, dateRange, success), page, pageSize, accessToken.

Returns:
- logs: AIRunLog[] (id, prompt_type, model, tokens, duration_ms, success, error_message, session_id, org_id, cache_hit, created_at)
- total: number
- loading: boolean
- error: string or null
- refetch: () => Promise<void>

Behavior: calls POST /dashboard/agents/logs with filters and pagination. Edge function queries ai_run_logs with filter conditions, paginated via range().

### useAICache

Location: /lib/hooks/useAICache.ts

Purpose: cache statistics and entry management for the Cache tab.

Input: accessToken.

Returns:
- stats: { totalEntries, activeEntries, expiredEntries, hitRate } or null
- entries: { id, promptHash, model, tokensUsed, createdAt, expiresAt, status }[]
- loading: boolean
- invalidate: (entryId) => Promise<void> — sets expires_at to now()
- purgeExpired: () => Promise<void> — deletes all expired entries
- refetch: () => Promise<void>

Behavior: calls GET /dashboard/agents/cache. Invalidate calls POST /dashboard/agents/cache/invalidate. Purge calls POST /dashboard/agents/cache/purge. Both trigger refetch on completion.

### API Layer Additions (lib/supabase.ts)

agentApi module:
- getPerformance(period, token): POST /dashboard/agents/performance
- getLogs(filters, page, pageSize, token): POST /dashboard/agents/logs
- getCache(token): GET /dashboard/agents/cache
- invalidateCache(entryId, token): POST /dashboard/agents/cache/invalidate
- purgeExpiredCache(token): POST /dashboard/agents/cache/purge
- retryRun(runId, sessionId, token): POST /dashboard/agents/retry

---

## DATA FRESHNESS — CRM, Insights, Agents

| Data | Freshness | Strategy |
|------|-----------|----------|
| Pipeline deals | On drag-drop + mount | Optimistic update on move, full fetch on mount |
| Deal interactions | On panel open + after log | Fetched when dealId changes, appended after logging |
| Forecast | On mount | Computed from deals, refreshed on deal value/probability change |
| Wizard insights (5 steps) | On mount | Cached in hook, refetched on re-run completion |
| Analysis snapshots | On mount | Fetched once, updated after re-run saves new snapshot |
| Agent performance | On period change | Refetched when period selector changes |
| Agent run logs | On filter/page change | Server-side paginated, refetched on parameter change |
| Agent cache | On tab activation | Fetched when Cache tab activates, refetched after invalidate/purge |

---

## ERROR HANDLING — CRM, Insights, Agents

| Scenario | Frontend Behavior |
|----------|-------------------|
| Pipeline load fails | Show "Unable to load pipeline" with retry |
| Deal drag-drop persist fails | Revert card to original column, show toast error |
| Deal create fails | Show error in dialog, keep form open |
| Interaction log fails | Show toast "Failed to log interaction", keep form content |
| Forecast data unavailable | Hide forecast section, show "No forecast data" |
| Insights load (no wizard) | Show empty state: "Complete the wizard to see your analysis" |
| Insights load (partial wizard) | Render completed sections, "Pending" badge on incomplete |
| Re-run fails mid-way | Show completed steps updated, failed step with error + retry |
| Re-run all steps fail | Show "Analysis re-run failed" with retry, keep previous data |
| Snapshot save fails | Show toast warning, continue with re-run (data loss of old snapshot) |
| Agent performance load fails | Show "Unable to load agent data" with retry |
| Agent logs pagination error | Show toast, keep current page data |
| Cache invalidate fails | Show toast "Failed to invalidate cache entry" |
| Cache purge fails | Show toast "Failed to purge expired entries" |
| Agent retry fails | Show toast with new error, add to error log |
| Non-admin accesses /app/agents | Show "Permission denied" message |

---

## PROGRESSIVE ENHANCEMENT — CRM, Insights, Agents

### Phase 9 — With crm_pipelines + crm_stages + crm_deals + crm_interactions tables
Full CRM pipeline with kanban, drag-and-drop, deal creation, interaction logging, and forecast chart. Wizard-to-deal auto-creation wired.

### Phase 10 — With context_snapshots table
Full snapshot comparison on AI insights page. Auto-save before re-run. Historical readiness score tracking.

### Phase 11 — With ai_run_logs and ai_cache improvements
Agent management reads live data. Cache management with invalidation and purge. Error retry works end-to-end. Cost estimation from real token data.

---

## WORKFLOW AUTOMATION HOOKS & WIRING

### useWorkflows

Location: /lib/hooks/useWorkflows.ts

Purpose: list, toggle, and delete workflow definitions.

Input: accessToken.

Returns:
- workflows: Workflow[] (id, name, description, trigger, conditions, actions, status, last_run_at, success_count, fail_count)
- toggle: (id, enabled) => Promise<void>
- remove: (id) => Promise<void>
- refetch: () => Promise<void>
- loading: boolean

Behavior: calls GET /dashboard/workflows on mount. Toggle calls POST /dashboard/workflows/toggle. Remove calls DELETE /dashboard/workflows/:id. Both trigger refetch.

### useWorkflowBuilder

Location: /lib/hooks/useWorkflowBuilder.ts

Purpose: manage the state of a workflow being created or edited.

Input: workflowId (optional, for editing existing), accessToken.

Returns:
- workflow: Partial<Workflow>
- setTrigger: (trigger) => void
- addCondition: (condition) => void
- removeCondition: (index) => void
- addAction: (action) => void
- removeAction: (index) => void
- reorderActions: (fromIndex, toIndex) => void
- save: () => Promise<{ id: string }>
- isDirty: boolean
- validation: { valid, errors[] }

Behavior: uses useReducer internally for complex nested state. If workflowId is provided, loads the existing workflow on mount. Save calls POST /dashboard/workflows.

### useWorkflowExecutions

Location: /lib/hooks/useWorkflowExecutions.ts

Purpose: view execution history and trigger manual runs.

Input: workflowId (optional filter), accessToken.

Returns:
- executions: WorkflowExecution[] (id, workflow_name, status, duration_ms, trigger_data, action_results, error_message)
- runNow: (workflowId, dryRun) => Promise<WorkflowExecution>
- retry: (executionId) => Promise<void>
- loading: boolean

Behavior: calls POST /dashboard/workflows/executions with optional workflow_id filter. runNow calls POST /dashboard/workflows/run. Retry calls POST /dashboard/workflows/retry.

### useWorkflowMetrics

Location: /lib/hooks/useWorkflowMetrics.ts

Returns: { runs_today, success_rate, avg_execution_ms, active_count, total_count }

### useAISuggestions

Location: /lib/hooks/useAISuggestions.ts

Returns: suggestions[], parseNaturalLanguage(input) => Partial<Workflow>

### API Layer Additions (lib/supabase.ts)

workflowApi module:
- listWorkflows(token): GET /dashboard/workflows
- saveWorkflow(workflow, token): POST /dashboard/workflows
- deleteWorkflow(id, token): DELETE /dashboard/workflows/:id
- toggleWorkflow(id, enabled, token): POST /dashboard/workflows/toggle
- getMetrics(token): GET /dashboard/workflows/metrics
- getExecutions(workflowId, token): POST /dashboard/workflows/executions
- runNow(workflowId, dryRun, token): POST /dashboard/workflows/run
- retryExecution(executionId, token): POST /dashboard/workflows/retry
- getSuggestions(token): GET /dashboard/workflows/suggestions
- parseNL(input, token): POST /dashboard/workflows/parse-nl

---

## DOCUMENT MANAGEMENT HOOKS & WIRING

### useDocuments

Location: /lib/hooks/useDocuments.ts

Purpose: list documents with filters for the grid/list view.

Input: filters (project_id, categories[], search, sort_by, sort_dir), accessToken.

Returns:
- documents: Document[] (id, name, category, file_type, url, project_name, uploaded_by_name, version, file_size, ai_summary, created_at)
- loading: boolean
- error: string | null
- refetch: () => Promise<void>

Behavior: calls POST /dashboard/documents with filters. Re-fetches when filters change (project, category, search, sort).

### useProjectFolders

Location: /lib/hooks/useProjectFolders.ts

Purpose: populate the folder tree sidebar.

Returns:
- folders: ProjectFolder[] (project_id, project_name, client_id, client_name, document_count)
- loading: boolean

Behavior: calls GET /dashboard/documents/folders on mount.

### useDocumentUpload

Location: /lib/hooks/useDocumentUpload.ts

Purpose: handle multi-file drag-and-drop upload with progress tracking.

Returns:
- upload: (files, projectId, category?) => Promise<void>
- uploads: UploadProgress[] (file_name, progress 0-100, status, error_message)
- isUploading: boolean

Behavior: for each file — (1) upload to Supabase Storage, (2) create document metadata via PUT /dashboard/documents. Queue max 3 concurrent uploads. Update progress state per file. Call refetch on documents when all complete.

### useDocumentVersions

Location: /lib/hooks/useDocumentVersions.ts

Purpose: show version history for a document.

Input: documentId, accessToken.

Returns:
- versions: DocumentVersion[] (id, version, uploaded_by_name, file_size, created_at, url)
- loading: boolean
- restore: (versionId) => Promise<void>

### useShareLink

Location: /lib/hooks/useShareLink.ts

Returns:
- generate: (documentId, expiresIn, password?) => Promise<ShareLink>
- loading: boolean

### API Layer Additions (lib/supabase.ts)

documentApi module:
- getFolders(token): GET /dashboard/documents/folders
- listDocuments(filters, token): POST /dashboard/documents
- createDocument(metadata, token): PUT /dashboard/documents
- deleteDocument(id, token): DELETE /dashboard/documents/:id
- getVersions(documentId, token): POST /dashboard/documents/versions
- restoreVersion(documentId, versionId, token): POST /dashboard/documents/versions/restore
- generateShareLink(documentId, expiresIn, password, token): POST /dashboard/documents/share
- autoGenerate(sessionId, type, token): POST /dashboard/documents/generate
- search(query, token): POST /dashboard/documents/search

---

## FINANCIAL DASHBOARD HOOKS & WIRING

### useRevenueMetrics

Location: /lib/hooks/useRevenueMetrics.ts

Purpose: compute revenue metrics for a date range.

Input: dateRange (start, end, preset), accessToken.

Returns:
- metrics: RevenueMetrics (mrr, mrr_trend, revenue_this_period, revenue_trend, outstanding, overdue, overdue_count) or null
- loading: boolean
- error: string | null
- refetch: () => void

Behavior: calls POST /dashboard/financial/metrics with date range. DateRange synced to URL search params via shared useDateRange() hook.

### useInvoices

Location: /lib/hooks/useInvoices.ts

Purpose: list and manage invoices with filtering.

Input: filters (status, dateRange, page, sortBy, sortDir, clientId?), accessToken.

Returns:
- invoices: Invoice[] (id, invoice_number, client_name, project_name, amount, status, issue_date, due_date, payment_date, line_items)
- total: number
- loading: boolean
- createInvoice: (data) => Promise<Invoice>
- updateInvoice: (id, data) => Promise<void>
- deleteInvoice: (id) => Promise<void>
- sendReminder: (id) => Promise<void>

### usePayments

Location: /lib/hooks/usePayments.ts

Input: invoiceId (optional), accessToken.

Returns:
- payments: Payment[]
- loading: boolean
- recordPayment: (data) => Promise<void>

### useRevenueCharts

Location: /lib/hooks/useRevenueCharts.ts

Input: dateRange, accessToken.

Returns:
- byClient: RevenueByClient[] (client_name, total_paid, pct_of_total)
- byService: RevenueByService[] (service_name, total_paid, pct_of_total)
- trend: RevenueTrendPoint[] (month, amount, is_forecast)
- loading: boolean

### useProfitability

Location: /lib/hooks/useProfitability.ts

Input: dateRange, accessToken.

Returns:
- projects: ProjectProfitability[] (project_name, client_name, budget, invoiced, paid, margin_pct)
- loading: boolean

### API Layer Additions (lib/supabase.ts)

financialApi module:
- getMetrics(dateRange, token): POST /dashboard/financial/metrics
- getInvoices(filters, token): POST /dashboard/financial/invoices
- createInvoice(data, token): POST /dashboard/financial/invoices/create
- updateInvoice(id, data, token): PUT /dashboard/financial/invoices/:id
- deleteInvoice(id, token): DELETE /dashboard/financial/invoices/:id
- sendReminder(id, token): POST /dashboard/financial/invoices/:id/reminder
- getPayments(invoiceId, token): POST /dashboard/financial/payments
- recordPayment(data, token): POST /dashboard/financial/payments/record
- getCharts(dateRange, token): POST /dashboard/financial/charts
- getProfitability(dateRange, token): POST /dashboard/financial/profitability
- getForecast(dateRange, token): POST /dashboard/financial/forecast

---

## DATA FRESHNESS — Workflows, Documents, Financial

| Data | Freshness | Strategy |
|------|-----------|----------|
| Workflow list | On mount + after save/toggle | Full fetch on mount, refetched after mutations |
| Workflow executions | On tab activation + after run/retry | Fetched when Execution Log tab activates |
| Workflow metrics | On mount | Fetched once, updates after run executions |
| AI suggestions | On tab activation | Fetched when AI Suggestions tab activates |
| Document list | On mount + after upload/delete | Refetched when filters change or upload completes |
| Folder tree | On mount + after upload/delete | Refetched when document count changes |
| Revenue metrics | On mount + date range change | Refetched when date range picker changes |
| Invoice list | On filter/page change + after mutations | Server-side paginated, refetched on parameter change |
| Revenue charts | On mount + date range change | Refetched with metrics |
| Profitability | On mount + date range change | Refetched with metrics |

---

## ERROR HANDLING — Workflows, Documents, Financial

| Scenario | Frontend Behavior |
|----------|-------------------|
| Workflow list load fails | "Unable to load workflows" with retry |
| Workflow save fails | Keep builder open, show validation or server error |
| Workflow toggle fails | Revert toggle to previous state, toast error |
| Workflow run fails | Show error in execution log, keep workflow status |
| Document upload fails | Error per file with retry, successful uploads kept |
| Document delete fails | Toast "Failed to delete document" |
| Share link generation fails | Toast "Failed to create share link" |
| Invoice creation fails | Keep modal open, show error |
| Payment recording fails | Keep modal open, show error |
| Revenue metrics load fails | "Unable to load financial data" with retry |
| Invoice send reminder fails | Toast "Failed to send reminder" |
| Profitability load fails | Show empty table with error message |

---

## PROGRESSIVE ENHANCEMENT — Workflows, Documents, Financial

### Phase 12 — With workflows table (or JSON config)
Full workflow automation with visual builder, execution logging, templates, and AI suggestions. NL input requires Gemini integration.

### Phase 13 — With documents table and Supabase Storage
Full document management with upload, versioning, auto-generation from wizard data, and share links. Auto-generation requires edge function PDF compilation.

### Phase 14 — With invoices and payments tables
Full financial dashboard with invoice lifecycle, payment tracking, revenue charts, profitability table, and AI forecasting. Forecast requires Gemini integration with historical data.