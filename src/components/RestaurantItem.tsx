"use client";
import { Restaurant,  } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "./_helpers/Price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toggleFavoriteRestaurant } from "@/app/_actions/restaurant";
import { toast } from "sonner";

interface UserFavoriteRestaurant {
  userId: string;
  restaurantId: string;
}

interface RestaurantItemProps {
  userId?: string;
  restaurant: Restaurant;
  className?: string;
  userFavoriteRestaurant: UserFavoriteRestaurant[];
}

const RestaurantItem = ({
  restaurant,
  className,
  userId,
  userFavoriteRestaurant,
}: RestaurantItemProps) => {
  const handleFavoriteClick = async () => {
    if (!userId) return;
    try {
      await toggleFavoriteRestaurant(userId, restaurant.id);
      toast.success(
        isFavorite
          ? "Restaurant removed from favorites."
          : "Restaurant added to favorites."
      );
    } catch (error) {
      toast.error("Error trying to favorite a Restaurant");
    }
  };

  const isFavorite = userFavoriteRestaurant.some(
    (fav) => fav.restaurantId === restaurant.id
  );

  return (
    <div>
      <div className={cn("min-w-[266px] max-w-[266px] space-y-3", className)}>
        <div className="relative w-full h-[136px]">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="object-cover rounded-lg shadow-md"
            />
          </Link>
          <div className="flex bg-white absolute top-2 left-2 gap-[2px] px-2 py-[2px] rounded-full items-center">
            <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
            <span className="font-semibold text-sm">5.0</span>
          </div>
          {userId && (
            <Button
              size="icon" 
              className={`absolute top-2 right-2 rounded-full bg-gray-700 h-7 w-7 hover:bg-red-700 ${
                isFavorite && "bg-red-600 hover:bg-gray-700"
              }`}
              onClick={handleFavoriteClick}
            >
              <HeartIcon size={16} className="fill-white" />
            </Button>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-sm">{restaurant.name}</h3>
          <div className="flex gap-3">
            <div className="flex gap-1 items-center">
              <BikeIcon size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? " Free Delivery"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <TimerIcon size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
