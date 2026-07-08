# Agency Website Template

> Built on top of the official [Payload Website Template](https://github.com/payloadcms/payload/tree/main/templates/website).

This template extends the upstream Payload starter with everything a digital agency (or similar service business) needs out of the box. The original README has been updated to reflect the additions — you still get all of the stock Payload features, plus the agency-specific collections, blocks, globals, and seed data described below.

### Why use this template

- **Next.js 16 + Turbopack** — Uses the latest App Router features including `use cache` directives, on-demand revalidation, and React Server Components for fast, production-grade rendering.
- **Optimized for Vercel** — Pre-configured for Vercel Postgres (`@payloadcms/db-vercel-postgres`), Vercel Blob Storage, and cron-based scheduled publishing. Deploys with zero additional infrastructure.
- **Modern styling stack** — TailwindCSS v4, shadcn/ui components, and a centralized font config. All visual styling is intentionally minimal so you can adapt it to your own brand.
- **MCP integration** — Ships with Model Context Protocol (MCP) servers pre-configured (shadcn, Neon, Figma, Next.js Devtools), so AI-assisted workflows work out of the box.
- **Agency-ready collections** — Adds Customers, Technologies, Team Members, Testimonials, Services, Case Studies, Awards, Legal Pages, Demos, and Portfolio on top of the stock Pages, Posts, Media, and Categories.
- **New layout blocks** — Testimonial, Logo Banner (customers or technologies), Stats, and Awards List blocks are ready to drop into any page via the Layout Builder.
- **Expanded globals** — Header with configurable CTA buttons, Footer with link columns and social links, and a Site Settings global for contact info and branding.
- **Full seed script** — One click from the admin panel seeds every collection and global with realistic demo data so you can see all blocks and collections working on the home page immediately.
- **Internationalization** — English and Bulgarian locales with a URL-prefix strategy and a locale switcher in the header.

### Who this is for

- Agencies, studios, or freelancers who need a content-managed website with service pages, case studies, and a portfolio.
- Teams exploring Payload CMS who want a richer starting point than the stock template.
- Anyone who wants a Vercel-optimized, Next.js 16 project with a full CMS backend ready to customize.

### Inherited features

Everything from the original Payload Website Template is preserved:

- [Pre-configured Payload Config](#how-it-works)
- [Authentication](#users-authentication)
- [Access Control](#access-control)
- [Layout Builder](#layout-builder)
- [Draft Preview](#draft-preview)
- [Live Preview](#live-preview)
- [On-demand Revalidation](#on-demand-revalidation)
- [SEO](#seo)
- [Search](#search)
- [Redirects](#redirects)
- [Jobs and Scheduled Publishing](#jobs-and-scheduled-publish)
- [Website](#website)

## Quick Start

To spin up this example locally, follow these steps:

### Clone

If you have not done so already, you need to have standalone copy of this repo on your machine. If you've already cloned this repo, skip to [Development](#development).

Use the `create-payload-app` CLI to clone this template directly to your machine:

```bash
pnpx create-payload-app my-project -t website
```

### Development

1. First [clone the repo](#clone) if you have not done so already
1. `cd my-project && cp .env.example .env` to copy the example environment variables
1. `pnpm install && pnpm dev` to install dependencies and start the dev server
1. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel and unpublished content. See [Access Control](#access-control) for more details.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Posts

  Posts are used to generate blog posts, news articles, or any other type of content that is published over time. All posts are layout builder enabled so you can generate unique layouts for each post using layout-building blocks, see [Layout Builder](#layout-builder) for more details. Posts are also draft-enabled so you can preview them before publishing them to your website, see [Draft Preview](#draft-preview) for more details.

- #### Pages

  All pages are layout builder enabled so you can generate unique layouts for each page using layout-building blocks, see [Layout Builder](#layout-builder) for more details. Pages are also draft-enabled so you can preview them before publishing them to your website, see [Draft Preview](#draft-preview) for more details.

- #### Media

  This is the uploads enabled collection used by pages, posts, and projects to contain media like images, videos, downloads, and other assets. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

- #### Categories

  A taxonomy used to group posts together. Categories can be nested inside of one another, for example "News > Technology". See the official [Payload Nested Docs Plugin](https://payloadcms.com/docs/plugins/nested-docs) for more details.

- #### Awards

  A simple collection for awards and recognition (year, award name, category, project, optional image and link). Used by the **Awards List** layout block to show a year-grouped timeline on pages. Public read; authenticated create/update/delete. Revalidates the `awards` tag on change/delete.

### Globals

See the [Globals](https://payloadcms.com/docs/configuration/globals) docs for details on how to extend this functionality.

- `Header`

  The data required by the header on your front-end like nav links.

- `Footer`

  Same as above but for the footer of your site.

## Access control

Basic access control is setup to limit access to various content based based on publishing status.

- `users`: Users can access the admin panel and create or edit content.
- `posts`: Everyone can access published posts, but only users can create, update, or delete them.
- `pages`: Everyone can access published pages, but only users can create, update, or delete them.

For more details on how to extend this functionality, see the [Payload Access Control](https://payloadcms.com/docs/access-control/overview#access-control) docs.

## Layout Builder

Create unique page layouts for any type of content using a powerful layout builder. This template comes pre-configured with the following layout building blocks:

- Hero
- Content
- Media
- Call To Action
- Archive
- Testimonial
- Logo Banner (customers or technologies)
- Stats
- Awards List (year-grouped timeline from the Awards collection)

Each block is fully designed and built into the front-end website that comes with this template. See [Website](#website) for more details.

## Lexical editor

A deep editorial experience that allows complete freedom to focus just on writing content without breaking out of the flow with support for Payload blocks, media, links and other features provided out of the box. See [Lexical](https://payloadcms.com/docs/rich-text/overview) docs.

## Draft Preview

All posts and pages are draft-enabled so you can preview them before publishing them to your website. To do this, these collections use [Versions](https://payloadcms.com/docs/configuration/collections#versions) with `drafts` set to `true`. This means that when you create a new post, project, or page, it will be saved as a draft and will not be visible on your website until you publish it. This also means that you can preview your draft before publishing it to your website. To do this, we automatically format a custom URL which redirects to your front-end to securely fetch the draft version of your content.

Since the front-end of this template is statically generated, this also means that pages, posts, and projects will need to be regenerated as changes are made to published documents. To do this, we use an `afterChange` hook to regenerate the front-end when a document has changed and its `_status` is `published`.

For more details on how to extend this functionality, see the official [Draft Preview Example](https://github.com/payloadcms/payload/tree/examples/draft-preview).

## Live preview

In addition to draft previews you can also enable live preview to view your end resulting page as you're editing content with full support for SSR rendering. See [Live preview docs](https://payloadcms.com/docs/live-preview/overview) for more details.

## On-demand Revalidation

We've added hooks to collections and globals so that all of your pages, posts, footer, or header changes will automatically be updated in the frontend via on-demand revalidation supported by Nextjs.

> Note: if an image has been changed, for example it's been cropped, you will need to republish the page it's used on in order to be able to revalidate the Nextjs image cache.

## SEO

This template comes pre-configured with the official [Payload SEO Plugin](https://payloadcms.com/docs/plugins/seo) for complete SEO control from the admin panel. All SEO data is fully integrated into the front-end website that comes with this template. See [Website](#website) for more details.

## Search

This template also pre-configured with the official [Payload Search Plugin](https://payloadcms.com/docs/plugins/search) to showcase how SSR search features can easily be implemented into Next.js with Payload. See [Website](#website) for more details.

## Redirects

If you are migrating an existing site or moving content to a new URL, you can use the `redirects` collection to create a proper redirect from old URLs to new ones. This will ensure that proper request status codes are returned to search engines and that your users are not left with a broken link. This template comes pre-configured with the official [Payload Redirects Plugin](https://payloadcms.com/docs/plugins/redirects) for complete redirect control from the admin panel. All redirects are fully integrated into the front-end website that comes with this template. See [Website](#website) for more details.

## Jobs and Scheduled Publish

We have configured [Scheduled Publish](https://payloadcms.com/docs/versions/drafts#scheduled-publish) which uses the [jobs queue](https://payloadcms.com/docs/jobs-queue/jobs) in order to publish or unpublish your content on a scheduled time. The tasks are run on a cron schedule and can also be run as a separate instance if needed.

> Note: When deployed on Vercel, depending on the plan tier, you may be limited to daily cron only.

## Website

This template includes a beautifully designed, production-ready front-end built with [Next.js 16](https://nextjs.org) and the [App Router](https://nextjs.org/docs/app), served right alongside your Payload app in a single instance. This makes it so that you can deploy both your backend and website where you need it.

Core features:

- [Next.js 16](https://nextjs.org) (Turbopack by default)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Cache Components](https://nextjs.org/docs/app/api-reference/directives/use-cache) (`use cache`, on-demand + time-based revalidation)
- [TypeScript](https://www.typescriptlang.org)
- [React Hook Form](https://react-hook-form.com)
- [Payload Admin Bar](https://github.com/payloadcms/payload/tree/main/packages/admin-bar)
- [TailwindCSS styling](https://tailwindcss.com/)
- [shadcn/ui components](https://ui.shadcn.com/)
- [Centralized font config](#fonts) (Geist Sans / Mono)
- User Accounts and Authentication
- Fully featured blog
- Publication workflow
- Dark mode
- Pre-made layout building blocks
- SEO
- Search
- Redirects
- Internationalization (EN/BG)
- Live preview

### Cache

This template uses **Next.js 16 Cache Components** (`use cache`) to cache CMS data and reduce backend load. Caching is enabled via `cacheComponents: true` in `next.config.js`.

#### What is cached

| Data | Utility | Cache tag(s) | Revalidation |
|------|---------|--------------|--------------|
| Pages, posts by slug | `getCachedDocument` | `pages_${slug}`, `posts_${slug}` | On-demand when content changes |
| Document by ID (redirects) | `getCachedDocumentById` | `pages_id_${id}`, `posts_id_${id}` | On-demand |
| Header, footer globals | `getCachedGlobal` | `global_header`, `global_footer` | On-demand when globals change |
| Redirects list | `getCachedRedirects` | `redirects` | On-demand when redirects change |
| Posts index & pagination | `getCachedPosts` | `posts-list` | Time-based (600s) + on-demand when posts change |
| Pages sitemap | `getPagesSitemap` | `pages-sitemap` | On-demand when pages change |
| Posts sitemap | `getPostsSitemap` | `posts-sitemap` | On-demand when posts change |

#### How revalidation works

- **On-demand:** Payload `afterChange` and `afterDelete` hooks call `revalidateTag(tag, 'max')` when content changes. This invalidates the relevant cache entries so the next request fetches fresh data.
- **Time-based:** Posts list uses `cacheLife({ revalidate: 600 })` (10 minutes) as a fallback.

#### What stays uncached

- Page and post document fetches in `./src/app/(frontend)/[locale]/[slug]/page.tsx` and `./src/app/(frontend)/[locale]/posts/[slug]/page.tsx` use `React.cache` for request deduplication only (e.g. when both the page and `generateMetadata` fetch the same document). They do not use `use cache` because they depend on `draftMode()`, which cannot run inside a cached boundary.

### Fonts

Fonts are centralized in `src/config/fonts.ts` so you can swap or add fonts in one place. The root layout imports from this config and applies the font CSS variables to the `<html>` element.

- **`fontSans`** — Used as Tailwind’s `font-sans` across the app (the root layout applies `font-sans` to `html`). Default: Geist Sans.
- **`fontMono`** — Used as `font-mono`. Default: Geist Mono.

To change fonts (e.g. for branding), edit `src/config/fonts.ts` only. Update the font loaders (`fontSans`, `fontMono`) and, if the new font uses different CSS variable names, the `fontSansVariable` and `fontMonoVariable` exports. The layout will then use those variables to map Tailwind’s `font-sans` and `font-mono`.

### Cookies

This template **does not set any cookies for public visitors**. The only cookies in the stack are:

- **`payload-token`** — HTTP-only JWT auth cookie, set only when a user logs into the Payload admin panel.
- **Next.js draft-mode cookie** — set only when an admin enters live preview.

Because these are strictly necessary/functional cookies used exclusively by authenticated admin users, **no cookie consent banner is required** under the ePrivacy Directive (Article 5(3)) or GDPR. The template ships without one.

**If you add analytics, tracking, or marketing scripts** (Google Analytics, Meta Pixel, etc.), you will need to implement a cookie consent banner. In that case, consider adding a `cookieBanner` field group to the `SiteSettings` global (for CMS-editable text) and a `'use client'` component in the locale layout that stores consent in a cookie so server-side code can conditionally load third-party scripts.

### Internationalization

The frontend supports **English** and **Bulgarian**. The admin panel stays in English.

- **URL structure:** All frontend routes are prefixed with locale (e.g. `/en/about`, `/bg/za-nas`). The root `/` redirects to a locale based on `Accept-Language` (or `/en` as fallback).
- **Content localization:** Pages, posts, header, and footer have localized fields. Add translations in the Payload admin per locale.
- **UI translations:** End-user labels (nav, search, pagination, etc.) are in `src/i18n/translations.ts`.
- **Locale switcher:** The header includes EN | BG links to switch locale while preserving the current path.

In development, the schema (including localized fields) is created automatically by `push`. For production, run `pnpm payload migrate:create` to generate your first migration from the config, then `pnpm payload migrate`.

#### Vercel deployment

- **Default `use cache`:** Uses in-memory cache per serverless instance. Good for most cases.
- **Optional `use cache: remote`:** For shared cache across all instances (better hit rates, fewer cold-start misses), switch to `'use cache: remote'` in the utilities and ensure [Runtime Cache](https://vercel.com/docs/runtime-cache) or custom `cacheHandlers` are configured.

#### Payload Cloud

Payload Cloud proxies and caches files through Cloudflare. Next.js caching still provides value (deduplication, prefetch hints, tag-based invalidation). If you prefer minimal Next.js caching for Cloud-only deployments, you can disable `cacheComponents` and remove `use cache` usage.

For more details, see the [Next.js Caching Docs](https://nextjs.org/docs/app/building-your-application/caching) and `docs/NEXTJS_16_CACHING_ASSESSMENT.md` in this repo.

## Development

To spin up this example locally, follow the [Quick Start](#quick-start). Then [Seed](#seed) the database with a few pages, posts, and projects.

### Working with Postgres

Postgres and other SQL-based databases follow a strict schema for managing your data. In comparison to our MongoDB adapter, this means that there's a few extra steps to working with Postgres.

Note that often times when making big schema changes you can run the risk of losing data if you're not manually migrating it.

#### Local development

Ideally we recommend running a local copy of your database so that schema updates are as fast as possible. By default the Postgres adapter has `push: true` for development environments. This will let you add, modify and remove fields and collections without needing to run any data migrations.

If your database is pointed to production you will want to set `push: false` otherwise you will risk losing data or having your migrations out of sync.

#### Migrations

[Migrations](https://payloadcms.com/docs/database/migrations) are essentially SQL code versions that keeps track of your schema. When deploying with Postgres you will need to make sure you create and then run your migrations.

This template ships without pre-built migrations. In development, `push` creates and updates the schema automatically. For production, run `migrate:create` first to generate migrations from your config, then `migrate` in your build or deploy pipeline. The generated `src/migrations` folder should be committed to your project (not gitignored) so schema changes are versioned.

**Connection errors?** If `pnpm payload migrate` fails with `getaddrinfo ENOTFOUND` or `Failed query`, see [docs/MIGRATIONS_TROUBLESHOOTING.md](docs/MIGRATIONS_TROUBLESHOOTING.md).

Locally create a migration

```bash
pnpm payload migrate:create
```

This creates the migration files you will need to push alongside with your new configuration.

On the server after building and before running `pnpm start` you will want to run your migrations

```bash
pnpm payload migrate
```

This command will check for any migrations that have not yet been run and try to run them and it will keep a record of migrations that have been run in the database.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

### Seed

To seed the database with a few pages, posts, and projects you can click the 'seed database' link from the admin panel.

The seed script will also create a demo user for demonstration purposes only:

- Demo Author
  - Email: `demo-author@payloadcms.com`
  - Password: `password`

> NOTICE: seeding the database is destructive because it drops your current database to populate a fresh one from the seed template. Only run this command if you are starting a new project or can afford to lose your current data.

#### Seed data overview

This template is based on the official [Payload Website Template](https://github.com/payloadcms/payload/tree/main/templates/website). The styling and visual presentation are intentionally left as your responsibility to adjust for your brand.

This project additionally seeds both the original Payload demo content and the added agency-specific collections, so you can immediately verify the new UI pieces in the frontend.

Collections seeded:

- `pages` (includes a published `home` page that uses the Layout Builder blocks)
- `posts` (used by the homepage `Archive` block)
- `media` (image assets referenced by other collections)
- `customers` (featured customer logos for the `Logo Banner` block)
- `technologies` (partner logos for the `Logo Banner` block)
- `testimonials` (data for the `Testimonial` block)
- `awards` (year-grouped timeline for the `Awards List` block)
- `team-members` (team list content)
- `services` (service docs content)
- `case-studies` (case study content)
- `legal-pages` (policy/disclaimer content)
- `demos` (demo product content)
- `portfolio` (work showcase content)

Globals seeded:

- `header` (navigation + CTA buttons)
- `footer` (link columns + social links)
- `site-settings` (site name/description and contact info)

#### Frontend features showcased on `Home`

After seeding, the `home` page will render these Layout Builder blocks using the newly seeded collections:

- `Stats` (agency metrics)
- `Logo Banner` for both customers and technologies
- `Testimonial` (carousel)
- `Archive` (recent posts)
- `Awards List` (year-grouped awards timeline)
- `CTA` (call to action)

## Production

To run Payload in production, you need to build and start the Admin panel. To do so, follow these steps:

1. Invoke the `next build` script by running `pnpm build` or `npm run build` in your project root. This creates a `.next` directory with a production-ready admin bundle.
1. Finally run `pnpm start` or `npm run start` to run Node in production and serve Payload from the `.build` directory.
1. When you're ready to go live, see Deployment below for more details.

### Deploying to Vercel

This template can also be deployed to Vercel for free. You can get started by choosing the Vercel DB adapter during the setup of the template or by manually installing and configuring it:

```bash
pnpm add @payloadcms/db-vercel-postgres
```

```ts
// payload.config.ts
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

export default buildConfig({
  // ...
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  // ...
```

We also support Vercel's blob storage:

```bash
pnpm add @payloadcms/storage-vercel-blob
```

```ts
// payload.config.ts
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

export default buildConfig({
  // ...
  plugins: [
    vercelBlobStorage({
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  // ...
```

There is also a simplified [one click deploy](https://github.com/payloadcms/payload/tree/templates/with-vercel-postgres) to Vercel should you need it.

### Self-hosting

Before deploying your app, you need to:

1. Ensure your app builds and serves in production. See [Production](#production) for more details.
2. You can then deploy Payload as you would any other Node.js or Next.js application either directly on a VPS, DigitalOcean's Apps Platform, via Coolify or more. More guides coming soon.

You can also deploy your app manually, check out the [deployment documentation](https://payloadcms.com/docs/production/deployment) for full details.

## Template checklist

This template has been upgraded to **Next.js 16**. Requires Node.js 20.9+.

Before deploying, review this checklist. Several items are not enabled by default and may be required for your deployment target.

### Vercel deployment

- **[ ] Cache configuration** – Caching is enabled by default (`cacheComponents: true`, `use cache` in utilities). For Vercel, consider `use cache: remote` for shared cache across serverless instances. See the [Cache](#cache) section.
- **[ ] Media storage** – Media uses [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob) via `@payloadcms/storage-vercel-blob`. Create a Blob store in the Vercel dashboard (Storage → Blob) with **Public** access, then add `BLOB_READ_WRITE_TOKEN` to your environment variables. For local dev, run `vercel env pull` or copy the token from your Vercel project.
- **[ ] `vercel.json` (Cron)** – If using [Scheduled Publish](https://payloadcms.com/docs/versions/drafts#scheduled-publish) or the jobs queue, add a `vercel.json` with a cron schedule that hits the Payload jobs endpoint with `CRON_SECRET` in the Authorization header.
- **[ ] Postgres migrations** – Add `pnpm payload migrate` to your build or start script, or run it manually before `pnpm start` on each deploy. The `payload migrate:create` and `payload migrate` commands are documented in [Migrations](#migrations) but are not in `package.json` scripts.

### Environment variables

- **[ ] `DATABASE_URL`** – The template uses `process.env.DATABASE_URL` (Vercel + Neon Postgres default). Ensure your local `.env` points to a dev DB and Vercel has the production URL.
- **[ ] `BLOB_READ_WRITE_TOKEN`** – Required for media uploads. Create a Blob store in Vercel (Storage → Blob) with **Public** access, then add the token to your project's environment variables.
- **[ ] `NEXT_PUBLIC_SERVER_URL`** – Required for CORS, links, and preview. Use your production URL. Vercel sets `VERCEL_PROJECT_PRODUCTION_URL`; `next.config.js` uses it as a fallback, but custom domains or preview deployments may need an explicit value.

### General

- **[ ] Migrations (Postgres)** – When deploying with Postgres, run `pnpm payload migrate` after build and before `pnpm start`. Consider adding it to your deploy pipeline.
- **[ ] Scheduled Publish** – Jobs queue is configured in `payload.config.ts`, but `jobs.tasks` is empty. If you use scheduled publish, ensure the relevant tasks are registered and `vercel.json` cron is set up.
- **[ ] Cookie consent** – The template sets no cookies for public visitors (only admin auth), so no banner is included. If you add analytics or marketing scripts, you must add a cookie consent banner. See [Cookies](#cookies).
- **[ ] Email service wiring** – This template does not include an email provider integration. If you need emails (for example contact form delivery, password resets, or notifications), implement that in your code and configure the required credentials.

## License
This repository's original code is licensed under the MIT License. See `LICENSE` for the full text.

This project is based on the official Payload Website Template:
- https://github.com/payloadcms/payload/tree/main/templates/website

Third-party technologies, dependencies, and any demo assets (images, logos, fonts, and other visual materials) are owned by their respective owners and are governed by their own licenses. See `THIRD_PARTY_NOTICES.md` for details and an "as-is" disclaimer for third-party materials.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).


