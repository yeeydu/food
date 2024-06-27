/* eslint-disable @next/next/no-async-client-component */
"use client";
import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "./_actions/search";
import Header from "@/components/Header";
import RestaurantItem from "@/components/RestaurantItem";
import db from '../../lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface UserFavoriteRestaurant {
  userId: string;
  restaurantId: string;
}

const Restaurants = async () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const session = await getServerSession(authOptions); 
  
  const userFavoriteRestaurant = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id
    } 
   })

   const userFavoriteRestaurants: UserFavoriteRestaurant[] = userFavoriteRestaurant.map(fav => ({
    userId: fav.userId,
    restaurantId: fav.restaurantId,
  }));

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurant = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurant);
    };

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Found Restaurants</h2>
        <div className="flex flex-col w-full space-y-4">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              userFavoriteRestaurant={userFavoriteRestaurants} 
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
