# 01 — DASHBOARD HOME
# Main Overview Screen

**Component:** `DashboardHome`
**File:** `/components/dashboard/DashboardHome.tsx`
**Route:** `/app/dashboard`
**Status:** NOT STARTED
**Parent Doc:** `00-dashboard-master.md`

---

## SCREEN PURPOSE

The command center. First screen after login for users who completed the wizard. Surfaces a snapshot of the AI transformation journey: readiness score, active project, roadmap progress, recent activity, AI-driven next actions, and key metrics. Every data point on this screen comes from wizard_answers ai_results — no new tables required for MVP.

---

## ASCII WIREFRAME — Desktop (1440px)

```
┌─────────────┬──────────────────────────────────────────────────────────────┐
│             │                                                              │
│  SIDEBAR    │  HEADER (h-14, border-b #E8E8E4)                            │
│  240px      │  ┌──────────────────────────────────────────────────────┐    │
│  #1A1A1A    │  │ Dashboard                              🔔    JD ▾   │    │
│             │  └──────────────────────────────────────────────────────┘    │
│  ☀ AMO AI   │                                                              │
│  Agency     │  MAIN CONTENT — max-w-[1200px] mx-auto px-8 py-8            │
│             │  #F5F5F0 background                                          │
│  ──────────│                                                              │
│             │  ┌──────────────────────────────────────────────────────┐    │
│  ● Dashboard│  │  WELCOME BANNER                                      │    │
│  ○ Projects │  │                                                      │    │
│  ○ Roadmap  │  │  ☀ WELCOME BACK                                     │    │
│  ○ Insights │  │                                                      │    │
│  ○ Documents│  │  Acme Retail Group              ┌───────────────┐   │    │
│  ○ Settings │  │                                  │  ╭─────────╮  │   │    │
│             │  │  Your AI transformation          │  │         │  │   │    │
│  ──────────│  │  is underway.                    │  │   72    │  │   │    │
│             │  │                                  │  │  /100   │  │   │    │
│  Re-run     │  │  Phase 1 of 3 in progress.      │  ╰─────────╯  │   │    │
│  Wizard →   │  │                                  │ Readiness Score│   │    │
│             │  │                                  └───────────────┘   │    │
│  ──────────│  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
│  v0.11.0    │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────┐ │
│  Org: Acme  │  │ READINESS  │ │ SYSTEMS    │ │ PHASE      │ │ EST. ROI │ │
│             │  │            │ │            │ │            │ │          │ │
│             │  │    72      │ │     3      │ │   1 of 3   │ │  $48K    │ │
│             │  │   /100     │ │  selected  │ │   active   │ │  /year   │ │
│             │  │            │ │            │ │            │ │          │ │
│             │  └────────────┘ └────────────┘ └────────────┘ └──────────┘ │
│             │                                                              │
│             │  ┌──────────────────────────┐ ┌────────────────────────────┐ │
│             │  │ PROJECT SUMMARY          │ │ AI INSIGHTS                │ │
│             │  │                          │ │                            │ │
│             │  │ AI Transformation        │ │ ┌────────────────────────┐ │ │
│             │  │ Phase 1: Support Engine  │ │ │ HIGH PRIORITY          │ │ │
│             │  │                          │ │ │                        │ │ │
│             │  │ ┌──────────────────────┐ │ │ │ Cart abandonment at   │ │ │
│             │  │ │ ████████░░░░░░ 35%   │ │ │ │ 68% — above industry  │ │ │
│             │  │ └──────────────────────┘ │ │ │ average. Recovery      │ │ │
│             │  │                          │ │ │ engine projected       │ │ │
│             │  │ 4 of 12 tasks done      │ │ │ $12K/mo recovery.     │ │ │
│             │  │ Next: Deploy chatbot    │ │ │                        │ │ │
│             │  │                          │ │ │ [View Details →]       │ │ │
│             │  │ [View Project →]        │ │ └────────────────────────┘ │ │
│             │  └──────────────────────────┘ │                            │ │
│             │                               │ ┌────────────────────────┐ │ │
│             │  ┌──────────────────────────┐ │ │ SUGGESTION             │ │ │
│             │  │ ROADMAP TIMELINE         │ │ │                        │ │ │
│             │  │                          │ │ │ Schedule kickoff call  │ │ │
│             │  │ Phase 1      Phase 2     │ │ │ for Phase 1.          │ │ │
│             │  │ ┌────────┐  ┌────────┐  │ │ │                        │ │ │
│             │  │ │Found.  │→ │Growth  │→ │ │ │ [Schedule Call →]      │ │ │
│             │  │ │Wk 1-4  │  │Wk 5-8  │  │ │ └────────────────────────┘ │ │
│             │  │ │████░░  │  │░░░░░░  │  │ │                            │ │
│             │  │ │Current │  │        │  │ └────────────────────────────┘ │
│             │  │ └────────┘  └────────┘  │                                │
│             │  │                Phase 3   │ ┌────────────────────────────┐ │
│             │  │               ┌────────┐ │ │ ACTIVITY FEED              │ │
│             │  │               │Scale   │ │ │                            │ │
│             │  │               │Wk 9-12 │ │ │ ● Roadmap generated       │ │
│             │  │               │░░░░░░  │ │ │   2 hours ago             │ │
│             │  │               └────────┘ │ │                            │ │
│             │  │                          │ │ ● Project created          │ │
│             │  │ [View Full Roadmap →]    │ │   2 hours ago             │ │
│             │  └──────────────────────────┘ │                            │ │
│             │                               │ ● Wizard completed         │ │
│             │  ┌──────────────────────────┐ │   Yesterday               │ │
│             │  │ QUICK ACTIONS            │ │                            │ │
│             │  │                          │ │ ● Readiness scored: 72    │ │
│             │  │ ┌──────┐ ┌──────┐       │ │   Yesterday               │ │
│             │  │ │View  │ │Sched.│       │ │                            │ │
│             │  │ │Roadmp│ │Call  │       │ │ ● Analysis completed       │ │
│             │  │ └──────┘ └──────┘       │ │   Yesterday               │ │
│             │  │ ┌──────┐ ┌──────┐       │ │                            │ │
│             │  │ │View  │ │Re-run│       │ │ [View All →]               │ │
│             │  │ │System│ │Wizrd │       │ └────────────────────────────┘ │
│             │  │ └──────┘ └──────┘       │                                │
│             │  └──────────────────────────┘                                │
└─────────────┴──────────────────────────────────────────────────────────────┘
```

---

## ASCII WIREFRAME — Mobile (375px)

```
┌─────────────────────────────┐
│ ☰  Dashboard         🔔 JD │  ← header, hamburger left
├─────────────────────────────┤
│                             │
│  WELCOME BACK               │
│  Acme Retail Group          │
│                             │
│       ╭─────────╮          │
│       │         │          │
│       │   72    │          │
│       │  /100   │          │
│       ╰─────────╯          │
│     Readiness Score         │
│                             │
│  Phase 1 of 3 in progress  │
│                             │
├─────────────────────────────┤
│                             │
│  ┌───────────┐┌───────────┐│
│  │ Readiness ││ Systems   ││
│  │    72     ││    3      ││
│  └───────────┘└───────────┘│
│  ┌───────────┐┌───────────┐│
│  │ Phase     ││ Est. ROI  ││
│  │  1 of 3   ││  $48K/yr  ││
│  └───────────┘└───────────┘│
│                             │
├─────────────────────────────┤
│                             │
│  PROJECT SUMMARY            │
│  AI Transformation          │
│  Phase 1: Support Engine    │
│  ┌───────────────────────┐  │
│  │ ████████░░░░░░ 35%    │  │
│  └───────────────────────┘  │
│  4 of 12 tasks done         │
│  [View Project →]           │
│                             │
├─────────────────────────────┤
│                             │
│  AI INSIGHTS                │
│  ┌───────────────────────┐  │
│  │ Cart abandonment at   │  │
│  │ 68% — projected       │  │
│  │ $12K/mo recovery.     │  │
│  │ [View Details →]      │  │
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│                             │
│  ROADMAP                    │
│  Phase 1 ██░░ → Phase 2 →  │
│  [View Full Roadmap →]      │
│                             │
├─────────────────────────────┤
│                             │
│  QUICK ACTIONS              │
│  ┌──────┐ ┌──────┐         │
│  │Roadmp│ │Call  │         │
│  └──────┘ └──────┘         │
│  ┌──────┐ ┌──────┐         │
│  │Systms│ │Wizrd │         │
│  └──────┘ └──────┘         │
│                             │
├─────────────────────────────┤
│                             │
│  RECENT ACTIVITY            │
│  ● Roadmap generated  2h   │
│  ● Project created    2h   │
│  ● Wizard completed   1d   │
│  [View All →]               │
│                             │
└─────────────────────────────┘
```

---

## CONTENT DATA TABLE

| Element | Source | Key Path | Fallback |
|---------|--------|----------|----------|
| Company name | wizard_answers step 1 | answers.companyName | "Your Company" |
| Industry | wizard_answers step 1 | answers.industry | "Business" |
| Company size | wizard_answers step 1 | answers.companySize | "—" |
| Readiness overall score | wizard_answers step 4 | ai_results.readiness.overallScore | "—" |
| Readiness maturity level | wizard_answers step 4 | ai_results.readiness.maturityLevel | "—" |
| Score dimensions | wizard_answers step 4 | ai_results.readiness.scoreBreakdown | Empty object |
| Strengths | wizard_answers step 4 | ai_results.readiness.strengths | Empty array |
| Gaps | wizard_answers step 4 | ai_results.readiness.gaps | Empty array |
| Selected systems | wizard_answers step 3 | ai_results.recommendations.rankedSystems | Fallback to context_snapshot.step3.selectedSystems |
| Systems count | Derived | selectedSystems.length | 0 |
| Roadmap title | wizard_answers step 5 | ai_results.roadmap.title | "AI Transformation" |
| Roadmap total weeks | wizard_answers step 5 | ai_results.roadmap.totalWeeks | 12 |
| Roadmap total investment | wizard_answers step 5 | ai_results.roadmap.totalInvestment | "Contact for quote" |
| Roadmap phases | wizard_answers step 5 | ai_results.roadmap.phases | Static ROADMAP_PHASES fallback |
| Current phase | Derived | First phase with status != completed | Phase 1 |
| Phase progress | Derived | Completed deliverables / total deliverables | 0% |
| Quick wins | wizard_answers step 5 | ai_results.roadmap.quickWins | Empty array |
| Success metrics | wizard_answers step 5 | ai_results.roadmap.successMetrics | Empty array |
| Risk factors | wizard_answers step 5 | ai_results.roadmap.riskFactors | Empty array |
| Estimated ROI | Derived | From success metrics or "Contact for quote" | "—" |
| Activities | wizard_answers | All rows, ordered by updated_at desc | Synthetic from timestamps |
| AI insights | POST /dashboard-insights or derived | Structured recommendations | Derive from readiness gaps |
| Business analysis | wizard_answers step 1 | ai_results.analysis | null |
| Industry diagnostics | wizard_answers step 2 | ai_results.diagnostics | null |
| Brief status | wizard_sessions | context_snapshot.step4.briefStatus | "draft" |
| Session status | wizard_sessions | status | "in_progress" |

---

## UI COMPONENT TREE

```
DashboardHome
├── WelcomeBanner
│   ├── OrgIdentity (name, industry badge, size badge)
│   ├── ReadinessScoreRing (SVG circle, score number, maturity label)
│   └── PhaseIndicator ("Phase 1 of 3 in progress")
│
├── MetricsRow
│   ├── MetricCard (Readiness Score — 72/100)
│   ├── MetricCard (Systems Selected — 3)
│   ├── MetricCard (Current Phase — 1 of 3)
│   └── MetricCard (Est. Annual ROI — $48K)
│
├── ContentGrid (2-col on desktop, 1-col on mobile)
│   ├── LeftColumn
│   │   ├── ProjectSummaryCard
│   │   │   ├── ProjectHeader (name, phase title, status badge)
│   │   │   ├── ProgressBar (percentage, task count)
│   │   │   ├── NextTask (next uncompleted deliverable)
│   │   │   └── ViewProjectLink
│   │   │
│   │   ├── RoadmapTimeline
│   │   │   ├── PhaseBlock × N (number, title, week range, progress, current marker)
│   │   │   ├── PhaseConnector (arrow between phases)
│   │   │   └── ViewFullRoadmapLink
│   │   │
│   │   └── QuickActionsGrid
│   │       ├── ActionCard (View Roadmap → /app/roadmap)
│   │       ├── ActionCard (Schedule Call → /booking)
│   │       ├── ActionCard (View Systems → /app/insights)
│   │       └── ActionCard (Re-run Wizard → /wizard)
│   │
│   └── RightColumn
│       ├── AIInsightsPanel
│       │   ├── InsightCard × N (priority badge, title, description, action link)
│       │   └── RefreshInsightsButton
│       │
│       └── ActivityFeed
│           ├── ActivityItem × 10 (icon, action text, timestamp, entity link)
│           └── ViewAllLink
│
└── (EmptyDashboard — shown when no completed wizard session exists)
    ├── EmptyIllustration
    ├── Heading ("Start your AI transformation")
    ├── Description
    ├── StartWizardCTA → /wizard
    └── BookCallCTA → /booking
```

---

## INTERACTION STATES

### Loading State

Every widget shows a skeleton placeholder while data loads. Skeletons match the final layout dimensions. The readiness score ring shows a gray circle. Metric cards show pulsing gray bars. The activity feed shows 5 skeleton rows. Total loading time target: under 2 seconds.

### Error State

If the wizard data fetch fails, show a centered error card: "Unable to load your dashboard data. Check your connection and try again." with a Retry button. Individual widget errors show inline: the widget area displays a small warning icon with "Couldn't load [widget name]" and a retry link.

### Empty State (No Wizard)

If the user has no completed wizard sessions, show EmptyDashboard instead of the full dashboard. This is a single centered card with a CTA to start the wizard. Placeholder metric cards with "—" values are shown below as a preview of what the dashboard will look like.

### Empty State (Wizard In Progress)

If the user has a wizard session with status in_progress, show a banner: "You have an unfinished discovery wizard at Step [N]. Continue where you left off." with a "Continue Wizard" button.

### Stale Data

If the wizard data is older than 30 days, show a subtle banner: "Your analysis was run on [date]. Consider re-running the wizard for updated recommendations." with a "Re-run Analysis" link.

---

## READINESS SCORE RING — Detail

The readiness score is the hero metric. It displays as an SVG circular progress ring.

Ring specs: 120px diameter on desktop (80px mobile), 8px stroke width, background stroke #E8E8E4, foreground stroke color based on score (green #00875A for 75+, amber #D97706 for 50-74, red #DC2626 for below 50), counter-clockwise fill from 12 o'clock position. Center text shows the numeric score in JetBrains Mono at 32px (24px mobile) with "/100" in muted text below. Below the ring: maturity level label in small caps (Emerging, Developing, Established, Advanced).

On initial load, the ring animates from 0 to the target score over 800ms with ease-out easing. The number counts up in sync.

Clicking the ring navigates to /app/insights for the full 5-dimension breakdown.

---

## METRIC CARD — Detail

Each metric card is a flat white card with #E8E8E4 border and 4px radius. Interior: 24px padding. Top: muted label in 11px uppercase tracking-widest (#9CA39B). Center: value in 28px JetBrains Mono (#1A1A1A). Bottom: context line in 12px (#6B6B63).

Four cards:

| Label | Value | Context | Source |
|-------|-------|---------|--------|
| Readiness Score | 72/100 | Developing maturity | step 4 ai_results |
| AI Systems | 3 selected | Support, Cart, Recs | step 3 selections count |
| Current Phase | 1 of 3 | Foundation | step 5 roadmap phases |
| Est. Annual ROI | $48K | Based on AI analysis | step 5 success metrics or derived |

---

## ACTIVITY FEED — Detail

The activity feed shows the last 10 events in reverse chronological order. For MVP, activities are derived from wizard_answers timestamps since no activities table exists yet.

Derived activities:
- "Wizard completed" — when wizard_sessions status = completed
- "Readiness score: [score]" — from step 4 ai_results timestamp
- "Roadmap generated" — from step 5 ai_results timestamp
- "[N] systems recommended" — from step 3 ai_results timestamp
- "Business analyzed" — from step 1 ai_results timestamp
- "Industry diagnostics run" — from step 2 ai_results timestamp

Each activity row: green dot indicator, action text in 14px #1A1A1A, relative timestamp in 12px #9CA39B ("2 hours ago", "Yesterday"). Clicking an activity navigates to the relevant section.

When the activities table exists, the feed reads from it instead, showing richer events: task completions, milestone achievements, status changes, consultant notes.

---

## AI INSIGHTS PANEL — Detail

Shows 2-4 AI-generated recommendation cards. For MVP before the /dashboard-insights endpoint exists, derive insights from wizard data:

Insight derivation rules:
- If readiness gap with priority high exists: show the top gap as a high-priority insight with the area, description, and a "View Readiness Breakdown" action
- If quick wins exist in step 5 roadmap: show the first quick win as a suggestion with "View Roadmap" action
- If diagnostics found a high-severity pain point: surface it with projected impact and "View Diagnostics" action
- Always show: "Schedule a kickoff call to start Phase 1" with "Schedule Call" action

Each insight card: priority badge (HIGH in red-on-pink, MEDIUM in amber-on-yellow, SUGGESTION in green-on-green-light), title in 14px Georgia serif, description in 13px #6B6B63, action link in 13px #00875A with arrow.

---

## PROJECT SUMMARY CARD — Detail

Shows the primary project derived from the wizard completion.

Project name: from step 5 roadmap title, fallback to "[companyName] — AI Transformation"
Phase title: from the first active phase in the roadmap
Status badge: Active (green), At Risk (amber), Overdue (red), Completed (green outline)
Progress bar: percentage based on completed deliverables in current phase, green fill on #F0F0EC track
Task count: "4 of 12 tasks done" — derived from phase deliverables
Next task: the first uncompleted deliverable title
View Project link: navigates to /app/projects/:id (or /app/roadmap for MVP)

---

## QUICK ACTIONS GRID — Detail

Four action cards in a 2x2 grid. Each card: white background, #E8E8E4 border, 4px radius. Interior: centered icon (24px, #00875A), label in 13px #1A1A1A below. Hover: translateY -2px, subtle shadow.

| Action | Icon | Navigates To |
|--------|------|-------------|
| View Roadmap | Map icon | /app/roadmap |
| Schedule Call | Calendar icon | /booking |
| View Systems | Cpu icon | /app/insights |
| Re-run Wizard | RefreshCw icon | /wizard |

---

## BACKEND WIRING

### On Mount (useDashboardData hook)

1. Call wizardApi.list(userId, accessToken) to get user's sessions
2. Find the most recent session with status completed (or in_progress as fallback)
3. Call wizardApi.load(sessionId, accessToken) to get full session + answers
4. Parse ai_results from each step into typed dashboard state
5. Derive activities from answer timestamps
6. Derive project summary from step 5 roadmap
7. Derive metrics from across all steps
8. Set loading false, data ready

### On Refresh (manual or 60s interval)

Re-fetch the session data. Compare with cached state. If ai_results changed (someone re-ran an analysis), update the dashboard. Show a subtle "Updated" indicator for 2 seconds.

### Auth Guard

DashboardLayout checks useAuth on render. If user is null and loading is false, redirect to /login?return=/app/dashboard. The return param ensures the user lands back on the dashboard after login.

---

## ACCEPTANCE CRITERIA

- Dashboard renders at /app/dashboard with sidebar + main content layout
- Welcome banner shows organization name and readiness score ring
- Readiness score ring animates from 0 to target on initial load
- Metrics row shows 4 cards with correct data from wizard ai_results
- Project summary card shows name, phase, progress bar, next task
- Roadmap timeline shows phases from step 5 with current phase highlighted
- Activity feed shows derived events from wizard timestamps
- AI insights panel shows at least 2 recommendations derived from wizard data
- Quick actions navigate to correct routes
- Empty state shown when no wizard session exists
- Loading state shows skeleton screens for all widgets
- Error state shows retry button
- Responsive: sidebar collapses on mobile, metrics go 2x2, content stacks single-column
- Auth guard redirects unauthenticated users to /login
- Page loads in under 2 seconds on 3G connection (skeleton visible immediately)
