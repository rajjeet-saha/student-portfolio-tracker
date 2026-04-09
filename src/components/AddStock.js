import React, { useState } from "react";

function AddStock({ setStocks, onLoadDemo, onClearPortfolio }) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");

  const addStock = () => {
    if (!name || !qty || !price) return;

    const newStock = {
      name,
      qty: Number(qty),
      buyPrice: Number(price),
      currentPrice: Number(price) + Math.random() * 50 // mock price
    };

    setStocks((prev) => [...prev, newStock]);

    setName("");
    setQty("");
    setPrice("");
  };

  return (
    <section className="rounded-2xl border border-fintech-line bg-fintech-card/80 p-6 shadow-soft backdrop-blur">
      <h2 className="text-xl font-semibold text-white">Add Stock</h2>
      <p className="mt-1 text-sm text-slate-300">
        Start small. Simulate your buys and learn portfolio basics.
      </p>

      <div className="mt-4 grid gap-3">
        <input
          className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
          placeholder="Stock Name (e.g. TCS)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
          placeholder="Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          type="number"
          min="1"
        />
        <input
          className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
          placeholder="Buy Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          min="0"
          step="0.01"
        />
        <button
          onClick={addStock}
          className="rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300"
        >
          Add to Portfolio
        </button>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            onClick={onLoadDemo}
            className="rounded-xl border border-indigo-400/50 bg-indigo-500/15 px-4 py-3 text-sm font-semibold text-indigo-200 transition hover:bg-indigo-500/25"
          >
            Demo Mode (Load Sample Data)
          </button>
          <button
            onClick={onClearPortfolio}
            className="rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20"
          >
            Clear Portfolio
          </button>
        </div>
      </div>
    </section>
  );
}

export default AddStock;
