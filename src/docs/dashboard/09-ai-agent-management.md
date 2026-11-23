# 09 — AI AGENT MANAGEMENT DASHBOARD (Expanded)
# Agent Catalog, Run History, Performance, Cost Tracking, Cache Management

**Component:** `AIAgentManagement`
**File:** `/components/dashboard/agents/AIAgentManagement.tsx`
**Route:** `/app/agents`
**ID:** 030-ai-agent-management-dashboard
**Diagram ID:** DASH-06
**Status:** NOT STARTED
**Priority:** P2
**Effort:** L (Large)
**Parent Doc:** `00-dashboard-master.md`
**Depends On:** DashboardLayout (025), Auth (admin-only), ai_run_logs, ai_cache, systems, services, system_services tables

---

## SCREEN PURPOSE

Operations dashboard for monitoring and managing AI agents. The platform runs 8+ AI agents across wizard and dashboard flows — every call is logged in ai_run_logs and responses cached in ai_cache. Without this screen, AI infrastructure is a black box. This page gives the agency full visibility: metrics cards for quick health check, agent catalog, filterable run history, time-series performance charts, cache management tools, and error logs with one-click retry.

Real-world: "Agency owner checks AI costs: 1,247 runs this week, $12.40 total, 94% success rate — notices readiness-score agent has higher error rate and spike on Thursday."

---

## TARGET USERS

- Agency technical team monitoring AI agent health and debugging issues
- Agency owner tracking AI costs and platform spending
- Agency consultants investigating why a client's AI analysis failed or was slow

---

## CORE FEATURES

1. Agent catalog grid showing all agents with purpose, model, wizard step mapping, and recent success rate
2. Run history table with filters: agent name, date range, success/failure, duration threshold
3. Performance metrics: average response time, success rate, cache hit rate, total tokens per time period
4. Cost tracking: estimated cost per agent, per day, per client (computed from tokens * model pricing)
5. Error log with full error details, session context, and retry capability
6. Cache management: hit/miss ratio, cache size, entry list with manual invalidation
7. Agent configuration reference panel (model, temperature, max tokens — read-only for now)
8. Time-series charts for response time trends and token usage over days/weeks

---

## AGENT CATALOG (Hardcoded Reference)

| Agent Name | Display Name | Model | Wizard Step | Purpose |
|------------|-------------|-------|-------------|---------|
| analyze-business | Business Analyzer | gemini-2.0-flash | Step 1 | Company profile analysis from URL/description |
| generate-diagnostics | Industry Diagnostician | gemini-2.0-flash | Step 2 | Pain points, opportunities, benchmarks |
| recommend-systems | System Recommender | gemini-2.0-flash | Step 3 | Ranked AI system recommendations with fit scores |
| scorer | Readiness Scorer | gemini-2.0-flash | Step 4 | 5-dimension readiness assessment |
| summary | Brief Generator | gemini-2.0-flash | — | Executive summary generation |
| generate-roadmap | Roadmap Planner | gemini-2.0-flash | Step 5 | Phased implementation roadmap |
| task-generator | Task Generator | gemini-2.0-flash | — | Auto-create tasks from roadmap phases |
| assistant | Dashboard Assistant | gemini-2.0-flash | — | Dashboard insights, health scoring, next actions |

---

## UI COMPONENTS

| Component | Description |
|-----------|-------------|
| `AgentManagementPage` | Page wrapper with metrics row and tab bar |
| `AgentMetricsRow` | 4 stat cards: total runs, success rate, cache hit rate, estimated cost |
| `AgentCatalogGrid` | 2x4 grid of AgentCards |
| `AgentCard` | Card with agent name, model badge, step badge, run count, success rate mini-bar |
| `RunHistoryTable` | Full data table with columns for all run fields, sortable, filterable |
| `RunHistoryFilters` | Filter bar: agent select, date range picker, success/failure toggle, duration slider |
| `PerformanceMetricsRow` | Expanded metrics with period selector (7d, 30d, 90d) |
| `ResponseTimeChart` | Recharts LineChart showing avg response time per day per agent |
| `TokenUsageChart` | Recharts BarChart showing daily token consumption by agent |
| `CostChart` | Recharts AreaChart showing cumulative cost over time |
| `ErrorLogList` | Table of failed runs with expandable error details |
| `ErrorDetailCard` | Expanded card showing full error message, request context, retry button |
| `CacheStatsCard` | Card showing total/active/expired counts, hit rate gauge |
| `CacheEntryTable` | Table of cached responses with invalidation checkbox/button |
| `AgentConfigPanel` | Read-only card showing model, parameters per agent |

---

## LAYOUT STRUCTURE

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
|                  |  |  (Tab Content Area)            | |
|                  |  +-------------------------------+ |
+-----------------------------------------------------+
```

- Metrics row: 4 equal-width cards, 80px height, always visible
- Tab bar: 5 tabs below metrics, full width
- Tab content: fills remaining space, scrollable
- Agent cards (catalog): 280px width, 2x4 grid, #FFFFFF background, #E8E8E4 border
- Charts: 400px height, #1A1A1A lines, #00875A accent, #E8E8E4 grid
- Tables: full width, alternating row background (#FFFFFF / #F5F5F0)

---

## DETAILED ASCII WIREFRAMES

### Desktop (1440px)

```
┌─────────────┬──────────────────────────────────────────────────────────────┐
│  SIDEBAR    │  AI Agent Management                                        │
│  240px      ├──────────────────────────────────────────────────────────────┤
│             │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────┐ │
│  ☀ AMO AI   │  │ Total Runs │ │ Success %  │ │ Cache Hit  │ │ Est. Cost│ │
│             │  │   1,247    │ │   94.2%    │ │    67%     │ │  $12.40  │ │
│  ──────────│  │   ▲ +12%   │ │   ▼ -1.3%  │ │   ▲ +5%    │ │  ▲+$2.10 │ │
│  ○ Dashboard│  └────────────┘ └────────────┘ └────────────┘ └──────────┘ │
│  ○ Projects │  Period: [● 7d]  [30d]  [90d]                              │
│  ○ Clients  │                                                              │
│  ○ CRM      │  [Catalog] [History] [Performance] [Cache] [Errors]         │
│  ○ Insights │  ═════════                                                  │
│  ○ Documents│                                                              │
│  ● Agents   │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────┐ │
│  ○ Financial│  │analyze-      │ │generate-     │ │recommend-    │ │sco-│ │
│  ○ Settings │  │business      │ │diagnostics   │ │systems       │ │rer │ │
│             │  │gemini-2.0    │ │gemini-2.0    │ │gemini-2.0    │ │    │ │
│             │  │Step: 1       │ │Step: 2       │ │Step: 3       │ │S: 4│ │
│             │  │Runs: 312     │ │Runs: 298     │ │Runs: 287     │ │195 │ │
│             │  │Succ: 97%     │ │Succ: 96%     │ │Succ: 94%     │ │88% │ │
│             │  │████████████░ │ │███████████░░ │ │██████████░░░ │ │████│ │
│             │  └──────────────┘ └──────────────┘ └──────────────┘ └────┘ │
│             │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────┐ │
│             │  │summary       │ │generate-     │ │task-         │ │ass-│ │
│             │  │Step: —       │ │roadmap S: 5  │ │generator —   │ │ist.│ │
│             │  │Runs: 55      │ │Runs: 78      │ │Runs: 12      │ │10  │ │
│             │  │Succ: 100%    │ │Succ: 97%     │ │Succ: 92%     │ │100%│ │
│             │  └──────────────┘ └──────────────┘ └──────────────┘ └────┘ │
└─────────────┴──────────────────────────────────────────────────────────────┘
```

### Tablet (768px)

```
┌───────────────────────────────────────────────────┐
│ ☰  AI Agent Management                           │
│ ┌──────────────────┐ ┌──────────────────┐         │
│ │ Total Runs 1,247 │ │ Success 94.2%    │         │
│ └──────────────────┘ └──────────────────┘         │
│ ┌──────────────────┐ ┌──────────────────┐         │
│ │ Cache Hit 67%    │ │ Est. Cost $12.40 │         │
│ └──────────────────┘ └──────────────────┘         │
│ ◄ Catalog│History│Perf│Cache│Errors ►             │
│ Catalog: 2 columns, History: full-width table     │
│ Charts: stacked full-width, 300px tall each       │
└───────────────────────────────────────────────────┘
```

### Mobile (375px)

```
┌─────────────────────────────┐
│ ☰  Agents                   │
├─────────────────────────────┤
│ ┌─────────────┐┌───────────┐│
│ │ Runs: 1,247 ││ Succ: 94% ││
│ └─────────────┘└───────────┘│
│ ┌─────────────┐┌───────────┐│
│ │ Cache: 67%  ││ $12.40    ││
│ └─────────────┘└───────────┘│
├─────────────────────────────┤
│ ◄ Cat│Hist│Perf│Cache│Err ► │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ analyze-business        │ │
│ │ Step 1 │ gemini-2.0     │ │
│ │ 312 runs │ 97% success  │ │
│ └─────────────────────────┘ │
│ ... single column stack     │
│ (History: card layout)      │
│ (Charts: full width, 240px) │
└─────────────────────────────┘
```

---

## AGENT CARD SPEC

```
┌──────────────────────────────┐
│ analyze-business       ● 97% │
│──────────────────────────────│
│ Business Analyzer            │  ← Georgia 14px
│ ┌────────────┐ ┌──────────┐ │
│ │ gemini-2.0 │ │ Step 1   │ │
│ └────────────┘ └──────────┘ │
│ 312 runs (7d)                │
│ ██████████████████████████░░ │
│ 97% success                  │
└──────────────────────────────┘
  280px, #FFFFFF bg, #E8E8E4 border, 4px radius
  Success dot: #00875A >=90%, #D97706 70-89%, #DC2626 <70%
  Hover: 2px #00875A left border accent
  Click → History tab pre-filtered to this agent
```

---

## ERROR DETAIL CARD SPEC

```
┌─────────────────────────────────────────────────────────┐
│ ✗ scorer — Mar 6, 2026 at 14:23                  [Retry]│
│─────────────────────────────────────────────────────────│
│ Duration: 30,000ms (timeout)                            │
│ Model: gemini-2.0-flash                                 │
│ Input tokens: 1,890  │  Output tokens: 0                │
│ Session: abc-123-def-456                                │
│ Org: GreenLeaf Healthcare                               │
│ Error: "Request timed out after 30s."                   │
│ 2px #DC2626 left border, #FFFFFF background             │
└─────────────────────────────────────────────────────────┘
```

---

## COST ESTIMATION

| Model | Input (per 1K tokens) | Output (per 1K tokens) |
|-------|----------------------|----------------------|
| gemini-2.0-flash | $0.0001 | $0.0004 |
| gemini-2.0-flash-lite | $0.00005 | $0.0002 |
| gemini-3.1-pro-preview | $0.001 | $0.004 |

Configurable constants in `/lib/constants.ts`. All cost values labeled "estimated."

---

## INTERACTION PATTERNS

- Click agent card in Catalog → History tab pre-filtered to that agent
- History: filter by agent (multi-select), date range (picker), success/failure (toggle)
- Click history row → expand inline for full request/response metadata
- Performance tab: period selector (7d/30d/90d) re-renders all charts
- Hover chart data point → tooltip with exact values
- Click error row → expand to show full error and stack trace
- Click "Retry" → confirmation → re-trigger AI agent call for that session
- Cache: "Invalidate" per entry, "Purge Expired" bulk-deletes expired
- Metrics row updates when period changes

---

## USER JOURNEYS

### Journey 1: Weekly Cost Review
Agency owner opens AI Agent Management Monday morning. Metrics: 1,247 runs, $12.40, 94.2% success. Clicks Performance, selects 30d. Cost chart shows steady $1.50-$2.00/day with spike to $4.80 on Feb 28. Tooltip: "78 runs for recommend-systems, 42K tokens." Switches to History, filters recommend-systems Feb 28 — client ran wizard 6 times. Normal behavior.

### Journey 2: Debugging a Client Failure
Consultant gets complaint: "Analysis stuck on Step 4." Opens Errors tab, filters last 24h. Finds 3 failed scorer runs. First error: 30,000ms, "Request timed out after 30s", session abc-123. Checks Cache — no cached result. Clicks Retry, scorer re-runs successfully. Messages client: "Fixed, please refresh Step 4."

### Journey 3: Cache Optimization
Tech lead reviews cache effectiveness. Hit rate: 67%. Cache tab: 340 entries, 317 active, 23 expired. Purges expired. History filtered by cache_hit=false: analyze-business lowest hit rate (12%, unique per client), generate-diagnostics 89% (same industry patterns). Cache working as expected.

---

## AI FEATURES

- Anomaly detection: alert when any agent's error rate exceeds 10% over 24h
- Cost forecasting: project next month's costs from current usage trends
- Performance degradation alerts: "Response time for generate-roadmap increased 40% over 7 days"
- Suggested model upgrades: "gemini-3.1-pro has 20% faster inference — consider migrating scorer"

---

## COMPONENT TREE

```
<AgentManagementPage>                          ← route: /app/agents
  <AgentMetricsRow>
    <MetricCard label="Total Runs" />
    <MetricCard label="Success Rate" />
    <MetricCard label="Cache Hit Rate" />
    <MetricCard label="Est. Cost" />
  </AgentMetricsRow>
  <Tabs defaultValue="catalog">
    <TabsContent value="catalog">
      <AgentCatalogGrid>
        <AgentCard />                          ← one per agent (8 total)
      </AgentCatalogGrid>
    </TabsContent>
    <TabsContent value="history">
      <RunHistoryFilters />
      <RunHistoryTable />                      ← paginated, sortable, expandable
    </TabsContent>
    <TabsContent value="performance">
      <PerformanceMetricsRow />                ← period selector (7d/30d/90d)
      <ResponseTimeChart />                    ← Recharts LineChart
      <TokenUsageChart />                      ← Recharts BarChart
      <CostChart />                            ← Recharts AreaChart
    </TabsContent>
    <TabsContent value="cache">
      <CacheStatsCard />
      <CacheEntryTable />
    </TabsContent>
    <TabsContent value="errors">
      <ErrorLogList>
        <ErrorDetailCard />
      </ErrorLogList>
    </TabsContent>
  </Tabs>
  <AgentConfigPanel />                         ← read-only, slide-over drawer
</AgentManagementPage>
```

---

## TYPESCRIPT INTERFACES

```ts
interface AgentCatalogEntry {
  name: string;
  display_name: string;
  model: string;
  wizard_step: number | null;
  purpose: string;
  run_count_7d: number;
  success_rate_7d: number;
}

interface AIRunLog {
  id: string;
  prompt_type: string;
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
  date: string;
  agent_name: string;
  runs: number;
  avg_duration_ms: number;
  total_tokens: number;
  success_rate: number;
  estimated_cost: number;
}

interface CacheEntry {
  id: string;
  prompt_hash: string;
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
  hit_rate: number;
}

interface AgentMetricsSummary {
  total_runs: number;
  success_rate: number;
  cache_hit_rate: number;
  estimated_cost: number;
  period: '7d' | '30d' | '90d';
}

interface ModelPricing {
  [model: string]: { input: number; output: number };
}
```

---

## STATE MANAGEMENT

| State | Location | Reason |
|-------|----------|--------|
| Active tab | AgentManagementPage useState (synced to URL hash) | Persists tab on refresh |
| Period selector (7d/30d/90d) | AgentManagementPage useState | Shared across metrics and charts |
| Run history filters | RunHistoryFilters useState, lifted via onFilterChange | Drives table query params |
| Pagination (page, pageSize) | RunHistoryTable local useState | Controls paginated fetching |
| Expanded run row ID | RunHistoryTable local useState | Inline detail expansion |
| Expanded error row ID | ErrorLogList local useState | Error detail expansion |
| Selected agent for config | AgentManagementPage useState | Controls slide-over panel |
| Cache entry selection | CacheEntryTable local useState (Set of IDs) | Checkbox state |

---

## BACKEND WIRING

### Edge Function Routes

| Method | Route | Request Body | Response |
|--------|-------|-------------|---------|
| POST | /dashboard/agents/performance | `{ period }` | `{ summary, per_agent[], daily[] }` |
| POST | /dashboard/agents/logs | `{ agent?, date_from?, date_to?, success?, page, page_size }` | `{ logs[], total }` |
| GET | /dashboard/agents/cache | — | `{ stats, entries[] }` |
| POST | /dashboard/agents/cache/invalidate | `{ id }` | `{ success }` |
| POST | /dashboard/agents/cache/purge | — | `{ deleted_count }` |
| POST | /dashboard/agents/retry | `{ run_id, session_id }` | `{ success, new_run_id }` |

### RLS Policies

| Table | Policy | Rule |
|-------|--------|------|
| ai_run_logs | SELECT for agency admins only | auth.uid() IN (SELECT user_id FROM org_members WHERE role = 'admin') |
| ai_cache | No direct frontend access | Via edge functions using adminClient() |
| systems/services/system_services | SELECT for all authenticated | auth.uid() IS NOT NULL |

### Edge Cases

| Scenario | Handling |
|----------|----------|
| No ai_run_logs exist | Zeros in metrics, "No runs yet" in catalog, empty charts |
| 10K+ history rows | Server-side pagination (50/page), total count for controls |
| Unknown agent name | Appears in history/errors with generic icon; not in catalog grid |
| Retry on deleted session | 404: "Original session not found" |
| Cache purge deletes 0 | `{ deleted_count: 0 }`, toast "No expired entries" |
| Unknown model for cost | Default per-token rate, "estimated" label |
| Non-admin access | "Permission denied" message |
| Gemini API down during retry | New failure logged, shown alongside original |

---

## LOADING, ERROR, EMPTY STATES

Loading: Skeleton cards for metrics. 8 skeleton agent cards. Skeleton table rows for history.
Error: "Unable to load agent data" with retry button.
Empty: Zeros in metrics, "No runs yet" labels in catalog, "No data for this period" in charts.
Non-admin: "You do not have permission to view AI agent data. Contact your administrator."

---

## RECHARTS SPEC

- Line/stroke: #1A1A1A
- Fill accent: #00875A
- Area fill: #00875A with 0.15 opacity
- Grid lines: #E8E8E4
- Axis text: #6B6B63, 11px Inter
- Tooltip bg: #FFFFFF, border #E8E8E4
- Chart height: 300px desktop, 240px mobile
- Period selector: pill buttons, active = #1A1A1A bg #F5F5F0 text

ResponseTimeChart: LineChart, one line per agent. Colors: #1A1A1A, #00875A, #D97706, #3B82F6.
TokenUsageChart: BarChart, stacked bars per agent per day.
CostChart: AreaChart, cumulative cost over time, single #00875A area.

---

## ACCEPTANCE CRITERIA

- Agent management renders at /app/agents with metrics row and 5-tab layout
- Metrics row: total runs, success rate, cache hit rate, estimated cost for selected period
- Period selector (7d/30d/90d) updates all metrics and charts
- Catalog: 2x4 grid of agent cards with live stats
- Click agent card → History tab pre-filtered
- History: paginated sortable table of ai_run_logs
- Filters work: agent multi-select, date range, success/failure toggle
- Performance: 3 Recharts charts with design system colors
- Cache: stats card + entry table with invalidate and bulk purge
- Errors: failed runs with expandable details and retry button
- Cost estimation uses configurable per-token rates
- Admin-only access gating
- Responsive: 2x2 metrics on mobile, single-column catalog, full-width charts
