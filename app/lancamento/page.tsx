import Image from "next/image";
import Link from "next/link";
import { Check, X, ArrowRight, ShieldCheck, Zap, Droplet, Wind, Ruler, Shirt } from "lucide-react";

export const metadata = {
  title: "A Nova Camiseta Hooke | Tech Cotton™",
  description: "Conheça a nova camiseta Hooke. É só tocar para se apaixonar. Não desbota, não precisa passar.",
};

export default function LandingPage() {
  return (
    <main className="w-full bg-white min-h-screen font-sans">
      
      {/* 1. HERO JOUSE STYLE (Texto Centralizado + Foto Gigante) */}
      <section className="w-full pt-20 pb-0 text-center bg-white">
        <div className="max-w-4xl mx-auto px-6 mb-12 animate-in slide-in-from-bottom-4 duration-1000">
          <div className="w-12 h-12 mx-auto bg-hooke-900 text-white flex items-center justify-center mb-6 rounded-none">
             <Shirt size={24} strokeWidth={1} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-hooke-900 tracking-tighter leading-tight mb-4">
            Conheça a nova <br/>
            camiseta <span className="text-gray-400">Tech Cotton.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-medium">
            É só tocar para se apaixonar.
          </p>
          
          <div className="mt-8 max-w-2xl mx-auto text-sm md:text-base text-gray-400 leading-relaxed">
            <p>
              A camiseta da Hooke é feita da fusão de fibras nobres. Seu novo tecido é incrivelmente macio e muito mais confortável do que qualquer outro tecido do mundo. Depois de provar a Hooke, você nunca mais vai querer voltar a usar camisetas comuns.
            </p>
          </div>
        </div>

        {/* FOTO HERO (Camiseta Preta Flutuando - Estilo Jouse) */}
        {/* IMPORTANTE: Para o efeito visual perfeito, use uma imagem da camiseta com fundo transparente ou muito limpo */}
        <div className="relative w-full h-[60vh] md:h-[80vh] bg-gray-50">
           <Image
             src="/produtos/camiseta-oversized-preta-premium-hooke-1.avif" // Use uma foto da camiseta sozinha, fundo limpo
             alt="Camiseta Hooke Tech"
             fill
             className="object-contain hover:scale-105 transition-transform duration-[2s]"
             priority
           />
        </div>
      </section>

      {/* 2. GRÁFICO COMPARATIVO ("Nível de Conforto") */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center uppercase tracking-tighter mb-16">
            Nível de Conforto
          </h2>

          <div className="space-y-12">
            {/* Barra Hooke (Cheia - Verde Hooke/Jouse adaptado para Hooke style se quiser, mantive verde para destaque positivo) */}
            <div>
              <div className="flex justify-between text-sm font-bold uppercase tracking-widest mb-2">
                <span className="text-hooke-900">Hooke Tech Cotton™</span>
                <span className="text-gray-400">Ultra Confortável</span>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-none">
                {/* Mantive o verde para dar o destaque de "aprovado/melhor", mas com formato reto */}
                <div className="h-full bg-green-500 w-full animate-in slide-in-from-left duration-[1.5s]"></div>
              </div>
            </div>

            {/* Barra Concorrente 1 */}
            <div>
              <div className="flex justify-between text-sm font-medium uppercase tracking-widest mb-2">
                <span className="text-gray-500">Algodão Pima</span>
                <span className="text-gray-400">Confortável</span>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-none">
                <div className="h-full bg-gray-400 w-[70%]"></div>
              </div>
            </div>

            {/* Barra Concorrente 2 */}
            <div>
              <div className="flex justify-between text-sm font-medium uppercase tracking-widest mb-2">
                <span className="text-gray-500">Algodão Comum</span>
                <span className="text-gray-400">Razoável</span>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-none">
                <div className="h-full bg-gray-300 w-[40%]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROCESSO DE PRODUÇÃO (Faixa de Imagens Full Width - Estilo Jouse Etapas) */}
      <section className="w-full">
         <div className="grid grid-cols-2 md:grid-cols-4 h-64 md:h-80">
            
            {/* Etapa 1 */}
            <div className="relative group border-r border-white/10">
               {/* Use imagens que representem cada etapa. Placeholders usados aqui. */}
               <Image src="/banner-home.jpg" alt="Campo de Algodão" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center text-white text-center p-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest mb-2">Etapa 1</span>
                  <h3 className="text-xl font-black uppercase tracking-tight">Fibras Nobres</h3>
               </div>
            </div>

            {/* Etapa 2 */}
            <div className="relative group border-r border-white/10">
               <Image src="/produtos/sobre.jpg" alt="Fiação" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center text-white text-center p-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest mb-2">Etapa 2</span>
                  <h3 className="text-xl font-black uppercase tracking-tight">Fiação Vortex</h3>
               </div>
            </div>

            {/* Etapa 3 */}
            <div className="relative group border-r border-white/10">
               <Image src="/produtos/camiseta-oversized-preta-premium-hooke-1.avif" alt="Tecelagem" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center text-white text-center p-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest mb-2">Etapa 3</span>
                  <h3 className="text-xl font-black uppercase tracking-tight">Tecelagem</h3>
               </div>
            </div>

            {/* Etapa 4 */}
            <div className="relative group">
               <Image src="/produtos/regata-canelada-verde.png" alt="Produto Final" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center text-white text-center p-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest mb-2">Etapa 4</span>
                  <h3 className="text-xl font-black uppercase tracking-tight">Hooke Premium</h3>
               </div>
            </div>

         </div>
      </section>

      {/* 4. BENEFÍCIOS (Ícone + Texto Centralizado) - Estilo Jouse */}
      <section className="w-full bg-gray-50 py-24 px-6">
         <div className="max-w-4xl mx-auto space-y-24">
            
            {/* Benefício 1: Não Desbota */}
            <div className="text-center">
               <Shirt size={48} className="mx-auto text-hooke-900 mb-6" strokeWidth={1} />
               <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">
                  Nunca Desbota.
               </h3>
               <p className="text-lg text-gray-500 font-medium mb-4">Está sempre parecendo nova.</p>
               <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
                  A camiseta Hooke preserva sua cor original e continua parecendo nova por muito tempo. Isto é possível porque o tingimento reativo ancora a cor na fibra.
               </p>
            </div>

            {/* Benefício 2: Não precisa passar */}
            <div className="text-center">
               <Zap size={48} className="mx-auto text-hooke-900 mb-6" strokeWidth={1} />
               <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">
                  Não Precisa Passar.
               </h3>
               <p className="text-lg text-gray-500 font-medium mb-4">É só lavar, secar e usar.</p>
               <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
                  A Hooke desamassa no corpo. Você ganha tempo e está sempre impecável. Bem melhor que camisetas de algodão comum que sempre ficam com marcas.
               </p>
            </div>

            {/* Benefício 3: Antiodor */}
            <div className="text-center">
               <Wind size={48} className="mx-auto text-hooke-900 mb-6" strokeWidth={1} />
               <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">
                  Proteção Antiodor.
               </h3>
               <p className="text-lg text-gray-500 font-medium mb-4">Esqueça o mau cheiro.</p>
               <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
                  O tecido Tech Cotton permite a troca de calor e evapora o suor rapidamente. Bactérias não se proliferam, e você fica seguro o dia todo.
               </p>
            </div>

            {/* Benefício 4: Caimento */}
            <div className="text-center">
               <Ruler size={48} className="mx-auto text-hooke-900 mb-6" strokeWidth={1} />
               <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">
                  Um Caimento Perfeito.
               </h3>
               <p className="text-lg text-gray-500 font-medium mb-4">Que valoriza seu corpo.</p>
               <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
                  A modelagem não marca a barriga, é ajustada nos braços e as mangas terminam no meio do bíceps. Definitivamente, o melhor caimento que você vai provar.
               </p>
            </div>

         </div>
      </section>

      {/* 5. LIFESTYLE GRID (Galeria Full Width - Estilo Jouse "Use todos os dias") */}
      <section className="w-full">
         <div className="text-center py-16 bg-white">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Use todos os dias.</h2>
            <p className="text-gray-500 text-sm uppercase tracking-widest">Em qualquer ocasião.</p>
         </div>
         
         {/* Grid de 4 fotos coladas */}
         <div className="grid grid-cols-2 md:grid-cols-4 h-[50vh] md:h-[60vh]">
            <div className="relative border-r border-white/20">
               <Image src="/banner-home.jpg" alt="Trabalho" fill className="object-cover" />
            </div>
            <div className="relative border-r border-white/20">
               <Image src="/produtos/sobre.jpg" alt="Lazer" fill className="object-cover" />
            </div>
            <div className="relative border-r border-white/20">
               <Image src="/produtos/camiseta-oversized-preta-premium-hooke-1.avif" alt="Esporte" fill className="object-cover" />
            </div>
            <div className="relative">
               <Image src="/produtos/regata-canelada-verde.png" alt="Viagem" fill className="object-cover" />
            </div>
         </div>
      </section>

      {/* 6. CTA FINAL (Kits de Venda - Visual Idêntico ao seu print, mas Sharp) */}
      <section id="comprar" className="w-full px-6 md:px-12 py-24 bg-gray-50">
        <h2 className="text-4xl md:text-6xl font-black text-center uppercase tracking-tighter mb-4">
          Escolha seu Arsenal
        </h2>
        <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-16">
          Frete Grátis para todo o Brasil nos Kits
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-center">
          
          {/* Card 1: Unitário */}
          <div className="bg-white border border-gray-200 p-8 flex flex-col items-center text-center hover:border-black transition-colors">
            <h3 className="text-lg font-bold uppercase tracking-widest mb-4">Unitário</h3>
            <p className="text-xs text-gray-400 mb-8 min-h-[40px]">Para conhecer a qualidade Hooke.</p>
            <div className="mb-8">
              <span className="text-4xl font-black text-hooke-900">R$ 69,90</span>
              <span className="block text-xs text-gray-400 mt-2">/peça</span>
            </div>
            <Link href="/produto/camiseta-oversized-black" className="w-full py-4 border-2 border-gray-100 text-xs font-bold uppercase tracking-widest hover:border-black hover:bg-black hover:text-white transition-all">
              Comprar 1 Peça
            </Link>
          </div>

          {/* Card 2: Kit 3 (Destaque - Estilo do seu print "Pack Essencial") */}
          <div className="bg-black text-white p-10 flex flex-col items-center text-center relative shadow-2xl transform scale-105 z-10 border border-black">
            <div className="absolute top-0 bg-white text-black px-4 py-1 text-[10px] font-bold uppercase tracking-widest -translate-y-1/2">
              Mais Vendido
            </div>
            <h3 className="text-xl font-bold uppercase tracking-widest mb-4 mt-2">Pack Essencial</h3>
            <p className="text-xs text-gray-300 mb-8 min-h-[40px]">O kit perfeito para a semana. 3 Cores Essenciais.</p>
            <div className="mb-8 flex flex-col">
              <span className="text-sm text-gray-500 line-through">R$ 209,70</span>
              <span className="text-5xl font-black text-white">R$ 135,00</span>
              {/* Tag de Economia Verde, como no seu print */}
              <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 mt-3 uppercase tracking-widest inline-block mx-auto">
                Economize R$ 74,00
              </span>
            </div>
            <Link href="/produto/kit-3-camisetas-oversized-premium" className="w-full py-5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              Comprar Kit de 3 <ArrowRight size={14} />
            </Link>
          </div>

          {/* Card 3: Kit 5 */}
          <div className="bg-white border border-gray-200 p-8 flex flex-col items-center text-center hover:border-black transition-colors">
            <h3 className="text-lg font-bold uppercase tracking-widest mb-4">Pack Pro</h3>
            <p className="text-xs text-gray-400 mb-8 min-h-[40px]">Renovação completa do guarda-roupa.</p>
            <div className="mb-8 flex flex-col">
              <span className="text-sm text-gray-400 line-through">R$ 349,50</span>
              <span className="text-4xl font-black text-hooke-900">R$ 290,00</span>
              <span className="text-green-600 text-[10px] font-bold mt-2 uppercase tracking-widest">
                Melhor Preço por Peça
              </span>
            </div>
            <Link href="/colecao" className="w-full py-4 border-2 border-gray-100 text-xs font-bold uppercase tracking-widest hover:border-black hover:bg-black hover:text-white transition-all">
              Montar Kit de 5
            </Link>
          </div>

        </div>
      </section>

      {/* 6. GARANTIA */}
      <section className="bg-white py-20 text-center px-6 border-t border-gray-100">
        <div className="max-w-2xl mx-auto">
           <ShieldCheck size={48} className="mx-auto text-hooke-900 mb-6" strokeWidth={1} />
           <h3 className="text-xl font-black uppercase tracking-tight mb-4">Garantia Blindada Hooke</h3>
           <p className="text-gray-500 text-sm leading-relaxed">
             Acreditamos tanto na nossa qualidade que você tem <strong>7 dias</strong> para usar. Lavou, usou e não achou a melhor camiseta da sua vida? Nós devolvemos 100% do seu dinheiro. Sem perguntas, sem letras miúdas.
           </p>
        </div>
      </section>

      {/* Sticky Bar Mobile */}
      <div className="fixed bottom-0 left-0 w-full bg-hooke-900 border-t border-gray-800 p-4 md:hidden z-50 flex items-center justify-between">
         <span className="text-white font-bold uppercase tracking-widest text-xs">Nova Coleção</span>
         <Link href="/colecao" className="bg-white text-hooke-900 px-6 py-2 text-xs font-black uppercase tracking-widest">
           Ver Loja
         </Link>
      </div>

    </main>
  );
}