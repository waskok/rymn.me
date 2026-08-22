import type { SVGProps } from 'react';

/**
 * lucide-react intentionally ships no brand/logo glyphs (GitHub, LinkedIn, …).
 * These two hand-drawn, single-path icons match lucide's 24x24 / stroke
 * conventions so they can be dropped in anywhere an `IconComponent` is expected.
 */
export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-3.4a3.3 3.3 0 0 0-.94-2.58c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 0 0-1.5-3.75 5.07 5.07 0 0 0-.1-3.75s-1.22-.37-4 1.43a13.7 13.7 0 0 0-7.2 0C4.9.5 3.68.87 3.68.87a5.07 5.07 0 0 0-.1 3.75A5.44 5.44 0 0 0 2.08 8.4c0 5.42 3.3 6.61 6.44 7a3.3 3.3 0 0 0-.94 2.55V21" />
      <path d="M9 20c-3 1-5-1-6-2" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.5A5 5 0 0 1 16 8Z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
