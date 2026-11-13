# 07 — PROPOSAL
# Wizard Output Screen

**Component:** `C36-ProposalPage`
**File:** `/components/wizard/ProposalPage.tsx`
**Route:** `/wizard/proposal`
**Status:** PLANNED
**Parent Doc:** `00-wizard.md`

---

## SCREEN PURPOSE

The payoff. A complete, beautifully typeset AI-generated project proposal that
reads like a document from a top consulting firm. Scope breakdown, phased timeline,
pricing, inclusions, and two clear CTAs: accept (→ payment) or book a call.

This screen must feel like opening a PDF from McKinsey — polished, authoritative,
and worth the wait.

> "Your custom AI proposal is ready. Review the scope, timeline,
>  and investment — then decide how you'd like to proceed."

---

## ASCII WIREFRAME — Desktop (1440px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  ☀ AMO AI                              Download PDF ↓   Share 🔗 │
│                                                                          │
│  ════════════════════════════════════════════════════════════════════════ │
│                                                                          │
│                         PROJECT PROPOSAL                                │
│                                                                          │
│                 AI Systems for Acme Retail Group                         │
│                       Prepared March 7, 2026                            │
│                                                                          │
│  ────────────────────────────────────────────────────────────────────── │
│                                                                          │
│     ┌────────────────┐  ┌────────────────┐  ┌────────────────┐          │
│     │   INVESTMENT    │  │   TIMELINE     │  │   START DATE   │          │
│     │                 │  │                │  │                │          │
│     │    $24,500      │  │   8 weeks      │  │   Mar 17       │          │
│     │                 │  │                │  │                │          │
│     │   deposit:      │  │   4 phases     │  │   pending      │          │
│     │   $7,350 (30%)  │  │                │  │   acceptance   │          │
│     └────────────────┘  └────────────────┘  └────────────────┘          │
│                                                                          │
│  ════════════════════════════════════════════════════════════════════════ │
│                                                                          │
│  ─── EXECUTIVE SUMMARY ───────────────────────────────────────────────  │
│                                                                          │
│  Acme Retail Group requires a comprehensive AI transformation            │
│  focused on customer support automation, cart recovery, and              │
│  personalized product recommendations. Based on your diagnostic          │
│  results — including 50-70% cart abandonment, email-only support,        │
│  and no personalization — we've designed a three-system solution          │
│  delivered in two phases over 8 weeks.                                   │
│                                                                          │
│  Expected impact: 60-80% support automation, 10-15% cart recovery,       │
│  and 10-30% average order value increase, translating to an estimated    │
│  $2,000-$8,000/month in additional revenue within 90 days.               │
│                                                                          │
│  ─── SCOPE BREAKDOWN ─────────────────────────────────────────────────  │
│                                                                          │
│  PHASE 1: Discovery & Architecture                Week 1-2     $3,200   │
│  ─────────────────────────────────────────────────────────────────────   │
│  • Requirements deep-dive workshop (2 sessions)                          │
│  • System architecture design for 3 integrated systems                   │
│  • Integration mapping: Shopify + CRM + WhatsApp                         │
│  • Technical specification document                                      │
│  • Milestone: Architecture approved ✓                                    │
│                                                                          │
│  PHASE 2: Core Development                        Week 3-5     $9,800   │
│  ─────────────────────────────────────────────────────────────────────   │
│  • AI Customer Support Engine                                            │
│    – NLP model training on your FAQ data                                 │
│    – Website chat widget (branded)                                       │
│    – WhatsApp Business API integration                                   │
│    – Human escalation workflow                                           │
│  • Cart Recovery System                                                  │
│    – Abandonment detection triggers                                      │
│    – Multi-channel follow-up sequences (email + WhatsApp)                │
│    – A/B testing framework                                               │
│  • Milestone: Core systems demo ✓                                        │
│                                                                          │
│  PHASE 3: Integration & Quality Assurance         Week 5-7     $7,200   │
│  ─────────────────────────────────────────────────────────────────────   │
│  • Personalized Recommendation Engine                                    │
│    – Behavioral tracking integration                                     │
│    – Product recommendation API                                          │
│    – Widget placement on product + cart pages                            │
│  • Cross-system integration testing                                      │
│  • CRM data sync verification                                            │
│  • Conversation flow QA (500+ test scenarios)                            │
│  • Milestone: All systems integrated ✓                                   │
│                                                                          │
│  PHASE 4: Launch & Optimization                   Week 7-8     $4,300   │
│  ─────────────────────────────────────────────────────────────────────   │
│  • Production deployment (zero-downtime)                                 │
│  • Team training (2 live sessions + recorded)                            │
│  • 30-day optimization period                                            │
│  • Performance monitoring dashboard                                      │
│  • Milestone: Go-live + handoff complete ✓                               │
│                                                                          │
│  ─── TIMELINE ─────────────────────────────────────────────────────────  │
│                                                                          │
│  WEEK  1    2    3    4    5    6    7    8                              │
│        │    │    │    │    │    │    │    │                              │
│  P1    ████████░░░░░░░░░░░░░░░░░░░░░░░░  Discovery                     │
│  P2    ░░░░░░░░████████████████░░░░░░░░  Core Dev                       │
│  P3    ░░░░░░░░░░░░░░░░████████████░░░░  Integration                   │
│  P4    ░░░░░░░░░░░░░░░░░░░░░░░░████████  Launch                        │
│        │    │    │    │    │    │    │    │                              │
│        ▲              ▲              ▲    ▲                              │
│        Kickoff        Demo           Int. Go-live                       │
│                                      ✓                                  │
│                                                                          │
│  ─── SYSTEMS INCLUDED ─────────────────────────────────────────────────  │
│                                                                          │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐         │
│  │                  │ │                  │ │                  │         │
│  │  🎧 AI Customer  │ │  🛒 Cart Recovery │ │  ✨ Recommendation│         │
│  │  Support Engine  │ │  & Follow-Up     │ │  Engine          │         │
│  │                  │ │  System          │ │                  │         │
│  │  • Website chat  │ │  • Abandonment   │ │  • Behavioral    │         │
│  │  • WhatsApp      │ │    detection     │ │    tracking      │         │
│  │  • Email auto    │ │  • Email + WApp  │ │  • Product recs  │         │
│  │  • Human handoff │ │    sequences     │ │  • Cart + PDP    │         │
│  │  • NLP training  │ │  • A/B testing   │ │    widgets       │         │
│  │                  │ │                  │ │                  │         │
│  │  Impact: HIGH    │ │  Impact: HIGH    │ │  Impact: MEDIUM  │         │
│  │  Weeks 3-5       │ │  Weeks 3-5       │ │  Weeks 5-7       │         │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘         │
│                                                                          │
│  ─── WHAT'S INCLUDED ──────────────────────────────────────────────────  │
│                                                                          │
│  ☑ Source code ownership         ☑ 30-day post-launch support            │
│  ☑ Complete documentation        ☑ 2 live training sessions              │
│  ☑ Production deployment         ☑ Dedicated Slack channel               │
│  ☑ Performance monitoring        ☑ Recorded training videos              │
│  ☑ Architecture diagrams         ☑ Knowledge base setup                  │
│                                                                          │
│  ─── INVESTMENT ───────────────────────────────────────────────────────  │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │  Phase 1: Discovery & Architecture .............. $3,200         │   │
│  │  Phase 2: Core Development ...................... $9,800         │   │
│  │  Phase 3: Integration & QA ...................... $7,200         │   │
│  │  Phase 4: Launch & Optimization ................. $4,300         │   │
│  │  ───────────────────────────────────────────────────────         │   │
│  │  Total Investment ............................... $24,500        │   │
│  │                                                                  │   │
│  │  Payment Schedule:                                               │   │
│  │  • Deposit (30%): $7,350 — on acceptance                        │   │
│  │  • Milestone 1 (25%): $6,125 — architecture approved            │   │
│  │  • Milestone 2 (25%): $6,125 — core systems demo               │   │
│  │  • Final (20%): $4,900 — go-live complete                       │   │
│  │                                                                  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ─── EXPECTED OUTCOMES ────────────────────────────────────────────────  │
│                                                                          │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐         │
│  │                  │ │                  │ │                  │         │
│  │     60-80%       │ │     10-15%       │ │     10-30%       │         │
│  │                  │ │                  │ │                  │         │
│  │  customer support│ │   abandoned cart  │ │   average order  │         │
│  │  automated       │ │   recovery       │ │   value increase │         │
│  │                  │ │                  │ │                  │         │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘         │
│                                                                          │
│  Estimated monthly impact: $2,000 – $8,000 additional revenue           │
│  ROI breakeven: 3-4 months                                              │
│                                                                          │
│  ═══════════════════════════════════════════════════════════════════════ │
│                                                                          │
│                         NEXT STEPS                                      │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │          Accept Proposal & Pay Deposit ($7,350)                  │   │
│  │                                                                  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │       Have questions? Book a 30-min strategy call instead        │   │
│  │                                                                  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  This proposal is valid for 14 days (until March 21, 2026).             │
│  Proposal ID: SUN-2026-0307-ACR                                         │
│                                                                          │
│  ────────────────────────────────────────────────────────────────────── │
│                                                                          │
│  ☀ AMO AI · www.amoai.ca · Contact via website              │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Mobile (375px)

```
┌─────────────────────────────┐
│ ☀ AMO AI      PDF ↓  Share 🔗│
├─────────────────────────────┤
│                             │
│  PROJECT PROPOSAL           │
│                             │
│  AI Systems for             │
│  Acme Retail Group          │
│  March 7, 2026              │
│                             │
│ ┌─────────────────────────┐ │
│ │ $24,500 · 8 wk · Mar 17│ │
│ └─────────────────────────┘ │
│                             │
│  EXECUTIVE SUMMARY          │
│  ─────────────────          │
│  Acme Retail Group          │
│  requires a comprehensive   │
│  AI transformation...       │
│                             │
│  SCOPE                      │
│  ─────────────────          │
│  ▸ Phase 1: Discovery $3.2K │
│  ▸ Phase 2: Core Dev  $9.8K │
│  ▸ Phase 3: Integ.    $7.2K │
│  ▸ Phase 4: Launch    $4.3K │
│  (tap to expand phases)     │
│                             │
│  TIMELINE                   │
│  ─────────────────          │
│  W1-2 ████ Discovery        │
│  W3-5 ██████ Core           │
│  W5-7 ██████ Integration    │
│  W7-8 ████ Launch           │
│                             │
│  ... (scroll for more)      │
│                             │
│  ┌───────────────────────┐  │
│  │ Accept & Pay $7,350   │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ Book a Strategy Call  │  │
│  └───────────────────────┘  │
│                             │
│  Valid until Mar 21, 2026   │
│                             │
└─────────────────────────────┘
```

---

## CONTENT DATA

### Proposal Sections

| Section | Source | Typography |
|---------|--------|-----------|
| Title | "AI Systems for [Company]" | Playfair Display 32px |
| Date | Generated timestamp | Lora 14px, muted |
| Metrics row (3 cards) | Gemini 3 output | JetBrains Mono 36px (numbers) |
| Executive Summary | Gemini 3 narrative | Lora 16px body |
| Scope Breakdown | Gemini 3 phased deliverables | Lora body + Inter labels |
| Timeline Gantt | Gemini 3 phase schedule | Custom SVG / div bars |
| Systems Included | Selected systems + features | Cards with icons |
| What's Included | Static checklist | Inter 14px |
| Investment | Gemini 3 pricing + payment schedule | JetBrains Mono for $$$ |
| Expected Outcomes | Gemini 3 metrics | JetBrains Mono 36px (numbers) |
| Next Steps | CTAs + validity | Inter buttons |

### Payment Schedule Template

```typescript
function calculatePaymentSchedule(total: number) {
  return {
    deposit:    { percent: 30, amount: total * 0.30, trigger: 'On acceptance' },
    milestone1: { percent: 25, amount: total * 0.25, trigger: 'Architecture approved' },
    milestone2: { percent: 25, amount: total * 0.25, trigger: 'Core systems demo' },
    final:      { percent: 20, amount: total * 0.20, trigger: 'Go-live complete' },
  };
}
```

### Proposal ID Format

```
SUN-[YEAR]-[MMDD]-[COMPANY_INITIALS]
Example: SUN-2026-0307-ACR
```

---

## UI COMPONENTS

```
COMPONENT TREE
│
├── ProposalPage.tsx (C36)
│   ├── ProposalHeader .................. title, date, company
│   ├── MetricsRow ..................... 3 metric cards (invest, timeline, start)
│   ├── ExecutiveSummary ............... narrative paragraph
│   ├── ScopeBreakdown ................ phased deliverables
│   │   └── PhaseCard (×4) ............ phase name, weeks, cost, deliverables
│   ├── TimelineGantt ................. horizontal bar chart
│   │   └── GanttBar (×4) ............ colored bar per phase + milestones
│   ├── SystemsIncluded ............... 3-col card grid
│   │   └── SystemCard (×3) .......... icon, name, features, impact
│   ├── WhatsIncluded ................. 2-col checkbox grid
│   ├── InvestmentBreakdown ........... line items + payment schedule
│   ├── ExpectedOutcomes .............. 3 metric cards + ROI
│   ├── NextStepsCTA .................. primary + secondary buttons
│   └── ProposalFooter ................ validity, ID, contact

SHARED:
├── /components/wizard/ui/MetricCard.tsx ....... large number + label
├── /components/wizard/ui/PhaseCard.tsx ........ scope phase block
├── /components/wizard/ui/GanttBar.tsx ......... timeline bar segment
├── /components/wizard/ui/SystemFeatureCard.tsx . system with feature list
└── /components/wizard/ui/PaymentTable.tsx ...... milestone payment rows
```

---

## BUTTON STATES

### Primary CTA — Accept & Pay

```
DEFAULT:
┌──────────────────────────────────────┐
│  Accept Proposal & Pay Deposit       │   #0A211F bg
│  ($7,350)                            │   #FFF text
└──────────────────────────────────────┘

HOVER:
┌──────────────────────────────────────┐
│  Accept Proposal & Pay Deposit       │   #1A2F2D bg
│  ($7,350)                            │   shadow: 0 4px 12px
└──────────────────────────────────────┘   rgba(10,33,31,0.15)

CLICK → Opens Stripe Checkout (or placeholder modal for MVP)
```

### Secondary CTA — Book a Call

```
DEFAULT:
┌──────────────────────────────────────┐
│  Have questions? Book a 30-min       │   #FFF bg
│  strategy call instead               │   #0A211F text
└──────────────────────────────────────┘   #E5E2DE border

HOVER:
┌──────────────────────────────────────┐
│  Have questions? Book a 30-min       │   #F1EEEA bg
│  strategy call instead               │   #0A211F text
└──────────────────────────────────────┘

CLICK → Navigate to /booking (pre-filled with wizard context)
```

---

## WORKFLOW

```
ENTRY
│
├── User arrives at /wizard/proposal
│   ├── Check: proposal data exists in React context?
│   │   ├── Yes → render proposal
│   │   └── No → redirect to /wizard (protect route)
│   ├── Generate proposal ID (SUN-YYYY-MMDD-XXX)
│   ├── Calculate payment schedule from total
│   ├── Render with staggered section fade-in
│   └── Track: proposal_viewed analytics event

INTERACTION
│
├── User scrolls through proposal
│   ├── Track scroll depth (25%, 50%, 75%, 100%)
│   ├── Track time on page
│   └── Sections visible: Intersection Observer tracking
│
├── User clicks "Download PDF"
│   ├── Generate PDF from proposal data (html2pdf or server-side)
│   ├── Filename: "AMO-AI-Proposal-[Company]-[Date].pdf"
│   └── Track: proposal_downloaded event
│
├── User clicks "Share"
│   ├── Copy shareable link to clipboard
│   ├── Toast: "Link copied to clipboard"
│   └── Link format: /wizard/proposal?id=[proposal_id]
│
├── User clicks "Accept & Pay Deposit"
│   ├── MVP: Show modal "Payment integration coming soon. Book a call to proceed."
│   │   └── [Book a Call] → /booking
│   ├── With Stripe: Open Stripe Checkout
│   │   ├── Amount: deposit (30%)
│   │   ├── Success → confirmation page
│   │   └── Cancel → back to proposal
│   └── Track: proposal_accepted event
│
├── User clicks "Book a Strategy Call"
│   ├── Navigate to /booking
│   ├── Pre-fill with wizard context:
│   │   ├── Company name
│   │   ├── Selected systems
│   │   ├── Budget range
│   │   └── Proposal ID reference
│   └── Track: proposal_call_booked event

EXIT
│
├── Accept → payment flow
├── Book call → /booking (pre-filled)
├── Download PDF → stays on page
├── Navigate away → proposal remains accessible
└── Return later → /wizard/proposal?id=xxx
```

---

## AGENT BEHAVIOR — GEMINI 3 INTEGRATION

```
GEMINI 3: PROPOSAL WAS GENERATED IN PROCESSING STEP
═════════════════════════════════════════════════════

No new AI calls on this screen. Proposal data is loaded from the
cache populated during /wizard/processing.

IF USER EDITS (future feature):
├── "Request revision" button at bottom
├── Opens modal: "What would you like to change?"
├── Sends revision request to Gemini 3
├── Re-generates proposal sections
└── Refreshes page with updated proposal

FOR MVP: Proposal is read-only. Revisions happen on the call.
```

---

## DESIGN NOTES

```
TYPOGRAPHY HIERARCHY (proposal document):
├── Proposal title: Playfair Display, 32px, #0A211F
├── Section headings: Inter 12px, uppercase, letter-spacing 0.08em, #84CC16
├── Phase names: Lora 18px, #0A211F
├── Deliverables: Lora 15px, #0A211F
├── Metric numbers: JetBrains Mono 36px, #0A211F
├── Metric labels: Inter 13px, #6B7280
├── Body text: Lora 16px, #0A211F, line-height 28px
├── Price amounts: JetBrains Mono 16px, #0A211F
└── Fine print: Inter 13px, #9CA3AF

LAYOUT:
├── Max-width: 880px (document feel, not full-width)
├── Centered on page with generous margins
├── Print-friendly: @media print styles
├── Sections separated by thin rules (#E5E2DE)
├── Background: #FFF (document) on #F1EEEA (page)
└── Subtle card elevation: 0 1px 3px rgba(10,33,31,0.06)

COLOR:
├── Page bg: #F1EEEA
├── Document bg: #FFFFFF
├── Text: #0A211F
├── Section labels: #84CC16 (lime green)
├── Metric cards: #FFFFFF with #E5E2DE border
├── Gantt bars: #0A211F (filled), #E5E2DE (empty)
├── Milestone markers: #84CC16
├── Primary CTA: #0A211F bg, #FFF text
└── Secondary CTA: #FFF bg, #0A211F text, #E5E2DE border
```

---

## ACCESSIBILITY

```
├── Document structure: proper heading hierarchy (h1 title, h2 sections)
├── Metric cards: aria-label="Investment: $24,500"
├── Gantt chart: aria-label describing phases in text (hidden visual bars)
├── Deliverable lists: semantic <ul>/<li>
├── Payment table: <table> with proper headers
├── CTAs: clearly labeled, focus visible
├── PDF download: aria-label="Download proposal as PDF"
├── Share button: aria-label="Copy shareable link"
├── Print: Ctrl+P produces clean document
├── Contrast: all text meets 4.5:1 on white background
└── Screen reader: full document readable in logical order
```

---

## IMPLEMENTATION NOTES

```
DEPENDENCIES:
├── motion/react .................. section fade-in animations
├── lucide-react .................. system icons, metric icons
├── react-router .................. navigation to /booking
├── html2canvas + jspdf ........... PDF generation (or print CSS)
└── sonner@2.0.3 .................. share link toast

FILES:
├── /components/wizard/ProposalPage.tsx
├── /components/wizard/proposal/ProposalHeader.tsx
├── /components/wizard/proposal/MetricsRow.tsx
├── /components/wizard/proposal/ScopeBreakdown.tsx
├── /components/wizard/proposal/TimelineGantt.tsx
├── /components/wizard/proposal/SystemsIncluded.tsx
├── /components/wizard/proposal/InvestmentBreakdown.tsx
├── /components/wizard/proposal/ExpectedOutcomes.tsx
├── /components/wizard/proposal/NextStepsCTA.tsx
└── /components/wizard/proposal/ProposalFooter.tsx

KEY DECISIONS:
├── 880px max-width (document feel, not landing page)
├── No sidebar or panels (full-page document layout)
├── Staggered section fade-in (feels premium, not instant)
├── Print CSS included (proposal should print beautifully)
├── PDF download generates client-side (no server needed)
├── Shareable link (future: persistent via Supabase)
├── Accept CTA is a placeholder for MVP (links to /booking)
├── Proposal validity: 14 days (displayed)
├── Gantt is decorative on mobile (simplified to text list)
└── All monetary values formatted with locale-aware commas
```
