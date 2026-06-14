// Edge-safe Auth.js config (NO Prisma / bcrypt here — this runs in middleware).
// The route guard lives in the `authorized` callback below; it replaces the old
// prototype's synchronous <head> localStorage check and cannot be bypassed client-side.

const PUBLIC_PATHS = ["/", "/login"];

export const authConfig = {
  pages: { signIn: "/login" },
  trustHost: true,
  providers: [], // real providers are added in auth.js (server-only)
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublic = PUBLIC_PATHS.includes(nextUrl.pathname);
      if (isPublic) return true;
      return isLoggedIn; // false -> redirect to pages.signIn (/login)
    },
  },
};
