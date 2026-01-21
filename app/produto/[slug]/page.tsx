// app/produto/[slug]/page.tsx
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import AddToCartSection from "@/components/shop/AddToCartSection";
import ProductGallery from "@/components/shop/ProductGallery";
// 1. IMPORTAÇÃO DO SEO
import ProductSchema from "@/components/seo/ProductSchema";

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
      
      {/* 2. INSERÇÃO DO SEO (Invisível) */}
      <ProductSchema product={product} />
      {/* ----------------------------- */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Galeria de Imagens */}
        <div className="w-full animate-in fade-in duration-700">
          <ProductGallery product={product} />
        </div>

        {/* Informações e Compra */}
        <div className="flex flex-col gap-8 sticky top-24">
          <div className="animate-in slide-in-from-bottom-4 duration-700 delay-150">
            <h1 className="text-3xl md:text-4xl font-bold text-hooke-900 uppercase tracking-wider mb-4">
              {product.name}
            </h1>
            <p className="text-2xl text-hooke-600 font-medium mb-6">
              {formatter.format(product.price)}
            </p>

            <div className="prose prose-hooke mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-hooke-900 mb-2">Detalhes</h3>
              <p className="text-hooke-600 leading-relaxed">{product.description}</p>
            </div>
          </div>

          <AddToCartSection product={product} />
        </div>
      </div>
    </main>
  );
}

// Metadados para SEO (Título e Descrição que aparecem na aba do navegador)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return { title: 'Produto não encontrado' };
  
  // Melhoramos a descrição para SEO
  return {
    title: `${product.name} | Hooke Moda Masculina`,
    description: `Compre ${product.name} online. ${product.description}. Frete para todo o Brasil.`,
    // Open Graph (Para quando compartilharem no WhatsApp/Instagram)
    openGraph: {
        images: [product.imageUrl],
        title: product.name,
        description: product.description,
    }
  };
}

export async function generateStaticParams() {
  if (!products || products.length === 0) {
    return [];
  }
  return products.map((product) => ({
    slug: product.slug,
  }));
}