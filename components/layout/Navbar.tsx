// src/components/layout/Navbar.tsx
"use client";

import { Link } from 'next-view-transitions';
import { Menu, Link2 } from "lucide-react"; // Removemos ShoppingBag daqui
import { useState } from "react";
// IMPORTAMOS O NOVO CARRINHO
import CartSheet from "@/components/cart/CartSheet";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-hooke-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO (Não mexemos) */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="group flex items-center gap-1 font-black tracking-tighter text-2xl text-hooke-900"
            >
              <span className="w-0 opacity-0 -translate-x-2 group-hover:w-auto group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out flex items-center">
                <Link2 size={24} className="text-hooke-900 rotate-45" />
              </span>
              <span>HOOKE</span>
            </Link>
          </div>

          {/* MENU DESKTOP (Não mexemos) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-hooke-600 hover:text-hooke-900 text-sm font-medium tracking-widest transition-colors uppercase">
                Home
              </Link>
              <Link href="/camisetas" className="text-hooke-600 hover:text-hooke-900 text-sm font-medium tracking-widest transition-colors uppercase">
                Camisetas
              </Link>
              <Link href="/sobre" className="text-hooke-600 hover:text-hooke-900 text-sm font-medium tracking-widest transition-colors uppercase">
                Sobre
              </Link>
              <Link href="/contato" className="text-hooke-600 hover:text-hooke-900 text-sm font-medium tracking-widest transition-colors uppercase">
                Contato
              </Link>
            </div>
          </div>

          {/* ÍCONES DA DIREITA */}
          <div className="flex items-center gap-4">
            
            {/* --- AQUI ESTÁ A MUDANÇA! --- */}
            {/* Removemos o botão antigo e colocamos o CartSheet */}
            <CartSheet />
            {/* --------------------------- */}
            
            {/* Botão Menu Mobile (Não mexemos) */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-hooke-900 hover:text-hooke-600 transition-colors p-1"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MENU MOBILE EXPANDIDO (Não mexemos) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-white border-b border-hooke-100 px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg animate-in slide-in-from-top-5">
          <Link href="/" className="text-hooke-900 block px-3 py-4 rounded-sm text-base font-bold uppercase tracking-widest hover:bg-hooke-50">
            Home
          </Link>
          <Link href="/camisetas" className="text-hooke-900 block px-3 py-4 rounded-sm text-base font-bold uppercase tracking-widest hover:bg-hooke-50">
            Camisetas
          </Link>
          <Link href="/sobre" className="text-hooke-900 block px-3 py-4 rounded-sm text-base font-bold uppercase tracking-widest hover:bg-hooke-50">
            A Marca
          </Link>
          <Link href="/contato" className="text-hooke-900 block px-3 py-4 rounded-sm text-base font-bold uppercase tracking-widest hover:bg-hooke-50">
            Contato
          </Link>
        </div>
      )}
    </nav>
  );
}