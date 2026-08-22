import type { MouseEvent } from 'react';

/** Smoothly scrolls back to the top of the page; used by both logo instances. */
export function scrollToTop(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
