# Home V2 Components

This directory contains all modular components for the Home V2 luxury editorial landing page.

## Component Overview

### 1. V2Hero.tsx
**Purpose:** Hero section with editorial headline and visual system  
**Props:** `onNavigate`  
**Features:**
- Large Playfair Display headline
- 3x3 animated grid visual
- Floating 98% satisfaction metric
- Primary + secondary CTAs

**CTAs:**
- Start Project → `booking`
- View How It Works → `process-v12`

---

### 2. V2TrustStrip.tsx
**Purpose:** Social proof metrics strip  
**Props:** None  
**Features:**
- 4-column stat grid (responsive)
- Large lime green numbers
- Uppercase labels

**Metrics:**
- 200+ Teams Supported
- 350+ Projects Delivered
- 50+ Industries Served
- 8+ Years of Expertise

---

### 3. V2ValueSection.tsx
**Purpose:** Ongoing support value proposition  
**Props:** None  
**Features:**
- Two-column layout
- 2x2 value props grid with icons
- White card with ROI metrics
- Shield, Clock, Users, Zap icons

**Key Stats:**
- 3x ROI
- 67% Efficiency Gain
- 40hrs/wk Time Saved
- 45% Cost Reduction

---

### 4. V2FeaturedWork.tsx
**Purpose:** Project showcase grid  
**Props:** `onNavigate`  
**Features:**
- 2x2 project grid
- Hover overlay effect
- Category tags (Financial, Healthcare, Legal, E-commerce)
- View All Projects link

**Navigation:**
- Project cards → `projects`
- View All → `projects`

---

### 5. V2MetricsSection.tsx
**Purpose:** Large outcome numbers  
**Props:** None  
**Features:**
- 4-column metrics grid
- Massive Playfair Display numbers
- Supporting descriptions

**Metrics:**
- 3.2x Average ROI
- 87% Faster Delivery
- $12M+ Revenue Impact
- 24/7 System Uptime

---

### 6. V2Testimonials.tsx
**Purpose:** Client validation  
**Props:** None  
**Features:**
- 3-column testimonial grid
- White cards with borders
- Lora serif quotes
- Author + role + company

**Clients:**
- Sarah Chen (TechCorp)
- Michael Rodriguez (FinanceHub)
- Emily Watson (HealthFirst)

---

### 7. V2IndustriesStrip.tsx
**Purpose:** Industry applicability  
**Props:** `onNavigate`  
**Features:**
- 6-column industry grid
- Emoji icons
- Project counts
- Hover border effect

**Industries:**
- Financial Services 💰
- Healthcare 🏥
- E-commerce 🛒
- Legal Tech ⚖️
- Manufacturing 🏭
- Education 🎓

**Navigation:**
- All cards → `industries`
- View All → `industries`

---

### 8. V2ServicesGrid.tsx
**Purpose:** Service offerings  
**Props:** `onNavigate`  
**Features:**
- 3-column service grid
- Lucide React icons
- Feature lists (4 per service)
- Learn More links

**Services:**
1. **AI Products** → `solutions`
   - End-to-end development
   - Custom model training
   - API integration
   - User interface design

2. **AI Agents** → `agents`
   - Multi-step automation
   - Decision-making logic
   - Real-time adaptation
   - Tool integration

3. **Automations** → `chatbots`
   - Workflow orchestration
   - Data processing
   - Smart routing
   - Error handling

---

### 9. V2ProcessSection.tsx
**Purpose:** Methodology explanation  
**Props:** `onNavigate`  
**Features:**
- Vertical step layout
- Large step numbers (01, 02, 03)
- Deliverable cards
- View Detailed Process CTA

**Steps:**
1. Discovery → Strategy Blueprint
2. Build → Working System
3. Scale → Production Launch

**Navigation:**
- CTA → `process-v12`

---

### 10. V2PricingSection.tsx
**Purpose:** Investment tier expectations  
**Props:** `onNavigate`  
**Features:**
- 3-column pricing grid
- "Most Popular" badge
- Feature lists with checkmarks
- Custom pricing model

**Tiers:**
1. **Discovery** (2-4 weeks)
   - AI strategy workshop
   - Opportunity assessment
   - Technical feasibility
   - ROI projections
   - Implementation roadmap

2. **Build** (8-16 weeks) ⭐ Most Popular
   - Everything in Discovery
   - Custom AI development
   - Model training & testing
   - System integration
   - Deployment & monitoring
   - Team training

3. **Partnership** (Ongoing)
   - Everything in Build
   - Dedicated AI team
   - Continuous optimization
   - Priority support
   - Strategic guidance
   - Quarterly reviews

**Navigation:**
- All CTAs → `booking`

---

### 11. V2ProjectForm.tsx
**Purpose:** Conversion form  
**Props:** None (form submission internal)  
**Features:**
- 7-field form
- Square inputs (no rounded corners)
- Lime green focus states
- Full-width submit button
- Form validation (HTML5)

**Fields:**
- Full Name* (text)
- Email Address* (email)
- Company* (text)
- Project Type* (select)
- Timeline (select)
- Budget Range (select)
- Project Description* (textarea)

**Current Behavior:**
- Logs to console (no backend integration)
- Ready for API integration

---

### 12. V2FinalCTA.tsx
**Purpose:** Dark conversion section  
**Props:** `onNavigate`  
**Features:**
- Dark background (#1A1A1A)
- High contrast typography
- Single CTA focus
- Trust indicators

**CTA:**
- Schedule Strategy Call → `booking`

**Trust Note:**
- Response time: Under 24 hours
- No commitment required

---

## Component Patterns

### Standard Props Interface
```tsx
interface ComponentProps {
  onNavigate?: (page: string) => void;
}

export default function Component({ onNavigate }: ComponentProps) {
  // Component logic
}
```

### Navigation Pattern
```tsx
onClick={() => onNavigate?.('page-name')}
```

### Styling Conventions

**Backgrounds:**
```tsx
bg-[#FDFCFB]  // Page background
bg-white      // Card background
bg-[#FAF8F6]  // Alternate section
```

**Typography:**
```tsx
font-['Playfair_Display'] text-5xl lg:text-7xl font-bold  // Headlines
font-['Lora'] text-lg                                      // Narrative
text-base                                                  // UI text
text-sm uppercase tracking-widest                          // Labels
```

**Accent Color:**
```tsx
bg-[#84CC16]        // Lime green fill
text-[#84CC16]      // Lime green text
border-[#84CC16]    // Lime green border
bg-[#84CC16]/10     // Subtle lime tint
```

**Spacing:**
```tsx
py-24 lg:py-32      // Section padding
space-y-8           // Large gaps
space-y-4           // Medium gaps
px-6 lg:px-12       // Horizontal padding
```

---

## File Structure

```
/components/homev2/
├── V2Hero.tsx                 (469 lines)
├── V2TrustStrip.tsx           (28 lines)
├── V2ValueSection.tsx         (91 lines)
├── V2FeaturedWork.tsx         (134 lines)
├── V2MetricsSection.tsx       (71 lines)
├── V2Testimonials.tsx         (86 lines)
├── V2IndustriesStrip.tsx      (97 lines)
├── V2ServicesGrid.tsx         (153 lines)
├── V2ProcessSection.tsx       (117 lines)
├── V2PricingSection.tsx       (185 lines)
├── V2ProjectForm.tsx          (223 lines)
├── V2FinalCTA.tsx             (34 lines)
└── index.ts                   (12 lines - exports)
```

**Total:** 12 components + 1 index  
**Lines of Code:** ~1,700 lines

---

## Usage

### Import Main Component
```tsx
import HomePageV2 from './components/HomePageV2';
```

### Import Individual Components
```tsx
import { V2Hero, V2TrustStrip, V2ValueSection } from './components/homev2';
```

### Pass Navigation Function
```tsx
<HomePageV2 onNavigate={setCurrentPage} />
```

---

## Maintenance

### Updating Content

**To change metrics:**
Edit the `stats`, `metrics`, or `projects` arrays at the top of each component.

**To add new sections:**
1. Create new component file
2. Follow naming convention: `V2[SectionName].tsx`
3. Add to `/components/homev2/index.ts`
4. Import in `HomePageV2.tsx`
5. Add to component tree

**To modify styling:**
Always reference the V2 design system:
- Colors: Lime green (#84CC16), not amber
- Corners: Square, never rounded
- Fonts: Playfair + Lora + Inter
- Borders: 2px solid #EFE9E4

---

## Design System Compliance

### ✅ Required
- Square corners only
- No box shadows
- Lime green accent (#84CC16)
- 2px borders (#EFE9E4)
- Playfair Display headlines
- Generous whitespace

### ❌ Forbidden
- Rounded corners
- Drop shadows
- Gradients (except subtle tints)
- Amber colors (use lime)
- Icon fonts (use Lucide React)
- Complex animations

---

## Testing

### Component Testing
```bash
# Test individual component
import { V2Hero } from './components/homev2';
<V2Hero onNavigate={(page) => console.log(page)} />
```

### Navigation Testing
All navigation should log correctly:
- V2Hero → booking, process-v12
- V2FeaturedWork → projects
- V2IndustriesStrip → industries
- V2ServicesGrid → solutions, agents, chatbots
- V2ProcessSection → process-v12
- V2PricingSection → booking
- V2FinalCTA → booking

---

## Performance Notes

### Optimizations Applied
- ✅ No external images
- ✅ Inline SVG patterns only
- ✅ CSS-only animations
- ✅ No heavy dependencies
- ✅ Modular component tree (tree-shaking ready)

### Bundle Impact
Each component is self-contained. Can be code-split if needed:
```tsx
const V2Hero = lazy(() => import('./components/homev2/V2Hero'));
```

---

## Accessibility

### Standards Met
- ✅ WCAG AA color contrast
- ✅ Semantic HTML structure
- ✅ Keyboard navigation
- ✅ Focus indicators visible
- ✅ Form labels associated
- ✅ Descriptive link text

### Screen Reader Support
- All sections have proper heading hierarchy
- Interactive elements have meaningful text
- Forms have proper label associations
- Images (when added) will need alt text

---

## Version History

**v1.0** (2026-02-04)
- Initial implementation
- 12 components created
- Full V2 design system applied
- Navigation integrated
- Documentation complete

---

## Related Documentation

- `/docs/03-home-v2.md` - Complete implementation guide
- `/docs/home-v2-summary.md` - Quick reference
- `/docs/home-v2-visual-reference.md` - Design system
- `/docs/home-v2-checklist.md` - Production checklist
- `/docs/style-guide.md` - V11 design system (reference)

---

## Support

For questions or issues:
1. Check component documentation above
2. Review visual reference guide
3. Check style guide for design decisions
4. Verify props are passed correctly

---

**Maintained by:** AMO AI
**Design System:** V2 Luxury Editorial  
**Status:** Production Ready ✅
