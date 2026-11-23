# 08 — AI INSIGHTS DASHBOARD
# Analysis Results, Readiness Trends, Opportunity Mapping

**Component:** `AIInsightsPage`
**File:** `/components/dashboard/insights/AIInsightsPage.tsx`
**Route:** `/app/insights`
**Status:** NOT STARTED
**Priority:** P1
**Parent Doc:** `00-dashboard-master.md`
**Depends On:** DashboardLayout, Auth, wizard_answers (all 5 steps), ai_run_logs, ai_cache, context_snapshots

---

## SCREEN PURPOSE

Deep dive into all AI-generated analysis from the wizard. Displays the full analysis chain: business profile (Step 1) → diagnostics (Step 2) → system recommendations (Step 3) → readiness assessment (Step 4) → roadmap (Step 5). Vertical scroll layout with a sticky section anchor nav for quick jumps. The "Re-run Analysis" button triggers all 5 AI agents to re-evaluate with updated data. Historical snapshots enable side-by-side comparison to demonstrate ROI.

This is the core intellectual property of the platform — it turns AI analysis from a one-time wizard event into an ongoing strategic asset that clients revisit before calls, consultants reference in proposals, and re-analysis after delivery shows measurable improvement.

Real-world: "Business owner reviews full 5-step analysis before strategy call — sees readiness score 72 with Data Readiness at 62 as weakest dimension."

---

## TARGET USERS

- Business owners reviewing AI analysis before strategy calls or quarterly reviews
- Agency consultants preparing for client meetings and building proposals
- Agency owners demonstrating ROI by showing readiness improvement over time

---

## CORE FEATURES

1. Analysis timeline with all 5 wizard steps rendered as purpose-built visualizations
2. Business profile card (Step 1: company summary, industry, size, tech stack, competitive position)
3. Diagnostic insights grid (Step 2: pain points ranked by severity, opportunities with potential value, industry benchmarks)
4. System recommendations ranked list (Step 3: system name, fit score bar, ROI, complexity, expandable "why it fits")
5. Readiness radar chart + 5-dimension breakdown (Step 4: Recharts RadarChart, dimension progress bars, gaps, strengths)
6. Roadmap summary (Step 5: horizontal phase blocks with timeline, investment, systems per phase)
7. "Re-run Analysis" button triggering all 5 AI agents with per-section progress
8. Historical snapshot comparison with side-by-side delta indicators
9. Sticky section anchor nav with scrollspy highlighting
10. AI run stats footer (model, tokens, duration, cache status per step)

---

## ASCII WIREFRAME — Desktop (1440px)

```
┌─────────────┬──────────────────────────────────────────────────────────────┐
│  SIDEBAR    │  AI Insights — Acme Retail Group        [Re-run Analysis ▶] │
│  240px      ├──────────────────────────────────────────────────────────────┤
│             │  ┌──────────────────────────────────────────────────────┐    │
│  ☀ AMO AI   │  │ ● Profile │ Diagnostics │ Systems │ Readiness │ Road│    │
│             │  │ ══════════                              sticky 48px │    │
│  ──────────│  └──────────────────────────────────────────────────────┘    │
│  ○ Dashboard│                                                              │
│  ○ Projects │  § BUSINESS PROFILE                                         │
│  ○ Clients  │  ┌──────────────────────────────────────────────────────┐    │
│  ○ CRM      │  │  Acme Retail Group                                  │    │
│  ● Insights │  │  Industry: E-commerce  ·  50 employees  ·  2 loc   │    │
│  ○ Documents│  │  Revenue: $4.2M/yr                                  │    │
│  ○ Agents   │  │                                                      │    │
│  ○ Settings │  │  Tech Stack: [Shopify] [Zendesk] [Mailchimp]        │    │
│             │  │                                                      │    │
│             │  │  Competitive: Mid-market leader with strong brand    │    │
│             │  │  recognition but lagging in AI adoption...           │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
│             │  § DIAGNOSTICS                                               │
│             │  ┌──────────────────────┐ ┌────────────────────────────┐    │
│             │  │ PAIN POINTS          │ │ OPPORTUNITIES              │    │
│             │  │                      │ │                            │    │
│             │  │ ┌──────────────────┐ │ │ ┌────────────────────────┐ │    │
│             │  │ │ Cart Abandon 68% │ │ │ │ AI Chatbot             │ │    │
│             │  │ │ ● HIGH           │ │ │ │ ● HIGH                 │ │    │
│             │  │ │ $96K/yr lost     │ │ │ │ $180K potential value  │ │    │
│             │  │ └──────────────────┘ │ │ │ Reduce support 40%    │ │    │
│             │  │ ┌──────────────────┐ │ │ └────────────────────────┘ │    │
│             │  │ │ Manual Triage    │ │ │ ┌────────────────────────┐ │    │
│             │  │ │ ● MEDIUM         │ │ │ │ Rec Engine             │ │    │
│             │  │ │ 40 hrs/wk labor  │ │ │ │ ● MEDIUM               │ │    │
│             │  │ └──────────────────┘ │ │ │ +15% avg order value  │ │    │
│             │  └──────────────────────┘ │ └────────────────────────┘ │    │
│             │                           └────────────────────────────┘    │
│             │                                                              │
│             │  § SYSTEM RECOMMENDATIONS                                    │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │ 1. Customer Support Engine                           │    │
│             │  │    ██████████████████████████████████████░░ 95       │    │
│             │  │    ROI: $180K/yr │ Timeline: 4 wk │ Low complexity  │    │
│             │  │    ▸ Expand for details                              │    │
│             │  ├──────────────────────────────────────────────────────┤    │
│             │  │ 2. Cart Recovery System                              │    │
│             │  │    ████████████████████████████████████░░░░ 91       │    │
│             │  │    ROI: $96K/yr  │ Timeline: 3 wk │ Med complexity  │    │
│             │  │    ▸ Expand for details                              │    │
│             │  ├──────────────────────────────────────────────────────┤    │
│             │  │ 3. Recommendation Engine                             │    │
│             │  │    ██████████████████████████████████░░░░░░ 87       │    │
│             │  │    ROI: $64K/yr  │ Timeline: 6 wk │ High complexity │    │
│             │  │    ▸ Expand for details                              │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
│             │  § READINESS ASSESSMENT                                      │
│             │  ┌──────────────────────┐ ┌────────────────────────────┐    │
│             │  │  RADAR CHART (300px) │ │ SCORE BREAKDOWN            │    │
│             │  │                      │ │                            │    │
│             │  │     Leadership       │ │ Overall: ◉ 72  Moderate    │    │
│             │  │         82           │ │                            │    │
│             │  │        /\           │ │ Leadership & Vision        │    │
│             │  │  Team/    \Data     │ │ ████████████████░░ 82      │    │
│             │  │   70 \  / 62        │ │                            │    │
│             │  │       \/            │ │ Data Readiness             │    │
│             │  │  Tech/  \Process    │ │ ████████████░░░░░░ 62      │    │
│             │  │   71    75          │ │ ▼ Weakest dimension        │    │
│             │  │                      │ │                            │    │
│             │  │  #00875A fill 0.3   │ │ Process Maturity           │    │
│             │  │  #1A1A1A axis       │ │ ███████████████░░░ 75      │    │
│             │  │                      │ │                            │    │
│             │  │                      │ │ Tech Infrastructure       │    │
│             │  │                      │ │ ██████████████░░░░ 71      │    │
│             │  │                      │ │                            │    │
│             │  │                      │ │ Team Capability            │    │
│             │  │                      │ │ ██████████████░░░░ 70      │    │
│             │  └──────────────────────┘ └────────────────────────────┘    │
│             │                                                              │
│             │  § ROADMAP SUMMARY                                           │
│             │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│             │  │ Phase 1      │→│ Phase 2      │→│ Phase 3      │        │
│             │  │ 4 weeks      │ │ 4 weeks      │ │ 6 weeks      │        │
│             │  │ $12,000      │ │ $16,000      │ │ $20,000      │        │
│             │  │ Support Eng. │ │ Cart Recovery│ │ Rec Engine   │        │
│             │  └──────────────┘ └──────────────┘ └──────────────┘        │
│             │  Total: 14 weeks · $48,000 investment                       │
│             │                                                              │
│             │  ▸ AI Run Stats (collapsed)                                 │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │ Step │ Model         │ Tokens │ Duration │ Cache    │    │
│             │  │ 1    │ gemini-2.0    │ 1,240  │ 2.1s     │ miss     │    │
│             │  │ 2    │ gemini-2.0    │ 2,380  │ 3.4s     │ hit      │    │
│             │  │ 3    │ gemini-2.0    │ 3,100  │ 4.2s     │ miss     │    │
│             │  │ 4    │ gemini-2.0    │ 1,890  │ 8.2s     │ miss     │    │
│             │  │ 5    │ gemini-2.0    │ 2,640  │ 3.8s     │ miss     │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
└─────────────┴──────────────────────────────────────────────────────────────┘
```

---

## ASCII WIREFRAME — Snapshot Comparison View

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
  Side-by-side #FFFFFF cards, green ▲ improvements, red ▼ declines
  Connected by center divider line (#E8E8E4)
```

---

## ASCII WIREFRAME — Mobile (375px)

```
┌─────────────────────────────┐
│ ☰  AI Insights        [▶]  │
├─────────────────────────────┤
│ ◄ Prof│Diag│Sys│Read│Road ►│ scrollable nav
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
│ Phase 1: 4wk, $12K         │
│ Phase 2: 4wk, $16K         │
│ Phase 3: 6wk, $20K         │
│ Total: 14wk │ $48K         │
│                             │
│ ▸ AI Run Stats              │
└─────────────────────────────┘
```

---

## CONTENT DATA TABLE

| Field | Source | Path | Fallback |
|-------|--------|------|----------|
| Company name | wizard_answers step 1 | ai_results.analysis.companySummary | answers.companyName |
| Industry | wizard_answers step 1 | ai_results.analysis.detectedIndustry | answers.industry |
| Employee count | wizard_answers step 1 | ai_results.analysis.teamSizeEstimate | answers.companySize |
| Tech stack | wizard_answers step 1 | ai_results.analysis.technologySignals | [] |
| Competitive position | wizard_answers step 1 | ai_results.analysis.competitivePosition | null |
| Pain points | wizard_answers step 2 | ai_results.diagnostics.painPoints | [] |
| Opportunities | wizard_answers step 2 | ai_results.diagnostics.opportunities | [] |
| Industry benchmarks | wizard_answers step 2 | ai_results.diagnostics.benchmarks | [] |
| System recommendations | wizard_answers step 3 | ai_results.recommendations.rankedSystems | [] |
| Fit scores | Each system | rankedSystems[n].fitScore | 0 |
| Overall readiness | wizard_answers step 4 | ai_results.readiness.overallScore | null |
| Maturity label | wizard_answers step 4 | ai_results.readiness.maturityLevel | null |
| Dimensions (5) | wizard_answers step 4 | ai_results.readiness.scoreBreakdown | {} |
| Gaps | wizard_answers step 4 | ai_results.readiness.gaps | [] |
| Strengths | wizard_answers step 4 | ai_results.readiness.strengths | [] |
| Roadmap phases | wizard_answers step 5 | ai_results.roadmap.phases | [] |
| Total investment | wizard_answers step 5 | ai_results.roadmap.totalInvestment | "—" |
| Total weeks | wizard_answers step 5 | ai_results.roadmap.totalWeeks | 12 |
| Run stats | ai_run_logs | where session_id, per step | [] |
| Snapshots | context_snapshots | where session_id, ordered desc | [] |

---

## SECTION ANCHOR NAV — Scrollspy Detail

Sticky horizontal nav at top of main content, 48px height, #FFFFFF bg, border-bottom 1px #E8E8E4. Five anchor links: Profile, Diagnostics, Systems, Readiness, Roadmap. Active section underlined with 2px #00875A. Uses IntersectionObserver on section elements — no global context needed, all local state in the nav component. Click anchor → smooth scroll to that section.

---

## RE-RUN ANALYSIS FLOW

1. User clicks "Re-run Analysis ▶" button
2. Confirmation dialog: "This will re-run all 5 AI analyses. Estimated time: 30-60 seconds. Previous results will be saved as a snapshot."
3. On confirm: auto-save current results to context_snapshots
4. Sequential calls to 5 agents (not parallel, to avoid overloading):
   - Step 1: analyze-business → progress 1/5
   - Step 2: generate-diagnostics → progress 2/5
   - Step 3: recommend-systems → progress 3/5
   - Step 4: scorer (readiness) → progress 4/5
   - Step 5: generate-roadmap → progress 5/5
5. Each section shows a loading indicator that resolves to new data as the agent completes
6. On completion: refetch all data, show "Analysis updated" toast
7. If a step fails: show error badge on that section, continue with remaining steps, show "Partial update" toast with retry option for failed step

---

## READINESS RADAR CHART SPEC

Recharts RadarChart. 5 axes: Leadership & Vision, Data Readiness, Process Maturity, Technology Infrastructure, Team Capability. Each axis 0-100. Fill: #00875A with 0.3 opacity. Stroke: #00875A solid 2px. Axis lines: #1A1A1A. Grid: #E8E8E4. Chart size: 300×300px on desktop, hidden on mobile (replaced by dimension progress bars only). Tooltip on hover shows dimension name and score.

When comparison mode is active, a second radar polygon overlay shows the previous snapshot in #D97706 with 0.2 opacity, allowing visual comparison.

---

## INSIGHT CARD SPEC

```
┌──────────────────────────────────┐
│ Cart Abandonment at 68%    ● HIGH│
│──────────────────────────────────│
│ Cart abandonment rate is 12      │
│ points above the industry avg    │
│ of 56%, costing an estimated     │
│ $96,000 per year in lost sales.  │
│                                  │
│ Est. Cost: $96,000/yr            │
└──────────────────────────────────┘
  Card: #FFFFFF bg, #E8E8E4 border, 4px radius, 16px padding
  Badge: HIGH = #DC2626, MEDIUM = #D97706, LOW = #E8E8E4
```

---

## UI COMPONENT TREE

```
AIInsightsPage
├── SectionAnchorNav (sticky, scrollspy)
│   └── AnchorLink × 5 (Profile, Diagnostics, Systems, Readiness, Roadmap)
├── ReRunButton (top-right, with confirmation dialog and progress)
├── SnapshotComparisonToggle ("Compare with previous")
├── section#profile
│   └── BusinessProfileCard (name, industry, size, tech stack, competitive position)
├── section#diagnostics
│   └── DiagnosticInsightsGrid
│       ├── PainPointColumn → InsightCard × N
│       └── OpportunityColumn → InsightCard × N
├── section#systems
│   └── SystemRankingList
│       └── SystemCard × N (expandable, fit score bar, ROI, complexity, "why it fits")
├── section#readiness
│   ├── ReadinessRadarChart (Recharts RadarChart, 5 axes)
│   └── ReadinessScoreBreakdown
│       ├── OverallScoreCircle (120px, score, maturity label)
│       └── DimensionRow × 5 (name, progress bar, score, qualitative, delta indicator)
├── section#roadmap
│   └── RoadmapSummaryCard (horizontal phase blocks with investment)
├── SnapshotComparisonView (side-by-side, conditionally rendered)
└── AIRunStats (collapsible footer, model/tokens/duration/cache per step)
```

---

## BACKEND WIRING

### Edge Function Routes

| Method | Route | Purpose |
|--------|-------|---------|
| POST | /dashboard/insights | Fetch all 5 wizard step AI results + run stats for a session |
| POST | /dashboard/insights/snapshots | List historical snapshots for a session |
| POST | /dashboard/insights/snapshot | Save current analysis as a snapshot before re-run |
| POST | /dashboard/insights/rerun | Orchestrate re-run of all 5 AI agents for a session |

### Frontend Hooks

useWizardInsights(sessionId): returns all 5 steps' AI results assembled into typed WizardInsightsData, plus run stats, loading, error, refetch.

useReRunAnalysis(sessionId): returns reRun function, progress state { step, total, currentAgent }, isRunning boolean, error.

useSnapshots(sessionId): returns snapshots array, compare(snapshotId) function, activeComparison snapshot or null.

### Data Fetching

On mount: useWizardInsights calls POST /dashboard/insights with session_id. Edge function queries wizard_answers for all 5 steps plus ai_run_logs for the session. Returns assembled WizardInsightsData.

Re-run: useReRunAnalysis.reRun() first calls /dashboard/insights/snapshot to save current state, then sequentially calls each AI agent endpoint (analyze-business, generate-diagnostics, recommend-systems, scorer, generate-roadmap), updating progress after each completes, then calls refetch.

---

## ACCEPTANCE CRITERIA

- Insights page renders at /app/insights with vertical scroll layout
- Section nav highlights active section via scrollspy as user scrolls
- Business Profile renders company info, tech stack tags, competitive position from Step 1
- Diagnostics renders pain points and opportunities in 2-column grid with severity badges
- System Recommendations renders ranked list with fit score bars, ROI, expandable detail
- Readiness renders RadarChart (Recharts) with 5 dimensions plus dimension breakdown rows
- Overall readiness score as circular progress ring with maturity label
- Roadmap Summary renders phases as horizontal timeline blocks with investment
- "Re-run Analysis" triggers all 5 agents with confirmation, progress, and per-section loading
- Previous results auto-saved as snapshot before re-run
- Snapshot comparison shows side-by-side with green/red delta indicators
- AI run stats collapsible footer shows model, tokens, duration, cache per step
- Loading: skeleton cards per section
- Empty state (no wizard): "Complete the wizard to see your AI analysis"
- Partial wizard: renders completed sections, "Pending" badge on incomplete
- Responsive: single-column on mobile, radar chart hidden, section nav horizontal scroll
