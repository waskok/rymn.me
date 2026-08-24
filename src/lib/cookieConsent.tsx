import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export type ConsentStatus = 'accepted' | 'rejected';

const STORAGE_KEY = 'rymn-cookie-consent';

interface CookieConsentContextValue {
  /** Last choice the visitor made, or null before any decision. */
  status: ConsentStatus | null;
  /** Whether the consent bar should currently be shown. */
  isVisible: boolean;
  accept: () => void;
  reject: () => void;
  /** Re-opens the bar so the visitor can change their mind — used by the footer button. */
  reopen: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'accepted' || stored === 'rejected') {
      setStatus(stored);
    } else {
      setIsVisible(true);
    }
  }, []);

  const persist = useCallback((next: ConsentStatus) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    setStatus(next);
    setIsVisible(false);
  }, []);

  const accept = useCallback(() => persist('accepted'), [persist]);
  const reject = useCallback(() => persist('rejected'), [persist]);
  const reopen = useCallback(() => setIsVisible(true), []);

  return (
    <CookieConsentContext.Provider value={{ status, isVisible, accept, reject, reopen }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}
