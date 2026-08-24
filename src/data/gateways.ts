import { Code2, Clapperboard, Palette, Mail } from 'lucide-react';
import { GithubIcon, DiscordIcon } from '../components/icons';
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
      'Nowoczesne, responsywne strony internetowe front-end budowane w React i Tailwind CSS - od projektu po wdrożenie.',
    icon: Code2,
    url: 'https://dev.rymn.me',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    comingSoon: true,
  },
  {
    id: 'graphic',
    index: '02',
    title: 'Graphic Design',
    headline: 'Projekty, które przyciągają wzrok i budują markę.',
    description: 'Logotypy, banery i materiały graficzne pod social media i marki - projektowane w Photoshopie.',
    icon: Palette,
    url: 'https://graphic.rymn.me',
    tags: ['Photoshop', 'Logo', 'Banery'],
    comingSoon: true,
  },
  {
    id: 'video',
    index: '03',
    title: 'Montaż wideo',
    headline: 'Treści, które przyciągają uwagę od pierwszej sekundy.',
    description:
      'Dynamiczny montaż na YouTube i TikToka - krótkie, angażujące formy wideo skrojone pod social media.',
    icon: Clapperboard,
    url: 'https://video.rymn.me',
    tags: ['YouTube', 'TikTok', 'Shorts', 'Premiere Pro', 'CapCut'],
    comingSoon: true,
  },
] as const;

export const socials: readonly SocialLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/waskok', icon: GithubIcon, showLabel: true },
  {
    id: 'discord',
    label: 'rymn_',
    href: 'discord://-/users/410434333686497281',
    icon: DiscordIcon,
    showLabel: true,
  },
  { id: 'mail', label: 'kontakt.rymn@gmail.com', href: 'mailto:kontakt.rymn@gmail.com', icon: Mail, showLabel: true },
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
