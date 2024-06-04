'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { UserIcon } from '@heroicons/react/24/outline'
import { Notification } from '@prisma/client'

import { readAllNotification } from '@/actions'
import { sidebarLinks } from '@/constants'
import { authStore } from '@/stores'
import { cn } from '@/libs'

interface BottomBarProps {
  notifications: Notification[]
}

export const BottomBar = ({ notifications }: BottomBarProps) => {
  const pathname = usePathname()

  const auth = authStore((state) => state.user)

  const menus = [
    ...sidebarLinks,
    { icon: UserIcon, label: 'Profile', route: `/profile/${auth?.id}` },
  ]

  return (
    <div className="fixed bottom-0 z-10 flex w-full items-center justify-around border-t border-gray-100 bg-gray-50 px-4 py-2 md:hidden">
      {menus.map(({ icon: Icon, route, label }) => {
        const isActive =
          label === 'Profile' ? pathname.includes(route) : pathname === route
        return (
          <Link
            key={route}
            href={route}
            onClick={async () => {
              if (label === 'Notification') {
                await readAllNotification()
              }
            }}
            className={cn(
              'relative flex flex-col items-center justify-center gap-2 rounded-md p-2',
              isActive && 'bg-brand text-gray-50',
            )}
          >
            {notifications.length > 0 && label === 'Notification' && (
              <div className="absolute left-5 top-1.5 flex h-4 w-4 animate-bounce items-center justify-center rounded-full bg-red-500 text-small-semibold" />
            )}
            <Icon className="h-5 w-5" />
          </Link>
        )
      })}
    </div>
  )
}
