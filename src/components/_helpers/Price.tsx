import { Product } from "@prisma/client";
import { format } from "path";


// calculate price discount
export const calculateProductTotalPrice = (product: Product): number => {
  if (product.discountPercentage === 0) {
    return Number(product.price);
  }

  const discount = Number(product.price) * (product.discountPercentage / 100);

  return Number(product.price) - discount;
};

//  format currency

export const formatCurrency = (value: number): string => {
  return Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(Number(value));
};
