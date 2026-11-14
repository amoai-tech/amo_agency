# 04 — EXECUTIVE SUMMARY / STRATEGY BRIEF
# Wizard Step 4 of 5

**Component:** `C33-StepExecutiveSummary`
**File:** `/components/wizard/steps/StepExecutiveSummary.tsx`
**Route:** `/wizard` (step 4)
**Status:** PLANNED
**Parent Doc:** `00-wizard.md`

---

## SCREEN PURPOSE

The AI-generated executive brief. Gemini 3 synthesizes everything from Steps 1–3
into a polished, multi-section strategy document that reads like a senior
consultant's engagement letter. The user reviews, inline-edits any section, and
must **approve** the brief before proceeding.

This screen transforms raw data into narrative — the moment the wizard stops
feeling like a form and starts feeling like a consulting engagement.

**Key design shift:** The center panel switches from beige `#F1EEEA` to **white
`#FFFFFF`** to create a document/paper feel. Max-width `720px`, centered. Think
McKinsey engagement letter meets modern SaaS.

> "We've compiled your business context, diagnostics, and system selections
>  into a strategy brief. Review, edit, and approve to proceed."

---

## ASCII WIREFRAME — Desktop (1440px)

```
┌────────────────────────────────────────────────────────────────��─────────┐
│                                                                          │
│  ☀ AMO AI    Step 4: Executive Summary                   ✓ All saved    │
│                                                                          │
├───────────┬───────────────────────────────────────────┬──────────────────┤
│           │                   #F1EEEA bg              │                  │
│  STEPS    │    ┌─── DOCUMENT CONTAINER ───────────┐   │  BRIEF           │
│  240px    │    │         #FFFFFF bg                │   │  GUIDE           │
│  #FFF     │    │       max-width: 720px            │   │  320px #FFF      │
│           │    │       centered in panel            │   │                  │
│ ┌───────┐ │    │     48px top, 32px side pad       │   │ ┌──────────────┐ │
│ │ ✓ 1   │ │    │                                   │   │ │              │ │
│ │ Biz.  │ │    │  STRATEGY BRIEF ← 12px uc, green  │   │ │  TABLE OF    │ │
│ │       │ │    │                                   │   │ │  CONTENTS    │ │
│ │ ✓ 2   │ │    │  Acme Retail Group                │   │ │              │ │
│ │ Diag. │ │    │  ← 32px Playfair Display          │   │ │  ◉ Executive │ │
│ │       │ │    │                                   │   │ │    Summary   │ │
│ │ ✓ 3   │ │    │  Prepared by AMO AI        │   │ │  ○ Company   │ │
│ │ Recs. │ │    │  March 7, 2026                    │   │ │    Profile   │ │
│ │       │ │    │  ════ ← 60px lime green rule      │   │ │  ○ Industry  │ │
│ │ ◉ 4   │ │    │                                   │   │ │    Analysis  │ │
│ │ Exec. │ │    │                                   │   │ │  ○ Recommend.│ │
│ │       │ │    │  ─── EXECUTIVE SUMMARY ─── ✎     │   │ │    Systems   │ │
│ │ ○ 5   │ │    │                                   │   │ │  ○ Proposed  │ │
│ │Launch │ │    │  Acme Retail Group is a medium-    │   │ │    Roadmap   │ │
│ │       │ │    │  sized e-commerce business         │   │ │  ○ Expected  │ │
│ └───────┘ │    │  focused on growth. Based on our   │   │ │    Outcomes  │ │
│           │    │  analysis, the primary opportunity  │   │ │  ○ Next Steps│ │
│ ┌───────┐ │    │  areas are support automation,     │   │ │              │ │
│ │CONTEXT│ │    │  cart recovery, and personaliz-    │   │ │  ─────────── │ │
│ │ CARD  │ │    │  ation. We recommend 3 AI-powered  │   │ │              │ │
│ │       │ │    │  systems targeting customer        │   │ │  DOCUMENT    │ │
│ │ Acme  │ │    │  experience and revenue growth.    │   │ │  ACTIONS     │ │
│ │ E-com │ │    │  The proposed roadmap spans 12     │   │ │              │ │
│ │ Medium│ │    │  weeks with an estimated ROI of    │   │ │  [Export PDF] │ │
│ │ Growth│ │    │  3-6 months.                       │   │ │  [Print]      │ │
│ │       │ │    │                                   │   │ │  [Share Link] │ │
│ ├───────┤ │    │                                   │   │ │              │ │
│ │SIGNALS│ │    │  ─── COMPANY PROFILE ──────────   │   │ │  ─────────── │ │
│ │● Cart │ │    │                                   │   │ │              │ │
│ │● Suppt│ │    │  Company     Acme Retail Group    │   │ │  VERSION     │ │
│ │● Pers.│ │    │  ──────────────────────────────   │   │ │  HISTORY     │ │
│ │● Repea│ │    │  Industry    E-commerce / Retail  │   │ │              │ │
│ ├───────┤ │    │  ──────────────────────────────   │   │ │  V1 — Draft  │ │
│ │SYSTEMS│ │    │  Size        Medium (11-50)       │   │ │  Created now │ │
│ │ ✓ AI  │ │    │  ──────────────────────────────   │   │ │              │ │
│ │  Suppt│ │    │  Goal        Growth               │   │ │              │ │
│ │ ✓ Cart│ │    │  ──────────────────────────────   │   │ │              │ │
│ │  Recov│ │    │  Website     www.acmeretail.com   │   │ │              │ │
│ │ ✓ Rec.│ │    │                                   │   │ │              │ │
│ │  Eng. │ │    │  ← Read-only (edit via Step 1)    │   │ │              │ │
│ ├───────┤ │    │                                   │   │ │              │ │
│ │BRIEF  │ │    │                                   │   │ │              │ │
│ │STATUS │ │    │  ─── INDUSTRY ANALYSIS ──── ✎    │   │ │              │ │
│ │       │ │    │                                   │   │ │              │ │
│ │ ● Drft│ │    │  Industry Analysis:                │   │ │              │ │
│ │  V1   │ │    │  E-commerce & Retail              │   │ │              │ │
│ │ Edited│ │    │                                   │   │ │              │ │
│ │ just  │ │    │  Based on our diagnostic of your   │   │ │              │ │
│ │ now   │ │    │  e-commerce operations, we've      │   │ │              │ │
│ └───────┘ │    │  identified the following key      │   │ └──────────────┘ │
│           │    │  findings:                         │   │                  │
│           │    │                                   │   │                  │
│           │    │  🔴 Cart abandonment rate above    │   │                  │
│           │    │     50% — significantly above      │   │                  │
│           │    │     industry average (38%)         │   │                  │
│           │    │                                   │   │                  │
│           │    │  🟡 Customer support is fully      │   │                  │
│           │    │     manual — high opportunity      │   │                  │
│           │    │     for AI automation              │   │                  │
│           │    │                                   │   │                  │
│           │    │  🟡 No personalization in place    │   │                  │
│           │    │     — missing 10-30% uplift in     │   │                  │
│           │    │     average order value            │   │                  │
│           │    │                                   │   │                  │
│           │    │  🔴 Low repeat customer revenue    │   │                  │
│           │    │     (<20%) — retention is the      │   │                  │
│           │    │     primary growth lever           │   │                  │
│           │    │                                   │   │                  │
│           │    │                                   │   │                  │
│           │    │  ─── RECOMMENDED SYSTEMS ──────   │   │                  │
│           │    │                                   │   │                  │
│           │    │  #1  AI Customer Support Engine    │   │                  │
│           │    │      → Automates 60-80% of        │   │                  │
│           │    │        support inquiries           │   │                  │
│           │    │      Impact: High  Effort: Med    │   │                  │
│           │    │  ──────────────────────────────   │   │                  │
│           │    │  #2  Cart Recovery & Follow-Up    │   │                  │
│           │    │      → Recovers 10-15% of         │   │                  │
│           │    │        abandoned carts             │   │                  │
│           │    │      Impact: High  Effort: Small  │   │                  │
│           │    │  ──────────────────────────────   │   │                  │
│           │    │  #3  Recommendation Engine         │   │                  │
│           │    │      → Increases AOV 10-30%        │   │                  │
│           │    │      Impact: Med   Effort: Med    │   │                  │
│           │    │                                   │   │                  │
│           │    │                                   │   │                  │
│           │    │  ─── PROPOSED ROADMAP ─────────   │   │                  │
│           │    │                                   │   │                  │
│           │    │  ┌──────────┐→┌──────────┐→┌────────┐│                  │
│           │    │  │ PHASE 1  │ │ PHASE 2  │ │PHASE 3 ││                  │
│           │    │  │Foundation│ │Implement.│ │Optimize││                  │
│           │    │  │Wk 1-4   │ │Wk 5-8    │ │Wk 9-12 ││                  │
│           │    │  │          │ │          │ │        ││                  │
│           │    │  │• Setup   │ │• Deploy  │ │• Tune  ││                  │
│           │    │  │• Integ.  │ │• Test    │ │• Scale ││                  │
│           │    │  │• Data    │ │• Train   │ │• Auto  ││                  │
│           │    │  └──────────┘ └──────────┘ └────────┘│                  │
│           │    │                                   │   │                  │
│           │    │                                   │   │                  │
│           │    │  ─── EXPECTED OUTCOMES ──── ✎    │   │                  │
│           │    │                                   │   │                  │
│           │    │  ┌────────────┐ ┌────────────┐    │   │                  │
│           │    │  │ ⏱ Support  │ │ 🛒 Cart    │    │   │                  │
│           │    │  │ Response   │ │ Recovery   │    │   │                  │
│           │    │  │            │ │            │    │   │                  │
│           │    │  │  80%       │ │  10-15%    │    │   │                  │
│           │    │  │  faster    │ │  recovered │    │   │                  │
│           │    │  └────────────┘ └────────────┘    │   │                  │
│           │    │  ┌────────────┐ ┌────────────┐    │   │                  │
│           │    │  │ 🔄 Repeat  │ │ 💰 AOV     │    │   │                  │
│           │    │  │ Purchase   │ │ Increase   │    │   │                  │
│           │    │  │            │ │            │    │   │                  │
│           │    │  │  25-40%    │ │  10-30%    │    │   │                  │
│           │    │  │  increase  │ │  higher    │    │   │                  │
│           │    │  └────────────┘ └────────────┘    │   │                  │
│           │    │                                   │   │                  │
│           │    │                                   │   │                  │
│           │    │  ─── NEXT STEPS ──────────────   │   │                  │
│           │    │                                   │   │                  │
│           │    │  Upon approval of this brief:     │   │                  │
│           │    │                                   │   │                  │
│           │    │  ☑ Project created with selected  │   │                  │
│           │    │    systems                        │   │                  │
│           │    │  ☑ Roadmap phases and milestones  │   │                  │
│           │    │    set                            │   │                  │
│           │    │  ☑ Initial tasks generated for    │   │                  │
│           │    │    Phase 1                        │   │                  │
│           │    │  ☑ Dashboard access enabled       │   │                  │
│           │    │                                   │   │                  │
│           │    │                                   │   │                  │
│           │    │  ═══ APPROVAL ═════════════════   │   │                  │
│           │    │                                   │   │                  │
│           │    │  Ready to proceed?                │   │                  │
│           │    │                                   │   │                  │
│           │    │  By approving this brief, your    │   │                  │
│           │    │  project will be created and      │   │                  │
│           │    │  you'll enter your dashboard.     │   │                  │
│           │    │                                   │   │                  │
│           │    │  ┌──────────────┐ ┌─────────────┐ │   │                  │
│           │    │  │  Request     │ │  Approve    │ │   │                  │
│           │    │  │  Changes     │ │  Brief  ✓   │ │   │                  │
│           │    │  │  (outlined)  │ │  (green bg) │ │   │                  │
│           │    │  └──────────────┘ └─────────────┘ │   │                  │
│           │    │                                   │   │                  │
│           │    │  You can edit any section above    │   │                  │
│           │    │  before approving.                 │   │                  │
│           │    │                                   │   │                  │
│           │    └───────────────────────────────────┘   │                  │
│           │                                           │                  │
├───────────┴───────────────────────────────────────┴──────────────────┤
│                                                                      │
│  ← Back        ● Draft — Not yet approved          Continue →        │
│                                            (active after approval)    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Mobile (375px)

```
┌─────────────────────────────┐
│ Step 4/5  ✓✓✓●○  ✓ Saved   │
│ ═══════════════●═══  80%   │
├─────────────────────────────┤
│                             │
│  STRATEGY BRIEF             │
│  ────────────────           │
│  Acme Retail Group          │
│  Prepared by AMO AI  │
│  March 7, 2026              │
│  ════ (green rule)          │
│                             │
│  ● Draft  V1                │
│                             │
│  ── TOC (horizontal scroll) │
│  [Exec] [Company] [Indust]  │
│  [Systems] [Roadmap] [Out]  │
│  ────────────────           │
│                             │
│  EXECUTIVE SUMMARY     ✎   │
│  ─────────────────          │
│  Acme Retail Group is a     │
│  medium-sized e-commerce    │
│  business focused on        │
│  growth...                  │
│                             │
│  COMPANY PROFILE            │
│  ─────────────────          │
│  Company    Acme Retail     │
│  Industry   E-commerce      │
│  Size       Medium (11-50)  │
│  Goal       Growth          │
│  (edit via Step 1)          │
│                             │
│  INDUSTRY ANALYSIS     ✎   │
│  ─────────────────          │
│  🔴 Cart abandonment >50%  │
│  🟡 Manual support          │
│  🟡 No personalization      │
│  🔴 Low repeat revenue      │
│                             │
│  RECOMMENDED SYSTEMS        │
│  ─────────────────          │
│  #1 AI Support   High  Med  │
│  #2 Cart Recov.  High  Sm.  │
│  #3 Recomm. Eng. Med   Med  │
│                             │
│  PROPOSED ROADMAP           │
│  ─────────────────          │
│  Phase 1: Foundation  Wk1-4 │
│  │                          │
│  Phase 2: Implement.  Wk5-8 │
│  │                          │
│  Phase 3: Optimize   Wk9-12 │
│                             │
│  EXPECTED OUTCOMES     ✎   │
│  ─────────────────          │
│  ┌──────────┐┌──────────┐  │
│  │ 80%      ││ 10-15%   │  │
│  │ faster   ││ recovered│  │
│  └──────────┘└──────────┘  │
│  ┌──────────┐┌──────────┐  │
│  │ 25-40%   ││ 10-30%   │  │
│  │ repeat   ││ AOV      │  │
│  └──────────┘└──────────┘  │
│                             │
│  NEXT STEPS                 │
│  ─────────────────          │
│  ☑ Project created          │
│  ☑ Roadmap phases set       │
│  ☑ Tasks generated          │
│  ☑ Dashboard activated      │
│                             │
│  ┌───────────────────────┐  │
│  │   Approve Brief  ✓   │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │  Request Changes      │  │
│  └───────────────────────┘  │
│                             │
│  ── FAB (floating) ──       │
│  [PDF] [Print] [Share]      │
│                             │
├─────────────────────────────┤
│ ← Back  ● Draft  Continue →│
└─────────────────────────────┘
```

---

## DOCUMENT DESIGN SPEC

### Center Panel Override

```
IMPORTANT: Center panel changes for this screen only.
─────────────────────────────────────────────────────

Normal wizard steps:  #F1EEEA background (beige)
Step 4 center panel:  #F1EEEA background REMAINS
  └── Document container INSIDE:
      ├── Background: #FFFFFF (white — paper feel)
      ├── Max-width: 720px
      ├── Centered horizontally in panel
      ├── Padding: 48px top, 32px sides, 48px bottom
      ├── Border: 1px #E5E2DE (very subtle, sides only)
      ├── Shadow: none (or 0 1px 3px rgba(10,33,31,0.03))
      └── Feel: premium PDF rendered in browser
```

### Brief Header Typography

```
STRATEGY BRIEF ................ 12px uppercase, letter-spacing 0.1em, #84CC16
Company Name .................. 32px Playfair Display, 600 weight, #0A211F
Prepared by AMO AI ..... 14px Lora, 400 weight, #9CA3AF
Date .......................... 14px Lora, 400 weight, #9CA3AF
Green rule .................... 2px height, 60px width, #84CC16, centered-left
```

### Section Typography

```
Section heading ............... 24px Playfair Display, #0A211F
  + ✎ edit icon ............... 16px, #9CA3AF, hover: #0A211F
Body text ..................... 16px Lora, line-height 28px, #0A211F
Table labels .................. 14px Inter, 500 weight, #9CA3AF
Table values .................. 14px Lora, 400 weight, #0A211F
Bullet dots (severity):
  🔴 Red (problems) .......... #DC2626
  🟡 Amber (opportunities) ... #D97706
  🟢 Green (strengths) ....... #84CC16
System priority badges ........ 12px Inter, 600 weight, #84CC16 bg
Impact/Effort badges .......... 12px Inter, colored per level
Outcome metric numbers ........ 32px JetBrains Mono, #0A211F
Outcome metric labels ......... 13px Inter, #9CA3AF
```

---

## CONTENT DATA — 7 BRIEF SECTIONS

### Section 1: Executive Summary (Editable ✎)

| Field | Source | Generated By |
|-------|--------|-------------|
| Paragraph (3-4 sentences) | Steps 1-3 synthesized | Gemini 3 |

**Template (Gemini 3 fallback):**
```
{company_name} is a {company_size} {industry} business focused on {primary_goal}.
Based on our analysis, the primary opportunity areas are {top_signals}.
We recommend {selected_systems_count} AI-powered systems targeting {primary_impact_areas}.
The proposed roadmap spans {total_duration} with an estimated ROI of {roi_projection}.
```

### Section 2: Company Profile (Read-only)

| Field | Value | Source |
|-------|-------|--------|
| Company | Acme Retail Group | Step 1: companyName |
| Industry | E-commerce / Retail | Step 1: industry |
| Size | Medium (11-50 employees) | Step 1: companySize |
| Primary Goal | Growth | Step 1: goal |
| Website | www.acmeretail.com | Step 1: websiteUrl |

Read-only table. "Edit via Step 1" link at bottom → navigates back.

### Section 3: Industry Analysis (Editable ✎)

| Field | Source | Generated By |
|-------|--------|-------------|
| Intro paragraph | Step 2 answers | Gemini 3 |
| Key findings (bulleted list) | Signals + benchmarks | Gemini 3 |

**Signal-to-Finding Mapping:**

| Signal | Finding Text | Severity | Dot Color |
|--------|-------------|----------|-----------|
| `high-cart-abandonment` | Cart abandonment rate above 50% — significantly above industry average (38%) | Critical | 🔴 Red |
| `manual-support` | Customer support is fully manual — high opportunity for AI automation | Opportunity | 🟡 Amber |
| `no-personalization` | No personalization in place — missing 10-30% uplift in average order value | Opportunity | 🟡 Amber |
| `low-repeat-revenue` | Low repeat customer revenue (<20%) — retention is the primary growth lever | Critical | 🔴 Red |
| `no-retention` | No structured post-purchase follow-up — risk of customer churn | Critical | 🔴 Red |
| `manual-sales` | Sales process is manual — significant time and conversion optimization available | Opportunity | 🟡 Amber |
| `single-channel` | Heavy reliance on single acquisition channel — diversification recommended | Opportunity | 🟡 Amber |

### Section 4: Recommended Systems (Read-only)

Compact list (not full cards). Per system:

| Field | Example |
|-------|---------|
| Priority badge | `#1` lime green pill |
| System name | AI Customer Support Engine |
| Why (1 sentence) | From Step 3 "why it fits" data |
| Impact badge | High (green) |
| Effort badge | Medium (amber) |

### Section 5: Proposed Roadmap (Read-only)

| Phase | Title | Timeline | Focus Areas |
|-------|-------|----------|-------------|
| Phase 1 | Foundation | Weeks 1-4 | Setup, integration, data preparation |
| Phase 2 | Implementation | Weeks 5-8 | System deployment, testing, training |
| Phase 3 | Optimization | Weeks 9-12 | Performance tuning, scaling, automation |

Visual: 3 horizontal cards connected by arrows. Phase 1 highlighted.

### Section 6: Expected Outcomes (Editable ✎)

2×2 grid of outcome metric cards:

| Metric | Icon | Projected Improvement |
|--------|------|----------------------|
| Support Response Time | `Clock` | 80% faster |
| Cart Recovery Rate | `ShoppingCart` | 10-15% recovered |
| Repeat Purchase Rate | `RefreshCw` | 25-40% increase |
| Average Order Value | `DollarSign` | 10-30% higher |

### Section 7: Next Steps (Read-only)

Checklist of what approval triggers:
```
☑ Project created with selected systems
☑ Roadmap phases and milestones set
☑ Initial tasks generated for Phase 1
☑ Dashboard access enabled
```

---

## APPROVAL SECTION

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Ready to proceed?                                  │
│                                                     │
│  By approving this brief, your project will be      │
│  created and you'll enter your dashboard.           │
│                                                     │
│  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │ Request Changes  │  │    Approve Brief  ✓     │ │
│  │                  │  │                          │ │
│  │  #0A211F border  │  │  #84CC16 bg, #0A211F txt│ │
│  │  #FFF bg         │  │  bold                    │ │
│  │  outlined        │  │  filled                  │ │
│  └──────────────────┘  └──────────────────────────┘ │
│                                                     │
│  You can edit any section above before approving.   │
│                                                     │
└─────────────────────────────────────────────────────┘

"REQUEST CHANGES" FLOW:
├── Opens a notes textarea modal: "What would you like changed?"
├── Sets brief status: "In Review" (blue badge)
├── Stores change request in WizardState.changeRequest
├── Future: notifies AMO AI team
└── User can continue editing and re-approve

"APPROVE BRIEF" FLOW:
├── Confirmation dialog: "Approve this brief and create your project?"
├── On confirm:
│   ├── Brief status → "Approved" (green badge)
│   ├── Create final version snapshot
│   ├── Set step 4 complete
│   ├── "Continue" button in footer becomes active
│   └── User can proceed to Step 5
└── On cancel: stay on page
```

### Brief Status Badge States

```
DRAFT (default):
┌────────────────┐
│ ● Draft        │   #F59E0B text, #FEF9E7 bg (amber)
└────────────────┘

IN REVIEW (after "Request Changes"):
┌────────────────┐
│ ● In Review    │   #2563EB text, #EFF6FF bg (blue)
└────────────────┘

APPROVED (after "Approve Brief"):
┌────────────────┐
│ ✓ Approved     │   #84CC16 text, #F0FDF4 bg (green)
└────────────────┘
```

---

## LEFT PANEL ADDITIONS

### Brief Status Section (new, below Systems)

```
┌───────────────────┐
│ BRIEF STATUS      │
│                   │
│ ● Draft           │  ← status badge (amber/blue/green)
│ Version 1         │
│ Last edited:      │
│ just now          │
└───────────────────┘
```

---

## RIGHT PANEL — BRIEF GUIDE

### Table of Contents (scrollspy)

```
BRIEF GUIDE ← Playfair Display, dark teal
────────────────────────────

◉ Executive Summary    ← active (green left border, bold)
○ Company Profile
○ Industry Analysis
○ Recommended Systems
○ Proposed Roadmap
○ Expected Outcomes
○ Next Steps

Click any → smooth scroll center panel to that section
Active updates on scroll (Intersection Observer)
```

### Document Actions

```
────────────────────────────
DOCUMENT ACTIONS

┌──────────────────────────┐
│  📄 Export as PDF         │  outlined button
└──────────────────────────┘
┌──────────────────────────┐
│  🖨 Print                │  outlined button
└──────────────────────────┘
┌──────────────────────────┐
│  🔗 Share Link           │  outlined button
└──────────────────────────┘
```

### Version History

```
────────────────────────────
VERSION HISTORY

Version 1 — Current Draft
Created Mar 7, 2026

(if edited:)
Version 2 — Edited
Mar 7, 2026, 2:15 PM
```

---

## INLINE EDITING SPEC

```
READ MODE:
┌─────────────────────────────────────────┐
│  ─── EXECUTIVE SUMMARY ──────────  ✎  │
│                                         │
│  Acme Retail Group is a medium-sized    │
│  e-commerce business focused on growth. │
│  Based on our analysis...               │
│                                         │
└─────────────────────────────────────────┘
  ✎ icon: 16px, #9CA3AF, opacity 0.5
  On hover: opacity 1, color #0A211F

CLICK ✎ → EDIT MODE:
┌─────────────────────────────────────────┐
│  ─── EXECUTIVE SUMMARY ────── ✓  ✗    │
│  ┌─────────────────────────────────┐    │
│  │                                 │    │  2px #84CC16 border
│  │  Acme Retail Group is a medium- │    │  white bg
│  │  sized e-commerce business      │    │  auto-height textarea
│  │  focused on growth. Based on    │    │
│  │  our analysis...                │    │
│  │                                 │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Edited ← subtle badge appears          │
└─────────────────────────────────────────┘
  ✓ save: green, saves + exits edit mode
  ✗ cancel: gray, reverts to AI text

motion/react transition:
  Read → Edit: { height: 'auto', borderColor: '#84CC16' } 200ms
  Edit → Read: { height: 'auto', borderColor: 'transparent' } 200ms
```

---

## UI COMPONENTS

```
COMPONENT TREE
│
├── StepExecutiveSummary.tsx (C33)
│   ├── DocumentContainer ................ white 720px centered wrapper
│   │   ├── BriefHeader .................. STRATEGY BRIEF, company, date, rule
│   │   ├── BriefSection (×7) ............ section container
│   │   │   ├── SectionHeading ........... title + optional ✎ icon
│   │   │   ├── SectionContent ........... read mode (rendered text)
│   │   │   └── SectionEditor ............ edit mode (textarea + ✓/✗)
│   │   ├── CompanyProfileTable .......... key-value table layout
│   │   ├── IndustryFindings ............. bulleted list with severity dots
│   │   ├── SystemMiniList ............... compact system + priority + badges
│   │   ├── RoadmapPhases ............... 3 horizontal connected cards
│   │   ├── OutcomeGrid ................. 2×2 metric cards
│   │   ├── NextStepsChecklist .......... ☑ checklist items
│   │   └── ApprovalSection ............. Request Changes + Approve Brief
│   │
│   ├── ContextPanel (right)
│   │   ├── BriefTableOfContents ........ scrollspy nav
│   │   ├── DocumentActions ............. PDF, Print, Share buttons
│   │   └── VersionHistory .............. version list
│   │
│   └── StepSidebar additions
│       └── BriefStatusBadge ............ Draft / In Review / Approved
```

---

## WORKFLOW

```
ENTRY
│
├── User arrives at Step 4
│   ├── Check for existing brief (localStorage or state)
│   │   ├── Exists → load and display (pre-filled)
│   │   └── Not exists → trigger Gemini 3 generation
│   │       ├── Input: all Steps 1-3 data + signals + selections
│   │       ├── Show skeleton loading (sections appear one-by-one, top→bottom)
│   │       ├── Generation: 5-10 seconds
│   │       ├── Each section fades in with staggered 200ms delay
│   │       └── Brief status: "Draft" (amber)
│   ├── Initialize scrollspy (section navigator)
│   ├── Set initial version: V1
│   └── Footer: "Draft — Not yet approved"

INTERACTION
│
├── User reads brief
│   ├── Scroll through 7 sections
│   ├── Right panel TOC tracks active section
│   └── Document should be scannable in 30 seconds
│
├── User edits a section (optional)
│   ├── Click ✎ → textarea appears with AI text pre-filled
│   ├── Edit → auto-save on blur (or click ✓)
│   ├── Cancel → click ✗ (reverts to AI-generated text)
│   ├── "Edited" badge appears on section
│   ├── Version increments (V1 → V2)
│   ├── Version history updates in right panel
│   └── Edits stored in WizardState.briefEdits{}
│
├── User clicks "Request Changes"
│   ├── Modal: "What would you like changed?" (textarea)
│   ├── Brief status → "In Review" (blue)
│   ├── User can continue editing
│   └── Can re-approve after changes
│
├── User clicks "Approve Brief"
│   ├── Confirmation dialog: "Approve this brief and create your project?"
│   ├── On confirm:
│   │   ├── Brief status → "Approved" (green)
│   │   ├── Final version snapshot saved
│   │   ├── Step 4 marked complete
│   │   ├── Footer: "✓ Approved"
│   │   └── "Continue" button activates
│   └── On cancel: stay on page
│
├── User uses Document Actions
│   ├── Export PDF → generates PDF from brief content
│   ├── Print → opens print dialog (CSS @media print)
│   └── Share Link → copies shareable URL to clipboard

EXIT
│
├── User clicks "Continue" (only after approval)
│   ├── Navigate to Step 5 (Launch)
│   └── All brief data + edits carried forward
│
├── User clicks "Back"
│   └── Navigate to Step 3 (brief preserved, can return)
```

---

## AGENT BEHAVIOR — GEMINI 3 INTEGRATION

```
AI GENERATES THE ENTIRE BRIEF
══════════════════════════════

TRIGGER: On Step 4 entry (synchronous — user sees loading)
MODEL:   Gemini 3

PROMPT:
────────
System: You are a senior AI strategy consultant at AMO AI.
        Generate a comprehensive strategy brief for a prospective 
        client based on their business context, industry diagnostics,
        and system selections. Write in a professional, consultative
        tone — like a strategy partner presenting findings.

        Requirements:
        - Use concrete numbers from the diagnostic data
        - Reference specific answers (not generic statements)
        - Include industry benchmarks for comparison
        - Severity ratings: red for critical problems, amber for opportunities
        - Be specific, confident, and never hyperbolic
        - The brief should be scannable in 30 seconds but rewarding to read

Input: {
  company: "Acme Retail Group",
  industry: "e-commerce",
  size: "medium",
  goal: "growth",
  challenge: "...",
  website: "www.acmeretail.com",
  diagnostics: { Q1-Q8 answers },
  signals: ["high-cart-abandonment", "manual-support", ...],
  selectedSystems: ["support-engine", "cart-recovery", "recommendation-engine"],
  systemMetadata: { ... }
}

Output: {
  executiveSummary: "Acme Retail Group is a medium-sized e-commerce...",
  industryAnalysis: {
    intro: "Based on our diagnostic of your e-commerce operations...",
    findings: [
      { text: "Cart abandonment rate above 50%...", severity: "red" },
      { text: "Customer support is fully manual...", severity: "amber" },
      ...
    ]
  },
  roadmap: {
    phases: [
      { 
        number: 1, title: "Foundation", weeks: "1-4",
        outcomes: ["Setup & integration", "Data preparation", "Architecture"] 
      },
      ...
    ]
  },
  expectedOutcomes: [
    { metric: "Support Response Time", icon: "clock", value: "80% faster" },
    { metric: "Cart Recovery Rate", icon: "shopping-cart", value: "10-15% recovered" },
    { metric: "Repeat Purchase Rate", icon: "refresh", value: "25-40% increase" },
    { metric: "Average Order Value", icon: "dollar", value: "10-30% higher" }
  ]
}

LOADING UX:
├── Skeleton shimmer on each section position
├── Sections fade in one-by-one, top to bottom (staggered 200ms)
├── Brief header renders immediately (from Step 1 data — no AI needed)
├── Company profile renders immediately (from Step 1 data)
├── AI-dependent sections (exec summary, analysis, roadmap, outcomes) shimmer
├── "Generating your strategy brief..." subtle status text above document
└── Total generation time: 5-10 seconds

FALLBACK (if Gemini 3 unavailable):
├── Template-based brief using Step 1-3 data directly
├── Industry analysis from signal severity mapping (static table)
├── Roadmap from phase templates
├── Outcomes from system metadata benchmarks
├── Less narrative, more structured — still professional
└── User sees same layout, slightly less polished prose

EDITS:
├── AI-generated text is fully editable by user
├── All edits are versioned (nothing lost)
├── Edited sections carry forward to Step 5 and final output
├── User can revert individual sections to AI-generated text (cancel edit)
└── Version history shows all changes
```

---

## CONFIDENCE SCORE

```typescript
interface ConfidenceFactors {
  companyNameProvided: boolean;   // +5
  websiteProvided: boolean;       // +10 (optional but valuable)
  industrySelected: boolean;      // +10
  companySizeSelected: boolean;   // +5
  goalSelected: boolean;          // +10
  challengeDescribed: boolean;    // +10 (min 50 chars: +5 bonus)
  allDiagnosticsAnswered: boolean; // +15
  noDontKnowAnswers: boolean;     // +10
  systemsSelected: boolean;       // +10
  twoOrMoreSystems: boolean;      // +5
  documentsUploaded: boolean;     // +10
}

// Score: 0-100%
// 80%+ = "High confidence — enough data for accurate scoping"
// 60-79% = "Good confidence — some assumptions may be needed"
// <60% = "Moderate confidence — we'll refine during discovery"
```

---

## ACCESSIBILITY

```
├── Document container: role="article", aria-label="Strategy Brief"
├── Brief sections: proper heading hierarchy (h2 for section titles)
├── Edit button: aria-label="Edit [section name]"
├── Edit mode: aria-label="Editing [section name]", textarea focused
├── Save/cancel: aria-label="Save changes" / "Cancel editing"
├── Severity dots: aria-label="Critical" / "Opportunity" / "Strength"
├── Roadmap phases: presented as ordered list (ol/li)
├── Outcome grid: role="list", each card role="listitem"
├── Approval buttons: clearly labeled, distinct visual weight
├── Confirmation dialog: role="alertdialog", focus trapped
├── Status badge: aria-live="polite" (announces status changes)
├── Section navigator: role="navigation", aria-label="Brief sections"
├── Active section: aria-current="true"
├── Skeleton loading: aria-busy="true" on document container
├── Version history: role="list"
└── Screen reader: "Step 4 of 5: Executive Summary — reviewing strategy brief, status: draft"
```

---

## IMPLEMENTATION NOTES

```
DEPENDENCIES:
├── motion/react .................. section stagger fade-in, edit transitions
├── lucide-react .................. section icons, edit icons, severity icons
├── sonner@2.0.3 .................. edit save confirmations, share link toast
└── intersection-observer ......... scrollspy for section navigator

FILES:
├── /components/wizard/steps/StepExecutiveSummary.tsx ... C33
├── /components/wizard/ui/DocumentContainer.tsx
├── /components/wizard/ui/BriefHeader.tsx
├── /components/wizard/ui/BriefSection.tsx
├── /components/wizard/ui/SectionEditor.tsx
├── /components/wizard/ui/CompanyProfileTable.tsx
├── /components/wizard/ui/IndustryFindings.tsx
├── /components/wizard/ui/SystemMiniList.tsx
├── /components/wizard/ui/RoadmapPhases.tsx
├── /components/wizard/ui/OutcomeGrid.tsx
├── /components/wizard/ui/NextStepsChecklist.tsx
├── /components/wizard/ui/ApprovalSection.tsx
├── /components/wizard/ui/BriefTableOfContents.tsx
├── /components/wizard/ui/DocumentActions.tsx
├── /components/wizard/ui/VersionHistory.tsx
├── /components/wizard/ui/BriefStatusBadge.tsx
└── /components/wizard/ui/ConfidenceScore.tsx

KEY DECISIONS:
├── Center panel = #FFFFFF document on #F1EEEA bg (paper feel)
├── Max-width 720px (document, not landing page)
├── 7 brief sections (exec, company, industry, systems, roadmap, outcomes, next)
├── 3 editable sections (exec summary, industry analysis, outcomes)
├── Company profile is read-only (edit via Step 1 link)
├── Approval is REQUIRED before Continue is active
├── "Request Changes" is soft (doesn't block, sets review status)
├── Version history tracks all edits
├── Document Actions (PDF, Print, Share) in right panel
├── Severity dots (red/amber/green) on industry findings
├── Skeleton loading: sections appear one-by-one with staggered fade-in
├── Roadmap as 3 horizontal connected cards (not a Gantt)
└── The brief should feel like a premium consulting document, not a form
```
