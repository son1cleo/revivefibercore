# Revive Fiber Core

Eco-friendly showcase website built with Next.js App Router and a Node.js API route.

## Tech

- Next.js 16
- Tailwind CSS
- Framer Motion
- Nodemailer contact endpoint
- Markdown blog content

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
copy .env.example .env.local
```

3. Start development server:

```bash
npm run dev
```

## Pages

- /
- /about
- /work
- /blog
- /blog/[slug]
- /contact

## Contact API

- `POST /api/contact`
- Body: `{ name, email, subject, message }`
- Configure SMTP values in `.env.local`
