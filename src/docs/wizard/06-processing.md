# 06 — AI PROCESSING
# Wizard Transition Screen

**Component:** `C35-ProcessingPage`
**File:** `/components/wizard/ProcessingPage.tsx`
**Route:** `/wizard/processing`
**Status:** PLANNED
**Parent Doc:** `00-wizard.md`

---

## SCREEN PURPOSE

The AI analysis experience. Not a loading screen — a transparent "thinking" display
that shows the user exactly what the AI system is doing with their data. Five named
agent stages cycle over ~15 seconds. An animated agent network diagram visualizes
the multi-agent architecture processing in parallel.

This screen builds trust through transparency and makes the wait feel productive.

> "Our AI is reviewing 847 past projects to find the best approach
>  for your scope."

---

## ASCII WIREFRAME — Desktop (1440px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                          #1A1A1A bg     │
│  ☀ AMO AI                                                        │
│                                                                          │
│                                                                          │
│                                                                          │
│                                                                          │
│                                                                          │
│                    ANALYZING YOUR PROJECT                                │
│                    ─────────────────────                                  │
│                                                                          │
│                    ┌──────────────────────────────┐                       │
│                    │                              │                       │
│                    │         ┌───────┐            │                       │
│                    │    ┌────│ ORCH. │────┐       │                       │
│                    │    │    └───┬───┘    │       │                       │
│                    │    │       │         │       │                       │
│                    │  ┌─┴──┐  ┌─┴──┐  ┌──┴─┐    │                       │
│                    │  │REQ.│  │SCOP│  │TIME│    │                       │
│                    │  │ANAL│  │EST.│  │PLAN│    │                       │
│                    │  └─┬──┘  └─┬──┘  └──┬─┘    │                       │
│                    │    │       │         │       │                       │
│                    │    │    ┌──┴──┐      │       │                       │
│                    │    └────│PRICE│──────┘       │                       │
│                    │         └──┬──┘              │                       │
│                    │            │                 │                       │
│                    │         ┌──┴──┐              │                       │
│                    │         │PROP.│              │                       │
│                    │         │WRITE│              │                       │
│                    │         └─────┘              │                       │
│                    │                              │                       │
│                    └──────────────────────────────┘                       │
│                                                                          │
│                                                                          │
│                    ✓  Understanding requirements                         │
│                    ✓  Matching solution architecture                     │
│                    ●  Calculating timeline & costs...                    │
│                    ○  Generating proposal                                │
│                    ○  Finalizing recommendations                         │
│                                                                          │
│                    ═════════════════════●══════  72%                     │
│                                                                          │
│                    "Our AI is reviewing 847 past projects                │
│                     to find the best approach for your scope."           │
│                                                                          │
│                                                                          │
│                    ┌────────────────────────────────┐                     │
│                    │  Acme Retail Group              │                    │
│                    │  E-commerce · 3 systems · $18K  │                    │
│                    └────────────────────────────────┘                     │
│                                                                          │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Agent Diagram — Detailed

```
STATIC LAYOUT (nodes always visible):

              ┌─────────────────┐
              │   ORCHESTRATOR   │  ← largest node, center
              │   Coordinates    │     pulsing green border
              └────────┬────────┘
                       │
          ┌────────────┼────────────┐
          │            │            │
   ┌──────┴─────┐ ┌───┴──────┐ ┌──┴──────────┐
   │ REQUIREMENTS│ │   SCOPE  │ │  TIMELINE    │
   │  ANALYST    │ │ ESTIMATOR│ │  PLANNER     │
   │             │ │          │ │              │
   │ Parsing     │ │ Comparing│ │ Scheduling   │
   │ goals &     │ │ with 847 │ │ phases &     │
   │ constraints │ │ projects │ │ milestones   │
   └──────┬─────┘ └───┬──────┘ └──┬──────────┘
          │            │            │
          └────────────┼────────────┘
                       │
              ┌────────┴────────┐
              │  PRICING ENGINE  │
              │  Factoring scope │
              │  & complexity    │
              └────────┬────────┘
                       │
              ┌────────┴────────┐
              │ PROPOSAL WRITER  │
              │ Building your    │
              │ custom plan      │
              └─────────────────┘

ANIMATION BEHAVIOR:
─────────────────────

Phase 1 (0-2.5s): REQUIREMENTS ANALYST glows
  → Node border pulses green
  → Connecting line from Orchestrator animates (dash flow)
  → Status: ● Understanding requirements
  → Other nodes: dim (opacity 0.3)

Phase 2 (2.5-5.5s): SCOPE ESTIMATOR glows
  → Req. Analyst gets ✓ checkmark
  → Scope node lights up
  → Status: ● Matching solution architecture
  → Lines between Req → Scope animate

Phase 3 (5.5-9s): TIMELINE PLANNER + PRICING ENGINE glow (parallel)
  → Both nodes light up simultaneously
  → Status: ● Calculating timeline & costs
  → Lines animate to both nodes

Phase 4 (9-12s): PROPOSAL WRITER glows
  → Timeline + Pricing get ✓
  → Proposal node lights up
  → Status: ● Generating proposal

Phase 5 (12-14s): ALL nodes glow
  → Proposal gets ✓
  → Status: ● Finalizing recommendations
  → All connection lines pulse simultaneously

Phase 6 (14-15s): COMPLETE
  → All nodes show ✓
  → Progress bar: 100%
  → Brief pause, then auto-redirect
```

### Mobile (375px)

```
┌─────────────────────────────┐
│                  #1A1A1A bg │
│  ☀ AMO AI            │
│                             │
│                             │
│                             │
│  ANALYZING YOUR             │
│  PROJECT                    │
│                             │
│    ┌─────┐                  │
│    │ORCH.│                  │
│    └──┬──┘                  │
│    ┌──┴──┐                  │
│    │REQ. │ ← active         │
│    └──┬──┘                  │
│    ┌──┴──┐                  │
│    │SCOPE│                  │
│    └──┬──┘                  │
│    ┌──┴──┐┌─────┐           │
│    │TIME ││PRICE│           │
│    └──┬──┘└──┬──┘           │
│    ┌──┴──────┴──┐           │
│    │PROPOSAL    │           │
│    └────────────┘           │
│                             │
│  ✓ Understanding reqs.      │
│  ● Matching architecture... │
│  ○ Calculating costs        │
│  ○ Generating proposal      │
│  ○ Finalizing               │
│                             │
│  ═══════●═══════  45%      │
│                             │
│  "Reviewing 847 projects    │
│   for your scope."          │
│                             │
│  Acme Retail · E-commerce   │
│  3 systems · $18K-$32K      │
│                             │
└─────────────────────────────┘
```

---

## CONTENT DATA

### Processing States

```typescript
const PROCESSING_STATES: ProcessingState[] = [
  {
    id: 'requirements',
    agentName: 'Requirements Analyst',
    label: 'Understanding requirements',
    description: 'Parsing your goals and constraints',
    duration: 2500,   // ms
    progressEnd: 20,
    contextMessage: 'Analyzing your business context and diagnostic signals...',
  },
  {
    id: 'matching',
    agentName: 'Scope Estimator',
    label: 'Matching solution architecture',
    description: 'Comparing with 847 past projects',
    duration: 3000,
    progressEnd: 40,
    contextMessage: 'Finding the best architecture for e-commerce + 3 systems...',
  },
  {
    id: 'calculating',
    agentName: 'Timeline Planner + Pricing Engine',
    label: 'Calculating timeline & costs',
    description: 'Factoring scope, integrations, and complexity',
    duration: 3500,
    progressEnd: 65,
    contextMessage: 'Building phased timeline across 6-10 weeks...',
  },
  {
    id: 'generating',
    agentName: 'Proposal Writer',
    label: 'Generating proposal',
    description: 'Building your custom project plan',
    duration: 3000,
    progressEnd: 85,
    contextMessage: 'Writing deliverables, milestones, and pricing breakdown...',
  },
  {
    id: 'finalizing',
    agentName: 'All Agents',
    label: 'Finalizing recommendations',
    description: 'Adding optimization suggestions',
    duration: 2000,
    progressEnd: 100,
    contextMessage: 'Cross-checking recommendations and adding final touches...',
  },
];

// Total: ~14 seconds + 1s buffer before redirect = 15 seconds
```

### Agent Nodes

```typescript
const AGENT_NODES: AgentNode[] = [
  {
    id: 'orchestrator',
    name: 'Orchestrator',
    role: 'Coordinates',
    icon: 'Brain',
    position: { x: 50, y: 10 },  // % of container
    size: 'large',
    connections: ['requirements', 'scope', 'timeline'],
  },
  {
    id: 'requirements',
    name: 'Requirements Analyst',
    role: 'Parsing',
    icon: 'FileSearch',
    position: { x: 20, y: 40 },
    size: 'medium',
    connections: ['pricing'],
    activeInPhase: 1,
  },
  {
    id: 'scope',
    name: 'Scope Estimator',
    role: 'Comparing',
    icon: 'Scale',
    position: { x: 50, y: 40 },
    size: 'medium',
    connections: ['pricing'],
    activeInPhase: 2,
  },
  {
    id: 'timeline',
    name: 'Timeline Planner',
    role: 'Scheduling',
    icon: 'Calendar',
    position: { x: 80, y: 40 },
    size: 'medium',
    connections: ['pricing'],
    activeInPhase: 3,
  },
  {
    id: 'pricing',
    name: 'Pricing Engine',
    role: 'Calculating',
    icon: 'DollarSign',
    position: { x: 50, y: 65 },
    size: 'medium',
    connections: ['proposal'],
    activeInPhase: 3,
  },
  {
    id: 'proposal',
    name: 'Proposal Writer',
    role: 'Generating',
    icon: 'FileText',
    position: { x: 50, y: 85 },
    size: 'medium',
    connections: [],
    activeInPhase: 4,
  },
];
```

### Dynamic Context Messages

```typescript
// Messages personalized with wizard data
function getContextMessage(phase: number, wizardState: WizardState): string {
  const { companyName, industry, selectedSystems, investmentRange } = wizardState;
  const systemCount = selectedSystems.length;

  const messages = {
    1: `Analyzing ${companyName}'s business context and ${industry} diagnostic signals...`,
    2: `Finding the best architecture for ${industry} + ${systemCount} system${systemCount > 1 ? 's' : ''}...`,
    3: `Building phased timeline for ${investmentRange} investment scope...`,
    4: `Writing deliverables, milestones, and pricing for ${companyName}...`,
    5: `Cross-checking ${systemCount} system recommendations and adding optimizations...`,
  };

  return messages[phase] || '';
}
```

---

## ANIMATIONS — motion/react

### Agent Node Pulse

```typescript
// Active agent node
const activeNodeVariants = {
  inactive: {
    scale: 1,
    opacity: 0.3,
    borderColor: 'rgba(132, 204, 22, 0)',
  },
  active: {
    scale: [1, 1.08, 1],
    opacity: 1,
    borderColor: 'rgba(132, 204, 22, 1)',
    transition: {
      scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
      opacity: { duration: 0.3 },
      borderColor: { duration: 0.3 },
    },
  },
  completed: {
    scale: 1,
    opacity: 0.7,
    borderColor: 'rgba(132, 204, 22, 0.5)',
  },
};
```

### Connection Line Animation

```typescript
// Animated dashed line between nodes
const lineVariants = {
  inactive: { pathLength: 0, opacity: 0.1 },
  active: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
  flowing: {
    strokeDashoffset: [0, -20],
    opacity: 0.6,
    transition: { duration: 1, repeat: Infinity, ease: 'linear' },
  },
};
```

### Progress Bar

```typescript
const progressVariants = {
  initial: { width: '0%' },
  animate: (progress: number) => ({
    width: `${progress}%`,
    transition: { duration: 0.8, ease: 'easeOut' },
  }),
};

// Color shifts as progress increases
const progressColor = progress < 40
  ? '#84CC16'           // lime green
  : progress < 80
    ? '#65A30D'         // muted green
    : '#00875A';        // BCG green (completion)
```

### Thinking State Transitions

```typescript
// Each state line fades in
const stateVariants = {
  pending:   { opacity: 0.3, x: 0 },
  active:    { opacity: 1, x: 0, transition: { duration: 0.3 } },
  completed: { opacity: 0.6, x: 0 },
};

// Checkmark appears on completed states
const checkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  },
};

// Active state has pulsing dot
const dotVariants = {
  pulse: {
    scale: [1, 1.3, 1],
    opacity: [1, 0.7, 1],
    transition: { duration: 1.2, repeat: Infinity },
  },
};
```

### Summary Card (bottom)

```typescript
// Appears at start, stays throughout
const summaryCardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.5, duration: 0.4 },
  },
};
```

---

## WORKFLOW

```
ENTRY
│
├── User arrives at /wizard/processing
│   ├── Check: WizardState exists in React context?
│   │   ├── Yes → proceed with processing animation
│   │   └── No → redirect to /wizard (protect route)
│   ├── Start processing animation sequence
│   ├── Render: dark background (#1A1A1A), centered content
│   └── Disable browser back button (history.pushState guard)

PROCESSING SEQUENCE (15 seconds)
│
├── Phase 1 (0-2.5s): Requirements Analyst
│   ├── Node glows, connection line animates
│   ├── Status: ● Understanding requirements
│   ├── Progress: 0% → 20%
│   └── Context: "Analyzing [company]'s business context..."
│
├── Phase 2 (2.5-5.5s): Scope Estimator
│   ├── Requirements → ✓, Scope node glows
│   ├── Status: ✓ ... ● Matching solution architecture
│   ├── Progress: 20% → 40%
│   └── Context: "Finding best architecture for [industry]..."
│
├── Phase 3 (5.5-9s): Timeline + Pricing (parallel)
│   ├── Scope → ✓, Timeline + Pricing glow simultaneously
│   ├── Status: ● Calculating timeline & costs...
│   ├── Progress: 40% → 65%
│   └── Context: "Building phased timeline..."
│
├── Phase 4 (9-12s): Proposal Writer
│   ├── Timeline + Pricing → ✓, Proposal node glows
│   ├── Status: ● Generating proposal
│   ├── Progress: 65% → 85%
│   └── Context: "Writing deliverables and pricing..."
│
├── Phase 5 (12-14s): All agents
│   ├── All nodes glow, all lines pulse
│   ├── Status: ● Finalizing recommendations
│   ├── Progress: 85% → 100%
│   └── Context: "Cross-checking and optimizing..."
│
└── Complete (14-15s)
    ├── All nodes → ✓
    ├── Progress: 100% (full bar, green glow)
    ├── Brief pause (800ms)
    └── Auto-redirect to /wizard/proposal

BACKGROUND (ACTUAL AI WORK):
│
├── While animation plays, actual Gemini 3 call runs
│   ├── If Gemini 3 completes before 14s → cache result, wait for animation
│   ├── If Gemini 3 takes longer than 14s → extend animation gracefully
│   │   ├── Loop Phase 5 "Finalizing" with varied context messages
│   │   └── Max wait: 30 seconds before fallback
│   └── If Gemini 3 fails → use rule-based proposal generation
│
└── Redirect only when BOTH:
    ├── Animation has reached Phase 5 completion
    └── Proposal data is ready (cached or generated)
```

---

## AGENT BEHAVIOR — GEMINI 3 INTEGRATION

```
GEMINI 3: RUNS IN BACKGROUND DURING ANIMATION
════════════════════════════════════════════════

TRIGGER: Page mount (immediately when /wizard/processing loads)

PROMPT:
────────
System: You are the AMO AI proposal generation system.
        Given a complete client brief (business context, industry
        diagnostics, system selections, and contact details),
        generate a detailed project proposal including scope,
        phased timeline, deliverables, and pricing.

Input: Complete WizardState (all 5 steps)

Output: {
  proposal: {
    title: "AI Systems Proposal for Acme Retail Group",
    date: "March 7, 2026",
    summary: "Executive overview paragraph...",
    
    scope: [
      {
        phase: 1,
        name: "Discovery & Architecture",
        weeks: "1-2",
        cost: "$3,200",
        deliverables: [
          "Requirements deep-dive workshop",
          "System architecture design",
          "Integration mapping (Shopify, CRM)"
        ]
      },
      // ... more phases
    ],
    
    timeline: {
      totalWeeks: 8,
      phases: [
        { name: "Discovery", startWeek: 1, endWeek: 2 },
        { name: "Core Development", startWeek: 3, endWeek: 5 },
        { name: "Integration & QA", startWeek: 5, endWeek: 7 },
        { name: "Launch & Training", startWeek: 7, endWeek: 8 }
      ]
    },
    
    pricing: {
      total: "$24,500",
      deposit: "$7,350",      // 30%
      milestonePayments: [...],
      budgetMatch: true       // within user's selected tier
    },
    
    included: [
      "Source code ownership",
      "30-day post-launch support",
      "2 training sessions",
      "Documentation",
      "Deployment to production"
    ],
    
    nextSteps: {
      primaryCTA: "Accept & Pay Deposit",
      secondaryCTA: "Book a 30-min Strategy Call",
      validDays: 14
    }
  }
}

FALLBACK (rule-based proposal):
├── Use system metadata for scope/timeline
├── Calculate pricing from effort × rate formula
├── Generate deliverables from system templates
├── Less narrative, more structured — still complete
└── User sees identical UI, just less custom prose
```

---

## ROUTE PROTECTION

```typescript
// /wizard/processing is protected
// Redirect to /wizard if no WizardState exists

function ProcessingPage() {
  const { wizardState } = useWizardContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!wizardState || !wizardState.completedSteps.has(5)) {
      navigate('/wizard', { replace: true });
    }
  }, [wizardState, navigate]);

  // ... processing animation
}
```

---

## ACCESSIBILITY

```
├── aria-live="polite" region for status updates
├── Progress bar: role="progressbar", aria-valuenow, aria-valuemin, aria-valuemax
├── Agent diagram: aria-hidden="true" (decorative animation)
├── Status list: semantic <ol> with aria-label="Processing steps"
├── Active state: aria-current="step"
├── Completed states: visually ✓, sr-only "completed"
├── Auto-redirect: announced via aria-live "Analysis complete, loading proposal"
├── Reduced motion: if prefers-reduced-motion, skip node animations, show simple progress bar
├── Summary card: plain text, always accessible
└── Screen reader: "Analyzing your project. Step 3 of 5: Calculating timeline and costs."
```

---

## IMPLEMENTATION NOTES

```
DEPENDENCIES:
├── motion/react .................. all animations (nodes, lines, progress)
├── lucide-react .................. agent icons (Brain, FileSearch, Scale, etc.)
└── react-router .................. navigate to /wizard/proposal

FILES:
├── /components/wizard/ProcessingPage.tsx ......... main page
├── /components/wizard/AgentDiagram.tsx ........... node + line visualization
├── /components/wizard/ThinkingStates.tsx ......... status list component
├── /components/wizard/ProcessingProgress.tsx ..... progress bar
└── /components/wizard/data/processingStates.ts ... state definitions

KEY DECISIONS:
├── Dark background (#1A1A1A) — distinct from wizard steps
├── No header/footer chrome — immersive experience
├── Agent diagram is decorative (accessibility)
├── Animation is TIME-BASED, not data-driven (predictable experience)
├── Actual AI runs in parallel (animation is the minimum wait)
├── Graceful extension if AI is slow (loop Phase 5)
├── Max 30 seconds before fallback triggers
├── Summary card anchors the experience with user's data
├── Reduced motion users: simple progress bar + text status
└── Back button disabled (can't re-submit, must complete)
```
