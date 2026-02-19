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
    color: '#EF4444',
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
    color: '#06B6D4',
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
    color: '#F97316',
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
    color: '#F59E0B',
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
    color: '#8B5CF6',
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
    color: '#3B82F6',
    stat: '12',
    statLabel: 'Authorizations pending',
    detail: '0 policy violations',
    alert: 'Auth queue — 2 items approaching deadline',
    alertLevel: 'medium',
  },
];

const alertLevelColors: Record<string, string> = {
  high: '#EF4444', confirmed: '#10B981', active: '#3B82F6',
  medium: '#F59E0B', low: '#64748B',
};

const recentActivity = [
  { time: '09:56', actor: 'JAHAN-AI', action: 'Cross-module link: Ansari — Al-Furqan Trading LLC', module: 'CT-OPS' },
  { time: '09:56', actor: 'JB-0471', action: 'Generated assessment CT-OPS-2026-0047-A', module: 'CT-OPS' },
  { time: '09:42', actor: 'JAHAN-AI', action: 'Asset flight alert: $47.2M movement — Dubai', module: 'FIN-ENF' },
  { time: '09:38', actor: 'JAHAN-AI', action: 'Biometric match: Col. Ansari at Bazargan (94.7%)', module: 'BDR-SEC' },
  { time: '09:35', actor: 'JB-0471', action: 'Session authenticated', module: 'SYSTEM' },
];

const moduleColors: Record<string, string> = {
  'CT-OPS': '#EF4444', 'FIN-ENF': '#06B6D4', 'BDR-SEC': '#F97316',
  'TRC-SUP': '#F59E0B', 'SYSTEM': '#475569', 'EXEC': '#8B5CF6',
};

export default function OverviewPage() {
  return (
    <div className="module-content">
      <ModuleHeader
        title="Platform Overview"
        subtitle="Integrated intelligence — February 2026"
        status="23 active investigations"
        statusColor="#3B82F6"
      />

      <div className="p-6 space-y-6">
        {/* Cross-module Ansari story */}
        <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#2d3a52' }}>
          <div className="flex items-center gap-2 mb-3">
            <Activity size={14} style={{ color: '#3B82F6' }} />
            <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>
              Cross-module: <EntityTag entityId="JB-P-00283716" name="Colonel Davoud Ansari" /> — Integrated assessment
            </span>
            <span className="ml-auto text-[11px] px-2 py-0.5 rounded font-mono"
              style={{ backgroundColor: '#064e3b20', color: '#10B981', border: '1px solid #10B98130' }}>
              Confirmed
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[
              { day: 'Day 12', module: 'CT-OPS', event: 'Named as financial link to Taghavi cell', color: '#EF4444' },
              { day: 'Day 18', module: 'FIN-ENF', event: '$23.4M in offshore accounts identified', color: '#06B6D4' },
              { day: 'Day 25', module: 'TRC-SUP', event: '3 SNSC directives, 89 deaths attributed', color: '#F59E0B' },
              { day: 'Day 31', module: 'FIN-ENF', event: 'Asset flight — UAE transfer initiated', color: '#06B6D4' },
              { day: 'Day 38', module: 'BDR-SEC', event: 'Interdicted at Bazargan under forged identity', color: '#F97316' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="h-0.5 rounded" style={{ backgroundColor: item.color }} />
                <div className="text-[10px] font-mono" style={{ color: item.color }}>{item.day}</div>
                <div className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                  {item.module}
                </div>
                <div className="text-[11px]" style={{ color: '#64748B' }}>{item.event}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t" style={{ borderColor: '#1e2533' }}>
            <Link href="/entity/JB-P-00283716" className="text-[11px] flex items-center gap-1 hover:opacity-80 transition-opacity"
              style={{ color: '#3B82F6' }}>
              <ArrowRight size={11} />
              View full entity dossier
            </Link>
          </div>
        </div>

        {/* Module cards */}
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.06em] font-medium mb-3" style={{ color: '#475569' }}>Modules</h2>
          <div className="grid grid-cols-3 gap-3">
            {moduleCards.map(card => {
              const Icon = card.icon;
              return (
                <Link key={card.href} href={card.href}>
                  <div className="rounded-lg border p-4 transition-all hover:border-[#2d3a52] cursor-pointer group"
                    style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon size={14} style={{ color: card.color }} />
                        <div>
                          <div className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>{card.label}</div>
                          {card.code && <div className="text-[10px] font-mono" style={{ color: '#475569' }}>{card.code}</div>}
                        </div>
                      </div>
                      <ArrowRight size={12} style={{ color: '#475569' }}
                        className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <div className="mb-2">
                      <div className="text-[20px] font-semibold" style={{ color: '#F1F5F9' }}>{card.stat}</div>
                      <div className="text-[11px]" style={{ color: '#64748B' }}>{card.statLabel}</div>
                    </div>
                    <div className="text-[11px] mb-2" style={{ color: '#475569' }}>{card.detail}</div>
                    <div className="flex items-center gap-1.5 pt-2 border-t" style={{ borderColor: '#1e2533' }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: alertLevelColors[card.alertLevel] }} />
                      <span className="text-[10px] truncate" style={{ color: '#64748B' }}>{card.alert}</span>
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
          <div className="col-span-2 rounded-lg border" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
            <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: '#1e2533' }}>
              <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>Recent activity</span>
              <Link href="/oversight" className="text-[11px] hover:opacity-80" style={{ color: '#3B82F6' }}>View audit log</Link>
            </div>
            <div className="divide-y" style={{ borderColor: '#1e2533' }}>
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-2.5">
                  <span className="text-[11px] font-mono flex-shrink-0 mt-0.5" style={{ color: '#475569' }}>{item.time}</span>
                  <div className="min-w-0">
                    <span className="text-[11px] font-medium mr-1.5" style={{ color: '#94A3B8' }}>{item.actor}</span>
                    <span className="text-[11px]" style={{ color: '#64748B' }}>{item.action}</span>
                  </div>
                  <span className="text-[10px] font-mono flex-shrink-0 px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: `${moduleColors[item.module] || '#475569'}15`, color: moduleColors[item.module] || '#475569' }}>
                    {item.module}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Status summary */}
          <div className="space-y-3">
            <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="text-[11px] font-medium mb-3" style={{ color: '#F1F5F9' }}>Platform status</div>
              <div className="space-y-2">
                {[
                  { label: 'Analysts online', value: '12', color: '#10B981' },
                  { label: 'Active cases', value: '23', color: '#3B82F6' },
                  { label: 'Pending auth', value: '2', color: '#F59E0B' },
                  { label: 'New alerts (24h)', value: '7', color: '#EF4444' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-[11px]" style={{ color: '#64748B' }}>{item.label}</span>
                    <span className="text-[12px] font-medium font-mono" style={{ color: item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="text-[11px] font-medium mb-3" style={{ color: '#F1F5F9' }}>Authorization queue</div>
              {[
                { ref: 'AUTH-2026-0089', desc: 'SIGINT continuance', deadline: 'Feb 05' },
                { ref: 'AUTH-2026-0088', desc: 'Asset freeze — UAE', deadline: 'Feb 04' },
              ].map(item => (
                <div key={item.ref} className="flex items-center justify-between py-1.5">
                  <div>
                    <div className="text-[11px] font-mono" style={{ color: '#F59E0B' }}>{item.ref}</div>
                    <div className="text-[10px]" style={{ color: '#64748B' }}>{item.desc}</div>
                  </div>
                  <div className="text-[10px] font-mono" style={{ color: '#475569' }}>{item.deadline}</div>
                </div>
              ))}
              <Link href="/oversight" className="block mt-2 pt-2 border-t text-[11px]"
                style={{ borderColor: '#1e2533', color: '#3B82F6' }}>
                Review queue →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
