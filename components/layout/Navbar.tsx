"use client";

import Link from 'next/link';
import { Menu, ShoppingBag, X, Search, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart-store";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Seletores do Zustand
  const openCart = useCartStore((state) => state.openCart);
  const items = useCartStore((state) => state.items);

  // Hidratação e Scroll
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Total de itens
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav 
        className={`sticky top-0 z-40 w-full bg-white transition-all duration-300 ${
          isScrolled ? "border-b border-gray-100 shadow-sm" : "border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* 1. ESQUERDA: Menu Mobile (Mobile) + Links (Desktop) */}
            <div className="flex-1 flex items-center justify-start">
              {/* Botão Mobile */}
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden text-hooke-900 -ml-2 p-2 hover:text-gray-600 transition-colors"
                aria-label="Abrir Menu"
              >
                <Menu strokeWidth={1.5} size={24} />
              </button>

              {/* Links Desktop (Estilo Sunspel) */}
              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                {['Shop', 'Coleção', 'Sobre'].map((item) => (
                   <Link 
                     key={item}
                     href={item === 'Shop' ? '/' : `/${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                     className="text-xs font-bold uppercase tracking-widest text-hooke-900 hover:text-gray-500 transition-colors font-sans"
                   >
                     {item}
                   </Link>
                ))}
              </div>
            </div>

            {/* 2. CENTRO: Logo (A Alma da Marca) */}
            <div className="flex-1 flex justify-center">
              <Link href="/" className="group text-center">
                <h1 className="font-heading text-3xl font-bold tracking-tight text-hooke-900 group-hover:opacity-80 transition-opacity">
                  HOOKE
                </h1>
              </Link>
            </div>

            {/* 3. DIREITA: Ícones */}
            <div className="flex-1 flex items-center justify-end gap-4 md:gap-6">
              <button className="hidden md:block text-hooke-900 hover:text-gray-500 transition-colors">
                <Search strokeWidth={1.5} size={20} />
              </button>

              <Link href="/conta" className="hidden md:block text-hooke-900 hover:text-gray-500 transition-colors">
                <User strokeWidth={1.5} size={20} />
              </Link>

              {/* Carrinho */}
              <button 
                onClick={openCart}
                className="relative text-hooke-900 hover:text-gray-500 transition-colors group p-1"
                aria-label="Abrir Sacola"
              >
                <ShoppingBag strokeWidth={1.5} size={20} />
                
                {/* Badge Quadrado (Sharp) */}
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-hooke-900 text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-[1px] font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* --- MENU MOBILE (OVERLAY LATERAL) --- */}
      {/* Um menu lateral deslizante é mais chique que um dropdown que empurra tudo */}
      <div className={`fixed inset-0 z-50 flex ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        
        {/* Fundo Escuro */}
        <div 
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Painel Branco */}
        <div className={`relative w-4/5 max-w-xs bg-white h-full shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 flex justify-between items-center border-b border-gray-100">
            <h2 className="font-heading text-xl font-bold text-hooke-900">Menu</h2>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500">
              <X strokeWidth={1.5} size={24} />
            </button>
          </div>
          
          <div className="flex flex-col p-6 gap-6">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-hooke-900">
              Home
            </Link>
            <Link href="/#colecao" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-hooke-900">
              Coleção
            </Link>
            <Link href="/sobre" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-hooke-900">
              Sobre a Hooke
            </Link>
            <Link href="/contato" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-hooke-900">
              Fale Conosco
            </Link>
            
            <div className="h-px bg-gray-100 my-2" />
            
            <Link href="/conta" className="flex items-center gap-3 text-sm font-medium text-gray-600">
              <User size={18} /> Minha Conta
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}