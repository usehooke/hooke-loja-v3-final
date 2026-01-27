// app/layout.tsx
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
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { Toaster } from "react-hot-toast";

// IMPORTAÇÃO NOVA: O Carrinho Lateral
import CartSidebar from "@/components/shop/CartSidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const baseUrl = "https://www.usehooke.com.br";
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; 

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Hooke | Camisetas de Algodão Egípcio e Moda Masculina Premium",
    template: "%s | Hooke Store",
  },
  description: "Encontre a camiseta perfeita. Moda masculina minimalista com corte premium e algodão egípcio sustentável.",
  keywords: [
    "moda masculina", "camisetas masculinas", "hooke", "minimalismo masculino"
  ],
  verification: {
    google: "F1l-lLTgz0IA50BtjKavSlVt3WTmh3DANMB5gr2bmnk",
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: "Hooke | Camisetas Premium e Moda Masculina",
    description: "Menos excesso, mais qualidade. Descubra a melhor camiseta básica do Brasil.",
    url: baseUrl,
    siteName: "Hooke Store",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/banner-home.jpg",
        width: 1200,
        height: 630,
        alt: "Coleção Hooke Moda Masculina Premium",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased bg-hooke-50 text-hooke-900 flex flex-col min-h-screen">

        <ViewTransitions>
          <TopBar />
          <Navbar />
          
          {/* --- AQUI FICA O CARRINHO LATERAL --- */}
          {/* Ele é fixo, então pode ficar em qualquer lugar, mas aqui é organizado */}
          <CartSidebar />
          {/* ------------------------------------ */}

          <main className="flex-grow w-full">
            {children}
          </main>

          <WhatsAppButton />
          <Footer />
          
          <Toaster position="top-center" />
          
        </ViewTransitions>

        <SpeedInsights />
        <Analytics />
        {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}

      </body>
    </html>
  );
}