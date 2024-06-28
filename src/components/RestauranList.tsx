import { getServerSession } from "next-auth";
import db from "../lib/prisma";
import RestaurantItem from "./RestaurantItem";
import { authOptions } from "@/lib/auth";

interface UserFavoriteRestaurant {
  userId: string;
  restaurantId: string;
}

const RestaurantList = async () => {
  const session = await getServerSession(authOptions);

  // get restaurant with the highest requests
  const restaurants = await db.restaurant.findMany({ take: 10 });

  const userFavoriteRestaurant = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  const userFavoriteRestaurants: UserFavoriteRestaurant[] = userFavoriteRestaurant.map(fav => ({
    userId: fav.userId,
    restaurantId: fav.restaurantId,
  }));

  return (
    <div className="flex overflow-x-scroll gap-4 px-5 [&:: -webkit-scrollbar]:hidden ">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          restaurant={restaurant}
          key={restaurant.id}
          userId={session?.user?.id}
          userFavoriteRestaurant={userFavoriteRestaurants}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
