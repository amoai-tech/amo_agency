# 07 — CRM PIPELINE DASHBOARD
# Deals, Stages, Contacts, Sales Funnel & Forecasting

**Component:** `CRMPipeline`
**File:** `/components/dashboard/crm/CRMPipeline.tsx`
**Route:** `/app/crm/pipelines`
**Status:** NOT STARTED
**Priority:** P2
**Parent Doc:** `00-dashboard-master.md`
**Depends On:** ClientManagement (05), Auth, crm_pipelines, crm_stages, crm_deals, crm_contacts, crm_interactions tables

---

## SCREEN PURPOSE

Sales pipeline management for the agency. Tracks leads from initial wizard engagement through to signed contracts. Deals flow through customizable stages on a kanban board. Wizard completion auto-creates deals — someone who completes a readiness assessment is a qualified prospect. Interaction logging, revenue forecasting, and stale-deal detection drive the sales process.

Real-world: "Lead completes wizard -> deal auto-created in Qualified stage -> agency rep reviews wizard data, moves to Proposal Sent -> forecast chart shows $45K weighted pipeline this month."

---

## TARGET USERS

- Agency sales team tracking leads through pipeline stages
- Business development reps managing outbound and inbound deals
- Agency owner monitoring revenue pipeline and forecasting

---

## CORE FEATURES

1. Pipeline board (kanban) with customizable stages from crm_stages, ordered by position
2. Deal cards showing title, value, contact name, probability %, days in stage
3. Multiple pipelines support ("New Business", "Upsell", "Renewal") via tabs
4. Deal detail panel (Sheet) with tabs: Details, Interactions, Wizard Data, Activity
5. Interaction logging (calls, emails, meetings, notes) with inline form
6. Forecast chart: weighted monthly pipeline value (Recharts BarChart)
7. Conversion funnel showing stage-to-stage drop-off rates
8. Deal quick-create with title, value, contact, pipeline, stage
9. Stale deal indicator (amber at 7+ days in same stage, red at 14+)
10. Wizard-to-deal auto-creation on wizard session completion

---

## ASCII WIREFRAME — Desktop (1440px)

```
┌─────────────┬──────────────────────────────────────────────────────────────┐
│  SIDEBAR    │  CRM Pipeline                          [+ Add Deal]         │
│  240px      │  [New Business]  [Upsell]  [Renewal]                        │
│  #1A1A1A    ├──────────────────────────────────────────────────────────────┤
│             │                                                              │
│  ☀ AMO AI   │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌─────────┐ │
│             │  │ LEAD      │  │ QUALIFIED │  │ PROPOSAL  │  │NEGOTIA- │ │
│  ──────────│  │ 4 · $32K  │  │ 3 · $28K  │  │ 2 · $18K  │  │TION     │ │
│  ○ Dashboard│  │           │  │           │  │           │  │1 · $15K │ │
│  ○ Projects │  │┌─────────┐│  │┌─────────┐│  │┌─────────┐│  │┌───────┐│ │
│  ● CRM     │  ││TechNova ││  ││GreenLeaf││  ││Acme AI  ││  ││Fresh  ││ │
│  ○ Insights │  ││$8K  40% ││  ││$15K 60% ││  ││$10K 70% ││  ││Bites  ││ │
│  ○ Documents│  ││sara@..  ││  ││mike@..  ││  ││john@..  ││  ││$15K   ││ │
│  ○ Agents   │  ││3 days   ││  ││5 days   ││  ││2 days   ││  ││75%    ││ │
│  ○ Settings │  │└─────────┘│  │└─────────┘│  │└─────────┘│  ││12 days││ │
│             │  │┌─────────┐│  │┌─────────┐│  │┌─────────┐│  │└───────┘│ │
│             │  ││BlueSky  ││  ││DataCorp ││  ││HealthPro││  │         │ │
│             │  ││$12K 30% ││  ││$8K  50% ││  ││$8K  65% ││  │         │ │
│             │  ││tom@..   ││  ││ann@..   ││  ││dr.m@..  ││  │         │ │
│             │  ││8 days ⚠ ││  ││1 day    ││  ││4 days   ││  │         │ │
│             │  │└─────────┘│  │└─────────┘│  │└─────────┘│  │         │ │
│             │  │┌─────────┐│  │┌─────────┐│  │           │  │         │ │
│             │  ││NovaTech ││  ││MedReach ││  │           │  │         │ │
│             │  ││$6K  25% ││  ││$5K  45% ││  │           │  │         │ │
│             │  │└─────────┘│  │└─────────┘│  │           │  │         │ │
│             │  │┌─────────┐│  │           │  │           │  │         │ │
│             │  ││QuickBiz ││  │           │  │           │  │         │ │
│             │  ││$6K  20% ││  │           │  │           │  │         │ │
│             │  │└─────────┘│  │           │  │           │  │         │ │
│             │  └───────────┘  └───────────┘  └───────────┘  └─────────┘ │
│             │                                                              │
│             │  CLOSED WON (3 · $42K)       CLOSED LOST (2 · $14K)        │
│             │  [collapsed — click to expand]                              │
│             │                                                              │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │ FORECAST — Weighted Pipeline Value                    │    │
│             │  │                                                      │    │
│             │  │  $50K │  ┌──┐                                       │    │
│             │  │       │  │  │ ┌──┐                                   │    │
│             │  │  $25K │  │  │ │  │ ┌──┐                             │    │
│             │  │       │  │  │ │  │ │  │                             │    │
│             │  │       └──┴──┴─┴──┴─┴──┴─────                       │    │
│             │  │        Mar    Apr    May                              │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
└─────────────┴──────────────────────────────────────────────────────────────┘
```

---

## ASCII WIREFRAME — Deal Detail Panel (Sheet, 400px)

```
┌──────────────────────────────────────────┐
│ DEAL DETAIL                   [X close]  │
│ Sheet slide-in from right, 400px         │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │  GreenLeaf — AI Patient Scheduling  │ │
│ │  $15,000  ·  60%  ·  Qualified      │ │
│ │  Contact: Dr. Mike Chen              │ │
│ │  5 days in stage                     │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ [Details] [Interactions] [Wizard] [Activ]│
│ ──────────────────────────────────────── │
│                                          │
│ ┌─── Details Tab ──────────────────────┐ │
│ │  Value:       $15,000               │ │
│ │  Probability: 60%                    │ │
│ │  Expected close: April 2026          │ │
│ │  Pipeline: New Business              │ │
│ │  Stage: Qualified                    │ │
│ │  Created: Mar 1, 2026                │ │
│ │  Owner: Maria C.                     │ │
│ │                                      │ │
│ │  Contact                             │ │
│ │  Dr. Mike Chen · CEO                 │ │
│ │  mike@greenleaf.com                  │ │
│ │  +1 (555) 345-6789                   │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ ┌─── Interactions Tab ─────────────────┐ │
│ │                                      │ │
│ │  [Log Interaction]                   │ │
│ │                                      │ │
│ │  📞 Call — Mar 5                     │ │
│ │  "Discussed Phase 1 scope. Client    │ │
│ │   interested in patient scheduling." │ │
│ │                                      │ │
│ │  ✉ Email — Mar 3                     │ │
│ │  "Sent initial proposal outline."    │ │
│ │                                      │ │
│ │  📝 Note — Mar 1                     │ │
│ │  "Wizard completed. Score 78."       │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ ┌─── Wizard Data Tab ─────────────────┐ │
│ │                                      │ │
│ │  Readiness Score: 78/100             │ │
│ │  Industry: Healthcare                │ │
│ │  Selected Systems:                   │ │
│ │  • Patient Scheduling (95 fit)       │ │
│ │  • Records Digitization (88 fit)     │ │
│ │  Top Pain Point:                     │ │
│ │  "No-shows cost $8K/month"           │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │ [Move to Next Stage →]               │ │
│ └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

---

## ASCII WIREFRAME — Mobile (375px)

```
┌───────────────────────────────────┐
│ ☰  CRM Pipeline    [+ Deal]      │
│ [New Business ▾]                  │
├───────────────────────────────────┤
│                                   │
│ LEAD (4 · $32K)                   │
│ ┌───────────────────────────────┐ │
│ │ TechNova Solutions            │ │
│ │ $8K · 40% · sara@tech.com    │ │
│ │ 3 days                        │ │
│ └───────────────────────────────┘ │
│ ┌───────────────────────────────┐ │
│ │ BlueSky Agency         ⚠ 8d  │ │
│ │ $12K · 30% · tom@blue.com    │ │
│ └───────────────────────────────┘ │
│ ... more deals                    │
│                                   │
│ QUALIFIED (3 · $28K)              │
│ ┌───────────────────────────────┐ │
│ │ GreenLeaf Healthcare          │ │
│ │ $15K · 60% · mike@green.com  │ │
│ │ 5 days                        │ │
│ └───────────────────────────────┘ │
│ ... more deals                    │
│                                   │
│ PROPOSAL (2 · $18K)              │
│ ... deals                         │
│                                   │
│ ── FORECAST ──                   │
│ Mar: $45K · Apr: $38K            │
│                                   │
└───────────────────────────────────┘
```

Mobile: kanban columns stack vertically as collapsible sections. Pipeline selector becomes a dropdown. Deal drag-and-drop unavailable on mobile — tap deal to open detail, change stage via dropdown in detail panel. Forecast becomes a compact text summary.

---

## CONTENT DATA TABLE

| Field | Source Table | Column/Path | Fallback |
|-------|-------------|-------------|----------|
| Pipeline name | crm_pipelines | name | "Default Pipeline" |
| Stage name | crm_stages | name, position | — |
| Stage color | crm_stages | color | Derived from position |
| Deal title | crm_deals | title | — |
| Deal value | crm_deals | value | 0 |
| Deal probability | crm_deals | probability | 0 |
| Deal stage | crm_deals | stage_id → crm_stages.name | — |
| Deal contact | crm_deals | contact_id → crm_contacts | null |
| Deal created date | crm_deals | created_at | — |
| Deal expected close | crm_deals | expected_close_date | null |
| Days in stage | Derived | now() - crm_deals.stage_changed_at | 0 |
| Stale indicator | Derived | days_in_stage > 7 = amber, > 14 = red | none |
| Interaction history | crm_interactions | where deal_id, order by created_at desc | [] |
| Wizard readiness | wizard_answers | ai_results where step_number = 4 via client org | null |
| Wizard systems | wizard_answers | ai_results where step_number = 3 via client org | null |
| Wizard diagnostics | wizard_answers | ai_results where step_number = 2 via client org | null |
| Forecast (weighted) | Derived | sum(value * probability) grouped by expected_close month | $0 |
| Conversion rate | Derived | deals that moved from stage N to N+1 / total in stage N | — |

---

## DEAL CARD — Detail

```
┌──────────────────────┐
│ DEAL CARD  #FFF bg   │
│ border #E8E8E4       │
│ 4px radius           │
│ drag handle top      │
│                      │
│  GreenLeaf — AI      │
│  Patient Scheduling  │
│  14px Inter #1A1A1A  │
│                      │
│  $15,000    60%      │
│  value     prob      │
│  #00875A   #6B6B63   │
│                      │
│  Dr. Mike Chen       │
│  12px #9CA39B        │
│                      │
│  5 days              │
│  <7d: gray           │
│  7-14d: amber ⚠      │
│  >14d: red 🔴        │
└──────────────────────┘
```

High-value deals (>$10K): green #00875A left border accent (2px). Stale deals (>7 days): amber #D97706 left border. Very stale (>14 days): red #DC2626 left border.

---

## PIPELINE STAGES — Default "New Business"

| Position | Stage | Color | Auto-Trigger |
|----------|-------|-------|-------------|
| 1 | Lead | #9CA39B (gray) | Wizard Steps 1-2 completed |
| 2 | Qualified | #3B82F6 (blue) | Wizard Steps 3-4 completed |
| 3 | Proposal Sent | #D97706 (amber) | Manual or proposal doc uploaded |
| 4 | Negotiation | #00875A (green) | Manual |
| 5 | Closed Won | #1A1A1A (dark) | Manual |
| 6 | Closed Lost | #DC2626 (red) | Manual |

Default "Upsell" pipeline: Identified, Pitched, Approved, Delivered.

---

## WIZARD-TO-DEAL AUTO-CREATION

When wizard_sessions.status changes to completed:
1. Check if a deal already exists for this org/contact
2. If not, create a deal with:
   - title: "[companyName] — AI Transformation"
   - value: estimated from selected systems count * $8K average
   - probability: based on readiness score (score > 75 → 60%, score 50-75 → 40%, score < 50 → 25%)
   - stage: "Qualified" (completed full wizard = qualified lead)
   - contact_id: from crm_contacts linked to the wizard user
3. Log interaction: "Wizard completed — readiness score [X], [N] systems selected"

---

## INTERACTION PATTERNS

- Drag deal cards between stage columns (updates crm_deals.stage_id)
- Click deal card → open detail panel (Sheet) from right
- Pipeline tabs switch kanban to that pipeline's stages and deals
- Hover stage header → tooltip with conversion rate from previous stage
- Click "Add Deal" → DealQuickCreate dialog
- In detail panel, "Log Interaction" → inline form with type select + notes textarea
- Forecast chart bars clickable → filter kanban to deals closing in that month
- Stage column header total value updates live as deals are dragged

---

## USER JOURNEYS

### Journey 1: Wizard-to-Deal Conversion
Prospect completes the wizard. System auto-creates a deal "TechNova — AI Transformation" in Qualified stage, $22K value (3 systems × $8K), 40% probability. Agency rep opens the deal, reviews wizard analysis in the "Wizard Data" tab, prepares a proposal. Logs interaction "Reviewed wizard analysis, preparing custom proposal." Drags deal to "Proposal Sent."

### Journey 2: Revenue Forecasting
Agency owner opens CRM pipeline, scrolls to forecast chart. March shows $45K weighted (6 deals). April shows $38K. She clicks March bar — kanban filters to 6 deals closing in March. Two deals in Negotiation have amber stale indicators (12 days). She opens each, adds follow-up interactions.

### Journey 3: Stale Deal Management
Three deals show amber stale indicators. She clicks "Fresh Bites Group" in Proposal Sent for 9 days. No interactions since proposal was sent. Logs note "Follow up: scheduled call Thursday." Updates probability from 40% to 30%. Weighted pipeline adjusts automatically.

---

## AI FEATURES

- Deal scoring from wizard readiness score + engagement signals (wizard completion rate, login frequency)
- Predicted close date based on average deal cycle time per stage
- Stale deal alerts: highlight deals exceeding average time-in-stage
- Next best action per deal: "Send case study", "Schedule demo", "Offer Phase 1 discount"
- Auto-generate proposal outline from wizard data
- Win/loss pattern analysis: "Deals with readiness > 70 close at 3x the rate"

---

## FORECAST CHART SPEC

Recharts BarChart. X-axis: months (Mar, Apr, May, Jun). Y-axis: weighted pipeline value. Bar color: #00875A. Tooltip shows month, deal count, total weighted value. Bars clickable to filter kanban. Below chart: summary text "Total weighted pipeline: $93K across 10 active deals."

---

## UI COMPONENT TREE

```
DashboardLayout
├── DashboardSidebar (shared, CRM nav active)
├── DashboardHeader (shared)
└── CRMPipeline (page)
    ├── PageHeader ("CRM Pipeline" + [Add Deal] button)
    ├── PipelineSelector (tabs: New Business, Upsell, Renewal)
    ├── PipelineBoard (horizontal scrollable kanban)
    │   └── StageColumn × N (per crm_stages in selected pipeline)
    │       ├── StageHeader (name, deal count, total value)
    │       └── DealCard × N (draggable, title, value, contact, prob, days)
    ├── ForecastChart (Recharts BarChart, weighted monthly pipeline)
    ├── ConversionFunnel (Recharts or stacked bars, optional)
    ├── DealDetailPanel (Sheet, 400px right)
    │   ├── DealHeader (title, value, probability, stage, contact)
    │   ├── Tabs
    │   │   ├── Details (value, prob, close date, pipeline, owner, contact card)
    │   │   ├── Interactions (InteractionTimeline + InteractionForm)
    │   │   ├── Wizard Data (readiness score, systems, diagnostics from linked wizard)
    │   │   └── Activity (deal stage change history)
    │   └── Footer ([Move to Next Stage →])
    └── DealQuickCreate (Dialog modal)
        ├── Input "Deal Title" (required)
        ├── Input "Value" (currency, required)
        ├── Select "Contact" (from crm_contacts)
        ├── Select "Pipeline"
        ├── Select "Stage"
        ├── Input "Probability" (0-100%)
        └── Button "Create Deal"
```

---

## LOADING, ERROR, EMPTY STATES

Loading: 4-6 skeleton columns with 2-3 skeleton cards each. Forecast shows skeleton bar chart.
Error: "Unable to load pipeline data" with retry button.
Empty pipeline: "No deals yet. Deals are created automatically when prospects complete the wizard, or add one manually." with [+ Add Deal] CTA.
Empty stage: Column shows "No deals" text with subtle dashed border drop zone.

---

## BACKEND WIRING

### Edge Function Routes

| Method | Route | Purpose |
|--------|-------|---------|
| GET | /crm/pipelines | List all pipelines for the org |
| GET | /crm/pipelines/:id | Get pipeline with stages and deals |
| POST | /crm/deals | Create a deal |
| PATCH | /crm/deals/:id | Update deal (stage, value, probability) |
| POST | /crm/interactions | Log an interaction on a deal |
| GET | /crm/deals/:id/interactions | Get interactions for a deal |
| GET | /crm/forecast | Weighted pipeline forecast by month |

### Frontend Hooks

usePipeline(pipelineId): returns pipeline metadata, stages, deals per stage.
useDeals(pipelineId): returns deals grouped by stage, with moveDeal function for drag-and-drop.
useDealDetail(dealId): returns full deal with contact, interactions, linked wizard data.
useInteractions(dealId): returns interaction timeline with logInteraction function.
useForecast(pipelineId): returns monthly weighted pipeline data for the chart.

### MVP Without Tables

Before CRM tables exist, derive pipeline from wizard sessions. Each completed session becomes a "deal." Stage derived from wizard progress (Steps 1-2 = Lead, Steps 3-4 = Qualified, Step 5 = Proposal Ready). Value estimated from selected systems count. No drag-and-drop, no interactions, no forecast chart. Read-only funnel view of wizard completion stages.

---

## ACCEPTANCE CRITERIA

- Pipeline page renders at /app/crm/pipelines with kanban board layout
- Pipeline selector (tabs) switches between multiple pipelines
- Stage columns render in position order with name, deal count, total value
- Deal cards show title, formatted value, contact name, probability %, days-in-stage
- Deal cards are draggable between stages, stage_id persists to crm_deals
- Deal card click opens Sheet detail panel with Details, Interactions, Wizard Data, Activity tabs
- Interaction form logs new interactions to crm_interactions table
- Wizard Data tab shows readiness score, systems, diagnostics from linked wizard_answers
- "Add Deal" creates new deal with title, value, contact, stage
- Forecast chart (Recharts) shows weighted monthly pipeline value
- Stale deal indicator: amber border at 7+ days, red at 14+ days
- Empty pipeline shows "No deals yet" with add CTA
- Loading state shows skeleton columns and cards
- Responsive: columns stack vertically on mobile, no drag-and-drop
