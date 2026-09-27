'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ThemeToggle } from '@/components/ThemeToggle'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

const dropdownItemClassName =
  'block select-none rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-1">
        {navItems.map(({ link, children }, i) => {
          const hasChildren = Boolean(children && children.length > 0)

          if (hasChildren) {
            return (
              <NavigationMenuItem key={i}>
                <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
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
                <CMSLink {...link} appearance="link" />
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
        <NavigationMenuItem>
          <ThemeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
