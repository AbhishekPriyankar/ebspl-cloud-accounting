// Route guard (Next.js 16 "proxy" convention; replaces the old "middleware" file).
// Uses the edge-safe config only (no Prisma/bcrypt on the edge).
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export const { auth: proxy } = NextAuth(authConfig);
export default proxy;

export const config = {
  // Run on everything except API routes, Next internals, and static files.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
