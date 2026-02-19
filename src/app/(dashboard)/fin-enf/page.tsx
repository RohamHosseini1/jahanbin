'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ModuleHeader } from '@/components/layout/ModuleHeader';
import { StatusTag } from '@/components/shared/StatusTag';
import { EntityTag } from '@/components/shared/EntityTag';
import { AdmiraltyBadge } from '@/components/shared/AdmiraltyBadge';
import { ConfidenceBar } from '@/components/shared/ConfidenceBar';
import { getAlerts } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { AlertCircle, Network } from 'lucide-react';

const EconomicMapDynamic = dynamic(
  () => import('@/components/modules/fin-enf/EconomicMap').then(m => m.EconomicMap),
  { ssr: false, loading: () => (
    <div className="flex items-center justify-center w-full h-full">
      <Network size={32} style={{ color: '#1e2533' }} />
    </div>
  )}
);

const TABS = ['Economic Map', 'Operations Center', 'Deep Dive'];

const monthlyData = [
  { month: 'Mar 24', amount: 0.8 }, { month: 'Apr 24', amount: 1.2 }, { month: 'May 24', amount: 0.9 },
  { month: 'Jun 24', amount: 1.5 }, { month: 'Jul 24', amount: 2.1 }, { month: 'Aug 24', amount: 1.8 },
  { month: 'Sep 24', amount: 3.2 }, { month: 'Oct 24', amount: 4.7 }, { month: 'Nov 24', amount: 2.3 },
  { month: 'Dec 24', amount: 1.9 }, { month: 'Jan 25', amount: 2.8 }, { month: 'Feb 25', amount: 3.4 },
  { month: 'Mar 25', amount: 2.1 }, { month: 'Apr 25', amount: 1.7 }, { month: 'May 25', amount: 2.9 },
  { month: 'Jun 25', amount: 4.2 }, { month: 'Jul 25', amount: 5.8 }, { month: 'Aug 25', amount: 3.1 },
  { month: 'Sep 25', amount: 6.4 }, { month: 'Oct 25', amount: 4.9 }, { month: 'Nov 25', amount: 8.2 },
  { month: 'Dec 25', amount: 12.1 }, { month: 'Jan 26', amount: 15.4 }, { month: 'Feb 26', amount: 9.8 },
];

const accounts = [
  { institution: 'Emirates NBD (Al-Furqan Trading LLC)', jurisdiction: 'UAE', type: 'Corporate', balance: '$8.2M', status: 'monitored', lastActivity: '2026-01-28', admiralty: 'B2' },
  { institution: 'Ziraat Bank (Omid Construction LLC)', jurisdiction: 'Turkey', type: 'Corporate', balance: '$6.7M', status: 'freeze-requested', lastActivity: '2026-01-30', admiralty: 'A1' },
  { institution: 'Ameriabank', jurisdiction: 'Armenia', type: 'Personal', balance: '$1.6M', status: 'monitored', lastActivity: '2026-01-10', admiralty: 'B2' },
  { institution: 'Ameriabank', jurisdiction: 'Armenia', type: 'Personal', balance: '$1.5M', status: 'monitored', lastActivity: '2025-12-18', admiralty: 'B2' },
  { institution: 'TBC Bank', jurisdiction: 'Iraq (Erbil)', type: 'Corporate', balance: '$5.4M', status: 'flagged', lastActivity: '2026-01-25', admiralty: 'C2' },
  { institution: 'TRON Wallet Cluster', jurisdiction: 'Crypto', type: 'Crypto', balance: '$14.2M USDT', status: 'tracking', lastActivity: '2026-02-01', admiralty: 'A2' },
];

const severityColors: Record<string, string> = {
  critical: '#EF4444', high: '#F97316', medium: '#F59E0B', low: '#10B981',
};

export default function FinEnfPage() {
  const [activeTab, setActiveTab] = useState('Economic Map');
  const [selectedAlert, setSelectedAlert] = useState<ReturnType<typeof getAlerts>[0] | null>(null);
  const [graphFilter, setGraphFilter] = useState('All');
  const alerts = getAlerts();

  return (
    <div className="module-content">
      <ModuleHeader
        title="Asset Recovery"
        code="FIN-ENF"
        subtitle="847,000 accounts monitored | 23 jurisdictions | 4 blockchain networks"
        status="Active monitoring"
        statusColor="#06B6D4"
      />

      <div className="border-b px-6 flex gap-0" style={{ borderColor: '#1e2533' }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="px-4 py-3 text-[12px] transition-colors border-b-2 -mb-px"
            style={{
              color: activeTab === tab ? '#F1F5F9' : '#64748B',
              borderBottomColor: activeTab === tab ? '#06B6D4' : 'transparent',
              fontWeight: activeTab === tab ? 500 : 400,
            }}>
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'Economic Map' && (
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3 rounded-lg border" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="px-4 py-3 border-b flex items-center gap-3" style={{ borderColor: '#1e2533' }}>
                <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>
                  Iranian Regime Economic Structure — Ownership Intelligence
                </span>
                <div className="flex gap-1 ml-auto">
                  {['All', 'Sanctioned', 'Under investigation', 'At risk'].map(f => (
                    <button key={f} onClick={() => setGraphFilter(f)}
                      className="px-2 py-1 rounded text-[10px] transition-colors"
                      style={{
                        backgroundColor: graphFilter === f ? '#1e2533' : 'transparent',
                        color: graphFilter === f ? '#94A3B8' : '#475569',
                        border: `1px solid ${graphFilter === f ? '#2d3a52' : 'transparent'}`,
                      }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-2" style={{ height: 450, backgroundColor: '#08090c' }}>
                <EconomicMapDynamic filter={graphFilter} />
              </div>
              <div className="px-4 py-2 border-t text-[11px]" style={{ borderColor: '#1e2533', color: '#475569' }}>
                Pre-built financial ontology | 47,000 entities resolved | Updated: Jan 2026. Click nodes to explore.
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Total assets mapped', value: '$155B+', color: '#F1F5F9' },
                { label: 'Entities in graph', value: '47,000+', color: '#F1F5F9' },
                { label: 'Sanctioned entities', value: '1,847', color: '#EF4444' },
                { label: 'Under investigation', value: '312', color: '#F59E0B' },
                { label: 'Assets frozen', value: '$240M', color: '#10B981' },
                { label: 'Assets at risk', value: '$3.4B', color: '#EF4444' },
              ].map(item => (
                <div key={item.label} className="rounded-lg border p-3" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                  <div className="text-[18px] font-semibold" style={{ color: item.color }}>{item.value}</div>
                  <div className="text-[11px]" style={{ color: '#64748B' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Operations Center' && (
          <div className="grid grid-cols-12 gap-4" style={{ height: 'calc(100vh - 240px)' }}>
            <div className="col-span-4 rounded-lg border flex flex-col overflow-hidden" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="px-4 py-3 border-b flex items-center gap-2 flex-shrink-0" style={{ borderColor: '#1e2533' }}>
                <AlertCircle size={13} style={{ color: '#EF4444' }} />
                <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>Live alerts</span>
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: '#EF444420', color: '#EF4444' }}>
                  {alerts.length}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto divide-y" style={{ borderColor: '#1e2533' }}>
                {alerts.map(alert => (
                  <div key={alert.id} onClick={() => setSelectedAlert(alert)}
                    className="p-3 cursor-pointer transition-colors hover:bg-[#161b27]"
                    style={{ backgroundColor: selectedAlert?.id === alert.id ? '#161b27' : 'transparent' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-medium uppercase tracking-[0.04em]"
                        style={{ color: severityColors[alert.severity] }}>{alert.severity}</span>
                      <span className="text-[10px] font-mono ml-auto px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: '#1e2533', color: '#64748B' }}>{alert.type}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed" style={{ color: '#94A3B8' }}>{alert.description}</p>
                    {alert.amount && <div className="mt-1 text-[11px] font-medium" style={{ color: severityColors[alert.severity] }}>{alert.amount}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-5 rounded-lg border flex flex-col overflow-hidden" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="px-4 py-3 border-b flex-shrink-0" style={{ borderColor: '#1e2533' }}>
                <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>Alert detail</span>
              </div>
              {selectedAlert ? (
                <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium uppercase" style={{ color: severityColors[selectedAlert.severity] }}>{selectedAlert.severity}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: '#1e2533', color: '#64748B' }}>{selectedAlert.type}</span>
                    <span className="text-[11px] font-mono" style={{ color: '#475569' }}>{selectedAlert.id}</span>
                  </div>
                  <div>
                    <div className="text-[13px] font-medium mb-1" style={{ color: '#F1F5F9' }}>{selectedAlert.description}</div>
                    {selectedAlert.amount && (
                      <div className="text-[20px] font-semibold" style={{ color: severityColors[selectedAlert.severity] }}>{selectedAlert.amount}</div>
                    )}
                  </div>
                  {selectedAlert.entityId && (
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.06em] mb-1" style={{ color: '#475569' }}>Subject</div>
                      <EntityTag entityId={selectedAlert.entityId} name={selectedAlert.entityName} />
                    </div>
                  )}
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.06em] mb-1" style={{ color: '#475569' }}>Detail</div>
                    <p className="text-[12px] leading-relaxed" style={{ color: '#94A3B8' }}>{selectedAlert.detail}</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button className="px-3 py-1.5 rounded text-[12px] font-medium" style={{ backgroundColor: '#10B98120', color: '#10B981', border: '1px solid #10B98130' }}>Approve action</button>
                    <button className="px-3 py-1.5 rounded text-[12px] font-medium" style={{ backgroundColor: '#F59E0B20', color: '#F59E0B', border: '1px solid #F59E0B30' }}>Escalate</button>
                    <button className="px-3 py-1.5 rounded text-[12px] font-medium" style={{ backgroundColor: '#1e2533', color: '#64748B' }}>Dismiss</button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center"><AlertCircle size={24} style={{ color: '#1e2533', margin: '0 auto 8px' }} />
                    <p className="text-[12px]" style={{ color: '#475569' }}>Select an alert to view details</p></div>
                </div>
              )}
            </div>

            <div className="col-span-3 space-y-3">
              <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <div className="text-[12px] font-medium mb-4" style={{ color: '#F1F5F9' }}>Recovery summary</div>
                <div className="space-y-3">
                  {[
                    { label: 'Secured', value: '$8.7B', percentage: 15, color: '#10B981' },
                    { label: 'Under investigation', value: '$47B', percentage: 80, color: '#3B82F6' },
                    { label: 'At risk (flight)', value: '$3.4B', percentage: 35, color: '#EF4444' },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[11px]" style={{ color: '#64748B' }}>{item.label}</span>
                        <span className="text-[12px] font-semibold" style={{ color: item.color }}>{item.value}</span>
                      </div>
                      <ConfidenceBar value={item.percentage} showLabel={false} height={6} />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => setActiveTab('Deep Dive')}
                className="w-full px-3 py-2 rounded-lg text-[12px] font-medium text-left"
                style={{ backgroundColor: '#0f1117', border: '1px solid #1e2533', color: '#06B6D4' }}>
                View Ansari money trail →
              </button>
            </div>
          </div>
        )}

        {activeTab === 'Deep Dive' && (
          <div className="space-y-5">
            <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>Financial profile — </span>
                <EntityTag entityId="JB-P-00283716" name="Colonel Davoud Ansari" className="text-[12px]" />
              </div>
              <div className="text-[11px]" style={{ color: '#64748B' }}>24-month transaction volume | Total identified: $23.4M across 4 jurisdictions</div>
            </div>
            <div className="rounded-lg border p-4" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="text-[11px] font-medium mb-4" style={{ color: '#94A3B8' }}>Transaction volume by month ($M)</div>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2533" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#475569' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#475569' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f1117', border: '1px solid #1e2533', borderRadius: 6, fontSize: 11 }}
                      labelStyle={{ color: '#94A3B8' }} itemStyle={{ color: '#06B6D4' }} />
                    <ReferenceLine x="Sep 24" stroke="#F59E0B" strokeDasharray="3 3" label={{ value: 'Inv.', fill: '#F59E0B', fontSize: 9 }} />
                    <ReferenceLine x="Dec 25" stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'Flight', fill: '#EF4444', fontSize: 9 }} />
                    <Bar dataKey="amount" fill="#06B6D4" radius={[2, 2, 0, 0]} fillOpacity={0.75} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="px-4 py-3 border-b" style={{ borderColor: '#1e2533' }}>
                <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>Identified accounts</span>
              </div>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e2533' }}>
                    {['Institution', 'Jurisdiction', 'Type', 'Balance', 'Status', 'Last activity', 'Admiralty'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.06em]" style={{ color: '#475569' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#1e2533' }}>
                  {accounts.map((acc, i) => (
                    <tr key={i} className="hover:bg-[#161b27] transition-colors">
                      <td className="px-4 py-2.5 text-[12px]" style={{ color: '#94A3B8' }}>{acc.institution}</td>
                      <td className="px-4 py-2.5 text-[11px]" style={{ color: '#64748B' }}>{acc.jurisdiction}</td>
                      <td className="px-4 py-2.5 text-[11px] font-mono" style={{ color: '#64748B' }}>{acc.type}</td>
                      <td className="px-4 py-2.5 text-[12px] font-semibold" style={{ color: '#F1F5F9' }}>{acc.balance}</td>
                      <td className="px-4 py-2.5"><StatusTag status={acc.status} /></td>
                      <td className="px-4 py-2.5 text-[11px] font-mono" style={{ color: '#475569' }}>{acc.lastActivity}</td>
                      <td className="px-4 py-2.5"><AdmiraltyBadge code={acc.admiralty} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-3 border-t flex justify-between" style={{ borderColor: '#1e2533', backgroundColor: '#0d0f15' }}>
                <span className="text-[12px] font-semibold" style={{ color: '#F1F5F9' }}>Total: $37.6M identified</span>
                <span className="text-[11px]" style={{ color: '#64748B' }}>$14.2M crypto not yet seized</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
