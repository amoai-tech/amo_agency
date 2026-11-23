# Web Design Services Section — Implementation Plan

**Component:** Premium Web Design Services Grid  
**Location:** `/web-design` page (after existing sections)  
**Status:** 🔄 Ready for Implementation  
**Style:** Luxury Editorial (Superside-inspired)

---

## 🎨 **Color Palette (Section-Specific)**

This section uses a DIFFERENT color palette from the main site:

```
Deep Green:  #1E3D36  ████  (Card backgrounds, dark cards)
Warm Beige:  #F4F3EE  ░░░░  (Light card backgrounds, section bg)
Sage Green:  #DCE5DD  ▒▒▒▒  (Subtle backgrounds, overlays)
Accent:      #2E6F5E  ████  (CTAs, hover states, links)
```

---

## 📐 **Layout Structure**

### **Grid System:**
- Container: Max-width 1320px
- Columns: 3 equal columns
- Gap: 32px
- Card Radius: 20px
- Overflow: Hidden (for images)
- Shadows: Soft layered (0 4px 20px rgba(0,0,0,0.08))

### **Responsive Breakpoints:**
- Desktop: 1024px+ (3-column grid)
- Tablet: 768-1023px (2-column grid)
- Mobile: <768px (1-column stack)

---

## 🧱 **WIREFRAME — Desktop Layout**

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         WEB DESIGN SERVICES SECTION                          │
│                          (Warm Beige Background)                             │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  [Eyebrow: OUR SERVICES]                                            │   │
│  │  Premium Web Design Services                                        │   │
│  │  [Subheadline: Custom digital experiences...]                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ╔══════════════════╦══════════════════╦═════════════════════════════════╗  │
│  ║ CARD 1          ║ CARD 2          ║ CARD 3                          ║  │
│  ║ Website Design  ║ Webflow Dev     ║ Landing Pages                   ║  │
│  ║ (Warm Beige)    ║ (Sage Green)    ║ (Deep Green + Gradient)         ║  │
│  ║                 ║                 ║                                 ║  │
│  ║ Text:           ║ Text:           ║ Text:                           ║  │
│  ║ • UX research   ║ • Certified     ║ • Funnel-stage pages            ║  │
│  ║ • Wireframes    ║ • CMS integration║ • Mobile-first                  ║  │
│  ║ • Responsive    ║ • Scalable      ║ • SEO optimized                 ║  │
│  ║ • High-fidelity ║ • Flexible      ║                                 ║  │
│  ║                 ║                 ║                                 ║  │
│  ║ [Laptop Image]  ║ [Webflow UI]    ║          [Phone Mockup →]       ║  │
│  ║ (Bottom Left)   ║ (Bottom Center) ║          (Large, Right Side)    ║  │
│  ║                 ║                 ║                                 ║  │
│  ║                 ║                 ║  Learn more →                   ║  │
│  ╚══════════════════╩══════════════════╩═════════════════════════════════╝  │
│                                                                              │
│  ╔════════════════════════════════╦══════════════════╦══════════════════╗   │
│  ║ CARD 4 (WIDE)                 ║ CARD 5          ║ CARD 6          ║   │
│  ║ Design Systems & UI Kits      ║ UX/UI Audits    ║ Copy & Motion   ║   │
│  ║ (Deep Green)                  ║ (Sage Green)    ║ (Blue Gradient) ║   │
│  ║                               ║                 ║                 ║   │
│  ║ Text:                         ║ Text:           ║ Text:           ║   │
│  ║ • Reusable components         ║ • Deep research ║ • Headlines     ║   │
│  ║ • Atomic design methodology   ║ • Conversion    ║ • Microcopy     ║   │
│  ║ • Scale with consistency      ║ • Usability gaps║ • Animation     ║   │
│  ║                               ║ • Performance   ║                 ║   │
│  ║ [UI Grid] [Card Mockup →]     ║                 ║                 ║   │
│  ║ (Left)    (Right)             ║ [Dashboard]     ║ [Copy Card]     ║   │
│  ║                               ║ (Bottom)        ║ "Outstanding"   ║   │
│  ╚════════════════════════════════╩══════════════════╩══════════════════╝   │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 **Card Specifications**

### **Card 1 — Website Design**
**Background:** Warm Beige (#F4F3EE)  
**Text Color:** Deep Green (#1E3D36)  
**Size:** 1 column

**Content:**
- **Title:** "Website design"
- **Description:** "Website UX research, wireframes, responsive design, and high-fidelity UI, tailored to your goals."
- **Features:**
  - UX research & user flows
  - Wireframe prototypes
  - Responsive design systems
  - High-fidelity mockups
  - Brand-aligned visuals
- **Image:** Laptop mockup (bottom-left, overlaps card edge slightly)
- **CTA:** None (optional link)

---

### **Card 2 — Webflow Development**
**Background:** Sage Green (#DCE5DD)  
**Text Color:** Deep Green (#1E3D36)  
**Size:** 1 column

**Content:**
- **Title:** "Webflow development"
- **Description:** "Certified Webflow partner offering flexible, scalable builds with CMS integration."
- **Features:**
  - Certified Webflow experts
  - Custom CMS architectures
  - Scalable component libraries
  - SEO-optimized structure
  - Lightning-fast hosting
- **Image:** Webflow UI screenshot (bottom center, floating panels)
- **CTA:** None (optional link)

---

### **Card 3 — Landing Pages** (FEATURED)
**Background:** Deep Green → Blue gradient (#1E3D36 to dark blue)  
**Text Color:** White  
**Size:** 2 columns (visually wider)

**Content:**
- **Title:** "Landing pages"
- **Description:** "Funnel-stage pages that launch fast—fully optimized, mobile first, and on brand. Ideal for product launches, paid media, lifecycle marketing, and SEO."
- **Features:**
  - High-conversion templates
  - Mobile-first design
  - A/B test ready
  - SEO foundation
  - Fast deployment (2-3 weeks)
- **Image:** Large phone mockup (right side, dominant, angled)
- **CTA:** "Learn more →" (accent color)

---

### **Card 4 — Design Systems & UI Kits** (FEATURED)
**Background:** Deep Green (#1E3D36)  
**Text Color:** White  
**Size:** 2 columns (visually wider)

**Content:**
- **Title:** "Design systems and UI kits"
- **Description:** "Reusable component libraries built following the Atomic design methodology to scale with consistency."
- **Features:**
  - Atomic design framework
  - Token-based styling
  - Figma component libraries
  - Documentation included
  - Version control ready
- **Images:**
  - Left: UI component grid (buttons, icons, cards)
  - Right: Card mockup with CTA ("Let's build your team")
- **CTA:** None (visual embedded in mockup)

---

### **Card 5 — UX/UI Audits**
**Background:** Sage Green (#DCE5DD)  
**Text Color:** Deep Green (#1E3D36)  
**Size:** 1 column

**Content:**
- **Title:** "UX/UI audits"
- **Description:** "Deep research into conversion leaks and usability gaps, plus expert recs to boost performance."
- **Features:**
  - Heuristic evaluation
  - User flow analysis
  - Accessibility audit (WCAG)
  - Conversion rate optimization
  - Actionable recommendations
- **Image:** Small dashboard screenshot (bottom-right, floating)
- **CTA:** None (optional link)

---

### **Card 6 — Copy & Motion Support**
**Background:** Blue gradient (light to medium blue)  
**Text Color:** Deep Green (#1E3D36)  
**Size:** 1 column

**Content:**
- **Title:** "Copy & motion support"
- **Description:** "Full-stack creative including headlines, content hierarchy, microcopy, and animation."
- **Features:**
  - AI-powered copywriting
  - Brand voice development
  - Microcopy & CTAs
  - Motion design systems
  - Video & animation
- **Image:** Blurred background + white floating card ("Outstanding copy, powered")
- **CTA:** None (optional link)

---

## 🎭 **Visual Characteristics**

### **Typography:**
- **Section Title:** Playfair Display, 48px, Deep Green
- **Card Titles:** Sans-serif (Inter/Lora), 24px, semibold
- **Body:** Sans-serif (Inter), 16px, line-height 1.6
- **Eyebrow:** Sans-serif uppercase, 12px, tracking-widest, Accent color

### **Card Styling:**
```css
border-radius: 20px
padding: 48px
min-height: 400px (top row), 380px (bottom row)
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08)
overflow: hidden
position: relative
```

### **Hover Effects:**
- Subtle lift: `translateY(-4px)`
- Shadow increase: `0 8px 30px rgba(0, 0, 0, 0.12)`
- Image scale: `scale(1.05)` on image only
- Transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1)`

### **Image Placement:**
- Position: Absolute (bottom/right anchored)
- Z-index: 1 (below text)
- Opacity: 0.9
- Blend mode: Normal (or soft-light for overlays)

---

## 📱 **Mobile Layout**

```
┌─────────────────────────┐
│  Premium Web Design     │
│  Services               │
└─────────────────────────┘

┌─────────────────────────┐
│  Card 1                 │
│  Website Design         │
│  [Text]                 │
│  [Image Below]          │
└─────────────────────────┘

┌─────────────────────────┐
│  Card 2                 │
│  Webflow Development    │
│  [Text]                 │
│  [Image Below]          │
└─────────────────────────┘

┌─────────────────────────┐
│  Card 3                 │
│  Landing Pages          │
│  [Text]                 │
│  [Phone Centered]       │
│  Learn more →           │
└─────────────────────────┘

┌─────────────────────────┐
│  Card 4                 │
│  Design Systems         │
│  [Text]                 │
│  [UI Grid Below]        │
└─────────────────────────┘

┌─────────────────────────┐
│  Card 5                 │
│  UX/UI Audits           │
│  [Text]                 │
│  [Dashboard Below]      │
└─────────────────────────┘

┌─────────────────────────┐
│  Card 6                 │
│  Copy & Motion          │
│  [Text]                 │
│  [Copy Card Centered]   │
└─────────────────────────┘
```

**Mobile Adaptations:**
- Stack all cards vertically
- Images move below text
- Full-width cards (px-4 padding)
- Maintain aspect ratios
- Phone mockup becomes centered
- Reduce padding to 32px per card

---

## 🎨 **Gradient Specifications**

### **Card 3 (Landing Pages):**
```css
background: linear-gradient(135deg, #1E3D36 0%, #0F3D5C 100%)
```

### **Card 6 (Copy & Motion):**
```css
background: linear-gradient(135deg, #A5C9D8 0%, #7BA8C1 100%)
```

### **Image Overlays:**
```css
background: linear-gradient(to top, rgba(0,0,0,0.3), transparent)
position: absolute
bottom: 0
left: 0
right: 0
height: 50%
```

---

## 🖼️ **Image Assets Strategy**

Since we don't have custom images, we'll use:

1. **Placeholder Images:**
   - Use the provided Figma asset if available
   - Use Unsplash for placeholder images
   - Use CSS to create mockup frames

2. **Mockup Creation:**
   - Use border + shadow to create device frames
   - Use nested divs for screen content
   - Use gradients for abstract backgrounds

3. **UI Component Grid (Card 4):**
   - Create with HTML/CSS
   - Button examples
   - Icon placeholders (Lucide icons)
   - Card component examples

---

## 🔧 **Component Architecture**

```
/components/web-design/
├── WebDesignServicesGrid.tsx  (Main container)
├── ServiceCard.tsx            (Reusable card component)
└── ServiceCardImage.tsx       (Image/mockup renderer)
```

**Props Interface:**
```typescript
interface ServiceCard {
  id: string;
  title: string;
  description: string;
  features: string[];
  backgroundColor: string;
  textColor: string;
  imageType: 'laptop' | 'webflow' | 'phone' | 'components' | 'dashboard' | 'copy';
  imagePosition: 'bottom-left' | 'bottom-center' | 'right' | 'bottom-right';
  cta?: {
    text: string;
    link: string;
  };
  size: 'normal' | 'wide';
  gradient?: string;
}
```

---

## 🎯 **Animation Strategy**

### **On Scroll:**
1. Section header fades in + slides up (0.8s)
2. Cards stagger in: fade + slide up (0.6s each, 0.1s delay increment)
3. Images fade in after card (0.4s, 0.3s delay)

### **On Hover:**
1. Card lifts (`translateY(-4px)`)
2. Shadow intensifies
3. Image scales slightly (`scale(1.05)`)
4. CTA arrow slides right (if present)

### **Performance:**
- Use `will-change: transform` on hover targets
- GPU-accelerated properties only (transform, opacity)
- IntersectionObserver for scroll triggers
- Lazy load images

---

## ✅ **Implementation Checklist**

### **Phase 1: Setup**
- [ ] Create `WebDesignServicesGrid.tsx`
- [ ] Create `ServiceCard.tsx` component
- [ ] Define service data structure
- [ ] Set up color variables

### **Phase 2: Cards**
- [ ] Build Card 1 (Website Design)
- [ ] Build Card 2 (Webflow Development)
- [ ] Build Card 3 (Landing Pages) with gradient
- [ ] Build Card 4 (Design Systems) with UI grid
- [ ] Build Card 5 (UX/UI Audits)
- [ ] Build Card 6 (Copy & Motion)

### **Phase 3: Images**
- [ ] Create laptop mockup (CSS or image)
- [ ] Create Webflow UI panel mockup
- [ ] Create phone mockup with content
- [ ] Create UI component grid
- [ ] Create dashboard preview
- [ ] Create floating copy card

### **Phase 4: Responsive**
- [ ] Test desktop layout (1280px+)
- [ ] Test tablet layout (768-1023px)
- [ ] Test mobile layout (<768px)
- [ ] Adjust image positions for mobile

### **Phase 5: Polish**
- [ ] Add hover animations
- [ ] Add scroll animations
- [ ] Test all CTAs
- [ ] Optimize image loading
- [ ] Accessibility audit

---

## 🎨 **Style Guide Compliance**

**⚠️ NOTE:** This section uses a DIFFERENT color palette than the main AMO AI style guide. This is intentional for visual hierarchy and section differentiation.

**Main Site Colors:**
- Dark Teal: #0F3D3E
- Lime Green: #84CC16

**This Section Colors:**
- Deep Green: #1E3D36
- Warm Beige: #F4F3EE
- Sage: #DCE5DD
- Accent: #2E6F5E

Both palettes follow the same design principles:
- ✅ Sharp corners on buttons (NO rounded)
- ✅ Minimal shadows (subtle only)
- ✅ Large whitespace
- ✅ Editorial typography hierarchy
- ✅ Luxury premium aesthetic

---

## 📏 **Spacing System**

```
Section padding-y: 128px (desktop), 80px (mobile)
Card padding: 48px (desktop), 32px (mobile)
Gap between cards: 32px (desktop), 24px (mobile)
Text spacing: mb-4 (16px) between elements
Feature list: space-y-2 (8px)
```

---

## 🚀 **Next Steps**

1. ✅ Create this plan document
2. ⏳ Build `WebDesignServicesGrid.tsx` component
3. ⏳ Build individual service cards
4. ⏳ Create mockup/image components
5. ⏳ Add to `/web-design` page before final CTA
6. ⏳ Test responsive behavior
7. ⏳ Polish animations & interactions

---

## 📍 **Placement on Page**

Insert BEFORE the final CTA section:

```
/pages/WebDesignPage.tsx

<WebDesignHero />
<WhyAIPowered />
<WhatsIncluded />
<PerformanceFirst />
<BuiltInIntelligence />
<WebDesignServicesGrid />  ← NEW SECTION HERE
<WebDesignCTA />
```

---

**Status:** 📋 Plan Complete — Ready for Implementation  
**Estimated Build Time:** 3-4 hours  
**Complexity:** Medium-High (Custom mockups, asymmetric grid)
