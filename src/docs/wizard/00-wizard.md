# 00 — PROJECT BRIEF WIZARD
# AMO AI — Complete Implementation Plan

**Component:** `C29-WizardPage`
**Route:** `/wizard`
**Status:** PLANNED
**Priority:** HIGH
**Design System:** BCG Consulting + Wizard Design System (hybrid)
**Last Updated:** 2026-03-07

---

## SCREEN DOCUMENTS INDEX

| Doc | Screen | File | Route |
|-----|--------|------|-------|
| [01-business-context.md](./01-business-context.md) | Step 1: Business Context | `StepBusinessContext.tsx` | `/wizard` (step 1) |
| [02-industry-diagnostics.md](./02-industry-diagnostics.md) | Step 2: Industry Diagnostics | `StepIndustryDiagnostics.tsx` | `/wizard` (step 2) |
| [03-system-recommendations.md](./03-system-recommendations.md) | Step 3: System Recommendations | `StepSystemRecommendations.tsx` | `/wizard` (step 3) |
| [04-executive-summary.md](./04-executive-summary.md) | Step 4: Executive Summary | `StepExecutiveSummary.tsx` | `/wizard` (step 4) |
| [05-launch-project.md](./05-launch-project.md) | Step 5: Launch Project | `StepLaunchProject.tsx` | `/wizard` (step 5) |
| [06-processing.md](./06-processing.md) | AI Processing | `ProcessingPage.tsx` | `/wizard/processing` |
| [07-proposal.md](./07-proposal.md) | Proposal Output | `ProposalPage.tsx` | `/wizard/proposal` |
| [08-flow-diagrams.md](./08-flow-diagrams.md) | Mermaid Flow Diagrams | — | — |

Each screen document contains: ASCII wireframes (desktop + mobile), full content
data, UI component trees, form validation rules, workflow diagrams, Gemini 3 agent
integration specs, interaction states, animation definitions, and accessibility
requirements.

`08-flow-diagrams.md` contains 9 Mermaid diagrams: main wizard flow, state machine
(2 variants), data flow overview, AI processing pipeline (sequence diagram),
three-panel layout architecture (block diagram), panel content transitions,
navigation & back flow, simplified step flow, plus quick reference tables for AI
functions and Supabase tables.

---

## TABLE OF CONTENTS

1. [Overview](#1-overview)
2. [Design System Tokens](#2-design-system-tokens)
3. [Information Architecture](#3-information-architecture)
4. [Screen-by-Screen Wireframes](#4-screen-by-screen-wireframes)
5. [UI Component Inventory](#5-ui-component-inventory)
6. [Data Model & State](#6-data-model--state)
7. [AI Agent Architecture](#7-ai-agent-architecture)
8. [Workflow Engine](#8-workflow-engine)
9. [User Journeys](#9-user-journeys)
10. [Responsive Behavior](#10-responsive-behavior)
11. [Animation & Transitions](#11-animation--transitions)
12. [Route Structure](#12-route-structure)
13. [Content Copy](#13-content-copy)
14. [Accessibility](#14-accessibility)
15. [Implementation Phases](#15-implementation-phases)

---

## 1. OVERVIEW

### Purpose
The Project Brief Wizard is a multi-step, AI-assisted intake form that converts
website visitors into qualified leads by collecting structured project requirements.
It replaces the traditional "Contact Us" form with an intelligent, editorial
experience that feels like a conversation with a senior consultant.

### Core Principle
> "Structure first. Intelligence second."
> The wizard gathers structured data, then AI analyzes it to produce
> an instant ballpark estimate and a detailed proposal.

### Flow Summary
```
/wizard ──→ /wizard/processing ──→ /wizard/proposal
   │              │                       │
   │  6 steps     │  AI analysis          │  Scope + pricing
   │  ~5 min      │  ~15 sec              │  + accept/book
   └──────────────┴───────────────────────┘
```

### Entry Points (CTAs that lead here)
| Source Page        | CTA Text                   | Route         |
|--------------------|----------------------------|---------------|
| `/` (Home V3)      | "Start Your Project"       | `/wizard`     |
| `/services`        | "Get Started"              | `/wizard`     |
| `/services/chatbot`| "Design My Chatbot System" | `/wizard?s=chatbot` |
| `/process`         | "Start Your Project"       | `/wizard`     |
| `/projects`        | "Start Similar Project"    | `/wizard`     |
| `/case-studies`    | "Start Similar Project"    | `/wizard`     |
| `/agents`          | "Build AI Agents"          | `/wizard?s=agents` |
| `/sales-crm`      | "Automate My Sales"        | `/wizard?s=crm` |
| `/mvp-v2`         | "Build My MVP"             | `/wizard?s=mvp` |
| Header Nav         | "Start Project" button     | `/wizard`     |

---

## 2. DESIGN SYSTEM TOKENS

### Color Palette (BCG Wizard Hybrid)

```
BACKGROUNDS
├── Page surface .............. #F5F5F0  (BCG warm off-white)
├── Card / Panel surface ...... #FFFFFF  (flat white)
├── Active step highlight ..... #F0FAF5  (very light green tint)
├── Dark section (processing).. #1A1A1A  (charcoal)
└── Input focus bg ............ #FAFAF8

TEXT
├── Primary ................... #1A1A1A  (charcoal)
├── Secondary ................. #6B6B63  (warm gray)
├── Placeholder ............... #9CA39B
├── On dark ................... #F5F5F0
└── On dark muted ............. rgba(245,245,240,0.55)

ACCENTS
├── BCG Green (primary) ....... #00875A
├── BCG Green hover ........... #006B47
├── BCG Green light ........... #E6F4ED  (badges, tags)
├── Success ................... #00875A  (same as primary)
├── Error ..................... #DC2626
├── Warning ................... #D97706
└── Info ...................... #2563EB

BORDERS
├── Default ................... #E8E8E4  (BCG thin border)
├── Hover ..................... #C8C8C2
├── Focus ..................... #00875A  (2px ring)
├── Active step ............... #00875A
└── Divider ................... #F0F0EC
```

### Typography

```
HEADINGS (Georgia, serif — fontWeight: 400)
├── Wizard title .............. 28px / 36px
├── Step title ................ 24px / 32px
├── Card heading .............. 18px / 28px
└── Section label ............. 14px / 20px

BODY (system sans-serif)
├── Body text ................. 16px / 24px
├── Input text ................ 16px / 24px
├── Helper text ............... 14px / 20px
├── Caption ................... 12px / 16px
└── Eyebrow (uppercase) ...... 11px / 16px  letter-spacing: 0.08em

MONOSPACE (JetBrains Mono — metrics only)
├── Estimate number ........... 36px / 44px
└── Data label ................ 13px / 20px
```

### Spacing

```
LAYOUT
├── Max container width ....... 1120px  (BCG standard)
├── Three-panel max width ..... 1440px  (wizard override)
├── Section padding (desktop).. 48px
├── Section padding (mobile)... 24px
├── Card padding .............. 24px
└── Input padding ............. 12px 16px

GAPS
├── Between form fields ....... 24px
├── Between sections .......... 48px
├── Between step groups ....... 32px
├── Between radio options ..... 12px
└── Between tags/pills ........ 8px
```

### Border Radius

```
├── Cards ..................... 4px   (BCG standard — NOT 12px)
├── Inputs .................... 4px
├── Buttons ................... 4px
├── Badges / Pills ............ 2px
├── Avatars ................... 999px
└── Progress bar .............. 2px
```

### Shadows

```
├── Card resting .............. none (use borders)
├── Card hover ................ 0 1px 3px rgba(26,26,26,0.06)
├── Dropdown .................. 0 4px 16px rgba(26,26,26,0.08)
├── Modal ..................... 0 8px 32px rgba(26,26,26,0.12)
└── Focus ring ................ 0 0 0 2px #00875A
```

---

## 3. INFORMATION ARCHITECTURE

### Step Map (6 Steps + Processing + Proposal)

```
WIZARD FLOW
│
├─ STEP 1: PROJECT TYPE ────────────── "What are you building?"
│  ├── Service selection (single)
│  ├── Pre-fill from URL param ?s=
│  └── Smart descriptions per service
│
├─ STEP 2: BUSINESS CONTEXT ────────── "Tell us about your business"
│  ├── Company name
│  ├── Industry (select)
│  ├── Company size (radio)
│  ├── Current tech stack (multi-select tags)
│  └── Website URL (optional)
│
├─ STEP 3: GOALS & PROBLEMS ───────── "What problem are we solving?"
│  ├── Primary goal (select from contextual list)
│  ├── Pain points (checkbox, max 5)
│  ├── Success metric (text + unit select)
│  └── "Describe your ideal outcome" (textarea)
│
├─ STEP 4: SCOPE & FEATURES ──────── "What does the solution need?"
│  ├── Feature checklist (contextual to Step 1)
│  ├── Integration requirements (multi-select)
│  ├── User volume estimate (slider)
│  └── Priority ranking (drag-and-drop top 3)
│
├─ STEP 5: TIMELINE & BUDGET ─────── "When and how much?"
│  ├── Timeline preference (radio: 4wk / 6wk / 8wk / flexible)
│  ├── Budget range (radio tiers)
│  ├── Decision timeline (select)
│  └── Blockers or constraints (optional textarea)
│
├─ STEP 6: CONTACT & REVIEW ──────── "Let's get you a proposal"
│  ├── Full name
│  ├── Email
│  ├── Phone (optional)
│  ├── Preferred contact method (radio)
│  ├── Summary review (read-only cards)
│  └── Submit button
│
├─ PROCESSING ─────────────────────── "/wizard/processing"
│  ├── AI analysis animation
│  ├── Thinking states (not spinners)
│  └── ~15 second experience
│
└─ PROPOSAL ───────────────────────── "/wizard/proposal"
   ├── Scope breakdown
   ├── Timeline Gantt
   ├── Pricing tiers
   ├── Accept → payment
   └── "Have questions?" → /booking
```

### Conditional Logic Map

```
IF Step 1 = "AI Chatbots"
├── Step 3 goals → chatbot-specific (reduce support tickets, qualify leads, etc.)
├── Step 4 features → WhatsApp, website widget, email, CRM sync, NLP
└── Step 5 budget tiers → $5K-$10K / $10K-$20K / $20K-$40K / Custom

IF Step 1 = "AI Agent Systems"
├── Step 3 goals → automation-specific (workflow automation, data processing, etc.)
├── Step 4 features → multi-agent, orchestrator, RAG, tool use, human-in-loop
└── Step 5 budget tiers → $15K-$30K / $30K-$50K / $50K+ / Custom

IF Step 1 = "Sales CRM"
├── Step 3 goals → revenue-specific (pipeline visibility, lead scoring, etc.)
├── Step 4 features → pipeline, lead scoring, email sequences, reporting
└── Step 5 budget tiers → $8K-$15K / $15K-$25K / $25K-$40K / Custom

IF Step 1 = "MVP Builder"
├── Step 3 goals → speed-specific (validate idea, get to market, fundraise)
├── Step 4 features → auth, payments, dashboard, API, mobile-responsive
└── Step 5 budget tiers → $10K-$20K / $20K-$35K / $35K-$50K / Custom

IF Step 1 = "Web Apps"
├── Step 3 goals → scale-specific (user growth, feature parity, performance)
├── Step 4 features → auth, real-time, file uploads, admin panel, analytics
└── Step 5 budget tiers → $12K-$25K / $25K-$40K / $40K-$60K / Custom

IF Step 1 = "Web Design"
├── Step 3 goals → brand-specific (rebrand, conversion, credibility)
├── Step 4 features → responsive, CMS, SEO, animations, dark mode
└── Step 5 budget tiers → $5K-$10K / $10K-$18K / $18K-$30K / Custom

IF Step 2 industry = "E-Commerce"
├── Step 4 adds → Shopify/WooCommerce integration options
└── Proposal adds → E-commerce specific ROI projections

IF Step 2 industry = "Fashion"
├── Step 4 adds → visual search, size recommendation, lookbook
└── Proposal adds → Fashion case study reference (FashionOS)
```

---

## 4. SCREEN-BY-SCREEN WIREFRAMES

### Master Layout — Three-Panel (Desktop 1280px+)

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ☀ AMO AI     Step 3 of 6: Goals           ✓ Auto-saved  │
│                                                                  │
├──────────┬──────────────────────────────────────┬────────────────┤
│          │                                      │                │
│  STEPS   │         MAIN CONTENT                 │   CONTEXT      │
│          │                                      │                │
│  240px   │         flexible                     │   320px        │
│  #FFF    │         #F5F5F0                      │   #FFF         │
│          │                                      │                │
│ ┌──────┐ │  ┌────────────────────────────────┐  │ ┌────────────┐ │
│ │ ● 1  │ │  │                                │  │ │            │ │
│ │ Proj.│ │  │  [EYEBROW: STEP 3]             │  │ │  WHY WE    │ │
│ │      │ │  │                                │  │ │  ASK THIS  │ │
│ │ ● 2  │ │  │  What problem are              │  │ │            │ │
│ │ Biz. │ │  │  we solving?                   │  │ │  "Goals    │ │
│ │      │ │  │                                │  │ │  help us   │ │
│ │ ◉ 3  │ │  │  ┌────────────────────────┐   │  │ │  match the │ │
│ │ Goal │ │  │  │ Primary Goal      [▼]  │   │  │ │  right     │ │
│ │      │ │  │  └────────────────────────┘   │  │ │  solution  │ │
│ │ ○ 4  │ │  │                                │  │ │  scope."   │ │
│ │ Scope│ │  │  Pain Points:                  │  │ │            │ │
│ │      │ │  │  ☑ Manual processes too slow    │  │ │ ┌────────┐ │ │
│ │ ○ 5  │ │  │  ☑ No 24/7 availability        │  │ │ │ Avg.   │ │ │
│ │ Time │ │  │  ☐ Data scattered across tools  │  │ │ │ savings│ │ │
│ │      │ │  │  ☐ Poor lead conversion         │  │ │ │  40%   │ │ │
│ │ ○ 6  │ │  │  ☐ Customer wait times          │  │ │ └────────┘ │ │
│ │ Send │ │  │                                │  │ │            │ │
│ │      │ │  │  Describe your ideal outcome:  │  │ │  Related:  │ │
│ │      │ │  │  ┌────────────────────────┐   │  │ │  → Process │ │
│ │      │ │  │  │                        │   │  │ │  → Chatbot │ │
│ │      │ │  │  │  [textarea]            │   │  │ │    page    │ │
│ │      │ │  │  │                        │   │  │ │            │ │
│ │      │ │  │  └────────────────────────┘   │  │ │            │ │
│ │      │ │  │                                │  │ │            │ │
│ │      │ │  └────────────────────────────────┘  │ └────────────┘ │
│ │      │ │                                      │                │
│ └──────┘ │                                      │                │
│          │                                      │                │
├──────────┴──────────────────────────────────────┴────────────────┤
│                                                                  │
│   ← Back                                    Continue →   Step 3/6│
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Step 1 — Project Type Selection

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  PROJECT TYPE                                        │
│                                                      │
│  What are you building?                              │
│                                                      │
│  Select the service that best matches your project.  │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │                                              │    │
│  │  ◉  AI Chatbot Systems                      │    │
│  │     Intelligent conversational agents for    │    │
│  │     customer support, sales, and operations  │    │
│  │                                              │    │
│  ├──────────────────────────────────────────────┤    │
│  │                                              │    │
│  │  ○  AI Agent Systems                        │    │
│  │     Multi-agent workflows that automate      │    │
│  │     complex business processes end-to-end    │    │
│  │                                              │    │
│  ├──────────────────────────────────────────────┤    │
│  │                                              │    │
│  │  ○  Sales CRM Automation                    │    │
│  │     AI-powered pipeline management, lead     │    │
│  │     scoring, and revenue intelligence        │    │
│  │                                              │    │
│  ├──────────────────────────────────────────────┤    │
│  │                                              │    │
│  │  ○  MVP / Rapid Prototype                   │    │
│  │     Validate your idea in 4–6 weeks with     │    │
│  │     a production-ready minimum product       │    │
│  │                                              │    │
│  ├──────────────────────────────────────────────┤    │
│  │                                              │    │
│  │  ○  Custom Web Application                  │    │
│  │     Full-stack web platforms with auth,      │    │
│  │     real-time features, and admin panels     │    │
│  │                                              │    │
│  ├──────────────────────────────────────────────┤    │
│  │                                              │    │
│  │  ○  AI Web Design                           │    │
│  │     High-converting websites with AI-driven  │    │
│  │     personalization and editorial layouts    │    │
│  │                                              │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │  ○  Not sure yet — help me figure it out     │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Step 2 — Business Context

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  BUSINESS CONTEXT                                    │
│                                                      │
│  Tell us about your business                         │
│                                                      │
│  Company Name *                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │  Acme Corp                                   │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  Industry *                                          │
│  ┌──────────────────────────────────────────────┐    │
│  │  E-Commerce                             [▼]  │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  Company Size *                                      │
│                                                      │
│  ┌──────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │ 1-10 │ │  11-50   │ │  51-200  │ │   200+   │    │
│  │      │ │ ◉        │ │          │ │          │    │
│  └──────┘ └──────────┘ └──────────┘ └──────────┘    │
│                                                      │
│  Current Tech Stack (select all that apply)          │
│                                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│  │ Shopify  │ │ HubSpot  │ │ Slack    │             │
│  │    ☑     │ │    ☑     │ │    ☐     │             │
│  └──────────┘ └──────────┘ └──────────┘             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│  │ Salesforce│ │ WordPress│ │ Custom   │             │
│  │    ☐     │ │    ☐     │ │    ☐     │             │
│  └──────────┘ └──────────┘ └──────────┘             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│  │ Stripe   │ │ Notion   │ │ Zapier   │             │
│  │    ☐     │ │    ☐     │ │    ☐     │             │
│  └──────────┘ └──────────┘ └──────────┘             │
│                                                      │
│  Website URL (optional)                              │
│  ┌──────────────────────────────────────────────┐    │
│  │  https://                                    │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Step 3 — Goals & Problems

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  GOALS & PROBLEMS                                    │
│                                                      │
│  What problem are we solving?                        │
│                                                      │
│  Primary Goal *                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │  Reduce customer support volume         [▼]  │    │
│  └──────────────────────────────────────────────┘    │
│  ┌─ Options (contextual to Step 1 = Chatbot) ──┐    │
│  │  Reduce customer support volume              │    │
│  │  Qualify leads automatically 24/7            │    │
│  │  Automate order tracking & FAQs              │    │
│  │  Improve customer satisfaction scores        │    │
│  │  Scale support without hiring                │    │
│  │  Capture and route inbound inquiries         │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  What pain points are you experiencing? (max 5)      │
│                                                      │
│  ☑  Manual processes are too slow                    │
│  ☑  No 24/7 customer availability                   │
│  ☐  Data scattered across multiple tools             │
│  ☐  Poor lead-to-customer conversion                 │
│  ☐  Long customer wait times                         │
│  ☐  No visibility into customer sentiment            │
│  ☐  Support team burnout / turnover                  │
│  ☐  Inconsistent response quality                    │
│                                                      │
│  How will you measure success? *                     │
│  ┌────────────────────────────┐ ┌────────────────┐   │
│  │  40                        │ │  % reduction ▼ │   │
│  └────────────────────────────┘ └────────────────┘   │
│                                                      │
│  Describe your ideal outcome                         │
│  ┌──────────────────────────────────────────────┐    │
│  │  We want an AI chatbot on our website and    │    │
│  │  WhatsApp that handles 80% of support        │    │
│  │  queries automatically, routes complex       │    │
│  │  issues to human agents, and integrates      │    │
│  │  with our Shopify order system.              │    │
│  │                                              │    │
│  └──────────────────────────────────────────────┘    │
│  128 / 500 characters                                │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Step 4 — Scope & Features

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  SCOPE & FEATURES                                    │
│                                                      │
│  What does the solution need?                        │
│                                                      │
│  CORE FEATURES  (contextual: Chatbot + E-Commerce)   │
│  ─────────────────────────────────────────────────   │
│                                                      │
│  ☑  Website chat widget                              │
│  ☑  WhatsApp Business integration                    │
│  ☐  Email response automation                        │
│  ☑  Shopify order lookup & tracking                  │
│  ☐  Product recommendation engine                    │
│  ☑  CRM sync (leads → HubSpot)                      │
│  ☐  Multi-language support                           │
│  ☑  Human handoff / escalation                       │
│  ☐  Sentiment analysis & tagging                     │
│  ☐  Analytics dashboard                              │
│                                                      │
│  INTEGRATIONS REQUIRED                               │
│  ─────────────────────────────────────────────────   │
│                                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│  │ Shopify  │ │ HubSpot  │ │ WhatsApp │             │
│  │   ☑ ●   │ │   ☑ ●   │ │   ☑ ●   │             │
│  └──────────┘ └──────────┘ └──────────┘             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│  │ Slack    │ │ Stripe   │ │ Zapier   │             │
│  │   ☐     │ │   ☐     │ │   ☐     │             │
│  └──────────┘ └──────────┘ └──────────┘             │
│  (● = auto-detected from Step 2 tech stack)          │
│                                                      │
│  EXPECTED USER VOLUME                                │
│  ─────────────────────────────────────────────────   │
│                                                      │
│  Monthly conversations:                              │
│  ○───────────────●──────────────────○                │
│  100           2,500              10,000+             │
│                  ▲                                    │
│              ~2,500/mo                               │
│                                                      │
│  TOP 3 PRIORITIES (drag to rank)                     │
│  ─────────────────────────────────────────────────   │
│                                                      │
│  ┌─ 1 ─────────────────────────────────────────┐     │
│  │  ≡  Speed to launch                         │     │
│  └─────────────────────────────────────────────┘     │
│  ┌─ 2 ─────────────────────────────────────────┐     │
│  │  ≡  Integration depth                       │     │
│  └─────────────────────────────────────────────┘     │
│  ┌─ 3 ─────────────────────────────────────────┐     │
│  │  ≡  Cost efficiency                         │     │
│  └─────────────────────────────────────────────┘     │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Step 5 — Timeline & Budget

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  TIMELINE & BUDGET                                   │
│                                                      │
│  When and how much?                                  │
│                                                      │
│  Preferred Timeline *                                │
│                                                      │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐       │
│  │  4 weeks   │ │  6 weeks   │ │  8 weeks   │       │
│  │  Fastest   │ │ ◉ Standard │ │  Relaxed   │       │
│  │  +20%      │ │            │ │  -10%      │       │
│  └────────────┘ └────────────┘ └────────────┘       │
│  ┌──────────────────────────────────────────┐        │
│  │  Flexible — let AMO AI recommend          │        │
│  └──────────────────────────────────────────┘        │
│                                                      │
│  Budget Range *                                      │
│  (Based on: AI Chatbot + E-Commerce scope)           │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │                                              │    │
│  │  ○  $5,000 – $10,000                        │    │
│  │     Basic chatbot, 1 channel, FAQ-level      │    │
│  │                                              │    │
│  │  ◉  $10,000 – $20,000                   ★   │    │
│  │     Multi-channel, integrations, analytics   │    │
│  │     ★ RECOMMENDED for your scope             │    │
│  │                                              │    │
│  │  ○  $20,000 – $40,000                       │    │
│  │     Enterprise: multi-agent, full CRM sync   │    │
│  │                                              │    │
│  │  ○  Custom / Enterprise                      │    │
│  │     Let's discuss on a call                  │    │
│  │                                              │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  When do you need to make a decision? *              │
│  ┌──────────────────────────────────────────────┐    │
│  │  Within 2 weeks                         [▼]  │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  Anything else we should know? (optional)            │
│  ┌──────────────────────────────────────────────┐    │
│  │                                              │    │
│  │  [textarea — blockers, constraints, notes]   │    │
│  │                                              │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Step 6 — Contact & Review

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  CONTACT & REVIEW                                    │
│                                                      │
│  Let's get you a proposal                            │
│                                                      │
│  ┌─── YOUR DETAILS ────────────────────────────┐     │
│  │                                              │     │
│  │  Full Name *                                 │     │
│  │  ┌──────────────────────────────────────┐    │     │
│  │  │  Jane Smith                          │    │     │
│  │  └──────────────────────────────────────┘    │     │
│  │                                              │     │
│  │  Email *                                     │     │
│  │  ┌──────────────────────────────────────┐    │     │
│  │  │  jane@acmecorp.com                   │    │     │
│  │  └──────────────────────────────────────┘    │     │
│  │                                              │     │
│  │  Phone (optional)                            │     │
│  │  ┌──────────────────────────────────────┐    │     │
│  │  │  +1 (555) 123-4567                   │    │     │
│  │  └──────────────────────────────────────┘    │     │
│  │                                              │     │
│  │  Preferred Contact Method *                  │     │
│  │  ◉ Email   ○ Phone   ○ WhatsApp             │     │
│  │                                              │     │
│  └──────────────────────────────────────────────┘     │
│                                                      │
│  ┌─── PROJECT SUMMARY ─────────────────────────┐     │
│  │                                              │     │
│  │  Service        AI Chatbot Systems           │     │
│  │  ─────────────────────────────────────────   │     │
│  │  Industry       E-Commerce (11-50 people)    │     │
│  │  ─────────────────────────────────────────   │     │
│  │  Goal           Reduce support volume 40%    │     │
│  │  ─────────────────────────────────────────   │     │
│  │  Features       6 selected (5 core + 1 int.) │     │
│  │  ───────────────────────────────��─────────   │     │
│  │  Timeline       6 weeks (standard)           │     │
│  │  ─────────────────────────────────────────   │     │
│  │  Budget         $10,000 – $20,000            │     │
│  │  ─────────────────────────────────────────   │     │
│  │                                              │     │
│  │  [Edit any step]                ✎ Edit       │     │
│  │                                              │     │
│  └──────────────────────────────────────────────┘     │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │                                              │    │
│  │          Generate My Proposal →              │    │
│  │                                              │    │
│  │  By submitting you agree to our Terms.       │    │
│  │                                              │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Processing Screen — `/wizard/processing`

```
┌──────────────────────────────────────────────────────┐
│                                           #1A1A1A bg │
│                                                      │
│                                                      │
│                                                      │
│                                                      │
│              ANALYZING YOUR PROJECT                  │
│                                                      │
│              ┌────────────────────┐                   │
│              │                    │                   │
│              │    ◉ ← ← ← ◉     │                   │
│              │    ↓         ↑     │                   │
│              │    ◉ → → → ◉     │                   │
│              │                    │                   │
│              │  [agent diagram]   │                   │
│              │                    │                   │
│              └────────────────────┘                   │
│                                                      │
│              ✓ Understanding requirements             │
│              ✓ Matching solution architecture         │
│              ● Calculating timeline & costs...        │
│              ○ Generating proposal                    │
│              ○ Finalizing recommendations             │
│                                                      │
│              ═══════════════════●═══  72%             │
│                                                      │
│              "Our AI is reviewing 847 past            │
│               projects to find the best               │
│               approach for your scope."               │
│                                                      │
│                                                      │
│                                                      │
└──────────────────────────────────────────────────────┘

THINKING STATES (cycle every 3-4 seconds):
─────────────────────────────────────────
State 1: "Understanding requirements"
         → Parsing your goals and constraints

State 2: "Matching solution architecture"
         → Comparing with 847 past projects

State 3: "Calculating timeline & costs"
         → Factoring scope, integrations, and complexity

State 4: "Generating proposal"
         → Building your custom project plan

State 5: "Finalizing recommendations"
         → Adding optimization suggestions

→ Auto-redirect to /wizard/proposal after ~15s
```

### Proposal Screen — `/wizard/proposal`

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ☀ AMO AI                           Download PDF  ↓  │
│                                                              │
│  ─────────────────────────────────────────────────────────   │
│                                                              │
│  PROJECT PROPOSAL                                            │
│                                                              │
│  AI Chatbot System for Acme Corp                             │
│  Prepared March 7, 2026                                      │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │  ESTIMATE   │  │  TIMELINE  │  │  START     │             │
│  │             │  │            │  │            │             │
│  │  $14,500    │  │  6 weeks   │  │  Mar 17   │             │
│  │             │  │            │  │            │             │
│  └────────────┘  └────────────┘  └────────────┘             │
│                                                              │
│  ─── SCOPE BREAKDOWN ──────────────────────────────────────  │
│                                                              │
│  Phase 1: Discovery & Architecture      Week 1       $2,200  │
│  ───────────────────────────────────────────────────────────  │
│  • Requirements deep-dive                                    │
│  • System architecture design                                │
│  • Integration mapping (Shopify, HubSpot, WhatsApp)          │
│                                                              │
│  Phase 2: Core Development              Week 2-3     $5,800  │
│  ───────────────────────────────────────────────────────────  │
│  • Chatbot NLP engine                                        │
│  • Website widget                                            │
│  • WhatsApp Business API                                     │
│  • Order tracking integration                                │
│                                                              │
│  Phase 3: Integrations & Testing        Week 4-5     $4,200  │
│  ───────────────────────────────────────────────────────────  │
│  • HubSpot CRM sync                                         │
│  • Human handoff workflows                                   │
│  • QA & conversation testing                                 │
│                                                              │
│  Phase 4: Launch & Optimization         Week 6       $2,300  │
│  ───────────────────────────────────────────────────────────  │
│  • Production deployment                                     │
│  • Team training (2 sessions)                                │
│  • 30-day optimization period                                │
│                                                              │
│  ─── TIMELINE ─────────────────────────────────────────────  │
│                                                              │
│  W1  ████░░░░░░░░░░░░░░░░░░░░  Discovery                   │
│  W2  ░░░░████████░░░░░░░░░░░░  Core Dev                     │
│  W3  ░░░░████████░░░░░░░░░░░░  Core Dev                     │
│  W4  ░░░░░░░░░░░░████████░░░░  Integration                  │
│  W5  ░░░░░░░░░░░░████████░░░░  Testing                      │
│  W6  ░░░░░░░░░░░░░░░░░░░░████  Launch                       │
│                                                              │
│  ─── WHAT'S INCLUDED ──────────────────────────────────────  │
│                                                              │
│  ☑ Source code ownership          ☑ 30-day post-launch       │
│  ☑ Documentation                  ☑ 2 training sessions      │
│  ☑ Deployment to production       ☑ Slack support channel    │
│                                                              │
│  ─── NEXT STEPS ───────────────────────────────────────────  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │                                                      │    │
│  │    Accept Proposal & Pay Deposit ($4,350)             │    │
│  │                                                      │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │    Have questions? Book a 30-min call instead         │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  This proposal is valid for 14 days.                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 5. UI COMPONENT INVENTORY

### New Components Required

```
WIZARD SHELL
├── C29-WizardPage ................... /components/wizard/WizardPage.tsx
├── C29a-WizardLayout ................ /components/wizard/WizardLayout.tsx
├── C29b-WizardHeader ................ /components/wizard/WizardHeader.tsx
├── C29c-WizardFooter ................ /components/wizard/WizardFooter.tsx
├── C29d-StepSidebar ................. /components/wizard/StepSidebar.tsx
├── C29e-ContextPanel ................ /components/wizard/ContextPanel.tsx
└── C29f-ProgressBar ................. /components/wizard/ProgressBar.tsx

STEP SCREENS
├── C30-StepProjectType .............. /components/wizard/steps/StepProjectType.tsx
├── C31-StepBusinessContext .......... /components/wizard/steps/StepBusinessContext.tsx
├── C32-StepGoals .................... /components/wizard/steps/StepGoals.tsx
├── C33-StepScope .................... /components/wizard/steps/StepScope.tsx
├── C34-StepTimeline ................. /components/wizard/steps/StepTimeline.tsx
├── C35-StepContact .................. /components/wizard/steps/StepContact.tsx
└── C36-StepReview ................... /components/wizard/steps/StepReview.tsx

PROCESSING & PROPOSAL
├── C37-ProcessingPage ............... /components/wizard/ProcessingPage.tsx
├── C37a-ThinkingStates .............. /components/wizard/ThinkingStates.tsx
├── C37b-AgentDiagram ................ /components/wizard/AgentDiagram.tsx
├── C38-ProposalPage ................. /components/wizard/ProposalPage.tsx
├── C38a-ScopeBreakdown .............. /components/wizard/ProposalScopeBreakdown.tsx
├── C38b-TimelineGantt ............... /components/wizard/ProposalTimeline.tsx
└── C38c-PricingSummary .............. /components/wizard/ProposalPricing.tsx

SHARED FORM COMPONENTS
├── C39a-ServiceCard ................. /components/wizard/ui/ServiceCard.tsx
├── C39b-FeatureCheckbox ............. /components/wizard/ui/FeatureCheckbox.tsx
├── C39c-BudgetTierCard .............. /components/wizard/ui/BudgetTierCard.tsx
├── C39d-TimelineOption .............. /components/wizard/ui/TimelineOption.tsx
├── C39e-TechStackTag ................ /components/wizard/ui/TechStackTag.tsx
├── C39f-PriorityRanker .............. /components/wizard/ui/PriorityRanker.tsx
├── C39g-VolumeSlider ................ /components/wizard/ui/VolumeSlider.tsx
├── C39h-SummaryCard ................. /components/wizard/ui/SummaryCard.tsx
└── C39i-MetricBadge ................. /components/wizard/ui/MetricBadge.tsx
```

### Existing Components to Reuse

```
FROM /components/shared/
├── Button (BCG styled)
├── Input
├── Select
├── Textarea
├── Checkbox
├── RadioGroup
└── Badge

FROM /components/ui/
├── Card
├── Separator
├── Tabs
├── Accordion (for FAQ on proposal)
├── Progress
└── Toast (sonner@2.0.3)
```

---

## 6. DATA MODEL & STATE

### WizardState (React Context + useReducer)

```typescript
interface WizardState {
  // Meta
  currentStep: 1 | 2 | 3 | 4 | 5 | 6;
  completedSteps: Set<number>;
  isDirty: boolean;
  lastSaved: Date | null;

  // Step 1 — Project Type
  projectType: ServiceType | null;

  // Step 2 — Business Context
  companyName: string;
  industry: IndustryType | null;
  companySize: CompanySizeType | null;
  techStack: TechStackItem[];
  websiteUrl: string;

  // Step 3 — Goals & Problems
  primaryGoal: string | null;
  painPoints: string[];
  successMetricValue: string;
  successMetricUnit: MetricUnit;
  idealOutcome: string;

  // Step 4 — Scope & Features
  selectedFeatures: string[];
  integrations: string[];
  monthlyVolume: number;
  priorities: string[]; // ordered top 3

  // Step 5 — Timeline & Budget
  timeline: TimelineOption | null;
  budgetRange: BudgetRange | null;
  decisionTimeline: string | null;
  additionalNotes: string;

  // Step 6 — Contact
  fullName: string;
  email: string;
  phone: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
}

type ServiceType =
  | 'chatbot'
  | 'ai-agents'
  | 'sales-crm'
  | 'mvp'
  | 'web-apps'
  | 'web-design'
  | 'unsure';

type IndustryType =
  | 'e-commerce'
  | 'fashion'
  | 'saas'
  | 'real-estate'
  | 'b2b-services'
  | 'automotive'
  | 'travel-tourism'
  | 'financial'
  | 'healthcare'
  | 'education'
  | 'other';

type CompanySizeType = '1-10' | '11-50' | '51-200' | '200+';

type TimelineOption = '4-weeks' | '6-weeks' | '8-weeks' | 'flexible';

interface BudgetRange {
  id: string;
  min: number;
  max: number | null;
  label: string;
  recommended: boolean;
}

type MetricUnit =
  | '% reduction'
  | '% increase'
  | 'hours saved'
  | 'revenue increase'
  | 'tickets reduced'
  | 'custom';

interface TechStackItem {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
}
```

### Conditional Data Maps

```typescript
// Maps ServiceType → available goals, features, budget tiers
const SERVICE_CONFIG: Record<ServiceType, ServiceConfig> = {
  chatbot: {
    goals: [...],
    painPoints: [...],
    features: [...],
    integrations: [...],
    budgetTiers: [...],
    avgTimeline: '6-weeks',
  },
  'ai-agents': { ... },
  'sales-crm': { ... },
  'mvp': { ... },
  'web-apps': { ... },
  'web-design': { ... },
  'unsure': { ... },  // shows all options
};

// Maps IndustryType → additional features & context
const INDUSTRY_CONFIG: Record<IndustryType, IndustryConfig> = {
  'e-commerce': {
    additionalFeatures: ['Shopify integration', 'WooCommerce', ...],
    caseStudyRef: 'FashionOS',
    avgDealSize: '$12,000',
  },
  // ...
};
```

### State Persistence

```
LOCAL STORAGE
├── Key: 'sun-ai-wizard-draft'
├── Auto-save: on every field change (debounced 1s)
├── Restore: prompt on page load if draft exists
├── Clear: on successful submission
└── TTL: 7 days

URL PARAMS (read-only, for pre-fill)
├── ?s=chatbot ............ pre-selects Step 1
├── ?s=agents ............. pre-selects Step 1
├── ?s=crm ................ pre-selects Step 1
├── ?s=mvp ................ pre-selects Step 1
├── ?i=e-commerce ......... pre-selects Step 2 industry
└── ?ref=case-study-name .. tracks referral source
```

---

## 7. AI AGENT ARCHITECTURE

### Overview

The wizard's "processing" phase simulates (and eventually connects to)
a multi-agent AI system that analyzes the brief and generates a proposal.

```
WIZARD AGENT SYSTEM
│
├── ORCHESTRATOR AGENT ────────── Coordinates all sub-agents
│   │
│   ├── REQUIREMENTS ANALYST ──── Parses wizard data → structured spec
│   │   Input:  WizardState
│   │   Output: RequirementsDocument
│   │   Logic:  Map features → technical requirements
│   │           Map goals → success criteria
│   │           Map industry → compliance needs
│   │
│   ├── SCOPE ESTIMATOR ──────── Calculates effort & complexity
│   │   Input:  RequirementsDocument
│   │   Output: ScopeEstimate
│   │   Logic:  Feature complexity scoring (1-5 each)
│   │           Integration difficulty matrix
│   │           Historical comparison (past projects DB)
│   │           Risk factor calculation
│   │
│   ├── TIMELINE PLANNER ─────── Generates phased schedule
│   │   Input:  ScopeEstimate + TimelinePreference
│   │   Output: ProjectTimeline
│   │   Logic:  Phase allocation (discovery, dev, test, launch)
│   │           Parallel workstream identification
│   │           Milestone definition
│   │           Buffer calculation (15% standard)
│   │
│   ├── PRICING ENGINE ───────── Calculates cost breakdown
│   │   Input:  ScopeEstimate + Timeline + BudgetRange
│   │   Output: PricingBreakdown
│   │   Logic:  Base rate × complexity × timeline factor
│   │           Phase-by-phase cost allocation
│   │           Recommended vs. budget-constrained options
│   │           Deposit calculation (30%)
│   │
│   └── PROPOSAL WRITER ──────── Generates final document
│       Input:  All above outputs
│       Output: ProposalDocument
│       Logic:  Executive summary generation
│               Deliverables list
│               "What's included" checklist
│               Risk mitigation notes
│               Next steps & CTA
│
└── APPROVAL GATE ─────────────── Human review (internal)
    Trigger: All proposals over $25K flagged for review
    SLA:     4 hours for manual review
    Default: Auto-approve under $25K
```

### Agent Data Flow

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  WIZARD      │────→│  REQUIREMENTS│────→│  SCOPE       │
│  STATE       │     │  ANALYST     │     │  ESTIMATOR   │
└─────────────┘     └──────────────┘     └──────┬───────┘
                                                │
                                    ┌───────────┴──────────┐
                                    │                      │
                              ┌─────▼──────┐    ┌─────────▼───────┐
                              │  TIMELINE   │    │  PRICING        │
                              │  PLANNER    │    │  ENGINE         │
                              └─────┬──────┘    └────────┬────────┘
                                    │                    │
                                    └────────┬───────────┘
                                             │
                                    ┌────────▼────────┐
                                    │  PROPOSAL        │
                                    │  WRITER          │
                                    └────────┬────────┘
                                             │
                                    ┌────────▼────────┐
                                    │  APPROVAL GATE   │
                                    │  (>$25K review)  │
                                    └────────┬────────┘
                                             │
                                    ┌────────▼────────┐
                                    │  /wizard/proposal│
                                    └─────────────────┘
```

### Processing Phase — Simulated States

For the MVP (frontend-only), the processing screen simulates agent activity:

```typescript
const PROCESSING_STATES = [
  {
    id: 'requirements',
    label: 'Understanding requirements',
    description: 'Parsing your goals and constraints',
    duration: 2500,  // ms
    progress: 20,
  },
  {
    id: 'matching',
    label: 'Matching solution architecture',
    description: 'Comparing with 847 past projects',
    duration: 3000,
    progress: 40,
  },
  {
    id: 'calculating',
    label: 'Calculating timeline & costs',
    description: 'Factoring scope, integrations, and complexity',
    duration: 3500,
    progress: 60,
  },
  {
    id: 'generating',
    label: 'Generating proposal',
    description: 'Building your custom project plan',
    duration: 3000,
    progress: 80,
  },
  {
    id: 'finalizing',
    label: 'Finalizing recommendations',
    description: 'Adding optimization suggestions',
    duration: 2000,
    progress: 100,
  },
];
```

---

## 8. WORKFLOW ENGINE

### Step Validation Rules

```
STEP 1 — Project Type
├── Required: projectType !== null
├── Validation: on selection (instant)
└── Auto-advance: yes (after 400ms delay)

STEP 2 — Business Context
├── Required: companyName, industry, companySize
├── Optional: techStack, websiteUrl
├── Validation: on blur (per field) + on Continue
├── companyName: min 2 chars, max 100
├── websiteUrl: valid URL format (if provided)
└── Auto-advance: no

STEP 3 — Goals & Problems
├── Required: primaryGoal, painPoints (min 1), successMetricValue
├── Optional: idealOutcome
├── Validation: painPoints max 5
├── successMetricValue: numeric, > 0
├── idealOutcome: max 500 chars
└── Auto-advance: no

STEP 4 — Scope & Features
├── Required: selectedFeatures (min 1), monthlyVolume
├── Optional: integrations, priorities
├── Validation: selectedFeatures max 15
├── priorities: exactly 3 if provided
└── Auto-advance: no

STEP 5 — Timeline & Budget
├── Required: timeline, budgetRange, decisionTimeline
├── Optional: additionalNotes
├── Validation: additionalNotes max 1000 chars
└── Auto-advance: no

STEP 6 — Contact
├── Required: fullName, email, preferredContact
├── Optional: phone
├── Validation: email format, phone format (if provided)
├── fullName: min 2 chars
└── Submit: enabled only when all steps valid
```

### Navigation Rules

```
FORWARD NAVIGATION
├── Can advance: only if current step is valid
├── Skip steps: NOT allowed (linear flow)
└── Keyboard: Enter key advances (except textareas)

BACKWARD NAVIGATION
├── Can go back: always (preserves data)
├── Jump to step: only completed steps (via sidebar)
└── Keyboard: Escape goes back

STEP SIDEBAR STATES
├── Completed (●): green checkmark, clickable
├── Current  (◉): green filled, active
├── Upcoming (○): gray outline, not clickable
└── Invalid  (●!): red indicator on completed but invalidated
```

### Auto-Save Workflow

```
USER TYPES → Debounce 1s → Save to localStorage → Show ✓ indicator
                                    │
                                    ├── Key: 'sun-ai-wizard-draft'
                                    ├── Timestamp: Date.now()
                                    └── Version: schema version for migration

ON PAGE LOAD:
├── Check localStorage for draft
├── If draft exists AND age < 7 days:
│   └── Show toast: "Welcome back. Resume your project brief?"
│       ├── [Resume] → restore state
│       └── [Start Fresh] → clear & reset
└── If no draft: initialize empty state

ON SUBMIT:
├── Clear localStorage draft
├── Navigate to /wizard/processing
└── Pass state via React context (not URL)
```

---

## 9. USER JOURNEYS

### Journey A: Direct Entry (Homepage CTA)

```
USER ACTION                           SYSTEM RESPONSE
──────────────────────────────────────────────────────────────

1. Clicks "Start Your Project"        Navigate to /wizard
   on homepage                         Initialize empty wizard state
                                       Step 1 active

2. Selects "AI Chatbot Systems"        Highlight card, show checkmark
                                       Auto-advance to Step 2 (400ms)
                                       Context panel: chatbot stats

3. Fills company details               Auto-save on blur
                                       Industry selection triggers
                                       conditional feature updates
                                       ✓ appears next to saved fields

4. Selects goals & pain points         Pain point limit (5) enforced
                                       Context panel: "Avg savings: 40%"
                                       Progress bar: 50%

5. Picks features from checklist       Pre-checked based on industry
                                       Integration pills auto-detected
                                       Volume slider snaps to ranges

6. Chooses timeline & budget           ★ RECOMMENDED badge on matching tier
                                       Cost preview in context panel
                                       "Good match for your scope" text

7. Enters contact info                 Real-time email validation
                                       Summary card populates
                                       "Generate My Proposal" enabled

8. Clicks "Generate My Proposal"       Navigate to /wizard/processing
                                       Dark screen, agent animation
                                       5 thinking states cycle (15s)

9. Processing completes                Auto-redirect to /wizard/proposal
                                       Proposal loads with all data
                                       PDF download available

10. Reviews proposal                   Scrolls through scope, timeline
                                       Sees $14,500 estimate
                                       Two CTAs: Accept / Book Call

11a. Clicks "Accept & Pay Deposit"     → Stripe checkout ($4,350)
11b. Clicks "Book a Call"              → /booking (pre-filled)
```

### Journey B: Pre-Filled Entry (Service Page CTA)

```
USER ACTION                           SYSTEM RESPONSE
──────────────────────────────────────────────────────────────

1. On /services/chatbot page           Reads about chatbot capabilities
   Clicks "Design My Chatbot System"   URL: /wizard?s=chatbot

2. Arrives at /wizard                  Step 1 pre-selected: "AI Chatbot"
                                       Skip directly to Step 2
                                       Context panel: chatbot-specific

3. Continues from Step 2...            Same flow, but Step 3-4 pre-tuned
                                       for chatbot-specific options
```

### Journey C: Returning Visitor (Draft Resume)

```
USER ACTION                           SYSTEM RESPONSE
──────────────────────────────────────────────────────────────

1. Returns to /wizard after 2 days     Detect localStorage draft
                                       Toast: "Resume your brief?"

2. Clicks "Resume"                     Restore all 4 completed steps
                                       Jump to Step 5 (where they left off)
                                       All previous data intact

3. Completes remaining steps           Normal flow from Step 5
```

### Journey D: "Not Sure" Path

```
USER ACTION                           SYSTEM RESPONSE
──────────────────────────────────────────────────────────────

1. Selects "Not sure — help me"        Context panel: discovery questions
                                       Step 2 shows all industries
                                       Step 3 shows universal goals

2. Fills in business context           AI suggests best-fit service
                                       "Based on your needs, we recommend
                                       AI Chatbot Systems"
                                       [Accept suggestion] [Keep exploring]

3. Accepts suggestion                  Wizard reconfigures to chatbot
                                       Steps 3-5 update conditionally
                                       Normal flow continues
```

---

## 10. RESPONSIVE BEHAVIOR

### Desktop (1280px+) — Three-Panel

```
┌─────────┬──────────────────────┬────────────┐
│ Sidebar │   Main Content       │  Context   │
│ 240px   │   flex-1             │  320px     │
│ fixed   │   min-480px          │  fixed     │
│ #FFF    │   #F5F5F0            │  #FFF      │
│         │                      │            │
│ Step    │   Form fields        │  Why we    │
│ list    │   full layout        │  ask this  │
│         │                      │  + stats   │
│         │                      │  + links   │
└─────────┴──────────────────────┴────────────┘
```

### Tablet (768px–1279px) — Collapsed Sidebar

```
┌───┬───────────────────���─────────┐
│ ● │                             │
│ ● │    Main Content             │
│ ◉ │    full width               │
│ ○ │                             │  ← Context panel slides
│ ○ │    Form fields              │     in as drawer from right
│ ○ │                             │     triggered by "Why?" button
│   │                             │
│   │              [Why? ▸]       │
│   │                             │
└───┴─────────────────────────────┘
 48px    (icon-only stepper)
```

### Mobile (320px–767px) — Single Column

```
┌─────────────────────────────────┐
│  Step 3 of 6          ✓ Saved  │
│  ═══════════●══════  50%       │
├─────────────────────────────────┤
│                                 │
│  GOALS & PROBLEMS               │
│                                 │
│  What problem are               │
│  we solving?                    │
│                                 │
│  [Form fields stacked           │
│   single column]                │
│                                 │
│  ┌─────────────────────────┐    │
│  │  💡 Why we ask this     │    │
│  │  (expandable toggle)    │    │
│  └─────────────────────────┘    │
│                                 │
├─────────────────────────────────┤
│  ← Back          Continue →    │
└─────────────────────────────────┘
```

---

## 11. ANIMATION & TRANSITIONS

### Library: `motion/react` (NOT `framer-motion`)

```typescript
import { motion, AnimatePresence } from 'motion/react';
```

### Step Transitions

```typescript
// Step content enters from right, exits to left
const stepVariants = {
  enter:  { x: 40, opacity: 0 },
  center: { x: 0,  opacity: 1 },
  exit:   { x: -40, opacity: 0 },
};

// Reverse when going back
const stepVariantsBack = {
  enter:  { x: -40, opacity: 0 },
  center: { x: 0,   opacity: 1 },
  exit:   { x: 40,  opacity: 0 },
};

// Transition config
const transition = { duration: 0.2, ease: 'easeOut' };
```

### Auto-Save Indicator

```typescript
// Green checkmark fades in next to field label
const saveIndicator = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit:    { opacity: 0 },
  transition: { duration: 0.2 },
};
```

### Processing Screen Animations

```typescript
// Agent nodes pulse in sequence
const nodePulse = {
  animate: {
    scale: [1, 1.15, 1],
    opacity: [0.6, 1, 0.6],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Progress bar fills smoothly
const progressBar = {
  initial: { width: '0%' },
  animate: { width: `${progress}%` },
  transition: { duration: 0.8, ease: 'easeOut' },
};

// Thinking state text fades in/out
const thinkingText = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
  transition: { duration: 0.3 },
};
```

### Card Interactions (BCG Style)

```typescript
// Service card: white → charcoal on hover
const cardHover = {
  rest: {
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A',
    borderColor: '#E8E8E4',
  },
  hover: {
    backgroundColor: '#1A1A1A',
    color: '#F5F5F0',
    borderColor: '#1A1A1A',
    transition: { duration: 0.2 },
  },
};
```

---

## 12. ROUTE STRUCTURE

### Routes to Add in `/routes.tsx`

```typescript
// Add to routes.tsx imports:
import WizardPage from './components/wizard/WizardPage';
import ProcessingPage from './components/wizard/ProcessingPage';
import ProposalPage from './components/wizard/ProposalPage';

// Add to router children array:
{ path: 'wizard', Component: WizardPage },
{ path: 'wizard/processing', Component: ProcessingPage },
{ path: 'wizard/proposal', Component: ProposalPage },
```

### Route Protection

```
/wizard ─────────── Public (anyone can start)
/wizard/processing ─ Protected (requires wizard state, else redirect to /wizard)
/wizard/proposal ─── Protected (requires processing complete, else redirect to /wizard)
```

### Full Route Tree Update

```
www.amoai.ca
│
├── / ──────────────── Home (V3)
│
├── WIZARD (NEW)
│   ├── /wizard ──────────────── Project Brief Wizard     [WizardPage]
│   ├── /wizard/processing ───── AI Analysis Screen       [ProcessingPage]
│   └── /wizard/proposal ─────── Proposal & Pricing       [ProposalPage]
│
├── SERVICES
│   ├── /services ─────────────── Services Overview
│   ├── /services/chatbot ─────── Chatbot Service Page
│   ├── /services/ai-agents ───── AI Agents Service Page
│   ... (existing routes)
│
... (rest unchanged)
```

---

## 13. CONTENT COPY

### Step Eyebrows & Titles

```
Step 1:  PROJECT TYPE        "What are you building?"
Step 2:  BUSINESS CONTEXT    "Tell us about your business"
Step 3:  GOALS & PROBLEMS    "What problem are we solving?"
Step 4:  SCOPE & FEATURES    "What does the solution need?"
Step 5:  TIMELINE & BUDGET   "When and how much?"
Step 6:  CONTACT & REVIEW    "Let's get you a proposal"
```

### Context Panel Copy (per step)

```
Step 1:
  Heading: "Choose your starting point"
  Body: "Don't worry about getting it perfect — we'll refine
         the scope together during discovery."
  Stat: "93% of clients know their service type by this point."

Step 2:
  Heading: "Why context matters"
  Body: "Understanding your business helps us recommend the right
         architecture, integrations, and scale."
  Link: → "See how we work with E-Commerce brands"

Step 3:
  Heading: "Goals shape the solution"
  Body: "Clear goals let us design success metrics into the system
         from day one — not as an afterthought."
  Stat: "Avg. client sees 40% improvement in their primary metric."

Step 4:
  Heading: "Scope drives accuracy"
  Body: "The more specific you are, the more accurate our estimate.
         We pre-select features based on your service + industry."
  Link: → "View our delivery process"

Step 5:
  Heading: "Transparent pricing"
  Body: "Our estimates include everything: design, development,
         testing, deployment, training, and 30-day support."
  Stat: "★ Recommended tier matches 78% of similar projects."

Step 6:
  Heading: "Almost there"
  Body: "We'll generate a detailed proposal in about 15 seconds.
         No sales calls required — unless you want one."
  Trust: "Your data is never shared. We don't spam."
```

### Processing Screen Copy

```
Title: "Analyzing your project"
Subtitle: "Our AI is reviewing 847 past projects to find the
           best approach for your scope."

States:
  1. "Understanding requirements"
     "Parsing your goals and constraints"

  2. "Matching solution architecture"
     "Comparing with similar projects in your industry"

  3. "Calculating timeline & costs"
     "Factoring scope, integrations, and complexity"

  4. "Generating proposal"
     "Building your custom project plan"

  5. "Finalizing recommendations"
     "Adding optimization suggestions"
```

### Proposal Page Copy

```
Header: "Project Proposal"
Subtitle: "[Service] for [Company Name]"
Date: "Prepared [date]"

Sections:
  - "Scope Breakdown" — phased deliverables
  - "Timeline" — visual Gantt
  - "What's Included" — checklist
  - "Next Steps" — CTAs

Primary CTA: "Accept Proposal & Pay Deposit ([30%])"
Secondary CTA: "Have questions? Book a 30-min call instead"
Footer: "This proposal is valid for 14 days."
```

---

## 14. ACCESSIBILITY

### WCAG 2.1 AA Requirements

```
FOCUS MANAGEMENT
├── Focus moves to step title on step change
├── Skip-to-content link at top of wizard
├── Focus ring: 2px solid #00875A (visible on all inputs)
├── Tab order: logical within each step
└── Escape key: goes back one step

SCREEN READER
├── aria-live="polite" on step change announcements
├── aria-current="step" on active sidebar item
├── aria-describedby for field hints and errors
├── role="progressbar" on progress indicator
├── Processing states announced via aria-live
└── Proposal sections have proper heading hierarchy

FORM INPUTS
├── All inputs: visible labels (never placeholder-only)
├── Error messages: aria-describedby linked to input
├── Required fields: aria-required="true"
├── Checkbox groups: fieldset + legend
├── Radio groups: fieldset + legend
└── Slider: aria-valuemin, aria-valuemax, aria-valuenow

COLOR CONTRAST
├── Primary text (#1A1A1A on #F5F5F0): 13.6:1 ✓
├── Secondary text (#6B6B63 on #F5F5F0): 5.2:1 ✓
├── Green accent (#00875A on #FFFFFF): 4.6:1 ✓
├── Error text (#DC2626 on #FFFFFF): 4.5:1 ✓
├── On dark (#F5F5F0 on #1A1A1A): 13.6:1 ✓
└── Muted on dark (rgba 0.55 on #1A1A1A): 7.1:1 ✓

KEYBOARD
├── All interactions keyboard-accessible
├── Drag-and-drop priority ranker: arrow keys to reorder
├── Service cards: Space/Enter to select
├── Tech stack tags: Space to toggle
└── Volume slider: arrow keys to adjust
```

---

## 15. IMPLEMENTATION PHASES

### Phase 1 — Shell & Navigation (2 hours)

```
FILES TO CREATE:
├── /components/wizard/WizardPage.tsx ........... C29
├── /components/wizard/WizardLayout.tsx ......... C29a
├── /components/wizard/WizardHeader.tsx ......... C29b
├── /components/wizard/WizardFooter.tsx ......... C29c
├── /components/wizard/StepSidebar.tsx .......... C29d
├── /components/wizard/ContextPanel.tsx ......... C29e
├── /components/wizard/ProgressBar.tsx .......... C29f
└── /components/wizard/WizardContext.tsx ........ State provider

FILES TO EDIT:
├── /routes.tsx ................................. Add 3 routes
└── /components/Footer.tsx ...................... Add wizard link

DELIVERABLE:
  Three-panel layout with step navigation,
  placeholder content per step, responsive behavior,
  and state management shell.
```

### Phase 2 — Step Screens 1-3 (2 hours)

```
FILES TO CREATE:
├── /components/wizard/steps/StepProjectType.tsx ... C30
├── /components/wizard/steps/StepBusinessContext.tsx  C31
├── /components/wizard/steps/StepGoals.tsx ......... C32
├── /components/wizard/ui/ServiceCard.tsx ........... C39a
└── /components/wizard/ui/TechStackTag.tsx .......... C39e

DELIVERABLE:
  Steps 1-3 fully functional with conditional logic,
  validation, auto-save, and BCG card interactions.
```

### Phase 3 — Step Screens 4-6 (2 hours)

```
FILES TO CREATE:
├── /components/wizard/steps/StepScope.tsx .......... C33
├── /components/wizard/steps/StepTimeline.tsx ....... C34
├── /components/wizard/steps/StepContact.tsx ........ C35
├── /components/wizard/steps/StepReview.tsx ......... C36
├── /components/wizard/ui/FeatureCheckbox.tsx ....... C39b
├── /components/wizard/ui/BudgetTierCard.tsx ........ C39c
├── /components/wizard/ui/TimelineOption.tsx ........ C39d
├── /components/wizard/ui/PriorityRanker.tsx ........ C39f
├── /components/wizard/ui/VolumeSlider.tsx .......... C39g
└── /components/wizard/ui/SummaryCard.tsx ........... C39h

DELIVERABLE:
  All 6 steps complete with drag-and-drop priorities,
  volume slider, budget tiers with ★ recommended,
  contact form, and summary review.
```

### Phase 4 — Processing & Proposal (2 hours)

```
FILES TO CREATE:
├── /components/wizard/ProcessingPage.tsx ........... C37
├── /components/wizard/ThinkingStates.tsx ........... C37a
├── /components/wizard/AgentDiagram.tsx ............. C37b
├── /components/wizard/ProposalPage.tsx ............. C38
├── /components/wizard/ProposalScopeBreakdown.tsx ... C38a
├── /components/wizard/ProposalTimeline.tsx ......... C38b
├── /components/wizard/ProposalPricing.tsx .......... C38c
└── /components/wizard/ui/MetricBadge.tsx ........... C39i

DELIVERABLE:
  Processing screen with animated agent diagram,
  5 thinking states, progress bar, auto-redirect.
  Proposal page with scope, timeline Gantt, pricing,
  and Accept / Book CTAs.
```

### Phase 5 — Polish & Integration (1 hour)

```
TASKS:
├── Connect all service page CTAs → /wizard?s=xxx
├── Update Header "Start Project" → /wizard
├── Add /wizard link to Footer resources column
├── Test all responsive breakpoints
├── Test keyboard navigation & screen reader
├── Verify auto-save / resume flow
├── Add toast notifications (sonner@2.0.3)
└── Final BCG design audit (borders, radius, colors)
```

---

## APPENDIX A: FILE TREE (COMPLETE)

```
/components/wizard/
├── WizardPage.tsx ................ C29   Main entry, router component
├── WizardLayout.tsx .............. C29a  Three-panel layout shell
├── WizardHeader.tsx .............. C29b  Logo + step title + save status
├── WizardFooter.tsx .............. C29c  Back/Continue + step indicator
├── StepSidebar.tsx ............... C29d  Vertical step navigator
├── ContextPanel.tsx .............. C29e  Right panel: context + stats
├── ProgressBar.tsx ............... C29f  Top progress indicator
├── WizardContext.tsx ............. ---   React context + reducer
├── wizardConfig.ts ............... ---   SERVICE_CONFIG, INDUSTRY_CONFIG
├── wizardValidation.ts ........... ---   Per-step validation rules
│
├── steps/
│   ├── StepProjectType.tsx ....... C30   Service selection cards
│   ├── StepBusinessContext.tsx .... C31   Company info form
│   ├── StepGoals.tsx ............. C32   Goals, pain points, outcome
│   ├── StepScope.tsx ............. C33   Features, integrations, volume
│   ├── StepTimeline.tsx .......... C34   Timeline, budget, decision
│   ├── StepContact.tsx ........... C35   Name, email, phone
│   └── StepReview.tsx ............ C36   Summary + submit
│
├── ProcessingPage.tsx ............ C37   AI analysis animation
├── ThinkingStates.tsx ............ C37a  State list with progress
├── AgentDiagram.tsx .............. C37b  Radial agent visualization
│
├── ProposalPage.tsx .............. C38   Full proposal document
├── ProposalScopeBreakdown.tsx .... C38a  Phased deliverables
├── ProposalTimeline.tsx .......... C38b  Gantt chart
├── ProposalPricing.tsx ........... C38c  Cost summary + CTA
│
└── ui/
    ├── ServiceCard.tsx ........... C39a  Selectable service option
    ├── FeatureCheckbox.tsx ........ C39b  Checkbox with description
    ├── BudgetTierCard.tsx ........ C39c  Radio card with ★ badge
    ├── TimelineOption.tsx ........ C39d  Radio card with modifier
    ├── TechStackTag.tsx .......... C39e  Toggleable tech pill
    ├── PriorityRanker.tsx ........ C39f  Drag-to-reorder list
    ├── VolumeSlider.tsx .......... C39g  Range slider with labels
    ├── SummaryCard.tsx ........... C39h  Read-only review card
    └── MetricBadge.tsx ........... C39i  Large number + label
```

---

## APPENDIX B: DEPENDENCIES

```
REQUIRED PACKAGES (already in project):
├── react-router .................. routing
├── motion/react .................. animations (NOT framer-motion)
├── lucide-react .................. icons
├── sonner@2.0.3 .................. toast notifications
├── react-hook-form@7.55.0 ........ form management
└── react-dnd ..................... drag-and-drop (priority ranker)

OPTIONAL (if Supabase connected):
├── @supabase/supabase-js ......... database persistence
└── stripe ........................ payment integration
```

---

## APPENDIX C: CROSS-REFERENCES

```
RELATED DOCS:
├── /docs/sitemap.md .................... Full sitemap with wizard routes
├── /imports/design-system-overview.md ... Wizard design tokens
├── /imports/bcg-style-guide.md ......... BCG consulting style reference
├── /imports/bcg-style-guide-1.md ....... BCG style guide (extended)
├── /imports/amo-ai-service-page.md ..... Superside service page layout

RELATED COMPONENTS:
├── /components/services/ChatbotServicePage.tsx .... Chatbot page (links to wizard)
├── /components/HomePageV3.tsx .................... Homepage (CTA → wizard)
├── /components/Header.tsx ........................ Nav "Start Project" → wizard
├── /components/Footer.tsx ........................ Footer wizard link
├── /components/BookingPage.tsx ................... Fallback CTA from proposal
└── /components/process/v12/ProcessPageV12.tsx .... Process page (CTA → wizard)
```

---

*End of document. Component numbering: C29–C39i.*
*Total new files: 27 (.tsx) + 2 (.ts config/validation)*
*Estimated implementation: ~9 hours across 5 phases.*
