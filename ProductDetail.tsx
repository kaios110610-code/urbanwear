"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { brl } from "@/lib/format";
import ProductImage from "./ProductImage";

export default function ProductDetail({ product: p }: { product: Product }) {
  const { add } = useCart();
  const router = useRouter();
  const [img, setImg] = useState(0);
  const [size, setSize] = useState(p.sizes.length === 1 ? p.sizes[0] : "");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  const submit = (goCart: boolean) => {
    if (!size) return setError(true);
    add(p, size, qty);
    if (goCart) return router.push("/carrinho");
    setAdded(true); setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-2">
      <div className="space-y-3">
        <ProductImage src={p.images[img]} alt={p.name} className="aspect-[4/5] w-full object-cover" />
        <div className="flex gap-3">
          {p.images.map((src, i) => (
            <button key={i} onClick={() => setImg(i)} aria-label={`Imagem ${i + 1}`} className={`h-20 w-16 overflow-hidden border-2 ${i === img ? "border-ink" : "border-transparent"}`}>
              <ProductImage src={src} alt={p.name} className="h-full w-full object-cover" />
            </button>))}
        </div>
      </div>
      <div>
        <p className="text-sm text-neutral-500">{p.category}</p>
        <h1 className="mt-1 font-display text-4xl uppercase">{p.name}</h1>
        <p className="mt-3 text-3xl font-bold">{brl(p.price)}</p>
        <p className="text-sm text-neutral-500">ou 3x de {brl(p.price / 3)} sem juros</p>
        <p className="mt-6 max-w-prose text-neutral-700">{p.description}</p>

        <p className="mb-2 mt-8 text-sm font-semibold">Tamanho {error && <span className="font-normal text-red-600">— escolha um tamanho</span>}</p>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Tamanho">
          {p.sizes.map((s) => (
            <button key={s} role="radio" aria-checked={size === s} onClick={() => { setSize(s); setError(false); }}
              className={`min-w-12 border px-4 py-2 text-sm font-semibold transition ${size === s ? "border-ink bg-ink text-white" : "border-neutral-300 hover:border-ink"}`}>{s}</button>))}
        </div>

        <p className="mb-2 mt-6 text-sm font-semibold">Quantidade</p>
        <div className="inline-flex items-center border border-neutral-300">
          <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Diminuir" className="h-11 w-11 text-lg">−</button>
          <span className="w-10 text-center font-semibold" aria-live="polite">{qty}</span>
          <button onClick={() => setQty(Math.min(10, qty + 1))} aria-label="Aumentar" className="h-11 w-11 text-lg">+</button>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button onClick={() => submit(false)} className="border border-ink py-4 font-bold transition hover:bg-ink hover:text-white">{added ? "Adicionado ✓" : "Adicionar ao carrinho"}</button>
          <button onClick={() => submit(true)} className="bg-lime py-4 font-bold transition hover:brightness-110">Comprar agora</button>
        </div>
      </div>
    </div>
  );
}
