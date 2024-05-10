import { Post, User } from '@prisma/client'

import { NextImage } from '@/components'
import { nullSafe } from '@/libs'
import { UserPlusIcon } from '@heroicons/react/24/outline'

interface ProfileCardProps {
  user: User & { posts: Post[] }
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  const info = [
    {
      value: nullSafe(user?.posts.length, '0'),
      label: 'Posts',
    },
    {
      value: nullSafe(user?.followersIds.length, '0'),
      label: 'Followers',
    },
    {
      value: nullSafe(user?.followingIds.length, '0'),
      label: 'Following',
    },
  ]

  return (
    <div className="flex gap-4">
      <NextImage
        src={nullSafe(user?.profilePhoto)}
        alt="profile"
        className="h-24 w-24 rounded-full"
        useSkeleton
      />

      <div className="w-full">
        <p className="mb-1 text-small-semibold">
          {nullSafe(user?.firstName)} {nullSafe(user?.lastName)}
        </p>

        <p className="mb-4 text-subtle-medium text-light-2">
          @{nullSafe(user?.username)}
        </p>

        <div className="mb-4 flex items-center gap-4">
          {info.map(({ value, label }, index) => (
            <div key={index} className="text-center">
              <p className="text-base-bold">{nullSafe(value)}</p>
              <p className="text-tiny-medium">{nullSafe(label)}</p>
            </div>
          ))}
        </div>
      </div>

      <UserPlusIcon className="h-8 w-8 cursor-pointer transition-all hover:text-purple-1" />
    </div>
  )
}