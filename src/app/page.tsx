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

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true, // this way we get the restaurant name from the product restautantId relation
        },
      },
    },
  });


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
        <PromoBanner 
        src="/promo-banner-01.png" 
        alt="30% promotion" 
        />
      </div>
      <div className="space-y-3 pt-6">
        <div className="px-5 flex justify-between items-center">
          <h2 className="font-semibold">Recommended Orders</h2>
         <Link href={"/products/recommended"}>
         <Button
            variant="ghost"
            className="text-primary px-0 hover:bg-transparent h-fit"
          >
            see all
            <ChevronRightIcon size={16} />
          </Button>
         </Link>
        </div>
        <ProductList products={products} />
      </div>
      <div className="px-5 pt-6">
      <PromoBanner 
        src="/promo-banner-02.png" 
        alt="Desde 17 € " 
        />
      </div>
      <div className="space-y-4 py-6">
        <div className="px-5 flex justify-between items-center">
          <h2 className="font-semibold">Recommended Restaurants</h2>
          <Link href="/restaurants/recomended">
          <Button
            variant="ghost"
            className="text-primary px-0 hover:bg-transparent h-fit"
          >
            see all
            <ChevronRightIcon size={16} />
          </Button>
          </Link>
        </div>
        <RestaurantList   />
      </div>
    </main>
  );
}
