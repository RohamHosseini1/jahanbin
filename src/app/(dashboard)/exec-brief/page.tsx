'use client';

import { useState } from 'react';
import Link from 'next/link';
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

const statusConfig: Record<string, { label: string; bg: string; color: string; border: string }> = {
  'pending-review': { label: 'Pending review', bg: '#FEF3C7', color: '#92400E', border: '#FDE68A' },
  'disseminated':   { label: 'Disseminated',   bg: '#D1FAE5', color: '#065F46', border: '#A7F3D0' },
  'pending-auth':   { label: 'Pending auth',   bg: '#EDE9FE', color: '#5B21B6', border: '#DDD6FE' },
};

const briefItems = [
  {
    n: 1, label: 'INFRASTRUCTURE', sub: 'Sabotage threat, south Tehran', confLabel: 'HIGH CONFIDENCE', confidence: 87, color: '#DC2626',
    body: 'An active cell of 7–9 individuals is planning an infrastructure attack targeting electrical distribution in south Tehran. Estimated window: 7–14 days. Cell leader identified: JB-P-00142857. Financial and border coordination orders issued.',
    link: '/ct-ops', ref: 'CT-OPS-2026-0047-A',
    accentBg: '#FEF2F2', accentBorder: '#FECACA',
  },
  {
    n: 2, label: 'FINANCIAL', sub: 'Asset flight detected, UAE ($47.2M)', confLabel: 'HIGH CONFIDENCE', confidence: 83, color: '#0891B2',
    body: '$47.2M transferred via 4 shell entities to personal account, Dubai. Linked to Khatam procurement network. Freeze request submitted — pending Emirati coordination. 3 additional flight-risk accounts identified.',
    link: '/fin-enf', ref: 'FIN-ENF-2026-0038',
    accentBg: '#ECFEFF', accentBorder: '#A5F3FC',
  },
  {
    n: 3, label: 'BORDER', sub: 'Priority subject interdicted, Bazargan', confLabel: 'CONFIRMED', confidence: 95, color: '#EA580C',
    body: 'Colonel Davoud Ansari (JB-P-00283716) intercepted traveling under forged identity (Kamyar Shirazi). Biometric match: 94.7%. Subject detained. TRC cross-reference: 89 civilian deaths attributed, prosecution readiness 87%.',
    link: '/bdr-sec', ref: 'BDR-2026-0038-A',
    accentBg: '#FFF7ED', accentBorder: '#FED7AA',
  },
];

const timeline = [
  { day: 'Day 12', module: 'CT-OPS',  Icon: Shield,     color: '#DC2626', desc: 'Named as financial link to Taghavi cell' },
  { day: 'Day 18', module: 'FIN-ENF', Icon: DollarSign, color: '#0891B2', desc: '$23.4M offshore accounts identified' },
  { day: 'Day 25', module: 'TRC-SUP', Icon: BookOpen,   color: '#D97706', desc: '3 SNSC directives, 89 deaths attributed' },
  { day: 'Day 31', module: 'FIN-ENF', Icon: DollarSign, color: '#0891B2', desc: 'Asset flight — UAE transfer initiated' },
  { day: 'Day 38', module: 'BDR-SEC', Icon: MapPin,     color: '#EA580C', desc: 'Interdicted at Bazargan — forged identity' },
];

export default function ExecBriefPage() {
  const [activeTab, setActiveTab] = useState('Daily Brief');

  return (
    <div className="module-content" style={{ backgroundColor: '#FAFAF9', minHeight: '100%' }}>
      {/* Page header */}
      <div className="px-6 pt-6 pb-0">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h1 className="text-[20px] font-semibold tracking-tight" style={{ color: '#1C1917' }}>
              Executive Briefing
            </h1>
            <p className="text-[12px] mt-0.5" style={{ color: '#78716C' }}>
              Authorized: National Transitional Authority — Cabinet Level
            </p>
          </div>
          <span
            className="text-[11px] font-medium px-2.5 py-1 rounded-full"
            style={{ backgroundColor: '#EDE9FE', color: '#7C3AED', border: '1px solid #DDD6FE' }}>
            3 priority items
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mt-4 px-6 flex gap-0" style={{ borderColor: '#E7E5E4' }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-3 text-[12px] transition-colors border-b-2 -mb-px"
            style={{
              color: activeTab === tab ? '#1C1917' : '#78716C',
              borderBottomColor: activeTab === tab ? '#7C3AED' : 'transparent',
              fontWeight: activeTab === tab ? 600 : 400,
              background: 'transparent',
            }}>
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'Daily Brief' && (
          <div className="max-w-3xl mx-auto">
            {/* Document card */}
            <div
              className="rounded-xl border overflow-hidden"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#E7E5E4', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>

              {/* Document header / classification block */}
              <div
                className="px-6 py-4 border-b"
                style={{ backgroundColor: '#F5F5F4', borderColor: '#E7E5E4' }}>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 font-mono text-[11px]">
                  {[
                    ['Product',         'EXECUTIVE BRIEF — EB-2026-0034'],
                    ['Generated',       '09:47 Tehran · 3 February 2026 · 3 Bahman 1404'],
                    ['Classification',  'RESTRICTED'],
                    ['Authorized for',  'National Transitional Authority — Cabinet Level'],
                  ].map(([l, v]) => (
                    <div key={l} className="flex gap-2">
                      <span style={{ color: '#78716C', minWidth: 90 }}>{l}:</span>
                      <span
                        style={{
                          color: l === 'Classification' ? '#B45309' : '#1C1917',
                          fontWeight: l === 'Classification' ? 600 : 400,
                        }}>
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-6 space-y-7">

                {/* Priority items */}
                <div>
                  <div
                    className="text-[10px] uppercase tracking-[0.1em] font-semibold mb-4"
                    style={{ color: '#78716C' }}>
                    Priority Items (3)
                  </div>
                  <div className="space-y-3">
                    {briefItems.map(item => (
                      <div
                        key={item.n}
                        className="rounded-lg border p-4"
                        style={{ backgroundColor: item.accentBg, borderColor: item.accentBorder }}>
                        <div className="flex items-start gap-3">
                          {/* Number */}
                          <span
                            className="text-[13px] font-mono font-semibold flex-shrink-0 w-5 text-right"
                            style={{ color: item.color }}>
                            {item.n}.
                          </span>
                          <div className="flex-1 min-w-0">
                            {/* Label row */}
                            <div className="flex items-center gap-2 flex-wrap mb-1.5">
                              <span
                                className="text-[11px] font-mono font-bold tracking-wide"
                                style={{ color: item.color }}>
                                {item.label}
                              </span>
                              <span className="text-[11px]" style={{ color: '#A8A29E' }}>—</span>
                              <span className="text-[12px] font-medium" style={{ color: '#1C1917' }}>
                                {item.sub}
                              </span>
                              <div className="ml-auto flex items-center gap-2 flex-shrink-0">
                                <ConfidenceBar value={item.confidence} height={3} className="w-14" />
                                <span
                                  className="text-[10px] font-mono font-semibold whitespace-nowrap"
                                  style={{ color: item.color }}>
                                  {item.confLabel}
                                </span>
                              </div>
                            </div>
                            {/* Body text */}
                            <p
                              className="text-[12px] leading-relaxed mb-2"
                              style={{ color: '#44403C' }}>
                              {item.body}
                            </p>
                            {/* Link */}
                            <Link
                              href={item.link}
                              className="text-[11px] font-medium hover:opacity-80 transition-opacity"
                              style={{ color: item.color }}>
                              Full assessment: {item.ref} →
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px" style={{ backgroundColor: '#E7E5E4' }} />

                {/* Cross-module Ansari timeline */}
                <div>
                  <div
                    className="text-[10px] uppercase tracking-[0.1em] font-semibold mb-1"
                    style={{ color: '#78716C' }}>
                    Cross-module:{' '}
                    <EntityTag entityId="JB-P-00283716" name="Colonel Davoud Ansari" />{' '}
                    — Integrated Assessment
                  </div>
                  <p className="text-[12px] mb-5" style={{ color: '#78716C' }}>
                    One subject, identified independently across 5 analytical workstreams.
                  </p>

                  {/* Timeline */}
                  <div className="relative">
                    {/* Connecting line */}
                    <div
                      className="absolute top-5 left-[calc(10%)] right-[calc(10%)] h-px"
                      style={{ backgroundColor: '#E7E5E4' }}
                    />
                    <div className="grid grid-cols-5 gap-2 relative z-10">
                      {timeline.map((item, i) => {
                        const { Icon } = item;
                        return (
                          <div key={i} className="flex flex-col items-center gap-2">
                            <div
                              className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                              style={{
                                backgroundColor: '#FFFFFF',
                                borderColor: item.color,
                                boxShadow: `0 0 0 3px ${item.color}18`,
                              }}>
                              <Icon size={14} style={{ color: item.color }} />
                            </div>
                            <div className="text-center">
                              <div
                                className="text-[10px] font-mono font-semibold mb-0.5"
                                style={{ color: item.color }}>
                                {item.day}
                              </div>
                              <div
                                className="text-[10px] font-medium px-1.5 py-0.5 rounded inline-block"
                                style={{
                                  backgroundColor: `${item.color}14`,
                                  color: item.color,
                                }}>
                                {item.module}
                              </div>
                              <div
                                className="text-[10px] mt-1 leading-tight"
                                style={{ color: '#78716C' }}>
                                {item.desc}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <p
                    className="text-[11px] leading-relaxed mt-5 italic"
                    style={{ color: '#A8A29E' }}>
                    Without integrated intelligence, each of these findings would have been investigated by
                    separate agencies with no awareness of the others. This is what integrated intelligence looks like.
                  </p>
                </div>
              </div>

              {/* Footer actions */}
              <div
                className="px-6 py-4 border-t flex gap-3"
                style={{ borderColor: '#E7E5E4', backgroundColor: '#F5F5F4' }}>
                <Link
                  href="/entity/JB-P-00283716"
                  className="px-4 py-2 rounded-md text-[12px] font-medium transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: '#EFF6FF',
                    color: '#1D4ED8',
                    border: '1px solid #BFDBFE',
                  }}>
                  Full entity dossier: Col. Ansari
                </Link>
                <button
                  className="px-4 py-2 rounded-md text-[12px] font-medium transition-colors"
                  style={{ backgroundColor: '#FFFFFF', color: '#78716C', border: '1px solid #E7E5E4' }}>
                  Export brief
                </button>
                <button
                  className="px-4 py-2 rounded-md text-[12px] font-medium transition-colors"
                  style={{ backgroundColor: '#FFFFFF', color: '#78716C', border: '1px solid #E7E5E4' }}>
                  Mark as read
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Intelligence Products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[12px]" style={{ color: '#78716C' }}>
                {products.length} products
              </span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1.5 rounded-md text-[12px] font-medium"
                  style={{
                    backgroundColor: '#EDE9FE',
                    color: '#7C3AED',
                    border: '1px solid #DDD6FE',
                  }}>
                  Submit product
                </button>
                <button
                  className="px-3 py-1.5 rounded-md text-[12px]"
                  style={{
                    backgroundColor: '#F5F5F4',
                    color: '#78716C',
                    border: '1px solid #E7E5E4',
                  }}>
                  Dissemination registry
                </button>
              </div>
            </div>

            <div
              className="rounded-xl border overflow-hidden"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#E7E5E4', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #E7E5E4', backgroundColor: '#F5F5F4' }}>
                    {['Status', 'Reference', 'Title', 'Prepared by', 'Date', 'Disseminated to'].map(h => (
                      <th
                        key={h}
                        className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.07em] font-semibold"
                        style={{ color: '#78716C' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => {
                    const cfg = statusConfig[p.status] ?? { label: p.status, bg: '#F5F5F4', color: '#78716C', border: '#E7E5E4' };
                    return (
                      <tr
                        key={i}
                        className="transition-colors"
                        style={{
                          borderBottom: i < products.length - 1 ? '1px solid #F5F5F4' : 'none',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAF9')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                        <td className="px-4 py-3">
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[11px] font-mono" style={{ color: '#1D4ED8' }}>{p.ref}</td>
                        <td className="px-4 py-3 text-[12px]" style={{ color: '#1C1917' }}>{p.title}</td>
                        <td className="px-4 py-3 text-[11px] font-mono" style={{ color: '#78716C' }}>{p.by}</td>
                        <td className="px-4 py-3 text-[11px] font-mono" style={{ color: '#A8A29E' }}>{p.date}</td>
                        <td className="px-4 py-3 text-[11px]" style={{ color: '#78716C' }}>{p.to}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
