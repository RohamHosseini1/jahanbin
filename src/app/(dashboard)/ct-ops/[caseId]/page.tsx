'use client';

import { useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { FileText, Users, Network, Lightbulb, ClipboardList, ChevronRight, Plus } from 'lucide-react';
import { AdmiraltyBadge } from '@/components/shared/AdmiraltyBadge';
import { ConfidenceBar } from '@/components/shared/ConfidenceBar';
import { JahanPanel } from '@/components/shared/JahanPanel';
import { ProcessReportWorkflow } from '@/components/workflows/ProcessReportWorkflow';
import { ThreatAssessmentWorkflow } from '@/components/workflows/ThreatAssessmentWorkflow';
import dynamic from 'next/dynamic';

const NetworkGraph = dynamic(
  () => import('@/components/modules/ct-ops/NetworkGraph').then(m => ({ default: m.NetworkGraph })),
  { ssr: false }
);

const navItems = [
  { id: 'reports', label: 'Source Reports', icon: FileText, count: 4 },
  { id: 'evidence', label: 'Evidence Items', icon: ClipboardList, count: 11 },
  { id: 'subjects', label: 'Subjects', icon: Users, count: 9 },
  { id: 'network', label: 'Network Analysis', icon: Network, count: null },
  { id: 'hypotheses', label: 'Hypotheses', icon: Lightbulb, count: null },
  { id: 'assessments', label: 'Assessments', icon: ClipboardList, count: 1 },
];

const JAHAN_ANALYSIS = [
  {
    title: 'Source rating upgrade',
    body: 'HUMINT-2026-0471: F3 → C2. Based on independent corroboration from SIGINT, GEOINT, and FININT across 3 collection disciplines.',
    confidence: 91,
  },
  {
    title: 'Entity resolution',
    body: '"Taghavi" → JB-P-00142857 (97%). "Ahmadzadeh" → JB-P-00389201 (94%). 2 individuals: no database match.',
    confidence: undefined,
  },
  {
    title: 'Pattern alert',
    body: 'Communication burst pattern matches IRGC cell comm protocol (83% similarity to 6 prior confirmed cases).',
    confidence: 83,
  },
];

export default function CaseWorkspacePage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = use(params);
  const [activeTab, setActiveTab] = useState('reports');
  const [showProcessReport, setShowProcessReport] = useState(false);
  const [showThreatAssessment, setShowThreatAssessment] = useState(false);

  return (
    <div className="flex h-full" style={{ height: 'calc(100vh - 24px - 56px)' }}>

      {/* LEFT NAV — case navigation */}
      <div className="flex-none w-48 border-e border-stone-200 bg-stone-50 flex flex-col overflow-y-auto">
        <div className="px-4 py-4 border-b border-stone-200">
          <div className="text-[10px] font-mono text-stone-400 mb-1">{caseId}</div>
          <div className="text-sm font-semibold text-stone-900">Operation SPARROW</div>
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
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] text-stone-500">Active</span>
          </div>
          <div className="text-[10px] text-stone-400">Auth: AUTH-2026-0085</div>
          <div className="text-[10px] text-stone-400">Lead: JB-0471</div>
          <div className="text-[10px] text-stone-400">Opened: 15 Jan 2026</div>
          <Link href="/ct-ops" className="text-[10px] text-blue-600 hover:underline flex items-center gap-0.5 mt-2">
            ← All cases
          </Link>
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="flex-1 overflow-y-auto">

        {activeTab === 'reports' && (
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-stone-900">Source Reports</h2>
              <button
                onClick={() => setShowProcessReport(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus size={12} />
                Process new report
              </button>
            </div>
            <div className="space-y-3">
              {[
                { ref: 'HUMINT-IR-2026-0471', type: 'Walk-in source — Codename SPARROW', received: '15 Jan 2026, 14:23', rating: 'C2', processed: true },
                { ref: 'SIGINT-IR-2026-0091', type: 'Burst communications intercept', received: '12 Jan 2026, 07:14', rating: 'A2', processed: true },
                { ref: 'GEOINT-2026-0047', type: 'Vehicle movement surveillance', received: '18 Jan 2026, 11:02', rating: 'B2', processed: true },
                { ref: 'FININT-2026-0033', type: 'Financial transaction analysis', received: '20 Jan 2026, 09:30', rating: 'A2', processed: true },
              ].map((report, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-stone-200 rounded-lg bg-white hover:bg-stone-50 transition-colors">
                  <div>
                    <div className="text-sm font-medium text-stone-900 font-mono">{report.ref}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{report.type}</div>
                    <div className="text-[10px] text-stone-400 mt-1">Received: {report.received}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-start">
                      <div className="text-[10px] text-stone-400 mb-1">Rating</div>
                      <AdmiraltyBadge code={report.rating} />
                    </div>
                    {report.processed && (
                      <span className="text-[11px] text-green-700 bg-green-50 px-2 py-0.5 rounded font-medium">JAHAN processed ✓</span>
                    )}
                    <div className="flex items-center gap-1">
                      <button className="text-xs text-blue-700 hover:underline">View</button>
                      <span className="text-stone-300">·</span>
                      <button className="text-xs text-stone-500 hover:text-stone-700">Review extraction</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-stone-900">Evidence Items — JAHAN Extraction Table</h2>
            </div>
            <div className="border border-stone-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    <th className="text-start px-3 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Source</th>
                    <th className="text-start px-3 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Claim</th>
                    <th className="text-start px-3 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Conf.</th>
                    <th className="text-start px-3 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Admiralty</th>
                    <th className="text-start px-3 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Analyst</th>
                    <th className="text-start px-3 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {[
                    { src: 'HUMINT-2026-0471', claim: 'Taghavi is primary cell coordinator', conf: 87, adm: 'C2', status: 'confirmed' },
                    { src: 'HUMINT-2026-0471', claim: 'Cell size: 5–7 individuals', conf: 71, adm: 'C3', status: 'confirmed' },
                    { src: 'SIGINT-2026-0091', claim: 'Taghavi–Ahmadzadeh direct comms confirmed', conf: 94, adm: 'A2', status: 'confirmed' },
                    { src: 'SIGINT-2026-0091', claim: 'Burst pattern: 07:00–08:00 window', conf: 91, adm: 'A2', status: 'confirmed' },
                    { src: 'GEOINT-2026-0047', claim: 'Vehicle convergence, District 17 warehouse', conf: 88, adm: 'B2', status: 'confirmed' },
                    { src: 'HUMINT-2026-0471', claim: 'IED materials observed at warehouse', conf: 32, adm: 'C3', status: 'pending' },
                    { src: 'FININT-2026-0033', claim: 'Ahmadzadeh: 7 accounts, $142K anomalous', conf: 94, adm: 'A2', status: 'confirmed' },
                    { src: 'MILREC', claim: 'Taghavi: IRGC-QF service 2003–2019', conf: 99, adm: 'A1', status: 'confirmed' },
                  ].map((row, i) => (
                    <tr key={i} className={`${row.status === 'pending' ? 'bg-purple-50' : 'bg-white'} hover:bg-stone-50 transition-colors`}>
                      <td className="px-3 py-2.5 font-mono text-stone-600 text-[11px]">{row.src}</td>
                      <td className="px-3 py-2.5 text-stone-700 max-w-xs">{row.claim}</td>
                      <td className="px-3 py-2.5">
                        <span className={`font-medium ${row.conf >= 70 ? 'text-green-700' : row.conf >= 50 ? 'text-amber-700' : 'text-red-700'}`}>
                          {row.conf}%
                          {row.conf < 50 && <span className="ms-1 text-[10px]">(UNVERIFIED)</span>}
                        </span>
                      </td>
                      <td className="px-3 py-2.5"><AdmiraltyBadge code={row.adm} /></td>
                      <td className="px-3 py-2.5">
                        {row.status === 'confirmed' ? (
                          <span className="text-green-700 text-[11px]">✓ Confirmed</span>
                        ) : (
                          <span className="text-amber-600 text-[11px]">⏳ Pending</span>
                        )}
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2 text-[11px]">
                          <button className="text-stone-400 hover:text-stone-700">Edit</button>
                          <button className="text-stone-400 hover:text-red-600">Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setShowThreatAssessment(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <ChevronRight size={13} />
                Run: Generate Threat Assessment
              </button>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="p-5">
            <h2 className="text-sm font-semibold text-stone-900 mb-4">Subjects — 9 total</h2>
            <div className="border border-stone-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Name</th>
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">JB ID</th>
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Role</th>
                    <th className="text-start px-4 py-2.5 text-[10px] font-medium text-stone-400 uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {[
                    { name: 'Hossein Taghavi', id: 'JB-P-00142857', role: 'Cell coordinator', status: 'At large', statusColor: 'text-red-700 bg-red-50' },
                    { name: 'Reza Ahmadzadeh', id: 'JB-P-00389201', role: 'Financial operative', status: 'Under surveillance', statusColor: 'text-amber-700 bg-amber-50' },
                    { name: 'Maryam Bahrami', id: 'JB-P-00521089', role: 'Logistics — bridge node', status: 'At large', statusColor: 'text-red-700 bg-red-50' },
                    { name: 'Colonel Davoud Ansari', id: 'JB-P-00283716', role: 'External financial link', status: 'Interdicted', statusColor: 'text-blue-700 bg-blue-50' },
                    { name: '[Unknown — Saeed]', id: '—', role: 'Suspected operative', status: 'Unidentified', statusColor: 'text-stone-500 bg-stone-100' },
                  ].map((subj, i) => (
                    <tr key={i} className="hover:bg-stone-50 transition-colors">
                      <td className="px-4 py-3">
                        <Link href={`/entity/${subj.id}`} className="text-blue-700 hover:underline font-medium">
                          {subj.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-mono text-stone-500">{subj.id}</td>
                      <td className="px-4 py-3 text-stone-600">{subj.role}</td>
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

        {activeTab === 'network' && (
          <div className="p-5" data-tour="network-graph">
            <h2 className="text-sm font-semibold text-stone-900 mb-4">Network Analysis</h2>
            <div className="border border-stone-200 rounded-lg overflow-hidden" style={{ height: '500px' }}>
              <NetworkGraph />
            </div>
          </div>
        )}

        {activeTab === 'hypotheses' && (
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-stone-900">Competing Hypotheses</h2>
              <button
                onClick={() => setShowThreatAssessment(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Generate Threat Assessment
              </button>
            </div>
            <div className="space-y-4">
              {[
                { id: 'H1', label: 'Active Sabotage Cell', confidence: 73, highlight: true, desc: 'Cell coordinated by Taghavi and Ahmadzadeh targeting electrical infrastructure in south Tehran.' },
                { id: 'H2', label: 'Financial Crime Network', confidence: 18, highlight: false, desc: 'Group engaged in procurement fraud and sanctions evasion using IRGC supply networks.' },
                { id: 'H3', label: 'Coincidental Association', confidence: 9, highlight: false, desc: 'Former colleagues maintaining social contact without operational coordination.' },
              ].map(h => (
                <div key={h.id} className={`p-4 rounded-lg border ${h.highlight ? 'border-purple-200 bg-purple-50' : 'border-stone-200 bg-white'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-stone-600">{h.id}</span>
                      <span className="text-sm font-semibold text-stone-900">{h.label}</span>
                      {h.highlight && <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded font-medium">JAHAN: strongest</span>}
                    </div>
                    <span className={`text-base font-semibold ${h.highlight ? 'text-purple-700' : 'text-stone-600'}`}>{h.confidence}%</span>
                  </div>
                  <ConfidenceBar value={h.confidence} />
                  <p className="text-xs text-stone-600 mt-2">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'assessments' && (
          <div className="p-5 max-w-3xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-stone-900">Assessments</h2>
            </div>
            <div className="border border-stone-200 rounded-lg p-6 bg-white">
              <div className="text-[10px] font-medium text-amber-600 uppercase tracking-wide mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Pending supervisory review
              </div>
              <div className="font-mono text-xs text-stone-700 whitespace-pre-line leading-relaxed border-t border-stone-100 pt-4">
                {`INTELLIGENCE ASSESSMENT
Reference: CT-OPS-2026-0047-A
Classification: RESTRICTED — Synthetic Demonstration
Date: 3 February 2026
Prepared by: Analyst JB-0471 | JAHAN-AI assisted
Authorized: Pending review

KEY JUDGMENTS

We assess with HIGH CONFIDENCE (87%) that Hossein Taghavi
(JB-P-00142857) leads an active cell of 7–9 individuals planning
infrastructure disruption in south Tehran.
[Source: SIGINT A2, HUMINT C2, GEOINT B2, FININT A2]

We assess with MODERATE CONFIDENCE (71%) that operational
activity is planned within a 7–14 day window.
[Source: SIGINT A2, GEOINT B3]

We CANNOT CONFIRM with available intelligence whether IED
materials have been obtained. This claim derives from a single
HUMINT source (C3) and is not independently corroborated.
[Source: HUMINT C3 — single source, uncorroborated]
Confidence: 32%

COORDINATION ORDERS ISSUED:
  FIN-ENF: Freeze accounts linked to Omid Construction LLC
  BDR-SEC: Flag cell members for border watch
  TRC-SUP: Cross-reference service records`}
              </div>
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-stone-100">
                <button className="px-3 py-2 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Submit for supervisory review
                </button>
                <button className="px-3 py-2 text-xs border border-stone-200 rounded-md text-stone-600 hover:bg-stone-50 transition-colors">
                  Export PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT — JAHAN PANEL */}
      <JahanPanel
        caseId={caseId}
        moduleContext="ct-ops"
        recentAnalysis={JAHAN_ANALYSIS}
        workflows={[
          { id: 'process-report', label: 'Process new report' },
          { id: 'threat-assessment', label: 'Generate threat assessment' },
          { id: 'judicial-auth', label: 'Request judicial authorization' },
        ]}
        onWorkflowLaunch={(id) => {
          if (id === 'process-report') setShowProcessReport(true);
          if (id === 'threat-assessment') setShowThreatAssessment(true);
        }}
      />

      {showProcessReport && (
        <ProcessReportWorkflow onClose={() => setShowProcessReport(false)} />
      )}
      {showThreatAssessment && (
        <ThreatAssessmentWorkflow onClose={() => setShowThreatAssessment(false)} />
      )}
    </div>
  );
}
