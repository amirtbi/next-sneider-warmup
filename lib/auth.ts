import "dotenv/config";

import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  // debug: true,
  providers: [
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
