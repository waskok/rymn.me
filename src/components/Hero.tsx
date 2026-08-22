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
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: easeOut },
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
      <motion.h1
        variants={item}
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
        className="mt-6 max-w-xl text-balance text-base leading-relaxed text-white/50 sm:text-lg"
      >
        Pracuję jako niezależny freelancer, w pełni skupiony na jednym
        projekcie na raz. Poniżej zobaczysz kierunki, w których się rozwijam.
      </motion.p>

      <motion.div
        variants={item}
        className="mt-10 flex w-full flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/10 pt-8"
      >
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col">
            <span className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {stat.value}
            </span>
            <span className="text-xs text-white/40">{stat.label}</span>
          </div>
        ))}
        <div className="ml-auto hidden items-center gap-2 text-xs text-white/30 sm:flex">
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" strokeWidth={1.75} />
          Sprawdź poniżej
        </div>
      </motion.div>
    </motion.section>
  );
}
