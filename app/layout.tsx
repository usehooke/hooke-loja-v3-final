// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Importações para Análise de Dados e Performance (Vercel e Google)
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';

// Importação para Transições de Página Fluidas entre rotas
import { ViewTransitions } from 'next-view-transitions';

// Importações dos Componentes de Layout Globais
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// NOVO: Importação do botão flutuante do WhatsApp
import WhatsAppButton from "@/components/ui/WhatsAppButton";

// Configuração da Fonte Principal (Inter)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Boa prática para carregamento de fontes
});

// --- CONSTANTES GLOBAIS ---
const baseUrl = "https://www.usehooke.com.br"; // URL OFICIAL DO SITE

// ⚠️ ATENÇÃO: Substitua pelo seu ID real do Google Analytics 4 quando o tiver.
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; 

// --- METADADOS GLOBAIS (SEO) ---
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Hooke | Moda Masculina Minimalista",
    template: "%s | Hooke", // Ex: "Camisetas | Hooke"
  },
  description: "Vista a sua essência. Moda masculina minimalista com corte premium e tecidos nobres. Algodão egípcio e design atemporal.",
  keywords: ["moda masculina", "camiseta minimalista", "roupa masculina premium", "hooke", "algodão egípcio", "slow fashion brasil"],
  
  // --- AQUI ESTAVA O ERRO (Corrigido) ---
  // Colocamos apenas o código, sem <meta> e sem aspas extras
  verification: {
    google: "F1l-lLTgz0IA50BtjKavSlVt3WTmh3DANMB5gr2bmnk",
  },
  // --------------------------------------

  icons: {
    icon: '/icon.svg', // Favicon moderno (SVG é preferível)
    shortcut: '/favicon.ico', // Fallback para navegadores antigos
  },
  openGraph: {
    title: "Hooke | Moda Masculina",
    description: "Menos excesso, mais essência. Conheça a nova coleção de básicos premium.",
    url: baseUrl,
    siteName: "Hooke Store",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/banner-home.jpg", // Imagem que aparece ao compartilhar o link
        width: 1200,
        height: 630,
        alt: "Coleção Hooke Moda Masculina Minimalista",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// --- COMPONENTE DE LAYOUT RAIZ ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased bg-hooke-50 text-hooke-900 flex flex-col min-h-screen">

        {/* Envolvemos todo o conteúdo visível com o ViewTransitions para navegação suave */}
        <ViewTransitions>
          {/* Cabeçalhos fixos */}
          <TopBar />
          <Navbar />

          {/* Área de conteúdo principal que cresce para empurrar o rodapé */}
          <main className="flex-grow w-full">
            {children}
          </main>

          {/* Botão Flutuante do WhatsApp (Fixo no canto) */}
          <WhatsAppButton />

          {/* Rodapé */}
          <Footer />
        </ViewTransitions>

        {/* Ferramentas de Análise (Carregam em segundo plano) */}
        <SpeedInsights />
        <Analytics />
        {/* Só carrega o GA se o ID estiver definido */}
        {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}

      </body>
    </html>
  );
}