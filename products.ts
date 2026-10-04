import type { Category, Product } from "./types";

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;
const IMG = {
  tee: u("1521572163474-6864f9cf17ab"), tee2: u("1583743814966-8936f5b7be1a"),
  hoodie: u("1556821840-3a63f95609a7"), hoodie2: u("1620799140408-edc6dcb6d633"),
  pants: u("1542272604-787c3835535d"), jacket: u("1551028719-00167b16eac5"), cap: u("1588850561407-ed78c282e89b"),
};
const ROUPA = ["P", "M", "G", "GG"];
const p = (n: number, name: string, price: number, category: Category, img: keyof typeof IMG, alt: keyof typeof IMG,
  description: string, o: Partial<Product> = {}): Product => ({
  id: `p${n}`, slug: name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/-$/, ""),
  name, price, category, sizes: category === "Acessórios" ? ["Único"] : ROUPA, images: [IMG[img], IMG[alt]], description, ...o,
});

const PRODUCTS: Product[] = [
  p(1, "Camiseta Chaos Preta", 129.9, "Camisetas", "tee2", "tee", "Camiseta oversized em algodão pesado 220g com estampa frontal em serigrafia.", { isNew: true, featured: true }),
  p(2, "Moletom Washed Carvão", 289.9, "Moletons", "hoodie", "hoodie2", "Moletom com capuz e lavagem especial. Felpudo por dentro, caimento largo.", { featured: true, isNew: true }),
  p(3, "Calça Cargo Utility", 319.9, "Calças", "pants", "pants", "Calça cargo com bolsos laterais e ajuste na barra. Sarja resistente.", { featured: true }),
  p(4, "Camiseta Sketch Areia", 119.9, "Camisetas", "tee", "tee2", "Camiseta boxy na cor areia com ilustração desenhada à mão.", { isNew: true }),
  p(5, "Boné Urban Preto", 99.9, "Acessórios", "cap", "cap", "Boné cinco painéis com logo bordado e regulagem metálica.", { featured: true, isNew: true }),
  p(6, "Moletom Society Oliva", 279.9, "Moletons", "hoodie2", "hoodie", "Moletom oliva com bolso canguru e bordado no peito.", { isNew: true }),
  p(7, "Jaqueta Coach Noite", 399.9, "Jaquetas", "jacket", "jacket", "Jaqueta corta-vento leve com forro de malha e botões de pressão.", { featured: true }),
  p(8, "Camiseta Skull Off-White", 139.9, "Camisetas", "tee", "tee2", "Camiseta oversized com gráfico nas costas em tinta water-based."),
  p(9, "Calça Jogger Grafite", 249.9, "Calças", "pants", "pants", "Jogger em moletom leve com cordão e punho canelado."),
  p(10, "Jaqueta Bomber Urban", 459.9, "Jaquetas", "jacket", "jacket", "Bomber com ribana reforçada e bolso interno com zíper."),
  p(11, "Boné Dad Hat Areia", 89.9, "Acessórios", "cap", "cap", "Dad hat de aba curva em sarja lavada."),
  p(12, "Moletom Crew Off-White", 249.9, "Moletons", "hoodie", "hoodie2", "Moletom gola redonda básico, ideal para sobreposição."),
];

// ---- Camada de dados ----
// Na etapa 2, troque o corpo destas funções por consultas ao Supabase.
// Os componentes só dependem destas funções e dos tipos em lib/types.ts.
export async function getProducts(): Promise<Product[]> { return PRODUCTS; }
export async function getProductBySlug(slug: string): Promise<Product | undefined> { return PRODUCTS.find((x) => x.slug === slug); }
export const CATEGORIES: Category[] = ["Moletons", "Camisetas", "Calças", "Jaquetas", "Acessórios"];
