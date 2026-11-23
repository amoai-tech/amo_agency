---
id: 033-financial-dashboard
diagram_id: DASH-09
prd_section: Dashboard
title: Financial dashboard — revenue tracking, invoices, payments, and project economics
skill: frontend
phase: MEDIUM
priority: P2
status: Not Started
owner: Frontend
dependencies:
  - 027-project-delivery-dashboard
estimated_effort: L
percent_complete: 0
area: agency-dashboard
wizard_step: null
schema_tables: [invoices, payments, projects, clients, crm_deals, milestones]
figma_prompt: prompts/033-financial-dashboard.md
---

# 033 — Financial Dashboard

## Summary Table

| Field            | Value                                                          |
| ---------------- | -------------------------------------------------------------- |
| **ID**           | 033-financial-dashboard                                        |
| **Diagram ID**   | DASH-09                                                        |
| **Section**      | Dashboard                                                      |
| **Phase**        | MEDIUM                                                         |
| **Priority**     | P2                                                             |
| **Effort**       | L (Large)                                                      |
| **Owner**        | Frontend                                                       |
| **Dependencies** | 027-project-delivery-dashboard                                 |
| **Schema**       | invoices, payments, projects, clients, crm_deals, milestones   |
| **Wizard Step**  | None (uses investment tiers from wizard Step 3 as initial budget) |

---

## Description

**Situation.** The agency sells AI transformation services at investment tiers defined during wizard Step 3. A client selects a tier, the roadmap is generated with phase-level cost estimates, and the engagement begins. From that point forward, money flows: invoices are created at milestones, payments are collected, and the agency needs to track whether each project is profitable and whether the overall business is growing.

**Why it matters.** Revenue is the heartbeat of the agency. Without a financial dashboard, the owner relies on spreadsheets and bank statements to answer basic questions: How much revenue did we collect this month? Which invoices are overdue? Is the Acme Retail project profitable? What is our pipeline value? These questions need instant answers, not 30-minute spreadsheet sessions. A financial dashboard turns raw invoice and payment data into actionable business intelligence.

**What exists.** The database has `invoices` (amount, status, due_date, client_id, project_id), `payments` (amount, invoice_id, payment_date, method), `projects` (with budget derived from roadmap phases), `crm_deals` (value representing total engagement value), and `milestones` (which often correspond to billing triggers). The wizard Step 3 investment tier seeds the initial project budget.

**The build.** A financial dashboard with four layers: (1) a metrics row showing MRR, revenue this period, outstanding balance, and overdue amount; (2) an invoice management table with full lifecycle tracking (draft -> sent -> paid -> overdue); (3) a payment timeline showing collection history; (4) analytics charts showing revenue by client, revenue by service, and project profitability. Quick-create invoice from milestone completion streamlines billing.

**Example.** The agency owner opens the Financial dashboard on Monday morning. The metrics row shows: $47,500 MRR, $62,000 collected this month, $18,500 outstanding, $4,200 overdue. They click the overdue amount and see two invoices: Acme Retail Phase 2 ($2,700, 5 days overdue) and BrightPath Setup ($1,500, 3 days overdue). They send payment reminders with one click each. Then they check the profitability chart and see that e-commerce projects have a 42% margin while healthcare projects are at 28%, prompting a pricing review.

---

## User Stories

- As an **agency owner**, I want to see total revenue, outstanding invoices, and overdue amounts at a glance so I understand the financial health of the business instantly.
- As an **agency owner**, I want to track revenue by client and by service type so I can identify my most profitable segments.
- As a **consultant**, I want to create invoices directly from milestone completions so billing is tied to delivery progress.
- As an **agency owner**, I want to see project profitability (budget vs actual) so I can adjust pricing for future engagements.
- As a **finance team member**, I want to manage the full invoice lifecycle (draft, send, mark paid, flag overdue) from one interface.
- As an **agency owner**, I want revenue forecasting based on pipeline deals so I can plan cash flow and hiring.
- As a **business owner** (client), I want to see my invoices and payment history so I have transparency into what I owe and what I have paid.

---

## Goals & Acceptance Criteria

- [ ] Metrics row displays 4 cards: MRR (monthly recurring revenue), revenue this month, outstanding balance, overdue amount — each with trend indicator (up/down arrow + percentage vs last period)
- [ ] Invoice table shows: invoice number, client name, project name, amount, status (draft/sent/paid/overdue), issue date, due date, payment date (if paid), and action buttons
- [ ] Invoice statuses are color-coded: draft (gray), sent (blue), paid (#84CC16 lime), overdue (red)
- [ ] Quick-filter buttons above invoice table: All, Draft, Sent, Paid, Overdue — with count badges
- [ ] "Create Invoice" modal allows selecting client, project, milestone (auto-populates amount from milestone/roadmap estimate), due date, and line items
- [ ] Quick-create: when a milestone is marked complete, a prompt appears to create an invoice with pre-filled data from the roadmap phase estimated_cost
- [ ] Payment tracking per invoice: record payment amount, date, method (bank transfer, credit card, check), and notes
- [ ] Revenue by client bar chart (Recharts) showing top 10 clients by total paid amount, filterable by date range
- [ ] Revenue by service/system pie chart showing revenue distribution across AI systems sold
- [ ] Project profitability table: project name, budget (from roadmap total_investment), invoiced amount, paid amount, margin percentage
- [ ] Overdue invoice alert banner at the top of the page when any invoice is past due
- [ ] "Send Reminder" button on overdue invoices that logs an activity and triggers a notification
- [ ] Date range picker (this month, this quarter, this year, custom) that filters all charts and the metrics row
- [ ] Revenue trend line chart showing monthly revenue over the past 12 months
- [ ] AI revenue forecast line extending 3 months into the future based on pipeline deal values and historical collection rates
- [ ] Page follows design system: #F1EEEA background, #0A211F text, #84CC16 accents, Playfair Display headings, Lora body, 1200px max-width, card-based, no shadows, no gradients

---

## Wiring Plan

| Data need                         | Source table(s)              | Query / logic                                                                                   |
| --------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------- |
| MRR calculation                   | `invoices`, `payments`       | Sum of paid amounts for recurring invoices in current month, or total paid / months active       |
| Revenue this period               | `payments`                   | `SELECT SUM(amount) FROM payments WHERE payment_date BETWEEN ? AND ?`                           |
| Outstanding balance               | `invoices`                   | `SELECT SUM(amount) FROM invoices WHERE status IN ('sent') AND due_date >= now()`               |
| Overdue amount                    | `invoices`                   | `SELECT SUM(amount) FROM invoices WHERE status = 'sent' AND due_date < now()`                   |
| Invoice list                      | `invoices`, `clients`, `projects` | `SELECT i.*, c.name as client_name, p.name as project_name FROM invoices i JOIN clients c ON i.client_id = c.id JOIN projects p ON i.project_id = p.id ORDER BY i.created_at DESC` |
| Payment history                   | `payments`, `invoices`       | `SELECT pay.*, i.invoice_number FROM payments pay JOIN invoices i ON pay.invoice_id = i.id ORDER BY pay.payment_date DESC` |
| Revenue by client                 | `payments`, `invoices`, `clients` | Aggregate paid amounts grouped by client_id                                                    |
| Revenue by service                | `payments`, `invoices`, `project_services`, `services` | Join through project to services, aggregate by service name                     |
| Project profitability             | `projects`, `roadmaps`, `invoices`, `payments` | Budget from roadmap.total_investment, invoiced from SUM(invoices.amount), paid from SUM(payments.amount) |
| Milestone-based invoice creation  | `milestones`, `roadmap_phases` | When milestone status = 'completed', fetch phase estimated_cost for invoice pre-fill           |
| Pipeline forecast                 | `crm_deals`                  | `SELECT SUM(value) FROM crm_deals WHERE stage_id IN (active stages) GROUP BY expected_close_month` |
| Revenue trend                     | `payments`                   | `SELECT DATE_TRUNC('month', payment_date) as month, SUM(amount) FROM payments GROUP BY month ORDER BY month` |

---

## Screen Purpose

Financial overview for the agency — revenue tracking, invoice management, payment status, and project profitability. Connects CRM deal values to actual invoicing and payment collection. Investment tiers from wizard Step 3 feed initial project budgets, and this dashboard tracks the financial reality against those estimates throughout the engagement lifecycle.

---

## Target User

Agency owner monitoring business financial health and making pricing/growth decisions. Finance team managing invoice creation, sending, and payment collection. Consultants tracking their project budgets against actuals. Business owners (clients) viewing their invoice and payment history for transparency.

---

## Core Features

1. **Revenue metrics row** — Four cards at the top: MRR, revenue this month (or selected period), outstanding balance, and overdue amount. Each card shows the current value, a trend arrow (up/down vs prior period), and the percentage change. Overdue card turns red background when amount > 0.
2. **Invoice management table** — Full-lifecycle invoice tracking with columns: invoice number, client, project, amount, status badge, issue date, due date, payment date. Sortable on any column. Row actions: edit, send, record payment, send reminder, delete. Bulk actions for sending multiple invoices.
3. **Payment tracking** — Per-invoice payment recording with amount, date, method, and notes. Partial payments supported (invoice shows remaining balance). Payment timeline visualization showing collection history over time.
4. **Revenue analytics charts** — Revenue by client (horizontal bar chart, top 10), revenue by service/system (donut chart), and monthly revenue trend (line chart with 12-month history). All charts built with Recharts, all filterable by date range.
5. **Project profitability** — Table showing each project's budget (from roadmap), total invoiced, total paid, and margin percentage. Color-coded: green for margin > 30%, amber for 15-30%, red for < 15%.
6. **Overdue management** — Alert banner when overdue invoices exist. One-click "Send Reminder" that logs an activity in the `activities` table and triggers a notification. Escalation indicator for invoices overdue by 7+, 14+, 30+ days.
7. **Quick-create invoice** — When a milestone is marked complete on the project delivery dashboard, a toast suggests creating an invoice. Clicking it opens the create modal pre-filled with the project, client, milestone name as description, and estimated_cost from the roadmap phase.
8. **Revenue forecasting** — AI-powered forecast line extending 3 months beyond historical data, based on pipeline deal values, stage conversion probabilities, and historical payment timing.

---

## Data Displayed

- **Metrics row**: MRR ($, trend%), revenue this period ($, trend%), outstanding ($), overdue ($, count of invoices)
- **Invoice table**: Invoice #, client name, project name, amount ($), status badge, issue date, due date, payment date, actions
- **Payment records**: Payment amount, invoice reference, date, method icon, recorded by
- **Revenue by client chart**: Client name (y-axis), total paid amount (x-axis bar), percentage of total
- **Revenue by service chart**: Service/system name (segments), amount per segment, percentage
- **Revenue trend chart**: Month (x-axis), revenue amount (y-axis), with forecast extension in dashed line
- **Profitability table**: Project name, client, budget, invoiced, paid, margin %, status indicator

---

## UI Components

| Component               | Description                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| `RevenueMetricsRow`     | 4-card horizontal metrics strip with values, trends, and period labels    |
| `InvoiceTable`          | Sortable, filterable table with status badges and row-level actions        |
| `InvoiceStatusBadge`    | Color-coded badge: gray (draft), blue (sent), #84CC16 (paid), red (overdue) |
| `CreateInvoiceModal`    | Form modal with client/project/milestone selectors, line items, due date   |
| `RecordPaymentModal`    | Form modal for recording payment: amount, date, method selector, notes     |
| `ProfitabilityChart`    | Table with color-coded margin indicators (Recharts-powered sparklines)     |
| `RevenueByClientChart`  | Horizontal bar chart (Recharts) showing top clients by revenue             |
| `RevenueByServiceChart` | Donut/pie chart (Recharts) showing revenue distribution by service         |
| `RevenueTrendChart`     | Line chart (Recharts) with historical and forecast lines                   |
| `OverdueAlertBanner`    | Red-tinted banner showing overdue count and total, with "View" action      |
| `PaymentTimeline`       | Vertical timeline of payment events with amounts and dates                 |
| `DateRangePicker`       | Period selector: this month, quarter, year, custom date range              |
| `QuickInvoiceToast`     | Toast notification suggesting invoice creation on milestone completion      |

---

## Layout Structure

```
+---------------------------------------------------------------+
| Sidebar (240px) | Main Content                                 |
|                 | +-------------------------------------------+ |
| [Navigation]    | | [Date Range Picker]     [+ Create Invoice]| |
|                 | +-------------------------------------------+ |
|                 | | Overdue Alert Banner (if applicable)      | |
|                 | +-------------------------------------------+ |
|                 | | Metrics Row                               | |
|                 | | [MRR] [Revenue] [Outstanding] [Overdue]   | |
|                 | +-------------------------------------------+ |
|                 | +--------------------+----------------------+ |
|                 | | Invoice Table      | Revenue Trend Chart  | |
|                 | | (60% width)        | (40% width)          | |
|                 | |                    |----------------------| |
|                 | | [Filter: All|Draft | Revenue by Client    | |
|                 | |  |Sent|Paid|Overdue]| (bar chart)          | |
|                 | |                    |----------------------| |
|                 | | Invoice rows...    | Revenue by Service   | |
|                 | |                    | (donut chart)        | |
|                 | +--------------------+----------------------+ |
|                 | +-------------------------------------------+ |
|                 | | Project Profitability Table               | |
|                 | | Project | Budget | Invoiced | Paid | Margin| |
|                 | +-------------------------------------------+ |
+---------------------------------------------------------------+
```

- **Sidebar**: 240px, standard dashboard navigation
- **Main content**: Fills remaining width, max-width 1200px, centered
- **Metrics row**: 4 equal-width cards, full width
- **Two-column section**: Invoice table (60%) + stacked charts (40%)
- **Profitability table**: Full width, below the two-column section
- **Background**: #F1EEEA, cards #FFFFFF, borders #D4CFC8

---

## Interaction Patterns

- **Date range change**: Select period from picker -> all metrics, charts, and tables re-filter to the selected range with smooth data transition
- **Filter invoices**: Click status filter button (All/Draft/Sent/Paid/Overdue) -> table filters instantly, count badges update
- **Create invoice**: Click "+ Create Invoice" -> modal opens -> select client and project -> optionally link to milestone (auto-populates amount) -> add line items -> set due date -> save as draft or send immediately
- **Record payment**: Click "Record Payment" on a sent invoice -> modal opens -> enter amount, date, method -> save -> invoice status updates to "paid" (if full) or shows remaining balance (if partial)
- **Send reminder**: Click "Send Reminder" on overdue invoice -> confirmation dialog -> reminder sent -> activity logged -> last reminder date updated on invoice row
- **Chart drill-down**: Click a bar in the revenue by client chart -> invoice table filters to that client's invoices
- **Profitability review**: Click a row in the profitability table -> expands to show per-phase breakdown (roadmap phase estimated_cost vs actual invoiced)

---

## Example User Workflows

**Workflow 1: Monday morning financial review**
1. Agency owner opens Financial dashboard
2. Date range is set to "This Month" by default
3. Sees metrics: $47,500 MRR (+8%), $62,000 revenue (+12%), $18,500 outstanding, $4,200 overdue
4. Clicks overdue amount -> invoice table filters to 2 overdue invoices
5. Sends reminders for both with one click each
6. Switches to "This Quarter" -> revenue trend chart shows steady growth
7. Checks profitability table -> notices healthcare projects have low margin -> notes to review pricing

**Workflow 2: Invoice creation from milestone**
1. Consultant marks "Phase 1 Complete" milestone on the project delivery dashboard
2. Toast notification appears: "Phase 1 complete. Create invoice for $8,500?"
3. Consultant clicks -> Create Invoice modal opens pre-filled: client "Acme Retail", project "AI Transformation", amount $8,500 (from roadmap_phases.estimated_cost), description "Phase 1: Support Engine Implementation"
4. Consultant adjusts due date to net-30, adds a line item note
5. Clicks "Save & Send" -> invoice sent to client, logged in activities

**Workflow 3: Payment collection**
1. Finance team member opens Financial dashboard, filters to "Sent" invoices
2. Cross-references with bank statement: Acme Retail paid $8,500 yesterday
3. Clicks "Record Payment" on the Acme invoice -> enters amount $8,500, date, method "Bank Transfer"
4. Invoice status changes to "Paid" (green), metrics row updates in real time
5. Revenue by client chart updates to reflect the new payment

---

## AI Features

1. **Revenue forecasting** — Analyzes historical payment data, current pipeline deal values, and stage conversion rates to project revenue 3 months forward. Forecast appears as a dashed line extension on the revenue trend chart with a confidence band.
2. **Auto-generate invoices at milestones** — When a milestone is completed, AI suggests creating an invoice with pre-populated data. If the workflow automation dashboard (031) is configured, this can be fully automatic.
3. **Payment reminder scheduling** — AI determines optimal reminder timing based on client payment history. Clients who typically pay within 3 days get reminders at day 2 after due date. Clients who are habitually late get reminders at day 1.
4. **Profitability insights** — AI analyzes profitability across service types and client segments, surfacing insights like "E-commerce projects average 42% margin while healthcare averages 28%. Consider adjusting healthcare pricing."
5. **Cash flow prediction** — Based on invoice due dates and client payment patterns, AI predicts weekly cash inflows for the next 4 weeks.

---

## Data Sources

| Source Table       | Data Used                                                              |
| ------------------ | ---------------------------------------------------------------------- |
| `invoices`         | Invoice records: amount, status, dates, client_id, project_id          |
| `payments`         | Payment records: amount, date, method, invoice_id                      |
| `projects`         | Project names, budget (from linked roadmap)                            |
| `clients`          | Client names for grouping and display                                  |
| `crm_deals`        | Deal values for pipeline-based revenue forecasting                     |
| `milestones`       | Milestone completion triggers for invoice creation                     |
| `roadmaps`         | Total investment for project budget baseline                           |
| `roadmap_phases`   | Per-phase estimated_cost for invoice pre-fill amounts                  |
| `project_services` | Service associations for revenue-by-service analysis                   |
| `services`         | Service names for chart labels                                         |
| `activities`       | Logging invoice sends, payment reminders, and payment recordings       |

---

## Automation Opportunities

- **Auto-invoice on milestone**: When a milestone's status changes to "completed", automatically generate a draft invoice pre-filled with the roadmap phase cost estimate and notify the finance team for review.
- **Overdue escalation ladder**: Day 1 overdue -> email reminder. Day 7 -> second reminder + flag in dashboard. Day 14 -> escalate to agency owner. Day 30 -> escalate to collections workflow.
- **Payment reconciliation**: Match incoming bank transfers to open invoices based on amount and client reference, auto-marking invoices as paid.
- **Monthly financial digest**: Auto-generated email to the agency owner on the 1st of each month summarizing: total revenue, new invoices, outstanding balance, overdue change, top clients, and profitability highlights.
- **Tax preparation export**: Quarterly export of all invoices and payments in CSV format for accounting software import.

---

## Visual Hierarchy

1. **Primary focus**: Revenue metrics row at top — four numbers that answer "how is the business doing financially right now"
2. **Secondary focus**: Invoice table (left) — the operational workhorse where invoices are managed daily
3. **Tertiary focus**: Revenue charts (right) — analytical context showing where money comes from and trends over time
4. **Supporting elements**: Profitability table at bottom — strategic view for pricing and margin decisions
5. **Alert layer**: Overdue banner (red-tinted, above metrics row) — demands attention when money is past due
6. **Typography**: Playfair Display for "Financials" page heading, metric card labels, and chart titles. Lora for all table content, form labels, and body text.
7. **Color coding**: #84CC16 for paid status and positive trends. Red (#DC2626) for overdue status, negative trends, and low margins. Blue (#3B82F6) for sent/pending. Gray (#9CA3AF) for draft. #0A211F for primary text. #D4CFC8 for table borders and dividers.
8. **Number formatting**: All currency values formatted with $ prefix, comma separators, and 2 decimal places. Percentages show 1 decimal place. Trend arrows use green (up/positive) and red (down/negative).

---

## Frontend Wiring

### Component Tree

```
FinancialDashboardPage
├── DateRangePicker                        # controls global date filter
├── OverdueAlertBanner                     # conditional — shown when overdue > 0
├── RevenueMetricsRow
│   ├── MetricCard (MRR)
│   ├── MetricCard (Revenue This Period)
│   ├── MetricCard (Outstanding Balance)
│   └── MetricCard (Overdue Amount)
├── div.grid.grid-cols-[3fr_2fr]           # two-column layout
│   ├── section (left — 60%)
│   │   ├── InvoiceFilterBar               # All | Draft | Sent | Paid | Overdue
│   │   └── InvoiceTable
│   │       ├── InvoiceRow[]
│   │       │   └── InvoiceStatusBadge
│   │       └── Pagination
│   └── section (right — 40%)
│       ├── RevenueTrendChart               # Recharts LineChart
│       ├── RevenueByClientChart            # Recharts BarChart (horizontal)
│       └── RevenueByServiceChart           # Recharts PieChart (donut)
├── ProfitabilityTable
│   └── ProfitabilityRow[]
├── CreateInvoiceModal                     # triggered by "+ Create Invoice" button
│   ├── ClientProjectSelector
│   ├── MilestoneSelector                  # auto-populates amount
│   ├── LineItemsEditor
│   └── DueDatePicker
├── RecordPaymentModal                     # triggered from invoice row action
├── QuickInvoiceToast                      # appears on milestone completion event
└── PaymentTimeline                        # slide-out or expandable section
```

### TypeScript Interfaces

```typescript
interface Invoice {
  id: string;
  invoice_number: string;
  client_id: string;
  project_id: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  issue_date: string;       // ISO date
  due_date: string;         // ISO date
  payment_date: string | null;
  line_items: LineItem[];
  created_at: string;
  updated_at: string;
  // joined fields
  client_name?: string;
  project_name?: string;
}

interface LineItem {
  description: string;
  amount: number;
  quantity: number;
}

interface Payment {
  id: string;
  invoice_id: string;
  amount: number;
  payment_date: string;
  method: 'bank_transfer' | 'credit_card' | 'check' | 'other';
  notes: string | null;
  recorded_by: string;
  created_at: string;
  // joined
  invoice_number?: string;
}

interface RevenueMetrics {
  mrr: number;
  mrr_trend: number;              // percentage change vs prior period
  revenue_this_period: number;
  revenue_trend: number;
  outstanding: number;
  overdue: number;
  overdue_count: number;
}

interface ProjectProfitability {
  project_id: string;
  project_name: string;
  client_name: string;
  budget: number;            // from roadmap total_investment
  invoiced: number;
  paid: number;
  margin_pct: number;
}

interface RevenueByClient {
  client_id: string;
  client_name: string;
  total_paid: number;
  pct_of_total: number;
}

interface RevenueByService {
  service_name: string;
  total_paid: number;
  pct_of_total: number;
}

interface RevenueTrendPoint {
  month: string;             // YYYY-MM
  amount: number;
  is_forecast: boolean;
}

interface DateRange {
  start: string;             // ISO date
  end: string;               // ISO date
  preset: 'this_month' | 'this_quarter' | 'this_year' | 'custom';
}

type InvoiceStatusFilter = 'all' | 'draft' | 'sent' | 'paid' | 'overdue';
```

### Custom Hooks

```typescript
// Fetches revenue metrics for the selected date range
function useRevenueMetrics(dateRange: DateRange): {
  metrics: RevenueMetrics | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

// Fetches and manages the invoice list with filtering/sorting
function useInvoices(filters: {
  status: InvoiceStatusFilter;
  dateRange: DateRange;
  page: number;
  sortBy: string;
  sortDir: 'asc' | 'desc';
}): {
  invoices: Invoice[];
  total: number;
  loading: boolean;
  error: string | null;
  createInvoice: (data: Partial<Invoice>) => Promise<Invoice>;
  updateInvoice: (id: string, data: Partial<Invoice>) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  sendReminder: (id: string) => Promise<void>;
};

// Fetches payment history and records new payments
function usePayments(invoiceId?: string): {
  payments: Payment[];
  loading: boolean;
  recordPayment: (data: Omit<Payment, 'id' | 'created_at'>) => Promise<void>;
};

// Fetches chart data for revenue analytics
function useRevenueCharts(dateRange: DateRange): {
  byClient: RevenueByClient[];
  byService: RevenueByService[];
  trend: RevenueTrendPoint[];
  loading: boolean;
};

// Fetches project profitability data
function useProfitability(dateRange: DateRange): {
  projects: ProjectProfitability[];
  loading: boolean;
};
```

### State Management

| State                   | Location          | Notes                                                        |
| ----------------------- | ----------------- | ------------------------------------------------------------ |
| `dateRange`             | URL search params | `?start=2026-01-01&end=2026-01-31&preset=this_month` — shared across all sections |
| `statusFilter`          | `useState`        | Local to `InvoiceFilterBar` + `InvoiceTable`                 |
| `selectedInvoiceId`     | `useState`        | Controls which invoice row is expanded or has modal open      |
| `createModalOpen`       | `useState`        | Controls `CreateInvoiceModal` visibility                      |
| `paymentModalOpen`      | `useState`        | Controls `RecordPaymentModal` visibility                      |
| `sortColumn` / `sortDir`| `useState`        | Local to `InvoiceTable` header click sorting                  |
| `page`                  | `useState`        | Pagination cursor for invoice table                           |
| `chartClientFilter`     | `useState`        | Set when a bar in `RevenueByClientChart` is clicked — filters invoice table |

### Data Fetching Pattern

All hooks call the `api<T>()` helper from `src/lib/supabase.ts`:

```typescript
// useRevenueMetrics
api<RevenueMetrics>('/dashboard/financial/metrics', {
  method: 'POST',
  body: { start: dateRange.start, end: dateRange.end },
});

// useInvoices
api<{ invoices: Invoice[]; total: number }>('/dashboard/financial/invoices', {
  method: 'POST',
  body: { status, dateRange, page, sortBy, sortDir },
});

// usePayments
api<Payment[]>('/dashboard/financial/payments', {
  method: 'POST',
  body: { invoiceId },
});

// useRevenueCharts
api<{ byClient: RevenueByClient[]; byService: RevenueByService[]; trend: RevenueTrendPoint[] }>(
  '/dashboard/financial/charts',
  { method: 'POST', body: { start: dateRange.start, end: dateRange.end } }
);

// useProfitability
api<ProjectProfitability[]>('/dashboard/financial/profitability', {
  method: 'POST',
  body: { start: dateRange.start, end: dateRange.end },
});
```

No global cache library — each hook fetches on mount and when dependencies change. Mutations (create invoice, record payment) call the relevant API, then trigger `refetch()` on the parent data hooks via a shared `refreshKey` counter passed through props.

### Component Communication

- `DateRangePicker` writes to URL search params; all hooks read from the same parsed params via a shared `useDateRange()` hook.
- `InvoiceFilterBar` passes `statusFilter` down to `InvoiceTable` via props.
- `RevenueByClientChart` fires an `onBarClick(clientId)` callback that sets `chartClientFilter` in the page component, which is passed as a prop to `InvoiceTable` to add an additional client filter.
- `CreateInvoiceModal` receives an `onSuccess` callback that bumps a `refreshKey` state, causing `useInvoices` and `useRevenueMetrics` to refetch.
- `QuickInvoiceToast` listens for a custom event (`milestone-completed`) dispatched from the project delivery dashboard and renders a toast with a "Create Invoice" action.

---

## Backend Wiring

### New Edge Function Routes

| Method | Route                                  | Description                                       | Request Body                                                                 | Response Shape                                |
| ------ | -------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------- |
| POST   | `/dashboard/financial/metrics`         | Compute revenue metrics for a date range          | `{ start: string, end: string }`                                             | `RevenueMetrics`                              |
| POST   | `/dashboard/financial/invoices`        | List invoices with filters, sorting, pagination   | `{ status?, dateRange, page, sortBy, sortDir, clientId? }`                   | `{ invoices: Invoice[], total: number }`      |
| POST   | `/dashboard/financial/invoices/create` | Create a new invoice                              | `{ client_id, project_id, amount, due_date, line_items[], milestone_id? }`   | `{ invoice: Invoice }`                        |
| PUT    | `/dashboard/financial/invoices/:id`    | Update invoice (status, dates, line items)        | `{ status?, due_date?, line_items? }`                                        | `{ invoice: Invoice }`                        |
| DELETE | `/dashboard/financial/invoices/:id`    | Delete a draft invoice                            | -                                                                            | `{ success: boolean }`                        |
| POST   | `/dashboard/financial/invoices/:id/reminder` | Send payment reminder for an overdue invoice | `{ message?: string }`                                                       | `{ success: boolean, activity_id: string }`   |
| POST   | `/dashboard/financial/payments`        | List payments (optionally filtered by invoice)    | `{ invoiceId?: string }`                                                     | `Payment[]`                                   |
| POST   | `/dashboard/financial/payments/record` | Record a payment against an invoice               | `{ invoice_id, amount, payment_date, method, notes? }`                       | `{ payment: Payment, invoice: Invoice }`      |
| POST   | `/dashboard/financial/charts`          | Revenue chart data (by client, by service, trend) | `{ start: string, end: string }`                                             | `{ byClient, byService, trend }`              |
| POST   | `/dashboard/financial/profitability`   | Project profitability table data                  | `{ start: string, end: string }`                                             | `ProjectProfitability[]`                      |
| POST   | `/dashboard/financial/forecast`        | AI revenue forecast (3-month projection)          | `{ start: string, end: string }`                                             | `RevenueTrendPoint[]`                         |

### Supabase Client Queries

```typescript
// ── Revenue metrics ──
// MRR — sum of paid invoices in current month
const { data: mrrData } = await adminClient()
  .from('payments')
  .select('amount')
  .gte('payment_date', startOfMonth)
  .lte('payment_date', endOfMonth);

// Outstanding — unpaid invoices not yet overdue
const { data: outstanding } = await adminClient()
  .from('invoices')
  .select('amount')
  .eq('status', 'sent')
  .gte('due_date', new Date().toISOString());

// Overdue — unpaid invoices past due
const { data: overdue } = await adminClient()
  .from('invoices')
  .select('amount')
  .eq('status', 'sent')
  .lt('due_date', new Date().toISOString());

// ── Invoice list ──
const query = adminClient()
  .from('invoices')
  .select('*, clients(name), projects(name)', { count: 'exact' })
  .order(sortBy, { ascending: sortDir === 'asc' })
  .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

if (status !== 'all') query.eq('status', status);
if (clientId) query.eq('client_id', clientId);

// ── Revenue by client ──
const { data } = await adminClient()
  .from('payments')
  .select('amount, invoices(client_id, clients(name))')
  .gte('payment_date', start)
  .lte('payment_date', end);
// Aggregate in JS: group by client_id, sum amounts, sort desc, take top 10

// ── Revenue by service ──
const { data } = await adminClient()
  .from('payments')
  .select('amount, invoices(project_id, projects(project_services(services(name))))')
  .gte('payment_date', start)
  .lte('payment_date', end);
// Aggregate in JS: group by service name, sum amounts

// ── Revenue trend (monthly) ──
// Use Supabase RPC or raw SQL via adminClient().rpc('revenue_trend', { start, end })
// Fallback: fetch all payments in range, bucket by month in JS

// ── Project profitability ──
const { data: projects } = await adminClient()
  .from('projects')
  .select('id, name, clients(name), roadmaps(total_investment)')
  .eq('status', 'active');

// For each project, sum invoices and payments
const { data: invoiceTotals } = await adminClient()
  .from('invoices')
  .select('project_id, amount')
  .in('project_id', projectIds);

const { data: paymentTotals } = await adminClient()
  .from('payments')
  .select('amount, invoices!inner(project_id)')
  .in('invoices.project_id', projectIds);

// ── Pipeline forecast ──
const { data: deals } = await adminClient()
  .from('crm_deals')
  .select('value, expected_close_date, stage_id')
  .in('stage_id', activeStageIds);
```

### RLS Policies Needed

| Table       | Policy Name                    | Rule                                                                              |
| ----------- | ------------------------------ | --------------------------------------------------------------------------------- |
| `invoices`  | `agency_full_access`           | Allow all operations where `auth.jwt()->>'role' IN ('owner', 'admin', 'consultant')` |
| `invoices`  | `client_read_own`              | Allow SELECT where `client_id = (SELECT client_id FROM users WHERE id = auth.uid())` |
| `payments`  | `agency_full_access`           | Allow all operations where `auth.jwt()->>'role' IN ('owner', 'admin', 'consultant')` |
| `payments`  | `client_read_own`              | Allow SELECT where `invoice_id IN (SELECT id FROM invoices WHERE client_id = ...)` |
| `projects`  | (existing policies apply)      | —                                                                                 |
| `clients`   | (existing policies apply)      | —                                                                                 |

Note: Edge function routes use `adminClient()` (service role key, bypasses RLS) after verifying the JWT role in middleware. RLS policies are the safety net for direct Supabase client access on the frontend.

### API Response TypeScript Interfaces

```typescript
interface MetricsResponse {
  mrr: number;
  mrr_trend: number;
  revenue_this_period: number;
  revenue_trend: number;
  outstanding: number;
  overdue: number;
  overdue_count: number;
}

interface InvoiceListResponse {
  invoices: Invoice[];
  total: number;
}

interface CreateInvoiceResponse {
  invoice: Invoice;
}

interface RecordPaymentResponse {
  payment: Payment;
  invoice: Invoice;  // updated invoice with new status/remaining balance
}

interface ChartsResponse {
  byClient: RevenueByClient[];
  byService: RevenueByService[];
  trend: RevenueTrendPoint[];
}

interface ForecastResponse {
  forecast: RevenueTrendPoint[];  // is_forecast = true for all points
  confidence_band: { month: string; low: number; high: number }[];
}
```

### Edge Cases

| Scenario                        | Handling                                                                                       |
| ------------------------------- | ---------------------------------------------------------------------------------------------- |
| No invoices exist               | Metrics return all zeros with `0%` trends; invoice table shows empty state with "Create your first invoice" CTA |
| Partial payment                 | Payment amount < invoice amount: invoice stays `sent`, remaining balance shown on invoice row    |
| Overpayment                     | Reject at API level — payment amount cannot exceed invoice remaining balance                     |
| Unauthorized user               | Edge function verifies JWT; returns `401` with `{ error: "Unauthorized" }`                      |
| Client viewing another client's data | RLS blocks the query; API returns empty result set                                          |
| Deleted project on invoice      | Invoice retains `project_id` but displays "Deleted Project" if join returns null                 |
| Date range returns no data      | Charts render with empty axes and a "No data for this period" overlay                           |
| Invoice status transitions      | Server enforces valid transitions: draft->sent, sent->paid, sent->overdue (auto via cron)       |

---

## Detailed ASCII Wireframes

### Desktop Layout (1200px max-width)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│ HEADER BAR (sticky, 56px)                                                                       │
│  AMO AI          Dashboard  Projects  Clients  ...                         [Avatar ▾]    │
├────────────┬────────────────────────────────────────────────────────────────────────────────────┤
│            │                                                                                    │
│  SIDEBAR   │  ┌──────────────────────────────────────────────────────────────────────────────┐  │
│  (240px)   │  │  Financials                              [This Month ▾]  [+ Create Invoice]  │  │
│            │  │  ─────────────────────────────────────────────────────────────────────────────│  │
│ ┌────────┐ │  └──────────────────────────────────────────────────────────────────────────────┘  │
│ │Overview│ │                                                                                    │
│ ├────────┤ │  ┌──────────────────────────────────────────────────────────────────────────────┐  │
│ │Pipeline│ │  │ ⚠ 2 invoices overdue totaling $4,200 — oldest 5 days past due    [View →]   │  │
│ ├────────┤ │  └──────────────────────────────────────────────────────────────────────────────┘  │
│ │Projects│ │                                                                                    │
│ ├────────┤ │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                 │
│ │CRM     │ │  │ MRR         │ │ Revenue     │ │ Outstanding │ │ Overdue     │                 │
│ ├────────┤ │  │ $47,500     │ │ $62,000     │ │ $18,500     │ │ $4,200      │                 │
│ │▸Finance│ │  │ ▲ +8.2%     │ │ ▲ +12.1%    │ │ 6 invoices  │ │ 2 invoices  │                 │
│ ├────────┤ │  │ vs last mo  │ │ vs last mo  │ │             │ │ ██████ RED  │                 │
│ │Analytics│ │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘                 │
│ ├────────┤ │  ←──────────── 1200px max-width, 4 equal cards ────────────────→                  │
│ │Roadmap │ │                                                                                    │
│ ├────────┤ │  ┌──────────────────────────────┬───────────────────────────────┐                  │
│ │Systems │ │  │ Invoices              (60%)  │ Revenue Trend          (40%)  │                  │
│ └────────┘ │  │ ┌────┬────┬────┬────┬──────┐ │ ┌───────────────────────────┐ │                  │
│            │  │ │All │Dft │Sent│Paid│O.due │ │ │  $                        │ │                  │
│            │  │ │ 24 │ 3  │ 6  │ 13 │  2   │ │ │  70K ─           ╱──╮    │ │                  │
│            │  │ └────┴────┴────┴────┴──────┘ │ │  60K ─       ╱──╯   │    │ │                  │
│            │  │                               │ │  50K ─   ╱──╯      ╰╌╌╌ │ │                  │
│            │  │ # │Client    │Proj  │Amount  ││ │  40K ──╱╯     forecast→  │ │                  │
│            │  │ ──┼──────────┼──────┼────────││ │  30K ─╯                  │ │                  │
│            │  │ 47│Acme Ret. │AI Tr │$8,500  ││ │       J F M A M J J A S  │ │                  │
│            │  │   │          │      │● PAID  ││ └───────────────────────────┘ │                  │
│            │  │ 46│BrightPath│Setup │$1,500  ││                               │                  │
│            │  │   │          │      │● O.DUE ││ Revenue by Client             │                  │
│            │  │ 45│TechFlow  │Phase2│$5,200  ││ ┌───────────────────────────┐ │                  │
│            │  │   │          │      │● SENT  ││ │ Acme Retail   ████████ $32K│ │                  │
│            │  │ 44│GreenLeaf │Setup │$3,000  ││ │ TechFlow      ██████ $24K  │ │                  │
│            │  │   │          │      │● DRAFT ││ │ BrightPath    ████ $18K    │ │                  │
│            │  │   │          │      │        ││ │ GreenLeaf     ███ $12K     │ │                  │
│            │  │   │ [< 1 2 3 >]     │        ││ │ NovaTech      ██ $8K      │ │                  │
│            │  │                               │ └───────────────────────────┘ │                  │
│            │  │                               │                               │                  │
│            │  │                               │ Revenue by Service             │                  │
│            │  │                               │ ┌───────────────────────────┐ │                  │
│            │  │                               │ │     ╭───╮                 │ │                  │
│            │  │                               │ │   ╭─┤Sup├─╮  Support 38% │ │                  │
│            │  │                               │ │   │ │Eng│ │  Cart    24% │ │                  │
│            │  │                               │ │   │ ╰───╯ │  Growth  22% │ │                  │
│            │  │                               │ │   ╰───────╯  Other   16% │ │                  │
│            │  │                               │ └───────────────────────────┘ │                  │
│            │  └──────────────────────────────┴───────────────────────────────┘                  │
│            │                                                                                    │
│            │  ┌──────────────────────────────────────────────────────────────────────────────┐  │
│            │  │ Project Profitability                                                        │  │
│            │  │ ┌──────────────┬──────────┬──────────┬──────────┬──────────┬───────────────┐ │  │
│            │  │ │ Project      │ Client   │ Budget   │ Invoiced │ Paid     │ Margin        │ │  │
│            │  │ ├──────────────┼──────────┼──────────┼──────────┼──────────┼───────────────┤ │  │
│            │  │ │ AI Transform │ Acme     │ $25,500  │ $17,000  │ $14,200  │ ● 42% GREEN   │ │  │
│            │  │ │ Cart Setup   │ TechFlow │ $12,000  │ $8,000   │ $8,000   │ ● 33% GREEN   │ │  │
│            │  │ │ Health AI    │ MedCorp  │ $18,000  │ $12,000  │ $9,500   │ ● 28% AMBER   │ │  │
│            │  │ │ Support Eng  │ BrightPth│ $8,500   │ $4,250   │ $2,750   │ ● 12% RED     │ │  │
│            │  │ └──────────────┴──────────┴──────────┴──────────┴──────────┴───────────────┘ │  │
│            │  └──────────────────────────────────────────────────────────────────────────────┘  │
│            │                                                                                    │
├────────────┴────────────────────────────────────────────────────────────────────────────────────┤
│ FOOTER                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Tablet Layout (768px)

```
┌─────────────────────────────────────────────────────┐
│ HEADER (56px)               [☰ Menu]    [Avatar ▾]  │
├─────────────────────────────────────────────────────┤
│ Financials         [This Month ▾] [+ Create Invoice]│
├─────────────────────────────────────────────────────┤
│ ⚠ 2 overdue — $4,200 total              [View →]   │
├─────────────────────────────────────────────────────┤
│ ┌───────────────────┐ ┌───────────────────┐         │
│ │ MRR    $47,500    │ │ Revenue  $62,000  │         │
│ │ ▲ +8.2%           │ │ ▲ +12.1%          │         │
│ └───────────────────┘ └───────────────────┘         │
│ ┌───────────────────┐ ┌───────────────────┐         │
│ │ Outstanding $18.5K│ │ Overdue   $4,200  │         │
│ │ 6 invoices        │ │ 2 invoices  ██RED │         │
│ └───────────────────┘ └───────────────────┘         │
│  ← metrics 2x2 grid →                              │
├─────────────────────────────────────────────────────┤
│ Invoice Table (full width, horizontally scrollable) │
│ ┌────┬────┬────┬────┬──────┐                        │
│ │All │Dft │Sent│Paid│O.due │                        │
│ └────┴────┴────┴────┴──────┘                        │
│ # │ Client     │ Amount  │ Status │ Due      │ Act  │
│ ──┼────────────┼─────────┼────────┼──────────┼───── │
│ 47│ Acme Ret.  │ $8,500  │ ●PAID  │ Feb 28   │ [⋯] │
│ 46│ BrightPath │ $1,500  │ ●O.DUE │ Mar 01   │ [⋯] │
│ 45│ TechFlow   │ $5,200  │ ●SENT  │ Mar 15   │ [⋯] │
├─────────────────────────────────────────────────────┤
│ Revenue Trend Chart (full width)                    │
│ ┌─────────────────────────────────────────────────┐ │
│ │ $70K ─         ╱──╮                             │ │
│ │ $50K ─     ╱──╯   ╰╌╌╌                         │ │
│ │ $30K ──╱──╯                                     │ │
│ └─────────────────────────────────────────────────┘ │
├──────────────────────┬──────────────────────────────┤
│ Revenue by Client    │ Revenue by Service            │
│ (50%)                │ (50%)                         │
├──────────────────────┴──────────────────────────────┤
│ Profitability Table (full width, scrollable)        │
└─────────────────────────────────────────────────────┘
```

### Mobile Layout (375px)

```
┌───────────────────────────────────┐
│ HEADER             [☰]  [Avatar] │
├───────────────────────────────────┤
│ Financials                        │
│ [This Month ▾]  [+ Invoice]      │
├───────────────────────────────────┤
│ ⚠ 2 overdue — $4,200   [View →] │
├───────────────────────────────────┤
│ ┌───────────────────────────────┐ │
│ │ MRR               $47,500    │ │
│ │                    ▲ +8.2%   │ │
│ └───────────────────────────────┘ │
│ ┌───────────────────────────────┐ │
│ │ Revenue            $62,000   │ │
│ │                    ▲ +12.1%  │ │
│ └───────────────────────────────┘ │
│ ┌───────────────────────────────┐ │
│ │ Outstanding        $18,500   │ │
│ │                    6 invoices │ │
│ └───────────────────────────────┘ │
│ ┌───────────────────────────────┐ │
│ │ Overdue            $4,200    │ │
│ │                    2 invoices │ │
│ └───────────────────────────────┘ │
│  ← single column stacked cards → │
├───────────────────────────────────┤
│ [All][Dft][Sent][Paid][O.due]    │
│ ← horizontally scrollable pills → │
├───────────────────────────────────┤
│ ┌───────────────────────────────┐ │
│ │ #47 · Acme Retail            │ │
│ │ AI Transform   $8,500  ●PAID │ │
│ │ Due: Feb 28        [⋯]      │ │
│ ├───────────────────────────────┤ │
│ │ #46 · BrightPath             │ │
│ │ Setup          $1,500 ●O.DUE │ │
│ │ Due: Mar 01        [⋯]      │ │
│ └───────────────────────────────┘ │
│  ← invoice cards instead of table │
├───────────────────────────────────┤
│ Revenue Trend (full width)        │
│ ┌───────────────────────────────┐ │
│ │ $70K─     ╱──╮               │ │
│ │ $50K─ ╱──╯   ╰╌╌            │ │
│ │ $30K─╯                       │ │
│ └───────────────────────────────┘ │
├───────────────────────────────────┤
│ Revenue by Client (full width)    │
├───────────────────────────────────┤
│ Revenue by Service (full width)   │
├───────────────────────────────────┤
│ Profitability (horizontal scroll) │
└───────────────────────────────────┘
```

### Key Component Detail: Invoice Row

```
┌──────┬──────────────┬──────────────┬──────────┬───────────┬────────────┬────────────┬─────────┐
│  #   │ Client       │ Project      │ Amount   │ Status    │ Issue Date │ Due Date   │ Actions │
├──────┼──────────────┼──────────────┼──────────┼───────────┼────────────┼────────────┼─────────┤
│  47  │ Acme Retail  │ AI Transform │ $8,500   │ ┌───────┐ │ 2026-02-01 │ 2026-02-28 │  [⋯]   │
│      │              │              │   .00    │ │● PAID │ │            │ Paid: 2/26 │  │ Edit │
│      │              │              │          │ └───────┘ │            │            │  │ Pay  │
│      │              │              │          │  #84CC16  │            │            │  │ Remind│
│      │              │              │          │           │            │            │  │ Del  │
└──────┴──────────────┴──────────────┴──────────┴───────────┴────────────┴────────────┴─────────┘

Status badge colors:
  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │ ○ DRAFT  │  │ ○ SENT   │  │ ● PAID   │  │ ● OVERDUE│
  │  #9CA3AF │  │  #3B82F6 │  │  #84CC16 │  │  #DC2626 │
  └──────────┘  └──────────┘  └──────────┘  └──────────┘
```

### Key Component Detail: Create Invoice Modal

```
┌─────────────────────────────────────────────────┐
│  Create Invoice                            [✕]  │
├─────────────────────────────────────────────────┤
│                                                 │
│  Client *          [Select client...        ▾]  │
│  Project *         [Select project...       ▾]  │
│  Milestone         [Link to milestone...    ▾]  │
│                    (auto-fills amount below)     │
│                                                 │
│  ── Line Items ──────────────────────────────── │
│  Description              Qty    Amount          │
│  ┌─────────────────────┬──────┬──────────────┐  │
│  │ Phase 1: Support Eng│  1   │  $8,500.00   │  │
│  └─────────────────────┴──────┴──────────────┘  │
│  [+ Add Line Item]                               │
│                                                 │
│  Due Date *        [2026-03-30          📅]     │
│                                                 │
│  Total                              $8,500.00   │
│                                                 │
│  ┌──────────────────┐ ┌──────────────────────┐  │
│  │  Save as Draft   │ │  Save & Send    →    │  │
│  └──────────────────┘ └──────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Key Component Detail: Metrics Card

```
┌─────────────────────────────────┐
│  MRR                            │
│                                 │
│  $47,500                        │   ← Playfair Display, 28px, #0A211F
│  ▲ +8.2% vs last month         │   ← Lora, 14px, #84CC16 (green = up)
│                                 │
│  ░░░░░░░░░░░░░░░░░░░ sparkline │   ← 7-day mini trend
└─────────────────────────────────┘
   280px wide × 120px tall
   bg: #FFFFFF, border: 1px #D4CFC8
   Overdue card: bg tinted #FEF2F2 when amount > 0
```

---

## Outcomes

| Outcome                                 | Metric                                         | Target          |
| --------------------------------------- | ---------------------------------------------- | --------------- |
| Financial visibility                    | Time to answer "what is our revenue this month" | < 5 seconds     |
| Invoice creation speed                  | Time from milestone complete to invoice sent     | < 5 minutes     |
| Overdue reduction                       | Percentage of invoices paid within terms          | > 85%           |
| Collection efficiency                   | Days sales outstanding (DSO)                     | < 25 days       |
| Profitability awareness                 | Projects with tracked margin data                | 100%            |
| Forecast accuracy                       | AI forecast vs actual revenue (3-month)           | Within 15%      |
