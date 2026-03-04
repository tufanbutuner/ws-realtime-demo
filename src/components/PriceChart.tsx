import { Card, Spinner, Text } from "@salt-ds/core";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PricePoint } from "@/hooks/useTicker";
import "./PriceChart.scss";

interface PriceChartProps {
  history: PricePoint[];
  currencySymbol?: string;
}

export function PriceChart({ history, currencySymbol = '$' }: PriceChartProps) {
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
    <Card variant="primary" className="price-chart">
      <Text styleAs="label" color="secondary" className="price-chart__label">
        Price History (session)
      </Text>
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
              tickFormatter={(v: number) => `${currencySymbol}${v.toFixed(4)}`}
              width={72}
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(v: number | undefined) => v !== undefined ? [`${currencySymbol}${v.toFixed(4)}`, "Price"] : ["-", "Price"]}
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
        <div className="price-chart__empty">
          <Spinner />
          <Text styleAs="notation" color="secondary">Waiting for price data…</Text>
        </div>
      )}
    </Card>
  );
}
