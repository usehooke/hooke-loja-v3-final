// src/components/shop/QuickShareButton.tsx
"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface QuickShareButtonProps {
  slug: string;
}

export default function QuickShareButton({ slug }: QuickShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    // --- O PULO DO GATO ---
    // O botão está dentro de um Link principal do card.
    // Estes dois comandos impedem que, ao clicar no botão de compartilhar,
    // o site tente abrir a página do produto. Ele só executa a ação de compartilhar.
    e.preventDefault();
    e.stopPropagation();
    // ----------------------

    // Monta a URL completa do produto dinamicamente
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const fullUrl = `${origin}/produto/${slug}`;

    const shareData = {
        title: `Dá uma olhada neste produto da Hooke!`,
        url: fullUrl,
    };

    // 1. Tenta usar o compartilhamento nativo do celular
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Compartilhamento cancelado");
      }
    } else {
      // 2. Fallback para PC: copia para a área de transferência
      try {
        await navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        // Volta o ícone ao normal depois de 2 segundos
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Falha ao copiar link: ", err);
        alert('Não foi possível copiar o link automaticamente.');
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label="Compartilhar produto rapidamente"
      // Estilos: Bolinha branca, sombra suave, posicionado no canto, z-index alto para ficar sobre a imagem
      className={`
        flex items-center justify-center
        w-10 h-10 rounded-full
        bg-white/90 backdrop-blur-sm shadow-sm border border-hooke-100
        transition-all duration-200 ease-in-out
        hover:bg-hooke-900 hover:text-white hover:scale-105 hover:shadow-md
        active:scale-95
        ${copied ? 'text-green-600' : 'text-hooke-600'}
      `}
    >
      {copied ? (
        <Check size={18} className="text-green-600" />
      ) : (
        <Share2 size={18} />
      )}
    </button>
  );
}