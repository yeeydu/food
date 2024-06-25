'use server'
import { revalidatePath } from 'next/cache';
import db from '../../lib/prisma'
import { Prisma } from "@prisma/client";

export const createOrder  = async (data: Prisma.OrderCreateInput ) => {
   const createOrder = await db.order.create({data});
   revalidatePath("/myOrders");
   return createOrder;
}
 
