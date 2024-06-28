import { UserFavoriteRestaurant } from "./../../../node_modules/.prisma/client/index.d";
import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { useRouter } from "next/navigation";

interface UseToggleFavoriteRestaurantProps {
  userId?: string;
  restaurantId: string;
  userFavoriteRestaurant: UserFavoriteRestaurant[];
  restaurantIsFavorite?: boolean;
}

const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  userFavoriteRestaurant,
  restaurantIsFavorite,
}: UseToggleFavoriteRestaurantProps) => {

  const router = useRouter();

  const handleFavoriteClick = async () => {
    if (!userId) return;
    try {
      await toggleFavoriteRestaurant(userId, restaurantId);
      toast(restaurantIsFavorite
        ? "Restaurant removed from favorites."
        : "Restaurant added to favorites.", {
        action: {
          label: "Favorite Restaurants",
          onClick: () => router.push("/myFavoriteRestaurants"),
        }, 
    });
   } catch (error) {
      toast.error("Error trying to favorite a Restaurant");
    }
  };

  return { handleFavoriteClick };
};

export default useToggleFavoriteRestaurant;


