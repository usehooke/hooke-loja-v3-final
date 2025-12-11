// src/components/layout/TopBar.tsx
export default function TopBar() {
  return (
    <div className="bg-hooke-900 text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase py-2 overflow-hidden relative z-50">
      {/* Container que desliza */}
      <div className="animate-marquee flex gap-8 min-w-full items-center">
        
        {/* Repetimos o conteúdo várias vezes para dar a ilusão de infinito */}
        {Array(10).fill(null).map((_, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0">
            <span>Frete Grátis para todo o Brasil</span>
            <span className="w-1 h-1 bg-white rounded-full opacity-50"></span>
            <span>5% OFF no PIX</span>
            <span className="w-1 h-1 bg-white rounded-full opacity-50"></span>
            <span>Envio em 24h</span>
            <span className="w-1 h-1 bg-white rounded-full opacity-50"></span>
          </div>
        ))}

      </div>
    </div>
  );
}