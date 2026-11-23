---
id: 030-ai-agent-management-dashboard
diagram_id: DASH-06
prd_section: Dashboard
title: AI agent management dashboard — agent catalog, run history, performance, and configuration
skill: frontend
phase: MEDIUM
priority: P2
status: Not Started
owner: Frontend
dependencies:
  - 025-dashboard-overview
estimated_effort: L
percent_complete: 0
area: agency-dashboard
wizard_step: null
schema_tables: [ai_run_logs, ai_cache, systems, services, system_services]
figma_prompt: prompts/030-ai-agent-management-dashboard.md
---

## Summary Table

| Aspect | Details |
|--------|---------|
| **Screens** | AI Agent Management (`/app/agents`) |
| **Features** | Agent catalog, run history table, performance metrics, cost tracking, error log, cache management, agent configuration |
| **Edge Functions** | All agents (analyze-business, generate-diagnostics, recommend-systems, scorer, summary, generate-roadmap, task-generator, assistant) |
| **Tables** | ai_run_logs, ai_cache, systems, services, system_services |
| **Agents** | assistant (anomaly detection on performance data) |
| **Real-World** | "Agency owner checks AI costs: 1,247 runs this week, $12.40 total, 94% success rate — notices readiness-score agent has higher error rate" |

---

## Description

**The situation:** The platform runs multiple AI agents across the wizard flow and dashboard operations. Each agent call is logged in `ai_run_logs` (model, tokens, duration, success/failure) and responses are cached in `ai_cache`. However, there is no interface to monitor agent performance, track costs, debug failures, or manage the cache. The agency operates the AI infrastructure blind — they cannot see how many runs occurred, what they cost, which agents are failing, or whether the cache is effective.

**Why it matters:** AI API costs scale with usage. Without visibility, the agency cannot budget for AI infrastructure or detect cost anomalies (a single misconfigured agent could burn through tokens rapidly). Failures in AI agents directly impact the wizard experience — if the readiness-score agent times out, Step 4 breaks. Without error logs and performance metrics, debugging is manual and slow. Cache hit rates directly impact cost and response time but are invisible.

**What already exists:** The `ai_run_logs` table stores every AI run with agent_name (prompt_type), model, tokens_used, duration_ms, success, error_message, session_id, and org_id. The `ai_cache` table stores cached responses with input_hash, model, tokens_used, expires_at, and response jsonb. The `systems` and `services` tables catalog AI systems and their services. The `system_services` junction table maps systems to services. All 8+ AI agents exist as edge functions with consistent logging. Recharts is available for time-series charts and bar charts. shadcn/ui provides Table, Tabs, Card, Badge, Dialog, and Accordion components.

**The build:** Create an `AIAgentManagement` page at `/app/agents` with a top metrics row (total runs, success rate, cache hit rate, total cost) followed by a tab bar with 5 views: Catalog, History, Performance, Cache, and Errors. The Catalog tab shows a grid of agent cards with name, model, wizard step mapping, and recent stats. The History tab shows a filterable table of all runs from ai_run_logs. The Performance tab shows time-series charts for response time, token usage, and success rate per agent. The Cache tab shows cache statistics, hit/miss ratio, and a list of cached entries with manual invalidation. The Errors tab shows failed runs with error messages and retry capability.

**Example:** The agency owner opens AI Agent Management on a Monday morning to review the week's AI operations. The metrics row shows: 1,247 total runs, 94.2% success rate, 67% cache hit rate, $12.40 estimated cost. She clicks the "Performance" tab and sees the response time chart — most agents respond in 2-4 seconds, but "readiness-score" (scorer agent) averages 8.2 seconds with a spike to 15 seconds on Thursday. She switches to "Errors" and finds 12 failed runs for the scorer agent on Thursday — all timeout errors. She clicks one error to see the full details: model "gemini-3.1-pro-preview", 0 output tokens, duration 30,000ms (timeout), error "Request timed out after 30s." She navigates to "Cache" and sees 340 cached responses, 23 expired. She manually invalidates the cache for a specific session_id before having the client re-run their analysis.

---

## Rationale

**Problem:** AI infrastructure is a black box — no visibility into agent performance, costs, failures, or cache effectiveness. Debugging AI issues requires database queries.

**Solution:** An operations dashboard that visualizes ai_run_logs and ai_cache data through metrics cards, time-series charts, filterable tables, and cache management tools.

**Impact:** Agency can monitor AI costs, detect performance degradation instantly, debug failures with full context, and optimize cache hit rates to reduce costs and improve response times.

---

## Screen Purpose

Operations dashboard for monitoring and managing AI agents. Shows all agent runs, cache hit rates, token usage, error rates, and response times. Allows viewing the agent catalog (which agents serve which wizard steps), filtering run history, analyzing performance trends, managing the cache, and investigating errors. This is the agency's window into AI infrastructure health.

---

## Target User

- Agency technical team monitoring AI agent health and debugging issues
- Agency owner tracking AI costs and platform spending
- Agency consultants investigating why a client's AI analysis failed or was slow

---

## Core Features

1. Agent catalog grid showing all agents with purpose, model, wizard step mapping, and recent success rate
2. Run history table with filters: agent name, date range, success/failure, duration threshold
3. Performance metrics: average response time, success rate, cache hit rate, total tokens per time period
4. Cost tracking: estimated cost per agent, per day, per client (computed from tokens * model pricing)
5. Error log with full error details, session context, and retry capability
6. Cache management: hit/miss ratio, cache size, entry list with manual invalidation
7. Agent configuration reference panel (model, temperature, max tokens — read-only for now, editable in v2)
8. Time-series charts for response time trends and token usage over days/weeks

---

## Data Displayed

- Agent catalog: agent name, model name, wizard step (1-5 or "Dashboard"), purpose description, run count (7d), success rate (7d)
- Run history: timestamp, agent name, model, input tokens, output tokens, duration_ms, success (boolean), error_message, session_id, org_id
- Performance metrics (aggregated): total runs (period), avg duration_ms, p95 duration_ms, success rate %, cache hit rate %, total tokens, estimated cost
- Cost breakdown: per-agent cost (tokens * per-token rate), per-day cost, per-client cost (aggregated by org_id)
- Error entries: timestamp, agent name, error message, duration_ms, session_id, input tokens (0 if timeout), model
- Cache entries: input_hash (truncated), model, tokens_used, created_at, expires_at, status (active/expired)
- Cache stats: total entries, active entries, expired entries, hit rate (computed from run_logs cache_hit field if available)

---

## UI Components

- `AgentManagementPage` — page wrapper with metrics row and tab bar
- `AgentMetricsRow` — 4 stat cards: total runs, success rate, cache hit rate, estimated cost
- `AgentCatalogGrid` — 2x4 grid of AgentCards
- `AgentCard` — card with agent name, model badge, step badge, run count, success rate mini-bar
- `RunHistoryTable` — full data table with columns for all run fields, sortable, filterable
- `RunHistoryFilters` — filter bar: agent select, date range picker, success/failure toggle, duration slider
- `PerformanceMetricsRow` — expanded metrics with period selector (7d, 30d, 90d)
- `ResponseTimeChart` — Recharts LineChart showing avg response time per day per agent
- `TokenUsageChart` — Recharts BarChart showing daily token consumption by agent
- `CostChart` — Recharts AreaChart showing cumulative cost over time
- `ErrorLogList` — table of failed runs with expandable error details
- `ErrorDetailCard` — expanded card showing full error message, request context, retry button
- `CacheStatsCard` — card showing total/active/expired counts, hit rate gauge
- `CacheEntryTable` — table of cached responses with invalidation checkbox/button
- `AgentConfigPanel` — read-only card showing model, parameters per agent

---

## Layout Structure

```
+-----------------------------------------------------+
| Sidebar (240px)  |  Main Content (flex-1)            |
|                  |                                    |
| * Dashboard      |  AI Agent Management               |
| * Projects       |                                    |
| * CRM            |  +------+------+------+------+    |
| * AI Insights    |  | Runs | Succ | Cache| Cost |    |
| * Documents      |  | 1247 | 94.2%| 67%  |$12.40|    |
| * Financial      |  +------+------+------+------+    |
| * Settings       |                                    |
| * Agents  <--    |  [Catalog][History][Perf][Cache][E] |
|                  |  +-------------------------------+ |
|                  |  |                               | |
|                  |  |  (Tab Content Area)            | |
|                  |  |                               | |
|                  |  |  Catalog: Agent cards grid     | |
|                  |  |  History: Run history table    | |
|                  |  |  Performance: Charts           | |
|                  |  |  Cache: Stats + entry table    | |
|                  |  |  Errors: Error log list        | |
|                  |  |                               | |
|                  |  +-------------------------------+ |
+-----------------------------------------------------+
```

- Metrics row: 4 equal-width cards, 80px height, at top of page (always visible)
- Tab bar: 5 tabs below metrics, full width
- Tab content: fills remaining space, scrollable
- Agent cards (catalog): 280px width, 2x4 grid, `#FFFFFF` background, `#D4CFC8` border
- Charts: 400px height, `#0A211F` lines, `#84CC16` accent, `#D4CFC8` grid
- Tables: full width, alternating row background (`#FFFFFF` / `#F1EEEA`)
- Error badge: red background for failed runs, green for success
- Cost card: amber background when cost exceeds daily budget threshold

---

## Interaction Patterns

- Click agent card in catalog -> navigate to History tab pre-filtered to that agent
- Filter run history by agent name (multi-select), date range (calendar picker), success/failure (toggle), duration (slider for min-max)
- Click run history row -> expand inline to show full request/response metadata
- Performance tab: period selector (7d, 30d, 90d) re-renders all charts
- Hover chart data point -> tooltip with exact values (date, agent, metric value)
- Click error row -> expand to show full error message and stack trace
- Click "Retry" on error -> re-trigger the AI agent call for that session_id (confirmation required)
- Cache tab: click "Invalidate" on individual entries -> marks as expired, removes from cache
- Cache tab: "Purge Expired" button -> bulk-delete all entries past expires_at
- Metrics row values update based on selected time period (default: last 7 days)

---

## Example User Workflows

**Workflow 1 — Weekly cost review:** Agency owner opens AI Agent Management on Monday. The metrics row shows 1,247 runs, $12.40 cost for the past 7 days. She clicks the "Performance" tab and selects "30d" period. The cost chart shows a steady $1.50-$2.00/day with a spike to $4.80 on February 28th. She clicks the spike data point — tooltip shows "78 runs for recommend-systems agent, 42K tokens." She switches to History, filters to "recommend-systems" on Feb 28 — finds a client ran the wizard 6 times (testing/exploring). Normal behavior, no action needed.

**Workflow 2 — Debugging a client failure:** Consultant receives a client complaint: "My analysis got stuck on Step 4." She opens AI Agent Management, goes to the Errors tab, filters by the last 24 hours. She finds 3 failed runs for "scorer" agent. She clicks the first error: duration 30,000ms, error "Request timed out after 30s", session_id "abc-123." She recognizes this as the client's session. She checks the Cache tab — no cached result for that session's scorer input. She clicks "Retry" on the error entry, confirms, and the scorer agent re-runs successfully (the Gemini API was temporarily overloaded). She messages the client: "Fixed, please refresh Step 4."

**Workflow 3 — Cache optimization:** Tech lead reviews cache effectiveness. Cache hit rate is 67%. She opens the Cache tab: 340 total entries, 317 active, 23 expired. She clicks "Purge Expired" to clean up. She reviews the History tab filtered by cache_hit = false — notices that "analyze-business" has the lowest cache hit rate (12%) because each client has unique business context. The "generate-diagnostics" agent has 89% cache hit rate because many clients in the same industry share diagnostic patterns. She concludes the cache is working as expected and makes no changes.

---

## AI Features

- Anomaly detection on error rates: alert when any agent's error rate exceeds 10% over a rolling 24-hour window
- Cost forecasting: project next month's AI costs based on current usage trend and client pipeline growth
- Auto-scaling recommendations: "Consider upgrading to a higher-throughput model tier for recommend-systems based on usage patterns"
- Suggested model upgrades: "gemini-3.1-pro-preview has a new version with 20% faster inference — consider migrating scorer agent"
- Performance degradation alerts: "Response time for generate-roadmap increased 40% over the last 7 days"

---

## Data Sources (tables)

| Data | Table | Column/Query |
|------|-------|-------------|
| Agent run history | ai_run_logs | select all, order by created_at desc |
| Run aggregates | ai_run_logs | count, avg(duration_ms), sum(tokens_used), count(success=true)/count(*) grouped by prompt_type |
| Daily metrics | ai_run_logs | group by date(created_at), prompt_type for time-series |
| Per-client cost | ai_run_logs | sum(tokens_used) group by org_id, prompt_type |
| Cache entries | ai_cache | select all, order by created_at desc |
| Cache stats | ai_cache | count total, count where expires_at > now(), count where expires_at <= now() |
| Agent catalog | (hardcoded) | Agent name, model, step mapping from tasks-template.md agent reference |
| System mapping | systems, services, system_services | Which AI systems/services exist (context for agent-to-system relationship) |
| Error details | ai_run_logs | where success = false, includes error_message |

---

## Automation Opportunities

- Alert when any agent's error rate exceeds 10% over a 24-hour window (via Supabase trigger or cron)
- Daily cost summary posted to Slack or logged to activities table
- Auto-purge expired cache entries daily (pg_cron: `DELETE FROM ai_cache WHERE expires_at < now()`)
- Performance degradation alert when avg duration_ms increases > 50% compared to 7-day rolling average
- Auto-generate weekly AI ops report: total runs, cost, error rate, cache effectiveness, notable incidents
- Budget threshold alert: notify when daily cost exceeds configured limit (e.g., $5/day)

---

## Visual Hierarchy

1. **Primary focus**: Metrics row (top, 4 cards, glanceable KPIs for quick health check)
2. **Secondary**: Active tab content — catalog grid, history table, or charts (center, primary workspace)
3. **Tertiary**: Charts within Performance tab (visual trends, scannable)
4. **Supporting**: Error details and cache entries (drill-down, investigative)

---

## User Stories

| As a... | I want to... | So that... |
|---------|--------------|------------|
| Agency owner | see total AI cost for the past week | I can budget for infrastructure spending |
| Agency tech lead | view error logs for failed AI runs | I can debug client-reported issues quickly |
| Agency owner | see success rate and response time trends | I can detect performance degradation before clients complain |
| Agency tech lead | manage the AI cache (view entries, purge expired, invalidate specific) | I can ensure cache effectiveness and troubleshoot stale data |
| Agency consultant | retry a failed AI run for a client's session | I can fix issues without asking the client to re-do the wizard step |
| Agency owner | see per-agent cost breakdown | I can identify which agents are most expensive and optimize |

---

## Goals & Acceptance Criteria

### Goals
1. **Primary:** Agency has full visibility into AI agent operations — runs, costs, performance, errors, and cache
2. **Quality:** Dashboard loads 10K+ run history rows with pagination, charts render in < 2 seconds

### Acceptance Criteria
- [ ] Agent management page renders at `/app/agents` with metrics row and 5-tab layout
- [ ] Metrics row shows: total runs, success rate %, cache hit rate %, estimated cost for selected period
- [ ] Catalog tab shows grid of agent cards with name, model, wizard step, run count, success rate
- [ ] Clicking agent card in catalog navigates to History tab pre-filtered to that agent
- [ ] History tab shows paginated table of ai_run_logs with all columns sortable
- [ ] History filters work: agent name (multi-select), date range (picker), success/failure (toggle)
- [ ] Performance tab shows 3 charts: response time (line), token usage (bar), cost (area) with period selector
- [ ] Charts render with Recharts using design system colors (`#0A211F` lines, `#84CC16` accent)
- [ ] Cache tab shows stats card (total, active, expired, hit rate) and entry table
- [ ] Cache invalidation works: individual "Invalidate" button and bulk "Purge Expired" button
- [ ] Errors tab shows failed runs with expandable error details (message, duration, session context)
- [ ] "Retry" button on error entries re-triggers the AI agent with confirmation dialog
- [ ] Cost estimation uses token count * model pricing rate (configurable constant)
- [ ] Loading state shows skeleton cards and table rows
- [ ] Empty state (no runs yet) shows "No AI runs recorded yet" message
- [ ] RLS enforces that only agency admin users can access this page

---

## Wiring Plan

| Layer | File | Action |
|-------|------|--------|
| Page | `src/components/dashboard/AIAgentManagement.tsx` | Create |
| Component | `src/components/dashboard/AgentMetricsRow.tsx` | Create |
| Component | `src/components/dashboard/AgentCatalogGrid.tsx` | Create |
| Component | `src/components/dashboard/AgentCard.tsx` | Create |
| Component | `src/components/dashboard/RunHistoryTable.tsx` | Create |
| Component | `src/components/dashboard/RunHistoryFilters.tsx` | Create |
| Component | `src/components/dashboard/ResponseTimeChart.tsx` | Create |
| Component | `src/components/dashboard/TokenUsageChart.tsx` | Create |
| Component | `src/components/dashboard/CostChart.tsx` | Create |
| Component | `src/components/dashboard/ErrorLogList.tsx` | Create |
| Component | `src/components/dashboard/ErrorDetailCard.tsx` | Create |
| Component | `src/components/dashboard/CacheStatsCard.tsx` | Create |
| Component | `src/components/dashboard/CacheEntryTable.tsx` | Create |
| Component | `src/components/dashboard/AgentConfigPanel.tsx` | Create |
| Hook | `src/lib/hooks/useAIRunLogs.ts` | Create |
| Hook | `src/lib/hooks/useAICache.ts` | Create |
| Hook | `src/lib/hooks/useAgentPerformance.ts` | Create |
| Types | `src/lib/types/agent.ts` | Create |
| Constants | `src/lib/constants.ts` | Modify — add agent catalog data and model pricing rates |
| Route | `src/routes.tsx` | Modify — add `/app/agents` route |

---

## Frontend Wiring

### Component Tree

```
<AgentManagementPage>                          ← route: /app/agents
  <AgentMetricsRow>
    <MetricCard label="Total Runs" />
    <MetricCard label="Success Rate" />
    <MetricCard label="Cache Hit Rate" />
    <MetricCard label="Est. Cost" />
  </AgentMetricsRow>
  <Tabs defaultValue="catalog">
    <TabsList>
      <TabsTrigger value="catalog" />
      <TabsTrigger value="history" />
      <TabsTrigger value="performance" />
      <TabsTrigger value="cache" />
      <TabsTrigger value="errors" />
    </TabsList>
    <TabsContent value="catalog">
      <AgentCatalogGrid>
        <AgentCard />                          ← one per agent (8 total)
      </AgentCatalogGrid>
    </TabsContent>
    <TabsContent value="history">
      <RunHistoryFilters />                    ← agent select, date range, success toggle
      <RunHistoryTable />                      ← paginated, sortable, expandable rows
    </TabsContent>
    <TabsContent value="performance">
      <PerformanceMetricsRow />                ← period selector (7d/30d/90d)
      <ResponseTimeChart />                    ← Recharts LineChart
      <TokenUsageChart />                      ← Recharts BarChart
      <CostChart />                            ← Recharts AreaChart
    </TabsContent>
    <TabsContent value="cache">
      <CacheStatsCard />                       ← total/active/expired/hit rate
      <CacheEntryTable />                      ← table with invalidate buttons
    </TabsContent>
    <TabsContent value="errors">
      <ErrorLogList>
        <ErrorDetailCard />                    ← expandable per error row
      </ErrorLogList>
    </TabsContent>
  </Tabs>
  <AgentConfigPanel />                         ← read-only, slide-over drawer
</AgentManagementPage>
```

### TypeScript Interfaces

```ts
// src/lib/types/agent.ts

interface AgentCatalogEntry {
  name: string;                                // e.g., "analyze-business"
  display_name: string;                        // e.g., "Business Analyzer"
  model: string;                               // e.g., "gemini-2.0-flash"
  wizard_step: number | null;                  // 1-5 or null for dashboard agents
  purpose: string;
  run_count_7d: number;
  success_rate_7d: number;                     // 0-100
}

interface AIRunLog {
  id: string;
  prompt_type: string;                         // agent name
  model: string;
  tokens_used: number;
  input_tokens: number;
  output_tokens: number;
  duration_ms: number;
  success: boolean;
  error_message: string | null;
  session_id: string | null;
  org_id: string | null;
  cache_hit: boolean;
  created_at: string;
}

interface AgentPerformanceMetrics {
  agent_name: string;
  period: '7d' | '30d' | '90d';
  total_runs: number;
  success_rate: number;
  avg_duration_ms: number;
  p95_duration_ms: number;
  total_tokens: number;
  estimated_cost: number;
  cache_hit_rate: number;
}

interface DailyAgentMetric {
  date: string;                                // YYYY-MM-DD
  agent_name: string;
  runs: number;
  avg_duration_ms: number;
  total_tokens: number;
  success_rate: number;
  estimated_cost: number;
}

interface CacheEntry {
  id: string;
  prompt_hash: string;                         // truncated for display
  model: string;
  tokens_used: number;
  created_at: string;
  expires_at: string;
  status: 'active' | 'expired';
}

interface CacheStats {
  total_entries: number;
  active_entries: number;
  expired_entries: number;
  hit_rate: number;                            // 0-100
}

interface AgentMetricsSummary {
  total_runs: number;
  success_rate: number;
  cache_hit_rate: number;
  estimated_cost: number;
  period: '7d' | '30d' | '90d';
}

// Model pricing rates (cost per 1K tokens)
interface ModelPricing {
  [model: string]: { input: number; output: number };
}
```

### Custom Hooks

```ts
// src/lib/hooks/useAIRunLogs.ts
function useAIRunLogs(filters: {
  agent?: string;
  dateRange?: [string, string];
  success?: boolean;
  page?: number;
  pageSize?: number;
}): {
  logs: AIRunLog[];
  total: number;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// src/lib/hooks/useAICache.ts
function useAICache(): {
  stats: CacheStats | null;
  entries: CacheEntry[];
  loading: boolean;
  invalidate: (id: string) => Promise<void>;
  purgeExpired: () => Promise<void>;
  refetch: () => Promise<void>;
}

// src/lib/hooks/useAgentPerformance.ts
function useAgentPerformance(period: '7d' | '30d' | '90d'): {
  summary: AgentMetricsSummary | null;
  perAgent: AgentPerformanceMetrics[];
  dailyMetrics: DailyAgentMetric[];
  loading: boolean;
  error: string | null;
}
```

### State Management

| State | Location | Reason |
|-------|----------|--------|
| Active tab | `AgentManagementPage` local useState (synced to URL hash `#catalog`, `#history`, etc.) | Persists tab on refresh |
| Period selector (7d/30d/90d) | `AgentManagementPage` useState, passed as prop to metrics row and performance tab | Shared across metrics and charts |
| Run history filters | `RunHistoryFilters` local useState, lifted to parent via `onFilterChange` callback | Drives table query params |
| Pagination (page, pageSize) | `RunHistoryTable` local useState | Controls paginated fetching |
| Expanded run row ID | `RunHistoryTable` local useState | Inline detail expansion |
| Expanded error row ID | `ErrorLogList` local useState | Error detail expansion |
| Selected agent for config drawer | `AgentManagementPage` useState | Controls slide-over panel |
| Cache entry selection (for bulk invalidate) | `CacheEntryTable` local useState (Set of IDs) | Checkbox state |

### Data Fetching Pattern

```
AgentManagementPage mounts
  → useAgentPerformance(period)
      → api<{ summary: AgentMetricsSummary, per_agent: AgentPerformanceMetrics[], daily: DailyAgentMetric[] }>(
            '/dashboard/agents/performance', { method: 'POST', body: { period } })
      → populates metrics row + catalog stats + all charts

  Tab: "history" active
    → useAIRunLogs(filters)
        → api<{ logs: AIRunLog[], total: number }>(
              '/dashboard/agents/logs', { method: 'POST', body: { ...filters } })

  Tab: "cache" active
    → useAICache()
        → api<{ stats: CacheStats, entries: CacheEntry[] }>(
              '/dashboard/agents/cache', { method: 'GET' })

  Invalidate cache entry
    → api('/dashboard/agents/cache/invalidate', { method: 'POST', body: { id } })
    → refetch cache

  Purge expired
    → api('/dashboard/agents/cache/purge', { method: 'POST' })
    → refetch cache

  Retry failed run
    → api('/dashboard/agents/retry', { method: 'POST', body: { run_id, session_id } })
```

### Component Communication

- **Props down**: `AgentManagementPage` passes `period` to `AgentMetricsRow` and `PerformanceMetricsRow`; passes `perAgent` data to `AgentCatalogGrid`
- **Callbacks up**: `AgentCard` fires `onAgentClick(agentName)` which switches to History tab with that agent pre-filtered; `RunHistoryFilters` fires `onFilterChange(filters)` to parent
- **Tab navigation with agent pre-filter**: When user clicks an `AgentCard`, the parent sets active tab to "history" and injects the agent name into filter state, which `RunHistoryFilters` reads as a controlled prop
- **Period selector shared**: The `period` state lives in the page component and is passed to both `AgentMetricsRow` (for top-level KPIs) and `PerformanceMetricsRow` / chart components (for trend data)
- **No global context needed**: all state is page-scoped

---

## Backend Wiring

### New Edge Function Routes

| Method | Route | Handler | Request Body | Response Shape |
|--------|-------|---------|-------------|----------------|
| POST | `/dashboard/agents/performance` | Aggregate ai_run_logs by agent for period | `{ period: '7d' \| '30d' \| '90d' }` | `{ summary: AgentMetricsSummary, per_agent: AgentPerformanceMetrics[], daily: DailyAgentMetric[] }` |
| POST | `/dashboard/agents/logs` | Paginated, filtered run log list | `{ agent?: string, date_from?: string, date_to?: string, success?: boolean, page: number, page_size: number }` | `{ logs: AIRunLog[], total: number }` |
| GET | `/dashboard/agents/cache` | Cache stats and entry list | — | `{ stats: CacheStats, entries: CacheEntry[] }` |
| POST | `/dashboard/agents/cache/invalidate` | Mark a cache entry as expired | `{ id: string }` | `{ success: boolean }` |
| POST | `/dashboard/agents/cache/purge` | Delete all expired cache entries | — | `{ deleted_count: number }` |
| POST | `/dashboard/agents/retry` | Re-trigger an AI agent call | `{ run_id: string, session_id: string }` | `{ success: boolean, new_run_id: string }` |

### Supabase Client Queries

```ts
// Aggregate performance metrics for a period
const periodStart = new Date(Date.now() - periodMs).toISOString();
const { data: runs } = await db
  .from('ai_run_logs')
  .select('prompt_type, model, tokens_used, duration_ms, success, cache_hit, created_at')
  .gte('created_at', periodStart)
  .order('created_at', { ascending: false });

// Paginated run log list with filters
let query = db
  .from('ai_run_logs')
  .select('*', { count: 'exact' })
  .order('created_at', { ascending: false })
  .range(page * pageSize, (page + 1) * pageSize - 1);
if (agent) query = query.eq('prompt_type', agent);
if (dateFrom) query = query.gte('created_at', dateFrom);
if (dateTo) query = query.lte('created_at', dateTo);
if (success !== undefined) query = query.eq('success', success);
const { data: logs, count } = await query;

// Cache stats
const { data: allCache } = await db
  .from('ai_cache')
  .select('id, prompt_hash, model, tokens_used, created_at, expires_at');
// Compute active vs expired in-memory:
// active = expires_at > now(), expired = expires_at <= now()

// Cache entry list (most recent 200)
const { data: entries } = await db
  .from('ai_cache')
  .select('id, prompt_hash, model, tokens_used, created_at, expires_at')
  .order('created_at', { ascending: false })
  .limit(200);

// Invalidate a cache entry (set expires_at to now)
await db
  .from('ai_cache')
  .update({ expires_at: new Date().toISOString() })
  .eq('id', entryId);

// Purge all expired
const { count } = await db
  .from('ai_cache')
  .delete()
  .lt('expires_at', new Date().toISOString());

// Fetch error runs
const { data: errors } = await db
  .from('ai_run_logs')
  .select('*')
  .eq('success', false)
  .order('created_at', { ascending: false })
  .limit(50);

// Retry: look up original run, re-invoke the agent
const { data: originalRun } = await db
  .from('ai_run_logs')
  .select('prompt_type, session_id, org_id')
  .eq('id', runId)
  .single();
```

### RLS Policies Needed

| Table | Policy | Rule |
|-------|--------|------|
| `ai_run_logs` | SELECT for agency admins only | `auth.uid() IN (SELECT user_id FROM org_members WHERE role = 'admin')` |
| `ai_cache` | No direct frontend access | Accessed only via edge functions using `adminClient()` |
| `systems` | SELECT for all authenticated users | `auth.uid() IS NOT NULL` |
| `services` | SELECT for all authenticated users | `auth.uid() IS NOT NULL` |
| `system_services` | SELECT for all authenticated users | `auth.uid() IS NOT NULL` |

### API Response Interfaces

```ts
// POST /dashboard/agents/performance response
interface AgentPerformanceResponse {
  summary: AgentMetricsSummary;
  per_agent: AgentPerformanceMetrics[];
  daily: DailyAgentMetric[];
}

// POST /dashboard/agents/logs response
interface AgentLogsResponse {
  logs: AIRunLog[];
  total: number;
}

// GET /dashboard/agents/cache response
interface AgentCacheResponse {
  stats: CacheStats;
  entries: CacheEntry[];
}

// POST /dashboard/agents/cache/invalidate response
interface CacheInvalidateResponse {
  success: boolean;
}

// POST /dashboard/agents/cache/purge response
interface CachePurgeResponse {
  deleted_count: number;
}

// POST /dashboard/agents/retry response
interface AgentRetryResponse {
  success: boolean;
  new_run_id: string;
  duration_ms: number;
}
```

### Edge Cases

| Scenario | Handling |
|----------|----------|
| No ai_run_logs exist yet | `summary` returns all zeros; catalog shows agents with "No runs yet" label; charts render empty state with "No data for this period" |
| 10K+ run history rows | Server-side pagination (default 50 per page); `total` count returned for pagination controls; no client-side sorting on full dataset |
| Agent name not in catalog | Unknown agents still appear in history/errors with a generic icon; catalog is hardcoded so it will not show them as cards |
| Retry on a run whose session was deleted | Edge function returns 404: "Original session not found — cannot retry" |
| Cache purge deletes 0 entries | Response returns `{ deleted_count: 0 }`; UI shows toast "No expired entries to purge" |
| Cost estimation with unknown model | Use a default per-token rate; show "estimated" label on cost values |
| Non-admin user accesses /app/agents | RLS returns empty results; frontend shows "You do not have permission to view AI agent data" |
| Gemini API down during retry | Retry run logs a failure with the API error; error detail card shows the new failure alongside the original |

---

## Detailed ASCII Wireframes

### Desktop Layout (1200px content width)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (240px)  │  MAIN CONTENT (max-w-[1200px], mx-auto, px-6)          │
│                  │                                                         │
│ ┌──────────────┐ │ ┌─────────────────────────────────────────────────────┐ │
│ │ AMO AI       │ │ │ AI Agent Management                                │ │
│ │              │ │ └─────────────────────────────────────────────────────┘ │
│ │ Dashboard    │ │                                                         │
│ │ Projects     │ │ ┌────────────┬────────────┬────────────┬────────────┐  │
│ │ CRM          │ │ │ Total Runs │ Success %  │ Cache Hit  │ Est. Cost  │  │
│ │ AI Insights  │ │ │            │            │            │            │  │
│ │ Documents    │ │ │   1,247    │   94.2%    │    67%     │   $12.40   │  │
│ │ Financial    │ │ │   ▲ +12%   │   ▼ -1.3%  │   ▲ +5%    │   ▲ +$2.10 │  │
│ │ Settings     │ │ │  (vs prev) │  (vs prev) │  (vs prev) │  (vs prev) │  │
│ │ ▸ Agents     │ │ └────────────┴────────────┴────────────┴────────────┘  │
│ │              │ │  Period: [7d] 30d  90d                                  │
│ └──────────────┘ │                                                         │
│                  │ ┌─────────────────────────────────────────────────────┐ │
│                  │ │ [Catalog] [History] [Performance] [Cache] [Errors]  │ │
│                  │ │  ═══════                                            │ │
│                  │ └─────────────────────────────────────────────────────┘ │
│                  │                                                         │
│                  │ ── CATALOG TAB ───────────────────────────────────────  │
│                  │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐│
│                  │ │analyze-      │ │generate-     │ │recommend-    │ │scorer        ││
│                  │ │business      │ │diagnostics   │ │systems       │ │              ││
│                  │ │              │ │              │ │              │ │              ││
│                  │ │Model:        │ │Model:        │ │Model:        │ │Model:        ││
│                  │ │gemini-2.0    │ │gemini-2.0    │ │gemini-2.0    │ │gemini-2.0    ││
│                  │ │              │ │              │ │              │ │              ││
│                  │ │Step: 1       │ │Step: 2       │ │Step: 3       │ │Step: 4       ││
│                  │ │Runs: 312     │ │Runs: 298     │ │Runs: 287     │ │Runs: 195     ││
│                  │ │Succ: 97%     │ │Succ: 96%     │ │Succ: 94%     │ │Succ: 88%     ││
│                  │ │████████████░ │ │███████████░░ │ │██████████░░░ │ │████████░░░░░ ││
│                  │ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘│
│                  │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐│
│                  │ │summary       │ │generate-     │ │task-         │ │assistant     ││
│                  │ │              │ │roadmap       │ │generator     │ │              ││
│                  │ │Model:        │ │Model:        │ │Model:        │ │Model:        ││
│                  │ │gemini-2.0    │ │gemini-2.0    │ │gemini-2.0    │ │gemini-2.0    ││
│                  │ │Step: —       │ │Step: 5       │ │Step: —       │ │Step: —       ││
│                  │ │Runs: 55      │ │Runs: 78      │ │Runs: 12      │ │Runs: 10      ││
│                  │ │Succ: 100%    │ │Succ: 97%     │ │Succ: 92%     │ │Succ: 100%    ││
│                  │ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘│
│                  │                                                         │
│                  │ ── HISTORY TAB (when selected) ──────────────────────── │
│                  │ ┌─────────────────────────────────────────────────────┐ │
│                  │ │ Filters:                                            │ │
│                  │ │ Agent: [All agents     ▾] Date: [Feb 28–Mar 7  📅]│ │
│                  │ │ Status: (●) All  ( ) Success  ( ) Failed           │ │
│                  │ └─────────────────────────────────────────────────────┘ │
│                  │ ┌──────┬──────────────┬────────────┬───────┬────┬─────┐│
│                  │ │ Time │ Agent        │ Model      │Tokens │ ms │ ✓/✗ ││
│                  │ ├──────┼──────────────┼────────────┼───────┼────┼─────┤│
│                  │ │ 2m   │analyze-biz   │gemini-2.0  │ 1,240 │2100│  ✓  ││
│                  │ │ 14m  │scorer        │gemini-2.0  │ 1,890 │8200│  ✓  ││
│                  │ │ 1h   │recommend-sys │gemini-2.0  │ 3,100 │4200│  ✓  ││
│                  │ │ 2h   │scorer        │gemini-2.0  │     0 │30K │  ✗  ││
│                  │ │      │ └─ Error: Request timed out after 30s       ││
│                  │ ├──────┴──────────────┴────────────┴───────┴────┴─────┤│
│                  │ │                    Page 1 of 25  ◀ ▶                ││
│                  │ └─────────────────────────────────────────────────────┘ │
│                  │                                                         │
│                  │ ── PERFORMANCE TAB (when selected) ──────────────────── │
│                  │ ┌─────────────────────────────────────────────────────┐ │
│                  │ │ Response Time (ms)                     Period: [7d] │ │
│                  │ │ 15K│                        *                       │ │
│                  │ │    │                       /\                       │ │
│                  │ │ 10K│    scorer────────────/  \──────                │ │
│                  │ │    │                                                │ │
│                  │ │  5K│────────────────────────────────────────        │ │
│                  │ │    │    recommend-systems                           │ │
│                  │ │  2K│════════════════════════════════════════        │ │
│                  │ │    │    analyze-business (others)                   │ │
│                  │ │    └──────────────────────────────────────── days   │ │
│                  │ └─────────────────────────────────────────────────────┘ │
│                  │ ┌─────────────────────────────────────────────────────┐ │
│                  │ │ Token Usage (daily)                                 │ │
│                  │ │    ┌──┐    ┌──┐    ┌──┐    ┌██┐    ┌──┐            │ │
│                  │ │    │  │    │  │    │  │    │██│    │  │            │ │
│                  │ │    │▒▒│    │▒▒│    │▒▒│    │██│    │▒▒│            │ │
│                  │ │    │▒▒│    │▒▒│    │▒▒│    │██│    │▒▒│            │ │
│                  │ │    └──┘    └──┘    └──┘    └──┘    └──┘            │ │
│                  │ │    Mon     Tue     Wed     Thu     Fri             │ │
│                  │ │    ▒ Normal  █ Spike (42K tokens on Thu)           │ │
│                  │ └─────────────────────────────────────────────────────┘ │
│                  │ ┌─────────────────────────────────────────────────────┐ │
│                  │ │ Cumulative Cost ($)                                 │ │
│                  │ │  $14│                                    ╱──────    │ │
│                  │ │  $10│                             ╱─────╱           │ │
│                  │ │   $6│                  ╱─────────╱                  │ │
│                  │ │   $2│     ╱───────────╱                             │ │
│                  │ │     └──────────────────────────────────── days      │ │
│                  │ │     #84CC16 area fill, #0A211F line               │ │
│                  │ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tablet Layout (768px)

```
┌───────────────────────────────────────────────────┐
│ ☰  AI Agent Management                           │
│                                                   │
│ ┌──────────────────┐ ┌──────────────────┐         │
│ │ Total Runs       │ │ Success Rate     │         │
│ │ 1,247            │ │ 94.2%            │         │
│ └──────────────────┘ └──────────────────┘         │
│ ┌──────────────────┐ ┌──────────────────┐         │
│ │ Cache Hit Rate   │ │ Est. Cost        │         │
│ │ 67%              │ │ $12.40           │         │
│ └──────────────────┘ └──────────────────┘         │
│  Metrics: 2x2 grid                               │
│                                                   │
│ ┌───────────────────────────────────────────────┐ │
│ │ ◄ Catalog│History│Perf│Cache│Errors ►         │ │
│ │          horizontal scroll tabs               │ │
│ └───────────────────────────────────────────────┘ │
│                                                   │
│ Catalog: 2 columns                                │
│ ┌──────────────────┐ ┌──────────────────┐         │
│ │ analyze-business │ │ gen-diagnostics  │         │
│ │ Step 1 │ 312 runs│ │ Step 2 │ 298 runs│         │
│ │ Succ: 97%        │ │ Succ: 96%        │         │
│ └──────────────────┘ └──────────────────┘         │
│ ┌──────────────────┐ ┌──────────────────┐         │
│ │ recommend-sys    │ │ scorer           │         │
│ │ Step 3 │ 287 runs│ │ Step 4 │ 195 runs│         │
│ │ Succ: 94%        │ │ Succ: 88%        │         │
│ └──────────────────┘ └──────────────────┘         │
│   ... (scroll for remaining 4)                    │
│                                                   │
│ History: full-width table, horizontal scroll      │
│ ┌───────────────────────────────────────────────┐ │
│ │ Agent │ Tokens │ Duration │ Status            │ │
│ │ (table scrolls horizontally for more cols)    │ │
│ └───────────────────────────────────────────────┘ │
│                                                   │
│ Charts: stacked full-width, 300px tall each       │
└───────────────────────────────────────────────────┘
```

### Mobile Layout (375px)

```
┌─────────────────────────────┐
│ ☰  Agents                   │ 56px header
├─────────────────────────────┤
│ ┌─────────────┐┌───────────┐│
│ │ Runs: 1,247 ││ Succ: 94% ││
│ └─────────────┘└───────────┘│
│ ┌─────────────┐┌───────────┐│
│ │ Cache: 67%  ││ $12.40    ││
│ └─────────────┘└───────────┘│
│  Metrics: 2x2 compact       │
├─────────────────────────────┤
│ ◄ Cat│Hist│Perf│Cache│Err ► │
├─────────────────────────────┤
│                             │
│ ┌─────────────────────────┐ │
│ │ analyze-business        │ │
│ │ Step 1 │ gemini-2.0     │ │
│ │ 312 runs │ 97% success  │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ generate-diagnostics    │ │
│ │ Step 2 │ gemini-2.0     │ │
│ │ 298 runs │ 96% success  │ │
│ └─────────────────────────┘ │
│ ... single column stack     │
│                             │
│ (History tab: card layout   │
│  instead of table)          │
│ ┌─────────────────────────┐ │
│ │ analyze-business        │ │
│ │ 2 min ago │ 2.1s │ ✓    │ │
│ │ 1,240 tokens            │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ scorer                  │ │
│ │ 2 hrs ago │ 30s │ ✗     │ │
│ │ Timeout error           │ │
│ │ [Retry]                 │ │
│ └─────────────────────────┘ │
│                             │
│ (Charts: full width, 240px  │
│  tall, swipe between)       │
└─────────────────────────────┘
```

### Key Component Detail: AgentCard

```
┌──────────────────────────────┐
│ analyze-business       ● 97% │  ← name + success rate dot
│──────────────────────────────│
│ Business Analyzer            │  ← display name (Lora 14px)
│                              │
│ ┌────────────┐ ┌──────────┐ │
│ │ gemini-2.0 │ │ Step 1   │ │  ← model badge + step badge
│ └────────────┘ └──────────┘ │
│                              │
│ 312 runs (7d)                │  ← run count
│ ██████████████████████████░░ │  ← success rate mini-bar
│ 97% success                  │
└──────────────────────────────┘
  Card: 280px width, #FFFFFF bg, #D4CFC8 border, 8px radius
  Success dot: #84CC16 if >=90%, #F59E0B if 70-89%, #DC2626 if <70%
  Hover: cursor pointer, #84CC16 left border accent (2px)
  Click → navigates to History tab filtered by this agent
```

### Key Component Detail: ErrorDetailCard (expanded)

```
┌─────────────────────────────────────────────────────────┐
│ ✗ scorer — Mar 6, 2026 at 14:23                  [Retry]│
│─────────────────────────────────────────────────────────│
│ Duration: 30,000ms (timeout)                            │
│ Model: gemini-2.0-flash                                 │
│ Input tokens: 1,890  │  Output tokens: 0                │
│ Session: abc-123-def-456                                │
│ Org: GreenLeaf Healthcare                               │
│                                                         │
│ Error Message:                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Request timed out after 30s. The Gemini API did not │ │
│ │ respond within the configured timeout window.       │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ #DC2626 left border, #FFF background                    │
└─────────────────────────────────────────────────────────┘
```

---

## Outcomes

| Before | After |
|--------|-------|
| AI costs are unknown — no visibility into token usage or spending | Cost tracking with per-agent, per-day, per-client breakdown and trend charts |
| Agent failures require database queries to debug | Error log with full context, expandable details, and one-click retry |
| No performance monitoring — response time degradation goes unnoticed | Time-series charts show response time and success rate trends with anomaly detection |
| Cache effectiveness is unmeasured | Cache stats card shows hit rate, entry counts, with manual invalidation and purge tools |
| Agent catalog exists only in documentation | Visual catalog grid with live stats, model info, and wizard step mapping |
