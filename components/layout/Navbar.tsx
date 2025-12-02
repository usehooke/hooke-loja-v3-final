// src/components/layout/Navbar.tsx
"use client"; // Necessário porque usamos interatividade (useState)

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Camisetas', href: '/camisetas' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Contato', href: '/contato' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-hooke-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-hooke-900 tracking-tighter">
              HOOKE
            </Link>
          </div>

          {/* Desktop Links - Escondido no mobile */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-hooke-500 hover:text-hooke-900 transition-colors text-sm font-medium uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Ícones da Direita (Carrinho / Menu Mobile) */}
          <div className="flex items-center space-x-4">
            <button aria-label="Carrinho" className="text-hooke-800 hover:text-hooke-500">
              <ShoppingBag size={22} />
            </button>

            {/* Botão Menu Mobile (Hambúrguer) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-hooke-800 rounded-md p-2 hover:bg-hooke-100 focus:outline-none"
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-hooke-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)} // Fecha menu ao clicar
                className="block px-3 py-2 rounded-md text-base font-medium text-hooke-700 hover:text-hooke-900 hover:bg-hooke-50 uppercase"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}