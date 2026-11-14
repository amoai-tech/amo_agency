import { Project } from '../types/projects';

// Public product information verified from the products' own live homepages.
// Screenshots captured from public landing pages on 2026-11-14.
// No client revenue, delivery timeframe, adoption count or ROI claim is implied.
export const PROJECTS: Project[] = [
  {
    id: 'mdeai',
    name: 'MDE AI',
    tagline: 'An AI concierge for exploring Medellín',
    industry: ['Travel', 'Local Discovery', 'AI'],
    problem: [
      'Visitors need a simple way to discover rentals, restaurants, cafés and events.',
      'Search results are easier to explore when places appear on a map.',
    ],
    solution:
      'MDE AI offers natural-language discovery of Medellín places and listings, showing results as cards connected to an interactive map.',
    aiCapabilities: [
      'Ask about rentals and local places in natural language.',
      'Explore restaurants, cafés, nightlife and events.',
      'Open listing details and ask follow-up questions.',
    ],
    results: [],
    techStack: [],
    screenshots: [
      {
        url: '/images/projects/mdeai-public-home.webp',
        caption: 'Real screenshot of the public MDE AI homepage — November 2026',
        type: 'desktop',
      },
    ],
    caseStudyUrl: 'https://www.mdeai.co/',
  },
  {
    id: 'ipix',
    name: 'iPix',
    tagline: 'AI-powered content production for fashion and DTC brands',
    industry: ['Fashion', 'Content Production', 'AI'],
    problem: [
      'Coordinating brand context, shoot planning, talent and asset delivery requires clear handoffs.',
      'Creative teams need a shared workflow from the first brief through the final content.',
    ],
    solution:
      'iPix brings brand information, shoot planning, talent booking, production coordination and delivered assets into one described workflow.',
    aiCapabilities: [
      'Bring brand context into a production plan.',
      'Plan shoot deliverables, timing and shot lists.',
      'Coordinate booking, production and delivery stages.',
    ],
    results: [],
    techStack: [],
    screenshots: [
      {
        url: '/images/projects/ipix-public-home.webp',
        caption: 'Real screenshot of the public iPix homepage — November 2026',
        type: 'desktop',
      },
    ],
    caseStudyUrl: 'https://www.ipix.co/',
  },
];
