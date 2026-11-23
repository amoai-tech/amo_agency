// C36 — Proposal Page: AI-Generated Project Proposal
// McKinsey-style document with scope breakdown, timeline, pricing, CTAs
// Route: /wizard/proposal

import { useMemo } from 'react';
import { Link } from 'react-router';
import { useWizard } from './WizardContext';
import { AI_SYSTEMS } from './data/wizardData';
import { motion } from 'motion/react';
import {
  Sun, Download, Share2, Check, ArrowRight,
  Phone, MessageSquare, ShoppingCart, Sparkles,
  Target, Users, Brain, Shield
} from 'lucide-react';

/* ────────── PROPOSAL DATA GENERATORS ────────── */

interface Phase {
  number: number;
  title: string;
  weeks: string;
  cost: number;
  deliverables: string[];
  milestone: string;
}

function generatePhases(systemCount: number): Phase[] {
  const baseMultiplier = Math.max(1, systemCount * 0.6);
  return [
    {
      number: 1, title: 'Discovery & Architecture', weeks: 'Week 1-2',
      cost: Math.round(3200 * baseMultiplier / 100) * 100,
      deliverables: [
        'Requirements deep-dive workshop (2 sessions)',
        `System architecture design for ${systemCount} integrated system${systemCount !== 1 ? 's' : ''}`,
        'Integration mapping & technical specification',
        'Data migration & preparation plan',
      ],
      milestone: 'Architecture approved',
    },
    {
      number: 2, title: 'Core Development', weeks: `Week 3-${Math.min(5, 2 + systemCount)}`,
      cost: Math.round(9800 * baseMultiplier / 100) * 100,
      deliverables: [
        'Core AI model training & configuration',
        'Primary system build & unit testing',
        'API integrations (CRM, messaging, analytics)',
        'Admin dashboard development',
      ],
      milestone: 'Core systems demo',
    },
    {
      number: 3, title: 'Integration & QA', weeks: `Week ${Math.min(5, 2 + systemCount) + 1}-${Math.min(7, 4 + systemCount)}`,
      cost: Math.round(7200 * baseMultiplier / 100) * 100,
      deliverables: [
        'Cross-system integration testing',
        'CRM & data sync verification',
        'Conversation flow QA (500+ test scenarios)',
        'Performance & load testing',
      ],
      milestone: 'All systems integrated',
    },
    {
      number: 4, title: 'Launch & Optimization', weeks: `Week ${Math.min(7, 4 + systemCount) + 1}-${Math.min(8, 5 + systemCount)}`,
      cost: Math.round(4300 * baseMultiplier / 100) * 100,
      deliverables: [
        'Production deployment (zero-downtime)',
        'Team training (2 live sessions + recorded)',
        '30-day optimization period',
        'Performance monitoring dashboard',
      ],
      milestone: 'Go-live & handoff complete',
    },
  ];
}

function generateProposalId(companyName: string): string {
  const prefix = companyName.slice(0, 3).toUpperCase().replace(/[^A-Z]/g, 'X') || 'SUN';
  return `SUN-2026-0307-${prefix}`;
}

/* ────────── SECTION COMPONENTS ────────── */

function MetricCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 p-5 rounded-lg text-center border"
      style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E8E4' }}
    >
      <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#6B6B63' }}>{label}</p>
      <p className="text-2xl mb-1" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#1A1A1A' }}>{value}</p>
      <p className="text-xs" style={{ color: '#9CA39B' }}>{sub}</p>
    </motion.div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6 mt-12 first:mt-0">
      <div className="w-1 h-5 rounded-full" style={{ backgroundColor: '#00875A' }} />
      <h2 className="text-xs uppercase tracking-[0.2em]" style={{ color: '#1A1A1A' }}>
        {children}
      </h2>
    </div>
  );
}

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="border rounded-lg p-5 mb-4"
      style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E8E4' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#00875A' }}>
            Phase {phase.number}
          </p>
          <p style={{ color: '#1A1A1A', fontFamily: 'Georgia, serif' }}>{phase.title}</p>
        </div>
        <div className="text-right">
          <p className="text-xs" style={{ color: '#6B6B63' }}>{phase.weeks}</p>
          <p className="mt-0.5" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#1A1A1A' }}>
            ${phase.cost.toLocaleString()}
          </p>
        </div>
      </div>
      <ul className="space-y-1.5 mb-3">
        {phase.deliverables.map((d, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#4A4A44' }}>
            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: '#9CA39B' }} />
            {d}
          </li>
        ))}
      </ul>
      <div className="pt-3 border-t flex items-center gap-2" style={{ borderColor: '#E8E8E4' }}>
        <Check className="w-3.5 h-3.5" style={{ color: '#00875A' }} />
        <span className="text-xs" style={{ color: '#00875A' }}>Milestone: {phase.milestone}</span>
      </div>
    </motion.div>
  );
}

/* ────────── MAIN COMPONENT ────────── */

export default function ProposalPage() {
  const { state } = useWizard();
  const { step1, step3, diagnosticSignals } = state;
  const selectedSystems = AI_SYSTEMS.filter(s => step3.selectedSystems.includes(s.id));

  const companyName = step1.companyName || 'Your Company';
  const industryLabel = step1.industry?.replace(/-/g, ' ') || 'your industry';
  const systemCount = selectedSystems.length || 3;

  const phases = useMemo(() => generatePhases(systemCount), [systemCount]);
  const totalCost = phases.reduce((sum, p) => sum + p.cost, 0);
  const deposit = Math.round(totalCost * 0.3 / 100) * 100;
  const totalWeeks = Math.min(8, 5 + systemCount);
  const proposalId = generateProposalId(companyName);

  // Start date = next Monday
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + ((8 - startDate.getDay()) % 7 || 7));
  const startDateStr = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Validity date (14 days)
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 14);
  const validStr = validUntil.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Payment schedule
  const milestones = [
    { label: 'Deposit (30%)', amount: deposit, trigger: 'on acceptance' },
    { label: 'Milestone 1 (25%)', amount: Math.round(totalCost * 0.25 / 100) * 100, trigger: 'architecture approved' },
    { label: 'Milestone 2 (25%)', amount: Math.round(totalCost * 0.25 / 100) * 100, trigger: 'core systems demo' },
    { label: 'Final (20%)', amount: Math.round(totalCost * 0.2 / 100) * 100, trigger: 'go-live complete' },
  ];

  // Included items
  const includedItems = [
    'Source code ownership', '30-day post-launch support',
    'Complete documentation', '2 live training sessions',
    'Production deployment', 'Dedicated Slack channel',
    'Performance monitoring', 'Recorded training videos',
    'Architecture diagrams', 'Knowledge base setup',
  ];

  // Outcomes
  const outcomes = [
    { value: '60-80%', label: 'customer support automated' },
    { value: '10-15%', label: 'abandoned cart recovery' },
    { value: '10-30%', label: 'average order value increase' },
  ];

  const systemIcons: Record<string, typeof MessageSquare> = {
    'support-engine': MessageSquare,
    'cart-recovery': ShoppingCart,
    'recommendation-engine': Sparkles,
    'lead-scoring': Target,
    'loyalty-system': Users,
    'analytics-brain': Brain,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F5F0' }}>
      {/* Header */}
      <header className="border-b sticky top-0 z-10" style={{ borderColor: '#E8E8E4', backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" style={{ color: '#1A1A1A' }}>
            <Sun className="w-5 h-5" style={{ color: '#00875A' }} />
            <span style={{ fontFamily: 'Georgia, serif' }}>AMO AI</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-colors hover:bg-gray-50"
              style={{ borderColor: '#E8E8E4', color: '#6B6B63' }}
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
            <button
              onClick={() => { navigator.clipboard.writeText(window.location.href); }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-colors hover:bg-gray-50"
              style={{ borderColor: '#E8E8E4', color: '#6B6B63' }}
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </div>
      </header>

      {/* Proposal Document */}
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {/* Title Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.25em] mb-4" style={{ color: '#00875A' }}>
            Project Proposal
          </p>
          <h1
            className="text-3xl sm:text-4xl mb-3"
            style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A' }}
          >
            AI Systems for {companyName}
          </h1>
          <p className="text-sm" style={{ color: '#9CA39B' }}>
            Prepared {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <div className="w-16 h-0.5 mx-auto mt-6" style={{ backgroundColor: '#00875A' }} />
        </motion.div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <MetricCard label="Investment" value={`$${totalCost.toLocaleString()}`} sub={`deposit: $${deposit.toLocaleString()} (30%)`} />
          <MetricCard label="Timeline" value={`${totalWeeks} weeks`} sub={`${phases.length} phases`} />
          <MetricCard label="Start Date" value={startDateStr} sub="pending acceptance" />
        </div>

        <div className="w-full h-px" style={{ backgroundColor: '#E8E8E4' }} />

        {/* Executive Summary */}
        <SectionHeading>Executive Summary</SectionHeading>
        <p className="text-sm leading-relaxed mb-4" style={{ color: '#4A4A44' }}>
          {companyName} requires a comprehensive AI transformation focused on{' '}
          {diagnosticSignals.slice(0, 3).map(s => s.label.toLowerCase()).join(', ') || 'customer experience optimization, support automation, and revenue growth'}.
          Based on your diagnostic results{diagnosticSignals.length > 0 ? ` — including ${diagnosticSignals.map(s => s.label.toLowerCase()).join(', ')}` : ''} — we've
          designed a {systemCount}-system solution delivered in {phases.length} phases over {totalWeeks} weeks.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: '#4A4A44' }}>
          Expected impact: 60-80% support automation, 10-15% cart recovery, and 10-30% average order value increase,
          translating to an estimated $2,000-$8,000/month in additional revenue within 90 days.
        </p>

        {/* Scope Breakdown */}
        <SectionHeading>Scope Breakdown</SectionHeading>
        {phases.map((phase, i) => (
          <PhaseCard key={phase.number} phase={phase} index={i} />
        ))}

        {/* Timeline Gantt */}
        <SectionHeading>Timeline</SectionHeading>
        <div className="border rounded-lg p-5 mb-4" style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E8E4' }}>
          <div className="space-y-3">
            {phases.map((phase) => {
              // Parse week ranges for bar positioning
              const weekMatch = phase.weeks.match(/(\d+)-?(\d+)?/);
              const startWeek = weekMatch ? parseInt(weekMatch[1]) : 1;
              const endWeek = weekMatch && weekMatch[2] ? parseInt(weekMatch[2]) : startWeek;
              const barLeft = ((startWeek - 1) / totalWeeks) * 100;
              const barWidth = ((endWeek - startWeek + 1) / totalWeeks) * 100;

              return (
                <div key={phase.number} className="flex items-center gap-3">
                  <span className="text-xs w-6 text-right shrink-0" style={{ color: '#9CA39B' }}>
                    P{phase.number}
                  </span>
                  <div className="flex-1 h-7 rounded relative" style={{ backgroundColor: '#F5F5F0' }}>
                    <motion.div
                      className="absolute top-0 h-full rounded flex items-center px-2"
                      style={{
                        left: `${barLeft}%`,
                        width: `${barWidth}%`,
                        backgroundColor: phase.number === 1 ? '#00875A' : phase.number === 2 ? '#00875A' : phase.number === 3 ? '#4AA882' : '#7DC4A8',
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.2 * phase.number, duration: 0.5 }}
                      // @ts-ignore
                      style2={{ transformOrigin: 'left' }}
                    >
                      <span className="text-[10px] text-white truncate">{phase.title}</span>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Week labels */}
          <div className="flex mt-2 ml-9">
            {Array.from({ length: totalWeeks }, (_, i) => (
              <div key={i} className="flex-1 text-center">
                <span className="text-[10px]" style={{ color: '#9CA39B' }}>W{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Systems Included */}
        <SectionHeading>Systems Included</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {selectedSystems.map((sys, i) => {
            const SysIcon = systemIcons[sys.id] || Shield;
            return (
              <motion.div
                key={sys.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="border rounded-lg p-4"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E8E4' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <SysIcon className="w-4 h-4" style={{ color: '#00875A' }} />
                  <span className="text-sm" style={{ color: '#1A1A1A' }}>{sys.name}</span>
                </div>
                <p className="text-xs mb-3" style={{ color: '#6B6B63' }}>{sys.description}</p>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: sys.impact === 'High' ? 'rgba(0,135,90,0.1)' : 'rgba(200,170,0,0.1)',
                      color: sys.impact === 'High' ? '#00875A' : '#8B7500',
                    }}
                  >
                    Impact: {sys.impact}
                  </span>
                  <span className="text-[10px]" style={{ color: '#9CA39B' }}>{sys.timeline}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* If no systems selected, show placeholder */}
        {selectedSystems.length === 0 && (
          <div className="border rounded-lg p-6 text-center mb-4" style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E8E4' }}>
            <p className="text-sm" style={{ color: '#9CA39B' }}>
              No systems were selected in the wizard. Please return to configure your project.
            </p>
          </div>
        )}

        {/* What's Included */}
        <SectionHeading>What's Included</SectionHeading>
        <div className="border rounded-lg p-5 mb-4" style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E8E4' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {includedItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 shrink-0" style={{ color: '#00875A' }} />
                <span className="text-sm" style={{ color: '#4A4A44' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Investment */}
        <SectionHeading>Investment</SectionHeading>
        <div className="border rounded-lg p-5 mb-4" style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E8E4' }}>
          {/* Phase breakdown */}
          <div className="space-y-2.5 mb-5">
            {phases.map((phase) => (
              <div key={phase.number} className="flex justify-between items-center text-sm">
                <span style={{ color: '#4A4A44' }}>
                  Phase {phase.number}: {phase.title}
                </span>
                <span
                  className="flex items-center gap-1"
                  style={{ fontFamily: 'JetBrains Mono, monospace', color: '#1A1A1A' }}
                >
                  <span className="mr-6" style={{ color: '#E8E8E4' }}>
                    {'·'.repeat(6)}
                  </span>
                  ${phase.cost.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 flex justify-between items-center" style={{ borderColor: '#E8E8E4' }}>
            <span style={{ color: '#1A1A1A' }}>Total Investment</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#1A1A1A' }}>
              ${totalCost.toLocaleString()}
            </span>
          </div>

          {/* Payment schedule */}
          <div className="mt-6 pt-5 border-t" style={{ borderColor: '#E8E8E4' }}>
            <p className="text-xs uppercase tracking-wider mb-3" style={{ color: '#6B6B63' }}>
              Payment Schedule
            </p>
            <div className="space-y-2">
              {milestones.map((m, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div>
                    <span style={{ color: '#4A4A44' }}>{m.label}</span>
                    <span className="text-xs ml-2" style={{ color: '#9CA39B' }}>— {m.trigger}</span>
                  </div>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#1A1A1A' }}>
                    ${m.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expected Outcomes */}
        <SectionHeading>Expected Outcomes</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {outcomes.map((o, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="border rounded-lg p-5 text-center"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E8E4' }}
            >
              <p className="text-2xl mb-1" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00875A' }}>
                {o.value}
              </p>
              <p className="text-xs" style={{ color: '#6B6B63' }}>{o.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-sm mb-2" style={{ color: '#4A4A44' }}>
          Estimated monthly impact: <strong>$2,000 – $8,000</strong> additional revenue
        </p>
        <p className="text-sm" style={{ color: '#9CA39B' }}>
          ROI breakeven: 3-4 months
        </p>

        {/* Divider */}
        <div className="w-full h-px my-12" style={{ backgroundColor: '#E8E8E4' }} />

        {/* CTAs */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: '#1A1A1A' }}>
            Next Steps
          </p>

          {/* Primary CTA */}
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded text-sm transition-all"
            style={{ backgroundColor: '#00875A', color: '#FFFFFF' }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#006B47';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,135,90,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#00875A';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Accept Proposal & Pay Deposit (${deposit.toLocaleString()})
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="my-4">
            <span className="text-xs" style={{ color: '#9CA39B' }}>or</span>
          </div>

          {/* Secondary CTA */}
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm border transition-colors hover:bg-gray-50"
            style={{ borderColor: '#E8E8E4', color: '#1A1A1A' }}
          >
            <Phone className="w-4 h-4" />
            Have questions? Book a 30-min strategy call instead
          </Link>

          {/* Validity */}
          <div className="mt-8 space-y-1">
            <p className="text-xs" style={{ color: '#9CA39B' }}>
              This proposal is valid for 14 days (until {validStr}).
            </p>
            <p className="text-xs" style={{ color: '#9CA39B' }}>
              Proposal ID: {proposalId}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t text-center" style={{ borderColor: '#E8E8E4' }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sun className="w-4 h-4" style={{ color: '#00875A' }} />
            <span className="text-sm" style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A' }}>
              AMO AI
            </span>
          </div>
          <p className="text-xs" style={{ color: '#9CA39B' }}>
            www.amoai.ca · Contact via website
          </p>
        </div>
      </div>
    </div>
  );
}