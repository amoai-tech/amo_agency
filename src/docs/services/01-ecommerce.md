# E-Commerce AI Services Page — Complete Documentation

**Last Updated:** February 10, 2026  
**Page URL:** `/industries/e-commerce`  
**Design System:** Luxury Editorial V11 (BCG-inspired)

---

## Overview

The E-Commerce AI Services page is a comprehensive industry-specific landing page designed to showcase AMO AI's expertise in AI-powered e-commerce transformation. The page targets DTC founders, Shopify/WooCommerce store owners, e-commerce CMOs, and marketplace operators with the goal of driving strategy call bookings and AI readiness assessments.

---

## Page Architecture

### URL Structure
- Primary: `/industries/e-commerce`
- Alternative: `/ecommerce`

### Meta Information
- **Title Tag:** AI for E-Commerce | AMO AI
- **Target Audience:** DTC founders, Shopify/WooCommerce store owners, e-commerce CMOs, marketplace operators
- **Conversion Goal:** Book strategy call → AI readiness assessment

---

## Section Breakdown

### Section 1: Hero
**Component:** `EcommerceHero.tsx`

**Purpose:** Immediate impact and value proposition

**Key Elements:**
- Breadcrumb navigation: `Industries › E-Commerce`
- Industry tag: `AI FOR E-COMMERCE`
- Hero headline: `E-Commerce`
- Compelling subheadline about AI transformation
- High-quality hero image with dark overlay
- Primary CTA: "Book a Strategy Call →"

**Design Specs:**
- Background: Dark teal (#0F3D3E) with 85% overlay
- Typography: Playfair Display 6xl-7xl for headline
- CTA Button: Lime green (#84CC16), no rounded corners
- Padding: py-32 lg:py-40

**Animations:**
- Staggered fade-in for all elements
- Smooth transitions on CTA hover

---

### Section 2: Introduction Copy
**Component:** `EcommerceIntro.tsx`

**Purpose:** Frame the problem and establish market context

**Content:**
- Two paragraphs explaining the AI e-commerce shift
- Highlights 4,700% YoY growth in AI-driven traffic
- Emphasizes urgency and competitive advantage

**Design Specs:**
- Background: White
- Max width: 5xl (1024px)
- Typography: Lora text-lg/xl with relaxed leading
- Padding: py-24 lg:py-32

---

### Section 3: Key Stats
**Component:** `EcommerceStats.tsx`

**Purpose:** Data-driven credibility with BCG-style metrics

**Stats Displayed:**
1. **4,700%** - GenAI Search Growth
2. **-76%** - Customer Acquisition Cost reduction
3. **$324K** - Average AI Investment
4. **+40%** - Revenue Increase (Leaders)

**Design Specs:**
- Background: Warm cream (#FAF8F6)
- Layout: 4-column responsive grid
- Numbers: Playfair Display 5xl-6xl in lime green
- Border: Left 2px lime green accent
- Animations: Staggered fade-in with 0.1s delay between stats

---

### Section 4: Our Approach
**Component:** `EcommerceApproach.tsx`

**Purpose:** Establish expertise and methodology

**Key Elements:**
- Section title with lime green underline
- Body copy explaining end-to-end approach
- Emphasis on innovation and quick value delivery

**Design Specs:**
- Background: White
- Green accent line: 48px wide, 3px tall
- Max width: 5xl
- Typography: Playfair Display for heading, Lora for body

---

### Section 5: Framework (3 Tabs)
**Component:** `EcommerceFramework.tsx`

**Purpose:** BCG-style process visualization

**Tab Structure:**
1. **Set the Direction** - 5-step implementation flow
2. **Define the Customer Journey** - 5 stages (Awareness → Loyalty)
3. **Deploy & Scale Timeline** - 4 phases with ROI timelines

**Design Specs:**
- Background: Warm cream (#FAF8F6)
- Border: Clean gray borders, no rounded corners
- Active tab: Lime green bottom border
- Process flow: Numbered circles with green borders
- Arrows between steps for visual flow

**Interaction:**
- Tab switching with smooth AnimatePresence transitions
- Hover states on tabs

---

### Section 6: Service Cards (6 Cards)
**Component:** `EcommerceServiceCards.tsx`

**Purpose:** Detailed service offerings with ROI metrics

**Card Grid:** 3×2 layout (2 columns on mobile, 3 on large screens)

**Service Cards:**
1. **Hyper-Personalization Engine** (HIGH DEMAND badge - green)
2. **AI Cart Recovery Agent** (QUICK WIN badge - purple)
3. **Conversational Commerce** (2026 TREND badge - blue)
4. **AI Email & SMS Automation** (PROVEN ROI badge - orange)
5. **Visual Search & Discovery** (GROWING FAST badge - green)
6. **AI Fraud Detection** (ESSENTIAL badge - blue)

**Card Anatomy:**
- Large faded number (01-06) in top-right
- Colored badge with uppercase label
- Service title (Playfair Display 2xl-3xl)
- Description paragraph
- Feature tags (bordered chips)
- ROI metric with large green number
- Real-world example (bordered left with green accent)
- Build cost and Time-to-ROI footer

**Design Specs:**
- Border: 1px gray, hover → light gray background
- No shadows, no rounded corners
- Hover: Subtle background color change
- Typography: Mix of Playfair Display and Lora

---

### Section 7: ROI Chart (Exhibit 1)
**Component:** `EcommerceROIChart.tsx`

**Purpose:** BCG-style data visualization

**Chart Elements:**
- Label: "EXHIBIT 1" (uppercase, tracked)
- Title: "E-Commerce AI ROI by Application Area"
- Horizontal bars with animated green fills
- 5 data points with metrics

**Design Specs:**
- Background: Warm cream (#FAF8F6)
- Container: White bordered box
- Bar animations: 1.2s ease-out with staggered delays
- Max width relative to data values
- Clean, editorial presentation

---

### Section 8: Tools & Resources
**Component:** `EcommerceTools.tsx`

**Purpose:** Assessment capabilities and proprietary tools

**Content:**
- Section title with green accent line
- Intro paragraph
- 2×2 grid of assessment types:
  1. Experience Assessment
  2. Design Assessment
  3. Technical Assessment
  4. Capability Assessment

**Design Specs:**
- Background: White
- Checkmark icons in lime green
- 2-column responsive grid
- Typography: Playfair Display for titles, Lora for descriptions

---

### Section 9: Suggested Additional Services
**Component:** `EcommerceSuggestedServices.tsx`

**Purpose:** Complementary offerings

**Services (4 cards):**
1. AI Product Descriptions (FileText icon)
2. Review Management AI (Star icon)
3. Demand Forecasting (TrendingUp icon)
4. Customer Segmentation (Users icon)

**Design Specs:**
- Background: Warm cream (#FAF8F6)
- Layout: 4-column responsive grid
- Border: Gray default, green on hover
- Hover: Light green background (#f0fdf4)
- Icons: Lucide-react in lime green

---

### Section 10: Insights Cards
**Component:** `EcommerceInsights.tsx`

**Purpose:** Thought leadership and content marketing

**Card Elements (4 cards):**
- Gradient image areas (blue, teal, purple, orange)
- Category tag (E-COMMERCE, STRATEGY, etc.)
- Publication date
- Headline
- Hover effects

**Design Specs:**
- Background: White
- Layout: 4-column responsive grid
- Gradient overlays: Dark tones for editorial feel
- CTA button: "See more insights →" (outlined)

---

### Section 11: Related Services
**Component:** `EcommerceRelatedServices.tsx`

**Purpose:** Cross-selling related capabilities

**Services (3 cards):**
1. Marketing and Sales AI (light green gradient)
2. Digital Marketing (light blue gradient)
3. Digital Sales (light yellow gradient)

**Design Specs:**
- Background: Warm cream (#FAF8F6)
- Layout: Horizontal cards with text + gradient
- Border: Gray default, green on hover
- Arrow icon translates on hover

---

### Section 12: CTA Band
**Component:** `EcommerceCTA.tsx`

**Purpose:** Final conversion opportunity

**Content:**
- Headline: "Ready to transform your e-commerce with AI?"
- Body: Free AI readiness assessment offer
- CTA: "Book Your Free Assessment →"

**Design Specs:**
- Background: Light gray (#f3f4f6)
- Center-aligned content
- Max width: 4xl
- Green CTA button with hover state

---

## Design System Specifications

### Color Palette
```css
Dark Teal:       #0F3D3E  /* Hero backgrounds */
Lime Green:      #84CC16  /* Accents, CTAs, metrics */
Green Hover:     #65A30D  /* Button hover states */
Warm Cream:      #FAF8F6  /* Alternating sections */
Pure White:      #FFFFFF  /* Primary sections */
Light Gray:      #f3f4f6  /* CTA bands */
Border Gray:     #d1d5db  /* Card borders */
Text Dark:       #0F3D3E  /* Headings */
Text Medium:     #374151  /* Body copy */
Text Light:      #6b7280  /* Secondary text */
```

### Typography
```css
Headings:        'Playfair Display', serif
Body:            'Lora', serif
Hero Size:       text-6xl lg:text-7xl
Section Title:   text-4xl lg:text-5xl
Card Title:      text-2xl lg:text-3xl
Body Large:      text-lg lg:text-xl
Body Regular:    text-base
Labels:          text-xs (uppercase, tracking-[0.2em])
```

### Layout & Spacing
```css
Max Width:       max-w-7xl (1280px)
Content Width:   max-w-5xl (1024px)
Section Padding: py-24 lg:py-32 (96px - 128px)
Card Padding:    p-8 lg:p-10 (32px - 40px)
Grid Gap:        gap-6 lg:gap-8
```

### Component Patterns

**Buttons:**
- No rounded corners (BCG style)
- Inline-flex with gap-3 for icon + text
- Hover: Color transition + icon transform
- Variants: Filled (green), Outlined (green border)

**Cards:**
- Border: 1px solid gray
- No shadows
- No rounded corners
- Hover: Border color change or background tint

**Badges:**
- Solid color backgrounds
- Uppercase text-xs with tracking
- Various colors for category coding

**Section Headers:**
- Title + 12px × 3px green accent line
- Optional intro paragraph
- Consistent spacing pattern

---

## Animations & Interactions

### Scroll Animations
- Hook: `useScrollAnimation()` from `/lib/hooks/useScrollAnimation`
- Pattern: Fade-in from bottom (y: 40)
- Duration: 0.8s
- Staggered delays: 0.1s increments for grid items

### Hover States
- Buttons: Background color + icon translation
- Cards: Border color + background tint
- Links: Color change + underline
- Icons: Translation or scale

### Tab Switching
- AnimatePresence for smooth transitions
- Fade + vertical movement (y: 20)
- Duration: 0.5s

### Chart Animations
- Bars animate from 0 to full width
- Duration: 1.2s ease-out
- Staggered by 0.1s per bar

---

## Component Dependencies

### External Libraries
```typescript
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, FileText, Star, TrendingUp, Users } from 'lucide-react';
```

### Internal Hooks
```typescript
import { useScrollAnimation } from '../../lib/hooks/useScrollAnimation';
```

### Assets
- Hero image: Unsplash (person shopping with mobile)
- All other images: Gradient overlays or Unsplash queries

---

## Accessibility Features

1. **Semantic HTML**
   - Proper heading hierarchy (h1, h2, h3)
   - Section elements for major content blocks
   - Button elements for interactive CTAs

2. **Keyboard Navigation**
   - All interactive elements are keyboard accessible
   - Tab focus styling maintained
   - Tab switching via keyboard

3. **Screen Readers**
   - Descriptive alt text for images
   - ARIA labels where needed
   - Proper button labels

4. **Color Contrast**
   - All text meets WCAG AA standards
   - Green (#84CC16) on dark teal (#0F3D3E) ≥ 4.5:1
   - Dark text on white backgrounds ≥ 7:1

---

## Mobile Responsiveness

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px

### Mobile Adaptations
1. **Hero:** Reduced padding, smaller typography
2. **Stats:** 1-column stacked on mobile, 2-column on tablet
3. **Framework:** Vertical layout on mobile, horizontal on desktop
4. **Service Cards:** 1-column on mobile, 2-column on desktop
5. **All Grids:** Responsive column adjustments

### Touch Interactions
- Larger tap targets (min 44px × 44px)
- Swipe gestures for carousel (if added)
- No hover-dependent functionality

---

## Performance Optimizations

1. **Image Loading**
   - Unsplash images with optimized parameters
   - Lazy loading via native `loading="lazy"`
   - Proper image dimensions specified

2. **Animation Performance**
   - Motion/react uses GPU acceleration
   - Transform and opacity only (no layout thrashing)
   - Reduced motion respects user preferences

3. **Code Splitting**
   - Each section is a separate component
   - Lazy loading potential for below-fold content

4. **Font Loading**
   - Google Fonts with `display=swap`
   - Preconnect to font domains

---

## Content Strategy

### Key Messages
1. **Problem Framing:** AI is reshaping e-commerce search and discovery
2. **Opportunity:** 4,700% growth in AI-driven traffic
3. **Solution:** End-to-end AI transformation approach
4. **Proof:** Real ROI metrics and case studies
5. **Process:** Clear frameworks and timelines
6. **Action:** Free assessment with low barrier to entry

### SEO Keywords
- AI e-commerce
- E-commerce personalization
- Cart recovery AI
- Conversational commerce
- E-commerce AI transformation
- Shopify AI
- DTC AI automation

### Conversion Funnel
1. **Awareness:** Hero + stats establish credibility
2. **Interest:** Framework + approach show expertise
3. **Consideration:** Service cards provide detailed offerings
4. **Decision:** ROI chart + case studies provide proof
5. **Action:** Multiple CTAs (hero, middle, end) drive booking

---

## Future Enhancements

### Potential Additions
1. **Interactive ROI Calculator:** User inputs their metrics, sees projected ROI
2. **Live Chat Widget:** AI-powered chat for immediate engagement
3. **Video Testimonials:** E-commerce clients sharing results
4. **Case Study Deep Dives:** Linked from insights section
5. **Decision Tree Tool:** Interactive "Which AI service first?" flowchart
6. **Dynamic Pricing Calculator:** Based on store size and requirements

### A/B Testing Opportunities
1. Hero CTA copy variants
2. Service card order (which services convert best)
3. Stat selection (test different metrics)
4. CTA button colors and copy
5. Framework tab default (which tab opens first)

---

## Integration Points

### Navigation
- Accessible from Industries dropdown
- Breadcrumb navigation to parent pages
- Related services link to other capability pages

### Booking Flow
- All CTAs route to `/booking` page
- Pre-populate "E-Commerce" as service interest
- Include UTM parameters for tracking

### Analytics Tracking
- Section scroll depth
- CTA click tracking
- Tab interaction events
- Service card hover/click events
- Time on page metrics

---

## Maintenance & Updates

### Regular Updates
- **Monthly:** Update stats with latest data
- **Quarterly:** Refresh insights/blog post links
- **Annually:** Review and update service offerings

### Content Refresh Cadence
- Real-world examples: Every 3-6 months
- ROI metrics: As new data becomes available
- Case studies: Add new success stories quarterly
- Images: Refresh hero/section images annually

---

## Component File Structure

```
/components/
  ├── EcommercePage.tsx              # Main page component
  └── ecommerce/
      ├── index.ts                   # Barrel exports
      ├── EcommerceHero.tsx          # Section 1
      ├── EcommerceIntro.tsx         # Section 2
      ├── EcommerceStats.tsx         # Section 3
      ├── EcommerceApproach.tsx      # Section 4
      ├── EcommerceFramework.tsx     # Section 5
      ├── EcommerceServiceCards.tsx  # Section 6
      ├── EcommerceROIChart.tsx      # Section 7
      ├── EcommerceTools.tsx         # Section 8
      ├── EcommerceSuggestedServices.tsx  # Section 9
      ├── EcommerceInsights.tsx      # Section 10
      ├── EcommerceRelatedServices.tsx    # Section 11
      └── EcommerceCTA.tsx           # Section 12
```

---

## Technical Implementation Notes

### State Management
- No global state required
- Local state for tab switching in Framework component
- Navigation via prop drilling (`onNavigate`)

### Props Interface
```typescript
interface EcommercePageProps {
  onNavigate?: (page: string) => void;
}
```

### Error Handling
- Graceful fallbacks for image loading
- Default states for dynamic content
- TypeScript for type safety

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features used
- CSS Grid and Flexbox layouts
- Motion/react polyfills for older browsers

---

## BCG-Style Design Elements

### Key Visual Patterns
1. **Exhibit Boxes:** Bordered containers with label + title
2. **Process Flows:** Numbered steps with arrows
3. **Stat Callouts:** Large numbers with context
4. **Minimal Color Palette:** Primarily grayscale with green accent
5. **No Shadows:** Flat design with borders only
6. **Square Corners:** No border-radius anywhere
7. **Editorial Typography:** Serif fonts for premium feel

### Inspiration References
- BCG annual reports and industry reports
- McKinsey Quarterly layouts
- Bain & Company capability pages
- Premium editorial design systems

---

## Testing Checklist

### Visual Testing
- [ ] All sections render correctly on desktop
- [ ] All sections render correctly on mobile
- [ ] Animations trigger on scroll
- [ ] Tab switching works smoothly
- [ ] Hover states work on all interactive elements
- [ ] Images load correctly
- [ ] Typography scales properly at all breakpoints

### Functional Testing
- [ ] All CTAs route to booking page
- [ ] Navigation prop is passed correctly
- [ ] Stats animate in correct order
- [ ] Framework tabs switch correctly
- [ ] Chart bars animate with correct timing
- [ ] Scroll animations fire once per section

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast passes WCAG AA
- [ ] Focus indicators visible
- [ ] Semantic HTML structure

### Performance Testing
- [ ] Page loads in < 3 seconds
- [ ] Images optimized
- [ ] No layout shifts (CLS)
- [ ] Smooth animations (60fps)
- [ ] First Contentful Paint < 1.5s

---

## Version History

### v1.0.0 (February 10, 2026)
- Initial release
- 12 sections implemented
- Full BCG-style design system
- Mobile responsive
- Scroll animations
- Complete documentation

---

*End of Documentation*
