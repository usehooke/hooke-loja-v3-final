// components/home/BentoHero.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ShoppingBag, Zap, Percent } from "lucide-react";
import { products } from "@/data/products";

export default function BentoHero() {
  // 1. Filtrar produtos em destaque
  const featuredProducts = products.filter((product) => product.featured);
  
  const mainProduct = featuredProducts[0];
  const bestSeller = featuredProducts[1]; // A Regata vai estar aqui
  const classicProduct = featuredProducts[2] || featuredProducts[1];

  if (!mainProduct) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        
        {/* ==============================================
            1. HERO PRINCIPAL (Esquerda - Grande) 
           ============================================== */}
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-sm bg-hooke-900 h-[500px] md:h-auto border border-hooke-900">
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
                  Lançamento
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
        
        {/* 2. MAIS VENDIDO (Direita Cima - A REGATA COM PROMOÇÃO) */}
        {bestSeller && (
          <div className="md:col-span-2 md:row-span-1 bg-white rounded-sm border-2 border-green-600 relative overflow-hidden group flex">
            
            {/* Tag de Desconto Flutuante */}
            <div className="absolute top-0 right-0 bg-green-600 text-white text-[10px] md:text-xs font-black px-3 py-1 uppercase tracking-widest z-20 rounded-bl-sm">
              Oferta Pix
            </div>

            {/* Metade Texto - FOCO NA PROMOÇÃO */}
            <div className="w-3/5 p-5 md:p-6 flex flex-col justify-center z-10">
              <span className="text-green-700 text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                 <Zap size={12} fill="currentColor"/> Oportunidade Relâmpago
              </span>
              
              <h3 className="text-lg md:text-xl font-bold text-hooke-900 leading-tight mb-1">
                Leve 4 Regatas
              </h3>
              
              <div className="flex items-center gap-2 mb-2">
                 <span className="bg-green-100 text-green-800 border border-green-200 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                   <Percent size={10} /> 15% OFF NO PIX
                 </span>
              </div>
              
              <p className="text-xs text-gray-500 mb-4 leading-tight">
                Renove o guarda-roupa. Compre 4 unidades e o desconto entra automático no checkout.
              </p>
              
              <Link href={`/produto/${bestSeller.slug}`} className="w-full md:w-fit inline-flex justify-center items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-green-700 transition-colors shadow-md animate-pulse hover:animate-none">
                GARANTIR MEU KIT <ArrowRight size={14} />
              </Link>
            </div>

            {/* Metade Imagem */}
            <div className="w-2/5 relative h-full bg-gray-50">
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

        {/* 3. O CLÁSSICO (Direita Baixo - Fusca/Maverick) */}
        {classicProduct && (
          <div className="md:col-span-2 md:row-span-1 bg-hooke-900 rounded-sm relative overflow-hidden group flex text-white border border-hooke-900">
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

             <div className="relative z-10 p-6 flex flex-col justify-center w-2/3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase">
                    Clássico Hooke
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