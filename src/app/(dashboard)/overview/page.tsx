'use client';

import Link from 'next/link';
import {
  Shield, DollarSign, MapPin, BookOpen, FileText, Eye,
  Activity,
  ArrowRight
} from 'lucide-react';
import { ModuleHeader } from '@/components/layout/ModuleHeader';
import { EntityTag } from '@/components/shared/EntityTag';

const moduleCards = [
  {
    href: '/ct-ops',
    code: 'CT-OPS',
    label: 'Counterterrorism',
    icon: Shield,
    color: '#DC2626',
    stat: '23',
    statLabel: 'Active investigations',
    detail: '4 pending judicial authorization',
    alert: 'Operation SPARROW — active threat assessment',
    alertLevel: 'high',
  },
  {
    href: '/fin-enf',
    code: 'FIN-ENF',
    label: 'Asset Recovery',
    icon: DollarSign,
    color: '#1D4ED8',
    stat: '$8.7B',
    statLabel: 'Secured to date',
    detail: '$47B under investigation',
    alert: 'Asset flight alert — $47.2M Dubai transfer',
    alertLevel: 'high',
  },
  {
    href: '/bdr-sec',
    code: 'BDR-SEC',
    label: 'Border Security',
    icon: MapPin,
    color: '#D97706',
    stat: '4,847',
    statLabel: 'Watch entries active',
    detail: '3 interdictions today',
    alert: 'Col. Ansari — interdicted at Bazargan',
    alertLevel: 'confirmed',
  },
  {
    href: '/trc-sup',
    code: 'TRC-SUP',
    label: 'Truth & Reconciliation',
    icon: BookOpen,
    color: '#D97706',
    stat: '412',
    statLabel: 'Prosecution-ready cases',
    detail: '4,721 cases filed',
    alert: 'Ansari dossier — 87% prosecution readiness',
    alertLevel: 'active',
  },
  {
    href: '/exec-brief',
    code: null,
    label: 'Executive Briefing',
    icon: FileText,
    color: '#7C3AED',
    stat: '34',
    statLabel: 'Products issued (30d)',
    detail: '2 pending review',
    alert: 'Daily brief — EB-2026-0034 ready',
    alertLevel: 'active',
  },
  {
    href: '/oversight',
    code: null,
    label: 'Oversight Console',
    icon: Eye,
    color: '#1D4ED8',
    stat: '12',
    statLabel: 'Authorizations pending',
    detail: '0 policy violations',
    alert: 'Auth queue — 2 items approaching deadline',
    alertLevel: 'medium',
  },
];

const alertLevelColors: Record<string, string> = {
  high: '#DC2626', confirmed: '#16A34A', active: '#1D4ED8',
  medium: '#D97706', low: '#78716C',
};

const recentActivity = [
  { time: '09:56', actor: 'JAHAN-AI', action: 'Cross-module link: Ansari — Al-Furqan Trading LLC', module: 'CT-OPS' },
  { time: '09:56', actor: 'JB-0471', action: 'Generated assessment CT-OPS-2026-0047-A', module: 'CT-OPS' },
  { time: '09:42', actor: 'JAHAN-AI', action: 'Asset flight alert: $47.2M movement — Dubai', module: 'FIN-ENF' },
  { time: '09:38', actor: 'JAHAN-AI', action: 'Biometric match: Col. Ansari at Bazargan (94.7%)', module: 'BDR-SEC' },
  { time: '09:35', actor: 'JB-0471', action: 'Session authenticated', module: 'SYSTEM' },
];

const moduleColors: Record<string, string> = {
  'CT-OPS': '#DC2626', 'FIN-ENF': '#1D4ED8', 'BDR-SEC': '#D97706',
  'TRC-SUP': '#D97706', 'SYSTEM': '#A8A29E', 'EXEC': '#7C3AED',
};

export default function OverviewPage() {
  return (
    <div className="module-content">
      <ModuleHeader
        title="Platform Overview"
        subtitle="Integrated intelligence — February 2026"
        status="23 active investigations"
        statusColor="#1D4ED8"
      />

      <div className="p-6 space-y-6 bg-app-section">
        {/* Cross-module Ansari story */}
        <div className="rounded-lg border border-app-border p-4 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={14} className="text-accent-blue" />
            <span className="text-[12px] font-medium text-text-primary">
              Cross-module: <EntityTag entityId="JB-P-00283716" name="Colonel Davoud Ansari" /> — Integrated assessment
            </span>
            <span className="ml-auto text-[11px] px-2 py-0.5 rounded font-mono"
              style={{ backgroundColor: '#DCFCE7', color: '#16A34A', border: '1px solid #BBF7D0' }}>
              Confirmed
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[
              { day: 'Day 12', module: 'CT-OPS', event: 'Named as financial link to Taghavi cell', color: '#DC2626' },
              { day: 'Day 18', module: 'FIN-ENF', event: '$23.4M in offshore accounts identified', color: '#1D4ED8' },
              { day: 'Day 25', module: 'TRC-SUP', event: '3 SNSC directives, 89 deaths attributed', color: '#D97706' },
              { day: 'Day 31', module: 'FIN-ENF', event: 'Asset flight — UAE transfer initiated', color: '#1D4ED8' },
              { day: 'Day 38', module: 'BDR-SEC', event: 'Interdicted at Bazargan under forged identity', color: '#D97706' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="h-0.5 rounded" style={{ backgroundColor: item.color }} />
                <div className="text-[10px] font-mono" style={{ color: item.color }}>{item.day}</div>
                <div className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: `${item.color}10`, color: item.color }}>
                  {item.module}
                </div>
                <div className="text-[11px] text-text-secondary">{item.event}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-app-border">
            <Link href="/entity/JB-P-00283716" className="text-[11px] flex items-center gap-1 hover:opacity-80 transition-opacity text-accent-blue">
              <ArrowRight size={11} />
              View full entity dossier
            </Link>
          </div>
        </div>

        {/* Module cards */}
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.06em] font-medium mb-3 text-text-tertiary">Modules</h2>
          <div className="grid grid-cols-3 gap-3">
            {moduleCards.map(card => {
              const Icon = card.icon;
              return (
                <Link key={card.href} href={card.href}>
                  <div className="rounded-lg border border-app-border p-4 transition-all hover:border-app-border-active bg-white cursor-pointer group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon size={14} style={{ color: card.color }} />
                        <div>
                          <div className="text-[12px] font-medium text-text-primary">{card.label}</div>
                          {card.code && <div className="text-[10px] font-mono text-text-tertiary">{card.code}</div>}
                        </div>
                      </div>
                      <ArrowRight size={12} className="text-text-tertiary group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <div className="mb-2">
                      <div className="text-[20px] font-semibold text-text-primary">{card.stat}</div>
                      <div className="text-[11px] text-text-secondary">{card.statLabel}</div>
                    </div>
                    <div className="text-[11px] mb-2 text-text-tertiary">{card.detail}</div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-app-border">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: alertLevelColors[card.alertLevel] }} />
                      <span className="text-[10px] truncate text-text-secondary">{card.alert}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Recent activity */}
          <div className="col-span-2 rounded-lg border border-app-border bg-white">
            <div className="px-4 py-3 border-b border-app-border flex items-center justify-between">
              <span className="text-[12px] font-medium text-text-primary">Recent activity</span>
              <Link href="/oversight" className="text-[11px] hover:opacity-80 text-accent-blue">View audit log</Link>
            </div>
            <div className="divide-y divide-app-border">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-2.5">
                  <span className="text-[11px] font-mono flex-shrink-0 mt-0.5 text-text-tertiary">{item.time}</span>
                  <div className="min-w-0">
                    <span className="text-[11px] font-medium mr-1.5 text-text-primary">{item.actor}</span>
                    <span className="text-[11px] text-text-secondary">{item.action}</span>
                  </div>
                  <span className="text-[10px] font-mono flex-shrink-0 px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: `${moduleColors[item.module] || '#78716C'}12`, color: moduleColors[item.module] || '#78716C' }}>
                    {item.module}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Status summary */}
          <div className="space-y-3">
            <div className="rounded-lg border border-app-border p-4 bg-white">
              <div className="text-[11px] font-medium mb-3 text-text-primary">Platform status</div>
              <div className="space-y-2">
                {[
                  { label: 'Analysts online', value: '12', color: '#16A34A' },
                  { label: 'Active cases', value: '23', color: '#1D4ED8' },
                  { label: 'Pending auth', value: '2', color: '#D97706' },
                  { label: 'New alerts (24h)', value: '7', color: '#DC2626' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-[11px] text-text-secondary">{item.label}</span>
                    <span className="text-[12px] font-medium font-mono" style={{ color: item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-app-border p-4 bg-white">
              <div className="text-[11px] font-medium mb-3 text-text-primary">Authorization queue</div>
              {[
                { ref: 'AUTH-2026-0089', desc: 'SIGINT continuance', deadline: 'Feb 05' },
                { ref: 'AUTH-2026-0088', desc: 'Asset freeze — UAE', deadline: 'Feb 04' },
              ].map(item => (
                <div key={item.ref} className="flex items-center justify-between py-1.5">
                  <div>
                    <div className="text-[11px] font-mono text-accent-amber">{item.ref}</div>
                    <div className="text-[10px] text-text-secondary">{item.desc}</div>
                  </div>
                  <div className="text-[10px] font-mono text-text-tertiary">{item.deadline}</div>
                </div>
              ))}
              <Link href="/oversight" className="block mt-2 pt-2 border-t border-app-border text-[11px] text-accent-blue">
                Review queue →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
