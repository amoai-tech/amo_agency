---
id: lean-12-sidebar-navigation
title: Strategy Engine — Sidebar Navigation & Header Integration
skill: frontend
phase: LEAN
priority: P0
status: Not Started
dependencies: []
estimated_effort: S
percent_complete: 0
area: dashboard
figma_screens: [Dashboard Sidebar Updated]
spec_refs: [tasks/lean/02-wireframes.md §10]
---

# Strategy Engine — Sidebar Navigation & Header Integration

## Summary

| Field       | Value |
|-------------|-------|
| File        | `src/components/dashboard/DashboardSidebar.tsx` |
| Position    | After "AI Insights", before "Documents" |
| Icon        | Lucide `Brain` |
| Badge       | Pending approvals count (amber) |
| Route       | `/app/strategy` |

---

## Sidebar Nav Item

```
┌──────────────────┐
│  ☀ AMO AI        │
│                   │
│  📊 Dashboard     │
│  📁 Projects      │
│  🗺️ Roadmap       │
│  👥 Clients       │
│  🔀 CRM Pipeline  │
│  💡 AI Insights   │
│  🧠 Strategy  ⚠3  │  ← NEW
│  📄 Documents     │
│  💰 Financial     │
│  ⚡ Workflows     │
│  🤖 AI Agents     │
│  ⚙️ Settings      │
│                   │
│  ─────────────── │
│  🔄 Re-run Wizard│
│                   │
└──────────────────┘
```

### Nav item spec
```typescript
{
  to: '/app/strategy',
  label: 'Strategy',
  icon: Brain, // from lucide-react
  badge: pendingApprovals > 0 ? pendingApprovals : undefined,
}
```

### Badge styling
- When `pendingApprovals > 0`:
  - `bg-[#D97706] text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5`
  - Position: right side of nav item label
- When 0: no badge shown

### Active state
- Background: `bg-[#00875A]/10`
- Text: `text-[#00875A] font-medium`
- Icon: `text-[#00875A]`
- Left accent: `border-l-3 border-[#00875A]`

### Hover state
- Background: `bg-[#F5F5F0]`
- Text: `text-[#1A1A1A]`

---

## Header Route Label

File: `src/components/dashboard/DashboardHeader.tsx`

Add to `ROUTE_LABELS` map:
```typescript
strategy: 'Strategy Engine',
```

Breadcrumb: `Dashboard / Strategy Engine`

---

## Mobile Sidebar

Same nav item in the mobile hamburger menu drawer.

---

## Figma Deliverables

1. **Sidebar** — Full sidebar with Strategy item in correct position
2. **Badge states** — No badge, badge with count 1-9, badge with 10+
3. **Active state** — Strategy item selected
4. **Header breadcrumb** — "Dashboard / Strategy Engine"
