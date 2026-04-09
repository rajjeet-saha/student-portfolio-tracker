import React from "react";

function Insight({ stocks }) {
  if (stocks.length === 0) {
    return (
      <section className="rounded-2xl border border-fintech-line bg-fintech-card/80 p-6 shadow-soft backdrop-blur">
        <h2 className="text-xl font-semibold text-white">Insight</h2>
        <p className="mt-3 rounded-xl border border-slate-700 bg-slate-900/70 p-4 text-slate-300">
          No data yet. Add your first stock to unlock smart insights.
        </p>
      </section>
    );
  }

  const total = stocks.length;
  const totals = stocks.reduce(
    (acc, stock) => {
      acc.invested += stock.buyPrice * stock.qty;
      acc.current += stock.currentPrice * stock.qty;
      return acc;
    },
    { invested: 0, current: 0 }
  );
  const pnlPct =
    totals.invested > 0 ? ((totals.current - totals.invested) / totals.invested) * 100 : 0;

  if (total >= 3) {
    return (
      <section className="rounded-2xl border border-fintech-line bg-fintech-card/80 p-6 shadow-soft backdrop-blur">
        <h2 className="text-xl font-semibold text-white">Insight</h2>
        <div className="mt-3 space-y-2 rounded-xl border border-amber-700/50 bg-amber-500/10 p-4 text-amber-100">
          <p>Good diversification base with {total} holdings.</p>
          <p>
            Performance trend is {pnlPct >= 0 ? "positive" : "negative"} at{" "}
            {pnlPct >= 0 ? "+" : ""}
            {pnlPct.toFixed(1)}%.
          </p>
          <p>Focus next on balancing risk with consistent monthly allocation.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-fintech-line bg-fintech-card/80 p-6 shadow-soft backdrop-blur">
      <h2 className="text-xl font-semibold text-white">Insight</h2>
      <div className="mt-3 space-y-2 rounded-xl border border-emerald-700/50 bg-emerald-500/10 p-4 text-emerald-100">
        <p>Your portfolio is simple and manageable. Great for focused learning.</p>
        <p>
          Current return is {pnlPct >= 0 ? "+" : ""}
          {pnlPct.toFixed(1)}%.
        </p>
      </div>
    </section>
  );
}

export default Insight;
