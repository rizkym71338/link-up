'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Post, User } from '@prisma/client'

import { cn, nullSafe } from '@/libs'

interface ProfileStatisticProps {
  currentUser: User & { posts: Post[] }
  className?: string
}

export const ProfileStatistic = (props: ProfileStatisticProps) => {
  const { currentUser, className } = props

  const pathname = usePathname()

  const currentPrefix = nullSafe(pathname.split('/')[3])

  const info = [
    {
      value: nullSafe(currentUser.posts.length, '0'),
      label: 'Posts',
      prefix: '',
    },
    {
      value: nullSafe(currentUser?.followersIds.length, '0'),
      label: 'Followers',
      prefix: 'followers',
    },
    {
      value: nullSafe(currentUser?.followingIds.length, '0'),
      label: 'Following',
      prefix: 'following',
    },
  ]

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {info.map(({ value, label, prefix }, index) => (
        <Link
          key={index}
          href={`/profile/${currentUser.id}/${prefix}`}
          className={cn(
            'w-full text-center transition-all hover:text-purple-1',
            currentPrefix === prefix && prefix !== '' && 'text-purple-1',
          )}
        >
          <p className="text-base-bold">{value}</p>
          <p className="text-tiny-medium">{label}</p>
        </Link>
      ))}
    </div>
  )
}
