# AMO AI — Official Style Guide v2.0

**Last Updated:** 2026-02-28  
**Design System Source:** `/web-design` page  
**Status:** Official brand standards for all service pages

---

## 1. DESIGN PHILOSOPHY

AMO AI uses a **premium luxury design system** that positions us as a high-end technology consultancy. We favor:

- **Rounded corners** over sharp edges
- **Soft shadows** over flat design
- **Beige/warm neutrals** over stark white
- **Glassmorphism** over solid blocks
- **Georgia serif headings** over sans-serif everywhere
- **Cinematic spacing** over cramped layouts

This is NOT a SaaS product interface. This is a **consultancy brand** that sells expertise, strategy, and implementation.

---

## 2. COLOR PALETTE

### Primary Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Dark Forest** | `#0E3E1B` | Hero backgrounds, dark sections, CTAs |
| **Off-White** | `#FAF9F5` | Light section backgrounds, text on dark |
| **Warm Beige** | `#F1EEEA` | Alternating section backgrounds |
| **Lime Accent** | `#7EF473` | Highlights, badges, AI indicators, hover states |
| **Orange CTA** | `#FF6B4A` | Primary call-to-action buttons (sparingly) |

### Secondary/Utility Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Text Primary** | `#0E3E1B` | Body text on light backgrounds |
| **Text Secondary** | `#0E3E1B/70` (70% opacity) | Descriptions, captions |
| **Text Tertiary** | `#0E3E1B/60` (60% opacity) | Metadata, timestamps |
| **White Text** | `#FAF9F5` | Text on dark backgrounds |
| **White Text Muted** | `#FAF9F5/80` (80% opacity) | Secondary text on dark |

### Glassmorphism Overlays

- **Light glass:** `bg-white/60` + `backdrop-blur-sm` + `border border-[#0E3E1B]/10`
- **Dark glass:** `bg-white/5` + `backdrop-blur-md` + `border border-white/10`

---

## 3. TYPOGRAPHY

### Font Families

```css
/* Headings (H1, H2, H3, Display text) */
font-family: Georgia, serif;

/* Body, UI, Buttons, Labels */
font-family: system-ui, -apple-system, sans-serif;
```

### Type Scale

| Element | Desktop Size | Mobile Size | Line Height | Weight |
|---------|--------------|-------------|-------------|--------|
| **H1 (Hero)** | 7xl–8xl (72–96px) | 5xl (48px) | 1.1 | Normal |
| **H2 (Section)** | 6xl (60px) | 4xl (36px) | 1.2 | Normal |
| **H3 (Card Title)** | 2xl (24px) | xl (20px) | 1.3 | Normal |
| **Body Large** | xl (20px) | lg (18px) | 1.6 | Normal |
| **Body Standard** | base–lg (16–18px) | base (16px) | 1.6 | Normal |
| **Body Small** | sm (14px) | sm (14px) | 1.5 | Normal |
| **Eyebrow** | xs (12px) | xs (12px) | 1 | Bold |

### Eyebrow Style (Section Labels)

```jsx
<span className="text-xs uppercase tracking-[0.2em] text-[#7EF473] font-semibold" 
      style={{ fontFamily: 'system-ui, -apple-system' }}>
  SECTION NAME
</span>
```

### Do NOT use Tailwind font classes

- ❌ Do NOT use: `text-2xl`, `font-bold`, `leading-tight`
- ✅ Use inline styles for font-family ONLY
- ✅ Let CSS defaults handle sizing unless user requests changes

---

## 4. LAYOUT SYSTEM

### Container Widths

```jsx
// Standard page container
<div className="max-w-[1200px] mx-auto px-6 lg:px-8">
```

### Section Padding

```jsx
// Standard section spacing
<section className="py-24 lg:py-32">
  // Desktop: 128px (32 × 4)
  // Mobile: 96px (24 × 4)
</section>
```

### Grid Systems

```jsx
// Two-column split (common for hero sections)
<div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12">

// Equal three-column
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// Four-column (capabilities, features)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

---

## 5. COMPONENT PATTERNS

### Card — Glassmorphism Style

```jsx
<div className="bg-white/60 backdrop-blur-sm border border-[#0E3E1B]/10 rounded-2xl p-8 hover:-translate-y-1 hover:border-[#7EF473]/50 transition-all duration-300 shadow-sm">
  {/* Card content */}
</div>
```

**Dark variant:**

```jsx
<div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-[#7EF473]/50 transition-all">
  {/* Card content */}
</div>
```

### Card — Emphasized (Lime Left Border)

```jsx
<div className="bg-white/60 backdrop-blur-sm border-l-4 border-l-[#7EF473] border-t border-r border-b border-[#0E3E1B]/10 rounded-2xl p-8 shadow-lg">
  {/* Highlighted content */}
</div>
```

### Buttons

**Primary (Lime):**

```jsx
<button className="bg-[#7EF473] text-[#0E3E1B] px-8 py-4 rounded-full font-semibold hover:bg-[#6DE362] hover:shadow-lg hover:shadow-[#7EF473]/30 transition-all duration-300 flex items-center gap-2">
  Button Text
  <ArrowRight className="w-5 h-5" />
</button>
```

**Secondary (Ghost/Outline):**

```jsx
<button className="border-2 border-[#FAF9F5]/20 text-[#FAF9F5] px-8 py-4 rounded-full font-semibold hover:bg-white/5 hover:border-[#FAF9F5]/40 transition-all duration-300 backdrop-blur-sm">
  Button Text
</button>
```

**CTA (Orange — Use sparingly):**

```jsx
<button className="bg-[#FF6B4A] text-white px-12 py-5 rounded-full font-semibold hover:bg-[#E85A3A] hover:shadow-2xl hover:shadow-[#FF6B4A]/30 transition-all duration-300">
  Book a Call
  <ArrowRight className="w-5 h-5" />
</button>
```

### AI Badge / Score Indicator

```jsx
<div className="bg-[#7EF473] text-[#0E3E1B] px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
  <Sparkles className="w-3 h-3" />
  AI
</div>
```

### Stat Display (Large Number + Label)

```jsx
<div className="text-center">
  <div className="text-6xl lg:text-7xl text-[#7EF473] font-bold mb-3"
       style={{ fontFamily: 'Georgia, serif' }}>
    3x
  </div>
  <div className="text-[#0E3E1B]/70 text-lg"
       style={{ fontFamily: 'system-ui, -apple-system' }}>
    pipeline velocity increase
  </div>
</div>
```

---

## 6. ANIMATION PATTERNS

### Import Motion

```jsx
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
```

### Standard Fade + Slide Up

```jsx
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: '-100px' });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
  transition={{ duration: 0.8 }}
>
  {/* Content */}
</motion.div>
```

### Staggered Grid Items

```jsx
{items.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 40 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
  >
    {/* Item content */}
  </motion.div>
))}
```

### Hover Interactions

```jsx
// Standard card hover
hover:-translate-y-1 hover:border-[#7EF473]/50 transition-all duration-300

// Button hover with scale
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.98 }}
```

---

## 7. SECTION BACKGROUND ALTERNATION

Follow this pattern for visual rhythm:

1. **Hero** → Dark (`#0E3E1B`)
2. **Problem/Intro** → Off-white (`#FAF9F5`)
3. **How It Works** → Warm beige (`#F1EEEA`)
4. **Features/Capabilities** → Off-white (`#FAF9F5`)
5. **Integrations/Technical** → Dark (`#0E3E1B`)
6. **Results/Proof** → Off-white (`#FAF9F5`)
7. **Services Grid** → Warm beige (`#F1EEEA`)
8. **CTA** → Dark (`#0E3E1B`)

**Rule:** Never stack two dark or two light sections without a contrasting section between them.

---

## 8. RESPONSIVE BREAKPOINTS

```jsx
// Tailwind breakpoints used
sm:  640px   // Small tablets
md:  768px   // Tablets
lg:  1024px  // Small laptops
xl:  1280px  // Desktops
2xl: 1536px  // Large screens
```

### Common Responsive Patterns

```jsx
// Text sizing
className="text-4xl lg:text-6xl xl:text-7xl"

// Grid columns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Padding
className="px-6 lg:px-8 py-24 lg:py-32"

// Visibility
className="hidden lg:block"  // Hide on mobile, show on desktop
className="lg:hidden"         // Show on mobile, hide on desktop
```

---

## 9. ICONS

**Library:** `lucide-react`

```jsx
import { ArrowRight, Sparkles, Target, Send } from 'lucide-react';

// Standard icon size in cards/buttons
<Target className="w-6 h-6 text-[#0E3E1B]" strokeWidth={1.5} />

// Small icon (badges, inline)
<Sparkles className="w-4 h-4 text-[#7EF473]" />
```

**Common icons by context:**
- **AI features:** `Sparkles`, `Brain`, `Zap`
- **Actions:** `ArrowRight`, `Send`, `CheckCircle`
- **Data/Analytics:** `BarChart3`, `TrendingUp`, `Target`
- **Communication:** `Mail`, `MessageSquare`, `Calendar`
- **Structure:** `Database`, `Layers`, `GitBranch`

---

## 10. COMPONENT NAMING CONVENTION

Every component must follow this pattern:

```
ComponentName.tsx

Example:
- SalesCRMHero.tsx
- SalesProblem.tsx
- KeyCapabilities.tsx
```

**Component numbering in documentation:**
- Component 01 — Hero
- Component 02 — Problem Statement
- Component 03 — How It Works
- Component 04 — Capabilities
- Component 05 — Integrations
- Component 06 — Results
- Component 07 — Services Grid (reusable)
- Component 08 — CTA

---

## 11. VISUAL MOCKUPS & DIAGRAMS

### Dashboard/UI Mockups

Use **glassmorphism frames** with realistic data:

```jsx
<div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
  {/* Dashboard header */}
  <div className="flex items-center justify-between mb-6">
    <h3>Pipeline Dashboard</h3>
    <div className="flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-[#7EF473]" />
      <span className="text-xs text-[#7EF473]">AI Active</span>
    </div>
  </div>
  
  {/* Mock content: cards, columns, data */}
</div>
```

### Flow Diagrams

Use horizontal flow for desktop, vertical for mobile:

```jsx
// Desktop
<div className="hidden lg:flex items-center gap-2">
  {stages.map((stage, index) => (
    <>
      <div className="px-4 py-3 rounded-xl bg-white/80">
        {stage}
      </div>
      {index < stages.length - 1 && (
        <ChevronRight className="w-5 h-5 text-[#0E3E1B]/30" />
      )}
    </>
  ))}
</div>

// Mobile
<div className="lg:hidden space-y-3">
  {stages.map((stage, index) => (
    <div className="flex items-center gap-3">
      <div className="text-xs w-6">{index + 1}</div>
      <div className="flex-1 px-4 py-3 rounded-xl bg-white/80">
        {stage}
      </div>
    </div>
  ))}
</div>
```

### Integration Hub Diagrams

Use **radial layout** on desktop (center node + orbiting satellites) with connecting lines:

```jsx
// Center hub
<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  <div className="bg-[#7EF473] rounded-2xl p-8">
    CRM
  </div>
</div>

// Orbiting nodes with connection lines (SVG)
```

For mobile, convert to **stacked cards** without the radial layout.

---

## 12. CONTENT TONE & VOICE

### Writing Style

- **Direct:** No fluff. Get to the outcome.
- **Confident:** We know what we're doing.
- **Outcome-driven:** Focus on business results, not features.
- **Technical but accessible:** Use proper terms, but explain value.

### Avoid

- ❌ "Cutting-edge" / "Revolutionary" / "Game-changing"
- ❌ Excessive exclamation marks
- ❌ Marketing buzzwords without substance
- ❌ Passive voice ("can be done" → "we do")

### Use

- ✅ Specific numbers: "3x pipeline velocity", "90 days", "15 hrs/week saved"
- ✅ Active verbs: "Capture. Score. Engage. Close."
- ✅ Questions that resonate: "Your Pipeline Is Leaking and Nobody Knows Where"
- ✅ Strong statements: "Built for Revenue, Not Record-Keeping"

---

## 13. PAGE STRUCTURE TEMPLATE

Standard service page follows this 8-section structure:

1. **Hero (Dark)** — Headline + Subhead + CTAs + Visual mockup (55/45 split)
2. **Problem (Light)** — Problem statement + Stats (60/40 split)
3. **How It Works (Beige)** — Process overview + Flow diagram + Step cards
4. **Capabilities (Light)** — Feature grid (3x2 or 4 column)
5. **Integrations (Dark)** — Integration hub diagram + Logo strip
6. **Results (Light)** — Big stats + Testimonial
7. **Services Grid (Beige)** — Reusable AIServicesGrid component
8. **CTA (Dark)** — Final conversion point

**Every section:**
- Has an **Eyebrow** label (uppercase, lime green, 0.2em tracking)
- Has an **H2 headline** (Georgia serif, 4xl–6xl)
- Has **body copy** explaining value (system-ui, 70% opacity)
- Has **motion animations** on scroll (useInView)

---

## 14. IMAGES & ASSETS

### Unsplash Images

Use `unsplash_tool` for relevant stock photography:

```jsx
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback 
  src="https://images.unsplash.com/photo-..."
  alt="Descriptive alt text"
  className="w-full h-full object-cover rounded-2xl"
/>
```

### SVG Icons & Illustrations

- Use **lucide-react** for UI icons
- Create custom SVG diagrams inline for architecture/flow
- Keep stroke width at `1.5` for consistency

### Figma Imports

```jsx
// SVGs from Figma
import svgPaths from "./imports/svg-wg56ef214f";

// Raster images from Figma
import img from "figma:asset/abc123.png";
```

---

## 15. ACCESSIBILITY

### Color Contrast

All text must meet **WCAG AA standards**:
- Dark text on light backgrounds: `#0E3E1B` on `#FAF9F5` ✅
- Light text on dark backgrounds: `#FAF9F5` on `#0E3E1B` ✅
- Lime accent only for highlights, not body text

### Semantic HTML

```jsx
// Correct heading hierarchy
<h1> → Hero only
<h2> → Section headings
<h3> → Card titles, subsections

// Button vs Link
<button> → For actions (open modal, submit form)
<a> → For navigation (route changes)
```

### Motion Preferences

```jsx
// Respect prefers-reduced-motion (handled by Motion library)
// All animations use useInView with once: true (won't repeat)
```

---

## 16. COMMON MISTAKES TO AVOID

### ❌ Don't Do This

```jsx
// Using SaaS-style flat cards
<div className="bg-white border border-gray-200 rounded-lg p-4">

// All caps headings
<h2 className="uppercase">OUR SERVICES</h2>

// Bright primary colors everywhere
<button className="bg-blue-500">Click Me</button>

// Sharp corners
className="rounded-md"

// No animation
<div>Content</div>
```

### ✅ Do This Instead

```jsx
// Glassmorphism cards with depth
<div className="bg-white/60 backdrop-blur-sm border border-[#0E3E1B]/10 rounded-2xl p-8 shadow-sm">

// Sentence case with serif
<h2 style={{ fontFamily: 'Georgia, serif' }}>Our Services</h2>

// Brand colors
<button className="bg-[#7EF473] text-[#0E3E1B] rounded-full">

// Generous rounding
className="rounded-2xl"

// Smooth entrance animations
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
```

---

## 17. CHECKLIST FOR NEW SERVICE PAGES

Before publishing a new service page, verify:

- [ ] All 8 sections present and in correct order
- [ ] Background colors alternate correctly (dark → light → beige)
- [ ] All headings use Georgia serif
- [ ] All body text uses system-ui
- [ ] Eyebrows are uppercase, lime green, 0.2em tracking
- [ ] Cards use glassmorphism (bg-white/60 + backdrop-blur)
- [ ] All cards have rounded-2xl corners
- [ ] Hover states translate-y-1 and shift border to lime
- [ ] Motion animations use useInView with once: true
- [ ] Visual mockups or diagrams are included (not just text)
- [ ] Mobile responsiveness tested (grid → stack, horizontal → vertical)
- [ ] CTAs use correct colors (lime primary, orange final CTA)
- [ ] Component files follow naming convention
- [ ] All components numbered in documentation
- [ ] Routes added to `/routes.tsx`
- [ ] Page added to AIServicesGrid navigation

---

## 18. RELATED DOCUMENTATION

- **Template:** `/docs/pages/10-template.md` — Step-by-step guide for creating new pages
- **Components:** `/components/web-design/*` — Reusable design system components
- **Style Guide:** `/style-guide/*` — Additional component library (if available)
- **Examples:**
  - `/web-design` — Original design system reference
  - `/mvp-v2` — MVP Builder service page
  - `/services/ai-agents` — AI Agents service page
  - `/web-apps` — AI Web Apps service page
  - `/services/crm` — AI Sales CRM service page

---

## 19. VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2026-02-28 | Comprehensive documentation of web-design design system |
| 1.0 | Earlier | Initial style guide (deprecated) |

---

## 20. CONTACT & QUESTIONS

For questions about this style guide or design system clarifications:
- Reference the `/web-design` page as the source of truth
- Check `/docs/pages/10-template.md` for implementation guidance
- Review existing service pages for consistent patterns

**This is a living document.** Update as design patterns evolve.

---

**End of Style Guide v2.0**
