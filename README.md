# Revive Fiber Co

Revive Fiber Co is a modern, eco-focused showcase site built with Next.js App Router, featuring a Supabase-backed admin CMS for portfolio work media and client profiles.

## Current Status

- Public site pages are implemented and responsive.
- Admin dashboard supports product, work item, and client create, edit, publish, and delete.
- Supabase Postgres + Storage integration is active.
- Contact form submissions save directly to the database and show under Admin → Messages (no email involved).
- Admin panel has a dark-toned sidebar matching the brand palette, and auto-logs out after 90 seconds of inactivity.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- Framer Motion
- Supabase (Postgres, Storage, Auth)

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

No SMTP configuration is needed — the contact form saves straight to the `contact_messages` table.

4. Initialize Supabase schema:

- Run SQL from [supabase/schema.sql](supabase/schema.sql) in Supabase SQL Editor. This includes the `contact_messages` table added for the Messages admin section — if you're updating an existing project rather than starting fresh, just run the new `contact_messages` block plus its policies from that file (they use `create table if not exists` / `drop policy if exists`, so re-running the whole file is also safe).
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

- /admin/login (outside the auth-protected layout — see Notes)
- /admin
- /admin/products
- /admin/products/new
- /admin/products/[id]
- /admin/work
- /admin/work/new
- /admin/work/[id]
- /admin/clients
- /admin/clients/new
- /admin/clients/[id]
- /admin/messages

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

- `POST /api/contact`
- JSON body: `{ name, email, subject, message }`
- Inserts a row into `contact_messages` (via the service-role client, so no public insert policy is needed). No email is sent. Submissions appear under Admin → Messages, newest first, with an unread indicator.

### Admin CMS

- `POST /api/admin/work` — also used by the Products editor (Products and Work Items share the `work_items` table; Products is a filtered, purpose-built view over the same data)
- `PATCH /api/admin/work/[id]`
- `DELETE /api/admin/work/[id]`
- `POST /api/admin/clients`
- `PATCH /api/admin/clients/[id]`
- `DELETE /api/admin/clients/[id]`
- `PATCH /api/admin/messages/[id]` — mark read/unread
- `DELETE /api/admin/messages/[id]`
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
- Protected admin pages live under `app/admin/(protected)/` (a route group), while `app/admin/login/` sits outside it. This matters: the protected layout redirects unauthenticated visitors to `/admin/login`, so the login page must never be wrapped by that same layout, or visiting it would redirect to itself in a loop. This is invisible in `npm run dev` (auth auto-bypasses there) and only shows up under `npm run start` / production — always smoke-test the login flow with a production build after touching admin routing.
- The admin panel auto-logs out after 90 seconds of inactivity (`components/admin/AdminIdleLogout.jsx`), resetting on mouse/keyboard/scroll/touch activity.
