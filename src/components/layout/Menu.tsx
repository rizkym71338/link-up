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

  return (
    <Fragment>
      {sidebarLinks.map(({ icon: Icon, label, route }) => {
        const isActive = pathname === route
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

      <Link
        href={`/profile/${user.id}/posts`}
        className={cn(
          'mb-2 flex items-center rounded-lg px-3 py-2 transition-all hover:bg-purple-1',
          pathname.includes(`/profile/${user.id}`) && 'bg-purple-1',
        )}
      >
        <UserIcon className="mr-3 h-5 w-5" />
        <p>Profile</p>
      </Link>
    </Fragment>
  )
}
