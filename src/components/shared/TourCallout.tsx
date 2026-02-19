'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTour, TOUR_STEPS } from '@/lib/tour-context';

export function TourCallout() {
  const { isActive, currentStep, currentTourStep, nextStep, prevStep, skipTour } = useTour();

  if (!isActive || !currentTourStep) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-white border border-stone-200 rounded-lg shadow-lg"
      style={{ borderLeftWidth: '3px', borderLeftColor: '#1D4ED8' }}>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <span className="text-[10px] font-medium text-stone-400 uppercase tracking-wide">
            Step {currentStep} of {TOUR_STEPS.length}
          </span>
          <button
            onClick={skipTour}
            className="text-stone-400 hover:text-stone-700 transition-colors -mt-1 -me-1 p-1"
          >
            <X size={13} />
          </button>
        </div>

        <p className="text-[13px] text-stone-700 leading-relaxed mb-4">
          {currentTourStep.callout}
        </p>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1 mb-3">
          {TOUR_STEPS.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                i + 1 === currentStep
                  ? 'w-4 h-1.5 bg-blue-600'
                  : i + 1 < currentStep
                    ? 'w-1.5 h-1.5 bg-blue-300'
                    : 'w-1.5 h-1.5 bg-stone-200'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-1 text-[12px] text-stone-500 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-2 py-1 rounded hover:bg-stone-100"
          >
            <ChevronLeft size={13} />
            Back
          </button>

          <button
            onClick={skipTour}
            className="text-[11px] text-stone-400 hover:text-stone-600 transition-colors"
          >
            Skip tour
          </button>

          <button
            onClick={nextStep}
            className="flex items-center gap-1 text-[12px] font-medium text-blue-700 hover:text-blue-900 transition-colors px-2 py-1 rounded hover:bg-blue-50"
          >
            {currentStep === TOUR_STEPS.length ? 'Finish' : 'Next'}
            {currentStep < TOUR_STEPS.length && <ChevronRight size={13} />}
          </button>
        </div>
      </div>
    </div>
  );
}
