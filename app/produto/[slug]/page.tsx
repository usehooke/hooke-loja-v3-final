import { products } from "@/data/products";
import { notFound } from "next/navigation";
import Image from "next/image"; 

// Componentes da Loja
import AddToCartSection from "@/components/shop/AddToCartSection";
import ProductGallery from "@/components/shop/ProductGallery"; 
import ProductFeatures from "@/components/shop/ProductFeatures";
import RelatedProducts from "@/components/shop/RelatedProducts";
import ProductDetailsBento from "@/components/shop/ProductDetailsBento";
import KitPromoCard from "@/components/shop/KitPromoCard";

// Tipagem correta para Next.js 15+ (params como Promise)
interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <main className="w-full px-6 md:px-12 py-12 md:py-16 mb-20 animate-in fade-in duration-500">
      
      {/* Grid Assimétrico: 60% Foto (Esq) / 40% Texto (Dir) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-24 items-start">
        
        {/* Lado Esquerdo: Galeria (Maior destaque visual) */}
        <div className="w-full md:col-span-3">
           <ProductGallery product={product} />
        </div>

        {/* Lado Direito: Informações e Compra (Sticky - Fixo na rolagem) */}
        <div className="w-full md:col-span-2 flex flex-col gap-8 sticky top-24">
          
          {/* Cabeçalho do Produto */}
          <div className="border-b border-gray-100 pb-6">
            {/* Título ajustado: Elegante, forte, mas não gigante */}
            <h1 className="text-2xl md:text-3xl font-bold text-hooke-900 uppercase tracking-tight mb-3 leading-tight">
              {product.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-medium">
              {formatter.format(product.price)}
            </p>
          </div>

          <div className="space-y-6">
            {/* Descrição */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-hooke-900 mb-2">Descrição</h3>
              <p className="text-hooke-600 leading-relaxed text-sm">
                {product.description}
              </p>
            </div>
            
            {/* Grid de Especificações Técnicas (Bento) */}
            <ProductDetailsBento />
          </div>

          {/* Seção de Escolha de Tamanho e Botão de Compra */}
          <AddToCartSection product={product} />

          {/* Card Promocional de Kit (Aparece se for elegível) */}
          <div className="animate-in slide-in-from-bottom-2 duration-700 delay-300">
             <KitPromoCard product={product} />
          </div>

          {/* Ícones de Diferenciais (Frete, Troca, etc) */}
          <ProductFeatures />
          
        </div>
      </div>

      {/* Seção Inferior: Produtos Relacionados */}
      <div className="mt-24 border-t border-gray-100 pt-16">
         <h2 className="text-2xl font-bold uppercase tracking-tight mb-12 text-center md:text-left">
            Você também pode gostar
         </h2>
         <RelatedProducts currentSlug={product.slug} />
      </div>

    </main>
  );
}

// --- GERAÇÃO DE METADADOS (SEO) ---
export async function generateMetadata({ params }: ProductPageProps) {
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
        type: 'website',
    }
  };
}

// --- GERAÇÃO ESTÁTICA (Performance) ---
export async function generateStaticParams() {
  if (!products || products.length === 0) {
    return [];
  }
  return products.map((product) => ({
    slug: product.slug,
  }));
}