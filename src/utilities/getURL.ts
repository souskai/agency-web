import canUseDOM from './canUseDOM'

const normalize = (url: string) => url.trim().replace(/\/+$/, '')

export const getServerSideURL = () => {
  return normalize(
    process.env.NEXT_PUBLIC_SERVER_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : 'http://localhost:3000'),
  )
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return normalize(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  }

  return normalize(process.env.NEXT_PUBLIC_SERVER_URL || '')
}
