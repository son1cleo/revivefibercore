# Revive Fiber Co

Revive Fiber Co is a modern, eco-focused showcase site built with Next.js App Router, featuring a Supabase-backed admin CMS for portfolio work media and client profiles.

## Current Status

- Public site pages are implemented and responsive.
- Admin dashboard supports work item and client create, edit, publish, and delete.
- Supabase Postgres + Storage integration is active.
- Contact form delivers via FormSubmit.co (no SMTP credentials required).
- Admin panel has a dark-toned sidebar matching the brand palette.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- Framer Motion
- Supabase (Postgres, Storage, optional Auth)
- FormSubmit.co (contact form email delivery — no backend mail server needed)

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
copy .env.example .env.local
```

3. Fill `.env.local` values:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_ALLOWED_EMAILS=
ADMIN_DISABLE_AUTH=false
ADMIN_FALLBACK_EMAIL=admin@revivefibercore.local

NEXT_PUBLIC_WHATSAPP_NUMBER=8801988831521
```

No SMTP configuration is needed — the contact form (`components/ContactForm.jsx`) posts directly to FormSubmit.co, which handles delivery.

4. Initialize Supabase schema:

- Run SQL from [supabase/schema.sql](supabase/schema.sql) in Supabase SQL Editor.
- Ensure the `work-media` storage bucket exists and is public.

5. Start dev server:

```bash
npm run dev
```

## Routes

### Public

- /
- /about
- /work
- /contact (Our Products)
- /work-with-us (Contact With Us)

### Admin

- /admin/login
- /admin
- /admin/work
- /admin/work/new
- /admin/work/[id]
- /admin/clients
- /admin/clients/new
- /admin/clients/[id]

## Admin Access Modes

### Auth mode (recommended for production)

- Keep `ADMIN_DISABLE_AUTH=false`.
- Use Supabase Auth users.
- Optional email allowlist via `ADMIN_ALLOWED_EMAILS`.

### No-login mode (fast/private setup)

- Set `ADMIN_DISABLE_AUTH=true`.
- Admin endpoints and pages bypass user login checks.
- Use only in trusted/private deployments.

## APIs

### Contact

Handled client-side by `components/ContactForm.jsx`, which posts directly to `https://formsubmit.co/ajax/<recipient-email>`. No backend route or SMTP setup is required. The recipient currently receives a one-time confirmation email from FormSubmit the first time a message is sent — click the link in it to activate delivery.

### Admin CMS

- `POST /api/admin/work`
- `PATCH /api/admin/work/[id]`
- `DELETE /api/admin/work/[id]`
- `POST /api/admin/clients`
- `PATCH /api/admin/clients/[id]`
- `DELETE /api/admin/clients/[id]`
- `POST /api/admin/upload`
- `POST /api/admin/auth/logout`

### Work Item Categories

Setting a work item's **Category** in the admin editor controls where it shows on the public site:

- `Machine In Production` / `Packing & Export` → Our Products → Recycled Fibers, and the Work page
- `Wiping Rags` → Our Products → Wiping Rags, and the Work page
- `General` → Work page only

Videos should be embed links (YouTube/Vimeo `.../embed/...` URLs) pasted into the Media URL field, not raw file uploads — see the in-editor guidance.

## Build and Verification

Run production build:

```bash
npm run build
```

Recent verification includes:

- Build passes successfully.
- Blog/work admin CRUD smoke tests pass.
- Public visibility checks for published content pass.

## Notes

- If images fail from Supabase Storage, verify host is listed in [next.config.mjs](next.config.mjs).
- If SQL policy creation fails on `IF NOT EXISTS`, use the current schema file version (it uses `DROP POLICY IF EXISTS` + `CREATE POLICY`).
