import { usePerformanceMode } from '../lib/usePerformanceMode';

interface MarqueeProps {
  tags: readonly string[];
}

export function Marquee({ tags }: MarqueeProps) {
  const { reduceVisualEffects } = usePerformanceMode();
  const loop = [...tags, ...tags];

  return (
    <div className="relative z-20 mt-20 overflow-hidden border-y border-white/10 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void-950 to-transparent" />

      <div
        className={`flex w-max items-center gap-10 whitespace-nowrap ${
          reduceVisualEffects ? '' : 'animate-marquee'
        }`}
      >
        {loop.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="font-display flex items-center gap-10 text-sm tracking-[0.25em] text-white/50"
          >
            {tag}
            <span className="h-1 w-1 rounded-full bg-white/40" />
          </span>
        ))}
      </div>
    </div>
  );
}
