'use client';

import { useState, useEffect } from 'react';

interface ThinkingStep {
  text: string;
  status: 'pending' | 'running' | 'complete';
  substeps?: string[];
}

interface JahanThinkingStateProps {
  steps: ThinkingStep[];
  onComplete?: () => void;
  speed?: number;
}

export function JahanThinkingState({ steps, onComplete, speed = 800 }: JahanThinkingStateProps) {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setVisibleSteps(0);
    setDone(false);
    const timer = setInterval(() => {
      setVisibleSteps(prev => {
        const next = prev + 1;
        if (next >= steps.length) {
          clearInterval(timer);
          setDone(true);
          setTimeout(() => onComplete?.(), 400);
        }
        return next;
      });
    }, speed);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length, speed]);

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 font-mono text-xs space-y-2">
      {steps.slice(0, visibleSteps + 1).map((step, i) => (
        <div key={i} className="space-y-1">
          <div className="flex items-start gap-2">
            <span className={`mt-0.5 flex-shrink-0 ${i < visibleSteps ? 'text-green-600' : 'text-purple-500'}`}>
              {i < visibleSteps ? '✓' : '▸'}
            </span>
            <span className={i < visibleSteps ? 'text-stone-700' : 'text-purple-700 font-medium'}>
              {step.text}
            </span>
          </div>
          {step.substeps && i < visibleSteps && step.substeps.map((sub, j) => (
            <div key={j} className="flex items-start gap-2 ms-4">
              <span className="text-stone-400 flex-shrink-0">·</span>
              <span className="text-stone-600 text-[11px]">{sub}</span>
            </div>
          ))}
        </div>
      ))}
      {!done && visibleSteps < steps.length && (
        <div className="flex items-center gap-2 text-purple-400">
          <span className="jahan-thinking-dot">▸</span>
          <span>Processing...</span>
        </div>
      )}
    </div>
  );
}
