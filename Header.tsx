"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/produtos?novidades=1", label: "Novidades" },
  { href: "/produtos?categoria=Moletons", label: "Moletons" },
  { href: "/produtos?categoria=Camisetas", label: "Camisetas" },
];

export default function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur">
      <div className="bg-ink px-4 py-2 text-center text-xs text-white">Frete grátis acima de R$ 299 · Use <b className="text-lime">STREET10</b> e ganhe 10% na primeira compra</div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 shadow-[0_1px_0_#e5e5e5]">
        <Link href="/" className="font-display text-3xl uppercase tracking-wider">UrbanWear</Link>
        <nav className="hidden gap-8 text-sm font-semibold md:flex">
          {LINKS.map((l) => <Link key={l.label} href={l.href} className="transition hover:text-neutral-500">{l.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/carrinho" aria-label={`Carrinho, ${count} itens`} className="relative flex h-10 items-center gap-2 px-3 text-sm font-semibold hover:bg-neutral-100">
            Carrinho
            <span className="grid h-5 min-w-5 place-items-center bg-lime px-1 text-xs font-bold">{count}</span>
          </Link>
          <button className="px-2 text-2xl md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu" aria-expanded={open}>{open ? "✕" : "☰"}</button>
        </div>
      </div>
      {open && (
        <nav className="grid animate-rise border-b bg-white px-4 pb-3 md:hidden">
          {LINKS.map((l) => <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="border-t py-3 font-semibold">{l.label}</Link>)}
        </nav>
      )}
    </header>
  );
}
