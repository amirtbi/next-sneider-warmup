"use server";
import { signIn, signOut } from "@/lib/auth";

export const logIn = async () => {
  return await signIn("github");
};

export const logOut = async () => {
  return await signOut();
};
