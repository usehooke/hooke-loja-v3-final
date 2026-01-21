// components/cart/CartSheet.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";

import { useCartStore } from "@/store/cart-store";

export default function CartSheet() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const { items, removeItem, updateQuantity, getSubTotal, getTotalItems } = useCartStore();

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const subtotal = getSubTotal();
  const totalItems = getTotalItems();

  // --- CONFIGURAÇÃO DO WHATSAPP ---
  // ⚠️ SUBSTITUA PELO SEU NÚMERO REAL (DDI + DDD + Número, só dígitos)
  // Exemplo: 5511999998888
  const whatsappNumber = "5511975902528"; 
  // --------------------------------

  // --- FUNÇÃO QUE GERA O LINK DO ZAP ---
  const handleWhatsAppCheckout = () => {
    // 1. Início da mensagem
    let message = "*Olá, Hooke!* Gostaria de finalizar o seguinte pedido:\n\n";

    // 2. Loop pelos itens do carrinho para montar a lista
    items.forEach((item) => {
        const itemTotal = formatter.format(item.price * item.quantity);
        // Nota sobre tamanhos: Como nosso carrinho MVP atual não separa itens por tamanho selecionado,
        // usamos o primeiro tamanho disponível (item.sizes[0]) apenas como referência na mensagem.
        // O atendente deverá confirmar os tamanhos exatos no chat.
        const sizeRef = item.sizes[0] || 'Único';

        message += `- ${item.quantity}x ${item.name} (Ref. Tam: ${sizeRef}) - ${itemTotal}\n`;
    });

    // 3. Adiciona o total e rodapé
    message += `\n*Total estimado: ${formatter.format(subtotal)}*`;
    message += "\n\nAguardo retorno para combinar pagamento e envio.";

    // 4. Codifica a mensagem para URL (transforma espaços em %20, etc.)
    const encodedMessage = encodeURIComponent(message);

    // 5. Monta o link final e abre em nova aba
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };
  // ------------------------------------

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative p-2 text-hooke-600 hover:text-hooke-900 transition-colors">
          <ShoppingBag size={24} />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col bg-white p-0">
        <SheetHeader className="px-6 py-4 border-b border-hooke-100 flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-bold text-hooke-900">Seu Carrinho</SheetTitle>
           <SheetClose className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-hooke-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-hooke-100 data-[state=open]:text-hooke-500">
            <X className="h-6 w-6" />
            <span className="sr-only">Fechar</span>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="bg-hooke-50 p-6 rounded-full">
                 <ShoppingBag size={48} className="text-hooke-300" />
              </div>
              <h3 className="text-lg font-medium text-hooke-900">Sua sacola está vazia</h3>
              <p className="text-sm text-hooke-500 max-w-xs">
                Que tal dar uma olhada nas novidades da coleção?
              </p>
               <SheetClose asChild>
                  <button className="mt-4 bg-hooke-900 text-white px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-hooke-800 transition-colors">
                      Continuar Comprando
                  </button>
               </SheetClose>
            </div>
          ) : (
            <ul className="space-y-8">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="relative aspect-[4/5] w-24 flex-shrink-0 overflow-hidden rounded-sm bg-hooke-100 border border-hooke-200">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-base font-bold text-hooke-900">
                           <a href={`/produto/${item.slug}`} className="hover:underline">{item.name}</a>
                        </h3>
                        <p className="mt-1 text-sm text-hooke-500">Tamanho: {item.sizes[0]}</p>
                      </div>
                      <p className="text-base font-bold text-hooke-900 text-right">
                        {formatter.format(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="flex items-end justify-between text-sm">
                      <div className="flex items-center border border-hooke-200 rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 text-hooke-500 hover:text-hooke-900 disabled:opacity-50 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 font-medium text-hooke-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                           className="p-2 text-hooke-500 hover:text-hooke-900 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 size={16} />
                        <span>Remover</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t border-hooke-100 px-6 py-6 sm:justify-center">
            <div className="w-full flex flex-col gap-4">
              <div className="flex justify-between text-base font-bold text-hooke-900 uppercase tracking-wider">
                <p>Subtotal</p>
                <p>{formatter.format(subtotal)}</p>
              </div>
              <p className="mt-0.5 text-sm text-hooke-500 text-center">
                Frete e impostos calculados no checkout.
              </p>
              
              {/* --- BOTÃO DE CHECKOUT WHATSAPP --- */}
              {/* Usamos SheetClose para fechar a gaveta ao clicar */}
              <SheetClose asChild>
                <button 
                  onClick={handleWhatsAppCheckout} // Chama a nova função do Zap
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-green-700 transition-colors"
                >
                  {/* Ícone do WhatsApp (SVG simples) */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="pb-0.5"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.637 3.891 1.685 5.677l-1.073 3.92 3.877-1.296zm4.908-12.981c-.613-.306-3.588-1.78-4.022-1.987-.435-.206-.748-.312-1.06.157-.313.47-1.204 1.518-1.476 1.833-.271.314-.541.354-1.154.047-3.852-1.927-6.391-6.596-6.808-7.319-.199-.346.017-.53.301-.813.229-.229.51-.599.765-.902.256-.301.34-.515.511-.859.17-.345.085-.647-.043-.905-.127-.258-1.06-2.574-1.456-3.522-.386-.927-.775-.799-1.06-.815-.269-.015-.577-.017-.885-.017-.307 0-.807.116-1.228.579-.422.462-1.608 1.571-1.608 3.832 0 2.261 1.644 4.449 1.872 4.756.229.307 3.239 4.95 7.85 6.944 4.611 1.994 4.611 1.331 5.434 1.248.823-.084 2.647-1.083 3.019-2.128.373-1.046.373-1.943.261-2.13-.112-.187-.413-.299-1.026-.605z"/></svg>
                  Finalizar no WhatsApp
                </button>
              </SheetClose>
              {/* ------------------------------------ */}

              <SheetClose asChild>
                <button className="w-full text-hooke-900 text-sm font-bold underline hover:text-hooke-600 transition-colors text-center">
                    Ou continue comprando
                </button>
              </SheetClose>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}