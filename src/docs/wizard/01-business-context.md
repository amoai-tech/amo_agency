# 01 — BUSINESS CONTEXT
# Wizard Step 1 of 5

**Component:** `C30-StepBusinessContext`
**File:** `/components/wizard/steps/StepBusinessContext.tsx`
**Route:** `/wizard` (step 1 — default landing)
**Status:** PLANNED
**Parent Doc:** `00-wizard.md`

---

## SCREEN PURPOSE

First contact. The user tells us who they are, what industry they're in, what
they want to achieve, and what's broken. No AI on this screen — every question
is pre-written. The answers feed the industry-specific diagnostic in Step 2 and
the Gemini 3 analysis that runs between Steps 2 and 3.

> "Each question helps us build a clear picture of your business.
>  Your answers drive the industry-specific analysis in the next step."

---

## ASCII WIREFRAME — Desktop (1440px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  ☀ AMO AI    Step 1: Business Context                    ✓ All saved    │
│                                                                          │
├───────────┬───────────────────────────────────────────┬──────────────────┤
│           │                                           │                  │
│  STEPS    │          CENTER PANEL                     │  CONTEXT PANEL   │
│  240px    │          #F1EEEA                          │  320px           │
│  #FFF     │                                           │  #FFF            │
│           │                                           │                  │
│ ┌───────┐ │  BUSINESS CONTEXT                         │ ┌──────────────┐ │
│ │ ◉ 1   │ │                                           │ │              │ │
│ │ Biz.  │ │  Tell us about                            │ │ WHY WE'RE    │ │
│ │ Contxt│ │  your business                            │ │ ASKING       │ │
│ │       │ │                                           │ │              │ │
│ │ ○ 2   │ │  We'll use this to tailor our             │ │ (changes per │ │
│ │ Diag. │ │  analysis to your industry and goals.     │ │  field focus) │ │
│ │       │ │                                           │ │              │ │
│ │ ○ 3   │ │  ┌─────────────────────────────────────┐  │ │ "We use your │ │
│ │ Recs. │ │  │ COMPANY NAME                        │  │ │  company     │ │
│ │       │ │  │ Company Name *                       │  │ │  name to     │ │
│ │ ○ 4   │ │  │ ┌─────────────────────────────────┐ │  │ │  personalize │ │
│ │ Exec. │ │  │ │ e.g., Acme Retail Group         │ │  │ │  your brief."│ │
│ │       │ │  │ └─────────────────────────────────┘ │  │ │              │ │
│ │ ○ 5   │ │  └─────────────────────────────────────┘  │ ├──────────────┤ │
│ │Launch │ │                                           │ │              │ │
│ │       │ │  ┌─────────────────────────────────────┐  │ │ WHAT HAPPENS │ │
│ └───────┘ │  │ WEBSITE URL                         │  │ │ NEXT         │ │
│           │  │ Website URL                          │  │ │              │ │
│ ┌───────┐ │  │ ┌────────┬──────────────────────┐   │  │ │ "Next, we'll │ │
│ │CONTEXT│ │  │ │https://│                      │   │  │ │  ask 6-8     │ │
│ │ CARD  │ │  │ └────────┴──────────────────────┘   │  │ │  questions   │ │
│ │       │ │  │ Optional — helps our AI understand  │  │ │  specific to │ │
│ │ Co:   │ │  │ your business faster                │  │ │  your        │ │
│ │ (...)  │ │  └─────────────────────────────────────┘  │ │  industry."  │ │
│ │ Ind:  │ │                                           │ │              │ │
│ │ (...)  │ │  ┌─────────────────────────────────────┐  │ └──────────────┘ │
│ │ Size: │ │  │ INDUSTRY *                          │  │                  │
│ │ (...)  │ │  │                                     │  │                  │
│ │ Goal: │ │  │  ┌─────────┐ ┌─────────┐ ┌───────┐ │  │                  │
│ │ (...)  │ │  │  │ 🛒      │ │ 🏠      │ │ ❤     │ │  │                  │
│ │       │ │  │  │E-comm.  │ │Real Est.│ │Health │ │  │                  │
│ │Auto-  │ │  │  └─────────┘ └─────────┘ └───────┘ │  │                  │
│ │saving │ │  │  ┌─────────┐ ┌─────────┐ ┌───────┐ │  │                  │
│ │ ✓     │ │  │  │ 📊      │ │ ✈       │ │ 💎    │ │  │                  │
│ └───────┘ │  │  │Finance  │ │Travel   │ │Fashion│ │  │                  │
│           │  │  └─────────┘ └─────────┘ └───────┘ │  │                  │
│           │  │  ┌─────────┐ ┌─────────┐ ┌───────┐ │  │                  │
│           │  │  │ 🍴      │ │ 💼      │ │ 📚    │ │  │                  │
│           │  │  │Food     │ │Prof.Svc │ │Educat.│ │  │                  │
│           │  │  └─────────┘ └─────────┘ └───────┘ │  │                  │
│           │  │  ┌─────────┐ ┌─────────┐ ┌───────┐ │  │                  │
│           │  │  │ 💻      │ │ ⚙       │ │ ⬚     │ │  │                  │
│           │  │  │SaaS     │ │Manufact.│ │Other  │ │  │                  │
│           │  │  └─────────┘ └─────────┘ └───────┘ │  │                  │
│           │  └─────────────────────────────────────┘  │                  │
│           │                                           │                  │
│           │  ┌─────────────────────────────────────┐  │                  │
│           │  │ COMPANY SIZE *                      │  │                  │
│           │  │                                     │  │                  │
│           │  │ ┌────────┐┌────────┐┌────────┐┌───┐│  │                  │
│           │  │ │ Small  ││ Medium ││ Large  ││200+││  │                  │
│           │  │ │ 1-10   ││ 11-50  ││ 51-200 ││Ent.││  │                  │
│           │  │ └────────┘└────────┘└────────┘└───┘│  │                  │
│           │  └─────────────────────────────────────┘  │                  │
│           │                                           │                  │
│           │  ┌─────────────────────────────────────┐  │                  │
│           │  │ PRIMARY BUSINESS GOAL *             │  │                  │
│           │  │                                     │  │                  │
│           │  │ ┌────────────────┐ ┌──────────────┐ │  │                  │
│           │  │ │ 📈 Growth     │ │ ⚡ Efficiency │ │  │                  │
│           │  │ │ Increase rev. │ │ Reduce costs  │ │  │                  │
│           │  │ └────────────────┘ └──────────────┘ │  │                  │
│           │  │ ┌────────────────┐ ┌──────────────┐ │  │                  │
│           │  │ │ 😊 Customer   │ │ 🔄 Digital   │ │  │                  │
│           │  │ │ Experience    │ │ Transform.   │ │  │                  │
│           │  │ └────────────────┘ └──────────────┘ │  │                  │
│           │  │ ┌────────────────────────────────┐  │  │                  │
│           │  │ │ Other → [____________]          │  │  │                  │
│           │  │ └────────────────────────────────┘  │  │                  │
│           │  └─────────────────────────────────────┘  │                  │
│           │                                           │                  │
│           │  ┌─────────────────────────────────────┐  │                  │
│           │  │ BIGGEST CHALLENGE *                 │  │                  │
│           │  │                                     │  │                  │
│           │  │ ┌─────────────────────────────────┐ │  │                  │
│           │  │ │                                 │ │  │                  │
│           │  │ │ Describe in 2-3 sentences.      │ │  │                  │
│           │  │ │ Be specific — this shapes our   │ │  │                  │
│           │  │ │ recommendations.                │ │  │                  │
│           │  │ │                                 │ │  │                  │
│           │  │ └─────────────────────────────────┘ │  │                  │
│           │  │                           0 / 500   │  │                  │
│           │  └─────────────────────────────────────┘  │                  │
│           │                                           │                  │
│           │  ┌─────────────────────────────────────┐  │                  │
│           │  │ SUPPORTING DOCUMENTS (Optional)     │  │                  │
│           │  │                                     │  │                  │
│           │  │  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │  │                  │
│           │  │  │    📄 Drop files here or       │ │  │                  │
│           │  │  │       click to upload           │ │  │                  │
│           │  │  │  PDF, DOCX, PPTX, PNG, JPG     │ │  │                  │
│           │  │  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │  │                  │
│           │  └─────────────────────────────────────┘  │                  │
│           │                                           │                  │
├───────────┴───────────────────────────────────────┴──────────────────┤
│                                                                      │
│                                 All changes saved ●                  │
│                                                       Continue →     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Mobile (375px)

```
┌─────────────────────────────┐
│ Step 1/5  ●○○○○  ✓ Saved   │
│ ═══●═══════════════  20%   │
├─────────────────────────────┤
│                             │
│  BUSINESS CONTEXT           │
│                             │
│  Tell us about              │
│  your business              │
│                             │
│  Company Name *             │
│  ┌───────────────────────┐  │
│  │ e.g., Acme Retail     │  │
│  └───────────────────────┘  │
│                             │
│  Website URL                │
│  ┌────────┬──────────────┐  │
│  │https://│              │  │
│  └────────┴──────────────┘  │
│  Optional                   │
│                             │
│  Industry *                 │
│  ┌──────────┐ ┌──────────┐ │
│  │ 🛒 E-com│ │ 🏠 Real  │ │
│  └──────────┘ └──────────┘ │
│  ┌──────────┐ ┌──────────┐ │
│  │ ❤ Health│ │ 📊 Fin.  │ │
│  └──────────┘ └──────────┘ │
│  ┌──────────┐ ┌──────────┐ │
│  │ ✈ Travel│ │ 💎 Fash. │ │
│  └──────────┘ └──────────┘ │
│  ┌──────────┐ ┌──────────┐ │
│  │ 🍴 F&B  │ │ 💼 Prof. │ │
│  └──────────┘ └──────────┘ │
│  ┌──────────┐ ┌──────────┐ │
│  │ 📚 Edu. │ │ 💻 SaaS  │ │
│  └──────────┘ └──────────┘ │
│  ┌──────────┐ ┌──────────┐ │
│  │ ⚙ Manuf.│ │ ⬚ Other │ │
│  └──────────┘ └──────────┘ │
│                             │
│  💡 Why we ask this ▼      │
│  ┌─────────────────────┐   │
│  │ "Your industry       │   │
│  │  determines which    │   │
│  │  diagnostic we run." │   │
│  └─────────────────────┘   │
│                             │
│  Company Size *             │
│  ┌──────┐┌──────┐┌──────┐  │
│  │Small ││Med.  ││Large │  │
│  └──────┘└──────┘└──────┘  │
│  ┌────────────────────┐    │
│  │    Enterprise 200+ │    │
│  └────────────────────┘    │
│                             │
│  ... (remaining fields)     │
│                             │
├─────────────────────────────┤
│             Continue →      │
└─────────────────────────────┘
```

---

## UI COMPONENTS

```
COMPONENT TREE
│
├── StepBusinessContext.tsx (C30)
│   ├── CompanyNameInput .................... text input
│   ├── WebsiteUrlInput .................... url input with prefix chip
│   ├── IndustrySelector ................... 3×4 card grid
│   │   └── IndustryCard (×12) ............. icon + label, selectable
│   ├── CompanySizeSelector ................ horizontal pill radio
│   │   └── SizePill (×4) ................. label + range + description
│   ├── GoalSelector ....................... 2-col card grid + "Other"
│   │   └── GoalCard (×5) ................. icon + label + description
│   ├── ChallengeTextarea .................. textarea + char count
│   └── DocumentUpload .................... drag-and-drop zone
│       └── UploadedFile (×n) .............. filename + size + remove
│
├── ContextPanel content (for this step)
│   ├── WhyWeAsk (per-field dynamic text)
│   └── WhatHappensNext (static preview)
│
└── StepSidebar additions
    └── ContextCard (live-updating summary)
        ├── CompanyName badge
        ├── Industry badge
        ├── CompanySize badge
        └── Goal summary line
```

---

## CONTENT DATA

### Industries

| ID | Label | Icon (lucide-react) | Color Accent |
|----|-------|---------------------|--------------|
| `e-commerce` | E-commerce / Retail | `ShoppingCart` | `#84CC16` |
| `real-estate` | Real Estate | `Building` | `#84CC16` |
| `healthcare` | Healthcare / Medical | `HeartPulse` | `#84CC16` |
| `financial` | Financial Services | `BarChart3` | `#84CC16` |
| `travel` | Travel / Hospitality | `Globe` | `#84CC16` |
| `fashion` | Fashion / Beauty | `Gem` | `#84CC16` |
| `food` | Food & Beverage | `UtensilsCrossed` | `#84CC16` |
| `professional` | Professional Services | `Briefcase` | `#84CC16` |
| `education` | Education | `GraduationCap` | `#84CC16` |
| `saas` | Technology / SaaS | `Monitor` | `#84CC16` |
| `manufacturing` | Manufacturing | `Cog` | `#84CC16` |
| `other` | Other | `LayoutGrid` | `#84CC16` |

### Company Sizes

| ID | Label | Range | Subtext |
|----|-------|-------|---------|
| `small` | Small | 1–10 | Startup / Solo |
| `medium` | Medium | 11–50 | Growing team |
| `large` | Large | 51–200 | Established |
| `enterprise` | Enterprise | 200+ | Scale operations |

### Goals

| ID | Label | Icon | Description |
|----|-------|------|-------------|
| `growth` | Growth | `TrendingUp` | Increase revenue, expand market reach |
| `efficiency` | Efficiency | `Zap` | Reduce costs, automate processes |
| `customer-experience` | Customer Experience | `Smile` | Improve satisfaction, reduce churn |
| `digital-transformation` | Digital Transformation | `RefreshCw` | Modernize operations, adopt new tech |
| `other` | Other | `MoreHorizontal` | Custom goal (free text) |

### Context Panel — Per-Field Copy

| Field Focused | Heading | Body |
|---------------|---------|------|
| Default (none) | Why we're asking | Each question helps us build a clear picture of your business. Your answers drive the industry-specific analysis in the next step. |
| Company Name | Your identity | We use your company name to personalize your strategy brief and project dashboard. |
| Website URL | Digital presence | If provided, our AI can analyze your online presence to provide more accurate recommendations. |
| Industry | Tailored diagnostics | Your industry determines which diagnostic questions we ask next. Each industry has unique challenges and automation opportunities. |
| Company Size | Right-sized systems | Company size affects which systems are practical. A 5-person team needs different solutions than a 200-person organization. |
| Primary Goal | Priority alignment | Your primary goal helps us prioritize which systems to recommend first. |
| Challenge | Pain-point matching | Understanding your specific pain point lets us match you with the most impactful solution. |
| Documents | Richer analysis | Business plans, brand guides, or existing reports help our AI provide richer, more specific analysis. |

---

## FORM VALIDATION

```
FIELD                REQUIRED   RULES
─────────────────────────────────────────────────────────────
Company Name         YES        min 2 chars, max 100
Website URL          NO         valid URL format if provided
Industry             YES        must select exactly 1
Company Size         YES        must select exactly 1
Primary Goal         YES        must select 1; if "Other" → text min 5 chars
Biggest Challenge    YES        min 20 chars, max 500
Documents            NO         max 5 files, max 10MB each
                                accepted: .pdf .docx .pptx .png .jpg

VALIDATION TIMING
├── Per field: on blur (not on every keystroke)
├── On Continue click: validate all, scroll to first error
├── Error display: red border + message below field
└── Clear error: on next valid input
```

---

## INTERACTIONS & STATES

### Industry Card States
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   DEFAULT   │    │   HOVER     │    │  SELECTED   │
│             │    │             │    │             │
│  #FFF bg    │    │  #FFF bg    │    │  #FFF bg    │
│  #E5E2DE    │    │  #C8C8C2    │    │  #84CC16    │
│  border     │    │  border     │    │  border 2px │
│  gray icon  │    │  dark icon  │    │  green icon │
│             │    │             │    │  ✓ badge    │
└─────────────┘    └─────────────┘    └─────────────┘
```

### Company Size Pill States
```
┌──────────┐  ┌──────────┐  ┌──────────┐
│ DEFAULT  │  │  HOVER   │  │ SELECTED │
│          │  │          │  │          │
│ #FFF bg  │  │ #F1EEEA  │  │ #0A211F  │
│ #E5E2DE  │  │ border   │  │ bg       │
│ border   │  │          │  │ #FFF text│
│ #0A211F  │  │          │  │          │
│ text     │  │          │  │          │
└──────────┘  └──────────┘  └──────────┘
```

### Context Card (Left Panel — Live Update)
```
EMPTY STATE:                    FILLED STATE:
┌──────────────┐               ┌──────────────┐
│  Your brief  │               │  Your brief  │
│              │               │              │
│  Fill in the │               │  Acme Retail  │
│  form to see │               │  ┌──────────┐│
│  your brief  │               │  │E-commerce ││
│  appear here │               │  └──────────┘│
│              │               │  Medium(11-50)│
│              │               │  Goal: Growth │
└──────────────┘               └──────────────┘

Cards animate in via motion/react:
  initial: { opacity: 0, y: 8 }
  animate: { opacity: 1, y: 0 }
  transition: { duration: 0.2 }
```

---

## WORKFLOW

```
ENTRY
│
├── User arrives at /wizard (or /wizard?i=e-commerce for pre-fill)
│   ├── Check localStorage for existing wizard session
│   │   ├── If exists + age < 7 days → toast "Resume your brief?"
│   │   │   ├── [Resume] → restore all fields
│   │   │   └── [Start Fresh] → clear + reset
│   │   └── If none → initialize empty WizardState
│   ├── Check URL params
│   │   ├── ?i=xxx → pre-select industry
│   │   └── ?ref=xxx → store referral source
│   └── Render Step 1 as active

INTERACTION
│
├── User fills fields
│   ├── Each change → debounce 500ms → save to localStorage
│   ├── Context Card (left) updates in real-time
│   ├── Context Panel (right) swaps on field focus
│   └── Auto-save indicator: "All changes saved ●"
│
├── User uploads documents
│   ├── Validate file type + size
│   ├── Store as base64 in state (frontend-only mode)
│   │   └── (With Supabase: upload to Storage bucket)
│   ├── Show filename + size + remove button
│   └── Max 5 files

EXIT
│
├── User clicks "Continue"
│   ├── Validate all required fields
│   │   ├── Valid → save state, set step 1 complete, navigate to Step 2
│   │   └── Invalid → show inline errors, scroll to first error
│   └── No "Back" button on Step 1 (this is the first step)
```

---

## AGENT BEHAVIOR

```
GEMINI 3 INTEGRATION: NONE ON THIS SCREEN

This screen collects raw input only. No AI processing occurs here.

PASSIVE BEHAVIORS:
├── Right panel copy is static (pre-written, not AI-generated)
├── Auto-save runs silently (no loading spinners)
├── If user returns later, all fields pre-filled from localStorage
└── Context card updates are pure client-side state

DATA HANDOFF TO STEP 2:
├── Industry selection → determines which question bank loads
├── Company size → affects system sizing recommendations later
├── Goal → influences priority scoring in Step 3
└── Challenge text → fed to Gemini 3 in the Step 2→3 transition
```

---

## ACCESSIBILITY

```
├── All inputs: visible labels (no placeholder-only)
├── Industry grid: role="radiogroup", each card role="radio"
├── Company size: role="radiogroup"
├── Goal cards: role="radiogroup"
├── Textarea: aria-describedby → helper text + char counter
├── File upload: aria-label="Upload supporting documents"
├── Focus order: Company Name → Website → Industry → Size → Goal → Challenge → Upload → Continue
├── Error announcements: aria-live="assertive" for validation errors
└── Step announcement: aria-live="polite" "Step 1 of 5: Business Context"
```

---

## IMPLEMENTATION NOTES

```
DEPENDENCIES:
├── react-hook-form@7.55.0 ........ form state + validation
├── motion/react .................. card animations
├── lucide-react .................. industry + goal icons
├── sonner@2.0.3 .................. toast for draft resume
└── react-dnd ..................... document upload drag-and-drop

FILE STRUCTURE:
├── /components/wizard/steps/StepBusinessContext.tsx
├── /components/wizard/ui/IndustryCard.tsx
├── /components/wizard/ui/SizePill.tsx
├── /components/wizard/ui/GoalCard.tsx
├── /components/wizard/ui/DocumentUpload.tsx
└── /components/wizard/data/industries.ts (static data)
```
