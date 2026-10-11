import { RequiredDataFromCollectionSlug } from 'payload'
import type { PostArgs } from './post-1'

import { head, lexicalRoot, mediaNode, para } from './lexical'

export const post2: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  blockImage,
  author,
}) => {
  return {
    slug: 'migrating-off-wordpress',
    _status: 'published',
    authors: author ? [author] : [],
    content: lexicalRoot([
      para(
        "Saying 'we're stuck on WordPress' usually means one thing: nobody can face moving the archive. A decade of posts, custom fields, and URL structure feels too fragile to touch. The irony is that staying is the bigger risk — the incumbent platform can change its pricing, its plugins, or its security posture faster than you can maintain it.",
      ),
      head('Migration is an export, not a rewrite'),
      para(
        "The content isn't the problem; it's just data. We map posts, pages, media, and redirects into a typed schema, preserve every slug so your ranking and inbound links survive, and keep a per-field audit trail of what moved where.",
      ),
      para(
        "URLs are the part people fear most, and the part we treat as non-negotiable. Every old path becomes a redirect, every image is re-served from object storage, and the sitemap is regenerated so search engines follow the same map you always had — just pointed at a stack you own.",
      ),
      mediaNode(blockImage.id),
      head('Why the archive matters more than the site'),
      para(
        "A website is replaceable. The record — what you said, when you said it, and what you promised — isn't. We build migrations around the archive first and the look second, because the archive is the asset your organization actually can't afford to lose.",
      ),
    ]),
    meta: {
      description:
        "A legacy site is an argument for careful migration, not for staying put. How we move years of content off WordPress with URLs, SEO, and history intact.",
      title: 'Migrating off WordPress without losing your archive',
    },
    relatedPosts: [],
    title: 'Migrating off WordPress without losing your archive',
  }
}
