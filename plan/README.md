# EBSPL Cloud Accounting — Fresh Build (Next.js)

This is a **fresh build** of the EBSPL Cloud Accounting product on a modern stack.
The **same product** (same features and design intent as the prototype) is **rebuilt
from scratch** — *not* migrated. **Only the technology changes**: from static HTML +
in-browser Babel + fake `localStorage` auth to a real, deployable full-stack Next.js
application.

> **Not a code port.** The old prototype's HTML/JS is **not** copied over. The prototype
> stays intact and untouched as a *visual reference* for look & feel; every page here is
> built fresh on the new stack.

## Goal

Build a **deployable product** with:

- A real build step (no more Babel-standalone limitations: `?.`, `??`, etc. all work)
- Real authentication (Google OAuth + email/password) backed by server sessions
- A real database (profiles and accounting data in tables, not hardcoded JS)
- A single deployable Node.js app

> **Reference prototype:** `c:\Users\abhi_\projects\stitch_react_authentication_dashboard`
> (kept intact and untouched — used only to look at the intended UI/UX; its code is not reused).

## Stack

| Concern    | Choice                                    | Notes                                            |
|------------|-------------------------------------------|--------------------------------------------------|
| Framework  | **Next.js (App Router)**                  | One codebase: frontend + API + deploy            |
| Auth       | **Auth.js (NextAuth v5)**                 | Google + Credentials providers, cookie sessions  |
| DB (dev)   | **SQLite via Prisma**                     | Zero install on Windows                           |
| DB (prod)  | **PostgreSQL via Prisma**                 | One-line provider swap later                      |
| Styling    | **Built fresh** (CSS Modules / global CSS) | Matches prototype's look; written new, not copied |
| Runtime    | **Node.js LTS (v20+)**                     | Not yet installed — see `05-local-setup-and-testing.md` |

## Current status

**Planning.** Nothing scaffolded yet. Node.js is not installed on the machine
(prerequisite). Google OAuth credentials are unavailable, so auth will use a
**mock Google provider** (see `02-auth-and-mock-google.md`) until real credentials
are supplied.

## Plan documents

1. [`01-architecture.md`](01-architecture.md) — stack rationale, folder structure, key decisions
2. [`02-auth-and-mock-google.md`](02-auth-and-mock-google.md) — Auth.js design, real-vs-mock Google, the logout rule
3. [`03-data-model.md`](03-data-model.md) — Prisma schema, the 14 profiles, seeding
4. [`04-migration-phases.md`](04-migration-phases.md) — phased build plan + page→route mapping
5. [`05-local-setup-and-testing.md`](05-local-setup-and-testing.md) — prerequisites, env, run commands, test approach

## Guiding principle

**Vertical slice first.** Build the smallest end-to-end chain (login → session →
protected dashboard → logout) before building out all pages. Prove it works, then
build the rest.
