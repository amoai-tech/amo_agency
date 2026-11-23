# AMO AI V11 Style Guide — Calm Luxury Editorial

**Design Philosophy:** Premium editorial aesthetic. No clutter, no shadows, no rounded buttons. Strong typography, structured borders, generous whitespace.

**Version:** 11 (Calm Luxury Editorial)  
**Last Updated:** 2026-01-08  
**Status:** Active design system for all V11 pages

---

## 1. Color Palette

### Primary Colors
```css
--bg-primary: #FDFCFB      /* Warm off-white background */
--bg-surface: #FFFFFF      /* Cards, elevated surfaces */
--bg-alt: #FAF8F6          /* Alternate section background */
--text-primary: #1A1A1A    /* Headings, primary text */
--text-secondary: #666666  /* Body text, descriptions */
--text-tertiary: #999999   /* Labels, metadata */
```

### Accent & Borders
```css
--accent-amber: #F59E0B    /* CTAs, progress, highlights */
--accent-light: #FCD34D    /* Hover states, secondary accents */
--accent-subtle: #FFF7ED   /* Amber tint backgrounds */
--border-primary: #EFE9E4  /* Cards, dividers */
--border-input: #D1C7BD    /* Form fields, hover states */
```

### Dark Sections
```css
--bg-dark: #1A1A1A         /* Footer, CTA backgrounds */
--bg-dark-alt: #2D2D2D     /* Subtle dark gradients */
--text-on-dark: #FFFFFF    /* Text on dark backgrounds */
--text-on-dark-muted: #E5E5E5  /* Secondary text on dark */
```

### Usage Guidelines

**Background Hierarchy:**
- **Level 1 (Page):** `#FDFCFB` - Default page background
- **Level 2 (Cards):** `#FFFFFF` - Elevated content areas
- **Level 3 (Input):** `#FAF8F6` - Form fields, icon containers

**Text Hierarchy:**
- **Headlines:** `#1A1A1A` - Maximum contrast
- **Body Copy:** `#666666` - Comfortable reading
- **Metadata:** `#999999` - Supporting information

**Accent Usage:**
- **Primary Actions:** `#F59E0B` - Main CTAs, active states
- **Hover States:** `#FCD34D` - Lighter amber on interaction
- **Backgrounds:** `#FFF7ED` - Subtle highlights (5% opacity)

---

## 2. Typography

### Font Stack

#### Primary Fonts
```css
/* Sans-Serif (UI, Body) */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Serif (Display, Headlines) */
font-family: 'Playfair Display', Georgia, serif;

/* Serif (Narrative, Long-form) */
font-family: 'Lora', Georgia, serif;
```

#### Font Loading
```html
<!-- Google Fonts Import (in globals.css) -->
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
```

### Type Scale

| Element | Size (Mobile) | Size (Desktop) | Weight | Line Height | Font | Usage |
|---------|---------------|----------------|--------|-------------|------|-------|
| **H1** | 36-48px | 60-72px | 700 | 1.1 | Playfair | Page titles |
| **H2** | 28-36px | 48-60px | 600 | 1.2 | Playfair | Section headers |
| **H3** | 24-28px | 32-36px | 600 | 1.3 | Inter | Subsections |
| **H4** | 20-24px | 24-28px | 600 | 1.4 | Inter | Card titles |
| **Body XL** | 18px | 20-24px | 300 | 1.6 | Lora | Intro paragraphs |
| **Body Large** | 16px | 18-20px | 400 | 1.6 | Inter | Feature descriptions |
| **Body** | 15px | 16px | 400 | 1.6 | Inter | Standard text |
| **Small** | 14px | 14px | 400 | 1.5 | Inter | Secondary text |
| **Label** | 10-12px | 10-12px | 700 | 1.4 | Inter | Uppercase labels |

### Text Styles Reference

#### Headings
```tsx
// H1 - Page Title (Playfair Display)
className="text-5xl lg:text-7xl font-bold text-[#1A1A1A] tracking-tight"
style={{ fontFamily: 'Playfair Display, serif' }}

// H2 - Section Header (Playfair Display)
className="text-4xl lg:text-5xl font-semibold text-[#1A1A1A] tracking-tight"
style={{ fontFamily: 'Playfair Display, serif' }}

// H3 - Subsection (Inter)
className="text-2xl lg:text-3xl font-semibold text-[#1A1A1A]"
```

#### Body Text
```tsx
// Body XL - Intro Paragraph (Lora)
className="text-lg lg:text-xl text-[#666666] leading-relaxed"
style={{ fontFamily: 'Georgia, serif' }}

// Body - Standard Text (Inter)
className="text-base text-[#666666] leading-relaxed"

// Small - Secondary Text
className="text-sm text-[#999999]"
```

#### Labels
```tsx
// Eyebrow Label
className="text-xs uppercase tracking-widest text-[#999999] font-bold"

// Accent Label
className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold"
```

### Typography Best Practices

**✅ DO:**
- Use Playfair Display for all major headings (H1, H2)
- Use Inter for UI elements, body text, and labels
- Use Lora for narrative intro paragraphs
- Maintain generous line-height (1.6 for body)
- Apply `tracking-tight` to large headings
- Apply `tracking-widest` to uppercase labels

**❌ DON'T:**
- Mix too many font families (stick to 2-3)
- Use font sizes smaller than 14px
- Apply heavy font weights (>700) to body text
- Ignore responsive scaling (mobile → desktop)
- Use script or decorative fonts

---

## 3. Layout System

### Container Widths

```tsx
// Full-width sections with max constraint
className="max-w-[1400px] mx-auto px-6 lg:px-16"

// Text-optimized reading width
className="max-w-3xl mx-auto"

// Form/focused work area
className="max-w-xl mx-auto"

// Wide content grid
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
```

### Spacing Scale

#### Vertical Rhythm (Sections)
```css
py-12     /* 48px - Mobile sections */
py-16     /* 64px - Tablet sections */
py-20     /* 80px - Desktop small sections */
py-24     /* 96px - Desktop standard sections */
py-32     /* 128px - Desktop large sections */
```

#### Horizontal Padding
```css
px-4      /* 16px - Mobile tight */
px-6      /* 24px - Mobile standard */
px-8      /* 32px - Tablet */
px-16     /* 64px - Desktop */
```

#### Block Spacing (Between Content)
```css
space-y-6   /* 24px - Tight content blocks */
space-y-8   /* 32px - Standard content blocks */
space-y-12  /* 48px - Section subsections */
space-y-16  /* 64px - Major content divisions */
space-y-24  /* 96px - Page-level separations */
```

#### Element Spacing (Within Blocks)
```css
gap-2     /* 8px - Tight inline elements */
gap-3     /* 12px - Pills, tags */
gap-4     /* 16px - Standard inline spacing */
gap-6     /* 24px - Card grids */
gap-8     /* 32px - Section grids */
gap-12    /* 48px - Major grid spacing */
```

### Grid Patterns

#### Standard Grids
```tsx
// 2-Column Layout (60/40 split)
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
  <div className="lg:col-span-7">{/* Content 60% */}</div>
  <div className="lg:col-span-5">{/* Sidebar 40% */}</div>
</div>

// 2-Column Equal
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

// 3-Column Service Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">

// 6-Column (Industries)
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12">
```

#### Responsive Breakpoints
```tsx
// Mobile-first approach
sm:   // 640px
md:   // 768px
lg:   // 1024px
xl:   // 1280px
2xl:  // 1536px
```

---

## 4. Components

### Buttons

#### Primary Button (Dark)
```tsx
<button className="bg-[#1A1A1A] text-white px-10 py-5 text-base font-semibold hover:bg-[#333] transition-colors">
  Primary Action
</button>

// Tailwind classes:
// bg-[#1A1A1A] text-white px-10 py-5 font-semibold hover:bg-[#333] transition-colors
```

#### Secondary Button (Outline)
```tsx
<button className="border border-[#1A1A1A] text-[#1A1A1A] px-10 py-5 text-base font-semibold hover:bg-[#1A1A1A] hover:text-white transition-colors">
  Secondary Action
</button>

// Tailwind classes:
// border border-[#1A1A1A] text-[#1A1A1A] px-10 py-5 font-semibold hover:bg-[#1A1A1A] hover:text-white transition-colors
```

#### Accent CTA Button
```tsx
<button className="bg-[#F59E0B] text-[#1A1A1A] px-10 py-5 text-base font-bold hover:bg-[#FCD34D] transition-all">
  Start Your Project
</button>

// Tailwind classes:
// bg-[#F59E0B] text-[#1A1A1A] px-10 py-5 font-bold hover:bg-[#FCD34D] transition-all
```

#### Button Sizing
```tsx
// Small
px-6 py-2.5 text-sm

// Medium (Default)
px-10 py-5 text-base

// Large
px-12 py-6 text-lg
```

### Cards

#### Standard Card
```tsx
<div className="p-8 md:p-12 border border-[#EFE9E4] bg-white">
  {/* Card content */}
</div>

// Hover state variation
<div className="p-8 border border-[#EFE9E4] bg-white hover:border-[#1A1A1A] transition-colors cursor-pointer">
```

#### Accent Card (Highlighted)
```tsx
<div className="p-8 border-2 border-[#F59E0B] bg-[#F59E0B]/5">
  {/* Featured content */}
</div>
```

#### Project Card (Screenshots)
```tsx
<div className="bg-white border border-[#EFE9E4] p-4 lg:p-6 hover:border-[#1A1A1A] transition-colors cursor-pointer">
  <img src="..." className="w-full aspect-video object-cover" />
  <p className="text-sm text-[#999999] mt-3">Caption text</p>
</div>
```

### Form Inputs

#### Text Input (Underline Style)
```tsx
<input
  type="text"
  className="w-full bg-transparent border-b border-[#D1C7BD] py-3 text-[#1A1A1A] focus:border-[#1A1A1A] outline-none transition-colors"
  placeholder="Enter your name"
/>
```

#### Text Input (Border Box)
```tsx
<input
  type="text"
  className="w-full border border-[#EFE9E4] px-4 py-3 text-[#1A1A1A] focus:border-[#1A1A1A] outline-none transition-colors"
  placeholder="Email address"
/>
```

#### Textarea
```tsx
<textarea
  className="w-full border border-[#D1C7BD] p-4 text-[#1A1A1A] focus:border-[#1A1A1A] outline-none resize-none min-h-[120px] transition-colors"
  placeholder="Tell us about your project..."
/>
```

#### Select Dropdown
```tsx
<select className="w-full border border-[#EFE9E4] px-4 py-3 text-[#1A1A1A] focus:border-[#1A1A1A] outline-none bg-white transition-colors">
  <option>Select an option</option>
</select>
```

### Navigation Pills/Tags

#### Industry Tag (Pill)
```tsx
<span className="px-4 py-2 border border-[#EFE9E4] text-xs uppercase tracking-widest text-[#999999]">
  SaaS
</span>
```

#### Navigation Tab (Active/Inactive)
```tsx
// Active
<button className="px-6 py-3 bg-[#1A1A1A] text-white whitespace-nowrap">
  StartupAI
</button>

// Inactive
<button className="px-6 py-3 border border-[#EFE9E4] text-[#666666] hover:border-[#1A1A1A] whitespace-nowrap transition-all">
  FashionOS
</button>
```

### Dividers

#### Section Divider
```tsx
<div className="border-t border-[#EFE9E4]" />

// Full-width with spacing
<div className="py-24 border-t border-gray-200">
```

#### Accent Divider (Hover Effect)
```tsx
<div className="w-full h-px bg-gray-200 group-hover:bg-orange-500 transition-colors" />
```

---

## 5. Animation Patterns

### Scroll Animations (Motion/React)

#### Basic Fade-In
```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  {/* Content */}
</motion.div>
```

#### Staggered Children
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

#### Slide In from Side
```tsx
// From Left
<motion.div
  initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.2 }}
>

// From Right
<motion.div
  initial={{ opacity: 0, x: 20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.3 }}
>
```

### Hover States

#### Button Hover
```css
transition-colors duration-200
hover:bg-[#333]
hover:text-white
```

#### Card Hover
```css
transition-colors duration-300
hover:border-[#1A1A1A]
```

#### Link Hover
```css
transition-colors duration-200
hover:text-[#F59E0B]
```

### Animation Principles
- **Duration:** 200-600ms (fast interactions to scroll reveals)
- **Easing:** `ease-out` for entrances, `ease-in` for exits
- **Viewport:** `viewport={{ once: true }}` - Animate only once on scroll
- **Stagger:** 0.1s delay between sequential items
- **Properties:** Prefer `opacity`, `transform`, avoid layout-shifting properties

---

## 6. Content Patterns

### Hero Section

#### Structure
```tsx
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 md:pt-40 md:pb-32">
  <div className="max-w-4xl">
    {/* Eyebrow */}
    <p className="text-xs font-semibold uppercase tracking-widest text-[#F59E0B] mb-6">
      AMO AI Process
    </p>
    
    {/* H1 Headline */}
    <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 leading-tight"
        style={{ fontFamily: 'Playfair Display, serif' }}>
      Build intelligent AI systems for your business
    </h1>
    
    {/* Subheadline */}
    <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl">
      We create custom AI solutions that solve real problems.
    </p>
    
    {/* CTA Row */}
    <div className="flex flex-col sm:flex-row gap-4">
      <button className="bg-gray-900 text-white px-10 py-5">Primary CTA</button>
      <button className="border border-gray-900 px-10 py-5">Secondary CTA</button>
    </div>
  </div>
</section>
```

### Stats Bar

```tsx
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-gray-200">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
    <div>
      <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
        Projects Delivered
      </p>
      <p className="text-6xl md:text-7xl tracking-tight">20+</p>
    </div>
    {/* Repeat for other stats */}
  </div>
</section>
```

### Process/Timeline

```tsx
<section className="space-y-12">
  {steps.map((step, index) => (
    <div key={index} className="flex gap-6">
      {/* Number Circle */}
      <div className="w-12 h-12 bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
        <span className="text-[#F59E0B] font-bold">{step.number}</span>
      </div>
      
      {/* Content */}
      <div>
        <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
        <p className="text-[#666666]">{step.description}</p>
      </div>
    </div>
  ))}
</section>
```

### Testimonials

```tsx
<blockquote className="max-w-3xl mx-auto text-center">
  <p className="text-2xl md:text-3xl text-[#1A1A1A] mb-6"
     style={{ fontFamily: 'Lora, serif' }}>
    "AMO AI delivered our platform in 6 weeks. Incredible quality."
  </p>
  <footer className="text-sm text-[#999999]">
    <span className="font-semibold text-[#666666]">Jane Doe</span>
    <span className="mx-2">·</span>
    <span>CEO, StartupAI</span>
  </footer>
</blockquote>
```

### CTA Sections (Dark)

```tsx
<section className="bg-[#1A1A1A] py-24 md:py-32">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl">
      <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8 text-white"
          style={{ fontFamily: 'Playfair Display, serif' }}>
        Ready to build your AI solution?
      </h2>
      <p className="text-xl md:text-2xl mb-12 leading-relaxed text-[#E5E5E5]">
        Let's discuss how we can help transform your business.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-[#F59E0B] text-[#1A1A1A] px-10 py-5 font-bold">
          Start Project
        </button>
        <button className="border border-white text-white px-10 py-5">
          Book a Call
        </button>
      </div>
    </div>
  </div>
</section>
```

---

## 7. Design Principles

### ✅ DO

**Layout & Spacing:**
- Use generous whitespace (`py-24` to `py-32` for sections)
- Maintain consistent vertical rhythm
- Apply max-width constraints for readability
- Use clean 1px borders for structure

**Typography:**
- Lead with strong serif headings (Playfair Display)
- Use Inter for UI and body text
- Maintain comfortable line-height (1.6)
- Apply uppercase + tracking for labels

**Colors:**
- Keep backgrounds neutral (off-white `#FDFCFB`)
- Use amber (`#F59E0B`) sparingly for hierarchy
- Ensure text contrast meets WCAG AA standards
- Apply dark backgrounds for CTA sections

**Interactions:**
- Use subtle transitions (200-300ms)
- Provide clear hover states
- Animate on viewport entry (once only)
- Keep square corners on all buttons

### ❌ DON'T

**Avoid:**
- Box shadows or drop shadows (flat design only)
- Rounded button corners (editorial aesthetic)
- Glassmorphism effects (no blur backgrounds)
- Background gradients (solid colors only)
- Excessive animations or bouncing
- Cluttered layouts or tight spacing
- Font sizes below 14px
- Low-contrast text combinations

**Never:**
- Use more than 3 font families
- Apply heavy font weights (>700) to body
- Ignore responsive breakpoints
- Stack CTAs vertically on desktop
- Use script or decorative fonts
- Create inaccessible color combinations

---

## 8. Responsive Behavior

### Breakpoints Strategy

```tsx
// Mobile First Approach
className="text-2xl md:text-4xl lg:text-6xl"

// Tailwind Breakpoints:
// sm:  640px  (Mobile landscape)
// md:  768px  (Tablet portrait)
// lg:  1024px (Desktop)
// xl:  1280px (Large desktop)
```

### Typography Scaling

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| H1 | 36-48px | 48-60px | 60-72px |
| H2 | 28-36px | 36-48px | 48-60px |
| H3 | 24-28px | 28-32px | 32-36px |
| Body | 15px | 16px | 16-18px |

### Layout Transformations

**Grid Collapse:**
```tsx
// Desktop: 3 columns
// Tablet: 2 columns
// Mobile: 1 column
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

**Padding Reduction:**
```tsx
// Desktop: py-32 (128px)
// Tablet: py-20 (80px)
// Mobile: py-12 (48px)
className="py-12 md:py-20 lg:py-32"
```

**Content Reordering:**
```tsx
// Mobile: Image first, then text
// Desktop: Text left, image right
<div className="flex flex-col lg:flex-row">
  <div className="order-2 lg:order-1">Text</div>
  <div className="order-1 lg:order-2">Image</div>
</div>
```

### Mobile-Specific Patterns

**Horizontal Scroll Navigation:**
```tsx
<div className="flex gap-4 overflow-x-auto no-scrollbar">
  {/* Navigation tabs */}
</div>

/* CSS for hiding scrollbar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

**Sticky Mobile CTA:**
```tsx
<div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#EFE9E4] z-50">
  <button className="w-full bg-[#F59E0B] text-[#1A1A1A] px-6 py-4 font-bold">
    Start Project
  </button>
</div>
```

---

## 9. Accessibility Guidelines

### Color Contrast

**WCAG AA Compliance:**
- `#1A1A1A` on `#FDFCFB` = 14.5:1 (AAA)
- `#666666` on `#FFFFFF` = 5.7:1 (AA)
- `#F59E0B` on `#1A1A1A` = 4.8:1 (AA)

### Focus States

```tsx
// Keyboard focus visible
className="focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:ring-offset-2"

// Custom focus for dark backgrounds
className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
```

### Semantic HTML

```tsx
// Use proper heading hierarchy
<h1> → <h2> → <h3>

// Navigation landmarks
<nav aria-label="Main navigation">
<main>
<footer>

// Interactive elements
<button aria-label="Close menu">
<a href="#main" className="sr-only">Skip to content</a>
```

### Screen Reader Support

```tsx
// Visually hidden but accessible
className="sr-only"

// ARIA labels for icons
<button aria-label="Navigate to next slide">
  <ChevronRight />
</button>

// Live regions for dynamic content
<div role="status" aria-live="polite">
  Loading...
</div>
```

---

## 10. Implementation Checklist

### New Page Setup
- [ ] Import Playfair Display font
- [ ] Set page background to `#FDFCFB`
- [ ] Use max-width container (`max-w-[1400px]`)
- [ ] Apply section padding (`py-24` to `py-32`)
- [ ] Add border-top to major sections
- [ ] Implement scroll animations
- [ ] Test all breakpoints (mobile, tablet, desktop)

### Component Checklist
- [ ] No rounded corners on buttons
- [ ] No box shadows on cards
- [ ] Clean 1px borders (`#EFE9E4`)
- [ ] Proper hover states (200-300ms transitions)
- [ ] Accessible focus states
- [ ] Semantic HTML structure
- [ ] ARIA labels where needed

### Typography Checklist
- [ ] Playfair Display for H1/H2
- [ ] Inter for body and UI
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Line-height 1.6 for body text
- [ ] `tracking-tight` for large headings
- [ ] `tracking-widest` for uppercase labels
- [ ] Responsive text scaling

### Accessibility Checklist
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] ARIA labels for icons
- [ ] Semantic HTML landmarks
- [ ] Alt text for images
- [ ] Skip to content link

---

## 11. Common Patterns Library

### Service Grid Item
```tsx
<div className="group">
  <div className="flex items-start justify-between mb-4">
    <h3 className="text-2xl tracking-tight">{service.name}</h3>
    <span className="text-gray-400 text-sm mt-1">{service.number}</span>
  </div>
  <div className="w-full h-px bg-gray-200 group-hover:bg-orange-500 transition-colors" />
</div>
```

### Metric Display
```tsx
<div>
  <div className="text-4xl font-bold text-[#1A1A1A] mb-1">{value}</div>
  <div className="text-xs uppercase tracking-wider text-[#999999]">
    {label}
  </div>
</div>
```

### Feature List Item
```tsx
<li className="flex items-start gap-4">
  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-3 flex-shrink-0" />
  <p className="text-lg text-gray-600">{feature}</p>
</li>
```

### Accordion Header
```tsx
<button className="w-full p-8 flex items-start gap-6 text-left border-b border-[#EFE9E4]">
  <Icon className="w-7 h-7 text-[#1A1A1A]" />
  <div className="flex-1">
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-[#666666]">{description}</p>
  </div>
  <span className="text-2xl text-[#999999]">{isOpen ? '−' : '+'}</span>
</button>
```

---

## 12. File Structure

### Recommended Component Organization

```
/components/
├── home/
│   ├── HeroSection.tsx
│   ├── ProofSection.tsx
│   ├── ServicesGrid.tsx
│   └── CTASection.tsx
├── process/
│   └── v12/
│       ├── ProcessHeroSection.tsx
│       ├── PhaseCard.tsx
│       └── HeroCircularDiagram.tsx
├── projects/
│   ├── ProjectsHero.tsx
│   ├── ProjectModule.tsx
│   └── SystemDiagram.tsx
└── shared/
    ├── Header.tsx
    ├── Footer.tsx
    └── Button.tsx

/styles/
└── globals.css (Tailwind + custom styles)

/lib/
├── constants.ts
├── types/
└── data/
```

---

## 13. Version History

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| V11 | 2026-01-08 | Calm Luxury Editorial system established | Active |
| V10 | 2025-12 | Previous gradient-based design | Deprecated |

---

## 14. Resources

### Design Tools
- **Figma:** Component library (if applicable)
- **Color Picker:** https://contrast-ratio.com (WCAG testing)
- **Font Preview:** Google Fonts (Playfair Display, Inter)

### Code References
- **Tailwind CSS v4:** https://tailwindcss.com
- **Motion/React:** https://motion.dev
- **Lucide Icons:** https://lucide.dev

### Inspiration
- Editorial websites (NYT, Medium)
- Luxury brand sites (minimal, elegant)
- High-end design agencies

---

**END OF STYLE GUIDE**

**For questions or updates, contact:** Design Team  
**Last reviewed:** 2026-01-08
