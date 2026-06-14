# 01 — Architecture

## Why Next.js (and not the alternatives)

| Option                     | Verdict | Reason                                                                 |
|----------------------------|---------|-----------------------------------------------------------------------|
| **Next.js (App Router)**   | ✅ Chosen | One codebase for UI + API + auth + deploy. Auth.js + Google OAuth nearly free. |
| Vite + separate Express    | ❌       | Two apps, two deploys, hand-build all auth/session/guard plumbing.     |
| Keep static + Python/Express server | ❌ | Doesn't address Babel limits, fake auth, or duplication. Not a product. |

The prototype's fake "Sign in with Google" picker was *simulating* OAuth. Next.js +
Auth.js gives the real thing, with the mock as a drop-in stand-in until credentials exist.

## What gets reused vs built fresh

This is a fresh build, **not** a port. The prototype's *code* is not copied; only its
**look & feel and feature set** inform what we build new.

| Prototype aspect                          | Treatment in fresh build                         |
|-------------------------------------------|--------------------------------------------------|
| Visual design / layout / look & feel      | **Reference only** — rebuilt fresh as JSX + new CSS |
| Feature set (pages, flows)                | **Kept as spec** — same features, new code        |
| 14 dummy profiles (`profiles.js`)         | **Reused as seed data** — values copied into DB seed |
| HTML / inline JS                          | **Not reused** — rebuilt from scratch            |
| In-browser Babel transpilation            | Gone — replaced by Next.js build                 |
| CDN React globals                         | Gone — replaced by npm imports                   |
| `localStorage` auth + sync `<head>` guard | Gone — replaced by Auth.js sessions + middleware |
| Duplicated `<head>`/sidebar boilerplate   | Gone — single shared layout                      |

## Target folder structure

```
ebspl-next/
├── plan/                         ← this documentation
├── prisma/
│   ├── schema.prisma             ← User, Account, Session + app tables
│   └── seed.ts                   ← 14 profiles → DB rows
├── public/                       ← static assets (images, favicons)
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/page.jsx    ← login page (built fresh)
│   │   ├── (app)/
│   │   │   ├── layout.jsx        ← shared sidebar + topbar
│   │   │   ├── dashboard/page.jsx
│   │   │   ├── fms/page.jsx
│   │   │   └── …                 ← remaining pages, one route each
│   │   ├── api/auth/[...nextauth]/route.js  ← Auth.js handler
│   │   ├── layout.jsx            ← root layout (html/body, global CSS)
│   │   └── page.jsx              ← index / navigation hub
│   ├── components/               ← Sidebar, TopBar, Card, StatTile, …
│   ├── lib/
│   │   ├── prisma.js             ← Prisma client singleton
│   │   └── profiles.js           ← profile helpers
│   ├── auth.ts                   ← Auth.js config (providers, callbacks)
│   ├── auth.config.ts            ← edge-safe config used by middleware
│   ├── middleware.ts             ← route guard (replaces <head> script)
│   └── styles/                   ← global + module CSS, written fresh
├── .env.local                    ← secrets (gitignored)
├── .env.example                  ← template (committed, no secrets)
├── next.config.mjs
├── package.json
└── README.md
```

## Key decisions

- **App Router (not Pages Router)** — current Next.js default; layouts solve the
  duplication problem natively.
- **JSX, not TSX, for pages** — keeps page authoring simple; can adopt TypeScript
  incrementally. (`auth.ts`/`prisma` may use TS for type safety.)
- **Server-side route protection** via `middleware.ts` — cannot be bypassed by clearing
  `localStorage` the way the prototype's guard can.
- **Logout always returns to `/`** — non-negotiable project rule; implemented as
  `signOut({ callbackUrl: '/' })`. See `02-auth-and-mock-google.md`.
