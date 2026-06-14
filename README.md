# EBSPL Cloud Accounting — Next.js

Node.js / Next.js implementation of the EBSPL Cloud Accounting platform.

The **hub**, **login**, and **enterprise dashboard** are rebuilt as native React on a
real auth backend; the remaining prototype screens are served from `public/` behind the
same login. (See [`plan/`](plan/) for the full architecture & migration notes.)

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Auth | Auth.js (NextAuth v5) — email/password + Google (mock provider when no creds) |
| Database | Prisma + SQLite (dev) — Postgres-ready |
| Styling | Tailwind CSS (login/hub theme) + the prototype's own CSS |

## Prerequisites

- **Node.js LTS v20+** (developed on v24). Check: `node -v`

## Local setup

```bash
# 1. install dependencies
npm install

# 2. create env files (they are gitignored — copy the template)
cp .env.example .env.local     # read by the Next.js app
cp .env.example .env           # read by the Prisma CLI
#    On Windows CMD:  copy .env.example .env.local  &&  copy .env.example .env
#    Then set AUTH_SECRET in both (any random string for local, or run: npx auth secret)

# 3. create the database and seed the 14 demo profiles
npx prisma migrate dev --name init    # creates prisma/dev.db
npm run seed

# 4. start the dev server
npm run dev                            # http://localhost:3000
```

## Signing in (local / no Google credentials needed)

A **Mock Google** provider is active automatically until real Google credentials are set.

- **Email + password:** any seeded email + password `Ebspl@123`
  - `s.chen@gmail.com` (Admin) · `e.rodriguez@ebspl.com` (Accountant) · `priya.sharma@gmail.com` (Client)
- **Continue with Google:** opens a picker of the 14 seeded profiles → signs you in
- **Sign out** always returns to `/`

## Enabling real Google OAuth (optional)

1. Create an OAuth client at <https://console.cloud.google.com> (type: **Web application**).
2. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
3. Put `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`, then restart.

The mock provider disables itself automatically once real credentials are present — no code changes.

## Project structure

```
src/app/page.js                 Hub (index.html, served verbatim) + session bar
src/app/(auth)/login/           Login page (native React, purple theme)
src/app/(app)/dashboard/        Enterprise dashboard SPA (the prototype's code on Next)
src/auth.js, auth.config.js     Auth.js config (providers, callbacks)
src/proxy.js                    Route guard (Next 16 middleware/"proxy")
src/lib/prisma.js               Prisma client singleton
src/lib/ebspl-profiles.js       14 demo profiles (used by the dashboard SPA)
prisma/schema.prisma            DB schema   ·  prisma/seed.js  seeds the 14 profiles
public/*                        Remaining prototype screens (served behind login)
plan/                           Architecture & migration docs
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (http://localhost:3000) |
| `npm run build` / `npm run start` | Production build / serve |
| `npm run seed` | (Re)seed the 14 demo profiles |

## Notes

- **Database:** SQLite locally. For Postgres, change `provider` in `prisma/schema.prisma`
  and `DATABASE_URL`.
- **Prisma reads `.env`** (not `.env.local`), so `DATABASE_URL` must be present in `.env`.
- **Dev cache:** if Turbopack throws a stale "module not found" after heavy edits, stop the
  server, delete `.next/`, and restart.
