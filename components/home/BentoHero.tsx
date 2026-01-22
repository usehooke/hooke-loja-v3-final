// components/home/BentoHero.tsx
import Link from "next/link";
import { ArrowRight, Sparkles, Shirt } from "lucide-react";

export default function BentoHero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        
        {/* 1. BLOCO PRINCIPAL */}
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-sm bg-hooke-900 min-h-[400px]">
           
           {/* --- CORREÇÃO AQUI --- */}
           {/* 1. Certifique-se que a imagem está na pasta 'public/products' do projeto */}
           {/* 2. O caminho começa com '/', que significa a pasta public */}
           <div className="absolute inset-0 bg-[url('/products/camiseta-vintage-beetle.jpg')] bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700" />
           {/* --------------------- */}

           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
           
           <div className="absolute bottom-8 left-8 text-white z-10">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
               <Sparkles size={14} /> Nova Coleção
             </div>
             <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
               VISTA SUA<br/>ESSÊNCIA.
             </h1>
             <p className="text-gray-300 max-w-sm mb-6 text-sm md:text-base">
               Nosso Clássico, conforto e cortes precisos. A camiseta perfeita existe.
             </p>
             <Link href="#colecao" className="inline-flex items-center gap-2 bg-white text-hooke-900 px-6 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
               Ver Loja <ArrowRight size={18} />
             </Link>
           </div>
        </div>

        {/* 2. BLOCO PRODUTO DESTAQUE */}
        <div className="md:col-span-2 bg-hooke-50 rounded-sm p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group hover:shadow-lg transition-all border border-hooke-100 min-h-[250px]">
           <div className="relative z-10 flex flex-col items-start">
             <div className="bg-hooke-900 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest mb-3">Best Seller</div>
             <h3 className="text-2xl font-bold text-hooke-900 mb-2">Vintage Beetle</h3>
             <p className="text-hooke-500 text-sm mb-6 max-w-[200px]">Em malha de algodão, Modelagem regular, Manga curta, Decote redondo </p>
             <Link href="/produto/camiseta-vintage-beetle" className="text-hooke-900 border-b-2 border-hooke-900 pb-1 text-sm font-bold uppercase tracking-wider hover:text-hooke-600 hover:border-hooke-600 transition-colors">
               Comprar Agora
             </Link>
           </div>
           
           <div className="relative mt-6 md:mt-0">
             <div className="absolute inset-0 bg-hooke-200 rounded-full blur-3xl opacity-40 group-hover:opacity-80 transition-opacity" />
             <Shirt className="text-hooke-300 w-32 h-32 rotate-12 group-hover:rotate-0 transition-transform duration-500" strokeWidth={1} />
           </div>
        </div>

        {/* 3. BLOCO LIFESTYLE */}
        <div className="bg-hooke-900 rounded-sm p-6 flex flex-col justify-between text-white relative overflow-hidden group hover:-translate-y-1 transition-transform min-h-[200px]">
           <div className="absolute inset-0 bg-gradient-to-br from-hooke-800 to-black z-0" />
           <div className="relative z-10">
             <h3 className="text-xl font-bold">Concept<br/>Store</h3>
             <p className="text-xs text-gray-400 mt-2 uppercase tracking-wider">Shopping Vautier Premium</p>
           </div>
           <div className="relative z-10 self-end bg-white/10 p-2 rounded-full group-hover:bg-white group-hover:text-hooke-900 transition-colors">
             <ArrowRight size={20} />
           </div>
        </div>

        {/* 4. BLOCO MANIFESTO */}
        <div className="bg-white border border-hooke-200 rounded-sm p-6 flex flex-col justify-center items-center text-center hover:border-hooke-900 transition-colors cursor-default min-h-[200px]">
           <p className="text-xs font-bold uppercase tracking-widest text-hooke-400 mb-2">Manifesto Hooke</p>
           <p className="text-lg font-serif italic text-hooke-900">
             "Menos excesso,<br/>mais qualidade."
           </p>
        </div>

      </div>
    </section>
  );
}