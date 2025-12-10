import { Product } from "@/types";

export const camisetasLisas: Product[] = [
  {
    id: '2',
    name: 'Regata Machão Earth',
    description: 'Tom terroso tendência 2025. Malha canelada com elastano.',
    price: 99.90,
    category: 'camisetas-lisas',
    imageUrl: '/produtos/hero-verde.avif', // Usando a foto nova da regata
    sizes: ['M', 'G', 'GG'],
    slug: 'regata-machao-earth'
  },
  {
    id: '3',
    name: 'Regata Lifestyle Bege',
    description: 'Conforto e estilo para dias quentes. Caimento estruturado.',
    price: 119.90,
    category: 'camisetas-lisas',
    imageUrl: '/produtos/camiseta-navy.jpg', // Mantive a antiga pois não geramos uma nova para essa
    sizes: ['P', 'M', 'G', 'GG'],
    slug: 'regata-lifestyle-bege'
  }
  // No futuro, outras lisas entram AQUI.
];