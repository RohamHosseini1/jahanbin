'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FileText, Users, BookOpen, Link2, Package } from 'lucide-react';
import { AdmiraltyBadge } from '@/components/shared/AdmiraltyBadge';
import { JahanPanel } from '@/components/shared/JahanPanel';

const navItems = [
  { id: 'event', label: 'Event Record', icon: FileText, count: null },
  { id: 'subjects', label: 'Subjects', icon: Users, count: 23 },
  { id: 'evidence', label: 'Evidence Log', icon: BookOpen, count: 47 },
  { id: 'chain', label: 'Accountability Chains', icon: Link2, count: null },
  { id: 'packages', label: 'Prosecution Packages', icon: Package, count: 14 },
];

const JAHAN_ANALYSIS = [
  {
    title: 'Command chain confidence',
    body: 'B2 at SNSC level, A1 at provincial level. Weakest link: regional command (Shafahi) — 2 intercepts only. Recommend additional SIGINT for Shafahi to strengthen to A2.',
    confidence: undefined,
  },
  {
    title: 'Prosecution readiness — Ansari',
    body: 'Outstanding: independent forensic verification (in progress) and 2 additional witness statements. Asset freeze coordination with FIN-ENF required.',
    confidence: 87,
  },
];

export default function TrcCaseWorkspacePage() {
  const params = useParams();
  const caseId = params.caseId as string;
  const [activeTab, setActiveTab] = useState('subjects');
  const [selectedSubject, setSelectedSubject] = useState<string | null>('JB-P-00283716');

  return (
    <div className="flex h-full" style={{ height: 'calc(100vh - 24px - 56px)' }}>

      {/* LEFT NAV */}
      <div className="flex-none w-48 border-e border-stone-200 bg-stone-50 flex flex-col overflow-y-auto">
        <div className="px-4 py-4 border-b border-stone-200">
          <div className="text-[10px] font-mono text-stone-400 mb-1">{caseId}</div>
          <div className="text-sm font-semibold text-stone-900">Bloody November 2019</div>
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
                {item.count !== null && (
                  <span className={`text-[10px] font-mono ${isActive ? 'text-stone-700' : 'text-stone-400'}`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-3 border-t border-stone-200 space-y-1.5">
          <div className="text-[10px] text-stone-400">Event: November 2019</div>
          <div className="text-[10px] text-stone-400">Deaths documented: 1,500+</div>
          <div className="text-[10px] text-stone-400">Prosecution-ready: 14</div>
          <Link href="/trc-sup" className="text-[10px] text-blue-600 hover:underline flex items-center gap-0.5 mt-2">
            ← All cases
          </Link>
        </div>
      </div>

      {/* CENTER */}
      <div className="flex-1 overflow-y-auto">

        {activeTab === 'subjects' && (
          <div className="p-5">
            <h2 className="text-sm font-semibold text-stone-900 mb-4">Subjects — 23 individuals</h2>
            <div className="border border-stone-200 rounded-lg overflow-hidden mb-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Name</th>
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">JB ID</th>
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Evidence</th>
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Prosecution Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {[
                    { name: 'Col. Davoud Ansari', id: 'JB-P-00283716', evidence: '12 items', status: 'PROSECUTION READY (87%)', statusColor: 'text-green-700 bg-green-50', selected: true },
                    { name: 'Brig. Gen. Ahmad Shafahi', id: 'JB-P-00098211', evidence: '7 items', status: 'Active', statusColor: 'text-amber-700 bg-amber-50', selected: false },
                    { name: '[18 more subjects]', id: '…', evidence: '—', status: 'Various', statusColor: 'text-stone-500 bg-stone-100', selected: false },
                  ].map((subj, i) => (
                    <tr
                      key={i}
                      onClick={() => setSelectedSubject(subj.id)}
                      className={`cursor-pointer transition-colors ${subj.selected || selectedSubject === subj.id ? 'bg-blue-50' : 'hover:bg-stone-50'}`}
                    >
                      <td className="px-4 py-3 font-medium text-stone-900">{subj.name}</td>
                      <td className="px-4 py-3 font-mono text-stone-500">{subj.id}</td>
                      <td className="px-4 py-3 text-stone-600">{subj.evidence}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${subj.statusColor}`}>
                          {subj.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'chain' && (
          <div className="p-5 max-w-lg">
            <h2 className="text-sm font-semibold text-stone-900 mb-4">Accountability Chain — Col. Ansari</h2>

            {/* Chain visualization */}
            <div className="space-y-0">
              {[
                {
                  level: 'NATIONAL COMMAND',
                  body: 'Supreme National Security Council',
                  detail: 'Directive 2019-1847: "Decisive measures against protesters"',
                  evidence: '3 documents',
                  adm: 'A1',
                  adm2: 'C3',
                  highlight: false,
                },
                {
                  level: 'REGIONAL COMMAND',
                  body: 'IRGC Southeast — Brig. Gen. Shafahi',
                  detail: '"Transmitted orders with ROE permitting live fire"',
                  evidence: '2 intercepts',
                  adm: 'A2',
                  adm2: 'B2',
                  highlight: false,
                },
                {
                  level: '★ PROVINCIAL COMMAND — PRIMARY',
                  body: 'IRGC Sistan-Baluchestan — Col. Ansari',
                  detail: '"Direct operational command. Ordered shoot-to-kill."',
                  evidence: 'Radio intercepts + 4 witnesses + CCTV',
                  adm: 'A1',
                  adm2: 'A1',
                  highlight: true,
                },
                {
                  level: 'UNIT LEVEL',
                  body: 'IRGC 41st Tharallah Brigade',
                  detail: '"Carried out orders. 89 deaths."',
                  evidence: 'CCTV + survivor accounts',
                  adm: 'A1',
                  adm2: 'A2',
                  highlight: false,
                },
              ].map((node, i) => (
                <div key={i}>
                  <div className={`p-4 border rounded-lg ${node.highlight ? 'border-blue-300 bg-blue-50' : 'border-stone-200 bg-white'}`}>
                    <div className={`text-[11px] font-semibold uppercase tracking-wide mb-1 ${node.highlight ? 'text-blue-800' : 'text-stone-500'}`}>
                      {node.level}
                    </div>
                    <div className={`text-sm font-semibold mb-1 ${node.highlight ? 'text-blue-900' : 'text-stone-900'}`}>{node.body}</div>
                    <div className="text-xs text-stone-600 italic mb-2">{node.detail}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-stone-400">Evidence: {node.evidence}</span>
                      <AdmiraltyBadge code={node.adm} />
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="chain-connector" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'event' && (
          <div className="p-5 max-w-2xl">
            <h2 className="text-sm font-semibold text-stone-900 mb-4">Event Record — Bloody November 2019</h2>
            <div className="space-y-4 text-sm text-stone-700">
              <div className="grid grid-cols-2 gap-4 p-4 border border-stone-200 rounded-lg bg-stone-50">
                <div><span className="text-stone-500 text-xs">Event dates:</span><div className="font-medium">November 15–18, 2019</div></div>
                <div><span className="text-stone-500 text-xs">Location:</span><div className="font-medium">16 provinces, Iran</div></div>
                <div><span className="text-stone-500 text-xs">Deaths documented:</span><div className="font-medium text-red-700">1,500+</div></div>
                <div><span className="text-stone-500 text-xs">Wounded:</span><div className="font-medium">4,800+</div></div>
                <div><span className="text-stone-500 text-xs">Detained:</span><div className="font-medium">7,000+</div></div>
                <div><span className="text-stone-500 text-xs">Context:</span><div className="font-medium">Fuel price protests</div></div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                On 15 November 2019, Iranian security forces opened fire on protesters across 16 provinces following a sudden fuel price increase. The Supreme National Security Council issued Directive 2019-1847 authorizing &ldquo;decisive measures.&rdquo; IRGC and Law Enforcement units carried out lethal force operations over four days.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="p-5">
            <h2 className="text-sm font-semibold text-stone-900 mb-4">Evidence Log — 47 items</h2>
            <div className="border border-stone-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    <th className="text-start px-3 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Reference</th>
                    <th className="text-start px-3 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Type</th>
                    <th className="text-start px-3 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Description</th>
                    <th className="text-start px-3 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Admiralty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {[
                    { ref: 'SIGINT-TRC-001', type: 'SIGINT', desc: 'Radio intercept — Ansari ordering live fire', adm: 'A1' },
                    { ref: 'WIT-TRC-001', type: 'Witness', desc: 'Survivor statement — Sistan-Baluchestan', adm: 'B2' },
                    { ref: 'DOC-TRC-001', type: 'Document', desc: 'SNSC Directive 2019-1847', adm: 'A1' },
                    { ref: 'CCTV-TRC-001', type: 'CCTV', desc: 'Footage of IRGC units in Zahedan', adm: 'A2' },
                    { ref: 'WIT-TRC-002', type: 'Witness', desc: 'Hospital staff testimony — 89 casualties', adm: 'B1' },
                  ].map((item, i) => (
                    <tr key={i} className="hover:bg-stone-50">
                      <td className="px-3 py-2.5 font-mono text-stone-600">{item.ref}</td>
                      <td className="px-3 py-2.5">
                        <span className="px-1.5 py-0.5 bg-stone-100 rounded text-[10px] text-stone-600">{item.type}</span>
                      </td>
                      <td className="px-3 py-2.5 text-stone-700">{item.desc}</td>
                      <td className="px-3 py-2.5"><AdmiraltyBadge code={item.adm} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'packages' && (
          <div className="p-5">
            <h2 className="text-sm font-semibold text-stone-900 mb-4">Prosecution Packages — 14 ready</h2>
            <div className="border border-stone-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Subject</th>
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Readiness</th>
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Status</th>
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {[
                    { name: 'Col. Davoud Ansari', readiness: 87, status: 'Ready for review', color: 'text-green-700 bg-green-50' },
                    { name: 'Brig. Gen. Shafahi', readiness: 64, status: 'In progress', color: 'text-amber-700 bg-amber-50' },
                  ].map((pkg, i) => (
                    <tr key={i} className="hover:bg-stone-50">
                      <td className="px-4 py-3 font-medium text-stone-900">{pkg.name}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${pkg.readiness}%` }} />
                          </div>
                          <span className="text-stone-700 font-medium">{pkg.readiness}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${pkg.color}`}>
                          {pkg.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-xs text-blue-700 hover:underline">Build package →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT — JAHAN PANEL */}
      <div className="flex-none w-72 border-s border-stone-200 bg-stone-50 flex flex-col overflow-hidden">
        {/* Prosecution readiness panel */}
        <div className="px-4 py-4 border-b border-stone-200 bg-white">
          <div className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">Prosecution Readiness — Ansari</div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '87%' }} />
            </div>
            <span className="text-sm font-semibold text-green-700">87%</span>
          </div>
          <div className="space-y-1 text-xs">
            {[
              { done: true, text: 'Command responsibility established' },
              { done: true, text: 'Individual orders traced to subject' },
              { done: true, text: 'Pattern of conduct (3 incidents)' },
              { done: true, text: 'Civilian status confirmed' },
              { done: true, text: '6 witness statements' },
              { done: false, text: 'Independent forensic verification', pending: true },
              { done: false, text: '2 additional witness statements needed', pending: true },
              { done: false, text: 'Assets frozen (coordinate FIN-ENF)', fail: true },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className={`flex-shrink-0 ${item.done ? 'text-green-600' : item.fail ? 'text-red-500' : 'text-amber-500'}`}>
                  {item.done ? '✅' : item.fail ? '❌' : '⏳'}
                </span>
                <span className="text-stone-600">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-stone-100">
            <div className="text-[10px] text-stone-500">Legal basis: Rome Statute Art. 7 — Crimes Against Humanity</div>
            <div className="text-[10px] text-stone-500 mt-0.5">ICJ referral: Eligible</div>
          </div>
          <button className="mt-3 w-full px-3 py-2 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Build prosecution package →
          </button>
        </div>

        {/* JAHAN panel */}
        <div className="flex-1 overflow-hidden">
          <JahanPanel
            moduleContext="trc-sup"
            recentAnalysis={JAHAN_ANALYSIS}
            workflows={[
              { id: 'prosecution-package', label: 'Build prosecution package' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
