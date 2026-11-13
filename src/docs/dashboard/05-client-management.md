# 05 — CLIENT MANAGEMENT DASHBOARD
# Agency CRM — Contacts, Profiles, Engagement Tracking

**Component:** `ClientManagement`
**File:** `/components/dashboard/clients/ClientManagement.tsx`
**Route:** `/app/clients`
**Status:** NOT STARTED
**Parent Doc:** `00-dashboard-master.md`
**Depends On:** DashboardLayout, Auth, wizard_sessions, clients table, crm_contacts table

---

## SCREEN PURPOSE

Agency-side view for managing all client organizations. The agency manages multiple clients at different stages of the wizard and project delivery. Without this screen, consultants check individual wizard sessions manually. This screen surfaces client status, wizard progress, engagement level, project health, and contact details in one sortable, filterable table. A slide-out detail panel gives full context for any client without leaving the list.

Real-world: "Agency owner reviews 18 active clients, sorts by last activity to find disengaged clients, clicks one to see wizard abandoned at Step 3, bulk-assigns a consultant for follow-up."

---

## TARGET USERS

- Agency owners overseeing the full client portfolio
- Agency consultants managing assigned client relationships
- Business development team tracking leads through the wizard funnel

---

## ASCII WIREFRAME — Desktop (1440px)

```
┌─────────────┬──────────────────────────────────────────────────────────────┐
│  SIDEBAR    │  HEADER                                                      │
│  240px      │  Client Management                  18 clients   [+ Add]     │
│  #1A1A1A    ├──────────────────────────────────────────────────────────────┤
│             │                                                              │
│  ☀ AMO AI   │  ┌──────────────────────────────────────────────────────┐    │
│             │  │ FILTER BAR                                 sticky    │    │
│  ──────────│  │                                                      │    │
│  ○ Dashboard│  │  [🔍 Search clients...                  ]           │    │
│  ○ Projects │  │  [Status ▾] [Industry ▾] [Consultant ▾] [Clear]    │    │
│  ● Clients  │  └──────────────────────────────────────────────────────┘    │
│  ○ Roadmap  │                                                              │
│  ○ Insights │  ┌──────────────────────────────────────────────────────┐    │
│  ○ Documents│  │ CLIENT TABLE                           #FFF bg      │    │
│  ○ Settings │  │                                                      │    │
│             │  │ ☐ │ Name ▾     │Contact      │Industry│Status   │.. │    │
│             │  │───┼────────────┼─────────────┼────────┼─────────┼───│    │
│             │  │ ☐ │ Acme Retail│john@acme.com│E-comm  │● Active │.. │    │
│             │  │   │ Group      │             │        │         │   │    │
│             │  │───┼────────────┼─────────────┼────────┼─────────┼───│    │
│             │  │ ☐ │ TechNova   │sara@tech.com│SaaS    │○ Lead   │.. │    │
│             │  │   │ Solutions  │             │        │         │   │    │
│             │  │───┼────────────┼─────────────┼────────┼─────────┼───│    │
│             │  │ ☐ │ GreenLeaf  │mike@grn.com │Health  │● Onboard│.. │    │
│             │  │   │ Healthcare │             │        │         │   │    │
│             │  │───┼────────────┼─────────────┼────────┼─────────┼───│    │
│             │  │ ☐ │ Fresh Bites│alex@frsh.com│F&B     │○ Lead   │.. │    │
│             │  │   │ Group      │             │        │         │   │    │
│             │  │                                                      │    │
│             │  │  ... (remaining rows)                                │    │
│             │  │                                                      │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │ Showing 1-10 of 18   [10 ▾]   [◀] 1  [2]  [▶]     │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
└─────────────┴──────────────────────────────────────────────────────────────┘
```

### Full Table Row (all columns, 960px content area)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ☐ │ Name        │ Contact       │ Industry │ Status  │ Wizard │ Proj │ Last │ HP │ Consult │
│30 │ 180px       │ 160px         │ 90px     │ 90px    │ 80px   │ 50px │ 90px │ 40 │ 80px    │
│───┼─────────────┼───────────────┼──────────┼─────────┼────────┼──────┼──────┼────┼─────────│
│ ☐ │ Acme Retail │ john@acme.com │ E-comm   │ ● Active│ ●●●●● │  2   │ 2h   │ 85 │ [av]    │
│ ☐ │ TechNova    │ sara@tech.com │ SaaS     │ ○ Lead  │ ●●●●○ │  0   │ 16d  │ 32 │  --     │
│ ☐ │ GreenLeaf   │ mike@grn.com  │ Health   │ ● Onbrd │ ●●●●● │  1   │ 3d   │ 78 │ [av]    │
│ ☐ │ Fresh Bites │ alex@frsh.com │ F&B      │ ○ Lead  │ ●●○○○ │  0   │ 5d   │ 45 │  --     │
│                                                                                              │
│ Legend:                                                                                      │
│   ● filled = wizard step completed     ○ empty = not completed                               │
│   HP = Health Points 0-100   green >80, amber 50-80, red <50                                │
│   Status: Lead=gray  Active=#00875A  Onboarding=blue  Delivered=teal  Churned=#DC2626       │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ASCII WIREFRAME — Client Detail Panel (Sheet, 400px from right)

```
┌──────────────────────────────────────────┐
│ CLIENT DETAIL PANEL           [X close]  │
│ Sheet slide-in from right, 400px         │
│ #FFFFFF bg                               │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │  Acme Retail Group        ● Active   │ │
│ │  E-commerce  │  50 employees         │ │
│ │  Health: 85  │  Revenue: $48K        │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ [Overview] [Contacts] [Projects] [Activ.]│
│ ──────────────────────────────────────── │
│                                          │
│ ┌─── Overview Tab ─────────────────────┐ │
│ │                                      │ │
│ │  Wizard Progress                     │ │
│ │  ● Step 1: Business Profile    ✓    │ │
│ │  │                                   │ │
│ │  ● Step 2: Diagnostics        ✓    │ │
│ │  │                                   │ │
│ │  ● Step 3: System Selection   ✓    │ │
│ │  │                                   │ │
│ │  ● Step 4: Readiness Score    ✓    │ │
│ │  │                                   │ │
│ │  ● Step 5: Roadmap            ✓    │ │
│ │                                      │ │
│ │  AI Readiness Score                  │ │
│ │  ┌──────────────────────────┐        │ │
│ │  │  72/100    ████████░░░░  │        │ │
│ │  └──────────────────────────┘        │ │
│ │                                      │ │
│ │  Key Metrics                         │ │
│ │  ┌────────────┬─────────────┐        │ │
│ │  │ 2 Projects │ $48K Rev.   │        │ │
│ │  │ 3 Systems  │ Phase 1/3   │        │ │
│ │  └────────────┴─────────────┘        │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │ [View Full Profile →] [Schedule Call]│ │
│ └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

### Contacts Tab

```
┌──────────────────────────────────────┐
│  CONTACTS                            │
│                                      │
│  ┌──────────────────────────────┐    │
│  │ John Smith         ★ Primary │    │
│  │ CEO                          │    │
│  │ john@acmeretail.com          │    │
│  │ +1 (555) 123-4567            │    │
│  └──────────────────────────────┘    │
│                                      │
│  ┌──────────────────────────────┐    │
│  │ Lisa Park                    │    │
│  │ Operations Manager           │    │
│  │ lisa@acmeretail.com           │    │
│  │ +1 (555) 234-5678            │    │
│  └──────────────────────────────┘    │
│                                      │
│  [+ Add Contact]                     │
└──────────────────────────────────────┘
```

### Activity Tab

```
┌──────────────────────────────────────┐
│  ENGAGEMENT TIMELINE                  │
│                                      │
│  ● Wizard completed          2h ago  │
│  │                                    │
│  ● Readiness scored: 72     3h ago  │
│  │                                    │
│  ● Systems recommended      3h ago  │
│  │                                    │
│  ● Diagnostics completed    4h ago  │
│  │                                    │
│  ● Business profile entered  1d ago  │
│  │                                    │
│  ● Session started          1d ago  │
│                                      │
└──────────────────────────────────────┘
```

---

## ASCII WIREFRAME — Mobile (375px)

```
┌───────────────────────────────────┐
│ ☰  Clients            [+ Add]    │
├───────────────────────────────────┤
│                                   │
│ [🔍 Search clients...           ]│
│ [Status ▾] [Industry ▾]         │
│                                   │
├───────────────────────────────────┤
│                                   │
│ ┌───────────────────────────────┐ │
│ │ Acme Retail Group             │ │
│ │ john@acme.com  │  E-commerce  │ │
│ │ ● Active    Wizard: ●●●●●    │ │
│ │ 2 projects  │  Last: 2h ago   │ │
│ └───────────────────────────────┘ │
│                                   │
│ ┌───────────────────────────────┐ │
│ │ TechNova Solutions            │ │
│ │ sara@tech.com  │  SaaS        │ │
│ │ ○ Lead      Wizard: ●●●●○    │ │
│ │ 0 projects  │  Last: 16d ago  │ │
│ └───────────────────────────────┘ │
│                                   │
│ ┌───────────────────────────────┐ │
│ │ GreenLeaf Healthcare          │ │
│ │ mike@grn.com │  Healthcare    │ │
│ │ ● Onboarding Wizard: ●●●●●   │ │
│ │ 1 project   │  Last: 3d ago   │ │
│ └───────────────────────────────┘ │
│                                   │
│ ... (scrollable list)             │
│                                   │
│ ┌───────────────────────────────┐ │
│ │ Showing 1-10    [Load more]   │ │
│ └───────────────────────────────┘ │
│                                   │
│ Detail → full-screen Sheet        │
└───────────────────────────────────┘
```

Mobile replaces the table with stacked client cards. Detail panel goes full-screen. Bulk actions appear as a bottom sheet.

---

## ASCII WIREFRAME — Bulk Action Toolbar (conditional)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ BULK ACTION TOOLBAR                fixed bottom, h-14, #1A1A1A bg, z-50 │
│                                                                          │
│  3 clients selected    [Export CSV]  [Assign Consultant ▾]  [Status ▾]  │
│  #F5F5F0 text          #00875A btn   outline btn             outline btn │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

Appears when 1+ table rows are selected. Fixed to bottom viewport.

---

## CONTENT DATA TABLE

| Field | Source Table | Column/Path | Fallback |
|-------|-------------|-------------|----------|
| Client name | clients | name | — |
| Client industry | clients | industry | "—" |
| Client status | clients | status | "lead" |
| Primary contact name | crm_contacts | name where is_primary = true | "—" |
| Primary contact email | crm_contacts | email where is_primary = true | "—" |
| Primary contact phone | crm_contacts | phone | null |
| Contact role | crm_contacts | role | null |
| Wizard session ID | wizard_sessions | id where org_id = client.org_id | null |
| Wizard status | wizard_sessions | status | null |
| Wizard current step | wizard_sessions | current_step | null |
| Completed wizard steps | wizard_answers | count of step_numbers per session_id | [] |
| Active project count | projects | count where org_id = client.org_id and status = active | 0 |
| Last activity date | activities | max(created_at) where org_id | null |
| Assigned consultant | team_members | name, avatar_url where assigned_client_id | null |
| Health score | Computed | See health score formula below | 50 |
| Total revenue | projects | sum of budget where org_id | 0 |
| Readiness score | wizard_answers | ai_results.readiness.overallScore where step_number = 4 | null |
| All contacts | crm_contacts | all where client_id | [] |
| All projects | projects | all where org_id = client.org_id | [] |
| Recent activities | activities | last 20 where org_id, ordered desc | Derived from wizard timestamps |

---

## HEALTH SCORE FORMULA

Health score is a 0-100 composite metric computed server-side.

Components:
- Activity frequency (30% weight): how many activities in the last 14 days, normalized to 0-100 (0 activities = 0, 5+ activities = 100)
- Wizard completion rate (30% weight): completed steps / 5 * 100
- Milestone completion rate (20% weight): completed milestones / total milestones * 100 (0 if no project)
- Recency (20% weight): days since last activity, inverted (0 days = 100, 30+ days = 0)

Default: 50 if insufficient data (no activities at all).

Color coding: green (>80), amber (50-80), red (<50). Tooltip on hover explains the score components.

---

## CLIENT STATUS LIFECYCLE

```
Lead → Onboarding → Active → Delivered → (Churned)
  │                                            ↑
  └──── (Churned) ←────────────────────────────┘
```

| Status | Badge Color | Trigger |
|--------|-------------|---------|
| Lead | gray bg #F0F0EC, gray text #6B6B63 | Manual creation or wizard session started |
| Onboarding | blue bg rgba(59,130,246,0.15), blue text #1E40AF | Wizard completed (all 5 steps) |
| Active | green bg #E6F4ED, green text #00875A | First project created |
| Delivered | teal bg rgba(10,33,31,0.15), teal text #1A1A1A | All project phases completed |
| Churned | red bg rgba(220,38,38,0.15), red text #DC2626 | Manual (inactive 60+ days suggested) |

Auto-transitions: Lead to Onboarding when wizard completes. Onboarding to Active when project is created. Active to Delivered when all phases complete. Churn is always manual.

---

## UI COMPONENT TREE

```
DashboardLayout
├── DashboardSidebar (shared, Clients nav active)
├── DashboardHeader (shared)
└── ClientManagement (page)
    ├── PageHeader
    │   ├── h1 "Client Management" (Georgia serif, 24px)
    │   ├── ClientCountBadge ("18 clients")
    │   └── Button "+ Add Client" → opens QuickAddClientForm
    ├── FilterBar
    │   ├── SearchInput (debounced 300ms, filters name + email)
    │   ├── FilterChip (Status: Lead | Active | Onboarding | Delivered | Churned)
    │   ├── FilterChip (Industry: dynamic from data)
    │   ├── FilterChip (Consultant: from team_members)
    │   └── ClearFiltersButton
    ├── BulkActionToolbar (visible when selectedRows.size > 0)
    │   ├── SelectedCount ("3 clients selected")
    │   ├── Button "Export CSV"
    │   ├── Button "Assign Consultant" (dropdown)
    │   └── Button "Change Status" (dropdown)
    ├── ClientTable
    │   ├── TableHeader (sortable columns, select-all checkbox)
    │   └── TableBody
    │       └── ClientRow[] (checkbox, name, contact, industry, status badge,
    │           wizard dots, project count, last activity, health score, consultant)
    ├── Pagination
    │   ├── PageSizeSelect (10 | 25 | 50)
    │   ├── ShowingLabel ("Showing 1-10 of 18")
    │   └── PageButtons (prev, page numbers, next)
    ├── ClientDetailPanel (Sheet, 400px right slide-out)
    │   ├── ClientHeader (name, status badge, industry, size, health, revenue)
    │   ├── Tabs
    │   │   ├── Overview (WizardProgressDots expanded, ReadinessScoreMini, KeyMetrics)
    │   │   ├── Contacts (ContactCard[] with name, email, phone, role, primary badge)
    │   │   ├── Projects (ProjectMiniCard[] with name, phase, progress)
    │   │   └── Activity (EngagementTimeline with vertical dot-connected events)
    │   └── Footer ([View Full Profile →] [Schedule Call])
    └── QuickAddClientForm (Dialog modal)
        ├── Input "Company Name" (required)
        ├── Input "Primary Contact Email" (required)
        ├── Select "Industry" (from INDUSTRIES in wizardData)
        ├── Select "Status" (default: Lead)
        ├── Input "Contact Name"
        ├── Input "Phone" (optional)
        └── Button "Create Client"
```

---

## WIZARD PROGRESS DOTS — Detail

Compact mode (table cell, 80px): 5 circles, 12px diameter, 4px gap. Filled = #00875A, Empty = #E8E8E4.

Expanded mode (detail panel): 5 rows, each with a 16px circle, connecting vertical line (2px #E8E8E4), step label, and status text. Filled circle = #00875A. Empty circle = #E8E8E4 border, transparent fill. If wizard abandoned at a step, that step shows amber circle with "Abandoned" label.

---

## INTERACTION PATTERNS

- Search debounces 300ms, filters client name and contact email
- Filter chips are toggle buttons, click to activate, click again to deactivate
- Multiple filters combine with AND logic (status Active AND industry Healthcare)
- Column headers click to sort ascending, click again for descending, arrow indicator shows direction
- Row click opens Sheet detail panel from right (400px width, dark backdrop)
- Row checkbox toggles selection, header checkbox toggles select-all on current page
- Bulk action toolbar slides up from bottom when 1+ rows selected
- Quick-add opens a centered Dialog modal, submit creates client + optional crm_contact
- Pagination resets selected rows when changing page
- Filter changes reset to page 1
- URL search params sync with filters, sort, and page for shareable links

---

## USER JOURNEYS

### Journey 1: Identifying Disengaged Clients

Agency owner opens /app/clients. Sorts by "Last Activity" ascending. Three clients at the bottom have not had activity in 14+ days. She clicks "TechNova Solutions" — the detail panel shows wizard completed through Step 4 but no project (Step 5 abandoned). She selects TechNova plus two other inactive clients, clicks "Assign Consultant" from the bulk toolbar, assigns her senior consultant for follow-up.

### Journey 2: Pre-Call Preparation

Consultant filters by industry "Healthcare". Three clients appear. She clicks GreenLeaf Healthcare. Overview tab shows: wizard fully completed, readiness score 78, 1 active project in Phase 2. Activity tab shows last interaction was a milestone completion 3 days ago. Contacts tab shows Dr. Mike Chen (CEO) and Lisa Park (Operations). Full context for the strategy call.

### Journey 3: New Lead Intake

Business development clicks "+ Add Client". Fills in "Fresh Bites Group", industry "Food & Beverage", status "Lead", primary contact "alex@freshbites.com". The client appears in the table with status badge "Lead" and 5 empty wizard dots. She sends the wizard link. Two days later, dots show Steps 1 and 2 completed — the lead is engaging.

### Journey 4: Portfolio Review

Agency owner opens /app/clients with no filters. Scans the Health column. Three clients below 50 (red): TechNova (32), Fresh Bites (45), and a third. She sorts by Health ascending. Bulk-selects the three lowest-health clients. Clicks "Change Status" and marks two as "Churned" since they have been unresponsive for 60+ days. The remaining one gets assigned to a consultant for a rescue call.

---

## AI FEATURES

- Client health prediction: AI scores each client 0-100 based on activity frequency, wizard completion, milestone progress, and time since last interaction
- Churn risk alerts: highlight clients with declining engagement (less frequent logins, stalled wizard, overdue milestones)
- Upgrade likelihood: clients with high readiness score + completed Phase 1 + high ROI projections flagged as "likely to upgrade"
- Auto-generated client summary for pre-call preparation: one paragraph summarizing wizard data, readiness score, current project phase, and key findings
- Smart consultant matching: suggest best consultant for a client based on industry expertise and current workload

---

## LOADING, ERROR, EMPTY STATES

### Loading

Table shows 5 skeleton rows with pulsing gray bars for each column. Filter bar renders but inputs are disabled. Pagination shows "Loading..."

### Error

If the client list fetch fails, show a centered error card: "Unable to load client data. Check your connection and try again." with a Retry button. Table area is empty.

### Empty — No Clients

"No clients yet. Clients are created automatically when someone starts the wizard, or you can add one manually." with a [+ Add Client] CTA.

### Empty — No Filter Results

"No clients match your filters." with a [Clear Filters] button.

---

## BACKEND WIRING

### Edge Function Routes

| Method | Route | Purpose |
|--------|-------|---------|
| POST | /dashboard/clients | Paginated client list with filters and sort |
| POST | /dashboard/clients/:id | Single client detail with contacts, projects, activities |
| POST | /dashboard/clients/create | Create new client + optional contact |
| PUT | /dashboard/clients/status | Bulk update client status |
| PUT | /dashboard/clients/assign | Bulk assign consultant |
| POST | /dashboard/clients/export | Export selected clients as CSV |
| POST | /dashboard/clients/health | Recompute health scores |

### Frontend Hooks

useClients(filters, sort, pagination): returns paginated client list, total count, loading, error, refresh.

useClientDetail(clientId): returns full client profile with contacts, projects, activities, loading, error.

useClientMutations(): returns createClient, updateStatus, assignConsultant, exportCSV functions with loading state.

### Data Fetching

useClients calls POST /dashboard/clients with filters, sort column/direction, page, and page size. The edge function queries clients with joins to crm_contacts (primary), wizard_sessions, wizard_answers (step count), projects (count), activities (max date), and team_members (consultant). Health score is computed in the handler.

useClientDetail calls POST /dashboard/clients/:id for a single client with all contacts, all projects, recent 20 activities, wizard progress, and readiness score.

Refetch triggers: after createClient, updateStatus, or assignConsultant mutations, call refresh on useClients.

### MVP Without Tables

Before the clients, crm_contacts, and team_members tables exist, derive client data from wizard_sessions. Each wizard session with a unique user_id or email becomes a "client" row. The company name comes from wizard_answers step 1 answers.companyName. Industry from step 1 answers.industry. Wizard progress from step completion. No contacts, no consultant assignment, no bulk actions — just a read-only list of wizard users with their progress.

---

## ACCEPTANCE CRITERIA

- Client table renders at /app/clients with all specified columns
- Search filters by client name and contact email with 300ms debounce
- Filter chips for status (5 values), industry (dynamic), and consultant work
- Column headers are sortable with direction indicator
- Row click opens Sheet detail panel with Overview, Contacts, Projects, Activity tabs
- WizardProgressDots show 5 circles with correct filled/empty state per wizard_answers data
- ClientStatusBadge renders correct color per status
- Quick-add form creates client in clients table and optional crm_contacts row
- Bulk action toolbar appears when 1+ rows selected
- Pagination works with 10/25/50 page sizes
- Health score displays as color-coded number (green >80, amber 50-80, red <50)
- Empty state shows message when no clients exist
- Loading state shows skeleton table rows
- Mobile: table replaced with stacked client cards
- Filters, sort, and page persist in URL search params
