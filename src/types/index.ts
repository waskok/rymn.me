import type { ComponentType, SVGProps } from 'react';

/** Shape shared by every icon we render, whether from lucide-react or hand-drawn. */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** A single portfolio gateway visitors can open from the home page. */
export interface PortfolioGateway {
  id: string;
  index: string;
  title: string;
  headline: string;
  description: string;
  icon: IconComponent;
  url: string;
  tags: readonly string[];
  /** True while the dedicated portfolio isn't live yet — disables navigation and shows a "soon" state. */
  comingSoon?: boolean;
  /** Live gateway with extra visual emphasis — glow, animated CTA, corner arrow. */
  featured?: boolean;
}

/** A social / contact link rendered in the header and footer. */
export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: IconComponent;
  /** When true, renders the label text next to the icon (e.g. "GitHub"). */
  showLabel?: boolean;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}
