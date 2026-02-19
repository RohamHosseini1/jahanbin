'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { CreditCard, TrendingDown, Network, FileCheck, FileText } from 'lucide-react';
import { JahanPanel } from '@/components/shared/JahanPanel';
import { AdmiraltyBadge } from '@/components/shared/AdmiraltyBadge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import dynamic from 'next/dynamic';

const NetworkGraph = dynamic(
  () => import('@/components/modules/ct-ops/NetworkGraph').then(m => ({ default: m.NetworkGraph })),
  { ssr: false }
);

const navItems = [
  { id: 'accounts', label: 'Account Overview', icon: CreditCard },
  { id: 'transactions', label: 'Transaction Trail', icon: TrendingDown },
  { id: 'shells', label: 'Shell Structure', icon: Network },
  { id: 'freeze', label: 'Freeze Requests', icon: FileCheck, count: 2 },
  { id: 'assessment', label: 'Assessment', icon: FileText },
];

const JAHAN_ANALYSIS = [
  {
    title: '$47.2M movement detected',
    body: 'Transfer chain: Ansari → Al-Furqan Trading LLC → Emirates NBD → Ziraat Bank Istanbul. 4 shell entities. Completed 2h ago.',
    confidence: 94,
  },
  {
    title: 'Shell structure identified',
    body: 'Omid Construction LLC and Al-Furqan Trading share 2 directors and identical registered address in Dubai (Business Bay Tower).',
    confidence: undefined,
  },
  {
    title: 'Asset flight pattern',
    body: 'Activity consistent with pre-departure asset stripping. 6 transactions over 72 hours. Structuring threshold avoided.',
    confidence: 91,
  },
];

const txData = Array.from({ length: 24 }, (_, i) => ({
  month: `${i < 12 ? 2024 : 2025}-${String((i % 12) + 1).padStart(2, '0')}`,
  amount: Math.random() * 2 + 0.5,
  flagged: i > 20,
}));

export default function SubjectWorkspacePage({ params }: { params: Promise<{ entityId: string }> }) {
  const { entityId } = use(params);
  const [activeTab, setActiveTab] = useState('accounts');

  return (
    <div className="flex h-full" style={{ height: 'calc(100vh - 24px - 56px)' }}>

      {/* LEFT NAV */}
      <div className="flex-none w-48 border-e border-stone-200 bg-stone-50 flex flex-col overflow-y-auto">
        <div className="px-4 py-4 border-b border-stone-200">
          <div className="text-[10px] font-mono text-stone-400 mb-1">{entityId}</div>
          <div className="text-sm font-semibold text-stone-900">Col. Ansari</div>
        </div>

        <nav className="flex-1 py-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-start transition-colors ${
                  isActive ? 'bg-stone-200 text-stone-900' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Icon size={13} className="flex-shrink-0" />
                <span className="text-xs flex-1 truncate">{item.label}</span>
                {'count' in item && item.count && (
                  <span className={`text-[10px] font-mono ${isActive ? 'text-stone-700' : 'text-stone-400'}`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-3 border-t border-stone-200 space-y-1.5">
          <div className="text-[10px] text-red-600 font-medium">Asset flight — active</div>
          <div className="text-[10px] text-stone-400">Lead: JB-0344</div>
          <div className="text-[10px] text-stone-400">Linked: JB-CASE-2026-0047</div>
          <Link href="/fin-enf/subjects" className="text-[10px] text-blue-600 hover:underline mt-2 block">
            ← All subjects
          </Link>
        </div>
      </div>

      {/* CENTER */}
      <div className="flex-1 overflow-y-auto">

        {activeTab === 'accounts' && (
          <div className="p-5">
            <div className="mb-4 p-3 bg-stone-50 border border-stone-200 rounded-lg">
              <span className="text-sm font-medium text-stone-700">Total identified: </span>
              <span className="text-sm font-semibold text-stone-900">$23.4M across 4 jurisdictions</span>
              <span className="text-sm text-stone-500"> + $14.2M crypto</span>
            </div>
            <div className="border border-stone-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Account</th>
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Institution</th>
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Jurisdiction</th>
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Balance</th>
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Status</th>
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Admiralty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {[
                    { acct: 'AE-0042-8847', inst: 'Emirates NBD', jur: 'UAE', bal: '$8.2M', status: 'Active', statusColor: 'text-green-700 bg-green-50', adm: 'A2' },
                    { acct: 'TR-0019-2291', inst: 'Ziraat Bank', jur: 'Turkey', bal: '$6.1M', status: 'Freeze pending', statusColor: 'text-amber-700 bg-amber-50', adm: 'A2' },
                    { acct: 'IR-0091-5543', inst: 'Bank Melli Iran', jur: 'Iran', bal: '$2.8M', status: 'Monitored', statusColor: 'text-blue-700 bg-blue-50', adm: 'B2' },
                    { acct: 'CY-0033-7712', inst: 'Hellenic Bank', jur: 'Cyprus', bal: '$3.1M', status: 'Active', statusColor: 'text-green-700 bg-green-50', adm: 'B2' },
                    { acct: 'AE-0077-SHELL-01', inst: 'Emirates NBD (Al-Furqan)', jur: 'UAE', bal: '$2.1M', status: 'Active', statusColor: 'text-green-700 bg-green-50', adm: 'A2' },
                    { acct: 'BTC-P2P-ANSR01', inst: 'Cryptocurrency', jur: 'Multiple', bal: '$14.2M', status: 'Tracing', statusColor: 'text-purple-700 bg-purple-50', adm: 'C2' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-stone-50">
                      <td className="px-4 py-2.5 font-mono text-stone-600">{row.acct}</td>
                      <td className="px-4 py-2.5 text-stone-700">{row.inst}</td>
                      <td className="px-4 py-2.5 text-stone-600">{row.jur}</td>
                      <td className="px-4 py-2.5 font-semibold text-stone-900">{row.bal}</td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${row.statusColor}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5"><AdmiraltyBadge code={row.adm} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="p-5">
            <h2 className="text-sm font-semibold text-stone-900 mb-4">Transaction Trail — 24 months</h2>
            <div className="border border-stone-200 rounded-lg p-4 bg-white mb-4" style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={txData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#A8A29E' }} tickLine={false} axisLine={false} interval={3} />
                  <YAxis tick={{ fontSize: 10, fill: '#A8A29E' }} tickLine={false} axisLine={false} tickFormatter={v => `$${v}M`} />
                  <Tooltip formatter={(v) => [`$${(v as number).toFixed(1)}M`, 'Amount']} />
                  <Bar dataKey="amount" fill="#1D4ED8" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="border border-stone-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    <th className="text-start px-4 py-2 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Date</th>
                    <th className="text-start px-4 py-2 text-[10px] font-medium text-stone-400 uppercase tracking-wide">From</th>
                    <th className="text-start px-4 py-2 text-[10px] font-medium text-stone-400 uppercase tracking-wide">To</th>
                    <th className="text-start px-4 py-2 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Amount</th>
                    <th className="text-start px-4 py-2 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Flag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {[
                    { date: '2026-02-17', from: 'Bank Melli Iran', to: 'Emirates NBD', amount: '$12.8M', flag: 'Asset flight', flagColor: 'text-red-700 bg-red-50' },
                    { date: '2026-02-18', from: 'Emirates NBD', to: 'Al-Furqan LLC', amount: '$8.1M', flag: 'Shell transfer', flagColor: 'text-red-700 bg-red-50' },
                    { date: '2026-02-18', from: 'Al-Furqan LLC', to: 'Ziraat Bank', amount: '$6.3M', flag: 'Layering', flagColor: 'text-amber-700 bg-amber-50' },
                    { date: '2026-01-15', from: 'Omid Construction LLC', to: 'Emirates NBD', amount: '$2.1M', flag: 'Structuring', flagColor: 'text-amber-700 bg-amber-50' },
                  ].map((tx, i) => (
                    <tr key={i} className="hover:bg-stone-50">
                      <td className="px-4 py-2 font-mono text-stone-500">{tx.date}</td>
                      <td className="px-4 py-2 text-stone-700">{tx.from}</td>
                      <td className="px-4 py-2 text-stone-700">{tx.to}</td>
                      <td className="px-4 py-2 font-semibold text-stone-900">{tx.amount}</td>
                      <td className="px-4 py-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${tx.flagColor}`}>
                          {tx.flag}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'shells' && (
          <div className="p-5">
            <h2 className="text-sm font-semibold text-stone-900 mb-4">Shell Structure — Ownership Chain</h2>
            <div className="border border-stone-200 rounded-lg overflow-hidden" style={{ height: '400px' }}>
              <NetworkGraph />
            </div>
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
              <span className="font-medium">JAHAN note:</span> Omid Construction LLC and Al-Furqan Trading LLC share 2 directors (Mohammad Al-Rashidi, Farid Nasseri) and identical registered address in Dubai, Business Bay Tower, Suite 1402.
            </div>
          </div>
        )}

        {activeTab === 'freeze' && (
          <div className="p-5">
            <h2 className="text-sm font-semibold text-stone-900 mb-4">Freeze Requests — 2 pending</h2>
            <div className="space-y-3">
              {[
                { id: 'AUTH-2026-0088', inst: 'Ziraat Bank Istanbul (Omid Construction LLC)', amount: '$6.1M', deadline: '2026-02-22', status: 'Pending judicial approval' },
                { id: 'AUTH-2026-0087', inst: 'Emirates NBD (Al-Furqan Trading LLC)', amount: '$8.2M', deadline: '2026-02-22', status: 'Pending diplomatic coordination' },
              ].map((req, i) => (
                <div key={i} className="p-4 border border-stone-200 rounded-lg bg-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-mono text-xs text-blue-700 mb-1">{req.id}</div>
                      <div className="text-sm font-medium text-stone-900">{req.inst}</div>
                      <div className="text-sm text-stone-600 mt-0.5">Amount: <span className="font-semibold">{req.amount}</span></div>
                      <div className="text-xs text-stone-400 mt-1">Deadline: {req.deadline}</div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">{req.status}</span>
                      <button className="text-xs text-blue-700 hover:underline">Track status</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'assessment' && (
          <div className="p-5 max-w-2xl">
            <h2 className="text-sm font-semibold text-stone-900 mb-4">Financial Intelligence Assessment</h2>
            <div className="border border-stone-200 rounded-lg p-6 bg-white">
              <div className="font-mono text-xs text-stone-700 whitespace-pre-line leading-relaxed">
                {`FINANCIAL INTELLIGENCE ASSESSMENT
Reference: FIN-ENF-2026-0038
Classification: RESTRICTED — Synthetic Demonstration
Subject: JB-P-00283716 — Colonel Davoud Ansari
Date: 19 February 2026

KEY FINDINGS

We assess with HIGH CONFIDENCE (94%) that Colonel Davoud Ansari
has initiated systematic asset flight totalling approximately $47.2M
via a 4-entity shell structure across UAE and Turkey.
[Source: FININT A2, Banking disclosures B2]

The ownership chain — Ansari → Omid Construction LLC → Al-Furqan
Trading LLC → Emirates NBD → Ziraat Bank Istanbul — constitutes
classic three-layer structuring consistent with pre-departure
asset concealment.

A further $14.2M in cryptocurrency holdings has been identified
but is not yet fully traced. Confidence: 71% (FININT C2).

RECOMMENDED ACTIONS:
  1. Freeze requests submitted: AUTH-2026-0087, AUTH-2026-0088
  2. Emirati regulatory coordination initiated
  3. Turkish judicial assistance request: pending
  4. Crypto tracing: ongoing (Chainalysis integration required)`}
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-stone-100">
                <button className="px-3 py-2 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Submit for review
                </button>
                <button className="px-3 py-2 text-xs border border-stone-200 rounded-md text-stone-600 hover:bg-stone-50 transition-colors">
                  Export
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT — JAHAN PANEL */}
      <JahanPanel
        caseId={entityId}
        moduleContext="fin-enf"
        recentAnalysis={JAHAN_ANALYSIS}
        workflows={[
          { id: 'follow-money', label: 'Follow the Money' },
          { id: 'draft-freeze', label: 'Draft freeze request' },
        ]}
      />
    </div>
  );
}
