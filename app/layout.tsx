import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // 1. Importando a fonte clássica
import "./globals.css";

// Importações para Análise de Dados e Performance
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';

// Importações dos Componentes de Layout Globais
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { Toaster } from "react-hot-toast";
import DynamicCart from "@/components/layout/DynamicCart";

// 2. Configurando as Fontes
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
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
    // 3. Injetando as variáveis CSS das duas fontes
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-hooke-50 text-hooke-900 flex flex-col min-h-screen">
        
        <TopBar />
        <Navbar />
        
        {/* Carrinho Lateral */}
        <DynamicCart />

        <main className="flex-grow w-full">
          {children}
        </main>

        <WhatsAppButton />
        <Footer />
        
        {/* 4. Toaster Estilizado (Sharp & Dark) */}
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            style: {
              background: '#111827', // hooke-900
              color: '#fff',
              borderRadius: '2px',   // Cantos retos
              fontFamily: 'var(--font-inter)',
              fontSize: '14px',
            }
          }}
        />
        
        <SpeedInsights />
        <Analytics />
        {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}

      </body>
    </html>
  );
}