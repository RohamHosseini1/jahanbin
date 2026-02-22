'use client';

import { useState, useEffect, useRef } from 'react';
import { Brain, CheckCircle, AlertCircle } from 'lucide-react';

interface JahanAIProps {
  steps: string[];
  autoStart?: boolean;
  onComplete?: () => void;
  className?: string;
}

export function JahanAI({ steps, autoStart = true, onComplete, className }: JahanAIProps) {
  const [displayedSteps, setDisplayedSteps] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isRunning, setIsRunning] = useState(autoStart);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isRunning) return;
    if (currentStepIndex >= steps.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const step = steps[currentStepIndex];
    if (charIndex < step.length) {
      const timeout = setTimeout(() => {
        setCurrentText(step.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 12);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedSteps(prev => [...prev, step]);
        setCurrentText('');
        setCharIndex(0);
        setCurrentStepIndex(currentStepIndex + 1);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isRunning, currentStepIndex, charIndex, steps, onComplete]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedSteps, currentText]);

  return (
    <div
      className={`rounded-lg border overflow-hidden ${className || ''}`}
      style={{ backgroundColor: '#F5F3FF', borderColor: '#DDD6FE', borderLeft: '2px solid #7C3AED' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: '#DDD6FE', backgroundColor: '#EDE9FE' }}>
        <Brain size={14} style={{ color: '#7C3AED' }} />
        <span className="text-[12px] font-medium" style={{ color: '#7C3AED' }}>JAHAN — Automated Analysis</span>
        {isComplete && <CheckCircle size={12} style={{ color: '#16A34A' }} className="ml-auto" />}
        {!isComplete && isRunning && (
          <span className="ml-auto text-[10px]" style={{ color: '#6D28D9' }}>Processing...</span>
        )}
      </div>

      {/* Output */}
      <div
        ref={containerRef}
        className="px-4 py-3 space-y-1.5 max-h-64 overflow-y-auto font-mono text-[11px]"
        style={{ color: '#44403C' }}
      >
        {displayedSteps.map((step, i) => (
          <div key={i} className="flex gap-2">
            <span style={{ color: '#7C3AED' }}>›</span>
            <span style={{ color: '#4C1D95' }}>{step}</span>
          </div>
        ))}
        {currentText && (
          <div className="flex gap-2">
            <span style={{ color: '#7C3AED' }}>›</span>
            <span style={{ color: '#6D28D9' }} className="typewriter-cursor">{currentText}</span>
          </div>
        )}
        {!isRunning && !isComplete && (
          <button
            onClick={() => setIsRunning(true)}
            className="text-[11px] px-2 py-1 rounded border transition-colors hover:bg-[#EDE9FE]"
            style={{ color: '#7C3AED', borderColor: '#C4B5FD' }}
          >
            Start analysis
          </button>
        )}
      </div>

      {/* Disclaimer */}
      {isComplete && (
        <div className="px-4 py-2 border-t flex items-center gap-1.5" style={{ borderColor: '#DDD6FE', backgroundColor: '#EDE9FE' }}>
          <AlertCircle size={11} style={{ color: '#78716C' }} />
          <span className="text-[10px]" style={{ color: '#78716C' }}>
            AI-assisted analysis. Analyst review and authorization required.
          </span>
        </div>
      )}
    </div>
  );
}
