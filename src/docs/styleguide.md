# AMO AI — Quick Style Guide

**Design System:** Premium luxury consultancy  
**Source:** `/web-design` page  
**Full Documentation:** `/docs/style-guide-2.md`

---

## Colors

```jsx
Dark Forest:  #0E3E1B  // Hero, dark sections
Off-White:    #FAF9F5  // Light sections, text on dark
Warm Beige:   #F1EEEA  // Alternating sections
Lime Accent:  #7EF473  // Highlights, AI badges
Orange CTA:   #FF6B4A  // Primary action buttons
```

---

## Typography

```jsx
// Headings (H1, H2, H3)
style={{ fontFamily: 'Georgia, serif' }}

// Body, buttons, UI
style={{ fontFamily: 'system-ui, -apple-system' }}
```

**Sizes:** 7xl–8xl (hero) → 6xl (sections) → 2xl (cards)  
**Do NOT use Tailwind font classes** — Let CSS defaults handle it

---

## Card Pattern

```jsx
<div className="bg-white/60 backdrop-blur-sm border border-[#0E3E1B]/10 rounded-2xl p-8 hover:-translate-y-1 hover:border-[#7EF473]/50 transition-all duration-300 shadow-sm">
  {/* Glassmorphism card */}
</div>
```

**Dark variant:** `bg-white/5 backdrop-blur-md border-white/10`

---

## Buttons

```jsx
// Primary (Lime)
<button className="bg-[#7EF473] text-[#0E3E1B] px-8 py-4 rounded-full font-semibold hover:bg-[#6DE362] hover:shadow-lg hover:shadow-[#7EF473]/30 transition-all duration-300">

// Ghost (Outline)
<button className="border-2 border-[#FAF9F5]/20 text-[#FAF9F5] px-8 py-4 rounded-full font-semibold hover:bg-white/5 hover:border-[#FAF9F5]/40 transition-all duration-300">

// CTA (Orange - use sparingly)
<button className="bg-[#FF6B4A] text-white px-12 py-5 rounded-full font-semibold hover:bg-[#E85A3A] hover:shadow-2xl hover:shadow-[#FF6B4A]/30 transition-all duration-300">
```

---

## Layout

```jsx
// Container
<div className="max-w-[1200px] mx-auto px-6 lg:px-8">

// Section padding
<section className="py-24 lg:py-32">

// Two-column (hero)
<div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12">

// Three-column
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

---

## Animations

```jsx
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: '-100px' });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
  transition={{ duration: 0.8 }}
>
```

**Stagger delays:** `delay: 0.2 + index * 0.1`

---

## Section Backgrounds

Alternate for visual rhythm:

1. Hero → **Dark** (`#0E3E1B`)
2. Problem → **Light** (`#FAF9F5`)
3. How It Works → **Beige** (`#F1EEEA`)
4. Features → **Light** (`#FAF9F5`)
5. Integrations → **Dark** (`#0E3E1B`)
6. Results → **Light** (`#FAF9F5`)
7. Services Grid → **Beige** (`#F1EEEA`)
8. CTA → **Dark** (`#0E3E1B`)

---

## Eyebrow Labels

```jsx
<span className="text-xs uppercase tracking-[0.2em] text-[#7EF473] font-semibold" 
      style={{ fontFamily: 'system-ui, -apple-system' }}>
  SECTION NAME
</span>
```

---

## AI Badge

```jsx
<div className="bg-[#7EF473] text-[#0E3E1B] px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
  <Sparkles className="w-3 h-3" />
  AI
</div>
```

---

## Big Stat Display

```jsx
<div className="text-6xl lg:text-7xl text-[#7EF473] font-bold mb-3"
     style={{ fontFamily: 'Georgia, serif' }}>
  3x
</div>
<div className="text-[#0E3E1B]/70 text-lg"
     style={{ fontFamily: 'system-ui, -apple-system' }}>
  pipeline velocity increase
</div>
```

---

## Icons

**Library:** `lucide-react`

```jsx
import { ArrowRight, Sparkles, Target } from 'lucide-react';

<Target className="w-6 h-6 text-[#0E3E1B]" strokeWidth={1.5} />
```

---

## Common Patterns

### Emphasized Card (Lime Left Border)

```jsx
className="border-l-4 border-l-[#7EF473] border-t border-r border-b border-[#0E3E1B]/10"
```

### Hover Effects

```jsx
hover:-translate-y-1 hover:border-[#7EF473]/50 transition-all duration-300
```

### Responsive Text

```jsx
className="text-4xl lg:text-6xl xl:text-7xl"
```

---

## Page Structure (8 Sections)

1. **Hero (Dark)** — 55/45 split, headline + CTA + mockup
2. **Problem (Light)** — 60/40 split, copy + stats
3. **How It Works (Beige)** — Process + diagram + step cards
4. **Capabilities (Light)** — 3x2 or 4-col feature grid
5. **Integrations (Dark)** — Hub diagram + logo strip
6. **Results (Light)** — Big stats + testimonial
7. **Services Grid (Beige)** — AIServicesGrid component
8. **CTA (Dark)** — Final conversion

---

## Quick Checklist

- [ ] Backgrounds alternate (dark → light → beige)
- [ ] Headings use Georgia serif
- [ ] Cards use glassmorphism (bg-white/60 + backdrop-blur)
- [ ] Rounded corners are 2xl (16px)
- [ ] Hover states translate up and shift to lime
- [ ] Motion animations use useInView
- [ ] Visual diagrams included (not just text)
- [ ] Mobile: grids stack, horizontal flows go vertical

---

## Don't Do This ❌

```jsx
// Flat cards
<div className="bg-white border-gray-200 rounded-lg">

// All caps headings
<h2 className="uppercase">

// Sharp corners
className="rounded-md"

// Generic colors
className="bg-blue-500"
```

## Do This Instead ✅

```jsx
// Glassmorphism
<div className="bg-white/60 backdrop-blur-sm border-[#0E3E1B]/10 rounded-2xl">

// Sentence case serif
<h2 style={{ fontFamily: 'Georgia, serif' }}>

// Generous rounding
className="rounded-2xl"

// Brand colors
className="bg-[#7EF473]"
```

---

**Full docs:** `/docs/style-guide-2.md`  
**Template:** `/docs/pages/10-template.md`  
**Examples:** `/web-design`, `/services/ai-agents`, `/web-apps`, `/services/crm`
