// src/config/fonts.ts
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

/**
 * Sans font — used as font-sans across the app (html applies font-sans).
 * Swap this per client to change the primary UI font.
 */
export const fontSans = GeistSans

/**
 * Mono font — used as font-mono.
 * Rarely changes.
 */
export const fontMono = GeistMono

/** CSS variable names injected by the font loaders. Used to map Tailwind font-sans/font-mono. */
export const fontSansVariable = '--font-geist-sans'
export const fontMonoVariable = '--font-geist-mono'
