import Header from "@/components/Header";
import RestaurantItem from "@/components/RestaurantItem";
import { authOptions } from "@/lib/auth";
import db from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const myFavoriteRestaurants = async() => {
    const session = await getServerSession(authOptions);

    if(!session){
        return notFound(); 
    }

    const useFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
        where: {
            userId: session.user.id,
        },
        include:{
            restaurant: true,
        }
    });
 
    return (    <> 
        <Header/>
          <div className="px-5 py-6">
            <h2 className="mb-6 text-lg font-semibold">Favorite Restaurants</h2>
            <div className="flex flex-col w-full space-y-4">
              {useFavoriteRestaurants.length > 0 ? useFavoriteRestaurants.map(({restaurant}) => ( // add a destructuring restaurant object
                <RestaurantItem
                  key={restaurant.id}
                  restaurant={restaurant}
                  className="min-w-full max-w-full" 
                  userFavoriteRestaurant={useFavoriteRestaurants}            />
              ))
              : <h3>There are no favorite restaurants</h3>
              }
            </div>
          </div>
        </>);
}
 
export default myFavoriteRestaurants;