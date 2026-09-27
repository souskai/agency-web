'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ThemeToggle } from '@/components/ThemeToggle'
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
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

export const MobileNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const [open, setOpen] = useState(false)

  const navItems = data?.navItems || []
  const ctaButtons = data?.ctaButtons || []

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
      <SheetContent side="right">
        <SheetHeader className="border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto py-2" onClick={closeOnLinkClick}>
          {navItems.map(({ link, children }, i) => {
            const hasChildren = Boolean(children && children.length > 0)

            if (hasChildren) {
              return (
                <Accordion key={i} type="single" collapsible>
                  <AccordionItem value={`item-${i}`} className="border-b-0">
                    <AccordionTrigger className="px-3 py-3 text-base">{link.label}</AccordionTrigger>
                    <AccordionContent className="[&_a]:no-underline">
                      <div className="flex flex-col">
                        <CMSLink
                          {...link}
                          appearance="inline"
                          className="rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
                        />
                        {children?.map(({ link: childLink }, j) => (
                          <CMSLink
                            key={j}
                            {...childLink}
                            appearance="inline"
                            className="rounded-md px-3 py-2 text-base hover:bg-accent"
                          />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            }

            return (
              <CMSLink
                key={i}
                {...link}
                appearance="inline"
                className="rounded-md px-3 py-3 text-base hover:bg-accent"
              />
            )
          })}
        </nav>
        <SheetFooter className="border-t">
          <div className="flex flex-col gap-2" onClick={closeOnLinkClick}>
            {ctaButtons.map(({ link }, i) => (
              <CMSLink key={i} {...link} className="w-full" />
            ))}
          </div>
          <div className="flex justify-start pt-2">
            <ThemeToggle />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
