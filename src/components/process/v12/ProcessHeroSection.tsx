// C-P01 — Process Hero Section
// BCG design system dark variant: charcoal bg, white text, Georgia serif, green accents, 4px radius

import HeroCircularDiagram from './HeroCircularDiagram';

interface ProcessHeroSectionProps {
  onStartClick?: () => void;
  onStoriesClick?: () => void;
}

export default function ProcessHeroSection({
  onStartClick,
  onStoriesClick,
}: ProcessHeroSectionProps) {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: '#1A1A1A' }}>
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="lg:col-span-5">
            <p className="text-xs tracking-widest uppercase mb-6" style={{ color: '#00875A', letterSpacing: '0.08em' }}>
              AMO AI Process
            </p>

            <h1 className="mb-8">
              <div
                className="text-5xl md:text-6xl text-white mb-2"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                8 Weeks.
              </div>
              <div
                className="text-5xl md:text-6xl"
                style={{ fontFamily: 'Georgia, serif', color: '#00875A' }}
              >
                Not 8 Months.
              </div>
            </h1>

            <p className="text-lg md:text-xl text-neutral-300 mb-10 leading-relaxed">
              We move fast without cutting corners—AI acceleration + expert delivery
              for measurable results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <button
                onClick={onStartClick}
                className="px-8 py-4 text-sm transition-colors"
                style={{ backgroundColor: '#00875A', color: '#FFFFFF', borderRadius: '4px' }}
              >
                Start Your AI Brief
              </button>
              <button
                onClick={onStoriesClick}
                className="border px-8 py-4 text-sm transition-colors hover:bg-white hover:text-[#1A1A1A]"
                style={{ borderColor: '#FFFFFF', color: '#FFFFFF', borderRadius: '4px' }}
              >
                See Success Stories
              </button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl text-white mb-1" style={{ fontFamily: 'Georgia, serif' }}>40+</div>
                <div className="text-xs tracking-widest uppercase text-neutral-400" style={{ letterSpacing: '0.06em' }}>
                  Projects Delivered
                </div>
              </div>
              <div>
                <div className="text-3xl text-white mb-1" style={{ fontFamily: 'Georgia, serif' }}>$5M+</div>
                <div className="text-xs tracking-widest uppercase text-neutral-400" style={{ letterSpacing: '0.06em' }}>
                  Client Revenue Impact
                </div>
              </div>
              <div>
                <div className="text-3xl text-white mb-1" style={{ fontFamily: 'Georgia, serif' }}>4.2×</div>
                <div className="text-xs tracking-widest uppercase text-neutral-400" style={{ letterSpacing: '0.06em' }}>
                  Average ROI
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Circular Diagram */}
          <div className="lg:col-span-7">
            <HeroCircularDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
