'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Post, User } from '@prisma/client'

import { authStore } from '@/stores'
import { cn } from '@/libs'

interface ProfileStatisticProps {
  user?: User & { posts: Post[] }
  className?: string
}

export const ProfileStatistic = (props: ProfileStatisticProps) => {
  const { user, className } = props

  const pathname = usePathname()

  const auth = authStore((state) => state.user)

  const currentPrefix = pathname.split('/')[3] || ''

  const info = [
    {
      value: user ? user.posts.length || '0' : auth?.posts.length || '0',
      label: 'Posts',
      prefix: '',
    },
    {
      value: user
        ? user.followersIds.length || '0'
        : auth?.followersIds.length || '0',
      label: 'Followers',
      prefix: 'followers',
    },
    {
      value: user
        ? user.followingIds.length || '0'
        : auth?.followingIds.length || '0',
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
              className="h-10 w-full animate-pulse rounded-md bg-gray-200"
            />
          )
        }

        return (
          <Link
            key={index}
            href={`/profile/${user ? user.id : auth?.id}/${prefix}`}
            className={cn(
              'hover:text-brand w-full text-center transition-all',
              currentPrefix === prefix && prefix !== '' && 'text-brand',
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
