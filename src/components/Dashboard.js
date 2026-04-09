import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#22d3ee", "#38bdf8", "#818cf8", "#a78bfa", "#2dd4bf", "#f59e0b", "#f43f5e"];

function Dashboard({ stocks, onRemoveStock }) {
  let invested = 0;
  let current = 0;

  const data = stocks.map((s) => {
    invested += s.buyPrice * s.qty;
    current += s.currentPrice * s.qty;

    return {
      name: s.name,
      value: s.currentPrice * s.qty
    };
  });

  const profit = current - invested;

  return (
    <section className="rounded-2xl border border-fintech-line bg-fintech-card/80 p-6 shadow-soft backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Dashboard</h2>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
          {stocks.length} holdings
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Invested</p>
          <p className="mt-1 text-xl font-bold text-slate-100">₹{invested.toFixed(2)}</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Current</p>
          <p className="mt-1 text-xl font-bold text-slate-100">₹{current.toFixed(2)}</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Profit</p>
          <p className={`mt-1 text-xl font-bold ${profit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            ₹{profit.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_260px]">
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-slate-300">
              <tr>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Qty</th>
                <th className="px-4 py-3 font-medium">Buy</th>
                <th className="px-4 py-3 font-medium">Current</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr key={`${stock.name}-${index}`} className="border-t border-slate-800 text-slate-100">
                  <td className="px-4 py-3">{stock.name}</td>
                  <td className="px-4 py-3">{stock.qty}</td>
                  <td className="px-4 py-3">₹{stock.buyPrice.toFixed(2)}</td>
                  <td className="px-4 py-3">₹{stock.currentPrice.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onRemoveStock(index)}
                      className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/20"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
          <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">Portfolio Mix</p>
          {data.length === 0 ? (
            <p className="mt-10 text-center text-sm text-slate-400">Add stocks to view chart</p>
          ) : (
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={300} height={300}>
                  <Pie data={data} dataKey="value" outerRadius={80} label>
                    {data.map((entry, index) => (
                      <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `₹${Number(val).toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
