// src/app/contato/page.tsx
import Navbar from "@/components/layout/Navbar";
import { Mail, MessageCircle, MapPin, Instagram, ArrowRight } from "lucide-react";

export default function ContactPage() {
  
  const whatsappNumber = "5511999999999"; 
  const email = "contato@usehooke.com.br";
  const instagram = "@use.hooke";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-hooke-900 tracking-tight mb-4">
            Fale com a Hooke
          </h1>
          <p className="text-lg text-hooke-500 max-w-2xl mx-auto">
            Nosso time está pronto para te ajudar online ou presencialmente em nossas lojas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* CARTÃO 1: WHATSAPP */}
          <div className="bg-hooke-50 p-8 rounded-sm border border-hooke-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white mb-6">
              <MessageCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-hooke-900 mb-2">WhatsApp</h3>
            <p className="text-hooke-500 mb-6 text-sm">
              Atendimento ágil para compras e dúvidas.
            </p>
            <a 
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              className="text-[#25D366] font-bold uppercase tracking-widest text-sm flex items-center hover:underline"
            >
              Iniciar Conversa <ArrowRight size={16} className="ml-2" />
            </a>
          </div>

          {/* CARTÃO 2: LOJAS FÍSICAS (Novo Destaque) */}
          <div className="bg-hooke-50 p-8 rounded-sm border border-hooke-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-hooke-900 rounded-full flex items-center justify-center text-white mb-6">
              <MapPin size={32} />
            </div>
            <h3 className="text-xl font-bold text-hooke-900 mb-2">Nossas Lojas</h3>
            <p className="text-hooke-500 mb-6 text-sm">
              Venha sentir a qualidade do tecido pessoalmente.
            </p>
            <span className="text-hooke-900 font-bold uppercase tracking-widest text-sm flex items-center">
              Ver endereços abaixo <ArrowRight size={16} className="ml-2" />
            </span>
          </div>

          {/* CARTÃO 3: INSTAGRAM */}
          <div className="bg-hooke-50 p-8 rounded-sm border border-hooke-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center text-white mb-6">
              <Instagram size={32} />
            </div>
            <h3 className="text-xl font-bold text-hooke-900 mb-2">Instagram</h3>
            <p className="text-hooke-500 mb-6 text-sm">
              Acompanhe os lançamentos diários.
            </p>
            <a 
              href={`https://instagram.com/${instagram.replace('@', '')}`}
              target="_blank"
              className="text-hooke-900 font-bold uppercase tracking-widest text-sm flex items-center hover:underline"
            >
              Seguir @use.hooke <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>

        {/* SEÇÃO FAQ + ENDEREÇOS */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-hooke-900 mb-8 text-center">Dúvidas & Localização</h2>
          
          <div className="space-y-6">
            
            {/* ONDE MUDOU: Endereços das Lojas */}
            <div className="border border-hooke-200 bg-hooke-50 p-6 rounded-sm">
              <h4 className="font-bold text-hooke-900 mb-4 flex items-center">
                <MapPin size={20} className="mr-2" /> 
                Onde ficam as lojas físicas?
              </h4>
              <div className="text-hooke-600 text-sm space-y-4">
                <p>Sim! Temos duas unidades no Brás para você conhecer:</p>
                
                <div>
                  <strong className="block text-hooke-900">Shopping Vautier Premium</strong>
                  <span>Rua Thiers, 184 - Loja 142</span>
                </div>

                <div>
                  <strong className="block text-hooke-900">Shopping Porto Brás</strong>
                  <span>Rua Thiers, 282 - Loja 1598</span>
                </div>
              </div>
            </div>
            
            <div className="border-b border-hooke-100 pb-4">
              <h4 className="font-bold text-hooke-900 mb-2">Qual o prazo de entrega?</h4>
              <p className="text-hooke-500 text-sm">Enviamos para todo o Brasil. O prazo varia de 2 a 7 dias úteis dependendo da sua região.</p>
            </div>

            <div className="border-b border-hooke-100 pb-4">
              <h4 className="font-bold text-hooke-900 mb-2">Como funciona a troca?</h4>
              <p className="text-hooke-500 text-sm">A primeira troca é por nossa conta. Você tem até 30 dias após o recebimento para solicitar.</p>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
}