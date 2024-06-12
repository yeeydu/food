import RestaurantItem from "@/components/RestaurantItem";
import db from "../../../lib/prisma";
import Header from "@/components/Header";

const RecomendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({});

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
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecomendedRestaurants;
