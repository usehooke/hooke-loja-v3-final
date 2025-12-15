// src/app/produto/[slug]/page.tsx
// ESTE É O CÓDIGO COMPLETO E CORRETO DA PÁGINA DO PRODUTO
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";
// A IMPORTAÇÃO ESSENCIAL DO BOTÃO:
import ShareButton from "@/components/shop/ShareButton";

// Função necessária para gerar as páginas estáticas no build
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Função para gerar o título da página (SEO)
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return { title: 'Produto não encontrado' };
  
  return {
    title: `${product.name} | Hooke`,
    description: product.description,
  };
}

// O Componente da Página Principal
export default function ProductPage({ params }: { params: { slug: string } }) {
  // Encontra o produto correto baseado na URL (slug)
  const product = products.find((p) => p.slug === params.slug);

  // Se o produto não existir, mostra página 404
  if (!product) {
    notFound();
  }

  // Formatador de preço (R$)
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* --- COLUNA DA ESQUERDA: IMAGEM --- */}
        <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden bg-hooke-100 shadow-sm">
          {/* Nota: Aqui usamos apenas a imagem principal na página de detalhes.
            A segunda imagem (hover) é usada apenas nos cards da vitrine.
          */}
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover object-center"
            priority 
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* --- COLUNA DA DIREITA: DETALHES --- */}
        <div className="flex flex-col gap-8">
          <div>
            {/* Título e Preço */}
            <h1 className="text-3xl md:text-4xl font-bold text-hooke-900 uppercase tracking-wider mb-4">
              {product.name}
            </h1>
            <p className="text-2xl text-hooke-600 font-medium mb-6">
              {formatter.format(product.price)}
            </p>

            {/* 👇👇👇 O BOTÃO DE COMPARTILHAR ESTÁ AQUI 👇👇👇 
              Se este bloco de código estiver aqui, o botão TEM que aparecer.
            */}
            <div className="mb-8">
              <ShareButton 
                productName={product.name} 
                productDescription={product.description}
              />
            </div>
            
            {/* Descrição */}
            <div className="prose prose-hooke">
              <h3 className="text-sm font-bold uppercase tracking-wider text-hooke-900 mb-2">
                Detalhes
              </h3>
              <p className="text-hooke-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Seleção de Tamanhos */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-hooke-900 mb-4">
              Tamanhos Disponíveis
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <div
                  key={size}
                  className="w-12 h-12 flex items-center justify-center border-2 border-hooke-200 rounded-sm text-hooke-600 font-bold hover:border-hooke-900 hover:text-hooke-900 transition-all cursor-pointer"
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
          
          {/* Botão de Compra */}
          <button className="w-full bg-hooke-900 text-white font-bold uppercase tracking-widest py-4 px-8 rounded-sm hover:bg-hooke-800 transition-all transform active:scale-[0.99] mt-4 opacity-50 cursor-not-allowed">
            Em breve
          </button>

        </div>
      </div>
    </main>
  );
}