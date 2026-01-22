// components/layout/Navbar.tsx
"use client";

// Usamos o Link do next-view-transitions para animações suaves entre páginas
import { Link } from 'next-view-transitions';
import { Menu, Link2, ShoppingBag, X } from "lucide-react";
import { useState, useEffect } from "react";
// Importamos a loja para controlar a abertura do carrinho
import { useCartStore } from "@/store/cart-store";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Pegamos a função de abrir a gaveta e o total de itens
  const { openCart, getTotalItems } = useCartStore();
  
  // Evita erro de hidratação no contador
  useEffect(() => setMounted(true), []);
  const totalItems = mounted ? getTotalItems() : 0;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-hooke-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO (Seu design animado) */}
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

          {/* MENU DESKTOP */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-hooke-600 hover:text-hooke-900 text-sm font-medium tracking-widest transition-colors uppercase">
                Home
              </Link>
              <Link href="/#colecao" className="text-hooke-600 hover:text-hooke-900 text-sm font-medium tracking-widest transition-colors uppercase">
                Coleção
              </Link>
              <Link href="#" className="text-hooke-600 hover:text-hooke-900 text-sm font-medium tracking-widest transition-colors uppercase">
                Sobre
              </Link>
              <Link href="#" className="text-hooke-600 hover:text-hooke-900 text-sm font-medium tracking-widest transition-colors uppercase">
                Contato
              </Link>
            </div>
          </div>

          {/* ÍCONES DA DIREITA */}
          <div className="flex items-center gap-4">
            
            {/* BOTÃO DO CARRINHO (Corrigido para usar a Store) */}
            <button 
              onClick={openCart}
              className="relative p-2 text-hooke-900 hover:bg-hooke-50 rounded-full transition-colors group"
              aria-label="Abrir Sacola"
            >
              <ShoppingBag size={24} className="group-hover:scale-105 transition-transform" />
              
              {/* Bolinha com número de itens */}
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-hooke-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold animate-in zoom-in border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Botão Menu Mobile */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-hooke-900 hover:text-hooke-600 transition-colors p-1"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MENU MOBILE EXPANDIDO */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-white border-b border-hooke-100 px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg animate-in slide-in-from-top-5">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-hooke-900 block px-3 py-4 rounded-sm text-base font-bold uppercase tracking-widest hover:bg-hooke-50">
            Home
          </Link>
          <Link href="/#colecao" onClick={() => setIsMobileMenuOpen(false)} className="text-hooke-900 block px-3 py-4 rounded-sm text-base font-bold uppercase tracking-widest hover:bg-hooke-50">
            Coleção
          </Link>
          <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-hooke-900 block px-3 py-4 rounded-sm text-base font-bold uppercase tracking-widest hover:bg-hooke-50">
            A Marca
          </Link>
        </div>
      )}
    </nav>
  );
}