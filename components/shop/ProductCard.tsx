// src/components/shop/ProductCard.tsx
"use client"; // Agora o card é interativo

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { ShoppingBag, Share2, Check } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [copied, setCopied] = useState(false);

  // Função de compartilhar (igual a do botão grande, mas adaptada)
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault(); // IMPEDE de abrir a página do produto ao clicar no ícone
    e.stopPropagation(); // Garante que o clique não "vaze"

    const url = `${window.location.origin}/produto/${product.slug}`;
    const shareData = {
      title: `Hooke | ${product.name}`,
      text: product.description,
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Compartilhamento cancelado");
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Erro ao copiar", err);
      }
    }
  };

  return (
    <Link href={`/produto/${product.slug}`} className="group block relative">
      <div className="relative w-full overflow-hidden bg-hooke-100 rounded-sm">
        
        {/* Badge de Lançamento */}
        {product.isNew && (
          <span className="absolute top-2 left-2 z-20 bg-hooke-900 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            Lançamento
          </span>
        )}

        {/* --- NOVO: Botão de Compartilhar Flutuante --- */}
        <button
          onClick={handleShare}
          className="absolute top-2 right-2 z-20 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-hooke-900 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-hooke-900 hover:text-white transform hover:scale-110"
          title="Compartilhar rápido"
        >
          {copied ? <Check size={14} /> : <Share2 size={14} />}
        </button>
        {/* ------------------------------------------- */}

        {/* Container da Imagem */}
        <div className="aspect-[3/4] relative overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay Escuro */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          
          {/* Ícone de Sacola (Desktop) */}
          <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white text-black p-3 rounded-full shadow-lg hover:bg-hooke-900 hover:text-white">
            <ShoppingBag size={20} />
          </div>
        </div>
      </div>

      {/* Informações */}
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