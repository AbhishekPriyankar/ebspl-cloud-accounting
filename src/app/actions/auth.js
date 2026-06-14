"use server";

import { signOut } from "@/auth";

// Logout ALWAYS returns to the root portal (/). Project rule — never to a login page.
export async function doSignOut() {
  await signOut({ redirectTo: "/" });
}
