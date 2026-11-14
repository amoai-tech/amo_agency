# Wizard Screen 2 — Industry Diagnostics

## Figma Make Prompt

> Design Step 2 of a 5-step premium wizard for "AMO AI." This screen is titled "Industry Diagnostics" and presents targeted questions based on the industry selected in Step 1.
>
> **Layout:** Same three-panel layout as Step 1 (1440px desktop).
>
> **Left Panel (240px, white):**
> - Same stepper as Step 1, but now:
>   - Step 1 "Business Context" — completed (green checkmark, not just dot)
>   - Step 2 "Industry Diagnostics" — active (lime green dot, bold)
>   - Steps 3-5 — inactive
> - Context Card now shows saved Step 1 data:
>   - Company: "Acme Retail Group"
>   - Industry: "E-commerce / Retail" badge
>   - Size: "Medium (11-50)" badge
>   - Goal: "Growth"
> - Below context card: new section "Signals Detected" — starts empty, fills as user answers:
>   - Each detected signal appears as a small badge/chip: "High cart abandonment", "Manual support process", "No personalization"
>   - Signals have subtle pulse animation when they first appear
>
> **Center Panel (flexible, beige #F1EEEA):**
> - Top heading: "Let's diagnose your opportunities" — Playfair Display, dark teal
> - Subtitle: "These questions are tailored to E-commerce & Retail. Each answer helps us identify where AI can make the biggest impact." — Lora, medium gray
> - Industry badge pill next to subtitle: "E-commerce / Retail" with shopping cart icon, lime green background, dark text
>
> - **Question layout — one question at a time (conversational flow):**
>   Show all questions on the page but use a focused, card-per-question layout:
>
>   **Question Card Design:**
>   - White card, 12px radius, 24px padding
>   - Question number: "Q1" in small lime green badge (top left)
>   - Question text: 18px Lora, dark teal, bold
>   - Answer area below question text
>   - 32px gap between question cards
>
>   **Question 1 — Customer Acquisition**
>   - "How do customers currently find you?"
>   - Type: Multi-select checkboxes as pill chips (wrap on multiple lines)
>   - Options: Google Search, Social Media, Referrals, Paid Ads, Walk-in / Physical, Email Marketing, Marketplaces (Amazon, etc.), Other
>   - Selected pills: dark teal background, white text
>   - Unselected pills: white background, gray border, dark text
>
>   **Question 2 — Sales Process**
>   - "What does your sales process look like today?"
>   - Type: Single-select cards (horizontal row, 4 cards)
>   - Options with descriptions:
>     - "Fully Manual" — "Everything done by hand"
>     - "Partially Automated" — "Some tools, some manual"
>     - "Mostly Automated" — "Tools handle most of it"
>     - "Fully Automated" — "End-to-end automated"
>   - Each card: icon on top, label below, description small text
>   - Selected: lime green border, subtle green tint background
>
>   **Question 3 — Customer Support**
>   - "How do you handle customer support inquiries?"
>   - Type: Single-select vertical radio list with descriptions
>   - Options:
>     - "Email only" — "Customers email, team responds manually"
>     - "Phone" — "Phone-based support with queue"
>     - "Live chat" — "Real-time chat with human agents"
>     - "Chatbot" — "Automated first-line with escalation"
>     - "No formal process" — "Ad hoc responses"
>
>   **Question 4 — Current Tools**
>   - "What tools/software do you currently use?"
>   - Type: Multi-select as a tag cloud (visual grid of tool badges)
>   - Options: CRM, Email Marketing, Analytics, Social Media Management, Accounting, Project Management, E-commerce Platform, None
>   - Each as a rounded pill, toggleable
>
>   **Question 5 — Cart Abandonment** (E-commerce specific)
>   - "What is your average cart abandonment rate?"
>   - Type: Single-select horizontal pills
>   - Options: Under 30%, 30-50%, 50-70%, Over 70%, Don't know
>   - "Don't know" styled differently (lighter, italic)
>
>   **Question 6 — Post-Purchase** (E-commerce specific)
>   - "How do you handle post-purchase follow-up?"
>   - Type: Single-select cards (3 columns)
>   - Options:
>     - "Automated email sequences" — icon: mail + gear
>     - "Manual follow-up" — icon: person
>     - "Nothing" — icon: empty circle
>
>   **Question 7 — Personalization** (E-commerce specific)
>   - "Do you use personalized product recommendations?"
>   - Type: Three-option horizontal buttons
>   - Options: Yes, Partially, No
>   - Simple, clean — no descriptions needed
>
>   **Question 8 — Repeat Revenue** (E-commerce specific)
>   - "What percentage of revenue comes from repeat customers?"
>   - Type: Visual slider with labeled marks
>   - Marks: Under 20%, 20-40%, 40-60%, Over 60%, Don't know
>   - Show selected value prominently above slider
>   - "Don't know" as a separate checkbox below the slider that disables it
>
> **Right Panel (320px, white):**
> - Sticky header: "Why this matters" — serif, dark teal
> - Content changes per focused question:
>   - Q1: "Understanding your acquisition channels reveals which ones could benefit from automation. Companies relying on 1-2 channels have the highest growth potential from diversification."
>   - Q2: "Your automation maturity level determines whether we recommend foundational tools or advanced AI systems. We meet you where you are."
>   - Q3: "Support inquiries are one of the highest-ROI areas for AI. Companies with manual support processes typically see 60% cost reduction with an AI-first approach."
>   - Q4: "Your existing tools define what we integrate with versus what we replace. We never recommend rebuilding what already works."
>   - Q5: "Cart abandonment above 50% signals a high-value recovery opportunity. Automated follow-up sequences typically recover 10-15% of abandoned carts."
>   - Q6: "Post-purchase engagement drives repeat revenue. Companies with automated follow-up see 25-40% higher customer lifetime value."
>   - Q7: "Personalized recommendations increase average order value by 10-30%. This is one of the quickest AI wins in e-commerce."
>   - Q8: "High repeat revenue (>40%) means your product-market fit is strong — we focus on scaling. Low repeat revenue means we prioritize retention systems."
>
> - Below each explanation: a small "Signal" indicator showing what the system is detecting:
>   - Example: "Signal: High cart abandonment → Recovery automation recommended"
>   - Styled as a subtle callout box with left lime green border
>
> **Footer Bar:**
> - Left: "Back" text button (no fill, dark teal text, arrow left icon)
> - Center: "All changes saved" with green dot
> - Right: "Continue" button — same style as Step 1
> - Between Back and Continue: progress micro-indicator showing "5 of 8 answered"
>
> **Design Direction:**
> - Each question card should feel like a conversation — not a survey
> - Mix of input types keeps engagement high (chips, cards, slider, radio)
> - The right panel acts like a consultant sitting next to you explaining each question
> - Signals detected on the left panel give a sense of momentum and intelligence
> - Animation: when a new signal badge appears on the left panel, it should fade in with a subtle scale-up
> - When all questions are answered, the "Continue" button should get a subtle glow/pulse
> - The industry badge at the top reminds the user this is tailored to them
>
> **Responsive:**
> - Mobile: questions stack in a single column, full width cards. Right panel content appears as expandable "Why?" accordion under each question
> - Tablet: two panels (center + collapsible right drawer)
> - Desktop: full three-panel

## Content Data — All Industry Question Banks

### Universal Questions (all industries)
| # | Question | Type | Options |
|---|----------|------|---------|
| 1 | How do customers currently find you? | multi-select pills | Google Search, Social Media, Referrals, Paid Ads, Walk-in, Email Marketing, Marketplaces, Other |
| 2 | What does your sales process look like today? | single-select cards | Fully Manual, Partially Automated, Mostly Automated, Fully Automated |
| 3 | How do you handle customer support inquiries? | single-select radio | Email only, Phone, Live chat, Chatbot, No formal process |
| 4 | What tools/software do you currently use? | multi-select pills | CRM, Email Marketing, Analytics, Social Media, Accounting, PM, E-commerce Platform, None |

### E-commerce / Retail (Q5-Q8)
| # | Question | Type | Options | Signal |
|---|----------|------|---------|--------|
| 5 | Average cart abandonment rate? | select pills | <30%, 30-50%, 50-70%, >70%, Don't know | Recovery automation |
| 6 | Post-purchase follow-up? | select cards | Automated emails, Manual, Nothing | Retention opportunity |
| 7 | Personalized recommendations? | 3-button | Yes, Partially, No | AI recommendation engine |
| 8 | Repeat customer revenue %? | slider | <20%, 20-40%, 40-60%, >60%, Don't know | Loyalty/retention signal |

### Real Estate (Q5-Q8)
| # | Question | Type | Options | Signal |
|---|----------|------|---------|--------|
| 5 | How do you qualify incoming leads? | select radio | Manual review, Phone screening, Online form, No process | Lead qualification AI |
| 6 | Response time to new inquiries? | select pills | <1 hour, Same day, Next day, 2+ days | Speed-to-lead gap |
| 7 | Virtual tours or AI staging? | 3-button | Yes, No, Planning to | Digital presence |
| 8 | Listing management across platforms? | select radio | Manual per platform, Syndication tool, MLS only | Listing automation |

### Healthcare / Medical (Q5-Q8)
| # | Question | Type | Options | Signal |
|---|----------|------|---------|--------|
| 5 | How do patients book appointments? | multi-select pills | Phone, Website, App, Multiple channels | Booking automation |
| 6 | Average no-show rate? | select pills | <10%, 10-20%, 20-30%, >30%, Don't know | Reminder system |
| 7 | Patient intake forms? | select cards | Paper, PDF, Digital forms, Fully automated | Digital transformation |
| 8 | Post-visit follow-up care? | 3-button | Yes, Partially, No | Patient engagement |

### Financial Services (Q5-Q8)
| # | Question | Type | Options | Signal |
|---|----------|------|---------|--------|
| 5 | Client onboarding process? | select cards | In-person, Hybrid, Fully digital, No standard | Digital onboarding |
| 6 | Compliance documentation? | select radio | Manual, Partially automated, Fully automated | Compliance AI |
| 7 | Personalized financial insights? | 3-button | Yes, No, Planning to | AI advisory |
| 8 | Client portfolio access? | select radio | Portal, Reports, On request, No self-service | Client portal |

### Travel / Hospitality (Q5-Q8)
| # | Question | Type | Options | Signal |
|---|----------|------|---------|--------|
| 5 | Booking modifications handling? | select cards | Manual, Semi-automated, Fully automated | Automation maturity |
| 6 | Personalized recommendations? | 3-button | Yes, No, Partially | AI personalization |
| 7 | Guest review management? | select radio | Manual, Automated collection, AI-assisted, Nothing | Reputation mgmt |
| 8 | Direct vs OTA bookings? | select pills | Mostly direct, 50/50, Mostly OTA, Don't know | Channel optimization |

### Fashion / Beauty (Q5-Q8)
| # | Question | Type | Options | Signal |
|---|----------|------|---------|--------|
| 5 | Social media direct sales? | 3-button | Yes, No, Planning to | Social commerce |
| 6 | Seasonal inventory planning? | select cards | Manual forecasting, Data-driven, No formal process | AI demand forecasting |
| 7 | Virtual try-on / style recs? | 3-button | Yes, No, Planning to | AI personalization |
| 8 | Influencer partnerships? | select radio | Agency, In-house, Ad hoc, None | Marketing automation |

## Workflow

```
User arrives at /app/wizard/step-2
  → Load wizard_answers for step-1 to get industry
  → Load industry-specific question bank (universal Q1-Q4 + industry Q5-Q8)
  → Load any saved step-2 answers for pre-fill

User answers questions
  → Each answer: debounce 500ms → save to wizard_answers.data
  → Left panel "Signals Detected" updates based on answer patterns:
    - e.g., cart_abandonment > 50% → add "High cart abandonment" signal
    - e.g., support = "No formal process" → add "No support structure" signal
  → Right panel "Why this matters" updates on question focus
  → Footer shows "X of 8 answered" count

User clicks "Continue"
  → Validate: all 8 questions answered (or explicitly "Don't know")
  → Save final state
  → Trigger background Edge Function: analyze_diagnostics
    - Input: step-1 + step-2 answers
    - Output: ranked system recommendations → store in ai_cache
  → Update wizard_sessions.current_step = 3
  → Navigate to step-3

User clicks "Back"
  → Navigate to step-1 (data preserved)
```

## Agent Behavior
- **No visible AI on this screen** — intelligence is passive (right panel is pre-written copy)
- **Background AI trigger on completion:** Edge Function analyzes answers after user clicks Continue
  - Runs asynchronously — user doesn't wait
  - Results cached in `ai_cache` for instant Step 3 load
  - Logged in `ai_run_logs`
- **Signal detection is rule-based, not AI:** simple conditional logic maps answers to signal badges
