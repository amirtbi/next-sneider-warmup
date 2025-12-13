"use server";

import { signIn } from "@/lib/auth";

export const logIn = async () => {
  return await signIn("github");
};
