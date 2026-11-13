# DESIGN SPEC — /PROJECTS PAGE (V11)

**Page:** `/projects`  
**Purpose:** Showcase real AI platforms to prove execution capability  
**Design System:** Calm Luxury Editorial (V11)  
**Tone:** Premium · Intelligent · Calm · Sophisticated · Trustworthy

---

## 1. HERO SECTION

### Layout
- **Container:** `max-w-[1400px] mx-auto px-6 lg:px-16`
- **Padding:** `py-24 lg:py-32`
- **Alignment:** Center text alignment
- **Background:** `#FDFCFB`

### Content Hierarchy
```
[Small Label: CASE STUDIES]
  ↓ 16px spacing
[H1: "Real AI Products. Real Results."]
  ↓ 24px spacing
[H2 Subheadline: "Production-ready AI platforms built and delivered in 8 weeks."]
  ↓ 16px spacing
[Body: "No demos. No prototypes. Real systems in use."]
  ↓ 40px spacing
[CTA Row: Primary + Secondary buttons]
```

### Typography Specs
- **Label:** `text-xs uppercase tracking-widest text-[#999999] font-bold`
- **H1:** `text-5xl lg:text-7xl font-serif text-[#1A1A1A] tracking-tight`
- **Subheadline:** `text-2xl lg:text-3xl text-[#666666] font-light`
- **Body:** `text-lg text-[#999999]`

### CTAs
- **Primary:** `bg-[#1A1A1A] text-white px-10 py-5` → "Start Your Project"
- **Secondary:** `border border-[#1A1A1A] text-[#1A1A1A] px-10 py-5` → "View How We Work"

### Animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

---

## 2. PROJECT NAVIGATION STRIP (STICKY)

### Layout
- **Position:** `sticky top-0 z-40`
- **Background:** `bg-[#FDFCFB]/95 backdrop-blur-sm`
- **Border:** `border-b border-[#EFE9E4]`
- **Padding:** `py-6`

### Tab Pills Structure
```tsx
<nav className="flex gap-4 overflow-x-auto">
  {projects.map(project => (
    <button 
      className={`px-6 py-3 whitespace-nowrap transition-all ${
        active 
          ? 'bg-[#1A1A1A] text-white' 
          : 'border border-[#EFE9E4] text-[#666666] hover:border-[#1A1A1A]'
      }`}
    >
      {project.name}
    </button>
  ))}
</nav>
```

### Behavior
- Click → smooth scroll to section (`behavior: 'smooth'`)
- Update URL hash (`#startupai`, `#fashionos`, etc.)
- Active state based on scroll position (Intersection Observer)
- Horizontal scroll on mobile

---

## 3. PROJECT MODULE (REPEATABLE)

### Project Data Structure
```typescript
interface Project {
  id: string;
  name: string;
  tagline: string;
  industry: string[];
  problem: string[];
  solution: string;
  aiCapabilities: string[];
  results: string[];
  techStack: { name: string; icon: string }[];
  screenshots: { url: string; caption: string; type: 'desktop' | 'mobile' }[];
  caseStudyUrl?: string;
}
```

### Projects
1. **StartupAI** — `#startupai`
2. **FashionOS** — `#fashionos`
3. **EventsOS** — `#eventsos`
4. **Medellín AI** — `#medellinai`

---

## 3A. PROJECT HEADER

### Layout
```
[Project Name] ← H2, serif, 48px
[Tagline] ← 20px, light, #666666
[Industry Tags] ← Pills, 12px uppercase
```

### Code Pattern
```tsx
<div className="border-b border-[#EFE9E4] pb-8 mb-16">
  <h2 className="text-4xl lg:text-5xl font-serif text-[#1A1A1A] mb-4">
    {project.name}
  </h2>
  <p className="text-xl text-[#666666] font-light mb-6">
    {project.tagline}
  </p>
  <div className="flex gap-3">
    {project.industry.map(tag => (
      <span className="px-4 py-2 border border-[#EFE9E4] text-xs uppercase tracking-widest text-[#999999]">
        {tag}
      </span>
    ))}
  </div>
</div>
```

---

## 3B. SCREENSHOT SHOWCASE (PRIMARY VISUAL)

### Desktop Layout (2-Column)
```
┌────────────────────────────────┬──────────────────┐
│                                │  Problem         │
│   SCREENSHOT CAROUSEL          │  Solution        │
│   (3-5 images)                 │  AI Capabilities │
│                                │  Results         │
│                                │  Tech Stack      │
└────────────────────────────────┴──────────────────┘
       60% width                      40% width
```

### Screenshot Container
```tsx
<div className="space-y-6">
  {project.screenshots.map((screen, i) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="bg-white border border-[#EFE9E4] p-4"
    >
      <img 
        src={screen.url} 
        alt={screen.caption}
        className="w-full"
      />
      <p className="text-sm text-[#999999] mt-3">{screen.caption}</p>
    </motion.div>
  ))}
</div>
```

### Screenshot Specs
- **Background:** `bg-white`
- **Border:** `border border-[#EFE9E4]`
- **Padding:** `p-4 lg:p-6`
- **Hover:** `hover:border-[#1A1A1A] transition-colors cursor-pointer`
- **Aspect Ratio:** 16:9 for desktop, 9:16 for mobile insets
- **Max Width:** Full column width
- **Captions:** Small, tertiary color, below image

---

## 3C. PROJECT STORY (RIGHT COLUMN)

### Content Blocks Structure
```tsx
<div className="space-y-12">
  
  {/* Problem */}
  <div>
    <h3 className="text-sm uppercase tracking-widest text-[#999999] font-bold mb-4">
      Problem
    </h3>
    <ul className="space-y-2">
      {project.problem.map(item => (
        <li className="text-[#666666] flex gap-3">
          <span className="text-[#F59E0B]">•</span>
          {item}
        </li>
      ))}
    </ul>
  </div>

  {/* Solution */}
  <div>
    <h3 className="text-sm uppercase tracking-widest text-[#999999] font-bold mb-4">
      Solution
    </h3>
    <p className="text-[#666666] leading-relaxed">
      {project.solution}
    </p>
  </div>

  {/* AI Capabilities */}
  <div>
    <h3 className="text-sm uppercase tracking-widest text-[#999999] font-bold mb-4">
      AI Capabilities
    </h3>
    <ul className="space-y-2">
      {project.aiCapabilities.map(capability => (
        <li className="text-[#666666] flex gap-3">
          <span className="text-[#F59E0B]">→</span>
          {capability}
        </li>
      ))}
    </ul>
  </div>

  {/* Results */}
  <div>
    <h3 className="text-sm uppercase tracking-widest text-[#999999] font-bold mb-4">
      Results
    </h3>
    <ul className="space-y-2">
      {project.results.map(result => (
        <li className="text-[#666666] flex gap-3">
          <span className="text-[#F59E0B]">✓</span>
          {result}
        </li>
      ))}
    </ul>
  </div>

  {/* Tech Stack */}
  <div>
    <h3 className="text-sm uppercase tracking-widest text-[#999999] font-bold mb-4">
      Tech Stack
    </h3>
    <div className="flex flex-wrap gap-4">
      {project.techStack.map(tech => (
        <div className="flex items-center gap-2 px-4 py-2 border border-[#EFE9E4]">
          <img src={tech.icon} className="w-5 h-5" />
          <span className="text-sm text-[#666666]">{tech.name}</span>
        </div>
      ))}
    </div>
  </div>

</div>
```

---

## 3D. PROJECT CTA BLOCK

### Layout
```tsx
<div className="mt-12 pt-8 border-t border-[#EFE9E4] flex gap-4">
  <button className="px-8 py-4 bg-[#1A1A1A] text-white font-bold hover:bg-[#333] transition-all">
    View Case Study
  </button>
  <button className="px-8 py-4 border border-[#1A1A1A] text-[#1A1A1A] font-bold hover:bg-[#1A1A1A] hover:text-white transition-all">
    Start Similar Project
  </button>
</div>
```

---

## 4. SYSTEM DIAGRAM SECTION

### Placement
Between projects 2 and 3 (after FashionOS, before EventsOS)

### Layout
```
[Section Title: "How AMO AI Builds"]
[Subtitle: "Our AI Product Systems Architect framework"]
↓
[FLOWCHART DIAGRAM]
↓
[CTA: "Learn Our Process"]
```

### Flowchart Visual Structure
```
┌──────────────────────────────────────────────────┐
│                                                  │
│   1. Client Input     →    2. AI Analysis       │
│   [Wizard icon]            [Brain icon]         │
│                                                  │
│           ↓                        ↓             │
│                                                  │
│   3. Human Approval   →    4. System Build      │
│   [Checkmark icon]         [Code icon]          │
│                                                  │
│           ↓                        ↓             │
│                                                  │
│   5. Production       →    6. Results           │
│   [Rocket icon]            [Chart icon]         │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Flowchart Specs
- **Container:** `max-w-4xl mx-auto p-12 border border-[#EFE9E4] bg-white`
- **Icons:** Lucide-react, 32px, `text-[#F59E0B]`
- **Arrows:** `text-[#D1C7BD]`, 2px stroke
- **Labels:** 14px, `text-[#666666]`
- **Description text:** 12px, `text-[#999999]`

---

## 5. COMPARISON SECTION

### Title
```tsx
<h2 className="text-4xl lg:text-5xl font-serif text-center mb-16">
  Why Our Projects Ship Faster
</h2>
```

### Table Layout
```
┌─────────────────────┬────────────��────────┐
│ Traditional Agency  │   AMO AI     │
├─────────────────────┼─────────────────────┤
│ 12-16 weeks        │   6-8 weeks         │
│ Manual workflows    │   AI-powered        │
│ Static deliverables │   Live systems      │
│ Limited scalability │   Built to scale    │
└─────────────────────┴─────────────────────┘
```

### Code Pattern
```tsx
<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
  
  {/* Traditional */}
  <div className="p-8 border border-[#EFE9E4]">
    <h3 className="text-2xl font-serif mb-6 text-[#666666]">Traditional Agency</h3>
    <ul className="space-y-4">
      {traditionalFeatures.map(feature => (
        <li className="flex gap-3 text-[#999999]">
          <X className="w-5 h-5 text-[#999999]" />
          {feature}
        </li>
      ))}
    </ul>
  </div>

  {/* AMO AI */}
  <div className="p-8 border-2 border-[#F59E0B] bg-[#F59E0B]/5">
    <h3 className="text-2xl font-serif mb-6 text-[#1A1A1A]">AMO AI</h3>
    <ul className="space-y-4">
      {amoAIFeatures.map(feature => (
        <li className="flex gap-3 text-[#666666]">
          <Check className="w-5 h-5 text-[#F59E0B]" />
          {feature}
        </li>
      ))}
    </ul>
  </div>

</div>
```

---

## 6. FINAL CTA SECTION

### Layout
```tsx
<section className="py-32 bg-[#1A1A1A] text-white">
  <div className="container mx-auto px-6 lg:px-16 text-center max-w-4xl">
    
    <h2 className="text-5xl lg:text-6xl font-serif mb-8 leading-tight">
      Ready to Build a Real AI Product?
    </h2>
    
    <p className="text-xl text-white/70 font-light mb-12">
      From idea to production system in 8 weeks.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="px-10 py-5 bg-[#F59E0B] text-[#1A1A1A] font-bold hover:bg-[#FCD34D] transition-all">
        Start Your Project
      </button>
      <button className="px-10 py-5 border border-white/20 bg-white/5 text-white font-bold hover:bg-white/10 transition-all">
        Contact Us
      </button>
    </div>

  </div>
</section>
```

---

## RESPONSIVE BEHAVIOR

### Desktop (>1024px)
- 2-column layout (screenshots 60% | story 40%)
- Large screenshots with full detail
- Sticky navigation at top
- Generous `py-32` section spacing

### Tablet (768px - 1024px)
- Screenshots stack above story content
- Navigation remains sticky
- Reduce heading sizes by 20%
- Carousel for screenshots with swipe

### Mobile (<768px)
- Single column, screenshots first
- Horizontal scroll navigation tabs
- Reduce padding to `py-12`
- Sticky bottom CTA bar
- Collapsible story sections (accordions)

---

## ROUTING & URL STRUCTURE

### Pages
- `/projects` — Main projects overview
- `/projects#startupai` — Scroll to StartupAI
- `/projects#fashionos` — Scroll to FashionOS
- `/projects#eventsos` — Scroll to EventsOS
- `/projects#medellinai` — Scroll to Medellín AI

### Future Individual Case Studies
- `/case-studies/startupai`
- `/case-studies/fashionos`
- `/case-studies/eventsos`
- `/case-studies/medellinai`

---

## INTERACTIONS & MOTION

### Scroll Animations
- All sections fade in with `initial={{ opacity: 0, y: 20 }}`
- Stagger screenshots with `delay: i * 0.1`
- Viewport trigger: `viewport={{ once: true }}`

### Hover States
- Screenshots: `hover:border-[#1A1A1A]` + cursor pointer
- Navigation tabs: smooth background transition
- CTAs: subtle color shift (200ms)

### Active States
- Navigation: Bold active project with dark background
- Intersection Observer updates active state on scroll
- URL hash updates without page jump

---

## COMPONENT BREAKDOWN

### File Structure
```
/components/projects/
├── ProjectsHero.tsx
├── ProjectNavigation.tsx
├── ProjectModule.tsx
│   ├── ProjectHeader.tsx
│   ├── ScreenshotCarousel.tsx
│   ├── ProjectStory.tsx
│   └── ProjectCTA.tsx
├── SystemDiagram.tsx
├── ComparisonSection.tsx
└── ProjectsFinalCTA.tsx
```

### Main Page Component
```tsx
export function ProjectsPage() {
  return (
    <main className="bg-[#FDFCFB]">
      <ProjectsHero />
      <ProjectNavigation projects={PROJECTS} />
      
      <ProjectModule project={PROJECTS[0]} /> {/* StartupAI */}
      <ProjectModule project={PROJECTS[1]} /> {/* FashionOS */}
      
      <SystemDiagram />
      
      <ProjectModule project={PROJECTS[2]} /> {/* EventsOS */}
      <ProjectModule project={PROJECTS[3]} /> {/* Medellín AI */}
      
      <ComparisonSection />
      <ProjectsFinalCTA />
    </main>
  );
}
```

---

## VISUAL HIERARCHY EXPLANATION

### Primary Focus: Screenshots
- Largest visual elements on page
- 60% of horizontal space on desktop
- First in DOM for mobile
- High contrast white containers

### Secondary Focus: Story Content
- Structured sections with clear labels
- Scannable bullet points
- Icons for visual anchors (•, →, ✓)

### Tertiary Focus: Navigation & CTAs
- Sticky nav keeps context visible
- CTAs repeated at project level and page level
- Amber accent draws eye to conversion points

### Typography Scale
1. **H1 Hero:** 72px (largest)
2. **H2 Section:** 48-60px
3. **H3 Project Name:** 48px
4. **Body Large:** 20px
5. **Body Standard:** 16px
6. **Labels/Meta:** 12px (smallest)

---

## SUCCESS METRICS

### User Engagement
- Time on page >2 minutes
- Screenshots clicked/enlarged
- Project navigation clicks
- CTA click-through rate

### Conversion Goals
- "Start Your Project" clicks
- "View Case Study" clicks
- Contact form submissions

### Technical Performance
- Page load <2 seconds
- Smooth scroll performance (60fps)
- Image lazy loading
- Responsive images (srcset)
