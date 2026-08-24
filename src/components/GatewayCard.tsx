import { useRef, type PointerEvent, type ReactNode, type RefObject } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import type { PortfolioGateway } from '../types';
import { easeOut } from '../lib/motion';

interface GatewayCardProps {
  gateway: PortfolioGateway;
  delay?: number;
  className?: string;
  tall?: boolean;
  /** Widens the text column — used by the full-width flagship tile. */
  wide?: boolean;
  /** Pointer tilt/glow — off in the mobile carousel so swipe stays clean. */
  tilt?: boolean;
}

const springConfig = { stiffness: 180, damping: 18, mass: 0.5 };

export function GatewayCard({
  gateway,
  delay = 0,
  className = '',
  tall = false,
  wide = false,
  tilt = true,
}: GatewayCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const comingSoon = gateway.comingSoon ?? false;

  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBackground = useMotionTemplate`radial-gradient(500px circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.10), transparent 55%)`;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!tilt) return;
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;

    rotateY.set((px - 0.5) * 10);
    rotateX.set((0.5 - py) * 10);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const Icon = gateway.icon;

  const shellClass = `group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.04] p-7 backdrop-blur-xl transition-colors duration-300 sm:p-9 ${
    comingSoon ? 'cursor-default' : 'hover:border-white/25'
  } ${tall ? 'md:min-h-[480px]' : ''} ${className}`;

  const content: ReactNode = (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glowBackground }}
      />

      <div className="relative z-10 flex items-start justify-between" style={{ transform: 'translateZ(40px)' }}>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-white transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5" strokeWidth={1.6} />
        </div>
        <div className="flex items-center gap-2">
          {comingSoon && (
            <span className="rounded-full border border-white/12 bg-white/[0.05] px-2.5 py-1 text-[10px] font-medium tracking-[0.15em] text-white/60 uppercase">
              Wkrótce
            </span>
          )}
          <span className="font-display text-xs tracking-[0.2em] text-white/50">{gateway.index}</span>
        </div>
      </div>

      <div className="relative z-10 mt-8" style={{ transform: 'translateZ(30px)' }}>
        <div className="mb-3 flex flex-wrap gap-2">
          {gateway.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/12 bg-white/[0.05] px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/65"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3
          className={`font-display font-medium text-white ${wide ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}
        >
          {gateway.title}
        </h3>

        <p className={`mt-3 text-sm leading-relaxed text-white/65 ${wide ? 'max-w-xl' : 'max-w-sm'}`}>
          {gateway.headline}
        </p>
        <p className={`mt-2 text-sm leading-relaxed text-white/55 ${wide ? 'max-w-xl' : 'max-w-sm'}`}>
          {gateway.description}
        </p>

        <div
          className={`mt-6 inline-flex items-center gap-2 text-sm font-medium ${
            comingSoon ? 'text-white/60' : 'text-white/85'
          }`}
        >
          {comingSoon ? 'Wkrótce dostępne' : 'Zobacz portfolio'}
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${
              comingSoon
                ? 'border-white/15 text-white/60'
                : 'border-white/15 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-white/40 group-hover:bg-white group-hover:text-black'
            }`}
          >
            {comingSoon ? (
              <Clock3 className="h-3.5 w-3.5" strokeWidth={2} />
            ) : (
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
            )}
          </span>
        </div>
      </div>
    </>
  );

  // Coming-soon tiles must not be <a> without href — crawlers flag them as uncrawlable links.
  if (comingSoon) {
    return (
      <motion.article
        ref={ref as RefObject<HTMLDivElement>}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: easeOut, delay }}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={shellClass}
      >
        {content}
      </motion.article>
    );
  }

  return (
    <motion.a
      ref={ref as RefObject<HTMLAnchorElement>}
      href={gateway.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: easeOut, delay }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={shellClass}
    >
      {content}
    </motion.a>
  );
}
