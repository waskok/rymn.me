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
      'Niniejszy regulamin określa zasady korzystania z serwisu internetowego dostępnego pod adresem rymn.me (dalej: „Serwis”).',
      'Serwis jest prowadzony przez osobę występującą pod marką „rymn” (dalej: „Administrator”).',
      'Kontakt z Administratorem możliwy jest mailowo pod adresem kontakt.rymn@gmail.com lub przez Discorda (rymn_).',
    ],
  },
  {
    title: '2. Wymagania techniczne',
    paragraphs: [
      'Do korzystania z Serwisu wystarczy urządzenie z dostępem do internetu oraz aktualna przeglądarka wspierająca HTML5, CSS3 i JavaScript.',
      'Część funkcji Serwisu (np. formularz kontaktowy) może wymagać włączonej obsługi plików cookies lub pamięci lokalnej przeglądarki, a także pozytywnego przejścia weryfikacji antybotowej, jeśli zostanie ona wdrożona.',
    ],
  },
  {
    title: '3. Zasady korzystania z Serwisu',
    paragraphs: [
      'Korzystając z Serwisu, w tym z formularza kontaktowego, należy działać zgodnie z prawem i dobrymi obyczajami.',
      'Niedopuszczalne jest przesyłanie treści nielegalnych, obraźliwych lub naruszających prawa osób trzecich, a także podejmowanie działań mogących zakłócić prawidłowe działanie Serwisu lub obejście jego zabezpieczeń technicznych.',
      'Administrator może zignorować lub usunąć wiadomości noszące charakter spamu, nadużycia lub naruszające powyższe zasady.',
    ],
  },
  {
    title: '4. Formularz kontaktowy',
    paragraphs: [
      'Serwis udostępnia (lub będzie udostępniał) formularz kontaktowy pozwalający na przesłanie wiadomości do Administratora.',
      'Wysłanie wiadomości nie jest równoznaczne z zawarciem jakiejkolwiek umowy ani zobowiązaniem do udzielenia odpowiedzi w określonym terminie — Administrator dokłada starań, aby odpowiadać w rozsądnym czasie.',
    ],
  },
  {
    title: '5. Prawa autorskie',
    paragraphs: [
      'Treści, projekt graficzny oraz materiały prezentowane w Serwisie (w tym opisy realizacji i portfolio) stanowią własność Administratora i podlegają ochronie prawnoautorskiej, o ile nie wskazano inaczej.',
      'Kopiowanie, rozpowszechnianie lub wykorzystywanie tych materiałów bez zgody Administratora jest niedozwolone.',
      'Za treść wiadomości przesłanych przez formularz kontaktowy odpowiada wyłącznie osoba, która je wysłała.',
    ],
  },
  {
    title: '6. Cookies i usługi zewnętrzne',
    paragraphs: [
      'Serwis korzysta z infrastruktury i usług Cloudflare, w tym zabezpieczeń antybotowych oraz analityki ruchu (Cloudflare Web Analytics), które mogą wiązać się z wykorzystaniem plików cookies lub podobnych technologii.',
      'Szczegółowe informacje na ten temat znajdują się w Polityce prywatności.',
    ],
  },
  {
    title: '7. Bezpłatny charakter Serwisu',
    paragraphs: [
      'Korzystanie z Serwisu jest całkowicie bezpłatne. Administrator nie pobiera żadnych opłat za dostęp do Serwisu ani za korzystanie z jego funkcji.',
    ],
  },
  {
    title: '8. Odpowiedzialność',
    paragraphs: [
      'Serwis udostępniany jest w stanie takim, w jakim jest („as is”), bez gwarancji nieprzerwanej dostępności lub całkowitego braku błędów.',
      'Administrator dokłada należytej staranności w celu zapewnienia prawidłowego działania Serwisu, jednak w granicach dopuszczalnych przez obowiązujące przepisy prawa nie odpowiada za przerwy w dostępności ani za działanie usług zewnętrznych, z których Serwis korzysta (w szczególności Cloudflare).',
    ],
  },
  {
    title: '9. Zgłoszenia i kontakt w sprawach Regulaminu',
    paragraphs: [
      'Wszelkie uwagi, pytania lub zgłoszenia dotyczące działania Serwisu lub niniejszego Regulaminu można przesyłać na adres kontakt.rymn@gmail.com.',
    ],
  },
  {
    title: '10. Prawo właściwe',
    paragraphs: [
      'W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają obowiązujące przepisy prawa polskiego.',
    ],
  },
  {
    title: '11. Zmiany regulaminu',
    paragraphs: [
      'Regulamin może być okresowo aktualizowany, w szczególności w związku z rozwojem Serwisu.',
      'O istotnych zmianach odwiedzający zostaną poinformowani poprzez publikację nowej wersji Regulaminu na stronie Serwisu wraz z datą jej ostatniej aktualizacji.',
      'Administrator zastrzega sobie prawo do ograniczenia dostępu lub zakończenia działania Serwisu, w szczególności w przypadku nadużyć lub z przyczyn technicznych.',
    ],
  },
];

export function Terms() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="mx-auto flex max-w-3xl flex-col items-start px-6 py-24 sm:px-10"
    >
      <PageNav variant="top" />

      <span className="font-display text-xs tracking-[0.2em] text-white/25">PRAWNE</span>
      <h1 className="font-display mt-3 text-3xl font-medium text-white sm:text-5xl">Regulamin</h1>
      <p className="mt-4 text-sm text-white/40">Ostatnia aktualizacja: 24 sierpnia 2026</p>

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
            W sprawach związanych z niniejszym Regulaminem można kontaktować się mailowo pod
            adresem{' '}
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
