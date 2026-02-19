'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { StatusTag } from '@/components/shared/StatusTag';
import { AdmiraltyBadge } from '@/components/shared/AdmiraltyBadge';

import { JahanAI } from '@/components/shared/JahanAI';
import {
  Shield, DollarSign, MapPin, BookOpen, Activity,
  ExternalLink, AlertTriangle,
  User, FileText
} from 'lucide-react';

const ENTITIES: Record<string, {
  id: string; name: string; nameAlt: string; dob: string; nationality: string;
  status: string; threat: string; admiralty: string;
  bio: string; role: string;
  aliases: string[];
  attributes: Array<{ label: string; value: string }>;
  modules: Array<{ code: string; label: string; role: string; caseRef: string; date: string; color: string }>;
  timeline: Array<{ date: string; event: string; module: string; color: string }>;
  connections: Array<{ id: string; name: string; type: string; strength: string }>;
  notes: string[];
}> = {
  'JB-P-00283716': {
    id: 'JB-P-00283716', name: 'Colonel Davoud Ansari', nameAlt: 'داوود انصاری',
    dob: '1964-03-15', nationality: 'Iranian',
    status: 'detained', threat: 'critical',
    admiralty: 'A2',
    bio: 'Senior IRGC officer who served as operational commander during the 1399 (2019) crackdown. Responsible for coordinating suppression orders across three provinces. Subsequently fled to Gulf states using forged documentation before interdiction at Bazargan crossing.',
    role: 'IRGC Operational Commander, Financial Network Principal',
    aliases: ['Kamyar Shirazi (forged)', 'Abu Saleh', 'Colonel D'],
    attributes: [
      { label: 'Entity ID', value: 'JB-P-00283716' },
      { label: 'Date of birth', value: '15 Esfand 1342 / 15 March 1964' },
      { label: 'Nationality', value: 'Iranian' },
      { label: 'IRGC Rank', value: 'Colonel (Sargord)' },
      { label: 'Last location', value: 'Bazargan Border Crossing (detained)' },
      { label: 'Biometric ref', value: 'BIO-2026-0038-A (94.7% match)' },
      { label: 'Prosecution readiness', value: '87%' },
      { label: 'Deaths attributed', value: '89 (TRC cross-reference)' },
    ],
    modules: [
      { code: 'CT-OPS', label: 'Counter-Terror Operations', role: 'Financial link — Taghavi cell', caseRef: 'CT-OPS-2026-0047', date: '2026-01-22', color: '#EF4444' },
      { code: 'FIN-ENF', label: 'Financial Enforcement', role: 'Principal — Khatam procurement network', caseRef: 'FIN-ENF-2026-0031', date: '2026-01-28', color: '#06B6D4' },
      { code: 'BDR-SEC', label: 'Border Security', role: 'Interdicted — forged identity', caseRef: 'BDR-2026-0038-A', date: '2026-02-03', color: '#F97316' },
      { code: 'TRC-SUP', label: 'Transitional Justice', role: 'Primary defendant — 1399 crackdown', caseRef: 'TRC-INV-2019-001', date: '2026-01-30', color: '#F59E0B' },
      { code: 'EXEC-BRIEF', label: 'Executive Briefing', role: 'Cross-module subject — EB-2026-0034', caseRef: 'EB-2026-0034', date: '2026-02-03', color: '#8B5CF6' },
    ],
    timeline: [
      { date: 'Day 12', event: 'Named as financial link to Taghavi cell', module: 'CT-OPS', color: '#EF4444' },
      { date: 'Day 18', event: '$23.4M offshore accounts identified', module: 'FIN-ENF', color: '#06B6D4' },
      { date: 'Day 25', event: '3 SNSC directives, 89 deaths attributed', module: 'TRC-SUP', color: '#F59E0B' },
      { date: 'Day 31', event: 'Asset flight — UAE transfer initiated ($47.2M)', module: 'FIN-ENF', color: '#06B6D4' },
      { date: 'Day 38', event: 'Interdicted at Bazargan — forged identity detected', module: 'BDR-SEC', color: '#F97316' },
    ],
    connections: [
      { id: 'JB-P-00847291', name: 'Brig. Gen. Reza Taghavi', type: 'Command superior', strength: 'confirmed' },
      { id: 'JB-P-00391847', name: 'Mehrdad Ahmadzadeh', type: 'Financial intermediary', strength: 'confirmed' },
      { id: 'JB-E-00012847', name: 'Khatam al-Anbiya Construction HQ', type: 'Organizational link', strength: 'probable' },
    ],
    notes: [
      'Subject has been cooperative since detention. Legal counsel appointed.',
      'TRC cross-reference confirms 89 civilian deaths attributable per documentary evidence.',
      'Emirati coordination pending for asset freeze — $47.2M at risk of further flight.',
    ],
  },
  'JB-P-00847291': {
    id: 'JB-P-00847291', name: 'Brig. Gen. Reza Taghavi', nameAlt: 'رضا تقوی',
    dob: '1958-07-22', nationality: 'Iranian',
    status: 'at-large', threat: 'critical',
    admiralty: 'B2',
    bio: 'Brigadier General and senior IRGC commander. Cell leader of the Taghavi operational network currently planning infrastructure sabotage. Has evaded multiple interdiction attempts. Known to use courier-based communication to avoid signals intelligence.',
    role: 'IRGC Brigadier General, Cell Leader — Taghavi Network',
    aliases: ['The General', 'JB-P-00142857 (operational alias)'],
    attributes: [
      { label: 'Entity ID', value: 'JB-P-00847291' },
      { label: 'Date of birth', value: '31 Tir 1337 / 22 July 1958' },
      { label: 'Nationality', value: 'Iranian' },
      { label: 'IRGC Rank', value: 'Brigadier General (Sartip Dovom)' },
      { label: 'Last known location', value: 'South Tehran (estimated, 7–14 day window)' },
      { label: 'Cell size', value: '7–9 active operatives' },
      { label: 'Target', value: 'Electrical distribution infrastructure, south Tehran' },
    ],
    modules: [
      { code: 'CT-OPS', label: 'Counter-Terror Operations', role: 'Cell leader — active threat', caseRef: 'CT-OPS-2026-0047', date: '2026-02-01', color: '#EF4444' },
      { code: 'EXEC-BRIEF', label: 'Executive Briefing', role: 'Priority item 1 — infrastructure threat', caseRef: 'EB-2026-0034', date: '2026-02-03', color: '#8B5CF6' },
    ],
    timeline: [
      { date: '2026-01-15', event: 'First signals intelligence intercept', module: 'CT-OPS', color: '#EF4444' },
      { date: '2026-01-22', event: 'Cell structure confirmed (7–9 individuals)', module: 'CT-OPS', color: '#EF4444' },
      { date: '2026-02-01', event: 'Financial and border coordination orders issued', module: 'CT-OPS', color: '#EF4444' },
      { date: '2026-02-03', event: 'Escalated to executive briefing — attack window imminent', module: 'EXEC-BRIEF', color: '#8B5CF6' },
    ],
    connections: [
      { id: 'JB-P-00283716', name: 'Colonel Davoud Ansari', type: 'Financial subordinate (detained)', strength: 'confirmed' },
      { id: 'JB-P-00391847', name: 'Mehrdad Ahmadzadeh', type: 'Logistics coordinator', strength: 'probable' },
    ],
    notes: [
      'Active threat. Arrest warrant issued. Coordination with National Police underway.',
      'Subject avoids digital communication — courier network identified across 3 safe houses.',
    ],
  },
  'JB-P-00391847': {
    id: 'JB-P-00391847', name: 'Mehrdad Ahmadzadeh', nameAlt: 'مهرداد احمدزاده',
    dob: '1971-11-03', nationality: 'Iranian-Canadian',
    status: 'under-surveillance', threat: 'high',
    admiralty: 'B3',
    bio: 'Financial intermediary with dual Iranian-Canadian citizenship. Manages offshore accounts and shell company network across UAE, Turkey, and Cyprus. Primary conduit for Khatam procurement network asset flight.',
    role: 'Financial Intermediary — Khatam Network',
    aliases: ['Mike Ahmad', 'M. Zadeh'],
    attributes: [
      { label: 'Entity ID', value: 'JB-P-00391847' },
      { label: 'Date of birth', value: '11 Aban 1350 / 3 November 1971' },
      { label: 'Nationality', value: 'Iranian-Canadian (dual)' },
      { label: 'Last location', value: 'Dubai, UAE (under surveillance)' },
      { label: 'Asset exposure', value: '$47.2M + 3 additional accounts' },
      { label: 'Shell entities', value: '4 identified, 2 probable' },
    ],
    modules: [
      { code: 'FIN-ENF', label: 'Financial Enforcement', role: 'Offshore account manager', caseRef: 'FIN-ENF-2026-0031', date: '2026-01-28', color: '#06B6D4' },
      { code: 'CT-OPS', label: 'Counter-Terror Operations', role: 'Logistics coordinator — Taghavi cell', caseRef: 'CT-OPS-2026-0047', date: '2026-01-22', color: '#EF4444' },
    ],
    timeline: [
      { date: '2026-01-10', event: 'Dubai accounts flagged via FATF reporting', module: 'FIN-ENF', color: '#06B6D4' },
      { date: '2026-01-28', event: 'Shell entity network mapped ($47.2M)', module: 'FIN-ENF', color: '#06B6D4' },
      { date: '2026-02-01', event: 'Freeze request submitted — Emirati coordination pending', module: 'FIN-ENF', color: '#06B6D4' },
    ],
    connections: [
      { id: 'JB-P-00283716', name: 'Colonel Davoud Ansari', type: 'Principal (detained)', strength: 'confirmed' },
      { id: 'JB-P-00847291', name: 'Brig. Gen. Reza Taghavi', type: 'Command link', strength: 'probable' },
    ],
    notes: [
      'Canadian passport currently valid. Interpol Red Notice request submitted.',
      'Three additional flight-risk accounts identified but not yet frozen.',
    ],
  },
};

const MODULE_ICONS: Record<string, typeof Shield> = {
  'CT-OPS': Shield,
  'FIN-ENF': DollarSign,
  'BDR-SEC': MapPin,
  'TRC-SUP': BookOpen,
  'EXEC-BRIEF': Activity,
  'OVERSIGHT': Activity,
};

const TABS = ['Profile', 'Module Cross-Reference', 'Timeline', 'Connections', 'AI Assessment'];

const jahanAISteps = (name: string) => [
  `Querying ${name} across all analytical modules...`,
  `Cross-referencing financial, operational, and signals records...`,
  `Integrated assessment: Subject represents a node connecting CT-OPS infrastructure threat, FIN-ENF asset flight, and TRC accountability. Detention creates significant disruption to Khatam financial routing. Three modules converge on this entity — highest integration score in active registry.`,
  `Risk assessment: Prosecution readiness 87%. Financial exposure $47.2M at risk. Recommend urgent Emirati coordination and TRC dossier completion before legal challenge window opens (est. 72 hours).`,
];

export default function EntityProfilePage() {
  const params = useParams();
  const id = params?.id as string;
  const [activeTab, setActiveTab] = useState('Profile');
  const [showAI, setShowAI] = useState(false);

  const entity = ENTITIES[id] || ENTITIES['JB-P-00283716'];

  const threatColors: Record<string, string> = {
    critical: '#EF4444', high: '#F97316', medium: '#F59E0B', low: '#22C55E',
  };
  const threatColor = threatColors[entity.threat] || '#94A3B8';

  return (
    <div className="module-content">
      <div className="px-6 py-5 border-b" style={{ borderColor: '#1e2533' }}>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center flex-shrink-0"
            style={{ borderColor: threatColor, backgroundColor: `${threatColor}12` }}>
            <User size={22} style={{ color: threatColor }} />
          </div>
          <div className="flex-1">
            <div className="flex items-start gap-3 flex-wrap">
              <div>
                <h1 className="text-[18px] font-semibold" style={{ color: '#F1F5F9' }}>{entity.name}</h1>
                <div className="text-[13px] font-light" style={{ color: '#64748B' }}>{entity.nameAlt}</div>
              </div>
              <div className="flex gap-2 flex-wrap mt-0.5">
                <StatusTag status={entity.status} />
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase"
                  style={{ backgroundColor: `${threatColor}15`, color: threatColor, border: `1px solid ${threatColor}30` }}>
                  {entity.threat} threat
                </span>
                <AdmiraltyBadge code={entity.admiralty} />
              </div>
            </div>
            <div className="mt-1 flex items-center gap-4 flex-wrap">
              <span className="text-[11px] font-mono" style={{ color: '#3B82F6' }}>{entity.id}</span>
              <span className="text-[11px]" style={{ color: '#475569' }}>{entity.role}</span>
            </div>
          </div>
          <button
            onClick={() => setShowAI(!showAI)}
            className="px-3 py-1.5 rounded text-[11px] font-medium flex items-center gap-1.5 flex-shrink-0"
            style={{ backgroundColor: '#8B5CF620', color: '#8B5CF6', border: '1px solid #8B5CF630' }}>
            <Activity size={12} />
            JahanAI Assessment
          </button>
        </div>

        {showAI && (
          <div className="mt-4">
            <JahanAI steps={jahanAISteps(entity.name)} />
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b px-6 flex gap-0" style={{ borderColor: '#1e2533' }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="px-4 py-3 text-[12px] transition-colors border-b-2 -mb-px"
            style={{
              color: activeTab === tab ? '#F1F5F9' : '#64748B',
              borderBottomColor: activeTab === tab ? '#3B82F6' : 'transparent',
              fontWeight: activeTab === tab ? 500 : 400,
            }}>
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">

        {/* PROFILE TAB */}
        {activeTab === 'Profile' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-5">
              <div className="rounded-lg border p-5" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="text-[11px] uppercase tracking-[0.08em] font-medium mb-3" style={{ color: '#475569' }}>
                  Biographical Summary
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: '#94A3B8' }}>{entity.bio}</p>
              </div>

              <div className="rounded-lg border p-5" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="text-[11px] uppercase tracking-[0.08em] font-medium mb-3" style={{ color: '#475569' }}>
                  Known Aliases
                </div>
                <div className="flex gap-2 flex-wrap">
                  {entity.aliases.map((alias, i) => (
                    <span key={i} className="px-2.5 py-1 rounded text-[11px] font-mono"
                      style={{ backgroundColor: '#161b27', color: '#94A3B8', border: '1px solid #1e2533' }}>
                      {alias}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border p-5" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="text-[11px] uppercase tracking-[0.08em] font-medium mb-3" style={{ color: '#475569' }}>
                  Analytical Notes
                </div>
                <div className="space-y-2">
                  {entity.notes.map((note, i) => (
                    <div key={i} className="flex gap-2.5 p-3 rounded"
                      style={{ backgroundColor: '#0a0c10', border: '1px solid #1e2533' }}>
                      <FileText size={13} className="flex-shrink-0 mt-0.5" style={{ color: '#475569' }} />
                      <p className="text-[12px]" style={{ color: '#94A3B8' }}>{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="text-[11px] uppercase tracking-[0.08em] font-medium mb-3" style={{ color: '#475569' }}>
                  Attributes
                </div>
                <div className="space-y-2.5">
                  {entity.attributes.map(({ label, value }) => (
                    <div key={label}>
                      <div className="text-[10px] uppercase tracking-[0.06em] mb-0.5" style={{ color: '#475569' }}>{label}</div>
                      <div className="text-[12px] font-mono" style={{ color: '#94A3B8' }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="text-[11px] uppercase tracking-[0.08em] font-medium mb-3" style={{ color: '#475569' }}>
                  Active in Modules
                </div>
                <div className="space-y-2">
                  {entity.modules.map((m) => {
                    const Icon = MODULE_ICONS[m.code] || Activity;
                    return (
                      <Link key={m.code} href={`/${m.code.toLowerCase().replace('-', '-')}`}
                        className="flex items-center gap-2 p-2 rounded transition-colors hover:opacity-80"
                        style={{ backgroundColor: `${m.color}10`, border: `1px solid ${m.color}20` }}>
                        <Icon size={12} style={{ color: m.color }} />
                        <span className="text-[11px] font-mono font-medium" style={{ color: m.color }}>{m.code}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE CROSS-REFERENCE TAB */}
        {activeTab === 'Module Cross-Reference' && (
          <div className="space-y-4">
            <p className="text-[12px]" style={{ color: '#64748B' }}>
              {entity.name} has been identified across {entity.modules.length} analytical modules.
            </p>
            <div className="space-y-3">
              {entity.modules.map((m) => {
                const Icon = MODULE_ICONS[m.code] || Activity;
                return (
                  <div key={m.code} className="rounded-lg border p-5" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${m.color}15`, border: `1px solid ${m.color}30` }}>
                        <Icon size={16} style={{ color: m.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[12px] font-mono font-medium" style={{ color: m.color }}>{m.code}</span>
                          <span className="text-[12px]" style={{ color: '#94A3B8' }}>{m.label}</span>
                          <span className="ml-auto text-[11px] font-mono" style={{ color: '#475569' }}>{m.date}</span>
                        </div>
                        <div className="text-[12px] mb-2" style={{ color: '#64748B' }}>{m.role}</div>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-mono" style={{ color: '#3B82F6' }}>{m.caseRef}</span>
                          <Link href={`/${m.code.toLowerCase()}`}
                            className="flex items-center gap-1 text-[11px] hover:opacity-80 transition-opacity"
                            style={{ color: m.color }}>
                            Open module <ExternalLink size={10} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TIMELINE TAB */}
        {activeTab === 'Timeline' && (
          <div className="space-y-4">
            <p className="text-[12px]" style={{ color: '#64748B' }}>
              Chronological activity record across all modules.
            </p>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px" style={{ backgroundColor: '#1e2533' }} />
              <div className="space-y-4 pl-14">
                {entity.timeline.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-9 w-8 h-8 rounded-full border flex items-center justify-center"
                      style={{ backgroundColor: '#0f1117', borderColor: item.color }}>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    </div>
                    <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[11px] font-mono font-medium" style={{ color: item.color }}>{item.date}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: `${item.color}15`, color: item.color }}>{item.module}</span>
                      </div>
                      <p className="text-[13px]" style={{ color: '#94A3B8' }}>{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONNECTIONS TAB */}
        {activeTab === 'Connections' && (
          <div className="space-y-4">
            <p className="text-[12px]" style={{ color: '#64748B' }}>
              Known and probable connections to other entities in the registry.
            </p>
            <div className="space-y-3">
              {entity.connections.map((conn, i) => {
                const strengthColors: Record<string, string> = {
                  confirmed: '#22C55E', probable: '#F59E0B', suspected: '#F97316',
                };
                const sc = strengthColors[conn.strength] || '#64748B';
                return (
                  <div key={i} className="rounded-lg border p-4 flex items-center gap-4"
                    style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                    <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: sc, backgroundColor: `${sc}10` }}>
                      <User size={14} style={{ color: sc }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Link href={`/entity/${conn.id}`} className="text-[13px] font-medium hover:opacity-80"
                          style={{ color: '#F1F5F9' }}>{conn.name}</Link>
                        <span className="text-[10px] font-mono" style={{ color: '#475569' }}>{conn.id}</span>
                      </div>
                      <div className="text-[12px]" style={{ color: '#64748B' }}>{conn.type}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sc }} />
                      <span className="text-[11px] capitalize" style={{ color: sc }}>{conn.strength}</span>
                    </div>
                    <Link href={`/entity/${conn.id}`}
                      className="flex items-center gap-1 text-[11px] hover:opacity-80"
                      style={{ color: '#3B82F6' }}>
                      Profile <ExternalLink size={10} />
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-lg border p-4" style={{ backgroundColor: '#0a0c10', borderColor: '#1e2533' }}>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={13} style={{ color: '#F59E0B' }} />
                <span className="text-[11px] font-medium" style={{ color: '#F59E0B' }}>Network Analysis Available</span>
              </div>
              <p className="text-[12px]" style={{ color: '#64748B' }}>
                Full network graph with all entity connections available in the CT-OPS Network Analysis module.
              </p>
              <Link href="/ct-ops" className="mt-2 inline-flex items-center gap-1 text-[11px] hover:opacity-80"
                style={{ color: '#EF4444' }}>
                Open CT-OPS Network Analysis <ExternalLink size={10} />
              </Link>
            </div>
          </div>
        )}

        {/* AI ASSESSMENT TAB */}
        {activeTab === 'AI Assessment' && (
          <div className="max-w-2xl">
            <JahanAI steps={jahanAISteps(entity.name)} />
          </div>
        )}

      </div>
    </div>
  );
}
