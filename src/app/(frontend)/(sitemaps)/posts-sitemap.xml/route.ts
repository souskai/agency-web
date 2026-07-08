import { getServerSideSitemap } from 'next-sitemap'
import { getPostsSitemap } from '@/utilities/getPostsSitemap'

export async function GET() {
  const sitemap = await getPostsSitemap()

  return getServerSideSitemap(sitemap)
}
