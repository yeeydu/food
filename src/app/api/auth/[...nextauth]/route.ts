import db from "@/lib/prisma";
import { Secret } from "./../../../../../node_modules/next-auth/src/jwt/types";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

const handler = NextAuth({

  adapter: PrismaAdapter(db) as Adapter,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_IP as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: { // get the id of the user session
    async session({session, user}){
      session.user = {...session.user, id: user.id} 
      return session;
    }
  }
});   

export { handler as GET, handler as POST };
