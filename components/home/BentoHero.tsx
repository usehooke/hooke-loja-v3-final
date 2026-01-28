// components/home/BentoHero.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { products } from "@/data/products"; // 1. Importar os dados

export default function BentoHero() {
  // 2. Filtrar produtos em destaque
  const featuredProducts = products.filter((product) => product.featured);
  const mainProduct = featuredProducts[0];
  const secondaryProduct = featuredProducts[1];

  // 3. Garantir que temos pelo menos um produto antes de renderizar
  if (!mainProduct) {
    // Pode retornar um banner genérico ou null
    return null; 
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        
        {/* 1. HERO PRINCIPAL (DINÂMICO) */}
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-sm bg-hooke-900 h-[500px] md:h-auto">
           <Image
             src={mainProduct.imageUrl} // DADO DINÂMICO
             alt={`Modelo vestindo ${mainProduct.name}`} // DADO DINÂMICO
             fill
             priority
             className="object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-700"
             sizes="(max-width: 768px) 100vw, 50vw"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
           <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white z-20">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
               <Sparkles size={14} /> Destaque
             </div>
             <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight drop-shadow-lg">
               {mainProduct.name}
             </h1>
             <p className="text-gray-200 max-w-sm mb-6 text-sm md:text-base font-medium hidden md:block drop-shadow-md">
               {mainProduct.description.split('.')[0]}.
             </p>
             <Link href={`/produto/${mainProduct.slug}`} className="inline-flex items-center gap-2 bg-white text-hooke-900 px-6 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-lg">
               Ver Produto <ArrowRight size={18} />
             </Link>
           </div>
        </div>

        {/* 2. PRODUTO SECUNDÁRIO (DINÂMICO) */}
        {secondaryProduct && (
          <div className="md:col-span-2 bg-white rounded-sm p-6 md:p-8 flex flex-row items-center justify-between relative overflow-hidden group hover:shadow-lg transition-all border border-hooke-200 h-[180px] md:h-auto">
            <div className="relative z-10 flex flex-col items-start justify-center h-full">
              <div className="bg-hooke-900 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest mb-2">Mais Vendido</div>
              <h3 className="text-xl md:text-2xl font-bold text-hooke-900 mb-1">{secondaryProduct.name}</h3>
              <p className="text-hooke-500 text-xs md:text-sm mb-4 max-w-[150px] leading-tight hidden md:block">{secondaryProduct.description.split('.')[0]}.</p>
              <Link href={`/produto/${secondaryProduct.slug}`} className="text-hooke-900 border-b-2 border-hooke-900 pb-0.5 text-xs md:text-sm font-bold uppercase tracking-wider hover:text-hooke-600 hover:border-hooke-600 transition-colors">
                Comprar Agora
              </Link>
            </div>
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <Image 
                src={secondaryProduct.imageUrl}
                alt={secondaryProduct.name}
                fill
                className="object-contain -rotate-12 group-hover:rotate-0 transition-transform duration-500"
                sizes="25vw"
              />
            </div>
          </div>
        )}

        {/* 3. LIFESTYLE (Estático por enquanto) */}
        <div className="hidden md:flex bg-hooke-100 rounded-sm relative overflow-hidden group min-h-[200px]">
           <Image
             src="/produtos/camiseta-vintage-fusca-preta-3.png" 
             alt="Detalhe Lifestyle"
             fill
             className="object-cover object-center opacity-90 group-hover:scale-110 transition-transform duration-700"
             sizes="25vw"
           />
           <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
           <div className="absolute bottom-4 left-4 z-20">
             <p className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-white pl-2 drop-shadow-md">
               Lifestyle
             </p>
           </div>
        </div>

        {/* 4. TEXTURA (Estático por enquanto) */}
        <div className="hidden md:flex bg-hooke-900 rounded-sm p-6 flex-col justify-end text-white relative overflow-hidden group cursor-default min-h-[200px]">
           <Image
             src="/produtos/testura-canelada-marrom-1.webp"
             alt="Zoom na textura do tecido"
             fill
             className="object-cover object-center opacity-60 group-hover:opacity-40 transition-opacity"
             sizes="25vw"
           />
           <div className="relative z-10">
             <div className="flex items-center gap-2 mb-2 text-hooke-200">
                {/* Ícone pode ser mantido ou removido */}
             </div>
             <p className="text-lg font-serif italic leading-tight drop-shadow-md">
               "Detalhes que fazem<br/>a diferença."
             </p>
           </div>
        </div>

      </div>
    </section>
  );
}