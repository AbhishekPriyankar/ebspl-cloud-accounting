# 04 — Build Phases

Fresh build (not a port). Built as a **vertical slice first**, then page by page. Each
phase has a clear "done" criterion so progress is observable.

> ## ✅ Status: Phase 0 + Phase 1 COMPLETE (2026-06-14)
>
> Vertical slice built and verified end-to-end (login → session → protected dashboard
> → logout). Deviations from the original plan:
> - **Prisma 6**, not 7 — Prisma 7 dropped `url` in schema and mandates driver
>   adapters + a TS config; v6 keeps the simpler `url`-in-schema SQLite setup.
> - **`src/proxy.js`**, not `middleware.ts` — Next.js 16 renamed the middleware file
>   convention to "proxy". Same guard, same matcher.
> - **All JS** (no TS) — `auth.js`, `proxy.js`, seed in plain JS. Seeding is
>   `npm run seed` (CJS script), not `prisma db seed`.
> - Versions: Next 16.2.9, React 19.2.4, next-auth 5.0.0-beta.31, Prisma 6.19.3.
> - **Dev gotcha:** killing `next dev` mid-compile can corrupt `.next` (phantom
>   "Cannot find module" + multi-minute compiles). Fix: stop, `rm -rf .next`, restart.

## Phase 0 — Prerequisites ✅

- [x] Install Node.js LTS (installed v24.16.0 via winget)
- [x] Confirm `node -v` / `npm -v` work
- Google credentials: **not required** (mock provider covers it)

**Done when:** `node -v` prints a v20+ version. ✅

## Phase 1 — Scaffold + vertical slice ⭐ ✅

The smallest end-to-end chain that proves the architecture.

- [x] `create-next-app` scaffold (App Router, JSX, ESLint)
- [x] Install + configure Auth.js (Credentials + Mock Google), Prisma (SQLite)
- [x] Prisma schema + migrate + seed the 14 profiles
- [x] Build the **login page** → `/login` (fresh UI)
- [x] Build the **enterprise dashboard** → `/dashboard` (fresh UI)
- [x] Wire `proxy.js` guard + `signOut({ callbackUrl: '/' })`

**Done when:** From a clean browser you can —
1. Hit `/dashboard` unauthenticated → redirected to `/login`
2. Sign in (mock Google **and** email/password) → land on `/dashboard`
3. Refresh → still authenticated (session cookie persists)
4. Log out → returned to `/`

## Phase 2 — Shared layout

- [ ] Extract sidebar + topbar into `(app)/layout.jsx`
- [ ] Dashboard consumes the shared layout (no duplicated chrome)

**Done when:** Sidebar/topbar live in exactly one file; dashboard renders inside it.

## Phase 3 — Build remaining pages

Each page from the prototype's feature set → one route, built fresh as JSX under the
shared layout (prototype used only as a visual reference).

| Page (from prototype feature set)                  | New route             |
|----------------------------------------------------|-----------------------|
| `index.html`                                       | `/`                   |
| `login_ebspl_2/code.html`                          | `/login`  (Phase 1)   |
| `ebspl_cloud_accounting_enterprise_dashboard/`     | `/dashboard` (Phase 1)|
| `ebspl_financial_management_suite/`                | `/fms`                |
| `dashboard_ebspl_1/`                               | `/dashboard-classic`  |
| `invoicing_billing_ebspl/`                         | `/invoicing`          |
| `expenses_payables_ebspl/`                         | `/expenses`           |
| `clients_contacts_ebspl/`                          | `/clients`            |
| `client_onboarding_ebspl/`                         | `/clients/onboarding` |
| `team_onboarding_ebspl/`                           | `/team/onboarding`    |
| `bank_reconciliation_ebspl/`                       | `/reconciliation`     |
| `financial_statements_ebspl/`                      | `/statements`         |
| `tax_compliance_ebspl/`                            | `/tax`                |
| `reports_ebspl/`                                   | `/reports`            |
| `uploads_documents_ebspl/`                         | `/documents`          |
| `settings_ebspl/`                                  | `/settings`           |
| `chat_support_ebspl_2/`                            | `/support`            |

**Done when:** Every route renders its freshly-built page under the shared layout, all nav links work.

## Phase 4 — Data model fill-out

- [ ] Add domain tables per page (invoices, expenses, clients, …)
- [ ] Replace remaining hardcoded UI data with DB queries where it adds value

**Done when:** Core pages read from the DB instead of hardcoded arrays.

## Phase 5 — Integrate & run locally

- [ ] Full click-through of all routes while authenticated
- [ ] Verify guard on every protected route
- [ ] Verify logout → `/` from every sign-out control
- [ ] `.env.example` documented; README run instructions verified from scratch

**Done when:** A fresh `npm install && npm run dev` brings up the whole app at
`localhost:3000` and the end-to-end auth + navigation flows pass.

## Out of scope for now

- Deployment/hosting (running locally on Windows for now — host chosen later)
- Real Google OAuth (mock until credentials provided)
- Postgres (SQLite locally; swap later)
