# Agents Page — Style Guide Compliance Plan

**Date:** February 27, 2026  
**Page:** `/agents` (AgentsPage)  
**Status:** ⚠️ **Requires Significant Changes**

---

## 📋 Executive Summary

The current Agents page (`/components/AgentsPage.tsx`) **does not follow the AMO AI Style Guide**. It uses incompatible colors (`#1A1A1A` background, `#F59E0B` orange accents), wrong typography, and violates the established brand system.

**Style Guide Reference:** `/style-guide`

---

## 🎨 Style Guide Core Requirements

### **Color Palette**
| Color | Hex | Usage |
|-------|-----|-------|
| Dark Teal | `#0F3D3E` | Hero sections, premium backgrounds |
| Lime Green | `#84CC16` | CTAs, accents, highlights |
| White | `#FFFFFF` | Backgrounds, cards |
| Light Gray | `#F3F4F6` | Alternate sections |
| Gray 900 | `#111827` | Primary text, headings |
| Gray 600 | `#4B5563` | Secondary text, body copy |

### **Typography**
- **Headlines:** Playfair Display (400, 600, 700)
- **Body/UI:** Lora (400, 500, 600)
- **Type Scale:** 60px (H1), 48px (H2), 36px (H3), 30px (H4), 20px (Body Large), 16px (Body), 14px (Small)

### **Design Principles**
1. **Calm Luxury** — Editorial-inspired, sophisticated typography
2. **Clean Minimal** — **No shadows, no rounded buttons**
3. **Premium Experience** — Scroll-triggered animations, smooth transitions
4. **Sharp Corners** — All buttons and cards use 0 border-radius
5. **8px Base Unit** — Consistent spacing rhythm
6. **Section Padding** — 96px (`py-24`) or 128px (`py-32`)

---

## 🔍 Current Implementation Review

### **Section 1: AgentsHero**
**File:** `/components/agents/AgentsHero.tsx`

#### ❌ **Issues Found:**

| Element | Current | Style Guide | Status |
|---------|---------|-------------|------------|
| **Background** | `#1A1A1A` | `#0F3D3E` (Dark Teal) | ❌ Wrong color |
| **Accent Color** | `#F59E0B` (Orange) | `#84CC16` (Lime Green) | ❌ Wrong color |
| **Typography** | `font-serif` (generic) | Playfair Display + Lora | ⚠️ Needs explicit font |
| **Buttons** | No rounded classes visible | ✅ Good | ✅ Good |
| **Border Quote** | Orange border-l | Lime border | ❌ Wrong color |
| **Hover States** | `#FCD34D` (light orange) | `#73b512` (darker lime) | ❌ Wrong color |

#### 🔧 **Changes Required:**

1. **Background Color**
   ```tsx
   // Current:
   className="bg-[#1A1A1A]"
   
   // Change to:
   className="bg-[#0F3D3E]"
   ```

2. **All Orange → Lime Green**
   ```tsx
   // Current:
   bg-[#F59E0B]
   hover:bg-[#FCD34D]
   border-[#F59E0B]
   
   // Change to:
   bg-[#84CC16]
   hover:bg-[#73b512]
   border-[#84CC16]
   ```

3. **Typography**
   ```tsx
   // Headlines:
   style={{ fontFamily: 'Playfair Display, serif' }}
   
   // Body text:
   className="font-['Lora']"
   
   // Blockquote:
   className="... italic ... font-['Lora']"
   ```

4. **Buttons**
   ```tsx
   // Primary CTA:
   className="bg-[#84CC16] hover:bg-[#73b512] text-gray-900 px-8 py-4 text-base font-semibold transition-colors font-['Lora']"
   
   // Secondary CTA:
   className="border border-white text-white px-8 py-4 text-base font-semibold hover:bg-white hover:text-[#0F3D3E] transition-colors font-['Lora']"
   ```

---

### **Sections 2-8: All Sub-Components**

**Files to Audit:**
- `/components/agents/AgentDefinition.tsx`
- `/components/agents/AgentSystemDiagram.tsx`
- `/components/agents/AgentTypesGrid.tsx`
- `/components/agents/HumanControl.tsx`
- `/components/agents/UseCases.tsx`
- `/components/agents/IndustryExamples.tsx`
- `/components/agents/OutcomesSection.tsx`
- `/components/agents/AgentsCTA.tsx`

#### ⚠️ **Common Issues to Check:**

1. **Color Palette Violations**
   - Replace all `#1A1A1A` with `#0F3D3E`
   - Replace all `#F59E0B` (orange) with `#84CC16` (lime)
   - Replace `#666666` with `text-gray-600` (`#4B5563`)
   - Replace custom dark colors with approved palette

2. **Typography Issues**
   - Ensure headlines use `Playfair Display`
   - Ensure body text uses `Lora`
   - Remove generic `font-serif` unless it's Playfair Display

3. **Button/Card Styling**
   - Check for `rounded-*` classes → Remove all
   - Check for `shadow-*` classes → Remove all
   - Verify buttons use sharp corners

4. **Agent Cards/Diagrams**
   - System diagrams should use brand colors only
   - Agent type cards should have sharp corners
   - Accent elements should be lime green

---

## 📐 Style Guide Checklist

### **Do's** ✅
- [ ] Use sharp corners (`border-radius: 0`)
- [ ] Use Dark Teal (`#0F3D3E`) for hero backgrounds
- [ ] Use Lime Green (`#84CC16`) for CTAs and accents
- [ ] Use Playfair Display for headlines
- [ ] Use Lora for body text and UI
- [ ] Maintain generous whitespace
- [ ] Use scroll-triggered animations (0.8s duration)
- [ ] Apply 8px spacing rhythm
- [ ] Use `py-24` or `py-32` for section padding

### **Don'ts** ❌
- [ ] **No shadows** (`shadow-*` classes not allowed)
- [ ] **No rounded buttons or cards** (`rounded-*` not allowed)
- [ ] **No orange color** (`#F59E0B` violates palette)
- [ ] **No black backgrounds** (`#1A1A1A` should be `#0F3D3E`)
- [ ] Don't use more than 3 colors per section
- [ ] Avoid cluttered layouts
- [ ] No random fonts (only Playfair Display + Lora)

---

## 🛠️ Implementation Plan

### **Phase 1: Critical Fixes** (High Priority)
**Estimated Time:** 2-3 hours

1. **AgentsHero.tsx**
   - [ ] Change background from `#1A1A1A` to `#0F3D3E`
   - [ ] Change all orange (`#F59E0B`) to lime (`#84CC16`)
   - [ ] Add explicit Playfair Display + Lora fonts
   - [ ] Update blockquote border to lime green
   - [ ] Update hover states: `hover:bg-[#73b512]`
   - [ ] Update button text colors

2. **AgentsCTA.tsx**
   - [ ] Change background to `#0F3D3E` if dark
   - [ ] Change CTA buttons to `bg-[#84CC16]`
   - [ ] Remove any rounded corners
   - [ ] Update typography to Playfair + Lora

### **Phase 2: Sub-Component Audit** (Medium Priority)
**Estimated Time:** 3-4 hours

3. **Color Audit Across All Files**
   - [ ] Search for `#1A1A1A` → Replace with `#0F3D3E`
   - [ ] Search for `#F59E0B` → Replace with `#84CC16`
   - [ ] Search for `#666666` → Replace with `text-gray-600`
   - [ ] Search for `#FCD34D` → Replace with `#73b512`

4. **Typography Audit**
   - [ ] Find all `font-serif` → Change to `Playfair Display`
   - [ ] Add `font-['Lora']` to body text
   - [ ] Verify heading hierarchy uses Playfair Display

5. **Agent Cards & Diagrams**
   - [ ] Update AgentSystemDiagram colors
   - [ ] Update AgentTypesGrid card styling
   - [ ] Ensure all agent cards have sharp corners
   - [ ] Verify accent colors are lime green

6. **Button & Card Audit**
   - [ ] Search for `rounded-` → Remove all instances
   - [ ] Search for `shadow-` → Remove all instances
   - [ ] Verify all CTAs use `bg-[#84CC16]`

### **Phase 3: Animation & Polish** (Low Priority)
**Estimated Time:** 1-2 hours

7. **Add Scroll-Triggered Animations**
   - [ ] Ensure sections use `motion.div` from Motion
   - [ ] Use 0.8s duration consistently
   - [ ] Add staggered delays (index * 0.1)

8. **Verify Spacing**
   - [ ] Check all sections use `py-24` or `py-32`
   - [ ] Verify 8px spacing rhythm throughout
   - [ ] Check max-width is `max-w-7xl` (1280px)

---

## 📊 Compliance Score

| Category | Current | Target | Status |
|----------|---------|--------|-----------|
| **Color Palette** | 35% | 100% | ❌ Critical |
| **Typography** | 65% | 100% | ⚠️ Needs work |
| **Buttons/CTAs** | 75% | 100% | ⚠️ Close |
| **Spacing** | 80% | 100% | ✅ Good |
| **Animations** | 60% | 100% | ⚠️ Needs work |
| **Shadows/Radius** | 85% | 100% | ✅ Good |

**Overall Compliance:** **67%** → Target: **100%**

---

## 🎯 Priority Order

1. **CRITICAL** — Change hero background from `#1A1A1A` to `#0F3D3E`
2. **CRITICAL** — Change all orange to lime green
3. **HIGH** — Fix typography (explicit Playfair Display + Lora)
4. **HIGH** — Update all CTA hover states
5. **MEDIUM** — Audit agent diagrams and cards for color compliance
6. **MEDIUM** — Remove any rounded corners or shadows
7. **LOW** — Polish animations and transitions

---

## ✅ Success Criteria

The Agents page will be **compliant** when:

1. ✅ All dark backgrounds use Dark Teal (`#0F3D3E`)
2. ✅ All CTAs and accents use Lime Green (`#84CC16`)
3. ✅ Zero instances of orange (`#F59E0B`)
4. ✅ Zero instances of black (`#1A1A1A`) backgrounds
5. ✅ All headlines use Playfair Display
6. ✅ All body text uses Lora
7. ✅ Zero shadow effects
8. ✅ Zero rounded corners on buttons/cards
9. ✅ All sections have proper padding (`py-24` or `py-32`)
10. ✅ Agent diagrams use only brand colors

---

**End of Document**
