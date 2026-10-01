'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

/** Top-level entries — display face (mirrors the Logo wordmark + headings). */
const topLevelClassName =
  'flex-1 rounded-md px-3 py-3 font-display text-lg font-medium tracking-tight hover:bg-accent'

/** Dropdown children — body face (Inter), one step down from the top level. */
const childClassName = 'rounded-md px-3 py-2 font-sans text-base text-foreground/80 hover:bg-accent'

export const MobileNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const [open, setOpen] = useState(false)

  const navItems = data?.navItems || []

  const closeOnLinkClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    if (target.closest('a')) setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="data-[side=right]:bottom-auto! data-[side=right]:h-auto! data-[side=right]:max-h-dvh! rounded-l-xl overflow-hidden"
      >
        <SheetHeader className="border-b">
          <SheetTitle className="font-display text-[1.625rem] font-bold leading-none tracking-tight">
            Souskai
          </SheetTitle>
        </SheetHeader>
        <nav
          className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto py-2"
          onClick={closeOnLinkClick}
        >
          {navItems.map(({ link, children }, i) => {
            const hasChildren = Boolean(children && children.length > 0)

            if (hasChildren) {
              return (
                <Accordion key={i} type="single" collapsible defaultValue={`item-${i}`}>
                  <AccordionItem value={`item-${i}`} className="border-b-0">
                    {/* Desktop parity: the top-level entry is a real link (hover discloses
                        there). Touch has no hover, so the disclosure moves to a sibling
                        icon-only toggle. No duplicated parent row inside the panel. */}
                    <div className="flex items-center gap-1">
                      <CMSLink {...link} appearance="inline" className={topLevelClassName} />
                      <AccordionTrigger
                        aria-label={`Toggle ${link.label} submenu`}
                        className="w-auto flex-none shrink-0 px-2 py-3 hover:no-underline"
                      >
                        {null}
                      </AccordionTrigger>
                    </div>
                    <AccordionContent className="[&_a]:no-underline">
                      <div className="flex flex-col">
                        {children?.map(({ link: childLink }, j) => (
                          <CMSLink
                            key={j}
                            {...childLink}
                            appearance="inline"
                            className={childClassName}
                          />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            }

            return (
              <CMSLink key={i} {...link} appearance="inline" className={topLevelClassName} />
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
