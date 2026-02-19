'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ModuleHeader } from '@/components/layout/ModuleHeader';
import { StatusTag } from '@/components/shared/StatusTag';
import { EntityTag } from '@/components/shared/EntityTag';
import { ConfidenceBar } from '@/components/shared/ConfidenceBar';
import { Shield, DollarSign, MapPin, BookOpen } from 'lucide-react';

const TABS = ['Daily Brief', 'Intelligence Products'];

const products = [
  { status: 'pending-review', ref: 'CT-OPS-2026-0047-A', title: 'Infrastructure threat assessment', by: 'JB-0471', date: '2026-02-03', to: '—' },
  { status: 'disseminated', ref: 'BDR-2026-0038-A', title: 'Ansari interdiction report', by: 'JB-0892', date: '2026-02-03', to: 'NT Authority, TRC Commission' },
  { status: 'disseminated', ref: 'FIN-ENF-2026-0031', title: 'Khatam network — asset mapping', by: 'JB-0344', date: '2026-01-28', to: 'NT Authority' },
  { status: 'pending-auth', ref: 'TRC-INV-2019-001-PKG', title: 'Bloody November — Ansari dossier', by: 'JB-0201', date: '2026-01-30', to: '—' },
];

const briefItems = [
  {
    n: 1, label: 'INFRASTRUCTURE', sub: 'Sabotage threat, south Tehran', confLabel: 'HIGH CONFIDENCE', confidence: 87, color: '#EF4444',
    body: 'An active cell of 7–9 individuals is planning an infrastructure attack targeting electrical distribution in south Tehran. Estimated window: 7–14 days. Cell leader identified: JB-P-00142857. Financial and border coordination orders issued.',
    link: '/ct-ops', ref: 'CT-OPS-2026-0047-A',
  },
  {
    n: 2, label: 'FINANCIAL', sub: 'Asset flight detected, UAE ($47.2M)', confLabel: 'HIGH CONFIDENCE', confidence: 83, color: '#06B6D4',
    body: '$47.2M transferred via 4 shell entities to personal account, Dubai. Linked to Khatam procurement network. Freeze request submitted — pending Emirati coordination. 3 additional flight-risk accounts identified.',
    link: '/fin-enf', ref: 'FIN-ENF-2026-0038',
  },
  {
    n: 3, label: 'BORDER', sub: 'Priority subject interdicted, Bazargan', confLabel: 'CONFIRMED', confidence: 95, color: '#F97316',
    body: 'Colonel Davoud Ansari (JB-P-00283716) intercepted traveling under forged identity (Kamyar Shirazi). Biometric match: 94.7%. Subject detained. TRC cross-reference: 89 civilian deaths attributed, prosecution readiness 87%.',
    link: '/bdr-sec', ref: 'BDR-2026-0038-A',
  },
];

const timeline = [
  { day: 'Day 12', module: 'CT-OPS', Icon: Shield, color: '#EF4444', desc: 'Named as financial link to Taghavi cell' },
  { day: 'Day 18', module: 'FIN-ENF', Icon: DollarSign, color: '#06B6D4', desc: '$23.4M offshore accounts identified' },
  { day: 'Day 25', module: 'TRC-SUP', Icon: BookOpen, color: '#F59E0B', desc: '3 SNSC directives, 89 deaths attributed' },
  { day: 'Day 31', module: 'FIN-ENF', Icon: DollarSign, color: '#06B6D4', desc: 'Asset flight — UAE transfer initiated' },
  { day: 'Day 38', module: 'BDR-SEC', Icon: MapPin, color: '#F97316', desc: 'Interdicted at Bazargan — forged identity' },
];

export default function ExecBriefPage() {
  const [activeTab, setActiveTab] = useState('Daily Brief');

  return (
    <div className="module-content">
      <ModuleHeader
        title="Executive Briefing"
        subtitle="Authorized: National Transitional Authority — Cabinet Level"
        status="3 priority items"
        statusColor="#8B5CF6"
      />

      <div className="border-b px-6 flex gap-0" style={{ borderColor: '#1e2533' }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="px-4 py-3 text-[12px] transition-colors border-b-2 -mb-px"
            style={{
              color: activeTab === tab ? '#F1F5F9' : '#64748B',
              borderBottomColor: activeTab === tab ? '#8B5CF6' : 'transparent',
              fontWeight: activeTab === tab ? 500 : 400,
            }}>
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'Daily Brief' && (
          <div className="max-w-3xl mx-auto">
            <div className="rounded-lg border" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="px-6 py-4 border-b font-mono text-[11px] space-y-1" style={{ borderColor: '#1e2533', backgroundColor: '#0d0f15' }}>
                {[
                  ['Product', 'EXECUTIVE BRIEF — EB-2026-0034'],
                  ['Generated', '09:47 Tehran · 3 February 2026 · 3 Bahman 1404'],
                  ['Classification', 'RESTRICTED'],
                  ['Authorized for', 'National Transitional Authority — Cabinet Level'],
                ].map(([l, v]) => (
                  <div key={l}>
                    <span style={{ color: '#475569' }}>{l}: </span>
                    <span style={{ color: l === 'Classification' ? '#F59E0B' : '#94A3B8' }}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="px-6 py-5 space-y-6">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.08em] font-medium mb-4" style={{ color: '#475569' }}>Priority Items (3)</div>
                  <div className="space-y-3">
                    {briefItems.map(item => (
                      <div key={item.n} className="p-4 rounded-md border" style={{ backgroundColor: '#0a0c10', borderColor: '#1e2533' }}>
                        <div className="flex items-start gap-3 mb-2">
                          <span className="text-[13px] font-mono" style={{ color: '#475569' }}>{item.n}.</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[11px] font-mono font-medium" style={{ color: item.color }}>{item.label}</span>
                              <span className="text-[11px]" style={{ color: '#475569' }}>—</span>
                              <span className="text-[11px]" style={{ color: '#94A3B8' }}>{item.sub}</span>
                              <div className="ml-auto flex items-center gap-1.5">
                                <ConfidenceBar value={item.confidence} height={3} className="w-14" />
                                <span className="text-[10px] font-mono whitespace-nowrap" style={{ color: item.color }}>{item.confLabel}</span>
                              </div>
                            </div>
                            <p className="text-[12px] leading-relaxed mt-1.5 mb-2" style={{ color: '#94A3B8' }}>{item.body}</p>
                            <Link href={item.link} className="text-[11px] hover:opacity-80 transition-opacity" style={{ color: item.color }}>
                              Full assessment: {item.ref} →
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px" style={{ backgroundColor: '#1e2533' }} />

                <div>
                  <div className="text-[11px] uppercase tracking-[0.08em] font-medium mb-1" style={{ color: '#475569' }}>
                    Cross-module: <EntityTag entityId="JB-P-00283716" name="Colonel Davoud Ansari" /> — Integrated Assessment
                  </div>
                  <p className="text-[12px] mb-4" style={{ color: '#94A3B8' }}>
                    One subject, identified independently across 5 analytical workstreams.
                  </p>

                  <div className="relative">
                    <div className="absolute top-5 left-0 right-0 h-px" style={{ backgroundColor: '#1e2533' }} />
                    <div className="grid grid-cols-5 gap-2 relative z-10">
                      {timeline.map((item, i) => {
                        const { Icon } = item;
                        return (
                          <div key={i} className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                              style={{ backgroundColor: '#0f1117', borderColor: item.color }}>
                              <Icon size={14} style={{ color: item.color }} />
                            </div>
                            <div className="text-center">
                              <div className="text-[10px] font-mono mb-0.5" style={{ color: item.color }}>{item.day}</div>
                              <div className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                                style={{ backgroundColor: `${item.color}18`, color: item.color }}>{item.module}</div>
                              <div className="text-[10px] mt-1 leading-tight" style={{ color: '#64748B' }}>{item.desc}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <p className="text-[11px] leading-relaxed mt-4 italic" style={{ color: '#64748B' }}>
                    Without integrated intelligence, each of these findings would have been investigated by separate agencies with no awareness of the others.
                    This is what integrated intelligence looks like.
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t flex gap-3" style={{ borderColor: '#1e2533', backgroundColor: '#0d0f15' }}>
                <Link href="/entity/JB-P-00283716"
                  className="px-4 py-2 rounded text-[12px] font-medium"
                  style={{ backgroundColor: '#3B82F620', color: '#3B82F6', border: '1px solid #3B82F630' }}>
                  Full entity dossier: Col. Ansari
                </Link>
                <button className="px-4 py-2 rounded text-[12px] font-medium" style={{ backgroundColor: '#1e2533', color: '#94A3B8' }}>
                  Export brief
                </button>
                <button className="px-4 py-2 rounded text-[12px] font-medium" style={{ backgroundColor: '#1e2533', color: '#94A3B8' }}>
                  Mark as read
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Intelligence Products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[12px]" style={{ color: '#64748B' }}>{products.length} products</span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded text-[12px] font-medium"
                  style={{ backgroundColor: '#8B5CF620', color: '#8B5CF6', border: '1px solid #8B5CF630' }}>
                  Submit product
                </button>
                <button className="px-3 py-1.5 rounded text-[12px]"
                  style={{ backgroundColor: '#1e2533', color: '#64748B' }}>
                  Dissemination registry
                </button>
              </div>
            </div>
            <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e2533' }}>
                    {['Status', 'Reference', 'Title', 'Prepared by', 'Date', 'Disseminated to'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.06em]" style={{ color: '#475569' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#1e2533' }}>
                  {products.map((p, i) => (
                    <tr key={i} className="hover:bg-[#161b27] cursor-pointer transition-colors">
                      <td className="px-4 py-3"><StatusTag status={p.status} /></td>
                      <td className="px-4 py-3 text-[11px] font-mono" style={{ color: '#3B82F6' }}>{p.ref}</td>
                      <td className="px-4 py-3 text-[12px]" style={{ color: '#F1F5F9' }}>{p.title}</td>
                      <td className="px-4 py-3 text-[11px] font-mono" style={{ color: '#64748B' }}>{p.by}</td>
                      <td className="px-4 py-3 text-[11px] font-mono" style={{ color: '#475569' }}>{p.date}</td>
                      <td className="px-4 py-3 text-[11px]" style={{ color: '#64748B' }}>{p.to}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
