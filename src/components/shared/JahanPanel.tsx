'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface JahanAnalysisItem {
  title: string;
  body: string;
  confidence?: number;
}

interface Workflow {
  id: string;
  label: string;
}

interface JahanPanelProps {
  caseId?: string;
  moduleContext: 'ct-ops' | 'fin-enf' | 'bdr-sec' | 'trc-sup';
  recentAnalysis: JahanAnalysisItem[];
  workflows: Workflow[];
  onWorkflowLaunch?: (workflowId: string) => void;
}

export function JahanPanel({ caseId, recentAnalysis, workflows, onWorkflowLaunch }: JahanPanelProps) {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  function handleAskJahan(q: string) {
    if (!q.trim()) return;
    setIsThinking(true);
    setResponse(null);
    setTimeout(() => {
      setIsThinking(false);
      setResponse(
        `Based on available evidence for ${caseId ? `case ${caseId}` : 'this context'}, ` +
        `the intelligence indicates: "${q.toLowerCase().includes('ansari')
          ? 'Colonel Ansari appears as a cross-module subject. Financial intelligence indicates $47.2M asset flight via 4 shell entities. TRC prosecution readiness is at 87%. Biometric interdiction confirmed at Bazargan.'
          : 'Analysis of the available intelligence items suggests convergent indicators across HUMINT, SIGINT, and GEOINT sources. Confidence in primary hypothesis remains at 73%. Recommend continuing collection.'}"`
      );
    }, 1800);
  }

  return (
    <div className="flex-none h-full border-s border-stone-200 bg-stone-50 flex flex-col" style={{ width: '300px' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500" />
          <span className="text-sm font-semibold text-stone-900">JAHAN</span>
        </div>
        <span className="text-xs text-stone-400 font-mono">● live</span>
      </div>

      {/* Ask JAHAN input */}
      <div className="px-4 py-3 border-b border-stone-200">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Ask JAHAN about this case..."
          className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 text-stone-700 placeholder:text-stone-400"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAskJahan(query);
              setQuery('');
            }
          }}
        />
      </div>

      {/* JAHAN response */}
      {(isThinking || response) && (
        <div className="px-4 py-3 border-b border-stone-200">
          {isThinking ? (
            <div className="bg-purple-50 border border-purple-200 rounded-md p-3">
              <div className="flex items-center gap-2 text-xs text-purple-600">
                <span className="jahan-thinking-dot">▸</span>
                <span>Analysing...</span>
              </div>
            </div>
          ) : response ? (
            <div className="bg-purple-50 border border-purple-200 rounded-md p-3">
              <p className="text-xs text-stone-700 leading-relaxed">{response}</p>
            </div>
          ) : null}
        </div>
      )}

      {/* Recent analysis items */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        <p className="text-[10px] font-medium text-stone-400 uppercase tracking-wide">Recent Analysis</p>
        {recentAnalysis.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5 text-xs flex-shrink-0">▸</span>
              <div>
                <div className="text-xs font-medium text-stone-700">{item.title}</div>
                <div className="text-xs text-stone-500 leading-relaxed mt-0.5">{item.body}</div>
                {item.confidence !== undefined && (
                  <div className="text-[10px] font-mono text-purple-600 mt-1">Confidence: {item.confidence}%</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Workflow launchers */}
      {workflows.length > 0 && (
        <div className="px-4 py-3 border-t border-stone-200">
          <p className="text-[10px] font-medium text-stone-400 uppercase tracking-wide mb-2">Guided Workflows</p>
          <div className="space-y-1">
            {workflows.map(wf => (
              <button
                key={wf.id}
                onClick={() => onWorkflowLaunch?.(wf.id)}
                className="w-full text-start text-xs px-2 py-1.5 rounded text-blue-700 hover:bg-blue-50 transition-colors flex items-center gap-1"
              >
                <ChevronRight size={11} />
                {wf.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
