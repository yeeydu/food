import db from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_IP as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // get the id of the user session
    async session({ session, user }) {
      session.user = { ...session.user, id: user.id };
      return session;
    },
  },
};

// function GoogleProvider(arg0: {
//   clientId: string;
//   clientSecret: string;
// }): import("next-auth/providers/index").Provider {
//   throw new Error("Function not implemented.");
// }
