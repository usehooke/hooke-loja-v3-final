// src/types/index.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  secondaryImageUrl?: string;
  category: 'camisetas-lisas' | 'camisetas-estampadas' | 'acessorios';
  imageUrl: string; // URL da foto
  sizes: string[]; // ['P', 'M', 'G', 'GG']
  isNew?: boolean; // Para destacar lançamentos
  slug: string; // Para a URL (ex: camiseta-hooke-preta)
}

export interface MenuItem {
  label: string;
  href: string;
}
