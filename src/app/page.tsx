import CategoryList from "@/components/CategoryList";
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import db from "../lib/prisma";
import PromoBanner from "@/components/PromoBanner";
import RestaurantList from "@/components/RestauranList";
import Link from "next/link";

const fetch = async () => {
  const getProducts = db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  const getBurguersCategory = db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzasCategory = db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [products, burguersCategory, pizzasCategory] = await Promise.all([
    getProducts,
    getBurguersCategory,
    getPizzasCategory,
  ]);

  return { products, burguersCategory, pizzasCategory };
};

export default async function Home() {
  const { products, burguersCategory, pizzasCategory } = await fetch();

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <PromoBanner src="/promo-banner-01.png" alt="30% promotion" />
        </Link>
      </div>
      <div className="space-y-3 pt-6">
        <div className="px-5 flex justify-between items-center">
          <h2 className="font-semibold">Recommended Orders</h2>
          <Button
            variant="ghost"
            className="text-primary px-0 hover:bg-transparent h-fit"
            asChild
          >
            <Link href={"/products/recommended"}>
              see all
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>
      <div className="px-5 pt-6">
        <Link href={`/categories/${burguersCategory?.id}/products`}>
          <PromoBanner src="/promo-banner-02.png" alt="Desde 17 € " />
        </Link>
      </div>
      <div className="space-y-4 py-6">
        <div className="px-5 flex justify-between items-center">
          <h2 className="font-semibold">Recommended Restaurants</h2>
          <Button
            variant="ghost"
            className="text-primary px-0 hover:bg-transparent h-fit"
            asChild
          >
            <Link href="/restaurants/recomended">
              see all
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </main>
  );
}
