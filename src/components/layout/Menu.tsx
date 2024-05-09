'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { sidebarLinks } from '@/constants'
import { cn } from '@/libs'

export const Menu = () => {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-2">
      {sidebarLinks.map(({ icon: Icon, label, route }) => {
        const isActive = pathname === route
        return (
          <Link
            key={route}
            href={route}
            className={cn(
              'flex items-center gap-4 rounded-lg px-4 py-2 transition-all hover:bg-purple-1',
              isActive && 'bg-purple-1',
            )}
          >
            <Icon className="aspect-square h-[26px] text-light-1" />
            <p className="text-light-1">{label}</p>
          </Link>
        )
      })}
    </div>
  )
}
