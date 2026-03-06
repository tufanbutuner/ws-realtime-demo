import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ForexTickerPanel } from "@/components/ForexTickerPanel";
import { Sidebar } from "@/components/Sidebar";
import { TickerPanel } from "@/components/TickerPanel";
import { TradeBlotter } from "@/components/TradeBlotter";
import { EMERGING_MARKETS } from "@/config/markets";
import "./App.scss";

const DEFAULT_MARKET = EMERGING_MARKETS[0]; // USD/BRL

function App() {
  const [activeSymbol, setActiveSymbol] = useState(DEFAULT_MARKET.symbol);

  const activeMarket = EMERGING_MARKETS.find((m) => m.symbol === activeSymbol) ?? DEFAULT_MARKET;

  return (
    <div className="dashboard">
      <DashboardHeader />
      <div className="dashboard__content">
        <Sidebar activeSymbol={activeSymbol} onSelect={setActiveSymbol} />
        <main className="dashboard__body">
          <div className="dashboard__tickers">
            {activeMarket.type === "crypto" ? (
              <TickerPanel symbol={activeMarket.symbol} label={activeMarket.label} />
            ) : (
              <ForexTickerPanel symbol={activeMarket.symbol} label={activeMarket.label} />
            )}
          </div>
          <div className="dashboard__blotter">
            <TradeBlotter symbol="ADA/USD" label="ADA / USD" />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
