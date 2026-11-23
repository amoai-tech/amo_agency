import { useState } from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Target, Cog, FileText, Briefcase } from 'lucide-react';

interface V2CapabilityFrameworkProps {
  onNavigate?: (page: string) => void;
}

type Segment = 'strategy' | 'execution' | 'intelligence' | null;

export default function V2CapabilityFramework({ onNavigate }: V2CapabilityFrameworkProps) {
  const [activeSegment, setActiveSegment] = useState<Segment>(null);

  const planningCapabilities = [
    'Idea validation',
    'Opportunity scoring',
    'Lean canvas generation',
    'Founder roadmap',
  ];

  const operationsCapabilities = [
    'Pitch deck engine',
    'Document factory',
    'CRM + investor pipeline',
    'Task automation',
  ];

  const segments = [
    {
      id: 'strategy' as Segment,
      label: 'Strategy',
      angle: 0,
      capabilities: [
        'Problem definition',
        'Market sizing (TAM / SAM / SOM)',
        'Revenue model selection',
        'Go-to-market strategy',
        'Fundraising narrative',
      ],
    },
    {
      id: 'execution' as Segment,
      label: 'Execution',
      angle: 120,
      capabilities: [
        'MVP scope definition',
        'Task and roadmap generation',
        'Agent-driven workflows',
        'Document and deck creation',
        'Progress tracking',
      ],
    },
    {
      id: 'intelligence' as Segment,
      label: 'Intelligence',
      angle: 240,
      capabilities: [
        'Industry research',
        'Competitor analysis',
        'Benchmarks and scoring',
        'Risk detection',
        'Next-best-action recommendations',
      ],
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: '#1A1A1A' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl text-white leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            How AMO AI <span style={{ color: 'rgba(245,245,240,0.7)' }}>Delivers Value</span>
          </h2>
          <p className="text-lg lg:text-xl text-white/70 max-w-3xl mt-6">
            A unified capability framework that transforms operations with production-grade AI systems
          </p>
        </motion.div>

        {/* Framework Container */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-16 items-start">
          
          {/* Left Panel: AI-Enabled Planning */}
          <motion.div
            className={`space-y-6 transition-opacity duration-500 ${
              activeSegment && activeSegment !== 'strategy' ? 'opacity-40' : 'opacity-100'
            }`}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-[#F5F5F0]" />
              <h3 className="text-xl lg:text-2xl text-[#F5F5F0] uppercase tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                AI-Enabled Planning
              </h3>
            </div>
            <div className="space-y-4">
              {planningCapabilities.map((capability, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <div className="w-1.5 h-1.5 bg-[#F5F5F0]/60 mt-2 flex-shrink-0" style={{ borderRadius: '1px' }} />
                  <span className="text-base lg:text-lg leading-relaxed">
                    {capability}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Center: Circular Framework */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]">
              <svg
                viewBox="0 0 500 500"
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
              >
                {/* Outer Ring Segments */}
                {segments.map((segment, index) => {
                  const isActive = activeSegment === segment.id;
                  const colors = [
                    { base: '#F5F5F0', hover: '#FFFFFF' }, // Strategy
                    { base: '#C8C2BA', hover: '#F5F5F0' }, // Execution
                    { base: '#9E9890', hover: '#C8C2BA' }, // Intelligence
                   ];
                  const color = colors[index];
                  
                  return (
                    <g key={segment.id}>
                      {/* Segment Path */}
                      <path
                        d={createSegmentPath(250, 250, 180, 120, segment.angle, 120)}
                        fill={isActive ? color.hover : color.base}
                        className="cursor-pointer transition-all duration-500"
                        onMouseEnter={() => setActiveSegment(segment.id)}
                        onMouseLeave={() => setActiveSegment(null)}
                        opacity={activeSegment && !isActive ? 0.4 : 1}
                      />
                      
                      {/* Segment Label */}
                      <text
                        x={250 + Math.cos((segment.angle + 60) * Math.PI / 180) * 150}
                        y={250 + Math.sin((segment.angle + 60) * Math.PI / 180) * 150}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#1A1A1A"
                        fontSize="20"
                        fontWeight="700"
                        className="pointer-events-none uppercase tracking-wider"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {segment.label}
                      </text>
                    </g>
                  );
                })}

                {/* Center Circle */}
                <circle
                  cx="250"
                  cy="250"
                  r="110"
                  fill="#F5F5F0"
                  stroke="#1A1A1A"
                  strokeWidth="3"
                />

                {/* Center Text */}
                <text
                  x="250"
                  y="235"
                  textAnchor="middle"
                  fill="#1A1A1A"
                  fontSize="18"
                  fontWeight="700"
                  className="uppercase tracking-wider"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  STARTUP
                </text>
                <text
                  x="250"
                  y="257"
                  textAnchor="middle"
                  fill="#1A1A1A"
                  fontSize="18"
                  fontWeight="700"
                  className="uppercase tracking-wider"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  DELIVERY
                </text>
                <text
                  x="250"
                  y="279"
                  textAnchor="middle"
                  fill="#1A1A1A"
                  fontSize="18"
                  fontWeight="700"
                  className="uppercase tracking-wider"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  ENGINE
                </text>

                {/* Subtext */}
                <text
                  x="250"
                  y="305"
                  textAnchor="middle"
                  fill="#1A1A1A"
                  fontSize="11"
                   opacity="0.6"
                >
                   Strategy • Execution • Intelligence
                </text>
              </svg>

              {/* Capability Details Popup (on hover) */}
              {activeSegment && (
                <motion.div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-8 bg-white px-8 py-6 shadow-2xl min-w-[320px]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ borderRadius: '4px' }}
                >
                  <h4 className="text-xl mb-4 uppercase tracking-wide" style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A' }}>
                    {segments.find(s => s.id === activeSegment)?.label}
                  </h4>
                  <ul className="space-y-2">
                    {segments.find(s => s.id === activeSegment)?.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(26,26,26,0.7)' }}>
                        <span className="mt-1" style={{ color: '#00875A' }}>&#8226;</span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right Panel: AI-Enabled Operations */}
          <motion.div
            className={`space-y-6 transition-opacity duration-500 ${
              activeSegment && activeSegment !== 'execution' ? 'opacity-40' : 'opacity-100'
            }`}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-[#F5F5F0]" />
              <h3 className="text-xl lg:text-2xl text-[#F5F5F0] uppercase tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                AI-Enabled Operations
              </h3>
            </div>
            <div className="space-y-4">
              {operationsCapabilities.map((capability, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <div className="w-1.5 h-1.5 bg-[#F5F5F0]/60 mt-2 flex-shrink-0" style={{ borderRadius: '1px' }} />
                  <span className="text-base lg:text-lg leading-relaxed">
                    {capability}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Note */}
        <motion.div
          className="text-center mt-16 lg:mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-xs text-white/50 uppercase tracking-wider">
            Source: AMO AI Capability Framework
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Helper function to create SVG arc paths for segments
function createSegmentPath(
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  angleSpan: number
): string {
  const startRad = (startAngle - 90) * Math.PI / 180;
  const endRad = (startAngle + angleSpan - 90) * Math.PI / 180;

  const x1 = cx + outerRadius * Math.cos(startRad);
  const y1 = cy + outerRadius * Math.sin(startRad);
  const x2 = cx + outerRadius * Math.cos(endRad);
  const y2 = cy + outerRadius * Math.sin(endRad);
  const x3 = cx + innerRadius * Math.cos(endRad);
  const y3 = cy + innerRadius * Math.sin(endRad);
  const x4 = cx + innerRadius * Math.cos(startRad);
  const y4 = cy + innerRadius * Math.sin(startRad);

  const largeArcFlag = angleSpan > 180 ? 1 : 0;

  return `
    M ${x1} ${y1}
    A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}
    L ${x3} ${y3}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
    Z
  `;
}