"use client";
import Link from "next/link";
import { useState } from "react";

const COLS = [
  { t: "Loja", l: [["Todos os produtos", "/produtos"], ["Moletons", "/produtos?categoria=Moletons"], ["Camisetas", "/produtos?categoria=Camisetas"], ["Calças", "/produtos?categoria=Calças"], ["Jaquetas", "/produtos?categoria=Jaquetas"]] },
  { t: "Atendimento", l: [["Trocas e devoluções", "#"], ["Entregas", "#"], ["Guia de tamanhos", "#"], ["Fale conosco", "#"]] },
  { t: "UrbanWear", l: [["Sobre nós", "#"], ["Sustentabilidade", "#"], ["Atacado", "#"]] },
];

export default function Footer() {
  const [sent, setSent] = useState(false);
  return (
    <footer className="mt-20 bg-ink text-white">
      <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mx-auto flex max-w-7xl flex-col gap-3 border-b border-white/10 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <div><p className="font-semibold">Receba os próximos lançamentos</p><p className="text-sm text-neutral-400">Novos drops e ofertas exclusivas por e-mail.</p></div>
        {sent ? <p className="font-semibold text-lime">Pronto! Você está na lista.</p> : (
          <div className="flex gap-2">
            <input required type="email" placeholder="Seu e-mail" className="w-full bg-white/10 px-4 py-3 text-sm outline-none md:w-72" />
            <button className="bg-lime px-6 text-sm font-bold text-ink">Inscrever</button>
          </div>
        )}
      </form>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
        <div><p className="font-display text-3xl uppercase tracking-wider">UrbanWear</p><p className="mt-2 max-w-xs text-sm text-neutral-400">Streetwear feito para quem cria as próprias regras.</p></div>
        {COLS.map((c) => (
          <div key={c.t}><p className="mb-3 font-semibold">{c.t}</p>
            <ul className="space-y-2 text-sm text-neutral-400">{c.l.map(([n, h]) => <li key={n}><Link href={h} className="hover:text-white">{n}</Link></li>)}</ul></div>
        ))}
      </div>
      <p className="px-4 pb-6 text-center text-xs text-neutral-500">© {new Date().getFullYear()} UrbanWear. Todos os direitos reservados.</p>
    </footer>
  );
}
