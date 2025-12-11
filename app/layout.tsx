// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Importações para Análise de Dados e Performance
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';

// Importação para Transições de Página Fluidas
import { ViewTransitions } from 'next-view-transitions';

// Importações dos Componentes de Layout Globais
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Configuração da Fonte
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Constantes Globais
const baseUrl = "https://www.usehooke.com.br"; // URL OFICIAL DO SITE
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // <--- SUBSTITUA PELO SEU ID REAL DO GA4

// Metadados Globais (SEO)
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Hooke | Moda Masculina Minimalista",
    template: "%s | Hooke",
  },
  description: "Vista a sua essência. Moda masculina minimalista com corte premium e tecidos nobres.",
  keywords: ["moda masculina", "camiseta minimalista", "roupa masculina", "hooke", "algodão egípcio"],
  icons: {
    icon: '/icon.svg', // Favicon moderno
  },
  openGraph: {
    title: "Hooke | Moda Masculina",
    description: "Menos excesso, mais essência. Conheça a nova coleção.",
    url: baseUrl,
    siteName: "Hooke",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/banner-home.jpg",
        width: 1200,
        height: 630,
        alt: "Hooke Moda Masculina",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Componente de Layout Raiz
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased bg-hooke-50 text-hooke-900 flex flex-col min-h-screen`}>

        {/* Envolvemos todo o conteúdo visível com o ViewTransitions */}
        <ViewTransitions>
          <TopBar />
          <Navbar />

          {/* Área de conteúdo principal que cresce para ocupar o espaço */}
          <main className="flex-grow">
            {children}
          </main>

          <Footer />

          {/* Ferramentas de Análise (Carregadas de forma otimizada) */}
          <SpeedInsights />
          <Analytics />
          {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
        </ViewTransitions>

      </body>
    </html>
  );
}