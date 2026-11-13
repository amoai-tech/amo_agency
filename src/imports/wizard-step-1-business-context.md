---
task_id: 001-WIZ
title: Wizard Step 1 — Business Context
phase: CRITICAL
priority: P0
status: In Progress
estimated_effort: 3 days
area: wizard
wizard_step: 1
skill: [design/frontend-design, product/feature-dev, product/api-wiring]
subagents: [supabase-expert]
edge_function: analyze-business
schema_tables: [wizard_sessions, wizard_answers, documents]
depends_on: [000-WIZ-OVERVIEW]
figma_prompt: prompts/01-business-context.md
mermaid_diagram: mermaid-wizard/02-business-context.md
---

# Wizard Step 1 — Business Context

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
>   - Website focused (before analysis): "If provided, our AI will analyze your online presence using URL Context and Google Search to provide more accurate recommendations."
>   - Website focused (analysis running): Shows loading skeleton with "Analyzing your website..." message
>   - Website focused (analysis complete): Shows "Company Analysis" card with extracted company description, detected industry, products/services, team size estimate, technology signals, and AI opportunity indicators
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

---

## Screen Purpose
Collect foundational business information. This is the first impression — it must feel welcoming, professional, and effortless. The user should feel like they're talking to a senior consultant, not filling out a form.

---

## Layout Specification

### Top Bar (64px)

The top bar is a horizontal strip spanning the full width, 64px tall. On the left is the AMO AI logo (simple wordmark). In the center is the text "Step 1 of 5 — Business Context" (Lora 14px, muted). On the right is the auto-save indicator displaying "Saved".

- Left: AMO AI logo (simple wordmark)
- Center: "Step 1 of 5 — Business Context" (Lora 14px, muted)
- Right: Auto-save indicator

### Left Panel — Progress (240px)

The left panel is 240px wide with a white background. It contains two sections separated by a horizontal divider.

**Top section — Progress Stepper:** At the top, a heading reads "DISCOVERY WIZARD" in small caps. Below it is a vertical stepper listing all five steps, connected by a vertical line:

- **Step 1 — Business Context:** Active state — green dot (#84CC16) with bold text
- **Step 2 — Industry Analysis:** Upcoming state — hollow circle with muted text
- **Step 3 — System Recs:** Upcoming state — hollow circle with muted text
- **Step 4 — Executive Brief:** Upcoming state — hollow circle with muted text
- **Step 5 — Dashboard Entry:** Upcoming state — hollow circle with muted text

**Bottom section — Context Summary:** Below the divider, a heading reads "CONTEXT" in small caps. This area starts empty and fills dynamically as the user types. Once populated, it displays a live summary of entered values.

For example, once the user has filled in fields, the context section would show:

- **Company:** "Acme Corp"
- **Industry:** E-commerce
- **Size:** Medium

### Center Panel — Form

The center panel is the main interactive area (flex width, max 640px). It contains the following elements stacked vertically with generous whitespace:

**Title:** "Tell us about your business" in Playfair Display at 32px.

**Subtitle:** "We'll use this to understand your industry and tailor our analysis." in Lora at 16px, muted color.

**Horizontal divider** separating the header from the form fields.

**Field 1 — Company Name (required):** A standard text input with the placeholder "Your company or brand name".

**Field 2 — Website URL (optional):** A standard text input with the placeholder "https://". Below the input, helper text reads "Used for AI context — not required".

**Field 3 — Industry (required):** A select dropdown with the placeholder "Select your industry" and a trailing chevron icon.

**Field 4 — Company Size (required):** A set of selectable cards arranged in a row (3 across, with a 4th wrapping below). Each card shows a label and range:
- "Small" (1-20)
- "Medium" (21-100)
- "Large" (101-500)
- "Enterprise" (500+)

**Field 5 — Primary Business Goal (required):** A select dropdown with the placeholder "What are you trying to achieve?" and a trailing chevron. Options: Growth, Efficiency, Customer Experience, Digital Transformation, Other. If "Other" is selected, an additional text input appears with the placeholder "Describe your goal".

**Field 6 — Biggest Challenge Right Now (required):** A textarea with the placeholder "What's the one thing holding your business back?" Below the textarea, helper text reads "Be specific — 2-3 sentences".

**Field 7 — Supporting Documents (optional):** A file upload zone with a dashed border, containing centered text "Drop files here or click to upload" and accepted formats listed as "PDF, DOCX, PNG, JPG — max 10MB".

### Right Panel — Guidance (320px)

The right panel is 320px wide and contains three context cards stacked vertically, each with a small-caps heading (12px, muted) followed by a card body:

**Card 1 — "WHY THIS STEP":** Body text reads: "We start with your business context to ensure every recommendation is grounded in your reality — not generic advice."

**Card 2 — "WHAT HAPPENS NEXT":** Body text lists three items:
- Industry-specific diagnostic questions
- AI-powered system recommendations
- Executive brief you can share

**Card 3 — "YOUR DATA":** Body text reads: "Everything you enter is saved automatically. You can close and return anytime."

### Bottom Bar (72px)

The bottom bar is a horizontal strip spanning the full width, 72px tall. It contains only a "Continue" button aligned to the right. There is no "Back" button on Step 1.

- No "Back" on Step 1
- Continue button: disabled until required fields filled
- Enabled state: #0A211F background, white text, 48px height

---

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

---

## Responsive Behavior

### Tablet (768-1023px)
- Left panel collapses: progress becomes horizontal step indicator in top bar
- Center + Right stack: right panel becomes expandable section below form
- Full-width form with 24px padding

### Mobile (<768px)
- Single column
- Progress: simple "Step 1 of 5" in top bar
- Right panel content becomes collapsible "Why this step?" accordion below title
- Full-width inputs
- Continue button: full-width, sticky bottom
- File upload: simplified to button-only (no drag-and-drop)

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Input | Empty | 1px border #D4CFC8, placeholder #A39E98 |
| Input | Focused | 2px border #0A211F |
| Input | Filled | 1px border #D4CFC8, text #0A211F |
| Input | Error | 1px border #DC2626, error text below |
| Company Size Card | Default | 1px border #D4CFC8 |
| Company Size Card | Hover | 1px border #0A211F |
| Company Size Card | Selected | 2px border #0A211F, bg #F1EEEA |
| Continue | Disabled | bg #D4CFC8, text #A39E98 |
| Continue | Enabled | bg #0A211F, text white |
| Continue | Hover | bg #0A211F opacity 90% |
| Save indicator | Saving | "Saving..." italic, muted |
| Save indicator | Saved | "Saved" muted, green check |

---

## Data Saved

When the user completes this step, the following data is persisted. The screen identifier is "step-1" and the saved fields are:

| Field | Example Value |
|-------|---------------|
| company_name | "Acme Corp" |
| website_url | "https://acmecorp.com" |
| industry | "ecommerce" |
| company_size | "medium" |
| primary_goal | "growth" |
| primary_goal_other | null (populated only when goal is "Other") |
| biggest_challenge | "We're spending too much on ads with low conversion..." |
| documents | Array of uploaded files, each with name, storage_path, and file_size (e.g., "brand-guide.pdf", 2.4 MB) |

---

## Content Copy

### Title
"Tell us about your business"

### Subtitle
"We'll use this to understand your industry and tailor our analysis to your specific situation."

### Industry Options
- E-commerce / Retail
- Real Estate
- Healthcare / Medical
- Financial Services
- Travel / Hospitality
- Fashion / Beauty
- Food & Beverage
- Professional Services
- Education
- Technology / SaaS
- Manufacturing
- Other (please specify)

### Goal Options
- Growth — "Scale revenue, expand reach, enter new markets"
- Efficiency — "Reduce costs, streamline operations, save time"
- Customer Experience — "Improve satisfaction, reduce churn, increase loyalty"
- Digital Transformation — "Modernize systems, adopt new technology"
- Other — free text input

### Helper Text
- Website URL: "We'll use this to understand your digital presence. Not required."
- Biggest challenge: "Be specific — 2-3 sentences help us give you better recommendations."
- Documents: "Optional. Upload business plans, brand guides, or reports for richer analysis."

---

## Workflow

1. **User arrives at /app/wizard/step-1**
   - Check wizard_sessions for existing session
   - If a session exists: pre-fill form from wizard_answers
   - If no session exists: create a new wizard_session with current_step set to 1

2. **User fills fields**
   - Each field change is debounced by 500ms, then saved to wizard_answers.data (JSONB)
   - Left panel context card updates in real-time as fields are filled
   - Right panel content changes based on which field is focused

3. **User enters website URL (triggers AI analysis)**
   - On blur of URL field (if valid URL): call analyze-business Edge Function
   - Edge Function uses Gemini with both URL Context and Google Search tools enabled
   - URL Context reads the website content (HTML, images, PDFs up to 34MB)
   - Google Search finds market context, competitors, news, and industry data
   - Results cached in ai_cache (keyed by URL + session_id)
   - Right panel updates with "Company Analysis" card showing extracted insights
   - If analysis detects industry or company size, offer to auto-fill Fields 3 and 4
   - If URL is invalid or fails: show static right panel guidance, no error shown to user

4. **User uploads documents**
   - Upload file to Supabase Storage (bucket: 'wizard-documents')
   - Create a documents row with category 'Wizard-Context' and the wizard_session_id
   - Show upload progress indicator, then display filename and size in the file list

5. **User clicks "Continue"**
   - Validate required fields: company name, industry, size, goal, challenge
   - If valid: update wizard_sessions.current_step to 2, navigate to step-2
   - If invalid: show inline errors on missing fields and scroll to the first error

---

## Agent Behavior

### URL Context Analysis (triggered by website URL field)

When the user enters a website URL in Field 2, the `analyze-business` Edge Function is triggered using two Gemini tools working together in a single API call.

---

### Tool 1 — URL Context (`{urlContext: {}}`)

Gemini ingests and reasons over the full content of the provided URL. This is not a simple scrape — the model reads the page like a human would, understanding layout, navigation, product offerings, pricing, team info, and brand positioning.

**Supported content types:**
- Text: HTML, JSON, plain text, XML, CSS, JavaScript, CSV, RTF
- Images: PNG, JPEG, BMP, WebP
- Documents: PDF

**Limits:**
- Up to **20 URLs** per request
- Up to **34MB** per URL
- URLs must be publicly accessible (no login walls, paywalls, localhost, private networks, or tunneling services like ngrok)

**Not supported:** YouTube videos, Google Workspace files (Docs, Sheets), video/audio files, paywalled content.

**Retrieval mechanism:** Two-stage — attempts internal index cache first, then falls back to live fetching.

**Response metadata:** The response includes `url_context_metadata` with per-URL retrieval status:
```json
{
  "url_context_metadata": {
    "url_metadata": [
      {
        "retrieved_url": "https://example.com",
        "url_retrieval_status": "URL_RETRIEVAL_STATUS_SUCCESS"
      }
    ]
  }
}
```
Status values: `URL_RETRIEVAL_STATUS_SUCCESS`, `URL_RETRIEVAL_STATUS_UNSAFE` (failed moderation).

**Token billing:** Retrieved content counts toward input tokens in `usage_metadata`. Billed at standard per-token rates for the model.

**SDK usage (TypeScript — Deno edge function):**
```typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: Deno.env.get("GEMINI_API_KEY") });

const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: "Analyze this company website and extract business context: https://example.com",
  config: {
    tools: [{ urlContext: {} }],
    responseMimeType: "application/json",
    responseSchema: companyAnalysisSchema,
  },
});
```

---

### Tool 2 — Google Search (`{googleSearch: {}}`)

Gemini automatically generates and executes search queries based on the company name and URL to discover additional context — competitor landscape, industry positioning, recent news, company size estimates, technology stack, and market trends. The model decides which searches to run and how many.

**Billing:** Per search query executed (Gemini 3 models). Multiple searches within one API call count as multiple billable queries. Empty queries are excluded.

**Response metadata:** The response includes `groundingMetadata` with three key structures:

```json
{
  "groundingMetadata": {
    "webSearchQueries": ["Acme Corp AI consulting", "Acme Corp competitors"],
    "groundingChunks": [
      { "web": { "uri": "https://source.com/article", "title": "Source Title" } }
    ],
    "groundingSupports": [
      {
        "segment": { "startIndex": 0, "endIndex": 85 },
        "groundingChunkIndices": [0]
      }
    ],
    "searchEntryPoint": {
      "renderedContent": "<style>...</style><div>...</div>"
    }
  }
}
```

- **`webSearchQueries`** — Array of search queries the model executed (useful for debugging/logging)
- **`groundingChunks`** — Array of web sources with `uri` and `title` for attribution
- **`groundingSupports`** — Maps text segments (`startIndex`/`endIndex`) to source chunks via `groundingChunkIndices`
- **`searchEntryPoint`** — HTML/CSS for rendering required Search Suggestions (Terms of Service compliance)

**SDK usage (TypeScript — Deno edge function):**
```typescript
const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: "Research Acme Corp: market position, competitors, industry trends",
  config: {
    tools: [{ googleSearch: {} }],
  },
});

// Access grounding metadata
const metadata = response.candidates[0]?.groundingMetadata;
const sources = metadata?.groundingChunks?.map(c => c.web) ?? [];
const queries = metadata?.webSearchQueries ?? [];
```

---

### Combined Tool Usage (analyze-business Edge Function)

Both tools are passed together in a single Gemini API call. The model uses URL Context for deep website analysis and Google Search for broad market intelligence.

**Edge Function configuration:**
```typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: Deno.env.get("GEMINI_API_KEY") });

const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: `Analyze this business website and research market context.
    Website: ${websiteUrl}
    Company: ${companyName}

    Extract: company description, industry, products/services, team size estimate,
    technology signals, competitive positioning, and AI opportunity indicators.`,
  config: {
    tools: [
      { urlContext: {} },
      { googleSearch: {} },
    ],
    responseMimeType: "application/json",
    responseSchema: {
      type: "object",
      properties: {
        company_description: { type: "string" },
        detected_industry: { type: "string" },
        products_services: { type: "array", items: { type: "string" } },
        team_size_estimate: { type: "string", enum: ["small", "medium", "large", "enterprise"] },
        technology_signals: { type: "array", items: { type: "string" } },
        competitive_positioning: { type: "string" },
        ai_opportunities: { type: "array", items: { type: "string" } },
        confidence_score: { type: "number" },
        sources: {
          type: "array",
          items: {
            type: "object",
            properties: {
              url: { type: "string" },
              title: { type: "string" },
            },
          },
        },
      },
      required: ["company_description", "detected_industry", "products_services",
                  "team_size_estimate", "ai_opportunities", "confidence_score"],
    },
  },
});

// Parse structured response
const analysis = JSON.parse(response.text);

// Extract grounding sources for attribution
const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
const urlMetadata = response.candidates?.[0]?.urlContextMetadata?.urlMetadata ?? [];
```

**Important limitations when combining tools:**
- Function calling (user-defined functions) is **not supported** alongside URL Context
- URL Context is only available via Gemini API, not Vertex AI
- The model only retrieves from specified URLs — it does not follow nested links

---

### Trigger Behavior

- Fires after the URL field loses focus (on blur) AND the URL is valid (starts with http/https)
- Debounced — if user edits the URL, previous request is cancelled via `AbortController`
- Results populate the right panel with a "Company Analysis" card showing extracted insights
- Analysis runs in the background — does not block form completion
- If URL Context fails (private page, timeout), falls back to Google Search only
- If both fail, right panel shows static guidance (graceful degradation)

### Caching Strategy

- Results cached in `ai_cache` keyed by `(org_id, "analyze-business", hash(url + session_id))`
- Cache TTL: 24 hours (business websites don't change frequently)
- On cache hit: return cached result immediately, skip Gemini API call
- On cache miss: call Gemini, then store result in ai_cache

### Right Panel Updates When Analysis Completes

- Company description (extracted from website via URL Context)
- Industry classification (auto-detected, can pre-fill Field 3)
- Products/services identified
- Team size estimate (can pre-fill Field 4)
- Technology signals detected
- Competitive positioning (from Google Search grounding)
- AI opportunity indicators (early signals for Step 2)
- Source attribution links (from `groundingChunks`)

### What is NOT AI-generated on this screen

- Right panel guidance text for non-URL fields remains static (pre-written copy)
- Auto-save runs silently — no loading spinners, just the status indicator
- If user returns to this step later, all fields are pre-filled from saved data and cached analysis is restored from ai_cache
