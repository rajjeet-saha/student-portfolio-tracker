import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import AddStock from "./components/AddStock";
import Insight from "./components/Insight";
import RiskAnalysis from "./components/RiskAnalysis";

const DEMO_STOCKS = [
  { name: "TCS", qty: 8, buyPrice: 3580, currentPrice: 3725 },
  { name: "INFY", qty: 12, buyPrice: 1440, currentPrice: 1510 },
  { name: "HDFCBANK", qty: 10, buyPrice: 1540, currentPrice: 1618 },
  { name: "RELIANCE", qty: 5, buyPrice: 2840, currentPrice: 2970 },
  { name: "ITC", qty: 20, buyPrice: 420, currentPrice: 436 }
];

function App() {
  const [stocks, setStocks] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("stocks")) || [];
    setStocks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("stocks", JSON.stringify(stocks));
    setLastUpdated(new Date());
  }, [stocks]);

  const loadDemoData = () => {
    setStocks(DEMO_STOCKS);
  };

  const clearPortfolio = () => {
    setStocks([]);
  };

  const simulateMarketDay = () => {
    setStocks((prev) =>
      prev.map((stock) => {
        const drift = (Math.random() * 12 - 6) / 100;
        const updatedPrice = Math.max(1, stock.currentPrice * (1 + drift));
        return { ...stock, currentPrice: Number(updatedPrice.toFixed(2)) };
      })
    );
  };

  const removeStock = (indexToRemove) => {
    setStocks((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="min-h-screen px-4 py-8 md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-2xl border border-fintech-line bg-fintech-card/80 p-6 shadow-soft backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
                Personal Finance Lab
              </p>
              <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                Student Portfolio Tracker
              </h1>
              <p className="mt-2 text-sm text-slate-300 md:text-base">
                Track your mock investments, analyze outcomes, and build better money habits.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={simulateMarketDay}
                className="rounded-xl border border-cyan-400/50 bg-cyan-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-200 transition hover:bg-cyan-500/25"
              >
                Simulate Market Day
              </button>
              <button
                onClick={loadDemoData}
                className="rounded-xl border border-indigo-400/50 bg-indigo-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-indigo-200 transition hover:bg-indigo-500/25"
              >
                Load Demo
              </button>
              <button
                onClick={clearPortfolio}
                className="rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-rose-200 transition hover:bg-rose-500/20"
              >
                Reset
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-300">
              Holdings: {stocks.length}
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-300">
              Last Updated: {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <AddStock
            setStocks={setStocks}
            onLoadDemo={loadDemoData}
            onClearPortfolio={clearPortfolio}
          />
          <Insight stocks={stocks} />
        </div>

        <div className="mt-6">
          <Dashboard stocks={stocks} onRemoveStock={removeStock} />
        </div>

        <div className="mt-6">
          <RiskAnalysis stocks={stocks} />
        </div>
      </div>
    </div>
  );
}

export default App;
