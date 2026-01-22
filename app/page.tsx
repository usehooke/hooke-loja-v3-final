// app/page.tsx
import { products } from "@/data/products"; 

// Componentes da Home
import BentoHero from "@/components/home/BentoHero"; // <--- NOVO HERO
import BrandMarquee from "@/components/ui/BrandMarquee";
import ProductCard from "@/components/shop/ProductCard";
import BrandBento from "@/components/home/BrandBento";

export default function Home() {
  return (
    <main>
      
      {/* 1. HERO BENTO (A nova vitrine moderna) */}
      <BentoHero />
      
      {/* 2. BARRA DE BENEFÍCIOS (Frete, Troca, Segurança) */}
      <BrandMarquee />
      
      {/* 3. LISTA DE PRODUTOS */}
      <section id="colecao" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-hooke-900 mb-2 uppercase tracking-wider">
            Coleção Completa
          </h2>
          <div className="h-1 w-16 bg-hooke-900 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. AUTORIDADE DA MARCA (Bloco Sobre/Tecnologia) */}
      <div className="bg-hooke-50 border-t border-hooke-100">
        <BrandBento />
      </div>

    </main>
  );
}