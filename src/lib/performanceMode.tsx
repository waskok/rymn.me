import {

  createContext,

  useCallback,

  useContext,

  useEffect,

  useMemo,

  useState,

  type ReactNode,

} from 'react';



const STORAGE_KEY = 'rymn-low-spec-mode';

const RUNTIME_SAMPLE_MS = 2500;

const SLOW_FRAME_MS = 50;

const SLOW_FRAME_RATIO = 0.35;



interface PerformanceModeContextValue {

  prefersReducedMotion: boolean;

  lowSpecMode: boolean;

  reduceVisualEffects: boolean;

  toggleLowSpecMode: () => void;

}



const PerformanceModeContext = createContext<PerformanceModeContextValue | null>(null);



function getInitialMotionPreference() {

  if (typeof window === 'undefined') return false;

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;

}



function readStoredLowSpecMode(): boolean | null {

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (stored === 'true') return true;

  if (stored === 'false') return false;

  return null;

}



function getInitialLowSpecMode() {

  if (typeof window === 'undefined') return false;

  return readStoredLowSpecMode() ?? false;

}



function observePoorRuntimePerformance(onPoorPerformance: () => void) {

  let rafId = 0;

  let lastTime = performance.now();

  let frameCount = 0;

  let slowFrames = 0;

  const startTime = lastTime;



  const tick = (now: number) => {

    const delta = now - lastTime;

    lastTime = now;

    frameCount += 1;

    if (delta > SLOW_FRAME_MS) slowFrames += 1;



    if (now - startTime < RUNTIME_SAMPLE_MS) {

      rafId = requestAnimationFrame(tick);

      return;

    }



    if (frameCount > 0 && slowFrames / frameCount >= SLOW_FRAME_RATIO) {

      onPoorPerformance();

    }

  };



  rafId = requestAnimationFrame(tick);



  return () => cancelAnimationFrame(rafId);

}



export function PerformanceModeProvider({ children }: { children: ReactNode }) {

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialMotionPreference);

  const [lowSpecMode, setLowSpecMode] = useState(getInitialLowSpecMode);



  useEffect(() => {

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMotionPreference = () => setPrefersReducedMotion(media.matches);



    media.addEventListener('change', updateMotionPreference);



    return () => {

      media.removeEventListener('change', updateMotionPreference);

    };

  }, []);



  useEffect(() => {

    if (readStoredLowSpecMode() !== null) return;



    return observePoorRuntimePerformance(() => {

      setLowSpecMode(true);

      window.localStorage.setItem(STORAGE_KEY, 'true');

    });

  }, []);



  const toggleLowSpecMode = useCallback(() => {

    setLowSpecMode((current) => {

      const next = !current;

      window.localStorage.setItem(STORAGE_KEY, String(next));

      return next;

    });

  }, []);



  const value = useMemo(

    () => ({

      prefersReducedMotion,

      lowSpecMode,

      reduceVisualEffects: lowSpecMode || prefersReducedMotion,

      toggleLowSpecMode,

    }),

    [prefersReducedMotion, lowSpecMode, toggleLowSpecMode],

  );



  return (

    <PerformanceModeContext.Provider value={value}>{children}</PerformanceModeContext.Provider>

  );

}



export function usePerformanceMode() {

  const context = useContext(PerformanceModeContext);

  if (!context) {

    throw new Error('usePerformanceMode must be used within PerformanceModeProvider');

  }

  return context;

}


