'use client'

import React, { useEffect, useState } from 'react'

/**
 * Reads a single CSS custom property from `document.documentElement` at runtime
 * and re-reads it whenever the `data-theme` attribute changes, so a token's
 * displayed value always matches the live theme (light / dark) with zero
 * duplication of token data in JS.
 *
 * Renders an empty span on the server and on first hydration (both are empty,
 * so there is no hydration mismatch), then fills in the computed value.
 */
export const TokenValue: React.FC<{ name: string }> = ({ name }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    const read = () => {
      const computed = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim()
      setValue(computed || name)
    }

    read()

    const root = document.documentElement
    const observer = new MutationObserver(read)
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })

    return () => observer.disconnect()
  }, [name])

  return <span className="font-mono text-xs text-muted-foreground">{value}</span>
}
