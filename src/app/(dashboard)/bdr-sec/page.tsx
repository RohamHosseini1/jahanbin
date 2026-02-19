'use client';

import { useState } from 'react';
import Link from 'next/link';

const alerts = [
  {
    id: 'BDR-2026-0038-A',
    crossing: 'Bazargan',
    type: 'Biometric match',
    subject: 'Kamyar Shirazi → Ansari',
    status: 'Interdicted',
    statusColor: 'text-red-700 bg-red-50',
    time: '09:47',
    priority: 'Priority',
    priorityColor: 'text-red-700 bg-red-50',
  },
  {
    id: 'BDR-2026-0037',
    crossing: 'Mehran',
    type: 'Watchlist hit',
    subject: '[Unknown]',
    status: 'Under review',
    statusColor: 'text-amber-700 bg-amber-50',
    time: '09:21',
    priority: 'High',
    priorityColor: 'text-orange-700 bg-orange-50',
  },
  {
    id: 'BDR-2026-0036',
    crossing: 'Bandar Abbas',
    type: 'Document anomaly',
    subject: '[Unknown]',
    status: 'Under review',
    statusColor: 'text-amber-700 bg-amber-50',
    time: '08:55',
    priority: 'Medium',
    priorityColor: 'text-stone-600 bg-stone-100',
  },
];

const tabs = ['Alert Queue', 'Border Map', 'Watchlist', 'Crossing Status'];

export default function BdrSecPage() {
  const [activeTab, setActiveTab] = useState('Alert Queue');

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[18px] font-semibold text-stone-900">Border Security — BDR-SEC</h1>
        <p className="text-sm text-stone-500 mt-0.5">Active alert management and subject assessment</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-stone-200">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? 'border-blue-600 text-blue-700 font-medium'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Alert Queue' && (
        <div className="border border-stone-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Alert ID</th>
                <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Crossing</th>
                <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Alert Type</th>
                <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Subject</th>
                <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Status</th>
                <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Time</th>
                <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {alerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-stone-50 transition-colors cursor-pointer group">
                  <td className="px-4 py-3">
                    <Link href={`/bdr-sec/alerts/${alert.id}`} className="block">
                      <span className="font-mono text-xs text-blue-700 group-hover:underline">{alert.id}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-stone-700">{alert.crossing}</td>
                  <td className="px-4 py-3 text-sm text-stone-600">{alert.type}</td>
                  <td className="px-4 py-3 text-sm text-stone-700">{alert.subject}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${alert.statusColor}`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-stone-500">{alert.time}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${alert.priorityColor}`}>
                      {alert.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Border Map' && (
        <div className="border border-stone-200 rounded-lg flex items-center justify-center bg-stone-50" style={{ height: '500px' }}>
          <div className="text-center text-stone-400">
            <div className="text-sm font-medium mb-1">Border Map</div>
            <div className="text-xs">Interactive map view — 8 active crossing points</div>
            <div className="mt-4 text-xs text-stone-300">[ Map visualization loads in browser ]</div>
          </div>
        </div>
      )}

      {activeTab === 'Watchlist' && (
        <div className="border border-stone-200 rounded-lg overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="text-start px-4 py-3 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Entity</th>
                <th className="text-start px-4 py-3 text-[10px] font-medium text-stone-400 uppercase tracking-wide">JB ID</th>
                <th className="text-start px-4 py-3 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Category</th>
                <th className="text-start px-4 py-3 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Basis</th>
                <th className="text-start px-4 py-3 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Expires</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {[
                { name: 'Colonel Davoud Ansari', id: 'JB-P-00283716', cat: 'Category A — Priority', basis: 'AUTH-2026-0081', exp: '2026-04-28' },
                { name: 'Hossein Taghavi', id: 'JB-P-00142857', cat: 'Category A — Priority', basis: 'AUTH-2026-0082', exp: '2026-04-28' },
                { name: 'Reza Ahmadzadeh', id: 'JB-P-00389201', cat: 'Category B — Elevated', basis: 'AUTH-2026-0083', exp: '2026-03-15' },
                { name: 'Maryam Bahrami', id: 'JB-P-00521089', cat: 'Category B — Elevated', basis: 'AUTH-2026-0084', exp: '2026-03-15' },
              ].map((w, i) => (
                <tr key={i} className="hover:bg-stone-50">
                  <td className="px-4 py-3 font-medium text-stone-800">{w.name}</td>
                  <td className="px-4 py-3 font-mono text-stone-500">{w.id}</td>
                  <td className="px-4 py-3 text-stone-600">{w.cat}</td>
                  <td className="px-4 py-3 font-mono text-blue-700">{w.basis}</td>
                  <td className="px-4 py-3 text-stone-400">{w.exp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Crossing Status' && (
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'Bazargan', status: 'ALERT', color: 'border-red-200 bg-red-50', dot: 'bg-red-500', count: 1 },
            { name: 'Mehran', status: 'Alert', color: 'border-amber-200 bg-amber-50', dot: 'bg-amber-500', count: 1 },
            { name: 'Bandar Abbas', status: 'Alert', color: 'border-amber-200 bg-amber-50', dot: 'bg-amber-500', count: 1 },
            { name: 'Arvand Rud', status: 'Normal', color: 'border-stone-200 bg-white', dot: 'bg-green-500', count: 0 },
            { name: 'Milak', status: 'Normal', color: 'border-stone-200 bg-white', dot: 'bg-green-500', count: 0 },
            { name: 'Astara', status: 'Normal', color: 'border-stone-200 bg-white', dot: 'bg-green-500', count: 0 },
          ].map((crossing, i) => (
            <div key={i} className={`p-4 border rounded-lg ${crossing.color}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${crossing.dot}`} />
                  <span className="text-sm font-medium text-stone-900">{crossing.name}</span>
                </div>
                <span className="text-xs text-stone-500">{crossing.count > 0 ? `${crossing.count} alert` : 'Clear'}</span>
              </div>
              <div className="text-xs text-stone-500 mt-1">{crossing.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
