// components/shop/AddToCartSection.tsx
"use client";

import { useState } from "react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { ShoppingBag, Check } from "lucide-react";
// Importação do Modal de Medidas
import SizeGuideModal from "./SizeGuideModal";

interface AddToCartSectionProps {
  product: Product;
}

export default function AddToCartSection({ product }: AddToCartSectionProps) {
  // Estado para guardar qual tamanho o usuário clicou
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  // Estado para um feedback visual rápido no botão após clicar
  const [isAdded, setIsAdded] = useState(false);

  // Pegamos a função de adicionar do nosso "cérebro" (store)
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // 1. Validação: Obriga a selecionar um tamanho
    if (!selectedSize) {
      alert("Por favor, selecione um tamanho.");
      return;
    }

    // 2. Adiciona ao carrinho
    addItem(product);

    // 3. Feedback visual de sucesso
    setIsAdded(true);
    // Volta o botão ao normal depois de 2 segundos
    setTimeout(() => {
        setIsAdded(false);
        // setSelectedSize(null); // Opcional: Se quiser resetar o tamanho
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 delay-300">
      {/* SELEÇÃO DE TAMANHOS */}
      <div>
        <div className="flex justify-between items-end mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-hooke-900">
            Tamanhos Disponíveis
            </h3>
            
            {/* Modal de Medidas */}
            <SizeGuideModal />
        </div>

        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`
                  w-12 h-12 flex items-center justify-center rounded-sm font-bold transition-all duration-200
                  ${isSelected
                    ? "bg-hooke-900 text-white border-2 border-hooke-900 scale-105 shadow-md" // Estilo Selecionado
                    : "bg-white text-hooke-600 border-2 border-hooke-200 hover:border-hooke-400 hover:text-hooke-900" // Estilo Normal
                  }
                `}
              >
                {size}
              </button>
            );
          })}
        </div>
         {!selectedSize && (
            <p className="text-xs text-hooke-400 mt-2">Selecione um tamanho para continuar.</p>
         )}
      </div>

      {/* BOTÃO DE ADICIONAR À SACOLA */}
      <button
        onClick={handleAddToCart}
        disabled={!selectedSize || isAdded} // Desabilita se não escolheu tamanho ou se acabou de adicionar
        className={`
          w-full flex items-center justify-center gap-3 px-6 py-5 rounded-sm text-base font-bold uppercase tracking-widest transition-all duration-300
          ${isAdded
             ? "bg-green-600 text-white cursor-default" // Estilo de Sucesso
             : !selectedSize
                 ? "bg-hooke-200 text-hooke-400 cursor-not-allowed" // Estilo Desabilitado (AQUI ESTAVA O ERRO)
                 : "bg-hooke-900 text-white hover:bg-hooke-800 hover:shadow-lg active:scale-[0.98]" // Estilo Ativo
           }
        `}
      >
        {isAdded ? (
          <>
            <Check size={20} />
            Adicionado à Sacola!
          </>
        ) : (
          <>
            <ShoppingBag size={20} />
            {selectedSize ? "Adicionar à Sacola" : "Selecione um Tamanho"}
          </>
        )}
      </button>
    </div>
  );
}