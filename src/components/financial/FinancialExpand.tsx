import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export function FinancialExpand() {
  return (
    <section style={{ background: '#FFFFFF' }}>
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div
          className="rounded-2xl px-8 sm:px-12 py-10 sm:py-12"
          style={{ background: '#DCE5DD' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2
                className="tracking-tight mb-4"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 600,
                  lineHeight: 1.15,
                  color: '#1E3D36',
                }}
              >
                AMO AI Expand
              </h2>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#1E3D36', opacity: 0.7 }}>
                A flexible engagement model for financial institutions that need ongoing AI strategy, implementation
                support, and system optimization. Get dedicated access to our AI engineering team, monthly strategy
                reviews, and priority deployment of new capabilities — all tailored to the unique regulatory and
                operational demands of financial services.
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white transition-all duration-300 hover:opacity-90"
                style={{ background: '#1E3D36', fontSize: '0.875rem', fontWeight: 500 }}
              >
                Explore Expand
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}