import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PortfolioGateway } from '../types';
import { GatewayCard } from './GatewayCard';
import { easeOut } from '../lib/motion';

interface GatewaysProps {
  gateways: readonly PortfolioGateway[];
}

export function Gateways({ gateways }: GatewaysProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const lastIndex = gateways.length - 1;

  const goTo = (next: number) => {
    if (next < 0 || next > lastIndex) return;
    setDirection(next > activeIndex ? 1 : -1);
    setActiveIndex(next);
  };

  return (
    <section id="gateways" className="relative z-20 mx-auto max-w-5xl px-6 sm:px-10">
      {/* Mobile: one card at a time, swiped via arrow controls */}
      <div className="md:hidden">
        <div className="relative overflow-hidden rounded-[28px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={gateways[activeIndex].id}
              initial={{ opacity: 0, x: direction >= 0 ? 32 : -32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -32 : 32 }}
              transition={{ duration: 0.35, ease: easeOut }}
            >
              <GatewayCard gateway={gateways[activeIndex]} tall />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Poprzedni"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors disabled:opacity-30 enabled:hover:border-white/25 enabled:hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>

          <div className="flex items-center gap-1.5">
            {gateways.map((gateway, i) => (
              <span
                key={gateway.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === lastIndex}
            aria-label="Następny"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors disabled:opacity-30 enabled:hover:border-white/25 enabled:hover:text-white"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Desktop: full grid, no carousel needed */}
      <div className="hidden gap-5 md:grid md:grid-cols-2">
        {gateways.map((gateway, i) => (
          <GatewayCard key={gateway.id} gateway={gateway} tall delay={0.1 * i} />
        ))}
      </div>
    </section>
  );
}
