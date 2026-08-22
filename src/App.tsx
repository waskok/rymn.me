import { AmbientBackground } from './components/AmbientBackground';
import { CursorGlow } from './components/CursorGlow';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Gateways } from './components/Gateways';
import { Marquee } from './components/Marquee';
import { Footer } from './components/Footer';
import { gateways, socials, stats, marqueeTags } from './data/gateways';

/**
 * Personal hub for rymn.me. This view has one job: introduce me in a single
 * memorable screen, then point visitors toward the dedicated portfolios
 * (web development, video editing, ...) as they come online.
 */
function App() {
  return (
    <div id="top" className="relative min-h-screen bg-void-950 font-sans text-white selection:bg-white/20">
      <AmbientBackground />
      <CursorGlow />

      <div className="relative flex min-h-screen flex-col">
        <Header socials={socials} />
        <Hero stats={stats} />
        <Gateways gateways={gateways} />
        <Marquee tags={marqueeTags} />
        <Footer socials={socials} />
      </div>
    </div>
  );
}

export default App;
