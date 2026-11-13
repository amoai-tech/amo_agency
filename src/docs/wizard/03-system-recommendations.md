# 03 — SYSTEM RECOMMENDATIONS
# Wizard Step 3 of 5

**Component:** `C32-StepSystemRecommendations`
**File:** `/components/wizard/steps/StepSystemRecommendations.tsx`
**Route:** `/wizard` (step 3)
**Status:** PLANNED
**Parent Doc:** `00-wizard.md`

---

## SCREEN PURPOSE

The decision screen. AI-generated system recommendations are presented as ranked
cards with personalized "why it fits" explanations tied to the user's specific
answers from Steps 1–2. The user selects which systems to pursue. The right panel
acts as a live selection summary with combined impact estimates.

This is the richest screen in the wizard — where intelligence meets decision-making.

> "Based on your industry, goals, and diagnostic results, we recommend
>  these systems. Select the ones you'd like to pursue."

---

## ASCII WIREFRAME — Desktop (1440px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  ☀ AMO AI    Step 3: System Recommendations              ✓ All saved    │
│                                                                          │
├───────────┬───────────────────────────────────────────┬──────────────────┤
│           │                                           │                  │
│  STEPS    │          CENTER PANEL                     │  SELECTION       │
│  240px    │          #F1EEEA                          │  SUMMARY         │
│  #FFF     │                                           │  320px #FFF      │
│           │                                           │                  │
│ ┌───────┐ │  SYSTEM RECOMMENDATIONS                   │ ┌──────────────┐ │
│ │ ✓ 1   │ │                                           │ │              │ │
│ │ Biz.  │ │  Our recommendations                      │ │ YOUR         │ │
│ │       │ │  for your business                        │ │ SELECTION    │ │
│ │ ✓ 2   │ │                                           │ │ SUMMARY      │ │
│ │ Diag. │ │  Based on your industry, goals, and       │ │              │ │
│ │       │ │  diagnostic results.                      │ │ (empty state │ │
│ │ ◉ 3   │ │                                           │ │  or live     │ │
│ │ Recs. │ │  Sort: [Recommended] [Impact] [Effort]    │ │  summary)    │ │
│ │       │ │                                           │ │              │ │
│ │ ○ 4   │ │  ┌─────────────────────────────────────┐  │ │ When empty:  │ │
│ │ Exec. │ │  │                                     │  │ │ "Select      │ │
│ │       │ │  │  #1 RECOMMENDED              [☑ ON] │  │ │  systems to  │ │
│ │ ○ 5   │ │  │                                     │  │ │  see your    │ │
│ │Launch │ │  │  AI Customer Support Engine          │  │ │  summary."   │ │
│ │       │ │  │  Automated first-line support with   │  │ │              │ │
│ └───────┘ │  │  intelligent escalation              │  │ ├──────────────┤ │
│           │  │                                     │  │ │              │ │
│ ┌───────┐ │  │  WHY THIS FITS YOUR BUSINESS        │  │ │ When filled: │ │
│ │CONTEXT│ │  │  → Your support is email-only —      │  │ │              │ │
│ │ CARD  │ │  │    automates 60-80% of inquiries    │  │ │ SELECTED (3) │ │
│ │       │ │  │  → Customers find you via Google —   │  │ │              │ │
│ │ Acme  │ │  │    chatbot improves on-site convert.│  │ │ ✓ AI Support │ │
│ │ E-com │ │  │                                     │  │ │ ✓ Cart Recov.│ │
│ │ Medium│ │  │  ┌──────────┐┌──────────┐┌────────┐ │  │ │ ✓ Recomm.   │ │
│ │ Growth│ │  │  │Impact:   ││Effort:   ││Time:   │ │  │ │   Engine    │ │
│ │       │ │  │  │  High 🟢 ││ Medium 🟡││ 2-4 wk │ │  │ │          ×  │ │
│ ├───────┤ │  │  └──────────┘└──────────┘└────────┘ │  │ │              │ │
│ │SIGNALS│ │  │                                     │  │ ├──────────────┤ │
│ │       │ │  │  See details & trade-offs ▸         │  │ │              │ │
│ │● Cart │ │  │                                     │  │ │ COMBINED     │ │
│ │● Suppt│ │  │  ═══════════════════════════════════│  │ │ IMPACT       │ │
│ │● Pers.│ │  │  (2px lime green bottom border)     │  │ │              │ │
│ │● Repea│ │  └─────────────────────────────────────┘  │ │ Deploy:      │ │
│ │       │ │                                           │ │  6-10 weeks  │ │
│ ├───────┤ │  ┌─────────────────────────────────────┐  │ │ Effort:      │ │
│ │YOUR   │ │  │                                     │  │ │  Med-Large   │ │
│ │SELECT.│ │  │  #2                          [☑ ON] │  │ │ Focus:       │ │
│ │       │ │  │                                     │  │ │  CX + Revenue│ │
│ │ ✓ AI  │ │  │  Cart Recovery & Follow-Up          │  │ │              │ │
│ │  Suppt│ │  │  System                             │  │ ├──────────────┤ │
│ │ ✓ Cart│ │  │  Automated abandoned cart follow-up  │  │ │              │ │
│ │  Recov│ │  │  and win-back sequences             │  │ │ INVESTMENT   │ │
│ │ ✓ Rec.│ │  │                                     │  │ │ TIER         │ │
│ │  Eng. │ │  │  WHY THIS FITS YOUR BUSINESS        │  │ │              │ │
│ │       │ │  │  → Cart abandonment at 50-70% —     │  │ │ ○───●───○    │ │
│ │ 3 of 5│ │  │    recover 10-15% automatically     │  │ │ Focused      │ │
│ │       │ │  │  → No post-purchase follow-up —     │  │ │  [Compre-    │ │
│ └───────┘ │  │    this closes the retention gap    │  │ │   hensive]   │ │
│           │  │                                     │  │ │  Transform.  │ │
│           │  │  ┌──────────┐┌──────────┐┌────────┐ │  │ │              │ │
│           │  │  │Impact:   ││Effort:   ││Time:   │ │  │ ├──────────────┤ │
│           │  │  │  High 🟢 ││ Small 🟢 ││ 1-2 wk │ │  │ │              │ │
│           │  │  └──────────┘└──────────┘└────────┘ │  │ │ We recommend │ │
│           │  │                                     │  │ │ starting with│ │
│           │  │  See details & trade-offs ▸         │  │ │ your top 2-3 │ │
│           │  │                                     │  │ │ priorities.  │ │
│           │  └─────────────────────────────────────┘  │ │              │ │
│           │                                           │ └──────────────┘ │
│           │  ┌─────────────────────────────────────┐  │                  │
│           │  │                                     │  │                  │
│           │  │  #3                          [☑ ON] │  │                  │
│           │  │                                     │  │                  │
│           │  │  Personalized Recommendation         │  │                  │
│           │  │  Engine                             │  │                  │
│           │  │  AI-driven product suggestions       │  │                  │
│           │  │                                     │  │                  │
│           │  │  WHY THIS FITS YOUR BUSINESS        │  │                  │
│           │  │  → No personalization currently —    │  │                  │
│           │  │    10-30% AOV increase typical      │  │                  │
│           │  │  → Low repeat revenue (20-40%) —    │  │                  │
│           │  │    recs drive return visits         │  │                  │
│           │  │                                     │  │                  │
│           │  │  ┌──────────┐┌──────────┐┌────────┐ │  │                  │
│           │  │  │Impact:   ││Effort:   ││Time:   │ │  │                  │
│           │  │  │ Medium 🟡││ Medium 🟡││ 2-4 wk │ │  │                  │
│           │  │  └──────────┘└──────────┘└────────┘ │  │                  │
│           │  └─────────────────────────────────────┘  │                  │
│           │                                           │                  │
│           │  ┌─────────────────────────────────────┐  │                  │
│           │  │                                     │  │                  │
│           │  │  #4                          [☐ OFF]│  │                  │
│           │  │                                     │  │                  │
│           │  │  Sales & Marketing Automation        │  │                  │
│           │  │  Suite                              │  │                  │
│           │  │  End-to-end sales funnel automation  │  │                  │
│           │  │                                     │  │                  │
│           │  │  (collapsed — click to expand)       │  │                  │
│           │  │                                     │  │                  │
│           │  │  ┌──────────┐┌──────────┐┌────────┐ │  │                  │
│           │  │  │Impact:   ││Effort:   ││Time:   │ │  │                  │
│           │  │  │ Medium 🟡││ Large 🟠 ││ 4-8 wk │ │  │                  │
│           │  │  └──────────┘└──────────┘└────────┘ │  │                  │
│           │  └─────────────────────────────────────┘  │                  │
│           │                                           │                  │
│           │  ┌─────────────────────────────────────┐  │                  │
│           │  │  #5                          [☐ OFF]│  │                  │
│           │  │  Customer Loyalty & Retention        │  │                  │
│           │  │  ...                                │  │                  │
│           │  └─────────────────────────────────────┘  │                  │
│           │                                           │                  │
│           │  ── Other available systems ──             │                  │
│           │  Show 3 more systems ▸                    │                  │
│           │                                           │                  │
├───────────┴───────────────────────────────────────┴──────────────────┤
│                                                                      │
│  ← Back              All changes saved ●           Continue →        │
│                                    You can change selections later    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Expanded Card — "See details & trade-offs"

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  #1 RECOMMENDED                            [☑ ON]  │
│                                                     │
│  AI Customer Support Engine                         │
│  Automated first-line support with intelligent      │
│  escalation                                         │
│                                                     │
│  WHY THIS FITS YOUR BUSINESS                        │
│  → Your support is email-only — automates 60-80%    │
│  → Customers find you via Google — chatbot improves  │
│    on-site conversion by 15-25%                     │
│                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │Impact:   │ │Effort:   │ │Timeline: │            │
│  │  High 🟢 │ │ Medium 🟡│ │  2-4 wk  │            │
│  └──────────┘ └──────────┘ └──────────┘            │
│                                                     │
│  ┌─ DETAILS ──────────────────────────────────────┐ │
│  │                                                │ │
│  │  What this system does:                        │ │
│  │  AI chatbot handles first-line customer        │ │
│  │  inquiries across web, WhatsApp, and email.    │ │
│  │  Automatically resolves FAQs, tracks orders,   │ │
│  │  and escalates complex issues to human agents  │ │
│  │  with full context.                            │ │
│  │                                                │ │
│  │  Trade-offs to consider:                       │ │
│  │  • Requires initial training period (1-2 wks)  │ │
│  │  • Complex edge cases still need human review  │ │
│  │  • Best results with 50+ monthly conversations │ │
│  │                                                │ │
│  │  Related services:                             │ │
│  │  ┌──────────┐ ┌──────────────┐ ┌────────────┐ │ │
│  │  │ Chatbots │ │ WhatsApp AI  │ │ Sales CRM  │ │ │
│  │  └──────────┘ └──────────────┘ └────────────┘ │ │
│  │                                                │ │
│  └────────────────────────────────────────────────┘ │
│                                                     │
│  ═══════════════════════════════════════════════════ │
│  (2px lime green bottom border when selected)       │
└─────────────────────────────────────────────────────┘
```

### Mobile (375px)

```
┌─────────────────────────────┐
│ Step 3/5  ✓✓●○○  ✓ Saved   │
│ ═════════════●═════  60%   │
├─────────────────────────────┤
│                             │
│  SYSTEM RECOMMENDATIONS     │
│                             │
│  Our recommendations        │
│  for your business          │
│                             │
│  Sort: [Rec] [Impact] [Eff]│
│                             │
│  ┌───────────────────────┐  │
│  │ #1 RECOMMENDED  [☑]  │  │
│  │                       │  │
│  │ AI Customer Support   │  │
│  │ Engine                │  │
│  │                       │  │
│  │ WHY THIS FITS:        │  │
│  │ → Email-only support  │  │
│  │   → 60-80% automated  │  │
│  │                       │  │
│  │ High 🟢 Med 🟡 2-4wk │  │
│  │                       │  │
│  │ Details ▸             │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ #2            [☑]     │  │
│  │ Cart Recovery System  │  │
│  │ ...                   │  │
│  └───────────────────────┘  │
│                             │
│  ... (more cards)           │
│                             │
├─────────────────────────────┤
│ 3 selected — View Summary  │  ← sticky bottom bar
│ ┌───────────────────────┐  │     opens bottom sheet
│ │    Continue →          │  │
│ └───────────────────────┘  │
├─────────────────────────────┤
│ ← Back                     │
└─────────────────────────────┘
```

---

## CONTENT DATA — SYSTEM CATALOG

### Full System Registry

| ID | Name | Description | Icon (lucide) | Default Effort | Default Timeline |
|----|------|-------------|---------------|----------------|------------------|
| `support-engine` | AI Customer Support Engine | Automated first-line support with intelligent escalation | `Headset` | Medium | 2-4 weeks |
| `cart-recovery` | Cart Recovery & Follow-Up System | Automated abandoned cart follow-up and win-back sequences | `ShoppingCart` | Small | 1-2 weeks |
| `recommendation-engine` | Personalized Recommendation Engine | AI-driven product suggestions based on behavior and preferences | `Sparkles` | Medium | 2-4 weeks |
| `sales-automation` | Sales & Marketing Automation Suite | End-to-end sales funnel automation with AI-driven outreach | `Target` | Large | 4-8 weeks |
| `loyalty-system` | Customer Loyalty & Retention System | AI-powered churn prediction and retention workflows | `Heart` | Medium | 2-4 weeks |
| `growth-engine` | Growth Engine | AI-powered marketing, lead gen, and conversion optimization | `Rocket` | Large | 4-8 weeks |
| `operations-autopilot` | Operations Autopilot | Workflow automation, scheduling, and resource optimization | `Cog` | Large | 4-8 weeks |
| `data-intelligence` | Data Intelligence Platform | Analytics, dashboards, and AI-driven business insights | `BarChart3` | Medium | 2-4 weeks |
| `booking-engine` | Smart Booking Engine | AI-optimized scheduling, availability, and booking management | `CalendarCheck` | Small | 1-2 weeks |
| `compliance-automation` | Compliance Automation | Document processing, regulatory checks, and audit trail | `ShieldCheck` | Large | 4-8 weeks |
| `content-engine` | Content Generation Engine | AI-powered content creation for marketing and communications | `PenTool` | Small | 1-2 weeks |
| `onboarding-system` | Digital Onboarding System | Streamlined client/patient onboarding with smart forms | `UserPlus` | Medium | 2-4 weeks |

### Impact × Effort Badge Colors

| Level | Badge BG | Badge Text | Border |
|-------|----------|-----------|--------|
| High / Small | `#E6F4ED` | `#00875A` | `#00875A` |
| Medium | `#FEF9E7` | `#D97706` | `#D97706` |
| Low / Large | `#F3F4F6` | `#6B7280` | `#9CA3AF` |
| XL | `#FEF2F2` | `#DC2626` | `#DC2626` |

### Industry → System Priority Map (Gemini 3 fallback / rule-based)

| Industry | #1 | #2 | #3 | #4 | #5 |
|----------|----|----|----|----|-----|
| E-commerce | support-engine | cart-recovery | recommendation-engine | sales-automation | loyalty-system |
| Real Estate | growth-engine | booking-engine | support-engine | data-intelligence | content-engine |
| Healthcare | booking-engine | onboarding-system | support-engine | compliance-automation | data-intelligence |
| Financial | compliance-automation | onboarding-system | data-intelligence | support-engine | growth-engine |
| Travel | booking-engine | support-engine | recommendation-engine | loyalty-system | operations-autopilot |
| Fashion | recommendation-engine | cart-recovery | content-engine | sales-automation | loyalty-system |
| SaaS | onboarding-system | support-engine | data-intelligence | growth-engine | loyalty-system |
| Professional | operations-autopilot | support-engine | growth-engine | content-engine | data-intelligence |
| Other | support-engine | growth-engine | operations-autopilot | data-intelligence | content-engine |

### Investment Tier Definitions

| Tier | Systems | Label | Description |
|------|---------|-------|-------------|
| 1 | 1-2 | Focused | Targeted improvement in one area |
| 2 | 3-4 | Comprehensive | Multi-system transformation |
| 3 | 5+ | Full Transformation | Complete business overhaul |

---

## RIGHT PANEL — SELECTION SUMMARY STATES

### Empty State

```
┌──────────────────────┐
│                      │
│  YOUR SELECTION      │
│  SUMMARY             │
│                      │
│  ┌──────────────┐    │
│  │   📋         │    │
│  │              │    │
│  │  Select      │    │
│  │  systems     │    │
│  │  from the    │    │
│  │  recommend-  │    │
│  │  ations to   │    │
│  │  see your    │    │
│  │  summary.    │    │
│  └──────────────┘    │
│                      │
└──────────────────────┘
```

### Filled State (3 systems selected)

```
┌──────────────────────┐
│                      │
│  YOUR SELECTION      │
│  SUMMARY             │
│                      │
│  SELECTED (3)        │
│                      │
│  ✓ AI Customer    ×  │
│    Support Engine    │
│  ✓ Cart Recovery  ×  │
│    System            │
│  ✓ Recommendation ×  │
│    Engine            │
│                      │
│  ────────────────    │
│                      │
│  COMBINED IMPACT     │
│                      │
│  Deploy:  6-10 weeks │
│  Effort:  Med-Large  │
│  Focus:   CX +       │
│           Revenue     │
│                      │
│  ────────────────    │
│                      │
│  INVESTMENT TIER     │
│                      │
│  ○───────●───────○   │
│  Focused  Compre-    │
│           hensive    │
│          Transform.  │
│                      │
│  ────────────────    │
│                      │
│  💡 We recommend     │
│  starting with your  │
│  top 2-3 priorities  │
│  and expanding after │
│  initial results.    │
│                      │
└──────────────────────┘
```

### 5+ Systems Warning

```
┌──────────────────────┐
│                      │
│  ⚠ ADVISORY NOTE    │
│                      │
│  You've selected 5+  │
│  systems. Consider   │
│  starting with 2-3   │
│  priorities and      │
│  expanding after     │
│  initial results.    │
│                      │
│  Phase 1 suggestion: │
│  → AI Support Engine │
│  → Cart Recovery     │
│                      │
│  Phase 2 (month 2+): │
│  → Recommendation    │
│  → Sales Automation  │
│  → Loyalty System    │
│                      │
└──────────────────────┘
```

---

## CARD INTERACTION STATES

```
DEFAULT (unselected):
┌─────────────────────────┐
│  #4               [☐]  │    #FFF background
│                         │    #E5E2DE border (1px)
│  Sales Automation       │    Normal text
│  ...                    │    Muted "why it fits"
└─────────────────────────┘

HOVER:
┌─────────────────────────┐
│  #4               [☐]  │    #FFF background
│                         │    #C8C8C2 border
│  Sales Automation       │    Shadow: 0 1px 3px
│  ...                    │    rgba(26,26,26,0.06)
└─────────────────────────┘

SELECTED:
┌─────────────────────────┐
│  #1 RECOMMENDED   [☑]  │    #FFF background
│                         │    #84CC16 border (2px)
│  AI Customer Support    │    Full-opacity text
│  ...                    │    Green bottom accent
│  ═══════════════════════│    ← 2px lime green
└─────────────────────────┘

SELECTED + HOVER:
┌─────────────────────────┐
│  #1 RECOMMENDED   [☑]  │    #F0FAF5 background
│                         │    #84CC16 border (2px)
│  AI Customer Support    │    Shadow: 0 1px 3px
│  ...                    │    rgba(26,26,26,0.06)
│  ═══════════════════════│
└─────────────────────────┘

motion/react transitions:
  border:     { duration: 0.2, ease: 'easeOut' }
  background: { duration: 0.15 }
  shadow:     { duration: 0.2 }
```

---

## WORKFLOW

```
ENTRY
│
├── User arrives at Step 3
│   ├── Check for Gemini 3 cached recommendations (from Step 2 trigger)
│   │   ├── Cached → load immediately, render recommendation cards
│   │   └── Not cached → run recommendation engine synchronously
│   │       ├── Show skeleton loading (shimmer) on card positions
│   │       ├── Gemini 3 call or rule-based fallback
│   │       └── Render when complete (~2-3s)
│   ├── Load system catalog (static data)
│   ├── Load any saved Step 3 selections → pre-check cards
│   └── Render: recommended systems ranked, others collapsed below

INTERACTION
│
├── User toggles system selection
│   ├── Toggle card selected state (checkbox + border)
│   ├── If selecting:
│   │   ├── Add to right panel with slide-in animation
│   │   ├── Update combined impact calculation
│   │   ├── Update investment tier indicator
│   │   └── Update left panel "Your Selections" count
│   ├── If deselecting:
│   │   ├── Remove from right panel with fade-out
│   │   ├── Recalculate combined impact
│   │   └── Update counters
│   ├── If 5+ selected → show advisory note in right panel
│   └── Debounce 500ms → save to localStorage
│
├── User expands "See details & trade-offs"
│   ├── Accordion expand (200ms ease)
│   ├── Shows: full description, trade-offs, related services
│   └── Related service tags link to service pages (new tab)
│
├── User sorts recommendations
│   ├── [Recommended] → default priority order
│   ├── [Impact] → sort by impact: high → medium → low
│   └── [Effort] → sort by effort: small → medium → large → xl
│
├── User expands "Show 3 more systems"
│   ├── Reveal non-recommended systems
│   ├── These have muted styling (no priority badge)
│   └── Still selectable

EXIT
│
├── User clicks "Continue"
│   ├── Validate: at least 1 system selected
│   │   ├── Valid → save selections, set step 3 complete, navigate to Step 4
│   │   └── Invalid → toast "Please select at least one system"
│   └── "You can change selections later" micro-text reassures
│
├── User clicks "Back"
│   └── Navigate to Step 2 (selections preserved)
```

---

## AGENT BEHAVIOR — GEMINI 3 INTEGRATION

```
AI IS VISIBLE ON THIS SCREEN
═══════════════════════════════

SOURCE: Gemini 3 analysis from Step 2 transition (or synchronous call)

WHAT AI GENERATES:
├── Recommendation priority order (1-5 ranking)
├── "Why it fits" bullets (2-3 per system, personalized)
├── Impact scoring (high/medium/low per system)
├── Effort estimation (S/M/L/XL per system)
├── Timeline estimate (weeks per system)
└── Combined deployment assessment

PERSONALIZATION:
├── "Why it fits" references SPECIFIC user answers:
│   ├── "Your support is currently email-only" (from Q3)
│   ├── "Cart abandonment at 50-70%" (from Q5)
│   ├── "No personalization in place" (from Q7)
│   └── "Repeat revenue at 20-40%" (from Q8)
├── Priority ranking considers:
│   ├── Signal severity from Step 2
│   ├── Goal alignment from Step 1
│   ├── Company size feasibility
│   └── Industry benchmarks
└── Effort estimates factor:
    ├── Current tool stack (what to integrate vs. replace)
    ├── Company size (team capacity)
    └── Automation maturity (from Q2)

GEMINI 3 PROMPT (for synchronous fallback):
────────────────────────────────────────────
System: You are a senior AI solutions architect at AMO AI.
        Given a client's business context, industry diagnostics, and
        detected signals, produce ranked AI system recommendations
        with personalized justifications.

Input: { step1, step2, signals, systemCatalog }

Output: {
  recommendations: [
    {
      systemId: "support-engine",
      priority: 1,
      whyItFits: [
        "Your support is currently email-only — this automates 60-80% of inquiries",
        "Customers find you via Google — chatbot improves on-site conversion 15-25%"
      ],
      impact: "high",
      effort: "medium",
      timeline: "2-4 weeks",
      details: "AI chatbot handles first-line customer inquiries...",
      tradeoffs: [
        "Requires initial training period (1-2 weeks)",
        "Complex edge cases still need human review"
      ]
    },
    // ... more
  ]
}

RULE-BASED FALLBACK (if Gemini 3 unavailable):
├── Use INDUSTRY_SYSTEM_PRIORITY_MAP for ranking
├── Use SIGNAL_TO_SYSTEM_MAP for "why it fits"
├── Use static effort/timeline from system catalog
├── Template-based "why it fits" strings:
│   ├── "Your [signal] indicates [system] would reduce [metric] by [range]"
│   ├── "Based on your [Q#] answer, [system] addresses this directly"
│   └── "[Industry] companies typically see [impact] from [system]"
└── User experience is the same (slightly less specific text)
```

---

## ACCESSIBILITY

```
├── Recommendation cards: role="checkbox", aria-checked
├── Sort buttons: role="tablist" with role="tab"
├── Expanded details: aria-expanded on trigger button
├── Right panel summary: aria-live="polite" for selection updates
├── Investment tier: aria-label describing current tier
├── "Show more systems" toggle: aria-expanded
├── Each card: aria-label including system name + selected state
├── Focus order: Sort → Card 1 → Card 2 → ... → Show more → Continue
├── Keyboard: Space/Enter to toggle selection, Enter to expand details
└── Screen reader: announces "X systems selected" on change
```

---

## IMPLEMENTATION NOTES

```
DEPENDENCIES:
├── react-hook-form@7.55.0 ........ selection state
├── motion/react .................. card animations, panel transitions
├── lucide-react .................. system icons, badge icons
├── sonner@2.0.3 .................. validation toasts
└── react-dnd ..................... optional: reorder selected systems

FILES:
├── /components/wizard/steps/StepSystemRecommendations.tsx
├── /components/wizard/ui/RecommendationCard.tsx
├── /components/wizard/ui/ImpactBadge.tsx
├── /components/wizard/ui/SelectionSummary.tsx
├── /components/wizard/ui/InvestmentTierBar.tsx
├── /components/wizard/ui/SortBar.tsx
├── /components/wizard/data/systemCatalog.ts    (static system data)
└── /components/wizard/data/industrySystemMap.ts (fallback priorities)

KEY DECISIONS:
├── Cards are full-width (not a grid) — for readability
├── "Why it fits" is the hero content — always visible
├── Details accordion is collapsed by default (reduces overwhelm)
├── Sort pills use underline for active (not background color)
├── Non-recommended systems hidden by default (expandable)
├── Right panel shows live summary (not just at the end)
├── Advisory note for 5+ selections (soft warning, not blocking)
└── "You can change selections later" reduces commitment anxiety
```
