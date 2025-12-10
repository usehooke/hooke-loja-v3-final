// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Importações para Análise de Dados
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';

import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// URL OFICIAL DO SEU SITE (Crucial para o Google não se perder)
const baseUrl = "https://www.usehooke.com.br";

// SEU ID DO GOOGLE ANALYTICS 4
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // <--- SUBSTITUA PELO SEU ID REAL

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Hooke | Moda Masculina Minimalista",
    template: "%s | Hooke",
  },
  description: "Vista a sua essência. Moda masculina minimalista com corte premium e tecidos nobres.",
  keywords: ["moda masculina", "camiseta minimalista", "roupa masculina", "hooke", "algodão egípcio"],
  icons: {
    icon: '/icon.svg',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased bg-hooke-50 text-hooke-900 flex flex-col min-h-screen`}>
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
        
        {/* --- FERRAMENTAS DE ANÁLISE --- */}
        <SpeedInsights />
        <Analytics />
        {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
        {/* ------------------------------ */}
        
      </body>
    </html>
  );
}