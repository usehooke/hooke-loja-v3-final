// components/home/BrandBento.tsx
import Image from 'next/image';
import { Sprout, Ruler, Fingerprint } from "lucide-react";

export default function BrandBento() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      {/* Título */}
      <div className="text-center mb-12 animate-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-3xl font-bold text-hooke-900 uppercase tracking-wider mb-3">
          O Padrão Hooke
        </h2>
        <p className="text-hooke-500 max-w-2xl mx-auto">
          Não é apenas sobre vestir. É sobre como você se sente dentro da roupa.
        </p>
      </div>

      {/* Grid Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[500px]">

        {/* ITEM 1: Algodão (Caixa Grande) */}
        <div className="group relative overflow-hidden rounded-sm md:col-span-2 md:row-span-2 min-h-[300px] flex flex-col justify-end p-8 border border-hooke-200 transition-all hover:shadow-xl">
          <Image
            src="/produtos/camiseta-canelada-marrom-1.jpg"
            alt="Textura de tecido canelado marrom"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          <div className="relative z-20 text-white">
            <div className="bg-white/10 backdrop-blur-md w-fit p-3 rounded-sm mb-4 border border-white/10">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Algodão Premium</h3>
            <p className="text-gray-200 max-w-md text-sm md:text-base">
              Fibras mais resistentes que o algodão comum. Toque macio, não forma bolinhas e mantém a cor intensa por mais tempo.
            </p>
          </div>
        </div>

        {/* ITEM 2: Corte (Caixa Pequena Superior) */}
        <div className="group relative overflow-hidden rounded-sm p-6 border border-hooke-200 flex flex-col justify-end transition-all hover:shadow-xl min-h-[242px]">
          <Image
            src="/produtos/camiseta-vintage-fusca-offwhite-1.jpg"
            alt="Homem vestindo camiseta off-white com estampa de Fusca"
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="relative z-20 text-white">
            <div className="bg-white/20 backdrop-blur-sm w-fit p-3 rounded-full mb-4">
              <Ruler className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-bold">Modelagem Slim Comfort</h4>
            <p className="text-sm text-gray-200 mt-1">
              Ajustada no peito e braços, solta na cintura.
            </p>
          </div>
        </div>

        {/* ITEM 3: Exclusividade (Caixa Pequena Inferior) */}
        <div className="group relative overflow-hidden rounded-sm p-6 border border-hooke-900 flex flex-col justify-end transition-all hover:shadow-xl min-h-[242px]">
          <Image
            src="/produtos/camiseta-vintage-maverik-vermelha-1.jpg"
            alt="Camiseta vermelha com estampa de Maverick"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          <div className="relative z-20 text-white">
            <div className="bg-white/20 backdrop-blur-sm w-fit p-3 rounded-full mb-4">
              <Fingerprint className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-bold">Exclusividade</h4>
            <p className="text-sm text-gray-200 mt-1">
              Produção limitada. Peças únicas.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}