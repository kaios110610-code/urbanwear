"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

const MAX = 500;

export default function ProductsClient({ products, categories }: { products: Product[]; categories: string[] }) {
  const params = useSearchParams();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(params.get("categoria") ?? "Todas");
  const [max, setMax] = useState(MAX);
  const onlyNew = params.get("novidades") === "1";

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter((p) =>
      (cat === "Todas" || p.category === cat) && p.price <= max && (!onlyNew || p.isNew) &&
      (!term || p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)));
  }, [products, q, cat, max, onlyNew]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-5xl uppercase">{onlyNew ? "Novidades" : "Produtos"}</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_auto] md:items-end">
        <input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder="Buscar por nome ou categoria" aria-label="Buscar produtos" className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-ink" />
        <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Categoria" className="border border-neutral-300 px-4 py-3">
          {["Todas", ...categories].map((c) => <option key={c}>{c}</option>)}
        </select>
        <label className="text-sm">Preço até <b>R$ {max}</b>
          <input type="range" min={50} max={MAX} step={10} value={max} onChange={(e) => setMax(+e.target.value)} className="block w-full accent-ink md:w-48" />
        </label>
      </div>
      <p className="mt-6 text-sm text-neutral-500">{list.length} {list.length === 1 ? "produto" : "produtos"}</p>
      {list.length ? (
        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 lg:grid-cols-4">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      ) : (
        <div className="py-20 text-center"><p className="font-semibold">Nenhum produto encontrado.</p>
          <button onClick={() => { setQ(""); setCat("Todas"); setMax(MAX); }} className="mt-4 bg-ink px-6 py-3 text-sm font-bold text-white">Limpar filtros</button></div>
      )}
    </div>
  );
}
