import { Project } from '../types/projects';

export const PROJECTS: Project[] = [
  {
    id: 'startupai',
    name: 'StartupAI',
    tagline: 'AI-powered startup validation and business planning platform',
    industry: ['SaaS', 'AI Tools', 'Entrepreneurship'],
    problem: [
      'Entrepreneurs spend weeks researching market viability',
      'Business plans require expensive consultants',
      'No automated competitor analysis tools',
      'Pitch deck creation takes too long',
    ],
    solution:
      'StartupAI analyzes business ideas in minutes using GPT-4 and proprietary market data. It generates comprehensive business plans, competitive analysis, financial projections, and investor-ready pitch decks automatically.',
    aiCapabilities: [
      'Market analysis using real-time web scraping',
      'Competitor identification and SWOT generation',
      'Financial modeling with industry benchmarks',
      'Automated pitch deck generation',
      'Business name and branding suggestions',
    ],
    results: [
      'Launched in 6 weeks from concept to production',
      '500+ startups validated in first month',
      'Average completion time: 12 minutes',
      '4.8/5 user satisfaction score',
      'Featured on Product Hunt top 10',
    ],
    techStack: [
      { name: 'Next.js', icon: '⚛️' },
      { name: 'OpenAI GPT-4', icon: '🤖' },
      { name: 'Supabase', icon: '🗄️' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'Vercel', icon: '▲' },
    ],
    screenshots: [
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop',
        caption: 'Dashboard showing AI-generated business insights',
        type: 'desktop',
      },
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop',
        caption: 'Competitor analysis visualization',
        type: 'desktop',
      },
      {
        url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=675&fit=crop',
        caption: 'Automated pitch deck generation interface',
        type: 'desktop',
      },
    ],
  },
  {
    id: 'fashionos',
    name: 'FashionOS',
    tagline: 'AI stylist and inventory management for fashion retailers',
    industry: ['E-commerce', 'Fashion', 'Retail'],
    problem: [
      'Customers struggle to find matching outfits online',
      'High return rates due to poor fit predictions',
      'Manual inventory tagging is time-consuming',
      'Personalization requires extensive user data',
    ],
    solution:
      'FashionOS uses computer vision to automatically tag products, suggest outfit combinations, and predict fit. The AI stylist learns customer preferences and body types to reduce returns and increase basket size.',
    aiCapabilities: [
      'Visual product recognition and auto-tagging',
      'Style matching and outfit recommendations',
      'Size prediction based on body measurements',
      'Trend forecasting from social media',
      'Personalized styling advice via chat',
    ],
    results: [
      'Deployed to 3 fashion brands in 8 weeks',
      '35% reduction in return rates',
      '2.3x increase in average order value',
      '80% accuracy in size recommendations',
      '$500K+ in additional revenue tracked',
    ],
    techStack: [
      { name: 'React', icon: '⚛️' },
      { name: 'TensorFlow', icon: '🧠' },
      { name: 'Claude API', icon: '💬' },
      { name: 'PostgreSQL', icon: '🗄️' },
      { name: 'AWS Lambda', icon: '☁️' },
    ],
    screenshots: [
      {
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=675&fit=crop',
        caption: 'AI-powered outfit recommendation engine',
        type: 'desktop',
      },
      {
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=675&fit=crop',
        caption: 'Visual search and product tagging interface',
        type: 'desktop',
      },
    ],
  },
  {
    id: 'eventsos',
    name: 'EventsOS',
    tagline: 'End-to-end event planning automation with AI coordination',
    industry: ['Events', 'SaaS', 'Hospitality'],
    problem: [
      'Event planners juggle 10+ tools for single events',
      'Vendor coordination requires constant manual follow-up',
      'Budget tracking spreadsheets prone to errors',
      'Guest communication is repetitive and time-consuming',
    ],
    solution:
      'EventsOS centralizes event planning with AI-powered vendor matching, automated scheduling, budget optimization, and intelligent guest communication. The platform handles everything from venue booking to post-event surveys.',
    aiCapabilities: [
      'Vendor matching based on budget and requirements',
      'Automated schedule generation and conflict resolution',
      'Budget optimization with real-time cost tracking',
      'AI chatbot for guest inquiries',
      'Post-event analysis and recommendations',
    ],
    results: [
      'Built and launched in 7 weeks',
      '120+ events planned in first 3 months',
      'Average time savings: 40 hours per event',
      '92% vendor satisfaction rating',
      '$50K MRR within 90 days',
    ],
    techStack: [
      { name: 'Vue.js', icon: '💚' },
      { name: 'OpenAI', icon: '🤖' },
      { name: 'Firebase', icon: '🔥' },
      { name: 'Stripe', icon: '💳' },
      { name: 'Twilio', icon: '📱' },
    ],
    screenshots: [
      {
        url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=675&fit=crop',
        caption: 'Event timeline with AI-generated schedule',
        type: 'desktop',
      },
      {
        url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=675&fit=crop',
        caption: 'Vendor marketplace with smart recommendations',
        type: 'desktop',
      },
      {
        url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=675&fit=crop',
        caption: 'Budget tracking and optimization dashboard',
        type: 'desktop',
      },
    ],
  },
  {
    id: 'medellinai',
    name: 'Medellín AI',
    tagline: 'Smart tourism platform for Medellín, Colombia',
    industry: ['Travel', 'Tourism', 'Local Services'],
    problem: [
      'Tourists rely on outdated guidebooks and blogs',
      'Language barriers limit authentic experiences',
      'Safety concerns prevent exploration',
      'No personalized itinerary tools',
    ],
    solution:
      'Medellín AI provides real-time, personalized travel recommendations using local data, live safety updates, and AI translation. The platform learns user preferences to suggest hidden gems and create custom itineraries.',
    aiCapabilities: [
      'Real-time safety scoring using crime data',
      'Personalized itinerary generation',
      'AI translation for Spanish ↔ English',
      'Local insights from social media analysis',
      'Restaurant and attraction recommendations',
    ],
    results: [
      'Launched in 6 weeks for tourism board',
      '10,000+ tourists used in first month',
      '4.9/5 app store rating',
      'Featured in local news media',
      'Partnership with 50+ local businesses',
    ],
    techStack: [
      { name: 'React Native', icon: '📱' },
      { name: 'Google AI', icon: '🌐' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'MapBox', icon: '🗺️' },
      { name: 'Redis', icon: '⚡' },
    ],
    screenshots: [
      {
        url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=675&fit=crop',
        caption: 'Interactive map with AI-curated recommendations',
        type: 'desktop',
      },
      {
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=675&fit=crop',
        caption: 'Real-time translation and local insights',
        type: 'desktop',
      },
    ],
  },
];
