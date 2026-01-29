// components/shop/KitPromoCard.tsx
import { Zap, Percent, Check, ArrowRight } from "lucide-react";
import { Product } from "@/types";

interface KitPromoCardProps {
  product: Product;
}

export default function KitPromoCard({ product }: KitPromoCardProps) {
  // Regra: Só mostrar essa oferta para Regatas (ou mude a lógica conforme precisar)
  // Se quiser mostrar para todos, remova esse if.
  if (!product.category.includes("Regatas")) return null;

  // Cálculos do Kit (4 peças com 15% off)
  const qtdKit = 4;
  const precoUnitario = product.price;
  const totalSemDesconto = precoUnitario * qtdKit;
  const desconto = 0.15; // 15%
  const totalComDesconto = totalSemDesconto * (1 - desconto);
  const economia = totalSemDesconto - totalComDesconto;

  return (
    <div className="mt-6 w-full rounded-sm border-2 border-green-600 bg-white overflow-hidden shadow-sm animate-in slide-in-from-bottom-2 duration-700">
      
      {/* Cabeçalho da Promoção */}
      <div className="bg-green-600 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs">
          <Zap size={14} fill="currentColor" />
          Oferta Relâmpago
        </div>
        <span className="bg-white text-green-700 text-[10px] font-black px-2 py-0.5 rounded-sm">
          ATIVO AGORA
        </span>
      </div>

      {/* Corpo da Oferta */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-hooke-900 leading-tight">
              Kit {qtdKit} Peças
            </h4>
            <p className="text-xs text-gray-500">Renove o estoque da semana.</p>
          </div>
          <div className="text-right">
             <span className="block text-xs text-gray-400 line-through">
               R$ {totalSemDesconto.toFixed(2).replace('.', ',')}
             </span>
             <span className="block text-xl font-bold text-green-600">
               R$ {totalComDesconto.toFixed(2).replace('.', ',')}
             </span>
          </div>
        </div>

        {/* Vantagens (Bullets) */}
        <ul className="space-y-2 mb-5">
          <li className="flex items-center gap-2 text-xs text-hooke-600 font-medium">
            <div className="bg-green-100 p-1 rounded-full text-green-700">
               <Percent size={10} />
            </div>
            15% de Desconto aplicado no Pix
          </li>
          <li className="flex items-center gap-2 text-xs text-hooke-600 font-medium">
            <div className="bg-green-100 p-1 rounded-full text-green-700">
               <Check size={10} />
            </div>
            Frete Grátis para todo Brasil
          </li>
        </ul>

        {/* Botão de Ação */}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold uppercase tracking-widest text-xs py-3 rounded-sm flex items-center justify-center gap-2 transition-all shadow-md group">
          Adicionar Kit ao Carrinho
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
        
        <p className="text-[10px] text-center text-gray-400 mt-2">
          *O desconto será aplicado automaticamente no checkout.
        </p>
      </div>
    </div>
  );
}