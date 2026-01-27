// components/home/BrandBento.tsx
import { Shirt, Sprout, Ruler, Fingerprint } from "lucide-react";

export default function BrandBento() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12 animate-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-3xl font-bold text-hooke-900 uppercase tracking-wider mb-3">
          O Padrão Hooke
        </h2>
        <p className="text-hooke-500 max-w-2xl mx-auto">
          Não é apenas sobre vestir. É sobre como você se sente dentro da roupa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[500px]">
        
        {/* ITEM 1: O Destaque */}
        <div className="group relative overflow-hidden rounded-sm bg-hooke-900 md:col-span-2 md:row-span-2 min-h-[300px] flex flex-col justify-end p-8 border border-hooke-200 transition-all hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
          
          {/* --- Imagem de Textura de Fundo --- */}
          <div className="absolute inset-0 bg-[url('/products/fabric-texture.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60" />
          {/* --------------------------------- */}
          
          <div className="relative z-20 text-white">
            <div className="bg-white/10 backdrop-blur-md w-fit p-3 rounded-sm mb-4 border border-white/10">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Algodão Egípcio Certificado</h3>
            <p className="text-gray-200 max-w-md">
              Fibras 4x mais resistentes que o algodão comum. Toque gelado, não forma bolinhas e mantém a cor preta intensa por anos.
            </p>
          </div>
        </div>

        {/* ITEM 2: Corte */}
        <div className="group rounded-sm bg-white p-6 border border-hooke-200 flex flex-col justify-between transition-all hover:border-hooke-900 hover:-translate-y-1">
          <div className="bg-hooke-50 w-fit p-3 rounded-sm">
            <Ruler className="w-6 h-6 text-hooke-900" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-hooke-900 mt-4">Modelagem Slim Comfort</h4>
            <p className="text-sm text-hooke-500 mt-1">Ajustada no peito e braços, solta na cintura. Esconde o que precisa.</p>
          </div>
        </div>

        {/* ITEM 3: Exclusividade */}
        <div className="group rounded-sm bg-hooke-900 p-6 border border-hooke-900 flex flex-col justify-between text-white transition-all hover:shadow-xl hover:-translate-y-1">
          <div className="bg-white/10 w-fit p-3 rounded-sm">
            <Fingerprint className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-bold mt-4">Exclusividade</h4>
            <p className="text-sm text-gray-400 mt-1">Produção limitada. Quem tem Hooke, sabe que está vestindo algo único.</p>
          </div>
        </div>

      </div>
    </section>
  );
}