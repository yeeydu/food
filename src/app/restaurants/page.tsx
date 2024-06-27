// Restaurants.tsx
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import db from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import Header from "@/components/Header";
import { Restaurant } from "@prisma/client";
import SearchClient from "./_actions/searchClient";

const Restaurants = async () => {
  const session = await getServerSession(authOptions);

  const initialRestaurants: Restaurant[] = await db.restaurant.findMany({ take: 10 });

  const userFavoriteRestaurant = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  const userFavoriteRestaurants = userFavoriteRestaurant.map((fav) => ({
    userId: fav.userId,
    restaurantId: fav.restaurantId,
  }));

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Found Restaurants</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchClient
            initialRestaurants={initialRestaurants}
            userFavoriteRestaurants={userFavoriteRestaurants}
          />
        </Suspense>
      </div>
    </>
  );
};

export default Restaurants;
