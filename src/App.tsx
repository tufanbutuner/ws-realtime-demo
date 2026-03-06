import { DashboardHeader } from "@/components/DashboardHeader";
import { TickerPanel } from "@/components/TickerPanel";
import { TradeBlotter } from "@/components/TradeBlotter";
import "./App.scss";

function App() {
  return (
    <div className="dashboard">
      <DashboardHeader />
      <main className="dashboard__body">
        <div className="dashboard__tickers">
          <TickerPanel symbol="XRP/USD" label="XRP / USD" />
          <TickerPanel symbol="BTC/USD" label="BTC / USD" />
        </div>
        <div className="dashboard__blotter">
          <TradeBlotter symbol="ADA/USD" label="ADA / USD" />
        </div>
      </main>
    </div>
  );
}

export default App;
