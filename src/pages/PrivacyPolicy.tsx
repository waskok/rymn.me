import { motion } from 'framer-motion';
import { easeOut } from '../lib/motion';
import { PageNav } from '../components/PageNav';

interface Section {
  title: string;
  paragraphs: readonly string[];
}

const sections: readonly Section[] = [
  {
    title: '1. Postanowienia ogólne',
    paragraphs: [
      'Niniejsza polityka prywatności opisuje zasady przetwarzania danych osobowych osób odwiedzających serwis internetowy dostępny pod adresem rymn.me (dalej: „Serwis”).',
      'Ochrona prywatności jest traktowana poważnie - dane zbierane są w minimalnym zakresie, niezbędnym do prawidłowego działania Serwisu oraz obsługi kontaktu z jego odwiedzającymi.',
    ],
  },
  {
    title: '2. Administrator danych',
    paragraphs: [
      'Administratorem danych osobowych jest osoba prowadząca Serwis pod marką „rymn” (dalej: „Administrator”).',
      'Kontakt z Administratorem możliwy jest drogą e-mailową pod adresem kontakt.rymn@gmail.com lub za pośrednictwem Discorda (rymn_).',
    ],
  },
  {
    title: '3. Jakie dane są zbierane',
    paragraphs: [
      'Podczas zwykłego przeglądania Serwisu automatycznie zbierane są dane techniczne generowane przez ruch sieciowy, takie jak adres IP, rodzaj przeglądarki i urządzenia, przybliżona lokalizacja czy odwiedzane podstrony. Dane te przetwarzane są przede wszystkim przez dostawcę infrastruktury (patrz punkt 6) w celu zapewnienia bezpieczeństwa i stabilności działania Serwisu.',
      'W przypadku skorzystania z formularza kontaktowego zbierane są wyłącznie dane podane dobrowolnie przez odwiedzającego - najczęściej imię lub nick, adres e-mail oraz treść wiadomości.',
    ],
  },
  {
    title: '4. Formularz kontaktowy',
    paragraphs: [
      'Serwis udostępnia (lub będzie udostępniał) formularz kontaktowy pozwalający na wysłanie wiadomości bezpośrednio do Administratora.',
      'Dane podane w formularzu wykorzystywane są wyłącznie w celu udzielenia odpowiedzi na przesłaną wiadomość i nie są wykorzystywane do żadnych innych celów, w szczególności marketingowych, bez odrębnej zgody.',
      'Podstawą prawną przetwarzania jest prawnie uzasadniony interes Administratora polegający na obsłudze korespondencji (art. 6 ust. 1 lit. f RODO) lub zgoda osoby wysyłającej wiadomość, jeśli jest wymagana.',
      'Wiadomości przechowywane są przez czas niezbędny do udzielenia odpowiedzi oraz przez okres wynikający z ewentualnej dalszej korespondencji, po czym mogą zostać usunięte.',
    ],
  },
  {
    title: '5. Pliki cookies i podobne technologie',
    paragraphs: [
      'Serwis nie wykorzystuje własnych plików cookies do celów marketingowych ani do śledzenia zachowań użytkowników.',
      'Ze względu na korzystanie z usług Cloudflare (patrz punkt 6), niektóre pliki cookies lub podobne technologie mogą być ustawiane automatycznie przez tego dostawcę w celach związanych z bezpieczeństwem (np. ochrona przed botami i nadużyciami).',
    ],
  },
  {
    title: '6. Hosting i infrastruktura (Cloudflare)',
    paragraphs: [
      'Serwis jest hostowany i zabezpieczony przy użyciu usług firmy Cloudflare, Inc. Oznacza to, że część danych technicznych związanych z ruchem sieciowym (np. adresy IP, logi żądań) może być przetwarzana przez Cloudflare jako niezależnego dostawcę infrastruktury, w celu zapewnienia bezpieczeństwa, wydajności i dostępności Serwisu.',
      'Szczegółowe informacje o tym, jak Cloudflare przetwarza dane, znajdują się w jego własnej polityce prywatności dostępnej pod adresem cloudflare.com/privacypolicy.',
    ],
  },
  {
    title: '7. Odbiorcy danych',
    paragraphs: [
      'Poza dostawcą infrastruktury wymienionym w punkcie 6 oraz - w razie potrzeby - dostawcą usługi obsługującej formularz kontaktowy, dane osobowe nie są przekazywane innym podmiotom.',
      'Dane nie są sprzedawane, wynajmowane ani udostępniane w celach marketingowych osobom trzecim.',
    ],
  },
  {
    title: '8. Prawa osób, których dane dotyczą',
    paragraphs: [
      'Każda osoba, której dane są przetwarzane, ma prawo do dostępu do swoich danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania, a także prawo do wniesienia sprzeciwu wobec przetwarzania oraz do przenoszenia danych.',
      'W celu skorzystania z powyższych praw wystarczy skontaktować się z Administratorem, korzystając z danych podanych w punkcie 2.',
      'Przysługuje również prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (PUODO), jeśli przetwarzanie danych narusza obowiązujące przepisy.',
    ],
  },
  {
    title: '9. Bezpieczeństwo danych',
    paragraphs: [
      'Administrator dokłada należytej staranności, aby dane były przetwarzane w sposób bezpieczny, w tym poprzez korzystanie z zaufanych dostawców infrastruktury stosujących nowoczesne zabezpieczenia (szyfrowanie połączenia, ochronę przed nadużyciami).',
    ],
  },
  {
    title: '10. Bezpłatny charakter usługi',
    paragraphs: [
      'Korzystanie z Serwisu jest całkowicie bezpłatne dla jego odwiedzających.',
      'Serwis nie prowadzi sprzedaży ani rozliczeń finansowych, w związku z czym dane osobowe nie są zbierane w celach księgowych, transakcyjnych ani marketingowych.',
    ],
  },
  {
    title: '11. Prawo właściwe',
    paragraphs: [
      'W zakresie nieuregulowanym niniejszą polityką oraz w sprawach dotyczących przetwarzania danych osobowych zastosowanie mają obowiązujące przepisy prawa polskiego, w tym RODO.',
    ],
  },
  {
    title: '12. Zmiany w polityce prywatności',
    paragraphs: [
      'Niniejsza polityka może być okresowo aktualizowana, w szczególności w związku z rozwojem Serwisu lub zmianami w przepisach prawa.',
      'O wszelkich istotnych zmianach odwiedzający zostaną poinformowani poprzez publikację nowej wersji polityki na stronie Serwisu wraz z datą jej ostatniej aktualizacji.',
    ],
  },
];

export function PrivacyPolicy() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="mx-auto flex max-w-3xl flex-col items-start px-6 py-24 sm:px-10"
    >
      <PageNav variant="top" />

      <span className="font-display text-xs tracking-[0.2em] text-white/25">PRAWNE</span>
      <h1 className="font-display mt-3 text-3xl font-medium text-white sm:text-5xl">
        Polityka prywatności
      </h1>
      <p className="mt-4 text-sm text-white/40">Ostatnia aktualizacja: 23 sierpnia 2026</p>

      <div className="mt-10 flex flex-col gap-8 border-t border-white/10 pt-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="font-display text-lg font-medium text-white sm:text-xl">
              {section.title}
            </h2>
            <div className="mt-3 flex flex-col gap-3">
              {section.paragraphs.map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-white/50 sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h2 className="font-display text-lg font-medium text-white sm:text-xl">Kontakt</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/50 sm:text-base">
            W sprawach związanych z niniejszą polityką prywatności lub przetwarzaniem danych
            można kontaktować się mailowo pod adresem{' '}
            <a
              href="mailto:kontakt.rymn@gmail.com"
              className="text-white underline underline-offset-4 hover:text-white/70"
            >
              kontakt.rymn@gmail.com
            </a>{' '}
            lub przez Discorda (<span className="text-white">rymn_</span>).
          </p>
        </div>
      </div>

      <PageNav variant="bottom" />
    </motion.section>
  );
}
