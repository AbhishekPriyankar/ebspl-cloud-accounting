// Full Auth.js config (server-only — uses Prisma + bcrypt).
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/auth.config";

// Real Google is used only when BOTH credentials are present; otherwise the
// Mock Google provider stands in (issues a real session for a seeded profile).
export const hasRealGoogle =
  !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;

function toSessionUser(u, method) {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    initial: u.initial,
    company: u.company,
    loginMethod: method || u.loginMethod || "password",
  };
}

// Email + password
const credentialsProvider = Credentials({
  id: "credentials",
  name: "Email & Password",
  credentials: { email: {}, password: {} },
  authorize: async (creds) => {
    if (!creds?.email || !creds?.password) return null;
    const email = String(creds.email).toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) return null;
    const ok = await bcrypt.compare(String(creds.password), user.passwordHash);
    if (!ok) return null;
    return toSessionUser(user, "password");
  },
});

// Google (real) OR Mock Google (dev). Same button on the login page either way.
const googleProvider = hasRealGoogle
  ? Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  : Credentials({
      id: "mock-google",
      name: "Google (mock)",
      credentials: { email: {} },
      authorize: async (creds) => {
        if (!creds?.email) return null;
        const email = String(creds.email).toLowerCase().trim();
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        return toSessionUser(user, "google");
      },
    });

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [credentialsProvider, googleProvider],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.initial = user.initial;
        token.company = user.company;
        token.loginMethod = user.loginMethod;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.initial = token.initial;
        session.user.company = token.company;
        session.user.loginMethod = token.loginMethod;
      }
      return session;
    },
  },
});
