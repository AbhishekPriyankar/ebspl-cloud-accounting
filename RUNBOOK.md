# EBSPL Cloud Accounting — UI Prototype Hub Runbook

## Overview

Static HTML/CSS prototype library for the EBSPL Cloud Accounting Platform, served locally via Python's built-in HTTP server. No build step, no Node.js, no package manager required.

---

## Quick Start

```powershell
cd "C:\Users\abhi_\projects\stitch_react_authentication_dashboard"
python -m http.server 8080
```

Open **http://localhost:8080** in your browser.

> **Prerequisites:** Python 3.x installed (`python --version` to verify).
> Alternatively use port 3000 or any free port: `python -m http.server 3000`

---

## Starting the Server

### Option A — Python (recommended, no install needed)
```powershell
python -m http.server 8080
```

### Option B — Node.js `serve`
```powershell
npx serve . -p 8080
```

### Option C — VS Code Live Server
Right-click `index.html` → *Open with Live Server* (requires the Live Server extension).

---

## Stopping the Server

In the terminal where the server is running, press **Ctrl + C**.

If started in the background and you've lost the terminal, find and kill it:

```powershell
# Find what's on port 8080
netstat -ano | findstr :8080

# Kill by PID (replace 12345 with the PID shown above)
taskkill /PID 12345 /F
```

---

## Prototype Map

| Screen | Path | Tech | Status |
|---|---|---|---|
| **Hub Index** | `/index.html` | HTML/CSS | ✅ OK |
| Login | `login_ebspl_2/code.html` | HTML + Tailwind | ✅ Sign In → Enterprise Dashboard |
| Register | `register_ebspl/code.html` | HTML + Tailwind | ✅ Get Started → Enterprise Dashboard |
| **Enterprise Dashboard** | `ebspl_cloud_accounting_enterprise_dashboard/code.html` | React 18 SPA | ✅ Full routing, starts at /login |
| Financial Management Suite | `ebspl_financial_management_suite/code.html` | React 18 | ✅ OK |
| Dashboard Variant 1 | `dashboard_ebspl_1/code.html` | HTML + Tailwind | ✅ OK |
| Dashboard Variant 2 | `dashboard_ebspl_2/code.html` | HTML + Tailwind | ⚠️ **Duplicate** — shows Login page |
| Dashboard Variant 3 | `dashboard_ebspl_3/code.html` | HTML + Tailwind | ⚠️ **Duplicate** — shows Login page |
| Bank Reconciliation | `bank_reconciliation_ebspl/code.html` | HTML + Tailwind | ✅ OK |
| Chat & Support | `chat_support_ebspl_2/code.html` | HTML + Tailwind | ✅ OK |
| Client Onboarding | `client_onboarding_ebspl/code.html` | HTML + Tailwind | ✅ OK |
| Clients & Contacts | `clients_contacts_ebspl/code.html` | HTML + Tailwind | ✅ OK |
| Expenses & Payables | `expenses_payables_ebspl/code.html` | HTML + Tailwind | ✅ OK |
| Financial Statements | `financial_statements_ebspl/code.html` | HTML + Tailwind | ✅ OK |
| Invoicing & Billing | `invoicing_billing_ebspl/code.html` | HTML + Tailwind | ✅ OK |
| Reports | `reports_ebspl/code.html` | HTML + Tailwind | ✅ OK |
| Settings | `settings_ebspl/code.html` | HTML + Tailwind | ✅ OK |
| Tax Compliance | `tax_compliance_ebspl/code.html` | HTML + Tailwind | ✅ OK |
| Team Onboarding | `team_onboarding_ebspl/code.html` | HTML + Tailwind | ✅ OK |
| Uploads & Documents | `uploads_documents_ebspl/code.html` | HTML + Tailwind | ✅ OK |
| Design System Spec | `ebspl_design_system/DESIGN.md` | Markdown | ✅ Reference doc |

---

## User Flows

### Primary Flow: Login → Dashboard
1. Open **http://localhost:8080**
2. Click **Login** card (or **Enterprise Dashboard** for the full SPA)
3. Fill in email and password (any values — prototype only)
4. Click **Sign In** → redirects to Enterprise Dashboard
5. Use the left sidebar to navigate between modules

### Register Flow
1. Click **Register** card from the hub
2. Fill in Full Name, Email, Password, Confirm Password
3. Check the Terms checkbox (required)
4. Click **Get Started** → redirects to Enterprise Dashboard
5. From the Register page, "Sign in here" links back to the Login page

### Enterprise Dashboard Internal Navigation
The Enterprise Dashboard is a React SPA using `MemoryRouter`. It starts on the Login screen and uses sidebar `<Link>` components to switch between:
- Dashboard, Clients & Contacts, Invoicing & Billing, Expenses & Payables, Bank Reconciliation, Financial Statements, Tax & Compliance, Uploads & Documents, Reports, Settings, Chat & Support

> **Note:** Buttons like "Create New Invoice", "Add Expense", "Add New Contact" are visual UI prototypes — they do not open forms or perform actions. This is by design.

---

## Known Issues

| Issue | Affected Files | Severity |
|---|---|---|
| `dashboard_ebspl_2` and `dashboard_ebspl_3` contain identical copies of the Login page | `dashboard_ebspl_2/code.html`, `dashboard_ebspl_3/code.html` | Medium — source files need replacement |
| Action buttons inside dashboard pages (Create Invoice, Add Expense, etc.) have no handlers | Enterprise Dashboard | Low — prototype-only by design |
| All CDN resources require internet connection | All files | Info — won't load offline |

---

## Dependencies & CDN Resources

All prototypes load resources from CDNs. An active internet connection is required.

| Resource | CDN |
|---|---|
| Tailwind CSS (with Forms + Container Queries plugins) | `cdn.tailwindcss.com` |
| React 18 + ReactDOM | `unpkg.com/react@18` |
| React Router DOM 6.3.0 | `unpkg.com/react-router-dom@6.3.0` |
| Babel Standalone (JSX compilation) | `unpkg.com/babel-standalone@6` |
| Lucide Icons | `unpkg.com/lucide` |
| Material Symbols | `fonts.googleapis.com` |
| Inter + Manrope + Public Sans fonts | `fonts.googleapis.com` |

---

## Adding or Replacing a Prototype

1. Create a new folder under `stitch_react_authentication_dashboard/`, e.g. `my_new_screen/`
2. Add your `code.html` file inside it
3. Open `index.html` and add a new `<a class="card" href="my_new_screen/code.html" ...>` card in the appropriate section
4. Refresh the browser — the server serves files live, no restart needed

To replace a duplicate (e.g. `dashboard_ebspl_2`): overwrite `dashboard_ebspl_2/code.html` with the correct content and remove the `<span class="warn-badge">` from that card in `index.html`.

---

## Troubleshooting

### Browser shows "This site can't be reached"
The Python server isn't running. Start it with `python -m http.server 8080`.

### "Address already in use" on port 8080
Another process is using the port. Either kill it (see *Stopping the Server* above) or start on a different port: `python -m http.server 8081`.

### Styles not rendering (unstyled HTML)
Tailwind loads from CDN. Check your internet connection.

### React page shows a blank white screen
Open DevTools (F12) → Console. Common causes:
- CDN unavailable (internet issue)
- Babel compilation error in the JSX — check the Console for a syntax error
- `babel-standalone` is the in-browser JSX compiler; large files can take 1–2 seconds on first load

### Login / Register button does nothing
Ensure you are opening files via `http://localhost:8080/...` — not by double-clicking the `.html` file directly. The `file://` protocol can block certain browser security features that interfere with navigation.

---

## File Structure

```
stitch_react_authentication_dashboard/
├── index.html                                  ← Navigation hub (start here)
├── RUNBOOK.md                                  ← This file
├── ebspl_2.png                                 ← Logo asset
├── ebspl_design_system/
│   └── DESIGN.md                               ← Colour, type, spacing spec
├── ebspl_cloud_accounting_enterprise_dashboard/
│   └── code.html                               ← React SPA (main prototype)
├── ebspl_financial_management_suite/
│   └── code.html
├── login_ebspl_2/
│   └── code.html
├── register_ebspl/
│   └── code.html
└── [16 other module folders]/
    └── code.html
```

---

*Last verified: 2026-06-07. Server: Python http.server 8080.*
