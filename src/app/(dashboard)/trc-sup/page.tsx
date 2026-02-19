'use client';

import Link from 'next/link';
import { Clock } from 'lucide-react';

const cases = [
  {
    id: 'TRC-INV-2019-001',
    event: 'Bloody November 2019',
    subjects: '23 commanders',
    status: 'Active',
    statusColor: 'text-green-700 bg-green-50',
    prosecutionReady: '14 ready',
    lead: 'JB-0201',
  },
  {
    id: 'TRC-INV-1988-001',
    event: 'Mass Executions 1988',
    subjects: '47 commanders',
    status: 'Active',
    statusColor: 'text-green-700 bg-green-50',
    prosecutionReady: '6 ready',
    lead: 'JB-0412',
  },
  {
    id: 'TRC-INV-2009-001',
    event: 'Green Movement 2009',
    subjects: '18 commanders',
    status: 'Active',
    statusColor: 'text-green-700 bg-green-50',
    prosecutionReady: '2 ready',
    lead: 'JB-0311',
  },
  {
    id: 'TRC-INV-2022-001',
    event: 'Mahsa Amini Uprising',
    subjects: '34 commanders',
    status: 'Active',
    statusColor: 'text-green-700 bg-green-50',
    prosecutionReady: '0 ready',
    lead: 'JB-0201',
  },
];

export default function TrcSupPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[18px] font-semibold text-stone-900">Truth & Reconciliation — TRC-SUP</h1>
          <p className="text-sm text-stone-500 mt-0.5">Investigation support for the Truth and Reconciliation Commission</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/trc-sup/timeline"
            className="flex items-center gap-1.5 px-3 py-2 text-sm border border-stone-200 rounded-md text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <Clock size={13} />
            Open Historical Timeline
          </Link>
        </div>
      </div>

      {/* Case queue table */}
      <div className="border border-stone-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Case ID</th>
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Event</th>
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Subjects</th>
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Status</th>
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Prosecution Ready</th>
              <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Lead</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {cases.map((c) => (
              <tr key={c.id} className="hover:bg-stone-50 transition-colors cursor-pointer group">
                <td className="px-4 py-3">
                  <Link href={`/trc-sup/${c.id}`} className="block">
                    <span className="font-mono text-xs text-blue-700 group-hover:underline">{c.id}</span>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/trc-sup/${c.id}`} className="block">
                    <span className="text-sm font-medium text-stone-900">{c.event}</span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-stone-600">{c.subjects}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${c.statusColor}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-stone-700">{c.prosecutionReady}</td>
                <td className="px-4 py-3 text-xs font-mono text-stone-500">{c.lead}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
