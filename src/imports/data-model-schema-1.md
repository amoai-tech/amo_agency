# 055: Complete Data Model — All 32 Tables

> Schema reference for the entire AMO AI platform database

---

## Table Inventory

| # | Table | Rows | RLS | Policies | Purpose |
|---|-------|------|-----|----------|---------|
| 1 | `organizations` | 3 | Y | 5 | Multi-tenant org container |
| 2 | `team_members` | 8 | Y | 7 | User-org membership + roles |
| 3 | `profiles` | 2 | Y | 6 | Auth user profile extension |
| 4 | `clients` | 0 | Y | 6 | Client companies (CRM root) |
| 5 | `crm_contacts` | 0 | Y | 5 | People at client companies |
| 6 | `crm_pipelines` | 4 | Y | 5 | Sales/renewal pipelines |
| 7 | `crm_stages` | 9 | Y | 5 | Pipeline stage definitions |
| 8 | `crm_deals` | 0 | Y | 5 | Revenue opportunities |
| 9 | `crm_interactions` | 0 | Y | 5 | Emails, calls, meetings log |
| 10 | `projects` | 0 | Y | 6 | Client delivery projects |
| 11 | `project_services` | 0 | Y | 5 | Services linked to projects |
| 12 | `project_systems` | 0 | Y | 5 | AI systems linked to projects |
| 13 | `tasks` | 0 | Y | 5 | Project task items |
| 14 | `milestones` | 0 | Y | 5 | Project milestones |
| 15 | `deliverables` | 0 | Y | 5 | Project deliverable files |
| 16 | `documents` | 0 | Y | 5 | Document management |
| 17 | `briefs` | 0 | Y | 5 | Strategy briefs (from wizard) |
| 18 | `brief_versions` | 0 | Y | 3 | Brief revision history |
| 19 | `roadmaps` | 0 | Y | 5 | AI transformation roadmaps |
| 20 | `roadmap_phases` | 0 | Y | 5 | Roadmap phase breakdown |
| 21 | `services` | 0 | Y | 5 | Service catalog definitions |
| 22 | `systems` | 0 | Y | 2 | AI system definitions |
| 23 | `system_services` | 0 | Y | 2 | System-service join table |
| 24 | `activities` | 0 | Y | 5 | Activity feed / audit log |
| 25 | `invoices` | 0 | Y | 5 | Financial invoices |
| 26 | `payments` | 0 | Y | 5 | Payment records |
| 27 | `ai_cache` | 0 | Y | 2 | AI response caching |
| 28 | `ai_run_logs` | 0 | Y | 2 | AI execution audit trail |
| 29 | `context_snapshots` | 0 | Y | 3 | AI context state snapshots |
| 30 | `wizard_sessions` | 5 | Y | 7 | Wizard session tracking |
| 31 | `wizard_answers` | 0 | Y | 7 | Wizard step answers |
| 32 | `kv_store_283466b6` | 0 | Y | 0 | Figma Make KV store |

---

## Entity Relationship Diagram

```mermaid
erDiagram
    organizations ||--o{ team_members : "has members"
    organizations ||--o{ clients : "owns clients"
    organizations ||--o{ projects : "owns projects"
    organizations ||--o{ crm_pipelines : "owns pipelines"
    organizations ||--o{ crm_contacts : "owns contacts"
    organizations ||--o{ crm_deals : "owns deals"
    organizations ||--o{ crm_interactions : "owns interactions"
    organizations ||--o{ activities : "logs activities"
    organizations ||--o{ documents : "stores documents"
    organizations ||--o{ invoices : "tracks invoices"
    organizations ||--o{ services : "defines services"
    organizations ||--o{ roadmaps : "plans roadmaps"

    team_members }o--|| profiles : "user profile"

    clients ||--o{ crm_contacts : "has contacts"
    clients ||--o{ crm_deals : "has deals"
    clients ||--o{ crm_interactions : "has interactions"
    clients ||--o{ projects : "has projects"
    clients ||--o{ activities : "logged against"

    crm_pipelines ||--o{ crm_stages : "has stages"
    crm_stages ||--o{ crm_deals : "contains deals"
    crm_deals ||--o{ crm_interactions : "has interactions"
    crm_contacts ||--o{ crm_interactions : "participates in"

    projects ||--o{ tasks : "has tasks"
    projects ||--o{ milestones : "has milestones"
    projects ||--o{ deliverables : "produces"
    projects ||--o{ project_services : "uses services"
    projects ||--o{ project_systems : "uses systems"
    projects ||--o{ activities : "logged against"

    roadmaps ||--o{ roadmap_phases : "has phases"

    briefs ||--o{ brief_versions : "has versions"

    systems ||--o{ system_services : "provides"
    services ||--o{ system_services : "offered by"

    wizard_sessions ||--o{ wizard_answers : "captures"

    ai_run_logs }o--|| ai_cache : "may cache"
```

---

## Key Relationships

### Multi-Tenancy Pattern
All data tables have `org_id` FK to `organizations`. RLS policies use `team_members` to scope:
```sql
EXISTS (
  SELECT 1 FROM team_members tm
  WHERE tm.user_id = auth.uid() AND tm.org_id = table.org_id
)
```

### CRM Flow
`clients` -> `crm_contacts` -> `crm_deals` -> `crm_stages` -> `crm_pipelines`

### Project Flow
`wizard_sessions` -> `briefs` -> `projects` -> `tasks` + `milestones` + `deliverables`

### AI Flow
`wizard_answers` -> Edge Functions -> `ai_run_logs` -> `ai_cache`

---

## Custom DB Functions

| Function | Trigger | Purpose |
|----------|---------|---------|
| `handle_new_user()` | `auth.users INSERT` | Creates profile + org + team_member |
| `handle_wizard_completion()` | Manual | Creates client + project from wizard |
| `handle_client_onboarding()` | Manual | Sets up project from client data |
| `handle_dashboard_activation()` | Manual | Activates project dashboard |
| `handle_new_crm_interaction()` | `crm_interactions INSERT` | Updates client last_activity_at |
| `broadcast_ai_run_insert()` | `ai_run_logs INSERT` | Realtime broadcast for AI runs |
| `broadcast_wizard_update()` | `wizard_sessions UPDATE` | Realtime broadcast for wizard |
| `update_updated_at()` | Row UPDATE | Auto-update updated_at timestamp |
| `get_user_org_ids()` | Helper | Returns user's org IDs |
| `get_client_classification()` | Helper | Classifies client lifecycle stage |
| `user_has_role_in_org()` | Helper | Role-based access check |
| `user_is_org_owner()` | Helper | Owner-level access check |

---# 056: CRM System Architecture

> Complete CRM data model, relationships, and operational patterns

---

## CRM Tables

### clients (21 columns)
The root CRM entity. Represents a company/organization being sold to or serviced.

| Column | Type | Default | Purpose |
|--------|------|---------|---------|
| `id` | uuid | gen_random_uuid() | PK |
| `org_id` | uuid | — | FK organizations (tenant) |
| `name` | text | — | Company name |
| `industry` | text | null | Industry vertical |
| `website_url` | text | null | Company website |
| `pipeline_stage` | text | 'new' | Legacy stage field |
| `status` | text | 'lead' | Active/inactive |
| `lifecycle_stage` | text | 'lead' | lead/prospect/customer/churned |
| `assigned_to` | uuid | null | FK team_members (owner) |
| `value` | numeric | null | Estimated lifetime value |
| `health_score` | integer | 50 | 0-100 health metric |
| `contact_name` | text | null | Primary contact (denormalized) |
| `contact_email` | text | null | Primary email (denormalized) |
| `contact_phone` | text | null | Primary phone (denormalized) |
| `company_size` | text | null | Employee count range |
| `notes` | text | null | Free-form notes |
| `next_action_date` | timestamptz | null | Follow-up reminder |
| `last_activity_at` | timestamptz | null | Auto-updated by trigger |
| `onboarded_at` | timestamptz | null | When converted to customer |
| `created_at` | timestamptz | now() | — |
| `updated_at` | timestamptz | now() | — |

### crm_contacts (13 columns)
People at client companies. Multiple contacts per client.

| Column | Type | Default | Purpose |
|--------|------|---------|---------|
| `id` | uuid | gen_random_uuid() | PK |
| `org_id` | uuid | — | FK organizations |
| `client_id` | uuid | null | FK clients |
| `first_name` | text | — | Required |
| `last_name` | text | null | — |
| `email` | text | null | — |
| `phone` | text | null | — |
| `linkedin_url` | text | null | — |
| `job_title` | text | null | — |
| `is_primary` | boolean | false | Primary contact flag |
| `tags` | text[] | '{}' | Categorization tags |
| `created_at` | timestamptz | now() | — |
| `updated_at` | timestamptz | now() | — |

### crm_deals (13 columns)
Revenue opportunities tied to clients and pipeline stages.

| Column | Type | Default | Purpose |
|--------|------|---------|---------|
| `id` | uuid | gen_random_uuid() | PK |
| `org_id` | uuid | — | FK organizations |
| `client_id` | uuid | — | FK clients (required) |
| `stage_id` | uuid | null | FK crm_stages |
| `title` | text | — | Deal name |
| `amount` | numeric | 0 | Deal value |
| `currency` | text | 'USD' | Currency code |
| `expected_close_date` | date | null | Forecast close |
| `owner_id` | uuid | null | FK team_members |
| `win_probability` | integer | null | 0-100% |
| `status` | text | 'open' | open/won/lost |
| `created_at` | timestamptz | now() | — |
| `updated_at` | timestamptz | now() | — |

### crm_interactions (14 columns)
Communication/meeting log with AI-powered sentiment and embeddings.

| Column | Type | Default | Purpose |
|--------|------|---------|---------|
| `id` | uuid | gen_random_uuid() | PK |
| `org_id` | uuid | — | FK organizations |
| `client_id` | uuid | null | FK clients |
| `deal_id` | uuid | null | FK crm_deals |
| `contact_id` | uuid | null | FK crm_contacts |
| `type` | crm_interaction_type | — | email/call/meeting/note/task |
| `direction` | text | null | inbound/outbound |
| `subject` | text | null | Subject line |
| `content` | text | null | Full content |
| `summary` | text | null | AI-generated summary |
| `embedding` | vector | null | For semantic search |
| `sentiment` | crm_sentiment | 'neutral' | positive/neutral/negative |
| `created_by` | uuid | null | FK auth.users |
| `created_at` | timestamptz | now() | — |

### crm_pipelines (6 columns) + crm_stages (7 columns)
Pipeline configuration with ordered stages.

**Current seed data:**
- Sales Pipeline (default): New -> Contacted -> Qualified -> Proposal -> Negotiation -> Closed Won -> Closed Lost
- Renewal Pipeline: Renewal Due -> Renewed

---

## CRM Data Flow

```mermaid
flowchart TD
    W[Wizard Completion] -->|handle_wizard_completion| C[Client Created]
    C --> CO[crm_contacts]
    C --> D[crm_deals]
    D --> S[crm_stages]
    C --> I[crm_interactions]
    I -->|handle_new_crm_interaction| LA[Update last_activity_at]
    I -->|AI enrichment| SE[Sentiment + Embedding]
    D -->|Stage change| A[Activity Log]
    C -->|Lifecycle change| A

    EF[crm-intelligence Edge Function] -->|Analyze| C
    EF -->|Score| HS[Health Score Update]
    EF -->|Classify| LC[Lifecycle Classification]
```

---

## CRM Lifecycle Stages

```
lead -> prospect -> customer -> churned
  |                    |           |
  +--- disqualified    +-- active  +-- win-back
```

### Stage Transitions
| From | To | Trigger |
|------|----|---------|
| lead | prospect | First meeting booked |
| prospect | customer | Deal won + onboarded |
| customer | churned | No activity 90+ days |
| churned | customer | New deal won |

---

## Edge Function: crm-intelligence

Deployed as `crm-intelligence` edge function. Handles:
- Client health score calculation
- Interaction sentiment analysis
- Deal win probability prediction
- Next-best-action recommendations

---

## Frontend Components Needed

| Component | Route | Data Source |
|-----------|-------|------------|
| PipelinePage | /app/pipeline | crm_pipelines + stages + deals |
| ClientDetailPage | /app/clients/:id | clients + contacts + deals + interactions |
| ContactsPage | /app/contacts | crm_contacts |
| DealsPage | /app/deals | crm_deals + stages |
| InteractionsTimeline | embedded | crm_interactions (per client/deal) |
---
id: 028-crm-pipeline-dashboard
diagram_id: DASH-04
prd_section: Dashboard
title: CRM pipeline dashboard — deals, stages, contacts, and sales funnel
skill: frontend
phase: MEDIUM
priority: P2
status: Not Started
owner: Frontend
dependencies:
  - 026-client-management-dashboard
estimated_effort: L
percent_complete: 0
area: agency-dashboard
wizard_step: null
schema_tables: [crm_pipelines, crm_stages, crm_deals, crm_contacts, crm_interactions, clients, organizations]
figma_prompt: prompts/028-crm-pipeline-dashboard.md
---

## Summary Table

| Aspect | Details |
|--------|---------|
| **Screens** | CRM Pipeline (`/app/crm/pipelines`) |
| **Features** | Pipeline kanban, deal cards, stage management, contact profiles, interaction timeline, forecast chart |
| **Edge Functions** | assistant (deal scoring, forecast) |
| **Tables** | crm_pipelines, crm_stages, crm_deals, crm_contacts, crm_interactions, clients, organizations |
| **Agents** | assistant (gemini-3-flash-preview, low thinking) |
| **Real-World** | "Lead completes wizard -> deal auto-created in Qualified stage -> agency rep reviews, moves to Proposal Sent" |

---

## Description

**The situation:** The agency acquires clients through the wizard funnel — prospects start the wizard, and some complete it. The `crm_pipelines`, `crm_stages`, and `crm_deals` tables exist in the schema, but there is no interface to manage the sales pipeline. Deals are not created when wizards complete. There is no visibility into which leads are progressing, stalling, or closing. The agency tracks sales informally through spreadsheets or memory.

**Why it matters:** The wizard generates high-intent leads — someone who completes a readiness assessment and system recommendations is a qualified prospect. Without a pipeline view, the agency cannot track deal progression, forecast revenue, or identify stale deals that need follow-up. The connection between wizard engagement and sales conversion is invisible.

**What already exists:** The `crm_pipelines` table supports multiple named pipelines. The `crm_stages` table has position-ordered stages per pipeline. The `crm_deals` table stores deals with value, probability, contact_id, and stage_id FKs. The `crm_contacts` table holds contact details. The `crm_interactions` table logs calls, emails, and meetings per deal or contact. The `wizard_sessions` table provides wizard completion data that can trigger deal creation. shadcn/ui provides Card, Badge, Dialog, Select, Popover, and Sheet components. The kanban pattern from the project task board (027) can be adapted for deal stages.

**The build:** Create a `CRMPipeline` page at `/app/crm/pipelines` with a horizontal kanban board as the primary view. Each column represents a stage from `crm_stages` (ordered by position). Deal cards show deal title, value, contact name, probability, and days in current stage. Deals are draggable between stages. A pipeline selector (tabs or dropdown) switches between pipelines. Clicking a deal opens a detail panel with the full interaction timeline, contact info, linked wizard data, and deal metadata. A forecast section shows weighted pipeline value by month using Recharts. A conversion funnel chart shows stage-to-stage drop-off rates.

**Example:** Apex Marketing Agency has two pipelines: "New Business" (stages: Lead, Qualified, Proposal Sent, Negotiation, Closed Won, Closed Lost) and "Upsell" (stages: Identified, Pitched, Approved, Delivered). The agency owner opens the CRM pipeline view. "New Business" is selected. The kanban shows: 4 deals in "Lead" ($32K total), 3 in "Qualified" ($28K), 2 in "Proposal Sent" ($18K), 1 in "Negotiation" ($15K). She drags "GreenLeaf Healthcare — AI Patient Scheduling" from "Qualified" to "Proposal Sent", logs an interaction "Sent proposal doc via email", and sets close probability to 60%. The forecast chart at the bottom shows $45K weighted pipeline this month.

---

## Rationale

**Problem:** No sales pipeline visibility. Wizard-generated leads are not tracked through a sales process. Revenue forecasting is impossible.

**Solution:** A kanban-based CRM pipeline with draggable deal cards, interaction logging, and revenue forecasting. Wizard completion auto-creates deals to connect the top of funnel to sales management.

**Impact:** Agency can manage the full sales cycle from wizard lead to closed deal. Revenue forecasting enables planning. Stale deal detection prevents lost opportunities.

---

## Screen Purpose

Sales pipeline management for the agency. Tracks leads from initial wizard engagement through to signed contracts. Deals flow through customizable pipeline stages. Integrates with wizard data — a completed wizard session can auto-create a deal with value estimated from selected systems and readiness score.

---

## Target User

- Agency sales team tracking leads through pipeline stages
- Business development reps managing outbound and inbound deals
- Agency owner monitoring revenue pipeline and forecasting

---

## Core Features

1. Pipeline board (kanban) with customizable stages from crm_stages, ordered by position
2. Deal cards showing title, value, contact name, probability percentage, days in stage
3. Multiple pipelines support (e.g., "New Business", "Upsell", "Renewal") via tabs or dropdown
4. Contact management with linked interaction history
5. Deal detail panel with full timeline of all interactions (calls, emails, meetings, notes)
6. Pipeline analytics: conversion rates per stage, average deal cycle time
7. Forecast view: weighted pipeline value by month (value * probability)
8. Deal quick-create form with title, value, contact, pipeline, stage
9. Interaction logging inline on deal cards or detail panel

---

## Data Displayed

- Pipeline names and deal counts per pipeline
- Stages per pipeline: name, position, color code, deal count, total stage value
- Deal cards: title, value (currency formatted), probability (%), contact name, days in current stage, created date
- Contact details: name, email, company, role, phone
- Interactions: type (call, email, meeting, note), content/notes, date, logged-by user
- Wizard context on deal: readiness score, selected systems, industry (from wizard_answers linked via client org)
- Forecast: monthly weighted value (sum of deal.value * deal.probability per month)
- Conversion funnel: stage-to-stage progression rates

---

## UI Components

- `PipelineBoard` — horizontal kanban layout with StageColumns, horizontally scrollable
- `StageColumn` — vertical column with stage header (name, count, total value), droppable zone
- `DealCard` — compact card with title, value badge, contact avatar, probability, days-in-stage indicator
- `DealDetailPanel` — Sheet (slide-out right) with tabs: Details, Interactions, Wizard Data, Activity
- `PipelineSelector` — Tabs or Select dropdown to switch between pipelines
- `ContactCard` — compact contact info (name, email, company) used in deal detail
- `InteractionTimeline` — vertical timeline of logged interactions with type icons
- `InteractionForm` — inline form to log call/email/meeting/note with text area
- `ForecastChart` — Recharts BarChart showing weighted monthly pipeline value
- `ConversionFunnel` — Recharts FunnelChart or stacked bars showing stage-to-stage rates
- `DealQuickCreate` — Dialog form with title, value, contact select, pipeline, stage

---

## Layout Structure

```
+-----------------------------------------------------+
| Sidebar (240px)  |  Main Content (flex-1)            |
|                  |                                    |
| * Dashboard      |  CRM Pipeline                     |
| * Projects       |  [New Business] [Upsell] [Renewal]|
| * CRM  <--       |                                   |
| * AI Insights    |  +-------------------------------+ |
| * Documents      |  | Lead   | Qualif | Propos | Ne| |
| * Financial      |  | 4 $32K | 3 $28K | 2 $18K | 1 | |
| * Settings       |  |--------|--------|--------|---| |
|                  |  | [deal] | [deal] | [deal] |[d]| |
|                  |  | [deal] | [deal] | [deal] |   | |
|                  |  | [deal] | [deal] |        |   | |
|                  |  | [deal] |        |        |   | |
|                  |  +-------------------------------+ |
|                  |                                    |
|                  |  +---- Forecast Chart -----------+ |
|                  |  | [Bar: Mar $45K | Apr $38K ... ]| |
|                  |  +-------------------------------+ |
|                  |                                    |
|                  |      +-- Deal Detail Panel (400px) |
|                  |      | GreenLeaf - AI Scheduling   |
|                  |      | $15K | 60% | Proposal Sent  |
|                  |      | [Details][Interactions][Wiz] |
|                  |      | ...                          |
+-----------------------------------------------------+
```

- Pipeline tabs: full width, below page header
- Kanban columns: min 220px each, horizontally scrollable on overflow
- Stage headers: name, deal count, total value in `#0A211F` text
- Deal cards: `#FFFFFF` background, `#D4CFC8` border, 8px radius, 12px padding
- Value badge: `#84CC16` background for high-value deals (>$10K), gray for others
- Forecast chart: 200px height, below kanban, Recharts with `#0A211F` bars, `#84CC16` accent
- Detail panel: 400px Sheet from right

---

## Interaction Patterns

- Drag deal cards between stage columns (updates crm_deals.stage_id via Supabase)
- Click deal card -> open detail panel (Sheet) from right
- Pipeline tabs switch the kanban to show that pipeline's stages and deals
- Hover stage header -> tooltip with conversion rate from previous stage
- Click "Add Deal" button (top right or in empty column) -> DealQuickCreate dialog
- In detail panel, click "Log Interaction" -> inline form expands with type select + notes textarea
- Click contact name in deal card -> navigate to contact profile or open popover
- Forecast chart bars are clickable -> filter kanban to deals with expected close in that month
- Stage column header "total value" updates live as deals are dragged in/out

---

## Example User Workflows

**Workflow 1 — Wizard-to-deal conversion:** A prospect completes the wizard. The system auto-creates a deal: title "TechNova Solutions — AI Transformation" in the "Qualified" stage (they completed all 5 steps) with estimated value $22K (derived from 3 selected systems at estimated pricing). The deal card shows readiness score 72 from wizard data. Agency rep opens the deal, reviews the wizard analysis in the "Wizard Data" tab, and prepares a proposal. She logs an interaction "Reviewed wizard analysis, preparing custom proposal based on 3 recommended systems." She drags the deal to "Proposal Sent."

**Workflow 2 — Revenue forecasting:** Agency owner opens the CRM pipeline and scrolls to the forecast chart. March shows $45K weighted pipeline (6 deals, weighted by probability). April shows $38K. She clicks the March bar — the kanban filters to 6 deals expected to close in March. She notices 2 deals in "Negotiation" have been there for 12 days (stale indicator turns amber at 7+ days). She opens each deal and adds follow-up interactions to push toward close.

**Workflow 3 — Stale deal management:** The agency owner notices 3 deals with amber "stale" indicators (7+ days in current stage). She clicks the first deal, "Fresh Bites Group — Cart Recovery" in "Proposal Sent" for 9 days. The interaction timeline shows no activity since the proposal was sent. She logs a note "Follow up: scheduled call for Thursday" and updates the probability from 40% to 30%. The weighted pipeline value adjusts automatically.

---

## AI Features

- Deal scoring based on wizard readiness score + engagement signals (wizard completion rate, login frequency, time spent in wizard) — higher wizard engagement correlates with higher close probability
- Predicted close date based on average deal cycle time per stage and current velocity
- "Stale deal" alerts: highlight deals that have exceeded the average time-in-stage for their current stage
- Next best action per deal: "Send case study for similar industry", "Schedule technical demo", "Offer Phase 1 discount"
- Auto-generate proposal outline from wizard data: business profile, recommended systems, projected ROI, phased timeline
- Win/loss pattern analysis: "Deals with readiness score > 70 close at 3x the rate of those below 50"

---

## Data Sources (tables)

| Data | Table | Column/Query |
|------|-------|-------------|
| Pipelines | crm_pipelines | select all where org_id = agency org |
| Stages | crm_stages | where pipeline_id, order by position |
| Deals | crm_deals | where stage_id in pipeline's stages, includes value, probability, contact_id |
| Contacts | crm_contacts | join on crm_deals.contact_id |
| Interactions | crm_interactions | where deal_id or contact_id, order by created_at desc |
| Wizard context | wizard_sessions | where org_id = deal's client org, join wizard_answers for ai_results |
| Client link | clients | linked via crm_contacts.client_id or deal metadata |
| Deal history | activities | where entity_type = 'deal' and entity_id = deal.id |
| Forecast data | crm_deals | group by expected_close_month, sum(value * probability) |

---

## Automation Opportunities

- Auto-create deal when wizard session completes (status = 'completed') with value estimated from selected systems
- Auto-set initial stage based on wizard completion depth (Step 1-2 = "Lead", Step 3-4 = "Qualified", Step 5 = "Proposal Ready")
- Auto-move deal to next stage when proposal document is uploaded (via documents table integration)
- Alert on deals stale > 7 days in any stage (no interactions logged)
- Weekly pipeline summary email to agency owner: new deals, stage changes, forecast delta
- Auto-calculate probability based on historical win rates per stage
- Auto-log activity when deal changes stage, value, or probability

---

## Visual Hierarchy

1. **Primary focus**: Pipeline kanban board (center, full width, main interaction surface)
2. **Secondary**: Deal cards within columns (scannable, data-dense, draggable)
3. **Tertiary**: Stage headers with deal count and total value (column context)
4. **Supporting**: Forecast chart (below, analytical), Detail panel (right overlay, contextual)

---

## User Stories

| As a... | I want to... | So that... |
|---------|--------------|------------|
| Agency sales rep | drag deals between pipeline stages | I can update deal progress in seconds |
| Agency owner | see total weighted pipeline value by month | I can forecast revenue and plan resources |
| Agency sales rep | log interactions (calls, emails) on a deal | I have a complete history for follow-ups |
| Agency owner | identify stale deals that haven't progressed | I can intervene before opportunities go cold |
| Agency sales rep | see wizard analysis data on a deal | I can tailor proposals to the client's specific needs |
| Business dev | create a deal from a wizard completion | the lead enters the sales pipeline automatically |

---

## Goals & Acceptance Criteria

### Goals
1. **Primary:** Agency can manage the full sales pipeline from wizard lead to closed deal with visual kanban
2. **Quality:** Kanban renders 50+ deals across 6 stages without performance issues, drag-and-drop persists in < 500ms

### Acceptance Criteria
- [ ] Pipeline page renders at `/app/crm/pipelines` with kanban board layout
- [ ] Pipeline selector (tabs) switches between multiple pipelines (at least "New Business" seeded)
- [ ] Stage columns render in position order from `crm_stages` with name, deal count, and total value
- [ ] Deal cards show title, formatted value, contact name, probability %, and days-in-stage
- [ ] Deal cards are draggable between stage columns, stage_id updates persist to `crm_deals`
- [ ] Deal card click opens Sheet detail panel with Details, Interactions, Wizard Data, and Activity tabs
- [ ] Interaction form logs new interactions (type + notes) to `crm_interactions` table
- [ ] Interaction timeline shows all logged interactions in reverse chronological order
- [ ] Wizard Data tab on deal detail shows readiness score, selected systems, and business profile from linked wizard_answers
- [ ] "Add Deal" dialog creates new deal with title, value, contact, stage selection
- [ ] Forecast chart (Recharts) shows weighted monthly pipeline value below the kanban
- [ ] Stale deal indicator (amber border or badge) appears on deals in same stage > 7 days
- [ ] Empty pipeline state shows "No deals yet" with "Add Deal" CTA
- [ ] Loading state shows skeleton columns and cards
- [ ] RLS enforces that only agency org members see pipeline data

---

## Wiring Plan

| Layer | File | Action |
|-------|------|--------|
| Page | `src/components/dashboard/CRMPipeline.tsx` | Create |
| Component | `src/components/dashboard/PipelineBoard.tsx` | Create |
| Component | `src/components/dashboard/StageColumn.tsx` | Create |
| Component | `src/components/dashboard/DealCard.tsx` | Create |
| Component | `src/components/dashboard/DealDetailPanel.tsx` | Create |
| Component | `src/components/dashboard/PipelineSelector.tsx` | Create |
| Component | `src/components/dashboard/InteractionTimeline.tsx` | Create |
| Component | `src/components/dashboard/InteractionForm.tsx` | Create |
| Component | `src/components/dashboard/ForecastChart.tsx` | Create |
| Component | `src/components/dashboard/ConversionFunnel.tsx` | Create |
| Component | `src/components/dashboard/DealQuickCreate.tsx` | Create |
| Hook | `src/lib/hooks/usePipeline.ts` | Create |
| Hook | `src/lib/hooks/useDeals.ts` | Create |
| Hook | `src/lib/hooks/useInteractions.ts` | Create |
| Types | `src/lib/types/crm.ts` | Create |
| Route | `src/routes.tsx` | Modify — add `/app/crm/pipelines` route |

---

## Frontend Wiring

### Component Tree

```
DashboardLayout
├── DashboardSidebar (shared)
├── DashboardHeader (shared)
└── CRMPipeline (page)
    ├── PageHeader
    │   ├── h1 "CRM Pipeline"
    │   ├── PipelineTotalValue (weighted)
    │   └── Button "Add Deal" → opens DealQuickCreate
    ├── PipelineSelector (Tabs)
    │   ├── Tab "New Business" (default)
    │   ├── Tab "Upsell"
    │   └── Tab "Renewal"
    ├── PipelineBoard
    │   └── StageColumn[] (horizontal, scroll on overflow)
    │       ├── StageHeader
    │       │   ├── StageName
    │       │   ├── DealCount badge
    │       │   └── StageTotal ($)
    │       └── DealCard[] (draggable, vertical stack)
    │           ├── DealTitle
    │           ├── DealValueBadge (formatted $)
    │           ├── ContactName + avatar
    │           ├── ProbabilityLabel (%)
    │           ├── DaysInStageIndicator (normal | amber at 7+)
    │           └── StaleIndicator (amber border if > 7 days)
    ├── ForecastChart (below board)
    │   └── Recharts BarChart
    │       ├── XAxis (months: Mar, Apr, May, ...)
    │       ├── YAxis ($)
    │       ├── Bar (weighted value)
    │       └── Tooltip (deal count + total)
    ├── ConversionFunnel (optional, togglable section)
    │   └── Recharts BarChart (horizontal, stage-to-stage %)
    ├── DealDetailPanel (Sheet, slide-out right, 400px)
    │   ├── DealHeader (title, value, probability, stage)
    │   ├── Tabs
    │   │   ├── Tab "Details"
    │   │   │   ├── DealMetadata (value, probability, expected close, created)
    │   │   │   ├── ContactCard (name, email, company, phone)
    │   │   │   └── DealActions (edit value, change probability, change stage)
    │   │   ├── Tab "Interactions"
    │   │   │   ├── InteractionTimeline
    │   │   │   │   └── InteractionItem[] (type icon + notes + date + logged-by)
    │   │   │   └── InteractionForm
    │   │   │       ├── TypeSelect (call | email | meeting | note)
    │   │   │       ├── NotesTextarea
    │   │   │       └── Button "Log Interaction"
    │   │   ├── Tab "Wizard Data"
    │   │   │   ├── ReadinessScoreMini (if available)
    │   │   │   ├── SelectedSystemsList
    │   │   │   ├── BusinessProfileSummary
    │   │   │   └── DiagnosticsHighlights
    │   │   └── Tab "Activity"
    │   │       └── ActivityTimeline (stage changes, value changes, etc.)
    │   └── SheetFooter
    │       ├── Button "View Full Deal →"
    │       └── Button "Mark Won" / "Mark Lost"
    └── DealQuickCreate (Dialog modal)
        ├── Input "Deal Title"
        ├── Input "Value ($)"
        ├── ContactSelect (search existing crm_contacts or create new)
        ├── PipelineSelect
        ├── StageSelect (filtered by selected pipeline)
        ├── Input "Probability (%)" (default from stage)
        ├── DatePicker "Expected Close"
        └── Button "Create Deal"
```

### TypeScript Interfaces

```typescript
// src/lib/types/crm.ts

interface Pipeline {
  id: string;
  name: string;
  orgId: string;
  dealCount: number;
  totalValue: number;
  weightedValue: number;          // sum of value * probability
}

interface Stage {
  id: string;
  pipelineId: string;
  name: string;
  position: number;
  colorCode: string;              // hex color for stage header
  dealCount: number;
  totalValue: number;
  defaultProbability: number;     // e.g. Lead=10%, Qualified=30%, etc.
}

interface Deal {
  id: string;
  title: string;
  value: number;
  probability: number;            // 0-100
  stageId: string;
  stageName: string;
  contactId: string | null;
  contactName: string | null;
  contactEmail: string | null;
  contactCompany: string | null;
  expectedCloseDate: string | null;
  daysInStage: number;            // computed: now - stage_entered_at
  isStale: boolean;               // daysInStage > 7
  createdAt: string;
  wizardSessionId: string | null; // link to wizard data if auto-created
}

interface DealDetail extends Deal {
  interactions: Interaction[];
  wizardData: WizardDealContext | null;
  stageHistory: StageChange[];
}

interface Interaction {
  id: string;
  dealId: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  content: string;
  loggedBy: string;
  loggedByAvatarUrl: string | null;
  createdAt: string;
}

interface WizardDealContext {
  readinessScore: number | null;
  selectedSystems: string[];
  industry: string;
  businessSummary: string;
  diagnosticsHighlights: string[];
}

interface StageChange {
  fromStage: string;
  toStage: string;
  changedAt: string;
  changedBy: string;
}

interface ForecastDataPoint {
  month: string;                  // "Mar 2026"
  weightedValue: number;          // sum of deal.value * deal.probability / 100
  dealCount: number;
}

interface ConversionRate {
  fromStage: string;
  toStage: string;
  rate: number;                   // 0-100 percentage
  avgDaysInStage: number;
}

interface DealCreateInput {
  title: string;
  value: number;
  contactId?: string;
  newContact?: { name: string; email: string; company?: string };
  pipelineId: string;
  stageId: string;
  probability?: number;
  expectedCloseDate?: string;
}

interface InteractionCreateInput {
  dealId: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  content: string;
}

interface PipelineData {
  pipelines: Pipeline[];
  stages: Stage[];
  deals: Deal[];
  forecast: ForecastDataPoint[];
}
```

### Custom Hooks

```typescript
// src/lib/hooks/usePipeline.ts
function usePipeline(pipelineId: string | null): {
  data: PipelineData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  activePipelineId: string | null;
  setActivePipelineId: (id: string) => void;
}

// src/lib/hooks/useDeals.ts
function useDeals(pipelineId: string): {
  deals: Deal[];
  loading: boolean;
  createDeal: (input: DealCreateInput) => Promise<{ data: Deal | null; error: string | null }>;
  moveDeal: (dealId: string, newStageId: string) => Promise<{ error: string | null }>;
  updateDeal: (dealId: string, updates: Partial<Deal>) => Promise<{ error: string | null }>;
  closeDeal: (dealId: string, won: boolean) => Promise<{ error: string | null }>;
  isUpdating: boolean;
}

// src/lib/hooks/useDealDetail.ts
function useDealDetail(dealId: string | null): {
  deal: DealDetail | null;
  loading: boolean;
  error: string | null;
}

// src/lib/hooks/useInteractions.ts
function useInteractions(dealId: string | null): {
  interactions: Interaction[];
  loading: boolean;
  logInteraction: (input: InteractionCreateInput) => Promise<{ error: string | null }>;
}
```

### State Management

| State | Location | Reason |
|-------|----------|--------|
| `activePipelineId` | CRMPipeline useState + URL search param `?pipeline=xxx` | Persisted in URL so pipeline selection is shareable |
| `deals` (per pipeline) | useDeals hook (useState) | Fetched when pipeline changes; mutated optimistically on drag |
| `selectedDealId` | CRMPipeline useState | Controls DealDetailPanel Sheet open/close |
| `isCreateDialogOpen` | CRMPipeline useState | Controls DealQuickCreate dialog |
| `dragState` | PipelineBoard local useState (via dnd library) | Active during drag-and-drop only |
| `forecastFilter` | ForecastChart local useState | When a bar is clicked, filters kanban to that month's deals |
| `orgId` | AuthContext | From auth session |
| `interactionForm` | InteractionForm local useState | Type select + notes textarea values |

### Data Fetching Pattern

```
usePipeline(null)  — initial load, fetches all pipelines for tabs
  └── api<{ pipelines: Pipeline[] }>('/dashboard/crm/pipelines', { method: 'POST', body: { orgId } })

usePipeline(pipelineId)  — when pipeline selected, fetches stages + deals
  └── api<PipelineData>('/dashboard/crm/pipelines/:id', {
        method: 'POST', body: { pipelineId }
      })
      ↳ Returns: stages (ordered by position), deals (with contact info),
        forecast (next 6 months), conversion rates

useDealDetail(dealId)
  └── api<DealDetail>('/dashboard/crm/deals/:id', {
        method: 'POST', body: { dealId }
      })
      ↳ Returns: deal with interactions, wizard data (if linked), stage history

useDeals.moveDeal(dealId, stageId)
  └── api('/dashboard/crm/deals/move', {
        method: 'PUT', body: { dealId, stageId }
      })

useDeals.createDeal(input)
  └── api<{ deal: Deal }>('/dashboard/crm/deals', {
        method: 'POST', body: input
      })

useInteractions.logInteraction(input)
  └── api<{ interaction: Interaction }>('/dashboard/crm/interactions', {
        method: 'POST', body: input
      })
```

- Optimistic updates: `moveDeal` immediately moves the card in local state; stage header totals recompute; reverts on error.
- Drag-and-drop: Uses `@dnd-kit/core`. On `onDragEnd`, calls `moveDeal(dealId, destinationStageId)`.
- Forecast recomputation: After any deal move/value change, forecast is recomputed client-side (sum of value * probability grouped by expectedCloseDate month).

### Component Communication

- **Props down**: `CRMPipeline` passes `stages` and `deals` (grouped by stageId) to `PipelineBoard`. `PipelineBoard` passes stage-specific deals to each `StageColumn`. Each `StageColumn` renders `DealCard[]`.
- **Callbacks up**: `DealCard` calls `onDealClick(dealId)` → parent sets `selectedDealId` → opens Sheet. `PipelineBoard` calls `onDealMove(dealId, newStageId)` → parent calls `useDeals.moveDeal()`. `PipelineSelector` calls `onPipelineChange(id)` → parent sets `activePipelineId`.
- **ForecastChart → Board filtering**: `ForecastChart` calls `onBarClick(month)` → parent sets `forecastFilter` → `PipelineBoard` filters deals to show only those with `expectedCloseDate` in that month. Click again to clear.
- **DealDetailPanel**: Receives `dealId`, fetches detail internally with `useDealDetail`. `InteractionForm` calls `logInteraction` → appends to local list + persists.
- **StageColumn totals**: Computed from filtered deals array: `deals.filter(d => d.stageId === stage.id).reduce((sum, d) => sum + d.value, 0)`.

---

## Backend Wiring

### New Edge Function Routes

| Method | Route | Handler | Request Body | Response Shape |
|--------|-------|---------|-------------|----------------|
| POST | `/dashboard/crm/pipelines` | List all pipelines for org | `{ orgId: string }` | `{ pipelines: Pipeline[] }` |
| POST | `/dashboard/crm/pipelines/:id` | Full pipeline data: stages, deals, forecast | `{ pipelineId: string }` | `PipelineData` |
| POST | `/dashboard/crm/deals` | Create a new deal | `DealCreateInput` | `{ deal: Deal }` |
| POST | `/dashboard/crm/deals/:id` | Get deal detail with interactions and wizard data | `{ dealId: string }` | `DealDetail` |
| PUT | `/dashboard/crm/deals/move` | Move deal to new stage (kanban drag) | `{ dealId: string, stageId: string }` | `{ deal: Deal, stageChange: StageChange }` |
| PUT | `/dashboard/crm/deals/:id` | Update deal fields (value, probability, etc.) | `{ dealId: string, updates: Partial<Deal> }` | `{ deal: Deal }` |
| PUT | `/dashboard/crm/deals/:id/close` | Close deal as won or lost | `{ dealId: string, won: boolean }` | `{ deal: Deal }` |
| POST | `/dashboard/crm/interactions` | Log a new interaction | `InteractionCreateInput` | `{ interaction: Interaction }` |
| POST | `/dashboard/crm/forecast` | Revenue forecast data | `{ pipelineId: string, months: number }` | `{ forecast: ForecastDataPoint[] }` |
| POST | `/dashboard/crm/conversion` | Stage conversion analytics | `{ pipelineId: string }` | `{ rates: ConversionRate[] }` |

### Supabase Client Queries

```typescript
// /dashboard/crm/pipelines handler — list pipelines

const { data: pipelines } = await adminClient()
  .from('crm_pipelines')
  .select('id, name, org_id')
  .eq('org_id', orgId);

// Enrich with deal counts and totals per pipeline
for (const pipeline of pipelines) {
  const { data: deals, count } = await adminClient()
    .from('crm_deals')
    .select('value, probability', { count: 'exact' })
    .in('stage_id', stageIdsForPipeline);
  pipeline.dealCount = count;
  pipeline.totalValue = deals.reduce((sum, d) => sum + d.value, 0);
  pipeline.weightedValue = deals.reduce((sum, d) => sum + d.value * d.probability / 100, 0);
}

// /dashboard/crm/pipelines/:id handler — full pipeline data

// 1. Stages ordered by position
const { data: stages } = await adminClient()
  .from('crm_stages')
  .select('id, name, position, color_code, default_probability')
  .eq('pipeline_id', pipelineId)
  .order('position', { ascending: true });

// 2. All deals in this pipeline (via stage_id IN stages)
const stageIds = stages.map(s => s.id);
const { data: deals } = await adminClient()
  .from('crm_deals')
  .select(`
    id, title, value, probability, stage_id, expected_close_date,
    created_at, stage_entered_at, wizard_session_id,
    crm_contacts!contact_id(id, name, email, company)
  `)
  .in('stage_id', stageIds)
  .order('created_at', { ascending: false });

// 3. Compute daysInStage and isStale
deals.forEach(deal => {
  const enteredAt = new Date(deal.stage_entered_at || deal.created_at);
  deal.daysInStage = Math.floor((Date.now() - enteredAt.getTime()) / 86400000);
  deal.isStale = deal.daysInStage > 7;
});

// 4. Enrich stage headers with counts and totals
stages.forEach(stage => {
  const stageDeals = deals.filter(d => d.stage_id === stage.id);
  stage.dealCount = stageDeals.length;
  stage.totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);
});

// 5. Forecast: group deals by expected_close_date month
const forecast = groupByMonth(deals, 6); // next 6 months
// Each month: { month: "Mar 2026", weightedValue: sum(value*prob/100), dealCount }

// --- Deal detail handler ---

// 6. Single deal with contact
const { data: deal } = await adminClient()
  .from('crm_deals')
  .select(`
    id, title, value, probability, stage_id, expected_close_date,
    created_at, stage_entered_at, wizard_session_id,
    crm_contacts!contact_id(id, name, email, company, phone, role)
  `)
  .eq('id', dealId)
  .single();

// 7. Interactions for deal
const { data: interactions } = await adminClient()
  .from('crm_interactions')
  .select('id, type, content, logged_by, created_at')
  .eq('deal_id', dealId)
  .order('created_at', { ascending: false });

// 8. Wizard data if linked
let wizardData = null;
if (deal.wizard_session_id) {
  const { data: answers } = await adminClient()
    .from('wizard_answers')
    .select('step_number, ai_results')
    .eq('session_id', deal.wizard_session_id);

  wizardData = {
    readinessScore: answers.find(a => a.step_number === 4)?.ai_results?.overallScore || null,
    selectedSystems: answers.find(a => a.step_number === 3)?.ai_results?.selectedSystems || [],
    industry: answers.find(a => a.step_number === 1)?.ai_results?.detectedIndustry || '',
    businessSummary: answers.find(a => a.step_number === 1)?.ai_results?.companySummary || '',
    diagnosticsHighlights: answers.find(a => a.step_number === 2)?.ai_results?.topFindings || [],
  };
}

// 9. Stage history from activities
const { data: stageHistory } = await adminClient()
  .from('activities')
  .select('description, created_at, actor_name')
  .eq('entity_type', 'deal')
  .eq('entity_id', dealId)
  .eq('type', 'stage_change')
  .order('created_at', { ascending: false });

// --- Move deal handler ---

// 10. Update deal stage
const { data: movedDeal } = await adminClient()
  .from('crm_deals')
  .update({
    stage_id: newStageId,
    stage_entered_at: new Date().toISOString()
  })
  .eq('id', dealId)
  .select()
  .single();

// 11. Log stage change activity
await adminClient()
  .from('activities')
  .insert({
    org_id: orgId,
    type: 'stage_change',
    entity_type: 'deal',
    entity_id: dealId,
    description: `Deal "${deal.title}" moved from ${oldStageName} to ${newStageName}`,
    actor_name: userName
  });

// --- Create deal handler ---

// 12. Create deal
const { data: newDeal } = await adminClient()
  .from('crm_deals')
  .insert({
    title,
    value,
    probability: probability || stage.default_probability,
    stage_id: stageId,
    contact_id: contactId,
    expected_close_date: expectedCloseDate,
    stage_entered_at: new Date().toISOString()
  })
  .select()
  .single();

// 13. Optionally create new contact
if (newContact) {
  const { data: contact } = await adminClient()
    .from('crm_contacts')
    .insert({
      name: newContact.name,
      email: newContact.email,
      company: newContact.company
    })
    .select()
    .single();
  // Update deal with new contact_id
  await adminClient()
    .from('crm_deals')
    .update({ contact_id: contact.id })
    .eq('id', newDeal.id);
}

// --- Log interaction handler ---

// 14. Create interaction
const { data: interaction } = await adminClient()
  .from('crm_interactions')
  .insert({
    deal_id: dealId,
    type: interactionType,
    content,
    logged_by: userName
  })
  .select()
  .single();
```

### RLS Policies Needed

| Table | Policy | Rule |
|-------|--------|------|
| crm_pipelines | SELECT org pipelines | `org_id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid())` |
| crm_pipelines | INSERT new pipeline | `org_id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid() AND role IN ('owner', 'admin'))` |
| crm_stages | SELECT via pipeline | `pipeline_id IN (SELECT id FROM crm_pipelines WHERE org_id IN (...))` |
| crm_stages | INSERT/UPDATE | `pipeline_id IN (SELECT id FROM crm_pipelines WHERE org_id IN (...) AND role IN ('owner', 'admin'))` |
| crm_deals | SELECT via stage | `stage_id IN (SELECT id FROM crm_stages WHERE pipeline_id IN (SELECT id FROM crm_pipelines WHERE org_id IN (...)))` |
| crm_deals | INSERT | Same chain as SELECT |
| crm_deals | UPDATE (move, close, edit) | Same chain as SELECT |
| crm_contacts | SELECT org contacts | `id IN (SELECT contact_id FROM crm_deals WHERE ...) OR client_id IN (SELECT id FROM clients WHERE org_id IN (...))` |
| crm_contacts | INSERT | `auth.uid() IS NOT NULL` (any logged-in user can create contacts) |
| crm_interactions | SELECT via deal | `deal_id IN (SELECT id FROM crm_deals WHERE ...)` |
| crm_interactions | INSERT | `deal_id IN (SELECT id FROM crm_deals WHERE ...)` |
| organizations | SELECT own org | `id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid())` |
| activities | INSERT | `auth.uid() IS NOT NULL` |
| wizard_sessions | SELECT (for deal wizard context) | `org_id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid())` |
| wizard_answers | SELECT (for deal wizard context) | `session_id IN (SELECT id FROM wizard_sessions WHERE ...)` |

### API Response TypeScript Interfaces

```typescript
interface PipelinesListResponse {
  pipelines: {
    id: string;
    name: string;
    orgId: string;
    dealCount: number;
    totalValue: number;
    weightedValue: number;
  }[];
}

interface PipelineDetailResponse {
  pipeline: {
    id: string;
    name: string;
  };
  stages: {
    id: string;
    name: string;
    position: number;
    colorCode: string;
    dealCount: number;
    totalValue: number;
    defaultProbability: number;
  }[];
  deals: {
    id: string;
    title: string;
    value: number;
    probability: number;
    stageId: string;
    stageName: string;
    contactId: string | null;
    contactName: string | null;
    contactEmail: string | null;
    contactCompany: string | null;
    expectedCloseDate: string | null;
    daysInStage: number;
    isStale: boolean;
    createdAt: string;
    wizardSessionId: string | null;
  }[];
  forecast: {
    month: string;
    weightedValue: number;
    dealCount: number;
  }[];
}

interface DealDetailResponse {
  id: string;
  title: string;
  value: number;
  probability: number;
  stageId: string;
  stageName: string;
  contactId: string | null;
  contactName: string | null;
  contactEmail: string | null;
  contactCompany: string | null;
  contactPhone: string | null;
  expectedCloseDate: string | null;
  daysInStage: number;
  isStale: boolean;
  createdAt: string;
  interactions: {
    id: string;
    type: string;
    content: string;
    loggedBy: string;
    loggedByAvatarUrl: string | null;
    createdAt: string;
  }[];
  wizardData: {
    readinessScore: number | null;
    selectedSystems: string[];
    industry: string;
    businessSummary: string;
    diagnosticsHighlights: string[];
  } | null;
  stageHistory: {
    fromStage: string;
    toStage: string;
    changedAt: string;
    changedBy: string;
  }[];
}

interface DealMoveResponse {
  deal: {
    id: string;
    stageId: string;
    daysInStage: number;
    isStale: boolean;
  };
  stageChange: {
    fromStage: string;
    toStage: string;
    changedAt: string;
  };
}

interface ForecastResponse {
  forecast: {
    month: string;
    weightedValue: number;
    dealCount: number;
  }[];
  totalWeightedPipeline: number;
}

interface ConversionResponse {
  rates: {
    fromStage: string;
    toStage: string;
    rate: number;
    avgDaysInStage: number;
  }[];
}
```

### Edge Cases

| Scenario | Handling |
|----------|----------|
| No pipelines exist (first-time setup) | Return `pipelines: []`. Frontend shows "Create your first pipeline" CTA with a setup wizard dialog that creates pipeline + default stages (Lead, Qualified, Proposal, Negotiation, Won, Lost) |
| Pipeline has no deals | Stages render with empty columns. Each column shows "+ Add Deal" placeholder card |
| Deal has no contact | `contactName: null`. DealCard shows "No contact" placeholder. Detail panel shows "Add contact" link |
| Deal has no expected close date | `expectedCloseDate: null`. Excluded from forecast chart. DealCard shows "No close date" in gray |
| Drag deal to same column | No-op. `moveDeal` checks if `stageId` changed before making API call |
| Stale deal calculation for newly created deals | `stage_entered_at` set to `created_at`. `daysInStage: 0`. Not stale |
| Wizard session linked but wizard data deleted | `wizardData: null`. Wizard Data tab shows "Wizard data no longer available" message |
| Deal moved to "Closed Won" or "Closed Lost" stage | `closeDeal` handler marks deal as closed. Card removed from board. Logged as activity. Shown in conversion metrics |
| Contact search on DealQuickCreate returns no matches | Show "Create new contact" inline form within the search dropdown |
| Forecast with no deals in future months | Empty bars in chart (value: $0). Show at least 3 future months |
| Large pipeline (50+ deals in one stage) | Column scrolls vertically. No virtualization needed at this scale. Consider "Show top 20" + "Load more" if > 30 per column |
| Unauthorized user | 401 response. Frontend redirects to `/login` |
| Pipeline ID not found | 404 response. Frontend shows "Pipeline not found" with link to `/app/crm/pipelines` |

---

## Detailed ASCII Wireframes

### Desktop Layout (1200px)

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ BROWSER VIEWPORT (1440px)                                                            │
│                                                                                      │
│ ┌─────────────┬──────────────────────────────────────────────────────────────────────┐│
│ │ SIDEBAR     │  MAIN CONTENT (max-w-[1200px] mx-auto px-6)                        ││
│ │ 240px       │                                                                      ││
│ │ #0A211F bg  │  ┌──────────────────────────────────────────────────────────────┐    ││
│ │             │  │ PAGE HEADER                                        h: 64px  │    ││
│ │ ○ Dashboard │  │                                                              │    ││
│ │ ○ Projects  │  │  CRM Pipeline          Weighted: $45K      [+ Add Deal]     │    ││
│ │ ● CRM  ◄── │  │                                                              │    ││
│ │ ○ AI Insight│  └──────────────────────────────────────────────────────────────┘    ││
│ │ ○ Documents │                                                                      ││
│ │ ○ Financial │  ┌──────────────────────────────────────────────────────────────┐    ││
│ │ ○ Settings  │  │ PIPELINE SELECTOR                                           │    ││
│ │             │  │ [New Business ●]  [Upsell]  [Renewal]                       │    ││
│ │             │  └──────────────────────────────────────────────────────────────┘    ││
│ │             │                                                                      ││
│ │             │  ┌──────────────────────────────────────────────────────────────┐    ││
│ │             │  │ PIPELINE BOARD (horizontal scroll if > 4 stages)             │    ││
│ │             │  │                                                              │    ││
│ │             │  │ ┌──────────┬──────────┬──────────┬──────────┬──────┬──────┐  │    ││
│ │             │  │ │  LEAD    │ QUALIFIED│ PROPOSAL │ NEGOTIA- │ WON  │ LOST │  │    ││
│ │             │  │ │  4 $32K  │ 3 $28K   │ 2 $18K   │ TION     │      │      │  │    ││
│ │             │  │ │          │          │          │ 1 $15K   │      │      │  │    ││
│ │             │  │ │──────────│──────────│──────────│──────────│──────│──────│  │    ││
│ │             │  │ │┌────────┐│┌────────┐│┌────────┐│┌────────┐│      │      │  │    ││
│ │             │  │ ││Fresh   ││││GreenLf ││││TechNova│││Acme    ││      │      │  │    ││
│ │             │  │ ││Bites   ││││Health  ││││AI Tran ││││Retail  ││      │      │  │    ││
│ │             │  │ ││Cart Rec││││Patient ││││sform.  ││││Support ││      │      │  │    ││
│ │             │  │ ││$8K  20%││││Sched.  ││││$22K 50%││││Engine  ││      │      │  │    ││
│ │             │  │ ││alex@.. ││││$15K 40%││││sara@.. ││││$15K 80%││      │      │  │    ││
│ │             │  │ ││ 3 days ││││mike@.. ││││⚠ 9 days│││john@.. ││      │      │  │    ││
│ │             │  │ │└────────┘│││ 5 days │││└────────┘││ 4 days ││      │      │  │    ││
│ │             │  │ │┌────────┐│└────────┘│┌────────┐│└────────┘│      │      │  │    ││
│ │             │  │ ││Bloom   ││┌────────┐││Metro   ││          │      │      │  │    ││
│ │             │  │ ││Retail  ││││Apex    ││││Logist. ││          │      │      │  │    ││
│ │             │  │ ││AI Inv. ││││Expand  ││││AI Rout ││          │      │      │  │    ││
│ │             │  │ ││$12K 15%││││$8K 30% ││││$5K 60% ││          │      │      │  │    ││
│ │             │  │ ││ 2 days ││││ 6 days │││⚠ 12 day││          │      │      │  │    ││
│ │             │  │ │└────────┘│└────────┘│└────────┘│          │      │      │  │    ││
│ │             │  │ │┌────────┐│┌────────┐│          │          │      │      │  │    ││
│ │             │  │ ││Sunrise ││││BrightEd││          │          │      │      │  │    ││
│ │             │  │ ││Foods   ││││AI Tutor││          │          │      │      │  │    ││
│ │             │  │ ││$6K 10% ││││$5K 25% ││          │          │      │      │  │    ││
│ │             │  │ ││ 1 day  │││ 4 days ││          │          │      │      │  │    ││
│ │             │  │ │└────────┘│└────────┘│          │          │      │      │  │    ││
│ │             │  │ │┌────────┐│          │          │          │      │      │  │    ││
│ │             │  │ ││NovaTech││          │          │          │      │      │  │    ││
│ │             │  │ ││AI Ops  ││          │          │          │      │      │  │    ││
│ │             │  │ ││$6K 10% ││          │          │          │      │      │  │    ││
│ │             │  │ ││ 1 day  ││          │          │          │      │      │  │    ││
│ │             │  │ │└────────┘│          │          │          │      │      │  │    ││
│ │             │  │ └──────────┴──────────┴──────────┴──────────┴──────┴──────┘  │    ││
│ │             │  └──────────────────────────────────────────────────────────────┘    ││
│ │             │                                                                      ││
│ │             │  ┌──────────────────────────────────────────────────────────────┐    ││
│ │             │  │ FORECAST CHART (Recharts BarChart)                h: 200px  │    ││
│ │             │  │                                                              │    ││
│ │             │  │  $50K ┤                                                      │    ││
│ │             │  │       │  ┌────┐                                              │    ││
│ │             │  │  $40K ┤  │    │  ┌────┐                                      │    ││
│ │             │  │       │  │$45K│  │    │  ┌────┐                              │    ││
│ │             │  │  $30K ┤  │    │  │$38K│  │    │  ┌────┐                      │    ││
│ │             │  │       │  │    │  │    │  │$32K│  │    │  ┌────┐  ┌────┐      │    ││
│ │             │  │  $20K ┤  │    │  │    │  │    │  │$28K│  │$22K│  │$15K│      │    ││
│ │             │  │       │  │    │  │    │  │    │  │    │  │    │  │    │      │    ││
│ │             │  │  $10K ┤  │    │  │    │  │    │  │    │  │    │  │    │      │    ││
│ │             │  │       │  │    │  │    │  │    │  │    │  │    │  │    │      │    ││
│ │             │  │    $0 ┼──┴────┴──┴────┴──┴────┴──┴────┴──┴────┴──┴────┴──    │    ││
│ │             │  │         Mar     Apr     May     Jun     Jul     Aug          │    ││
│ │             │  │                                                              │    ││
│ │             │  │  Bars: #0A211F fill, #84CC16 on hover/click                  │    ││
│ │             │  │  Clickable: filters board to that month's deals              │    ││
│ │             │  └──────────────────────────────────────────────────────────────┘    ││
│ └─────────────┴──────────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### Deal Card Detail (individual component)

```
┌──────────────────────────────────┐
│ DEAL CARD               #FFF bg  │
│ p-3  rounded-lg  w-full          │
│ border border-[#D4CFC8]          │
│ cursor-grab  hover:shadow-md     │
│                                  │
│  GreenLeaf Healthcare            │
│  Patient Scheduling              │
│  Lora 14px #0A211F               │
│                                  │
│  ┌─────────┐  ┌───────┐         │
│  │ $15,000  │  │  40%  │         │
│  │ #84CC16  │  │ prob  │         │
│  └─────────┘  └───────┘         │
│                                  │
│  ┌────┐  mike@green..  5 days   │
│  │ 👤 │  Lora 12px     #9B9590  │
│  │24px│  #6B6560                 │
│  └────┘                          │
│                                  │
│  Normal border: #D4CFC8          │
│  Stale (>7d): border-[#EAB308]   │
│  High value (>$10K): value badge │
│    bg is #84CC16/15              │
└──────────────────────────────────┘
```

### Deal Detail Panel (Sheet, 400px)

```
┌──────────────────────────────────────────┐
│ DEAL DETAIL PANEL             [X close]  │
│ Sheet slide-in from right, 400px wide    │
│ #FFFFFF bg, shadow-xl                    │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │  GreenLeaf Healthcare               │ │
│ │  AI Patient Scheduling              │ │
│ │                                      │ │
│ │  $15,000  │  60%  │  Proposal Sent   │ │
│ │  value       prob    stage           │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ [Details] [Interactions] [Wizard] [Activity] │
│ ─────────────────────────────────────────│
│                                          │
│ ┌─── Interactions Tab ─────────────────┐ │
│ │                                      │ │
│ │  + Log Interaction                   │ │
│ │  ┌──────────────────────────────┐    │ │
│ │  │ Type: [Email ▾]             │    │ │
│ │  │ ┌──────────────────────────┐│    │ │
│ │  │ │ Sent proposal doc via    ││    │ │
│ │  │ │ email. Includes 3-phase  ││    │ │
│ │  │ │ implementation plan...   ││    │ │
│ │  │ └──────────────────────────┘│    │ │
│ │  │ [Log Interaction]           │    │ │
│ │  └──────────────────────────────┘    │ │
│ │                                      │ │
│ │  Timeline                            │ │
│ │  ┌──────────────────────────────┐    │ │
│ │  │ 📧 Email — Mar 5, 2026      │    │ │
│ │  │ Maria: Sent proposal doc     │    │ │
│ │  │ via email with pricing.      │    │ │
│ │  ├──────────────────────────────┤    │ │
│ │  │ 📞 Call — Mar 3, 2026       │    │ │
│ │  │ Maria: Intro call with Dr.  │    │ │
│ │  │ Chen. Discussed scheduling  │    │ │
│ │  │ pain points and AI options.  │    │ │
│ │  ├──────────────────────────────┤    │ │
│ │  │ 📝 Note — Mar 1, 2026      │    │ │
│ │  │ System: Deal created from   │    │ │
│ │  │ wizard completion. Score 78  │    │ │
│ │  └──────────────────────────────┘    │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │  [Mark Won ✓]        [Mark Lost ✗]  │ │
│ └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

### Wizard Data Tab (inside Deal Detail Panel)

```
┌──────────────────────────────────────────┐
│ ┌─── Wizard Data Tab ─────────────────┐  │
│ │                                      │  │
│ │  AI Readiness Score                  │  │
│ │  ┌──────────────────────────┐        │  │
│ │  │  78/100    █████████░░░  │        │  │
│ │  └──────────────────────────┘        │  │
│ │                                      │  │
│ │  Industry: Healthcare                │  │
│ │                                      │  │
│ │  Business Summary                    │  │
│ │  "GreenLeaf Healthcare operates     │  │
│ │  3 clinics with 120 staff. Key      │  │
│ │  challenge: patient scheduling..."   │  │
│ │                                      │  │
│ │  Selected Systems                    │  │
│ │  ┌──────────────────────────┐        │  │
│ │  │ ● Patient Scheduling AI  │        │  │
│ │  │ ● Medical Records OCR    │        │  │
│ │  │ ● Appointment Reminders  │        │  │
│ │  └──────────────────────────┘        │  │
│ │                                      │  │
│ │  Top Diagnostic Findings             │  │
│ │  • Appointment no-shows cost         │  │
│ │    $8K/month                         │  │
│ │  • 60% of scheduling is manual       │  │
│ │  • Patient wait times avg 23 min     │  │
│ │                                      │  │
│ └──────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

### Tablet Layout (768px)

```
┌────────────────────────────────────────────────────┐
│ TABLET VIEWPORT (768px)                            │
│                                                    │
│ ┌────────────────────────────────────────────────┐ │
│ │ [☰]  CRM Pipeline      $45K     [+ Add Deal]  │ │
│ └────────────────────────────────────────────────┘ │
│                                                    │
│ ┌────────────────────────────────────────────────┐ │
│ │ [New Business ●]  [Upsell]  [Renewal]          │ │
│ └────────────────────────────────────────────────┘ │
│                                                    │
│ ┌────────────────────────────────────────────────┐ │
│ │ KANBAN (horizontal scroll, 4+ columns)         │ │
│ │ ← ┌─────────┬─────────┬─────────┬────────┐ → │ │
│ │   │ LEAD    │ QUALIF  │ PROPOS  │ NEGOT  │   │ │
│ │   │ 4 $32K  │ 3 $28K  │ 2 $18K  │ 1 $15K │   │ │
│ │   │─────────│─────────│─────────│────────│   │ │
│ │   │ [deal]  │ [deal]  │ [deal]  │ [deal] │   │ │
│ │   │ [deal]  │ [deal]  │ [deal]  │        │   │ │
│ │   │ [deal]  │ [deal]  │         │        │   │ │
│ │   │ [deal]  │         │         │        │   │ │
│ │   └─────────┴─────────┴─────────┴────────┘   │ │
│ └────────────────────────────────────────────────┘ │
│                                                    │
│ ┌────────────────────────────────────────────────┐ │
│ │ FORECAST  Mar $45K │ Apr $38K │ May $32K │ ... │ │
│ │ (compact bar chart, 120px height)              │ │
│ └────────────────────────────────────────────────┘ │
│                                                    │
│ Detail → full-width Sheet from bottom              │
└────────────────────────────────────────────────────┘
```

### Mobile Layout (375px)

```
┌───────────────────────────────────┐
│ MOBILE VIEWPORT (375px)           │
│                                   │
│ ┌───────────────────────────────┐ │
│ │ [☰]  CRM Pipeline  [+ Add]   │ │
│ └───────────────────────────────┘ │
│                                   │
│ ┌───────────────────────────────┐ │
│ │ [New Biz ●] [Upsell] [Renew] │ │
│ └───────────────────────────────┘ │
│                                   │
│ ┌───────────────────────────────┐ │
│ │ Stage: [Lead ▾]  4 deals $32K│ │
│ └───────────────────────────────┘ │
│  (dropdown replaces kanban cols)  │
│                                   │
│ ┌───────────────────────────────┐ │
│ │ Fresh Bites Group             │ │
│ │ Cart Recovery                 │ │
│ │ $8,000  │  20%  │  3 days    │ │
│ │ alex@freshbites.com           │ │
│ └───────────────────────────────┘ │
│                                   │
│ ┌───────────────────────────────┐ │
│ │ Bloom Retail                  │ │
│ │ AI Inventory                  │ │
│ │ $12,000 │  15%  │  2 days    │ │
│ │ jen@bloomretail.com           │ │
│ └───────────────────────────────┘ │
│                                   │
│ ┌───────────────────────────────┐ │
│ │ Sunrise Foods                 │ │
│ │ Supply Chain AI               │ │
│ │ $6,000  │  10%  │  1 day     │ │
│ │ tom@sunrisefoods.com          │ │
│ └───────────────────────────────┘ │
│                                   │
│ ┌───────────────────────────────┐ │
│ │ NovaTech                      │ │
│ │ AI Operations                 │ │
│ │ $6,000  │  10%  │  1 day     │ │
│ │ pat@novatech.io               │ │
│ └───────────────────────────────┘ │
│                                   │
│ ┌───────────────────────────────┐ │
│ │ Weighted Pipeline: $45K       │ │
│ │ Mar: $45K  Apr: $38K  May:... │ │
│ │ (compact horizontal bars)     │ │
│ └───────────────────────────────┘ │
│                                   │
│ Detail → full-screen Sheet        │
└───────────────────────────────────┘
```

### Stale Deal Indicator Detail

```
┌──────────────────────────────────────────────────────┐
│ STALE DEAL INDICATORS                                │
│                                                      │
│  Normal deal card (< 7 days in stage):               │
│  ┌──────────────────────────────┐                    │
│  │ border: #D4CFC8 (default)   │                    │
│  │ days indicator: "5 days"     │                    │
│  │ color: #9B9590 (gray text)   │                    │
│  └──────────────────────────────┘                    │
│                                                      │
│  Stale deal card (7-14 days in stage):               │
│  ┌──────────────────────────────┐                    │
│  │ border: #EAB308 (amber)     │  ← 2px border     │
│  │ days indicator: "⚠ 9 days"   │                    │
│  │ color: #EAB308 (amber text)  │                    │
│  └──────────────────────────────┘                    │
│                                                      │
│  Critical deal card (> 14 days in stage):            │
│  ┌──────────────────────────────┐                    │
│  │ border: #EF4444 (red)       │  ← 2px border     │
│  │ days indicator: "🔴 16 days" │                    │
│  │ color: #EF4444 (red text)    │                    │
│  │ bg: #FEF2F2 (light red tint) │                    │
│  └──────────────────────────────┘                    │
└──────────────────────────────────────────────────────┘
```

---

## Outcomes

| Before | After |
|--------|-------|
| Wizard completions don't create sales pipeline entries | Auto-created deals with wizard context flow into the kanban |
| No visibility into sales pipeline — managed via spreadsheet | Full kanban board with drag-and-drop stage management |
| No interaction history with prospects | Chronological timeline of calls, emails, meetings per deal |
| Revenue forecasting is guesswork | Weighted pipeline forecast chart by month using deal value * probability |
| Stale deals go unnoticed for weeks | Amber indicators flag deals in same stage > 7 days |
