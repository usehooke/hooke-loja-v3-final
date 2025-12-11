// src/app/page.tsx
import Hero from "@/components/layout/Hero";
import ProductCard from "@/components/shop/ProductCard";
// Importamos a lista completa de produtos
import { products } from "@/data/products"; 

export default function Home() {
  // NÃO filtramos mais. Vamos usar a lista 'products' completa diretamente.

  return (
    <main>
      <Hero />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Mudamos o título para refletir que é tudo */}
        <h2 className="text-2xl font-bold text-hooke-900 mb-8 uppercase tracking-wider">
          Coleção Completa
        </h2>
        
        {/* Grid de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Usamos 'products.map' em vez de 'featuredProducts.map' */}
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}