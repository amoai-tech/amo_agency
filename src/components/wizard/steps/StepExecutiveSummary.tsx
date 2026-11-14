// C33 — Step 4: Executive Summary / Strategy Brief
// White document panel with 7 sections, inline editing, approval flow
// NOW WIRED: Calls /readiness-score for live AI readiness assessment

import { useState, useRef, useEffect, useMemo, useCallback, forwardRef } from 'react';
import { useWizard } from '../WizardContext';
import { WizardLayout } from '../WizardLayout';
import { AI_SYSTEMS, ROADMAP_PHASES } from '../data/wizardData';
import { motion, AnimatePresence } from 'motion/react';
import { aiApi } from '../../../lib/supabase';
import { AITeamSection } from '../../shared/agents/AITeamSection';
import {
  Pencil, Check, X, Clock, ShoppingCart, RefreshCw, DollarSign,
  FileText, Printer, Share2, ArrowRight, Loader2, AlertCircle, BarChart3
} from 'lucide-react';

interface ReadinessData {
  overallScore: number;
  scoreBreakdown: Record<string, { score: number; label: string }>;
  maturityLevel: string;
  gaps: { area: string; description: string; priority: string }[];
  strengths: string[];
  nextSteps: string[];
}

export function StepExecutiveSummary() {
  const { state, updateStep4, sessionId } = useWizard();
  const { step1, step3, step4, diagnosticSignals } = state;
  const selectedSystems = AI_SYSTEMS.filter(s => step3.selectedSystems.includes(s.id));

  const [activeSection, setActiveSection] = useState('executive-summary');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const hasSelectedSystems = step3.selectedSystems.length > 0;

  // ── AI Readiness Score State ──
  const [readiness, setReadiness] = useState<ReadinessData | null>(null);
  const [readinessLoading, setReadinessLoading] = useState(false);
  const [readinessError, setReadinessError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  // Fetch readiness score on mount (once per session)
  useEffect(() => {
    if (fetchedRef.current || !sessionId) return;
    fetchedRef.current = true;

    async function fetchReadiness() {
      setReadinessLoading(true);
      setReadinessError(null);
      try {
        const { data, error } = await aiApi.readinessScore(sessionId!);
        if (error) {
          console.error('[Step4] Readiness score error:', error);
          setReadinessError(error);
        } else if (data && typeof data === 'object') {
          const result = (data as any).readiness as ReadinessData;
          if (result) setReadiness(result);
        }
      } catch (e) {
        console.error('[Step4] Readiness fetch exception:', e);
        setReadinessError(String(e));
      } finally {
        setReadinessLoading(false);
      }
    }
    fetchReadiness();
  }, [sessionId]);

  // Generate brief content
  const briefContent = useMemo(() => ({
    executiveSummary: step4.briefEdits['executive-summary'] ||
      `${step1.companyName || 'Your company'} is a ${step1.companySize || 'growing'} ${step1.industry?.replace(/-/g, ' ') || 'business'} focused on ${step1.goal?.replace(/-/g, ' ') || 'growth'}. Based on our analysis, the primary opportunity areas are ${diagnosticSignals.slice(0, 3).map(s => s.label.toLowerCase()).join(', ') || 'support automation and revenue optimization'}. We recommend ${selectedSystems.length} AI-powered systems targeting customer experience and revenue growth.${readiness ? ` Your current AI readiness score is ${readiness.overallScore}/100 (${readiness.maturityLevel}).` : ' The proposed roadmap spans 12 weeks with estimated ROI within 90 days of launch.'}`,
    industryAnalysis: step4.briefEdits['industry-analysis'] ||
      `Based on our diagnostic of your ${step1.industry?.replace(/-/g, ' ') || 'industry'} operations, we've identified ${diagnosticSignals.length} key signals indicating significant AI automation potential.`,
    outcomes: step4.briefEdits['outcomes'] ||
      `At your current scale, these improvements typically translate to significant operational savings and revenue uplift within 90 days of launch.`,
  }), [step1, step3, step4.briefEdits, diagnosticSignals, selectedSystems, readiness]);

  // Scrollspy
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { threshold: 0.3 });

    Object.values(sectionRefs.current).forEach(el => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleEdit = useCallback((sectionId: string, value: string) => {
    updateStep4({
      briefEdits: { ...step4.briefEdits, [sectionId]: value },
      briefVersion: step4.briefVersion + 1,
    });
    setEditingSection(null);
  }, [step4, updateStep4]);

  const handleApprove = useCallback(() => {
    updateStep4({ briefApproved: true, briefStatus: 'approved' });
  }, [updateStep4]);

  const handleRequestChanges = useCallback(() => {
    updateStep4({ briefStatus: 'in-review' });
  }, [updateStep4]);

  const retryReadiness = useCallback(async () => {
    if (!sessionId) return;
    fetchedRef.current = false;
    setReadinessLoading(true);
    setReadinessError(null);
    try {
      const { data, error } = await aiApi.readinessScore(sessionId);
      if (error) {
        setReadinessError(error);
      } else if (data && typeof data === 'object') {
        const result = (data as any).readiness as ReadinessData;
        if (result) setReadiness(result);
      }
    } catch (e) {
      setReadinessError(String(e));
    } finally {
      setReadinessLoading(false);
    }
  }, [sessionId]);

  const scrollToSection = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const SECTIONS = [
    { id: 'executive-summary', label: 'Executive Summary' },
    { id: 'company-profile', label: 'Company Profile' },
    { id: 'industry-analysis', label: 'Industry Analysis' },
    { id: 'ai-readiness', label: 'AI Readiness Score' },
    { id: 'recommended-systems', label: 'Recommended Systems' },
    ...(hasSelectedSystems ? [{ id: 'your-ai-team', label: 'Your AI Team' }] : []),
    { id: 'proposed-roadmap', label: 'Proposed Roadmap' },
    { id: 'expected-outcomes', label: 'Expected Outcomes' },
    { id: 'next-steps', label: 'Next Steps' },
  ];

  const statusBadge = {
    draft: { label: 'Draft', color: '#D97706', bg: '#FEF9E7' },
    'in-review': { label: 'In Review', color: '#2563EB', bg: '#EFF6FF' },
    approved: { label: 'Approved', color: '#00875A', bg: '#E6F4ED' },
  }[step4.briefStatus];

  /* ────── Score color helper ────── */
  const scoreColor = (score: number) =>
    score >= 75 ? '#00875A' : score >= 50 ? '#D97706' : '#DC2626';

  /* ────── Right Panel ────── */
  const rightPanel = (
    <div className="space-y-6">
      {/* TOC */}
      <div>
        <p className="text-sm mb-4" style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A' }}>Brief Guide</p>
        <div className="space-y-0.5">
          {SECTIONS.map(sec => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="w-full text-left px-3 py-1.5 text-xs rounded transition-all"
              style={{
                color: activeSection === sec.id ? '#00875A' : '#6B6B63',
                backgroundColor: activeSection === sec.id ? '#F0FAF5' : 'transparent',
                borderLeft: activeSection === sec.id ? '2px solid #00875A' : '2px solid transparent',
              }}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* Readiness Score Summary (right panel) */}
      {readiness && (
        <div className="border-t pt-4" style={{ borderColor: '#F0F0EC' }}>
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#00875A', letterSpacing: '0.08em' }}>
            AI Readiness
          </p>
          <div className="text-center mb-3">
            <span
              className="text-3xl"
              style={{ fontFamily: 'JetBrains Mono, monospace', color: scoreColor(readiness.overallScore) }}
            >
              {readiness.overallScore}
            </span>
            <span className="text-sm" style={{ color: '#9CA39B' }}> / 100</span>
          </div>
          <p className="text-xs text-center capitalize" style={{ color: '#6B6B63' }}>
            {readiness.maturityLevel} maturity
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="border-t pt-4 space-y-2" style={{ borderColor: '#F0F0EC' }}>
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#00875A', letterSpacing: '0.08em' }}>
          Document Actions
        </p>
        {[
          { icon: FileText, label: 'Export as PDF' },
          { icon: Printer, label: 'Print' },
          { icon: Share2, label: 'Share Link' },
        ].map(act => (
          <button
            key={act.label}
            className="w-full flex items-center gap-2 px-3 py-2 border rounded text-xs transition-colors hover:bg-gray-50"
            style={{ borderColor: '#E8E8E4', borderRadius: '4px', color: '#6B6B63' }}
          >
            <act.icon className="w-3.5 h-3.5" />
            {act.label}
          </button>
        ))}
      </div>

      {/* Version History */}
      <div className="border-t pt-4" style={{ borderColor: '#F0F0EC' }}>
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#00875A', letterSpacing: '0.08em' }}>
          Version History
        </p>
        <p className="text-xs" style={{ color: '#6B6B63' }}>
          Version {step4.briefVersion} — Current {step4.briefStatus === 'draft' ? 'Draft' : step4.briefStatus === 'approved' ? '(Approved)' : '(In Review)'}
        </p>
        <p className="text-xs" style={{ color: '#9CA39B' }}>Created Mar 7, 2026</p>
      </div>
    </div>
  );

  return (
    <WizardLayout rightPanel={rightPanel}>
      <div className="space-y-0">
        {/* Status badge */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-xs tracking-widest uppercase" style={{ color: '#00875A', letterSpacing: '0.08em' }}>
            Executive Summary
          </p>
          <span className="text-xs px-2.5 py-1 rounded" style={{ color: statusBadge.color, backgroundColor: statusBadge.bg, borderRadius: '2px' }}>
            {statusBadge.label}
          </span>
        </div>

        {/* ═══ DOCUMENT CONTAINER ═══ */}
        <div className="border rounded p-6 sm:p-8 space-y-8" style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E8E4', borderRadius: '4px' }}>

          {/* Brief Header */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#00875A', letterSpacing: '0.1em' }}>
              Strategy Brief
            </p>
            <h2 className="text-2xl mb-1" style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontWeight: 400 }}>
              {step1.companyName || 'Your Company'}
            </h2>
            <p className="text-sm" style={{ color: '#9CA39B' }}>
              Prepared by AMO AI
            </p>
            <p className="text-sm" style={{ color: '#9CA39B' }}>March 7, 2026</p>
            <div className="mt-3 h-0.5 w-16" style={{ backgroundColor: '#00875A' }} />
          </div>

          {/* ─── Section 1: Executive Summary ─── */}
          <BriefSection
            id="executive-summary"
            title="Executive Summary"
            editable
            content={briefContent.executiveSummary}
            isEditing={editingSection === 'executive-summary'}
            onStartEdit={() => setEditingSection('executive-summary')}
            onSave={(v) => handleEdit('executive-summary', v)}
            onCancel={() => setEditingSection(null)}
            ref={(el) => { sectionRefs.current['executive-summary'] = el; }}
          />

          {/* ─── Section 2: Company Profile ─── */}
          <div id="company-profile" ref={(el) => { sectionRefs.current['company-profile'] = el; }}>
            <SectionHeading title="Company Profile" />
            <div className="space-y-2 mt-3">
              {[
                ['Company', step1.companyName || '—'],
                ['Industry', step1.industry?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || '—'],
                ['Size', `${(step1.companySize || '').charAt(0).toUpperCase() + (step1.companySize || '').slice(1)}`],
                ['Goal', step1.goal?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || '—'],
                ['Website', step1.websiteUrl || 'Not provided'],
              ].map(([label, value]) => (
                <div key={label} className="flex border-b py-2 text-sm" style={{ borderColor: '#F0F0EC' }}>
                  <span className="w-28 shrink-0" style={{ color: '#9CA39B' }}>{label}</span>
                  <span style={{ color: '#1A1A1A' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Section 3: Industry Analysis ─── */}
          <div id="industry-analysis" ref={(el) => { sectionRefs.current['industry-analysis'] = el; }}>
            <BriefSection
              id="industry-analysis"
              title="Industry Analysis"
              editable
              content={briefContent.industryAnalysis}
              isEditing={editingSection === 'industry-analysis'}
              onStartEdit={() => setEditingSection('industry-analysis')}
              onSave={(v) => handleEdit('industry-analysis', v)}
              onCancel={() => setEditingSection(null)}
            />
            {/* Findings with severity dots */}
            <div className="mt-3 space-y-2">
              {diagnosticSignals.map(sig => (
                <div key={sig.id} className="flex items-start gap-2">
                  <span
                    className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: sig.severity === 'high' ? '#DC2626' : '#D97706' }}
                  />
                  <span className="text-sm" style={{ color: '#1A1A1A' }}>{sig.label} — {sig.recommendation}</span>
                </div>
              ))}
              {diagnosticSignals.length === 0 && (
                <p className="text-sm" style={{ color: '#9CA39B' }}>Complete Step 2 diagnostics to see findings.</p>
              )}
            </div>
          </div>

          {/* ─── Section 3.5: AI Readiness Score ─── */}
          <div id="ai-readiness" ref={(el) => { sectionRefs.current['ai-readiness'] = el; }}>
            <SectionHeading title="AI Readiness Score" />

            {readinessLoading && (
              <div className="mt-4 flex items-center gap-3 px-4 py-6 border rounded text-center justify-center" style={{ borderColor: '#E8E8E4', borderRadius: '4px', backgroundColor: '#FAFAF8' }}>
                <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#00875A' }} />
                <span className="text-sm" style={{ color: '#6B6B63' }}>Generating AI readiness assessment…</span>
              </div>
            )}

            {readinessError && !readinessLoading && (
              <div className="mt-4 border rounded p-4 space-y-3" style={{ borderColor: '#E8E8E4', borderRadius: '4px', backgroundColor: '#FAFAF8' }}>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#D97706' }} />
                  <div>
                    <p className="text-sm" style={{ color: '#1A1A1A' }}>Readiness assessment unavailable</p>
                    <p className="text-xs mt-1" style={{ color: '#9CA39B' }}>
                      {readinessError.includes('Network') ? 'Check your connection and try again.' : 'The AI assessment could not be completed. Your brief is still valid without it.'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={retryReadiness}
                  className="text-xs px-3 py-1.5 border rounded transition-colors hover:bg-gray-50"
                  style={{ borderColor: '#E8E8E4', borderRadius: '4px', color: '#00875A' }}
                >
                  Retry Assessment
                </button>
              </div>
            )}

            {readiness && !readinessLoading && (
              <div className="mt-4 space-y-4">
                {/* Overall Score */}
                <div className="border rounded p-5 text-center" style={{ borderColor: '#E8E8E4', borderRadius: '4px' }}>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#9CA39B', letterSpacing: '0.08em' }}>Overall Score</p>
                  <span
                    className="text-4xl"
                    style={{ fontFamily: 'JetBrains Mono, monospace', color: scoreColor(readiness.overallScore) }}
                  >
                    {readiness.overallScore}
                  </span>
                  <span className="text-lg" style={{ color: '#9CA39B' }}> / 100</span>
                  <p className="text-sm mt-1 capitalize" style={{ color: '#6B6B63' }}>
                    {readiness.maturityLevel} maturity level
                  </p>
                </div>

                {/* Score Breakdown */}
                {readiness.scoreBreakdown && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(readiness.scoreBreakdown).map(([key, dim]) => (
                      <div key={key} className="border rounded p-3" style={{ borderColor: '#E8E8E4', borderRadius: '4px' }}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs" style={{ color: '#6B6B63' }}>{dim.label}</span>
                          <span
                            className="text-sm"
                            style={{ fontFamily: 'JetBrains Mono, monospace', color: scoreColor(dim.score) }}
                          >
                            {dim.score}
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: '#F0F0EC' }}>
                          <div
                            className="h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${dim.score}%`, backgroundColor: scoreColor(dim.score) }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Strengths & Gaps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {readiness.strengths && readiness.strengths.length > 0 && (
                    <div className="border rounded p-4" style={{ borderColor: '#E8E8E4', borderRadius: '4px' }}>
                      <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#00875A', letterSpacing: '0.08em' }}>Strengths</p>
                      <ul className="space-y-1.5">
                        {readiness.strengths.map((s, i) => (
                          <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: '#1A1A1A' }}>
                            <Check className="w-3 h-3 mt-0.5 shrink-0" style={{ color: '#00875A' }} />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {readiness.gaps && readiness.gaps.length > 0 && (
                    <div className="border rounded p-4" style={{ borderColor: '#E8E8E4', borderRadius: '4px' }}>
                      <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#D97706', letterSpacing: '0.08em' }}>Gaps to Address</p>
                      <ul className="space-y-1.5">
                        {readiness.gaps.map((g, i) => (
                          <li key={i} className="text-xs" style={{ color: '#1A1A1A' }}>
                            <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{
                              backgroundColor: g.priority === 'high' ? '#DC2626' : g.priority === 'medium' ? '#D97706' : '#9CA39B'
                            }} />
                            {g.area}: {g.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!readiness && !readinessLoading && !readinessError && !sessionId && (
              <p className="text-sm mt-3" style={{ color: '#9CA39B' }}>
                AI readiness scoring requires a saved session. Your progress will be scored once saved to cloud.
              </p>
            )}
          </div>

          {/* ─── Section 4: Recommended Systems ─── */}
          <div id="recommended-systems" ref={(el) => { sectionRefs.current['recommended-systems'] = el; }}>
            <SectionHeading title="Recommended Systems" />
            <div className="mt-3 space-y-3">
              {selectedSystems.map((sys, idx) => {
                const Icon = sys.icon;
                return (
                  <div key={sys.id} className="flex items-start gap-3 py-2 border-b" style={{ borderColor: '#F0F0EC' }}>
                    <span className="text-xs px-1.5 py-0.5 rounded shrink-0" style={{ backgroundColor: '#E6F4ED', color: '#00875A', borderRadius: '2px' }}>
                      #{idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm" style={{ color: '#1A1A1A' }}>{sys.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#6B6B63' }}>{sys.whyItFits}</p>
                      <div className="flex gap-2 mt-1.5">
                        <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: '#F5F5F0', borderRadius: '2px' }}>
                          Impact: {sys.impact}
                        </span>
                        <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: '#F5F5F0', borderRadius: '2px' }}>
                          Effort: {sys.effort}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {selectedSystems.length === 0 && (
                <p className="text-sm" style={{ color: '#9CA39B' }}>Select systems in Step 3.</p>
              )}
            </div>
          </div>

          {/* ─── Section 4.5: Your AI Team ─── */}
          {hasSelectedSystems && (
            <div id="your-ai-team" ref={(el) => { sectionRefs.current['your-ai-team'] = el; }}>
              <AITeamSection
                industry={step1.industry || ''}
                goals={step1.goal ? [step1.goal] : []}
                companySize={step1.companySize || ''}
                systemIds={step3.selectedSystems}
                companyName={step1.companyName || ''}
              />
            </div>
          )}

          {/* ─── Section 5: Proposed Roadmap ─── */}
          <div id="proposed-roadmap" ref={(el) => { sectionRefs.current['proposed-roadmap'] = el; }}>
            <SectionHeading title="Proposed Roadmap" />
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              {ROADMAP_PHASES.map((phase, idx) => (
                <div key={phase.number} className="flex-1 flex items-stretch">
                  <div
                    className="flex-1 border rounded p-4"
                    style={{
                      borderColor: idx === 0 ? '#00875A' : '#E8E8E4',
                      borderRadius: '4px',
                      borderWidth: idx === 0 ? '2px' : '1px',
                    }}
                  >
                    <p className="text-xs tracking-widest uppercase" style={{ color: '#00875A', letterSpacing: '0.08em' }}>
                      Phase {phase.number}
                    </p>
                    <p className="text-sm mt-1" style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A' }}>
                      {phase.title}
                    </p>
                    <p className="text-xs mt-1" style={{ color: '#9CA39B' }}>{phase.weeks}</p>
                    <ul className="mt-2 space-y-1">
                      {phase.outcomes.map(o => (
                        <li key={o} className="text-xs flex items-center gap-1" style={{ color: '#6B6B63' }}>
                          <span style={{ color: '#00875A' }}>&#8226;</span> {o}
                        </li>
                      ))}
                    </ul>
                    {idx === 0 && (
                      <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#E6F4ED', color: '#00875A', borderRadius: '2px' }}>
                        Current
                      </span>
                    )}
                  </div>
                  {idx < ROADMAP_PHASES.length - 1 && (
                    <div className="hidden sm:flex items-center px-1">
                      <ArrowRight className="w-4 h-4" style={{ color: '#E8E8E4' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ─── Section 6: Expected Outcomes ─── */}
          <div id="expected-outcomes" ref={(el) => { sectionRefs.current['expected-outcomes'] = el; }}>
            <SectionHeading title="Expected Outcomes" editable onEdit={() => setEditingSection('outcomes')} />
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { icon: Clock, metric: 'Support Response', value: '80% faster' },
                { icon: ShoppingCart, metric: 'Cart Recovery', value: '10-15% recovered' },
                { icon: RefreshCw, metric: 'Repeat Purchase', value: '25-40% increase' },
                { icon: DollarSign, metric: 'Average Order Value', value: '10-30% higher' },
              ].map(item => (
                <div key={item.metric} className="border rounded p-4 text-center" style={{ borderColor: '#E8E8E4', borderRadius: '4px' }}>
                  <item.icon className="w-5 h-5 mx-auto mb-2" style={{ color: '#00875A' }} />
                  <p className="text-xs mb-1" style={{ color: '#9CA39B' }}>{item.metric}</p>
                  <p className="text-lg" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#1A1A1A' }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm mt-3" style={{ color: '#6B6B63' }}>{briefContent.outcomes}</p>
          </div>

          {/* ─── Section 7: Next Steps ─── */}
          <div id="next-steps" ref={(el) => { sectionRefs.current['next-steps'] = el; }}>
            <SectionHeading title="Next Steps" />
            <p className="text-sm mt-3 mb-3" style={{ color: '#6B6B63' }}>
              Upon approval of this brief, your project will be created and your dashboard activated.
            </p>
            <div className="space-y-2">
              {(readiness?.nextSteps || [
                'Project created with selected systems',
                'Roadmap phases and milestones set',
                'Initial tasks generated for Phase 1',
                'Dashboard access enabled',
              ]).map(item => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: '#00875A' }} />
                  <span className="text-sm" style={{ color: '#1A1A1A' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ APPROVAL SECTION ═══ */}
          <div className="border-t pt-6 mt-8" style={{ borderColor: '#E8E8E4' }}>
            <div className="border rounded p-6 text-center space-y-4" style={{ borderColor: '#E8E8E4', borderRadius: '4px', backgroundColor: '#FAFAF8' }}>
              <h3 className="text-lg" style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A' }}>
                Ready to proceed?
              </h3>
              <p className="text-sm" style={{ color: '#6B6B63' }}>
                By approving this brief, your project will be created and you'll enter your dashboard.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleRequestChanges}
                  className="px-5 py-2.5 text-sm border rounded transition-colors hover:bg-gray-50"
                  style={{ borderColor: '#1A1A1A', color: '#1A1A1A', borderRadius: '4px' }}
                >
                  Request Changes
                </button>
                <button
                  onClick={handleApprove}
                  className="px-5 py-2.5 text-sm rounded transition-colors flex items-center gap-2"
                  style={{
                    backgroundColor: step4.briefApproved ? '#E6F4ED' : '#00875A',
                    color: step4.briefApproved ? '#00875A' : '#FFFFFF',
                    borderRadius: '4px',
                  }}
                >
                  {step4.briefApproved ? (
                    <><Check className="w-4 h-4" /> Approved</>
                  ) : (
                    'Approve Brief'
                  )}
                </button>
              </div>
              <p className="text-xs" style={{ color: '#9CA39B' }}>
                You can edit any section above before approving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </WizardLayout>
  );
}

/* ────── Section Heading ────── */

function SectionHeading({ title, editable, onEdit }: { title: string; editable?: boolean; onEdit?: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg" style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A' }}>
        {title}
      </h3>
      {editable && (
        <button onClick={onEdit} className="p-1 rounded hover:bg-gray-100 transition-colors">
          <Pencil className="w-3.5 h-3.5" style={{ color: '#9CA39B' }} />
        </button>
      )}
    </div>
  );
}

/* ────── Brief Section (with inline editing) ────── */

const BriefSection = forwardRef<HTMLDivElement, {
  id: string; title: string; editable?: boolean;
  content: string; isEditing: boolean;
  onStartEdit: () => void; onSave: (v: string) => void; onCancel: () => void;
}>(({ id, title, editable, content, isEditing, onStartEdit, onSave, onCancel }, ref) => {
  const [editValue, setEditValue] = useState(content);

  useEffect(() => { setEditValue(content); }, [content]);

  return (
    <div id={id} ref={ref}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg" style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A' }}>
          {title}
        </h3>
        {editable && !isEditing && (
          <button onClick={onStartEdit} className="p-1 rounded hover:bg-gray-100 transition-colors">
            <Pencil className="w-3.5 h-3.5" style={{ color: '#9CA39B' }} />
          </button>
        )}
        {isEditing && (
          <div className="flex items-center gap-1">
            <button onClick={() => onSave(editValue)} className="p-1 rounded hover:bg-green-50">
              <Check className="w-4 h-4" style={{ color: '#00875A' }} />
            </button>
            <button onClick={onCancel} className="p-1 rounded hover:bg-gray-100">
              <X className="w-4 h-4" style={{ color: '#6B6B63' }} />
            </button>
          </div>
        )}
      </div>
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <textarea
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              className="w-full mt-2 px-3 py-2 text-sm border-2 rounded resize-none outline-none"
              style={{ borderColor: '#00875A', borderRadius: '4px', minHeight: '100px', color: '#1A1A1A' }}
              autoFocus
            />
          </motion.div>
        ) : (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm mt-2 leading-relaxed" style={{ color: '#1A1A1A' }}>
            {content}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

BriefSection.displayName = 'BriefSection';