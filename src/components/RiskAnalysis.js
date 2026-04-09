import React from "react";

function getRiskReport(stocks) {
  if (stocks.length === 0) {
    return {
      score: 0,
      level: "No Data",
      confidence: "Low",
      notes: ["Add stocks to generate AI risk analysis."],
      suggestions: ["Start with 2-3 different sectors to avoid concentration risk."]
    };
  }

  let invested = 0;
  let current = 0;
  let maxPosition = 0;

  stocks.forEach((s) => {
    const buyValue = s.buyPrice * s.qty;
    const currentValue = s.currentPrice * s.qty;
    invested += buyValue;
    current += currentValue;
    maxPosition = Math.max(maxPosition, currentValue);
  });

  const volatilityProxy = stocks.reduce((acc, s) => {
    const movePct = Math.abs((s.currentPrice - s.buyPrice) / s.buyPrice);
    return acc + movePct;
  }, 0) / stocks.length;

  const concentration = current > 0 ? maxPosition / current : 1;
  const diversificationScore = Math.min(stocks.length / 5, 1); // 0 to 1
  const pnlPct = invested > 0 ? ((current - invested) / invested) * 100 : 0;

  let riskScore = 30;
  riskScore += concentration * 35;
  riskScore += volatilityProxy * 30;
  riskScore -= diversificationScore * 20;
  riskScore += pnlPct < -10 ? 10 : 0;
  riskScore = Math.max(5, Math.min(95, Math.round(riskScore)));

  const level = riskScore >= 70 ? "High" : riskScore >= 40 ? "Medium" : "Low";
  const confidence = stocks.length >= 5 ? "High" : stocks.length >= 3 ? "Medium" : "Low";

  const notes = [
    `Concentration: ${(concentration * 100).toFixed(1)}% in largest position.`,
    `Volatility indicator: ${(volatilityProxy * 100).toFixed(1)}% average deviation from buy price.`,
    `PnL trend: ${pnlPct >= 0 ? "+" : ""}${pnlPct.toFixed(1)}% from total invested.`
  ];

  const suggestions = [];
  if (concentration > 0.5) suggestions.push("Reduce dependence on one stock by splitting new buys.");
  if (stocks.length < 3) suggestions.push("Add more stocks across sectors to improve diversification.");
  if (volatilityProxy > 0.25) suggestions.push("Set a simulated stop-loss and review entries weekly.");
  if (pnlPct < 0) suggestions.push("Average carefully or pause and reassess your thesis.");
  if (suggestions.length === 0) suggestions.push("Risk profile is healthy. Keep rebalancing monthly.");

  return { score: riskScore, level, confidence, notes, suggestions };
}

function RiskAnalysis({ stocks }) {
  const report = getRiskReport(stocks);

  const badgeClass =
    report.level === "High"
      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
      : report.level === "Medium"
      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
      : report.level === "Low"
      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
      : "bg-slate-700/40 text-slate-300 border-slate-600";

  return (
    <section className="rounded-2xl border border-fintech-line bg-fintech-card/80 p-6 shadow-soft backdrop-blur">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">AI Risk Analysis</h2>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass}`}>
          {report.level} Risk
        </span>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Risk Score</p>
          <p className="mt-1 text-2xl font-bold text-white">{report.score}/100</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Model Confidence</p>
          <p className="mt-1 text-2xl font-bold text-cyan-300">{report.confidence}</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Engine</p>
          <p className="mt-1 text-sm font-semibold text-slate-200">Smart Heuristic v1</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <p className="text-sm font-semibold text-white">Portfolio Signals</p>
          <ul className="mt-2 space-y-2 text-sm text-slate-300">
            {report.notes.map((note) => (
              <li key={note}>- {note}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <p className="text-sm font-semibold text-white">AI Recommendations</p>
          <ul className="mt-2 space-y-2 text-sm text-slate-300">
            {report.suggestions.map((tip) => (
              <li key={tip}>- {tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default RiskAnalysis;
