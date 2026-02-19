'use client';

import Link from 'next/link';
import { Play } from 'lucide-react';

const subjects = [
  {
    id: 'JB-P-00283716',
    name: 'Colonel Davoud Ansari',
    status: 'Active — asset flight',
    statusColor: 'text-red-700 bg-red-50',
    assets: '$23.4M + $14.2M crypto',
    priority: 'High',
    priorityColor: 'text-red-700 bg-red-50',
    lead: 'JB-0344',
    updated: 'Today',
  },
  {
    id: 'JB-O-00001',
    name: 'Setad (organization)',
    status: 'Active',
    statusColor: 'text-amber-700 bg-amber-50',
    assets: '$155B+',
    priority: 'High',
    priorityColor: 'text-red-700 bg-red-50',
    lead: 'JB-0201',
    updated: '2026-01-28',
  },
  {
    id: 'JB-O-00002',
    name: 'Khatam al-Anbiya',
    status: 'Active — sanctioned',
    statusColor: 'text-red-700 bg-red-50',
    assets: 'Undisclosed',
    priority: 'High',
    priorityColor: 'text-red-700 bg-red-50',
    lead: 'JB-0201',
    updated: '2026-01-25',
  },
];

export default function SubjectInvestigationPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[18px] font-semibold text-stone-900">Asset Recovery — Subject Investigation</h1>
          <p className="text-sm text-stone-500 mt-0.5">Individual and organizational financial investigation</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-stone-200 rounded-md text-stone-700 hover:bg-stone-50 transition-colors">
            <Play size={13} />
            Start: Follow the Money
          </button>
        </div>
      </div>

      {/* Subject queue table */}
      <div className="border border-stone-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Subject</th>
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">JB ID</th>
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Status</th>
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Total Assets ID</th>
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Priority</th>
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Lead</th>
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {subjects.map((s) => (
              <tr key={s.id} className="hover:bg-stone-50 transition-colors cursor-pointer group">
                <td className="px-4 py-3">
                  <Link href={`/fin-enf/subjects/${s.id}`} className="block">
                    <span className="text-sm font-medium text-stone-900 group-hover:text-blue-700 transition-colors">{s.name}</span>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs text-stone-500">{s.id}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${s.statusColor}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-stone-700">{s.assets}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${s.priorityColor}`}>
                    {s.priority}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs font-mono text-stone-500">{s.lead}</td>
                <td className="px-4 py-3 text-xs text-stone-400">{s.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
