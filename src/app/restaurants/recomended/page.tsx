import RestaurantItem from "@/components/RestaurantItem";
import db from "../../../lib/prisma";
import Header from "@/components/Header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const RecomendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({});
  const session = await getServerSession(authOptions);
  const userFavoriteRestaurant = await db.userFavoriteRestaurant.findMany({
      where: {
        userId: session?.user?.id,
      },
      include: {
        restaurant: true,
      }
    });

  return (
    <>
    <Header/>
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Recomended Restaurants</h2>
        <div className="flex flex-col w-full space-y-4">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full" 
              userFavoriteRestaurant={userFavoriteRestaurant}            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecomendedRestaurants;
