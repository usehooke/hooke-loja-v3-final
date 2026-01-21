// components/QuickShareButton.tsx
"use client";

import { useState } from "react";

export default function QuickShareButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    // Impede que o clique no botão abra a página do produto (se o card for um link)
    e.preventDefault();
    e.stopPropagation();

    // Monta a URL completa do produto
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const url = `${origin}/produto/${slug}`;

    // Tenta usar o compartilhamento nativo do celular (Navigator Share API)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Dá uma olhada neste produto da Hooke!',
          url: url,
        });
      } catch (err) {
        console.log('Erro ao compartilhar ou cancelado pelo usuário:', err);
      }
    } else {
      // Fallback para computador: Copia para a área de transferência
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        // Volta o ícone ao normal depois de 2 segundos
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Falha ao copiar link: ', err);
        alert('Não foi possível copiar o link automaticamente.');
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label="Compartilhar produto rapidamente"
      className={`
        absolute top-3 right-3 z-10
        flex items-center justify-center
        w-10 h-10 rounded-full
        bg-white shadow-md
        transition-all duration-200
        hover:bg-gray-50 hover:scale-110 active:scale-95
        ${copied ? 'text-green-600 bg-green-50' : 'text-hooke-600'}
      `}
    >
      {copied ? (
        // Ícone de "Check" (Copiado com sucesso)
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ) : (
        // Ícone de Compartilhar
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
        </svg>
      )}
    </button>
  );
}