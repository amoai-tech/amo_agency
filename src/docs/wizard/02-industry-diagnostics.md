# 02 — INDUSTRY DIAGNOSTICS
# Wizard Step 2 of 5

**Component:** `C31-StepIndustryDiagnostics`
**File:** `/components/wizard/steps/StepIndustryDiagnostics.tsx`
**Route:** `/wizard` (step 2)
**Status:** PLANNED
**Parent Doc:** `00-wizard.md`

---

## SCREEN PURPOSE

Industry-tailored diagnostic. Four universal questions plus four industry-specific
questions create a rich signal profile. The right panel acts like a consultant
sitting next to you, explaining each question's relevance. When the user clicks
Continue, a background Gemini 3 call analyzes all answers to pre-compute system
recommendations for Step 3.

> "These questions are tailored to [Industry]. Each answer helps us identify
>  where AI can make the biggest impact."

---

## ASCII WIREFRAME — Desktop (1440px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  ☀ AMO AI    Step 2: Industry Diagnostics                ✓ All saved    │
│                                                                          │
├───────────┬───────────────────────────────────────────┬──────────────────┤
│           │                                           │                  │
│  STEPS    │          CENTER PANEL                     │  CONTEXT PANEL   │
│  240px    │          #F1EEEA                          │  320px           │
│  #FFF     │                                           │  #FFF            │
│           │                                           │                  │
│ ┌───────┐ │  INDUSTRY DIAGNOSTICS                     │ ┌──────────────┐ │
│ │ ✓ 1   │ │                                           │ │              │ │
│ │ Biz.  │ │  Let's diagnose your                      │ │ WHY THIS     │ │
│ │       │ │  opportunities                            │ │ MATTERS      │ │
│ │ ◉ 2   │ │                                           │ │              │ │
│ │ Diag. │ │  These questions are tailored to          │ │ (changes per │ │
│ │       │ │  E-commerce & Retail.                     │ │  question    │ │
│ │ ○ 3   │ │                                           │ │  focus)      │ │
│ │ Recs. │ │  ┌─────────────────────────────────────┐  │ │              │ │
│ │       │ │  │ E-commerce / Retail  🛒             │  │ │ "Under-     │ │
│ │ ○ 4   │ │  └─────────────────────────────────────┘  │ │  standing    │ │
│ │ Exec. │ │                                           │ │  your        │ │
│ │       │ │  ┌─────────────────────────────────────┐  │ │  channels    │ │
│ │ ○ 5   │ │  │ Q1  How do customers currently      │  │ │  reveals     │ │
│ │Launch │ │  │     find you?                       │  │ │  which ones  │ │
│ │       │ │  │                                     │  │ │  could       │ │
│ └───────┘ │  │  ┌────────┐ ┌────────┐ ┌────────┐  │  │ │  benefit     │ │
│           │  │  │ Google │ │ Social │ │Referral│  │  │ │  from AI."   │ │
│ ┌───────┐ │  │  │ Search │ │ Media  │ │   s    │  │  │ │              │ │
│ │CONTEXT│ │  │  │  ☑     │ │  ☑     │ │  ☐     │  │  │ ├──────────────┤ │
│ │ CARD  │ │  │  └────────┘ └────────┘ └────────┘  │  │ │              │ │
│ │       │ │  │  ┌────────┐ ┌────────┐ ┌────────┐  │  │ │ SIGNAL       │ │
│ │ Acme  │ │  │  │Paid Ads│ │Walk-in │ │ Email  │  │  │ │ DETECTED     │ │
│ │ Retail│ │  │  │  ☐     │ │  ☐     │ │Market. │  │  │ │              │ │
│ │ E-com │ │  │  └────────┘ └────────┘ │  ☐     │  │  │ │ ┌──────────┐ │ │
│ │ Medium│ │  │  ┌────────┐ ┌────────┐ └────────┘  │  │ │ │ Multi-   │ │ │
│ │ Growth│ │  │  │Market- │ │ Other  │              │  │ │ │ channel  │ │ │
│ │       │ │  │  │places  │ │  ☐     │              │  │ │ │ gap →    │ │ │
│ ├───────┤ │  │  │  ☐     │ └────────┘              │  │ │ │ diversify│ │ │
│ │SIGNALS│ │  │  └────────┘                         │  │ │ └──────────┘ │ │
│ │DETECTED│ │  └─────────────────────────────────────┘  │ │              │ │
│ │       │ │                                           │ └──────────────┘ │
│ │ ● High│ │  ┌─────────────────────────────────────┐  │                  │
│ │  cart  │ │  │ Q2  What does your sales process    │  │                  │
│ │  aband│ │  │     look like today?                │  │                  │
│ │       │ │  │                                     │  │                  │
│ │ ● Man-│ │  │  ┌──────────┐  ┌──────────┐        │  │                  │
│ │  ual  │ │  │  │  Fully   │  │ Partially│        │  │                  │
│ │  suppt│ │  │  │  Manual  │  │ Automated│        │  │                  │
│ │       │ │  │  │  ⬜ Hand │  │  ◉ Some  │        │  │                  │
│ │ ● No  │ │  │  │  by hand │  │  tools   │        │  │                  │
│ │  pers.│ │  │  └──────────┘  └──────────┘        │  │                  │
│ │       │ │  │  ┌──────────┐  ┌──────────┐        │  │                  │
│ └───────┘ │  │  │  Mostly  │  │  Fully   │        │  │                  │
│           │  │  │ Automated│  │ Automated│        │  │                  │
│           │  │  │  ○ Tools │  │  ○ End-  │        │  │                  │
│           │  │  │  handle  │  │  to-end  │        │  │                  │
│           │  │  └──────────┘  └──────────┘        │  │                  │
│           │  └─────────────────────────────────────┘  │                  │
│           │                                           │                  │
│           │  ┌─────────────────────────────────────┐  │                  │
│           │  │ Q3  How do you handle customer      │  │                  │
│           │  │     support inquiries?              │  │                  │
│           │  │                                     │  │                  │
│           │  │  ○  Email only                      │  │                  │
│           │  │     Customers email, team responds  │  │                  │
│           │  │  ○  Phone                           │  │                  │
│           │  │     Phone-based with queue           │  │                  │
│           │  │  ○  Live chat                       │  │                  │
│           │  │     Real-time with human agents     │  │                  │
│           │  │  ○  Chatbot                         │  │                  │
│           │  │     Automated first-line             │  │                  │
│           │  │  ○  No formal process               │  │                  │
│           │  │     Ad hoc responses                 │  │                  │
│           │  └─────────────────────────────────────┘  │                  │
│           │                                           │                  │
│           │  ┌─────────────────────────────────────┐  │                  │
│           │  │ Q4  What tools/software do you use? │  │                  │
│           │  │                                     │  │                  │
│           │  │  ┌─────┐┌──────┐┌─────────┐┌─────┐ │  │                  │
│           │  │  │ CRM ││Email ││Analytics││Social│ │  │                  │
│           │  │  │  ☑  ││Mktg  ││  ☑      ││Media │ │  │                  │
│           │  │  └─────┘│  ☐   │└─────────┘│  ☐   │ │  │                  │
│           │  │         └──────┘           └─────┘ │  │                  │
│           │  │  ┌─────┐┌──────┐┌─────────┐┌─────┐ │  │                  │
│           │  │  │Acctg││ PM   ││E-comm   ││None  │ │  │                  │
│           │  │  │  ☐  ││  ☐   ││Platform ││  ☐   │ │  │                  │
│           │  │  └─────┘└──────┘│  ☑      │└─────┘ │  │                  │
│           │  │                 └─────────┘        │  │                  │
│           │  └─────────────────────────────────────┘  │                  │
│           │                                           │                  │
│           │  ─ ─ ─ ─ INDUSTRY-SPECIFIC ─ ─ ─ ─ ─ ─  │                  │
│           │                                           │                  │
│           │  ┌─────────────────────────────────────┐  │                  │
│           │  │ Q5  Average cart abandonment rate?   │  │                  │
│           │  │                                     │  │                  │
│           │  │ ┌──────┐┌──────┐┌──────┐┌──────┐   │  │                  │
│           │  │ │ <30% ││30-50%││50-70%││ >70% │   │  │                  │
│           │  │ │  ○   ││  ○   ││  ◉   ││  ○   │   │  │                  │
│           │  │ └──────┘└──────┘└──────┘└──────┘   │  │                  │
│           │  │ ┌────────────────────┐              │  │                  │
│           │  │ │ Don't know (italic)│              │  │                  │
│           │  │ └────────────────────┘              │  │                  │
│           │  └─────────────────────────────────────┘  │                  │
│           │                                           │                  │
│           │  ┌─────────────────────────────────────┐  │                  │
│           │  │ Q6  Post-purchase follow-up?        │  │                  │
│           │  │                                     │  │                  │
│           │  │ ┌──────────┐┌──────────┐┌─────────┐ │  │                  │
│           │  │ │ ✉ Auto  ││ 👤 Manual││ ⊘ None  │ │  │                  │
│           │  │ │  emails  ││ follow-up││         │ │  │                  │
│           │  │ └──────────┘└──────────┘└─────────┘ │  │                  │
│           │  └─────────────────────────────────────┘  │                  │
│           │                                           │                  │
│           │  ┌─────────────────────────────────────┐  │                  │
│           │  │ Q7  Personalized recommendations?   │  │                  │
│           │  │                                     │  │                  │
│           │  │ ┌────────┐ ┌──────────┐ ┌────────┐  │  │                  │
│           │  │ │  Yes   │ │ Partially│ │  No    │  │  │                  │
│           │  │ └────────┘ └──────────┘ └────────┘  │  │                  │
│           │  └─────────────────────────────────────┘  │                  │
│           │                                           │                  │
│           │  ┌─────────────────────────────────────┐  │                  │
│           │  │ Q8  Repeat customer revenue %?      │  │                  │
│           │  │                                     │  │                  │
│           │  │           40-60%                     │  │                  │
│           │  │ ○──────────────●──────────────○      │  │                  │
│           │  │ <20%                        >60%     │  │                  │
│           │  │                                     │  │                  │
│           │  │ ☐ Don't know (disables slider)       │  │                  │
│           │  └─────────────────────────────────────┘  │                  │
│           │                                           │                  │
├───────────┴───────────────────────────────────────┴──────────────────┤
│                                                                      │
│  ← Back             5 of 8 answered ●              Continue →        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Mobile (375px)

```
┌─────────────────────────────┐
│ Step 2/5  ✓●○○○  ✓ Saved   │
│ ══════●════════════  40%   │
├─────────────────────────────┤
│                             │
│  INDUSTRY DIAGNOSTICS       │
│                             │
│  Let's diagnose your        │
│  opportunities              │
│                             │
│  ┌───────────────────────┐  │
│  │ E-commerce / Retail 🛒│  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ Q1                    │  │
│  │ How do customers      │  │
│  │ currently find you?   │  │
│  │                       │  │
│  │ ┌──────┐ ┌──────┐    │  │
│  │ │Google│ │Social│    │  │
│  │ │  ☑   │ │  ☑   │    │  │
│  │ └──────┘ └──────┘    │  │
│  │ ┌──────┐ ┌──────┐    │  │
│  │ │Refer.│ │Paid  │    │  │
│  │ │  ☐   │ │  ☐   │    │  │
│  │ └──────┘ └──────┘    │  │
│  │ ... more pills        │  │
│  │                       │  │
│  │ 💡 Why? ▼            │  │
│  │ "Understanding your   │  │
│  │  channels reveals..." │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ Q2                    │  │
│  │ Sales process today?  │  │
│  │ ...                   │  │
│  └───────────────────────┘  │
│                             │
│  ... (Q3-Q8 stacked)        │
│                             │
│  SIGNALS: ● Cart aband.    │
│           ● Manual support  │
│                             │
├─────────────────────────────┤
│ ← Back   5/8   Continue → │
└─────────────────────────────┘
```

---

## CONTENT DATA — ALL INDUSTRY QUESTION BANKS

### Universal Questions (All Industries — Q1–Q4)

| # | Question | Input Type | Options |
|---|----------|-----------|---------|
| Q1 | How do customers currently find you? | multi-select pills | Google Search, Social Media, Referrals, Paid Ads, Walk-in / Physical, Email Marketing, Marketplaces, Other |
| Q2 | What does your sales process look like today? | single-select cards (2x2) | Fully Manual ("Everything done by hand"), Partially Automated ("Some tools, some manual"), Mostly Automated ("Tools handle most of it"), Fully Automated ("End-to-end automated") |
| Q3 | How do you handle customer support inquiries? | single-select radio list | Email only, Phone, Live chat, Chatbot, No formal process |
| Q4 | What tools/software do you currently use? | multi-select pills | CRM, Email Marketing, Analytics, Social Media Mgmt, Accounting, Project Management, E-commerce Platform, None |

### E-commerce / Retail (Q5–Q8)

| # | Question | Type | Options | Signal Triggered |
|---|----------|------|---------|------------------|
| Q5 | Average cart abandonment rate? | select pills | <30%, 30-50%, 50-70%, >70%, Don't know | >50% → "High cart abandonment" |
| Q6 | Post-purchase follow-up? | select cards (3) | Automated emails, Manual, Nothing | "Nothing" → "No retention process" |
| Q7 | Personalized recommendations? | 3-button | Yes, Partially, No | "No" → "No personalization" |
| Q8 | Repeat customer revenue %? | slider + "Don't know" | <20%, 20-40%, 40-60%, >60% | <40% → "Low repeat revenue" |

### Real Estate (Q5–Q8)

| # | Question | Type | Options | Signal |
|---|----------|------|---------|--------|
| Q5 | How do you qualify incoming leads? | select radio | Manual review, Phone screening, Online form, No process | "No process" → "No lead qualification" |
| Q6 | Response time to new inquiries? | select pills | <1 hour, Same day, Next day, 2+ days | ">Same day" → "Speed-to-lead gap" |
| Q7 | Virtual tours or AI staging? | 3-button | Yes, No, Planning to | "No" → "Digital experience gap" |
| Q8 | Listing management? | select radio | Manual per platform, Syndication tool, MLS only | "Manual" → "Listing automation needed" |

### Healthcare / Medical (Q5–Q8)

| # | Question | Type | Options | Signal |
|---|----------|------|---------|--------|
| Q5 | How do patients book appointments? | multi-select pills | Phone, Website, App, Multiple channels | "Phone only" → "Single-channel booking" |
| Q6 | Average no-show rate? | select pills | <10%, 10-20%, 20-30%, >30%, Don't know | >20% → "High no-show rate" |
| Q7 | Patient intake forms? | select cards | Paper, PDF, Digital forms, Fully automated | "Paper/PDF" → "Manual intake process" |
| Q8 | Post-visit follow-up care? | 3-button | Yes, Partially, No | "No" → "No patient engagement" |

### Financial Services (Q5–Q8)

| # | Question | Type | Options | Signal |
|---|----------|------|---------|--------|
| Q5 | Client onboarding process? | select cards | In-person, Hybrid, Fully digital, No standard | "In-person/No standard" → "Onboarding friction" |
| Q6 | Compliance documentation? | select radio | Manual, Partially automated, Fully automated | "Manual" → "Compliance automation opportunity" |
| Q7 | Personalized financial insights? | 3-button | Yes, No, Planning to | "No" → "Advisory AI opportunity" |
| Q8 | Client portfolio access? | select radio | Portal, Reports, On request, No self-service | "No self-service" → "Client experience gap" |

### Travel / Hospitality (Q5–Q8)

| # | Question | Type | Options | Signal |
|---|----------|------|---------|--------|
| Q5 | Booking modifications handling? | select cards | Manual, Semi-automated, Fully automated | "Manual" → "Booking automation needed" |
| Q6 | Personalized recommendations? | 3-button | Yes, No, Partially | "No" → "Personalization gap" |
| Q7 | Guest review management? | select radio | Manual, Automated collection, AI-assisted, Nothing | "Nothing" → "Reputation blind spot" |
| Q8 | Direct vs OTA bookings? | select pills | Mostly direct, 50/50, Mostly OTA, Don't know | "Mostly OTA" → "Channel dependency risk" |

### Fashion / Beauty (Q5–Q8)

| # | Question | Type | Options | Signal |
|---|----------|------|---------|--------|
| Q5 | Social media direct sales? | 3-button | Yes, No, Planning to | "No" → "Social commerce gap" |
| Q6 | Seasonal inventory planning? | select cards | Manual forecasting, Data-driven, No formal process | "No process" → "Demand forecasting needed" |
| Q7 | Virtual try-on / style recs? | 3-button | Yes, No, Planning to | "No" → "AI personalization opportunity" |
| Q8 | Influencer partnerships? | select radio | Agency, In-house, Ad hoc, None | "None" → "Marketing automation" |

### Technology / SaaS (Q5–Q8)

| # | Question | Type | Options | Signal |
|---|----------|------|---------|--------|
| Q5 | User onboarding completion rate? | select pills | <30%, 30-50%, 50-70%, >70%, Don't know | <50% → "Onboarding drop-off" |
| Q6 | Churn monitoring? | select radio | Real-time alerts, Monthly reports, No monitoring | "No monitoring" → "Churn blind spot" |
| Q7 | In-app guidance? | 3-button | Yes, Partially, No | "No" → "Product adoption gap" |
| Q8 | Customer health scoring? | select radio | AI-powered, Manual, Don't track | "Don't track" → "Retention risk" |

### Professional Services / Education / Food / Manufacturing / Other (Q5–Q8)

| # | Question | Type | Options | Signal |
|---|----------|------|---------|--------|
| Q5 | Client/customer lifecycle tracking? | select radio | CRM, Spreadsheet, Memory, None | "None" → "Relationship management gap" |
| Q6 | Repeat business rate? | select pills | <20%, 20-40%, 40-60%, >60%, Don't know | <40% → "Retention opportunity" |
| Q7 | Proposal/quote generation? | select cards | Automated, Template-based, Manual from scratch | "Manual" → "Sales efficiency gap" |
| Q8 | Feedback collection? | 3-button | Yes, Partially, No | "No" → "Voice of customer gap" |

---

## CONTEXT PANEL — PER-QUESTION COPY

| Question | "Why this matters" Text | Signal Callout |
|----------|------------------------|----------------|
| Q1 | Understanding your acquisition channels reveals which ones could benefit from automation. Companies relying on 1-2 channels have the highest growth potential from diversification. | Signal: [Channel count] channels detected → [recommendation] |
| Q2 | Your automation maturity level determines whether we recommend foundational tools or advanced AI systems. We meet you where you are. | Signal: [Level] → [matching approach] |
| Q3 | Support inquiries are one of the highest-ROI areas for AI. Companies with manual support processes typically see 60% cost reduction with an AI-first approach. | Signal: Manual support → Support automation recommended |
| Q4 | Your existing tools define what we integrate with versus what we replace. We never recommend rebuilding what already works. | Signal: [X] tools detected → Integration-first approach |
| Q5 (e-com) | Cart abandonment above 50% signals a high-value recovery opportunity. Automated follow-up sequences typically recover 10-15% of abandoned carts. | Signal: High cart abandonment → Recovery automation recommended |
| Q6 (e-com) | Post-purchase engagement drives repeat revenue. Companies with automated follow-up see 25-40% higher customer lifetime value. | Signal: [type] → Retention opportunity |
| Q7 (e-com) | Personalized recommendations increase average order value by 10-30%. This is one of the quickest AI wins in e-commerce. | Signal: No personalization → AI recommendation engine |
| Q8 (e-com) | High repeat revenue (>40%) means your product-market fit is strong — we focus on scaling. Low repeat revenue means we prioritize retention systems. | Signal: [%] → [strategy direction] |

---

## SIGNAL DETECTION ENGINE (Rule-Based)

```typescript
interface Signal {
  id: string;
  label: string;
  severity: 'high' | 'medium' | 'low';
  recommendation: string;
  triggeredBy: { question: string; answer: string | string[] };
}

// Example signal rules for E-commerce
const ECOMMERCE_SIGNAL_RULES: SignalRule[] = [
  {
    question: 'Q5',
    condition: (answer) => ['50-70%', '>70%'].includes(answer),
    signal: {
      id: 'high-cart-abandonment',
      label: 'High cart abandonment',
      severity: 'high',
      recommendation: 'Cart Recovery System',
    },
  },
  {
    question: 'Q3',
    condition: (answer) => ['Email only', 'No formal process'].includes(answer),
    signal: {
      id: 'manual-support',
      label: 'Manual support process',
      severity: 'high',
      recommendation: 'AI Customer Support Engine',
    },
  },
  {
    question: 'Q7',
    condition: (answer) => answer === 'No',
    signal: {
      id: 'no-personalization',
      label: 'No personalization',
      severity: 'medium',
      recommendation: 'Personalized Recommendation Engine',
    },
  },
  {
    question: 'Q8',
    condition: (answer) => ['<20%', '20-40%'].includes(answer),
    signal: {
      id: 'low-repeat-revenue',
      label: 'Low repeat revenue',
      severity: 'medium',
      recommendation: 'Customer Loyalty & Retention System',
    },
  },
  {
    question: 'Q6',
    condition: (answer) => answer === 'Nothing',
    signal: {
      id: 'no-retention',
      label: 'No post-purchase follow-up',
      severity: 'high',
      recommendation: 'Cart Recovery + Loyalty System',
    },
  },
];
```

### Signal Badge Animation

```
NEW SIGNAL APPEARS:
┌─────────────────────┐
│ ● High cart abandon. │  ← fade in + scale up (200ms)
└─────────────────────┘     subtle pulse glow on arrival

motion/react:
  initial: { opacity: 0, scale: 0.85 }
  animate: { opacity: 1, scale: 1 }
  transition: { type: 'spring', stiffness: 300, damping: 20 }
```

---

## UI COMPONENTS

```
COMPONENT TREE
│
├── StepIndustryDiagnostics.tsx (C31)
│   ├── IndustryBadge ..................... pill with icon + industry name
│   ├── QuestionCard (×8) ................ white card container
│   │   ├── QuestionNumber ............... "Q1" lime green badge
│   │   ├── QuestionText ................. 18px Lora heading
│   │   └── AnswerInput (type varies per question)
│   │       ├── MultiSelectPills ......... Q1, Q4, Q5 (healthcare)
│   │       ├── SingleSelectCards ........ Q2, Q6 (e-com), Q7 (intake)
│   │       ├── SingleSelectRadio ........ Q3, Q5 (real-estate), Q6 (fin.)
│   │       ├── ThreeButtonSelect ........ Q7, Q8 (healthcare)
│   │       └── SliderWithOverride ....... Q8 (e-com) — slider + "Don't know"
│   └── AnsweredCounter .................. "5 of 8 answered" in footer
│
├── ContextPanel content (for this step)
│   ├── WhyThisMatters (per-question)
│   └── SignalCallout (left-green-border box)
│
└── StepSidebar additions
    └── SignalsDetected (dynamic badge list)
        └── SignalBadge (×n) ............. pill with pulse animation
```

---

## FORM VALIDATION

```
FIELD                REQUIRED   RULES
─────────────────────────────────────────────────────────────
Q1 (channels)        YES        at least 1 selected
Q2 (sales process)   YES        exactly 1 selected
Q3 (support)         YES        exactly 1 selected
Q4 (tools)           YES        at least 1 selected (or "None")
Q5 (industry)        YES        exactly 1 selected (or "Don't know")
Q6 (industry)        YES        exactly 1 selected
Q7 (industry)        YES        exactly 1 selected
Q8 (industry)        YES        answer provided (or "Don't know")

VALIDATION TIMING
├── Per question: validate on selection (instant feedback)
├── On Continue: validate all 8, scroll to first unanswered
├── Progress counter updates in real-time
└── "Continue" button pulses when all 8 answered
```

---

## WORKFLOW

```
ENTRY
│
├── User arrives at Step 2
│   ├── Load saved Step 1 data → populate Context Card
│   ├── Determine industry → load correct question bank (universal Q1-4 + industry Q5-8)
│   ├── Load any saved Step 2 answers → pre-fill
│   └── Initialize signal detection engine

INTERACTION
│
├── User answers questions
│   ├── Each answer → debounce 500ms → save to localStorage
│   ├── Signal engine evaluates all current answers
│   │   ├── New signal detected → animate badge into left panel
│   │   ├── Signal removed (answer changed) → fade out badge
│   │   └── Signals stored in WizardState.diagnosticSignals[]
│   ├── Right panel "Why this matters" swaps on question focus
│   ├── Footer counter: "X of 8 answered" updates
│   └── When all 8 answered → Continue button gets subtle pulse

EXIT
│
├── User clicks "Continue"
│   ├── Validate: all 8 questions answered
│   │   ├── Valid:
│   │   │   ├── Save final state + signals
│   │   │   ├── Set step 2 complete
│   │   │   ├── TRIGGER: Gemini 3 background analysis (async)
│   │   │   │   ├── Input: Step 1 context + Step 2 answers + signals
│   │   │   │   ├── Output: ranked system recommendations
│   │   │   │   └── Cache in state for instant Step 3 load
│   │   │   └── Navigate to Step 3
│   │   └── Invalid → scroll to first unanswered question
│   └── Back → navigate to Step 1 (data preserved)
```

---

## AGENT BEHAVIOR — GEMINI 3 INTEGRATION

```
SCREEN-LEVEL AI: NONE VISIBLE
(intelligence is passive — right panel copy is pre-written)

BACKGROUND TRIGGER ON "CONTINUE":
─────────────────────────────────
Trigger:     User completes Step 2 and clicks Continue
Model:       Gemini 3 (via Edge Function or client-side API)
Runs:        Asynchronously — user does NOT wait
Cached:      Results stored in WizardState.aiRecommendations

PROMPT STRUCTURE (Gemini 3):
────────────────────────────
System: You are a senior AI consultant at AMO AI. Analyze this
        client's business context and diagnostic answers to produce 
        ranked AI system recommendations.

Input payload:
{
  "step1": {
    "company": "Acme Retail Group",
    "industry": "e-commerce",
    "size": "medium",
    "goal": "growth",
    "challenge": "High cart abandonment and manual support..."
  },
  "step2": {
    "channels": ["Google Search", "Social Media"],
    "salesProcess": "Partially Automated",
    "support": "Email only",
    "tools": ["CRM", "Analytics", "E-commerce Platform"],
    "cartAbandonment": "50-70%",
    "postPurchase": "Nothing",
    "personalization": "No",
    "repeatRevenue": "20-40%"
  },
  "signals": [
    "high-cart-abandonment",
    "manual-support",
    "no-personalization",
    "low-repeat-revenue",
    "no-retention"
  ]
}

Expected output:
{
  "recommendations": [
    {
      "systemId": "support-engine",
      "priority": 1,
      "whyItFits": [
        "Your support is currently email-only — this automates 60-80% of inquiries",
        "Customers find you via Google — chatbot improves on-site conversion"
      ],
      "impact": "high",
      "effort": "medium",
      "timeline": "2-4 weeks"
    },
    // ... more systems ranked by priority
  ],
  "overallAssessment": "High potential for AI transformation...",
  "investmentTier": "comprehensive"
}

FALLBACK (if Gemini 3 unavailable):
├── Use rule-based recommendation engine (client-side)
├── Map signals directly to systems via SIGNAL_TO_SYSTEM_MAP
├── Rank by signal severity + frequency
└── User experience is identical (just less personalized "why it fits" text)

SIGNAL-BASED RULES (rule-based engine):
├── Each signal maps to 1-2 recommended systems
├── Systems with most signal matches rank highest
├── Effort/timeline from static system metadata
└── "Why it fits" generated from template strings
```

---

## ACCESSIBILITY

```
├── Question cards: role="group", aria-labelledby → question text
├── Multi-select pills: role="group", each pill role="checkbox"
├── Single-select cards: role="radiogroup", each card role="radio"
├── Radio lists: standard radio with visible labels
├── Slider: aria-valuemin, aria-valuemax, aria-valuenow, aria-label
├── "Don't know" checkbox: disables slider, announces state change
├── Signal badges: aria-live="polite" region, announced on appearance
├── Progress counter: aria-live="polite" "5 of 8 questions answered"
├── Focus order: Q1 → Q2 → Q3 → Q4 → Q5 → Q6 → Q7 → Q8 → Continue
└── Step announcement: "Step 2 of 5: Industry Diagnostics"
```

---

## IMPLEMENTATION NOTES

```
DEPENDENCIES:
├── react-hook-form@7.55.0 ........ form state
├── motion/react .................. signal badge animations
├── lucide-react .................. question icons, industry badge
└── sonner@2.0.3 .................. validation toasts

FILES:
├── /components/wizard/steps/StepIndustryDiagnostics.tsx
├── /components/wizard/ui/QuestionCard.tsx
├── /components/wizard/ui/MultiSelectPills.tsx
├── /components/wizard/ui/SingleSelectCards.tsx
├── /components/wizard/ui/SliderWithOverride.tsx
├── /components/wizard/ui/SignalBadge.tsx
├── /components/wizard/data/questionBanks.ts  (all industry questions)
└── /components/wizard/data/signalRules.ts    (signal detection logic)

KEY DECISIONS:
├── All 8 questions visible on page (not one-at-a-time)
├── Each question in its own white card for visual separation
├── Industry-specific questions separated by a subtle divider
├── Signal detection is client-side (rule-based, no API call)
├── Gemini 3 call fires in background on Continue (non-blocking)
└── If Gemini 3 fails, Step 3 uses rule-based fallback
```
