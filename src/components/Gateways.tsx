import { useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PortfolioGateway } from '../types';
import { GatewayCard } from './GatewayCard';
import { easeOut, tileContainer, tileItem } from '../lib/motion';

interface GatewaysProps {
  gateways: readonly PortfolioGateway[];
}

const SWIPE_OFFSET = 56;
const SWIPE_VELOCITY = 450;

export function Gateways({ gateways }: GatewaysProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const lastIndex = gateways.length - 1;

  const goTo = (next: number) => {
    if (next < 0 || next > lastIndex) return;
    setDirection(next > activeIndex ? 1 : -1);
    setActiveIndex(next);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_OFFSET || velocity.x < -SWIPE_VELOCITY) {
      goTo(activeIndex + 1);
      return;
    }
    if (offset.x > SWIPE_OFFSET || velocity.x > SWIPE_VELOCITY) {
      goTo(activeIndex - 1);
    }
  };

  return (
    <section
      id="gateways"
      aria-labelledby="gateways-heading"
      className="relative z-20 mx-auto max-w-5xl scroll-mt-20 px-6 sm:scroll-mt-28 sm:px-10"
    >
      <h2 id="gateways-heading" className="sr-only">
        Kierunki portfolio
      </h2>

      {/* Mobile: one card at a time, arrows + finger swipe */}
      <div className="md:hidden">
        <div className="relative overflow-hidden rounded-[28px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={gateways[activeIndex].id}
              initial={{ opacity: 0, x: direction >= 0 ? 32 : -32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -32 : 32 }}
              transition={{ duration: 0.5, ease: easeOut }}
              drag="x"
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDragEnd={handleDragEnd}
              className="cursor-grab active:cursor-grabbing"
            >
              <GatewayCard gateway={gateways[activeIndex]} tall tilt={false} disableEntrance />
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

      {/* Desktop: flagship gateway spans full width, the rest sit side by side */}
      <motion.div
        className="hidden gap-5 md:grid md:grid-cols-2"
        variants={tileContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {gateways[0] && (
          <motion.div variants={tileItem} className="md:col-span-2">
            <GatewayCard key={gateways[0].id} gateway={gateways[0]} wide disableEntrance />
          </motion.div>
        )}
        {gateways.slice(1).map((gateway) => (
          <motion.div key={gateway.id} variants={tileItem}>
            <GatewayCard gateway={gateway} tall disableEntrance />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
