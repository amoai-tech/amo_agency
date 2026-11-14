# Home V2 - Luxury Editorial Design System
**Last Updated:** February 4, 2026

## Overview
Home V2 is a complete redesign of the AMO AI homepage featuring a luxury editorial design system inspired by premium digital agencies and design studios. The page emphasizes visual storytelling, sophisticated typography, and high-quality photography to create a premium, intelligent brand experience.

---

## Design Philosophy

### Core Principles
1. **Calm Luxury** - Sophisticated without being flashy
2. **Editorial Quality** - Magazine-level typography and layouts
3. **Visual Hierarchy** - Clear content structure and flow
4. **Responsive Excellence** - Optimized for all devices
5. **Performance First** - Fast loading, smooth interactions

### Visual Language
- **Dark teal hero sections** (#0F3D3E) create dramatic impact
- **Lime green accents** (#84CC16) provide energetic contrast
- **Large-scale typography** establishes authority
- **High-quality imagery** tells compelling stories
- **Generous white space** creates breathing room

---

## Color System

### Primary Colors
```css
Dark Teal:     #0F3D3E  /* Hero sections, dark backgrounds */
Lime Green:    #84CC16  /* Primary accent, CTAs, highlights */
Deep Black:    #1A1A1A  /* Body text, headings */
Warm Grey:     #666666  /* Secondary text */
```

### Background Colors
```css
Pure White:    #FFFFFF  /* Clean sections */
Warm Cream:    #FAF8F6  /* Alternating sections */
Off White:     #FDFCFB  /* Subtle variation */
```

### Accent & Utility
```css
Border Light:  #EFE9E4  /* Borders, dividers */
Green Hover:   #65A30D  /* Button hover states */
Overlay Dark:  rgba(0,0,0,0.8)  /* Image overlays */
```

---

## Typography

### Font Families
```css
--heading-font: 'Playfair Display', serif;
--body-font: 'Lora', serif;
```

### Type Scale
```css
Hero Headline:    5xl - 7xl  (48px - 72px+)
Section Heading:  4xl - 6xl  (36px - 60px)
Subsection:       3xl - 4xl  (30px - 36px)
Body Large:       xl - 2xl   (20px - 24px)
Body:             base       (16px)
Small:            sm - xs    (14px - 12px)
```

### Typography Patterns
1. **Editorial Headlines** - Playfair Display, bold, tight leading (1.05)
2. **Body Text** - Lora, regular, relaxed leading (1.6-1.8)
3. **Labels** - Uppercase, wide tracking (0.2em), small size
4. **Numbers/Stats** - Playfair Display, bold, oversized

---

## Layout System

### Container Widths
```css
Max Width:     7xl (1280px)
Form Max:      4xl (896px)
Content Max:   3xl (768px)
```

### Spacing Scale
```css
Section Padding:  py-24 lg:py-32  (96px - 128px)
Element Gap:      gap-16 lg:gap-20  (64px - 80px)
Card Padding:     p-10 lg:p-12  (40px - 48px)
```

### Grid Patterns
- **2-Column Split** - Content + Image layouts
- **3-Column Cards** - Services, testimonials, pricing
- **Masonry Grid** - Featured work gallery
- **Full Width** - Hero, metrics, CTA sections

---

## Component Patterns

### 1. Hero Section
**Dark teal background with photography**
- Large headline (7xl Playfair)
- Body copy (2xl Lora)
- Dual CTAs (Primary + Secondary)
- Featured image with stats overlay
- Subtle dot pattern background

### 2. Section Headers
**Consistent structure across sections**
- Label badge (lime green bg, uppercase)
- Large headline (4xl - 6xl Playfair)
- Supporting paragraph (xl Lora)
- Generous bottom margin (mb-20)

### 3. Image Cards
**Editorial photography focus**
- High-quality imagery (4:5 or 3:4 aspect)
- Gradient overlays on hover
- Text overlays on images
- Scale transitions (hover:scale-105)
- 700ms transition duration

### 4. Metrics/Stats
**Large numbers, editorial presentation**
- Oversized numbers (7xl - 9xl Playfair)
- Accent color for emphasis
- Divider lines (0.5px lime green)
- Supporting text below

### 5. Call-to-Actions
**Multiple CTA styles**
```css
Primary:   bg-[#84CC16] + scale on hover
Secondary: border-2 border-white/20
Tertiary:  border-b-2 border-[#84CC16]
```

### 6. Form Design
**Split layout with benefits**
- Left: Sticky content panel
- Right: Form fields
- Light backgrounds (#FAF8F6)
- Focused borders (lime green)
- Animated submit button

---

## Section Breakdown

### 1. Hero (V2Hero)
- **Background:** Dark teal (#0F3D3E)
- **Layout:** 2-column grid
- **Image:** Professional portrait (4:5)
- **Stats:** Floating overlay cards

### 2. Value Section (V2ValueSection)
- **Layout:** Image + content split
- **Image:** Full-height with text overlay
- **Icons:** Feature grid with hover states

### 3. Featured Work (V2FeaturedWork)
- **Layout:** Masonry grid
- **Grid:** 1/2/3 columns responsive
- **Interaction:** Hover overlays

### 4. Metrics (V2MetricsSection)
- **Layout:** 3-column grid
- **Typography:** 7xl numbers, Playfair
- **Background:** Light cream

### 5. Highlight Cards (V2HighlightCards) - NEW
- **Layout:** 3-column grid (equal height cards)
- **Card Structure:** 
  - Header: Solid green (#1E6F5C), icon + title
  - Body: Light mint (#E8F5E9), 2×2 metric grid
- **Typography:** 
  - Numbers: 4xl-5xl Playfair bold
  - Labels: Small Lora, neutral
  - Titles: 2xl-3xl Playfair
- **Design:** Rounded corners (16px), no gradients
- **Animations:** Scroll-triggered reveals, hover scaling on badges
- **Special:** Third card shows award badges instead of metrics
- **Mobile:** Stacked single column
- **Accessibility:** WCAG AA contrast, decorative icons

### 6. Capability Framework (V2CapabilityFramework) - NEW
- **Layout:** 3-column grid (left panel / center circle / right panel)
- **Center:** SVG circular diagram (500×500px)
  - Core: "STARTUP CLARITY ENGINE" with light background
  - Outer Ring: 3 segments (Strategy, Execution, Intelligence)
  - Tonal color variations (lime green family)
- **Side Panels:**
  - Left: AI-Enabled Planning (4 capabilities)
  - Right: AI-Enabled Operations (4 capabilities)
- **Interactions:**
  - Hover on segment: Color change + capability popup
  - Related panel opacity changes
  - Smooth 500ms transitions
- **Typography:**
  - Center: 18px Playfair uppercase bold
  - Segments: 20px Playfair uppercase
  - Panels: 2xl Playfair headings, base Lora lists
- **Design:** Executive diagram-first layout, strategy slide aesthetic
- **Mobile:** Stacked vertical layout
- **Accessibility:** Readable without color, high contrast

### 7. AI Maturity Framework (V2AIMaturityFramework) - NEW
- **Layout:** 2-column grid (strategy pillars sidebar + main content)
- **Aesthetic:** BCG/McKinsey consulting framework
- **Structure:**
  - Left Sidebar: 5 strategic pillars with icons
  - Right: 2 maturity stages (Scaling + Future-Built)
  - Bottom: Progress curve visualization
- **Card System:**
  - Stage header with accent color background
  - Subtitle in Lora (relaxed leading)
  - 2-column grid of action cards
  - Each action card: white bg, border, bullet point
- **Typography:**
  - Exhibit label: xs uppercase tracking-widest
  - Main title: 4xl-5xl Playfair bold
  - Stage titles: 2xl-3xl Playfair bold
  - Body: sm-base Lora, relaxed line height
- **Color Usage:**
  - Background: Warm off-white (#FAF8F6)
  - Text: Deep teal (#0F3D3E)
  - Accent: Lime green (#84CC16) for Scaling
  - Accent 2: Dark lime (#65A30D) for Future-Built
  - Borders: Teal 10% opacity
- **Interactions:**
  - Hover on stage: Header color fills, action cards highlight
  - Hover on action card: Border changes to lime, shadow appears
  - Progress bar animates based on active stage
  - Smooth 500ms transitions throughout
- **Progress Visualization:**
  - Horizontal line with 3 markers (Laggard, Scaling, Future-Built)
  - Active stage highlighted with lime green
  - Animated width transition on progress line
  - Circle markers scale on active state
- **Design Philosophy:**
  - Calm luxury, no visual noise
  - Spacing creates hierarchy, not color
  - Executive intelligence UI
  - Editorial line heights (1.6-1.8)
  - Subtle elevation on hover only
- **Mobile:** Stacked vertical layout, pillars above content
- **Accessibility:** High contrast, semantic structure, keyboard navigable

### 8. Testimonials (V2Testimonials)
- **Layout:** 3-column grid
- **Images:** Professional portraits (3:4)
- **Style:** Quote + author info

### 9. Industries (V2IndustriesStrip)
- **Layout:** 3-column grid
- **Cards:** Hover border change
- **Content:** Name + project count

### 10. Services (V2ServicesGrid)
- **Layout:** 3-column grid
- **Images:** Tall cards (4:5)
- **Icons:** Overlaid on images

### 11. Creative Services Slider (V2CreativeServices) - NEW
- **Background:** Dark teal with dot pattern
- **Slider:** React Slick with center mode
- **Layout:** 4 slides visible (responsive: 3/2/1)
- **Effects:** Center slide scaling, hover elevations
- **Animations:** Auto-play with pause on hover
- **Cards:** Full-height with gradient overlays
- **Typography:** Italic Playfair titles, varied accent colors
- **Navigation:** Previous/Next buttons + progress dots + slide counter
- **Interactions:** Hover reveals description, smooth transitions

### 12. How It Works (V2HowItWorks)
- **Background:** Dark teal with animated gradient orbs
- **Layout:** Sticky content + timeline grid
- **Animations:** Scroll-triggered reveals, progressive timeline
- **Effects:** Pulse on numbers, glow on hover, staggered reveals
- **Timeline:** Vertical line with scroll-based height animation
- **Interactions:** Individual step reveals on scroll

### 13. Process (V2ProcessSection)
- **Layout:** 12-column grid system
- **Numbers:** 9xl on left
- **Cards:** Deliverable boxes

### 14. Pricing (V2PricingSection)
- **Layout:** 3-column grid
- **Highlight:** Center card scaled
- **Checkmarks:** Lime green squares

### 15. Project Form (V2ProjectForm)
- **Layout:** 2-column split
- **Form:** Multi-row grid
- **Style:** Light backgrounds

### 16. Final CTA (V2FinalCTA)
- **Background:** Dark teal + image
- **Layout:** Centered content
- **CTAs:** Dual buttons

---

## Interaction Patterns

### Hover States
```css
Images:         scale-105, 700ms duration
Buttons:        bg color change + scale-105
Cards:          border color change
Links:          color transition
Icons:          color + bg transition
```

### Transitions
```css
Default:        transition-colors
Transform:      transition-transform duration-300
Complex:        transition-all
Smooth:         duration-700 (images)
```

### Animation Guidelines
- Use subtle scale transforms (1.05 max)
- Smooth color transitions (300ms)
- Longer durations for images (700ms)
- Avoid jarring movements
- Maintain performance

### Scroll Animation System (V2HowItWorks)

**Key Features:**
1. **Viewport Detection** - `useInView` hook triggers animations when elements enter viewport
2. **Scroll Progress** - `useScroll` tracks scroll position for timeline height
3. **Staggered Reveals** - Sequential appearance of elements with delays
4. **Transform Animations** - Combined opacity, position, and scale effects

**Animation Techniques:**
```typescript
// Progressive Timeline Line
const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

// Staggered Container
containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
}

// Individual Step Reveal
stepVariants = {
  hidden: { opacity: 0, x: 60, scale: 0.95 },
  visible: {
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}
```

**Visual Effects:**
- Animated gradient orbs (ambient background)
- Pulse effect on number circles
- Glow effect on hover
- Progressive timeline connectors
- Smooth easing curves (cubic-bezier)

**Performance Optimization:**
- `once: true` on viewport triggers (no re-animation)
- CSS transforms for GPU acceleration
- Minimal re-renders with Motion
- Efficient scroll listeners

### Slider System (V2CreativeServices)

**React Slick Configuration:**
```typescript
settings = {
  infinite: true,
  speed: 700,
  slidesToShow: 4,
  centerMode: true,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  cssEase: 'cubic-bezier(0.22, 1, 0.36, 1)',
}
```

**Responsive Breakpoints:**
- **1536px+:** 4 slides visible
- **1024-1536px:** 3 slides visible
- **640-1024px:** 2 slides visible
- **<640px:** 1 slide with side padding

**Visual Effects:**
- Center slide scale effect (1.05)
- Gradient overlays per service (varied colors)
- Image zoom on hover (scale-110)
- Opacity transitions on overlays
- Reveal description on hover

**Navigation Controls:**
1. **Previous/Next Buttons** - Chevron icons with hover states
2. **Progress Dots** - Animated width indicators
3. **Slide Counter** - Displays current/total (e.g., "02 / 06")

**Card Design:**
- Full-height cards (500-600px)
- Background images with gradients
- Italic Playfair Display titles (4xl-5xl)
- Subtitle labels (uppercase tracking)
- Hidden descriptions (reveal on hover)
- Varied accent colors per service
- Border glow on hover

**Performance:**
- Lazy loading images
- Hardware-accelerated transforms
- Debounced resize listeners
- Optimized re-renders

---

## Responsive Behavior

### Breakpoints
```css
sm:   640px   /* Mobile landscape */
md:   768px   /* Tablet */
lg:   1024px  /* Desktop */
xl:   1280px  /* Large desktop */
```

### Mobile Optimizations
- Single column layouts
- Larger touch targets (min 44px)
- Reduced font sizes (but still readable)
- Simplified grids
- Hidden decorative elements
- Sticky form content

---

## Image Strategy

### Image Types
1. **Hero Photography** - Professional portraits
2. **Work Samples** - Project screenshots
3. **Testimonial Photos** - Client headshots
4. **Service Images** - Editorial photography
5. **Background Images** - Subtle overlays

### Image Guidelines
- High resolution (1080px+ width)
- Professional quality
- Consistent color grading
- Appropriate to content
- Optimized file sizes
- Lazy loading enabled

---

## Accessibility

### WCAG Compliance
- ✅ Color contrast ratios (4.5:1+)
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Alt text on images
- ✅ Semantic HTML
- ✅ ARIA labels where needed

### Best Practices
- Large text sizes (16px minimum)
- Clear link indicators
- Form field labels
- Error messages
- Skip navigation links

---

## Performance

### Optimization Strategies
1. **Image Optimization**
   - Unsplash optimized URLs
   - Appropriate sizing
   - Progressive loading

2. **CSS**
   - Tailwind CSS purging
   - Minimal custom CSS
   - Efficient selectors

3. **JavaScript**
   - Component lazy loading
   - Event delegation
   - Minimal re-renders

4. **Fonts**
   - Google Fonts optimized
   - Font-display: swap
   - Preconnect hints

---

## Technical Implementation

### Component Structure
```
/components/homev2/
  ├── V2Hero.tsx
  ├── V2TrustStrip.tsx
  ├── V2ValueSection.tsx
  ├── V2FeaturedWork.tsx
  ├── V2MetricsSection.tsx
  ├── V2Testimonials.tsx
  ├── V2IndustriesStrip.tsx
  ├── V2ServicesGrid.tsx
  ├── V2CreativeServices.tsx
  ├── V2HowItWorks.tsx
  ├── V2ProcessSection.tsx
  ├── V2PricingSection.tsx
  ├── V2ProjectForm.tsx
  ├── V2FinalCTA.tsx
  └── index.ts
```

### Props Pattern
```typescript
interface SectionProps {
  onNavigate?: (page: string) => void;
}
```

### State Management
- Form state in V2ProjectForm
- Navigation via props
- No global state needed

---

## Content Strategy

### Headlines
- Clear value propositions
- Benefit-focused
- Action-oriented
- Avoid jargon

### Body Copy
- Conversational tone
- Short paragraphs
- Scannable content
- Benefit-driven

### CTAs
- Action verbs
- Clear outcomes
- Multiple options
- Low friction

---

## Future Enhancements

### Potential Additions
1. **Scroll Animations** - Fade-in on scroll
2. **Video Backgrounds** - Hero section video
3. **Case Study Modal** - Inline project details
4. **Live Chat** - Customer support widget
5. **Blog Integration** - Recent articles section
6. **Social Proof** - Live activity feed
7. **Interactive Demos** - Product showcases

### A/B Testing Opportunities
- CTA button colors
- Headline variations
- Form field count
- Pricing display
- Image selections

---

## Browser Support

### Tested Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Fallbacks
- CSS Grid with flexbox backup
- Modern font stack
- Transform fallbacks
- Progressive enhancement

---

## Maintenance

### Regular Updates
- Image refreshes (quarterly)
- Copy updates (as needed)
- Stats updates (monthly)
- Testimonial rotation (quarterly)
- Performance audits (monthly)

### Monitoring
- Analytics tracking
- Error logging
- Performance metrics
- User feedback
- Conversion tracking

---

## Credits & Resources

### Design Inspiration
- Premium digital agencies
- Editorial design magazines
- Luxury brand websites
- Design studio portfolios

### Tools Used
- Figma Make platform
- Tailwind CSS v4
- React components
- Unsplash imagery
- Lucide icons

---

**End of Documentation**