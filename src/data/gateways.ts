import { Code2, Clapperboard, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/icons';
import type { PortfolioGateway, SocialLink, StatItem } from '../types';

/**
 * Central routing table for the hub. Each entry will eventually redirect to
 * a dedicated, fully-fledged portfolio living on its own subdomain. Until
 * those are live, `comingSoon` disables navigation and `url` is a placeholder.
 */
export const gateways: readonly PortfolioGateway[] = [
  {
    id: 'web',
    index: '01',
    title: 'Web Development',
    headline: 'Strony, które ładują się szybko i wyglądają świetnie.',
    description:
      'Nowoczesne, responsywne strony internetowe front-end budowane w React i Tailwind CSS — od projektu po wdrożenie.',
    icon: Code2,
    url: 'https://dev.rymn.me',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    comingSoon: true,
  },
  {
    id: 'video',
    index: '02',
    title: 'Montaż wideo',
    headline: 'Treści, które przyciągają uwagę od pierwszej sekundy.',
    description:
      'Dynamiczny montaż na YouTube i Shorts — krótkie, angażujące formy wideo skrojone pod social media.',
    icon: Clapperboard,
    url: 'https://video.rymn.me',
    tags: ['YouTube', 'Shorts', 'Social Media'],
    comingSoon: true,
  },
] as const;

export const socials: readonly SocialLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/waskok', icon: GithubIcon },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/rymn', icon: LinkedinIcon },
  { id: 'mail', label: 'E-mail', href: 'mailto:kontakt.rymn@gmail.com', icon: Mail },
] as const;

export const stats: readonly StatItem[] = [
  { id: 'lighthouse', value: '100/100', label: 'Wynik Google Lighthouse' },
  { id: 'freelancer', value: 'Freelancer', label: 'Bez agencji i pośredników' },
  { id: 'exclusive', value: '1:1', label: 'Praca na wyłączność' },
] as const;

export const marqueeTags: readonly string[] = [
  'REACT',
  'TYPESCRIPT',
  'NODE.JS',
  'TAILWIND CSS',
  'WEB DESIGNER',
  'UI/UX',
  'YOUTUBE',
  'SHORTS',
  'MONTAŻ WIDEO',
] as const;
