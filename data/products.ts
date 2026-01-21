// data/products.ts
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: '1',
    name: 'Camiseta Vintage Beetle',
    description: 'Estampa clássica automotiva em algodão egípcio. Corte slim fit.',
    price: 159.90,
    category: 'camisetas-estampadas',
    // Link atualizado para combinar com seu arquivo:
    imageUrl: '/produtos/camiseta-vintage-beetle.jpg', 
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
    // Link atualizado para combinar com seu arquivo:
    imageUrl: '/produtos/regata-machao-earth.jpg', 
    sizes: ['M', 'G', 'GG'],
    slug: 'regata-machao-earth'
  },
  {
    id: '3',
    name: 'Regata Lifestyle Bege',
    description: 'Conforto e estilo para dias quentes. Caimento estruturado.',
    price: 119.90,
    category: 'camisetas-lisas',
    // Link atualizado para combinar com seu arquivo:
    imageUrl: '/produtos/regata-lifestyle-bege.jpg',
    sizes: ['P', 'M', 'G', 'GG'],
    slug: 'regata-lifestyle-bege'
  }
];