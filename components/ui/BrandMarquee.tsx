// src/components/ui/BrandMarquee.tsx
import { Truck, CreditCard, RefreshCw, ShieldCheck } from "lucide-react";

export default function BrandMarquee() {
  const benefits = [
    {
      icon: <Truck size={14} />,
      text: "Enviamos para todo o Brasil",
    },
    {
      icon: <RefreshCw size={14} />,
      text: "Primeira troca grátis",
    },
    {
      icon: <ShieldCheck size={14} />,
      text: "Compra 100% segura",
    },
  ];

  return (
    <div className="w-full bg-hooke-50 border-y border-hooke-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center md:justify-between items-center py-4 gap-y-4 gap-x-8">
          {benefits.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-hooke-600">
              {/* O ícone */}
              <span className="text-hooke-900">{item.icon}</span>
              {/* O texto */}
              <span className="text-xs md:text-sm font-medium uppercase tracking-wide">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}