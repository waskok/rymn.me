import type { PortfolioGateway } from '../types';
import { GatewayCard } from './GatewayCard';

interface GatewaysProps {
  gateways: readonly PortfolioGateway[];
}

export function Gateways({ gateways }: GatewaysProps) {
  return (
    <section id="gateways" className="relative z-20 mx-auto max-w-5xl px-6 sm:px-10">
      <div className="grid gap-5 md:grid-cols-2">
        {gateways.map((gateway, i) => (
          <GatewayCard key={gateway.id} gateway={gateway} tall delay={0.1 * i} />
        ))}
      </div>
    </section>
  );
}
