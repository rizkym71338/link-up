'use client'

import { Fragment } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { User } from '@prisma/client'
import { UserIcon } from '@heroicons/react/24/outline'

import { sidebarLinks } from '@/constants'
import { cn } from '@/libs'

interface MenuProps {
  user: User
}

export const Menu = ({ user }: MenuProps) => {
  const pathname = usePathname()

  const menus = [
    ...sidebarLinks,
    { icon: UserIcon, label: 'Profile', route: `/profile/${user.id}` },
  ]

  return (
    <Fragment>
      {menus.map(({ icon: Icon, label, route }) => {
        const isActive =
          label === 'Profile' ? pathname.includes(route) : pathname === route
        return (
          <Link
            key={route}
            href={route}
            className={cn(
              'mb-2 flex items-center rounded-lg px-3 py-2 transition-all hover:bg-purple-1',
              isActive && 'bg-purple-1',
            )}
          >
            <Icon className="mr-3 h-5 w-5" />
            <p>{label}</p>
          </Link>
        )
      })}
    </Fragment>
  )
}
