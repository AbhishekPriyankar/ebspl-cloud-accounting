# 03 — Data Model

## Database choice

- **Dev (now):** SQLite — a single file, zero install on Windows, perfect for local
  development and testing.
- **Prod (later):** PostgreSQL — change `provider` in `schema.prisma` and the
  `DATABASE_URL`; the rest of the schema is portable.

Managed via **Prisma** (schema + migrations + typed client + seeding).

## Schema overview

Two groups of tables: the ones **Auth.js requires**, and our **app/domain** tables.

### Auth.js tables (standard)

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  passwordHash  String?   // for Credentials (email/password) login

  // EBSPL profile fields (carried from prototype's ebspl_user)
  role        String  @default("User")   // Admin | Accountant | Client | User
  initial     String?                     // avatar initials, e.g. "AS"
  company     String?
  loginMethod String?                     // password | google | sso

  accounts Account[]
  sessions Session[]
}

model Account {            // OAuth provider links (Google, etc.)
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  // ...standard Auth.js fields (tokens, scope, etc.)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  @@unique([identifier, token])
}
```

> Note: with JWT sessions (our default), `Session` may be unused initially but is kept
> so we can switch to database sessions without a migration.

### App / domain tables (start minimal, grow per page)

The prototype's pages (invoicing, expenses, clients, reports, etc.) imply real
entities. We start with the few the dashboard needs and add the rest as each page is
ported (see `04-migration-phases.md`). Initial set:

```prisma
model Client {
  id        String   @id @default(cuid())
  name      String
  email     String?
  company   String?
  createdAt DateTime @default(now())
}

model Invoice {
  id        String   @id @default(cuid())
  number    String   @unique
  clientId  String
  amount    Decimal
  status    String   @default("draft")  // draft | sent | paid | overdue
  issuedAt  DateTime @default(now())
  client    Client   @relation(fields: [clientId], references: [id])
}
// expenses, accounts, reports, etc. added when their pages are ported
```

## The 14 profiles → seed data

`prisma/seed.ts` inserts the 14 dummy profiles from the prototype's `profiles.js`
as real `User` rows:

- 5 Clients, 3 Accountants, 3 Admins, 3 Users
- Each gets: `name`, `email`, `role`, `initial`, `company`
- Each gets a **bcrypt `passwordHash`** for a shared dev password (so email/password
  login works immediately — password documented in `05-local-setup-and-testing.md`)

These same rows back the **Mock Google picker** (see `02-auth-and-mock-google.md`),
so mock sign-in and email/password sign-in resolve to the same users.

## Migration & seed commands

```bash
npx prisma migrate dev --name init   # create tables
npx prisma db seed                   # load the 14 profiles + sample data
npx prisma studio                    # (optional) browse the DB in a GUI
```
