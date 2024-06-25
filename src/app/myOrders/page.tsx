import { getServerSession } from "next-auth";
import db from "../../lib/prisma";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import OrderItem from "./components/orderItem";

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions); // faster than session

  if (!session?.user) {
    return redirect("/ "); 
  }

  const orders = await db.order.findMany({
    where: {
        userId: session.user.id,
    },
    include: {
        restaurant: true,
        products : {
          include: {
            product: true,
          }
        }
    }
  });
  return (
    <>
      <Header />
      <div className="px-5 py-6">
         <h2 className="font-semibold pb-6  text-lg">My Orders</h2>
         <div className="space-y-3">
            {orders.map((order) => (
                <OrderItem order={order} key={order.id} />
            ))}
         </div>
      </div>
    </>
  );
};

export default MyOrdersPage;
