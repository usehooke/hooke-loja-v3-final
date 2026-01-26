// src/data/products.ts
import { Product } from "@/types";

export const products: Product[] = [
  // --- COLEÇÃO VINTAGE BEETLE (FUSCA) ---
  {
    id: "fusca-preta",
    name: "Camiseta Vintage Beetle Black",
    slug: "camiseta-vintage-fusca-preta",
    price: 159.90,
    description: "O clássico absoluto. Estampa do Fusca em silk screen de alta definição sobre algodão preto profundo. Modelagem que valoriza o peito e braços.",
    // A capa é JPG (correto)
    imageUrl: "/products/camiseta-vintage-fusca-preta-1.jpg",
    images: [
      "/products/camiseta-vintage-fusca-preta-1.jpg",
      // CORREÇÃO: As outras são PNG
      "/products/camiseta-vintage-fusca-preta-2.png",
      "/products/camiseta-vintage-fusca-preta-3.png",
    ],
    sizes: ["P", "M", "G", "GG", "XG"],
    category: "Vintage",
    details: { fabric: "Algodão Egípcio", model: "Slim Comfort", wash: "Pré-Encolhida" }
  },
  {
    id: "fusca-bordo",
    name: "Camiseta Vintage Beetle Bordô",
    slug: "camiseta-vintage-fusca-bordo",
    price: 159.90,
    description: "Elegância e atitude. O tom bordô traz sofisticação para o visual casual. Combina perfeitamente com jeans escuro.",
    imageUrl: "/products/camiseta-vintage-fusca-bordo-1.jpg",
    images: ["/products/camiseta-vintage-fusca-bordo-1.jpg"],
    sizes: ["P", "M", "G", "GG"],
    category: "Vintage",
    details: { fabric: "Algodão Egípcio", model: "Slim Comfort", wash: "Amaciada" }
  },
  {
    id: "fusca-offwhite",
    name: "Camiseta Vintage Beetle Off-White",
    slug: "camiseta-vintage-fusca-offwhite",
    price: 159.90,
    description: "Um visual limpo e clássico. A cor off-white destaca a estampa do Beetle com suavidade. Perfeita para dias de sol.",
    imageUrl: "/products/camiseta-vintage-fusca-offwhite-1.jpg",
    images: ["/products/camiseta-vintage-fusca-offwhite-1.jpg", "/products/camiseta-vintage-fusca-offwhite-4.jpg"],
    sizes: ["P", "M", "G", "GG"],
    category: "Vintage",
    details: { fabric: "Algodão Egípcio", model: "Regular Fit", wash: "Pré-Encolhida" }
  },

  // --- COLEÇÃO REGATAS CANELADAS ---
  {
    id: "regata-marrom",
    name: "Regata Canelada Coffee",
    slug: "regata-canelada-marrom",
    price: 99.90,
    description: "Textura que diferencia. Malha canelada que se ajusta ao corpo sem apertar. A cor marrom café é tendência absoluta.",
    imageUrl: "/products/camiseta-Regada-canelada-marrom-1.jpg",
    images: [
      "/products/camiseta-Regada-canelada-marrom-1.jpg",
      "/products/camiseta-Regada-canelada-marrom-m-2.jpg",
      "/products/camiseta-Regada-canelada-marrom-m-3.jpg"
    ],
    sizes: ["P", "M", "G", "GG"],
    category: "Regatas",
    details: { fabric: "Malha Canelada", model: "Machão", wash: "Stone Washed" }
  },
  {
    id: "regata-verde",
    name: "Regata Canelada Militar",
    slug: "regata-canelada-verde",
    price: 99.90,
    description: "Estilo militar urbano. Fresca, leve e com caimento impecável para o verão.",
    imageUrl: "/products/camiseta-Regada-canelada-verde-1.jpg",
    images: [
      "/products/camiseta-Regada-canelada-verde-1.jpg",
      "/products/camiseta-Regada-canelada-verde-2.jpg"
    ],
    sizes: ["P", "M", "G", "GG"],
    category: "Regatas",
    details: { fabric: "Malha Canelada", model: "Machão", wash: "Stone Washed" }
  },
  {
    id: "regata-areia",
    name: "Regata Canelada Sand",
    slug: "regata-canelada-areia",
    price: 99.90,
    description: "Tons terrosos são essenciais. Uma peça neutra que combina com bermudas de qualquer cor.",
    imageUrl: "/products/camiseta-Regada-canelada-areia-1.jpg",
    images: [
      "/products/camiseta-Regada-canelada-areia-1.jpg",
      "/products/camiseta-Regada-canelada-areia-2.jpg"
    ],
    sizes: ["P", "M", "G", "GG"],
    category: "Regatas",
    details: { fabric: "Malha Canelada", model: "Machão", wash: "Stone Washed" }
  },

  // --- COLEÇÃO CLÁSSICOS & OUTROS ---
  {
    id: "maverick-vermelha",
    name: "Camiseta Vintage Maverick Red",
    slug: "camiseta-vintage-maverick-vermelha",
    price: 159.90,
    description: "Velocidade e história. Homenagem ao lendário V8. Cor vibrante com estampa desgastada propositalmente.",
    imageUrl: "/products/camiseta-vintage-maverik-vermelha-1.jpg",
    images: ["/products/camiseta-vintage-maverik-vermelha-1.jpg"],
    sizes: ["M", "G", "GG"],
    category: "Vintage",
    details: { fabric: "Algodão Premium", model: "Regular", wash: "Amaciada" }
  },
  {
    id: "kombi-offwhite",
    name: "Camiseta Vintage Kombi",
    slug: "camiseta-vintage-kombi-offwhite",
    price: 159.90,
    description: "Para espíritos livres. A Kombi representa a viagem, não o destino. Malha leve e respirável.",
    imageUrl: "/products/camiseta-vintage-kombi-offwhite-1.jpg",
    images: ["/products/camiseta-vintage-kombi-offwhite-1.jpg"],
    sizes: ["P", "M", "G", "GG"],
    category: "Vintage",
    details: { fabric: "Algodão Egípcio", model: "Slim", wash: "Pré-Encolhida" }
  },
  {
    id: "regata-lifestyle-bege",
    name: "Regata Lifestyle Bege",
    slug: "regata-lifestyle-bege",
    price: 89.90,
    description: "Básica, mas nunca simples. Corte a fio na gola e mangas para um visual despojado moderno.",
    imageUrl: "/products/regata-lifestyle-bege.jpg",
    images: ["/products/regata-lifestyle-bege.jpg"],
    sizes: ["P", "M", "G", "GG"],
    category: "Lifestyle",
    details: { fabric: "Algodão BCI", model: "Oversized", wash: "Tingimento Ecológico" }
  }
];