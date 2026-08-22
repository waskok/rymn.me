import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import type { SocialLink } from '../types';
import { Magnetic } from './Magnetic';
import { scrollToTop } from '../lib/scrollToTop';
import { easeOut } from '../lib/motion';

interface HeaderProps {
  socials: readonly SocialLink[];
}

export function Header({ socials }: HeaderProps) {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 0.12]);
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 0.7]);
  const borderColor = useMotionTemplate`rgba(255, 255, 255, ${borderOpacity})`;
  const backgroundColor = useMotionTemplate`rgba(5, 5, 5, ${bgOpacity})`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: easeOut }}
      style={{ borderBottomColor: borderColor, backgroundColor }}
      className="sticky top-0 z-50 flex items-center justify-between border-b border-transparent px-6 py-6 backdrop-blur-xl sm:px-10 sm:py-8"
    >
      <a
        href="#top"
        onClick={scrollToTop}
        className="font-display cursor-pointer text-lg font-semibold tracking-tight text-white transition-opacity duration-200 hover:opacity-70"
      >
        rymn<span className="text-white/40">.me</span>
      </a>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-sm sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-medium text-white/70">Dostępny na nowe projekty</span>
        </div>

        <nav className="flex items-center gap-1">
          {socials.map((social) => (
            <Magnetic key={social.id} strength={0.5}>
              <a
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white"
              >
                <social.icon className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </Magnetic>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
