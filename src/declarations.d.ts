// Ambient declarations for non-TypeScript asset imports handled by
// Next.js/Turbopack at build time. These exist only to satisfy the
// TypeScript language server (VS Code) so it stops reporting
// "cannot find module".

declare module '*.css'
declare module '*.scss'
declare module '*.sass'

// `@payloadcms/next/css` resolves to a plain CSS file, but the package's
// `./css` export entry ships no `"types"` field, hence the explicit stub.
declare module '@payloadcms/next/css'
