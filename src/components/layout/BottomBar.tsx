'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { sidebarLinks } from '@/constants'
import { cn } from '@/libs'

export const BottomBar = () => {
  const pathname = usePathname()

  return (
    <div className="absolute bottom-0 z-10 flex w-full items-center justify-between overflow-hidden bg-dark-1 px-6 py-3 md:hidden">
      {sidebarLinks.map(({ icon: Icon, route }) => {
        const isActive = pathname === route
        return (
          <Link
            key={route}
            href={route}
            className={cn(
              'flex flex-col items-center justify-center gap-2 rounded-lg px-4 py-2',
              isActive && 'bg-purple-1',
            )}
          >
            <Icon className="aspect-square h-[26px] " />
          </Link>
        )
      })}
    </div>
  )
}
