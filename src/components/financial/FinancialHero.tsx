import { ImageWithFallback } from '../figma/ImageWithFallback';

const HERO_IMG = 'https://images.unsplash.com/photo-1760561149141-0e88e5e27026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkaXN0cmljdCUyMHNreXNjcmFwZXIlMjBtb2Rlcm4lMjBjaXR5c2NhcGV8ZW58MXx8fHwxNzcyMDIwMjkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

export function FinancialHero() {
  return (
    <section style={{ background: '#F4F3EE' }}>
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-16">
        {/* Title */}
        <h1
          className="tracking-tight mb-4"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 600,
            lineHeight: 1.1,
            color: '#1C1C1C',
          }}
        >
          Financial Institutions
        </h1>
        <p
          className="max-w-2xl mb-10"
          style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#6B6B6B' }}
        >
          The financial sector is being reshaped by AI, data, and digital-native competitors. AMO AI helps financial
          institutions transform operations, modernize customer experiences, and build AI-powered competitive advantages.
        </p>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '16/7' }}>
          <ImageWithFallback
            src={HERO_IMG}
            alt="Financial district"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Intro paragraph */}
        <p
          className="max-w-3xl mt-10"
          style={{ fontSize: '0.9rem', lineHeight: 1.75, color: '#6B6B6B' }}
        >
          From retail banking and wealth management to insurance and capital markets, we partner with financial
          institutions to deploy AI systems that reduce costs, improve compliance, accelerate decision-making, and
          deliver personalized experiences at scale. Our approach combines deep industry expertise with
          production-grade AI engineering.
        </p>
      </div>
    </section>
  );
}
