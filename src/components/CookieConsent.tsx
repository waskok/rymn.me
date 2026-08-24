import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { useCookieConsent } from '../lib/cookieConsent';
import { easeOut } from '../lib/motion';

/** Glass bar pinned to the bottom of the viewport, letting visitors accept or reject cookies. */
export function CookieConsent() {
  const { isVisible, accept, reject } = useCookieConsent();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="flex w-full max-w-3xl flex-col gap-4 rounded-[24px] border border-white/10 bg-white/[0.06] p-5 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:flex-row sm:items-center sm:gap-6 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/70">
                <Cookie className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <p className="text-sm leading-relaxed text-white/60">
                Ta strona korzysta z plików cookies niezbędnych do jej działania. Szczegóły znajdziesz w naszej{' '}
                <Link
                  to="/polityka-prywatnosci"
                  className="text-white underline underline-offset-4 hover:text-white/70"
                >
                  Polityce prywatności
                </Link>
                .
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 sm:ml-auto">
              <button
                type="button"
                onClick={reject}
                className="flex-1 cursor-pointer rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white sm:flex-none sm:text-sm"
              >
                Odrzuć wszystkie
              </button>
              <button
                type="button"
                onClick={accept}
                className="flex-1 cursor-pointer rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-transform duration-200 hover:scale-105 sm:flex-none sm:text-sm"
              >
                Zaakceptuj wszystkie
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
