// components/seo/ProductSchema.tsx
import { Product } from "@/types";

interface ProductSchemaProps {
  product: Product;
}

export default function ProductSchema({ product }: ProductSchemaProps) {
  // URL base do seu site (Importante para o Google saber onde está a imagem)
  const siteUrl = 'https://www.usehooke.com.br';
  
  // Montamos o objeto de dados estruturados (Padrão Schema.org)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": `${siteUrl}${product.imageUrl}`,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Hooke"
    },
    "offers": {
      "@type": "Offer",
      "url": `${siteUrl}/produto/${product.slug}`,
      "priceCurrency": "BRL",
      "price": product.price.toString(),
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    // Injetamos esse script JSON no cabeçalho da página
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}