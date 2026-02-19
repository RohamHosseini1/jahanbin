'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Plus, Play } from 'lucide-react';
import { ProcessReportWorkflow } from '@/components/workflows/ProcessReportWorkflow';

const cases = [
  {
    id: 'JB-CASE-2026-0047',
    title: 'Operation SPARROW',
    status: 'Active',
    statusColor: 'text-green-700 bg-green-50',
    subject: 'Hossein Taghavi',
    lead: 'JB-0471',
    updated: '2026-02-03',
    priority: 'Critical',
    priorityColor: 'text-red-700 bg-red-50',
  },
  {
    id: 'JB-CASE-2026-0031',
    title: 'Network ASHRAF',
    status: 'Active',
    statusColor: 'text-green-700 bg-green-50',
    subject: '[Unknown]',
    lead: 'JB-0312',
    updated: '2026-02-01',
    priority: 'Standard',
    priorityColor: 'text-stone-600 bg-stone-100',
  },
  {
    id: 'JB-CASE-2026-0019',
    title: 'Channel HAKIM',
    status: 'Pending Auth',
    statusColor: 'text-amber-700 bg-amber-50',
    subject: '[Unknown]',
    lead: 'JB-0201',
    updated: '2026-01-28',
    priority: 'Standard',
    priorityColor: 'text-stone-600 bg-stone-100',
  },
];

export default function CTOpsPage() {
  const [showWorkflow, setShowWorkflow] = useState(false);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[18px] font-semibold text-stone-900">Counterterrorism — CT-OPS</h1>
          <p className="text-sm text-stone-500 mt-0.5">Active investigation workbench</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowWorkflow(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm border border-stone-200 rounded-md text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <Play size={13} />
            Start guided workflow
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Plus size={13} />
            New case
          </button>
        </div>
      </div>

      {/* Case queue table */}
      <div className="border border-stone-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Case ID</th>
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Title</th>
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Status</th>
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Primary Subject</th>
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Lead</th>
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Updated</th>
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {cases.map((c) => (
              <tr key={c.id} className="hover:bg-stone-50 transition-colors cursor-pointer group">
                <td className="px-4 py-3">
                  <Link href={`/ct-ops/${c.id}`} className="block">
                    <span className="font-mono text-xs text-blue-700 group-hover:underline">{c.id}</span>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/ct-ops/${c.id}`} className="block">
                    <span className="text-sm font-medium text-stone-900">{c.title}</span>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${c.statusColor}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-stone-600">{c.subject}</td>
                <td className="px-4 py-3 text-xs font-mono text-stone-500">{c.lead}</td>
                <td className="px-4 py-3 text-xs text-stone-400">{c.updated}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${c.priorityColor}`}>
                    {c.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showWorkflow && (
        <ProcessReportWorkflow onClose={() => setShowWorkflow(false)} />
      )}
    </div>
  );
}
