import { Text } from "@salt-ds/core";
import { useTicker } from "@/hooks/useTicker";
import type { Market } from "@/config/markets";
import "./SidebarMarketRow.scss";

interface SidebarMarketRowProps {
  market: Market;
  active: boolean;
  onClick: () => void;
}

export function SidebarMarketRow({ market, active, onClick }: SidebarMarketRowProps) {
  const { price, status } = useTicker(market.symbol);

  return (
    <button
      className={`sidebar-row${active ? " sidebar-row--active" : ""}`}
      onClick={onClick}
      type="button"
    >
      <div className="sidebar-row__left">
        <Text styleAs="label" className="sidebar-row__abbr">{market.abbr}</Text>
        <Text styleAs="notation" className="sidebar-row__name">{market.label}</Text>
      </div>
      <div className="sidebar-row__right">
        {price !== null ? (
          <Text styleAs="label" className="sidebar-row__price">
            ${price.toFixed(price < 1 ? 6 : price < 100 ? 4 : 2)}
          </Text>
        ) : (
          <Text styleAs="notation" className="sidebar-row__loading">
            {status === "error" ? "—" : "…"}
          </Text>
        )}
      </div>
    </button>
  );
}
