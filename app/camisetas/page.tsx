// src/app/camisetas/page.tsx
"use client"; // Habilita interatividade (Filtros)

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/shop/ProductCard";
import { products } from "../../data/products";
import { SlidersHorizontal } from "lucide-react";

export default function CamisetasPage() {
  // Estado para controlar o filtro ativo
  const [filter, setFilter] = useState<'todos' | 'lisas' | 'estampadas'>('todos');

  // Lógica de filtragem
  const filteredProducts = products.filter((product) => {
    if (filter === 'todos') return true;
    if (filter === 'lisas') return product.category === 'camisetas-lisas';
    if (filter === 'estampadas') return product.category === 'camisetas-estampadas';
    return true;
  });

  return (
    <main className="min-h-screen bg-white pb-20">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* CABEÇALHO DA COLEÇÃO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-sm font-bold tracking-widest text-hooke-500 uppercase mb-2 block">
              Coleção 2025
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-hooke-900 tracking-tight">
              Camisetas
            </h1>
          </div>

          {/* CONTADOR DE PRODUTOS (UX: Status do Sistema) */}
          <div className="text-hooke-500 text-sm font-medium">
            Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'peça' : 'peças'}
          </div>
        </div>

        {/* BARRA DE FILTROS (UI: Pills Modernos) */}
        <div className="flex flex-wrap items-center gap-3 mb-12 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          <div className="flex items-center text-hooke-400 mr-2">
            <SlidersHorizontal size={18} />
          </div>

          {/* Botão TODOS */}
          <button
            onClick={() => setFilter('todos')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
              filter === 'todos'
                ? 'bg-hooke-900 text-white border-hooke-900 shadow-md'
                : 'bg-white text-hooke-500 border-hooke-200 hover:border-hooke-400'
            }`}
          >
            Todas
          </button>

          {/* Botão LISAS */}
          <button
            onClick={() => setFilter('lisas')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
              filter === 'lisas'
                ? 'bg-hooke-900 text-white border-hooke-900 shadow-md'
                : 'bg-white text-hooke-500 border-hooke-200 hover:border-hooke-400'
            }`}
          >
            Básicas & Lisas
          </button>

          {/* Botão ESTAMPADAS */}
          <button
            onClick={() => setFilter('estampadas')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
              filter === 'estampadas'
                ? 'bg-hooke-900 text-white border-hooke-900 shadow-md'
                : 'bg-white text-hooke-500 border-hooke-200 hover:border-hooke-400'
            }`}
          >
            Estampadas
          </button>
        </div>

        {/* GRID DE PRODUTOS */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 animate-in fade-in duration-700 slide-in-from-bottom-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* EMPTY STATE (UX: Quando não há produtos) */
          <div className="text-center py-20 bg-hooke-50 rounded-sm border border-dashed border-hooke-200">
            <p className="text-hooke-500 text-lg">Nenhuma peça encontrada nesta categoria.</p>
            <button 
              onClick={() => setFilter('todos')}
              className="mt-4 text-hooke-900 font-bold underline hover:text-hooke-600"
            >
              Ver todas as peças
            </button>
          </div>
        )}

      </section>
    </main>
  );
}