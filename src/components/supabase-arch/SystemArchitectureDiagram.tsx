// C81-SYS-ARCH — Section 1: High-Level System Architecture Diagram
import { Monitor, Server, Database, Cloud, Lock, Radio, HardDrive, CreditCard, Mail, MessageCircle, Brain } from 'lucide-react';
import { ArchBlock, Connector, SectionTitle, DiagramContainer } from './ArchDiagramBlock';

export function SystemArchitectureDiagram() {
  return (
    <section>
      <SectionTitle
        number="01"
        title="System Architecture"
        subtitle="High-level overview of the AMO AI three-tier architecture"
      />

      <DiagramContainer>
        {/* Tier 1 — Frontend */}
        <div className="flex flex-col items-center">
          <ArchBlock label="Frontend — React App" sublabel="Vite + TypeScript + Tailwind" color="charcoal" icon={<Monitor size={16} />} className="w-full max-w-md text-center" />
          <Connector label="Supabase Client SDK" />

          {/* Tier 2 — Supabase Services */}
          <div className="w-full border border-[#E8E8E4] rounded-[4px] p-5 bg-[#FAFAF8]">
            <p className="text-xs font-mono text-[#00875A] tracking-wider uppercase mb-4 text-center">Supabase Platform</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <ArchBlock label="Auth" sublabel="JWT + RLS" color="green" icon={<Lock size={14} />} small />
              <ArchBlock label="Database" sublabel="Postgres + pgvector" color="green" icon={<Database size={14} />} small />
              <ArchBlock label="Edge Functions" sublabel="Deno / Hono" color="green" icon={<Server size={14} />} small />
              <ArchBlock label="Realtime" sublabel="WebSocket pub/sub" color="green" icon={<Radio size={14} />} small />
              <ArchBlock label="Storage" sublabel="S3-compatible" color="green" icon={<HardDrive size={14} />} small />
            </div>
          </div>

          <Connector label="HTTPS / WebSocket" />

          {/* Tier 3 — External Services */}
          <div className="w-full border border-[#E8E8E4] rounded-[4px] p-5 bg-white">
            <p className="text-xs font-mono text-[#999] tracking-wider uppercase mb-4 text-center">External Services</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <ArchBlock label="Gemini AI" sublabel="Analysis & generation" color="blue" icon={<Brain size={14} />} small />
              <ArchBlock label="Stripe" sublabel="Payments" color="muted" icon={<CreditCard size={14} />} small />
              <ArchBlock label="Email" sublabel="Transactional" color="muted" icon={<Mail size={14} />} small />
              <ArchBlock label="WhatsApp" sublabel="Messaging" color="muted" icon={<MessageCircle size={14} />} small />
            </div>
          </div>
        </div>
      </DiagramContainer>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#999]">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#1A1A1A]" /> Frontend</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#00875A]/20 border border-[#00875A]/30" /> Supabase Services</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-50 border border-blue-200" /> AI Services</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#F0F0EC] border border-[#E8E8E4]" /> Third-party</span>
      </div>
    </section>
  );
}
