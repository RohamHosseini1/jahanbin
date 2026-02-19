'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export interface TourStep {
  id: number;
  route: string;
  highlightSelector?: string;
  callout: string;
}

export const TOUR_STEPS: TourStep[] = [
  { id: 1, route: '/ct-ops', callout: 'A new intelligence report has come in. An analyst opens the case.' },
  { id: 2, route: '/ct-ops/JB-CASE-2026-0047', callout: 'JAHAN extracted all entities from the report. The analyst reviews the extraction table.' },
  { id: 3, route: '/ct-ops/JB-CASE-2026-0047', highlightSelector: '[data-tour="network-graph"]', callout: 'The network graph reveals the cell structure. Maryam Bahrami is the critical bridge node.' },
  { id: 4, route: '/ct-ops/JB-CASE-2026-0047', callout: 'The analyst runs the threat assessment workflow. JAHAN reasons step by step — the analyst reviews each judgment.' },
  { id: 5, route: '/fin-enf/subjects/JB-P-00283716', callout: 'JAHAN detected a $47.2M asset flight. The same subject, tracked independently by the financial team.' },
  { id: 6, route: '/bdr-sec', callout: 'Ansari was flagged for border watch. He tried to flee under a forged passport.' },
  { id: 7, route: '/trc-sup/TRC-INV-2019-001', callout: '87% prosecution-ready for crimes against humanity — independent of the other workstreams.' },
  { id: 8, route: '/exec-brief', callout: 'One integrated brief synthesizes all findings for decision-makers.' },
  { id: 9, route: '/oversight', callout: 'Every analyst action — and every JAHAN action — is audited. Democratic accountability is built in.' },
];

interface TourContextType {
  isActive: boolean;
  currentStep: number;
  startTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
  currentTourStep: TourStep | null;
}

const TourContext = createContext<TourContextType>({
  isActive: false,
  currentStep: 0,
  startTour: () => {},
  nextStep: () => {},
  prevStep: () => {},
  skipTour: () => {},
  currentTourStep: null,
});

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const startTour = useCallback(() => {
    setCurrentStep(1);
    setIsActive(true);
    router.push(TOUR_STEPS[0].route);
  }, [router]);

  const nextStep = useCallback(() => {
    const next = currentStep + 1;
    if (next > TOUR_STEPS.length) {
      setIsActive(false);
      return;
    }
    setCurrentStep(next);
    router.push(TOUR_STEPS[next - 1].route);
  }, [currentStep, router]);

  const prevStep = useCallback(() => {
    const prev = currentStep - 1;
    if (prev < 1) return;
    setCurrentStep(prev);
    router.push(TOUR_STEPS[prev - 1].route);
  }, [currentStep, router]);

  const skipTour = useCallback(() => {
    setIsActive(false);
  }, []);

  const currentTourStep = isActive ? TOUR_STEPS[currentStep - 1] : null;

  return (
    <TourContext.Provider value={{ isActive, currentStep, startTour, nextStep, prevStep, skipTour, currentTourStep }}>
      {children}
    </TourContext.Provider>
  );
}

export const useTour = () => useContext(TourContext);
