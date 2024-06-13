import Header from '@/components/Header';
import ProductItem from '@/components/ProductItem';
import db from '@/lib/prisma'

const ReomendedProductsPage = async () => {
    //get products with high request

    const products = await db.product.findMany({
        where: {
          discountPercentage: {
            gt: 0,
          },
        },
        take: 20,
        include: {
          restaurant: {
            select: {
              name: true, // this way we get the restaurant name from the product restautantId relation
            },
          },
        },
      });


    return (    <>
        <Header />
        <div className="px-5 py-6">
          <h2 className="mb-6 text-lg font-semibold">Recommended Orders</h2>
          <div className="grid grid-cols-2  gap-6">
            { products.map((product) => (
              <ProductItem key={product.id} product={product}  className="min-w-full"/>
            ))}
          </div>
        </div>
      </> );
}
 
export default ReomendedProductsPage;