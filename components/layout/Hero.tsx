// src/components/layout/Hero.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-hooke-900">
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner-home.jpg" 
          alt="Homem vestindo Hooke Moda Masculina"
          fill
          className="object-cover object-center opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-hooke-900/80 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
          VISTA A SUA ESSÊNCIA.
        </h1>
        <p className="text-lg md:text-xl text-hooke-100 mb-8 font-light max-w-xl mx-auto drop-shadow-md">
          Moda masculina minimalista para quem valoriza o corte, o tecido e a atitude.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/camisetas" 
            className="px-8 py-4 bg-white text-hooke-900 text-sm font-bold uppercase tracking-widest hover:bg-hooke-100 transition-all duration-300 rounded-sm shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Ver Coleção
          </Link>
        </div>
      </div>
    </section>
  );
}