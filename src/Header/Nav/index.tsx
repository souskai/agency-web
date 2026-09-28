'use client'

import React from 'react'

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

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-2 space-x-0">
        {navItems.map(({ link, children }, i) => {
          const hasChildren = Boolean(children && children.length > 0)

          if (hasChildren) {
            return (
              <NavigationMenuItem key={i}>
                <NavigationMenuTrigger className="h-8 rounded-md px-2.5 py-0 text-sm font-medium">
                  {link.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-2 md:w-[500px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <CMSLink
                          {...link}
                          appearance="inline"
                          className={`${dropdownItemClassName} font-medium`}
                        />
                      </NavigationMenuLink>
                    </li>
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
