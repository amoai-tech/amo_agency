import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'motion/react';

/* ═══════════════════════════════════════════════════════════
   AI Architecture Diagram – High-end data-viz aesthetic
   ═══════════════════════════════════════════════════════════ */

interface NodeData {
  id: string;
  label: string;
  icon: string;
  angle: number;   // degrees around the circle
  ring: number;     // 1 = inner, 2 = outer
  delay: number;
}

const DIAGRAM_NODES: NodeData[] = [
  { id: 'ctx',   label: 'Business Context',    icon: '◈', angle: 240, ring: 2, delay: 0.35 },
  { id: 'diag',  label: 'Industry Diagnostics', icon: '◎', angle: 300, ring: 2, delay: 0.45 },
  { id: 'agent', label: 'AI Agents',           icon: '⬡', angle: 0,   ring: 2, delay: 0.55 },
  { id: 'crm',   label: 'CRM',                 icon: '◇', angle: 60,  ring: 2, delay: 0.60 },
  { id: 'wa',    label: 'WhatsApp',             icon: '◉', angle: 120, ring: 2, delay: 0.65 },
  { id: 'dash',  label: 'Dashboard',           icon: '▣', angle: 180, ring: 2, delay: 0.70 },
  { id: 'rev',   label: 'Revenue Growth',       icon: '△', angle: 210, ring: 1, delay: 0.50 },
  { id: 'auto',  label: 'Automation',           icon: '⟡', angle: 330, ring: 1, delay: 0.42 },
  { id: 'intel', label: 'Intelligence',         icon: '✦', angle: 90,  ring: 1, delay: 0.58 },
];

function polarToXY(angleDeg: number, radius: number, cx: number, cy: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

function AIDiagram() {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setReady(true), 150);
      return () => clearTimeout(t);
    }
  }, [inView]);

  const CX = 200, CY = 200;
  const R_INNER = 85, R_OUTER = 155;

  return (
    <div ref={ref} className="relative w-full max-w-[480px] lg:max-w-[540px] mx-auto" style={{ aspectRatio: '1' }}>
      {/* SVG Layer – rings + connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(132,204,22,0.15)" />
            <stop offset="100%" stopColor="rgba(132,204,22,0)" />
          </radialGradient>
        </defs>

        {/* Ambient core glow */}
        <circle cx={CX} cy={CY} r="100" fill="url(#coreGlow)" />

        {/* Orbital rings */}
        {[60, R_INNER, 120, R_OUTER, 180].map((r, i) => (
          <motion.circle
            key={r}
            cx={CX} cy={CY} r={r}
            stroke="rgba(241,238,234,0.04)"
            strokeWidth={i === 1 || i === 3 ? 1 : 0.5}
            strokeDasharray={i % 2 === 0 ? '3 6' : 'none'}
            fill="none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.08 }}
          />
        ))}

        {/* Connection lines from nodes → centre */}
        {DIAGRAM_NODES.map((node) => {
          const r = node.ring === 1 ? R_INNER : R_OUTER;
          const pos = polarToXY(node.angle, r, CX, CY);
          return (
            <motion.line
              key={node.id + '-line'}
              x1={CX} y1={CY}
              x2={pos.x} y2={pos.y}
              stroke="rgba(132,204,22,0.12)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={ready ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: node.delay, ease: 'easeOut' }}
            />
          );
        })}

        {/* Animated data-pulse dots travelling along lines */}
        {DIAGRAM_NODES.filter((_, i) => i % 2 === 0).map((node) => {
          const r = node.ring === 1 ? R_INNER : R_OUTER;
          const pos = polarToXY(node.angle, r, CX, CY);
          return (
            <motion.circle
              key={node.id + '-pulse'}
              r="2"
              fill="#84CC16"
              opacity={0.6}
              initial={{ cx: CX, cy: CY }}
              animate={ready ? {
                cx: [CX, pos.x, CX],
                cy: [CY, pos.y, CY],
              } : {}}
              transition={{
                duration: 4,
                delay: node.delay + 1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </svg>

      {/* Centre "AI Core" node */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ scale: 0, opacity: 0 }}
        animate={ready ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.1, type: 'spring', stiffness: 160, damping: 16 }}
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 100,
            height: 100,
            background: 'radial-gradient(circle, rgba(15,61,62,1) 0%, rgba(10,33,31,1) 100%)',
            boxShadow:
              '0 0 80px 20px rgba(132,204,22,0.08), 0 0 0 1px rgba(132,204,22,0.3), inset 0 0 30px rgba(132,204,22,0.06)',
          }}
        >
          <div className="text-center">
            <span
              className="block text-[#84CC16] uppercase tracking-[0.2em]"
              style={{ fontSize: '0.5rem', fontWeight: 600 }}
            >
              AMO AI
            </span>
            <span
              className="block text-[#F1EEEA] uppercase tracking-wider mt-0.5"
              style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em' }}
            >
              AI Core
            </span>
          </div>
        </div>
      </motion.div>

      {/* Pulsing rings from centre */}
      {[0, 1.2, 2.4].map((d) => (
        <motion.div
          key={d}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: 100, height: 100, border: '1px solid rgba(132,204,22,0.12)' }}
          animate={ready ? { scale: [1, 2.8], opacity: [0.35, 0] } : {}}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut', delay: d + 0.5 }}
        />
      ))}

      {/* Satellite nodes */}
      {DIAGRAM_NODES.map((node) => {
        const r = node.ring === 1 ? R_INNER : R_OUTER;
        const pos = polarToXY(node.angle, r, CX, CY);
        // Convert SVG coords (0-400) to % (0-100)
        const leftPct = (pos.x / 400) * 100;
        const topPct = (pos.y / 400) * 100;

        return (
          <motion.div
            key={node.id}
            className="absolute z-10"
            style={{
              left: `${leftPct}%`,
              top: `${topPct}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={ready ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: node.delay, type: 'spring', stiffness: 200, damping: 20 }}
          >
            <motion.div
              className="px-3 py-2 rounded-lg text-center cursor-default"
              style={{
                background: node.ring === 1
                  ? 'rgba(132,204,22,0.06)'
                  : 'rgba(241,238,234,0.04)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: node.ring === 1
                  ? '1px solid rgba(132,204,22,0.15)'
                  : '1px solid rgba(241,238,234,0.08)',
                boxShadow: '0 4px 24px -6px rgba(0,0,0,0.35)',
              }}
              whileHover={{
                scale: 1.1,
                borderColor: 'rgba(132,204,22,0.35)',
                boxShadow: '0 6px 32px -4px rgba(132,204,22,0.18)',
              }}
              transition={{ duration: 0.2 }}
            >
              <span
                className="block text-[#84CC16]/60 mb-0.5"
                style={{ fontSize: '0.6rem' }}
              >
                {node.icon}
              </span>
              <span
                className="text-[#F1EEEA]/85 whitespace-nowrap"
                style={{ fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.02em' }}
              >
                {node.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Metric Mini-Cards
   ═══════════════════════════════════════════════════════════ */

function MetricCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      className="flex-1 rounded-2xl px-5 py-5"
      style={{
        background: 'rgba(241,238,234,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(241,238,234,0.07)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
    >
      <span
        className="block text-[#84CC16]"
        style={{ fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.1 }}
      >
        {value}
      </span>
      <span
        className="block text-[#F1EEEA]/40 mt-1.5"
        style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Hero Section
   ═══════════════════════════════════════════════════════════ */

export default function SolutionsHero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center" style={{ backgroundColor: '#1A1A1A' }}>
      {/* ── Background Layers ── */}

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(241,238,234,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(241,238,234,0.03) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Diagonal accent gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(15,61,62,0.4) 0%, transparent 40%, rgba(132,204,22,0.03) 80%, transparent 100%)',
        }}
      />

      {/* Top-right glow */}
      <div
        className="absolute -top-40 -right-40 w-[900px] h-[900px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(132,204,22,0.05) 0%, transparent 55%)',
        }}
      />

      {/* Bottom-left subtle glow */}
      <div
        className="absolute -bottom-60 -left-40 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(15,61,62,0.3) 0%, transparent 60%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 py-28 sm:py-36 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-8 items-center">

          {/* ── LEFT: Text ── */}
          <div className="max-w-xl">
            {/* Tagline pill */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
              style={{
                background: 'rgba(132,204,22,0.08)',
                border: '1px solid rgba(132,204,22,0.15)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#84CC16]"
                style={{ boxShadow: '0 0 6px 1px rgba(132,204,22,0.4)' }}
              />
              <span
                className="text-[#84CC16]/80 uppercase tracking-[0.22em]"
                style={{ fontSize: '0.65rem', fontWeight: 600 }}
              >
                AI Business Operating System
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="tracking-tight mb-7"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
                fontWeight: 400,
                lineHeight: 1.08,
                color: '#F5F5F0',
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Turn Your Business
              <br />
              Into an{' '}
              <span className="relative inline-block">
                <span style={{ color: '#00875A' }}>
                  AI&nbsp;Operating
                </span>
                {/* Underline accent */}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-[#84CC16]/30 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                />
              </span>
              <br />
              System
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="text-[#F1EEEA]/40 max-w-[420px] mb-10"
              style={{ fontSize: '1.05rem', lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              We design intelligent AI systems that automate sales, operations,
              and customer experience — tailored to your industry and built to
              scale.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <Link
                to="/wizard"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 transition-all duration-300"
                style={{
                  backgroundColor: '#00875A',
                  color: '#FFFFFF',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                }}
              >
                Start AI Assessment
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/process"
                className="inline-flex items-center gap-2 px-6 py-3.5 transition-all duration-300"
                style={{
                  fontSize: '0.85rem',
                  border: '1px solid rgba(245,245,240,0.15)',
                  color: 'rgba(245,245,240,0.6)',
                  borderRadius: '4px',
                }}
              >
                View How It Works
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              className="flex items-center gap-6 mt-14 pt-8"
              style={{ borderTop: '1px solid rgba(241,238,234,0.06)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {[
                { val: '50+', lbl: 'AI Systems Deployed' },
                { val: '12', lbl: 'Industries Served' },
                { val: '4–6 wk', lbl: 'Avg. Delivery' },
              ].map((stat) => (
                <div key={stat.lbl} className="text-center">
                  <span
                    className="block text-[#F1EEEA]/70"
                    style={{ fontSize: '0.95rem', fontWeight: 600 }}
                  >
                    {stat.val}
                  </span>
                  <span
                    className="block text-[#F1EEEA]/25 mt-0.5"
                    style={{ fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}
                  >
                    {stat.lbl}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: AI Architecture Diagram ── */}
          <div className="flex flex-col items-center gap-8 lg:pl-4">
            <AIDiagram />

            {/* Metric cards */}
            <div className="flex gap-4 w-full max-w-[380px]">
              <MetricCard value="98%" label="Client Satisfaction" delay={0.9} />
              <MetricCard value="3.2×" label="Average ROI" delay={1.0} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #1A1A1A)',
        }}
      />
    </section>
  );
}