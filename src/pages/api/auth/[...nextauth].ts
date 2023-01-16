import NextAuth, { Profile, type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../server/env.mjs";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import Role from "../../../types/Role";

const ADMINS = ['pablopenovi@gmail.com']
const EMAIL_VERIFICATION_FN = {
  google: (profile: Profile) => profile.email_verified as boolean,
  discord: (profile: Profile) => profile.verified as boolean,
  default: () => true,
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ account, profile }) {
      const verificationFunction = (Object.keys(EMAIL_VERIFICATION_FN) as (keyof typeof EMAIL_VERIFICATION_FN)[])
        .filter((key) => key === account.provider)
        .map((key) => EMAIL_VERIFICATION_FN[key])
        .find((verifFn) => !!verifFn) || EMAIL_VERIFICATION_FN.default
      
      return verificationFunction(profile)
    },
    // Set role according to user email
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user?.id
        
        if (ADMINS.includes(user?.email || '')) {
          session.user.role = Object.values(Role)
        } else {
          session.user.role = [Role.user]
        }
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
      allowDangerousEmailAccountLinking: true,
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      httpOptions: {
        timeout: 40000,
      },
      allowDangerousEmailAccountLinking: true,
    })
  ],
  session: {
    strategy: "database"
  },
  events: {
    async linkAccount({ user, account, profile }) {
      console.log(JSON.stringify(user))
      console.log(JSON.stringify(account))
      console.log(JSON.stringify(profile))
    }
  }
};

export default NextAuth(authOptions);
