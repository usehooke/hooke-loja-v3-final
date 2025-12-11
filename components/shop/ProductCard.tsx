// src/components/shop/ProductCard.tsx
import { Product } from "@/types";
import Image from "next/image";
import { Link } from 'next-view-transitions';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Formatador de preço (R$)
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    // Adicionamos 'group' aqui para controlar o hover em tudo
    <Link href={`/produto/${product.slug}`} className="group block">
      <div className="flex flex-col gap-4">
        
        {/* Container da Imagem (com a mágica do hover) */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-hooke-100">
          
          {/* IMAGEM PRINCIPAL */}
          {/* Se tiver imagem secundária, a principal desaparece (opacity-0) no hover */}
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className={`object-cover object-center transition-all duration-700 ${
              product.secondaryImageUrl ? "group-hover:opacity-0" : "group-hover:scale-105"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* IMAGEM SECUNDÁRIA (Só renderiza se existir) */}
          {product.secondaryImageUrl && (
            <Image
              src={product.secondaryImageUrl}
              alt={`${product.name} vista secundária`}
              fill
              // Ela começa invisível (opacity-0) e aparece (opacity-100) no hover do grupo
              className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {/* Badge de Lançamento (opcional, mantive se quiser usar) */}
          {product.isNew && (
            <div className="absolute top-2 left-2 bg-hooke-900 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
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