'use client';

import { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { JahanThinkingState } from '@/components/shared/JahanThinkingState';
import { AdmiraltyBadge } from '@/components/shared/AdmiraltyBadge';
import { ConfidenceBar } from '@/components/shared/ConfidenceBar';

interface ThreatAssessmentWorkflowProps {
  onClose: () => void;
  onComplete?: () => void;
}

const EVIDENCE_REVIEW_STEPS = [
  { text: 'Reviewing 11 evidence items for JB-CASE-2026-0047...', status: 'complete' as const },
  { text: 'Classifying by collection discipline...', status: 'complete' as const, substeps: ['HUMINT: 3 items', 'SIGINT: 2 items', 'GEOINT: 2 items', 'FININT: 2 items', 'MILREC: 1 item', 'Open source: 1 item'] },
  { text: 'Identifying convergent indicators...', status: 'complete' as const, substeps: ['All 4 disciplines confirm Taghavi as cell lead', 'Geographic convergence at District 17 warehouse confirmed'] },
  { text: 'Evidence review complete.', status: 'complete' as const },
];

const ASSESSMENT_STEPS = [
  { text: 'Evaluating H1 — Active Sabotage Cell...', status: 'complete' as const, substeps: ['SIGINT: 3 intercepts → strongly consistent', 'GEOINT: convergence confirmed → consistent', 'HUMINT: intent stated → consistent', 'FININT: anomalous activity → consistent (H1 and H2)', 'Overall: 73% confidence'] },
  { text: 'Red-teaming H1...', status: 'complete' as const, substeps: ['IED materials not independently confirmed → uncertainty preserved', 'Timeline estimate from single SIGINT source → moderate confidence only', 'Adjusted H1 confidence: 73% (unchanged — other sources compensate)'] },
  { text: 'Evaluating H2 — Financial Crime Network...', status: 'complete' as const, substeps: ['FININT consistent — but explains subset of activity only', 'SIGINT: operational comms inconsistent with purely financial motive', 'H2 confidence: 18%'] },
  { text: 'Generating assessment...', status: 'complete' as const },
];

const DRAFT_ASSESSMENT = `INTELLIGENCE ASSESSMENT
Reference: CT-OPS-2026-0047-A
Classification: RESTRICTED — Synthetic Demonstration
Date: 19 February 2026
Prepared by: Analyst JB-0471 | JAHAN-AI assisted

KEY JUDGMENTS

We assess with HIGH CONFIDENCE (87%) that Hossein Taghavi (JB-P-00142857) leads an active cell of 7–9 individuals planning infrastructure disruption in south Tehran.
[Source: SIGINT A2, HUMINT C2, GEOINT B2, FININT A2]

We assess with MODERATE CONFIDENCE (71%) that operational activity is planned within a 7–14 day window, based on communication burst patterns and observed logistics movements.
[Source: SIGINT A2, GEOINT B3]

We CANNOT CONFIRM with available intelligence whether IED materials have been obtained. This claim derives from a single HUMINT source (C3) and is not independently corroborated.
[Source: HUMINT C3 — single source, uncorroborated — confidence: 32%]

COORDINATION ORDERS ISSUED:
  FIN-ENF: Freeze accounts linked to Omid Construction LLC — pending authorization
  BDR-SEC: Flag cell members for border watch — active
  TRC-SUP: Cross-reference service records — active`;

export function ThreatAssessmentWorkflow({ onClose, onComplete }: ThreatAssessmentWorkflowProps) {
  const [step, setStep] = useState(1);
  const [evidenceDone, setEvidenceDone] = useState(false);
  const [assessmentDone, setAssessmentDone] = useState(false);
  const [assessmentText, setAssessmentText] = useState(DRAFT_ASSESSMENT);
  const [redTeamConfirmed, setRedTeamConfirmed] = useState(false);

  const stepTitles = ['Select Case', 'Evidence Review', 'Hypotheses', 'Draft Assessment', 'Red Team', 'Submit'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <div>
            <h2 className="text-[15px] font-semibold text-stone-900">Generate Threat Assessment</h2>
            <p className="text-xs text-stone-500 mt-0.5">JAHAN-assisted structured analysis</p>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-stone-100 transition-colors">
            <X size={16} className="text-stone-500" />
          </button>
        </div>

        {/* Stepper */}
        <div className="flex items-center px-6 py-3 border-b border-stone-100 overflow-x-auto">
          {stepTitles.map((title, i) => (
            <div key={i} className="flex items-center flex-shrink-0">
              <div className={`flex items-center gap-1.5 ${i + 1 === step ? 'text-blue-700' : i + 1 < step ? 'text-green-600' : 'text-stone-400'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold
                  ${i + 1 === step ? 'bg-blue-600 text-white' : i + 1 < step ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'}`}>
                  {i + 1 < step ? '✓' : i + 1}
                </div>
                <span className="text-[11px] hidden sm:block">{title}</span>
              </div>
              {i < stepTitles.length - 1 && (
                <div className={`w-6 h-px mx-2 ${i + 1 < step ? 'bg-green-300' : 'bg-stone-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-stone-500">Select the case for this threat assessment.</p>
              <div>
                <label className="text-[11px] font-medium text-stone-500 uppercase tracking-wide block mb-1">Case</label>
                <select className="w-full px-3 py-2 text-sm border border-stone-200 rounded-md focus:outline-none focus:border-blue-400">
                  <option>JB-CASE-2026-0047 — Operation SPARROW (11 evidence items)</option>
                  <option>JB-CASE-2026-0031 — Network ASHRAF (4 evidence items)</option>
                </select>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-md p-3 text-xs text-stone-600">
                <div className="font-medium text-stone-700 mb-1">Case overview: Operation SPARROW</div>
                <div>11 evidence items · 9 subjects · Lead: JB-0471 · Priority: Critical</div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-stone-500">JAHAN is reviewing all evidence items for this case.</p>
              <JahanThinkingState steps={EVIDENCE_REVIEW_STEPS} onComplete={() => setEvidenceDone(true)} speed={750} />
              {evidenceDone && (
                <div>
                  <p className="text-xs font-medium text-stone-600 mb-2">Evidence summary:</p>
                  <table className="w-full text-xs border border-stone-200 rounded-md overflow-hidden">
                    <thead>
                      <tr className="bg-stone-50">
                        <th className="text-start px-3 py-2 text-[10px] uppercase tracking-wide text-stone-400 font-medium">Source</th>
                        <th className="text-start px-3 py-2 text-[10px] uppercase tracking-wide text-stone-400 font-medium">Claim</th>
                        <th className="text-start px-3 py-2 text-[10px] uppercase tracking-wide text-stone-400 font-medium">Rating</th>
                        <th className="text-start px-3 py-2 text-[10px] uppercase tracking-wide text-stone-400 font-medium">Conf.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {[
                        { src: 'SIGINT-2026-0091', claim: 'Taghavi–Ahmadzadeh comms confirmed', adm: 'A2', conf: 94 },
                        { src: 'HUMINT-2026-0471', claim: 'Cell coordinator identified', adm: 'C2', conf: 87 },
                        { src: 'GEOINT-2026-0047', claim: 'Vehicle convergence, D17 warehouse', adm: 'B2', conf: 88 },
                        { src: 'FININT-2026-0033', claim: 'Anomalous financial transactions', adm: 'A2', conf: 94 },
                        { src: 'HUMINT-2026-0471', claim: 'IED materials at warehouse', adm: 'C3', conf: 32 },
                      ].map((row, i) => (
                        <tr key={i} className={row.conf < 50 ? 'bg-amber-50' : ''}>
                          <td className="px-3 py-2 font-mono text-stone-600 text-[11px]">{row.src}</td>
                          <td className="px-3 py-2 text-stone-700">{row.claim}</td>
                          <td className="px-3 py-2"><AdmiraltyBadge code={row.adm} /></td>
                          <td className="px-3 py-2">
                            <span className={`font-medium ${row.conf >= 70 ? 'text-green-700' : row.conf >= 50 ? 'text-amber-700' : 'text-red-700'}`}>
                              {row.conf}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-xs text-stone-500">Review competing hypotheses. JAHAN highlights the best-supported hypothesis.</p>
              <div className="space-y-3">
                {[
                  { id: 'H1', label: 'Active Sabotage Cell', confidence: 73, highlight: true, desc: 'Cell coordinated by Taghavi and Ahmadzadeh targeting electrical infrastructure in south Tehran.' },
                  { id: 'H2', label: 'Financial Crime Network', confidence: 18, highlight: false, desc: 'Group engaged in procurement fraud and sanctions evasion using IRGC supply networks.' },
                  { id: 'H3', label: 'Coincidental Association', confidence: 9, highlight: false, desc: 'Former colleagues maintaining social contact without operational coordination.' },
                ].map(h => (
                  <div key={h.id} className={`p-3 rounded-md border ${h.highlight ? 'border-purple-200 bg-purple-50' : 'border-stone-200 bg-stone-50'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-semibold text-stone-600">{h.id}</span>
                        <span className="text-xs font-semibold text-stone-800">{h.label}</span>
                        {h.highlight && <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded font-medium">JAHAN: strongest</span>}
                      </div>
                      <span className={`text-sm font-semibold ${h.highlight ? 'text-purple-700' : 'text-stone-600'}`}>{h.confidence}%</span>
                    </div>
                    <ConfidenceBar value={h.confidence} />
                    <p className="text-xs text-stone-600 mt-2">{h.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <p className="text-xs text-stone-500">JAHAN is generating a structured assessment based on the evidence review.</p>
              <JahanThinkingState steps={ASSESSMENT_STEPS} onComplete={() => setAssessmentDone(true)} speed={900} />
              {assessmentDone && (
                <div>
                  <p className="text-xs font-medium text-stone-600 mb-2">Draft assessment (editable):</p>
                  <textarea
                    value={assessmentText}
                    onChange={e => setAssessmentText(e.target.value)}
                    rows={14}
                    className="w-full px-3 py-2 text-xs font-mono border border-stone-200 rounded-md focus:outline-none focus:border-blue-400 text-stone-700 bg-stone-50 leading-relaxed"
                  />
                </div>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <p className="text-xs text-stone-500">Review JAHAN&apos;s red-team challenges before submitting.</p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3">
                <div className="text-xs font-semibold text-amber-900">Red team — JAHAN&apos;s own challenges to H1:</div>
                {[
                  'IED materials claim rests on single HUMINT source (C3). No independent confirmation. Should not appear in key judgments at current confidence.',
                  'Timeline estimate (7–14 days) derives from a single SIGINT burst pattern analysis. Moderate confidence only — do not present as firm intelligence.',
                  'Cell size estimate (7–9) is based on vehicle count and comm participants. Physical surveillance would strengthen this significantly.',
                  'Financial link to Ansari (FIN-ENF cross-ref) adds structural intelligence but is not yet corroborated independently in CT-OPS records.',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-amber-900">
                    <span className="flex-shrink-0 font-mono">·</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
              <label className="flex items-center gap-2 cursor-pointer mt-2">
                <input type="checkbox" onChange={e => setRedTeamConfirmed(e.target.checked)} className="rounded" />
                <span className="text-sm text-stone-700">I have reviewed the red-team points and they are reflected in the assessment or noted as limitations.</span>
              </label>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-xs font-semibold text-green-800 mb-2">Assessment ready for submission</div>
                <div className="space-y-1 text-xs text-stone-600">
                  <div><span className="font-medium">Reference:</span> CT-OPS-2026-0047-A</div>
                  <div><span className="font-medium">Case:</span> JB-CASE-2026-0047 — Operation SPARROW</div>
                  <div><span className="font-medium">Prepared by:</span> JB-0471 | JAHAN-AI assisted</div>
                  <div><span className="font-medium">Key judgments:</span> 3 (2 confirmed, 1 uncertainty)</div>
                  <div><span className="font-medium">Status after submission:</span> Pending supervisory review</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 text-sm text-stone-600 hover:text-stone-900 transition-colors">
            Cancel
          </button>
          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-sm border border-stone-200 rounded-md text-stone-700 hover:bg-stone-50 transition-colors"
              >
                Back
              </button>
            )}
            {step < 6 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 5 && !redTeamConfirmed}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
              >
                Continue
                <ChevronRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => { onComplete?.(); onClose(); }}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Submit for supervisory review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
