export type Category = "Moletons" | "Camisetas" | "Calças" | "Jaquetas" | "Acessórios";
export interface Product {
  id: string; slug: string; name: string; price: number; category: Category;
  sizes: string[]; images: string[]; description: string; isNew?: boolean; featured?: boolean;
}
export interface CartItem { id: string; slug: string; name: string; price: number; image: string; size: string; qty: number; }
