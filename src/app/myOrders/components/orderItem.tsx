"use client";
import { formatCurrency } from "@/components/_helpers/Price";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderStatus, Prisma } from "@prisma/client";

import { ChevronRightIcon, Divide } from "lucide-react";
import Link from "next/link";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED":
      return "Canceled";
    case "COMPLETED":
      return "Completed";
    case "CONFIRMED":
      return "Confirmed";
    case "DELIVERING":
      return "Delivering";
    case "PREPARING":
      return "Preparing";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className={`bg-[#EEEEEE] text-muted-foreground rounded-full px-2 py-1 w-fit ${order.status !== 'COMPLETED' && 'bg-green-500 text-white'}`}>
          <span className="text-xs font-semibold block">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>
            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>
          <Button variant="link" size={"icon"} className="w-5  h-5" asChild>
            <Link href={`/restaurants/${order.restaurantId}`}>
            <ChevronRightIcon />
            </Link>
          </Button>
        </div>
        <div className="py-3">
          <Separator />
        </div>
        <div className="space-y-2">
          {order.products.map((product) => (
            <div className="flex gap-2  items-center " key={product.id}>
              <div className="flex w-5 h-5 rounded-full bg-muted-foreground justify-center items-center">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>
              <span className="block text-muted-foreground text-xs">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>
        <div className="py-3">
          <Separator />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant="link"
            size="sm"
            className="text-primary text-xs"
            disabled={order.status !== "COMPLETED"}
          >
            Add to cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
