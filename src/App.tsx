import { Text } from "@salt-ds/core";
import { PriceCard } from "@/components/PriceCard";
import { PriceChart } from "@/components/PriceChart";
import { StatusBadge } from "@/components/StatusBadge";
import { useXrpPrice } from "@/hooks/useXrpPrice";
import "./App.scss";

function App() {
  const { price, high, low, volume, trades, updatesPerMin, status, lastUpdated, history } = useXrpPrice();

  return (
    <div className="tracker">
      <div className="tracker__inner">
        <div className="tracker__header">
          <Text styleAs="h1" as="h1">XRP / GBP</Text>
          <StatusBadge status={status} />
        </div>
        <div className="tracker__grid">
          <PriceCard price={price} high={high} low={low} volume={volume} trades={trades} updatesPerMin={updatesPerMin} lastUpdated={lastUpdated} />
          <PriceChart history={history} />
        </div>
      </div>
    </div>
  );
}

export default App;
