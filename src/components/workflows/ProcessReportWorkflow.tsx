'use client';

import { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { JahanThinkingState } from '@/components/shared/JahanThinkingState';
import { AdmiraltyBadge } from '@/components/shared/AdmiraltyBadge';

interface ProcessReportWorkflowProps {
  onClose: () => void;
  onComplete?: () => void;
}

const ENTITY_EXTRACTION_STEPS = [
  { text: 'Scanning for person references...', status: 'complete' as const, substeps: ['Found: "Taghavi", "the commander"'] },
  { text: 'Scanning for locations...', status: 'complete' as const, substeps: ['Found: "District 17", "south Tehran"'] },
  { text: 'Scanning for organizations...', status: 'complete' as const, substeps: ['Found: suspected IRGC-QF affiliation'] },
  { text: 'Cross-referencing JB database...', status: 'complete' as const, substeps: ['"Taghavi" → JB-P-00142857 (97%)', '"commander" → no match — flagged as new entity'] },
  { text: 'Extraction complete.', status: 'complete' as const },
];

const CORROBORATION_STEPS = [
  { text: 'Searching existing evidence for corroborating items...', status: 'complete' as const },
  { text: 'Cross-referencing SIGINT collection...', status: 'complete' as const, substeps: ['Match: SIGINT-IR-2026-0091 (burst comm pattern — A2)'] },
  { text: 'Cross-referencing GEOINT...', status: 'complete' as const, substeps: ['Match: GEOINT-2026-0047 (vehicle convergence, District 17 — B2)'] },
  { text: 'Cross-referencing FININT...', status: 'complete' as const, substeps: ['Match: FININT-2026-0033 (anomalous transactions — A2)'] },
  { text: '3 corroborating items found across 3 collection disciplines.', status: 'complete' as const },
];

export function ProcessReportWorkflow({ onClose, onComplete }: ProcessReportWorkflowProps) {
  const [step, setStep] = useState(1);
  const [extractionDone, setExtractionDone] = useState(false);
  const [corrobDone, setCorrobDone] = useState(false);
  const [ratingChoice, setRatingChoice] = useState<'accept' | 'keep' | null>(null);
  const [formData, setFormData] = useState({
    reference: 'HUMINT-IR-2026-0512',
    type: 'Walk-in',
    codename: 'CANARY',
    rating: 'F3'
  });

  const stepTitles = ['Report Intake', 'Entity Extraction', 'Corroboration Check', 'Source Rating', 'Add to Case'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <div>
            <h2 className="text-[15px] font-semibold text-stone-900">Process New Intelligence Report</h2>
            <p className="text-xs text-stone-500 mt-0.5">JAHAN-assisted intake workflow</p>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-stone-100 transition-colors">
            <X size={16} className="text-stone-500" />
          </button>
        </div>

        {/* Stepper */}
        <div className="flex items-center px-6 py-3 border-b border-stone-100">
          {stepTitles.map((title, i) => (
            <div key={i} className="flex items-center">
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

        {/* Step content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-stone-500">Enter the basic details of the intelligence report received.</p>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-stone-500 uppercase tracking-wide block mb-1">Report Reference</label>
                  <input
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-md font-mono focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    value={formData.reference}
                    onChange={e => setFormData({...formData, reference: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-stone-500 uppercase tracking-wide block mb-1">Report Type</label>
                  <select className="w-full px-3 py-2 text-sm border border-stone-200 rounded-md focus:outline-none focus:border-blue-400">
                    <option>Walk-in</option>
                    <option>Agent debrief</option>
                    <option>Document intercept</option>
                    <option>SIGINT transcript</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-stone-500 uppercase tracking-wide block mb-1">Source Codename</label>
                  <input
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-md font-mono focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    value={formData.codename}
                    onChange={e => setFormData({...formData, codename: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-stone-500 uppercase tracking-wide block mb-1">Initial Source Rating</label>
                  <select className="w-full px-3 py-2 text-sm border border-stone-200 rounded-md focus:outline-none focus:border-blue-400">
                    <option>F3 — Reliability unknown, possibly true</option>
                    <option>F2 — Reliability unknown, probably true</option>
                    <option>E3 — Unreliable, possibly true</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-stone-500">JAHAN is reading report {formData.reference} and extracting all named entities.</p>
              <JahanThinkingState
                steps={ENTITY_EXTRACTION_STEPS}
                onComplete={() => setExtractionDone(true)}
                speed={700}
              />
              {extractionDone && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-stone-600 mb-2">Extracted entities — confirm matches:</p>
                  <table className="w-full text-xs border border-stone-200 rounded-md overflow-hidden">
                    <thead>
                      <tr className="bg-stone-50">
                        <th className="text-start px-3 py-2 text-[10px] uppercase tracking-wide text-stone-400 font-medium">Mention</th>
                        <th className="text-start px-3 py-2 text-[10px] uppercase tracking-wide text-stone-400 font-medium">Match</th>
                        <th className="text-start px-3 py-2 text-[10px] uppercase tracking-wide text-stone-400 font-medium">Confidence</th>
                        <th className="text-start px-3 py-2 text-[10px] uppercase tracking-wide text-stone-400 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      <tr>
                        <td className="px-3 py-2 text-stone-700">&ldquo;Taghavi&rdquo;</td>
                        <td className="px-3 py-2 font-mono text-blue-700">JB-P-00142857</td>
                        <td className="px-3 py-2 text-green-700">97%</td>
                        <td className="px-3 py-2">
                          <button className="text-blue-700 hover:underline">Confirm</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-stone-700">&ldquo;the commander&rdquo;</td>
                        <td className="px-3 py-2 text-stone-400 italic">No match — new entity</td>
                        <td className="px-3 py-2 text-stone-400">—</td>
                        <td className="px-3 py-2">
                          <button className="text-amber-700 hover:underline">Flag for follow-up</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-stone-700">&ldquo;District 17&rdquo;</td>
                        <td className="px-3 py-2 font-mono text-blue-700">LOC-TEHRAN-D17</td>
                        <td className="px-3 py-2 text-green-700">94%</td>
                        <td className="px-3 py-2">
                          <button className="text-blue-700 hover:underline">Confirm</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-xs text-stone-500">JAHAN is searching existing case evidence for corroborating items.</p>
              <JahanThinkingState
                steps={CORROBORATION_STEPS}
                onComplete={() => setCorrobDone(true)}
                speed={700}
              />
              {corrobDone && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-stone-600 mb-2">Corroborating evidence found:</p>
                  <div className="space-y-2">
                    {[
                      { ref: 'SIGINT-IR-2026-0091', claim: 'Taghavi–Ahmadzadeh direct comms confirmed', admiralty: 'A2' },
                      { ref: 'GEOINT-2026-0047', claim: 'Vehicle convergence, District 17 warehouse', admiralty: 'B2' },
                      { ref: 'FININT-2026-0033', claim: 'Anomalous financial activity — Ahmadzadeh', admiralty: 'A2' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 px-3 py-2 bg-green-50 border border-green-200 rounded-md">
                        <span className="text-xs font-mono text-stone-700">{item.ref}</span>
                        <span className="text-xs text-stone-600 flex-1">{item.claim}</span>
                        <AdmiraltyBadge code={item.admiralty} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-stone-900 mb-1">JAHAN Recommendation</div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      Source {formData.codename} was initially rated F3 (reliability unknown, possibly true).
                      Following independent corroboration from SIGINT (A2), GEOINT (B2), and FININT (A2) —
                      three separate collection disciplines — the source reliability can be upgraded to C2 (fairly reliable, probably true).
                      Information credibility remains at 2 as IED materials claim is not independently confirmed.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-purple-700">Recommended upgrade: F3 → C2</div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-stone-500 uppercase tracking-wide block">Analyst Decision</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="rating" onChange={() => setRatingChoice('accept')} className="text-blue-600" />
                    <span className="text-sm text-stone-700">Accept upgrade — rate source C2</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="rating" onChange={() => setRatingChoice('keep')} className="text-blue-600" />
                    <span className="text-sm text-stone-700">Override — keep rating at F3 pending further assessment</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-xs font-semibold text-green-800 mb-2">Report processed successfully</div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Report {formData.reference} has been processed and the following items added to case JB-CASE-2026-0047:
                </p>
                <ul className="mt-2 space-y-1 text-xs text-stone-600">
                  <li>• 1 source report filed (rating: {ratingChoice === 'accept' ? 'C2' : 'F3'})</li>
                  <li>• 2 entity references confirmed (Taghavi, District 17)</li>
                  <li>• 1 new entity flagged for follow-up (&ldquo;the commander&rdquo;)</li>
                  <li>• 3 corroborating evidence links added</li>
                </ul>
              </div>
              <div>
                <label className="text-[11px] font-medium text-stone-500 uppercase tracking-wide block mb-1">Add to Case</label>
                <select className="w-full px-3 py-2 text-sm border border-stone-200 rounded-md focus:outline-none focus:border-blue-400">
                  <option>JB-CASE-2026-0047 — Operation SPARROW (current)</option>
                  <option>JB-CASE-2026-0031 — Network ASHRAF</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-stone-600 hover:text-stone-900 transition-colors"
          >
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
            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1.5"
              >
                Continue
                <ChevronRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => { onComplete?.(); onClose(); }}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Complete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
