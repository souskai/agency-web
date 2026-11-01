# Production image for the Souskai web platform (Next.js 16 standalone output).
#
# Build-time data: several pages run `generateStaticParams` and the sitemap/
# globals initialize Payload, so `next build` needs DATABASE_URL + PAYLOAD_SECRET
# (exactly as a Vercel build does). Pass them as BuildKit secrets — they are
# mounted as env vars for the build step only and never land in a layer, image
# history, or build log:
#   docker build \
#     --secret id=DATABASE_URL,env=DATABASE_URL \
#     --secret id=PAYLOAD_SECRET,env=PAYLOAD_SECRET \
#     -t souskai-web .
#
# `.dockerignore` keeps `.env` and other state out of the build context.
#
# Schema is applied separately at deploy time (`pnpm payload migrate`); the
# runtime image only serves the standalone server.

FROM node:24-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ── Dependencies ─────────────────────────────────────────────
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# ── Build ────────────────────────────────────────────────────
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN --mount=type=secret,id=DATABASE_URL,env=DATABASE_URL \
    --mount=type=secret,id=PAYLOAD_SECRET,env=PAYLOAD_SECRET \
    corepack enable pnpm \
 && pnpm generate:importmap \
 && pnpm exec next build

# ── Run ──────────────────────────────────────────────────────
FROM base AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs \
 && mkdir .next \
 && chown nextjs:nodejs .next

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
