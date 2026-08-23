import { motion } from 'framer-motion';
import { easeOut } from '../lib/motion';

/** Placeholder — the contact form/details will land here. */
export function Contact() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="mx-auto flex min-h-[50vh] max-w-5xl flex-col items-start justify-center px-6 py-24 sm:px-10"
    >
      <span className="font-display text-xs tracking-[0.2em] text-white/25">KONTAKT</span>
      <h1 className="font-display mt-3 text-3xl font-medium text-white sm:text-5xl">
        Ta strona jest w budowie.
      </h1>
      <p className="mt-4 max-w-xl text-balance text-white/50">
        Wkrótce pojawi się tu formularz kontaktowy. W międzyczasie napisz do mnie bezpośrednio —
        linki znajdziesz w stopce.
      </p>
    </motion.section>
  );
}
