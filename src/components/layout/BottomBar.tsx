'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { UserIcon } from '@heroicons/react/24/outline'
import { User } from '@prisma/client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/libs'

interface BottomBarProps {
  user: User
}

export const BottomBar = ({ user }: BottomBarProps) => {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 z-10 flex w-full items-center justify-around border-t border-dark-2 bg-purple-2 px-4 py-2 md:hidden">
      {sidebarLinks.map(({ icon: Icon, route }) => {
        const isActive = pathname === route
        return (
          <Link
            key={route}
            href={route}
            className={cn(
              'flex flex-col items-center justify-center gap-2 rounded-lg p-2',
              isActive && 'bg-purple-1',
            )}
          >
            <Icon className="h-5 w-5" />
          </Link>
        )
      })}

      <Link
        href={`/profile/${user.id}`}
        className={cn(
          'flex flex-col items-center justify-center gap-2 rounded-lg p-2',
          pathname.includes(`/profile/${user.id}`) && 'bg-purple-1',
        )}
      >
        <UserIcon className="h-5 w-5" />
      </Link>
    </div>
  )
}
