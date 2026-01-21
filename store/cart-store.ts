// store/cart-store.ts  <-- CAMINHO CORRIGIDO NA RAIZ
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';

// Definimos como é um item DENTRO do carrinho (o produto normal + a quantidade dele)
export interface CartItem extends Product {
  quantity: number;
}

// Definimos todas as ações que nosso carrinho pode fazer
interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  // Getters úteis para a UI saber totais
  getTotalItems: () => number;
  getSubTotal: () => number;
}

export const useCartStore = create<CartState>()(
  // O 'persist' é a mágica que salva no LocalStorage do navegador automaticamente!
  persist(
    (set, get) => ({
      items: [],

      // AÇÃO: Adicionar um item
      addItem: (product: Product) => {
        const currentItems = get().items;
        // Verifica se o produto já está no carrinho
        const existingItemIndex = currentItems.findIndex(
          (item) => item.id === product.id
        );

        if (existingItemIndex > -1) {
          // Se já existe, só aumenta a quantidade (+1)
          const newItems = [...currentItems];
          newItems[existingItemIndex].quantity += 1;
          set({ items: newItems });
        } else {
          // Se não existe, adiciona como novo item com quantidade 1
          set({ items: [...currentItems, { ...product, quantity: 1 }] });
        }
      },

      // AÇÃO: Remover um item completamente
      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      // AÇÃO: Mudar a quantidade de um item específico (ex: de 1 para 3)
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity < 1) return; // Não deixa a quantidade ser zero ou negativa
        const currentItems = get().items;
        const newItems = currentItems.map((item) =>
          item.id === productId ? { ...item, quantity: quantity } : item
        );
        set({ items: newItems });
      },

      // AÇÃO: Esvaziar tudo
      clearCart: () => set({ items: [] }),

      // GETTER: Total de itens (ex: 2 camisetas + 1 regata = 3 itens)
      getTotalItems: () => {
        // Usamos um truque para evitar erro no servidor (hidratação)
        // Se não tiver window (estamos no servidor), retorna 0.
        if (typeof window === 'undefined') return 0;

        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // GETTER: Valor total em dinheiro
      getSubTotal: () => {
         if (typeof window === 'undefined') return 0;
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'hooke-cart-storage', // Nome único para salvar no navegador
      storage: createJSONStorage(() => localStorage), // Usa o localStorage
      // Uma pequena configuração extra para evitar problemas entre servidor/cliente
      skipHydration: true,
    }
  )
);