import Link from "next/link";
export default function NotFound() {
  return (<div className="px-4 py-24 text-center"><h1 className="font-display text-5xl uppercase">Página não encontrada</h1>
    <Link href="/produtos" className="mt-8 inline-block bg-lime px-8 py-4 font-bold">Ver produtos</Link></div>);
}
