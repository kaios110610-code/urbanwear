import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = await getProductBySlug(params.slug);
  return { title: p ? `${p.name} | UrbanWear` : "Produto | UrbanWear" };
}

export default async function ProdutoPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();
  const related = (await getProducts()).filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  return (
    <>
      <ProductDetail product={product} />
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-10">
          <h2 className="mb-6 font-display text-3xl uppercase">Você também pode gostar</h2>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}
    </>
  );
}
