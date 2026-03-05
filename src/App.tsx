import { TickerPanel } from "@/components/TickerPanel";
import { TradeBlotter } from "@/components/TradeBlotter";
import "./App.scss";

function App() {
  return (
    <div className="tracker">
      <div className="tracker__inner">
        <TickerPanel symbol="XRP/USD" label="XRP / USD" />
        <TickerPanel symbol="BTC/USD" label="BTC / USD" />
        <TradeBlotter symbol="ADA/USD" label="ADA / USD" />
      </div>
    </div>
  );
}

export default App;
