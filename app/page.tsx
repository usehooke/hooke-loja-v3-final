import { products } from "@/data/products"; 

import BentoHero from "@/components/home/BentoHero"; 
import BrandMarquee from "@/components/ui/BrandMarquee";
import ProductCard from "@/components/shop/ProductCard";
import BrandBento from "@/components/home/BrandBento";

export default function Home() {
  const showcaseProducts = products.slice(0, 6);

  return (
    <main className="bg-white min-h-screen">
      
      {/* 1. HERO BENTO (Full Width) */}
      <BentoHero />
      
      {/* 2. BARRA */}
      <BrandMarquee />
      
      {/* 3. LISTA DE PRODUTOS (Largura maior: px-6 md:px-12) */}
      <section id="colecao" className="py-24 px-6 md:px-12 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-hooke-500 mb-2 block font-sans">
              Shop The Look
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-hooke-900 uppercase tracking-tighter mb-4 font-sans">
              Coleção Essencial
            </h2>
          </div>
          {/* Linha decorativa mais longa */}
          <div className="h-px bg-gray-200 flex-1 mx-8 hidden md:block mb-6"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {showcaseProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. AUTORIDADE */}
      <div className="bg-hooke-50 border-t border-hooke-100">
        <BrandBento />
      </div>

    </main>
  );
}