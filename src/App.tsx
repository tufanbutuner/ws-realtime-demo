import { useXrpPrice } from "@/hooks/useXrpPrice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const statusConfig = {
  connecting: { label: "Connecting", variant: "secondary" as const },
  connected: { label: "Live", variant: "default" as const },
  disconnected: { label: "Disconnected", variant: "secondary" as const },
  error: { label: "Error", variant: "destructive" as const },
};

function StatRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      {value !== null ? (
        <span className="text-sm font-medium">£{value}</span>
      ) : (
        <Skeleton className="h-4 w-16" />
      )}
    </div>
  );
}

function App() {
  const { price, high, low, volume, status, lastUpdated, history } = useXrpPrice();
  const { label, variant } = statusConfig[status];

  const chartData = history.map((p) => ({
    time: new Date(p.time).toLocaleTimeString(),
    price: p.price,
  }));

  const priceMin = history.length ? Math.min(...history.map((p) => p.price) ) : undefined;
  const priceMax = history.length ? Math.max(...history.map((p) => p.price)) : undefined;
  const domain: [number, number] | undefined =
    priceMin !== undefined && priceMax !== undefined
      ? [priceMin * 0.9995, priceMax * 1.0005]
      : undefined;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">XRP / GBP</h1>
          <Badge variant={variant}>{label}</Badge>
        </div>

        {/* Top row: price + stats | chart */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Price + stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Current Price
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {price !== null ? (
                <div className="text-4xl font-bold tracking-tight">
                  <span className="text-muted-foreground text-2xl mr-1">£</span>
                  {price.toFixed(4)}
                </div>
              ) : (
                <Skeleton className="h-10 w-36" />
              )}
              {lastUpdated ? (
                <p className="text-xs text-muted-foreground">
                  Updated {lastUpdated.toLocaleTimeString()}
                </p>
              ) : (
                <Skeleton className="h-3 w-24" />
              )}
              <div className="border-t pt-3 space-y-0.5">
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
            </CardContent>
          </Card>

          {/* Price chart */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Price History (session)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {history.length > 1 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
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
                      contentStyle={{
                        fontSize: 12,
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#priceGradient)"
                      dot={false}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[220px] flex flex-col gap-3 justify-end pb-2">
                  <Skeleton className="h-[120px] w-full" />
                  <p className="text-xs text-muted-foreground text-center">
                    Waiting for price data…
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
