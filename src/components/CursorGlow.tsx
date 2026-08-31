import { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { usePerformanceMode } from '../lib/usePerformanceMode';

/**
 * A soft radial spotlight that trails the cursor across the entire viewport.
 * Purely decorative and disabled for touch-only devices via the CSS pointer
 * media query below (it simply never receives pointer move events there).
 */
export function CursorGlow() {
  const { reduceVisualEffects } = usePerformanceMode();
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const x = useSpring(mouseX, { stiffness: 56, damping: 18, mass: 0.6 });
  const y = useSpring(mouseY, { stiffness: 56, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduceVisualEffects) return;

    let rafId = 0;
    const handleMove = (event: globalThis.MouseEvent) => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        mouseX.set(event.clientX);
        mouseY.set(event.clientY);
        rafId = 0;
      });
    };

    window.addEventListener('pointermove', handleMove);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY, reduceVisualEffects]);

  const background = useMotionTemplate`radial-gradient(760px circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 72%)`;

  if (reduceVisualEffects) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      style={{ background }}
    />
  );
}
