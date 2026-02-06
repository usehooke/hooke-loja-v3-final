// components/shop/CartSidebar.tsx
"use client";

import { useCartStore } from "@/store/cart-store";
import { X, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Formatter criado FORA do componente para evitar recalcular a cada render
const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function CartSidebar() {
  const [isMounted, setIsMounted] = useState(false);

  // Pegar o estado do Zustand (sem dependencies que causam loops)
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const getSubTotal = useCartStore((state) => state.getSubTotal);

  // Efeito para garantir que o componente só renderize no cliente (hidratação)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Função de checkout - não usar em dependencies para evitar loops
  const handleCheckout = () => {
    const phoneNumber = "5511975902528"; // SEU NÚMERO AQUI
    const currentItems = useCartStore.getState().items; // Pegar estado atual diretamente
    const currentTotal = useCartStore.getState().getSubTotal();
    
    let message = "*NOVO PEDIDO HOOKE* 🛒\n\n";
    currentItems.forEach((item) => {
      message += `▪️ ${item.quantity}x ${item.name} | Tam: ${item.selectedSize}\n`;
      message += `   Ref: R$ ${item.price} cada\n`;
    });
    message += `\n*TOTAL DO PEDIDO: ${formatter.format(currentTotal)}*`;
    message += `\n\nOlá! Gostaria de finalizar a compra e combinar o pagamento/entrega.`;

    const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(link, "_blank");
  };

  // Não renderizar no servidor, apenas no cliente
  // Usar displaynone ao invés de retornar null para evitar problemas de hidratação
  if (!isMounted || !isOpen) {
    return <div className="hidden" />; // Renderiza um div vazio ao invés de null
  }

  return (
    <div className="fixed inset-0 z-[999] flex justify-end">
      {/* Fundo Escuro (Clica fora para fechar) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 cursor-pointer"
        onClick={closeCart}
      />

      {/* A Gaveta Lateral */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-6 border-b border-hooke-100 bg-white z-10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-hooke-900" />
            <h2 className="text-lg font-bold uppercase tracking-wider text-hooke-900">Sua Sacola</h2>
            <span className="bg-hooke-100 text-hooke-900 text-xs font-bold px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-hooke-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-hooke-500" />
          </button>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-hooke-400">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-10" />
              <p className="font-medium">Sua sacola está vazia.</p>
              <Link href="/" onClick={closeCart} className="mt-4 text-hooke-900 font-bold underline text-sm hover:text-hooke-600">
                Ver Coleção
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartItemId} className="flex gap-4 border-b border-hooke-50 pb-6 last:border-0 last:pb-0">
                {/* Imagem */}
                <div className="relative w-20 h-24 bg-hooke-50 rounded-sm overflow-hidden flex-shrink-0 border border-hooke-100">
                   <Image 
                     src={item.imageUrl} 
                     alt={item.name} 
                     fill 
                     className="object-cover"
                     sizes="(max-width: 768px) 20vw, 80px"
                   />
                </div>
                
                {/* Info do Produto */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-hooke-900 uppercase leading-tight">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-hooke-100 text-hooke-700 px-1.5 py-0.5 rounded font-bold">
                            {item.selectedSize}
                        </span>
                        <span className="text-xs text-hooke-400">x{item.quantity}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <span className="font-medium text-hooke-900">{formatter.format(item.price * item.quantity)}</span>
                    <button 
                      onClick={() => removeItem(item.cartItemId)}
                      className="text-hooke-300 hover:text-red-500 transition-colors p-1"
                      aria-label="Remover item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé (Checkout) */}
        {items.length > 0 && (
          <div className="p-6 bg-hooke-50 border-t border-hooke-100">
            <div className="flex justify-between mb-4 text-hooke-900">
              <span className="text-sm uppercase tracking-wider font-medium">Subtotal</span>
              <span className="text-xl font-bold">{formatter.format(getSubTotal())}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            >
              <MessageCircle size={20} /> Finalizar Pedido
            </button>
            
            <p className="text-[10px] text-center text-hooke-400 mt-3 leading-tight">
              O pagamento e o frete serão calculados e combinados diretamente no WhatsApp da Hooke.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}