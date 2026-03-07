import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ForexTickerPanel } from "@/components/ForexTickerPanel";
import { Sidebar } from "@/components/Sidebar";
import { TickerPanel } from "@/components/TickerPanel";
import { TradeBlotter } from "@/components/TradeBlotter";
import { EMERGING_MARKETS } from "@/config/markets";
import { useForexTicker } from "@/hooks/useForexTicker";
import "./App.scss";

const DEFAULT_MARKET = EMERGING_MARKETS[0]; // USD/BRL

function App() {
  const [activeSymbol, setActiveSymbol] = useState(DEFAULT_MARKET.symbol);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const activeMarket = EMERGING_MARKETS.find((m) => m.symbol === activeSymbol) ?? DEFAULT_MARKET;
  const forexTicker = useForexTicker(activeMarket.type === "forex" ? activeMarket.symbol : "");

  return (
    <div className="dashboard">
      <DashboardHeader />
      <div className="dashboard__content">
        <Sidebar activeSymbol={activeSymbol} onSelect={setActiveSymbol} activeForexPrice={forexTicker.price} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />
        <main className="dashboard__body">
          <div className="dashboard__tickers">
            {activeMarket.type === "crypto" ? (
              <TickerPanel symbol={activeMarket.symbol} label={activeMarket.label} />
            ) : (
              <ForexTickerPanel label={activeMarket.label} ticker={forexTicker} />
            )}
          </div>
          {activeMarket.type === "crypto" && (
            <div className="dashboard__blotter">
              <TradeBlotter symbol={activeMarket.symbol} label={activeMarket.label} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
