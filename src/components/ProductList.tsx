import React from "react";
import db from "../lib/prisma";
import ProductItem from "./ProductItem";

export default async function ProductList() {
  
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true, // this way we get the restaurant name from the product restautantId relation
        },
      },
    },
  });

  return (
    <div className="flex overflow-x-scroll gap-4 px-5 [&:: -webkit-scrollbar]:hidden ">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
}
