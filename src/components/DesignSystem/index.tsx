import React from 'react'

import type { translations } from '@/i18n/translations'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

import { TokenValue } from './TokenValue'
import {
  colorRamps,
  fontFamilies,
  motionTokens,
  radiusScale,
  semanticSwatches,
  shadowScale,
  typeScale,
  type Swatch,
} from './tokens'

const SwatchBox: React.FC<{ swatch: Swatch }> = ({ swatch }) => (
  <div className="flex flex-col gap-2">
    <div
      aria-label={swatch.label}
      className={`h-14 w-full rounded-lg ring-1 ring-border ${swatch.className}`}
    />
    <div className="flex flex-col">
      <span className="font-mono text-xs text-foreground">{swatch.label}</span>
      <TokenValue name={swatch.token} />
    </div>
  </div>
)

/**
 * The live `/design-system` guide page body. Every rendered value comes from
 * the running CSS custom properties via `TokenValue` — token data is never
 * duplicated in JS (Rule #10).
 */
/** The `designSystem` slice of the UI translations — every key is compile-checked
 * against `src/i18n/translations.ts`, so a missing or renamed key fails the build. */
export type DesignSystemCopy = (typeof translations)['en']['designSystem']

export const DesignSystem: React.FC<{ copy: DesignSystemCopy }> = ({ copy }) => {
  return (
    <div className="flex flex-col gap-24">
      {/* Colors */}
      <section>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">{copy.colorsTitle}</h2>
        {colorRamps.map((ramp) => (
          <div key={ramp.name} className="mb-8">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">{ramp.name}</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {ramp.swatches.map((s) => (
                <SwatchBox key={s.label} swatch={s} />
              ))}
            </div>
          </div>
        ))}
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">{copy.colorsSemantic}</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {semanticSwatches.map((s) => (
            <SwatchBox key={s.label} swatch={s} />
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">{copy.typographyTitle}</h2>
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          {fontFamilies.map((f) => (
            <Card key={f.name}>
              <CardHeader>
                <CardTitle>{f.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-xl ${f.className}`}>{f.sample}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">{copy.typeScaleTitle}</h3>
        <ul className="flex flex-col divide-y divide-border">
          {typeScale.map((step) => (
            <li key={step.label} className="flex items-baseline justify-between gap-4 py-3">
              <span className={step.className}>Aa</span>
              <span className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-foreground">{step.label}</span>
                <TokenValue name={step.token} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Radius */}
      <section>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">{copy.radiusTitle}</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {radiusScale.map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <div className={`h-20 w-20 bg-secondary ring-1 ring-border ${s.className}`} />
              <span className="font-mono text-xs text-foreground">{s.label}</span>
              <TokenValue name={s.token} />
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">{copy.shadowsTitle}</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {shadowScale.map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <div className={`h-20 w-full rounded-lg bg-card ${s.className}`} />
              <span className="font-mono text-xs text-foreground">{s.label}</span>
              <TokenValue name={s.token} />
            </div>
          ))}
        </div>
      </section>

      {/* Motion */}
      <section>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">{copy.motionTitle}</h2>
        <ul className="flex flex-col divide-y divide-border">
          {motionTokens.map((m) => (
            <li key={m.label} className="flex items-center justify-between gap-4 py-3">
              <span className="font-mono text-sm text-foreground">{m.label}</span>
              <TokenValue name={m.token} />
            </li>
          ))}
        </ul>
      </section>

      {/* Components */}
      <section>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">{copy.componentsTitle}</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
        <div className="mt-6 grid max-w-sm gap-4">
          <Input placeholder="Input" />
          <div className="flex items-center gap-2">
            <Switch aria-label="Switch" />
            <span className="text-sm text-muted-foreground">Switch</span>
          </div>
        </div>
      </section>
    </div>
  )
}
