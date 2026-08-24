import { useCallback, type MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * For nav links that point at a fixed route: if the visitor is already there,
 * smoothly scroll to top instead of doing nothing (a no-op route change).
 * Otherwise falls through to the default `Link` navigation.
 */
export function useSamePathScrollTop(path: string) {
  const location = useLocation();

  return useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (location.pathname === path) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [location.pathname, path],
  );
}
