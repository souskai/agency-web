import type { RequiredDataFromCollectionSlug } from 'payload'

type PostContent = RequiredDataFromCollectionSlug<'posts'>['content']

/**
 * Minimal Lexical node builders for seeded posts. Kept intentionally terse; the
 * single cast in `lexicalRoot` (to `PostContent`) is the one place shape
 * compatibility is asserted, so copy edits stay lean.
 */
export const txt = (text: string, format = 0) => ({
  type: 'text',
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text,
  version: 1,
})

export const para = (text: string) => ({
  type: 'paragraph',
  children: [txt(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

export const head = (text: string, tag: 'h2' | 'h3' = 'h2') => ({
  type: 'heading',
  children: [txt(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  tag,
  version: 1,
})

export const mediaNode = (mediaId: number) => ({
  type: 'block',
  fields: { blockName: '', blockType: 'mediaBlock', media: mediaId },
  format: '',
  version: 2,
})

export const lexicalRoot = (children: unknown[]): PostContent =>
  ({
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }) as PostContent