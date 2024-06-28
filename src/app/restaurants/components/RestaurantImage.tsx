"use client";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useToggleFavoriteRestaurant from "@/app/_hooks/useToggleFavoriteRestaurant";
import { useSession } from "next-auth/react";
import { isRestaurantFavorited } from "@/components/_helpers/FavoritedRestaurant";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
  userFavoriteRestaurant: UserFavoriteRestaurant[];
}

// Pick from typescript selects unique fields from a object

const RestaurantImage = ({
  restaurant,
  userFavoriteRestaurant,
}: RestaurantImageProps) => {
  const router = useRouter();
  const { data } = useSession();
  const handleBackClick = () => router.back();

  const isFavorite = isRestaurantFavorited(
    restaurant.id,
    userFavoriteRestaurant
  );

  const { handleFavoriteClick } = useToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: data?.user.id,
    restaurantIsFavorite: isFavorite,
    userFavoriteRestaurant,
  });

  return (
    <div className="relative w-full h-[250px]">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        onClick={handleBackClick}
        className="absolute top-4 left-4 rounded-full  hover:bg-secondary hover:text-black"
        size="icon"
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        size="icon"
        onClick={handleFavoriteClick}
        className={`absolute top-4 right-4 rounded-full b g-gray-700 hover:bg-secondary hover:text-black ${isFavorite && "bg-red-600 hover:bg-gray-700"}`}
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
