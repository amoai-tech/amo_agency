---
id: 029-ai-insights-dashboard
diagram_id: DASH-05
prd_section: Dashboard
title: AI insights dashboard — analysis results, readiness trends, and opportunity mapping
skill: frontend
phase: HIGH
priority: P1
status: Not Started
owner: Frontend
dependencies:
  - 025-dashboard-overview
estimated_effort: L
percent_complete: 0
area: client-dashboard
wizard_step: null
schema_tables: [wizard_answers, wizard_sessions, ai_run_logs, ai_cache, context_snapshots]
figma_prompt: prompts/029-ai-insights-dashboard.md
---

## Summary Table

| Aspect | Details |
|--------|---------|
| **Screens** | AI Insights (`/app/insights`) |
| **Features** | Analysis timeline, business profile, diagnostics, system recommendations, readiness radar chart, roadmap summary, re-run analysis, snapshot comparison |
| **Edge Functions** | analyze-business, generate-diagnostics, recommend-systems, scorer, summary, generate-roadmap |
| **Tables** | wizard_answers, wizard_sessions, ai_run_logs, ai_cache, context_snapshots |
| **Agents** | All wizard agents (analyze-business, generate-diagnostics, recommend-systems, scorer, summary, generate-roadmap) |
| **Real-World** | "Business owner reviews full 5-step analysis before strategy call — sees readiness score 72 with data readiness as weakest dimension" |

---

## Description

**The situation:** The wizard's 5-step AI analysis generates substantial output: business profiling (Step 1), industry diagnostics with pain points and benchmarks (Step 2), ranked system recommendations with fit scores (Step 3), a 5-dimension readiness assessment (Step 4), and a phased roadmap with timeline and investment (Step 5). All of this is stored as jsonb in `wizard_answers.ai_results` — one row per step. There is no post-wizard view to review, compare, or re-run these analyses. The client sees the results once during the wizard and never again.

**Why it matters:** The AI analysis is the core intellectual property of the platform — it is what differentiates AMO AI from a generic consulting engagement. If clients cannot revisit their analysis, share it with stakeholders, or track how their readiness evolves over time, the analysis becomes a one-time event instead of an ongoing strategic asset. Consultants need to reference the full analysis during strategy calls and proposals. Re-running analysis after Phase 1 delivery should show measurable improvement to justify continued investment.

**What already exists:** The `wizard_answers` table stores `ai_results` jsonb for steps 1-5 per session. The `wizard_sessions` table tracks session metadata and timestamps. The `ai_run_logs` table records model, tokens, duration per AI run. The `ai_cache` table enables cache-aware re-analysis. The `context_snapshots` table is designed for storing historical analysis points. All AI agents (analyze-business, generate-diagnostics, recommend-systems, scorer, generate-roadmap) exist as edge functions. Recharts is available for radar charts and bar charts. shadcn/ui provides Accordion, Tabs, Card, Badge, and Progress components.

**The build:** Create an `AIInsights` page at `/app/insights` with a vertical scroll layout organized by wizard step. A sticky section anchor nav (Step 1: Business Profile, Step 2: Diagnostics, Step 3: Recommendations, Step 4: Readiness, Step 5: Roadmap) allows quick jumps. Each section renders the AI results for that step in a purpose-built visualization: business profile card, diagnostic insight grid, ranked system list with fit scores, readiness radar chart with 5-dimension breakdown, and roadmap summary timeline. A "Re-run Analysis" button triggers fresh AI calls and compares results with the previous run. Historical snapshots (from context_snapshots) enable side-by-side comparison. AI run stats (model, tokens, duration) appear in a collapsible footer section.

**Example:** GreenLeaf Healthcare completed the wizard 6 weeks ago and has finished Phase 1 (Patient Intake Automation). The CEO opens the AI Insights page before a quarterly review. She scrolls through: Business Profile shows "Mid-size healthcare provider, 120 employees, 3 locations, high patient volume." Diagnostics highlight "appointment no-shows costing $8K/month" and "manual intake process at 45 min/patient." Recommendations rank Patient Scheduling (95 fit) and Records Digitization (88 fit) as top systems. Readiness score shows 78/100 with "Data Readiness" at 62 (weakest). She clicks "Re-run Analysis" — the system re-evaluates with updated project data. New readiness score: 84/100 with Data Readiness improved to 74. A comparison card shows: "Readiness improved +6 points. Data Readiness improved +12 points after Phase 1 delivery."

---

## Rationale

**Problem:** AI analysis results from the wizard are buried in jsonb and only visible during the wizard flow. No way to review, share, compare, or re-run the analysis post-wizard.

**Solution:** A dedicated insights page that renders all 5 wizard steps' AI results as purpose-built visualizations with section navigation, re-run capability, and historical comparison.

**Impact:** Analysis becomes an ongoing strategic asset. Clients revisit insights before calls. Consultants use the insights page as the basis for proposals. Re-analysis after delivery shows measurable ROI.

---

## Screen Purpose

Deep dive into all AI-generated analysis from the wizard. Displays the full analysis chain: business analysis (Step 1) -> diagnostics (Step 2) -> system recommendations (Step 3) -> readiness assessment (Step 4) -> roadmap (Step 5). Allows re-running analyses with updated data and tracking how insights evolve over time through historical snapshots.

---

## Target User

- Business owners reviewing their AI analysis before strategy calls or quarterly reviews
- Agency consultants preparing for client meetings and building proposals
- Agency owners demonstrating ROI to clients by showing readiness improvement over time

---

## Core Features

1. Analysis timeline showing all 5 wizard steps with their AI outputs in vertical scroll layout
2. Business profile card (from Step 1 analysis: company summary, industry, size, tech signals, competitive landscape)
3. Diagnostic insights panel (from Step 2: pain points ranked by severity, opportunities, industry benchmarks)
4. System recommendations ranked list (from Step 3: system name, fit score, ROI projection, implementation complexity)
5. Readiness score dashboard (from Step 4: overall score, 5-dimension radar chart, dimension breakdowns, gaps, strengths)
6. Roadmap summary (from Step 5: phases with timeline, investment per phase, total estimated investment)
7. "Re-run Analysis" button that triggers fresh AI analysis with current data (hits all edge functions)
8. Historical snapshots comparison (from context_snapshots: side-by-side before/after view)
9. Section anchor navigation (sticky nav for quick jumps between sections)
10. AI run stats (model used, token count, response time, cache status per step)

---

## Data Displayed

- Business profile: company name, industry, employee count, locations, annual revenue, tech stack signals, competitive positioning (from Step 1 ai_results)
- Diagnostics: pain points (title, severity, estimated cost), opportunities (title, priority, potential value), industry benchmarks (metric, client value, benchmark value) (from Step 2 ai_results)
- System recommendations: system name, fit score (0-100), estimated ROI, implementation timeline, complexity rating, "why it fits" bullets (from Step 3 ai_results)
- Readiness dimensions: Leadership & Vision, Data Readiness, Process Maturity, Technology Infrastructure, Team Capability — each with a score 0-100 and qualitative assessment (from Step 4 ai_results)
- Overall readiness score (0-100) with qualitative label (Low, Moderate, High, Very High)
- Roadmap: phase names, durations, systems included, investment estimates, total timeline (from Step 5 ai_results)
- Run metadata: model name, input/output tokens, duration_ms, cache hit/miss, timestamp (from ai_run_logs)
- Snapshot history: dates, score deltas, dimension changes (from context_snapshots)

---

## UI Components

- `InsightsPage` — full page with sticky section nav and vertical scroll sections
- `SectionAnchorNav` — sticky horizontal nav with 5 section links (scrollspy highlighting)
- `BusinessProfileCard` — structured card with company info, industry tags, tech signals list
- `DiagnosticInsightsGrid` — 2-column grid of insight cards (pain points left, opportunities right)
- `InsightCard` — card with title, severity/priority badge, description, estimated cost/value
- `SystemRankingList` — ordered list of system cards with fit score bar, ROI badge, complexity rating
- `SystemCard` — expandable card with system name, score, "why it fits" bullets, action button
- `ReadinessRadarChart` — Recharts RadarChart with 5 axes for readiness dimensions
- `ReadinessScoreBreakdown` — overall score circle + 5 dimension rows with progress bars and labels
- `DimensionRow` — dimension name, score bar, qualitative label, delta indicator (if comparison mode)
- `RoadmapSummaryCard` — horizontal phase blocks with timeline, investment, and systems per phase
- `ReRunButton` — prominent button with loading state, confirmation dialog, and progress indicator
- `SnapshotComparisonView` — side-by-side cards showing before/after scores with delta highlights
- `AIRunStats` — collapsible footer with model, tokens, duration, cache status per step

---

## Layout Structure

```
+-----------------------------------------------------+
| Sidebar (240px)  |  Main Content (flex-1, scroll-y)  |
|                  |                                    |
| * Dashboard      |  AI Insights                      |
| * Projects       |  [Re-run Analysis]                |
| * CRM            |                                   |
| * AI Insights <--|  --- Sticky Section Nav ---------- |
| * Documents      |  [Profile][Diag][Systems][Ready][R]|
| * Financial      |  --------------------------------- |
| * Settings       |                                    |
|                  |  ## Business Profile               |
|                  |  +-------------------------------+ |
|                  |  | Acme Retail Group             | |
|                  |  | E-commerce | 50 emp | 2 loc   | |
|                  |  | Tech: Shopify, Zendesk, ...   | |
|                  |  +-------------------------------+ |
|                  |                                    |
|                  |  ## Diagnostics                    |
|                  |  +-- Pain Points --+-- Opport. --+ |
|                  |  | Cart abandon 68%| Chatbot     | |
|                  |  | Manual triage   | Rec engine  | |
|                  |  +----------------+-------------+  |
|                  |                                    |
|                  |  ## System Recommendations         |
|                  |  +-------------------------------+ |
|                  |  | 1. Support Engine    [95 fit] | |
|                  |  | 2. Cart Recovery     [91 fit] | |
|                  |  | 3. Rec Engine        [87 fit] | |
|                  |  +-------------------------------+ |
|                  |                                    |
|                  |  ## Readiness Assessment           |
|                  |  +-- Radar ---+-- Breakdown -----+ |
|                  |  |    /\      | Leadership  82   | |
|                  |  |   /  \     | Data        62   | |
|                  |  |  /    \    | Process     75   | |
|                  |  | / 72   \   | Tech        71   | |
|                  |  +----------+-------------------+  |
|                  |                                    |
|                  |  ## Roadmap Summary                |
|                  |  [Phase 1: 4wk $12K][Phase 2: 4wk]|
|                  |                                    |
|                  |  ## Run Stats (collapsible)        |
|                  |  Model: gemini-3.1-pro | 4.2K tok  |
+-----------------------------------------------------+
```

- Vertical scroll with sections, each section full width within `max-w-[1200px]`
- Section anchor nav: sticky at top of main content, 48px height, `#FFFFFF` background, `#D4CFC8` bottom border
- Active section in nav: `#84CC16` underline indicator (scrollspy)
- Cards: `#FFFFFF` background, `#D4CFC8` border, 8px radius
- Radar chart: 300x300px, `#0A211F` axis lines, `#84CC16` fill with 0.3 opacity
- Score circle: 120px diameter, `#84CC16` stroke for high (>70), `#D4CFC8` track
- Fit score bars: `#84CC16` fill, `#D4CFC8` track, inside system cards

---

## Interaction Patterns

- Section anchor nav uses scrollspy — active section highlights as user scrolls
- Click section anchor -> smooth scroll to that section
- Expand/collapse each section independently (Accordion pattern)
- Click system card -> expand to show full "why it fits" analysis and ROI detail
- Click "Re-run Analysis" -> confirmation dialog ("This will run all 5 AI analyses. Estimated time: 30-60 seconds.") -> loading state per section with progress bar -> results replace current data, previous saved as snapshot
- Compare snapshots: toggle "Compare with previous" -> side-by-side view with green (improved) / red (declined) delta indicators
- Click dimension in radar chart -> scroll to that dimension's detail row
- Collapsible run stats section at bottom (default collapsed)
- Right-click insight card -> "Copy to clipboard" for pasting into proposals

---

## Example User Workflows

**Workflow 1 — Pre-call review:** Agency consultant Maria has a call with Acme Retail in 30 minutes. She opens the AI Insights page for Acme. She quickly scans the business profile ("e-commerce, 50 employees, Shopify + Zendesk stack"), then scrolls to diagnostics where the top pain point is "Cart abandonment at 68%, 12 points above industry average." She notes the top 3 recommended systems and their fit scores. She checks the readiness radar — "Data Readiness" at 62 is the weakest dimension. She has everything she needs for the call. Total review time: 3 minutes.

**Workflow 2 — Post-delivery re-analysis:** GreenLeaf Healthcare completed Phase 1 (Patient Intake Automation) two months ago. The consultant clicks "Re-run Analysis." The system runs all 5 AI agents with current project data. Results appear section by section over 45 seconds. Previous snapshot is auto-saved. The comparison view shows: overall readiness 78 -> 84 (+6), Data Readiness 62 -> 74 (+12), Process Maturity 75 -> 81 (+6). Two new opportunities appear in diagnostics that were not present before: "Telemedicine scheduling integration" and "Automated follow-up reminders." The consultant shares this comparison with the client as proof of Phase 1 ROI.

**Workflow 3 — Stakeholder presentation:** The Acme Retail CEO needs to present the AI transformation plan to the board. She opens AI Insights and walks through each section: business profile for context, diagnostics showing $180K/year in addressable pain points, system recommendations ranked by fit, readiness score showing the company is "moderately ready" at 72, and the 3-phase roadmap with $48K total investment and projected $290K annual return. She screenshots each section for the board deck.

---

## AI Features

- Trend detection across snapshots: "Your readiness score has improved 8 points across 3 analyses over 4 months"
- Automated insight summaries: AI generates a 2-3 sentence summary per section ("Your top operational pain point is manual ticket triage at 40 hours/week. The recommended Support Engine addresses this directly.")
- "What improved" highlights after re-analysis: green badges on dimensions and metrics that improved, with explanatory text
- Proactive recommendations based on gaps: "Your Data Readiness score of 62 is your biggest barrier. Consider a data audit before starting Phase 2."
- Cross-client pattern matching (agency view): "Clients in e-commerce with similar profiles typically improve readiness by 15 points after Phase 1"

---

## Data Sources (tables)

| Data | Table | Column/Query |
|------|-------|-------------|
| Business profile | wizard_answers | ai_results where step_number = 1 |
| Diagnostics | wizard_answers | ai_results where step_number = 2 |
| System recommendations | wizard_answers | ai_results where step_number = 3 |
| Readiness assessment | wizard_answers | ai_results where step_number = 4 |
| Roadmap | wizard_answers | ai_results where step_number = 5 |
| Session metadata | wizard_sessions | id, created_at, updated_at, status |
| AI run details | ai_run_logs | model, tokens_used, duration_ms, success, where session_id matches |
| Cache status | ai_cache | input_hash lookups for cache hit indication |
| Historical snapshots | context_snapshots | where session_id or org_id, ordered by created_at |
| Current org | organizations | name, industry for header context |

---

## Automation Opportunities

- Auto-save snapshot to context_snapshots before every re-analysis (preserve history)
- Trigger re-analysis suggestion when a major project milestone completes ("Phase 1 done — re-run to see updated readiness?")
- Generate executive summary PDF from insights data (all 5 sections formatted for print/share)
- Auto-notify client when re-analysis shows improvement: "Your readiness score improved to 84 after Phase 1!"
- Cache-aware re-analysis: skip unchanged sections (if business profile hasn't changed, use cached Step 1)
- Weekly digest for agency: "3 clients have not had analysis re-run in 60+ days — consider prompting re-evaluation"

---

## Visual Hierarchy

1. **Primary focus**: Readiness score + business profile (top hero area, largest cards, immediate context)
2. **Secondary**: Diagnostics grid + system recommendations (middle, data-rich, scrollable)
3. **Tertiary**: Roadmap summary (bottom of main content, actionable next steps)
4. **Supporting**: Section anchor nav (sticky, navigational), Run stats (footer, metadata for technical users)

---

## User Stories

| As a... | I want to... | So that... |
|---------|--------------|------------|
| Business owner | review my full AI analysis in one page | I can reference it before meetings and share with stakeholders |
| Agency consultant | quickly scan a client's diagnostics and readiness | I can prepare for calls in under 5 minutes |
| Business owner | re-run the analysis after completing a project phase | I can see measurable improvement in my readiness score |
| Agency consultant | compare before/after snapshots | I can demonstrate ROI to clients and justify continued investment |
| Business owner | see which readiness dimension is weakest | I know where to focus improvement efforts |
| Agency owner | see AI run stats (cost, tokens, speed) | I can monitor AI platform costs and performance |

---

## Goals & Acceptance Criteria

### Goals
1. **Primary:** Users can review all 5 wizard analysis steps in a single scrollable page with purpose-built visualizations
2. **Quality:** Page loads in < 3 seconds, re-analysis completes in < 60 seconds with progress feedback

### Acceptance Criteria
- [ ] Insights page renders at `/app/insights` with vertical scroll layout and sticky section anchor nav
- [ ] Section nav highlights active section via scrollspy as user scrolls
- [ ] Business Profile section renders company name, industry, size, tech signals from Step 1 ai_results
- [ ] Diagnostics section renders pain points and opportunities in a 2-column grid with severity/priority badges
- [ ] System Recommendations section renders ranked list with fit score bars, ROI projections, and expandable detail
- [ ] Readiness section renders RadarChart (Recharts) with 5 dimensions and score breakdown rows with progress bars
- [ ] Overall readiness score displays as a circular progress ring with qualitative label
- [ ] Roadmap Summary section renders phases as horizontal timeline blocks with investment and duration
- [ ] "Re-run Analysis" button triggers all 5 AI agents with confirmation dialog and per-section loading indicators
- [ ] Previous analysis auto-saved to context_snapshots before re-run
- [ ] Snapshot comparison view shows side-by-side scores with green/red delta indicators
- [ ] AI run stats section (collapsible) shows model, tokens, duration, cache status per step
- [ ] Loading state shows skeleton cards per section
- [ ] Empty state (no wizard completed) shows "Complete the wizard to see your AI analysis" with link to wizard
- [ ] Responsive: single-column stack on mobile, section nav becomes horizontal scroll

---

## Wiring Plan

| Layer | File | Action |
|-------|------|--------|
| Page | `src/components/dashboard/AIInsights.tsx` | Create |
| Component | `src/components/dashboard/SectionAnchorNav.tsx` | Create |
| Component | `src/components/dashboard/BusinessProfileCard.tsx` | Create |
| Component | `src/components/dashboard/DiagnosticInsightsGrid.tsx` | Create |
| Component | `src/components/dashboard/InsightCard.tsx` | Create |
| Component | `src/components/dashboard/SystemRankingList.tsx` | Create |
| Component | `src/components/dashboard/SystemCard.tsx` | Create |
| Component | `src/components/dashboard/ReadinessRadarChart.tsx` | Create |
| Component | `src/components/dashboard/ReadinessScoreBreakdown.tsx` | Create |
| Component | `src/components/dashboard/DimensionRow.tsx` | Create |
| Component | `src/components/dashboard/RoadmapSummaryCard.tsx` | Create |
| Component | `src/components/dashboard/ReRunButton.tsx` | Create |
| Component | `src/components/dashboard/SnapshotComparisonView.tsx` | Create |
| Component | `src/components/dashboard/AIRunStats.tsx` | Create |
| Hook | `src/lib/hooks/useWizardInsights.ts` | Create |
| Hook | `src/lib/hooks/useReRunAnalysis.ts` | Create |
| Hook | `src/lib/hooks/useSnapshots.ts` | Create |
| Types | `src/lib/types/insights.ts` | Create |
| Route | `src/routes.tsx` | Modify — add `/app/insights` route |

---

## Frontend Wiring

### Component Tree

```
<InsightsPage>                          ← route: /app/insights
  <SectionAnchorNav>                    ← sticky top nav, scrollspy
    <AnchorLink section="profile" />
    <AnchorLink section="diagnostics" />
    <AnchorLink section="systems" />
    <AnchorLink section="readiness" />
    <AnchorLink section="roadmap" />
  </SectionAnchorNav>
  <ReRunButton />                       ← triggers all 5 agents
  <SnapshotComparisonToggle />          ← "Compare with previous" toggle
  <section id="profile">
    <BusinessProfileCard />
  </section>
  <section id="diagnostics">
    <DiagnosticInsightsGrid>
      <InsightCard type="pain_point" />  ← left column
      <InsightCard type="opportunity" /> ← right column
    </DiagnosticInsightsGrid>
  </section>
  <section id="systems">
    <SystemRankingList>
      <SystemCard />                    ← expandable, one per recommendation
      <SystemCard />
    </SystemRankingList>
  </section>
  <section id="readiness">
    <ReadinessRadarChart />             ← Recharts RadarChart, 5 axes
    <ReadinessScoreBreakdown>
      <DimensionRow />                  ← one per dimension (5 total)
    </ReadinessScoreBreakdown>
  </section>
  <section id="roadmap">
    <RoadmapSummaryCard />              ← horizontal phase blocks
  </section>
  <SnapshotComparisonView />            ← side-by-side, conditionally rendered
  <AIRunStats />                        ← collapsible footer
</InsightsPage>
```

### TypeScript Interfaces

```ts
// src/lib/types/insights.ts

interface BusinessProfile {
  company_name: string;
  industry: string;
  employee_count: number;
  locations: number;
  annual_revenue: string;
  tech_stack: string[];
  competitive_positioning: string;
}

interface DiagnosticInsight {
  id: string;
  title: string;
  type: 'pain_point' | 'opportunity';
  severity: 'high' | 'medium' | 'low';      // pain points
  priority: 'high' | 'medium' | 'low';      // opportunities
  description: string;
  estimated_cost: number | null;             // pain points
  potential_value: number | null;            // opportunities
}

interface IndustryBenchmark {
  metric: string;
  client_value: number;
  benchmark_value: number;
  unit: string;
}

interface SystemRecommendation {
  id: string;
  system_name: string;
  fit_score: number;                         // 0-100
  estimated_roi: string;
  implementation_timeline: string;
  complexity: 'low' | 'medium' | 'high';
  why_it_fits: string[];
}

interface ReadinessDimension {
  name: 'Leadership & Vision' | 'Data Readiness' | 'Process Maturity' | 'Technology Infrastructure' | 'Team Capability';
  score: number;                             // 0-100
  qualitative: string;
  gaps: string[];
  strengths: string[];
}

interface ReadinessAssessment {
  overall_score: number;
  label: 'Low' | 'Moderate' | 'High' | 'Very High';
  dimensions: ReadinessDimension[];
}

interface RoadmapPhase {
  phase_number: number;
  name: string;
  duration_weeks: number;
  investment: number;
  systems: string[];
}

interface AIRunMeta {
  step_number: number;
  model: string;
  input_tokens: number;
  output_tokens: number;
  duration_ms: number;
  cache_hit: boolean;
  created_at: string;
}

interface ContextSnapshot {
  id: string;
  created_at: string;
  readiness_score: number;
  dimensions: ReadinessDimension[];
  source: 'auto' | 'manual';
}

interface WizardInsightsData {
  session_id: string;
  business_profile: BusinessProfile | null;
  diagnostics: { pain_points: DiagnosticInsight[]; opportunities: DiagnosticInsight[]; benchmarks: IndustryBenchmark[] } | null;
  recommendations: SystemRecommendation[] | null;
  readiness: ReadinessAssessment | null;
  roadmap: { phases: RoadmapPhase[]; total_investment: number; total_weeks: number } | null;
  run_stats: AIRunMeta[];
}
```

### Custom Hooks

```ts
// src/lib/hooks/useWizardInsights.ts
function useWizardInsights(sessionId: string): {
  data: WizardInsightsData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// src/lib/hooks/useReRunAnalysis.ts
function useReRunAnalysis(sessionId: string): {
  reRun: () => Promise<void>;
  progress: { step: number; total: number; currentAgent: string } | null;
  isRunning: boolean;
  error: string | null;
}

// src/lib/hooks/useSnapshots.ts
function useSnapshots(sessionId: string): {
  snapshots: ContextSnapshot[];
  loading: boolean;
  compare: (snapshotId: string) => void;
  activeComparison: ContextSnapshot | null;
}
```

### State Management

| State | Location | Reason |
|-------|----------|--------|
| Wizard insights data (all 5 steps) | `useWizardInsights` hook (useState) | Fetched once on mount, refetched on re-run |
| Active section (scrollspy) | `SectionAnchorNav` local useState | Only needed for nav highlighting |
| Re-run progress | `useReRunAnalysis` hook (useState) | Tracks multi-step re-analysis |
| Comparison mode on/off | `InsightsPage` local useState | Toggles SnapshotComparisonView |
| Selected snapshot for comparison | `useSnapshots` hook (useState) | Drives side-by-side view |
| Expanded system card ID | `SystemRankingList` local useState | Controls accordion expand |
| Run stats expanded/collapsed | `AIRunStats` local useState | Simple toggle |
| Session ID | URL param `?session=<id>` | Deep-linkable, read via `useSearchParams` |

### Data Fetching Pattern

```
InsightsPage mounts
  → useWizardInsights(sessionId)
      → api<WizardInsightsData>('/dashboard/insights', { method: 'POST', body: { session_id } })
      → stores response in useState, sets loading false

  → useSnapshots(sessionId)
      → api<ContextSnapshot[]>('/dashboard/insights/snapshots', { method: 'POST', body: { session_id } })

ReRunButton clicked
  → useReRunAnalysis(sessionId).reRun()
      → api('/dashboard/insights/snapshot', { method: 'POST', body: { session_id } })  // save current
      → sequential calls to 5 agents:
          api('/ai/analyze-business', ...)
          api('/ai/generate-diagnostics', ...)
          api('/ai/recommend-systems', ...)
          api('/ai/scorer', ...)
          api('/ai/generate-roadmap', ...)
      → updates progress state after each agent completes
      → calls useWizardInsights.refetch() when all done
```

### Component Communication

- **Props down**: `InsightsPage` passes `WizardInsightsData` sections to child components (e.g., `<BusinessProfileCard profile={data.business_profile} />`)
- **Callbacks up**: `ReRunButton` receives `onComplete` callback from `InsightsPage` that triggers `refetch()`
- **Scrollspy**: `SectionAnchorNav` uses `IntersectionObserver` on section elements, no shared context needed
- **Comparison mode**: `InsightsPage` holds `showComparison` state, passes `activeComparison` snapshot data to `SnapshotComparisonView` and `DimensionRow` (which renders delta indicators)
- **No global context needed**: all state is page-scoped, passed via props

---

## Backend Wiring

### New Edge Function Routes

| Method | Route | Handler | Request Body | Response Shape |
|--------|-------|---------|-------------|----------------|
| POST | `/dashboard/insights` | Fetch all 5 wizard step results + run stats for a session | `{ session_id: string }` | `WizardInsightsData` |
| POST | `/dashboard/insights/snapshots` | List historical snapshots for a session | `{ session_id: string }` | `ContextSnapshot[]` |
| POST | `/dashboard/insights/snapshot` | Save current analysis as a snapshot | `{ session_id: string }` | `{ id: string, created_at: string }` |
| POST | `/dashboard/insights/rerun` | Re-run all 5 AI agents for a session (orchestrator) | `{ session_id: string }` | `{ success: boolean, steps_completed: number }` |

### Supabase Client Queries

```ts
// Fetch all wizard answers for a session (all 5 steps)
const { data: answers } = await db
  .from('wizard_answers')
  .select('step_number, ai_results, user_answers, screen_id')
  .eq('session_id', sessionId)
  .order('step_number', { ascending: true });

// Fetch AI run logs for a session
const { data: runLogs } = await db
  .from('ai_run_logs')
  .select('prompt_type, model, tokens_used, duration_ms, success, cache_hit, created_at')
  .eq('session_id', sessionId)
  .order('created_at', { ascending: true });

// Fetch session metadata
const { data: session } = await db
  .from('wizard_sessions')
  .select('id, org_id, created_at, updated_at, status')
  .eq('id', sessionId)
  .single();

// Fetch historical snapshots
const { data: snapshots } = await db
  .from('context_snapshots')
  .select('id, created_at, snapshot_data')
  .eq('session_id', sessionId)
  .order('created_at', { ascending: false });

// Save a new snapshot before re-run
await db.from('context_snapshots').insert({
  session_id: sessionId,
  org_id: session.org_id,
  snapshot_data: {
    readiness_score: currentReadiness.overall_score,
    dimensions: currentReadiness.dimensions,
    recommendations_count: currentRecommendations.length,
    timestamp: new Date().toISOString(),
  },
  source: 'auto',
});

// Check cache for a specific step
const { data: cached } = await db
  .from('ai_cache')
  .select('response')
  .eq('prompt_hash', inputHash)
  .gte('expires_at', new Date().toISOString())
  .single();
```

### RLS Policies Needed

| Table | Policy | Rule |
|-------|--------|------|
| `wizard_answers` | SELECT for session owner | `auth.uid() IN (SELECT user_id FROM wizard_sessions WHERE id = wizard_answers.session_id)` OR user is agency member of the org |
| `wizard_sessions` | SELECT for session owner or agency | `auth.uid() = user_id OR auth.uid() IN (SELECT user_id FROM org_members WHERE org_id = wizard_sessions.org_id)` |
| `ai_run_logs` | SELECT for agency members | `auth.uid() IN (SELECT user_id FROM org_members WHERE org_id = ai_run_logs.org_id)` |
| `context_snapshots` | SELECT/INSERT for session owner or agency | `auth.uid() IN (SELECT user_id FROM org_members WHERE org_id = context_snapshots.org_id)` |
| `ai_cache` | No direct frontend access | Accessed only via edge functions using `adminClient()` |

### API Response Interfaces

```ts
// POST /dashboard/insights response
interface InsightsResponse {
  session_id: string;
  business_profile: BusinessProfile | null;
  diagnostics: {
    pain_points: DiagnosticInsight[];
    opportunities: DiagnosticInsight[];
    benchmarks: IndustryBenchmark[];
  } | null;
  recommendations: SystemRecommendation[] | null;
  readiness: ReadinessAssessment | null;
  roadmap: {
    phases: RoadmapPhase[];
    total_investment: number;
    total_weeks: number;
  } | null;
  run_stats: AIRunMeta[];
}

// POST /dashboard/insights/snapshots response
type SnapshotsResponse = ContextSnapshot[];

// POST /dashboard/insights/snapshot response
interface SnapshotCreateResponse {
  id: string;
  created_at: string;
}

// POST /dashboard/insights/rerun response
interface ReRunResponse {
  success: boolean;
  steps_completed: number;
  errors: { step: number; message: string }[];
}
```

### Edge Cases

| Scenario | Handling |
|----------|----------|
| No wizard session completed | Return empty `InsightsResponse` with all fields null; frontend shows empty state: "Complete the wizard to see your AI analysis" |
| Partial wizard (e.g., only steps 1-3 done) | Return data for completed steps, null for incomplete; frontend renders completed sections, shows "Pending" badge on incomplete |
| Re-run fails mid-way (e.g., step 3 times out) | Return partial success with `steps_completed: 2` and error array; frontend shows completed steps updated, failed step with error badge and retry option |
| No snapshots exist | `snapshots` returns empty array; comparison toggle is disabled with tooltip "No previous analyses to compare" |
| Unauthorized access (wrong org) | RLS blocks query, edge function returns `{ data: null, error: "Not authorized" }` with 403 status |
| Session ID not found | Edge function returns 404 with `{ data: null, error: "Session not found" }` |
| AI cache hit on re-run | Skip the agent call for that step, use cached result; indicate cache hit in run_stats |

---

## Detailed ASCII Wireframes

### Desktop Layout (1200px content width)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (240px)  │  MAIN CONTENT (max-w-[1200px], mx-auto, px-6)          │
│                  │                                                         │
│ ┌──────────────┐ │ ┌─────────────────────────────────────────────────────┐ │
│ │ AMO AI       │ │ │ AI Insights                    [Re-run Analysis ▶] │ │
│ │              │ │ │ Acme Retail Group — Session #a3f...                 │ │
│ │ Dashboard    │ │ └─────────────────────────────────────────────────────┘ │
│ │ Projects     │ │                                                         │
│ │ CRM          │ │ ┌─────────────────────────────────────────────────────┐ │
│ │ ▸ AI Insights│ │ │ ● Profile │ Diagnostics │ Systems │ Readiness │ Road│ │
│ │ Documents    │ │ │ ═════════                                     48px │ │
│ │ Financial    │ │ └─────────────────────────────────────────────────────┘ │
│ │ Settings     │ │                    ↕ sticky on scroll                   │
│ │              │ │                                                         │
│ └──────────────┘ │ ┌─────────────────────────────────────────────────────┐ │
│                  │ │ § BUSINESS PROFILE                                  │ │
│                  │ │ ┌─────────────────────────────────────────────────┐ │ │
│                  │ │ │ Acme Retail Group                               │ │ │
│                  │ │ │                                                 │ │ │
│                  │ │ │ Industry: E-commerce    Employees: 50          │ │ │
│                  │ │ │ Locations: 2            Revenue: $4.2M/yr      │ │ │
│                  │ │ │                                                 │ │ │
│                  │ │ │ Tech Stack:                                     │ │ │
│                  │ │ │ ┌─────────┐ ┌─────────┐ ┌──────────┐          │ │ │
│                  │ │ │ │ Shopify │ │ Zendesk │ │ Mailchimp│          │ │ │
│                  │ │ │ └─────────┘ └─────────┘ └──────────┘          │ │ │
│                  │ │ │                                                 │ │ │
│                  │ │ │ Competitive Position: Mid-market leader with    │ │ │
│                  │ │ │ strong brand recognition but lagging in AI...   │ │ │
│                  │ │ └─────────────────────────────────────────────────┘ │ │
│                  │ └─────────────────────────────────────────────────────┘ │
│                  │                                                         │
│                  │ ┌─────────────────────────────────────────────────────┐ │
│                  │ │ § DIAGNOSTICS                                       │ │
│                  │ │ ┌──────────────────────┐ ┌──────────────────────┐  │ │
│                  │ │ │ PAIN POINTS          │ │ OPPORTUNITIES        │  │ │
│                  │ │ │                      │ │                      │  │ │
│                  │ │ │ ┌──────────────────┐ │ │ ┌──────────────────┐ │  │ │
│                  │ │ │ │ Cart Abandon 68% │ │ │ │ AI Chatbot       │ │  │ │
│                  │ │ │ │ ● HIGH           │ │ │ │ ● HIGH           │ │  │ │
│                  │ │ │ │ $96K/yr lost     │ │ │ │ $180K potential  │ │  │ │
│                  │ │ │ │ 12pts above avg  │ │ │ │ Reduce support   │ │  │ │
│                  │ │ │ └──────────────────┘ │ │ │ costs by 40%     │ │  │ │
│                  │ │ │ ┌──────────────────┐ │ │ └──────────────────┘ │  │ │
│                  │ │ │ │ Manual Triage    │ │ │ ┌──────────────────┐ │  │ │
│                  │ │ │ │ ● MEDIUM         │ │ │ │ Rec Engine       │ │  │ │
│                  │ │ │ │ 40 hrs/wk labor  │ │ │ │ ● MEDIUM         │ │  │ │
│                  │ │ │ └──────────────────┘ │ │ │ +15% avg order   │ │  │ │
│                  │ │ └──────────────────────┘ │ └──────────────────┘ │  │ │
│                  │ │                           └──────────────────────┘  │ │
│                  │ └─────────────────────────────────────────────────────┘ │
│                  │                                                         │
│                  │ ┌─────────────────────────────────────────────────────┐ │
│                  │ │ § SYSTEM RECOMMENDATIONS                            │ │
│                  │ │ ┌─────────────────────────────────────────────────┐ │ │
│                  │ │ │ 1. Customer Support Engine                      │ │ │
│                  │ │ │    ██████████████████████████████████████░░ 95  │ │ │
│                  │ │ │    ROI: $180K/yr │ Timeline: 4 wk │ Low cmplx │ │ │
│                  │ │ │    ▸ Expand for details                        │ │ │
│                  │ │ ├─────────────────────────────────────────────────┤ │ │
│                  │ │ │ 2. Cart Recovery System                        │ │ │
│                  │ │ │    ████████████████████████████████████░░░░ 91  │ │ │
│                  │ │ │    ROI: $96K/yr  │ Timeline: 3 wk │ Med cmplx │ │ │
│                  │ │ │    ▸ Expand for details                        │ │ │
│                  │ │ ├─────────────────────────────────────────────────┤ │ │
│                  │ │ │ 3. Recommendation Engine                       │ │ │
│                  │ │ │    ██████████████████████████████████░░░░░░ 87  │ │ │
│                  │ │ │    ROI: $64K/yr  │ Timeline: 6 wk │ High cmplx│ │ │
│                  │ │ │    ▸ Expand for details                        │ │ │
│                  │ │ └─────────────────────────────────────────────────┘ │ │
│                  │ └─────────────────────────────────────────────────────┘ │
│                  │                                                         │
│                  │ ┌─────────────────────────────────────────────────────┐ │
│                  │ │ § READINESS ASSESSMENT                              │ │
│                  │ │ ┌──────────────────────┐ ┌──────────────────────┐  │ │
│                  │ │ │  RADAR CHART (300px) │ │ SCORE BREAKDOWN      │  │ │
│                  │ │ │                      │ │                      │  │ │
│                  │ │ │     Leadership       │ │ Overall: ◉ 72       │  │ │
│                  │ │ │         82           │ │ ─────── Moderate     │  │ │
│                  │ │ │        /\            │ │                      │  │ │
│                  │ │ │  Team/    \Data      │ │ Leadership & Vision  │  │ │
│                  │ │ │   70 \  / 62         │ │ ████████████████░░ 82│  │ │
│                  │ │ │       \/             │ │                      │  │ │
│                  │ │ │  Tech/  \Process     │ │ Data Readiness       │  │ │
│                  │ │ │   71    75           │ │ ████████████░░░░░░ 62│  │ │
│                  │ │ │                      │ │ ▼ Weakest dimension  │  │ │
│                  │ │ │  #84CC16 fill 0.3    │ │                      │  │ │
│                  │ │ │  #0A211F axis lines  │ │ Process Maturity     │  │ │
│                  │ │ │                      │ │ ███████████████░░░ 75│  │ │
│                  │ │ │                      │ │                      │  │ │
│                  │ │ │                      │ │ Tech Infrastructure  │  │ │
│                  │ │ │                      │ │ ██████████████░░░░ 71│  │ │
│                  │ │ │                      │ │                      │  │ │
│                  │ │ │                      │ │ Team Capability      │  │ │
│                  │ │ │                      │ │ ██████████████░░░░ 70│  │ │
│                  │ │ └──────────────────────┘ └──────────────────────┘  │ │
│                  │ └─────────────────────────────────────────────────────┘ │
│                  │                                                         │
│                  │ ┌─────────────────────────────────────────────────────┐ │
│                  │ │ § ROADMAP SUMMARY                                   │ │
│                  │ │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │ │
│                  │ │ │ Phase 1      │ │ Phase 2      │ │ Phase 3      │ │ │
│                  │ │ │ 4 weeks      │→│ 4 weeks      │→│ 6 weeks      │ │ │
│                  │ │ │ $12,000      │ │ $16,000      │ │ $20,000      │ │ │
│                  │ │ │              │ │              │ │              │ │ │
│                  │ │ │ Support      │ │ Cart Recovery│ │ Rec Engine   │ │ │
│                  │ │ │ Engine       │ │ System       │ │              │ │ │
│                  │ │ └──────────────┘ └──────────────┘ └──────────────┘ │ │
│                  │ │                                                     │ │
│                  │ │ Total: 14 weeks │ $48,000 investment                │ │
│                  │ └─────────────────────────────────────────────────────┘ │
│                  │                                                         │
│                  │ ┌─────────────────────────────────────────────────────┐ │
│                  │ │ ▸ AI Run Stats (click to expand)                    │ │
│                  │ │ ┌───────────┬─────────────────┬────────┬──────────┐ │ │
│                  │ │ │ Step      │ Model           │ Tokens │ Duration │ │ │
│                  │ │ ├───────────┼─────────────────┼────────┼──────────┤ │ │
│                  │ │ │ 1 Profile │ gemini-2.0-flash│ 1,240  │ 2.1s    │ │ │
│                  │ │ │ 2 Diag    │ gemini-2.0-flash│ 2,380  │ 3.4s    │ │ │
│                  │ │ │ 3 Systems │ gemini-2.0-flash│ 3,100  │ 4.2s    │ │ │
│                  │ │ │ 4 Ready   │ gemini-2.0-flash│ 1,890  │ 8.2s    │ │ │
│                  │ │ │ 5 Roadmap │ gemini-2.0-flash│ 2,640  │ 3.8s    │ │ │
│                  │ │ └───────────┴─────────────────┴────────┴──────────┘ │ │
│                  │ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tablet Layout (768px)

```
┌───────────────────────────────────────────────────┐
│ ☰  AI Insights            [Re-run ▶]             │
│                                                   │
│ ┌───────────────────────────────────────────────┐ │
│ │ ◄ Profile│Diag│Systems│Readiness│Roadmap ►    │ │
│ │          horizontal scroll, 48px              │ │
│ └───────────────────────────────────────────────┘ │
│                                                   │
│ ┌───────────────────────────────────────────────┐ │
│ │ § BUSINESS PROFILE                            │ │
│ │ Acme Retail Group                             │ │
│ │ E-commerce │ 50 emp │ 2 loc │ $4.2M          │ │
│ │ Tech: [Shopify] [Zendesk] [Mailchimp]        │ │
│ └───────────────────────────────────────────────┘ │
│                                                   │
│ ┌───────────────────────────────────────────────┐ │
│ │ § DIAGNOSTICS                                 │ │
│ │ ┌─────────────────────────────────────┐       │ │
│ │ │ Pain: Cart Abandon 68% │ ● HIGH    │       │ │
│ │ │ $96K/yr lost                        │       │ │
│ │ └─────────────────────────────────────┘       │ │
│ │ ┌─────────────────────────────────────┐       │ │
│ │ │ Opp: AI Chatbot │ ● HIGH           │       │ │
│ │ │ $180K potential value               │       │ │
│ │ └─────────────────────────────────────┘       │ │
│ │   (single column stack)                       │ │
│ └───────────────────────────────────────────────┘ │
│                                                   │
│ ┌───────────────────────────────────────────────┐ │
│ │ § READINESS                                   │ │
│ │ ┌───────────────────────────────────────────┐ │ │
│ │ │ Radar Chart (full width, 280px tall)      │ │ │
│ │ └───────────────────────────────────────────┘ │ │
│ │ ┌───────────────────────────────────────────┐ │ │
│ │ │ Dimension Rows (full width, stacked)      │ │ │
│ │ │ Leadership █████████████████░░░ 82        │ │ │
│ │ │ Data       ████████████░░░░░░░ 62  ▼weak │ │ │
│ │ │ Process    ██████████████░░░░░ 75         │ │ │
│ │ └───────────────────────────────────────────┘ │ │
│ └───────────────────────────────────────────────┘ │
│                                                   │
│ ┌───────────────────────────────────────────────┐ │
│ │ § ROADMAP                                     │ │
│ │ ┌─────────────┐                               │ │
│ │ │ Phase 1     │                               │ │
│ │ │ 4wk │ $12K  │                               │ │
│ │ └─────────────┘                               │ │
│ │ ┌─────────────┐                               │ │
│ │ │ Phase 2     │                               │ │
│ │ │ 4wk │ $16K  │                               │ │
│ │ └─────────────┘                               │ │
│ │   (vertical stack)                            │ │
│ └───────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────┘
```

### Mobile Layout (375px)

```
┌─────────────────────────────┐
│ ☰  AI Insights        [▶]  │ 56px header
├─────────────────────────────┤
│ ◄ Prof│Diag│Sys│Read│Road ►│ 40px, scroll
├─────────────────────────────┤
│                             │
│ ┌─────────────────────────┐ │
│ │ Acme Retail Group       │ │
│ │ E-commerce │ 50 emp     │ │
│ │ [Shopify] [Zendesk]     │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ Cart Abandon 68%        │ │
│ │ ● HIGH │ $96K/yr        │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ AI Chatbot Opportunity  │ │
│ │ ● HIGH │ $180K value    │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ 1. Support Engine  [95] │ │
│ │ ROI: $180K │ 4 wk       │ │
│ │ ▸ Details               │ │
│ ├─────────────────────────┤ │
│ │ 2. Cart Recovery   [91] │ │
│ │ ROI: $96K  │ 3 wk       │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │     Overall: 72         │ │
│ │     ◉ Moderate          │ │
│ │                         │ │
│ │ Leadership ████████░ 82 │ │
│ │ Data       █████░░░ 62  │ │
│ │ Process    ██████░░ 75  │ │
│ │ Tech       ██████░░ 71  │ │
│ │ Team       ██████░░ 70  │ │
│ └─────────────────────────┘ │
│ (radar chart hidden mobile) │
│                             │
│ ┌─────────────────────────┐ │
│ │ Phase 1: 4wk, $12K     │ │
│ │ Phase 2: 4wk, $16K     │ │
│ │ Phase 3: 6wk, $20K     │ │
│ │ Total: 14wk │ $48K     │ │
│ └─────────────────────────┘ │
│                             │
│ ▸ AI Run Stats              │
└─────────────────────────────┘
```

### Key Component Detail: InsightCard

```
┌──────────────────────────────────┐
│ Cart Abandonment at 68%    ● HIGH│  ← title + severity badge
│──────────────────────────────────│
│ Cart abandonment rate is 12      │  ← description text (Lora 14px)
│ points above the industry avg    │
│ of 56%, costing an estimated     │
│ $96,000 per year in lost sales.  │
│                                  │
│ Est. Cost: $96,000/yr            │  ← #0A211F bold
└──────────────────────────────────┘
  Card: #FFFFFF bg, #D4CFC8 border, 8px radius, 16px padding
  Badge: HIGH = #DC2626 bg / MEDIUM = #F59E0B bg / LOW = #D4CFC8 bg
```

### Key Component Detail: DimensionRow (with comparison delta)

```
┌────────────────────────────────────────────────────────────────┐
│ Data Readiness                                                 │
│ ████████████████████████░░░░░░░░░░░░░░░░░░  62 / 100          │
│ "Moderate — data exists but is siloed across systems"  ▲+12   │
│                                                        green   │
└────────────────────────────────────────────────────────────────┘
  Bar track: #D4CFC8   Bar fill: #84CC16 (>70) or #F59E0B (<70)
  Delta badge: green text + up arrow for improvement, red + down arrow for decline
```

### Key Component Detail: Snapshot Comparison View

```
┌────────────────────────────┬────────────────────────────┐
│ PREVIOUS (Jan 15, 2026)    │ CURRENT (Mar 7, 2026)      │
│                            │                            │
│ Overall Readiness: 72      │ Overall Readiness: 78  ▲+6│
│                            │                            │
│ Leadership:  82            │ Leadership:  84        ▲+2│
│ Data:        62            │ Data:        74       ▲+12│
│ Process:     75            │ Process:     81        ▲+6│
│ Tech:        71            │ Tech:        73        ▲+2│
│ Team:        70            │ Team:        72        ▲+2│
│                            │                            │
│ Top Recommendations: 3     │ Top Recommendations: 3     │
└────────────────────────────┴────────────────────────────┘
  Side-by-side #FFFFFF cards, green ▲ for improvements, red ▼ for declines
  Connected by a center divider line (#D4CFC8)
```

---

## Outcomes

| Before | After |
|--------|-------|
| AI analysis results visible only during wizard flow, then buried in jsonb | Full insights page with purpose-built visualizations for all 5 analysis steps |
| No way to re-run analysis with updated data | "Re-run Analysis" button triggers all agents and shows updated results in < 60 seconds |
| No historical comparison of readiness over time | Snapshot comparison shows before/after with green/red delta indicators |
| Readiness score is a single number with no context | Radar chart + 5-dimension breakdown with qualitative assessments and gap identification |
| Consultants piece together analysis from raw data for client calls | One-page review with section nav enables 3-minute pre-call preparation |
