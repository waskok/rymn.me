import type { Variants } from 'framer-motion';

/** Shared cubic-bezier easing used across entrance animations for a consistent feel. */
export const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Staggered entrances for hero, legal pages, etc. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.28,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeOut },
  },
};

/** Gateway grid — one coordinated reveal, no per-card whileInView. */
export const tileContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.45,
    },
  },
};

export const tileItem: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: easeOut },
  },
};
