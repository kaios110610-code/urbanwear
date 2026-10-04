"use client";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, Product } from "@/lib/types";

interface CartCtx {
  items: CartItem[]; count: number; subtotal: number;
  add: (p: Product, size: string, qty: number) => void;
  setQty: (id: string, size: string, qty: number) => void;
  remove: (id: string, size: string) => void; clear: () => void;
}
const Ctx = createContext<CartCtx | null>(null);
const KEY = "urbanwear-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setItems(JSON.parse(raw)); } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {} }, [items, ready]);

  const value = useMemo<CartCtx>(() => ({
    items,
    count: items.reduce((s, i) => s + i.qty, 0),
    subtotal: items.reduce((s, i) => s + i.qty * i.price, 0),
    add: (p, size, qty) => setItems((prev) => {
      const found = prev.find((i) => i.id === p.id && i.size === size);
      if (found) return prev.map((i) => (i === found ? { ...i, qty: Math.min(10, i.qty + qty) } : i));
      return [...prev, { id: p.id, slug: p.slug, name: p.name, price: p.price, image: p.images[0], size, qty }];
    }),
    setQty: (id, size, qty) => setItems((prev) => prev.map((i) => (i.id === id && i.size === size ? { ...i, qty: Math.max(1, Math.min(10, qty)) } : i))),
    remove: (id, size) => setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size))),
    clear: () => setItems([]),
  }), [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart deve estar dentro de CartProvider");
  return c;
}
