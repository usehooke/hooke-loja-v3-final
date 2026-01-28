import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Camiseta Vintage Beetle Black",
    slug: "camiseta-vintage-fusca-preta",
    price: 159.90,
    description: "O clássico absoluto. Estampa do Fusca em silk screen de alta definição sobre algodão preto profundo. Modelagem que valoriza o peito e braços.",
    // A pasta real é 'products'
    imageUrl: "/products/camiseta-vintage-fusca-preta-1.jpg",
    images: [
      "/products/camiseta-vintage-fusca-preta-1.jpg",
      "/products/camiseta-vintage-fusca-preta-2.png", // Mantendo extensões originais
      "/products/camiseta-vintage-fusca-preta-3.png",
    ],
    sizes: ["P", "M", "G", "GG", "XG"],
    category: "Vintage",
    details: { fabric: "Algodão Egípcio", model: "Slim Fit", wash: "Pré-Encolhida" }
  },
  {
    id: "2",
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
    id: "3",
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
  {
    id: "4",
    name: "Regata Canelada Café",
    slug: "regata-canelada-marrom",
    price: 99.90,
    description: "Textura que diferencia. Malha canelada que se ajusta ao corpo sem apertar. A cor marrom café é tendência absoluta.",
    imageUrl: "/products/camiseta-Regada-canelada-marrom-1.jpg",
    images: [
      "/products/camiseta-Regada-canelada-marrom-1.jpg",
      "/products/camiseta-Regada-canelada-marrom-2.jpg",
      "/products/camiseta-Regada-canelada-marrom-3.jpg"
    ],
    sizes: ["P", "M", "G", "GG"],
    category: "Regatas",
    details: { fabric: "Malha Canelada", model: "Tank Top", wash: "N/A" }
  },
  {
    id: "5",
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
    details: { fabric: "Malha Canelada", model: "Tank Top", wash: "N/A" }
  },
  {
    id: "6",
    name: "Regata Canelada Areia",
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
    details: { fabric: "Malha Canelada", model: "Tank Top", wash: "N/A" }
  },
  {
    id: "7",
    name: "Camiseta Vintage Maverick Vermelha",
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
    id: "8",
    name: "Camiseta Vintage Kombi Freedom",
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
    id: "9",
    name: "Regata Lifestyle Bege",
    slug: "regata-lifestyle-bege",
    price: 89.90,
    description: "Básica, mas nunca simples. Corte a fio na gola e mangas para um visual despojado moderno.",
    imageUrl: "/products/regata-lifestyle-bege.jpg",
    images: ["/products/regata-lifestyle-bege.jpg"],
    sizes: ["P", "M", "G", "GG"],
    category: "Lifestyle",
    details: { fabric: "Algodão Confort", model: "Corte a Fio", wash: "Stone Washed" }
  }
];