'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { sidebarLinks } from '@/constants'
import { cn } from '@/libs'

export const Menu = () => {
  const pathname = usePathname()

  return (
    <Fragment>
      {sidebarLinks.map(({ icon: Icon, label, route }) => {
        const isActive = pathname === route
        return (
          <Link
            key={route}
            href={route}
            className={cn(
              'mb-4 flex items-center rounded-lg px-4 py-2 transition-all hover:bg-purple-1',
              isActive && 'bg-purple-1',
            )}
          >
            <Icon className="mr-4 aspect-square h-[26px]" />
            <p>{label}</p>
          </Link>
        )
      })}
    </Fragment>
  )
}
