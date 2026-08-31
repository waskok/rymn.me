import { motion } from 'framer-motion';
import { usePerformanceMode } from '../lib/performanceMode';

/**
 * Deep-black backdrop composed of three slow-drifting glow orbs and a
 * film-grain layer. Everything here is fixed and non-interactive.
 */
export function AmbientBackground() {
  const { reduceVisualEffects } = usePerformanceMode();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void-950">
      <motion.div
        className={`absolute -top-40 -left-40 rounded-full bg-indigo-500/20 ${
          reduceVisualEffects ? 'h-[30rem] w-[30rem] blur-[88px]' : 'h-[36rem] w-[36rem] blur-[112px]'
        }`}
        animate={reduceVisualEffects ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={reduceVisualEffects ? undefined : { duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute top-1/3 -right-40 rounded-full bg-fuchsia-500/20 ${
          reduceVisualEffects ? 'h-[24rem] w-[24rem] blur-[84px]' : 'h-[30rem] w-[30rem] blur-[112px]'
        }`}
        animate={reduceVisualEffects ? undefined : { x: [0, -50, 0], y: [0, -30, 0] }}
        transition={reduceVisualEffects ? undefined : { duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute bottom-[-10rem] left-1/3 rounded-full bg-cyan-400/18 ${
          reduceVisualEffects ? 'h-[22rem] w-[22rem] blur-[90px]' : 'h-[28rem] w-[28rem] blur-[118px]'
        }`}
        animate={reduceVisualEffects ? undefined : { x: [0, 40, 0], y: [0, -30, 0] }}
        transition={reduceVisualEffects ? undefined : { duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="grain-overlay absolute inset-0 opacity-[0.035] mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void-950" />
    </div>
  );
}
