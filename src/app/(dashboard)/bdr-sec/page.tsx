'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ModuleHeader } from '@/components/layout/ModuleHeader';
import { StatusTag } from '@/components/shared/StatusTag';
import { EntityTag } from '@/components/shared/EntityTag';
import { AdmiraltyBadge } from '@/components/shared/AdmiraltyBadge';
import { ConfidenceBar } from '@/components/shared/ConfidenceBar';
import { getWatchlist } from '@/lib/mock-data';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const TABS = ['Border Map', 'Biometric & Document Analysis', 'Watchlist'];

const crossings = [
  { id: 'bazargan', name: 'Bazargan (Iran–Turkey)', px: 17, py: 18, status: 'red', alerts: 1, volume: 1200 },
  { id: 'mehran', name: 'Mehran (Iran–Iraq)', px: 24, py: 52, status: 'amber', alerts: 2, volume: 840 },
  { id: 'bandar', name: 'Bandar Abbas (Sea)', px: 60, py: 88, status: 'amber', alerts: 1, volume: 3200 },
  { id: 'khosravi', name: 'Khosravi (Iran–Iraq)', px: 26, py: 40, status: 'green', alerts: 0, volume: 620 },
  { id: 'astara', name: 'Astara (Iran–Azerbaijan)', px: 26, py: 10, status: 'green', alerts: 0, volume: 890 },
  { id: 'milak', name: 'Milak (Iran–Afghanistan)', px: 86, py: 33, status: 'green', alerts: 0, volume: 450 },
  { id: 'dogharoun', name: 'Dogharoun (Afghanistan)', px: 78, py: 27, status: 'green', alerts: 0, volume: 280 },
  { id: 'shalamche', name: 'Shalamche (Iran–Iraq)', px: 20, py: 62, status: 'green', alerts: 0, volume: 520 },
];

const statusColors: Record<string, string> = {
  red: '#EF4444', amber: '#F59E0B', green: '#10B981', gray: '#475569',
};

export default function BdrSecPage() {
  const [activeTab, setActiveTab] = useState('Border Map');
  const [selectedCrossing, setSelectedCrossing] = useState<typeof crossings[0] | null>(null);
  const [watchlistSearch, setWatchlistSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [page, setPage] = useState(1);
  const watchlist = getWatchlist();
  const ITEMS_PER_PAGE = 6;

  const filtered = watchlist.filter(e => {
    const ms = e.entityName.toLowerCase().includes(watchlistSearch.toLowerCase()) ||
      e.entityId.toLowerCase().includes(watchlistSearch.toLowerCase());
    const mc = categoryFilter === 'All' || e.category === categoryFilter;
    return ms && mc;
  });
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <div className="module-content">
      <ModuleHeader
        title="Border Security"
        code="BDR-SEC"
        subtitle="4,847 watch entries active | 3 interdictions today | 7 document anomalies"
        status="Active"
        statusColor="#F97316"
      />

      <div className="border-b px-6 flex gap-0" style={{ borderColor: '#1e2533' }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="px-4 py-3 text-[12px] transition-colors border-b-2 -mb-px"
            style={{
              color: activeTab === tab ? '#F1F5F9' : '#64748B',
              borderBottomColor: activeTab === tab ? '#F97316' : 'transparent',
              fontWeight: activeTab === tab ? 500 : 400,
            }}>
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'Border Map' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 rounded-lg border" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="px-4 py-3 border-b flex items-center gap-3" style={{ borderColor: '#1e2533' }}>
                <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>Iran — Border crossing points (47 official)</span>
                <div className="flex items-center gap-3 ml-auto">
                  {[{ k: 'red', l: 'Active alert' }, { k: 'amber', l: 'Elevated' }, { k: 'green', l: 'Normal' }].map(s => (
                    <div key={s.k} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColors[s.k] }} />
                      <span className="text-[10px]" style={{ color: '#64748B' }}>{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative" style={{ height: 420, backgroundColor: '#09090d' }}>
                <svg viewBox="0 0 500 440" className="absolute inset-0 w-full h-full" style={{ opacity: 0.12 }}>
                  <path d="M95,70 L125,48 L165,42 L195,55 L225,38 L260,48 L295,38 L330,58 L360,48 L395,72 L418,95 L425,130 L420,168 L405,195 L418,228 L412,268 L395,298 L372,325 L352,355 L318,378 L285,398 L252,408 L218,398 L188,378 L158,355 L130,325 L108,295 L88,262 L78,228 L86,198 L74,162 L80,128 L88,100 Z"
                    fill="#1e2533" stroke="#2d3a52" strokeWidth="2" />
                  <ellipse cx="290" cy="395" rx="30" ry="20" fill="#0a1628" stroke="#1e2533" strokeWidth="1" opacity="0.6" />
                </svg>
                {crossings.map(c => (
                  <button key={c.id}
                    onClick={() => setSelectedCrossing(selectedCrossing?.id === c.id ? null : c)}
                    className="absolute transition-all hover:scale-125 z-10"
                    style={{ left: `${c.px}%`, top: `${c.py}%`, transform: 'translate(-50%, -50%)' }}>
                    <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                      style={{
                        backgroundColor: `${statusColors[c.status]}20`,
                        borderColor: statusColors[c.status],
                        boxShadow: c.status !== 'green' ? `0 0 8px ${statusColors[c.status]}40` : 'none',
                      }}>
                      {c.alerts > 0 && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColors[c.status] }} />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {selectedCrossing ? (
                <div className="rounded-lg border p-4 slide-in-panel" style={{ backgroundColor: '#0f1117', borderColor: '#2d3a52' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColors[selectedCrossing.status] }} />
                    <span className="text-[13px] font-medium" style={{ color: '#F1F5F9' }}>{selectedCrossing.name}</span>
                  </div>
                  <div className="space-y-1.5 mb-3">
                    {[
                      ['Status', selectedCrossing.status === 'red' ? 'Active alert' : selectedCrossing.status === 'amber' ? 'Elevated' : 'Normal'],
                      ['Daily crossings', `~${selectedCrossing.volume.toLocaleString()}`],
                      ['Active alerts', `${selectedCrossing.alerts}`],
                    ].map(([l, v]) => (
                      <div key={l} className="flex justify-between">
                        <span className="text-[11px]" style={{ color: '#64748B' }}>{l}</span>
                        <span className="text-[11px]" style={{ color: '#94A3B8' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  {selectedCrossing.status === 'red' && (
                    <button onClick={() => setActiveTab('Biometric & Document Analysis')}
                      className="w-full py-1.5 rounded text-[11px] font-medium"
                      style={{ backgroundColor: '#EF444420', color: '#EF4444', border: '1px solid #EF444430' }}>
                      View active interdiction →
                    </button>
                  )}
                </div>
              ) : (
                <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                  <div className="text-[12px] font-medium mb-3" style={{ color: '#F1F5F9' }}>Active alerts</div>
                  <div className="space-y-2">
                    {[
                      { name: 'Bazargan (Iran–Turkey)', s: 'red', d: '1 active interdiction' },
                      { name: 'Mehran (Iran–Iraq)', s: 'amber', d: '2 flagged — no action yet' },
                      { name: 'Bandar Abbas (Sea)', s: 'amber', d: 'Document anomaly — under review' },
                    ].map(a => (
                      <button key={a.name}
                        onClick={() => { if (a.s === 'red') setActiveTab('Biometric & Document Analysis'); }}
                        className="w-full flex items-start gap-2 p-2 rounded text-left"
                        style={{ backgroundColor: '#161b27' }}>
                        <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: statusColors[a.s] }} />
                        <div>
                          <div className="text-[11px] font-medium" style={{ color: '#94A3B8' }}>{a.name}</div>
                          <div className="text-[10px]" style={{ color: '#64748B' }}>{a.d}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="text-[12px] font-medium mb-3" style={{ color: '#F1F5F9' }}>Today&apos;s summary</div>
                {[
                  { label: 'Watch list hits', value: '23', color: '#F59E0B' },
                  { label: 'Interdictions', value: '3', color: '#EF4444' },
                  { label: 'Document anomalies', value: '7', color: '#F59E0B' },
                  { label: 'Total clearances', value: '14,281', color: '#10B981' },
                  { label: 'Entries on watch', value: '4,847', color: '#3B82F6' },
                ].map(s => (
                  <div key={s.label} className="flex justify-between py-1">
                    <span className="text-[11px]" style={{ color: '#64748B' }}>{s.label}</span>
                    <span className="text-[12px] font-semibold font-mono" style={{ color: s.color }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Biometric & Document Analysis' && (
          <div className="space-y-4">
            <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#2d3a52', borderLeft: '3px solid #F97316' }}>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Reference', value: 'BDR-2026-0038-A', mono: true, color: '#3B82F6' },
                  { label: 'Crossing', value: 'Bazargan International (Iran–Turkey)' },
                  { label: 'Time', value: '09:47, 3 February 2026', mono: true },
                  { label: 'Officer', value: 'BDR-0892', mono: true },
                  { label: 'Direction', value: 'Outbound' },
                  { label: 'Status', isStatus: true },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="text-[10px] uppercase tracking-[0.06em] mb-1" style={{ color: '#475569' }}>{item.label}</div>
                    {item.isStatus ? <StatusTag status="interdicted" /> :
                      <span className={`text-[12px] ${item.mono ? 'font-mono' : ''}`}
                        style={{ color: item.color || '#94A3B8' }}>{item.value}</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="px-4 py-3 border-b" style={{ borderColor: '#1e2533' }}>
                  <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>Biometric match</span>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {['Travel document photo', 'Reference file (JB-P-00283716)'].map((label, i) => (
                      <div key={i} className="rounded-md overflow-hidden border" style={{ borderColor: '#1e2533' }}>
                        <div className="h-28 flex items-center justify-center" style={{ backgroundColor: '#0a0c10' }}>
                          <div className="text-center">
                            <div className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center text-3xl"
                              style={{ backgroundColor: '#1e2533' }}>👤</div>
                            {i === 1 && <div className="text-[10px] font-mono" style={{ color: '#3B82F6' }}>JB-P-00283716</div>}
                          </div>
                        </div>
                        <div className="px-2 py-1 text-[10px] text-center" style={{ color: '#64748B' }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-md p-3" style={{ backgroundColor: '#064e3b20', border: '1px solid #10B98130' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] font-medium" style={{ color: '#10B981' }}>Match confidence: 94.7%</span>
                      <AdmiraltyBadge code="A1" />
                    </div>
                    <ConfidenceBar value={94.7} height={6} />
                    <div className="text-[11px] mt-2" style={{ color: '#64748B' }}>3-point facial verification: forehead · nose bridge · jaw</div>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { l: 'Subject traveling as', v: 'Kamyar Shirazi', isEntity: false },
                      { l: 'Matched to', v: 'Colonel Davoud Ansari', isEntity: true },
                      { l: 'Database', v: 'Priority Watch List — Cat A', isEntity: false },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-[11px]" style={{ color: '#64748B' }}>{row.l}</span>
                        {row.isEntity ? <EntityTag entityId="JB-P-00283716" name={row.v} /> :
                          <span className="text-[12px] font-medium" style={{ color: '#94A3B8' }}>{row.v}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-lg border" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="px-4 py-3 border-b" style={{ borderColor: '#1e2533' }}>
                  <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>Document forensics</span>
                </div>
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    {[
                      { l: 'Passport no.', v: 'IR-2024-8847392', mono: true },
                      { l: 'Issued', v: '2024-11-03 (Tehran)', mono: true },
                      { l: 'Authority', v: 'Ministry of Foreign Affairs' },
                    ].map(row => (
                      <div key={row.l} className="flex justify-between">
                        <span className="text-[11px]" style={{ color: '#64748B' }}>{row.l}</span>
                        <span className={`text-[11px] ${row.mono ? 'font-mono' : ''}`} style={{ color: '#94A3B8' }}>{row.v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-md p-3" style={{ backgroundColor: '#7f1d1d20', border: '1px solid #EF444430' }}>
                    <div className="text-[11px] font-medium mb-1" style={{ color: '#EF4444' }}>Assessment: Fraudulent document</div>
                    <p className="text-[11px]" style={{ color: '#64748B' }}>
                      Inconsistent ink composition. Microprint mismatch on page 7.
                      Issue sequence not found in Ministry registry.
                    </p>
                  </div>
                  <div>
                    <div className="text-[11px] font-medium mb-2" style={{ color: '#94A3B8' }}>Admiralty assessment</div>
                    <div className="space-y-1.5">
                      {[
                        { l: 'Biometric match', v: 'A1' },
                        { l: 'Document forensics', v: 'A1' },
                        { l: 'Watchlist cross-reference', v: 'A1' },
                        { l: 'TRC service record', v: 'B2' },
                      ].map(item => (
                        <div key={item.l} className="flex justify-between">
                          <span className="text-[11px]" style={{ color: '#64748B' }}>{item.l}</span>
                          <AdmiraltyBadge code={item.v} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-md p-2.5" style={{ backgroundColor: '#064e3b20', border: '1px solid #10B98130' }}>
                    <div className="text-[11px] font-medium mb-1" style={{ color: '#10B981' }}>Action taken</div>
                    <div className="text-[11px]" style={{ color: '#64748B' }}>Detained · CT-OPS ✓ · FIN-ENF ✓ · TRC-SUP ✓</div>
                  </div>
                  <Link href="/entity/JB-P-00283716"
                    className="block w-full py-1.5 text-center rounded text-[12px] font-medium"
                    style={{ backgroundColor: '#3B82F620', color: '#3B82F6', border: '1px solid #3B82F630' }}>
                    Open full entity profile →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Watchlist' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                <input type="text" value={watchlistSearch} onChange={e => setWatchlistSearch(e.target.value)}
                  placeholder="Search by name or ID..."
                  className="w-full pl-8 pr-4 py-2 text-[12px] rounded-md border"
                  style={{ backgroundColor: '#0f1117', borderColor: '#1e2533', color: '#94A3B8' }} />
              </div>
              <div className="flex gap-1">
                {['All', 'A', 'B', 'C'].map(cat => (
                  <button key={cat} onClick={() => { setCategoryFilter(cat); setPage(1); }}
                    className="px-3 py-2 rounded text-[11px] transition-colors"
                    style={{
                      backgroundColor: categoryFilter === cat ? '#1e2533' : 'transparent',
                      color: categoryFilter === cat ? '#94A3B8' : '#475569',
                      border: `1px solid ${categoryFilter === cat ? '#2d3a52' : 'transparent'}`,
                    }}>
                    {cat === 'All' ? 'All' : `Cat ${cat}`}
                  </button>
                ))}
              </div>
              <span className="ml-auto text-[11px]" style={{ color: '#475569' }}>
                {filtered.length} entries
              </span>
              <button className="px-3 py-2 rounded text-[11px] font-medium"
                style={{ backgroundColor: '#F9731620', color: '#F97316', border: '1px solid #F9731630' }}>
                + Add entry
              </button>
            </div>
            <div className="text-[10px] px-1" style={{ color: '#475569' }}>
              All watchlist entries require judicial authorization under Oversight Protocol §7. Entries expire after 90 days unless renewed.
            </div>
            <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e2533' }}>
                    {['JB ID', 'Name', 'Category', 'Basis', 'Auth ref', 'Expires', 'Status'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.06em]" style={{ color: '#475569' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#1e2533' }}>
                  {paginated.map(entry => {
                    const soon = new Date(entry.expires) < new Date(Date.now() + 7 * 86400000);
                    return (
                      <tr key={entry.entityId} className="hover:bg-[#161b27] transition-colors">
                        <td className="px-4 py-2.5 text-[11px] font-mono" style={{ color: '#64748B' }}>{entry.entityId}</td>
                        <td className="px-4 py-2.5"><EntityTag entityId={entry.entityId} name={entry.entityName} /></td>
                        <td className="px-4 py-2.5">
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: entry.category === 'A' ? '#EF444420' : entry.category === 'B' ? '#F59E0B20' : '#1e2533',
                              color: entry.category === 'A' ? '#EF4444' : entry.category === 'B' ? '#F59E0B' : '#64748B',
                            }}>Cat {entry.category}</span>
                        </td>
                        <td className="px-4 py-2.5 text-[11px] max-w-[180px] truncate" style={{ color: '#64748B' }}>{entry.basis}</td>
                        <td className="px-4 py-2.5 text-[11px] font-mono" style={{ color: '#475569' }}>{entry.authRef}</td>
                        <td className="px-4 py-2.5 text-[11px] font-mono" style={{ color: soon ? '#F59E0B' : '#475569' }}>
                          {entry.expires}{soon && ' ⚠'}
                        </td>
                        <td className="px-4 py-2.5"><StatusTag status={entry.status} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="px-4 py-3 border-t flex items-center justify-between" style={{ borderColor: '#1e2533', backgroundColor: '#0d0f15' }}>
                <span className="text-[11px]" style={{ color: '#475569' }}>Page {page} of {totalPages}</span>
                <div className="flex gap-1">
                  <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                    className="p-1.5 rounded hover:bg-[#161b27] disabled:opacity-30" style={{ color: '#64748B' }}>
                    <ChevronLeft size={14} />
                  </button>
                  <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                    className="p-1.5 rounded hover:bg-[#161b27] disabled:opacity-30" style={{ color: '#64748B' }}>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
