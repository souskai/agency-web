'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

/**
 * Single rhythm for every nav entry: 32px tall, 10px inline inset, 8px apart
 * (see NavigationMenuList below). Triggers and flat links share it so the row
 * has one baseline and one height.
 */
const navItemClassName =
  'inline-flex h-8 w-fit items-center rounded-md px-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none'

const dropdownItemClassName =
  'block select-none rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()
  const [openItem, setOpenItem] = useState('')
  const [prevPathname, setPrevPathname] = useState(pathname)

  // Radix's trigger click toggles the panel. The header lives in the locale layout
  // and persists across soft navigation, so a click-opened panel would otherwise
  // stay open on the new page. Reset it whenever the route changes (React's
  // "adjust state during render" pattern — no effect needed).
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setOpenItem('')
  }

  return (
    <NavigationMenu className="hidden md:flex" value={openItem} onValueChange={setOpenItem}>
      <NavigationMenuList className="gap-2 space-x-0">
        {navItems.map(({ link, children }, i) => {
          const hasChildren = Boolean(children && children.length > 0)
          const itemValue = `nav-item-${i}`

          if (hasChildren) {
            return (
              <NavigationMenuItem
                key={i}
                value={itemValue}
                onKeyDown={(event) => {
                  // The trigger is a real link, so Enter navigates to it. Space and
                  // ArrowDown disclose the panel instead of scrolling the page.
                  if (event.key === ' ' || event.key === 'ArrowDown') {
                    event.preventDefault()
                    setOpenItem(itemValue)
                  }
                }}
              >
                <NavigationMenuTrigger
                  asChild
                  chevron={false}
                  className={`${navItemClassName} group py-0 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground`}
                >
                  <CMSLink {...link} appearance="inline">
                    <ChevronDown
                      className="ml-1 h-3 w-3 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </CMSLink>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="md:w-max">
                  <ul className="grid gap-1 p-2">
                    {children?.map(({ link: childLink }, j) => (
                      <li key={j}>
                        <NavigationMenuLink asChild>
                          <CMSLink
                            {...childLink}
                            appearance="inline"
                            className={dropdownItemClassName}
                          />
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }

          return (
            <NavigationMenuItem key={i}>
              <NavigationMenuLink asChild>
                <CMSLink {...link} appearance="inline" className={navItemClassName} />
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
