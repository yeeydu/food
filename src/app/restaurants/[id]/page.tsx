import { notFound } from "next/navigation";
import db from "../../../lib/prisma";
import RestaurantImage from "../components/RestaurantImage";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/components/DeliveryInfo";
import ProductList from "@/components/ProductList";
import CartBanner from "./CartBanner";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
 

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: id,
    },
    include: {
      categories: {
        orderBy: {
          name: "asc",
        },
        include: {
          products: {
            take: 10,
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) return notFound();

  const session = await getServerSession(authOptions);
  const userFavoriteRestaurant = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    }
  })

  return (
    <>
      <div>
        <RestaurantImage restaurant={restaurant} userFavoriteRestaurant={userFavoriteRestaurant} />
      </div>
      <div className="flex justify-between item-center pt-5 px-5">
        <div className="flex item-center gap-[0.35rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="font-semibold text-xl">{restaurant.name}</h1>
        </div>

        <div className="flex bg-foreground text-white  gap-[3px] px-2 py-[2px] rounded-full items-center">
          <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
          <span className="font-semibold text-sm">5.0</span>
        </div>
      </div>

      <DeliveryInfo restaurant={restaurant} />

      <div className="flex overflow-x-scroll px-5 mt-3 [&::-webit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            className="bg-[#f4f4f4] min-w-[167px] gap-4 rounded-xl text-center"
            key={category.id}
          >
            <span className="text-muted-foreground text-xs ">
              {category.name}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-4">
        {/*TODO SHOW MORE POPULAR PRODUCTS */}
        <h2 className="text-semebold px-5">More Popular</h2>
      </div>
      <ProductList products={restaurant.products} />
      {restaurant.categories.map((category) => (
        <div className="mt-6 space-y-4" key={category.id}>
          <h2 className="text-semebold px-5">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}
      <CartBanner restaurant={restaurant} />
    </>
  );
};

export default RestaurantPage;
