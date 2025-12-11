// src/data/products/index.ts
import { Product } from "@/types";

// 1. Importamos os grupos de produtos dos arquivos corretos
import { camisetasEstampadas } from "./estampadas";
// ATENÇÃO: Mudamos de "./lisas" para "./regata" e o nome da importação
import { camisetasRegata } from "./regata";

// 2. Juntamos tudo em um array principal
export const products: Product[] = [
  ...camisetasEstampadas,
  ...camisetasRegata, // Usamos a nova variável aqui
];

// BÔNUS: Exportamos os grupos individualmente também
export { camisetasEstampadas, camisetasRegata };