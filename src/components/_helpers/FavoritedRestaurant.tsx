import { UserFavoriteRestaurant } from "@prisma/client";

export const isRestaurantFavorited = (
  restaurantId: string,
  userFavoriteRestaurant: UserFavoriteRestaurant[]
) => userFavoriteRestaurant?.some((fav) => fav.restaurantId === restaurantId);
