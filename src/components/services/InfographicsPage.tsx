import { Link } from 'react-router';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import {
  ArrowRight, BarChart3, TrendingUp, X, Check, Sparkles,
  Search, Palette, Package, Activity, Database, MessageSquare,
  Settings, Users, Zap, Bot, Phone, Target, Calendar, Star,
  Clock, Eye, ChevronRight, Megaphone, PieChart, Shield,
  Play, MousePointer, Image, Film, Globe, Monitor, Layers,
  Wand2, FileText, Video, BarChart, Workflow, MousePointerClick,
  Lightbulb, Ruler, PenTool, Send,
} from 'lucide-react';

// ─── Utilities ───────────────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = Math.max(1, Math.ceil(target / 80));
    const t = setInterval(() => { v += step; if (v >= target) { setCount(target); clearInterval(t); } else setCount(v); }, 18);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Fade({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: 'easeOut', delay }} className={className}>
      {children}
    </motion.div>
  );
}

const SectionTag = ({ n, sub }: { n: string; sub?: string }) => (
  <div className="text-center mb-4">
    <span className="text-[10px] tracking-[.25em] uppercase font-semibold px-3 py-1 rounded-full" style={{ color: '#2ECC71', background: 'rgba(46,204,113,.06)', border: '1px solid rgba(46,204,113,.1)' }}>
      {n}{sub ? ` · ${sub}` : ''}
    </span>
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-['Playfair_Display'] text-3xl md:text-[2.6rem] lg:text-5xl text-center leading-tight" style={{ color: '#1A1A1A' }}>{children}</h2>
);

const SectionSub = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-[15px] max-w-lg mx-auto mt-4 mb-20" style={{ color: '#777' }}>{children}</p>
);

// ═════════════════════════════════════════════════════════════
// 1 · HERO
// ═════════════════════════════════════════════════════════════
function Hero() {
  const bars = [28, 42, 35, 58, 48, 72, 65, 88, 78, 95];
  return (
    <section className="relative pt-[140px] pb-24 md:pt-[170px] md:pb-[120px] px-6 md:px-16 overflow-hidden" style={{ background: '#0F2A26' }}>
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle,#2ECC71,transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2ECC71' }} />
            <span className="text-[11px] tracking-[.22em] uppercase font-medium" style={{ color: '#2ECC71' }}>Visual Intelligence Studio</span>
          </div>
          <h1 className="font-['Playfair_Display'] text-[2.5rem] md:text-[3.2rem] lg:text-[3.8rem] leading-[1.08] text-white mb-6">
            AI, Explained<br /><em className="not-italic" style={{ color: '#2ECC71' }}>Visually</em>
          </h1>
          <p className="text-lg leading-relaxed max-w-xl mb-10" style={{ color: 'rgba(255,255,255,.65)' }}>
            Infographics, system diagrams, and motion visuals that turn complex AI into clear business decisions.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#samples" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:shadow-lg transition-all" style={{ background: '#2ECC71', color: '#0F2A26' }}>
              View Infographics <ArrowRight className="w-4 h-4" />
            </a>
            <Link to="/ai-readiness" className="px-7 py-3.5 rounded-full text-sm font-medium border border-white/20 text-white hover:bg-white/8 transition-colors">
              Run AI Diagnostic
            </Link>
          </div>
        </motion.div>

        {/* Hero visual composition */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="hidden lg:block">
          <div className="rounded-2xl border border-white/[.08] bg-white/[0.03] p-5 space-y-3.5 backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-2.5">
              {[{ l: 'Leads', v: '4,218', c: '+24%' }, { l: 'Conversion', v: '38%', c: '+12%' }, { l: 'Revenue', v: '$142K', c: '+31%' }].map(d => (
                <div key={d.l} className="rounded-lg border border-white/[.06] bg-white/[0.02] p-3.5">
                  <span className="text-[9px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,.28)' }}>{d.l}</span>
                  <div className="text-white text-lg font-semibold mt-0.5">{d.v}</div>
                  <span className="text-[11px]" style={{ color: '#2ECC71' }}>{d.c}</span>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-white/[.06] bg-white/[0.02] p-4">
              <div className="flex items-end gap-[5px] h-16">
                {bars.map((h, i) => (
                  <motion.div key={i} className="flex-1 rounded-t" style={{ background: 'rgba(46,204,113,.45)' }} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.5, delay: 0.5 + i * 0.04 }} />
                ))}
              </div>
            </div>
            {/* Mini node map */}
            <div className="rounded-lg border border-white/[.06] bg-white/[0.02] p-4">
              <svg width="100%" height="52" viewBox="0 0 380 52" fill="none">
                <line x1="60" y1="26" x2="140" y2="26" stroke="#2ECC71" strokeWidth="1" opacity=".3" />
                <line x1="160" y1="26" x2="220" y2="26" stroke="#2ECC71" strokeWidth="1" opacity=".3" />
                <line x1="240" y1="26" x2="320" y2="26" stroke="#2ECC71" strokeWidth="1" opacity=".3" />
                {[50, 150, 230, 330].map((cx, i) => (
                  <g key={i}>
                    <circle cx={cx} cy="26" r="16" stroke="#2ECC71" strokeWidth="1" opacity=".25" fill="none" />
                    <circle cx={cx} cy="26" r="4" fill="#2ECC71" opacity=".5" />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// 2 · SAMPLE 1 — How AI Transforms a Business
// ═════════════════════════════════════════════════════════════
function Sample1() {
  const steps = [
    { icon: Eye, label: 'Traffic', metric: '100K' },
    { icon: Users, label: 'Leads', metric: '12K' },
    { icon: Target, label: 'Qualify', metric: '4.2K' },
    { icon: TrendingUp, label: 'Convert', metric: '1.8K' },
    { icon: Shield, label: 'Retain', metric: '92%' },
  ];

  return (
    <section id="samples" className="py-28 lg:py-36 px-6 md:px-16" style={{ background: '#F7F4EE' }}>
      <div className="max-w-7xl mx-auto">
        <Fade><SectionTag n="Sample 01" sub="Process Flow" /></Fade>
        <Fade><SectionTitle>How AI Transforms a Business</SectionTitle></Fade>
        <Fade><SectionSub>The full funnel — from first impression to long-term customer.</SectionSub></Fade>

        {/* Flow diagram */}
        <Fade delay={0.08}>
          <div className="relative overflow-x-auto pb-4">
            <div className="hidden md:block absolute top-[42px] left-[10%] right-[10%] h-[2px]" style={{ background: 'linear-gradient(90deg,#2ECC71,rgba(46,204,113,.12))' }} />
            <div className="flex items-start justify-between min-w-[640px] md:min-w-0">
              {steps.map((s, i) => (
                <div key={s.label} className="flex items-start">
                  <div className="flex flex-col items-center w-[110px]">
                    <div className="relative z-10 w-[84px] h-[84px] rounded-full bg-white flex items-center justify-center" style={{ boxShadow: '0 2px 10px rgba(0,0,0,.05)', border: '2px solid #e8e4dc' }}>
                      <s.icon className="w-6 h-6" style={{ color: '#1A1A1A' }} strokeWidth={1.5} />
                    </div>
                    <span className="text-[13px] font-semibold mt-3" style={{ color: '#1A1A1A' }}>{s.label}</span>
                    <span className="text-[11px]" style={{ color: '#2ECC71' }}>{s.metric}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <svg width="36" height="84" viewBox="0 0 36 84" fill="none" className="shrink-0 hidden md:block">
                      <path d="M6 42H28M28 42L22 36M28 42L22 48" stroke="#2ECC71" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Fade>

        {/* Before / After */}
        <Fade delay={0.14}>
          <div className="grid md:grid-cols-2 mt-14 rounded-2xl overflow-hidden" style={{ border: '1px solid #e0ddd5' }}>
            <div className="p-8 md:p-12" style={{ background: '#F3F0EA' }}>
              <div className="flex items-center gap-2 mb-7"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><span className="text-[10px] tracking-[.18em] uppercase font-bold" style={{ color: '#c0392b' }}>Before AI</span></div>
              {['Manual lead handling', '4+ hour response time', 'Leads fall through cracks', 'No pipeline visibility'].map(t => (
                <div key={t} className="flex items-start gap-2.5 mb-3"><X className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: '#e74c3c' }} strokeWidth={2.5} /><span className="text-[14px]" style={{ color: '#666' }}>{t}</span></div>
              ))}
              <svg className="w-full h-12 mt-5" viewBox="0 0 300 48" fill="none"><path d="M8 24Q40 4 80 36Q120 56 160 16Q200 -4 240 40Q270 52 292 18" stroke="#e74c3c" strokeWidth="1.5" fill="none" opacity=".25" /><path d="M8 38Q60 12 110 44Q160 20 210 8Q250 36 292 28" stroke="#e74c3c" strokeWidth="1" fill="none" strokeDasharray="4 3" opacity=".15" /></svg>
            </div>
            <div className="p-8 md:p-12 bg-white">
              <div className="flex items-center gap-2 mb-7"><div className="w-2.5 h-2.5 rounded-full" style={{ background: '#2ECC71' }} /><span className="text-[10px] tracking-[.18em] uppercase font-bold" style={{ color: '#2ECC71' }}>After AI</span></div>
              {['End-to-end automation', 'Instant AI responses', 'Smart lead scoring', 'Full-funnel analytics'].map(t => (
                <div key={t} className="flex items-start gap-2.5 mb-3"><Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: '#2ECC71' }} strokeWidth={2.5} /><span className="text-[14px] font-medium" style={{ color: '#1A1A1A' }}>{t}</span></div>
              ))}
              <svg className="w-full h-12 mt-5" viewBox="0 0 300 48" fill="none"><line x1="8" y1="12" x2="292" y2="12" stroke="#2ECC71" strokeWidth="1.5" /><line x1="8" y1="24" x2="292" y2="24" stroke="#2ECC71" strokeWidth="1.5" opacity=".4" /><line x1="8" y1="36" x2="292" y2="36" stroke="#2ECC71" strokeWidth="1.5" opacity=".18" />{[56, 128, 200, 272].map(cx => <circle key={cx} cx={cx} cy="12" r="4" fill="#2ECC71" />)}</svg>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// 3 · SAMPLE 2 — AI System Map (radial SVG diagram)
// ═════════════════════════════════════════════════════════════
function Sample2() {
  const nodes = [
    { icon: Target, label: 'Lead Gen', angle: -60 },
    { icon: Database, label: 'CRM', angle: 0 },
    { icon: Megaphone, label: 'Marketing', angle: 60 },
    { icon: MessageSquare, label: 'Support', angle: 120 },
    { icon: BarChart3, label: 'Analytics', angle: 180 },
    { icon: Settings, label: 'Operations', angle: 240 },
  ];
  const R = 155, CX = 210, CY = 210;
  const pos = nodes.map(n => ({ ...n, x: CX + R * Math.cos((n.angle * Math.PI) / 180), y: CY + R * Math.sin((n.angle * Math.PI) / 180) }));

  return (
    <section className="py-28 lg:py-36 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <Fade><SectionTag n="Sample 02" sub="System Architecture" /></Fade>
        <Fade><SectionTitle>Inside an AI Operating System</SectionTitle></Fade>
        <Fade><SectionSub>Not one tool — a connected intelligence layer.</SectionSub></Fade>

        <Fade delay={0.1}>
          <div className="flex justify-center">
            {/* Desktop SVG diagram */}
            <div className="hidden md:block relative" style={{ width: 420, height: 420 }}>
              <svg width="420" height="420" viewBox="0 0 420 420" fill="none" className="absolute inset-0">
                <circle cx={CX} cy={CY} r={R} stroke="#2ECC71" strokeWidth="1" strokeDasharray="3 5" opacity=".12" fill="none" />
                <circle cx={CX} cy={CY} r={R - 40} stroke="#2ECC71" strokeWidth="1" strokeDasharray="2 6" opacity=".06" fill="none" />
                {pos.map(n => <line key={n.label} x1={CX} y1={CY} x2={n.x} y2={n.y} stroke="#2ECC71" strokeWidth="1.5" strokeDasharray="5 4" opacity=".3" />)}
                {pos.map(n => <circle key={n.label + 'd'} cx={n.x} cy={n.y} r="5" fill="#2ECC71" opacity=".15" />)}
              </svg>
              <div className="absolute rounded-full flex items-center justify-center" style={{ width: 96, height: 96, top: CY - 48, left: CX - 48, background: '#0F2A26', boxShadow: '0 4px 28px rgba(15,42,38,.35)' }}>
                <div className="text-center"><Bot className="w-6 h-6 mx-auto mb-0.5" style={{ color: '#2ECC71' }} /><span className="text-[8px] font-bold tracking-[.15em] text-white">AI CORE</span></div>
              </div>
              {pos.map(n => (
                <div key={n.label} className="absolute flex flex-col items-center" style={{ left: n.x - 36, top: n.y - 36, width: 72 }}>
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center" style={{ border: '1.5px solid #e0ddd5', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
                    <n.icon className="w-5 h-5" style={{ color: '#1A1A1A' }} strokeWidth={1.5} />
                  </div>
                  <span className="text-[11px] font-medium mt-1.5 whitespace-nowrap" style={{ color: '#1A1A1A' }}>{n.label}</span>
                </div>
              ))}
              <span className="absolute text-[8px] tracking-[.15em] uppercase" style={{ color: '#2ECC71', opacity: .6, top: CY - 82, left: CX + 16 }}>data flow</span>
              <span className="absolute text-[8px] tracking-[.15em] uppercase" style={{ color: '#2ECC71', opacity: .6, top: CY + 66, left: CX - 60 }}>automation</span>
              <span className="absolute text-[8px] tracking-[.15em] uppercase" style={{ color: '#2ECC71', opacity: .6, top: CY - 14, left: CX - 114 }}>decisions</span>
            </div>

            {/* Mobile grid */}
            <div className="md:hidden w-full">
              <div className="flex justify-center mb-4"><div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#0F2A26' }}><Bot className="w-5 h-5" style={{ color: '#2ECC71' }} /></div></div>
              <svg width="2" height="20" className="mx-auto"><line x1="1" y1="0" x2="1" y2="20" stroke="#2ECC71" strokeWidth="1.5" strokeDasharray="3 3" /></svg>
              <div className="grid grid-cols-2 gap-2.5 mt-3">
                {nodes.map(n => (
                  <div key={n.label} className="rounded-xl bg-white p-3 flex items-center gap-2.5" style={{ border: '1px solid #e0ddd5' }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(46,204,113,.05)' }}><n.icon className="w-4 h-4" style={{ color: '#1A1A1A' }} strokeWidth={1.5} /></div>
                    <span className="text-[13px] font-medium" style={{ color: '#1A1A1A' }}>{n.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// 4 · SAMPLE 3 — Data + ROI report
// ═════════════════════════════════════════════════════════════
function Sample3() {
  const bars = [{ q: 'Q1', h: 28, v: '$82K' }, { q: 'Q2', h: 48, v: '$138K' }, { q: 'Q3', h: 72, v: '$210K' }, { q: 'Q4', h: 95, v: '$284K' }];
  const funnel = [{ l: 'Total Leads', w: 100, v: '10,000' }, { l: 'Qualified', w: 65, v: '6,500' }, { l: 'Proposals', w: 40, v: '4,000' }, { l: 'Closed', w: 22, v: '2,200' }];

  return (
    <section className="py-28 lg:py-36 px-6 md:px-16" style={{ background: '#EEF2F1' }}>
      <div className="max-w-7xl mx-auto">
        <Fade><SectionTag n="Sample 03" sub="Data + ROI" /></Fade>
        <Fade><SectionTitle>What AI Actually Changes</SectionTitle></Fade>
        <Fade><SectionSub>AI is not a feature — it's a performance multiplier.</SectionSub></Fade>

        <div className="grid lg:grid-cols-12 gap-5">
          <Fade delay={0.05} className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-7 h-full" style={{ border: '1px solid #ddd' }}>
              <div className="flex items-center justify-between mb-1"><span className="text-[10px] tracking-[.15em] uppercase font-semibold" style={{ color: '#999' }}>Revenue Growth</span><TrendingUp className="w-3.5 h-3.5" style={{ color: '#ccc' }} /></div>
              <div className="h-px mb-5" style={{ background: '#eee' }} />
              <div className="flex items-end gap-4 h-44">
                {bars.map(b => (
                  <div key={b.q} className="flex-1 flex flex-col items-center">
                    <span className="text-[10px] font-semibold mb-1.5" style={{ color: '#1A1A1A' }}>{b.v}</span>
                    <motion.div className="w-full rounded-t" style={{ background: '#2ECC71' }} initial={{ height: 0 }} whileInView={{ height: `${b.h}%` }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} />
                    <span className="text-[11px] font-medium mt-2" style={{ color: '#1A1A1A' }}>{b.q}</span>
                  </div>
                ))}
              </div>
            </div>
          </Fade>

          <Fade delay={0.1} className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-7 h-full" style={{ border: '1px solid #ddd' }}>
              <div className="flex items-center justify-between mb-1"><span className="text-[10px] tracking-[.15em] uppercase font-semibold" style={{ color: '#999' }}>Conversion Funnel</span><Target className="w-3.5 h-3.5" style={{ color: '#ccc' }} /></div>
              <div className="h-px mb-5" style={{ background: '#eee' }} />
              <div className="space-y-3">
                {funnel.map((f, i) => (
                  <div key={f.l}>
                    <div className="flex justify-between mb-1"><span className="text-[11px] font-medium" style={{ color: '#1A1A1A' }}>{f.l}</span><span className="text-[11px] font-bold" style={{ color: '#2ECC71' }}>{f.v}</span></div>
                    <div className="h-7 rounded-md" style={{ background: '#F7F4EE' }}>
                      <motion.div className="h-full rounded-md" style={{ background: `rgba(46,204,113,${0.12 + i * 0.1})` }} initial={{ width: 0 }} whileInView={{ width: `${f.w}%` }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 + i * 0.06 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Fade>

          <Fade delay={0.15} className="lg:col-span-3 flex flex-col gap-3.5">
            {[
              { icon: TrendingUp, value: 293, suffix: '%', label: 'Average ROI' },
              { icon: Zap, value: 80, suffix: '%', label: 'Task Automation' },
              { icon: Clock, value: 3, suffix: 'x', label: 'Faster Response' },
              { icon: PieChart, value: 42, suffix: '%', label: 'Cost Reduction' },
            ].map(k => (
              <div key={k.label} className="bg-white rounded-xl p-4 flex items-center gap-3.5" style={{ border: '1px solid #ddd' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(46,204,113,.06)', border: '1px solid rgba(46,204,113,.12)' }}>
                  <k.icon className="w-4 h-4" style={{ color: '#2ECC71' }} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xl font-bold leading-none" style={{ color: '#1A1A1A' }}>+<Counter target={k.value} suffix={k.suffix} /></div>
                  <div className="text-[10px] mt-0.5" style={{ color: '#888' }}>{k.label}</div>
                </div>
              </div>
            ))}
          </Fade>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// 5 · SAMPLE 4 — From Idea to AI System (timeline)
// ═════════════════════════════════════════════════════════════
function Sample4() {
  const steps = [
    { n: '01', title: 'Analyze', desc: 'Audit systems & opportunities', icon: Search },
    { n: '02', title: 'Diagnose', desc: 'Map gaps & AI readiness', icon: Activity },
    { n: '03', title: 'Recommend', desc: 'Design a visual roadmap', icon: Palette },
    { n: '04', title: 'Deploy', desc: 'Launch, measure, iterate', icon: Package },
  ];

  return (
    <section className="py-28 lg:py-36 px-6 md:px-16" style={{ background: '#F7F4EE' }}>
      <div className="max-w-7xl mx-auto">
        <Fade><SectionTag n="Sample 04" sub="Process" /></Fade>
        <Fade><SectionTitle>From Idea to AI System</SectionTitle></Fade>
        <Fade><SectionSub>A structured path from confusion to clarity.</SectionSub></Fade>

        <Fade delay={0.08}>
          <div className="relative">
            <div className="hidden md:block absolute top-[48px] left-[12%] right-[12%] h-[2px]" style={{ background: 'linear-gradient(90deg,#2ECC71,rgba(46,204,113,.12))' }} />
            <div className="grid md:grid-cols-4 gap-10 md:gap-4">
              {steps.map((s, i) => (
                <motion.div key={s.n} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }} className="text-center">
                  <div className="relative z-10 mx-auto w-24 h-24 rounded-full bg-white flex items-center justify-center" style={{ border: '2px solid #e0ddd5', boxShadow: '0 2px 10px rgba(0,0,0,.04)' }}>
                    <s.icon className="w-7 h-7" style={{ color: '#1A1A1A' }} strokeWidth={1.5} />
                  </div>
                  <div className="text-[11px] font-bold tracking-wider mt-4 mb-1" style={{ color: '#2ECC71' }}>{s.n}</div>
                  <h3 className="font-['Playfair_Display'] text-lg" style={{ color: '#1A1A1A' }}>{s.title}</h3>
                  <p className="text-[13px] mt-0.5" style={{ color: '#888' }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// 6 · SAMPLE 5 — AI in Real Estate (vertical funnel)
// ═════════════════════════════════════════════════════════════
function Sample5() {
  const flow = [
    { icon: Eye, label: 'Ad Impression', sub: 'Meta / Google Ads' },
    { icon: Phone, label: 'WhatsApp Contact', sub: 'AI auto-reply < 30s' },
    { icon: Bot, label: 'Lead Qualification', sub: 'AI scores & routes' },
    { icon: Calendar, label: 'Site Visit Booked', sub: 'Auto-scheduled' },
    { icon: Star, label: 'Deal Closed', sub: 'Pipeline updated' },
  ];

  return (
    <section className="py-28 lg:py-36 px-6 md:px-16 bg-white">
      <div className="max-w-5xl mx-auto">
        <Fade><SectionTag n="Sample 05" sub="Industry" /></Fade>
        <Fade><SectionTitle>AI in Real Estate</SectionTitle></Fade>
        <Fade><SectionSub>From first message to closed deal — automated.</SectionSub></Fade>

        <Fade delay={0.08}>
          <div className="max-w-md mx-auto">
            {flow.map((s, i) => (
              <div key={s.label}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0" style={{ border: '1.5px solid #e0ddd5', boxShadow: '0 2px 6px rgba(0,0,0,.03)' }}>
                    <s.icon className="w-5 h-5" style={{ color: '#1A1A1A' }} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-semibold" style={{ color: '#1A1A1A' }}>{s.label}</div>
                    <div className="text-[12px]" style={{ color: '#888' }}>{s.sub}</div>
                  </div>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0" style={{ background: 'rgba(46,204,113,.07)', color: '#2ECC71', border: '1px solid rgba(46,204,113,.15)' }}>{i + 1}</div>
                </div>
                {i < flow.length - 1 && (
                  <div className="flex items-center ml-[26px] my-0.5">
                    <svg width="4" height="28" viewBox="0 0 4 28"><path d="M2 0V22M2 22L0 18M2 22L4 18" stroke="#2ECC71" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>
                    <span className="text-[9px] ml-2.5 italic" style={{ color: '#bbb' }}>{['auto-triggered', 'AI qualifies', 'auto-scheduled', 'CRM synced'][i]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// 7 · SAMPLE 6 — Before vs After (visual-dominant SVG split)
// ═════════════════════════════════════════════════════════════
function Sample6() {
  return (
    <section className="py-28 lg:py-36 px-6 md:px-16" style={{ background: '#EEF2F1' }}>
      <div className="max-w-7xl mx-auto">
        <Fade><SectionTag n="Sample 06" sub="Comparison" /></Fade>
        <Fade><SectionTitle>Before vs After AI</SectionTitle></Fade>
        <Fade><SectionSub>Clarity is the real advantage.</SectionSub></Fade>

        <Fade delay={0.1}>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Before */}
            <div className="rounded-2xl p-8 md:p-10 overflow-hidden" style={{ background: '#F3F0EA', border: '1px solid #e0ddd5' }}>
              <div className="flex items-center gap-2 mb-5"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><span className="text-[10px] tracking-[.18em] uppercase font-bold" style={{ color: '#c0392b' }}>Before</span></div>
              <svg className="w-full" viewBox="0 0 280 200" fill="none">
                {/* Scattered boxes */}
                <rect x="8" y="15" width="55" height="28" rx="5" stroke="#e74c3c" strokeWidth="1" opacity=".35" fill="rgba(231,76,60,.03)" />
                <rect x="110" y="4" width="48" height="24" rx="5" stroke="#e74c3c" strokeWidth="1" opacity=".3" fill="rgba(231,76,60,.03)" />
                <rect x="200" y="30" width="60" height="26" rx="5" stroke="#e74c3c" strokeWidth="1" opacity=".4" fill="rgba(231,76,60,.03)" />
                <rect x="25" y="90" width="45" height="24" rx="5" stroke="#e74c3c" strokeWidth="1" opacity=".25" fill="rgba(231,76,60,.03)" />
                <rect x="130" y="70" width="52" height="28" rx="5" stroke="#e74c3c" strokeWidth="1" opacity=".35" fill="rgba(231,76,60,.03)" />
                <rect x="220" y="95" width="42" height="22" rx="5" stroke="#e74c3c" strokeWidth="1" opacity=".3" fill="rgba(231,76,60,.03)" />
                <rect x="50" y="155" width="50" height="26" rx="5" stroke="#e74c3c" strokeWidth="1" opacity=".28" fill="rgba(231,76,60,.03)" />
                <rect x="170" y="150" width="56" height="24" rx="5" stroke="#e74c3c" strokeWidth="1" opacity=".35" fill="rgba(231,76,60,.03)" />
                {/* Messy connections */}
                <path d="M63 29Q90 70 130 84" stroke="#e74c3c" strokeWidth="1" opacity=".15" strokeDasharray="3 3" />
                <path d="M158 16Q190 55 200 43" stroke="#e74c3c" strokeWidth="1" opacity=".15" strokeDasharray="3 3" />
                <path d="M70 102Q110 84 130 84" stroke="#e74c3c" strokeWidth="1" opacity=".12" strokeDasharray="3 3" />
                <path d="M182 98Q210 130 198 162" stroke="#e74c3c" strokeWidth="1" opacity=".15" strokeDasharray="3 3" />
                <text x="98" y="56" fill="#e74c3c" fontSize="10" opacity=".4">✕</text>
                <text x="195" y="75" fill="#e74c3c" fontSize="10" opacity=".4">✕</text>
                <text x="140" y="135" fill="#e74c3c" fontSize="10" opacity=".4">✕</text>
              </svg>
              <p className="text-[11px] text-center mt-3 italic" style={{ color: '#bbb' }}>Disconnected · Scattered · No visibility</p>
            </div>

            {/* After */}
            <div className="rounded-2xl p-8 md:p-10 bg-white overflow-hidden" style={{ border: '1px solid #ddd' }}>
              <div className="flex items-center gap-2 mb-5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: '#2ECC71' }} /><span className="text-[10px] tracking-[.18em] uppercase font-bold" style={{ color: '#2ECC71' }}>After</span></div>
              <svg className="w-full" viewBox="0 0 280 200" fill="none">
                {/* Aligned 3×3 grid */}
                {[0, 1, 2].map(r => [0, 1, 2].map(c => (
                  <rect key={`${r}${c}`} x={14 + c * 92} y={12 + r * 68} width="72" height="32" rx="7" stroke="#2ECC71" strokeWidth="1.5" fill="rgba(46,204,113,.03)" />
                )))}
                {/* Vertical connectors */}
                {[0, 1, 2].map(c => [0, 1].map(r => (
                  <line key={`v${c}${r}`} x1={50 + c * 92} y1={44 + r * 68} x2={50 + c * 92} y2={80 + r * 68} stroke="#2ECC71" strokeWidth="1.5" opacity=".3" />
                )))}
                {/* Horizontal connectors */}
                {[0, 1, 2].map(r => [0, 1].map(c => (
                  <line key={`h${r}${c}`} x1={86 + c * 92} y1={28 + r * 68} x2={106 + c * 92} y2={28 + r * 68} stroke="#2ECC71" strokeWidth="1.5" opacity=".2" />
                )))}
                {/* Check dots */}
                {[0, 1, 2].map(c => <circle key={`ck${c}`} cx={50 + c * 92} cy={60} r="4.5" fill="#2ECC71" opacity=".18" />)}
              </svg>
              <p className="text-[11px] text-center mt-3 italic" style={{ color: '#bbb' }}>Unified · Structured · Full visibility</p>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// 8 · SAMPLE 7 — Dashboard Intelligence (light)
// ═════════════════════════════════════════════════════════════
function Sample7() {
  const kpis = [{ l: 'Active Users', v: '12,847', c: '+18%', up: true }, { l: 'Revenue', v: '$284K', c: '+32%', up: true }, { l: 'Churn', v: '2.1%', c: '-0.8%', up: false }, { l: 'NPS', v: '72', c: '+5', up: true }];

  return (
    <section className="py-28 lg:py-36 px-6 md:px-16" style={{ background: '#F7F4EE' }}>
      <div className="max-w-7xl mx-auto">
        <Fade><SectionTag n="Sample 07" sub="Dashboard" /></Fade>
        <Fade><SectionTitle>AI Dashboard Intelligence</SectionTitle></Fade>
        <Fade><SectionSub>Everything measurable. Everything visible.</SectionSub></Fade>

        <Fade delay={0.1}>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #ddd', background: '#FAFAF8' }}>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white" style={{ borderBottom: '1px solid #eee' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: '#FF605C' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: '#FFBD44' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: '#00CA4E' }} />
              <span className="text-[10px] ml-2" style={{ color: '#ccc' }}>AMO AI — Dashboard</span>
            </div>
            <div className="p-5 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {kpis.map(k => (
                  <div key={k.l} className="bg-white rounded-xl p-4" style={{ border: '1px solid #eee' }}>
                    <div className="text-[9px] uppercase tracking-wider mb-1.5" style={{ color: '#999' }}>{k.l}</div>
                    <div className="text-xl font-bold" style={{ color: '#1A1A1A' }}>{k.v}</div>
                    <div className="text-[11px] font-semibold mt-0.5" style={{ color: k.up ? '#2ECC71' : '#e74c3c' }}>{k.c}</div>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="md:col-span-2 bg-white rounded-xl p-5" style={{ border: '1px solid #eee' }}>
                  <span className="text-[9px] uppercase tracking-wider" style={{ color: '#999' }}>Monthly Trend</span>
                  <div className="flex items-end gap-[4px] mt-3 h-32">
                    {[30, 45, 38, 62, 55, 78, 68, 85, 74, 92, 88, 98].map((h, i) => (
                      <motion.div key={i} className="flex-1 rounded-t" style={{ background: i === 11 ? '#2ECC71' : 'rgba(46,204,113,.22)' }} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.03 }} />
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #eee' }}>
                  <div className="flex items-center gap-1.5 mb-4"><Sparkles className="w-3.5 h-3.5" style={{ color: '#2ECC71' }} /><span className="text-[9px] uppercase tracking-wider font-semibold" style={{ color: '#1A1A1A' }}>AI Insights</span></div>
                  {['Lead quality up 40% after AI scoring', 'Response cut from 4h to 30s', 'Churn model saved $42K in Q3'].map(ins => (
                    <div key={ins} className="flex items-start gap-1.5 mb-3"><div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#2ECC71' }} /><p className="text-[12px] leading-relaxed" style={{ color: '#555' }}>{ins}</p></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// 9 · SERVICES — Visual grid
// ═════════════════════════════════════════════════════════════
function Services() {
  const categories = [
    {
      title: 'Static Infographics',
      icon: Image,
      items: [
        { icon: Workflow, label: 'AI Strategy Infographics' },
        { icon: ArrowRight, label: 'Process Flow Diagrams' },
        { icon: Layers, label: 'System Architecture Maps' },
        { icon: BarChart, label: 'ROI & KPI Visuals' },
        { icon: ArrowRight, label: 'Comparison Infographics' },
      ],
    },
    {
      title: 'Motion Graphics',
      icon: Film,
      items: [
        { icon: Play, label: 'Animated Explainers' },
        { icon: Monitor, label: 'Product Walkthroughs' },
        { icon: Zap, label: 'AI System Animations' },
        { icon: Users, label: 'Onboarding Animations' },
        { icon: Megaphone, label: 'Campaign Visuals' },
      ],
    },
    {
      title: 'Interactive Infographics',
      icon: MousePointerClick,
      items: [
        { icon: Globe, label: 'Scroll-Based Storytelling' },
        { icon: BarChart3, label: 'Interactive Dashboards' },
        { icon: Bot, label: 'Clickable System Maps' },
        { icon: FileText, label: 'Dynamic Reports' },
        { icon: Sparkles, label: 'Web Data Experiences' },
      ],
    },
    {
      title: 'Programmatic Video',
      icon: Video,
      items: [
        { icon: Wand2, label: 'Auto-Generated AI Reports' },
        { icon: Users, label: 'Personalized Client Videos' },
        { icon: Activity, label: 'AI Diagnostic Summaries' },
      ],
    },
  ];

  return (
    <section className="py-28 lg:py-36 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <Fade><SectionTag n="Services" /></Fade>
        <Fade><SectionTitle>Infographic & Visual Services</SectionTitle></Fade>
        <Fade><SectionSub>From static to cinematic — every format, every platform.</SectionSub></Fade>

        <div className="grid md:grid-cols-2 gap-5">
          {categories.map((cat, ci) => (
            <Fade key={cat.title} delay={ci * 0.06}>
              <div className="rounded-2xl p-7 md:p-8 h-full" style={{ background: '#F7F4EE', border: '1px solid #e8e4dc' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#0F2A26' }}>
                    <cat.icon className="w-4.5 h-4.5" style={{ color: '#2ECC71' }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-lg" style={{ color: '#1A1A1A' }}>{cat.title}</h3>
                </div>
                <div className="space-y-2">
                  {cat.items.map(item => (
                    <div key={item.label} className="flex items-center gap-3 bg-white rounded-lg px-4 py-3" style={{ border: '1px solid #eee' }}>
                      <item.icon className="w-4 h-4 shrink-0" style={{ color: '#2ECC71' }} strokeWidth={1.5} />
                      <span className="text-[13px] font-medium" style={{ color: '#1A1A1A' }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// 10 · STATIC IS NOT ENOUGH — evolution showcase
// ═════════════════════════════════════════════════════════════
function EvolutionSection() {
  const [active, setActive] = useState(0);
  const stages = [
    {
      label: 'Static',
      icon: Image,
      desc: 'Fixed infographic — clear but limited.',
      visual: (
        <svg viewBox="0 0 280 160" fill="none" className="w-full">
          <rect x="10" y="10" width="260" height="140" rx="12" stroke="#ddd" strokeWidth="1.5" fill="#fff" />
          <rect x="30" y="30" width="100" height="12" rx="3" fill="#1A1A1A" opacity=".15" />
          <rect x="30" y="52" width="160" height="8" rx="2" fill="#ddd" />
          <rect x="30" y="68" width="140" height="8" rx="2" fill="#ddd" />
          <rect x="30" y="90" width="60" height="50" rx="6" fill="rgba(46,204,113,.1)" stroke="rgba(46,204,113,.2)" strokeWidth="1" />
          <rect x="105" y="90" width="60" height="50" rx="6" fill="rgba(46,204,113,.1)" stroke="rgba(46,204,113,.2)" strokeWidth="1" />
          <rect x="180" y="90" width="60" height="50" rx="6" fill="rgba(46,204,113,.1)" stroke="rgba(46,204,113,.2)" strokeWidth="1" />
        </svg>
      ),
    },
    {
      label: 'Motion',
      icon: Film,
      desc: 'Animated — reveals data sequentially.',
      visual: (
        <svg viewBox="0 0 280 160" fill="none" className="w-full">
          <rect x="10" y="10" width="260" height="140" rx="12" stroke="#ddd" strokeWidth="1.5" fill="#fff" />
          <motion.rect x="30" y="110" width="40" height="0" rx="4" fill="#2ECC71" animate={{ height: [0, 30, 30], y: [110, 80, 80] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }} />
          <motion.rect x="80" y="110" width="40" height="0" rx="4" fill="#2ECC71" opacity=".7" animate={{ height: [0, 50, 50], y: [110, 60, 60] }} transition={{ duration: 2, delay: 0.3, repeat: Infinity, repeatDelay: 1 }} />
          <motion.rect x="130" y="110" width="40" height="0" rx="4" fill="#2ECC71" opacity=".5" animate={{ height: [0, 70, 70], y: [110, 40, 40] }} transition={{ duration: 2, delay: 0.6, repeat: Infinity, repeatDelay: 1 }} />
          <motion.rect x="180" y="110" width="40" height="0" rx="4" fill="#2ECC71" opacity=".85" animate={{ height: [0, 85, 85], y: [110, 25, 25] }} transition={{ duration: 2, delay: 0.9, repeat: Infinity, repeatDelay: 1 }} />
          <motion.circle cx="250" cy="80" r="0" fill="none" stroke="#2ECC71" strokeWidth="2" animate={{ r: [0, 20, 20] }} transition={{ duration: 2, delay: 1.2, repeat: Infinity, repeatDelay: 1 }} />
          {/* Play icon */}
          <circle cx="140" cy="30" r="10" fill="#2ECC71" opacity=".15" />
          <polygon points="137,25 137,35 145,30" fill="#2ECC71" opacity=".5" />
        </svg>
      ),
    },
    {
      label: 'Interactive',
      icon: MousePointerClick,
      desc: 'Clickable, explorable data experience.',
      visual: (
        <svg viewBox="0 0 280 160" fill="none" className="w-full">
          <rect x="10" y="10" width="260" height="140" rx="12" stroke="#ddd" strokeWidth="1.5" fill="#fff" />
          {/* Interactive nodes */}
          {[{ cx: 70, cy: 60 }, { cx: 140, cy: 40 }, { cx: 210, cy: 60 }, { cx: 105, cy: 110 }, { cx: 175, cy: 110 }].map((n, i) => (
            <g key={i}>
              <motion.circle cx={n.cx} cy={n.cy} r="18" fill="rgba(46,204,113,.06)" stroke="#2ECC71" strokeWidth="1.5" animate={{ r: [18, 20, 18] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }} />
              <circle cx={n.cx} cy={n.cy} r="4" fill="#2ECC71" />
            </g>
          ))}
          {/* Connection lines */}
          <line x1="70" y1="60" x2="140" y2="40" stroke="#2ECC71" strokeWidth="1" opacity=".25" />
          <line x1="140" y1="40" x2="210" y2="60" stroke="#2ECC71" strokeWidth="1" opacity=".25" />
          <line x1="70" y1="60" x2="105" y2="110" stroke="#2ECC71" strokeWidth="1" opacity=".25" />
          <line x1="210" y1="60" x2="175" y2="110" stroke="#2ECC71" strokeWidth="1" opacity=".25" />
          <line x1="105" y1="110" x2="175" y2="110" stroke="#2ECC71" strokeWidth="1" opacity=".25" />
          {/* Cursor */}
          <motion.g animate={{ x: [0, 20, 20, -10, 0], y: [0, -5, -5, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <MousePointer x="155" y="85" width="16" height="16" stroke="#1A1A1A" strokeWidth="1.5" fill="white" />
          </motion.g>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-28 lg:py-36 px-6 md:px-16" style={{ background: '#EEF2F1' }}>
      <div className="max-w-6xl mx-auto">
        <Fade><SectionTag n="Evolution" /></Fade>
        <Fade><SectionTitle>Static is Not Enough</SectionTitle></Fade>
        <Fade><SectionSub>Data deserves to move, react, and engage.</SectionSub></Fade>

        <Fade delay={0.1}>
          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-10">
            {stages.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setActive(i)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{
                  background: active === i ? '#0F2A26' : 'white',
                  color: active === i ? '#2ECC71' : '#1A1A1A',
                  border: `1px solid ${active === i ? '#0F2A26' : '#ddd'}`,
                }}
              >
                <s.icon className="w-4 h-4" strokeWidth={1.5} />
                {s.label}
              </button>
            ))}
          </div>

          {/* Flow arrows */}
          <div className="hidden md:flex items-center justify-center gap-3 mb-8">
            {stages.map((s, i) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-xs font-semibold" style={{ color: active === i ? '#2ECC71' : '#bbb' }}>{s.label}</span>
                {i < stages.length - 1 && (
                  <svg width="36" height="16" viewBox="0 0 36 16" fill="none"><path d="M0 8H28M28 8L22 3M28 8L22 13" stroke="#2ECC71" strokeWidth="1.5" strokeLinecap="round" opacity=".3" /></svg>
                )}
              </div>
            ))}
          </div>

          {/* Active visual */}
          <div className="bg-white rounded-2xl p-6 md:p-10" style={{ border: '1px solid #ddd' }}>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <div className="max-w-md mx-auto">
                  {stages[active].visual}
                </div>
                <p className="text-center text-[14px] mt-6 font-medium" style={{ color: '#1A1A1A' }}>{stages[active].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// 11 · CREATION PROCESS — timeline infographic
// ═════════════════════════════════════════════════════════════
function CreationProcess() {
  const steps = [
    { n: '01', title: 'Discover', desc: 'Understand goals, data, audience', icon: Lightbulb, detail: 'Stakeholder interviews · Data audit · Visual benchmarking' },
    { n: '02', title: 'Structure', desc: 'Organize narrative and hierarchy', icon: Ruler, detail: 'Information architecture · Content wireframe · Flow mapping' },
    { n: '03', title: 'Design', desc: 'Create the visual system', icon: PenTool, detail: 'Infographic design · Motion storyboard · Interaction prototype' },
    { n: '04', title: 'Deliver', desc: 'Launch and iterate', icon: Send, detail: 'Multi-format export · Embed code · Performance tracking' },
  ];

  return (
    <section className="py-28 lg:py-36 px-6 md:px-16" style={{ background: '#F7F4EE' }}>
      <div className="max-w-7xl mx-auto">
        <Fade><SectionTag n="Process" /></Fade>
        <Fade><SectionTitle>How We Create Visual Intelligence</SectionTitle></Fade>
        <Fade><SectionSub>A repeatable system for turning complexity into clarity.</SectionSub></Fade>

        <div className="relative">
          {/* Vertical connector line (desktop) */}
          <div className="hidden lg:block absolute left-[50%] top-0 bottom-0 w-[2px] -translate-x-1/2" style={{ background: 'linear-gradient(180deg, #2ECC71, rgba(46,204,113,.08))' }} />

          <div className="space-y-8 lg:space-y-0">
            {steps.map((s, i) => (
              <Fade key={s.n} delay={i * 0.08}>
                <div className={`lg:grid lg:grid-cols-2 lg:gap-16 items-center ${i > 0 ? 'lg:mt-6' : ''}`}>
                  {/* Content */}
                  <div className={`${i % 2 === 1 ? 'lg:order-2' : ''} mb-6 lg:mb-0`}>
                    <div className={`${i % 2 === 1 ? 'lg:pl-12' : 'lg:text-right lg:pr-12'}`}>
                      <span className="text-[11px] font-bold tracking-wider" style={{ color: '#2ECC71' }}>{s.n}</span>
                      <h3 className="font-['Playfair_Display'] text-2xl mt-1 mb-2" style={{ color: '#1A1A1A' }}>{s.title}</h3>
                      <p className="text-[14px] mb-3" style={{ color: '#777' }}>{s.desc}</p>
                      <p className="text-[12px]" style={{ color: '#aaa' }}>{s.detail}</p>
                    </div>
                  </div>

                  {/* Visual node */}
                  <div className={`${i % 2 === 1 ? 'lg:order-1' : ''} flex ${i % 2 === 1 ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
                    <div className="relative">
                      {/* Center dot on the line */}
                      <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full" style={{
                        background: '#2ECC71',
                        [i % 2 === 1 ? 'right' : 'left']: '-52px',
                        boxShadow: '0 0 0 6px rgba(46,204,113,.1)',
                      }} />
                      <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center" style={{ border: '2px solid #e0ddd5', boxShadow: '0 2px 12px rgba(0,0,0,.05)' }}>
                        <s.icon className="w-8 h-8" style={{ color: '#1A1A1A' }} strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// 12 · FINAL CTA (DARK)
// ═════════════════════════════════════════════════════════════
function FinalCTA() {
  return (
    <section className="relative py-28 md:py-[120px] px-6 md:px-16 overflow-hidden" style={{ background: '#0F2A26' }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,.3) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="max-w-[680px] mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-5">See Your Business Like This</h2>
          <p className="text-lg leading-relaxed mb-10 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,.55)' }}>Run the AI diagnostic and get your own visual roadmap.</p>
          <div className="flex flex-wrap justify-center gap-3 mb-7">
            <Link to="/ai-readiness" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:shadow-lg transition-all" style={{ background: '#2ECC71', color: '#0F2A26' }}>
              Run AI Diagnostic <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/booking" className="px-7 py-3.5 rounded-full text-sm font-medium border border-white/20 text-white hover:bg-white/8 transition-colors">
              Book Strategy Call
            </Link>
          </div>
          <p className="text-[12px] tracking-wide" style={{ color: 'rgba(255,255,255,.25)' }}>Clear visuals · Stronger presentations · Faster understanding</p>
        </motion.div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═════════════════════════════════════════════════════════════
export default function InfographicsPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Sample1 />
      <Sample2 />
      <Sample3 />
      <Sample4 />
      <Sample5 />
      <Sample6 />
      <Sample7 />
      <Services />
      <EvolutionSection />
      <CreationProcess />
      <FinalCTA />
    </div>
  );
}
