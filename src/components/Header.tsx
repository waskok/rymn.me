import { useState } from 'react';
import { AnimatePresence, motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Coffee, MessageSquare, Menu, X } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { useLogoClick } from '../lib/useLogoClick';
import { useSamePathScrollTop } from '../lib/useSamePathScrollTop';
import { easeOut } from '../lib/motion';

function StatusPill() {
  return (
    <div className="flex min-w-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 backdrop-blur-sm sm:gap-2 sm:px-4 sm:py-2">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="truncate text-[11px] font-medium text-white/80 sm:text-xs">
        Dostępny na nowe projekty
      </span>
    </div>
  );
}

function SupportButton({ className = '', onClick }: { className?: string; onClick?: () => void }) {
  return (
    <a
      href="https://buycoffee.to/rymn"
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={`relative isolate flex items-center gap-2 overflow-visible rounded-full border border-white/15 font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white ${className}`}
    >
      <span
        aria-hidden="true"
        className="animate-support-pulse pointer-events-none absolute inset-0 rounded-full border-2 border-white/35"
      />
      <Coffee className="relative z-10 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
      <span className="relative z-10">Wesprzyj mnie</span>
    </a>
  );
}

/**
 * Primary "book me" CTA: a solid pill with a sweeping light-shine on hover
 * and a soft idle glow, wrapped in a magnetic area for a subtle cursor pull.
 */
function ContactButton({
  className = '',
  fullWidth = false,
  onClick,
}: {
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
}) {
  const handleSamePathScroll = useSamePathScrollTop('/kontakt');

  return (
    <Magnetic strength={0.25} className={fullWidth ? 'block w-full' : 'inline-block'}>
      <Link
        to="/kontakt"
        onClick={(event) => {
          handleSamePathScroll(event);
          onClick?.();
        }}
        className={`animate-cta-glow group relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full bg-white font-semibold text-black transition-transform duration-200 hover:scale-105 ${
          fullWidth ? 'w-full justify-center' : ''
        } ${className}`}
      >
        <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-shine" />
        <MessageSquare className="relative z-10 h-3.5 w-3.5 shrink-0" strokeWidth={1.9} />
        <span className="relative z-10">Formularz kontaktowy</span>
      </Link>
    </Magnetic>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogoClick = useLogoClick();

  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 0.12]);
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 0.7]);
  const borderColor = useMotionTemplate`rgba(255, 255, 255, ${borderOpacity})`;
  const backgroundColor = useMotionTemplate`rgba(5, 5, 5, ${bgOpacity})`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOut }}
      style={{ borderBottomColor: borderColor, backgroundColor }}
      className="sticky top-0 z-50 border-b border-transparent backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-2 px-4 py-5 sm:gap-3 sm:px-10 sm:py-8">
        <Magnetic strength={0.35} className="inline-block shrink-0">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="font-display block cursor-pointer text-xl font-semibold tracking-tight text-white sm:text-2xl"
          >
            rymn<span className="text-white/40">.me</span>
          </Link>
        </Magnetic>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <StatusPill />

          <div className="hidden items-center gap-3 sm:flex">
            <SupportButton className="px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm" />

            <ContactButton className="px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm" />
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={isMenuOpen}
            className="-mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white sm:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" strokeWidth={1.75} /> : <Menu className="h-6 w-6" strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="overflow-hidden border-t border-white/10 sm:hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              <ContactButton
                fullWidth
                className="px-4 py-3 text-sm"
                onClick={() => setIsMenuOpen(false)}
              />

              <SupportButton
                className="justify-center px-4 py-3 text-sm"
                onClick={() => setIsMenuOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
