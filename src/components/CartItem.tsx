import { CartContext, CartProduct } from "@/app/context/cart";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "./_helpers/Price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseQuantityClick,
    increaseQuantityClick,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () =>
    decreaseQuantityClick(cartProduct.id);

  const handleIncreaseQuantityClick = () =>
    increaseQuantityClick(cartProduct.id);

  const handleRemoveProductFromCart = () =>
    removeProductFromCart(cartProduct.id);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 relative">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm">{cartProduct.name}</h3>
          <div className="flex item-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(calculateProductTotalPrice(cartProduct) * cartProduct.quantity)}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-sm text-muted-foreground line-through ">
                {formatCurrency(Number(cartProduct.price)* cartProduct.quantity)}
              </span>
            )}
          </div>
          <div className="flex item-center">
            <div className="flex gap-3 items-center text-center">
              <Button
                size="icon"
                variant="ghost"
                className="border-muted-foreground border-solid border h-7 w-7"
                onClick={handleDecreaseQuantityClick}
              >
                <ChevronLeftIcon size={18} />
              </Button>
              <span className="w-4 text-sm"> {cartProduct.quantity}</span>
              <Button
                size="icon"
                variant="ghost"
                className="border-muted-foreground border-solid border h-7 w-7"
                onClick={handleIncreaseQuantityClick}
              >
                <ChevronRightIcon size={18} />
              </Button>
            </div>
          </div>
        </div>
        <Button
          size="icon"
          className=" h-8 w-8 border-muted-foreground border-solid border"
          variant="ghost"
          onClick={handleRemoveProductFromCart}
        >
          <TrashIcon size={20} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
