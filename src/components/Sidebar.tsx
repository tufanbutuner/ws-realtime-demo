import { Text } from "@salt-ds/core";
import { EMERGING_MARKETS } from "@/config/markets";
import { SidebarCryptoRow } from "./SidebarCryptoRow";
import { SidebarMarketRow } from "./SidebarMarketRow";
import "./Sidebar.scss";

interface SidebarProps {
  activeSymbol: string;
  onSelect: (symbol: string) => void;
  activeForexPrice?: number | null;
  collapsed: boolean;
  onToggle: () => void;
}

const FOREX_REGIONS = ["Latin America", "Asia", "EMEA"];

export function Sidebar({ activeSymbol, onSelect, activeForexPrice, collapsed, onToggle }: SidebarProps) {
  const cryptoMarkets = EMERGING_MARKETS.filter((m) => m.type === "crypto");

  return (
    <aside className={`sidebar${collapsed ? " sidebar--collapsed" : ""}`}>
      <div className="sidebar__title">
        {!collapsed && <Text styleAs="label" className="sidebar__heading">Markets</Text>}
        <button className="sidebar__toggle" onClick={onToggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      {!collapsed && (
        <>
          {FOREX_REGIONS.map((region) => (
            <div key={region} className="sidebar__group">
              <Text styleAs="notation" className="sidebar__region">{region}</Text>
              {EMERGING_MARKETS.filter((m) => m.region === region).map((market) => (
                <SidebarMarketRow
                  key={market.symbol}
                  market={market}
                  active={activeSymbol === market.symbol}
                  onClick={() => onSelect(market.symbol)}
                  price={activeSymbol === market.symbol ? activeForexPrice : null}
                />
              ))}
            </div>
          ))}

          <div className="sidebar__group sidebar__group--crypto">
            <Text styleAs="notation" className="sidebar__region">Crypto</Text>
            {cryptoMarkets.map((market) => (
              <SidebarCryptoRow
                key={market.symbol}
                market={market}
                active={activeSymbol === market.symbol}
                onClick={() => onSelect(market.symbol)}
              />
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
