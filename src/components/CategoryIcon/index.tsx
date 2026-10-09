import { ChartLine, Cog, Code, Cpu, Newspaper, Palette, Tag } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

/**
 * Maps a post's category `slug` to an inline SVG (lucide) icon.
 * Mirrors `ServiceIcon` (`src/components/ServiceIcon`). Unknown/missing slugs
 * fall back to a neutral `Tag` glyph, and the lookup is case-insensitive.
 */
const iconMap: Record<string, LucideIcon> = {
  engineering: Cog,
  technology: Cpu,
  design: Palette,
  finance: ChartLine,
  news: Newspaper,
  software: Code,
}

export const CategoryIcon: React.FC<{ category?: string | null; className?: string }> = ({
  category,
  className,
}) => {
  const Icon = (category && iconMap[category.toLowerCase()]) || Tag
  return <Icon className={cn('h-6 w-6', className)} aria-hidden="true" />
}