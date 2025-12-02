// app/page.tsx (A Home Page)
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import ProductCard from "@/components/shop/ProductCard";
import { products } from "../data/products"; // Note que aqui é apenas "../"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* Seção da Vitrine */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-hooke-900 tracking-tight">Coleção Essencial</h2>
            <p className="text-hooke-500 mt-2">Peças atemporais para o homem moderno.</p>
          </div>
          <a href="/camisetas" className="hidden md:block text-sm font-bold text-hooke-900 border-b border-hooke-900 pb-1 hover:text-hooke-500 hover:border-hooke-500 transition-colors">
            VER TODAS
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <a href="/camisetas" className="text-sm font-bold text-hooke-900 border-b border-hooke-900 pb-1">
            VER TODAS
          </a>
        </div>
      </section>
    </main>
  );
}