# Souskai — the web platform you own outright

**This repository is not a demo.** It is the production codebase behind [souskai.com](https://souskai.com), published in the open so you can audit our standards before you hire us — and run the same foundation yourself if you don't.

Every client we take on receives a copy of this codebase: a modern, type-safe web platform that is self-hostable, with no platform you have to keep renting and no black box between you and your data.

---

## The problem, in plain English

Most businesses don't own their website. They rent one:

- Your content lives on someone else's servers, inside someone else's database.
- The price can change, the rules can change, the platform can disappear.
- Your archive — the record of what you said, built, and promised — can be edited, de-indexed, or deleted by a third party, or quietly scraped to train someone else's models.

We think that's backwards. You should own the code, the database, and the memory.

---

## What you own with Souskai

| | What you get |
|---|---|
| **The code** | A private or public, versioned codebase. No mystery layer — you can read every line. |
| **The data** | Your content lives in your PostgreSQL database — your rows, your exports, your backups. |
| **The content model** | The structure of your site is defined in typed code (`src/collections`, `src/blocks`), so it cannot silently change under you. |
| **The exit** | Cancel us and you keep the code, the database, and an export of every page, post, and image. Nothing held hostage. |

---

## Why it is fast and light

The architecture favors shipping finished HTML over shipping JavaScript:

- **Pages are rendered once, then served from cache** — visitors download finished pages instead of running a JavaScript app in their browser.
- **No trackers, no ad scripts** — the admin panel defines an analytics field, but nothing on the public site renders one. Your visitors aren't quietly handed to a data broker.
- **Images are tuned automatically** — modern formats and sized resized at upload, so a phone never downloads a desktop-sized image.
- **The database sleeps when idle** — compute scales down between requests instead of burning all day.

### Verify it yourself — three commands

Clone this repository and confirm the claims directly:

```bash
# 1. No third-party scripts — the only <script> is the theme bootstrap that prevents a white flash
grep -rn '<Script' src/

# 2. No analytics wiring — the field exists in the CMS, but nothing on the site renders it
grep -rn 'analyticsId' src/ | grep -v payload-types.ts

# 3. Content is served from cache, not rebuilt per visitor
grep -rn 'use cache' src/utilities/
```

No marketing numbers — just the mechanism, checkable in thirty seconds.

---

## Built for what's coming next

The platform is a foundation, not a walled garden:

- **Typed content, delivered over REST and GraphQL** — the same interfaces an AI agent, an internal tool, or a model-context protocol (MCP) server can consume reliably. Content is data first, presentation second.
- **Revision history and scheduled publishing** — drafts and autosave keep an audit trail of your pages and posts, and publishing can be queued for a future date rather than a frantic rollback.
- **Four roles with real boundaries** — admin, editor, publisher, viewer — so "who can change, publish, or only look" is explicit, not tribal knowledge.
- **Migrations as code** — database changes are versioned files applied automatically on deploy, the same discipline a fintech team expects.
- **TypeScript end-to-end** — the CMS generates types from the content model, so no one can add a field the code doesn't know about.

None of this is a compliance certificate. It is the groundwork a serious product — fintech, research, archival, AI tooling — needs before anyone puts a regulator or an auditor in front of it.

---
## What's inside

**15 collections** — Pages, Posts, Media, Categories, Customers, Technologies, Team Members, Testimonials, Awards, Services, Case Studies, Legal Pages, Demos, Portfolio, and Users (with authentication).

**4 globals** — Header, Footer, Site Settings, and the Services hub.

**18 layout blocks** — testimonial carousels, logo banners, statistics grids, pricing tables, comparison grids, FAQs, feature explainers, embedded media, forms, and a full call-to-action kit. Every page is a drag-and-drop composition of these blocks.

**4 hero variants** — real page-header styles, swapped with a single field.

**Drafts, live preview, and scheduled publishing** — edit in place, see the change before it ships, or queue it for a future date.

**Built-in SEO, search, and redirects** — per-page meta, a search index, and safe URL redirects out of the box.

**Localization wired in** — English and Bulgarian ship today, with URL-based locale routing ready for more.

---

## How it fits together

- **[Next.js 16](https://nextjs.org)** (App Router) — server-rendered React with fine-grained, tag-based caching.
- **A modern, type-safe CMS** — a React-based content system that generates end-to-end types from your content model (see *License & attribution*).
- **PostgreSQL** — the database. Neon or Vercel Postgres today; any PostgreSQL you host tomorrow.
- **Tailwind CSS 4 + shadcn/ui** — the styling and component layer.
- **TypeScript** — everywhere, including the content schema.
- **Vitest + Playwright** — unit/integration and end-to-end tests against the real site.

---

## Run it locally

Requirements: **Node 24** (see `.nvmrc`) and **pnpm** (this repo uses pnpm only — no npm, no yarn).

```bash
git clone https://github.com/souskai/agency-web.git
cd agency-web
cp .env.example .env    # then fill in the blanks below
pnpm install
pnpm dev
```

Open `http://localhost:3000`. Create your first admin user on the onboarding screen to reach the admin panel at `/admin`.

### Environment variables

| Variable | Purpose |
|---|---|
| `PAYLOAD_SECRET` | Signs auth sessions — generate a long random string |
| `NEXT_PUBLIC_SERVER_URL` | Public URL of the site (`http://localhost:3000` in dev) |
| `DATABASE_URL` | PostgreSQL connection string (pooled) |
| `DATABASE_URL_UNPOOLED` | PostgreSQL connection string (direct — used for migrations) |
| `BLOB_READ_WRITE_TOKEN` / `BLOB_STORE_ID` | Object storage for media uploads |
| `RESEND_API_KEY` / `RESEND_FROM_ADDRESS` / `RESEND_FROM_NAME` | Email delivery (password reset, invitations) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | For the admin bootstrap script (`pnpm tsx scripts/create-admin.ts`) |

### Seed content

A `POST` to `/next/seed` while signed in populates the database with the full demo site. **It is destructive** — it replaces existing CMS content — so use it only on a fresh or disposable environment.

### Everyday commands

```bash
pnpm dev                  # start the dev server
pnpm build                # production build (runs database migrations first)
pnpm start                # serve the production build

pnpm generate:types       # regenerate payload-types.ts after a schema change
pnpm generate:importmap   # regenerate the admin component map

pnpm payload migrate             # apply pending database migrations
pnpm payload migrate:create <name>   # write a migration from schema changes

pnpm lint                 # eslint
pnpm tsc --noEmit         # typecheck
pnpm test                 # vitest + playwright
```

---
## Deploying

### Managed (Vercel + Neon + Vercel Blob)

The fast path. The `build` script runs database migrations automatically, so a push to Vercel deploys both code and schema. Set the environment variables above in the Vercel dashboard.

### Self-hosting (sovereignty)

The codebase has no proprietary lock-in — it's standard Next.js + PostgreSQL + object storage:

1. **Containerize it** — a multi-stage `Dockerfile` ships in this repo; it needs one line (`output: 'standalone'` in `next.config.js`) to produce the standalone server bundle.
2. **Point `DATABASE_URL` at any PostgreSQL** — Neon, Amazon RDS, or a Postgres container on your own VPS (Hetzner, DigitalOcean, Coolify).
3. **Point media at object storage** — Vercel Blob today; swap the storage adapter for S3-compatible stores (R2, S3, MinIO) when you move off it.

You are never required to host with us — or with any single vendor.

---

## Extending it

The build-your-own-section loop is deliberately small:

1. Create the block schema (`src/blocks/<Name>/config.ts`) and its React server component (`Component.tsx`).
2. Register it in `src/blocks/RenderBlocks.tsx` and `src/collections/Pages/index.ts`.
3. Regenerate types: `pnpm generate:types` → `pnpm generate:importmap` → `pnpm tsc --noEmit`.

New hero styles live in `src/heros/`; section backgrounds and dividers are a developer-facing layer (`src/components/BackgroundLayers/`, `src/components/ShapeDivider/`), never admin fields.

---

## Glossary, in plain English

- **CMS (content management system)** — the screen where non-developers edit text and images.
- **Headless** — the editing screen and the public website are separate; the site is assembled from your content at render time.
- **React** — the component framework the interface is built with.
- **PostgreSQL** — an open-source, industry-standard database.
- **Self-host** — run it on servers you control, not a vendor's.
- **REST / GraphQL** — the machine-readable channels another program (or an AI agent) uses to read your content.

---

## License & attribution

The code in this repository is MIT-licensed (see `LICENSE`). It is built on the [Payload Website Template](https://github.com/payloadcms/payload/tree/main/templates/website); third-party dependencies and demo assets remain the property of their respective owners under their own licenses. See `THIRD_PARTY_NOTICES.md`.

---

## Questions

Open an issue in this repository, or reach us through [souskai.com](https://souskai.com).
