// C02 — Footer
// BCG design system: warm off-white bg, charcoal text, green accents, Georgia serif

import { Link } from 'react-router';
import { Sun } from 'lucide-react';

export default function Footer() {
  const companyLinks = [
    { path: '/about', label: 'About' },
    { path: '/process', label: 'Process' },
    { path: '/projects', label: 'Projects' },
  ];

  const servicesLinks = [
    { path: '/services', label: 'All Services' },
    { path: '/services/chatbot', label: 'AI Chatbots' },
    { path: '/whatsapp-ai', label: 'WhatsApp AI' },
    { path: '/web-design', label: 'Web Design' },
    { path: '/web-apps', label: 'Web Apps' },
    { path: '/mvp-v2', label: 'MVP Builder' },
    { path: '/sales-crm', label: 'Sales CRM' },
    { path: '/services/infographics', label: 'AI Infographics' },
  ];

  const agentsLinks = [
    { path: '/agents', label: 'AI Agents Overview' },
    { path: '/services/ai-agents', label: 'AI Agents (Services)' },
    { path: '/solutions', label: 'Solutions' },
  ];

  const industriesLinks = [
    { path: '/industries', label: 'All Industries' },
    { path: '/industries/e-commerce', label: 'E-Commerce' },
    { path: '/industries/fashion', label: 'Fashion' },
    { path: '/industries/travel', label: 'Travel & Tourism' },
    { path: '/financial', label: 'Financial Services' },
  ];

  const resourcesLinks = [
    { path: '/wizard', label: 'Project Wizard' },
    { path: '/app/dashboard', label: 'Client Dashboard' },
    { path: '/case-studies', label: 'Case Studies' },
    { path: '/style-guide', label: 'Style Guide' },
    { path: '/sitemap', label: 'Sitemap' },
  ];

  const renderLinks = (links: { path: string; label: string }[]) => (
    <div className="space-y-2.5">
      {links.map((link) => (
        <Link
          key={link.path + link.label}
          to={link.path}
          className="block text-sm transition-colors"
          style={{ color: '#6B6B63' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#1A1A1A'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#6B6B63'; }}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );

  return (
    <footer className="border-t" style={{ borderColor: '#E8E8E4', backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[1120px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="lg:col-span-3">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Sun className="w-5 h-5" style={{ color: '#00875A' }} />
              <span style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1.05rem' }}>
                Sun AI Agency
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: '#6B6B63' }}>
              AI systems that solve real business problems. Strategy, architecture, and production — delivered in 8 weeks.
            </p>
            <div className="mt-4 h-0.5 w-12" style={{ backgroundColor: '#00875A' }} />
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {/* Company */}
              <div>
                <h3
                  className="text-xs uppercase tracking-widest mb-4"
                  style={{ color: '#00875A', letterSpacing: '0.08em' }}
                >
                  Company
                </h3>
                {renderLinks(companyLinks)}
              </div>

              {/* Services */}
              <div>
                <h3
                  className="text-xs uppercase tracking-widest mb-4"
                  style={{ color: '#00875A', letterSpacing: '0.08em' }}
                >
                  Services
                </h3>
                {renderLinks(servicesLinks)}
              </div>

              {/* Industries */}
              <div>
                <h3
                  className="text-xs uppercase tracking-widest mb-4"
                  style={{ color: '#00875A', letterSpacing: '0.08em' }}
                >
                  Industries
                </h3>
                {renderLinks(industriesLinks)}
              </div>

              {/* AI Agents */}
              <div>
                <h3
                  className="text-xs uppercase tracking-widest mb-4"
                  style={{ color: '#00875A', letterSpacing: '0.08em' }}
                >
                  AI Agents
                </h3>
                {renderLinks(agentsLinks)}
              </div>

              {/* Resources */}
              <div>
                <h3
                  className="text-xs uppercase tracking-widest mb-4"
                  style={{ color: '#00875A', letterSpacing: '0.08em' }}
                >
                  Resources
                </h3>
                {renderLinks(resourcesLinks)}
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderColor: '#E8E8E4' }}
        >
          <p className="text-sm" style={{ color: '#9CA39B' }}>
            &copy; 2026 Sun AI Agency. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button className="text-sm transition-colors" style={{ color: '#9CA39B' }}>
              Privacy
            </button>
            <button className="text-sm transition-colors" style={{ color: '#9CA39B' }}>
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}