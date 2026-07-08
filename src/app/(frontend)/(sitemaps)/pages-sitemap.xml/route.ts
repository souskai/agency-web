import { getServerSideSitemap } from 'next-sitemap'
import { getPagesSitemap } from '@/utilities/getPagesSitemap'

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
