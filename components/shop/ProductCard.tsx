// components/shop/ProductCard.tsx
import { Product } from "@/types";
import Image from "next/image";
import { Link } from 'next-view-transitions';
import QuickShareButton from "./QuickShareButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Link href={`/produto/${product.slug}`} className="group block relative">
      <div className="flex flex-col gap-4">
        
        {/* Container da Imagem */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-hooke-100">
          
          {/* IMAGEM PRINCIPAL */}
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            // --- ATUALIZAÇÃO: VIEW TRANSITION ---
            // Damos um nome único para a imagem baseado no slug do produto.
            // Isso permite que o navegador conecte esta imagem com a da próxima página.
            style={{ viewTransitionName: `image-${product.slug}` } as React.CSSProperties}
            // -----------------------------------
            className={`object-cover object-center transition-all duration-700 ${
              product.secondaryImageUrl ? "group-hover:opacity-0" : "group-hover:scale-105"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* IMAGEM SECUNDÁRIA */}
          {product.secondaryImageUrl && (
            <Image
              src={product.secondaryImageUrl}
              alt={`${product.name} vista secundária`}
              fill
              className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {/* BOTÃO DE COMPARTILHAR */}
          <div className="absolute top-3 right-3 z-20">
            <QuickShareButton slug={product.slug} />
          </div>

          {/* Badge de Lançamento */}
          {product.isNew && (
            <div className="absolute top-2 left-2 bg-hooke-900 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 z-10">
              Lançamento
            </div>
          )}
        </div>

        {/* Informações do Produto */}
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold text-hooke-900 uppercase tracking-wider group-hover:text-hooke-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-hooke-500 font-medium">
            {formatter.format(product.price)}
          </p>
          <p className="text-xs text-hooke-400">
            {product.sizes.join(" · ")}
          </p>
        </div>
      </div>
    </Link>
  );
}