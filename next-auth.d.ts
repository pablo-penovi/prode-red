import { DefaultSession } from "next-auth";
import Role from "./src/types/Role";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id?: string,
      role?: Role;
    } & DefaultSession["user"];
  }
}
