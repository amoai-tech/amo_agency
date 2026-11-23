# 12 — FINANCIAL DASHBOARD
# Revenue Tracking, Invoices, Payments, Project Economics

**Component:** `FinancialDashboardPage`
**File:** `/components/dashboard/financial/FinancialDashboardPage.tsx`
**Route:** `/app/financial`
**ID:** 033-financial-dashboard
**Diagram ID:** DASH-09
**Status:** NOT STARTED
**Priority:** P2
**Effort:** L (Large)
**Parent Doc:** `00-dashboard-master.md`
**Depends On:** ProjectDelivery (027), Auth, invoices, payments, projects, clients, crm_deals, milestones

---

## SCREEN PURPOSE

Financial overview for the agency — revenue tracking, invoice management, payment status, and project profitability. Connects CRM deal values to actual invoicing and payment collection. Investment tiers from wizard Step 3 seed initial project budgets. This dashboard tracks financial reality against those estimates throughout the engagement lifecycle.

Real-world: "Agency owner opens Financial dashboard Monday morning. Metrics: $47,500 MRR, $62,000 collected this month, $18,500 outstanding, $4,200 overdue. Clicks overdue — two invoices: Acme Phase 2 ($2,700, 5 days late) and BrightPath Setup ($1,500, 3 days late). Sends reminders with one click each."

---

## TARGET USERS

- Agency owner monitoring business financial health and making pricing/growth decisions
- Finance team managing invoice creation, sending, and payment collection
- Consultants tracking project budgets against actuals
- Business owners (clients) viewing their invoice and payment history

---

## CORE FEATURES

1. **Revenue metrics row** — 4 cards: MRR, revenue this period, outstanding balance, overdue amount. Trend arrows + percentage vs prior period. Overdue card turns red when amount > 0.
2. **Invoice management table** — Full lifecycle: draft -> sent -> paid -> overdue. Columns: invoice #, client, project, amount, status badge, issue/due/payment dates. Sort any column. Actions: edit, send, record payment, send reminder, delete. Bulk sending.
3. **Payment tracking** — Per-invoice recording: amount, date, method, notes. Partial payments supported (remaining balance shown). Payment timeline.
4. **Revenue analytics charts** — Revenue by client (horizontal bar, top 10), by service/system (donut), monthly trend (line, 12 months). Recharts, filterable by date range.
5. **Project profitability** — Table: project, client, budget (roadmap), invoiced, paid, margin %. Color: green >30%, amber 15-30%, red <15%.
6. **Overdue management** — Alert banner when overdue exists. One-click "Send Reminder" logging activity. Escalation indicators at 7+, 14+, 30+ days.
7. **Quick-create invoice** — Milestone completion triggers toast: "Phase 1 complete. Create invoice for $8,500?" Pre-fills client, project, amount from roadmap.
8. **Revenue forecasting** — AI-powered 3-month forecast from pipeline deals + historical payment patterns. Dashed line on trend chart with confidence band.

---

## ASCII WIREFRAME — Desktop (1440px)

```
┌─────────────┬──────────────────────────────────────────────────────────────┐
│  SIDEBAR    │  Financials                [This Month ▾] [+ Create Invoice]│
│  240px      ├──────────────────────────────────────────────────────────────┤
│             │  ⚠ 2 invoices overdue totaling $4,200             [View →]  │
│  ☀ AMO AI   ├──────────────────────────────────────────────────────────────┤
│             │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────┐ │
│  ──────────│  │ MRR        │ │ Revenue    │ │Outstanding │ │ Overdue  │ │
│  ○ Dashboard│  │ $47,500    │ │ $62,000    │ │ $18,500    │ │ $4,200   │ │
│  ○ Projects │  │ ▲ +8.2%    │ │ ▲ +12.1%   │ │ 6 invoices │ │ 2 inv ██ │ │
│  ○ CRM      │  └────────────┘ └────────────┘ └────────────┘ └──────────┘ │
│  ○ Insights │                                                              │
│  ○ Documents│  ┌──────────────────────────────┬───────────────────────────┐│
│  ● Financial│  │ Invoices              (60%)  │ Revenue Trend      (40%) ││
│  ○ Agents   │  │                               │                          ││
│  ○ Settings │  │ [All][Draft][Sent][Paid][Due] │ ┌──────────────────────┐ ││
│             │  │                               │ │ $70K         ╱──╮    │ ││
│             │  │ #│Client    │Proj  │Amount    │ │ $50K     ╱──╯  ╰╌╌╌ │ ││
│             │  │ ──┼──────────┼──────┼─────── │ │ $30K ╱──╯  forecast→ │ ││
│             │  │ 47│Acme Ret. │AI Tr │$8,500  │ │      J F M A M J     │ ││
│             │  │   │          │      │● PAID  │ │ └──────────────────────┘ ││
│             │  │ 46│BrightPath│Setup │$1,500  │ │                          ││
│             │  │   │          │      │● O.DUE │ │ Revenue by Client       ││
│             │  │ 45│TechFlow  │Phase2│$5,200  │ │ ┌──────────────────────┐ ││
│             │  │   │          │      │● SENT  │ │ │ Acme     ████████$32K│ ││
│             │  │ 44│GreenLeaf │Setup │$3,000  │ │ │ TechFlow ██████ $24K │ ││
│             │  │   │          │      │● DRAFT │ │ │ Bright   ████ $18K   │ ││
│             │  │   │ [< 1 2 3 >]              │ │ └──────────────────────┘ ││
│             │  │                               │ │                          ││
│             │  │                               │ │ Revenue by Service       ││
│             │  │                               │ │ ┌──────────────────────┐ ││
│             │  │                               │ │ │ Support 38%          │ ││
│             │  │                               │ │ │ Cart    24%          │ ││
│             │  │                               │ │ │ Growth  22%          │ ││
│             │  │                               │ │ └──────────────────────┘ ││
│             │  └──────────────────────────────┴───────────────────────────┘│
│             │                                                              │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │ Project Profitability                                │    │
│             │  │ Project      │ Client  │ Budget  │ Paid   │ Margin  │    │
│             │  │ AI Transform │ Acme    │ $25,500 │$14,200 │ ● 42%  │    │
│             │  │ Cart Setup   │ Tech    │ $12,000 │ $8,000 │ ● 33%  │    │
│             │  │ Health AI    │ MedCorp │ $18,000 │ $9,500 │ ● 28%  │    │
│             │  │ Support Eng  │ Bright  │ $8,500  │ $2,750 │ ● 12%  │    │
│             │  └──────────────────────────────────────────────────────┘    │
└─────────────┴──────────────────────────────────────────────────────────────┘
```

---

## INVOICE STATUS BADGES

| Status | Color | Transition |
|--------|-------|------------|
| Draft | #9CA3AF (gray) | → Sent |
| Sent | #3B82F6 (blue) | → Paid or → Overdue (auto) |
| Paid | #00875A (green) | Terminal |
| Overdue | #DC2626 (red) | → Paid (when payment recorded) |

Auto-overdue: cron job checks sent invoices where due_date < now(), updates status to overdue.

---

## METRICS CARD SPEC

```
┌─────────────────────────────────┐
│  MRR                            │
│  $47,500                        │  ← Georgia 28px, #1A1A1A
│  ▲ +8.2% vs last month         │  ← Inter 14px, #00875A (green=up)
│  ░░░░░░░░░░░░░░░░░░░ sparkline │  ← 7-day mini trend
└─────────────────────────────────┘
  280px × 120px, #FFFFFF bg, 1px #E8E8E4 border
  Overdue card: bg tinted #FEF2F2 when amount > 0
```

---

## TYPESCRIPT INTERFACES

```ts
interface Invoice {
  id: string;
  invoice_number: string;
  client_id: string;
  project_id: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  issue_date: string;
  due_date: string;
  payment_date: string | null;
  line_items: LineItem[];
  client_name?: string;
  project_name?: string;
}

interface Payment {
  id: string;
  invoice_id: string;
  amount: number;
  payment_date: string;
  method: 'bank_transfer' | 'credit_card' | 'check' | 'other';
  notes: string | null;
  recorded_by: string;
}

interface RevenueMetrics {
  mrr: number;
  mrr_trend: number;
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
  budget: number;
  invoiced: number;
  paid: number;
  margin_pct: number;
}

interface RevenueTrendPoint {
  month: string;
  amount: number;
  is_forecast: boolean;
}

type InvoiceStatusFilter = 'all' | 'draft' | 'sent' | 'paid' | 'overdue';
type DateRange = { start: string; end: string; preset: 'this_month' | 'this_quarter' | 'this_year' | 'custom' };
```

---

## HOOKS

useRevenueMetrics(dateRange): metrics, loading, refetch
useInvoices(filters): invoices[], total, createInvoice(), updateInvoice(), sendReminder()
usePayments(invoiceId?): payments[], recordPayment()
useRevenueCharts(dateRange): byClient[], byService[], trend[]
useProfitability(dateRange): projects[]

---

## COMPONENT TREE

```
FinancialDashboardPage
├── DateRangePicker
├── OverdueAlertBanner (conditional)
├── RevenueMetricsRow
│   ├── MetricCard (MRR)
│   ├── MetricCard (Revenue)
│   ├── MetricCard (Outstanding)
│   └── MetricCard (Overdue)
├── div.grid.grid-cols-[3fr_2fr]
│   ├── section (left 60%)
│   │   ├── InvoiceFilterBar
│   │   └── InvoiceTable → InvoiceRow[] → InvoiceStatusBadge
│   └── section (right 40%)
│       ├── RevenueTrendChart (Recharts LineChart)
│       ├── RevenueByClientChart (Recharts BarChart horizontal)
│       └── RevenueByServiceChart (Recharts PieChart donut)
├── ProfitabilityTable → ProfitabilityRow[]
├── CreateInvoiceModal
├── RecordPaymentModal
├── QuickInvoiceToast
└── PaymentTimeline
```

---

## BACKEND WIRING

### Edge Function Routes

| Method | Route | Purpose |
|--------|-------|---------|
| POST | /dashboard/financial/metrics | Revenue metrics for date range |
| POST | /dashboard/financial/invoices | List with filters, sorting, pagination |
| POST | /dashboard/financial/invoices/create | New invoice (optionally linked to milestone) |
| PUT | /dashboard/financial/invoices/:id | Update status, dates, line items |
| DELETE | /dashboard/financial/invoices/:id | Delete draft invoice |
| POST | /dashboard/financial/invoices/:id/reminder | Send payment reminder, log activity |
| POST | /dashboard/financial/payments | List payments (by invoice) |
| POST | /dashboard/financial/payments/record | Record payment against invoice |
| POST | /dashboard/financial/charts | Revenue by client, service, trend data |
| POST | /dashboard/financial/profitability | Project profitability table data |
| POST | /dashboard/financial/forecast | AI revenue forecast (3-month projection) |

### Edge Cases

| Scenario | Handling |
|----------|----------|
| No invoices exist | Zeros in metrics, empty state with "Create your first invoice" CTA |
| Partial payment | Invoice stays "sent", remaining balance shown |
| Overpayment | Rejected: payment cannot exceed remaining balance |
| Deleted project on invoice | Shows "Deleted Project" if join returns null |
| Date range with no data | Empty axes, "No data for this period" overlay |
| Invoice status transitions | Server enforces: draft->sent, sent->paid, sent->overdue (auto) |
| Client viewing other's data | RLS blocks, empty result set |

---

## AI FEATURES

- **Revenue forecasting** — 3-month projection from pipeline deals + historical collection rates. Dashed extension on trend chart with confidence band.
- **Auto-generate invoices at milestones** — Pre-populated from roadmap phase estimated_cost.
- **Payment reminder scheduling** — Optimal timing based on client payment history.
- **Profitability insights** — "E-commerce projects average 42% margin while healthcare averages 28%. Consider adjusting."
- **Cash flow prediction** — Weekly cash inflow forecast for next 4 weeks.

---

## ACCEPTANCE CRITERIA

- Metrics row: MRR, revenue, outstanding, overdue with trend indicators
- Invoice table with full lifecycle management (draft/sent/paid/overdue)
- Status badges color-coded, filter buttons with count badges
- Create Invoice modal with client/project/milestone selectors and line items
- Quick-create from milestone completion with pre-filled data
- Payment recording with partial payment support
- Revenue by client bar chart, by service donut, monthly trend line (Recharts)
- AI forecast dashed line extending 3 months
- Project profitability table with color-coded margins
- Overdue alert banner with "Send Reminder" action
- Date range picker (this month/quarter/year/custom) filtering all sections
- Responsive: 2x2 metrics on tablet, single-column stack on mobile
- Chart drill-down: click client bar → filter invoices to that client
