# 05 — LAUNCH PROJECT & DASHBOARD ENTRY
# Wizard Step 5 of 5

**Component:** `C34-StepLaunchProject`
**File:** `/components/wizard/steps/StepLaunchProject.tsx`
**Route:** `/wizard` (step 5)
**Status:** PLANNED
**Parent Doc:** `00-wizard.md`

---

## SCREEN PURPOSE

The celebration screen. This is NOT a form — it's a confirmation and transition
moment where the wizard results become a live project with a dashboard. The
three-panel layout breaks here. A focused, centered single-column layout
marks the shift from "wizard world" to "dashboard world."

This is the handshake moment — the wizard has done its job, now it's time to work.

> "Your project is ready. Everything from your discovery session has been
>  turned into an actionable project."

---

## LAYOUT CHANGE

```
IMPORTANT: This screen BREAKS from the three-panel wizard layout.
─────────────────────────────────────────────────────────────────

Steps 1-4:  Three-panel layout (sidebar + center + right panel)
Step 5:     Focused, centered single-column layout
            Full-width background
            Max-width: 1440px (outer), 800px (project card)

WHY: The three-panel served its purpose. Now we're transitioning
to the dashboard world. The visual shift signals a new chapter.

BACKGROUND: #F1EEEA (warm beige) — or optional fine linen texture at 2% opacity
```

---

## ASCII WIREFRAME — Desktop (1440px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                          #F1EEEA bg     │
│  ☀ AMO AI                                                        │
│                                                                          │
│  ─── COMPLETION HEADER ─────────────────────────────────────────────── │
│                                                                          │
│           ✓ ──── ✓ ──── ✓ ──── ✓ ──── ✓                               │
│           1      2      3      4      5                                  │
│           Biz.   Diag.  Recs.  Brief  Launch                            │
│           (all green checkmarks — all steps complete)                    │
│                                                                          │
│                                                                          │
│                    Your project is ready                                 │
│                    ← 40px Playfair Display, dark teal, centered          │
│                                                                          │
│                    Everything from your discovery session                │
│                    has been turned into an actionable project.           │
│                    ← 18px Lora, medium gray, centered                    │
│                                                                          │
│                              ════                                        │
│                    ← 80px lime green rule, centered                      │
│                                                                          │
│                                                                          │
│  ─── PROJECT SUMMARY CARD (max-width 800px, centered) ────────────── │
│                                                                          │
│     ┌────────────────────────────────────────────────────────────┐       │
│     │ ← 4px lime green left border                              │       │
│     │                                                            │       │
│     │  PROJECT ← 12px uppercase, lime green                     │       │
│     │                                                            │       │
│     │  Acme Retail Group —                    ┌────────────┐    │       │
│     │  AI Transformation                      │  ● Active  │    │       │
│     │  ← 24px Playfair Display                └────────────┘    │       │
│     │                                                            │       │
│     │  ┌────────────────────┬────────────────────────┐          │       │
│     │  │                    │                        │          │       │
│     │  │  Client            │  Industry              │          │       │
│     │  │  Acme Retail Group │  E-commerce / Retail   │          │       │
│     │  │                    │                        │          │       │
│     │  ├────────────────────┼────────────────────────┤          │       │
│     │  │                    │                        │          │       │
│     │  │  Phase             │  Timeline              │          │       │
│     │  │  Phase 1 —        │  12 weeks               │          │       │
│     │  │  Foundation        │                        │          │       │
│     │  │                    │                        │          │       │
│     │  ├────────────────────┼────────────────────────┤          │       │
│     │  │                    │                        │          │       │
│     │  │  Systems           │  Tasks                 │          │       │
│     │  │  3 selected        │  12 initial tasks      │          │       │
│     │  │  🎧 📦 ✨          │  generated             │          │       │
│     │  │                    │                        │          │       │
│     │  ├────────────────────┼────────────────────────┤          │       │
│     │  │                    │                        │          │       │
│     │  │  Brief             │  Dashboard             │          │       │
│     │  │  ✓ Approved        │  ✓ Ready               │          │       │
│     │  │                    │                        │          │       │
│     │  └────────────────────┴────────────────────────┘          │       │
│     │                                                            │       │
│     │  ──────────────────────────────────────────────────────   │       │
│     │                                                            │       │
│     │  ROADMAP PREVIEW                                           │       │
│     │                                                            │       │
│     │  ┌────────────┐──→──┌────────────┐──→──┌────────────┐    │       │
│     │  │            │     │            │     │            │    │       │
│     │  │  PHASE 1   │     │  PHASE 2   │     │  PHASE 3   │    │       │
│     │  │ Foundation │     │ Implement. │     │ Optimize   │    │       │
│     │  │            │     │            │     │            │    │       │
│     │  │ Wk 1-4     │     │ Wk 5-8     │     │ Wk 9-12    │    │       │
│     │  │            │     │            │     │            │    │       │
│     │  │ ◉ Current  │     │            │     │            │    │       │
│     │  │  (glow)    │     │            │     │            │    │       │
│     │  └────────────┘     └────────────┘     └────────────┘    │       │
│     │                                                            │       │
│     │  ──────────────────────────────────────────────────────   │       │
│     │                                                            │       │
│     │  WHAT'S BEEN CREATED                                       │       │
│     │                                                            │       │
│     │  ✓  Project created with all wizard data        (fade 1)  │       │
│     │  ✓  Roadmap with 3 phases set                   (fade 2)  │       │
│     │  ✓  12 initial tasks generated                  (fade 3)  │       │
│     │  ✓  Strategy brief attached                     (fade 4)  │       │
│     │  ✓  Dashboard ready for you                     (fade 5)  │       │
│     │     ← staggered fade-in, 100ms delay each                 │       │
│     │                                                            │       │
│     └────────────────────────────────────────────────────────────┘       │
│                                                                          │
│                                                                          │
│  ─── CALL TO ACTION (centered) ────────────────────────────────────── │
│                                                                          │
│                 ┌──────────────────────────────────┐                     │
│                 │                                  │                     │
│                 │    Enter Your Dashboard →        │                     │
│                 │                                  │                     │
│                 │    min-width: 280px               │                     │
│                 │    height: 52px                   │                     │
│                 │    #0A211F bg, #FFF text          │                     │
│                 │    hover: #84CC16 bg, #0A211F txt │                     │
│                 │    hover: subtle shadow           │                     │
│                 └──────────────────────────────────┘                     │
│                                                                          │
│                 You can return to this wizard anytime                    │
│                 from your dashboard settings.                            │
│                 ← 14px Lora, medium gray                                 │
│                                                                          │
│                                                                          │
│  ─── DASHBOARD PREVIEW (max-width 1000px, centered) ────────────────  │
│                                                                          │
│           What you'll find in your dashboard                            │
│           ← 20px Playfair Display, centered                              │
│                                                                          │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │              │ │              │ │              │ │              │   │
│  │   📊         │ │   ☑          │ │   📄         │ │   📁         │   │
│  │  (40px, grn) │ │  (40px, grn) │ │  (40px, grn) │ │  (40px, grn) │   │
│  │              │ │              │ │              │ │              │   │
│  │  Roadmap     │ │  Tasks       │ │  Strategy    │ │  Documents   │   │
│  │              │ │              │ │  Brief       │ │              │   │
│  │  Track       │ │  Manage your │ │  Reference   │ │  Upload and  │   │
│  │  phases,     │ │  action items│ │  your brief  │ │  manage all  │   │
│  │  milestones, │ │  by phase    │ │  anytime     │ │  project     │   │
│  │  and deliver.│ │  and priority│ │              │ │  files       │   │
│  │              │ │              │ │              │ │              │   │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘   │
│  ← white bg, 12px radius, hover: translateY(-2px) transition           │
│                                                                          │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Mobile (375px)

```
┌─────────────────────────────┐
│                  #F1EEEA bg │
│  ☀ AMO AI            │
│                             │
│  ✓ ─ ✓ ─ ✓ ─ ✓ ─ ✓         │
│  (all 5 steps complete)     │
│                             │
│  Your project               │
│  is ready                   │
│                             │
│  Everything from your       │
│  discovery session has      │
│  been turned into an        │
│  actionable project.        │
│                             │
│        ════                 │
│                             │
│ ┌───────────────────────┐   │
│ │ 4px green left border │   │
│ │                       │   │
│ │ PROJECT               │   │
│ │ Acme Retail Group —   │   │
│ │ AI Transformation     │   │
│ │              ● Active  │   │
│ │                       │   │
│ │ Client                │   │
│ │ Acme Retail Group     │   │
│ │ ─────────────────     │   │
│ │ Industry              │   │
│ │ E-commerce / Retail   │   │
│ │ ─────────────────     │   │
│ │ Phase                 │   │
│ │ Phase 1 — Foundation  │   │
│ │ ─────────────────     │   │
│ │ Timeline: 12 weeks    │   │
│ │ ─────────────────     │   │
│ │ Systems: 3 selected   │   │
│ │ Tasks: 12 generated   │   │
│ │ Brief: ✓ Approved     │   │
│ │ Dashboard: ✓ Ready    │   │
│ │                       │   │
│ │ ─────────────────     │   │
│ │                       │   │
│ │ ROADMAP               │   │
│ │                       │   │
│ │ ◉ Phase 1: Foundation │   │
│ │ │  Wk 1-4  (Current)  │   │
│ │ │                     │   │
│ │ ○ Phase 2: Implement. │   │
│ │ │  Wk 5-8             │   │
│ │ │                     │   │
│ │ ○ Phase 3: Optimize   │   │
│ │    Wk 9-12            │   │
│ │                       │   │
│ │ ─────────────────     │   │
│ │                       │   │
│ │ WHAT'S BEEN CREATED   │   │
│ │                       │   │
│ │ ✓ Project created     │   │
│ │ ✓ Roadmap set         │   │
│ │ ✓ 12 tasks generated  │   │
│ │ ✓ Brief attached      │   │
│ │ ✓ Dashboard ready     │   │
│ │                       │   │
│ └───────────────────────┘   │
│                             │
│ ┌───────────────────────┐   │
│ │                       │   │
│ │  Enter Your Dashboard │   │
│ │         →             │   │
│ │                       │   │
│ └───────────────────────┘   │
│                             │
│ Return to wizard anytime    │
│ from dashboard settings.    │
│                             │
│ DASHBOARD PREVIEW           │
│                             │
│ ┌──────────┐ ┌──────────┐  │
│ │ 📊       │ │ ☑        │  │
│ │ Roadmap  │ │ Tasks    │  │
│ │ Track... │ │ Manage...│  │
│ └──────────┘ └──────────┘  │
│ ┌──────────┐ ┌──────────┐  │
│ │ 📄       │ │ 📁       │  │
│ │ Brief    │ │ Documents│  │
│ │ Refer... │ │ Upload...│  │
│ └──────────┘ └──────────┘  │
│                             │
└─────────────────────────────┘
```

---

## CONTENT DATA

### Completion Header

| Element | Value | Style |
|---------|-------|-------|
| Step indicator | All 5 steps with green checkmarks | Horizontal, connected by lines |
| Heading | "Your project is ready" | 40px Playfair Display, #0A211F, centered |
| Subtitle | "Everything from your discovery session has been turned into an actionable project." | 18px Lora, #9CA3AF, centered |
| Rule | 80px wide, 2px tall | #84CC16, centered |

### Project Summary Fields

| Field | Source | Value (Example) |
|-------|--------|-----------------|
| Project name | Auto-generated | "{client_name} — AI Transformation" |
| Status badge | Always "Active" | Lime green pill |
| Client | Step 1: companyName | "Acme Retail Group" |
| Industry | Step 1: industry | "E-commerce / Retail" |
| Phase | Always Phase 1 | "Phase 1 — Foundation" |
| Timeline | Sum of roadmap phases | "12 weeks" |
| Systems | Step 3: selection count + icons | "3 selected" |
| Tasks | AI-generated count | "12 initial tasks generated" |
| Brief | Step 4: status | "Approved ✓" |
| Dashboard | Always "Ready" | "Ready ✓" |

### Roadmap Phases

| Phase | Title | Timeline | Status | Style |
|-------|-------|----------|--------|-------|
| Phase 1 | Foundation | Weeks 1-4 | Current | Lime green border + "Current" badge + subtle glow |
| Phase 2 | Implementation | Weeks 5-8 | Upcoming | Default border, muted |
| Phase 3 | Optimization | Weeks 9-12 | Upcoming | Default border, muted |

Visual: 3 horizontal cards connected by thin arrow lines.
Mobile: vertical stack with connecting vertical line.

### Creation Checklist (Staggered Animation)

| # | Item | Icon | Delay |
|---|------|------|-------|
| 1 | Project created with all wizard data | `CheckCircle2` | 0ms |
| 2 | Roadmap with 3 phases set | `CheckCircle2` | 100ms |
| 3 | 12 initial tasks generated | `CheckCircle2` | 200ms |
| 4 | Strategy brief attached | `CheckCircle2` | 300ms |
| 5 | Dashboard ready for you | `CheckCircle2` | 400ms |

```typescript
// Staggered fade-in animation
const checklistItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,   // 100ms stagger
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
};
```

### Dashboard Preview Cards

| # | Icon (lucide) | Title | Description |
|---|---------------|-------|-------------|
| 1 | `BarChart3` | Roadmap | Track phases, milestones, and deliverables |
| 2 | `CheckSquare` | Tasks | Manage your action items by phase and priority |
| 3 | `FileText` | Strategy Brief | Reference your approved brief anytime |
| 4 | `FolderOpen` | Documents | Upload and manage all project files |

```
Card style:
├── Background: #FFFFFF
├── Border-radius: 12px
├── Padding: 24px
├── Icon: 40px, #84CC16 (lime green)
├── Title: 16px Inter, 600 weight, #0A211F
├── Description: 14px Lora, #9CA3AF
├── Hover: translateY(-2px), transition 200ms
└── No shadows at rest, subtle shadow on hover only
```

---

## CTA BUTTON STATES

### Primary — "Enter Your Dashboard"

```
DEFAULT:
┌──────────────────────────────────┐
│    Enter Your Dashboard →        │   #0A211F bg
│                                  │   #FFFFFF text
│    min-width: 280px, h: 52px     │   8px radius
└──────────────────────────────────┘

HOVER:
┌──────────────────────────────────┐
│    Enter Your Dashboard →        │   #84CC16 bg
│                                  │   #0A211F text
│                                  │   shadow: 0 4px 12px
└──────────────────────────────────┘   rgba(10,33,31,0.12)

ACTIVE (pressed):
┌──────────────────────────────────┐
│    Enter Your Dashboard →        │   #65A30D bg
│                                  │   #0A211F text
└──────────────────────────────────┘   translateY(1px)

Note: This is the ONLY place a shadow is used on this screen.
The hover state should make the button feel like a "portal" opening.
```

---

## ANIMATIONS — motion/react

### Page Entry

```typescript
// Completion header fades in
const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};
```

### Step Indicator (all complete)

```typescript
// Each step checkmark pops in sequence
const stepCheckVariants = {
  hidden: { scale: 0 },
  visible: (i: number) => ({
    scale: 1,
    transition: {
      delay: 0.1 + i * 0.08,
      type: 'spring',
      stiffness: 400,
      damping: 15,
    },
  }),
};
```

### Project Summary Card

```typescript
// Card slides up
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.3, duration: 0.5, ease: 'easeOut' },
  },
};
```

### Creation Checklist (staggered)

```typescript
// Each check item fades in from left
const checklistVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.8 + i * 0.1,  // starts after card appears
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
};

// Green checkmark icon scales in
const checkIconVariants = {
  hidden: { scale: 0 },
  visible: (i: number) => ({
    scale: 1,
    transition: {
      delay: 0.8 + i * 0.1,
      type: 'spring',
      stiffness: 400,
      damping: 12,
    },
  }),
};
```

### Phase 1 Glow

```typescript
// Subtle pulse on Phase 1 card border
const phase1Glow = {
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(132, 204, 22, 0)',
      '0 0 12px 2px rgba(132, 204, 22, 0.15)',
      '0 0 0 0 rgba(132, 204, 22, 0)',
    ],
  },
  transition: {
    duration: 2.5,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};
```

### Dashboard Preview Cards

```typescript
// Cards hover up
const previewCardHover = {
  rest: { y: 0, shadow: 'none' },
  hover: {
    y: -2,
    shadow: '0 2px 8px rgba(10,33,31,0.06)',
    transition: { duration: 0.2 },
  },
};
```

---

## UI COMPONENTS

```
COMPONENT TREE
│
├── StepLaunchProject.tsx (C34)
│   │
│   ├── CompletionHeader .................. full-width top section
│   │   ├── HorizontalStepIndicator ...... 5 steps, all ✓, connected lines
│   │   ├── Heading ....................... "Your project is ready"
│   │   ├── Subtitle ...................... description paragraph
│   │   └── GreenRule ..................... 80px lime green rule
│   │
│   ├── ProjectSummaryCard ................ centered 800px white card
│   │   ├── ProjectHeader ................ name + status badge
│   │   ├── DetailsGrid .................. 2×4 key-value table
│   │   ├── RoadmapPreview ............... 3 phase cards + arrows
│   │   │   └── PhaseCard (×3) ........... title, timeline, status
│   │   └── CreationChecklist ............ 5 staggered check items
│   │       └── ChecklistItem (×5) ....... icon + text, animated
│   │
│   ├── CTASection ........................ centered button + subtext
│   │   └── DashboardButton .............. primary CTA (52px height)
│   │
│   └── DashboardPreview ................. 4-card horizontal grid
│       └── PreviewCard (×4) ............. icon + title + description
│
└── (No sidebar or right panel on this screen)
```

---

## WORKFLOW

```
ENTRY
│
├── User arrives at Step 5
│   ├── Verify brief is approved (from Step 4)
│   │   ├── Approved → proceed
│   │   └── Not approved → redirect to Step 4 with message
│   │
│   ├── Trigger project creation (if not already created):
│   │
│   │   1. CREATE PROJECT
│   │      ├── Name: "{company_name} — AI Transformation"
│   │      ├── Status: "Active"
│   │      ├── Current phase: "Phase 1 — Foundation"
│   │      ├── Progress: 0%
│   │      └── Dashboard activated: now
│   │
│   │   2. CREATE ROADMAP
│   │      ├── Phase 1: Foundation (Weeks 1-4, order: 1)
│   │      ├── Phase 2: Implementation (Weeks 5-8, order: 2)
│   │      └── Phase 3: Optimization (Weeks 9-12, order: 3)
│   │
│   │   3. GENERATE INITIAL TASKS (via Gemini 3)
│   │      ├── 3-5 tasks per phase (contextual to selected systems)
│   │      ├── Mix of owners: "Client", "AMO AI", "Automated"
│   │      ├── All status: "todo"
│   │      ├── AI-generated with suggestion field
│   │      └── ~12 total tasks
│   │
│   │   4. LINK SELECTED SYSTEMS
│   │      └── For each selected system → status: "planned"
│   │
│   │   5. ATTACH BRIEF
│   │      └── Link approved brief to project
│   │
│   │   6. MARK WIZARD COMPLETE
│   │      └── wizard_completed_at: now
│   │
│   ├── IDEMPOTENT: If user refreshes, don't create duplicates
│   │   └── Check if project exists for this wizard session first
│   │
│   ├── Display confirmation with project data
│   └── Animate: step checks → card → checklist → CTA

INTERACTION
│
├── User views project summary
│   ├── Everything is read-only (no editing on this screen)
│   ├── Checklist items appear one-by-one (staggered animation)
│   ├── Phase 1 card has subtle glow to indicate starting point
│   └── "Active" status badge signals the project is live
│
├── User scrolls to dashboard preview
│   ├── 4 preview cards describe what's available
│   └── Hover effect (translateY -2px) invites clicking

EXIT
│
├── User clicks "Enter Your Dashboard"
│   ├── Navigate to /dashboard/{project_id}
│   ├── First visit: show subtle onboarding tooltips
│   └── Track: wizard_completed + dashboard_entered events
│
├── User navigates away
│   └── Can return anytime — project is already created
│       └── /wizard/step-5 re-renders with existing project data
```

---

## AGENT BEHAVIOR — GEMINI 3 INTEGRATION

```
AI GENERATES INITIAL TASKS (background)
════════════════════════════════════════

TRIGGER: On Step 5 entry, during project creation
MODEL:   Gemini 3

PROMPT:
────────
System: You are a project manager at AMO AI. Given a client's
        approved strategy brief and selected AI systems, generate
        initial tasks for Phase 1 of the project. Tasks should be
        specific, actionable, and assigned to the appropriate party.

Input: {
  company: "Acme Retail Group",
  industry: "e-commerce",
  systems: ["support-engine", "cart-recovery", "recommendation-engine"],
  roadmap: { phase1: "Foundation", phase2: "Implementation", phase3: "Optimization" },
  brief: { ... approved brief content }
}

Output: {
  tasks: [
    // Phase 1: Foundation (5 tasks)
    {
      title: "Complete technical requirements document",
      description: "Define API specs, data flows, and integration points for all 3 systems",
      phase: 1,
      owner: "AMO AI",
      priority: "high",
      estimated_hours: 8
    },
    {
      title: "Provide Shopify API credentials and access",
      description: "Grant AMO AI team access to your Shopify admin and API",
      phase: 1,
      owner: "Client",
      priority: "high",
      estimated_hours: 1
    },
    {
      title: "Export current FAQ data and support ticket samples",
      description: "Provide 50-100 sample support tickets for NLP training",
      phase: 1,
      owner: "Client",
      priority: "medium",
      estimated_hours: 2
    },
    {
      title: "Design chatbot conversation flows",
      description: "Map out primary conversation paths for top 10 support scenarios",
      phase: 1,
      owner: "AMO AI",
      priority: "high",
      estimated_hours: 12
    },
    {
      title: "Set up development environment and CI/CD pipeline",
      description: "Configure staging environment with Shopify test store",
      phase: 1,
      owner: "AMO AI",
      priority: "medium",
      estimated_hours: 4
    },
    // Phase 2: Implementation (4 tasks)
    {
      title: "Deploy AI support engine to staging",
      phase: 2,
      owner: "AMO AI",
      priority: "high",
      estimated_hours: 20
    },
    {
      title: "Build cart recovery trigger system",
      phase: 2,
      owner: "AMO AI",
      priority: "high",
      estimated_hours: 16
    },
    {
      title: "Review and approve chatbot responses",
      phase: 2,
      owner: "Client",
      priority: "medium",
      estimated_hours: 3
    },
    {
      title: "Conduct user acceptance testing (UAT)",
      phase: 2,
      owner: "Client",
      priority: "high",
      estimated_hours: 4
    },
    // Phase 3: Optimization (3 tasks)
    {
      title: "Analyze first 2 weeks of chatbot performance",
      phase: 3,
      owner: "AMO AI",
      priority: "medium",
      estimated_hours: 6
    },
    {
      title: "Tune recommendation engine based on click-through data",
      phase: 3,
      owner: "Automated",
      priority: "medium",
      estimated_hours: 0
    },
    {
      title: "Final handoff: documentation + team training",
      phase: 3,
      owner: "AMO AI",
      priority: "high",
      estimated_hours: 8
    }
  ]
}

EDGE CASES:
├── If Gemini 3 fails → use template task list (generic but complete)
├── If user refreshes → don't regenerate (idempotent check)
├── All tasks logged in ai_run_logs for transparency
└── Task count shown in UI after generation completes

NO INTERACTIVE AI ON THIS SCREEN
├── Screen is purely confirmational
├── All heavy processing happens in background
├── If Edge Function fails: show error state with "Retry" button
└── Never leave user stuck — always have a fallback path
```

---

## ERROR HANDLING

```
PROJECT CREATION FAILS:
┌─────────────────────────────────────────┐
│                                         │
│  ⚠ Something went wrong                │
│                                         │
│  We couldn't create your project.       │
│  Your data is safe — nothing was lost.  │
│                                         │
│  ┌────────────────────┐                 │
│  │    Try Again        │                 │
│  └────────────────────┘                 │
│                                         │
│  If this persists, contact us at        │
│  Contact via www.amoai.ca                  │
│                                         │
└─────────────────────────────────────────┘

RETRY LOGIC:
├── "Try Again" re-triggers project creation
├── Idempotent: checks if partially created
├── Resumes from where it failed
└── Max 3 retries before showing contact info
```

---

## ACCESSIBILITY

```
├── Completion header: aria-label="All 5 wizard steps completed"
├── Step indicators: each with aria-label="Step [n]: [name], completed"
├── Project summary card: role="article", aria-label="Project summary"
├── Details grid: presented as definition list (dl/dt/dd)
├── Roadmap phases: role="list", Phase 1 aria-current="true"
├── Creation checklist: role="list", items announced as they appear
├── Staggered animation: aria-live="polite" on container
├── CTA button: aria-label="Enter your project dashboard"
├── Dashboard preview: role="list", each card role="listitem"
├── Reduced motion: skip staggered animation, show all items immediately
├── Focus management: auto-focus CTA button after all animations complete
└── Screen reader: "Step 5 of 5: Launch Project — your project is ready, enter your dashboard"
```

---

## RESPONSIVE BREAKPOINTS

```
MOBILE (320-767px):
├── Single column, full-width
├── Project details: single column (stacked key-value)
├── Roadmap: vertical stack with connecting vertical line
├── Dashboard preview: 2×2 grid
├── Very small screens (<400px): preview cards 1-column
└── CTA button: full-width

TABLET (768-1279px):
├── Same layout, slightly tighter padding
├── Project card: max-width 720px
├── Roadmap: horizontal (fits 3 cards)
├── Dashboard preview: 2×2 grid
└── CTA button: centered, min-width 280px

DESKTOP (1280px+):
├── Full layout as wireframed
├── Project card: max-width 800px
├── Roadmap: horizontal 3 cards with arrows
├── Dashboard preview: 4-column row
└── CTA button: centered, min-width 280px
```

---

## IMPLEMENTATION NOTES

```
DEPENDENCIES:
├── motion/react .................. staggered animations, hover effects
├── lucide-react .................. system icons, check icons, preview icons
├── react-router .................. navigate to /dashboard
└── sonner@2.0.3 .................. error retry toasts

FILES:
├── /components/wizard/steps/StepLaunchProject.tsx .... C34
├── /components/wizard/ui/CompletionHeader.tsx
├── /components/wizard/ui/HorizontalStepIndicator.tsx
├── /components/wizard/ui/ProjectSummaryCard.tsx
├── /components/wizard/ui/DetailsGrid.tsx
├── /components/wizard/ui/RoadmapPreview.tsx
├── /components/wizard/ui/PhaseCard.tsx
├── /components/wizard/ui/CreationChecklist.tsx
├── /components/wizard/ui/DashboardButton.tsx
└── /components/wizard/ui/DashboardPreviewCards.tsx

KEY DECISIONS:
├── BREAKS from three-panel layout → single centered column
├── NOT a form — it's a celebration/confirmation screen
├── The visual shift signals "new chapter" (wizard → dashboard)
├── Staggered checklist creates "things being built for you" feeling
├── Phase 1 glow indicates starting point
├── CTA is the obvious focal point (no competing elements)
├── Dashboard preview reduces anxiety about what's next
├── "Enter Your Dashboard" not "Submit" (action-oriented)
├── Hover color flip on CTA (teal → lime green) feels like a portal
├── Project creation is idempotent (safe to refresh)
├── Error state always has retry + contact fallback
└── All motion is subtle, professional — never flashy
```
