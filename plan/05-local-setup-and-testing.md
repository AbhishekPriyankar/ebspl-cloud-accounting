# 05 — Local Setup & Testing

Everything runs locally on Windows. No external services required (Google is mocked,
DB is a local SQLite file).

## Prerequisites

1. **Node.js LTS (v20+)** — *not yet installed.*
   Download from https://nodejs.org → run the Windows installer → reopen the terminal.
   Verify:
   ```powershell
   node -v   # expect v20.x or newer
   npm -v
   ```

That's the only prerequisite. (Google credentials are **not** needed — see the mock
provider in `02-auth-and-mock-google.md`.)

## Environment file

`.env.local` (gitignored) — created during Phase 1. Template (`.env.example`, committed):

```bash
# --- Auth.js ---
AUTH_SECRET="generate-with: npx auth secret"
AUTH_URL="http://localhost:3000"

# --- Database (SQLite for local dev) ---
DATABASE_URL="file:./dev.db"

# --- Google OAuth (leave BLANK to use the mock provider) ---
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

When `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` are blank, the **Mock Google**
provider is active automatically.

## First-run commands

```powershell
cd c:\Users\abhi_\projects\ebspl-next
npm install
npx prisma migrate dev --name init   # create SQLite tables
npx prisma db seed                   # load the 14 profiles + sample data
npm run dev                          # start at http://localhost:3000
```

## Dev credentials (seeded)

- **Email/password:** any of the 14 seeded profile emails + the shared dev password
  `Ebspl@123` (defined in `prisma/seed.ts`).
- **Mock Google:** click "Continue with Google" → pick any of the 14 profiles from the
  dev picker → real session created.

> These are local-only dev credentials. They never apply in production (mock provider
> is disabled when `NODE_ENV=production` or real Google creds are present).

## How auth gets tested without real Google

Because the mock provider issues a **real session**, the full chain is verifiable now:

| What to verify                          | How                                                                 |
|-----------------------------------------|---------------------------------------------------------------------|
| Unauthed access blocked                 | Visit `/dashboard` logged out → expect redirect to `/login`         |
| Email/password sign-in                  | Submit a seeded email + `Ebspl@123` → expect landing on `/dashboard`|
| Mock Google sign-in                     | Click Google → pick a profile → expect authenticated session        |
| Session persists                        | Refresh the page → still logged in (cookie present)                  |
| Logout returns to `/`                   | Click sign out → expect URL `/`, session cleared                    |
| Role/profile data flows to UI           | Confirm name/initial/role shown match the seeded profile            |

Verification will be done by **driving the running app in a browser** (the real
surface), not by unit-testing functions — capturing the redirect, the session cookie,
and the post-login UI as evidence.

## When real Google credentials arrive

Follow the checklist in `02-auth-and-mock-google.md` — add the two env vars, restart,
done. No code changes.
