import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Users,
  UserPlus,
  GitBranch,
  BarChart3,
  Bot,
  Zap,
  CircuitBoard,
  Activity,
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

/* ═══════════════════════════════════════════════════════════════
   C13 — AI Agent Systems — Enterprise Dashboard Showcase
   ═══════════════════════════════════════════════════════════════
   
   BCG design system dark variant: charcoal #1A1A1A background,
   BCG green #00875A accents, Georgia serif headlines.
   Enterprise AI platform interface visualizing autonomous AI
   agents managing business workflows.
   
   ═══════════════════════════════════════════════════════════════ */

const HERO_IMG =
  'https://images.unsplash.com/photo-1639094313488-fdce76185229?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGRhc2hib2FyZCUyMGhvbG9ncmFwaGljJTIwaW50ZXJmYWNlJTIwZGFya3xlbnwxfHx8fDE3NzI3MTM2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

/* ── Dashboard module data ── */
const modules = [
  {
    id: 'leads',
    title: 'Lead Qualification',
    icon: Users,
    stats: [
      { label: 'Qualified', value: '847', trend: '+12%' },
      { label: 'Conversion', value: '34%', trend: '+5%' },
    ],
    bars: [85, 65, 92, 78, 88, 70, 95],
    accent: '#00875A',
    position: 'top-left' as const,
  },
  {
    id: 'onboarding',
    title: 'Customer Onboarding',
    icon: UserPlus,
    stats: [
      { label: 'Active', value: '213', trend: '+8%' },
      { label: 'Completion', value: '96%', trend: '+2%' },
    ],
    steps: ['Verify', 'KYC', 'Setup', 'Launch'],
    stepActive: 2,
    accent: '#60A5FA',
    position: 'top-right' as const,
  },
  {
    id: 'pipeline',
    title: 'Automation Pipeline',
    icon: GitBranch,
    stats: [
      { label: 'Running', value: '42', trend: 'live' },
      { label: 'Success', value: '99.7%', trend: '' },
    ],
    nodes: ['Ingest', 'Process', 'Enrich', 'Route', 'Execute'],
    accent: '#A78BFA',
    position: 'bottom-left' as const,
  },
  {
    id: 'analytics',
    title: 'Analytics & Insights',
    icon: BarChart3,
    stats: [
      { label: 'ROI', value: '312%', trend: '+24%' },
      { label: 'Saved', value: '$2.4M', trend: 'YTD' },
    ],
    chartData: [20, 35, 28, 50, 42, 68, 55, 72, 65, 85, 78, 92],
    accent: '#34D399',
    position: 'bottom-right' as const,
  },
];

/* ── Floating data stream particles ── */
const dataStreams = [
  { from: { x: 15, y: 30 }, to: { x: 85, y: 30 }, delay: 0 },
  { from: { x: 85, y: 30 }, to: { x: 85, y: 70 }, delay: 1.2 },
  { from: { x: 85, y: 70 }, to: { x: 15, y: 70 }, delay: 2.4 },
  { from: { x: 15, y: 70 }, to: { x: 15, y: 30 }, delay: 3.6 },
  { from: { x: 50, y: 20 }, to: { x: 50, y: 80 }, delay: 0.8 },
  { from: { x: 20, y: 50 }, to: { x: 80, y: 50 }, delay: 2.0 },
];

export default function AIAgentSystemsSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #080F0C 0%, #0A1A14 30%, #0C1F18 60%, #080F0C 100%)',
        paddingTop: '120px',
        paddingBottom: '120px',
      }}
    >
      {/* ── Cinematic ambient glow layers ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Emerald glow - top right */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            top: '-10%',
            right: '10%',
            background: 'radial-gradient(circle, rgba(0, 135, 90, 0.08) 0%, transparent 65%)',
            filter: 'blur(100px)',
          }}
        />
        {/* Blue glow - bottom left */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            bottom: '-5%',
            left: '5%',
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.07) 0%, transparent 65%)',
            filter: 'blur(100px)',
          }}
        />
        {/* Center emerald glow */}
        <div
          className="absolute w-[800px] h-[400px] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(ellipse, rgba(0, 135, 90, 0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 135, 90, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 135, 90, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 mb-7 px-5 py-2 rounded-full"
            style={{
              background: 'rgba(0, 135, 90, 0.06)',
              border: '1px solid rgba(0, 135, 90, 0.1)',
            }}
          >
            <Bot size={14} style={{ color: '#00875A' }} />
            <span
              className="text-xs tracking-[0.18em] uppercase"
              style={{ color: '#00875A', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
            >
              AI Agent Systems
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: '#F5F5F0',
              letterSpacing: '-0.01em',
            }}
          >
            Autonomous AI agents{' '}
            <span style={{ color: '#00875A' }}>managing</span>
            <br className="hidden sm:block" /> your business workflows
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl mx-auto mb-10"
            style={{
              color: 'rgba(245, 245, 240, 0.55)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            Example interface showing how AI agents could qualify leads,
            support onboarding, automate workflows, and summarize information.
          </motion.p>
        </div>

        <p role="note" className="max-w-xl mx-auto mb-6 text-center text-sm" style={{ color: 'rgba(245, 245, 240, 0.75)' }}>
          Illustrative AI dashboard — sample values only, not live client data or verified business results.
        </p>

        {/* ── Holographic Dashboard Visualization ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto"
          style={{ maxWidth: '1100px' }}
        >
          {/* ── Laptop frame ── */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '2px',
            }}
          >
            {/* Screen bezel */}
            <div
              className="rounded-[14px] overflow-hidden relative"
              style={{
                background: 'linear-gradient(180deg, #0B1A15 0%, #0D1F19 100%)',
              }}
            >
              {/* Top bar (browser chrome) */}
              <div
                className="flex items-center gap-2 px-5 py-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FEBC2E' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28C840' }} />
                </div>
                <div
                  className="flex-1 mx-8 rounded-md px-3 py-1 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
                    illustrative agent dashboard
                  </span>
                </div>
                <div className="flex gap-1.5 opacity-30">
                  <CircuitBoard size={14} style={{ color: '#00875A' }} />
                  <Activity size={14} style={{ color: '#60A5FA' }} />
                </div>
              </div>

              {/* Dashboard content area */}
              <div className="relative p-4 sm:p-6 lg:p-8" style={{ minHeight: '420px' }}>
                {/* Background image layer */}
                <div className="absolute inset-0 opacity-[0.06]">
                  <ImageWithFallback
                    src={HERO_IMG}
                    alt=""
                    className="w-full h-full object-cover"
                    aria-hidden="true"
                  />
                </div>

                {/* ── Data stream connections (SVG) ── */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {dataStreams.map((stream, i) => (
                    <g key={i}>
                      {/* Path line */}
                      <line
                        x1={stream.from.x}
                        y1={stream.from.y}
                        x2={stream.to.x}
                        y2={stream.to.y}
                        stroke="rgba(126, 244, 115, 0.08)"
                        strokeWidth="0.15"
                        strokeDasharray="1 2"
                      />
                      {/* Animated particle */}
                      <motion.circle
                        r="0.4"
                        fill="#00875A"
                        style={{ filter: 'blur(0.3px)' }}
                        initial={{
                          cx: stream.from.x,
                          cy: stream.from.y,
                          opacity: 0,
                        }}
                        animate={{
                          cx: [stream.from.x, stream.to.x],
                          cy: [stream.from.y, stream.to.y],
                          opacity: [0, 0.8, 0],
                        }}
                        transition={{
                          duration: 3,
                          delay: stream.delay,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    </g>
                  ))}
                </svg>

                {/* ── 4 Dashboard Modules Grid ── */}
                <div className="relative z-[2] grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                  {modules.map((mod, i) => {
                    const ModIcon = mod.icon;
                    return (
                      <motion.div
                        key={mod.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.3 + i * 0.12,
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="dashboard-module group"
                        style={{
                          background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                          border: `1px solid rgba(255,255,255,0.06)`,
                          borderRadius: '14px',
                          padding: '20px',
                          backdropFilter: 'blur(16px)',
                          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      >
                        {/* Module header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{
                                background: `${mod.accent}12`,
                                border: `1px solid ${mod.accent}20`,
                              }}
                            >
                              <ModIcon size={15} style={{ color: mod.accent }} strokeWidth={1.5} />
                            </div>
                            <h4
                              style={{
                                color: 'rgba(255,255,255,0.85)',
                                fontFamily: 'Inter, system-ui, sans-serif',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                letterSpacing: '0.02em',
                              }}
                            >
                              {mod.title}
                            </h4>
                          </div>
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              background: mod.accent,
                              boxShadow: `0 0 8px ${mod.accent}80`,
                              animation: 'pulse 2.5s infinite',
                            }}
                          />
                        </div>

                        {/* Stats row */}
                        <div className="flex gap-4 mb-4">
                          {mod.stats.map((stat) => (
                            <div key={stat.label}>
                              <div
                                style={{
                                  color: '#FFFFFF',
                                  fontFamily: 'Inter, system-ui, sans-serif',
                                  fontSize: '1.25rem',
                                  fontWeight: 700,
                                  lineHeight: 1,
                                  letterSpacing: '-0.02em',
                                }}
                              >
                                {stat.value}
                              </div>
                              <div className="flex items-center gap-1.5 mt-1">
                                <span
                                  style={{
                                    color: 'rgba(255,255,255,0.35)',
                                    fontSize: '0.65rem',
                                    fontFamily: 'Inter, system-ui, sans-serif',
                                  }}
                                >
                                  {stat.label}
                                </span>
                                {stat.trend && (
                                  <span
                                    style={{
                                      color: stat.trend === 'live' ? '#F59E0B' : '#00875A',
                                      fontSize: '0.6rem',
                                      fontWeight: 600,
                                      fontFamily: 'Inter, system-ui, sans-serif',
                                    }}
                                  >
                                    {stat.trend}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Visual element per module type */}
                        {'bars' in mod && mod.bars && (
                          <div className="flex items-end gap-1 h-10">
                            {mod.bars.map((h, j) => (
                              <motion.div
                                key={j}
                                className="flex-1 rounded-sm"
                                style={{
                                  background: `linear-gradient(180deg, ${mod.accent} 0%, ${mod.accent}40 100%)`,
                                  opacity: 0.7,
                                }}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${h}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + j * 0.06, duration: 0.6, ease: 'easeOut' }}
                              />
                            ))}
                          </div>
                        )}

                        {'steps' in mod && mod.steps && (
                          <div className="flex items-center gap-1">
                            {mod.steps.map((step, j) => (
                              <div key={step} className="flex items-center gap-1 flex-1">
                                <div
                                  className="rounded-md px-2 py-1.5 text-center flex-1"
                                  style={{
                                    background: j <= (mod.stepActive ?? 0)
                                      ? `${mod.accent}20`
                                      : 'rgba(255,255,255,0.03)',
                                    border: j <= (mod.stepActive ?? 0)
                                      ? `1px solid ${mod.accent}30`
                                      : '1px solid rgba(255,255,255,0.04)',
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: '0.55rem',
                                      fontWeight: 600,
                                      color: j <= (mod.stepActive ?? 0)
                                        ? mod.accent
                                        : 'rgba(255,255,255,0.25)',
                                      fontFamily: 'Inter, system-ui, sans-serif',
                                    }}
                                  >
                                    {step}
                                  </span>
                                </div>
                                {j < mod.steps.length - 1 && (
                                  <Zap
                                    size={8}
                                    style={{
                                      color: j < (mod.stepActive ?? 0)
                                        ? mod.accent
                                        : 'rgba(255,255,255,0.1)',
                                      flexShrink: 0,
                                    }}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {'nodes' in mod && mod.nodes && (
                          <div className="flex items-center gap-0.5">
                            {mod.nodes.map((node, j) => (
                              <div key={node} className="flex items-center gap-0.5 flex-1">
                                <motion.div
                                  className="rounded-full px-2 py-1 text-center flex-1"
                                  style={{
                                    background: `${mod.accent}15`,
                                    border: `1px solid ${mod.accent}20`,
                                  }}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.6 + j * 0.08, duration: 0.4 }}
                                >
                                  <span
                                    style={{
                                      fontSize: '0.5rem',
                                      fontWeight: 600,
                                      color: mod.accent,
                                      fontFamily: 'Inter, system-ui, sans-serif',
                                    }}
                                  >
                                    {node}
                                  </span>
                                </motion.div>
                                {j < mod.nodes.length - 1 && (
                                  <div
                                    className="w-2 h-px shrink-0"
                                    style={{ background: `${mod.accent}30` }}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {'chartData' in mod && mod.chartData && (
                          <div className="h-10 flex items-end">
                            <svg
                              viewBox={`0 0 ${mod.chartData.length * 10} 100`}
                              className="w-full h-full"
                              preserveAspectRatio="none"
                            >
                              {/* Area fill */}
                              <motion.path
                                d={`M0,100 ${mod.chartData.map((v, j) => `L${j * 10 + 5},${100 - v}`).join(' ')} L${(mod.chartData.length - 1) * 10 + 5},100 Z`}
                                fill={`${mod.accent}15`}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                              />
                              {/* Line */}
                              <motion.path
                                d={`M${5},${100 - mod.chartData[0]} ${mod.chartData.map((v, j) => `L${j * 10 + 5},${100 - v}`).join(' ')}`}
                                fill="none"
                                stroke={mod.accent}
                                strokeWidth="1.5"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
                              />
                            </svg>
                          </div>
                        )}

                        {/* Hover border glow */}
                        <div
                          className="absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            boxShadow: `inset 0 0 0 1px ${mod.accent}25, 0 0 30px ${mod.accent}08`,
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </div>

                {/* Central AI agent indicator */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] hidden lg:flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(126, 244, 115, 0.15), rgba(96, 165, 250, 0.1))',
                      border: '1px solid rgba(0, 135, 90, 0.2)',
                      boxShadow: '0 0 40px rgba(0, 135, 90, 0.15), 0 0 80px rgba(96, 165, 250, 0.08)',
                    }}
                  >
                    <Bot size={22} style={{ color: '#00875A' }} strokeWidth={1.5} />
                  </div>
                  {/* Pulse ring */}
                  <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{
                      border: '1px solid rgba(126, 244, 115, 0.15)',
                      animationDuration: '3s',
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Laptop base / reflection */}
          <div
            className="mx-auto h-4 rounded-b-xl"
            style={{
              width: '60%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
              borderLeft: '1px solid rgba(255,255,255,0.05)',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          />
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-14 lg:mt-16"
        >
          <Link
            to="/agents"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 transition-all duration-300"
            style={{
              backgroundColor: '#00875A',
              color: '#FFFFFF',
              borderRadius: '4px',
              fontSize: '0.875rem',
            }}
          >
            Explore AI Agent Systems
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>

      {/* ── Styles ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-module {
          position: relative;
        }
        .dashboard-module:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.1) !important;
          box-shadow: 0 12px 40px rgba(0,0,0,0.3);
        }

        @media (prefers-reduced-motion: reduce) {
          .dashboard-module {
            transition: none !important;
          }
        }
      `}} />
    </section>
  );
}