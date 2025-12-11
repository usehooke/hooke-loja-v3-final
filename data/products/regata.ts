import { Product } from "@/types";

export const camisetasRegata: Product[] = [
  {
    id: '2',
    name: 'Regata Machão Earth',
    description: 'Tom terrosSo tendência 2025. Malha canelada com elastano.',
    price: 99.90,
    category: 'camisetas-lisas',
    secondaryImageUrl: '/produtos/regata-marrom-lisa.jpg',
    imageUrl: '/produtos/regata-marrom-canelada.jpg', // Usando a foto nova da regata
    sizes: ['M', 'G', 'GG'],
    slug: 'regata-machao-earth'
  },
  {
    id: '3',
    name: 'Regata Lifestyle Bege',
    description: 'Conforto e estilo para dias quentes. Caimento estruturado.',
    price: 119.90,
    category: 'camisetas-lisas',
    secondaryImageUrl: '/produtos/regata-marrom-canelada.jpg',
    imageUrl: '/produtos/regata-marrom-lisa.jpg', // Mantive a antiga pois não geramos uma nova para essa
    sizes: ['P', 'M', 'G', 'GG'],
    slug: 'regata-lifestyle-bege'
  }
  // No futuro, outras lisas entram AQUI.
];