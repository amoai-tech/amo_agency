const SITE_URL = 'https://www.amoai.ca';
const DEFAULT_DESCRIPTION =
  'AMO AI helps businesses discover, plan, and launch AI automation systems with an AI-powered wizard, client dashboard, and Supabase-backed workflows.';

const PAGE_NAMES: Record<string, string> = {
  '/solutions': 'AI Solutions',
  '/services/infographicv2': 'Premium AI Infographics',
  '/services/infographics': 'AI Infographics',
  '/services/ai-agents': 'AI Agent Services',
  '/services/chatbot': 'AI Chatbot Services',
  '/services': 'AI Services',
  '/industries/e-commerce': 'AI for E-Commerce',
  '/industries/fashion': 'AI for Fashion',
  '/industries/travel': 'AI for Travel',
  '/industries': 'Industries',
  '/financial': 'AI for Financial Services',
  '/web-design': 'AI-Powered Web Design',
  '/web-apps': 'Web App Development',
  '/mvp-builder': 'MVP Builder',
  '/mvp-v2': 'MVP Builder',
  '/agents': 'AI Agents',
  '/ai-agents': 'AI Agents',
  '/chatbots': 'AI Chatbots',
  '/whatsapp-ai': 'WhatsApp AI',
  '/sales-crm': 'AI Sales CRM',
  '/projects': 'Projects',
  '/case-studies': 'Case Studies',
  '/process': 'Our Process',
  '/about': 'About',
  '/booking': 'Book a Consultation',
  '/style-guide': 'Style Guide',
  '/sections': 'Component Sections',
  '/sitemap': 'Sitemap',
  '/auth': 'Sign In',
  '/wizard/proposal': 'Project Proposal',
  '/wizard/processing': 'Preparing Your Project Brief',
  '/wizard': 'Project Brief Wizard',
  '/app': 'Client Dashboard',
  '/blog/ai-adoption-by-industry': 'AI Adoption by Industry',
};

function upsertMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function updateCanonical(url: string) {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
}

export function updateSeo(pathname: string) {
  const normalizedPath = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/';
  const matchedPath = Object.keys(PAGE_NAMES)
    .sort((a, b) => b.length - a.length)
    .find((path) => normalizedPath === path || normalizedPath.startsWith(`${path}/`));
  const pageName = matchedPath ? PAGE_NAMES[matchedPath] : undefined;
  const title = pageName ? `${pageName} | AMO AI` : 'AMO AI — AI Agents & Automation';
  const canonicalUrl = normalizedPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalizedPath}`;

  document.title = title;
  updateCanonical(canonicalUrl);
  upsertMeta('meta[name="description"]', 'name', 'description', DEFAULT_DESCRIPTION);
  upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
  upsertMeta('meta[property="og:description"]', 'property', 'og:description', DEFAULT_DESCRIPTION);
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
  upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'AMO AI');
  upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', DEFAULT_DESCRIPTION);
}
