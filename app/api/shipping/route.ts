import { NextResponse } from "next/server";
import { calcularPrecoPrazo } from "correios-brasil";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { cepDestino } = body as { cepDestino: string };

        if (!cepDestino) {
            return NextResponse.json({ message: "CEP de destino não informado." }, { status: 400 });
        }

        // Remover traços ou pontos do CEP
        const sCepDestino = cepDestino.replace(/\D/g, "");

        // Dados base da loja Hooke (Caixa Genérica de 1 Camiseta)
        const cepOrigemLoja = "03031000"; // CEP da Loja no Brás (Tiers, 184)

        // 03298 = PAC | 04014 = SEDEX
        const args = {
            sCepOrigem: cepOrigemLoja,
            sCepDestino: sCepDestino,
            nVlPeso: "0.3", // 300 gramas
            nCdFormato: "1", // 1 para caixa / pacote
            nVlComprimento: "20",
            nVlAltura: "10",
            nVlLargura: "15",
            nCdServico: ["03298", "04014"],
            nVlDiametro: "0",
        };

        let fretes = [];

        try {
            const response = await calcularPrecoPrazo(args);
            if (!response || response.length === 0) {
                throw new Error("Serviço dos Correios vazio.");
            }

            // Retorna formatado para o Frontend (PAC e Sedex num array)
            fretes = response.map(item => ({
                nome: item.Codigo === "03298" ? "PAC" : "SEDEX",
                valor: item.Valor.replace(",", "."),
                prazo: item.PrazoEntrega
            }));
        } catch (correiosError) {
            console.warn("Correios indisponíveis, aplicando contingência:", correiosError);

            // Fallback Inteligente (Rede de Segurança de Checkout)
            const cepPrefixo = parseInt(sCepDestino.substring(0, 5));
            let valorPac = "25.90";
            let prazoPac = "8";
            let valorSedex = "49.90";
            let prazoSedex = "3";

            // Se for dentro do estado de SP (CEP 01000 a 19999)
            if (cepPrefixo >= 1000 && cepPrefixo <= 19999) {
                valorPac = "14.90";
                prazoPac = "3";
                valorSedex = "24.90";
                prazoSedex = "1";
            }
            // Sudeste Expandido (RJ, MG, ES - CEPs 20000 a 39999)
            else if (cepPrefixo >= 20000 && cepPrefixo <= 39999) {
                valorPac = "22.90";
                prazoPac = "5";
                valorSedex = "35.90";
                prazoSedex = "2";
            }
            // Sul (PR, SC, RS - CEPs 80000 a 99999)
            else if (cepPrefixo >= 80000 && cepPrefixo <= 99999) {
                valorPac = "28.90";
                prazoPac = "6";
                valorSedex = "45.90";
                prazoSedex = "3";
            }

            fretes = [
                { nome: "PAC (Estimado)", valor: valorPac, prazo: prazoPac },
                { nome: "SEDEX (Estimado)", valor: valorSedex, prazo: prazoSedex }
            ];
        }

        return NextResponse.json({ fretes }, { status: 200 });

    } catch (error: unknown) {
        console.error("Erro no cálculo de frete:", error);
        return NextResponse.json(
            { message: "Falha ao calcular o frete.", error: error instanceof Error ? error.message : "Erro Desconhecido" },
            { status: 500 }
        );
    }
}
