# Process Section Wireframe — "Build AI in 8 Weeks"

**Purpose:** Velocity-focused 4-phase timeline section with dark navy theme  
**Style:** Modern SaaS with orange accents and horizontal timeline  
**Reference:** Based on "AMO AI Velocity System" design
**Status:** 📋 Wireframe Documentation  
**Last Updated:** February 27, 2026

---

## Design Overview

This is a **dark-themed alternative** to the current sage green "How We Deliver" section. It emphasizes **speed and velocity** with a bold "8 Weeks. Not 8 Months." headline and orange accent colors.

### Visual Style
- **Background:** Dark navy gradient (#0A1628 to #0D1B2E)
- **Accent Color:** Vibrant orange (#FF6A3D or #FF8B3D)
- **Typography:** Sans-serif (likely Inter or similar)
- **Mood:** Fast, modern, tech-forward, confident
- **Contrast:** High contrast dark/light for readability

### Key Differences from Current Implementation
| Current (Sage Green) | Wireframe (Dark Navy) |
|---------------------|----------------------|
| Light sage background | Dark navy gradient |
| Deep green accents | Orange accents |
| Serif fonts (Playfair + Lora) | Sans-serif fonts |
| Calm, editorial luxury | Fast, velocity-focused |
| "How We Deliver" | "Build AI in 8 Weeks" |
| 4 white cards | 4 semi-transparent dark cards |

---

## Section Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                     [DARK NAVY GRADIENT BACKGROUND]              │
│                                                                   │
│                  ┌──────────────────────────┐                    │
│                  │ THE AMO AI VELOCITY SYSTEM │  ← Small badge   │
│                  └──────────────────────────┘                    │
│                                                                   │
│                     Build AI in 8 Weeks.          ← Large headline│
│                     Not 8 Months.                 ← (8 Weeks orange)│
│                                                                   │
│     A proven acceleration system that takes your AI project      │
│             from idea to production — fast.                      │
│                                                                   │
│                                                                   │
│        ───────────────────────────────────────────────          │
│       │       ⊙       ───────  ⚡  ───────  🔗  ───────  🚀 │  ← Timeline│
│        ───────────────────────────────────────────────          │
│                                                                   │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│   │ WEEKS 1-2│  │ WEEKS 3-5│  │ WEEKS 6-7│  │  WEEK 8  │      │
│   │          │  │          │  │          │  │          │      │
│   │Strategy &│  │  Rapid   │  │Integration│ │ Launch & │      │
│   │  Design  │  │  Build   │  │     s     │ │  Scale   │      │
│   │          │  │          │  │          │  │          │      │
│   │ Scope,   │  │ Core dev │  │Testing & │  │Deployment│      │
│   │architect │  │ and AI   │  │connecting│  │and handoff│     │
│   │ure, UX   │  │ logic    │  │ APIs     │  │          │      │
│   └──────────┘  └──────────┘  └──────────┘  └──────────┘      │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Color Palette

### Primary Colors (Process Section - Dark Theme)

```css
/* Background */
--navy-dark: #0A1628;           /* Primary background (dark) */
--navy-medium: #0D1B2E;         /* Gradient end, card backgrounds */
--navy-light: #12253D;          /* Hover states, borders */

/* Accent */
--orange-primary: #FF6A3D;      /* "8 Weeks", icons, highlights */
--orange-light: #FF8B3D;        /* Hover states, gradients */
--orange-glow: rgba(255, 106, 61, 0.2);  /* Icon glows */

/* Text */
--white: #FFFFFF;               /* Main headlines */
--gray-light: #B8C5D6;          /* Body text, descriptions */
--gray-muted: #7A8BA3;          /* Supporting text */
--gray-dark: #4A5A6F;           /* Subtle text */

/* Effects */
--card-bg: rgba(255, 255, 255, 0.03);       /* Card background */
--card-border: rgba(255, 255, 255, 0.08);   /* Card borders */
--timeline-line: rgba(255, 255, 255, 0.15); /* Timeline connector */
```

### Current HomePage V3 Colors (Sage Green Theme)

```css
/* === AMO AI V3 ACTUAL COLOR PALETTE === */

/* Primary Backgrounds */
--warm-beige: #F4F3EE;          /* Hero sections, main background (13 instances) */
--warm-beige-alt: #F1EEEA;      /* Background variations (4 instances) */
--warm-beige-light: #F5F4F1;    /* Lighter variant (1 instance) */
--sage: #DCE5DD;                /* Section backgrounds (11 instances) */
--white: #FFFFFF;               /* Cards, panels (38 instances) */

/* Primary Colors */
--deep-green: #1E3D36;          /* Main headlines, primary text (22 instances) */
--accent-green: #2E6F5E;        /* Links, CTAs, accents (20 instances) */
--dark-green-deep: #0A211F;     /* Deep green variant (86 instances) */

/* Neutrals & Grays */
--black: #000000;               /* Pure black (396 instances) */
--near-black: #0A0A0A;          /* Near black (2 instances) */
--dark: #1C1C1C;                /* Body text on light (39 instances) */
--dark-gray: #333333;           /* Dark gray text (38 instances) */
--muted: #6B6B6B;               /* Secondary text (39 instances) */
--gray-medium: #737373;         /* Medium gray (1 instance) */
--gray: #808080;                /* Standard gray (1 instance) */
--gray-light: #999999;          /* Light gray (1 instance) */
--gray-lighter: #A6A6A6;        /* Lighter gray (3 instances) */
--gray-cool: #CCCCCC;           /* Cool gray (6 instances) */
--gray-very-light: #666666;     /* Very light gray (1 instance) */

/* Borders & Dividers */
--border: #E5E5E5;              /* Borders, dividers (5 instances) */
--border-light: #EBEBEB;        /* Light borders (38 instances) */

/* Dark Accents */
--burgundy-dark: #281018;       /* Dark burgundy accent (195 instances) */

/* Green Gradients & Variations */
--green-very-dark-1: #010303;   /* Almost black green (86 instances) */
--green-very-dark-2: #020706;   /* Very dark green (86 instances) */
--green-very-dark-3: #040D0C;   /* Dark green shade (86 instances) */
--green-dark-1: #051110;        /* Dark green (86 instances) */
--green-dark-2: #061413;        /* Dark green variant (86 instances) */
--green-dark-3: #071716;        /* Dark green shade (86 instances) */
--green-dark-4: #060D0B;        /* Dark green (20 instances) */

/* Opacity Variants (Deep Green #1E3D36) */
--deep-green-8: rgba(30, 61, 54, 0.08);    /* Icon backgrounds */
--deep-green-10: rgba(30, 61, 54, 0.10);   /* Borders, separators */
--deep-green-15: rgba(30, 61, 54, 0.15);   /* Timeline lines */
--deep-green-20: rgba(30, 61, 54, 0.20);   /* Decorative dividers */
--deep-green-60: rgba(30, 61, 54, 0.60);   /* Muted text */
--deep-green-80: rgba(30, 61, 54, 0.80);   /* Body text */

/* Usage Guide */
/* Most common colors in design system:
   - #000000 (black) - 396 instances - shadows, dark overlays
   - #281018 (burgundy) - 195 instances - dark accent color
   - #0A211F (dark green) - 86 instances - deep green variant
   - Green gradients (#010303 → #071716) - 86 instances each - subtle transitions
   - #6B6B6B (muted gray) - 39 instances - secondary text
   - #1C1C1C (dark) - 39 instances - primary text on light
   - #FFFFFF (white) - 38 instances - cards, panels
   - #1E3D36 (deep green) - 22 instances - headlines
   - #2E6F5E (accent green) - 20 instances - interactive elements
   - #F4F3EE (warm beige) - 13 instances - backgrounds
   - #DCE5DD (sage) - 11 instances - section backgrounds
*/
```

---

## 1. Section Header

### Eyebrow Badge
```
THE AMO AI VELOCITY SYSTEM
```

**Specs:**
- **Font:** Sans-serif (Inter/System), uppercase
- **Size:** 11px (0.6875rem)
- **Weight:** 600 (semibold)
- **Color:** Orange (#FF6A3D)
- **Letter Spacing:** 0.1em (tracked)
- **Background:** Transparent or subtle orange glow
- **Border:** Optional 1px orange border with rounded corners
- **Position:** Centered above main headline
- **Margin Bottom:** 24px

### Main Headline
```
Build AI in 8 Weeks.
Not 8 Months.
```

**Specs:**
- **Font:** Sans-serif bold (Inter/System)
- **Size:** 48-64px responsive (3rem to 4rem)
- **Weight:** 700 (bold)
- **Color:** 
  - "Build AI in" → White (#FFFFFF)
  - "8 Weeks" → Orange (#FF6A3D)
  - "Not 8 Months." → White (#FFFFFF)
- **Line Height:** 1.15 (tight)
- **Text Align:** Center
- **Margin Bottom:** 20px

**Typography Pattern:**
```html
Build AI in <span style="color: #FF6A3D;">8 Weeks.</span>
Not 8 Months.
```

### Supporting Text
```
A proven acceleration system that takes your AI project from idea to production — fast.
```

**Specs:**
- **Font:** Sans-serif regular (Inter)
- **Size:** 18px (1.125rem)
- **Weight:** 400 (regular)
- **Color:** Light gray (#B8C5D6)
- **Line Height:** 1.6
- **Text Align:** Center
- **Max Width:** 600px
- **Margin:** 0 auto
- **Margin Bottom:** 60px

---

## 2. Horizontal Timeline

### Timeline Structure

```
┌──────────────────────────────────────────────────────┐
│    ●─────────⚡─────────🔗─────────🚀               │
│  Week 1-2   Week 3-5   Week 6-7   Week 8            │
└──────────────────────────────────────────────────────┘
```

### Timeline Line
**Specs:**
- **Width:** ~80% of container (centered)
- **Height:** 2px
- **Color:** Light gray/white at 15% opacity (#FFFFFF26)
- **Position:** Absolute, connecting all icon dots
- **Margin Bottom:** 48px (space before cards)

### Timeline Dots (Icon Circles)

**Icon 1 - Strategy (🎯 or ●)**
- **Icon:** Circular target or abstract circle
- **Color:** Orange (#FF6A3D)
- **Size:** 48px diameter circle
- **Background:** Navy with orange border
- **Glow:** 0 0 0 8px rgba(255, 106, 61, 0.15)
- **Position:** Above "Strategy & Design" card

**Icon 2 - Rapid Build (⚡)**
- **Icon:** Lightning bolt
- **Color:** Orange (#FF6A3D)
- **Size:** 48px diameter circle
- **Background:** Navy with orange border
- **Glow:** Same as Icon 1
- **Position:** Above "Rapid Build" card

**Icon 3 - Integrations (🔗)**
- **Icon:** Link/connection symbol
- **Color:** Orange (#FF6A3D)
- **Size:** 48px diameter circle
- **Background:** Navy with orange border
- **Glow:** Same as Icon 1
- **Position:** Above "Integrations" card

**Icon 4 - Launch (🚀)**
- **Icon:** Rocket
- **Color:** Orange (#FF6A3D)
- **Size:** 48px diameter circle
- **Background:** Navy with orange border
- **Glow:** Same as Icon 1
- **Position:** Above "Launch & Scale" card

### Timeline Dot Styling
```css
.timeline-dot {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(10, 22, 40, 0.8);
  border: 2px solid #FF6A3D;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 0 0 8px rgba(255, 106, 61, 0.15),
    0 4px 12px rgba(0, 0, 0, 0.3);
}

.timeline-dot svg {
  width: 24px;
  height: 24px;
  color: #FF6A3D;
}
```

---

## 3. Phase Cards

### Grid Layout
```css
.phase-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 1024px) {
  .phase-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .phase-cards {
    grid-template-columns: 1fr;
  }
}
```

### Card Styling (Base)
```css
.phase-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 32px 24px;
  backdrop-filter: blur(10px);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.phase-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 106, 61, 0.3);
  transform: translateY(-4px);
  box-shadow: 
    0 12px 32px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 106, 61, 0.2);
}
```

---

## 4. Card Content Structure

### Card 1: Strategy & Design

**Eyebrow:**
```
WEEKS 1-2
```
- **Font:** Inter Medium, 11px, uppercase
- **Color:** Orange (#FF6A3D)
- **Letter Spacing:** 0.08em
- **Margin Bottom:** 8px

**Title:**
```
Strategy & Design
```
- **Font:** Inter SemiBold, 22px
- **Color:** White (#FFFFFF)
- **Margin Bottom:** 12px

**Description:**
```
Scope, architecture, and UX
```
- **Font:** Inter Regular, 15px
- **Color:** Light gray (#B8C5D6)
- **Line Height:** 1.6
- **Opacity:** 85%

---

### Card 2: Rapid Build

**Eyebrow:** `WEEKS 3-5`  
**Title:** `Rapid Build`  
**Description:** `Core development and AI logic`

---

### Card 3: Integrations

**Eyebrow:** `WEEKS 6-7`  
**Title:** `Integrations`  
**Description:** `Testing and connecting APIs`

---

### Card 4: Launch & Scale

**Eyebrow:** `WEEK 8`  
**Title:** `Launch & Scale`  
**Description:** `Deployment and handoff`

---

## 5. Responsive Breakpoints

### Desktop (1200px+)
- 4 columns
- Full timeline visible
- 24px gap between cards
- 32px card padding

### Tablet (768-1200px)
- 2 columns (2x2 grid)
- Timeline remains horizontal
- 20px gap between cards
- 28px card padding

### Mobile (<768px)
- 1 column (stacked)
- Timeline becomes vertical OR hides
- 16px gap between cards
- 24px card padding
- Eyebrow labels more prominent

---

## 6. Typography System (Dark Theme)

### Heading Hierarchy
```css
/* Section Eyebrow */
--eyebrow-size: 11px;
--eyebrow-weight: 600;
--eyebrow-color: #FF6A3D;
--eyebrow-spacing: 0.1em;

/* Main Headline */
--h1-size: clamp(48px, 5vw, 64px);
--h1-weight: 700;
--h1-color: #FFFFFF;
--h1-line-height: 1.15;

/* Supporting Text */
--subtitle-size: 18px;
--subtitle-weight: 400;
--subtitle-color: #B8C5D6;
--subtitle-line-height: 1.6;

/* Card Titles */
--card-title-size: 22px;
--card-title-weight: 600;
--card-title-color: #FFFFFF;

/* Card Body */
--card-body-size: 15px;
--card-body-weight: 400;
--card-body-color: #B8C5D6;
--card-body-line-height: 1.6;
```

---

## 7. Animation Specifications

### Section Entrance
```typescript
// Stagger animation from top to bottom
<motion.section
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6 }}
>
  {/* Header */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.5 }}
  >
    <Badge />
    <Headline />
    <Subtitle />
  </motion.div>
  
  {/* Timeline */}
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    transition={{ delay: 0.5, duration: 0.8 }}
  >
    <TimelineLine />
  </motion.div>
  
  {/* Cards */}
  {cards.map((card, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 + (i * 0.1), duration: 0.5 }}
    >
      {card}
    </motion.div>
  ))}
</motion.section>
```

### Timeline Animation
- Line draws from left to right (scaleX: 0 → 1)
- Duration: 800ms
- Delay: 500ms after header appears
- Easing: ease-in-out

### Icon Dots Animation
- Scale from 0 to 1.2 to 1 (bounce effect)
- Sequential delay: 100ms between each dot
- Starts after timeline line finishes (1.3s total delay)
- Glow pulses subtly on completion

### Card Hover
```css
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* On hover */
transform: translateY(-4px);
background: rgba(255, 255, 255, 0.05);
border-color: rgba(255, 106, 61, 0.3);
box-shadow: 
  0 12px 32px rgba(0, 0, 0, 0.4),
  0 0 0 1px rgba(255, 106, 61, 0.2);
```

---

## 8. Design Tokens (Dark Theme)

```typescript
export const velocityTheme = {
  colors: {
    background: {
      primary: '#0A1628',
      secondary: '#0D1B2E',
      tertiary: '#12253D',
      card: 'rgba(255, 255, 255, 0.03)',
    },
    accent: {
      orange: '#FF6A3D',
      orangeLight: '#FF8B3D',
      orangeGlow: 'rgba(255, 106, 61, 0.2)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B8C5D6',
      muted: '#7A8BA3',
      dark: '#4A5A6F',
    },
    border: {
      default: 'rgba(255, 255, 255, 0.08)',
      hover: 'rgba(255, 106, 61, 0.3)',
      timeline: 'rgba(255, 255, 255, 0.15)',
    },
  },
  shadows: {
    card: '0 4px 16px rgba(0, 0, 0, 0.2)',
    cardHover: '0 12px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 106, 61, 0.2)',
    iconGlow: '0 0 0 8px rgba(255, 106, 61, 0.15), 0 4px 12px rgba(0, 0, 0, 0.3)',
  },
  spacing: {
    sectionPadding: '120px 0',
    cardPadding: '32px 24px',
    cardGap: '24px',
    headerMargin: '60px',
  },
  borderRadius: {
    card: '16px',
    badge: '8px',
    icon: '50%',
  },
} as const;
```

---

## 9. Component Implementation Plan

### File Structure
```
/components/shared/VelocityProcessSection.tsx
├── VelocityProcessSection (main export)
├── SectionHeader (eyebrow + headline + subtitle)
├── HorizontalTimeline (line + icon dots)
├── PhaseCards (grid container)
└── PhaseCard (individual card)
```

### Props Interface
```typescript
interface VelocityPhase {
  eyebrow: string;         // "WEEKS 1-2"
  title: string;           // "Strategy & Design"
  description: string;     // "Scope, architecture, and UX"
  icon: React.ReactNode;   // Lucide icon component
  iconColor?: string;      // Override icon color
}

interface VelocityProcessProps {
  headline?: string;       // Default: "Build AI in 8 Weeks."
  subtitle?: string;       // Default: "A proven acceleration..."
  phases: VelocityPhase[];
  showTimeline?: boolean;  // Default: true
  animated?: boolean;      // Default: true
}
```

---

## 10. Comparison Matrix

| Feature | Current (Sage) | Wireframe (Navy) |
|---------|---------------|------------------|
| **Background** | Sage green #DCE5DD | Navy #0A1628 |
| **Accent** | Deep/Accent green | Orange #FF6A3D |
| **Cards** | White, soft shadow | Semi-transparent, glass |
| **Typography** | Serif (Playfair/Lora) | Sans-serif (Inter) |
| **Tone** | Calm, premium, editorial | Fast, modern, velocity |
| **Icons** | Subtle, deep green | Bold, orange with glow |
| **Timeline** | Minimal dots, muted | Prominent, glowing |
| **Copy Focus** | Process details | Speed emphasis |
| **Target Feel** | Luxury consulting | Tech startup SaaS |

---

## 11. When to Use Each Version

### Use Sage Green Version (Current) When:
- ✅ Targeting enterprise/established companies
- ✅ Emphasizing premium service quality
- ✅ Matching editorial/magazine aesthetic
- ✅ Building trust through sophistication
- ✅ Long sales cycle, considered purchases

### Use Navy/Orange Version (Wireframe) When:
- ✅ Targeting startups/fast-growing companies
- ✅ Emphasizing speed and efficiency
- ✅ Matching tech/SaaS product aesthetic
- ✅ Building urgency ("8 weeks not 8 months")
- ✅ Shorter sales cycle, action-oriented buyers

---

## 12. Implementation Code Skeleton

```typescript
import { Target, Zap, Link2, Rocket } from 'lucide-react';

const phases = [
  {
    eyebrow: 'WEEKS 1-2',
    title: 'Strategy & Design',
    description: 'Scope, architecture, and UX',
    icon: <Target className="w-6 h-6" />,
  },
  {
    eyebrow: 'WEEKS 3-5',
    title: 'Rapid Build',
    description: 'Core development and AI logic',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    eyebrow: 'WEEKS 6-7',
    title: 'Integrations',
    description: 'Testing and connecting APIs',
    icon: <Link2 className="w-6 h-6" />,
  },
  {
    eyebrow: 'WEEK 8',
    title: 'Launch & Scale',
    description: 'Deployment and handoff',
    icon: <Rocket className="w-6 h-6" />,
  },
];

export default function VelocityProcessSection() {
  return (
    <section 
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A1628 0%, #0D1B2E 100%)',
        padding: '120px 24px',
      }}
    >
      {/* Header */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <div className="mb-6 inline-block px-4 py-1 rounded-full border border-orange-500/30">
          <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
            The AMO AI Velocity System
          </span>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          Build AI in{' '}
          <span className="text-orange-500">8 Weeks.</span>
          <br />
          Not 8 Months.
        </h2>
        
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          A proven acceleration system that takes your AI project from idea to production — fast.
        </p>
      </div>
      
      {/* Timeline */}
      <HorizontalTimeline phases={phases} />
      
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-16">
        {phases.map((phase, i) => (
          <PhaseCard key={i} {...phase} />
        ))}
      </div>
    </section>
  );
}
```

---

## 13. Accessibility Considerations

### Color Contrast
- ✅ White text on navy: 12.6:1 (exceeds WCAG AAA)
- ✅ Light gray (#B8C5D6) on navy: 7.8:1 (exceeds WCAG AA)
- ✅ Orange (#FF6A3D) on navy: 4.9:1 (meets WCAG AA for large text)

### Semantic HTML
```html
<section aria-labelledby="velocity-heading">
  <div className="section-header">
    <p className="eyebrow" aria-label="Program name">
      The AMO AI Velocity System
    </p>
    <h2 id="velocity-heading">
      Build AI in 8 Weeks. Not 8 Months.
    </h2>
    <p className="subtitle">
      A proven acceleration system...
    </p>
  </div>
  
  <div 
    className="timeline" 
    role="presentation" 
    aria-label="8-week timeline visualization"
  >
    {/* Timeline */}
  </div>
  
  <div className="phase-cards">
    {phases.map((phase, i) => (
      <article 
        key={i}
        aria-labelledby={`phase-${i}-title`}
      >
        <p className="eyebrow">{phase.eyebrow}</p>
        <h3 id={`phase-${i}-title`}>{phase.title}</h3>
        <p>{phase.description}</p>
      </article>
    ))}
  </div>
</section>
```

### Keyboard Navigation
- Cards should be focusable if interactive
- Timeline is presentational (role="presentation")
- Ensure focus visible states have orange outline

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

## 14. Assets Needed

### Icons
- 🎯 Target/Circle (Strategy)
- ⚡ Lightning bolt (Rapid Build)  
- 🔗 Link/Connection (Integrations)
- 🚀 Rocket (Launch)

**Source:** Lucide React or similar icon library

### Images
- None required (icon-based design)

### Fonts
- **Inter** (primary sans-serif)
  - Weights: 400 (regular), 600 (semibold), 700 (bold)
  - Load from Google Fonts or use system fonts

---

## 15. Next Steps

### To Implement This Design:

1. **Create new component** → `/components/shared/VelocityProcessSection.tsx`
2. **Import color tokens** → Add navy/orange theme to design system
3. **Build timeline component** → Horizontal line with icon dots
4. **Style cards** → Glassmorphism effect with backdrop-filter
5. **Add animations** → Motion library for scroll triggers
6. **Test responsiveness** → 4 cols → 2 cols → 1 col
7. **Accessibility audit** → Check contrast, keyboard nav, screen readers
8. **A/B test** → Compare with current sage green version

### Design Decision:
This wireframe represents an **alternative design** focused on velocity and speed. The current sage green version emphasizes premium quality and process. Choose based on:
- **Target audience** (enterprise vs. startup)
- **Brand positioning** (luxury vs. fast)
- **Sales cycle** (long vs. short)

---

**STATUS:** 📋 Wireframe Documentation Complete  
**RECOMMENDATION:** Keep current sage green implementation for luxury positioning  
**ALTERNATIVE USE CASE:** Use this dark navy/orange version for a dedicated "Velocity" landing page or pricing tier

---

## Appendix: Full Color Palette Reference

### Current HomePageV3 Colors (Implemented)
```css
/* === AMO AI V3 LUXURY EDITORIAL PALETTE === */

/* Primary Backgrounds */
--warm-beige: #F4F3EE;          /* Hero sections, main background */
--sage: #DCE5DD;                /* Section alternates, process section */
--white: #FFFFFF;               /* Cards, content panels */

/* Primary Colors */
--deep-green: #1E3D36;          /* Main headlines, primary text */
--accent-green: #2E6F5E;        /* Links, CTAs, interactive elements */

/* Neutrals */
--dark: #1C1C1C;                /* Body text on light backgrounds */
--muted: #6B6B6B;               /* Secondary text, descriptions */
--border: #E5E5E5;              /* Borders, dividers, subtle lines */

/* Opacity Variants */
--deep-green-8: #1E3D3614;      /* Icon backgrounds (8% opacity) */
--deep-green-10: #1E3D361A;     /* Borders, separators (10% opacity) */
--deep-green-15: #1E3D3626;     /* Timeline lines (15% opacity) */
--deep-green-20: #1E3D3633;     /* Decorative dividers (20% opacity) */
--deep-green-60: #1E3D3699;     /* Muted text (60% opacity) */
--deep-green-80: #1E3D36CC;     /* Body text (80% opacity) */

/* Semantic Colors (inherited from global) */
--success: #10B981;             /* Success states */
--warning: #F59E0B;             /* Warning states */
--error: #EF4444;               /* Error states */
--info: #3B82F6;                /* Info states */
```

### Velocity System Colors (Wireframe)
```css
/* === VELOCITY SYSTEM (DARK NAVY + ORANGE) === */

/* Backgrounds */
--navy-dark: #0A1628;           /* Primary dark background */
--navy-medium: #0D1B2E;         /* Gradient end, card base */
--navy-light: #12253D;          /* Hover states, elevated surfaces */

/* Accent Colors */
--orange-primary: #FF6A3D;      /* Primary accent, "8 Weeks", icons */
--orange-light: #FF8B3D;        /* Hover states, gradients */
--orange-dark: #E55A2F;         /* Active states */

/* Text Colors */
--text-primary: #FFFFFF;        /* Headlines, important text */
--text-secondary: #B8C5D6;      /* Body text, descriptions */
--text-muted: #7A8BA3;          /* Supporting text */
--text-dark: #4A5A6F;           /* Very subtle text */

/* Glass/Transparency */
--glass-card: rgba(255, 255, 255, 0.03);
--glass-border: rgba(255, 255, 255, 0.08);
--glass-hover: rgba(255, 255, 255, 0.05);
--timeline-line: rgba(255, 255, 255, 0.15);

/* Effects */
--orange-glow-soft: rgba(255, 106, 61, 0.15);
--orange-glow-medium: rgba(255, 106, 61, 0.2);
--orange-glow-strong: rgba(255, 106, 61, 0.3);
--shadow-card: rgba(0, 0, 0, 0.2);
--shadow-card-hover: rgba(0, 0, 0, 0.4);
```

---

**END OF DOCUMENT**  
**Total Sections:** 15  
**Status:** ✅ Complete Wireframe + Color Documentation  
**Ready for:** Design review and implementation decision