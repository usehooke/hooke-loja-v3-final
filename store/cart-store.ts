import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';

// Definimos o item do carrinho: Produto + Quantidade + Tamanho + ID Único
export interface CartItem extends Product {
  quantity: number;
  selectedSize: string; // O tamanho escolhido (P, M, G...)
  cartItemId: string;   // ID único (Ex: "123-M") para diferenciar tamanhos diferentes do mesmo produto
}

interface CartState {
  items: CartItem[];
  isOpen: boolean; // Estado para saber se a gaveta está aberta ou fechada

  // Ações
  addItem: (product: Product, size: string) => void; // Agora exige o tamanho!
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Controle da Gaveta
  openCart: () => void;
  closeCart: () => void;
  
  // Getters
  getTotalItems: () => number;
  getSubTotal: () => number;
}

// Evitar SSR - só usar localStorage no cliente
const isBrowser = typeof window !== 'undefined';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false, // Começa fechado

      // ABRIR E FECHAR GAVETA
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      // ADICIONAR ITEM (COM TAMANHO)
      addItem: (product: Product, size: string) => {
        const currentItems = get().items;
        
        // Criamos um ID único combinando o ID do produto e o tamanho
        // Assim, Camiseta (M) é diferente de Camiseta (G)
        const uniqueId = `${product.id}-${size}`;

        const existingItemIndex = currentItems.findIndex(
          (item) => item.cartItemId === uniqueId
        );

        if (existingItemIndex > -1) {
          // Se já existe esse produto COM ESSE TAMANHO, aumenta a quantidade
          const newItems = [...currentItems];
          newItems[existingItemIndex].quantity += 1;
          set({ items: newItems, isOpen: true }); // Abre o carrinho ao adicionar
        } else {
          // Se é novo, adiciona à lista
          const newItem: CartItem = {
            ...product,
            quantity: 1,
            selectedSize: size,
            cartItemId: uniqueId,
          };
          set({ items: [...currentItems, newItem], isOpen: true }); // Abre o carrinho ao adicionar
        }
      },

      // REMOVER ITEM (Pelo ID Único)
      removeItem: (cartItemId: string) => {
        set({
          items: get().items.filter((item) => item.cartItemId !== cartItemId),
        });
      },

      // ATUALIZAR QUANTIDADE
      updateQuantity: (cartItemId: string, quantity: number) => {
        if (quantity < 1) return;
        const currentItems = get().items;
        const newItems = currentItems.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: quantity } : item
        );
        set({ items: newItems });
      },

      // LIMPAR TUDO
      clearCart: () => set({ items: [], isOpen: false }),

      // TOTAIS
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'hooke-cart-storage',
      storage: isBrowser ? createJSONStorage(() => localStorage) : undefined,
      skipHydration: false,
      version: 1,
      
      // Validar e migrar dados ao reidratar
      migrate: (persistedState: any, version: number) => {
        if (version === 0 || !persistedState) {
          return {
            items: [],
            isOpen: false,
          };
        }
        
        // Versão 1: validação de tipo
        return {
          items: Array.isArray(persistedState.items) ? persistedState.items : [],
          isOpen: typeof persistedState.isOpen === 'boolean' ? persistedState.isOpen : false,
        };
      },
    }
  )
);

// Seletor memoizado para o Navbar - evita re-renders desnecessários
export const selectCartTotalItems = (state: CartState) => {
  return state.items.reduce((total, item) => total + item.quantity, 0);
};