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

        const response = await calcularPrecoPrazo(args);

        if (!response || response.length === 0) {
            throw new Error("Serviço dos Correios indisponível no momento.");
        }

        // Retorna formatado para o Frontend (PAC e Sedex num array)
        const fretes = response.map(item => ({
            // codigo 03298 -> PAC, codigo 04014 -> Sedex
            nome: item.Codigo === "03298" ? "PAC" : "SEDEX",
            valor: item.Valor.replace(",", "."),
            prazo: item.PrazoEntrega
        }));

        return NextResponse.json({ fretes }, { status: 200 });

    } catch (error: unknown) {
        console.error("Erro no cálculo de frete:", error);
        return NextResponse.json(
            { message: "Falha ao calcular o frete.", error: error instanceof Error ? error.message : "Erro Desconhecido" },
            { status: 500 }
        );
    }
}
