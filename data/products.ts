// src/data/products.ts
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: '1',
    name: 'Camiseta Vintage Beetle',
    description: 'Estampa clássica automotiva em algodão egípcio. Corte slim fit.',
    price: 159.90,
    category: 'camisetas-estampadas',
    // Verifique se o arquivo na pasta public/produtos se chama exatamente assim:
    imageUrl: '/produtos/camiseta-preta.jpg', 
    sizes: ['P', 'M', 'G', 'GG'],
    slug: 'camiseta-vintage-beetle',
    isNew: true
  },
  {
    id: '2',
    name: 'Regata Machão Earth',
    description: 'Tom terroso tendência 2025. Malha canelada com elastano.',
    price: 99.90,
    category: 'camisetas-lisas',
    // Verifique o nome deste arquivo:
    imageUrl: '/produtos/camiseta-offwhite.jpg', 
    sizes: ['M', 'G', 'GG'],
    slug: 'regata-machao-earth'
  },
  {
    id: '3',
    name: 'Regata Lifestyle Bege',
    description: 'Conforto e estilo para dias quentes. Caimento estruturado.',
    price: 119.90,
    category: 'camisetas-lisas',
    // Verifique o nome deste arquivo:
    imageUrl: '/produtos/camiseta-navy.jpg',
    sizes: ['P', 'M', 'G', 'GG'],
    slug: 'regata-lifestyle-bege'
  }
];