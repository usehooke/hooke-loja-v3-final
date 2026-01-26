// src/app/produto/[slug]/page.tsx
import { products } from "@/data/products";
import { notFound } from "next/navigation";

// Componentes da Loja
import AddToCartSection from "@/components/shop/AddToCartSection";
import ProductGallery from "@/components/shop/ProductGallery";
import ProductFeatures from "@/components/shop/ProductFeatures";
import RelatedProducts from "@/components/shop/RelatedProducts";
// IMPORTAÇÃO NOVA: O Grid de Detalhes (Bento)
import ProductDetailsBento from "@/components/shop/ProductDetailsBento";

// SEO e Dados Estruturados
import ProductSchema from "@/components/seo/ProductSchema";

// Função principal da página
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 mb-20">
      
      {/* SEO Invisível (Dados Estruturados para o Google) */}
      <ProductSchema product={product} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Lado Esquerdo: Galeria de Imagens */}
        <div className="w-full animate-in fade-in duration-700">
          <ProductGallery product={product} />
        </div>

        {/* Lado Direito: Informações e Compra */}
        <div className="flex flex-col gap-8 sticky top-24">
          
          {/* Título e Preço */}
          <div className="animate-in slide-in-from-bottom-4 duration-700 delay-150">
            <h1 className="text-3xl md:text-4xl font-bold text-hooke-900 uppercase tracking-wider mb-4">
              {product.name}
            </h1>
            <p className="text-2xl text-hooke-600 font-medium mb-6">
              {formatter.format(product.price)}
            </p>

            {/* --- DESCRIÇÃO & BENTO GRID --- */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-hooke-900 mb-2">Sobre a Peça</h3>
              <p className="text-hooke-600 leading-relaxed text-sm mb-6">
                {product.description}
              </p>
              
              {/* O GRID VISUAL DE ESPECIFICAÇÕES */}
              <ProductDetailsBento />
              {/* ---------------------------------- */}
            </div>
          </div>

          {/* Área de Seleção de Tamanho, Botão de Compra */}
          <AddToCartSection product={product} />

          {/* Barra de Diferenciais (Ícones de Segurança) */}
          <ProductFeatures />
          
        </div>
      </div>

      {/* Seção: Produtos Relacionados */}
      <RelatedProducts currentSlug={product.slug} />

    </main>
  );
}

// Metadados para SEO (Título e Descrição na aba do navegador)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return { title: 'Produto não encontrado' };
  
  return {
    title: `${product.name} | Hooke Moda Masculina`,
    description: `Compre ${product.name} online. ${product.description}. Frete para todo o Brasil.`,
    openGraph: {
        images: [product.imageUrl],
        title: product.name,
        description: product.description,
    }
  };
}

// Geração Estática (SSG) para performance máxima
export async function generateStaticParams() {
  if (!products || products.length === 0) {
    return [];
  }
  return products.map((product) => ({
    slug: product.slug,
  }));
}