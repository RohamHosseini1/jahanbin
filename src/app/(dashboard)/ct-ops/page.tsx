'use client';

import { useState } from 'react';
import { ModuleHeader } from '@/components/layout/ModuleHeader';
import { StatusTag } from '@/components/shared/StatusTag';
import { EntityTag } from '@/components/shared/EntityTag';
import { AdmiraltyBadge } from '@/components/shared/AdmiraltyBadge';
import { ConfidenceBar } from '@/components/shared/ConfidenceBar';
import { JahanAI } from '@/components/shared/JahanAI';
import { getCases } from '@/lib/mock-data';
import { Network } from 'lucide-react';
import Link from 'next/link';

const TABS = ['Cases', 'Source Report', 'Multi-INT', 'Network Analysis', 'Competing Hypotheses', 'Assessment'];

const jahanSteps = [
  "Extracting named entities from source report...",
  "→ 4 persons identified: Taghavi, Ahmadzadeh, [2 unknown]",
  "→ 1 location: District 17 warehouse cluster",
  "→ 1 organization: suspected IRGC-QF affiliation",
  "Running entity resolution against JB database...",
  "→ Taghavi: matched JB-P-00142857 (confidence 97%)",
  "→ Ahmadzadeh: matched JB-P-00389201 (confidence 94%)",
  "→ 2 persons: no match — flagged for HUMINT follow-up",
  "Querying corroborating sources...",
  "→ SIGINT: 3 intercepts found, Taghavi–Ahmadzadeh confirmed",
  "→ FININT: 7 accounts flagged, $142K anomalous activity",
  "→ GEOINT: Vehicle activity confirmed at District 17 location",
  "Assigning preliminary Admiralty rating: C3 → upgrading to C2",
  "on corroboration from 3 independent sources.",
  "Red team: Evaluating alternative hypotheses...",
  "→ H2 (financial crime) cannot be fully excluded — recommend overlay",
  "Ready for analyst review."
];

const multiINTRows = [
  { type: 'SIGINT', finding: '3 intercepts: Taghavi–Ahmadzadeh confirmed', confidence: 'High', date: '2026-01-12' },
  { type: 'FININT', finding: '7 accounts flagged, $142K +340% baseline', confidence: 'High', date: '2026-01-18' },
  { type: 'GEOINT', finding: 'Vehicle activity at 47 Molavi St (District 17)', confidence: 'Medium', date: '2026-01-20' },
  { type: 'HUMINT', finding: 'Walk-in source report (SPARROW)', confidence: 'Medium', date: '2026-01-15' },
  { type: 'MILREC', finding: 'Taghavi: IRGC-QF service 2003–2019 confirmed', confidence: 'High', date: 'Historical' },
];

const corroborationMatrix = [
  { claim: 'Taghavi is former IRGC officer', sigint: 'N', finint: 'N', geoint: 'N', humint: 'C', milrec: 'CC', confidence: 99, notes: 'MILREC confirmed' },
  { claim: 'Cell of 5-7 individuals', sigint: 'CC', finint: 'C', geoint: 'CC', humint: 'C', milrec: 'N', confidence: 87, notes: '' },
  { claim: 'District 17 warehouse — meeting point', sigint: 'CC', finint: 'N', geoint: 'CC', humint: 'CC', milrec: 'N', confidence: 94, notes: '' },
  { claim: 'IED materials observed', sigint: 'N', finint: 'N', geoint: 'N', humint: 'C', milrec: 'N', confidence: 32, notes: 'Unverified — single source', unverified: true },
  { claim: 'Target: Electrical substations', sigint: 'CC', finint: 'N', geoint: 'C', humint: 'C', milrec: 'N', confidence: 71, notes: '' },
  { claim: 'Timeline: within two weeks', sigint: 'CC', finint: 'N', geoint: 'C', humint: 'N', milrec: 'N', confidence: 68, notes: '' },
];

const matrixCellColors: Record<string, string> = {
  'CC': '#10B981', 'C': '#3B82F6', 'N': '#475569', 'I': '#F59E0B', 'II': '#EF4444',
};

const hypotheses = [
  {
    id: 'H1',
    title: 'Active Sabotage Cell',
    confidence: 73,
    desc: 'Cell coordinated by Taghavi and Ahmadzadeh is planning infrastructure attack targeting electrical distribution in south Tehran.',
    color: '#EF4444',
  },
  {
    id: 'H2',
    title: 'Financial Crime Network',
    confidence: 18,
    desc: 'Group engaged in procurement fraud and sanctions evasion using former IRGC supply chain networks.',
    color: '#F59E0B',
  },
  {
    id: 'H3',
    title: 'Coincidental Association',
    confidence: 9,
    desc: 'Former colleagues maintaining social contact without operational coordination.',
    color: '#64748B',
  },
];

const evidenceMatrix = [
  { evidence: 'HUMINT: Source reports attack intent', H1: 'CC', H2: 'C', H3: 'II' },
  { evidence: 'SIGINT: Burst comm pattern (07:00–08:00)', H1: 'CC', H2: 'N', H3: 'I' },
  { evidence: 'FININT: $142K anomalous activity', H1: 'C', H2: 'CC', H3: 'I' },
  { evidence: 'GEOINT: Warehouse convergence (7/9 members)', H1: 'CC', H2: 'N', H3: 'II' },
  { evidence: 'MILREC: IRGC-QF service history confirmed', H1: 'C', H2: 'N', H3: 'N' },
  { evidence: 'SIGINT: SIM rotation every 72hrs', H1: 'CC', H2: 'C', H3: 'I' },
  { evidence: 'GEOINT: Nocturnal movement pattern', H1: 'CC', H2: 'N', H3: 'I' },
  { evidence: 'HUMINT: No financial motive reported', H1: 'N', H2: 'I', H3: 'C' },
];

export default function CTOpsPage() {
  const [activeTab, setActiveTab] = useState('Cases');
  const cases = getCases().filter(c => c.module === 'ct-ops');

  return (
    <div className="module-content">
      <ModuleHeader
        title="Counterterrorism Operations"
        code="CT-OPS"
        subtitle="23 active investigations | 4 pending judicial authorization"
        status="Active"
        statusColor="#EF4444"
      />

      {/* Tab navigation */}
      <div className="border-b px-6 flex gap-0" style={{ borderColor: '#1e2533' }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-3 text-[12px] transition-colors border-b-2 -mb-px"
            style={{
              color: activeTab === tab ? '#F1F5F9' : '#64748B',
              borderBottomColor: activeTab === tab ? '#3B82F6' : 'transparent',
              fontWeight: activeTab === tab ? 500 : 400,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* CASES TAB */}
        {activeTab === 'Cases' && (
          <div className="space-y-4">
            {/* Summary cards */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Open cases', value: '23', color: '#3B82F6' },
                { label: 'Subjects monitored', value: '147', color: '#EF4444' },
                { label: 'Products issued (30d)', value: '34', color: '#10B981' },
                { label: 'Assets tasked', value: '8', color: '#F59E0B' },
              ].map(card => (
                <div key={card.label} className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                  <div className="text-[22px] font-semibold" style={{ color: card.color }}>{card.value}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: '#64748B' }}>{card.label}</div>
                </div>
              ))}
            </div>
            {/* Cases list */}
            <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="px-4 py-3 border-b" style={{ borderColor: '#1e2533' }}>
                <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>Active investigations</span>
              </div>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e2533' }}>
                    {['Case ID', 'Title', 'Status', 'Priority', 'Lead analyst', 'Last updated'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.06em]" style={{ color: '#475569' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#1e2533' }}>
                  {cases.map(c => (
                    <tr key={c.id} className="hover:bg-[#161b27] cursor-pointer transition-colors"
                      onClick={() => setActiveTab('Source Report')}>
                      <td className="px-4 py-3">
                        <span className="text-[11px] font-mono" style={{ color: '#3B82F6' }}>{c.id}</span>
                      </td>
                      <td className="px-4 py-3 text-[12px]" style={{ color: '#F1F5F9' }}>{c.title}</td>
                      <td className="px-4 py-3"><StatusTag status={c.status} /></td>
                      <td className="px-4 py-3"><StatusTag status={c.priority} /></td>
                      <td className="px-4 py-3 text-[11px] font-mono" style={{ color: '#64748B' }}>{c.leadAnalyst}</td>
                      <td className="px-4 py-3 text-[11px] font-mono" style={{ color: '#64748B' }}>{c.lastUpdated}</td>
                    </tr>
                  ))}
                  {/* Additional mock cases */}
                  <tr className="hover:bg-[#161b27] transition-colors">
                    <td className="px-4 py-3"><span className="text-[11px] font-mono" style={{ color: '#3B82F6' }}>JB-CASE-2026-0031</span></td>
                    <td className="px-4 py-3 text-[12px]" style={{ color: '#F1F5F9' }}>Network ASHRAF</td>
                    <td className="px-4 py-3"><StatusTag status="active" /></td>
                    <td className="px-4 py-3"><StatusTag status="standard" /></td>
                    <td className="px-4 py-3 text-[11px] font-mono" style={{ color: '#64748B' }}>JB-0523</td>
                    <td className="px-4 py-3 text-[11px] font-mono" style={{ color: '#64748B' }}>2026-01-29</td>
                  </tr>
                  <tr className="hover:bg-[#161b27] transition-colors">
                    <td className="px-4 py-3"><span className="text-[11px] font-mono" style={{ color: '#F59E0B' }}>JB-CASE-2026-0019</span></td>
                    <td className="px-4 py-3 text-[12px]" style={{ color: '#F1F5F9' }}>Financial channel HAKIM</td>
                    <td className="px-4 py-3"><StatusTag status="pending-authorization" /></td>
                    <td className="px-4 py-3"><StatusTag status="standard" /></td>
                    <td className="px-4 py-3 text-[11px] font-mono" style={{ color: '#64748B' }}>JB-0344</td>
                    <td className="px-4 py-3 text-[11px] font-mono" style={{ color: '#64748B' }}>2026-01-22</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SOURCE REPORT TAB */}
        {activeTab === 'Source Report' && (
          <div className="grid grid-cols-2 gap-5">
            {/* Left: HUMINT report */}
            <div className="rounded-lg border" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="px-4 py-3 border-b" style={{ borderColor: '#1e2533' }}>
                <div className="text-[12px] font-medium mb-0.5" style={{ color: '#F1F5F9' }}>Source report</div>
                <div className="text-[11px] font-mono" style={{ color: '#475569' }}>HUMINT-IR-2026-0471</div>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { label: 'Report type', value: 'HUMINT — Walk-In Source', mono: true },
                  { label: 'Received', value: '2026-01-15, 14:23 Tehran time', mono: true },
                  { label: 'Source codename', value: 'SPARROW', mono: false },
                  { label: 'Case reference', value: 'JB-CASE-2026-0047', mono: true },
                ].map(row => (
                  <div key={row.label} className="flex items-start gap-3">
                    <span className="text-[11px] w-32 flex-shrink-0" style={{ color: '#64748B' }}>{row.label}</span>
                    <span className={`text-[11px] ${row.mono ? 'font-mono' : ''}`} style={{ color: '#94A3B8' }}>{row.value}</span>
                  </div>
                ))}
                <div className="flex items-start gap-3">
                  <span className="text-[11px] w-32 flex-shrink-0" style={{ color: '#64748B' }}>Admiralty rating</span>
                  <div className="flex gap-1.5">
                    <AdmiraltyBadge code="C2" />
                    <span className="text-[11px]" style={{ color: '#64748B' }}>Upgraded from C3</span>
                  </div>
                </div>
                <div className="pt-3 border-t" style={{ borderColor: '#1e2533' }}>
                  <div className="text-[11px] font-medium mb-2" style={{ color: '#64748B' }}>Report content summary</div>
                  <p className="text-[12px] leading-relaxed" style={{ color: '#94A3B8' }}>
                    Source reports a cell of 5–7 individuals meeting at District 17 warehouse cluster.
                    Cell leader identified as Taghavi, with Ahmadzadeh as operational coordinator.
                    Source reports intent to target electrical infrastructure. No direct observation
                    of materials — unverified claim flagged.
                  </p>
                </div>
                <div className="pt-3 border-t flex gap-2" style={{ borderColor: '#1e2533' }}>
                  <button className="px-3 py-1.5 rounded text-[11px] font-medium transition-colors"
                    style={{ backgroundColor: '#064e3b20', color: '#10B981', border: '1px solid #10B98130' }}>
                    Confirm entity matches
                  </button>
                  <button className="px-3 py-1.5 rounded text-[11px] font-medium transition-colors"
                    style={{ backgroundColor: '#1e253320', color: '#94A3B8', border: '1px solid #1e2533' }}>
                    Review source assessment
                  </button>
                </div>
              </div>
            </div>
            {/* Right: JahanAI */}
            <JahanAI steps={jahanSteps} autoStart={true} />
          </div>
        )}

        {/* MULTI-INT TAB */}
        {activeTab === 'Multi-INT' && (
          <div className="space-y-5">
            {/* Evidence table */}
            <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="px-4 py-3 border-b" style={{ borderColor: '#1e2533' }}>
                <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>Multi-INT evidence</span>
              </div>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e2533' }}>
                    {['Source type', 'Finding', 'Confidence', 'Date'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.06em]" style={{ color: '#475569' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#1e2533' }}>
                  {multiINTRows.map((row, i) => (
                    <tr key={i} className="hover:bg-[#161b27] transition-colors">
                      <td className="px-4 py-3">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded"
                          style={{ backgroundColor: '#1e2533', color: '#06B6D4' }}>{row.type}</span>
                      </td>
                      <td className="px-4 py-3 text-[12px]" style={{ color: '#94A3B8' }}>{row.finding}</td>
                      <td className="px-4 py-3">
                        <StatusTag status={row.confidence.toLowerCase()} />
                      </td>
                      <td className="px-4 py-3 text-[11px] font-mono" style={{ color: '#475569' }}>{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Corroboration Matrix */}
            <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="px-4 py-3 border-b" style={{ borderColor: '#1e2533' }}>
                <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>Corroboration matrix</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid #1e2533' }}>
                      <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.06em]" style={{ color: '#475569' }}>Claim</th>
                      {['SIGINT', 'FININT', 'GEOINT', 'HUMINT', 'MILREC'].map(s => (
                        <th key={s} className="px-4 py-2.5 text-[10px] uppercase tracking-[0.06em] font-mono" style={{ color: '#475569' }}>{s}</th>
                      ))}
                      <th className="px-4 py-2.5 text-[10px] uppercase tracking-[0.06em]" style={{ color: '#475569' }}>Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: '#1e2533' }}>
                    {corroborationMatrix.map((row, i) => (
                      <tr key={i} className="hover:bg-[#161b27] transition-colors">
                        <td className="px-4 py-2.5">
                          <span className="text-[11px]" style={{ color: '#94A3B8' }}>{row.claim}</span>
                          {row.unverified && <StatusTag status="flagged" className="ml-2" />}
                        </td>
                        {[row.sigint, row.finint, row.geoint, row.humint, row.milrec].map((v, j) => (
                          <td key={j} className="px-4 py-2.5 text-center">
                            <span className="text-[11px] font-mono font-medium" style={{ color: matrixCellColors[v] || '#475569' }}>{v}</span>
                          </td>
                        ))}
                        <td className="px-4 py-2.5 w-32">
                          <ConfidenceBar value={row.confidence} height={3} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 border-t" style={{ borderColor: '#1e2533', backgroundColor: '#0d0f15' }}>
                <p className="text-[11px]" style={{ color: '#64748B' }}>
                  Source credibility note: &quot;Source upgraded F3 → C2 after independent corroboration from SIGINT, GEOINT, FININT.&quot;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* NETWORK ANALYSIS TAB */}
        {activeTab === 'Network Analysis' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 rounded-lg border overflow-hidden" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: '#1e2533' }}>
                <Network size={14} style={{ color: '#3B82F6' }} />
                <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>Network graph — Operation SPARROW</span>
              </div>
              <div className="p-2 h-[400px] flex items-center justify-center" style={{ backgroundColor: '#0a0c10' }}>
                <NetworkGraphWrapper />
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="text-[12px] font-medium mb-3" style={{ color: '#F1F5F9' }}>Network statistics</div>
                <div className="space-y-2">
                  {[
                    { label: 'Nodes', value: '17' },
                    { label: 'Edges', value: '21' },
                    { label: 'Communities', value: '3' },
                    { label: 'Pattern match', value: '83% — Cell structure' },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between">
                      <span className="text-[11px]" style={{ color: '#64748B' }}>{item.label}</span>
                      <span className="text-[11px] font-mono" style={{ color: '#94A3B8' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="text-[12px] font-medium mb-3" style={{ color: '#F1F5F9' }}>Key nodes</div>
                <div className="space-y-2.5">
                  <div>
                    <EntityTag entityId="JB-P-00142857" name="Hossein Taghavi" className="text-[12px]" />
                    <div className="text-[11px] mt-0.5" style={{ color: '#64748B' }}>Central node — betweenness: 0.84</div>
                  </div>
                  <div>
                    <EntityTag entityId="JB-P-00521089" name="Maryam Bahrami" className="text-[12px]" />
                    <div className="text-[11px] mt-0.5" style={{ color: '#F59E0B' }}>Critical bridge — betweenness: 0.67</div>
                    <div className="text-[10px] mt-0.5" style={{ color: '#475569' }}>Remove this node: red/amber clusters disconnect</div>
                  </div>
                  <div>
                    <EntityTag entityId="JB-P-00389201" name="Reza Ahmadzadeh" className="text-[12px]" />
                    <div className="text-[11px] mt-0.5" style={{ color: '#64748B' }}>Operational coord — betweenness: 0.52</div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="text-[11px] font-medium mb-2" style={{ color: '#94A3B8' }}>Legend</div>
                {[
                  { color: '#EF4444', label: 'Operational cluster' },
                  { color: '#F59E0B', label: 'Logistics cluster' },
                  { color: '#475569', label: 'Historical (inactive)' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 mb-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px]" style={{ color: '#64748B' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* COMPETING HYPOTHESES TAB */}
        {activeTab === 'Competing Hypotheses' && (
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-4">
              {hypotheses.map(h => (
                <div key={h.id} className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-medium"
                      style={{ color: h.color }}>{h.id}</span>
                    <span className="text-[18px] font-semibold" style={{ color: h.color }}>{h.confidence}%</span>
                  </div>
                  <div className="text-[13px] font-medium mb-2" style={{ color: '#F1F5F9' }}>{h.title}</div>
                  <p className="text-[11px] leading-relaxed mb-3" style={{ color: '#64748B' }}>{h.desc}</p>
                  <ConfidenceBar value={h.confidence} height={3} />
                </div>
              ))}
            </div>

            <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="px-4 py-3 border-b" style={{ borderColor: '#1e2533' }}>
                <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>Evidence matrix — diagnostic items</span>
              </div>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e2533' }}>
                    <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.06em]" style={{ color: '#475569' }}>Evidence</th>
                    {['H1', 'H2', 'H3'].map(h => (
                      <th key={h} className="px-4 py-2.5 text-[10px] uppercase tracking-[0.06em]" style={{ color: '#475569' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#1e2533' }}>
                  {evidenceMatrix.map((row, i) => (
                    <tr key={i} className="hover:bg-[#161b27] transition-colors">
                      <td className="px-4 py-2.5 text-[11px]" style={{ color: '#94A3B8' }}>{row.evidence}</td>
                      {[row.H1, row.H2, row.H3].map((v, j) => (
                        <td key={j} className="px-4 py-2.5 text-center">
                          <span className="text-[11px] font-mono font-medium" style={{ color: matrixCellColors[v] }}>{v}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-3 border-t" style={{ borderColor: '#1e2533', backgroundColor: '#0d0f15' }}>
                <p className="text-[11px] leading-relaxed" style={{ color: '#64748B' }}>
                  <strong style={{ color: '#94A3B8' }}>Conclusion:</strong> H1 strongly favored. 5 of 8 items diagnostic — all favor H1. H3 eliminated.
                  H2 cannot be fully excluded (financial activity could serve both H1 and H2 — recommend financial overlay).
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('Assessment')}
              className="px-4 py-2 rounded-md text-[12px] font-medium transition-colors"
              style={{ backgroundColor: '#3B82F6', color: '#fff' }}
            >
              Generate threat assessment →
            </button>
          </div>
        )}

        {/* ASSESSMENT TAB */}
        {activeTab === 'Assessment' && (
          <div className="max-w-3xl mx-auto">
            <div className="rounded-lg border" style={{ backgroundColor: '#0f1117', borderColor: '#2d3a52' }}>
              {/* Document header */}
              <div className="px-6 py-4 border-b font-mono text-[12px]" style={{ borderColor: '#1e2533', backgroundColor: '#0d0f15' }}>
                <div className="grid grid-cols-2 gap-2">
                  <div><span style={{ color: '#475569' }}>Product:</span> <span style={{ color: '#94A3B8' }}>INTELLIGENCE ASSESSMENT</span></div>
                  <div><span style={{ color: '#475569' }}>Reference:</span> <span style={{ color: '#3B82F6' }}>CT-OPS-2026-0047-A</span></div>
                  <div><span style={{ color: '#475569' }}>Classification:</span> <span style={{ color: '#F59E0B' }}>RESTRICTED</span></div>
                  <div><span style={{ color: '#475569' }}>Date:</span> <span style={{ color: '#94A3B8' }}>3 February 2026</span></div>
                  <div><span style={{ color: '#475569' }}>Prepared by:</span> <span style={{ color: '#94A3B8' }}>JB-0471 | JAHAN-AI assisted</span></div>
                  <div><span style={{ color: '#475569' }}>Status:</span> <span style={{ color: '#F59E0B' }}>Pending supervisory review</span></div>
                </div>
              </div>

              <div className="px-6 py-5 space-y-5">
                {/* Key Judgments */}
                <div>
                  <div className="text-[11px] uppercase tracking-[0.08em] font-medium mb-3" style={{ color: '#475569' }}>Key Judgments</div>
                  <div className="space-y-4">
                    {[
                      {
                        text: 'We assess with HIGH CONFIDENCE that ',
                        entity: 'Hossein Taghavi',
                        entityId: 'JB-P-00142857',
                        rest: ' (JB-P-00142857) leads an active cell of 7–9 individuals coordinating infrastructure disruption targeting electrical distribution in south Tehran.',
                        confidence: 87,
                        sources: 'HUMINT C2, SIGINT A2, GEOINT B2, FININT B2',
                      },
                      {
                        text: 'We assess with MODERATE CONFIDENCE that operational activity is planned within a 7–14 day window based on communication patterns and logistics convergence.',
                        confidence: 71,
                        sources: 'SIGINT A2, GEOINT B3',
                      },
                      {
                        text: 'We cannot confirm with available intelligence whether IED materials have been obtained. This remains an unverified claim requiring additional collection.',
                        confidence: 32,
                        sources: 'HUMINT C3 — single source, uncorroborated',
                        unverified: true,
                      },
                    ].map((j, i) => (
                      <div key={i} className="p-3 rounded-md border" style={{ backgroundColor: '#0a0c10', borderColor: '#1e2533' }}>
                        <p className="text-[12px] leading-relaxed mb-2" style={{ color: '#94A3B8' }}>
                          {i === 0 ? (
                            <>{j.text}<EntityTag entityId="JB-P-00142857" name="Hossein Taghavi" />{j.rest}</>
                          ) : j.text}
                        </p>
                        <div className="flex items-center gap-3">
                          <ConfidenceBar value={j.confidence} height={3} className="flex-1" />
                          <span className="text-[10px] font-mono text-right flex-shrink-0" style={{ color: '#475569' }}>
                            {j.sources}
                          </span>
                          {j.unverified && <StatusTag status="flagged" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Actions */}
                <div>
                  <div className="text-[11px] uppercase tracking-[0.08em] font-medium mb-3" style={{ color: '#475569' }}>Recommended Actions</div>
                  <ul className="space-y-1.5">
                    {[
                      'Issue intelligence product to relevant security directorate',
                      'Request judicial authorization for continued SIGINT collection',
                      'Cross-reference Taghavi financial accounts (coordinate FIN-ENF)',
                      'Flag Ahmadzadeh for border watch (coordinate BDR-SEC)',
                      'Cross-reference Taghavi service record (coordinate TRC-SUP)',
                    ].map((action, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12px]" style={{ color: '#94A3B8' }}>
                        <span style={{ color: '#3B82F6' }}>•</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Coordination Orders */}
                <div>
                  <div className="text-[11px] uppercase tracking-[0.08em] font-medium mb-3" style={{ color: '#475569' }}>Coordination Orders Issued</div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { module: 'FIN-ENF', action: 'Freeze accounts linked to Omid Construction LLC and Khatam procurement chain (pending judicial authorization)', color: '#06B6D4', href: '/fin-enf' },
                      { module: 'BDR-SEC', action: 'Flag 9 cell members for border watch — detain if crossing', color: '#F97316', href: '/bdr-sec' },
                      { module: 'TRC-SUP', action: 'Cross-reference service records for human rights accountability', color: '#F59E0B', href: '/trc-sup' },
                    ].map(order => (
                      <div key={order.module} className="p-3 rounded-md border" style={{ backgroundColor: '#0a0c10', borderColor: '#1e2533' }}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="text-[10px] font-mono font-medium" style={{ color: order.color }}>{order.module}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed mb-2" style={{ color: '#64748B' }}>{order.action}</p>
                        <Link href={order.href} className="text-[10px] hover:opacity-80" style={{ color: order.color }}>
                          Go to module →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t flex gap-3" style={{ borderColor: '#1e2533', backgroundColor: '#0d0f15' }}>
                <button className="px-4 py-2 rounded-md text-[12px] font-medium"
                  style={{ backgroundColor: '#3B82F6', color: '#fff' }}>
                  Submit for review
                </button>
                <button className="px-4 py-2 rounded-md text-[12px] font-medium"
                  style={{ backgroundColor: '#1e2533', color: '#94A3B8' }}>
                  Request judicial authorization
                </button>
                <button className="px-4 py-2 rounded-md text-[12px] font-medium"
                  style={{ backgroundColor: '#1e2533', color: '#94A3B8' }}>
                  Export
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Lazy-loaded network graph component to avoid SSR issues
function NetworkGraphWrapper() {
  const [GraphComponent, setGraphComponent] = useState<React.ComponentType<Record<string, unknown>> | null>(null);

  useState(() => {
    import('@/components/modules/ct-ops/NetworkGraph').then(m => {
      setGraphComponent(() => m.NetworkGraph);
    }).catch(() => {});
  });

  if (!GraphComponent) {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <Network size={32} style={{ color: '#1e2533' }} />
        <span className="text-[11px]" style={{ color: '#475569' }}>Loading network graph...</span>
      </div>
    );
  }

  return <GraphComponent />;
}
