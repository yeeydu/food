import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "./_helpers/Price";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true; // this way we get the restaurant name from the product restautantId relation
        };
      };
    };
  }>;
  className?: string,
}

const ProductItem = ({ product, className }: ProductItemProps) => {
    
  return (
    <Link 
    href={`/products/${product.id}`} 
    className={cn("w-[150px] min-w-[150px]", className)}
    > {/* next Link has a pre fetch of a information making it to load faster when clicked*/}
    <div className="w-full space-y-2">
      {/* image */}
      <div className="aspect-square w-full relative">
        <Image
          src={product.imageUrl} 
          alt={product.name}
          fill
           sizes="100%"
          className="object-cover rounded-lg shadow-md"
        />
        {product.discountPercentage && (
          <div className="flex bg-primary absolute top-2 left-2 gap-[2px] px-2 py-[2px] rounded-full text-white items-center">
            <ArrowDownIcon size={12} />
            <span className="font-semibold text-sm">
              {product.discountPercentage}%
            </span>
          </div>
        )}
      </div>
      <div>
        <h2 className="text-sm truncate">{product.name}</h2>{" "}
        {/* truncate to wrap text when bigger title*/}
        <div className="flex font-semibold items-center gap-1">
          <h3>{formatCurrency(calculateProductTotalPrice(product))}</h3>
          {product.discountPercentage > 0 && (
            <span className="line-through text-muted-foreground text-xs">
              {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>
        <span className="block text-muted-foreground text-sm">
          {product.restaurant.name}
        </span>
      </div>
    </div>
    </Link>
  );
};

export default ProductItem;
