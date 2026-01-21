// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Mantém as fotos dos produtos
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Adiciona permissão para o diagrama de medidas
      },
    ],
  },
};

export default nextConfig;