/**
 * Design-system token data for the `/design-system` guide page.
 *
 * IMPORTANT: this module only *names* tokens and maps each one to a static
 * Tailwind utility class. The token VALUES live exclusively in
 * `src/app/(frontend)/globals.css` (Rule #10 — no design tokens in TS). The
 * rendered hex/px strings are read at runtime by `TokenValue`, so the guide
 * page is structurally incapable of drifting from the real theme.
 */

export type Swatch = {
  /** Human label (e.g. `brand-500` or `background`). */
  label: string
  /** Static Tailwind utility — a literal string, never assembled at runtime. */
  className: string
  /** Raw CSS custom property to read the live value from. */
  token: string
}

export const colorRamps: { name: string; swatches: Swatch[] }[] = [
  {
    name: 'Brand',
    swatches: [
      { label: 'brand-50', className: 'bg-brand-50', token: '--brand-50' },
      { label: 'brand-100', className: 'bg-brand-100', token: '--brand-100' },
      { label: 'brand-200', className: 'bg-brand-200', token: '--brand-200' },
      { label: 'brand-300', className: 'bg-brand-300', token: '--brand-300' },
      { label: 'brand-400', className: 'bg-brand-400', token: '--brand-400' },
      { label: 'brand-500', className: 'bg-brand-500', token: '--brand-500' },
      { label: 'brand-600', className: 'bg-brand-600', token: '--brand-600' },
      { label: 'brand-700', className: 'bg-brand-700', token: '--brand-700' },
    ],
  },
  {
    name: 'Neutral',
    swatches: [
      { label: 'white', className: 'bg-white', token: '--white' },
      { label: 'neutral-50', className: 'bg-neutral-50', token: '--neutral-50' },
      { label: 'neutral-100', className: 'bg-neutral-100', token: '--neutral-100' },
      { label: 'neutral-200', className: 'bg-neutral-200', token: '--neutral-200' },
      { label: 'neutral-300', className: 'bg-neutral-300', token: '--neutral-300' },
      { label: 'neutral-400', className: 'bg-neutral-400', token: '--neutral-400' },
      { label: 'neutral-500', className: 'bg-neutral-500', token: '--neutral-500' },
      { label: 'neutral-600', className: 'bg-neutral-600', token: '--neutral-600' },
      { label: 'neutral-700', className: 'bg-neutral-700', token: '--neutral-700' },
      { label: 'neutral-800', className: 'bg-neutral-800', token: '--neutral-800' },
      { label: 'neutral-900', className: 'bg-neutral-900', token: '--neutral-900' },
      { label: 'black', className: 'bg-black', token: '--black' },
    ],
  },
  {
    name: 'Success',
    swatches: [
      { label: 'success-50', className: 'bg-success-50', token: '--success-50' },
      { label: 'success-100', className: 'bg-success-100', token: '--success-100' },
      { label: 'success-200', className: 'bg-success-200', token: '--success-200' },
      { label: 'success-300', className: 'bg-success-300', token: '--success-300' },
      { label: 'success-400', className: 'bg-success-400', token: '--success-400' },
      { label: 'success-500', className: 'bg-success-500', token: '--success-500' },
      { label: 'success-600', className: 'bg-success-600', token: '--success-600' },
    ],
  },
  {
    name: 'Danger',
    swatches: [
      { label: 'danger-50', className: 'bg-danger-50', token: '--danger-50' },
      { label: 'danger-100', className: 'bg-danger-100', token: '--danger-100' },
      { label: 'danger-200', className: 'bg-danger-200', token: '--danger-200' },
      { label: 'danger-300', className: 'bg-danger-300', token: '--danger-300' },
      { label: 'danger-400', className: 'bg-danger-400', token: '--danger-400' },
      { label: 'danger-500', className: 'bg-danger-500', token: '--danger-500' },
      { label: 'danger-600', className: 'bg-danger-600', token: '--danger-600' },
    ],
  },
  {
    name: 'Warning',
    swatches: [
      { label: 'warning-500', className: 'bg-warning-500', token: '--warning-500' },
    ],
  },
]

export const semanticSwatches: Swatch[] = [
  { label: 'background', className: 'bg-background', token: '--background' },
  { label: 'card', className: 'bg-card', token: '--background-elevated' },
  { label: 'secondary', className: 'bg-secondary', token: '--background-soft' },
  { label: 'foreground', className: 'bg-foreground', token: '--foreground' },
  { label: 'muted-foreground', className: 'bg-muted-foreground', token: '--foreground-muted' },
  { label: 'primary', className: 'bg-primary', token: '--brand-500' },
  { label: 'accent', className: 'bg-accent', token: '--brand-500' },
  { label: 'border', className: 'bg-border', token: '--border-subtle' },
  { label: 'destructive', className: 'bg-destructive', token: '--danger-500' },
  { label: 'success', className: 'bg-success', token: '--success-500' },
  { label: 'warning', className: 'bg-warning', token: '--warning-500' },
]

export const fontFamilies: { name: string; className: string; sample: string }[] = [
  {
    name: 'Display — Space Grotesk',
    className: 'font-display',
    sample: 'Engineered for scale',
  },
  {
    name: 'Sans — Inter',
    className: 'font-sans',
    sample: 'The quick brown fox jumps over the lazy dog.',
  },
  {
    name: 'Mono — Geist Mono',
    className: 'font-mono',
    sample: 'const tokens = readFromCss()',
  },
]

export const typeScale: { label: string; className: string; token: string }[] = [
  { label: 'xs', className: 'text-xs', token: '--text-xs' },
  { label: 'sm', className: 'text-sm', token: '--text-sm' },
  { label: 'base', className: 'text-base', token: '--text-base' },
  { label: 'lg', className: 'text-lg', token: '--text-lg' },
  { label: 'xl', className: 'text-xl', token: '--text-xl' },
  { label: '2xl', className: 'text-2xl', token: '--text-2xl' },
  { label: '3xl', className: 'text-3xl', token: '--text-3xl' },
  { label: '4xl', className: 'text-4xl', token: '--text-4xl' },
  { label: '5xl', className: 'text-5xl', token: '--text-5xl' },
  { label: '6xl', className: 'text-6xl', token: '--text-6xl' },
  { label: '7xl', className: 'text-7xl', token: '--text-7xl' },
]

export const radiusScale: Swatch[] = [
  { label: 'sm', className: 'rounded-sm', token: '--radius-sm' },
  { label: 'md', className: 'rounded-md', token: '--radius-md' },
  { label: 'lg', className: 'rounded-lg', token: '--radius-lg' },
  { label: 'xl', className: 'rounded-xl', token: '--radius-xl' },
  { label: '2xl', className: 'rounded-2xl', token: '--radius-2xl' },
  { label: 'pill', className: 'rounded-pill', token: '--radius-pill' },
]

export const shadowScale: Swatch[] = [
  { label: 'sm', className: 'shadow-sm', token: '--shadow-sm' },
  { label: 'md', className: 'shadow-md', token: '--shadow-md' },
  { label: 'lg', className: 'shadow-lg', token: '--shadow-lg' },
  { label: 'xl', className: 'shadow-xl', token: '--shadow-xl' },
  { label: 'glow', className: 'shadow-glow', token: '--shadow-glow' },
]

export const motionTokens: { label: string; token: string }[] = [
  { label: 'ease-out-expo', token: '--ease-out-expo' },
  { label: 'duration-instant', token: '--duration-instant' },
  { label: 'duration-fast', token: '--duration-fast' },
  { label: 'duration-base', token: '--duration-base' },
  { label: 'duration-slow', token: '--duration-slow' },
]

