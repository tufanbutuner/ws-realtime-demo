import { Card, Divider, Spinner, Text } from "@salt-ds/core";
import { StatRow } from "./StatRow";
import "./PriceCard.scss";

interface PriceCardProps {
  price: number | null;
  high: number | null;
  low: number | null;
  volume: number | null;
  lastUpdated: Date | null;
}

export function PriceCard({ price, high, low, volume, lastUpdated }: PriceCardProps) {
  return (
    <Card variant="primary" accent="top" className="price-card">
      <Text styleAs="label" color="secondary" className="price-card__label">
        Current Price
      </Text>
      <div className="price-card__value">
        {price !== null ? (
          <>
            <Text as="span" styleAs="h3" color="secondary">£</Text>
            <Text as="span" styleAs="h1">{price.toFixed(4)}</Text>
          </>
        ) : (
          <Spinner />
        )}
      </div>
      {lastUpdated ? (
        <Text styleAs="notation" color="secondary">
          Updated {lastUpdated.toLocaleTimeString()}
        </Text>
      ) : (
        <Spinner size="small" />
      )}
      <Divider className="price-card__divider" />
      <div className="price-card__stats">
        <StatRow label="24h High" value={high?.toFixed(4) ?? null} />
        <StatRow label="24h Low" value={low?.toFixed(4) ?? null} />
        <StatRow
          label="24h Volume"
          value={volume !== null ? volume.toLocaleString(undefined, { maximumFractionDigits: 0 }) : null}
        />
      </div>
    </Card>
  );
}
