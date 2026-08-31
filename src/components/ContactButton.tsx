import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { useSamePathScrollTop } from '../lib/useSamePathScrollTop';

interface ContactButtonProps {
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  reduceVisualEffects?: boolean;
}

/** Primary CTA linking to the contact form — shared by the header and mobile footer. */
export function ContactButton({
  className = '',
  fullWidth = false,
  onClick,
  reduceVisualEffects = false,
}: ContactButtonProps) {
  const handleSamePathScroll = useSamePathScrollTop('/kontakt');

  return (
    <Magnetic strength={0.25} className={fullWidth ? 'block w-full' : 'inline-block'}>
      <Link
        to="/kontakt"
        onClick={(event) => {
          handleSamePathScroll(event);
          onClick?.();
        }}
        className={`${reduceVisualEffects ? '' : 'animate-cta-glow'} group relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full bg-white font-semibold text-black transition-transform duration-200 hover:scale-105 ${
          fullWidth ? 'w-full justify-center' : ''
        } ${className}`}
      >
        <span
          className={`pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
            reduceVisualEffects ? '' : 'group-hover:animate-shine'
          }`}
        />
        <MessageSquare className="relative z-10 h-3.5 w-3.5 shrink-0" strokeWidth={1.9} />
        <span className="relative z-10">Formularz kontaktowy</span>
      </Link>
    </Magnetic>
  );
}
