"use client";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/components/_helpers/Price";
import DiscountBadge from "@/components/ui/discountBadge";
import { Prisma } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import ProductList from "@/components/ProductList";

//ProductGetPayload is for getting one product only
interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    //getPayload
    include: {
      restaurant: true;
    };
  }>;
  complementaryProduct: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[]; // [] for a list of products
}

const ProductDetails = ({
  product,
  complementaryProduct,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantityClick = () =>
    setQuantity((prevState) => prevState + 1);

  const handleDecreaseQuantityClick = () =>
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });

  return (
    <div>
      <div className="p-5">
        {/*restaurant*/}
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>
        {/*product name */}
        <h1 className="font-semibold text-xl mb-3 mt-1 ">{product.name}</h1>
        {/*price w/disc & quant*/}
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-2 ">
              <h2 className="font-semibold text-xl">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h2>
              {product.discountPercentage > 0 && (
                <DiscountBadge product={product} />
              )}
            </div>
            {/*price original*/}
            {product.discountPercentage > 0 && (
              <p className="text-muted-foreground text-sm">
                from: {formatCurrency(Number(product.price))}
              </p>
            )}
          </div>
          <div className="flex gap-3 items-center text-center">
            <Button
              size="icon"
              variant="ghost"
              className="border-muted-foreground border-solid border "
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4"> {quantity}</span>
            <Button
              size="icon"
              variant="ghost"
              className="border-muted-foreground border-solid border "
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
        {/*entrega price & time */}
        <Card className="flex justify-around py-2 mt-6">
          <div className="flex flex-col items-center">
            <div className="flex  items-center text-muted-foreground">
              <span className="text-xs ">Delivery{""}</span>
              <BikeIcon size={16} />
            </div>
            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-xs font-semibold">Free</p>
            )}
          </div>
          <div className="flex flex-col items-center">
            <div className="flex  items-center text-muted-foreground">
              <span className="text-xs ">Time{""}</span>
              <TimerIcon size={16} />
            </div>
            {Number(product.restaurant.deliveryTimeMinutes) > 0 ? (
              <p className="text-xs font-semibold">
                {Number(product.restaurant.deliveryTimeMinutes)} min
              </p>
            ) : (
              <p className="text-xs font-semibold">Free</p>
            )}
          </div>
        </Card>
        {/* about */}
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold">About</h3>
          <p className="text-muted-foreground text-sm">{product.description}</p>
        </div>
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold">Related</h3>
        </div>
      </div>
      <ProductList products={complementaryProduct}/>
    </div>
  );
};

export default ProductDetails;
