import { useRef, type MouseEvent, type PointerEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import type { PortfolioGateway } from '../types';
import { easeOut } from '../lib/motion';

interface GatewayCardProps {
  gateway: PortfolioGateway;
  delay?: number;
  className?: string;
  tall?: boolean;
  /** Pointer tilt/glow — off in the mobile carousel so swipe stays clean. */
  tilt?: boolean;
}

const springConfig = { stiffness: 180, damping: 18, mass: 0.5 };

export function GatewayCard({ gateway, delay = 0, className = '', tall = false, tilt = true }: GatewayCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const comingSoon = gateway.comingSoon ?? false;

  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBackground = useMotionTemplate`radial-gradient(500px circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.10), transparent 55%)`;

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
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

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (comingSoon) event.preventDefault();
  };

  const Icon = gateway.icon;

  return (
    <motion.a
      ref={ref}
      href={comingSoon ? undefined : gateway.url}
      aria-disabled={comingSoon}
      tabIndex={comingSoon ? -1 : 0}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: easeOut, delay }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] p-7 backdrop-blur-xl transition-colors duration-300 sm:p-9 ${
        comingSoon ? 'cursor-default' : 'hover:border-white/25'
      } ${tall ? 'md:min-h-[480px]' : ''} ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glowBackground }}
      />

      <div className="relative z-10 flex items-start justify-between" style={{ transform: 'translateZ(40px)' }}>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5" strokeWidth={1.6} />
        </div>
        <div className="flex items-center gap-2">
          {comingSoon && (
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium tracking-[0.15em] text-white/40 uppercase">
              Wkrótce
            </span>
          )}
          <span className="font-display text-xs tracking-[0.2em] text-white/25">{gateway.index}</span>
        </div>
      </div>

      <div className="relative z-10 mt-8" style={{ transform: 'translateZ(30px)' }}>
        <div className="mb-3 flex flex-wrap gap-2">
          {gateway.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/45"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-xl font-medium text-white sm:text-2xl">{gateway.title}</h3>

        {tall && (
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/45">{gateway.headline}</p>
        )}
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/35">{gateway.description}</p>

        <div
          className={`mt-6 inline-flex items-center gap-2 text-sm font-medium ${
            comingSoon ? 'text-white/40' : 'text-white/70'
          }`}
        >
          {comingSoon ? 'Wkrótce dostępne' : 'Zobacz portfolio'}
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${
              comingSoon
                ? 'border-white/10 text-white/40'
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
    </motion.a>
  );
}
