"use server";

import { signOut } from "@/lib/auth";

export const logOut = async () => {
  return await signOut();
};
