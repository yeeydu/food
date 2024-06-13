import Header from "@/components/Header";
import ProductItem from "@/components/ProductItem";
import db from "@/lib/prisma";
import { Turret_Road } from "next/font/google";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id: id,
    },
    include: {
      products: {
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

  if(!category){
    return notFound(); 
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">{category.name }</h2>
        <div className="grid grid-cols-2  gap-6">
          {category?.products.map((product) => (
            <ProductItem key={product.id} product={product}  className="min-w-full"/>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
