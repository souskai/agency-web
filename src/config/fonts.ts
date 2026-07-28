// src/config/fonts.ts
import { Geist_Mono, Inter, Space_Grotesk } from 'next/font/google'

/**
 * Sans font — Inter, used for body text, UI elements, paragraphs, nav.
 */
export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

/**
 * Display font — Space Grotesk, used for headings, hero text, section titles, stats.
 */
export const fontDisplay = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

/**
 * Mono font — Geist Mono, used for code blocks, technical labels, metadata.
 */
export const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})
