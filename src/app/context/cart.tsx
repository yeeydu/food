"use client";
import { calculateProductTotalPrice } from "@/components/_helpers/Price";
import { Prisma, Product } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          deliveryFee: true;
        };
      };
    };
  }> {
  // export interface to use in cartItem
  quantity: number;
}

interface ICartContext {
  subTotalPrice: number;
  totalPrice: number;
  totalDiscounts: number;
  products: CartProduct[];
  addProductToCart: (product: Product, quantity: number) => void;
  decreaseQuantityClick: (productId: string) => void;
  increaseQuantityClick: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  subTotalPrice: 0,
  totalPrice: 0,
  totalDiscounts: 0,
  products: [],
  addProductToCart: () => {},
  decreaseQuantityClick: () => {},
  increaseQuantityClick: () => {},
  removeProductFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            deliveryFee: true;
          };  
        };
      };
    }>,
    quantity: number
  ) => {
    const isProductOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id
    );
    if (isProductOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }
          return cartProduct;
        })
      );
    }

    setProducts((prev) => [...prev, { ...product, quantity: quantity }]);
  };

  const subTotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      // reduce takes a number from a list.
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  // total with discount
  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return (
        acc + calculateProductTotalPrice(product) * Number(product.quantity)
      );
    }, 0);
  }, [products]);

  const totalDiscounts = subTotalPrice - totalPrice;

  const decreaseQuantityClick = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity === 1) {
            return cartProduct;
          }
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }
        return cartProduct;
      })
    );
  };

  const increaseQuantityClick = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      })
    );
  };

  const removeProductFromCart = (productId: string) => {
    return setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId)
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        subTotalPrice,
        totalPrice,
        totalDiscounts,
        addProductToCart,
        decreaseQuantityClick,
        increaseQuantityClick,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
