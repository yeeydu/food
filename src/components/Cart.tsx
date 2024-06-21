import { CartContext } from "@/app/context/cart";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "./_helpers/Price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createOrder } from "@/app/_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Cart = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmedDialogOpen, setIsConfirmedDialogOpen ] = useState(false);
  const { products, subTotalPrice, totalDiscounts, totalPrice, clearCart } =
    useContext(CartContext);

  const { data } = useSession();

  const handleFinishOrderClick = async () => {
    if (!data?.user) return;
    const restaurant = products[0].restaurant;

    try {
      setIsSubmitLoading(true);
      await createOrder({
        subTotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id }, // connect this order with restaurant with that id
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data.user.id },
        },
      });
      clearCart();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
    <div className="flex-col h-full py-5">
      {products.length > 0 ? (
        <div className="flex-auto">
          <div className="space-y-4">
            {products.map((product) => (
              <CartItem cartProduct={product} key={product.id} />
            ))}
          </div>
          <div className="mt-6">
            <Card>
              <CardContent className="p-5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <p className=" text-muted-foreground">Subtotal</p>
                  <span className="text-sm font-semibold">
                    {formatCurrency(subTotalPrice)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-xs">
                  <p className=" text-muted-foreground">Delivery</p>
                  <span className="text-sm font-semibold">
                    {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                      <span className="text-primary uppercase">Gratis</span>
                    ) : (
                      formatCurrency(
                        Number(products?.[0].restaurant.deliveryFee)
                      )
                    )}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-xs">
                  <p className=" text-muted-foreground">Disco unt</p>
                  <span className="text-sm font-semibold">
                    -{formatCurrency(totalDiscounts)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-xs">
                  <p className=" font-semibold">Total</p>
                  <span className="text-sm font-semibold">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button className="w-full mt-6" onClick={()=> setIsConfirmedDialogOpen(true)} >
         
            Finish Order
          </Button>
        </div>
      ) : (
        <h2>Add a product to the cart</h2>
      )}
    </div>
     <AlertDialog open={isConfirmedDialogOpen} onOpenChange={setIsConfirmedDialogOpen}>
     <AlertDialogContent>
       <AlertDialogHeader>
         <AlertDialogTitle>Finish order?</AlertDialogTitle>
         <AlertDialogDescription>
           This action cannot be undone. This will order and delete
           products from the list.
         </AlertDialogDescription>
       </AlertDialogHeader>
       <AlertDialogFooter>
         <AlertDialogCancel disabled={isSubmitLoading}>
         {isSubmitLoading && (
            
            <Loader2  className="mr-2 h-4 w-4 animate-spin" />
          )}
          Cancel
          </AlertDialogCancel>
         <AlertDialogAction onClick={handleFinishOrderClick}>Finish</AlertDialogAction>
       </AlertDialogFooter>
     </AlertDialogContent>
   </AlertDialog>
   </>
  );
};

export default Cart;
