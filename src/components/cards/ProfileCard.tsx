import { Post, User } from '@prisma/client'

import { FollowOrUnFollowButton, NextImage } from '@/components'
import { nullSafe } from '@/libs'
import { auth } from '@clerk/nextjs/server'

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

      {user.clerkId !== nullSafe(auth().userId) && (
        <FollowOrUnFollowButton followId={nullSafe(user?.id)} />
      )}
    </div>
  )
}
