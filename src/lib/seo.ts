import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SITE_NAME = 'rymn.me';
export const SITE_URL = 'https://rymn.me';

export const DEFAULT_TITLE =
  'rymn.me — Profesjonalne strony internetowe, grafiki, logo i montaż wideo';

export const DEFAULT_DESCRIPTION =
  'rymn.me — twórca profesjonalnych stron internetowych, grafik, logo i montażu wideo. Indywidualna współpraca 1:1, bez agencji i pośredników.';

const PAGE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  '/kontakt': {
    title: 'Kontakt — rymn.me | Strony internetowe, grafiki, wideo',
    description:
      'Skontaktuj się z rymn.me w sprawie profesjonalnych stron internetowych, grafik, logo lub montażu wideo. Formularz kontaktowy i bezpośredni kontakt.',
  },
  '/polityka-prywatnosci': {
    title: 'Polityka prywatności — rymn.me',
    description: 'Polityka prywatności serwisu rymn.me — zasady przetwarzania danych osobowych.',
  },
  '/regulamin': {
    title: 'Regulamin — rymn.me',
    description: 'Regulamin korzystania z serwisu rymn.me.',
  },
};

function setMetaContent(selector: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = content;
}

function setCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

export function applyPageMeta(pathname: string) {
  const meta = PAGE_META[pathname] ?? PAGE_META['/'];
  const canonicalPath = pathname === '/' ? '/' : pathname;

  document.title = meta.title;
  setMetaContent('meta[name="description"]', meta.description);
  setMetaContent('meta[property="og:title"]', meta.title);
  setMetaContent('meta[property="og:description"]', meta.description);
  setMetaContent('meta[property="og:url"]', `${SITE_URL}${canonicalPath}`);
  setMetaContent('meta[name="twitter:title"]', meta.title);
  setMetaContent('meta[name="twitter:description"]', meta.description);
  setCanonical(`${SITE_URL}${canonicalPath}`);
}

export function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    applyPageMeta(pathname);
  }, [pathname]);
}
