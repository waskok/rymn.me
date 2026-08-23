import { motion } from 'framer-motion';
import { easeOut } from '../lib/motion';

/** Placeholder — full privacy policy copy will land here. */
export function PrivacyPolicy() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="mx-auto flex min-h-[50vh] max-w-5xl flex-col items-start justify-center px-6 py-24 sm:px-10"
    >
      <span className="font-display text-xs tracking-[0.2em] text-white/25">PRAWNE</span>
      <h1 className="font-display mt-3 text-3xl font-medium text-white sm:text-5xl">
        Polityka prywatności
      </h1>
      <p className="mt-4 max-w-xl text-balance text-white/50">
        Ta strona jest w budowie — pełna treść polityki prywatności pojawi się tutaj wkrótce.
      </p>
    </motion.section>
  );
}
