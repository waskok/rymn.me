import { useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertCircle, Check, Loader2, Send } from 'lucide-react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { easeOut } from '../lib/motion';
import { socials } from '../data/gateways';

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/** Fields that carry a hard requirement and therefore get red/white live validation. */
type RequiredField = 'name' | 'email' | 'message';

const initialForm: ContactFormState = { name: '', email: '', phone: '', message: '' };
const initialTouched: Record<RequiredField, boolean> = { name: false, email: false, message: false };

const CONTACT_API = '/api/contact';

interface ContactApiResponse {
  success: boolean;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isNameValid = (value: string) => value.trim().length >= 4;
const isEmailValid = (value: string) => EMAIL_PATTERN.test(value.trim());
const isMessageValid = (value: string) => value.trim().length >= 5;
const isPhoneValid = (value: string) => value.length === 9;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

const baseFieldClass =
  'box-border min-w-0 w-full max-w-full rounded-2xl border bg-white/[0.03] px-3.5 py-3 text-base text-white placeholder:text-white/30 outline-none transition-all duration-300 sm:px-4';

/** Neutral until the field is touched, then red while invalid and bright white once accepted. */
function fieldStateClass(isTouched: boolean, isValid: boolean) {
  if (!isTouched) {
    return 'border-white/10 focus:border-white/25 focus:bg-white/[0.05] focus:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_12px_28px_-12px_rgba(255,255,255,0.2)]';
  }
  if (isValid) {
    return 'border-white/50 bg-white/[0.05] focus:border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_12px_28px_-12px_rgba(255,255,255,0.3)]';
  }
  return 'border-red-500/70 bg-red-500/[0.05] focus:border-red-500/80 shadow-[0_0_0_1px_rgba(239,68,68,0.25),0_12px_28px_-12px_rgba(239,68,68,0.35)]';
}

const labelClass = 'text-xs font-medium tracking-wide text-white/50';

interface ValidityHintProps {
  isTouched: boolean;
  isValid: boolean;
  validLabel: string;
  hintLabel: string;
}

/** Small live hint under a field - neutral tip, then red warning or white checkmark once touched. */
function ValidityHint({ isTouched, isValid, validLabel, hintLabel }: ValidityHintProps) {
  const state: 'neutral' | 'invalid' | 'valid' = !isTouched ? 'neutral' : isValid ? 'valid' : 'invalid';

  return (
    <div className="mt-1.5 flex h-4 items-center">
      <AnimatePresence mode="wait" initial={false}>
        {state === 'valid' && (
          <motion.span
            key="valid"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-xs text-white"
          >
            <Check className="h-3 w-3" strokeWidth={2.25} />
            {validLabel}
          </motion.span>
        )}
        {state === 'invalid' && (
          <motion.span
            key="invalid"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-xs text-red-400"
          >
            <AlertCircle className="h-3 w-3" strokeWidth={2.25} />
            {hintLabel}
          </motion.span>
        )}
        {state === 'neutral' && (
          <motion.span
            key="neutral"
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
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [form, setForm] = useState<ContactFormState>(initialForm);
  const [touched, setTouched] = useState<Record<RequiredField, boolean>>(initialTouched);
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [showRequiredError, setShowRequiredError] = useState(false);
  const [shake, setShake] = useState(false);

  const nameValid = isNameValid(form.name);
  const emailValid = isEmailValid(form.email);
  const messageValid = isMessageValid(form.message);
  const phoneValid = isPhoneValid(form.phone);
  const phoneStarted = form.phone.length > 0;
  const isFormValid = nameValid && emailValid && messageValid;

  const handleChange =
    (field: keyof ContactFormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setIsSent(false);
      setSubmitError(false);
      if (field === 'phone') {
        setForm((prev) => ({ ...prev, phone: value.replace(/\D/g, '').slice(0, 9) }));
        return;
      }
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleFocus =
    (field: RequiredField) => (_event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!isFormValid) {
      setTouched({ name: true, email: true, message: true });
      setShowRequiredError(true);
      setShake(true);
      window.setTimeout(() => setShake(false), 500);
      return;
    }

    setShowRequiredError(false);
    setSubmitError(false);
    setTurnstileError(false);

    // Honeypot caught something — pretend it worked so the bot has no reason to adapt,
    // but never actually hit the API or spend our monthly submission quota.
    if (honeypot) {
      setIsSent(true);
      return;
    }

    if (!turnstileToken) {
      setTurnstileError(true);
      setShake(true);
      window.setTimeout(() => setShake(false), 500);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          turnstileToken,
        }),
      });

      const data = (await response.json()) as ContactApiResponse;

      if (data.success) {
        setIsSent(true);
        setForm(initialForm);
        setTouched(initialTouched);
        setTurnstileToken(null);
        turnstileRef.current?.reset();
      } else {
        setSubmitError(true);
        turnstileRef.current?.reset();
        setTurnstileToken(null);
      }
    } catch {
      setSubmitError(true);
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto w-full min-w-0 max-w-5xl px-4 py-16 sm:px-6 sm:py-24 md:px-10"
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
        className="relative mt-8 grid w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl sm:mt-12 sm:rounded-[32px] sm:grid-cols-10"
      >
        <form
          noValidate
          onSubmit={handleSubmit}
          className="col-span-full flex min-w-0 w-full flex-col gap-4 p-4 sm:col-span-7 sm:gap-5 sm:p-8 md:p-10"
        >
          {/* Honeypot: invisible to real visitors, irresistible to form-filling bots. */}
          <div style={{ position: 'absolute', left: '-9999px', top: 0 }} aria-hidden="true">
            <label htmlFor="contact-company">Nie wypełniaj tego pola</label>
            <input
              id="contact-company"
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="contact-name" className={`${labelClass} text-pretty`}>
              Imię i Nazwisko / Nazwa Firmy / Nickname
            </label>
            <input
              id="contact-name"
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              onFocus={handleFocus('name')}
              placeholder="Imię i Nazwisko / Nazwa Firmy / Nickname"
              className={`${baseFieldClass} ${fieldStateClass(touched.name, nameValid)} mt-2`}
            />
            <ValidityHint
              isTouched={touched.name}
              isValid={nameValid}
              validLabel="Wygląda dobrze"
              hintLabel="Minimum 4 znaki"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClass}>
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              onFocus={handleFocus('email')}
              placeholder="twoj@email.pl"
              className={`${baseFieldClass} ${fieldStateClass(touched.email, emailValid)} mt-2`}
            />
            <ValidityHint
              isTouched={touched.email}
              isValid={emailValid}
              validLabel="Adres wygląda poprawnie"
              hintLabel="Podaj adres, na który mogę odpowiedzieć"
            />
          </div>

          <div>
            <label htmlFor="contact-phone" className={labelClass}>
              Numer telefonu <span className="text-white/30">(opcjonalnie)</span>
            </label>
            <div
              className={`mt-2 flex min-w-0 items-center gap-2 rounded-2xl border bg-white/[0.03] px-3.5 py-3 transition-all duration-300 sm:gap-2.5 sm:px-4 ${fieldStateClass(phoneStarted, phoneValid)}`}
            >
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
                className="min-w-0 w-full bg-transparent text-base text-white placeholder:text-white/30 outline-none"
              />
            </div>
            <ValidityHint
              isTouched={phoneStarted}
              isValid={phoneValid}
              validLabel="Poprawny numer"
              hintLabel="Tylko cyfry, maksymalnie 9."
            />
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClass}>
              Treść
            </label>
            <textarea
              id="contact-message"
              rows={4}
              value={form.message}
              onChange={handleChange('message')}
              onFocus={handleFocus('message')}
              placeholder="Podaj treść twojego zapytania"
              className={`${baseFieldClass} ${fieldStateClass(touched.message, messageValid)} mt-2 resize-none`}
            />
            <ValidityHint
              isTouched={touched.message}
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

          <div className="flex w-full min-w-0 justify-center overflow-hidden">
            <div className="origin-center scale-[0.82] sm:scale-100">
              <Turnstile
                ref={turnstileRef}
                siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                onSuccess={(token: string) => {
                  setTurnstileToken(token);
                  setTurnstileError(false);
                }}
                onExpire={() => setTurnstileToken(null)}
                onError={() => setTurnstileToken(null)}
                options={{ theme: 'dark' }}
              />
            </div>
          </div>

          <div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? undefined : { scale: 1.02 }}
              whileTap={isSubmitting ? undefined : { scale: 0.98 }}
              className={`flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition-colors duration-300 sm:text-base ${
                isSubmitting ? 'cursor-wait opacity-70' : 'cursor-pointer'
              } ${shake ? 'animate-shake' : ''}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isSubmitting ? (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                    Wysyłanie...
                  </motion.span>
                ) : isSent ? (
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

            <AnimatePresence>
              {turnstileError && (
                <motion.p
                  initial={{ opacity: 0, y: -4, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -4, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 flex items-center gap-1.5 text-xs text-red-400"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
                  Potwierdź weryfikację antybotową przed wysłaniem.
                </motion.p>
              )}
              {showRequiredError && !isFormValid && (
                <motion.p
                  initial={{ opacity: 0, y: -4, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -4, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 flex items-center gap-1.5 text-xs text-red-400"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
                  Uzupełnij poprawnie wymagane pola powyżej.
                </motion.p>
              )}
              {submitError && (
                <motion.p
                  initial={{ opacity: 0, y: -4, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -4, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 flex items-center gap-1.5 text-xs text-red-400"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
                  Coś poszło nie tak. Spróbuj ponownie albo napisz bezpośrednio.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>

        <div className="col-span-full flex min-w-0 flex-col gap-5 border-t border-white/10 bg-black/20 p-4 sm:col-span-3 sm:gap-6 sm:border-t-0 sm:border-l sm:p-8 md:p-10">
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
