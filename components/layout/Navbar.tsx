// src/components/layout/Navbar.tsx
"use client"; // Necessário para interatividade

import Link from "next/link";
import { ShoppingBag, Menu, Link2 } from "lucide-react"; // Importamos o ícone Link2
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-hooke-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* --- O NOVO LOGO INTERATIVO --- */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="group flex items-center gap-1 font-black tracking-tighter text-2xl text-hooke-900"
            >
              {/* O Ícone que aparece magicamente */}
              {/* Ele começa com largura 0 (w-0) e invisível (opacity-0) */}
              {/* No hover, ele ganha largura e fica visível com uma transição suave */}
              <span className="w-0 opacity-0 -translate-x-2 group-hover:w-auto group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out flex items-center">
                {/* Usamos o ícone Link2 e rotacionamos 45 graus para parecer um gancho */}
                <Link2 size={24} className="text-hooke-900 rotate-45" />
              </span>
              
              {/* O Texto HOOKE */}
              <span>HOOKE</span>
            </Link>
          </div>

          {/* LINKS DESKTOP (MENU) */}
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

          {/* ÍCONES DA DIREITA (SACOLA/MENU) */}
          <div className="flex items-center gap-4">
            <button aria-label="Ver sacola" className="text-hooke-600 hover:text-hooke-900 transition-colors relative">
              <ShoppingBag size={22} />
              {/* Bolinha de notificação (exemplo) */}
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-hooke-900 rounded-full"></span>
            </button>
            
            {/* Botão Menu Mobile */}
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

      {/* MENU MOBILE EXPANDIDO */}
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