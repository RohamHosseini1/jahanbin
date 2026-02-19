'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield, DollarSign, MapPin, BookOpen, FileText, Eye, ChevronRight,
  Activity, AlertCircle, Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const modules = [
  { href: '/overview', label: 'Overview', code: null, icon: Activity, color: '#94A3B8' },
  { href: '/ct-ops', label: 'Counterterrorism', code: 'CT-OPS', icon: Shield, color: '#EF4444' },
  { href: '/fin-enf', label: 'Asset Recovery', code: 'FIN-ENF', icon: DollarSign, color: '#06B6D4' },
  { href: '/bdr-sec', label: 'Border Security', code: 'BDR-SEC', icon: MapPin, color: '#F97316' },
  { href: '/trc-sup', label: 'Truth & Reconciliation', code: 'TRC-SUP', icon: BookOpen, color: '#F59E0B' },
  { href: '/exec-brief', label: 'Executive Briefing', code: null, icon: FileText, color: '#8B5CF6' },
  { href: '/oversight', label: 'Oversight Console', code: null, icon: Eye, color: '#3B82F6' },
];

const activeInvestigations = [
  { href: '/ct-ops', label: 'Operation SPARROW', ref: 'JB-CASE-2026-0047' },
  { href: '/entity/JB-P-00283716', label: 'Col. Ansari — Multi-module', ref: 'JB-P-00283716' },
];

const recent = [
  { href: '/entity/JB-P-00283716', label: 'Colonel Davoud Ansari' },
  { href: '/entity/JB-P-00142857', label: 'Hossein Taghavi' },
  { href: '/entity/JB-P-00389201', label: 'Reza Ahmadzadeh' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 flex-shrink-0 flex flex-col border-r overflow-y-auto"
      style={{ backgroundColor: '#0a0c10', borderColor: '#1e2533' }}>

      {/* Logo */}
      <div className="px-4 py-4 border-b" style={{ borderColor: '#1e2533' }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center"
            style={{ backgroundColor: '#3B82F620', border: '1px solid #3B82F640' }}>
            <Shield size={14} color="#3B82F6" />
          </div>
          <div>
            <div className="text-[13px] font-semibold tracking-tight" style={{ color: '#F1F5F9' }}>JAHANBIN</div>
            <div className="text-[10px]" style={{ color: '#475569' }}>Intelligence Platform</div>
          </div>
        </div>
      </div>

      <div className="flex-1 py-3 space-y-5 overflow-y-auto">
        {/* Modules */}
        <div>
          <div className="px-4 mb-1.5">
            <span className="text-[10px] font-medium tracking-[0.08em] uppercase" style={{ color: '#475569' }}>Modules</span>
          </div>
          <nav className="space-y-0.5 px-2">
            {modules.map((mod) => {
              const Icon = mod.icon;
              const isActive = pathname === mod.href || pathname.startsWith(mod.href + '/');
              return (
                <Link
                  key={mod.href}
                  href={mod.href}
                  className={cn(
                    'flex items-center gap-2.5 px-2 py-2 rounded-md transition-all group',
                    isActive
                      ? 'bg-[#161b27]'
                      : 'hover:bg-[#0f1117]'
                  )}
                >
                  <Icon
                    size={14}
                    style={{ color: isActive ? mod.color : '#475569' }}
                    className="flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className={cn(
                      'text-[12px] truncate',
                      isActive ? 'text-[#F1F5F9] font-medium' : 'text-[#64748B] group-hover:text-[#94A3B8]'
                    )}>
                      {mod.label}
                    </div>
                    {mod.code && (
                      <div className="text-[10px] font-mono" style={{ color: '#475569' }}>{mod.code}</div>
                    )}
                  </div>
                  {isActive && <ChevronRight size={10} style={{ color: '#475569' }} />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Active Investigations */}
        <div>
          <div className="px-4 mb-1.5">
            <span className="text-[10px] font-medium tracking-[0.08em] uppercase" style={{ color: '#475569' }}>Active Investigations</span>
          </div>
          <div className="space-y-0.5 px-2">
            {activeInvestigations.map((inv) => (
              <Link
                key={inv.ref}
                href={inv.href}
                className="flex items-start gap-2 px-2 py-1.5 rounded-md hover:bg-[#0f1117] group"
              >
                <AlertCircle size={12} className="flex-shrink-0 mt-0.5" style={{ color: '#EF4444' }} />
                <div className="min-w-0">
                  <div className="text-[11px] text-[#94A3B8] group-hover:text-[#F1F5F9] truncate">{inv.label}</div>
                  <div className="text-[10px] font-mono" style={{ color: '#475569' }}>{inv.ref}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent */}
        <div>
          <div className="px-4 mb-1.5">
            <span className="text-[10px] font-medium tracking-[0.08em] uppercase" style={{ color: '#475569' }}>Recent</span>
          </div>
          <div className="space-y-0.5 px-2">
            {recent.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#0f1117] group"
              >
                <Clock size={11} className="flex-shrink-0" style={{ color: '#475569' }} />
                <span className="text-[11px] text-[#64748B] group-hover:text-[#94A3B8] truncate">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Session info */}
      <div className="px-4 py-3 border-t" style={{ borderColor: '#1e2533' }}>
        <div className="text-[10px] font-mono" style={{ color: '#475569' }}>JB-0471 — Senior Analyst</div>
        <div className="text-[10px]" style={{ color: '#475569' }}>Level 3 — Session logged</div>
      </div>
    </aside>
  );
}
