import { useEffect, useState } from 'react';

interface PerformanceMode {
  prefersReducedMotion: boolean;
  isLowPerformanceDevice: boolean;
  reduceVisualEffects: boolean;
}

function getInitialMotionPreference() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function detectLowPerformanceDevice() {
  if (typeof navigator === 'undefined') return false;

  const hardwareThreads = navigator.hardwareConcurrency ?? 8;
  const navWithMemory = navigator as Navigator & { deviceMemory?: number };
  const memoryGb = navWithMemory.deviceMemory ?? 8;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  return hardwareThreads <= 4 || memoryGb <= 4 || isCoarsePointer;
}

/**
 * Adapts decorative effects to weaker devices while preserving premium visuals
 * on machines that can comfortably render them.
 */
export function usePerformanceMode(): PerformanceMode {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialMotionPreference);
  const [isLowPerformanceDevice, setIsLowPerformanceDevice] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(media.matches);
    const updateDevicePerf = () => setIsLowPerformanceDevice(detectLowPerformanceDevice());

    updateMotionPreference();
    updateDevicePerf();

    media.addEventListener('change', updateMotionPreference);
    window.addEventListener('resize', updateDevicePerf);

    return () => {
      media.removeEventListener('change', updateMotionPreference);
      window.removeEventListener('resize', updateDevicePerf);
    };
  }, []);

  return {
    prefersReducedMotion,
    isLowPerformanceDevice,
    reduceVisualEffects: prefersReducedMotion || isLowPerformanceDevice,
  };
}
