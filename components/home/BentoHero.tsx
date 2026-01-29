// components/home/BentoHero.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ShoppingBag, Play } from "lucide-react";
import { products } from "@/data/products";

export default function BentoHero() {
  // 1. Filtrar produtos em destaque
  // A ordem no products.ts define quem aparece onde:
  // [0] = Destaque Principal (Esquerda)
  // [1] = Mais Vendido (Direita Cima)
  // [2] = Clássico/Fusca (Direita Baixo)
  const featuredProducts = products.filter((product) => product.featured);
  
  const mainProduct = featuredProducts[0];
  const bestSeller = featuredProducts[1];
  const classicProduct = featuredProducts[2] || featuredProducts[1]; // Fallback de segurança

  // Se não tiver produto principal, não renderiza nada para não quebrar
  if (!mainProduct) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        
        {/* ==============================================
            1. HERO PRINCIPAL (Esquerda - Grande) 
           ============================================== */}
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-sm bg-hooke-900 h-[500px] md:h-auto">
           {/* FUTURO VÍDEO:
              Para colocar vídeo, substitua o componente <Image> abaixo por:
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90">
                <source src="/videos/seu-video.mp4" type="video/mp4" />
              </video>
           */}
           
           <Image
             src={mainProduct.imageUrl}
             alt={mainProduct.name}
             fill
             priority
             className="object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-700"
             sizes="(max-width: 768px) 100vw, 50vw"
           />
           
           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
           
           <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white z-20 w-full pr-6">
             <div className="flex items-center gap-2 mb-4">
                <span className="bg-white text-hooke-900 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest">
                  Novidade
                </span>
                <div className="flex text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>
             </div>

             <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight drop-shadow-lg">
               {mainProduct.name}
             </h1>
             
             {/* Preço Grande */}
             <p className="text-2xl font-light text-gray-200 mb-6">
               R$ {mainProduct.price.toFixed(2).replace('.', ',')}
             </p>

             <div className="flex gap-3">
               <Link href={`/produto/${mainProduct.slug}`} className="inline-flex items-center gap-2 bg-white text-hooke-900 px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-lg">
                 Ver Detalhes <ArrowRight size={18} />
               </Link>
             </div>
           </div>
        </div>

        {/* ==============================================
            COLUNA DA DIREITA (2 Blocos)
           ============================================== */}
        
        {/* 2. MAIS VENDIDO (Direita Cima) */}
        {bestSeller && (
          <div className="md:col-span-2 md:row-span-1 bg-white rounded-sm border border-hooke-200 relative overflow-hidden group flex">
            {/* Metade Texto */}
            <div className="w-1/2 p-6 flex flex-col justify-center z-10">
              <span className="text-hooke-500 text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                 <Star size={12} className="text-yellow-500" fill="currentColor"/> Mais Vendido
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-hooke-900 leading-none mb-2">
                {bestSeller.name}
              </h3>
              <p className="text-lg font-medium text-hooke-900 mb-4">
                R$ {bestSeller.price.toFixed(2).replace('.', ',')}
              </p>
              
              <Link href={`/produto/${bestSeller.slug}`} className="w-fit inline-flex items-center gap-2 bg-hooke-900 text-white px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-hooke-800 transition-colors">
                Comprar <ShoppingBag size={14} />
              </Link>
            </div>

            {/* Metade Imagem */}
            <div className="w-1/2 relative h-full bg-hooke-50">
               <Image 
                 src={bestSeller.imageUrl}
                 alt={bestSeller.name}
                 fill
                 className="object-cover object-center group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                 sizes="25vw"
               />
            </div>
          </div>
        )}

        {/* 3. O CLÁSSICO (Direita Baixo - Fusca) */}
        {classicProduct && (
          <div className="md:col-span-2 md:row-span-1 bg-hooke-900 rounded-sm relative overflow-hidden group flex text-white">
             {/* Imagem de Fundo com Overlay */}
             <div className="absolute inset-0 z-0">
                <Image 
                   src={classicProduct.imageUrl}
                   alt={classicProduct.name}
                   fill
                   className="object-cover object-center opacity-60 group-hover:opacity-50 transition-opacity duration-500"
                   sizes="25vw"
                 />
                 <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
             </div>

             {/* Conteúdo Sobreposto */}
             <div className="relative z-10 p-6 flex flex-col justify-center w-2/3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase">
                    Clássico
                  </span>
                  <span className="text-yellow-400 text-xs font-bold">★ 5.0</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-1">
                  {classicProduct.name}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-1">
                  {classicProduct.description}
                </p>

                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold">
                    R$ {classicProduct.price.toFixed(2).replace('.', ',')}
                  </span>
                  <Link href={`/produto/${classicProduct.slug}`} className="inline-flex items-center gap-1 border-b border-white pb-0.5 text-xs font-bold uppercase tracking-wider hover:text-gray-300 hover:border-gray-300 transition-colors">
                    Ver Produto <ArrowRight size={12} />
                  </Link>
                </div>
             </div>
          </div>
        )}

      </div>
    </section>
  );
}