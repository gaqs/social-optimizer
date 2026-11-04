<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent notes — Social Optimizer

Next.js 16 (App Router) + React 19 + TypeScript app for composing and scheduling posts to X, Facebook, Instagram and TikTok. UI copy and code comments are in Spanish.

## Commands

- `npm run dev` — dev server
- `npm run lint` — ESLint flat config. There is no typecheck script; use `npx tsc --noEmit`.
- `npm test` — runs the only test file, `src/lib/media.test.ts`, via `tsx --test` (node:test + assert, no framework)
- `npx prisma migrate dev` — migrations (needs `DATABASE_URL` in `.env`)
- `npx prisma generate` — required after editing `prisma/schema.prisma`

## Prisma

- The client is generated into `src/generated` (generator `prisma-client`), **not** `@prisma/client`. Never import from `@prisma/client`; use the `prisma` singleton from `src/lib/prisma.ts` (`@/lib/prisma`), which wires the `@prisma/adapter-pg` driver adapter.
- `prisma.config.ts` (root) loads `dotenv` and resolves `DATABASE_URL`.

## Architecture

- Route protection lives in `src/proxy.ts` — in Next.js 16 the middleware file exports `proxy`, not `middleware`. It only guards `/dashboard`, `/login`, `/register`.
- Auth is better-auth: server config `src/lib/auth.ts` (customSession injects avatar, Spanish i18n errors), client `src/lib/auth-client.ts`, catch-all handler `src/app/api/auth/[...all]/route.ts`. Verification/reset emails go through `src/lib/mailer.ts` (nodemailer) with templates in `src/app/emails/`.
- Path aliases: `@/*` → `src/*`, `@services/*` → `src/services/*`. Server-side business logic lives in `src/services/*.tsx` (files are `.tsx` even without JSX).
- Media uploads (post images/videos, avatars) are written with `fs` to `public/uploads/` (gitignored); only the paths are stored in the DB.

## Conventions & gotchas

- `Posts.media` is a JSON-array string, but legacy rows hold a single bare path — always parse with `parsePostMedia` from `src/lib/media.ts`. Global media validation rules (`MEDIA_RULES`) are in the same file.
- `cn` exists twice: `src/lib/utils.ts` (re-exports the `cn` npm package) and `src/lib/utils.tsx` (clsx + tailwind-merge). shadcn's alias points to `@/lib/utils`. Either import works; don't add a third.
- shadcn (style `base-vega`) generates into `src/components/ui`; hand-rolled components sit in `src/components`. Tailwind v4 via `@tailwindcss/postcss` — there is no `tailwind.config` file.
- Root files such as `cambios_no_confirmados_septiembre.txt`, `conversacion-publicaciones.txt` and `development_changes.py` are personal scratch notes, not part of the app — ignore them.

## Environment (`.env`, gitignored)

`DATABASE_URL`, `NEXT_PUBLIC_APP_URL` (used as better-auth base URL), `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`.
