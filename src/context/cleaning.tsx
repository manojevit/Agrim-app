import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CleanState, initialCleanStates } from '@/data/cleaning';

function nowTime() {
  return new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
}

interface CleaningApi {
  get: (serial: string) => CleanState;
  sendCleaner: (serial: string, cleanerName: string, mode: 'auto' | 'manual', before?: { odour: number; aqi: number }) => void;
  markCleaned: (serial: string) => void;
}

const CleaningContext = createContext<CleaningApi>({ get: () => ({ stage: 'idle' }), sendCleaner: () => {}, markCleaned: () => {} });

export function CleaningProvider({ children }: { children: React.ReactNode }) {
  const [states, setStates] = useState<Record<string, CleanState>>(() => initialCleanStates());

  const get = useCallback((serial: string): CleanState => states[serial] ?? { stage: 'idle' }, [states]);

  const sendCleaner = useCallback((serial: string, cleanerName: string, mode: 'auto' | 'manual', before?: { odour: number; aqi: number }) => {
    setStates((s) => ({
      ...s,
      [serial]: { ...s[serial], stage: 'enroute', mode, cleanerName, calledAt: nowTime(), result: 'answered', before: s[serial]?.before ?? before },
    }));
  }, []);

  const markCleaned = useCallback((serial: string) => {
    setStates((s) => {
      const prev = s[serial] ?? { stage: 'idle' as const };
      const before = prev.before ?? { odour: 4, aqi: 480 };
      // After a clean the air settles right down.
      const after = { odour: 1, aqi: Math.min(before.aqi, 120) };
      return { ...s, [serial]: { ...prev, stage: 'cleaned', cleanedAt: nowTime(), before, after } };
    });
  }, []);

  const api = useMemo(() => ({ get, sendCleaner, markCleaned }), [get, sendCleaner, markCleaned]);
  return <CleaningContext.Provider value={api}>{children}</CleaningContext.Provider>;
}

export function useCleaning() {
  return useContext(CleaningContext);
}
