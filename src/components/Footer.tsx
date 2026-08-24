import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { SocialLink } from '../types';
import { Magnetic } from './Magnetic';
import { useLogoClick } from '../lib/useLogoClick';
import { useCookieConsent } from '../lib/cookieConsent';

interface FooterProps {
  socials: readonly SocialLink[];
}

export function Footer({ socials }: FooterProps) {
  const year = new Date().getFullYear();
  const handleLogoClick = useLogoClick();
  const { reopen } = useCookieConsent();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left sm:px-10"
    >
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/30">© {year}</span>
        <Link
          to="/"
          onClick={handleLogoClick}
          className="font-display cursor-pointer text-sm font-semibold tracking-tight text-white transition-opacity duration-200 hover:opacity-70"
        >
          rymn<span className="text-white/40">.me</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/regulamin"
          className="group relative text-xs text-white/30 transition-colors hover:text-white/60"
        >
          Regulamin
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white/50 transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </Link>

        <Link
          to="/polityka-prywatnosci"
          className="group relative text-xs text-white/30 transition-colors hover:text-white/60"
        >
          Polityka prywatności
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white/50 transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </Link>

        <button
          type="button"
          onClick={reopen}
          className="group relative cursor-pointer text-xs text-white/30 transition-colors hover:text-white/60"
        >
          Zgoda cookies
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white/50 transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {socials.map((social) => (
          <Magnetic key={social.id} strength={0.5}>
            <a
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
              aria-label={social.label}
              className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-white/50 transition-colors hover:border-white/20 hover:text-white"
            >
              <social.icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
              <span className="text-xs font-medium">{social.label}</span>
            </a>
          </Magnetic>
        ))}
      </div>
    </motion.footer>
  );
}
