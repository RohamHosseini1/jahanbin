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
      style={{ backgroundColor: '#0d0f15', borderColor: '#2d1f4a', borderLeft: '2px solid #8B5CF6' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: '#1e1438' }}>
        <Brain size={14} style={{ color: '#8B5CF6' }} />
        <span className="text-[12px] font-medium" style={{ color: '#8B5CF6' }}>JAHAN — Automated Analysis</span>
        {isComplete && <CheckCircle size={12} style={{ color: '#10B981' }} className="ml-auto" />}
        {!isComplete && isRunning && (
          <span className="ml-auto text-[10px]" style={{ color: '#6B46C1' }}>Processing...</span>
        )}
      </div>

      {/* Output */}
      <div
        ref={containerRef}
        className="px-4 py-3 space-y-1.5 max-h-64 overflow-y-auto font-mono text-[11px]"
        style={{ color: '#94A3B8' }}
      >
        {displayedSteps.map((step, i) => (
          <div key={i} className="flex gap-2">
            <span style={{ color: '#6B46C1' }}>›</span>
            <span style={{ color: '#A78BFA' }}>{step}</span>
          </div>
        ))}
        {currentText && (
          <div className="flex gap-2">
            <span style={{ color: '#6B46C1' }}>›</span>
            <span style={{ color: '#C4B5FD' }} className="typewriter-cursor">{currentText}</span>
          </div>
        )}
        {!isRunning && !isComplete && (
          <button
            onClick={() => setIsRunning(true)}
            className="text-[11px] px-2 py-1 rounded border transition-colors hover:bg-[#1e1438]"
            style={{ color: '#8B5CF6', borderColor: '#3b076440' }}
          >
            Start analysis
          </button>
        )}
      </div>

      {/* Disclaimer */}
      {isComplete && (
        <div className="px-4 py-2 border-t flex items-center gap-1.5" style={{ borderColor: '#1e1438', backgroundColor: '#0a0c10' }}>
          <AlertCircle size={11} style={{ color: '#475569' }} />
          <span className="text-[10px]" style={{ color: '#475569' }}>
            AI-assisted analysis. Analyst review and authorization required.
          </span>
        </div>
      )}
    </div>
  );
}
