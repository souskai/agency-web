/**
 * One-off dev script: switch the home page hero to `heroGrid` with dummy agency copy.
 * Usage: pnpm tsx scripts/set-home-hero.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.js'

type LexicalNode = { type: string; version: number; [k: string]: unknown }

function heading(text: string, tag: 'h1' | 'h2' | 'h3' = 'h2'): LexicalNode {
  return {
    type: 'heading',
    children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    tag,
    version: 1,
  }
}

function paragraph(text: string): LexicalNode {
  return {
    type: 'paragraph',
    children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1,
  }
}

function richRoot(children: LexicalNode[]) {
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

async function main() {
  const payload = await getPayload({ config })

  const homePage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    depth: 0,
    limit: 1,
    overrideAccess: true,
  })

  if (homePage.docs.length === 0) {
    payload.logger.error('Home page not found')
    process.exit(1)
  }

  const page = homePage.docs[0]

  await payload.update({
    collection: 'pages',
    id: page.id,
    depth: 0,
    overrideAccess: true,
    context: { disableRevalidate: true },
    data: {
      hero: {
        type: 'heroGrid',
        links: [
          {
            link: { type: 'custom', appearance: 'default', label: 'See Portfolio', url: '/posts' },
          },
          {
            link: {
              type: 'custom',
              appearance: 'outline',
              label: 'Get a free consultation',
              url: '/contact',
            },
          },
        ],
        eyebrow: 'Leading Digital Agency',
        description:
          'Souskai Digital helps ambitious brands design, build, and scale digital experiences that drive real results \u2014 from web and SEO to AI-powered marketing.',
        richText: richRoot([
          heading('Turning strategy, creativity, and data into measurable business growth', 'h1'),
        ]),
      },
    },
  })

  payload.logger.info(`Home page hero updated to heroGrid (id: ${page.id})`)
  process.exit(0)
}

main()
