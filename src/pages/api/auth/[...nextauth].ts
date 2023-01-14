import NextAuth, { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../server/env.mjs";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import Role from "../../../types/Role";

const ADMINS = ['pablopenovi@gmail.com']

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    // Set role according to user email
    async session({ session, user }) {
      console.log(JSON.stringify(session))
      console.log(JSON.stringify(user))
      if (session.user) {
        session.user.id = user?.id
        session.user.role = ADMINS.includes(user?.email || '') ? Role.admin : Role.user
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 40000,
      },
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      httpOptions: {
        timeout: 40000,
      },
    })
  ],
  session: {
    strategy: "database"
  }
};

export default NextAuth(authOptions);
