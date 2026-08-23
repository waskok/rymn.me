import { Hero } from '../components/Hero';
import { Gateways } from '../components/Gateways';
import { Marquee } from '../components/Marquee';
import { gateways, stats, marqueeTags } from '../data/gateways';

export function Home() {
  return (
    <>
      <Hero stats={stats} />
      <Gateways gateways={gateways} />
      <Marquee tags={marqueeTags} />
    </>
  );
}
