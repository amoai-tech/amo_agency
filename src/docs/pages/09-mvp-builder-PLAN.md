# MVP Builder Page - Implementation Plan

## Overview
Create a premium MVP Builder service page at `/services/mvp-builder` using the same design system, component patterns, and quality standards as the `/web-design` page.

---

## Design System Compliance

### ✅ Style Guide Requirements
- **Background Colors**: Dark Teal (#0F3D3E), White (#FFFFFF), Warm Beige (#F4F3EE)
- **Accent Colors**: Lime Green (#84CC16) primary, Orange (#FF6B4A) for urgent CTAs
- **Typography**: Playfair Display (headlines), Lora (body text, labels)
- **Border Radius**: NONE (0px) - strictly enforced
- **Shadows**: NONE - strictly enforced
- **Animations**: Smooth, purposeful, scroll-driven where appropriate

### 🎨 MVP Page Specific Colors (from content doc)
- **Dark Forest**: #0E3E1B (hero, footer CTA, "Who This Is For" section)
- **Off-white**: #FAF9F5 (light section backgrounds, dark text)
- **Warm Beige**: #F1EEEA (alternating section background)
- **Lime Green**: #7EF473 (CTA buttons, accents, timeline dots)
- **Orange**: #FF6B4A (final CTA button)

---

## Page Structure & Component Mapping

### **Section 1: Hero**
**Background**: Dark forest (#0E3E1B)
**Component**: `MVPHero.tsx` (new)

#### Features:
- ✅ Center-aligned layout
- ✅ Eyebrow: "MVP BUILDER" (Lora, uppercase, tracked, #7EF473)
- ✅ H1: "Your AI Product, Live in 6 Weeks" (Playfair Display, 56px desktop/36px mobile, #FAF9F5)
- ✅ Subheadline: 3-sentence value prop (system-ui, 20px desktop/16px mobile, #FAF9F5/80%)
- ✅ Dual CTAs:
  - Primary: "Start Your MVP Brief" → /booking (bg: #7EF473, text: dark)
  - Secondary: "View MVPs We've Shipped" → /projects (ghost/outline, white border)
- ✅ Trust element: "8 MVPs launched to market in the last 12 months. 3 went on to raise funding."
- ✅ **Interactive 6-Week Timeline**: 
  - 6 dots (12px circles, #7EF473) connected by line (2px, #7EF473/30%)
  - Labels: "Week 1" through "Week 6"
  - Last dot is rocket/launch icon
  - Animation: dots illuminate left-to-right on page load (500ms delay each)

**Similar to**: `WebDesignHero.tsx` but simpler, no floating mockups, focus on timeline visual

---

### **Section 2: Why MVP First**
**Background**: Off-white (#FAF9F5)
**Component**: `WhyMVPFirst.tsx` (new)

#### Features:
- ✅ Section eyebrow: "THE CASE FOR MVP" (#84CC16)
- ✅ H2: "Build the Proof Before You Build the Company" (Playfair, 44px)
- ✅ 3 paragraphs body copy (Lora, 18px, max-width 720px, centered)
- ✅ **Flow Diagram**: Mermaid-style visual comparison
  - Traditional: 6-12 months waterfall (gray/muted)
  - MVP: 6 weeks iterative loop (green/lime)
  - Show the "Learn → Iterate" loop as key differentiator
- ✅ **Comparison Cards**: Side-by-side (desktop) / stacked (mobile)
  - Traditional card: muted styling (gray text, light bg)
  - MVP card: bold styling (lime accents, strong borders, #7EF473 highlights)
  - 6 comparison dimensions:
    - Time to first users
    - Budget before revenue
    - Risk
    - Investor conversation
    - Iteration speed
    - Architecture quality

**Implementation**:
- Use Motion React for scroll animations
- Cards appear with stagger (100ms delay)
- Flow diagram: Create as SVG component (not actual Mermaid)
- Hover on comparison cards: subtle lift (-4px)

**Similar to**: `WhyAIPowered.tsx` but with flow diagram and comparison table

---

### **Section 3: What's Included**
**Background**: Warm beige (#F1EEEA)
**Component**: `MVPDeliverables.tsx` (new)

#### Features:
- ✅ Section eyebrow: "DELIVERABLES" (#84CC16)
- ✅ H2: "From Concept to Deployed Product" (Playfair, 44px)
- ✅ Body copy (Lora, 18px, max-width 720px)
- ✅ **Gantt Chart Visual**: Horizontal timeline showing 6 weeks
  - Color-coded phases:
    - Scope: #7EF473
    - Architecture: light green gradient
    - Build: #0F3D3E (dark teal)
    - AI + Polish: #7EF473
    - Deploy: #0F3D3E
    - Support: muted gray
  - Bars overlap showing parallel work
- ✅ **6 Phase Cards**: 
  - Desktop: Horizontal micro-cards (very compact, 6-column grid)
  - Mobile: Vertical timeline with left-line and right-content, numbered steps (01-06)
  - Each card:
    - Phase number badge (28px circle, bg #7EF473, text dark)
    - Title (Georgia, 18px)
    - Short description (2-3 lines, system-ui, 14px)
    - Week label
  - Interactive: Hover on Gantt bar highlights corresponding card

**Phases**:
1. Week 1: Scope Workshop
2. Week 1-2: AI Architecture Design
3. Week 2-4: Core Feature Development
4. Week 4-5: AI Integration & Polish
5. Week 5-6: Deployment & Onboarding
6. Post-Launch: 30 Days Support

**Implementation**:
- Gantt chart as custom SVG component
- Timeline animation: bars draw left-to-right on scroll into view
- Phase cards with staggered entrance
- Mobile: vertical timeline with connecting line

**Similar to**: `WebDesignProcess.tsx` but more detailed timeline

---

### **Section 4: Our MVP Framework**
**Background**: Off-white (#FAF9F5)
**Component**: `MVPFramework.tsx` (new)

#### Features:
- ✅ Section eyebrow: "FRAMEWORK" (#84CC16)
- ✅ H2: "Scoped for Validation. Built for Scale." (Playfair, 44px)
- ✅ Body copy (3 paragraphs, Lora, 18px, max-width 720px, centered)
- ✅ **4 Principle Cards (2x2 grid desktop / stack mobile)**:
  1. Production-Grade Architecture
  2. Scoped for Validation
  3. AI-Native from Day One
  4. Built for Handoff
- ✅ Card styling:
  - Background: white with subtle border
  - Border-radius: 0px (NO ROUNDED CORNERS)
  - Padding: 32px
  - Number badge: 28px circle, bg #7EF473, text #0F3D3E, positioned top-left
  - Title: Playfair Display, 22px, #0F3D3E
  - Body: Lora, 15px, #0F3D3E/70%, 4-5 lines
  - Hover: translateY(-4px), NO shadow increase (style guide violation)
  - Special icon for "Built for Handoff" card (handshake or relay)

**Implementation**:
- Glass effect: very subtle background with border (not glassmorphism blur)
- Staggered entrance animation (150ms delay between cards)
- Hover lift animation
- Grid: CSS Grid 2x2 (desktop), stack (mobile)

**Similar to**: Homepage service cards but with numbered badges

---

### **Section 5: Who This Is For**
**Background**: Dark forest (#0E3E1B)
**Component**: `MVPWhoThisIsFor.tsx` (new)

#### Features:
- ✅ Section eyebrow: "BEST FIT" (#7EF473)
- ✅ H2: "Founders With Ideas That Need to Ship" (Playfair, 44px, #FAF9F5)
- ✅ Body copy (Lora, 18px, #FAF9F5/70%, max-width 720px)
- ✅ **3 Founder Profile Cards**:
  1. Solo Founders & Small Teams
  2. Funded Startups Launching New Products
  3. Companies Launching Internal AI Tools
- ✅ Card styling (DARK THEME):
  - Background: rgba(255,255,255,0.05) (very subtle)
  - Border: 1px solid with colored accent per card:
    - Solo: #7EF473 (lime)
    - Funded: #FAF9F5 (white)
    - Internal: #FF6B4A (orange)
  - Top border: 4px thick in accent color
  - Padding: 40px
  - Icon: 40px, matching accent color
  - Title: Playfair Display, 22px, #FAF9F5
  - Body: Lora, 15px, #FAF9F5/70%
  - Divider line (1px, rgba(255,255,255,0.1))
  - "Best for:" section: 13px, #FAF9F5/50%
  - Hover: border glows with accent color

**Icons**:
- Solo Founders: User icon (lucide-react)
- Funded Startups: Rocket icon
- Companies: Building2 icon

**Implementation**:
- 3-column grid desktop, stack mobile
- Staggered entrance with scroll trigger
- Hover glow effect on border
- Icons from lucide-react

**Similar to**: Services grid but dark theme with transparent cards

---

### **Section 6: Bottom CTA**
**Background**: Dark forest (#0E3E1B) - continuation from Section 5
**Component**: `MVPBottomCTA.tsx` (new)

#### Features:
- ✅ Thin divider line at top: 1px solid rgba(255,255,255,0.1), max-width 400px, centered
- ✅ H2: "Stop Planning. Start Building." (Playfair, 48px desktop/32px mobile, #FAF9F5)
- ✅ Body copy: 2 sentences (Lora, 18px desktop/16px mobile, #FAF9F5/70%, max-width 640px)
- ✅ **Primary CTA**: "Start Your MVP Brief" → /booking
  - Background: #FF6B4A (ORANGE - urgent action)
  - Text: white
  - Size: 18px
  - Padding: 16px 40px
  - Border-radius: 0px (NO ROUNDED CORNERS)
- ✅ Sub-CTA text: "Free 30-minute session. No obligations. No pitch deck required."
  - Font: Lora, 14px, #FAF9F5/50%
  - Reduces friction, addresses objections
- ✅ Center-aligned content
- ✅ Animation: CTA button subtle pulse/glow on page load

**Implementation**:
- Divider has fade-in animation
- Headline types in or fades up
- CTA button has attention-grabbing subtle animation
- Full section is dark continuation from previous

**Similar to**: `WebDesignCTA.tsx` but more direct/urgent copy

---

## File Structure

```
/pages/
  MVPBuilderPage.tsx           # Main page component (route: /services/mvp-builder)

/components/mvp/
  MVPHero.tsx                   # Section 1: Hero with timeline
  WhyMVPFirst.tsx               # Section 2: Comparison & flow diagram
  MVPDeliverables.tsx           # Section 3: Gantt chart + phase cards
  MVPFramework.tsx              # Section 4: 4 principle cards
  MVPWhoThisIsFor.tsx           # Section 5: 3 founder profiles
  MVPBottomCTA.tsx              # Section 6: Final CTA

/components/mvp/visuals/
  TimelineDots.tsx              # 6-week dot timeline (hero)
  FlowDiagram.tsx               # Traditional vs MVP flow (SVG)
  GanttChart.tsx                # 6-week Gantt visualization
  
/routes.ts
  # Add route: /services/mvp-builder → MVPBuilderPage
```

---

## Component Implementation Order

### **Phase 1: Foundation (Day 1 Morning)**
1. ✅ Create `/pages/MVPBuilderPage.tsx` skeleton
2. ✅ Create component folder `/components/mvp/`
3. ✅ Add route to `/routes.ts`
4. ✅ Create `MVPHero.tsx` component
   - Layout structure
   - Typography
   - Dual CTAs
   - Trust element

### **Phase 2: Hero Polish (Day 1 Afternoon)**
5. ✅ Create `TimelineDots.tsx` visual component
   - 6 dots with connecting line
   - Week labels
   - Rocket icon on dot 6
   - Animation sequence
6. ✅ Integrate timeline into hero
7. ✅ Test responsive behavior

### **Phase 3: Comparison Section (Day 2 Morning)**
8. ✅ Create `WhyMVPFirst.tsx` component
9. ✅ Create `FlowDiagram.tsx` SVG component
   - Traditional flow (linear, 6 boxes)
   - MVP flow (loop with 5 boxes)
   - Color coding
   - Animation on scroll
10. ✅ Build comparison cards
    - Traditional card (muted)
    - MVP card (highlighted)
    - 6 comparison rows

### **Phase 4: Deliverables Timeline (Day 2 Afternoon)**
11. ✅ Create `MVPDeliverables.tsx` component
12. ✅ Create `GanttChart.tsx` component
    - Horizontal bars
    - Week markers
    - Color-coded phases
    - Draw animation
13. ✅ Build 6 phase cards
    - Desktop: compact horizontal grid
    - Mobile: vertical timeline with line
    - Number badges
    - Interactive highlights

### **Phase 5: Framework & Profiles (Day 3 Morning)**
14. ✅ Create `MVPFramework.tsx` component
    - 2x2 grid layout
    - 4 principle cards
    - Number badges
    - Hover effects
15. ✅ Create `MVPWhoThisIsFor.tsx` component
    - Dark theme styling
    - 3 profile cards
    - Icons from lucide-react
    - Colored borders & hover glow

### **Phase 6: CTA & Polish (Day 3 Afternoon)**
16. ✅ Create `MVPBottomCTA.tsx` component
    - Divider line
    - Orange CTA button
    - Sub-CTA text
    - Attention animation
17. ✅ Full page responsive testing
18. ✅ Animation timing refinement
19. ✅ Scroll performance optimization

### **Phase 7: Final QA (Day 4)**
20. ✅ Style guide compliance audit
21. ✅ Cross-browser testing
22. ✅ Mobile device testing
23. ✅ Accessibility audit (ARIA labels, keyboard nav)
24. ✅ Performance testing (Lighthouse)
25. ✅ Content proof reading
26. ✅ CTA link verification

---

## Animation Strategy

### **Entrance Animations (scroll-triggered)**
- **Sections**: Fade up (30px) + opacity (0 → 1), 800ms duration
- **Staggered cards**: 100-150ms delay between items
- **Timeline elements**: Draw left-to-right, 1000ms duration
- **Flow diagram**: Boxes appear sequentially, 200ms delay each

### **Hover Animations**
- **Cards**: translateY(-4px), 300ms ease-out
- **Buttons**: Background color shift, 200ms
- **Borders**: Glow effect (box-shadow with accent color), 300ms
- **Icons**: Slight scale (1.05), 200ms

### **Hero Timeline Animation (page load)**
- Dots illuminate left-to-right
- 500ms delay between each dot
- Final dot transforms to rocket icon
- Line draws progressively

### **Gantt Chart Animation (scroll trigger)**
- Bars draw from left edge to full width
- 600ms per bar, staggered by 100ms
- Easing: ease-out

---

## Typography Hierarchy

### **Headlines**
- **H1** (Hero): Playfair Display, 56px (desktop) / 36px (mobile), -0.02em tracking
- **H2** (Sections): Playfair Display, 44px (desktop) / 28px (mobile), -0.01em tracking
- **H3** (Card titles): Playfair Display, 22px, -0.01em tracking

### **Body Text**
- **Primary**: Lora, 18px (desktop) / 16px (mobile), 1.6 line-height
- **Secondary**: Lora, 15px, 1.6 line-height
- **Small**: Lora, 14px, 1.5 line-height
- **Micro**: Lora, 13px, 1.4 line-height

### **Labels & Eyebrows**
- **Eyebrow**: Lora, 12px, uppercase, 0.15em tracking, font-weight 600
- **CTA buttons**: Lora, 16px, font-weight 600

---

## Responsive Breakpoints

```css
/* Mobile First */
Base: 375px (iPhone SE)
Small: 428px (iPhone 14 Pro Max)

/* Tablet */
Medium: 768px (iPad Mini)
Large: 1024px (iPad Pro)

/* Desktop */
XLarge: 1280px (Standard desktop)
2XLarge: 1536px (Large desktop)

/* Max Container Width */
Max: 1320px (with 40px padding on sides)
```

---

## Color Palette Reference

### **Backgrounds**
- `#0E3E1B` - Dark forest (hero, dark sections)
- `#FAF9F5` - Off-white (light sections)
- `#F1EEEA` - Warm beige (alternating light section)

### **Accents**
- `#7EF473` - Lime green (primary CTA, timeline dots, badges)
- `#84CC16` - Lime green alternate (eyebrows, highlights)
- `#FF6B4A` - Orange (urgent final CTA)

### **Text**
- `#0F3D3E` - Dark teal (body text on light backgrounds)
- `#FAF9F5` - Off-white (text on dark backgrounds)
- Opacity modifiers: /70%, /50%, /30%

### **Borders & Dividers**
- `rgba(255,255,255,0.1)` - Subtle dividers on dark
- `rgba(15,61,62,0.1)` - Subtle dividers on light
- Accent colors for card borders (see Who This Is For section)

---

## Content Assets Needed

### **Images** (use Unsplash)
- None required - page is content and diagram focused

### **Icons** (lucide-react)
- `User` - Solo Founders card
- `Rocket` - Funded Startups card, Timeline dot 6
- `Building2` - Companies card
- `ArrowRight` - CTA buttons
- `Check` - Possible for framework principle cards
- `Zap` - Possible for "AI-Native" card
- `GitBranch` - Possible for "Built for Handoff" card

### **Diagrams** (custom SVG components)
- Timeline dots (6 dots + connecting line)
- Flow diagram (Traditional vs MVP)
- Gantt chart (6-week phases)

---

## SEO Optimization

### **Meta Tags**
```html
<title>AI MVP Builder | From Idea to Product in 6 Weeks | AMO AI</title>
<meta name="description" content="We turn product ideas into working MVPs — scoped, architected, and built for market validation. Ship in 6 weeks. Skip the 6-month cycle. Production-grade, not throwaway." />
```

### **Structured Data**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI MVP Builder",
  "provider": {
    "@type": "Organization",
    "name": "AMO AI"
  },
  "description": "6-week MVP development service",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "15000-40000",
    "priceValidUntil": "2026-12-31"
  }
}
```

### **Open Graph**
```html
<meta property="og:title" content="AI MVP Builder | From Idea to Product in 6 Weeks" />
<meta property="og:description" content="Ship your AI product in 6 weeks. Production-grade MVPs for validation, not throwaway prototypes." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.amoai.ca/services/mvp-builder" />
```

---

## CTA Strategy

### **Primary CTA** (appears 3 times)
- **Text**: "Start Your MVP Brief"
- **Link**: `/booking`
- **Locations**:
  1. Hero (green button)
  2. Bottom CTA (orange button)
  3. Possibly in Framework section (ghost button)

### **Secondary CTA** (appears 1 time)
- **Text**: "View MVPs We've Shipped"
- **Link**: `/projects`
- **Location**: Hero (ghost button)

### **CTA Hierarchy**
- Hero: Both CTAs equal prominence
- Bottom: Single orange CTA (most urgent)

---

## Success Metrics

### **User Flow**
1. Land on page (from Google, referral, or internal link)
2. Read hero → understand value proposition (6 weeks)
3. Scroll to comparison → understand differentiation (MVP vs traditional)
4. Review deliverables → understand what's included
5. Read framework → understand quality/approach
6. Identify with founder profile → recognize fit
7. Click CTA → book strategy session

### **Key Messages to Reinforce**
- ⚡ **Speed**: "6 weeks" appears 10+ times
- 💰 **Affordability**: "$15K-40K" vs "$100K-500K"
- 🏗️ **Quality**: "Production-grade" not "prototype"
- 🔄 **Validation**: "Build to learn" not "build to launch"
- 🚀 **Outcomes**: "3 raised funding" social proof

---

## Testing Checklist

### **Desktop (1280px+)**
- [ ] All sections render correctly
- [ ] Timeline dots animate on load
- [ ] Flow diagram is legible and animated
- [ ] Gantt chart draws correctly
- [ ] All cards hover properly
- [ ] CTAs are prominent and clickable
- [ ] Typography hierarchy is clear

### **Tablet (768px-1024px)**
- [ ] 2-column grids work properly
- [ ] Flow diagram remains legible
- [ ] Gantt chart scales appropriately
- [ ] Touch targets are 44px minimum

### **Mobile (375px-428px)**
- [ ] All sections stack correctly
- [ ] Timeline dots simplified but visible
- [ ] Flow diagram simplified (stacked not side-by-side)
- [ ] Gantt chart becomes horizontal scroll or simplified
- [ ] Phase cards become vertical timeline
- [ ] Framework cards stack (not 2x2)
- [ ] Profile cards stack (not 3-column)
- [ ] CTAs are full-width
- [ ] Text is readable (minimum 16px body)

### **Performance**
- [ ] Page loads < 3 seconds
- [ ] Animations are smooth (60fps)
- [ ] No layout shift (CLS < 0.1)
- [ ] Images lazy load
- [ ] SVGs are optimized

### **Accessibility**
- [ ] All images have alt text
- [ ] CTAs have clear labels
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Screen reader tested

---

## Implementation Notes

### **Route Configuration**
```typescript
// /routes.ts
import { createBrowserRouter } from "react-router";
import MVPBuilderPage from "./pages/MVPBuilderPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      // ... existing routes
      { 
        path: "services/mvp-builder", 
        Component: MVPBuilderPage 
      },
    ],
  },
]);
```

### **Page Component Structure**
```typescript
// /pages/MVPBuilderPage.tsx
import MVPHero from '../components/mvp/MVPHero';
import WhyMVPFirst from '../components/mvp/WhyMVPFirst';
import MVPDeliverables from '../components/mvp/MVPDeliverables';
import MVPFramework from '../components/mvp/MVPFramework';
import MVPWhoThisIsFor from '../components/mvp/MVPWhoThisIsFor';
import MVPBottomCTA from '../components/mvp/MVPBottomCTA';

export default function MVPBuilderPage() {
  return (
    <div className="bg-white">
      <MVPHero />
      <WhyMVPFirst />
      <MVPDeliverables />
      <MVPFramework />
      <MVPWhoThisIsFor />
      <MVPBottomCTA />
    </div>
  );
}
```

---

## Style Guide Compliance Checklist

- [ ] **Colors**: Only approved palette (Dark Teal, Lime Green, Orange, Off-white, Warm Beige)
- [ ] **Typography**: Playfair Display (headlines), Lora (body, labels)
- [ ] **Border Radius**: 0px everywhere (NO ROUNDED CORNERS)
- [ ] **Shadows**: None (NO BOX SHADOWS)
- [ ] **Animations**: Smooth, purposeful, scroll-driven
- [ ] **Layout**: Max-width 1320px, proper padding
- [ ] **Responsive**: Mobile-first, tested at all breakpoints
- [ ] **CTAs**: Prominent, properly colored, clear copy
- [ ] **Icons**: From lucide-react, properly sized
- [ ] **Consistency**: Matches /web-design page quality

---

## Launch Checklist

- [ ] All content proofread
- [ ] All links verified
- [ ] All animations tested
- [ ] Style guide compliance verified
- [ ] Responsive design tested
- [ ] Performance optimized
- [ ] Accessibility checked
- [ ] SEO meta tags added
- [ ] Analytics tracking configured
- [ ] Cross-browser tested (Chrome, Safari, Firefox, Edge)
- [ ] Mobile device tested (iOS, Android)
- [ ] Lighthouse score > 90
- [ ] Deployed to production
- [ ] Navigation links updated
- [ ] Sitemap updated

---

## Post-Launch Tasks

1. Monitor analytics for user behavior
2. Track CTA click-through rates
3. A/B test different CTA copy
4. Gather user feedback
5. Iterate based on data
6. Update content quarterly
7. Refresh case studies / social proof

---

## Success Criteria

✅ **Page complete when**:
- All 6 sections render perfectly
- Style guide 100% compliant
- Responsive across all devices
- Animations smooth and purposeful
- CTAs prominent and functional
- SEO optimized
- Performance score > 90
- Matches /web-design page quality

✅ **Business success when**:
- 10%+ of visitors click "Start Your MVP Brief"
- Avg. time on page > 2 minutes
- Bounce rate < 60%
- 5+ qualified leads per month from this page

---

## Document Version
**Version**: 1.0  
**Date**: 2026-02-27  
**Status**: Ready for Implementation  
**Estimated Build Time**: 3-4 days (full-time)
