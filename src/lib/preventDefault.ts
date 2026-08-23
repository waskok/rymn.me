import type { MouseEvent } from 'react';

/** For links that aren't wired up to a real destination yet. */
export function preventDefault(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
}
