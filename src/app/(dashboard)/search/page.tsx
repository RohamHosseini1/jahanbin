'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, User, FileText, AlertTriangle, Shield, DollarSign, MapPin, BookOpen, ChevronRight } from 'lucide-react';
import { StatusTag } from '@/components/shared/StatusTag';

interface SearchResult {
  type: 'entity' | 'case' | 'product' | 'alert';
  id: string;
  title: string;
  subtitle: string;
  status?: string;
  modules?: string[];
  href: string;
  meta?: string;
  highlight?: string;
}

const ALL_RESULTS: SearchResult[] = [
  // Entities
  {
    type: 'entity', id: 'JB-P-00283716', title: 'Colonel Davoud Ansari', subtitle: 'داوود انصاری — IRGC Operational Commander',
    status: 'detained', modules: ['CT-OPS', 'FIN-ENF', 'BDR-SEC', 'TRC-SUP'],
    href: '/entity/JB-P-00283716', meta: 'Critical threat · 89 deaths attributed',
  },
  {
    type: 'entity', id: 'JB-P-00847291', title: 'Brig. Gen. Reza Taghavi', subtitle: 'رضا تقوی — Cell Leader, Taghavi Network',
    status: 'at-large', modules: ['CT-OPS'],
    href: '/entity/JB-P-00847291', meta: 'Critical threat · Infrastructure attack planned',
  },
  {
    type: 'entity', id: 'JB-P-00391847', title: 'Mehrdad Ahmadzadeh', subtitle: 'مهرداد احمدزاده — Financial Intermediary',
    status: 'under-surveillance', modules: ['FIN-ENF', 'CT-OPS'],
    href: '/entity/JB-P-00391847', meta: 'High threat · $47.2M offshore',
  },
  {
    type: 'entity', id: 'JB-P-00572841', title: 'Dr. Fariba Bahrami', subtitle: 'فریبا بهرامی — TRC Witness',
    status: 'active', modules: ['TRC-SUP'],
    href: '/entity/JB-P-00572841', meta: 'Protected witness — 1399 crackdown',
  },
  {
    type: 'entity', id: 'JB-E-00012847', title: 'Khatam al-Anbiya Construction HQ', subtitle: 'IRGC Construction Wing — Sanctioned entity',
    status: 'sanctioned', modules: ['FIN-ENF'],
    href: '/entity/JB-E-00012847', meta: 'OFAC sanctioned · $155B+ network',
  },
  // Cases
  {
    type: 'case', id: 'JB-CASE-2026-0047', title: 'Operation SPARROW', subtitle: 'CT-OPS — Infrastructure sabotage threat, south Tehran',
    status: 'active', modules: ['CT-OPS'],
    href: '/ct-ops', meta: '2026-02-03 · Analyst JB-0471',
    highlight: 'Estimated attack window: 7–14 days',
  },
  {
    type: 'case', id: 'JB-CASE-2026-0031', title: 'Khatam Network — Asset Mapping', subtitle: 'FIN-ENF — $47.2M UAE transfer, shell entity network',
    status: 'active', modules: ['FIN-ENF'],
    href: '/fin-enf', meta: '2026-01-28 · Analyst JB-0344',
    highlight: '4 shell entities identified, freeze pending',
  },
  {
    type: 'case', id: 'TRC-INV-2019-001', title: 'Bloody November — Ansari Dossier', subtitle: 'TRC-SUP — 1399 crackdown accountability',
    status: 'pending-auth', modules: ['TRC-SUP'],
    href: '/trc-sup', meta: '2026-01-30 · Analyst JB-0201',
    highlight: '89 deaths attributed, prosecution readiness 87%',
  },
  {
    type: 'case', id: 'BDR-2026-0038', title: 'Ansari Interdiction — Bazargan', subtitle: 'BDR-SEC — Forged identity intercept',
    status: 'closed', modules: ['BDR-SEC'],
    href: '/bdr-sec', meta: '2026-02-03 · Analyst JB-0892',
    highlight: 'Biometric match 94.7% — subject detained',
  },
  // Intelligence Products
  {
    type: 'product', id: 'CT-OPS-2026-0047-A', title: 'Infrastructure Threat Assessment', subtitle: 'Counter-terrorism operational assessment',
    status: 'pending-review', modules: ['CT-OPS'],
    href: '/exec-brief', meta: '2026-02-03 · JB-0471',
  },
  {
    type: 'product', id: 'BDR-2026-0038-A', title: 'Ansari Interdiction Report', subtitle: 'Border Security — Disseminated to NT Authority',
    status: 'disseminated', modules: ['BDR-SEC'],
    href: '/exec-brief', meta: '2026-02-03 · JB-0892',
  },
  {
    type: 'product', id: 'FIN-ENF-2026-0031', title: 'Khatam Network — Asset Mapping', subtitle: 'Financial Enforcement — Disseminated to NT Authority',
    status: 'disseminated', modules: ['FIN-ENF'],
    href: '/exec-brief', meta: '2026-01-28 · JB-0344',
  },
  {
    type: 'product', id: 'EB-2026-0034', title: 'Executive Brief EB-2026-0034', subtitle: 'Daily executive brief — Cabinet level',
    status: 'active', modules: ['EXEC-BRIEF'],
    href: '/exec-brief', meta: '2026-02-03 09:47 Tehran',
  },
  // Alerts
  {
    type: 'alert', id: 'ALT-2026-0038', title: 'MOVEMENT — Priority subject at Bazargan', subtitle: 'Border Security — Forged identity detected',
    status: 'closed', modules: ['BDR-SEC'],
    href: '/bdr-sec', meta: '2026-02-03',
    highlight: 'Col. Davoud Ansari interdicted',
  },
  {
    type: 'alert', id: 'ALT-2026-0031', title: 'JURISDICTIONAL — $47.2M UAE transfer', subtitle: 'Financial — Emirati coordination required',
    status: 'active', modules: ['FIN-ENF'],
    href: '/fin-enf', meta: '2026-02-01',
    highlight: 'Freeze request pending',
  },
];

const TYPE_ICONS: Record<string, typeof Search> = {
  entity: User,
  case: Shield,
  product: FileText,
  alert: AlertTriangle,
};

const MODULE_COLORS: Record<string, string> = {
  'CT-OPS': '#EF4444', 'FIN-ENF': '#06B6D4', 'BDR-SEC': '#F97316',
  'TRC-SUP': '#F59E0B', 'EXEC-BRIEF': '#8B5CF6', 'OVERSIGHT': '#64748B',
};

const MODULE_ICONS: Record<string, typeof Search> = {
  'CT-OPS': Shield, 'FIN-ENF': DollarSign, 'BDR-SEC': MapPin,
  'TRC-SUP': BookOpen, 'EXEC-BRIEF': FileText,
};

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded" style={{ backgroundColor: '#3B82F620', color: '#3B82F6' }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

const QUICK_SEARCHES = ['Ansari', 'Taghavi', 'infrastructure', 'Khatam', 'Bazargan', 'TRC-INV-2019', '$47.2M'];

function SearchPageInner() {
  const searchParams = useSearchParams();
  const initialQ = searchParams?.get('q') || '';

  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [focused, setFocused] = useState(false);

  const runSearch = useCallback((q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const lower = q.toLowerCase();
    const matched = ALL_RESULTS.filter(r =>
      r.title.toLowerCase().includes(lower) ||
      r.subtitle.toLowerCase().includes(lower) ||
      r.id.toLowerCase().includes(lower) ||
      (r.meta || '').toLowerCase().includes(lower) ||
      (r.highlight || '').toLowerCase().includes(lower) ||
      (r.modules || []).some(m => m.toLowerCase().includes(lower))
    );
    setResults(matched);
  }, []);

  useEffect(() => {
    runSearch(query);
  }, [query, runSearch]);

  useEffect(() => {
    if (initialQ) runSearch(initialQ);
  }, [initialQ, runSearch]);

  const filtered = filter === 'All' ? results : results.filter(r => r.type === filter.toLowerCase());

  const counts: Record<string, number> = {
    All: results.length,
    Entity: results.filter(r => r.type === 'entity').length,
    Case: results.filter(r => r.type === 'case').length,
    Product: results.filter(r => r.type === 'product').length,
    Alert: results.filter(r => r.type === 'alert').length,
  };

  return (
    <div className="module-content">
      {/* Header */}
      <div className="px-6 py-5 border-b" style={{ borderColor: '#1e2533' }}>
        <div className="max-w-2xl">
          <h1 className="text-[16px] font-semibold mb-1" style={{ color: '#F1F5F9' }}>Intelligence Search</h1>
          <p className="text-[12px]" style={{ color: '#64748B' }}>
            Search across entities, cases, intelligence products, and alerts.
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Search Input */}
        <div className="max-w-2xl mb-6">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#475569' }} />
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search entities, cases, references, modules..."
              className="w-full pl-9 pr-4 py-3 rounded-lg text-[13px] outline-none transition-colors"
              style={{
                backgroundColor: '#0f1117',
                border: `1px solid ${focused ? '#3B82F6' : '#1e2533'}`,
                color: '#F1F5F9',
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] hover:opacity-70"
                style={{ color: '#475569' }}>
                Clear
              </button>
            )}
          </div>

          {/* Quick searches */}
          {!query && (
            <div className="mt-3 flex gap-2 flex-wrap">
              <span className="text-[11px]" style={{ color: '#475569' }}>Quick search:</span>
              {QUICK_SEARCHES.map(qs => (
                <button key={qs} onClick={() => setQuery(qs)}
                  className="text-[11px] hover:opacity-80 transition-opacity"
                  style={{ color: '#3B82F6' }}>
                  {qs}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        {query ? (
          <div className="max-w-3xl">
            {/* Filter tabs */}
            <div className="flex gap-3 mb-4 flex-wrap">
              {(['All', 'Entity', 'Case', 'Product', 'Alert'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="px-3 py-1.5 rounded text-[11px] transition-colors"
                  style={{
                    backgroundColor: filter === f ? '#3B82F615' : '#0f1117',
                    color: filter === f ? '#3B82F6' : '#64748B',
                    border: `1px solid ${filter === f ? '#3B82F630' : '#1e2533'}`,
                  }}>
                  {f}
                  {counts[f] > 0 && (
                    <span className="ml-1.5 px-1 py-0.5 rounded text-[9px]"
                      style={{ backgroundColor: filter === f ? '#3B82F625' : '#1e2533', color: filter === f ? '#3B82F6' : '#475569' }}>
                      {counts[f]}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-lg border p-8 text-center" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <Search size={24} className="mx-auto mb-3" style={{ color: '#1e2533' }} />
                <div className="text-[13px]" style={{ color: '#475569' }}>No results for &ldquo;{query}&rdquo;</div>
                {filter !== 'All' && (
                  <button onClick={() => setFilter('All')} className="mt-2 text-[12px] hover:opacity-80" style={{ color: '#3B82F6' }}>
                    Search all types
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map((result) => {
                  const Icon = TYPE_ICONS[result.type] || FileText;
                  const typeColors: Record<string, string> = {
                    entity: '#3B82F6', case: '#EF4444', product: '#8B5CF6', alert: '#F59E0B',
                  };
                  const tc = typeColors[result.type] || '#64748B';

                  return (
                    <Link key={result.id} href={result.href}
                      className="block rounded-lg border p-4 hover:border-opacity-60 transition-all group"
                      style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${tc}12`, border: `1px solid ${tc}20` }}>
                          <Icon size={14} style={{ color: tc }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <span className="text-[10px] font-mono uppercase tracking-[0.06em] px-1.5 py-0.5 rounded"
                              style={{ backgroundColor: `${tc}12`, color: tc }}>
                              {result.type}
                            </span>
                            <span className="text-[11px] font-mono" style={{ color: '#475569' }}>{result.id}</span>
                            {result.status && <StatusTag status={result.status} />}
                          </div>
                          <div className="text-[13px] font-medium mb-0.5 group-hover:opacity-90"
                            style={{ color: '#F1F5F9' }}>
                            {highlightMatch(result.title, query)}
                          </div>
                          <div className="text-[12px]" style={{ color: '#64748B' }}>
                            {highlightMatch(result.subtitle, query)}
                          </div>
                          {result.highlight && (
                            <div className="mt-1.5 text-[11px] px-2 py-1 rounded"
                              style={{ backgroundColor: '#3B82F610', color: '#94A3B8', border: '1px solid #3B82F615' }}>
                              {highlightMatch(result.highlight, query)}
                            </div>
                          )}
                          {result.modules && result.modules.length > 0 && (
                            <div className="mt-2 flex gap-1.5 flex-wrap">
                              {result.modules.map(m => {
                                const MIcon = MODULE_ICONS[m];
                                const mc = MODULE_COLORS[m] || '#64748B';
                                return (
                                  <span key={m} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono"
                                    style={{ backgroundColor: `${mc}10`, color: mc, border: `1px solid ${mc}20` }}>
                                    {MIcon && <MIcon size={9} />}
                                    {m}
                                  </span>
                                );
                              })}
                              {result.meta && (
                                <span className="text-[11px] ml-1" style={{ color: '#475569' }}>{result.meta}</span>
                              )}
                            </div>
                          )}
                        </div>
                        <ChevronRight size={16} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"
                          style={{ color: '#475569' }} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Empty state — recent / suggested */
          <div className="max-w-3xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-5" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="text-[11px] uppercase tracking-[0.08em] font-medium mb-3" style={{ color: '#475569' }}>
                  Priority Entities
                </div>
                <div className="space-y-2">
                  {ALL_RESULTS.filter(r => r.type === 'entity').slice(0, 4).map(r => {
                    const tc = { detained: '#22C55E', 'at-large': '#EF4444', 'under-surveillance': '#F97316', active: '#3B82F6', sanctioned: '#F59E0B' }[r.status || ''] || '#64748B';
                    return (
                      <Link key={r.id} href={r.href}
                        className="flex items-center gap-2.5 py-1.5 hover:opacity-80 transition-opacity">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tc }} />
                        <span className="text-[12px]" style={{ color: '#94A3B8' }}>{r.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-lg border p-5" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="text-[11px] uppercase tracking-[0.08em] font-medium mb-3" style={{ color: '#475569' }}>
                  Active Cases
                </div>
                <div className="space-y-2">
                  {ALL_RESULTS.filter(r => r.type === 'case').slice(0, 4).map(r => {
                    const mc = MODULE_COLORS[r.modules?.[0] || ''] || '#64748B';
                    return (
                      <Link key={r.id} href={r.href}
                        className="flex items-center gap-2.5 py-1.5 hover:opacity-80 transition-opacity">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: mc }} />
                        <span className="text-[12px]" style={{ color: '#94A3B8' }}>{r.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="col-span-2 rounded-lg border p-5" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="text-[11px] uppercase tracking-[0.08em] font-medium mb-3" style={{ color: '#475569' }}>
                  Search Across Modules
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { label: 'CT-OPS', color: '#EF4444', Icon: Shield, href: '/ct-ops', desc: 'Counter-terror operations' },
                    { label: 'FIN-ENF', color: '#06B6D4', Icon: DollarSign, href: '/fin-enf', desc: 'Financial enforcement' },
                    { label: 'BDR-SEC', color: '#F97316', Icon: MapPin, href: '/bdr-sec', desc: 'Border security' },
                    { label: 'TRC-SUP', color: '#F59E0B', Icon: BookOpen, href: '/trc-sup', desc: 'Transitional justice' },
                    { label: 'EXEC-BRIEF', color: '#8B5CF6', Icon: FileText, href: '/exec-brief', desc: 'Executive briefs' },
                  ].map(({ label, color, Icon, href, desc }) => (
                    <Link key={label} href={href}
                      className="p-3 rounded-lg border text-center hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: `${color}08`, borderColor: `${color}20` }}>
                      <Icon size={16} className="mx-auto mb-1.5" style={{ color }} />
                      <div className="text-[11px] font-mono font-medium" style={{ color }}>{label}</div>
                      <div className="text-[10px] mt-0.5 leading-tight" style={{ color: '#475569' }}>{desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ color: "#475569", padding: "2rem" }}>Loading...</div>}>
      <SearchPageInner />
    </Suspense>
  );
}
