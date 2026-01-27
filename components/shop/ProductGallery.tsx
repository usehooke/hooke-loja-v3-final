// components/shop/ProductGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  // Garante que estamos usando a lista completa de imagens do produto, se disponível.
  const images = product.images && product.images.length > 0 ? product.images : [product.imageUrl];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
      
      {/* --- LISTA DE MINIATURAS (Thumbnails) --- */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto scrollbar-hide py-2 md:py-0 justify-center md:justify-start">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`
              relative w-20 h-24 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-200
              ${selectedImage === img 
                ? "border-hooke-900 opacity-100 ring-1 ring-hooke-900" 
                : "border-transparent opacity-70 hover:opacity-100 hover:border-hooke-300"
              }
            `}
          >
            <Image
              src={img}
              alt={`Vista ${index + 1}`}
              fill
              className="object-cover object-center"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* --- IMAGEM PRINCIPAL GRANDE --- */}
      <div className="relative aspect-[4/5] w-full bg-hooke-100 rounded-sm overflow-hidden group">
        <Image
          src={selectedImage}
          alt={product.name}
          fill
          priority
          // --- ATUALIZAÇÃO: VIEW TRANSITION ---
          // Aqui usamos O MESMO nome que usamos no Card.
          // O truque: Só aplicamos o nome se a imagem sendo vista for a imagem principal.
          style={{ 
            viewTransitionName: selectedImage === product.imageUrl ? `image-${product.slug}` : 'none' 
          } as React.CSSProperties}
          // -----------------------------------
          className="object-cover object-center transition-all duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Badge de Lançamento */}
        {product.isNew && (
            <div className="absolute top-4 left-4 bg-hooke-900 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 z-10 shadow-sm">
              Lançamento
            </div>
        )}

        {/* Efeito de Zoom no Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/2 transition-colors duration-300 pointer-events-none" />
      </div>
    </div>
  );
}