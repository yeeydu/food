import db from "../../../lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "../components/ProductImage";
import ProductDetails from "../components/ProductDetails";

interface ProductPageId { 
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageId) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  const complementaryProducts = await db.product.findMany({ 
    where: {
      category: {
        name: 'Su cos',
      },
      restaurant:{
        id: product?.restaurantId,
      }
    },
    include:{
      restaurant: true,
    }
  });

  if (!product) {
    return notFound();
  }
 
  return (
    <div>
      {/*IMAGEM*/}
      <ProductImage product={product} />
      {/*title price*/}
      <ProductDetails product={product} complementaryProduct={complementaryProducts}/>
    </div>
  );
};

export default ProductPage;
