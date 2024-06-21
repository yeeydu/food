import { DefaultSession } from "./node_modules/next-auth/core/types.d";

declare module "next-auth" {
  interface Session {
    user: {
      id? : string;
    } & DefaultSession["user"];
  }
}
