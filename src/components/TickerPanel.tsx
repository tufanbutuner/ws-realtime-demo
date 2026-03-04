import { Text } from "@salt-ds/core";
import { PriceCard } from "./PriceCard";
import { PriceChart } from "./PriceChart";
import { StatusBadge } from "./StatusBadge";
import { useTicker } from "@/hooks/useTicker";
import "./TickerPanel.scss";

interface TickerPanelProps {
  symbol: string;
  label: string;
  currencySymbol?: string;
}

export function TickerPanel({ symbol, label, currencySymbol = '$' }: TickerPanelProps) {
  const { price, high, low, volume, trades, updatesPerMin, status, lastUpdated, history } = useTicker(symbol);

  return (
    <div className="ticker-panel">
      <div className="ticker-panel__header">
        <Text styleAs="h2" as="h2">{label}</Text>
        <StatusBadge status={status} />
      </div>
      <div className="ticker-panel__grid">
        <PriceCard
          price={price}
          high={high}
          low={low}
          volume={volume}
          trades={trades}
          updatesPerMin={updatesPerMin}
          lastUpdated={lastUpdated}
          currencySymbol={currencySymbol}
        />
        <PriceChart history={history} currencySymbol={currencySymbol} />
      </div>
    </div>
  );
}
