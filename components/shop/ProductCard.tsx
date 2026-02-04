// components/shop/ProductCard.tsx
import { Product } from "@/types";
import Image from "next/image";
import { Link } from 'next-view-transitions'; // Mantendo sua transição suave
import QuickShareButton from "./QuickShareButton";
import { ShoppingBag, Star, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Lógica Tech: Calcula a parcela automaticamente
  const parcelas = 3;
  const valorParcela = (product.price / parcelas).toFixed(2).replace('.', ',');
  const precoFormatado = product.price.toFixed(2).replace('.', ',');

  return (
    <Link 
      href={`/produto/${product.slug}`} 
      className="group relative block w-full aspect-[3/4] overflow-hidden rounded-md bg-hooke-100 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
    >
      
      {/* --- 1. IMAGEM DO PRODUTO --- */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          // Mantendo a transição de visualização suave entre páginas
          style={{ viewTransitionName: `image-${product.slug}` } as React.CSSProperties}
          className="object-cover object-center transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradiente Fundo para leitura do texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      </div>

      {/* --- 2. BOTÕES DE AÇÃO SUPERIOR --- */}
      <div className="absolute top-3 right-3 z-30 flex flex-col gap-2">
         {/* Botão de Share (Original) */}
        <div className="bg-white/10 backdrop-blur-md rounded-full p-1 text-white hover:bg-white hover:text-hooke-900 transition-colors shadow-sm">
           <QuickShareButton slug={product.slug} />
        </div>
        {/* Botão Favorito (Visual) */}
        <button className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-colors shadow-sm">
          <Heart size={18} />
        </button>
      </div>

      {/* Badge de Lançamento/Destaque */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
        {product.isNew && (
            <span className="bg-hooke-900 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest shadow-lg rounded-sm">
              Novo
            </span>
        )}
        {product.featured && (
            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest shadow-lg animate-pulse rounded-sm">
              Destaque
            </span>
        )}
      </div>

      {/* --- 3. OVERLAY DE INFORMAÇÕES (Efeito Vidro) --- */}
      <div className="absolute bottom-0 left-0 w-full p-4 z-20 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
        
        {/* Avaliação (Prova Social) */}
        <div className="flex items-center gap-1 mb-1 opacity-90">
          <div className="flex text-yellow-400">
            <Star size={10} fill="currentColor" />
            <Star size={10} fill="currentColor" />
            <Star size={10} fill="currentColor" />
            <Star size={10} fill="currentColor" />
            <Star size={10} fill="currentColor" />
          </div>
          <span className="text-[10px] text-gray-300 font-medium">(27)</span>
        </div>

        {/* Nome do Produto */}
        <h3 className="text-white font-bold text-base leading-tight mb-1 drop-shadow-md truncate pr-4 uppercase tracking-wide">
          {product.name}
        </h3>

        {/* Preço e Parcelamento */}
        <div className="flex flex-col mb-3">
          <span className="text-xl font-bold text-white">R$ {precoFormatado}</span>
          <span className="text-[10px] text-gray-300 font-light">
            3x de R$ {valorParcela} sem juros
          </span>
        </div>

        {/* CTA (Botão de Ação) */}
        <div className="w-full bg-white text-hooke-900 font-bold uppercase tracking-widest text-xs py-3 rounded-sm flex items-center justify-center gap-2 transition-all hover:bg-green-500 hover:text-white shadow-lg cursor-pointer">
          <ShoppingBag size={14} />
          Comprar
        </div>
      </div>
    </Link>
  );
}