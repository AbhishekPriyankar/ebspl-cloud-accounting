# 02 — Authentication & Mock Google

Auth is built on **Auth.js (NextAuth v5)** with three providers, two of them
interchangeable.

## Providers

| Provider          | Purpose                                  | Active when                                  |
|-------------------|------------------------------------------|----------------------------------------------|
| **Credentials**   | Email + password sign-in                 | Always                                       |
| **Google (real)** | Real Google OAuth                        | `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` set |
| **Mock Google**   | Stand-in for Google, dev/testing only    | Real Google creds **absent** (current state) |

### Why a mock at all

Real Google OAuth credentials are not available right now. Rather than stub out
"Sign in with Google" entirely (which would leave the whole session/guard/logout
chain untested), the **Mock Google provider issues a real session** — so everything
downstream of identity is genuinely exercised and verifiable.

## How the real ↔ mock swap works (zero code change)

`src/auth.ts` decides at startup which Google path to register:

```ts
const hasRealGoogle =
  !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;

const googleProvider = hasRealGoogle
  ? Google({                                  // real OAuth
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  : Credentials({                             // mock: id="mock-google"
      id: "mock-google",
      name: "Google (mock)",
      credentials: { email: { label: "Profile email" } },
      authorize: async ({ email }) => {
        // look up one of the 14 seeded profiles, return it as the user
        return await getUserByEmail(email);
      },
    });
```

The login page renders **one** "Continue with Google" button regardless. Behind it:

- **Real mode:** `signIn("google")` → Google consent screen → callback → session.
- **Mock mode:** `signIn("mock-google", { email })` → a dev-only profile picker
  (reusing the 14 profiles) → session.

When real credentials arrive, you add them to `.env.local` and restart — `hasRealGoogle`
flips to `true`, the real provider registers, the mock disappears. **No code edits.**

## Mock Google UX (dev only)

Clicking "Continue with Google" in mock mode opens a small picker listing the 14
seeded profiles grouped by role (Admin / Accountant / Client / User) — mirroring the
prototype's behavior. Selecting one calls `signIn("mock-google", { email })` and
creates a real authenticated session for that user.

The picker is guarded so it can **never** render in production:
`process.env.NODE_ENV !== "production" && !hasRealGoogle`.

## Email / password (Credentials provider)

- `authorize()` looks up the user by email, verifies the password hash (bcrypt).
- Seeded profiles get a known dev password (documented in
  `05-local-setup-and-testing.md`) so email/password can be tested immediately.
- No demo-email auto-login fallback (the prototype's bug we explicitly removed stays gone).

## Sessions

- **Strategy:** JWT session cookies (works without a session table; simplest for local
  + serverless). Can switch to database sessions later via the Prisma adapter.
- Session carries `{ id, name, email, role, initial, company, loginMethod }` so the UI
  has the same shape it had from the prototype's `ebspl_user` object.

## Route protection (replaces the `<head>` guard)

`src/middleware.ts` runs on the server before any protected route renders:

```ts
export default auth((req) => {
  const isAuthed = !!req.auth;
  const isPublic = ["/", "/login"].includes(req.nextUrl.pathname);
  if (!isAuthed && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
});
```

Unlike the prototype's `localStorage` check, this **cannot be bypassed** from the
browser.

## Logout — the project's hard rule

Logout MUST always return to the root (`/`), never to a login page or dashboard URL.
(User corrected this repeatedly in the prototype.)

```ts
signOut({ callbackUrl: "/" });
```

Every sign-out control in the app uses exactly this. No exceptions.

## Checklist: switching mock → real Google later

1. Create OAuth client at https://console.cloud.google.com (Web application).
2. Redirect URI: `http://localhost:3000/api/auth/callback/google`
   (and the production URL when deployed).
3. Put `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`.
4. Restart the dev server. Done — real Google is now live, mock is gone.
