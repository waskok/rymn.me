import { motion } from 'framer-motion';
import type { SocialLink } from '../types';
import { Magnetic } from './Magnetic';
import { scrollToTop } from '../lib/scrollToTop';

interface FooterProps {
  socials: readonly SocialLink[];
}

export function Footer({ socials }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative z-20 mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left"
    >
      <a
        href="#top"
        onClick={scrollToTop}
        className="font-display cursor-pointer text-sm font-semibold tracking-tight text-white transition-opacity duration-200 hover:opacity-70"
      >
        rymn<span className="text-white/40">.me</span>
      </a>

      <p className="text-xs text-white/30">© {year} — Wszelkie prawa zastrzeżone.</p>

      <div className="flex items-center gap-1">
        {socials.map((social) => (
          <Magnetic key={social.id} strength={0.5}>
            <a
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
              aria-label={social.label}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:text-white"
            >
              <social.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
          </Magnetic>
        ))}
      </div>

      <p className="text-xs text-white/30">Zaprojektowane i zbudowane w Polsce.</p>
    </motion.footer>
  );
}
