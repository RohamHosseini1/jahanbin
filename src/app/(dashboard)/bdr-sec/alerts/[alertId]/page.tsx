'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AlertDetailPage({ params }: { params: Promise<{ alertId: string }> }) {
  const { alertId } = use(params);

  const isAnsariAlert = alertId === 'BDR-2026-0038-A';

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/bdr-sec" className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-900 transition-colors">
          <ArrowLeft size={13} />
          Alert Queue
        </Link>
        <span className="text-stone-300">/</span>
        <span className="text-sm font-mono text-stone-700">{alertId}</span>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[18px] font-semibold text-stone-900">Subject Assessment — {alertId}</h1>
          <p className="text-sm text-stone-500 mt-0.5">Bazargan Border Crossing · {isAnsariAlert ? '09:47, 19 Feb 2026' : 'Today'}</p>
        </div>
        {isAnsariAlert && (
          <div className="px-3 py-1.5 bg-red-700 text-white text-xs font-semibold rounded-md uppercase tracking-wide">
            ██ INTERDICTED ██
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* LEFT — Biometric & Document Verification */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-stone-900">Biometric & Document Verification</h2>

          <div className="p-4 border border-stone-200 rounded-lg bg-white">
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-3">Subject traveling as</div>
            <div className="text-base font-semibold text-stone-900">{isAnsariAlert ? 'Kamyar Shirazi' : '[Unknown subject]'}</div>
          </div>

          {isAnsariAlert && (
            <>
              <div className="p-4 border border-stone-200 rounded-lg bg-white">
                <div className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-3">Biometric Analysis</div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Match target</span>
                    <span className="font-medium text-stone-900">Colonel Davoud Ansari</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">JB ID</span>
                    <span className="font-mono text-blue-700">JB-P-00283716</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Confidence</span>
                    <span className="font-semibold text-green-700 text-sm">94.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Method</span>
                    <span className="text-stone-700">Facial recognition — 3-point</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Admiralty</span>
                    <span className="font-mono font-semibold text-green-700">A1</span>
                  </div>
                </div>

                {/* Photo comparison placeholder */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-stone-100 rounded-md p-4 text-center">
                    <div className="text-stone-400 text-[10px] uppercase tracking-wide mb-2">Travel document</div>
                    <div className="w-16 h-20 bg-stone-200 rounded mx-auto flex items-center justify-center">
                      <span className="text-stone-400 text-xs">Photo</span>
                    </div>
                  </div>
                  <div className="bg-stone-100 rounded-md p-4 text-center">
                    <div className="text-stone-400 text-[10px] uppercase tracking-wide mb-2">Reference file</div>
                    <div className="w-16 h-20 bg-stone-200 rounded mx-auto flex items-center justify-center">
                      <span className="text-stone-400 text-xs">Photo</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  {['Forehead', 'Nose bridge', 'Jaw'].map((point, i) => (
                    <div key={i} className="flex items-center gap-1 text-[10px] text-green-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border border-stone-200 rounded-lg bg-white">
                <div className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-3">Document Forensics</div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Passport number</span>
                    <span className="font-mono text-stone-700">IR-2024-8847392</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Issued</span>
                    <span className="text-stone-700">2024-11-03</span>
                  </div>
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-800">
                    <div className="font-semibold mb-1">FRAUDULENT</div>
                    <div className="text-[11px]">Ink composition inconsistency; microprint mismatch p.7</div>
                    <div className="text-[10px] font-mono mt-1">Admiralty: A1</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* RIGHT — Cross-Module Intelligence */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-stone-900">Cross-Module Intelligence</h2>

          {isAnsariAlert ? (
            <>
              <div className="p-4 border border-stone-200 rounded-lg bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono font-medium text-red-700 bg-red-50 px-1.5 py-0.5 rounded">CT-OPS</span>
                  <span className="text-xs font-medium text-stone-700">Named associate — Operation SPARROW</span>
                </div>
                <p className="text-xs text-stone-600">&ldquo;Financial link to Taghavi cell — confirmed Day 12&rdquo;</p>
                <Link href="/ct-ops/JB-CASE-2026-0047" className="text-xs text-blue-700 hover:underline mt-2 block">View case →</Link>
              </div>

              <div className="p-4 border border-stone-200 rounded-lg bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono font-medium text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">FIN-ENF</span>
                  <span className="text-xs font-medium text-stone-700">Under investigation</span>
                </div>
                <p className="text-xs text-stone-600">&ldquo;$23.4M identified across 4 jurisdictions — asset flight alert active&rdquo;</p>
                <Link href="/fin-enf/subjects/JB-P-00283716" className="text-xs text-blue-700 hover:underline mt-2 block">View financial profile →</Link>
              </div>

              <div className="p-4 border border-stone-200 rounded-lg bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">TRC-SUP</span>
                  <span className="text-xs font-medium text-stone-700">Prosecution ready (87%)</span>
                </div>
                <p className="text-xs text-stone-600">&ldquo;89 deaths attributed — Bloody November 2019 — 3 SNSC directives&rdquo;</p>
                <Link href="/trc-sup/TRC-INV-2019-001" className="text-xs text-blue-700 hover:underline mt-2 block">View accountability record →</Link>
              </div>

              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="text-xs font-semibold text-red-800 mb-1">Overall threat assessment</div>
                <div className="text-lg font-bold text-red-800">CRITICAL</div>
              </div>

              <div className="p-4 border border-stone-200 rounded-lg bg-stone-50 text-xs text-stone-600 space-y-1">
                <div className="font-medium text-stone-700">Notifications sent:</div>
                <div className="flex items-center gap-4">
                  <span className="text-green-700">CT-OPS ✓</span>
                  <span className="text-green-700">FIN-ENF ✓</span>
                  <span className="text-green-700">TRC-SUP ✓</span>
                </div>
              </div>
            </>
          ) : (
            <div className="p-4 border border-stone-200 rounded-lg bg-stone-50 text-xs text-stone-500">
              Subject not yet identified. Awaiting biometric verification.
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Generate subject assessment report
        </button>
        <Link
          href="/entity/JB-P-00283716"
          className="px-4 py-2 text-sm border border-stone-200 rounded-md text-stone-700 hover:bg-stone-50 transition-colors"
        >
          Open full entity profile
        </Link>
      </div>
    </div>
  );
}
