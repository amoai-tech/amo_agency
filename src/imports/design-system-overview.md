# AMO AI — Wizard Design System Overview

## Figma Make Global Instructions

### Brand Identity
- **Company:** AMO AI — premium AI consulting platform
- **Tagline:** "Structure first. Intelligence second."
- **Personality:** Senior consultant — calm, observant, professional, never pushy
- **Feel:** Editorial, architectural, premium — like a high-end strategy firm's digital experience

### Design Tokens

**Colors:**
- Background: `#F1EEEA` (warm beige) — primary surface
- White: `#FFFFFF` — cards, panels, inputs
- Dark Teal: `#0A211F` — primary text, headings, navigation
- Lime Green: `#84CC16` — active states, progress indicators, success
- Muted Green: `#65A30D` — hover states
- Light Gray: `#E5E2DE` — borders, dividers, inactive elements
- Medium Gray: `#9CA3AF` — secondary text, placeholders
- Error Red: `#DC2626` — validation errors only
- Warning Amber: `#F59E0B` — attention states

**Typography:**
- Headings: Playfair Display (serif) — weight 600/700
- Body: Lora (serif) — weight 400/500
- UI Labels / Buttons: Inter or system sans-serif — weight 500/600
- Monospace: JetBrains Mono — for data/metrics only

**Type Scale:**
- Page title: 32px / 40px line-height
- Section heading: 24px / 32px
- Card heading: 18px / 28px
- Body: 16px / 24px
- Small / Caption: 14px / 20px
- Label: 12px / 16px (uppercase, letter-spacing 0.05em)

**Spacing:**
- Base unit: 4px
- Section padding: 48px (desktop), 24px (mobile)
- Card padding: 24px
- Input padding: 12px 16px
- Gap between form fields: 24px
- Gap between sections: 48px

**Border Radius:**
- Cards: 12px
- Inputs: 8px
- Buttons: 8px
- Badges: 6px
- Full round: 999px (pills, avatars)

**Shadows:**
- None on most elements (use borders instead)
- Subtle card elevation: `0 1px 3px rgba(10, 33, 31, 0.06)`
- Modal/drawer: `0 4px 24px rgba(10, 33, 31, 0.12)`

### Three-Panel Layout Specs

```
┌──────────────────────────────────────────────────────────┐
│  Header: Logo + Step Title + Save Status                 │
├────────────┬──────────────────────────┬───────────────────┤
│            │                          │                   │
│  Left      │  Center                  │  Right            │
│  Panel     │  Panel                   │  Panel            │
│            │                          │                   │
│  240px     │  Flexible (min 480px)    │  320px            │
│  fixed     │                          │  fixed            │
│            │                          │                   │
│  #FFFFFF   │  #F1EEEA                 │  #FFFFFF          │
│  bg        │  bg                      │  bg               │
│            │                          │                   │
├────────────┴──────────────────────────┴───────────────────┤
│  Footer: Back + Continue Buttons + Auto-save indicator    │
└──────────────────────────────────────────────────────────┘
```

**Desktop:** Three panels visible (min-width: 1280px)
**Tablet:** Left panel collapses to icon stepper, right panel slides in as drawer (768px-1279px)
**Mobile:** Single column, right panel accessible via "Why?" toggle button (<768px)

### Component Library Reference

**Inputs:** shadcn/ui — Input, Select, Textarea, Checkbox, RadioGroup, Switch
**Layout:** shadcn/ui — Card, Separator, Tabs, Accordion
**Feedback:** shadcn/ui — Badge, Progress, Toast (sonner)
**Overlay:** shadcn/ui — Dialog, Drawer, Sheet
**Navigation:** Custom stepper component

### Interaction Patterns
- Auto-save: green checkmark appears next to field label after save
- Validation: inline below field, red border + message, only on blur or submit
- Loading: skeleton shimmer on panels, never spinners
- Transitions: 200ms ease-out for panel content changes
- Focus: visible focus ring (2px lime green outline)
- Hover on cards: subtle border color change to lime green

### Responsive Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1279px
- Desktop: 1280px+
- Max content width: 1440px

### Accessibility
- All inputs labeled with visible labels (no placeholder-only)
- Minimum contrast ratio: 4.5:1 for text
- Focus visible on all interactive elements
- Screen reader announcements on step changes
- Skip navigation link
