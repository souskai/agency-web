import {
  Brain,
  Code,
  Globe,
  Layout,
  Megaphone,
  Palette,
  Rocket,
  Shield,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

/**
 * Maps the Services collection `icon` select values to lucide components.
 * Mirrors `serviceIconOptions` in `src/collections/Services/index.ts`.
 * Unknown/missing values fall back to a neutral Sparkles glyph.
 */
const iconMap: Record<string, LucideIcon> = {
  brain: Brain,
  code: Code,
  globe: Globe,
  layout: Layout,
  megaphone: Megaphone,
  palette: Palette,
  rocket: Rocket,
  shield: Shield,
  smartphone: Smartphone,
  zap: Zap,
}

export const ServiceIcon: React.FC<{ icon?: string | null; className?: string }> = ({
  icon,
  className,
}) => {
  const Icon = (icon && iconMap[icon]) || Sparkles
  return <Icon className={cn('h-6 w-6', className)} aria-hidden="true" />
}
