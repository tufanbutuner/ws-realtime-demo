import { TickerPanel } from "@/components/TickerPanel";
import "./App.scss";

function App() {
  return (
    <div className="tracker">
      <div className="tracker__inner">
        <TickerPanel symbol="XRP/USD" label="XRP / USD" />
        <TickerPanel symbol="BTC/USD" label="BTC / USD" />
      </div>
    </div>
  );
}

export default App;
