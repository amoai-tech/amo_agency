import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Globe, Layers, Briefcase, Users, Building2, Bot, BookOpen, Settings, Map } from 'lucide-react';

/* ─── C37 · SitemapPage ─── */

interface SitemapCard {
  label: string;
  path: string;
  description: string;
}

interface SitemapCategory {
  title: string;
  icon: React.ReactNode;
  accent: string;
  pages: SitemapCard[];
}

const BASE_URL = 'https://www.amoai.ca';

const categories: SitemapCategory[] = [
  {
    title: 'Home',
    icon: <Globe size={18} />,
    accent: '#00875A',
    pages: [
      { label: 'Home (Current)', path: '/', description: 'Main homepage — BCG luxury design' },
      { label: 'Home V1', path: '/home-v1', description: 'Original homepage design' },
      { label: 'Home V4', path: '/home-v4', description: 'Alternative homepage layout' },
    ],
  },
  {
    title: 'Services',
    icon: <Layers size={18} />,
    accent: '#00875A',
    pages: [
      { label: 'Services', path: '/services', description: 'Full services overview & tech stack' },
      { label: 'Solutions', path: '/solutions', description: 'AI-powered business solutions' },
      { label: 'Web Design', path: '/web-design', description: 'AI-powered web design services' },
      { label: 'Web Apps', path: '/web-apps', description: 'Custom web application development' },
      { label: 'MVP Builder', path: '/mvp-builder', description: 'Rapid MVP development program' },
      { label: 'MVP Builder V2', path: '/mvp-v2', description: 'Enhanced MVP builder experience' },
    ],
  },
  {
    title: 'AI & Agents',
    icon: <Bot size={18} />,
    accent: '#00875A',
    pages: [
      { label: 'AI Agents', path: '/agents', description: 'AI agent systems overview' },
      { label: 'AI Agents (Services)', path: '/services/ai-agents', description: 'AI agents service page' },
      { label: 'AI Chatbots', path: '/chatbots', description: 'Conversational AI chatbot solutions' },
      { label: 'Sales CRM', path: '/sales-crm', description: 'AI-powered sales CRM automation' },
    ],
  },
  {
    title: 'Industries',
    icon: <Building2 size={18} />,
    accent: '#00875A',
    pages: [
      { label: 'Industries Overview', path: '/industries', description: 'All industries we serve' },
      { label: 'E-Commerce', path: '/industries/e-commerce', description: 'AI for e-commerce businesses' },
      { label: 'Fashion', path: '/industries/fashion', description: 'AI solutions for fashion & retail' },
      { label: 'Travel & Tourism', path: '/industries/travel', description: 'AI for travel & hospitality' },
      { label: 'Financial Services', path: '/financial', description: 'AI for financial institutions' },
    ],
  },
  {
    title: 'Company',
    icon: <Users size={18} />,
    accent: '#00875A',
    pages: [
      { label: 'About', path: '/about', description: 'Our story, team & mission' },
      { label: 'Process', path: '/process', description: 'Our delivery methodology' },
      { label: 'Projects', path: '/projects', description: 'Featured project showcases' },
      { label: 'Case Studies', path: '/case-studies', description: 'Client success stories' },
      { label: 'Contact / Booking', path: '/booking', description: 'Book a consultation' },
    ],
  },
  {
    title: 'Resources',
    icon: <BookOpen size={18} />,
    accent: '#00875A',
    pages: [
      { label: 'Style Guide', path: '/style-guide', description: 'BCG design system reference' },
      { label: 'Sections', path: '/sections', description: 'Component sections showcase' },
      { label: 'Sitemap', path: '/sitemap', description: 'Visual sitemap (this page)' },
    ],
  },
];

const totalPages = categories.reduce((sum, cat) => sum + cat.pages.length, 0);

function SitemapCardItem({ page, index, accent }: { page: SitemapCard; index: number; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <Link to={page.path} className="block group">
        <div
          className="bg-white border border-[#E8E8E4] rounded-[4px] p-5 transition-all duration-300 group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A] relative overflow-hidden"
        >
          {/* Left accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 opacity-0 group-hover:opacity-100"
            style={{ backgroundColor: accent }}
          />

          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-[#1A1A1A] group-hover:text-[#F5F5F0] transition-colors duration-300" style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}>
              {page.label}
            </h3>
            <svg
              className="w-4 h-4 mt-1 flex-shrink-0 text-[#1A1A1A]/30 group-hover:text-[#F5F5F0]/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>

          <p className="text-sm text-[#1A1A1A]/50 group-hover:text-[#F5F5F0]/50 transition-colors duration-300 mb-3 leading-relaxed">
            {page.description}
          </p>

          <div className="flex items-center gap-1.5">
            <Globe size={11} className="text-[#00875A] flex-shrink-0" />
            <span
              className="text-xs text-[#1A1A1A]/35 group-hover:text-[#00875A]/80 transition-colors duration-300 font-mono truncate"
            >
              {BASE_URL}{page.path}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function SitemapPage() {
  return (
    <div className="bg-[#F5F5F0] min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Map size={14} className="text-[#00875A]" />
              <span className="text-xs uppercase tracking-[0.15em] text-[#00875A]">
                C37 · Site Architecture
              </span>
            </div>
            <h1
              className="text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Sitemap
            </h1>
            <p className="text-[#1A1A1A]/50 max-w-xl leading-relaxed">
              A complete visual map of every page on the AMO AI website.
              {' '}<span className="text-[#1A1A1A]/35">{totalPages} pages across {categories.length} categories.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-24">
        <div className="max-w-[1120px] mx-auto px-6 space-y-16">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: catIdx * 0.05 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-[4px] flex items-center justify-center text-white"
                  style={{ backgroundColor: category.accent }}
                >
                  {category.icon}
                </div>
                <h2
                  className="text-[#1A1A1A]"
                  style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '1.35rem' }}
                >
                  {category.title}
                </h2>
                <span className="text-xs text-[#1A1A1A]/30 ml-1">
                  {category.pages.length} {category.pages.length === 1 ? 'page' : 'pages'}
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.pages.map((page, idx) => (
                  <SitemapCardItem
                    key={page.path}
                    page={page}
                    index={idx}
                    accent={category.accent}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Band */}
      <section className="border-t border-[#E8E8E4]">
        <div className="max-w-[1120px] mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: totalPages.toString(), label: 'Total Pages' },
              { value: categories.length.toString(), label: 'Categories' },
              { value: '6', label: 'Industry Pages' },
              { value: '8+', label: 'Service Pages' },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-[#1A1A1A] mb-1"
                  style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '1.75rem' }}
                >
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.12em] text-[#1A1A1A]/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
