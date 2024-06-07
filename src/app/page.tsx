import CategoryList from "@/components/CategoryList";
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="pt-6">
        <Image
          src="/promo-banner-01.png"
          alt="30% promotion"
          width={0}
          height={0}
          className="w-full h-auto object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>
      <div className="space-y-3 pt-6">
        <div className="px-5 flex justify-between items-center">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button variant="ghost" className="text-primary px-0 hover:bg-transparent h-fit">
            ver todos
            <ChevronRightIcon size={16}/>
          </Button>
        </div>
        <ProductList />
      </div>
    </main>
  );
}
