/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otimização de Imagens
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
    unoptimized: false,
    // Mantivemos seus tamanhos originais que cobrem até telas 4K
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // Novidade: Ajuda o navegador a guardar a imagem por mais tempo
  },

  // Performance e Segurança
  reactStrictMode: true, 
  swcMinify: true, 
  poweredByHeader: false, // Novidade: Remove o aviso "X-Powered-By: Next.js" (Segurança)

  // Limpeza (O Pulo do Gato)
  compiler: {
    // Isso remove todos os console.log do site quando ele for para o ar (fica mais rápido)
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;