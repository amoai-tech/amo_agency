# Booking Page — Style Guide Compliance Plan

**Date:** February 27, 2026  
**Page:** `/booking` (BookingPage)  
**Status:** ⚠️ **Requires Moderate Changes**

---

## 📋 Executive Summary

The current Booking page (`/components/BookingPage.tsx`) is **simple and clean** but **does not fully follow the AMO AI Style Guide**. The form lacks branded styling, typography needs updating, and button colors need adjustment to match the official palette.

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

### **Section 1: BookingPage (Main Component)**
**File:** `/components/BookingPage.tsx`

#### ⚠️ **Issues Found:**

| Element | Current | Style Guide | Status |
|---------|---------|-------------|------------|
| **Typography** | Default (no explicit font) | Playfair Display + Lora | ❌ Missing fonts |
| **Heading Size** | `text-4xl md:text-5xl` | Should use Playfair Display | ⚠️ Needs font |
| **Text Color** | `text-gray-600` | ✅ Correct (`#4B5563`) | ✅ Good |
| **Layout** | Clean grid | ✅ Good | ✅ Good |
| **Spacing** | `py-20` | Should be `py-24` or `py-32` | ⚠️ Non-standard |

#### 🔧 **Changes Required:**

1. **Typography**
   ```tsx
   // Heading - Current:
   <h1 className="text-4xl md:text-5xl tracking-tight mb-6">
   
   // Change to:
   <h1 className="text-4xl md:text-5xl tracking-tight mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
   
   // Body text - Current:
   <p className="text-lg text-gray-600 mb-8">
   
   // Change to:
   <p className="text-lg text-gray-600 mb-8 font-['Lora']">
   ```

2. **Spacing**
   ```tsx
   // Current:
   className="... py-20"
   
   // Change to:
   className="... py-24"
   ```

---

### **Section 2: BookingForm**
**File:** `/components/booking/BookingForm.tsx`

#### ❌ **Critical Issues Found:**

| Element | Current | Style Guide | Status |
|---------|---------|-------------|------------|
| **Submit Button** | `bg-gray-900` | `bg-[#84CC16]` (Lime Green) | ❌ Wrong color |
| **Button Corners** | No rounded classes | ✅ Good | ✅ Good |
| **Input Fields** | Sharp corners | ✅ Good | ✅ Good |
| **Typography** | No explicit font | Lora required | ❌ Missing font |
| **Border Color** | `border-gray-300` | ✅ Acceptable | ✅ Good |
| **Button Text** | `text-white` | Should be `text-gray-900` | ⚠️ Wrong for lime BG |

#### 🔧 **Changes Required:**

1. **Submit Button**
   ```tsx
   // Current:
   <button
     type="submit"
     className="w-full bg-gray-900 text-white px-8 py-4 text-sm"
   >
     Submit Request
   </button>
   
   // Change to:
   <button
     type="submit"
     className="w-full bg-[#84CC16] text-gray-900 px-8 py-4 text-base font-semibold hover:bg-[#73b512] transition-colors font-['Lora']"
   >
     Submit Request
   </button>
   ```

2. **Form Field Typography**
   ```tsx
   // Add to all labels:
   className="block text-sm mb-2 font-['Lora']"
   
   // Add to all inputs/select/textarea:
   className="w-full border border-gray-300 px-4 py-3 text-sm font-['Lora'] focus:outline-none focus:border-[#84CC16] transition-colors"
   ```

3. **Focus States**
   ```tsx
   // Add focus styling to inputs:
   focus:outline-none focus:border-[#84CC16]
   ```

---

### **Section 3: BookingInfoItem**
**File:** `/components/booking/BookingInfoItem.tsx`

#### ⚠️ **Review Needed:**

- Check typography (needs Playfair Display for titles, Lora for descriptions)
- Verify spacing follows 8px rhythm
- Check for any accent colors (should use lime green)

#### 🔧 **Expected Changes:**

```tsx
// Title should use:
className="... font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}

// Description should use:
className="... text-gray-600 font-['Lora']"
```

---

## 📐 Style Guide Checklist

### **Do's** ✅
- [x] Use sharp corners (`border-radius: 0`) — Already done
- [ ] Use Lime Green (`#84CC16`) for submit button
- [ ] Use Playfair Display for page heading
- [ ] Use Lora for all form labels and body text
- [ ] Add focus states with lime green accent
- [ ] Use `py-24` for section padding
- [ ] Add hover transitions to button

### **Don'ts** ❌
- [x] **No shadows** — Already compliant ✅
- [x] **No rounded inputs or buttons** — Already compliant ✅
- [ ] **No gray-900 button** (should be lime green)
- [ ] Don't skip typography (need explicit fonts)
- [ ] Don't use white text on lime button

---

## 🛠️ Implementation Plan

### **Phase 1: Critical Fixes** (High Priority)
**Estimated Time:** 1 hour

1. **BookingForm.tsx**
   - [ ] Change submit button from `bg-gray-900` to `bg-[#84CC16]`
   - [ ] Change button text from `text-white` to `text-gray-900`
   - [ ] Add hover state: `hover:bg-[#73b512]`
   - [ ] Add `font-['Lora']` to button
   - [ ] Add `font-['Lora']` to all labels
   - [ ] Add `font-['Lora']` to all inputs/select/textarea
   - [ ] Add focus states: `focus:border-[#84CC16]`
   - [ ] Change button text size from `text-sm` to `text-base`
   - [ ] Add `font-semibold` to button

2. **BookingPage.tsx**
   - [ ] Add Playfair Display to heading
   - [ ] Add `font-['Lora']` to description text
   - [ ] Change `py-20` to `py-24`

### **Phase 2: Component Refinements** (Medium Priority)
**Estimated Time:** 30 minutes

3. **BookingInfoItem.tsx**
   - [ ] Add Playfair Display to item titles
   - [ ] Add `font-['Lora']` to item descriptions
   - [ ] Verify spacing follows 8px rhythm

### **Phase 3: Polish** (Low Priority)
**Estimated Time:** 15 minutes

4. **Enhanced UX**
   - [ ] Add smooth transitions to form inputs
   - [ ] Ensure focus states are visible and branded
   - [ ] Verify form accessibility

---

## 📊 Compliance Score

| Category | Current | Target | Status |
|----------|---------|--------|-----------|
| **Color Palette** | 60% | 100% | ⚠️ Button needs update |
| **Typography** | 40% | 100% | ❌ Missing fonts |
| **Buttons/CTAs** | 50% | 100% | ❌ Wrong color |
| **Spacing** | 85% | 100% | ⚠️ Minor adjustment |
| **Form Styling** | 75% | 100% | ⚠️ Needs focus states |
| **Shadows/Radius** | 100% | 100% | ✅ Perfect |

**Overall Compliance:** **68%** → Target: **100%**

---

## 🎯 Priority Order

1. **CRITICAL** — Change submit button to lime green (`#84CC16`)
2. **CRITICAL** — Add Playfair Display to page heading
3. **HIGH** — Add Lora font to all form elements
4. **HIGH** — Update button text color and size
5. **MEDIUM** — Add focus states to inputs
6. **MEDIUM** — Update section padding to `py-24`
7. **LOW** — Add transitions and polish

---

## ✅ Success Criteria

The Booking page will be **compliant** when:

1. ✅ Submit button uses Lime Green (`#84CC16`)
2. ✅ Button text is dark gray (`text-gray-900`)
3. ✅ Page heading uses Playfair Display
4. ✅ All form labels and inputs use Lora
5. ✅ Input focus states use lime green border
6. ✅ Section padding is `py-24`
7. ✅ Button has hover state (`hover:bg-[#73b512]`)
8. ✅ Zero shadow effects (already compliant)
9. ✅ Zero rounded corners (already compliant)
10. ✅ Smooth transitions on interactive elements

---

## 📝 Notes

- **Current Status:** Clean, simple design that needs branded styling
- **Main Issues:** 
  - Submit button color (most critical)
  - Missing typography (Playfair Display + Lora)
  - Missing focus states on inputs
- **Strengths:** 
  - Already has sharp corners ✅
  - No shadows ✅
  - Clean layout ✅
- **Estimated Total Time:** 1.5-2 hours for full compliance

---

## 🎨 Example Code Snippets

### **Before (Current):**
```tsx
<button
  type="submit"
  className="w-full bg-gray-900 text-white px-8 py-4 text-sm"
>
  Submit Request
</button>
```

### **After (Style Guide Compliant):**
```tsx
<button
  type="submit"
  className="w-full bg-[#84CC16] text-gray-900 px-8 py-4 text-base font-semibold hover:bg-[#73b512] transition-colors font-['Lora']"
>
  Submit Request
</button>
```

---

**End of Document**
