Update the existing screen for 001-WIZ — Wizard Step 1: Business Context

Do not redesign from scratch.
Keep the current premium editorial AMO AI style, 3-panel layout, typography, spacing, and overall structure.

Goal of this update

Improve the Website URL section so the screen clearly communicates that when a user enters a website, the system uses:

URL Context to analyze the actual website content

Google Search to gather outside market and company context

This should feel intelligent, premium, and easy to understand — like a senior AI consultant quietly doing research in the background.

What to add to the existing screen
1. Upgrade the Website URL field

In the center form panel, enhance the Website URL field so it feels more important and more intelligent.

Add:

A clearer helper line under the field:
“Optional — we analyze your website and public web context to tailor recommendations faster.”

A small inline trust row below helper text with 2 subtle pills or mini badges:

URL Context

Google Search

A tiny note below:
“Used to understand your business, positioning, and likely opportunities.”

Visual direction:

Keep minimal and elegant

No heavy technical styling

Feels like premium AI assistance, not a developer tool

2. Add a “Website Analysis in progress” state

When a valid URL is entered and blurred, show an analysis state.

In the right panel, add a dynamic card for this state:

Title: Analyzing your website

Short copy:
“We’re reviewing your site content and public web signals to build a more accurate business profile.”

Show subtle loading skeletons for:

company summary

industry detection

products/services

AI opportunities

Optional microcopy:

Website content

Market signals

Business profile

AI opportunities

This should feel calm and premium, not flashy.

3. Add a completed “Company Analysis” card

In the right panel, create a polished results card that appears once analysis is complete.

Include these sections:

Company Summary

Detected Industry

Products / Services

Team Size Estimate

Technology Signals

AI Opportunity Indicators

Also include a small source note at the bottom:

Sources: Website + Google Search

Add 1–2 subtle action suggestions:

Use detected industry

Use team size estimate

These should feel like optional smart autofill suggestions, not forced automation.

4. Add a small visual connection between the Website field and the right panel

Make it visually obvious that the website field powers the analysis panel.

Ideas:

a subtle status line below the URL input:
“AI analysis available when website is provided”

or a lightweight icon + text cue

or a faint directional relationship in layout without being decorative

The user should instantly understand:
enter website → AI researches business → better recommendations

5. Add a compact “How analysis works” explainer

In the right panel default state, under “Why we’re asking,” add a compact explanation box:

How this helps

URL Context: reads your website content

Google Search: adds market and public company context

Result: better industry detection and more relevant recommendations

Keep this short, elegant, and non-technical.

6. Add error-safe graceful fallback

If website analysis is unavailable, the screen should still feel smooth.

Design a fallback right-panel state:

No scary errors

No red warning blocks

Just calm copy like:
“We couldn’t extract website insights right now, but you can continue normally.”

Optional secondary line:
“Your answers will still guide the analysis.”

UX behavior to reflect in the design

Show these UI states for the Website section:

Default

Empty website field

Right panel explains why website helps

Valid URL entered

Field looks ready for analysis

Small helper cue that AI will analyze on blur

Analysis running

Loading/skeleton card in right panel

Analysis complete

Right panel shows structured company analysis card

Fallback

Calm non-blocking message if analysis fails

Style requirements

Keep everything consistent with the existing screen:

premium editorial feel

beige + white surfaces

dark teal typography

lime green only for active/highlight states

generous whitespace

no dashboards that feel too technical

no flashy gradients

no developer-console aesthetics

This should feel like:
luxury consulting intake form + intelligent AI research assistant