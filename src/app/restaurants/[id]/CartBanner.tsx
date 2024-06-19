"use client";

import { CartContext } from "@/app/context/cart";
import Cart from "@/components/Cart";
import { formatCurrency } from "@/components/_helpers/Price";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Restaurant } from "@prisma/client";
import { useContext } from "react";

interface CartBannerProps {
  restaurant: Pick<Restaurant, "id">;
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
  const { products, totalPrice, totalQuantity } = useContext(CartContext);

  const restaurantHasProductsOnCart = products.some(
    (product) => product.restaurantId === restaurant.id
  );

  if (!restaurantHasProductsOnCart) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-solid border-muted bg-white p-5 pt-3 shadow-md">
      <div className="flex justify-between item-center">
        <div>
          <span className="text-xs text-muted-foreground">
            Total without delivery
          </span>
          <h3 className="font-semibold">
            {formatCurrency(totalPrice)}
            <span className="text-xs text-muted-foreground font-normal">
              / {totalQuantity} {totalQuantity > 1 ? "items" : "item"}
            </span>
          </h3>
        </div>
        <Sheet>
          <SheetTrigger>
            <Button>Open cart</Button>
          </SheetTrigger>
          <SheetContent className="w-[90vw]">
            <SheetHeader>
              <SheetTitle className="text-left ">Cart</SheetTitle>
              <Cart />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CartBanner;
