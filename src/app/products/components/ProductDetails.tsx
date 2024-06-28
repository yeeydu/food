"use client";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/components/_helpers/Price";
import DiscountBadge from "@/components/ui/discountBadge";
import { Prisma } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import ProductList from "@/components/ProductList";
import DeliveryInfo from "@/components/DeliveryInfo";
import { CartContext } from "@/app/context/cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Cart from "@/components/Cart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const { addProductToCart, products } = useContext(CartContext);

  const handleIncreaseQuantityClick = () =>
    setQuantity((prevState) => prevState + 1);

  const handleDecreaseQuantityClick = () =>
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product, quantity, emptyCart });
    setIsCartOpen(true);
  };

  const handleAddToCartClick = () => {
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId
    );

    if (hasDifferentRestaurantProduct) {
      return setIsConfirmationDialogOpen(true);
    }

    addToCart({ emptyCart: false });
  };

  return (
    <>
      <div>
        <div className="p-5 rounded-tl-3xl rounded-tr-3xl relative z-50 mt-[-1.5rem] bg-white">
          {/*restaurant*/}
          <div className="flex items-center gap-[0.375rem]">
            <div className="relative h-6 w-6">
              <Image
                src={product.restaurant.imageUrl}
                alt={product.restaurant.name}
                fill
                sizes="100%"
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
          <div className="px-5">
            <DeliveryInfo restaurant={product.restaurant} />
          </div>
          {/* about */}
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold">About</h3>
            <p className="text-muted-foreground text-sm">
              {product.description}
            </p>
          </div>
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold">Related</h3>
          </div>
        </div>
        <ProductList products={complementaryProduct} />
        <div className="px-5 mt-6">
          <Button
            className="w-full font-semibold"
            onClick={handleAddToCartClick}
          >
            Add to cart
          </Button>
        </div>
      </div>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left ">Cart</SheetTitle>
            <Cart setIsOpen={setIsCartOpen} />
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Your cart have products from another restaurant
            </AlertDialogTitle>
            <AlertDialogDescription>
              You can only have products from one restaurant in the cart. if you
              continue it will delete all items and add this product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=> addToCart({emptyCart: true})}>
              Empty cart and add product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductDetails;
