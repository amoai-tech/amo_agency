# Public homepage and portfolio — evidence register

Updated: 2026-11-14. Scope: AMO-7, AMO-10, AMO-11.

## Removed / corrected

| Previous statement | Decision | Reason |
|---|---|---|
| 94% client satisfaction; 8-week average delivery | Removed from the homepage | No approved client dataset, denominator, measurement method, or dates supplied |
| 42K+ AI interactions, 1,200+ workflows, 98% uptime, 35% average cost reduction | Removed from the homepage | No verified first-party reports supporting these portfolio-wide claims |
| 4–6 week MVP guarantee; 90+ Lighthouse score guarantee | Replaced with scope-based service descriptions | Timelines and scores are project-specific; no per-project evidence attached |
| Fixed eight-week delivery promises in the homepage process sections | Converted to four phases | A process outline is not a contractual timeline |
| Agent dashboard displays lead counts, conversions, ROI and cost savings | Clearly labeled **illustrative sample data**, not client results | UI is mock/example data rendered from a static local array |
| Homepage Start a Project and Contact Us to /booking | Changed to **Explore Services** (/services) and **View Our Work** (/projects) | Legacy form task AMO-13 is canceled while the future CopilotKit flow is separately planned |
| Four generic case studies with unsupported results and Unsplash images captioned as app screenshots | Replaced with two **public product examples**; no revenue/delivery metrics shown | Stock photographs are not evidence of a deployed interface |

## Positive product evidence

| Product | Public source inspected | Screenshot and supported description |
|---|---|---|
| MDE AI | https://www.mdeai.co/ | Captured public homepage 2026-11-14. Public copy covers exploring Medellín rentals, restaurants, cafés and events; result cards/map and follow-up questions. Screenshot: `public/images/projects/mdeai-public-home.webp`. |
| iPix | https://www.ipix.co/ | Captured public homepage 2026-11-14. Public copy describes brand, plan, book, produce, deliver workflow for fashion/DTC content. Screenshot: `public/images/projects/ipix-public-home.webp`. |

Product screenshots show publicly accessible sites; they do not prove attribution, customer outcomes, vendor contractual ownership, production SLAs, or private workspace functionality. No private screens, personal data or client documents are included. These examples should be confirmed by the project owner before using them as client case studies.

## Rules for future claims

Only display measured figures with the source report, date range, numerator/denominator, owner permission, and method recorded here. Do not convert sample dashboards into customer results. The canceled booking form remains out of scope. Any future real lead capture or CopilotKit setup requires a separate authorized task.

## Verification

Run `npm ci && npm run build && npm run test:e2e` on the PR head, then test the exact protected Vercel Preview on 390px and 1440px. Check screenshots load (naturalWidth > 0), external product links point to approved destinations, no homepage CTA points at /booking, and both public example pages open.
