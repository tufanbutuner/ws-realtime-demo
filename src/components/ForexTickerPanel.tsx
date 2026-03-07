import { Text } from "@salt-ds/core";
import { useForexTicker } from "@/hooks/useForexTicker";
import { PriceChart } from "./PriceChart";
import { StatusBadge } from "./StatusBadge";
import { Card, Divider, Spinner } from "@salt-ds/core";
import "./TickerPanel.scss";
import "./ForexTickerPanel.scss";

interface ForexTickerPanelProps {
  symbol: string;
  label: string;
}

export function ForexTickerPanel({ symbol, label }: ForexTickerPanelProps) {
  const { price, status, lastUpdated, history } = useForexTicker(symbol);

  const apiKeyMissing = status === "error" && price === null;

  return (
    <div className="ticker-panel">
      <div className="ticker-panel__header">
        <Text styleAs="h2" as="h2">{label}</Text>
        <StatusBadge status={status} />
      </div>
      <div className="ticker-panel__grid">
        <Card variant="primary" accent="top" className="price-card">
          <Text styleAs="label" color="secondary" className="price-card__label">
            Exchange Rate
          </Text>
          <div className="price-card__value">
            {price !== null ? (
              <Text as="span" styleAs="h1">{formatRate(price)}</Text>
            ) : apiKeyMissing ? (
              <Text styleAs="label" color="secondary">Add API key</Text>
            ) : (
              <Spinner />
            )}
          </div>
          {lastUpdated ? (
            <Text styleAs="notation" color="secondary">
              Updated {lastUpdated.toLocaleTimeString()}
            </Text>
          ) : (
            <Text styleAs="notation" color="secondary">
              {apiKeyMissing
                ? "Set VITE_POLYGON_API_KEY in .env.local"
                : "Waiting for data…"}
            </Text>
          )}
          <Divider className="price-card__divider" />
          <Text styleAs="notation" color="secondary" className="forex-panel__note">
            USD per 1 unit of base currency
          </Text>
        </Card>
        <PriceChart history={history} currencySymbol="" />
      </div>
    </div>
  );
}

function formatRate(price: number): string {
  if (price >= 1000) return price.toFixed(2);
  if (price >= 10)   return price.toFixed(3);
  return price.toFixed(4);
}
