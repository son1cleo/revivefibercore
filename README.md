# Revive Fiber Core

Revive Fiber Core is a modern, eco-focused showcase site built with Next.js App Router, featuring a Supabase-backed admin CMS for blogs and work media.

## Current Status

- Public site pages are implemented and responsive.
- Admin dashboard supports blog/work create, edit, publish, and delete.
- Supabase Postgres + Storage integration is active.
- Contact form API endpoint is implemented.
- Latest redesign pass follows a clean, rounded card UI direction.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- Framer Motion
- Supabase (Postgres, Storage, optional Auth)
- Nodemailer (contact form email delivery)

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

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
CONTACT_TO=

NEXT_PUBLIC_WHATSAPP_NUMBER=8801000000000
```

4. Initialize Supabase schema:

- Run SQL from [supabase/schema.sql](supabase/schema.sql) in Supabase SQL Editor.
- Ensure storage buckets exist and are public:
	- `blog-media`
	- `work-media`

5. Start dev server:

```bash
npm run dev
```

## Routes

### Public

- /
- /about
- /work
- /blog
- /blog/[slug]
- /contact

### Admin

- /admin/login
- /admin
- /admin/blogs
- /admin/blogs/new
- /admin/blogs/[id]
- /admin/work
- /admin/work/new
- /admin/work/[id]

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

### Admin CMS

- `POST /api/admin/posts`
- `PATCH /api/admin/posts/[id]`
- `DELETE /api/admin/posts/[id]`
- `POST /api/admin/work`
- `PATCH /api/admin/work/[id]`
- `DELETE /api/admin/work/[id]`
- `POST /api/admin/upload`
- `POST /api/admin/auth/logout`

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
