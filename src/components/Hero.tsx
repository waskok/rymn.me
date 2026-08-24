import { motion, type Variants } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import type { StatItem } from '../types';
import { easeOut } from '../lib/motion';

interface HeroProps {
  stats: readonly StatItem[];
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Secondary hero blocks only — never the LCP headline (opacity:0 delays Lighthouse LCP). */
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export function Hero({ stats }: HeroProps) {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-20 mx-auto flex max-w-5xl flex-col items-start px-6 pt-6 pb-14 sm:px-10 sm:pt-10 sm:pb-20"
    >
      {/* Visible from first paint for LCP; only a short slide so it doesn't look static. */}
      <motion.h1
        initial={{ y: 12 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="font-display text-balance text-4xl leading-[1.08] font-medium tracking-tight text-white sm:text-6xl md:text-7xl"
      >
        Tworzę cyfrowe produkty,
        <br />
        które{' '}
        <span className="bg-gradient-to-r from-white via-white to-white/30 bg-clip-text text-transparent">
          zapadają w pamięć.
        </span>
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-6 max-w-xl text-balance text-base leading-relaxed text-white/60 sm:text-lg"
      >
        Pracuję jako niezależny freelancer, w pełni skupiony na każdym projekcie. Poniżej zobaczysz kierunki, w których się rozwijam.
      </motion.p>

      <motion.div
        variants={item}
        className="mt-10 flex w-full flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/10 pt-8 sm:gap-x-10"
      >
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col">
            <span className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {stat.value}
            </span>
            <span className="text-xs text-white/55">{stat.label}</span>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            document.getElementById('gateways')?.scrollIntoView({ behavior: 'smooth' })
          }
          className="ml-auto flex cursor-pointer items-center gap-2 text-xs font-medium text-white/55 transition-colors hover:text-white/85"
        >
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" strokeWidth={1.75} />
          Sprawdź poniżej
        </button>
      </motion.div>
    </motion.section>
  );
}
