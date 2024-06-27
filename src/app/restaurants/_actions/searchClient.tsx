// ClientComponent.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Restaurant } from "@prisma/client";
import RestaurantItem from "@/components/RestaurantItem";
import { searchForRestaurants } from "./search";


interface ClientComponentProps {
  initialRestaurants: Restaurant[];
  userFavoriteRestaurants: { userId: string; restaurantId: string }[];
}

const SearchClient = ({
  initialRestaurants,
  userFavoriteRestaurants,
}: ClientComponentProps) => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>(initialRestaurants);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchFor]);

  return (
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
  );
};

export default SearchClient;
