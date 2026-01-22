// components/shop/AddToCartSection.tsx
"use client";

import { useState } from "react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { ShoppingBag, Check } from "lucide-react";
import SizeGuideModal from "./SizeGuideModal";
import { toast } from "sonner"; // Usando o Sonner para alertas bonitos

interface AddToCartSectionProps {
  product: Product;
}

export default function AddToCartSection({ product }: AddToCartSectionProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  
  // Pegamos a função de adicionar da store
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // 1. Validação: Obriga a escolher tamanho
    if (!selectedSize) {
      toast.error("Ops! Escolha um tamanho.", {
        description: "Precisamos saber se serve em você! 😉",
        duration: 3000,
      });
      return;
    }

    // 2. Adiciona ao carrinho (Passando Produto E Tamanho)
    addItem(product, selectedSize);

    // 3. Feedback Visual e Notificação
    setIsAdded(true);
    
    toast.success("Adicionado à sacola!", {
        description: `${product.name} (Tam: ${selectedSize})`,
        duration: 4000,
        action: {
            label: "Ver Sacola",
            // Se clicar no botão do aviso, abre a gaveta
            onClick: () => useCartStore.getState().openCart(), 
        },
    });

    // Reseta o estado do botão depois de 2 segundos
    setTimeout(() => {
        setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 delay-300">
      {/* SELEÇÃO DE TAMANHOS */}
      <div>
        <div className="flex justify-between items-end mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-hooke-900">
            Tamanhos
            </h3>
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
                    ? "bg-hooke-900 text-white border-2 border-hooke-900 scale-105 shadow-md"
                    : "bg-white text-hooke-600 border-2 border-hooke-200 hover:border-hooke-400 hover:text-hooke-900"
                  }
                `}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* BOTÃO DE AÇÃO */}
      <button
        onClick={handleAddToCart}
        disabled={!selectedSize || isAdded}
        className={`
          w-full flex items-center justify-center gap-3 px-6 py-5 rounded-sm text-base font-bold uppercase tracking-widest transition-all duration-300
          ${isAdded
             ? "bg-green-600 text-white cursor-default"
             : !selectedSize
                 ? "bg-hooke-100 text-hooke-400 cursor-not-allowed" // Desabilitado (Cinza Claro)
                 : "bg-hooke-900 text-white hover:bg-hooke-800 hover:shadow-lg active:scale-[0.98]" // Habilitado (Preto)
           }
        `}
      >
        {isAdded ? (
          <>
            <Check size={20} />
            Na Sacola!
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