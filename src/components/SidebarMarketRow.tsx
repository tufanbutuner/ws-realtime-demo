import { Text } from "@salt-ds/core";
import type { Market } from "@/config/markets";
import "./SidebarMarketRow.scss";

interface SidebarMarketRowProps {
  market: Market;
  active: boolean;
  onClick: () => void;
  price?: number | null;
}

function formatRate(price: number): string {
  if (price >= 1000) return price.toFixed(2);
  if (price >= 10)   return price.toFixed(3);
  return price.toFixed(4);
}

export function SidebarMarketRow({ market, active, onClick, price }: SidebarMarketRowProps) {
  return (
    <button
      className={`sidebar-row${active ? " sidebar-row--active" : ""}`}
      onClick={onClick}
      type="button"
    >
      <div className="sidebar-row__left">
        <Text styleAs="label" className="sidebar-row__abbr">{market.abbr}</Text>
        <Text styleAs="notation" className="sidebar-row__name">{market.name}</Text>
      </div>
      <div className="sidebar-row__right">
        {price != null ? (
          <Text styleAs="label" className="sidebar-row__price">
            {formatRate(price)}
          </Text>
        ) : (
          <Text styleAs="notation" className="sidebar-row__loading">—</Text>
        )}
      </div>
    </button>
  );
}
