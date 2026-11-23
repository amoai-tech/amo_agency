// C80-SUPABASE-ARCH — Supabase Architecture Visual Reference Document
// Developer system blueprint for AMO AI platform integration

import { Database, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { SystemArchitectureDiagram } from './supabase-arch/SystemArchitectureDiagram';
import { DatabaseStructure } from './supabase-arch/DatabaseStructure';
import { FrontendDataFlow } from './supabase-arch/FrontendDataFlow';
import { EdgeFunctionArch } from './supabase-arch/EdgeFunctionArch';
import { AuthFlow } from './supabase-arch/AuthFlow';
import { RealtimeSystem } from './supabase-arch/RealtimeSystem';
import { AIPipeline } from './supabase-arch/AIPipeline';
import { APIReference } from './supabase-arch/APIReference';
import { FrontendHooks } from './supabase-arch/FrontendHooks';

const SECTIONS = [
  { id: 'architecture', label: '01 Architecture' },
  { id: 'database', label: '02 Database' },
  { id: 'data-flow', label: '03 Data Flow' },
  { id: 'edge-functions', label: '04 Edge Functions' },
  { id: 'auth', label: '05 Auth' },
  { id: 'realtime', label: '06 Realtime' },
  { id: 'ai-pipeline', label: '07 AI Pipeline' },
  { id: 'api-reference', label: '08 API Reference' },
  { id: 'hooks', label: '09 Hooks' },
];

export default function SupabaseArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Header */}
      <div className="border-b border-[#E8E8E4] bg-white">
        <div className="max-w-[1120px] mx-auto px-6 py-6">
          <Link to="/sitemap" className="inline-flex items-center gap-1.5 text-xs text-[#999] hover:text-[#00875A] transition-colors mb-4">
            <ArrowLeft size={12} />
            Back to Sitemap
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#00875A]/10 rounded-[4px] flex items-center justify-center flex-shrink-0">
              <Database size={20} className="text-[#00875A]" />
            </div>
            <div>
              <p className="text-xs font-mono text-[#00875A] tracking-wider uppercase mb-1">Developer Reference</p>
              <h1 className="text-3xl font-semibold text-[#1A1A1A]" style={{ fontFamily: 'Georgia, serif' }}>
                Supabase Architecture
              </h1>
              <p className="text-sm text-[#666] mt-2 max-w-2xl">
                System blueprint showing how the AMO AI platform connects frontend, backend, Supabase services, and AI — designed as a technical reference for the development team.
              </p>
            </div>
          </div>

          {/* Section nav */}
          <nav className="mt-6 flex flex-wrap gap-2">
            {SECTIONS.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-[10px] font-mono text-[#999] hover:text-[#00875A] border border-[#E8E8E4] hover:border-[#00875A]/30 rounded-[4px] px-2.5 py-1 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1120px] mx-auto px-6 py-10 space-y-16">
        {/* Tech stack summary bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: 'Frontend', detail: 'React + TypeScript + Vite' },
            { label: 'Backend', detail: 'Supabase Edge Functions (Deno)' },
            { label: 'Database', detail: 'Postgres + pgvector' },
            { label: 'AI Engine', detail: 'Google Gemini' },
            { label: 'Infra', detail: 'Auth + Realtime + Storage' },
          ].map(item => (
            <div key={item.label} className="bg-white border border-[#E8E8E4] rounded-[4px] px-4 py-3">
              <p className="text-[10px] font-mono text-[#00875A] uppercase tracking-wider">{item.label}</p>
              <p className="text-xs text-[#1A1A1A] font-semibold mt-1">{item.detail}</p>
            </div>
          ))}
        </div>

        <div id="architecture"><SystemArchitectureDiagram /></div>
        <div id="database"><DatabaseStructure /></div>
        <div id="data-flow"><FrontendDataFlow /></div>
        <div id="edge-functions"><EdgeFunctionArch /></div>
        <div id="auth"><AuthFlow /></div>
        <div id="realtime"><RealtimeSystem /></div>
        <div id="ai-pipeline"><AIPipeline /></div>
        <div id="api-reference"><APIReference /></div>
        <div id="hooks"><FrontendHooks /></div>

        {/* Footer note */}
        <div className="border-t border-[#E8E8E4] pt-8 text-center">
          <p className="text-xs text-[#999]">
            AMO AI — Supabase Architecture Reference v1.0
          </p>
          <p className="text-[10px] text-[#999] mt-1">
            Generated from <code className="font-mono">/imports/supabase-architecture-overview.md</code> • BCG Design System
          </p>
        </div>
      </div>
    </div>
  );
}
