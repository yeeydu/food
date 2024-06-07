import React from "react";
import ProductItem from "./ProductItem";
import { Prisma } from "@prisma/client";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true; // this way we get the restaurant name from the product restautantId relation
        };
      };
    };
  }>[];
}

export default async function ProductList({ products }: ProductListProps) {
  
  return (
    <div className="flex overflow-x-scroll gap-4 px-5 [&:: -webkit-scrollbar]:hidden ">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
}
