import { Product } from "@/types";

// 1. Importamos os pequenos grupos
import { camisetasEstampadas } from "./estampadas";
import { camisetasLisas } from "./lisas";

// 2. Juntamos tudo em um array principal (usando o Spread Operator "...")
// Esse é o array que o resto do site vai usar.
export const products: Product[] = [
  ...camisetasEstampadas,
  ...camisetasLisas,
];

// BÔNUS MODERNO:
// Você também pode exportar os grupos individualmente se quiser usar só eles em alguma página.
// Exemplo: na página de categoria "Lisas", você poderia importar só as lisas.
export { camisetasEstampadas, camisetasLisas };