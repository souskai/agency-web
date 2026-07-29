'use client'

import React, { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

import { Switch } from '@/components/ui/switch'
import { useTheme } from '@/providers/Theme'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === 'dark'

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light')
  }

  return (
    <div className="flex items-center gap-2">
      <Sun className="size-4 text-muted-foreground" />
      {mounted ? (
        <Switch checked={isDark} onCheckedChange={handleToggle} aria-label="Toggle dark mode" />
      ) : (
        <div className="h-5 w-9 rounded-full bg-muted" aria-hidden="true" />
      )}
      <Moon className="size-4 text-muted-foreground" />
    </div>
  )
}
