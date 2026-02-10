import { Truck, RefreshCw, ShieldCheck } from "lucide-react";

export default function BrandMarquee() {
  const benefits = [
    {
      icon: <Truck size={16} strokeWidth={1.5} />,
      text: "Enviamos para todo o Brasil",
    },
    {
      icon: <RefreshCw size={16} strokeWidth={1.5} />,
      text: "Primeira troca grátis",
    },
    {
      icon: <ShieldCheck size={16} strokeWidth={1.5} />,
      text: "Compra 100% segura",
    },
  ];

  return (
    <div className="w-full bg-hooke-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center py-4 gap-4 md:gap-8">
          {benefits.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-hooke-900 opacity-80 hover:opacity-100 transition-opacity">
              {/* O ícone */}
              <span>{item.icon}</span>
              {/* O texto */}
              <span className="text-xs font-bold uppercase tracking-widest">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}