import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { easeOut } from '../lib/motion';

export function NotFound() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-start justify-center px-6 py-24 sm:px-10"
    >
      <span className="font-display text-xs tracking-[0.2em] text-white/25">404</span>
      <h1 className="font-display mt-3 text-3xl font-medium text-white sm:text-5xl">
        Strona nie istnieje
      </h1>
      <p className="mt-4 max-w-xl text-balance text-white/55">
        Adres, którego szukasz, nie prowadzi do żadnej podstrony. Sprawdź link albo wróć na stronę
        główną.
      </p>

      <Link
        to="/"
        className="mt-10 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-transform duration-200 hover:scale-105 sm:text-base"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={1.75} />
        Wróć na stronę główną
      </Link>
    </motion.section>
  );
}
