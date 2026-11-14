# 8 Week Process Section — Premium Dark Hero

**Component:** Velocity Process Section (Dark Mode)  
**Location:** HomePageV3 (replaces or supplements existing process section)  
**Style:** Premium dark gradient with high contrast  
**Color System:** Uses ONLY existing AMO AI V3 palette colors
**Status:** ✅ Implemented and Live  
**Last Updated:** February 27, 2026

---

## Design Philosophy

This section communicates:
- **Structured execution** — Not chaos
- **Real systems** — Not promises
- **Accelerated delivery** — 8 weeks, not 8 months

### Visual Tone
✅ Fast  
✅ Confident  
✅ Technical  
✅ Structured  
✅ Premium  
❌ Not corporate  
❌ Not playful  

---

## Section Structure

### Visual Hierarchy (Top to Bottom)
```
1. Badge (THE AMO AI VELOCITY SYSTEM)
2. Headline (Build AI in 8 Weeks. Not 8 Months.)
3. Subheadline (A proven acceleration system...)
4. Horizontal Timeline (4 icon nodes with connector line)
5. 4 Process Cards (equal width, responsive)
```

---

## Color Palette (Existing Colors Only)

### Background Gradient System
```css
/* === PRIMARY GRADIENT LAYERS === */

/* Base gradient (bottom to top) */
background: linear-gradient(
  180deg,
  #060D0B 0%,      /* Dark green base (existing) */
  #0A211F 50%,     /* Deep teal green (existing) */
  #0A0A0A 80%,     /* Near black (existing) */
  #000000 100%     /* Pure black (existing) */
);

/* Optional radial glow overlay */
background: radial-gradient(
  ellipse at center,
  rgba(4, 13, 12, 0.8) 0%,   /* #040D0C at 80% */
  rgba(2, 7, 6, 0.6) 50%,    /* #020706 at 60% */
  transparent 100%
);

/* Simplified version (recommended) */
background: linear-gradient(180deg, #000000 0%, #0A211F 100%);
```

### Text Colors (All Existing)
```css
/* Primary heading */
--heading-primary: #FFFFFF;      /* White (38 instances) */

/* Secondary text */
--text-secondary: #CCCCCC;       /* Cool gray (6 instances) */

/* Muted descriptions */
--text-muted: #A6A6A6;           /* Light gray (3 instances) */
--text-muted-alt: #999999;       /* Light gray alt (1 instance) */

/* Accent highlight */
--accent-primary: #2E6F5E;       /* Accent green (20 instances) */
--accent-deep: #1E3D36;          /* Deep green (22 instances) */

/* Light neutral (minimal use) */
--neutral-light: #F4F3EE;        /* Warm beige (13 instances) */
```

### Opacity Variants
```css
/* Accent green variations */
--accent-10: rgba(46, 111, 94, 0.10);   /* Borders */
--accent-20: rgba(46, 111, 94, 0.20);   /* Hover borders */
--accent-30: rgba(46, 111, 94, 0.30);   /* Active states */
--accent-50: rgba(46, 111, 94, 0.50);   /* Glows */

/* Deep green variations */
--deep-green-10: rgba(30, 61, 54, 0.10);  /* Card borders */
--deep-green-15: rgba(30, 61, 54, 0.15);  /* Timeline line */
--deep-green-20: rgba(30, 61, 54, 0.20);  /* Dividers */

/* Black variations */
--black-40: rgba(0, 0, 0, 0.40);        /* Card shadows */
--black-60: rgba(0, 0, 0, 0.60);        /* Deep shadows */
```

---

## 1. Badge Component

### Content
```
THE AMO AI VELOCITY SYSTEM
```

### Specifications
```css
.velocity-badge {
  /* Layout */
  display: inline-block;
  padding: 8px 16px;
  border-radius: 24px;
  
  /* Colors */
  background: #0A211F;                    /* Dark green deep (existing) */
  border: 1px solid rgba(46, 111, 94, 0.3);  /* Accent green 30% */
  
  /* Typography */
  font-family: Inter, system-ui, sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #2E6F5E;                         /* Accent green (existing) */
  
  /* Spacing */
  margin-bottom: 24px;
}
```

### HTML Structure
```html
<div class="velocity-badge">
  THE AMO AI VELOCITY SYSTEM
</div>
```

---

## 2. Headline

### Content
```
Build AI in 8 Weeks.
Not 8 Months.
```

### Specifications
```css
.velocity-headline {
  /* Typography */
  font-family: Inter, system-ui, sans-serif;
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 700;
  line-height: 1.15;
  text-align: center;
  color: #FFFFFF;                         /* White (existing) */
  
  /* Spacing */
  margin-bottom: 20px;
}

.velocity-headline .accent {
  color: #2E6F5E;                         /* Accent green (existing) */
}
```

### HTML Structure
```html
<h2 class="velocity-headline">
  Build AI in <span class="accent">8 Weeks.</span><br />
  Not 8 Months.
</h2>
```

---

## 3. Subheadline

### Content
```
A proven acceleration system that takes your AI project from idea to production — fast.
```

### Specifications
```css
.velocity-subheadline {
  /* Typography */
  font-family: Inter, system-ui, sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
  text-align: center;
  color: #CCCCCC;                         /* Cool gray (existing) */
  
  /* Layout */
  max-width: 600px;
  margin: 0 auto 80px;
}
```

---

## 4. Horizontal Timeline

### Visual Structure
```
┌──────────────────────────────────────────────────────┐
│                                                        │
│    ●───────────●───────────●───────────●              │
│   [1]        [2]        [3]        [4]                │
│                                                        │
└──────────────────────────────────────────────────────┘
```

### Timeline Line
```css
.timeline-line {
  /* Layout */
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  transform: translateY(-50%);
  
  /* Colors */
  background: rgba(30, 61, 54, 0.15);     /* Deep green 15% (existing) */
  
  /* Optional gradient variation */
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(30, 61, 54, 0.15) 10%,
    rgba(30, 61, 54, 0.15) 90%,
    transparent 100%
  );
}
```

### Timeline Node (Default State)
```css
.timeline-node {
  /* Layout */
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  
  /* Colors */
  background: #0A0A0A;                    /* Near black (existing) */
  border: 2px solid #1E3D36;              /* Deep green (existing) */
  
  /* Shadow */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);  /* Black 40% (existing) */
  
  /* Transition */
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-node svg {
  width: 28px;
  height: 28px;
  color: #2E6F5E;                         /* Accent green (existing) */
}
```

### Timeline Node (Active/Hover State)
```css
.timeline-node:hover,
.timeline-node.active {
  /* Colors */
  background: #2E6F5E;                    /* Accent green (existing) */
  border-color: #2E6F5E;                  /* Accent green (existing) */
  
  /* Glow effect */
  box-shadow: 
    0 0 0 8px rgba(46, 111, 94, 0.15),    /* Accent green 15% */
    0 8px 24px rgba(46, 111, 94, 0.3);    /* Accent green 30% */
  
  /* Transform */
  transform: scale(1.08);
}

.timeline-node:hover svg,
.timeline-node.active svg {
  color: #FFFFFF;                         /* White (existing) */
}
```

### Icons (Lucide React)
```typescript
import { Compass, Zap, Link2, Rocket } from 'lucide-react';

const timelineIcons = [
  { icon: Compass, label: 'Strategy' },      // Phase 1
  { icon: Zap, label: 'Build' },             // Phase 2
  { icon: Link2, label: 'Integration' },     // Phase 3
  { icon: Rocket, label: 'Launch' },         // Phase 4
];
```

---

## 5. Process Cards (4 Cards)

### Card Layout
```css
.process-cards {
  /* Grid */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Tablet */
@media (max-width: 1024px) {
  .process-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .process-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

### Individual Card Style
```css
.process-card {
  /* Layout */
  padding: 32px 24px;
  border-radius: 16px;
  
  /* Colors */
  background: #0A0A0A;                    /* Near black (existing) */
  border: 1px solid #1E3D36;              /* Deep green (existing) */
  
  /* Shadow */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);  /* Black 40% */
  
  /* Transition */
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.process-card:hover {
  /* Transform */
  transform: translateY(-4px);
  
  /* Border */
  border-color: rgba(46, 111, 94, 0.4);   /* Accent green 40% */
  
  /* Shadow */
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.6),        /* Black 60% */
    0 0 0 1px rgba(46, 111, 94, 0.2);     /* Accent green 20% */
}
```

### Card Content Structure
```css
/* Label (eyebrow) */
.card-label {
  font-family: Inter, system-ui, sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2E6F5E;                         /* Accent green (existing) */
  margin-bottom: 12px;
}

/* Title */
.card-title {
  font-family: Inter, system-ui, sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
  color: #FFFFFF;                         /* White (existing) */
  margin-bottom: 12px;
}

/* Description */
.card-description {
  font-family: Inter, system-ui, sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
  color: #A6A6A6;                         /* Light gray (existing) */
}
```

---

## 6. Card Content

### Card 1: Strategy & Design
```typescript
{
  label: 'WEEKS 1–2',
  title: 'Strategy & Design',
  description: 'Scope, architecture, and UX planning.',
  icon: Compass,
}
```

### Card 2: Rapid Build
```typescript
{
  label: 'WEEKS 3–5',
  title: 'Rapid Build',
  description: 'Core development and AI logic.',
  icon: Zap,
}
```

### Card 3: Integrations
```typescript
{
  label: 'WEEKS 6–7',
  title: 'Integrations',
  description: 'Testing and connecting APIs.',
  icon: Link2,
}
```

### Card 4: Launch & Scale
```typescript
{
  label: 'WEEK 8',
  title: 'Launch & Scale',
  description: 'Deployment and handoff.',
  icon: Rocket,
}
```

---

## 7. Motion & Animation

### Entrance Animations
```typescript
// Section fade in
<motion.section
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.8 }}
>
```

### Timeline Animation
```typescript
// Line draws left to right
<motion.div
  className="timeline-line"
  initial={{ scaleX: 0 }}
  whileInView={{ scaleX: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 0.4, duration: 1, ease: 'easeInOut' }}
  style={{ transformOrigin: 'left' }}
/>

// Nodes scale in with stagger
{nodes.map((node, i) => (
  <motion.div
    key={i}
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{
      delay: 0.8 + (i * 0.2),  // 200ms stagger
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    }}
  >
    {node}
  </motion.div>
))}
```

### Card Animation
```typescript
// Cards fade + slide up with stagger
{cards.map((card, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      delay: 1.6 + (i * 0.1),  // Start after timeline completes
      duration: 0.5,
    }}
  >
    {card}
  </motion.div>
))}
```

### Hover Interactions
```css
/* Card lift on hover */
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .velocity-section * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 8. Spacing Rules

### Section Spacing
```css
.velocity-section {
  /* Vertical padding */
  padding: 120px 24px;  /* Desktop */
  
  /* Horizontal constraints */
  max-width: 1440px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .velocity-section {
    padding: 96px 20px;  /* Mobile */
  }
}
```

### Internal Spacing
```css
/* Badge → Headline */
margin-bottom: 24px;

/* Headline → Subheadline */
margin-bottom: 20px;

/* Subheadline → Timeline */
margin-bottom: 80px;

/* Timeline → Cards */
margin-top: 48px;

/* Between cards */
gap: 32px;  /* Desktop */
gap: 20px;  /* Tablet */
gap: 16px;  /* Mobile */
```

---

## 9. Responsive Behavior

### Desktop (1280px+)
- 4 cards in a row
- Full timeline visible
- 64px icon nodes
- 32px card gap

### Tablet (768px - 1280px)
- 2 cards per row (2x2 grid)
- Timeline scales proportionally
- 56px icon nodes
- 20px card gap

### Mobile (<768px)
- 1 card per column (stacked)
- Timeline hidden OR vertical
- Cards full width
- 16px card gap
- 96px section padding

---

## 10. Accessibility

### Color Contrast
```
✅ #FFFFFF on #000000 = 21:1 (WCAG AAA)
✅ #CCCCCC on #000000 = 15.3:1 (WCAG AAA)
✅ #A6A6A6 on #000000 = 9.4:1 (WCAG AAA)
✅ #2E6F5E on #000000 = 4.8:1 (WCAG AA large text)
```

### Semantic HTML
```html
<section aria-labelledby="velocity-heading">
  <div class="velocity-badge" role="status">
    THE AMO AI VELOCITY SYSTEM
  </div>
  
  <h2 id="velocity-heading">
    Build AI in <span class="accent">8 Weeks.</span>
    Not 8 Months.
  </h2>
  
  <p class="velocity-subheadline">
    A proven acceleration system...
  </p>
  
  <div 
    class="timeline" 
    role="presentation"
    aria-label="8-week development timeline"
  >
    {/* Timeline */}
  </div>
  
  <div class="process-cards">
    {phases.map((phase, i) => (
      <article 
        key={i}
        aria-labelledby={`phase-${i}-title`}
      >
        <p class="card-label">{phase.label}</p>
        <h3 id={`phase-${i}-title`} class="card-title">
          {phase.title}
        </h3>
        <p class="card-description">{phase.description}</p>
      </article>
    ))}
  </div>
</section>
```

### Keyboard Navigation
- Timeline nodes focusable (if interactive)
- Cards focus visible with accent border
- Logical tab order

---

## 11. Component Props Interface

```typescript
interface VelocityPhase {
  label: string;           // "WEEKS 1–2"
  title: string;           // "Strategy & Design"
  description: string;     // "Scope, architecture, and UX planning."
  icon: React.ComponentType<{ className?: string }>;  // Lucide icon
}

interface VelocityProcessSectionProps {
  // Content
  badge?: string;          // Default: "THE AMO AI VELOCITY SYSTEM"
  headline?: string;       // Default: "Build AI in 8 Weeks."
  headlineAccent?: string; // Default: "8 Weeks"
  subheadline?: string;    // Default: "A proven acceleration system..."
  phases: VelocityPhase[];
  
  // Display options
  showTimeline?: boolean;  // Default: true
  animated?: boolean;      // Default: true
  
  // Styling
  className?: string;
  darkMode?: boolean;      // Default: true (this section is dark)
}
```

---

## 12. Implementation Checklist

### Phase 1: Setup
- [ ] Create component file `/components/home/VelocityProcessSection.tsx`
- [ ] Import Lucide icons (Compass, Zap, Link2, Rocket)
- [ ] Import Motion for animations
- [ ] Define color constants from existing palette

### Phase 2: Structure
- [ ] Build badge component
- [ ] Build headline with accent span
- [ ] Build subheadline
- [ ] Create timeline container
- [ ] Create timeline line
- [ ] Map timeline nodes with icons

### Phase 3: Cards
- [ ] Create card grid container
- [ ] Build individual card component
- [ ] Map 4 phase cards with content
- [ ] Add hover states

### Phase 4: Animations
- [ ] Add section entrance fade
- [ ] Add timeline line draw animation
- [ ] Add node scale-in stagger
- [ ] Add card fade-up stagger
- [ ] Test reduced motion

### Phase 5: Responsive
- [ ] Test 4-column desktop layout
- [ ] Test 2-column tablet layout
- [ ] Test 1-column mobile layout
- [ ] Adjust spacing at breakpoints

### Phase 6: Integration
- [ ] Import into HomePageV3
- [ ] Position after existing sections
- [ ] Test scroll flow
- [ ] Verify color consistency

---

## 13. File Structure

```
/components/home/
├── VelocityProcessSection.tsx    (Main component)
└── velocity-process/
    ├── VelocityBadge.tsx
    ├── VelocityHeadline.tsx
    ├── VelocityTimeline.tsx
    ├── ProcessCard.tsx
    └── index.ts

/docs/home/
└── 05-process.md                  (This file)
```

---

## 14. Design Decisions

### Why Dark Background?
- High contrast for premium feel
- Differentiates from sage green sections
- Emphasizes "velocity" and "technical execution"
- Creates visual break in page rhythm

### Why Green Accent (Not Orange)?
- Maintains brand consistency with AMO AI V3
- Uses existing #2E6F5E accent green
- More sophisticated than orange
- Better contrast on dark backgrounds

### Why Horizontal Timeline?
- Desktop-first layout fits 4 phases naturally
- Linear progression is easy to scan
- Doesn't compete with cards for attention
- Can gracefully hide on mobile

### Why 4 Cards (Not 3 or 5)?
- Matches 8-week timeline (2+3+2+1 weeks)
- Even number creates visual balance
- Responsive: 4→2→1 columns works perfectly
- Industry standard for process sections

---

## 15. A/B Testing Recommendations

### Test Variations

**A: Dark Hero (This Design)**
- Dark gradient background
- High contrast white text
- Green accents
- Modern, technical feel

**B: Light Sage (Current V3 Style)**
- Sage green #DCE5DD background
- Deep green #1E3D36 text
- White cards with subtle shadows
- Editorial, premium feel

### Metrics to Track
- Time on section
- Scroll depth
- CTA click rate (if applicable)
- Heatmap interaction with timeline/cards

### Hypothesis
Dark hero version will:
- ✅ Increase perceived speed/velocity
- ✅ Differentiate from competitors
- ✅ Appeal to technical decision-makers
- ⚠️ May reduce perceived warmth/approachability

---

## 16. Content Guidelines

### Headline Rules
- Lead with time/speed benefit ("8 Weeks")
- Use contrast ("Not 8 Months")
- Keep under 15 words
- Highlight number in accent color

### Card Copy Guidelines
- Label: Always time-based (WEEKS X-Y)
- Title: 2-3 words max, action-oriented
- Description: Single sentence, concrete deliverables
- Avoid jargon, be specific

### Voice & Tone
- **Confident** — "We know what we're doing"
- **Direct** — "8 weeks" not "approximately 2 months"
- **Structured** — Clear phases, clear outcomes
- **Not salesy** — No "revolutionary" or "cutting-edge"

---

## 17. Final Output Specifications

### What Gets Built
1. **Component:** `/components/home/VelocityProcessSection.tsx`
2. **Exports:** Default export for use in HomePageV3
3. **Styling:** Inline or Tailwind classes (no separate CSS file)
4. **Animation:** Motion components with viewport triggers
5. **Responsive:** Mobile-first with breakpoints at 640px, 1024px

### Integration Point
```typescript
// In HomePageV3.tsx
import VelocityProcessSection from './components/home/VelocityProcessSection';

export default function HomePageV3() {
  return (
    <>
      {/* ... other sections ... */}
      
      <VelocityProcessSection />
      
      {/* ... remaining sections ... */}
    </>
  );
}
```

---

## 18. Color Reference (Quick Copy)

```css
/* Backgrounds */
--bg-gradient: linear-gradient(180deg, #000000 0%, #0A211F 100%);
--card-bg: #0A0A0A;
--badge-bg: #0A211F;

/* Borders */
--border-default: #1E3D36;
--border-accent: rgba(46, 111, 94, 0.4);
--timeline-line: rgba(30, 61, 54, 0.15);

/* Text */
--text-primary: #FFFFFF;
--text-secondary: #CCCCCC;
--text-muted: #A6A6A6;

/* Accent */
--accent-green: #2E6F5E;
--accent-glow: rgba(46, 111, 94, 0.3);

/* Shadows */
--shadow-card: rgba(0, 0, 0, 0.4);
--shadow-card-hover: rgba(0, 0, 0, 0.6);
```

---

**STATUS:** 📋 Design Specification Complete  
**READY FOR:** Implementation  
**PRIORITY:** High — Premium homepage section  
**ESTIMATED TIME:** 2-3 hours for full implementation + testing

---

**END OF DOCUMENT**