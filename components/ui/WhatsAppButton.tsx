// src/components/ui/WhatsAppButton.tsx
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  // 👇👇👇 SUBSTITUA PELO SEU NÚMERO REAL (DDD + Número, apenas dígitos) 👇👇👇
  const phoneNumber = "5511975902528"; 
  const message = "Olá! Vim pelo site da UseHooke e gostaria de tirar uma dúvida.";
  
  // Cria o link oficial do WhatsApp API
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300 animate-in fade-in slide-in-from-bottom-10"
    >
      <MessageCircle size={28} fill="white" />
      {/* Bolinha de notificação para chamar atenção */}
      <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
    </a>
  );
}