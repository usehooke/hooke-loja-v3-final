// components/home/BentoHero.tsx
import Link from "next/link";
import { ArrowRight, Sparkles, Shirt, ZoomIn } from "lucide-react";

export default function BentoHero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        
        {/* 1. HERO PRINCIPAL (Foto do Dono/Modelo) */}
        {/* FIX MOBILE: h-[500px] para ocupar a tela certa no celular */}
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-sm bg-hooke-900 h-[500px] md:h-auto">
           
           {/* --- CORREÇÃO DO CAMINHO --- */}
           {/* Agora aponta para a pasta public do servidor, não para o seu C: */}
           <div className="absolute inset-0 bg-[url('/products/camiseta-vintage-beetle.jpg')] bg-cover bg-center opacity-90 group-hover:scale-105 transition-transform duration-700" />
           {/* --------------------------- */}

           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
           
           <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white z-10">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
               <Sparkles size={14} /> Nova Coleção
             </div>
             <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
               VISTA SUA<br/>ESSÊNCIA.
             </h1>
             {/* Esconde texto no mobile para limpar a tela */}
             <p className="text-gray-200 max-w-sm mb-6 text-sm md:text-base font-medium hidden md:block">
               Nosso Clássico. Conforto e cortes precisos.<br/>A camiseta perfeita existe.
             </p>
             <Link href="#colecao" className="inline-flex items-center gap-2 bg-white text-hooke-900 px-6 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-lg">
               Ver Loja <ArrowRight size={18} />
             </Link>
           </div>
        </div>

        {/* 2. PRODUTO DESTAQUE (Direita Topo) */}
        <div className="md:col-span-2 bg-white rounded-sm p-6 md:p-8 flex flex-row items-center justify-between relative overflow-hidden group hover:shadow-lg transition-all border border-hooke-200 h-[180px] md:h-auto">
           <div className="relative z-10 flex flex-col items-start justify-center h-full">
             <div className="bg-hooke-900 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest mb-2">Best Seller</div>
             <h3 className="text-xl md:text-2xl font-bold text-hooke-900 mb-1">Vintage Beetle</h3>
             <p className="text-hooke-500 text-xs md:text-sm mb-4 max-w-[150px] leading-tight hidden md:block">Algodão Egípcio Premium. O toque que vicia.</p>
             <Link href="/produto/camiseta-vintage-beetle" className="text-hooke-900 border-b-2 border-hooke-900 pb-0.5 text-xs md:text-sm font-bold uppercase tracking-wider hover:text-hooke-600 hover:border-hooke-600 transition-colors">
               Comprar Agora
             </Link>
           </div>
           
           <div className="relative">
             <div className="absolute inset-0 bg-hooke-100 rounded-full blur-2xl opacity-50" />
             <Shirt className="text-hooke-800 w-24 h-24 md:w-32 md:h-32 -rotate-12 group-hover:rotate-0 transition-transform duration-500" strokeWidth={1} />
           </div>
        </div>

        {/* 3. BLOCO LIFESTYLE (Baixo Esquerda) */}
        {/* FIX MOBILE: Adicionado 'hidden md:flex' para sumir no celular e não atrapalhar o scroll */}
        <div className="hidden md:flex bg-hooke-100 rounded-sm relative overflow-hidden group min-h-[200px]">
           {/* Se não tiver a foto 'beetle-lifestyle.jpg' ainda, ele vai ficar cinza elegante */}
           <div className="absolute inset-0 bg-[url('/products/beetle-lifestyle.jpg')] bg-cover bg-center opacity-90 group-hover:scale-110 transition-transform duration-700" />
           <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
           
           <div className="absolute bottom-4 left-4 z-10">
             <p className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-white pl-2">
               Lifestyle
             </p>
           </div>
        </div>

        {/* 4. BLOCO TEXTURA/QUALIDADE (Baixo Direita) */}
        {/* FIX MOBILE: 'hidden md:flex' para sumir no celular. Transformado em FOTO DE TEXTURA */}
        <div className="hidden md:flex bg-hooke-900 rounded-sm p-6 flex-col justify-end text-white relative overflow-hidden group cursor-default min-h-[200px]">
           <div className="absolute inset-0 bg-[url('/products/fabric-texture.jpg')] bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity" />
           
           <div className="relative z-10">
             <div className="flex items-center gap-2 mb-2 text-hooke-200">
                <ZoomIn size={16} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Zoom In</span>
             </div>
             <p className="text-lg font-serif italic leading-tight">
               "Detalhes que fazem<br/>a diferença."
             </p>
           </div>
        </div>

      </div>
    </section>
  );
}