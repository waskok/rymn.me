import { Outlet } from 'react-router-dom';
import { AmbientBackground } from './AmbientBackground';
import { CursorGlow } from './CursorGlow';
import { Header } from './Header';
import { Footer } from './Footer';
import { socials } from '../data/gateways';

/** Shared page shell — background, header and footer stay mounted across routes. */
export function Layout() {
  return (
    <div id="top" className="relative min-h-screen bg-void-950 font-sans text-white selection:bg-white/20">
      <AmbientBackground />
      <CursorGlow />

      <div className="relative flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer socials={socials} />
      </div>
    </div>
  );
}
