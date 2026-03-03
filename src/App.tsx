import { useXrpPrice } from "@/hooks/useXrpPrice";
import { Card, Spinner, StatusIndicator } from "@salt-ds/core";
import type { ValidationStatus } from "@salt-ds/core";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./App.scss";

const statusConfig: Record<string, { label: string; status: ValidationStatus }> = {
  connecting: { label: "Connecting", status: "info" },
  connected: { label: "Live", status: "success" },
  disconnected: { label: "Disconnected", status: "warning" },
  error: { label: "Error", status: "error" },
};

function StatRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="stat-row">
      <span className="stat-row__label">{label}</span>
      {value !== null ? (
        <span className="stat-row__value">£{value}</span>
      ) : (
        <Spinner size="small" />
      )}
    </div>
  );
}

function App() {
  const { price, high, low, volume, status, lastUpdated, history } = useXrpPrice();
  const { label, status: wsStatus } = statusConfig[status];

  const chartData = history.map((p) => ({
    time: new Date(p.time).toLocaleTimeString(),
    price: p.price,
  }));

  const priceMin = history.length ? Math.min(...history.map((p) => p.price)) : undefined;
  const priceMax = history.length ? Math.max(...history.map((p) => p.price)) : undefined;
  const domain: [number, number] | undefined =
    priceMin !== undefined && priceMax !== undefined
      ? [priceMin * 0.9995, priceMax * 1.0005]
      : undefined;

  return (
    <div className="tracker">
      <div className="tracker__inner">

        {/* Header */}
        <div className="tracker__header">
          <h1>XRP / GBP</h1>
          <div className="tracker__status">
            <StatusIndicator status={wsStatus} />
            <span>{label}</span>
          </div>
        </div>

        {/* Grid: price card | chart card */}
        <div className="tracker__grid">

          {/* Price + stats */}
          <Card className="price-card">
            <div className="price-card__label">Current Price</div>
            <div className="price-card__value">
              {price !== null ? (
                <>
                  <span className="price-card__value-currency">£</span>
                  {price.toFixed(4)}
                </>
              ) : (
                <Spinner />
              )}
            </div>
            {lastUpdated ? (
              <p className="price-card__updated">
                Updated {lastUpdated.toLocaleTimeString()}
              </p>
            ) : (
              <div className="price-card__spinner-row"><Spinner size="small" /></div>
            )}
            <div className="price-card__stats">
              <StatRow label="24h High" value={high?.toFixed(4) ?? null} />
              <StatRow label="24h Low" value={low?.toFixed(4) ?? null} />
              <StatRow
                label="24h Volume"
                value={
                  volume !== null
                    ? volume.toLocaleString(undefined, { maximumFractionDigits: 0 })
                    : null
                }
              />
            </div>
          </Card>

          {/* Price chart */}
          <Card className="chart-card">
            <div className="chart-card__label">Price History (session)</div>
            {history.length > 1 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--salt-color-blue-500)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--salt-color-blue-500)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" hide />
                  <YAxis
                    domain={domain}
                    tickFormatter={(v: number) => `£${v.toFixed(4)}`}
                    width={72}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(v: number | undefined) => v !== undefined ? [`£${v.toFixed(4)}`, "Price"] : ["-", "Price"]}
                    labelFormatter={(l: unknown) => `Time: ${String(l)}`}
                    contentStyle={{ fontSize: 12 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="var(--salt-color-blue-500)"
                    strokeWidth={2}
                    fill="url(#priceGradient)"
                    dot={false}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="chart-card__empty">
                <Spinner />
                <p>Waiting for price data…</p>
              </div>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
}

export default App;
