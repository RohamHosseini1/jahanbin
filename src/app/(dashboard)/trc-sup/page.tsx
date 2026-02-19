'use client';

import { useState } from 'react';
import { ModuleHeader } from '@/components/layout/ModuleHeader';
import { StatusTag } from '@/components/shared/StatusTag';
import { EntityTag } from '@/components/shared/EntityTag';
import { AdmiraltyBadge } from '@/components/shared/AdmiraltyBadge';
import { ConfidenceBar } from '@/components/shared/ConfidenceBar';
import { getTimelineEvents } from '@/lib/mock-data';
import { X } from 'lucide-react';

const TABS = ['Accountability Dashboard', 'Historical Timeline', 'Investigation Workspace'];

const chainNodes = [
  { level: 'National Command', org: 'Supreme National Security Council', entityId: '', confidence: 'C3', action: 'Directive 2019-1847: "Decisive measures against protesters"', evidence: '3 recovered documents', isPrimary: false },
  { level: 'Regional Command', org: 'IRGC SE Regional Command — Brig. Gen. Ahmad Shafahi', entityId: 'JB-P-00098211', confidence: 'B2', action: 'Transmitted orders with ROE permitting live fire', evidence: '2 intercepted communications', isPrimary: false },
  { level: 'Provincial Command', org: 'Sistan-Baluchestan IRGC — Col. Davoud Ansari', entityId: 'JB-P-00283716', confidence: 'A1', action: 'Direct operational command. Ordered use of lethal force against protesters.', evidence: 'Radio intercepts + 4 testimonies + CCTV', isPrimary: true },
  { level: 'Unit Level', org: 'IRGC 41st Tharallah Brigade', entityId: '', confidence: 'A1', action: 'Carried out orders.', evidence: '89 documented deaths attributed', isPrimary: false },
];

const prosecutionItems = [
  { label: 'Command responsibility established (chain documented)', status: 'done' },
  { label: 'Individual orders traced to subject', status: 'done' },
  { label: 'Pattern of conduct (3 separate incidents)', status: 'done' },
  { label: 'Civilian status of victims confirmed', status: 'done' },
  { label: 'Witness testimony (6 statements)', status: 'done' },
  { label: 'Independent forensic verification', status: 'pending' },
  { label: '2 additional witness statements', status: 'pending' },
  { label: 'Assets frozen (coordinate FIN-ENF — pending authorization)', status: 'missing' },
];

const evidenceLog = [
  { type: 'Document', desc: 'SNSC Directive 2019-1847: "Use necessary force"', source: 'Seized records', date: '2019-09-28', adm: 'A1' },
  { type: 'Testimony', desc: 'Witness 04 — eyewitness, Ahvaz', source: 'HUMINT', date: '2025-06-12', adm: 'B2' },
  { type: 'SIGINT', desc: 'Intercept: Ansari orders to regional command', source: 'SIGINT', date: '2019-11-16', adm: 'A1' },
  { type: 'GEOINT', desc: 'Satellite: 14 unauthorized burial sites confirmed', source: 'GEOINT', date: '2021-03-04', adm: 'A1' },
  { type: 'Document', desc: 'Hospital records: falsified (concealed gunshot wounds)', source: 'Medical', date: 'Ongoing', adm: 'B1' },
];

export default function TrcSupPage() {
  const [activeTab, setActiveTab] = useState('Accountability Dashboard');
  const [selectedEvent, setSelectedEvent] = useState<ReturnType<typeof getTimelineEvents>[0] | null>(null);
  const events = getTimelineEvents();

  return (
    <div className="module-content" style={{ backgroundColor: '#0c0e18' }}>
      <ModuleHeader
        title="Truth & Reconciliation"
        code="TRC-SUP"
        subtitle="Supporting the Commission's evidentiary and investigative functions"
        status="Active"
        statusColor="#F59E0B"
      />

      <div className="border-b px-6 flex gap-0" style={{ borderColor: '#1e2533' }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="px-4 py-3 text-[12px] transition-colors border-b-2 -mb-px"
            style={{
              color: activeTab === tab ? '#F1F5F9' : '#64748B',
              borderBottomColor: activeTab === tab ? '#F59E0B' : 'transparent',
              fontWeight: activeTab === tab ? 500 : 400,
            }}>
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'Accountability Dashboard' && (
          <div className="space-y-5">
            <div className="grid grid-cols-5 gap-4">
              {[
                { label: 'Cases filed', value: '4,721', color: '#F1F5F9' },
                { label: 'Active investigation', value: '1,847', color: '#3B82F6' },
                { label: 'Prosecution-ready', value: '412', sub: '86% with evidence chain', color: '#10B981' },
                { label: 'Pending notifications', value: '238', color: '#F59E0B' },
                { label: 'Commanders identified', value: '69', sub: '23 with prima facie', color: '#EF4444' },
              ].map(c => (
                <div key={c.label} className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                  <div className="text-[22px] font-semibold" style={{ color: c.color }}>{c.value}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: '#64748B' }}>{c.label}</div>
                  {c.sub && <div className="text-[10px] mt-0.5" style={{ color: '#475569' }}>{c.sub}</div>}
                </div>
              ))}
            </div>

            <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="px-4 py-3 border-b" style={{ borderColor: '#1e2533' }}>
                <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>Priority cases</span>
              </div>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e2533' }}>
                    {['Case', 'Event', 'Primary subjects', 'Readiness', 'Status'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.06em]" style={{ color: '#475569' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#1e2533' }}>
                  <tr className="hover:bg-[#161b27] cursor-pointer" onClick={() => setActiveTab('Investigation Workspace')}>
                    <td className="px-4 py-3 text-[11px] font-mono" style={{ color: '#3B82F6' }}>TRC-INV-2019-001</td>
                    <td className="px-4 py-3 text-[12px]" style={{ color: '#94A3B8' }}>Bloody November 2019</td>
                    <td className="px-4 py-3">
                      <EntityTag entityId="JB-P-00283716" name="Col. Ansari" />
                      <span className="text-[11px] ml-1" style={{ color: '#475569' }}>+13</span>
                    </td>
                    <td className="px-4 py-3 w-36"><ConfidenceBar value={87} height={4} /></td>
                    <td className="px-4 py-3"><StatusTag status="active" /></td>
                  </tr>
                  {[
                    { id: 'TRC-INV-2009-047', ev: 'Green Movement 2009', r: 61 },
                    { id: 'TRC-INV-1988-001', ev: 'Mass Executions 1988', r: 74 },
                    { id: 'TRC-INV-2022-089', ev: 'Mahsa Amini Uprising', r: 42 },
                    { id: 'TRC-INV-2020-001', ev: 'Flight PS752', r: 68 },
                  ].map(row => (
                    <tr key={row.id} className="hover:bg-[#161b27] transition-colors">
                      <td className="px-4 py-3 text-[11px] font-mono" style={{ color: '#3B82F6' }}>{row.id}</td>
                      <td className="px-4 py-3 text-[12px]" style={{ color: '#94A3B8' }}>{row.ev}</td>
                      <td className="px-4 py-3 text-[11px]" style={{ color: '#64748B' }}>Multiple</td>
                      <td className="px-4 py-3 w-36"><ConfidenceBar value={row.r} height={4} /></td>
                      <td className="px-4 py-3"><StatusTag status="active" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Historical Timeline' && (
          <div className="space-y-4">
            <div className="text-[11px]" style={{ color: '#64748B' }}>
              Gregorian and Jalali calendars — 1979 to present. Click events to view case details.
            </div>

            <div className="relative overflow-x-auto pb-4" style={{ minHeight: 240 }}>
              <div className="relative" style={{ minWidth: Math.max(800, events.length * 145) + 'px', height: 220 }}>
                <div className="absolute left-8 right-8 h-0.5" style={{ top: '50%', backgroundColor: '#1e2533' }} />

                {events.map((ev, i) => {
                  const x = 5 + (i / (events.length - 1)) * 90;
                  const isAbove = i % 2 === 0;
                  const deaths = ev.deaths || 1;
                  const size = Math.max(14, Math.min(44, 14 + Math.log(deaths + 1) * 6));
                  const color = deaths > 500 ? '#EF4444' : deaths > 50 ? '#F97316' : deaths > 5 ? '#F59E0B' : '#3B82F6';
                  const isSelected = selectedEvent?.id === ev.id;

                  return (
                    <button key={ev.id}
                      onClick={() => setSelectedEvent(isSelected ? null : ev)}
                      className="absolute transition-transform hover:scale-110"
                      style={{
                        left: `${x}%`,
                        top: '50%',
                        transform: `translate(-50%, -50%)`,
                        zIndex: isSelected ? 10 : 1,
                      }}>
                      <div
                        className="rounded-full border-2 flex items-center justify-center"
                        style={{
                          width: size, height: size,
                          backgroundColor: `${color}${isSelected ? '40' : '18'}`,
                          borderColor: color,
                          boxShadow: isSelected ? `0 0 14px ${color}60` : 'none',
                        }}>
                        {deaths > 100 && (
                          <span className="text-[8px] font-bold" style={{ color }}>
                            {deaths >= 1000 ? `${(deaths / 1000).toFixed(0)}k` : deaths}
                          </span>
                        )}
                      </div>
                      <div className={`absolute ${isAbove ? 'bottom-full mb-2' : 'top-full mt-2'} -translate-x-1/2 left-1/2 text-center whitespace-nowrap`}>
                        <div className="text-[10px] font-medium" style={{ color: '#94A3B8' }}>{ev.jalaliDate.split('/')[0]}</div>
                        <div className="text-[9px]" style={{ color: '#475569' }}>{new Date(ev.date).getFullYear()}</div>
                        <div className="text-[10px] max-w-[90px] mx-auto leading-tight" style={{ color: '#64748B' }}>{ev.title}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedEvent && (
              <div className="rounded-lg border p-4 slide-in-panel" style={{ backgroundColor: '#0f1117', borderColor: '#2d3a52' }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-[14px] font-semibold" style={{ color: '#F1F5F9' }}>{selectedEvent.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[11px] font-mono" style={{ color: '#64748B' }}>{selectedEvent.jalaliDate}</span>
                      <span style={{ color: '#475569' }}>·</span>
                      <span className="text-[11px] font-mono" style={{ color: '#64748B' }}>{new Date(selectedEvent.date).getFullYear()}</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedEvent(null)} className="p-1 rounded hover:bg-[#1e2533]">
                    <X size={14} style={{ color: '#475569' }} />
                  </button>
                </div>
                <p className="text-[12px] leading-relaxed mb-4" style={{ color: '#94A3B8' }}>{selectedEvent.description}</p>
                <div className="grid grid-cols-4 gap-3 mb-3">
                  {[
                    { l: 'Deaths', v: selectedEvent.deaths.toLocaleString(), c: '#EF4444' },
                    { l: 'Commanders', v: `${selectedEvent.commandersIdentified}`, c: '#F97316' },
                    { l: 'Victims doc.', v: selectedEvent.victimsDocumented.toLocaleString(), c: '#F59E0B' },
                    { l: 'Evidence pkgs', v: `${selectedEvent.evidencePackages}`, c: '#3B82F6' },
                  ].map(s => (
                    <div key={s.l} className="text-center p-2 rounded" style={{ backgroundColor: '#161b27' }}>
                      <div className="text-[16px] font-semibold" style={{ color: s.c }}>{s.v}</div>
                      <div className="text-[10px]" style={{ color: '#475569' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                {selectedEvent.id === 'te-2019' && (
                  <button onClick={() => { setActiveTab('Investigation Workspace'); setSelectedEvent(null); }}
                    className="px-4 py-2 rounded text-[12px] font-medium"
                    style={{ backgroundColor: '#F59E0B20', color: '#F59E0B', border: '1px solid #F59E0B30' }}>
                    Open investigation workspace →
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'Investigation Workspace' && (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3 space-y-3">
              <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="text-[11px] font-mono mb-1" style={{ color: '#F59E0B' }}>TRC-INV-2019-001</div>
                <div className="text-[13px] font-medium mb-1" style={{ color: '#F1F5F9' }}>Bloody November Crackdowns</div>
                <div className="text-[11px] mb-3" style={{ color: '#64748B' }}>4 cities — Tehran, Isfahan, Mashhad, Ahvaz</div>
                <div className="space-y-2">
                  {[
                    { eid: 'JB-P-00283716', name: 'Col. Davoud Ansari', status: 'prosecution-ready', ev: '3 directives, 89 deaths' },
                    { eid: 'JB-P-00098211', name: 'Brig. Gen. Ahmad Shafahi', status: 'active', ev: '2 intercepts, 4 witnesses' },
                  ].map(s => (
                    <div key={s.eid} className="p-2.5 rounded-md" style={{ backgroundColor: '#161b27' }}>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <EntityTag entityId={s.eid} name={s.name} className="text-[11px]" />
                        <StatusTag status={s.status} />
                      </div>
                      <div className="text-[10px]" style={{ color: '#475569' }}>{s.ev}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="px-3 py-2.5 border-b" style={{ borderColor: '#1e2533' }}>
                  <span className="text-[11px] font-medium" style={{ color: '#F1F5F9' }}>Evidence log</span>
                </div>
                <div className="divide-y" style={{ borderColor: '#1e2533' }}>
                  {evidenceLog.map((ev, i) => (
                    <div key={i} className="px-3 py-2.5">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: '#1e2533', color: '#06B6D4' }}>{ev.type}</span>
                        <AdmiraltyBadge code={ev.adm} />
                      </div>
                      <div className="text-[11px] mt-1" style={{ color: '#94A3B8' }}>{ev.desc}</div>
                      <div className="text-[10px] mt-0.5" style={{ color: '#475569' }}>{ev.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-5">
              <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="text-[12px] font-medium mb-4" style={{ color: '#F1F5F9' }}>Accountability chain</div>
                <div>
                  {chainNodes.map((node, i) => (
                    <div key={i}>
                      <div className="rounded-md p-3 border"
                        style={{
                          backgroundColor: node.isPrimary ? '#1a1a0a' : '#0d0f15',
                          borderColor: node.isPrimary ? '#F59E0B40' : '#1e2533',
                          borderLeft: node.isPrimary ? '3px solid #F59E0B' : '1px solid #1e2533',
                        }}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] uppercase tracking-[0.06em]"
                            style={{ color: node.isPrimary ? '#F59E0B' : '#475569' }}>
                            {node.level}{node.isPrimary && ' — Primary Subject'}
                          </span>
                          <AdmiraltyBadge code={node.confidence} />
                        </div>
                        <div className="text-[12px] font-medium mb-1" style={{ color: '#94A3B8' }}>
                          {node.entityId
                            ? <EntityTag entityId={node.entityId} name={node.org} />
                            : <span>{node.org}</span>}
                        </div>
                        <p className="text-[11px]" style={{ color: '#64748B' }}>{node.action}</p>
                        <div className="text-[10px] mt-1.5" style={{ color: '#475569' }}>Evidence: {node.evidence}</div>
                      </div>
                      {i < chainNodes.length - 1 && <div className="chain-connector" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-4 space-y-3">
              <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="text-[12px] font-medium mb-1" style={{ color: '#F1F5F9' }}>Prosecution readiness</div>
                <div className="text-[11px] mb-3" style={{ color: '#64748B' }}>Subject: Col. Davoud Ansari</div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[30px] font-semibold" style={{ color: '#10B981' }}>87%</span>
                  <ConfidenceBar value={87} height={8} className="flex-1" />
                </div>
                <div className="space-y-2">
                  {prosecutionItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="flex-shrink-0">
                        {item.status === 'done' ? '✅' : item.status === 'pending' ? '⏳' : '❌'}
                      </span>
                      <span className="text-[11px]" style={{
                        color: item.status === 'done' ? '#94A3B8' : item.status === 'pending' ? '#F59E0B' : '#EF4444'
                      }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="text-[11px] font-medium mb-2" style={{ color: '#94A3B8' }}>Legal basis</div>
                <div className="text-[11px]" style={{ color: '#64748B' }}>Rome Statute Article 7 — Crimes Against Humanity</div>
                <div className="text-[11px] mt-1" style={{ color: '#64748B' }}>ICJ referral: Eligible</div>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Generate prosecution package', color: '#10B981' },
                  { label: 'Request evidence review', color: '#94A3B8' },
                  { label: 'Notify Commission', color: '#94A3B8' },
                ].map(btn => (
                  <button key={btn.label}
                    className="w-full py-2 rounded text-[12px] font-medium"
                    style={{
                      backgroundColor: btn.color === '#10B981' ? '#10B98120' : '#1e2533',
                      color: btn.color,
                      border: btn.color === '#10B981' ? '1px solid #10B98130' : 'none',
                    }}>
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
