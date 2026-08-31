import { useRef, type PointerEvent, type ReactNode, type RefObject } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import type { PortfolioGateway } from '../types';
import { easeOut } from '../lib/motion';
import { usePerformanceMode } from '../lib/performanceMode';

interface GatewayCardProps {
  gateway: PortfolioGateway;
  className?: string;
  tall?: boolean;
  /** Widens the text column — used by the full-width flagship tile. */
  wide?: boolean;
  /** Pointer tilt/glow — off in the mobile carousel so swipe stays clean. */
  tilt?: boolean;
  /** Parent stagger grid handles entrance — skip whileInView on the card shell. */
  disableEntrance?: boolean;
}

const springConfig = { stiffness: 180, damping: 18, mass: 0.5 };

export function GatewayCard({
  gateway,
  className = '',
  tall = false,
  wide = false,
  tilt = true,
  disableEntrance = false,
}: GatewayCardProps) {
  const { reduceVisualEffects } = usePerformanceMode();
  const ref = useRef<HTMLElement | null>(null);
  const comingSoon = gateway.comingSoon ?? false;
  const isFeatured = gateway.featured === true && !comingSoon;
  const canTilt = tilt && !reduceVisualEffects;

  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBackground = useMotionTemplate`radial-gradient(500px circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.14), transparent 55%)`;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!canTilt) return;
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;

    rotateY.set((px - 0.5) * 6);
    rotateX.set((0.5 - py) * 6);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const Icon = gateway.icon;

  const shellClass = `group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[28px] border p-7 transition-colors duration-300 sm:p-9 ${
    reduceVisualEffects ? 'backdrop-blur-sm' : 'backdrop-blur-xl'
  } ${tall ? 'md:min-h-[480px]' : ''} ${className} ${
    isFeatured
      ? `border-white/30 bg-white/[0.07] ${
          reduceVisualEffects
            ? 'shadow-[0_0_28px_rgba(255,255,255,0.1)]'
            : 'animate-gateway-glow gateway-glow-delayed'
        }`
      : comingSoon
        ? 'cursor-default border-white/12 bg-white/[0.04]'
        : 'border-white/12 bg-white/[0.04] hover:border-white/25'
  }`;

  const tiltStyle = canTilt
    ? { rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' as const }
    : undefined;

  const entranceProps = disableEntrance
    ? {}
    : {
        initial: { opacity: 0, y: 36 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
        viewport: { once: true, amount: 0.2 } as const,
        transition: { duration: 0.95, ease: easeOut } as const,
      };

  const content: ReactNode = (
    <>
      {isFeatured && (
        <div
          aria-hidden
          className={`pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl ${
            reduceVisualEffects ? 'opacity-70' : 'opacity-90'
          }`}
        />
      )}

      {!reduceVisualEffects && (
        <motion.div
          aria-hidden
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
            isFeatured ? 'opacity-40 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
          style={{ background: glowBackground }}
        />
      )}

      <div className="relative z-10 flex items-start justify-between" style={{ transform: 'translateZ(40px)' }}>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-white transition-transform duration-300 group-hover:scale-110 ${
            isFeatured ? 'border-white/30 bg-white/10' : 'border-white/15 bg-white/[0.06]'
          }`}
        >
          <Icon className="h-5 w-5" strokeWidth={1.6} />
        </div>
        <div className="flex items-center gap-2">
          {comingSoon && (
            <span className="rounded-full border border-white/12 bg-white/[0.05] px-2.5 py-1 text-[10px] font-medium tracking-[0.15em] text-white/60 uppercase">
              Wkrótce
            </span>
          )}
          {isFeatured && (
            <a
              href={gateway.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${gateway.title} — otwórz portfolio`}
              className={`relative z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:border-white/40 hover:bg-white hover:text-black ${
                reduceVisualEffects ? '' : 'animate-arrow-nudge'
              }`}
            >
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </a>
          )}
          <span className="font-display text-xs tracking-[0.2em] text-white/50">{gateway.index}</span>
        </div>
      </div>

      <div className="relative z-10 mt-8" style={{ transform: 'translateZ(30px)' }}>
        <div className="mb-3 flex flex-wrap gap-2">
          {gateway.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-wide ${
                isFeatured
                  ? 'border-white/20 bg-white/10 text-white/80'
                  : 'border-white/12 bg-white/[0.05] text-white/65'
              }`}
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

        {isFeatured ? (
          <a
            href={gateway.url}
            target="_blank"
            rel="noreferrer"
            className={`group/cta relative isolate z-20 mt-6 inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/20 bg-white px-4 py-2.5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03] ${
              reduceVisualEffects ? '' : 'animate-cta-glow'
            }`}
          >
            {!reduceVisualEffects && (
              <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 transition-opacity duration-300 group-hover/cta:opacity-100 group-hover/cta:animate-shine" />
            )}
            <span className="relative z-10">Sprawdzam portfolio</span>
            <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/10">
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
          </a>
        ) : (
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
        )}
      </div>
    </>
  );

  const sharedProps = {
    ...entranceProps,
    style: tiltStyle,
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    className: shellClass,
  };

  if (comingSoon || isFeatured) {
    return (
      <motion.article ref={ref as RefObject<HTMLDivElement>} {...sharedProps}>
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
      aria-label={`${gateway.title} — otwórz portfolio`}
      {...sharedProps}
    >
      {content}
    </motion.a>
  );
}
