import { Text } from "@salt-ds/core";
import { EMERGING_MARKETS } from "@/config/markets";
import { SidebarMarketRow } from "./SidebarMarketRow";
import "./Sidebar.scss";

interface SidebarProps {
  activeSymbol: string;
  onSelect: (symbol: string) => void;
}

export function Sidebar({ activeSymbol, onSelect }: SidebarProps) {
  const regions = [...new Set(EMERGING_MARKETS.map((m) => m.region))];

  return (
    <aside className="sidebar">
      <div className="sidebar__title">
        <Text styleAs="label" className="sidebar__heading">Emerging Markets</Text>
      </div>
      {regions.map((region) => (
        <div key={region} className="sidebar__group">
          <Text styleAs="notation" className="sidebar__region">{region}</Text>
          {EMERGING_MARKETS.filter((m) => m.region === region).map((market) => (
            <SidebarMarketRow
              key={market.symbol}
              market={market}
              active={activeSymbol === market.symbol}
              onClick={() => onSelect(market.symbol)}
            />
          ))}
        </div>
      ))}
    </aside>
  );
}
