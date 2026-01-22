// components/shop/RelatedProducts.tsx
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  currentSlug: string;
}

export default function RelatedProducts({ currentSlug }: RelatedProductsProps) {
  // 1. Filtra os produtos: Remove o atual e embaralha/pega os 4 primeiros
  // (Aqui pegamos os 4 primeiros diferentes do atual para simplificar)
  const related = products
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 4);

  // Se não tiver outros produtos, não mostra nada
  if (related.length === 0) return null;

  return (
    <section className="mt-20 border-t border-hooke-100 pt-16 animate-in fade-in duration-700 delay-700">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-hooke-900 uppercase tracking-wider">
          Você também pode curtir
        </h2>
        <a href="/" className="text-sm font-medium text-hooke-500 hover:text-hooke-900 underline-offset-4 hover:underline hidden sm:block">
          Ver tudo
        </a>
      </div>

      {/* Grid de Produtos Relacionados */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Botão ver tudo mobile */}
      <div className="mt-8 text-center sm:hidden">
         <a href="/" className="inline-block px-6 py-3 border border-hooke-200 text-sm font-bold uppercase tracking-wider text-hooke-900 hover:bg-hooke-50 transition-colors">
            Ver Coleção Completa
         </a>
      </div>
    </section>
  );
}