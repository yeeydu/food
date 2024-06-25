
import { Secret } from "./../../../../../node_modules/next-auth/src/jwt/types";
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);   

export { handler as GET, handler as POST };
