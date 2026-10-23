import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Souskai',
    short_name: 'Souskai',
    description: 'Type-safe Payload CMS + Next.js platforms you own outright.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1c1c1e',
    theme_color: '#ff4d00',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}