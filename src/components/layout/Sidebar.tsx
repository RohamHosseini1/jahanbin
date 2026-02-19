'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield, DollarSign, MapPin, Scale, FileText, Eye,
  ChevronRight, AlertCircle, Clock, LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/language-context';

const modules = [
  {
    href: '/ct-ops',
    label: 'Counterterrorism',
    code: 'CT-OPS',
    icon: Shield,
  },
  {
    href: '/fin-enf',
    label: 'Asset Recovery',
    code: 'FIN-ENF',
    icon: DollarSign,
    children: [
      { href: '/fin-enf/subjects', label: 'Subject Investigation' },
      { href: '/fin-enf/registry', label: 'State Asset Registry' },
    ],
  },
  {
    href: '/bdr-sec',
    label: 'Border Security',
    code: 'BDR-SEC',
    icon: MapPin,
  },
  {
    href: '/trc-sup',
    label: 'Truth & Reconciliation',
    code: 'TRC-SUP',
    icon: Scale,
  },
  {
    href: '/exec-brief',
    label: 'Executive Briefing',
    code: '',
    icon: FileText,
  },
  {
    href: '/oversight',
    label: 'Oversight Console',
    code: '',
    icon: Eye,
  },
];

const activeInvestigations = [
  { href: '/ct-ops/JB-CASE-2026-0047', label: 'Operation SPARROW', ref: 'JB-CASE-2026-0047' },
  { href: '/entity/JB-P-00283716', label: 'Col. Ansari — Multi-module', ref: 'JB-P-00283716' },
];

const recent = [
  { href: '/entity/JB-P-00283716', label: 'Colonel Davoud Ansari' },
  { href: '/entity/JB-P-00142857', label: 'Hossein Taghavi' },
  { href: '/entity/JB-P-00389201', label: 'Reza Ahmadzadeh' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();

  return (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-blue-100">
            <Shield size={14} className="text-blue-700" />
          </div>
          <div>
            <div className="text-[13px] font-semibold tracking-tight text-stone-900">JAHANBIN</div>
            <div className="text-[10px] text-stone-400">Intelligence Platform</div>
          </div>
        </div>
      </div>

      <div className="flex-1 py-3 space-y-4 overflow-y-auto">
        {/* Modules */}
        <div>
          <div className="px-4 mb-1.5">
            <span className="text-[10px] font-medium tracking-[0.08em] uppercase text-stone-400">Modules</span>
          </div>
          <nav className="space-y-0.5 px-2">
            {modules.map((mod) => {
              const Icon = mod.icon;
              const isActive = pathname === mod.href || pathname.startsWith(mod.href + '/');
              const hasChildren = mod.children && mod.children.length > 0;
              const isExpanded = hasChildren && isActive;

              return (
                <div key={mod.href}>
                  <Link
                    href={hasChildren ? mod.children![0].href : mod.href}
                    className={cn(
                      'flex items-center gap-2.5 px-2 py-2 rounded-md transition-all group',
                      isActive
                        ? 'bg-stone-200 text-stone-900'
                        : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                    )}
                  >
                    <Icon
                      size={14}
                      className={cn(
                        'flex-shrink-0',
                        isActive ? 'text-stone-700' : 'text-stone-400 group-hover:text-stone-600'
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className={cn(
                        'text-[12px] truncate',
                        isActive ? 'font-medium text-stone-900' : 'text-stone-500 group-hover:text-stone-700'
                      )}>
                        {mod.label}
                      </div>
                      {mod.code && (
                        <div className="text-[10px] font-mono text-stone-400">{mod.code}</div>
                      )}
                    </div>
                    {hasChildren && (
                      <ChevronRight
                        size={10}
                        className={cn('text-stone-400 transition-transform', isExpanded && 'rotate-90')}
                      />
                    )}
                  </Link>

                  {/* Sub-items */}
                  {isExpanded && mod.children && (
                    <div className="ms-4 mt-0.5 space-y-0.5 ps-2 border-s border-stone-200">
                      {mod.children.map((child) => {
                        const isChildActive = pathname === child.href || pathname.startsWith(child.href + '/');
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'flex items-center px-2 py-1.5 rounded-md transition-all text-[11px]',
                              isChildActive
                                ? 'bg-stone-200 text-stone-900 font-medium'
                                : 'text-stone-500 hover:text-stone-700 hover:bg-stone-100'
                            )}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Active Investigations */}
        <div>
          <div className="px-4 mb-1.5">
            <span className="text-[10px] font-medium tracking-[0.08em] uppercase text-stone-400">Active</span>
          </div>
          <div className="space-y-0.5 px-2">
            {activeInvestigations.map((inv) => (
              <Link
                key={inv.ref}
                href={inv.href}
                className="flex items-start gap-2 px-2 py-1.5 rounded-md hover:bg-stone-100 group"
              >
                <AlertCircle size={12} className="flex-shrink-0 mt-0.5 text-red-500" />
                <div className="min-w-0">
                  <div className="text-[11px] text-stone-600 group-hover:text-stone-900 truncate">{inv.label}</div>
                  <div className="text-[10px] font-mono text-stone-400">{inv.ref}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent */}
        <div>
          <div className="px-4 mb-1.5">
            <span className="text-[10px] font-medium tracking-[0.08em] uppercase text-stone-400">Recent</span>
          </div>
          <div className="space-y-0.5 px-2">
            {recent.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-stone-100 group"
              >
                <Clock size={11} className="flex-shrink-0 text-stone-400" />
                <span className="text-[11px] text-stone-500 group-hover:text-stone-700 truncate">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-stone-200 px-4 py-3 space-y-2">
        {/* Language toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setLang('en')}
            className={cn(
              'px-2 py-1 text-xs rounded transition-colors',
              lang === 'en' ? 'bg-stone-200 font-semibold text-stone-900' : 'text-stone-500 hover:bg-stone-100'
            )}
          >
            EN
          </button>
          <button
            onClick={() => setLang('fa')}
            className={cn(
              'px-2 py-1 text-xs rounded transition-colors',
              lang === 'fa' ? 'bg-stone-200 font-semibold text-stone-900' : 'text-stone-500 hover:bg-stone-100'
            )}
          >
            FA
          </button>
        </div>

        {/* User info */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-stone-700">JB-0471</div>
            <div className="text-[10px] text-stone-400">Senior Analyst</div>
          </div>
          <Link href="/" className="p-1 rounded hover:bg-stone-100 transition-colors">
            <LogOut size={13} className="text-stone-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
