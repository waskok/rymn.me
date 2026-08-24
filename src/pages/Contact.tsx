import { useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Send } from 'lucide-react';
import { easeOut } from '../lib/motion';
import { socials } from '../data/gateways';

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialForm: ContactFormState = { name: '', email: '', phone: '', message: '' };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isNameValid = (value: string) => value.trim().length >= 4;
const isEmailValid = (value: string) => EMAIL_PATTERN.test(value.trim());
const isMessageValid = (value: string) => value.trim().length >= 5;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: easeOut } },
};

const fieldClass =
  'w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-white/25 focus:bg-white/[0.05] focus:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_12px_28px_-12px_rgba(255,255,255,0.2)] sm:text-base';

const labelClass = 'text-xs font-medium tracking-wide text-white/50';

interface ValidityHintProps {
  isValid: boolean;
  validLabel: string;
  hintLabel: string;
}

/** Small live hint under a field - swaps between a neutral tip and a success checkmark. */
function ValidityHint({ isValid, validLabel, hintLabel }: ValidityHintProps) {
  return (
    <div className="mt-1.5 flex h-4 items-center">
      <AnimatePresence mode="wait" initial={false}>
        {isValid ? (
          <motion.span
            key="valid"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-xs text-emerald-400/80"
          >
            <Check className="h-3 w-3" strokeWidth={2.25} />
            {validLabel}
          </motion.span>
        ) : (
          <motion.span
            key="hint"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-white/30"
          >
            {hintLabel}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Contact() {
  const [form, setForm] = useState<ContactFormState>(initialForm);
  const [isSent, setIsSent] = useState(false);

  const nameValid = isNameValid(form.name);
  const emailValid = isEmailValid(form.email);
  const messageValid = isMessageValid(form.message);
  const isFormValid = nameValid && emailValid && messageValid;

  const handleChange =
    (field: keyof ContactFormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setIsSent(false);
      if (field === 'phone') {
        setForm((prev) => ({ ...prev, phone: value.replace(/\D/g, '').slice(0, 9) }));
        return;
      }
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) return;
    // Backend wiring lands later — for now this only confirms the click visually.
    setIsSent(true);
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-5xl px-6 py-24 sm:px-10"
    >
      <motion.span variants={item} className="font-display text-xs tracking-[0.2em] text-white/25">
        KONTAKT
      </motion.span>
      <motion.h1 variants={item} className="font-display mt-3 text-3xl font-medium text-white sm:text-5xl">
        Masz projekt na myśli?
      </motion.h1>
      <motion.p variants={item} className="mt-4 max-w-xl text-balance text-white/50">
        Wypełnij formularz albo napisz bezpośrednio.
      </motion.p>

      <motion.div
        variants={item}
        className="relative mt-12 grid overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl sm:grid-cols-10"
      >
        <form onSubmit={handleSubmit} className="col-span-full flex flex-col gap-5 p-8 sm:col-span-7 sm:p-10">
          <div>
            <label htmlFor="contact-name" className={labelClass}>
            Imię i Nazwisko / Nazwa Firmy / Nickname
            </label>
            <input
              id="contact-name"
              type="text"
              required
              minLength={4}
              value={form.name}
              onChange={handleChange('name')}
              placeholder="Imię i Nazwisko / Nazwa Firmy / Nickname"
              className={`${fieldClass} mt-2`}
            />
            <ValidityHint isValid={nameValid} validLabel="Wygląda dobrze" hintLabel="Minimum 4 znaki" />
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClass}>
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={form.email}
              onChange={handleChange('email')}
              placeholder="twoj@email.pl"
              className={`${fieldClass} mt-2`}
            />
            <ValidityHint
              isValid={emailValid}
              validLabel="Adres wygląda poprawnie"
              hintLabel="Podaj adres, na który mogę odpowiedzieć"
            />
          </div>

          <div>
            <label htmlFor="contact-phone" className={labelClass}>
              Numer telefonu <span className="text-white/30">(opcjonalnie)</span>
            </label>
            <div className="mt-2 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-all duration-300 focus-within:border-white/25 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_12px_28px_-12px_rgba(255,255,255,0.2)]">
              <span className="flex shrink-0 items-center gap-1.5 text-white/50 select-none">
                <span className="flex h-3.5 w-5 flex-col overflow-hidden rounded-[2px] ring-1 ring-white/20">
                  <span className="h-1/2 w-full bg-white" />
                  <span className="h-1/2 w-full bg-red-600" />
                </span>
                <span className="text-sm sm:text-base">+48</span>
              </span>
              <span className="h-4 w-px shrink-0 bg-white/10" />
              <input
                id="contact-phone"
                type="tel"
                inputMode="numeric"
                maxLength={9}
                value={form.phone}
                onChange={handleChange('phone')}
                placeholder="512 345 678"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/30 outline-none sm:text-base"
              />
            </div>
            <p className="mt-1.5 text-xs text-white/30">Tylko cyfry, maksymalnie 9.</p>
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClass}>
              Treść
            </label>
            <textarea
              id="contact-message"
              required
              minLength={5}
              rows={4}
              value={form.message}
              onChange={handleChange('message')}
              placeholder="Podaj treść twojego zapytania"
              className={`${fieldClass} mt-2 resize-none`}
            />
            <ValidityHint
              isValid={messageValid}
              validLabel="Treść gotowa do wysłania"
              hintLabel="Minimum 5 znaków"
            />
          </div>

          <p className="text-xs leading-relaxed text-white/35">
            Wysyłając formularz, akceptujesz{' '}
            <Link
              to="/polityka-prywatnosci"
              className="text-white/60 underline underline-offset-4 hover:text-white"
            >
              Politykę prywatności
            </Link>{' '}
            oraz{' '}
            <Link to="/regulamin" className="text-white/60 underline underline-offset-4 hover:text-white">
              Regulamin
            </Link>
            .
          </p>

          <motion.button
            type="submit"
            disabled={!isFormValid}
            whileHover={isFormValid ? { scale: 1.03 } : undefined}
            whileTap={isFormValid ? { scale: 0.97 } : undefined}
            className={`mt-1 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors duration-300 sm:w-auto sm:px-8 ${
              isFormValid ? 'cursor-pointer bg-white text-black' : 'cursor-not-allowed bg-white/10 text-white/30'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isSent ? (
                <motion.span
                  key="sent"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <Check className="h-4 w-4" strokeWidth={2} />
                  Wysłano
                </motion.span>
              ) : (
                <motion.span
                  key="send"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <Send className="h-4 w-4" strokeWidth={1.75} />
                  Wyślij wiadomość
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>

        <div className="col-span-full flex flex-col gap-6 border-t border-white/10 bg-black/20 p-8 sm:col-span-3 sm:border-t-0 sm:border-l sm:p-10">
          <div>
            <span className="font-display text-xs tracking-[0.2em] text-white/25">SOCIALS</span>
            <p className="mt-2 text-sm text-white/45">Znajdziesz mnie też tutaj.</p>
          </div>

          <div className="flex flex-col gap-3">
            {socials.map((social) => (
              <motion.a
                key={social.id}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white/70 transition-colors hover:border-white/25 hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                  <social.icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="truncate text-sm font-medium">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
