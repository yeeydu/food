import { CartContext } from "@/app/context/cart";
import { useContext } from "react";
import CartItem from "./CartItem";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "./_helpers/Price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subTotalPrice, totalDiscounts, totalPrice } =
    useContext(CartContext);
  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem cartProduct={product} key={product.id} />
        ))}
      </div>
      <div className="mt-6 ">
        <Card>
          <CardContent className="p-5 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <p className=" text-muted-foreground">Subtotal</p>
              <span className="text-sm font-semibold">
                {formatCurrency(subTotalPrice)}
              </span>
            </div>
              <Separator/>
            <div className="flex justify-between items-center text-xs">
              <p className=" text-muted-foreground">Delivery</p>
              <span className="text-sm font-semibold">
                {Number(products[0].restaurant.deliveryFee) === 0
                  ? <span className="text-primary uppercase">Gratis</span>
                  : formatCurrency(Number(products[0].restaurant.deliveryFee))}
              </span>
            </div>
            <Separator/>
            <div className="flex justify-between items-center text-xs">
              <p className=" text-muted-foreground">Disco unt</p>
              <span className="text-sm font-semibold">
                -{formatCurrency(totalDiscounts)}
              </span>
            </div>
            <Separator/>
            <div className="flex justify-between items-center text-xs">
              <p className=" font-semibold">Total</p>
              <span className="text-sm font-semibold">
                {formatCurrency(totalPrice)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Button className="w-full mt-6">
        Order
      </Button>
    </div>
  );
};

export default Cart;
