# Service Page Template Guide
**Version 2.0 - Crystal Clear Edition**

## 🎯 Quick Start: Create a New Service Page in 3 Steps

### Step 1: Copy the Web Design Page Structure
The `/web-design` page is your reference. Every new service page should follow this exact structure.

### Step 2: Use Reusable Components from `/style-guide`
Import pre-built components instead of recreating them. These are battle-tested and consistent.

### Step 3: Customize Only the Content
Change the text, images, and data—but keep the visual design system identical.

---

## 📋 What You're Building

Every service page has **9 core sections** that follow this sequence:

```
01. HERO → Dark, cinematic intro with device mockups
02. SERVICES GRID → Beige background, 6 colorful cards
03. COMPARISON → Gray background, "Traditional vs Our Way"
04. RELATED SERVICES → White background, 3x3 image grid
05. METRICS → Gray background, performance data
06. FEATURES → Dark background, 3-column feature cards
07. PROCESS → White/Beige, timeline or Gantt chart
08. EXPLORE MORE → White background, asymmetric card layout
09. CTA → Dark background, final call-to-action
```

---

## 🔍 Reference Implementation: `/web-design` Page

### Actual Components Used:

| # | Section | Component File | What It Does |
|---|---------|---------------|--------------|
| 01 | Hero | `WebDesignHero.tsx` | Cinematic hero with laptop/phone mockups on dark background |
| 02 | Services Grid | `WebDesignServicesGrid.tsx` | 6 cards with varied colors, rounded corners, images |
| 03 | Comparison | `WhyAIPowered.tsx` | Timeline bars + comparison tables (Traditional vs AI) |
| 04 | Related Services | `AIServicesGrid.tsx` | 3x3 grid with hover overlay effects |
| 05 | Metrics | `PerformanceFirst.tsx` | Lighthouse gauges + performance data |
| 06 | Features | `BuiltInIntelligence.tsx` | Dark section with 3 glass-morphism cards |
| 07 | Process | `WebDesignProcess.tsx` | Dark gradient with vertical timeline (left: metrics, right: 5 steps) |
| 08 | Explore More | `ExploreMore.tsx` | 60/40 split with large dark card + 2 stacked light cards |
| 09 | CTA | `WebDesignCTA.tsx` | Dark background with centered headline + lime button |

**Location:** `/pages/WebDesignPage.tsx`

---

## 🎨 The Design System (from `/web-design`)

### Visual Elements You MUST Follow:

#### 🎨 Colors
```css
/* Backgrounds */
#0F3D3E  → Dark teal (Hero, CTA, Features sections)
#F4F3EE  → Beige (Services Grid, Process sections)
#F3F4F6  → Light gray (Comparison, Metrics sections)
#FFFFFF  → White (Related Services, Explore More)

/* Accents */
#84CC16  → Lime green (CTAs, icons, highlights)

/* Card Color Palette (for Services Grid) */
#B8956B  → Tan/brown
#E8D4D8  → Pink/blush
#1A5063  → Teal
#1A4642  → Dark green/teal
#E6E3D0  → Cream/beige
#A8CED8  → Light blue
```

#### 📏 Border Radius (Rounded Corners)
```css
Cards:          rounded-3xl or rounded-[20px]
Buttons:        rounded-full
Charts/Bars:    rounded-xl
Images:         rounded-lg or rounded-2xl
Phone mockups:  rounded-[2.5rem]
```

#### 🌑 Shadows
```css
Cards:                shadow-lg or shadow-2xl
Device mockups:       shadow-2xl
Hover buttons:        hover:shadow-lg hover:shadow-[#84CC16]/30
```

#### 🎭 Typography
```css
Headlines:      font-['Playfair_Display'] text-5xl lg:text-6xl
Body text:      font-['Lora'] text-lg
Card text:      system-ui, -apple-system (inside service cards)
Eyebrows:       font-['Lora'] uppercase tracking-widest text-xs
```

#### ⏱️ Animations
```tsx
// Standard entrance animation
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}

// Staggered delays for grids
delay: index * 0.1

// Hover lift effect
whileHover={{ y: -4 }}
```

---

## 🧩 Reusable Components from `/style-guide`

### Component Library (Import These!)

Located in `/components/style-guide/StyleGuideComponents.tsx`:

#### 1️⃣ MetricCard
**When to use:** Displaying stats, numbers, KPIs

```tsx
import { MetricCard } from '../components/style-guide/StyleGuideComponents';

<MetricCard
  value="94%"
  label="Client Satisfaction"
  trend="+12% from last quarter"
  icon={<Users className="w-6 h-6" />}
  variant="light" // or "dark"
/>
```

**Props:**
- `value`: string (e.g., "94%", "6 weeks", "<2hrs")
- `label`: string (description below value)
- `trend?`: string (optional trend indicator)
- `icon?`: React.ReactNode (Lucide icon)
- `variant?`: "light" | "dark" (default: "light")

**Features:**
- Playfair Display for numbers
- Lora for labels
- Lime green accent color
- Hover lift effect
- Border changes to lime on hover

---

#### 2️⃣ ServiceCard
**When to use:** Service descriptions with feature lists

```tsx
import { ServiceCard } from '../components/style-guide/StyleGuideComponents';

<ServiceCard
  title="AI Chatbots"
  description="Intelligent conversational agents powered by NLP."
  features={[
    'Natural language understanding',
    '24/7 automated support',
    'Multi-language support',
    'Seamless CRM integration'
  ]}
  icon={<Brain className="w-8 h-8" />}
  variant="light"
/>
```

**Props:**
- `title`: string
- `description`: string
- `features`: string[] (array of bullet points)
- `icon`: React.ReactNode (Lucide icon)
- `variant?`: "light" | "dark"

**Features:**
- Icon in lime green square
- Checkmark bullets (lime green)
- "Learn More" CTA button
- Hover lift effect

---

#### 3️⃣ FrameworkTab
**When to use:** Multi-step processes with tabbed navigation

```tsx
import { FrameworkTab } from '../components/style-guide/StyleGuideComponents';

<FrameworkTab
  variant="light"
  tabs={[
    {
      id: 'discover',
      label: 'Discover',
      content: {
        title: 'Discovery & Research',
        description: 'Deep analysis of your business challenges...',
        points: [
          'Stakeholder interviews',
          'Technical assessment',
          'Competitive analysis',
          'AI opportunity identification'
        ]
      }
    },
    // Add more tabs...
  ]}
/>
```

**Props:**
- `tabs`: Array of tab objects with id, label, and content
- `variant?`: "light" | "dark"

**Features:**
- Active tab highlighted in lime green
- Numbered points in grid layout
- Smooth transitions between tabs

---

#### 4️⃣ InsightCard
**When to use:** Blog posts, case studies, articles

```tsx
import { InsightCard } from '../components/style-guide/StyleGuideComponents';

<InsightCard
  category="AI Strategy"
  title="Building Enterprise AI That Scales"
  excerpt="Learn how leading companies deploy AI at scale..."
  readTime="6 min read"
  gradient="linear-gradient(135deg, #0F3D3E 0%, #2E6F5E 100%)"
  variant="light"
/>
```

**Props:**
- `category`: string (badge at top)
- `title`: string
- `excerpt`: string
- `readTime`: string
- `gradient`: CSS gradient string
- `variant?`: "light" | "dark"

**Features:**
- Gradient header with category badge
- Hover lift effect
- "Read Article →" link
- Read time in footer

---

#### 5️⃣ GanttChart
**When to use:** Project timelines, deliverables schedules

```tsx
import GanttChart from '../components/style-guide/GanttChart';

<GanttChart />
```

**What it displays:**
- Week labels (Week 1-6)
- 5 horizontal bars showing project phases
- Color-coded phases (lime, teal, green)
- Staggered animations
- White card container on beige background

**Section structure:**
- Eyebrow: "DELIVERABLES" (uppercase, lime green)
- Headline: "From Concept to Deployed Product"
- Body: Explanation paragraph
- Visual: Gantt chart with animated bars

---

## 📦 Complete Page Template Code

### File: `/pages/YourServicePage.tsx`

```tsx
import YourServiceHero from '../components/your-service/YourServiceHero';
import YourServiceServicesGrid from '../components/your-service/YourServiceServicesGrid';
import WhyYourService from '../components/your-service/WhyYourService';
import AIServicesGrid from '../components/web-design/AIServicesGrid'; // Reuse!
import YourServiceMetrics from '../components/your-service/YourServiceMetrics';
import BuiltInYourService from '../components/your-service/BuiltInYourService';
import YourServiceProcess from '../components/your-service/YourServiceProcess';
import ExploreMore from '../components/web-design/ExploreMore'; // Reuse!
import YourServiceCTA from '../components/your-service/YourServiceCTA';

export default function YourServicePage() {
  return (
    <div className="bg-white">
      <YourServiceHero />
      <YourServiceServicesGrid />
      <WhyYourService />
      <AIServicesGrid /> {/* Reuse from web-design */}
      <YourServiceMetrics />
      <BuiltInYourService />
      <YourServiceProcess />
      <ExploreMore /> {/* Reuse from web-design */}
      <YourServiceCTA />
    </div>
  );
}
```

---

## 🎯 Step-by-Step: Build Each Section

### 01 - HERO SECTION

**File:** `/components/your-service/YourServiceHero.tsx`

**Copy from:** `/components/web-design/WebDesignHero.tsx`

**What to change:**
1. Background image URL (line 4)
2. Eyebrow text (line 38-40)
3. Headline + italic text (line 44-53)
4. Supporting paragraph (line 56-64)
5. CTA button text (line 77)
6. Device mockup content (lines 109-206)

**What to keep:**
- Dark gradient overlay
- Two-column layout
- Lime green CTAs
- Animation patterns
- Device mockup structure

**Key code snippet:**
```tsx
// Background with overlay
<div className="absolute inset-0">
  <img src={backgroundImg} alt="" className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
</div>

// Headline structure
<h1 className="text-5xl lg:text-7xl xl:text-8xl mb-8 text-white leading-[1.1]"
    style={{ fontFamily: 'Playfair Display, serif' }}>
  Your headline text,{' '}
  <span className="italic">with italic emphasis</span>
</h1>
```

---

### 02 - SERVICES GRID

**File:** `/components/your-service/YourServiceServicesGrid.tsx`

**Copy from:** `/components/web-design/WebDesignServicesGrid.tsx`

**What to change:**
1. Eyebrow label (line 108)
2. Headline (line 116)
3. Description paragraph (line 118)
4. Service cards data array (lines 24-91)

**Card data structure:**
```tsx
const servicesData: ServiceCardData[] = [
  {
    id: 'unique-id',
    title: 'Card Title',
    description: 'Card description text (under 100 words)',
    backgroundColor: '#B8956B', // Use palette colors
    textColor: '#FFFFFF', // White or #2A2A2A
    imageUrl: 'https://images.unsplash.com/...',
    imagePosition: 'bottom', // or 'center', 'right'
    size: 'normal', // or 'wide'
    gradient?: 'linear-gradient(...)', // Optional
    cta?: { text: 'Learn more', link: '/page' } // Optional
  },
  // 5 more cards...
];
```

**Grid layout:**
```tsx
// Top row: 4-3-5 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-6">
  <div className="lg:col-span-4">Card 1</div>
  <div className="lg:col-span-3">Card 2</div>
  <div className="lg:col-span-5">Card 3 (Wide)</div>
</div>

// Bottom row: 5-3-4 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
  <div className="lg:col-span-5">Card 4 (Wide)</div>
  <div className="lg:col-span-3">Card 5</div>
  <div className="lg:col-span-4">Card 6</div>
</div>
```

**Important CSS:**
```tsx
// Card wrapper
style={{
  background: service.gradient || service.backgroundColor,
  borderRadius: '20px',
  minHeight: '340px',
}}

// Hover effect
whileHover={{
  y: -4,
  transition: { duration: 0.3 }
}}
```

---

### 03 - COMPARISON SECTION

**File:** `/components/your-service/WhyYourService.tsx`

**Copy from:** `/components/web-design/WhyAIPowered.tsx`

**What to change:**
1. Eyebrow label (line 37)
2. Headline (line 50)
3. Body copy paragraphs (lines 60-68)
4. Comparison data object (lines 8-25)
5. Timeline visualization labels (lines 81-115)

**Standard comparison dimensions:**
```tsx
const comparisonData = {
  traditional: {
    timeline: '3-6 months',
    cost: '$30,000+',
    performance: '60-75 score',
    support: 'Hourly billing',
    // Add more...
  },
  ourApproach: {
    timeline: '4-6 weeks',
    cost: 'Fixed price',
    performance: '90+ guaranteed',
    support: '30 days included',
    // Add more...
  }
};
```

**Timeline bars structure:**
```tsx
// Traditional (100% width, gray)
<motion.div
  className="bg-gray-400"
  initial={{ width: 0 }}
  animate={isInView ? { width: '100%' } : { width: 0 }}
  transition={{ duration: 2, delay: 0.5 }}
/>

// Our approach (25% width, lime green)
<motion.div
  className="bg-[#84CC16]"
  initial={{ width: 0 }}
  animate={isInView ? { width: '25%' } : { width: 0 }}
  transition={{ duration: 1, delay: 0.8 }}
/>
```

---

### 04 - RELATED SERVICES GRID

**File:** **REUSE** `/components/web-design/AIServicesGrid.tsx`

**Do not recreate this!** Import it directly:

```tsx
import AIServicesGrid from '../components/web-design/AIServicesGrid';
```

**What it includes:**
- 3x3 grid of AI services
- Full-height image cards
- Hover overlay that slides up
- Dark overlay with white text
- Links to service pages

**If you need to customize:**
1. Copy the file to your service folder
2. Change the `servicesData` array (lines 12-98)
3. Update images and descriptions

---

### 05 - METRICS / PERFORMANCE

**File:** `/components/your-service/YourServiceMetrics.tsx`

**Option A: Use MetricCard component**

```tsx
import { MetricCard } from '../components/style-guide/StyleGuideComponents';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export default function YourServiceMetrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-[#F3F4F6] py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="mb-4">
            <span className="text-xs uppercase tracking-widest text-[#84CC16] font-semibold font-['Lora']">
              PERFORMANCE
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl mb-6 text-[#1E3D36]"
              style={{ fontFamily: 'Playfair Display, serif' }}>
            Built for Speed and Scale
          </h2>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard value="90+" label="Lighthouse Score" variant="light" />
          <MetricCard value="<2s" label="Load Time" variant="light" />
          <MetricCard value="99.9%" label="Uptime" variant="light" />
        </div>
      </div>
    </section>
  );
}
```

**Option B: Copy from web-design**

Copy `/components/web-design/PerformanceFirst.tsx` which includes:
- Lighthouse gauges (circular progress)
- Animated bars
- Comparison metrics

---

### 06 - FEATURES / INTELLIGENCE

**File:** `/components/your-service/BuiltInYourService.tsx`

**Copy from:** `/components/web-design/BuiltInIntelligence.tsx`

**What to change:**
1. Eyebrow label (line 38)
2. Headline (line 46)
3. Body paragraph (line 54)
4. Feature cards data (lines 13-25)

**Standard feature card structure:**
```tsx
const features = [
  {
    icon: Brain, // Lucide icon
    title: 'Feature Name',
    description: 'Feature description (2-3 sentences max)'
  },
  // 2 more features...
];
```

**Dark section with pattern:**
```tsx
<section className="relative py-32 lg:py-40 overflow-hidden"
         style={{ backgroundColor: '#0F3D3E' }}>
  {/* Dot pattern background */}
  <div className="absolute inset-0 opacity-5"
       style={{
         backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
         backgroundSize: '30px 30px'
       }} />
  
  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
    {/* ... */}
  </div>
</section>
```

**Glass-morphism cards:**
```tsx
<motion.div
  className="bg-white/5 backdrop-blur-sm border border-[#84CC16]/20 p-8 rounded-2xl
             hover:border-[#84CC16] hover:-translate-y-2 transition-all duration-300">
  {/* Icon */}
  <Icon className="w-9 h-9 text-[#84CC16] mb-6" />
  
  {/* Title */}
  <h3 className="text-2xl text-white mb-4"
      style={{ fontFamily: 'Playfair Display, serif' }}>
    {feature.title}
  </h3>
  
  {/* Description */}
  <p className="text-white/70 leading-relaxed font-['Lora']">
    {feature.description}
  </p>
</motion.div>
```

---

### 07 - PROCESS / TIMELINE

**File:** `/components/your-service/YourServiceProcess.tsx`

**Option A: Dark process timeline (like web-design)**

Copy `/components/web-design/WebDesignProcess.tsx`:

```tsx
// Dark gradient background
style={{ background: 'linear-gradient(135deg, #0D2F2A 0%, #08342E 100%)' }}

// Two-column layout
// Left: Headline + 2 metrics
// Right: Vertical timeline with numbered circles + 5-6 steps
```

**Process step structure:**
```tsx
const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Step Title',
    description: 'Step description (2-3 sentences)'
  },
  // 4-5 more steps...
];
```

**Vertical timeline:**
```tsx
// Vertical line
<div className="absolute left-[17px] top-0 bottom-0 w-px"
     style={{ background: 'rgba(132, 204, 22, 0.2)' }} />

// Number circles
<div className="w-[36px] h-[36px] rounded-full border-2"
     style={{ borderColor: '#84CC16', backgroundColor: 'rgba(13, 47, 42, 1)' }}>
  <span style={{ color: '#84CC16', fontFamily: 'Playfair Display, serif' }}>
    {step.number}
  </span>
</div>
```

**Option B: Gantt chart timeline (for deliverables)**

```tsx
import GanttChart from '../components/style-guide/GanttChart';

export default function YourServiceProcess() {
  return (
    <section className="bg-[#F4F3EE] py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-widest text-[#84CC16] font-semibold font-['Lora']">
            DELIVERABLES
          </span>
          <h2 className="text-5xl lg:text-6xl mb-6 text-[#1E3D36]"
              style={{ fontFamily: 'Playfair Display, serif' }}>
            From Concept to Deployed Product
          </h2>
          <p className="text-lg text-[#1E3D36]/70 leading-relaxed font-['Lora']">
            Clear timeline with weekly milestones...
          </p>
        </div>
        
        {/* Gantt Chart */}
        <GanttChart />
      </div>
    </section>
  );
}
```

---

### 08 - EXPLORE MORE

**File:** **REUSE** `/components/web-design/ExploreMore.tsx`

**Do not recreate this!** Import it directly:

```tsx
import ExploreMore from '../components/web-design/ExploreMore';
```

**What it includes:**
- 60/40 asymmetric grid
- Large dark card (left): Dark teal with headline + CTA
- Two stacked light cards (right): Beige with text + cropped images
- Rounded corners (32px)
- Premium feel

**If you need to customize:**
1. Copy the file to your service folder
2. Update the card content (headlines, CTAs, images)
3. Keep the layout structure identical

---

### 09 - CTA SECTION

**File:** `/components/your-service/YourServiceCTA.tsx`

**Copy from:** `/components/web-design/WebDesignCTA.tsx`

**What to change:**
1. Headline (line 44)
2. Body paragraph (line 53)
3. CTA button text (line 67)
4. Optional sub-text below CTA

**Standard CTA structure:**
```tsx
<section className="relative py-32 lg:py-40 overflow-hidden"
         style={{ backgroundColor: '#0F3D3E' }}>
  {/* Dot pattern */}
  <div className="absolute inset-0 opacity-5"
       style={{
         backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
         backgroundSize: '30px 30px'
       }} />
  
  {/* Animated divider line at top */}
  <motion.div
    className="h-px bg-gradient-to-r from-transparent via-[#84CC16] to-transparent mb-20"
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1.5, delay: 0.2 }} />
  
  {/* Content - centered */}
  <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-4xl lg:text-5xl mb-8 text-white"
        style={{ fontFamily: 'Playfair Display, serif' }}>
      Your Compelling CTA Headline
    </h2>
    
    <p className="text-lg text-white/70 mb-12 font-['Lora'] max-w-2xl mx-auto">
      Supporting paragraph explaining the next step...
    </p>
    
    <button className="bg-[#84CC16] text-gray-900 px-10 py-4 rounded-full
                       font-['Lora'] font-semibold hover:bg-[#73b512]
                       hover:shadow-lg hover:shadow-[#84CC16]/30 transition-all">
      Primary CTA Text
    </button>
  </div>
</section>
```

---

## ✅ Final Checklist Before Launch

### Visual Consistency
- [ ] All cards use `rounded-3xl` (20px) corners
- [ ] All buttons use `rounded-full`
- [ ] Beige sections use `#F4F3EE`
- [ ] Gray sections use `#F3F4F6`
- [ ] Dark sections use `#0F3D3E`
- [ ] All CTAs use lime green `#84CC16`
- [ ] Service cards use colors from approved palette
- [ ] Shadows: `shadow-lg` on cards, `shadow-2xl` on mockups

### Typography
- [ ] Headlines use Playfair Display
- [ ] Body text uses Lora
- [ ] Eyebrows are uppercase with `tracking-widest`
- [ ] No custom font sizes (Tailwind classes only)
- [ ] Italics used for emphasis in headlines

### Animations
- [ ] All sections use `useInView` hook
- [ ] Entry animations: `opacity: 0, y: 40` → `opacity: 1, y: 0`
- [ ] Grid items have staggered delays: `index * 0.1`
- [ ] Hover effects: `y: -4` or `scale: 105`
- [ ] Timeline/bar animations use `scaleX` from left

### Content
- [ ] Headlines under 12 words
- [ ] Body paragraphs 2-3 max per section
- [ ] Card descriptions under 100 words
- [ ] All images have alt text
- [ ] All CTAs are action-oriented

### Components
- [ ] Used MetricCard for stats (where applicable)
- [ ] Used ServiceCard for features (where applicable)
- [ ] Reused AIServicesGrid (not recreated)
- [ ] Reused ExploreMore (not recreated)
- [ ] Used GanttChart for timelines (where applicable)

### Responsive
- [ ] Mobile: 1 column
- [ ] Tablet (md): 2 columns
- [ ] Desktop (lg+): 3 columns or 12-column grid
- [ ] Tested at 375px, 768px, 1024px
- [ ] Device mockups hidden on mobile (`hidden lg:block`)

### Performance
- [ ] All images use ImageWithFallback
- [ ] No custom font loading (globals.css only)
- [ ] Minimal inline styles
- [ ] Animations trigger only when in view

---

## 🚀 Quick Reference: Import Statements

```tsx
// Page component imports
import YourServiceHero from '../components/your-service/YourServiceHero';
import YourServiceServicesGrid from '../components/your-service/YourServiceServicesGrid';
import WhyYourService from '../components/your-service/WhyYourService';
import YourServiceMetrics from '../components/your-service/YourServiceMetrics';
import BuiltInYourService from '../components/your-service/BuiltInYourService';
import YourServiceProcess from '../components/your-service/YourServiceProcess';
import YourServiceCTA from '../components/your-service/YourServiceCTA';

// Reusable components (DO NOT RECREATE)
import AIServicesGrid from '../components/web-design/AIServicesGrid';
import ExploreMore from '../components/web-design/ExploreMore';

// Style guide components (USE THESE!)
import { MetricCard, ServiceCard, FrameworkTab, InsightCard } from '../components/style-guide/StyleGuideComponents';
import GanttChart from '../components/style-guide/GanttChart';

// Standard libraries
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { Brain, Zap, Users, TrendingUp, Check, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
```

---

## 📝 Content Guidelines

### Eyebrow Labels (ALL CAPS)
```
OUR SERVICES
THE ADVANTAGE
DELIVERABLES
PERFORMANCE
INTELLIGENCE
PROCESS TIMELINE
```

### Headline Patterns
```
"[Action] [Outcome], [italic emphasis]"
"High-converting landing pages, engineered for performance"
"Your AI Product, Live in 6 Weeks"
"Enterprise AI Systems, Built for Scale"
```

### Power Words to Use
- Engineered, deployed, production-grade, intelligent
- Real-time, automated, optimized, scalable
- Proven, measurable, guaranteed, validated

### CTA Patterns
**Primary:** Action + Benefit
- "Start Your MVP Brief"
- "Book a Strategy Call"
- "Get Your Free Audit"

**Secondary:** Exploration
- "View Case Studies"
- "See Our Work"
- "Explore Services"

---

## 🎯 Common Mistakes to Avoid

❌ **Don't recreate AIServicesGrid** → Import from web-design  
❌ **Don't recreate ExploreMore** → Import from web-design  
❌ **Don't use custom shadows** → Use Tailwind classes only  
❌ **Don't skip rounded corners** → All cards need rounded-3xl  
❌ **Don't forget beige backgrounds** → Services grid must be #F4F3EE  
❌ **Don't use different colors** → Stick to approved palette  
❌ **Don't create static timelines** → Use animations and stagger  
❌ **Don't ignore hover effects** → All cards need hover lift  
❌ **Don't skip useInView** → All sections need scroll-triggered animations  
❌ **Don't use different fonts** → Only Playfair Display + Lora  

---

## 📚 File Structure Example

```
/pages/
  ChatbotsPage.tsx                    # Your new page

/components/chatbots/
  ChatbotsHero.tsx                    # 01 - Custom hero
  ChatbotsServicesGrid.tsx            # 02 - Custom services grid
  WhyChatbots.tsx                     # 03 - Custom comparison
  ChatbotsMetrics.tsx                 # 05 - Custom metrics
  BuiltInChatbots.tsx                 # 06 - Custom features
  ChatbotsProcess.tsx                 # 07 - Custom process
  ChatbotsCTA.tsx                     # 09 - Custom CTA

/components/web-design/
  AIServicesGrid.tsx                  # 04 - REUSE THIS
  ExploreMore.tsx                     # 08 - REUSE THIS

/components/style-guide/
  StyleGuideComponents.tsx            # Import MetricCard, ServiceCard, etc.
  GanttChart.tsx                      # Import for timeline visualization
```

---

## 🎨 Color Palette Reference Card

Copy this for quick reference while building:

```css
/* Section Backgrounds */
--hero-bg:        #0F3D3E  /* Dark teal - Hero, CTA, Features */
--services-bg:    #F4F3EE  /* Beige - Services Grid, Process */
--alternate-bg:   #F3F4F6  /* Light gray - Comparison, Metrics */
--default-bg:     #FFFFFF  /* White - Related Services, Explore */

/* Accent Color */
--primary:        #84CC16  /* Lime green - CTAs, icons, highlights */

/* Service Card Colors (rotate through these) */
--card-tan:       #B8956B
--card-pink:      #E8D4D8
--card-teal:      #1A5063
--card-green:     #1A4642
--card-cream:     #E6E3D0
--card-blue:      #A8CED8

/* Text Colors */
--heading-dark:   #1E3D36  /* Deep green for headlines on light bg */
--text-dark:      #2A2A2A  /* Almost black */
--text-light:     #FFFFFF  /* White */
```

---

## 📞 Questions?

**Can't find a component?** Check `/components/web-design/` first.  
**Need a custom feature?** Use StyleGuideComponents library.  
**Stuck on animations?** Copy patterns from WebDesignHero.tsx.  
**Layout issues?** Use `grid-cols-12` with col-span for custom widths.

---

**Template Version:** 2.0  
**Last Updated:** February 27, 2025  
**Reference Page:** `/web-design`  
**Style Guide:** `/components/style-guide/`  
**Maintained by:** AMO AI Design Team
