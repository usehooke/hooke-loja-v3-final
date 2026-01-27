// src/types/index.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  secondaryImageUrl?: string;
  images?: string[]; // Adicionando URLs de imagens da galeria
  sizes: string[];
  category: 'Vintage' | 'Regatas' | 'Lifestyle' | 'camisetas-lisas' | 'camisetas-estampadas' | 'acessorios';
  details?: {
    fabric: string;
    model: string;
    wash: string;
  };
  isNew?: boolean;
  slug: string;
}

export interface MenuItem {
  label: string;
  href: string;
}
