// components/shop/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produto/${product.slug}`} className="group">
      <div className="relative w-full overflow-hidden bg-hooke-100 rounded-sm">
        {/* Badge de Lançamento */}
        {product.isNew && (
          <span className="absolute top-2 left-2 z-10 bg-hooke-900 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            Lançamento
          </span>
        )}

        {/* Container da Imagem com Aspect Ratio fixo */}
        <div className="aspect-[3/4] relative overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay Escuro ao passar o mouse (Efeito Premium) */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          
          {/* Botão de "Adicionar Rápido" que aparece no hover (Desktop) */}
          <button className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white text-black p-3 rounded-full shadow-lg hover:bg-hooke-900 hover:text-white">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Informações do Produto */}
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium text-hooke-900 group-hover:text-hooke-500 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-hooke-500 line-clamp-1">{product.description}</p>
        <p className="text-sm font-bold text-hooke-900">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
        </p>
      </div>
    </Link>
  );
}