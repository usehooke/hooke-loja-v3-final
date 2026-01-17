import { products } from "@/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";
// ShareButton removido temporariamente para teste de celular

// Esta função diz ao Next.js quais produtos existem para criar as páginas
export async function generateStaticParams() {
  if (!products || products.length === 0) {
    return [];
  }
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return { title: 'Produto não encontrado' };
  return {
    title: `${product.name} | Hooke`,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  // Busca o produto pelo slug (o nome que está na URL)
  const product = products.find((p) => p.slug === params.slug);
  
  // Se não achar o produto, dá 404 (isso é o correto se o produto não existir)
  if (!product) notFound();

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Lado Esquerdo: Imagem */}
        <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden bg-hooke-100 shadow-sm">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Lado Direito: Informações */}
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-hooke-900 uppercase tracking-wider mb-4">
              {product.name}
            </h1>
            <p className="text-2xl text-hooke-600 font-medium mb-6">
              {formatter.format(product.price)}
            </p>

            {/* BOTÃO REMOVIDO AQUI PARA TESTE DE ESTABILIDADE */}
            <div className="mb-8 p-4 bg-gray-100 rounded text-gray-500 text-sm text-center">
              (Botão de compartilhar desativado temporariamente para teste)
            </div>

            <div className="prose prose-hooke">
              <h3 className="text-sm font-bold uppercase tracking-wider text-hooke-900 mb-2">Detalhes</h3>
              <p className="text-hooke-600 leading-relaxed">{product.description}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-hooke-900 mb-4">Tamanhos Disponíveis</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <div key={size} className="w-12 h-12 flex items-center justify-center border-2 border-hooke-200 rounded-sm text-hooke-600 font-bold">
                  {size}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}