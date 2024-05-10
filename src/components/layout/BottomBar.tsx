'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { sidebarLinks } from '@/constants'
import { cn } from '@/libs'

export const BottomBar = () => {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 z-10 flex w-full items-center justify-between overflow-hidden rounded-t-3xl border-t border-dark-2 bg-purple-2 p-4 md:hidden">
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
    </div>
  )
}
