# Wizard Screen 1 — Business Context

## Figma Make Prompt

> Design a premium, editorial-style wizard screen for "AMO AI" — an AI consulting platform. This is Step 1 of a 5-step onboarding wizard titled "Business Context."
>
> **Layout:** Three-panel layout on desktop (1440px wide).
>
> **Left Panel (240px, white background):**
> - AMO AI logo at top (small, minimal)
> - Vertical step progress indicator with 5 steps:
>   1. "Business Context" — active (lime green dot, bold label)
>   2. "Industry Diagnostics" — inactive (gray dot)
>   3. "System Recommendations" — inactive
>   4. "Executive Summary" — inactive
>   5. "Launch Project" — inactive
> - Below the stepper: a "Context Card" section that starts empty and progressively fills as the user types. Show:
>   - Company name (appears when typed)
>   - Industry badge (appears when selected)
>   - Company size badge
>   - Goal summary (1-line truncated)
> - Footer of left panel: "Auto-saving..." indicator with a small green checkmark
>
> **Center Panel (flexible width, beige background #F1EEEA):**
> - Top: large serif heading "Tell us about your business" in Playfair Display, dark teal (#0A211F)
> - Subtitle: "We'll use this to tailor our analysis to your industry and goals." in Lora, medium gray
> - Form with generous spacing (24px between fields):
>
>   **Field 1 — Company Name**
>   - Label: "Company Name" (small caps, 12px, dark teal)
>   - Input: full-width text input, white background, 8px radius, subtle border
>   - Placeholder: "e.g., Acme Retail Group"
>
>   **Field 2 — Website**
>   - Label: "Website URL"
>   - Input: url input with "https://" prefix chip
>   - Helper text: "Optional — helps our AI understand your business faster"
>
>   **Field 3 — Industry**
>   - Label: "Industry"
>   - Select dropdown with options: E-commerce / Retail, Real Estate, Healthcare / Medical, Financial Services, Travel / Hospitality, Fashion / Beauty, Food & Beverage, Professional Services, Education, Technology / SaaS, Manufacturing, Other
>   - Show as a grid of selectable cards (3 columns) instead of a dropdown — each card has an icon and label, selected state has lime green border
>
>   **Field 4 — Company Size**
>   - Label: "Company Size"
>   - Horizontal radio group as pill buttons: Small (1-10), Medium (11-50), Large (51-200), Enterprise (200+)
>   - Selected state: dark teal background, white text
>
>   **Field 5 — Primary Goal**
>   - Label: "What's your primary business goal?"
>   - Select cards (2 columns): Growth, Efficiency, Customer Experience, Digital Transformation, Other
>   - If "Other" selected, show a text input below
>
>   **Field 6 — Biggest Challenge**
>   - Label: "What's your biggest challenge right now?"
>   - Textarea: 4 rows, white background
>   - Helper text: "Describe in 2-3 sentences. Be specific — this shapes our recommendations."
>   - Character count indicator (bottom right): "0 / 500"
>
>   **Field 7 — Document Upload**
>   - Label: "Supporting Documents (Optional)"
>   - Drag-and-drop zone: dashed border, icon center, "Drop files here or click to upload"
>   - Accepted: PDF, DOCX, PPTX, PNG, JPG (show as chips below label)
>   - Uploaded files show as a list with filename, size, remove button
>
> **Right Panel (320px, white background):**
> - Sticky header: "Why we're asking" in serif, dark teal
> - Content changes based on which field is focused:
>   - Default (no focus): "Each question helps us build a clear picture of your business. Your answers drive the industry-specific analysis in the next step."
>   - Company Name focused: "We use your company name to personalize your strategy brief and project dashboard."
>   - Website focused: "If provided, our AI can analyze your online presence to provide more accurate recommendations."
>   - Industry focused: "Your industry determines which diagnostic questions we ask next. Each industry has unique challenges and automation opportunities."
>   - Company Size focused: "Company size affects which systems are practical. A 5-person team needs different solutions than a 200-person organization."
>   - Goal focused: "Your primary goal helps us prioritize which systems to recommend first."
>   - Challenge focused: "Understanding your specific pain point lets us match you with the most impactful solution."
>   - Upload focused: "Business plans, brand guides, or existing reports help our AI provide richer, more specific analysis."
> - Below the contextual text: a subtle divider, then a "What happens next" section:
>   - Step 2 preview: "Next, we'll ask 6-8 questions specific to your industry to diagnose opportunities."
>
> **Footer Bar (full width, white, subtle top border):**
> - Left side: nothing (this is step 1, no back button)
> - Center: auto-save status — small text "All changes saved" with green dot
> - Right side: "Continue" button — dark teal background, white text, 8px radius, disabled until required fields are filled. On hover: slightly lighter teal.
>
> **Design Direction:**
> - Premium, editorial feel — think Stripe's documentation meets a luxury hotel's booking flow
> - Typography-led hierarchy — Playfair Display for the heading, Lora for body, clean sans-serif for labels
> - Warm neutral palette — beige background, white cards, dark teal text, lime green accents only for active/selected states
> - No gradients, no shadows on form fields, no decorative elements
> - Strong visual hierarchy through spacing and type size, not decoration
> - Generous whitespace — the form should breathe, never feel cramped
> - The industry selector should feel like browsing a curated catalog, not filling out a government form
>
> **Responsive:**
> - Mobile (375px): single column, left panel becomes a horizontal step indicator at top (dots only), right panel hidden behind a "?" floating button that opens a bottom sheet
> - Tablet (768px): two columns — center + right panel as a slide-over drawer triggered by "?" icon
> - Desktop (1440px): full three-panel layout as described

## Content Data

### Industry Options with Icons
| Industry | Icon Suggestion |
|----------|----------------|
| E-commerce / Retail | Shopping cart |
| Real Estate | Building/house |
| Healthcare / Medical | Heart/cross |
| Financial Services | Chart/coins |
| Travel / Hospitality | Globe/plane |
| Fashion / Beauty | Sparkle/diamond |
| Food & Beverage | Utensils |
| Professional Services | Briefcase |
| Education | Book/graduation cap |
| Technology / SaaS | Code/monitor |
| Manufacturing | Factory/gear |
| Other | Grid/dots |

### Company Size Options
| Label | Range | Description |
|-------|-------|-------------|
| Small | 1-10 | Startup / Solo |
| Medium | 11-50 | Growing team |
| Large | 51-200 | Established |
| Enterprise | 200+ | Scale operations |

### Goal Options
| Goal | Description |
|------|-------------|
| Growth | Increase revenue, expand market reach |
| Efficiency | Reduce costs, automate processes |
| Customer Experience | Improve satisfaction, reduce churn |
| Digital Transformation | Modernize operations, adopt new tech |
| Other | Custom goal (free text) |

## Workflow

```
User arrives at /app/wizard/step-1
  → Check wizard_sessions for existing session
  → If exists: pre-fill form from wizard_answers
  → If not: create new wizard_session (current_step: 1)

User fills fields
  → Each field change: debounce 500ms → save to wizard_answers.data (JSONB)
  → Left panel context card updates in real-time
  → Right panel content changes on field focus

User uploads documents
  → Upload to Supabase Storage (bucket: 'wizard-documents')
  → Create documents row (category: 'Wizard-Context', wizard_session_id)
  → Show upload progress, then filename + size in list

User clicks "Continue"
  → Validate required fields (company name, industry, size, goal, challenge)
  → If valid: update wizard_sessions.current_step = 2, navigate to step-2
  → If invalid: show inline errors on missing fields, scroll to first error
```

## Agent Behavior
- No AI processing on this screen
- Right panel content is static (pre-written copy, not AI-generated)
- Auto-save runs silently — no loading spinners, just the status indicator
- If user returns to this step later, all fields are pre-filled from saved data
