import Link from "next/link";
import type { Product } from "@/lib/types";
import { brl } from "@/lib/format";
import ProductImage from "./ProductImage";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/produtos/${p.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-neutral-100">
        <ProductImage src={p.images[0]} alt={p.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {p.isNew && <span className="absolute left-3 top-3 bg-lime px-2 py-1 text-xs font-bold">Novo</span>}
      </Link>
      <div className="flex flex-1 flex-col gap-1 pt-3">
        <span className="text-xs text-neutral-500">{p.category}</span>
        <h3 className="font-semibold leading-tight">{p.name}</h3>
        <p className="font-display text-xl">{brl(p.price)}</p>
        <div className="flex flex-wrap gap-1 py-1">
          {p.sizes.map((s) => <span key={s} className="border border-neutral-300 px-1.5 text-xs text-neutral-600">{s}</span>)}
        </div>
        <Link href={`/produtos/${p.slug}`} className="mt-auto border border-ink py-2 text-center text-sm font-semibold transition hover:bg-ink hover:text-white">
          Ver produto
        </Link>
      </div>
    </article>
  );
}
