import { Link } from 'react-router';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import {
  ArrowRight, ArrowDown, TrendingUp, X, Check, Sparkles, Play,
  Search, Package, Activity, Database, MessageSquare, Settings,
  Users, Zap, Bot, Phone, Target, Calendar, Star, Clock, Eye,
  Megaphone, BarChart3, Shield, MousePointer, PenTool, Lightbulb,
  Send, ChevronRight,
} from 'lucide-react';

// ─── Tokens ──────────────────────────────────────────────────
const C = {
  forest: '#1B3A2D',
  lime: '#7AC143',
  limeLight: '#EAF3D5',
  cream: '#F5F0E2',
  sage: '#D6E8D0',
  ink: '#1A1A1A',
  muted: '#6B7B6E',
  border: '#DDD8CC',
  teal: '#2E6B7A',
  tan: '#C9A97D',
  blush: '#E0CFC8',
  plum: '#3A2850',
  rust: '#9E3D20',
  offWhite: '#EDEAE0',
};

// ─── Utilities ───────────────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const t = setInterval(() => { v += step; if (v >= target) { setCount(target); clearInterval(t); } else setCount(v); }, 20);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Fade({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: 'easeOut', delay }} className={className}>{children}</motion.div>;
}

const serif = "font-['DM_Serif_Display']";
const sans = "font-['DM_Sans']";
const eyebrow = `${sans} text-[10px] font-semibold tracking-[3px] uppercase`;

// ═════════════════════════════════════════════════════════════
// 1 · HERO
// ═════════════════════════════════════════════════════════════
function Hero() {
  return (
    <section className="relative pt-[130px] pb-0 md:pt-[150px] overflow-hidden" style={{ background: C.forest }}>
      <div className="max-w-[1100px] mx-auto px-10 relative z-10 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-end">
        {/* Copy */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="pb-16 lg:pb-24">
          <p className={`${eyebrow} mb-5`} style={{ color: 'rgba(255,255,255,.4)' }}>VISUAL INTELLIGENCE STUDIO · AI INFOGRAPHICS</p>
          <h1 className={`${serif} text-[2.4rem] md:text-[3rem] lg:text-[3.6rem] leading-[1.1] text-white mb-5`}>
            Data that doesn't need<br />a <em className="italic" style={{ color: C.lime }}>translator</em>
          </h1>
          <p className={`${sans} font-light text-[15px] leading-[1.65] max-w-md mb-8`} style={{ color: 'rgba(255,255,255,.45)' }}>
            Static infographics. Animated explainers. Interactive data stories. AI-generated visual content that makes your systems, results, and roadmaps impossible to misunderstand.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <a href="#services" className={`${sans} inline-flex items-center gap-2 px-6 py-3 text-[12px] font-semibold transition-all hover:shadow-lg`} style={{ background: C.lime, color: C.forest, borderRadius: 3 }}>
              See Our Services <ArrowDown className="w-3.5 h-3.5" />
            </a>
            <a href="#pricing" className={`${sans} px-6 py-3 text-[12px] font-medium border transition-colors hover:bg-white/5`} style={{ color: 'white', borderColor: 'rgba(255,255,255,.2)', borderRadius: 3 }}>
              View Sample Work
            </a>
          </div>
          {/* Service pills */}
          <div className="flex flex-wrap gap-2">
            {['Static infographics', 'Animated motion', 'Interactive'].map(p => (
              <span key={p} className={`${sans} text-[10px] font-medium px-3 py-1.5`} style={{ color: 'white', background: 'rgba(255,255,255,.08)', borderRadius: 20 }}>{p}</span>
            ))}
            {['Data visualization', 'AI-generated', 'Reports & decks'].map(p => (
              <span key={p} className={`${sans} text-[10px] font-medium px-3 py-1.5`} style={{ color: 'rgba(255,255,255,.25)', borderRadius: 20 }}>{p}</span>
            ))}
          </div>
        </motion.div>

        {/* Dashboard mockup — bleeds into cream */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="hidden lg:block relative">
          <div className="rounded-t-xl overflow-hidden border border-white/[.06] bg-white/[0.03]" style={{ marginBottom: '-1px' }}>
            {/* Browser bar */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[.05]">
              <div className="w-2 h-2 rounded-full" style={{ background: '#FF605C' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: '#FFBD44' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: '#00CA4E' }} />
            </div>
            <div className="p-5 space-y-3">
              {/* KPI row */}
              <div className="grid grid-cols-3 gap-2.5">
                {[{ l: '293%', s: 'ROI' }, { l: '80%', s: 'Automated' }, { l: '3×', s: 'Faster' }].map(d => (
                  <div key={d.s} className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)' }}>
                    <div className={`${serif} text-xl text-white`}>{d.l}</div>
                    <span className={`${sans} text-[10px]`} style={{ color: 'rgba(255,255,255,.3)' }}>{d.s}</span>
                  </div>
                ))}
              </div>
              {/* Bar chart */}
              <div className="rounded-lg p-4" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)' }}>
                <div className="flex items-end gap-[4px] h-24">
                  {[22, 30, 28, 40, 45, 60, 55, 82].map((h, i) => (
                    <motion.div key={i} className="flex-1 rounded-t" style={{ background: i >= 6 ? C.lime : `rgba(122,193,67,.3)` }} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }} />
                  ))}
                </div>
              </div>
              {/* AI Insights */}
              <div className="rounded-lg p-4" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)' }}>
                <div className="flex items-center gap-1.5 mb-2.5"><Sparkles className="w-3 h-3" style={{ color: C.lime }} /><span className={`${sans} text-[9px] uppercase tracking-wider font-semibold text-white`}>AI Insights</span></div>
                {['Lead quality improved 40%', 'Response cut to 30s', 'Churn model saved $42K'].map(t => (
                  <div key={t} className="flex items-start gap-1.5 mb-1.5"><div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: C.lime }} /><span className={`${sans} text-[11px]`} style={{ color: 'rgba(255,255,255,.4)' }}>{t}</span></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// 2 · BENTO GRID — 9 Service Cards
// ═════════════════════════════════════════════════════════════

/* Shared card wrapper */
function BentoCard({ bg, className = '', children, tag }: { bg: string; className?: string; children: React.ReactNode; tag: string }) {
  return (
    <motion.div
      className={`rounded-[14px] p-6 md:p-7 flex flex-col overflow-hidden group transition-shadow hover:shadow-lg ${className}`}
      style={{ background: bg }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <span className={`${sans} text-[9px] font-bold uppercase tracking-[2px] mb-3 block`} style={{ color: 'rgba(255,255,255,.45)' }}>{tag}</span>
      {children}
    </motion.div>
  );
}

/* Card 01 — Process Flow */
function Card01() {
  const steps = ['Traffic arrives', 'AI qualifies lead', 'WhatsApp reply <30s', 'CRM auto-updated', 'Deal closed'];
  const subs = ['Social · Organic · Paid', '', '', '', '+45% faster'];
  const opacities = [.15, .22, .30, .38, 1];
  return (
    <BentoCard bg={C.tan} className="col-span-12 md:col-span-4 row-span-2" tag="01 · STATIC INFOGRAPHIC">
      <h3 className={`${serif} text-xl text-white mb-1.5`}>Process flow infographics</h3>
      <p className={`${sans} text-[12px] font-light leading-[1.65] mb-2`} style={{ color: 'rgba(255,255,255,.6)' }}>Step-by-step visual narratives showing how AI transforms a workflow from trigger to outcome.</p>
      <p className={`${sans} text-[10px] mb-4`} style={{ color: 'rgba(255,255,255,.35)' }}>From $1,500 · 5–8 day delivery</p>
      <div className="flex-1 flex flex-col items-center justify-center gap-0 mt-2">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-col items-center">
            <div className={`${sans} w-[170px] text-center py-2.5 rounded-lg text-[11px] font-medium`} style={{
              background: i === 4 ? C.lime : `rgba(255,255,255,${opacities[i]})`,
              color: i === 4 ? C.forest : 'rgba(255,255,255,.85)',
            }}>
              {i === 4 ? <span className={serif}>{s}</span> : s}
              {subs[i] && <span className="block text-[9px] font-normal mt-0.5" style={{ opacity: .6 }}>{subs[i]}</span>}
            </div>
            {i < 4 && (
              <svg width="2" height="18" className="my-0.5"><line x1="1" y1="0" x2="1" y2="18" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" /></svg>
            )}
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

/* Card 02 — Motion Graphics */
function Card02() {
  const values = ['+18%', '+24%', '+44%', '+52%', '+61%', '+72%', '+88%', '+178%'];
  const heights = [18, 24, 38, 42, 50, 60, 72, 95];
  return (
    <BentoCard bg={C.forest} className="col-span-12 md:col-span-8" tag="02 · ANIMATED MOTION GRAPHICS">
      <div className="grid md:grid-cols-2 gap-5 h-full">
        <div>
          <h3 className={`${serif} text-xl text-white mb-1.5`}>Motion infographics & explainer videos</h3>
          <p className={`${sans} text-[12px] font-light leading-[1.65] mb-3`} style={{ color: 'rgba(255,255,255,.45)' }}>Lottie animations, After Effects renders, and Remotion-powered programmatic video. Transform static data into 30–90 second animated stories.</p>
          <div className="flex flex-wrap gap-1.5">
            {['AFTER EFFECTS', 'LOTTIE', 'REMOTION'].map(t => (
              <span key={t} className={`${sans} text-[8px] font-semibold tracking-[1.5px] px-2 py-1`} style={{ color: 'rgba(255,255,255,.35)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 2 }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="relative">
          <p className={`${sans} text-[9px] uppercase tracking-[2px] mb-3`} style={{ color: 'rgba(255,255,255,.25)' }}>ANIMATED · ROI OVER TIME</p>
          <div className="flex items-end gap-[5px] h-32">
            {heights.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <span className={`${sans} text-[8px] font-medium mb-1`} style={{ color: i >= 6 ? C.lime : 'rgba(122,193,67,.5)' }}>{values[i]}</span>
                <motion.div className="w-full rounded-t" style={{ background: i >= 6 ? C.lime : 'rgba(122,193,67,.3)' }} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }} />
              </div>
            ))}
          </div>
          {/* Play button overlay */}
          <div className="absolute top-0 right-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)' }}>
            <Play className="w-3.5 h-3.5 ml-0.5" style={{ color: 'rgba(255,255,255,.5)' }} fill="rgba(255,255,255,.3)" />
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

/* Card 03 — Interactive */
function Card03() {
  return (
    <BentoCard bg={C.plum} className="col-span-12 md:col-span-6" tag="03 · INTERACTIVE INFOGRAPHIC">
      <h3 className={`${serif} text-xl text-white mb-1.5`}>Click-through & scrollytelling experiences</h3>
      <p className={`${sans} text-[12px] font-light leading-[1.65] mb-1`} style={{ color: 'rgba(255,255,255,.45)' }}>Web-embedded interactive infographics. Users explore data by clicking, hovering, and scrolling.</p>
      <p className={`${sans} text-[10px] mb-3`} style={{ color: 'rgba(255,255,255,.3)' }}>From $4,000 · 10–20 day delivery</p>
      {/* Bubble scatter mockup */}
      <div className="flex-1 flex flex-col items-center justify-end mt-2">
        <div className="flex gap-2 mb-3 self-start">
          {['All', 'Real Estate', 'Fashion'].map((f, i) => (
            <span key={f} className={`${sans} text-[9px] font-medium px-2.5 py-1`} style={{ background: i === 0 ? 'rgba(138,100,180,.3)' : 'rgba(255,255,255,.06)', color: i === 0 ? '#c9b0f0' : 'rgba(255,255,255,.3)', borderRadius: 3 }}>{f}</span>
          ))}
        </div>
        <svg viewBox="0 0 260 110" fill="none" className="w-full max-w-[260px]">
          <circle cx="65" cy="60" r="28" fill="rgba(138,100,180,.2)" stroke="rgba(138,100,180,.3)" strokeWidth="1" />
          <text x="65" y="64" textAnchor="middle" fill="rgba(255,255,255,.5)" fontSize="10" fontFamily="DM Sans">Re</text>
          <circle cx="155" cy="45" r="20" fill="rgba(138,100,180,.15)" stroke="rgba(138,100,180,.25)" strokeWidth="1" />
          <text x="155" y="49" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10" fontFamily="DM Sans">Ec</text>
          <circle cx="210" cy="70" r="15" fill="rgba(138,100,180,.12)" stroke="rgba(138,100,180,.2)" strokeWidth="1" />
          <text x="210" y="74" textAnchor="middle" fill="rgba(255,255,255,.35)" fontSize="9" fontFamily="DM Sans">Fa</text>
          {/* Tooltip */}
          <rect x="85" y="8" width="90" height="32" rx="4" fill="rgba(200,176,240,.15)" stroke="rgba(200,176,240,.25)" strokeWidth="1" />
          <text x="130" y="22" textAnchor="middle" fill="#c9b0f0" fontSize="12" fontWeight="bold" fontFamily="DM Serif Display">+293%</text>
          <text x="130" y="34" textAnchor="middle" fill="rgba(255,255,255,.35)" fontSize="8" fontFamily="DM Sans">Average client ROI</text>
          <line x1="93" y1="40" x2="80" y2="50" stroke="rgba(200,176,240,.3)" strokeWidth="1" strokeDasharray="3 2" />
        </svg>
        <p className={`${sans} text-[9px] mt-2`} style={{ color: 'rgba(255,255,255,.25)' }}>Click any bubble to explore</p>
      </div>
    </BentoCard>
  );
}

/* Card 04 — Data Visualization */
function Card04() {
  return (
    <BentoCard bg={C.teal} className="col-span-12 md:col-span-6" tag="04 · DATA VISUALIZATION">
      <h3 className={`${serif} text-xl text-white mb-1.5`}>Statistical & data-driven infographics</h3>
      <p className={`${sans} text-[12px] font-light leading-[1.65] mb-4`} style={{ color: 'rgba(255,255,255,.45)' }}>Custom charts, dashboards, KPI summaries from your real AI system data.</p>
      <div className="flex-1 flex items-end">
        <div className="flex items-center gap-4 w-full">
          {/* Donut */}
          <div className="shrink-0">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="10" />
              <circle cx="40" cy="40" r="30" fill="none" stroke={C.lime} strokeWidth="10" strokeDasharray={`${0.8 * 188.5} ${0.2 * 188.5}`} strokeDashoffset="47" strokeLinecap="round" />
              <text x="40" y="38" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="DM Sans">80%</text>
              <text x="40" y="49" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="7" fontFamily="DM Sans">automated</text>
            </svg>
          </div>
          {/* KPI trio */}
          <div className="flex-1 grid grid-cols-3 gap-2">
            {[{ v: '293%', l: 'ROI' }, { v: '3×', l: 'Speed' }, { v: '23s', l: 'Response' }].map(k => (
              <div key={k.l} className="rounded-lg p-2.5 text-center" style={{ background: 'rgba(255,255,255,.08)' }}>
                <div className={`${serif} text-base`} style={{ color: C.lime }}>{k.v}</div>
                <div className={`${sans} text-[8px]`} style={{ color: 'rgba(255,255,255,.35)' }}>{k.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

/* Card 05 — Architecture Diagrams */
function Card05() {
  const nodes = ['Lead Gen', 'CRM', 'Support', 'Analytics', 'Marketing', 'Operations'];
  return (
    <BentoCard bg={C.blush} className="col-span-12 md:col-span-4" tag="05 · SYSTEM MAP">
      <h3 className={`${serif} text-lg mb-1`} style={{ color: C.ink }}>AI architecture diagrams</h3>
      <p className={`${sans} text-[11px] font-light leading-[1.6] mb-3`} style={{ color: C.muted }}>Node maps and system diagrams for boards, clients, and teams.</p>
      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 200 160" fill="none" className="w-full max-w-[200px]">
          {/* Center */}
          <ellipse cx="100" cy="80" rx="30" ry="20" fill={C.rust} opacity=".2" stroke={C.rust} strokeWidth="1" />
          <text x="100" y="77" textAnchor="middle" fill={C.rust} fontSize="9" fontWeight="bold" fontFamily="DM Sans">AI Core</text>
          <text x="100" y="88" textAnchor="middle" fill={C.rust} fontSize="7" fontFamily="DM Sans" opacity=".6">48 agents</text>
          {/* Satellites */}
          {[{ x: 35, y: 25 }, { x: 165, y: 25 }, { x: 15, y: 80 }, { x: 185, y: 80 }, { x: 35, y: 135 }, { x: 165, y: 135 }].map((p, i) => (
            <g key={nodes[i]}>
              <line x1="100" y1="80" x2={p.x} y2={p.y} stroke={C.rust} strokeWidth="0.8" strokeDasharray="3 3" opacity=".3" />
              <rect x={p.x - 28} y={p.y - 10} width="56" height="20" rx="4" fill="rgba(158,61,32,.08)" stroke={C.rust} strokeWidth="0.8" opacity=".5" />
              <text x={p.x} y={p.y + 3} textAnchor="middle" fill={C.rust} fontSize="7" fontFamily="DM Sans" opacity=".7">{nodes[i]}</text>
            </g>
          ))}
        </svg>
      </div>
    </BentoCard>
  );
}

/* Card 06 — Timeline */
function Card06() {
  const phases = [
    { n: '1', label: 'Discover', sub: 'AI Diagnostic', time: 'Day 1', color: C.forest },
    { n: '2', label: 'Design', sub: 'Architecture', time: 'Week 1–2', color: C.teal },
    { n: '3', label: 'Deploy', sub: 'Build & Launch', time: 'Week 2–8', color: '#4A8F5D' },
    { n: '4', label: 'Scale', sub: 'Optimise', time: 'Ongoing', color: C.lime },
  ];
  return (
    <BentoCard bg={C.offWhite} className="col-span-12 md:col-span-4" tag="06 · TIMELINE">
      <span style={{ color: C.muted }} className="!text-[9px]">{''}</span>
      <h3 className={`${serif} text-lg mb-1`} style={{ color: C.ink }}>Deployment & roadmap visuals</h3>
      <p className={`${sans} text-[11px] font-light leading-[1.6] mb-3`} style={{ color: C.muted }}>Visual timelines for phases, roadmaps, and milestones.</p>
      <div className="flex-1">
        <div className="relative pl-5">
          <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px]" style={{ background: C.border }} />
          {phases.map((p, i) => (
            <div key={p.n} className="flex items-start gap-3 mb-4 last:mb-0 relative">
              <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[8px] font-bold text-white z-10 -ml-5" style={{ background: p.color }}>{p.n}</div>
              <div>
                <div className={`${sans} text-[12px] font-semibold`} style={{ color: C.ink }}>{p.label}</div>
                <div className={`${sans} text-[10px]`} style={{ color: C.muted }}>{p.sub} · {p.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}

/* Card 07 — Comparison */
function Card07() {
  const before = ['Manual 8h/day', '6h response time', 'Lost leads', 'No attribution', '5 tools, no sync'];
  const after = ['AI automated', '<30s reply', '0 leads lost', 'Full ROI view', '1 unified system'];
  return (
    <BentoCard bg={C.lime} className="col-span-12 md:col-span-4" tag="07 · COMPARISON">
      <span style={{ color: C.forest }} className="!opacity-50">{''}</span>
      <h3 className={`${serif} text-lg mb-3`} style={{ color: C.forest }}>Before vs after visual stories</h3>
      <div className="flex-1 grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
        {/* Before */}
        <div className="rounded-lg p-3" style={{ background: C.forest }}>
          <span className={`${sans} text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded mb-2 inline-block`} style={{ background: 'rgba(231,76,60,.25)', color: '#ff7b6b' }}>BEFORE</span>
          {before.map(b => (
            <div key={b} className="flex items-start gap-1.5 mb-1"><div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: '#ff7b6b' }} /><span className={`${sans} text-[9px] line-through`} style={{ color: 'rgba(255,255,255,.4)' }}>{b}</span></div>
          ))}
        </div>
        {/* After */}
        <div className="rounded-lg p-3" style={{ background: C.forest }}>
          <span className={`${sans} text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded mb-2 inline-block`} style={{ background: 'rgba(122,193,67,.2)', color: C.lime }}>AFTER</span>
          {after.map(a => (
            <div key={a} className="flex items-start gap-1.5 mb-1"><div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: C.lime }} /><span className={`${sans} text-[9px]`} style={{ color: 'rgba(255,255,255,.75)' }}>{a}</span></div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}

/* Card 08 — Reports */
function Card08() {
  return (
    <BentoCard bg={C.rust} className="col-span-12 md:col-span-8" tag="08 · ANNUAL REPORTS & DECKS">
      <div className="grid md:grid-cols-2 gap-5 h-full">
        <div>
          <h3 className={`${serif} text-xl text-white mb-1.5`}>Data-rich report & presentation design</h3>
          <p className={`${sans} text-[12px] font-light leading-[1.65]`} style={{ color: 'rgba(255,255,255,.45)' }}>Annual AI performance reports, investor decks, and board presentations with fully custom infographic layouts.</p>
        </div>
        <div className="flex items-end">
          <div className="w-full rounded-lg p-4" style={{ background: 'rgba(0,0,0,.2)', border: '1px solid rgba(255,255,255,.08)' }}>
            <div className={`${sans} text-[9px] font-semibold uppercase tracking-wider text-white mb-3`}>AI Performance Report</div>
            <div className={`${sans} text-[8px] mb-3`} style={{ color: 'rgba(255,255,255,.3)' }}>AMO AI · Q4 2025</div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[{ v: '293%', l: 'Average ROI' }, { v: '80%', l: 'Automated' }].map(k => (
                <div key={k.l} className="rounded p-2" style={{ background: 'rgba(255,255,255,.06)' }}>
                  <div className={`${serif} text-sm`} style={{ color: C.lime }}>{k.v}</div>
                  <div className={`${sans} text-[8px]`} style={{ color: 'rgba(255,255,255,.3)' }}>{k.l}</div>
                </div>
              ))}
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.08)' }}>
              <div className="h-full rounded-full" style={{ width: '65%', background: C.lime }} />
            </div>
            <p className={`${sans} text-[8px] mt-2`} style={{ color: 'rgba(255,255,255,.25)' }}>Fully designed · Brand aligned · Investor ready</p>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

/* Card 09 — Programmatic Video */
function Card09() {
  const frames = [
    { bg: C.forest, step: 'STEP 1', title: 'Diagnostic complete', sub: 'Acme Corp · E-commerce', bar: 75 },
    { bg: C.teal, step: 'STEP 2', title: 'AI renders video', sub: '60s · Personalised · MP4', bar: -1 },
    { bg: C.lime, step: 'STEP 3', title: 'Prospect shares video', sub: '→ Viral loop · More leads', bar: 100 },
  ];
  return (
    <BentoCard bg={C.sage} className="col-span-12" tag="09 · PROGRAMMATIC AI VIDEO · UNIQUE DIFFERENTIATOR">
      <div className="grid md:grid-cols-[1fr_2fr] gap-6">
        <div>
          <h3 className={`${serif} text-xl mb-1.5`} style={{ color: C.ink }}>AI-generated personalized diagnostic videos</h3>
          <p className={`${sans} text-[12px] font-light leading-[1.65] mb-2`} style={{ color: C.muted }}>Using Remotion + Lambda, we auto-generate a unique 60-second animated video for every prospect. No other agency offers this.</p>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {['REMOTION', 'AWS LAMBDA', 'REACT'].map(t => (
              <span key={t} className={`${sans} text-[8px] font-semibold tracking-[1.5px] px-2 py-1`} style={{ color: C.muted, border: `1px solid ${C.border}`, borderRadius: 2 }}>{t}</span>
            ))}
          </div>
          <p className={`${sans} text-[10px]`} style={{ color: C.muted }}>From $5,000 setup · $0.01/render at scale</p>
        </div>
        <div className="flex items-center gap-3">
          {frames.map((f, i) => (
            <div key={f.step} className="flex items-center gap-3 flex-1">
              <div className="rounded-lg p-3 flex-1" style={{ background: f.bg, color: f.bg === C.lime ? C.forest : 'white' }}>
                <div className={`${sans} text-[8px] font-bold uppercase tracking-wider mb-1`} style={{ opacity: .5 }}>{f.step}</div>
                <div className={`${sans} text-[11px] font-semibold mb-0.5`}>{f.title}</div>
                <div className={`${sans} text-[9px]`} style={{ opacity: .5 }}>{f.sub}</div>
                {f.bar >= 0 && (
                  <div className="h-1.5 rounded-full mt-2 overflow-hidden" style={{ background: f.bg === C.lime ? 'rgba(27,58,45,.15)' : 'rgba(255,255,255,.1)' }}>
                    <div className="h-full rounded-full" style={{ width: `${f.bar}%`, background: f.bg === C.lime ? C.forest : C.lime }} />
                  </div>
                )}
                {f.bar < 0 && (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center mt-2" style={{ background: 'rgba(255,255,255,.1)' }}>
                    <Play className="w-3 h-3 ml-0.5" fill="white" style={{ color: 'white' }} />
                  </div>
                )}
              </div>
              {i < 2 && <svg width="20" height="16" viewBox="0 0 20 16" fill="none" className="shrink-0 hidden md:block"><path d="M0 8H14M14 8L9 3M14 8L9 13" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round" /></svg>}
            </div>
          ))}
        </div>
      </div>
      <p className={`${sans} text-[9px] text-center mt-4`} style={{ color: C.muted }}>Scales to 1,000+ unique renders/month · $0.01 per video</p>
    </BentoCard>
  );
}

function BentoGrid() {
  return (
    <section id="services" className="py-12 md:py-16 px-6 md:px-10" style={{ background: C.cream }}>
      <div className="max-w-[1100px] mx-auto">
        <Fade>
          <div className="flex items-end justify-between mb-6">
            <h2 className={`${serif} text-2xl md:text-[36px]`} style={{ color: C.forest }}>Infographic services we offer</h2>
            <span className={`${sans} text-[10px] uppercase tracking-[2px] hidden md:block`} style={{ color: C.muted }}>9 SERVICE TYPES</span>
          </div>
        </Fade>
        <div className="grid grid-cols-12 gap-[14px] auto-rows-auto">
          <Card01 />
          <Card02 />
          <Card03 />
          <Card04 />
          <Card05 />
          <Card06 />
          <Card07 />
          <Card08 />
          <Card09 />
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// 3 · MOTION SHOWCASE
// ═════════════════════════════════════════════════════════════
function MotionShowcase() {
  const cols = [
    { title: 'Explainer Videos', sub: '60-second AI explainer · Lottie + AE', desc: 'From storyboard to final render in 2 weeks. Scripted, voiced, and motion-designed.' },
    { title: 'Data Stories', sub: 'Revenue & conversion animations', desc: 'Performance data turned into shareable animated charts.' },
    { title: 'Diagnostic Videos', sub: 'diagnostic → render → MP4', desc: 'Remotion-powered personalized video generated automatically for each prospect.' },
  ];
  return (
    <section className="py-20 md:py-24 px-6 md:px-10" style={{ background: C.forest }}>
      <div className="max-w-[1100px] mx-auto">
        <Fade>
          <p className={`${eyebrow} mb-3`} style={{ color: 'rgba(255,255,255,.3)' }}>MOTION & ANIMATION</p>
          <h2 className={`${serif} text-2xl md:text-[36px] text-white mb-2`}>When static isn't enough</h2>
          <p className={`${sans} text-[14px] font-light max-w-md mb-12`} style={{ color: 'rgba(255,255,255,.4)' }}>Three motion categories we produce — each with a live preview.</p>
        </Fade>
        <div className="grid md:grid-cols-3 gap-[14px]">
          {cols.map((c, i) => (
            <Fade key={c.title} delay={i * 0.08}>
              <div className="rounded-[14px] p-6 h-full" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)' }}>
                {/* Thumbnail */}
                <div className="rounded-lg h-36 flex items-center justify-center mb-5 relative" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.05)' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(122,193,67,.1)', border: '1px solid rgba(122,193,67,.2)' }}>
                    <Play className="w-5 h-5 ml-0.5" style={{ color: C.lime }} />
                  </div>
                  <span className={`${sans} absolute bottom-2 left-3 text-[8px] uppercase tracking-wider`} style={{ color: 'rgba(255,255,255,.2)' }}>{c.sub}</span>
                </div>
                <h3 className={`${serif} text-lg text-white mb-1.5`}>{c.title}</h3>
                <p className={`${sans} text-[12px] font-light leading-[1.65]`} style={{ color: 'rgba(255,255,255,.4)' }}>{c.desc}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// 4 · INTERACTIVE SHOWCASE
// ═════════════════════════════════════════════════════════════
function InteractiveShowcase() {
  const features = ['Click-to-reveal data points', 'Filter by industry or time period', 'Hover tooltips with contextual stats', 'Scroll-triggered animations', 'Embedded in any web page'];
  return (
    <section className="py-20 md:py-24 px-6 md:px-10" style={{ background: C.sage }}>
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 items-center">
        <Fade>
          <p className={`${eyebrow} mb-3`} style={{ color: C.muted }}>INTERACTIVE · CEROS STYLE</p>
          <h2 className={`${serif} text-2xl md:text-[32px] leading-tight mb-4`} style={{ color: C.ink }}>Infographics people explore, not just read</h2>
          <p className={`${sans} text-[13px] font-light leading-[1.65] mb-6`} style={{ color: C.muted }}>We build web-embedded interactive infographics — scrollytelling, click-to-reveal data stories, filterable charts, and hover-activated tooltips.</p>
          <ul className="space-y-2.5">
            {features.map(f => (
              <li key={f} className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: C.lime }} />
                <span className={`${sans} text-[13px]`} style={{ color: C.ink }}>{f}</span>
              </li>
            ))}
          </ul>
        </Fade>
        <Fade delay={0.1}>
          {/* Browser frame mockup */}
          <div className="rounded-xl overflow-hidden" style={{ background: 'white', border: `1px solid ${C.border}`, boxShadow: '0 4px 24px rgba(0,0,0,.06)' }}>
            <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ borderBottom: `1px solid ${C.border}` }}>
              <div className="w-2 h-2 rounded-full" style={{ background: '#FF605C' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: '#FFBD44' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: '#00CA4E' }} />
              <span className={`${sans} text-[9px] ml-2`} style={{ color: C.muted }}>Interactive Dashboard</span>
            </div>
            <div className="p-5">
              {/* Filter tabs */}
              <div className="flex gap-1.5 mb-4">
                {['All', 'Real Estate', 'Fashion', 'E-comm', 'SaaS', 'Travel'].map((f, i) => (
                  <span key={f} className={`${sans} text-[9px] px-2.5 py-1 rounded-sm`} style={{ background: i === 0 ? C.limeLight : '#f5f5f0', color: i === 0 ? C.forest : C.muted, fontWeight: i === 0 ? 600 : 400 }}>{f}</span>
                ))}
              </div>
              {/* Bubble chart */}
              <svg viewBox="0 0 340 180" fill="none" className="w-full">
                {/* Axes */}
                <line x1="40" y1="160" x2="330" y2="160" stroke={C.border} strokeWidth="1" />
                <line x1="40" y1="10" x2="40" y2="160" stroke={C.border} strokeWidth="1" />
                <text x="185" y="178" textAnchor="middle" fill={C.muted} fontSize="8" fontFamily="DM Sans">Implementation time</text>
                <text x="12" y="90" fill={C.muted} fontSize="8" fontFamily="DM Sans" transform="rotate(-90 12 90)">ROI improvement</text>
                {/* Bubbles */}
                {[
                  { cx: 100, cy: 50, r: 24, l: 'Real Estate' },
                  { cx: 180, cy: 80, r: 18, l: 'Fashion' },
                  { cx: 250, cy: 40, r: 20, l: 'E-comm' },
                  { cx: 140, cy: 120, r: 14, l: 'SaaS' },
                  { cx: 280, cy: 100, r: 16, l: 'Travel' },
                  { cx: 80, cy: 100, r: 12, l: 'Health' },
                ].map((b, i) => (
                  <g key={b.l}>
                    <motion.circle cx={b.cx} cy={b.cy} r={b.r} fill="rgba(122,193,67,.08)" stroke={C.lime} strokeWidth="1.5" animate={i === 0 ? { r: [b.r, b.r + 2, b.r] } : {}} transition={{ duration: 2, repeat: Infinity }} />
                    <text x={b.cx} y={b.cy + 3} textAnchor="middle" fill={C.ink} fontSize="7" fontFamily="DM Sans">{b.l}</text>
                  </g>
                ))}
                {/* Tooltip on Real Estate */}
                <rect x="120" y="18" width="85" height="28" rx="4" fill="white" stroke={C.border} strokeWidth="1" filter="drop-shadow(0 2px 4px rgba(0,0,0,.06))" />
                <text x="162" y="32" textAnchor="middle" fill={C.lime} fontSize="11" fontWeight="bold" fontFamily="DM Serif Display">+293% ROI</text>
                <text x="162" y="42" textAnchor="middle" fill={C.muted} fontSize="7" fontFamily="DM Sans">Real Estate avg</text>
                <line x1="124" y1="46" x2="110" y2="52" stroke={C.border} strokeWidth="1" strokeDasharray="3 2" />
              </svg>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// 5 · PROCESS TIMELINE
// ═════════════════════════════════════════════════════════════
function ProcessTimeline() {
  const steps = [
    { n: '1', title: 'Brief', desc: 'You submit data, goal, and audience.', time: 'Day 1', above: true },
    { n: '2', title: 'Concept', desc: 'Static concept frame + visual direction.', time: 'Days 2–3', above: false },
    { n: '3', title: 'Storyboard', desc: 'Frame-by-frame storyboard + voiceover script.', time: 'Days 3–5', above: true },
    { n: '4', title: 'Production', desc: 'Animation or illustration rendered.', time: 'Days 5–12', above: false },
    { n: '5', title: 'Delivery', desc: 'MP4, GIF, Lottie, SVG, or React component.', time: 'Days 12–20', above: true },
  ];

  return (
    <section className="py-20 md:py-24 px-6 md:px-10" style={{ background: C.cream }}>
      <div className="max-w-[1100px] mx-auto">
        <Fade>
          <p className={`${eyebrow} mb-3 text-center`} style={{ color: C.muted }}>OUR PROCESS</p>
          <h2 className={`${serif} text-2xl md:text-[36px] text-center mb-16`} style={{ color: C.forest }}>Brief to delivered in 5 steps</h2>
        </Fade>

        {/* Desktop horizontal timeline */}
        <Fade delay={0.1}>
          <div className="hidden md:block relative">
            {/* Spine */}
            <div className="absolute left-[5%] right-[5%] top-1/2 h-[2px] -translate-y-1/2" style={{ background: C.border }} />
            <div className="grid grid-cols-5 gap-3 relative" style={{ paddingTop: 120, paddingBottom: 120 }}>
              {steps.map((s, i) => (
                <motion.div key={s.n} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex flex-col items-center relative">
                  {/* Content above or below */}
                  <div className={`absolute ${s.above ? 'bottom-[calc(50%+28px)]' : 'top-[calc(50%+28px)]'} text-center w-full px-2`}>
                    <div className={`${serif} text-base mb-0.5`} style={{ color: C.ink }}>{s.title}</div>
                    <p className={`${sans} text-[11px] font-light leading-[1.5]`} style={{ color: C.muted }}>{s.desc}</p>
                    <span className={`${sans} text-[10px] font-medium mt-1 block`} style={{ color: C.lime }}>{s.time}</span>
                  </div>
                  {/* Node */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center z-10 text-sm font-bold" style={{ background: i === 4 ? C.lime : C.forest, color: i === 4 ? C.forest : 'white', boxShadow: '0 2px 8px rgba(0,0,0,.1)' }}>
                    {s.n}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile vertical */}
          <div className="md:hidden space-y-5">
            {steps.map(s => (
              <div key={s.n} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: s.n === '5' ? C.lime : C.forest, color: s.n === '5' ? C.forest : 'white' }}>{s.n}</div>
                <div>
                  <div className={`${serif} text-base`} style={{ color: C.ink }}>{s.title}</div>
                  <p className={`${sans} text-[12px] font-light`} style={{ color: C.muted }}>{s.desc}</p>
                  <span className={`${sans} text-[10px] font-medium`} style={{ color: C.lime }}>{s.time}</span>
                </div>
              </div>
            ))}
          </div>

          <p className={`${sans} text-[11px] text-center mt-10`} style={{ color: C.muted }}>All tiers include 2 revision rounds. Source files always included.</p>
        </Fade>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// 6 · PRICING
// ═════════════════════════════════════════════════════════════
function Pricing() {
  const tiers = [
    { title: 'Motion Starter', price: 'From $1,500', features: ['1 animated infographic (30s)', 'Static concept + 1 revision', 'MP4 + GIF'], time: '5–8 days', popular: false },
    { title: 'Data Story', price: 'From $2,500', features: ['Data visualization video (60s)', 'Storyboard + script + 2 revisions', 'MP4 + source files'], time: '8–12 days', popular: true },
    { title: 'Process Explainer', price: 'From $4,000', features: ['Scripted explainer (60–90s)', 'Voiceover + motion + 2 revisions', 'MP4, GIF, Lottie'], time: '10–15 days', popular: false },
    { title: 'Diagnostic Video', price: 'Custom', features: ['Programmatic video generation', 'Scales to 1,000+ renders/month', 'Ongoing optimization'], time: 'Strategy call', popular: false },
  ];

  return (
    <section id="pricing" className="py-20 md:py-24 px-6 md:px-10 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <Fade>
          <h2 className={`${serif} text-2xl md:text-[36px] text-center mb-2`} style={{ color: C.forest }}>Fixed fees. No surprises.</h2>
          <p className={`${sans} text-[14px] text-center mb-14`} style={{ color: C.muted }}>Every project scoped upfront. You know the cost before we start.</p>
        </Fade>

        <div className="grid md:grid-cols-4 gap-[14px]">
          {tiers.map((t, i) => (
            <Fade key={t.title} delay={i * 0.06}>
              <div className="rounded-[14px] p-6 h-full flex flex-col relative" style={{
                background: 'white',
                border: t.popular ? `2px solid ${C.lime}` : `1px solid ${C.border}`,
              }}>
                {t.popular && (
                  <span className={`${sans} absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-semibold px-3 py-1 rounded-full`} style={{ background: C.limeLight, color: C.forest }}>Most popular</span>
                )}
                <h3 className={`${serif} text-lg mb-1`} style={{ color: C.ink }}>{t.title}</h3>
                <div className={`${serif} text-2xl mb-4`} style={{ color: C.forest }}>{t.price}</div>
                <ul className="space-y-2 flex-1">
                  {t.features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: C.lime }} strokeWidth={2.5} />
                      <span className={`${sans} text-[12px] font-light`} style={{ color: C.ink }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className={`${sans} text-[11px] mt-4 pt-3`} style={{ color: C.muted, borderTop: `1px solid ${C.border}` }}>
                  <Clock className="w-3 h-3 inline mr-1" />{t.time}
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
// 7 · CTA
// ═════════════════════════════════════════════════════════════
function CTA() {
  return (
    <section className="py-20 md:py-24 px-6 md:px-10" style={{ background: C.forest }}>
      <div className="max-w-[680px] mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className={`${eyebrow} mb-4`} style={{ color: 'rgba(255,255,255,.3)' }}>START TODAY</p>
          <h2 className={`${serif} text-2xl md:text-[42px] leading-tight text-white mb-4`}>
            Your AI data has a story.<br />Let's <em className="italic" style={{ color: C.lime }}>animate it.</em>
          </h2>
          <p className={`${sans} text-[14px] font-light mb-8`} style={{ color: 'rgba(255,255,255,.4)' }}>Submit a brief. Get a concept in 48 hours. Source files always included.</p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Link to="/booking" className={`${sans} inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-semibold transition-all hover:shadow-lg`} style={{ background: C.lime, color: C.forest, borderRadius: 3 }}>
              Submit a Motion Brief
            </Link>
            <Link to="/booking" className={`${sans} px-7 py-3.5 text-[14px] font-medium border transition-colors hover:bg-white/5`} style={{ color: 'white', borderColor: 'rgba(255,255,255,.2)', borderRadius: 3 }}>
              Book a Strategy Call
            </Link>
          </div>
          <p className={`${sans} text-[11px]`} style={{ color: 'rgba(255,255,255,.2)' }}>5–20 day delivery · 2 revision rounds · Source files included · No retainer required</p>
        </motion.div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═════════════════════════════════════════════════════════════
export default function InfographicsPageV2() {
  return (
    <>
      {/* Google Fonts for DM Serif Display + DM Sans */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Serif+Display:ital@0;1&display=swap');`}</style>
      <div className="min-h-screen" style={{ background: C.cream }}>
        <Hero />
        <BentoGrid />
        <MotionShowcase />
        <InteractiveShowcase />
        <ProcessTimeline />
        <Pricing />
        <CTA />
      </div>
    </>
  );
}
