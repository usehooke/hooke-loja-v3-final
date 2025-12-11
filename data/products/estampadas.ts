import { Product } from "@/types";

export const camisetasEstampadas: Product[] = [
  {
    id: '1',
    name: 'Camiseta Vintage Beetle',
    description: 'Estampa clássica automotiva em algodão egípcio. Corte slim fit.',
    price: 159.90,
    category: 'camisetas-estampadas',
    secondaryImageUrl: '/produtos/regata-marrom-lisa.jpg',
    imageUrl: '/produtos/camiseta-preta-fusca.jpg', // Usando a foto nova do close
    sizes: ['P', 'M', 'G', 'GG'],
    slug: 'camiseta-vintage-beetle',
    isNew: true
  },
  // No futuro, outras camisetas estampadas entram AQUI.
];