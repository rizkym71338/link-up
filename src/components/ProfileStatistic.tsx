'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { authStore } from '@/stores'
import { cn } from '@/libs'

interface ProfileStatisticProps {
  className?: string
}

export const ProfileStatistic = ({ className }: ProfileStatisticProps) => {
  const pathname = usePathname()

  const auth = authStore((state) => state.user)

  const currentPrefix = pathname.split('/')[3] || ''

  const info = [
    {
      value: auth?.posts.length || '0',
      label: 'Posts',
      prefix: '',
    },
    {
      value: auth?.followersIds.length || '0',
      label: 'Followers',
      prefix: 'followers',
    },
    {
      value: auth?.followingIds.length || '0',
      label: 'Following',
      prefix: 'following',
    },
  ]

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {info.map(({ value, label, prefix }, index) => {
        if (!auth) {
          return (
            <div
              key={index}
              className="h-10 w-full animate-pulse rounded-md bg-dark-2"
            />
          )
        }

        return (
          <Link
            key={index}
            href={`/profile/${auth?.id}/${prefix}`}
            className={cn(
              'w-full text-center transition-all hover:text-purple-1',
              currentPrefix === prefix && prefix !== '' && 'text-purple-1',
            )}
          >
            <p className="text-base-bold">{value}</p>
            <p className="text-tiny-medium">{label}</p>
          </Link>
        )
      })}
    </div>
  )
}
