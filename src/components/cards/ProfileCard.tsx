import { Post, User } from '@prisma/client'
import { auth } from '@clerk/nextjs/server'

import { FollowOrUnFollowButton, NextImage } from '@/components'
import { nullSafe, prisma } from '@/libs'
import Link from 'next/link'

interface ProfileCardProps {
  user: User & { posts: Post[] }
}

export const ProfileCard = async ({ user }: ProfileCardProps) => {
  const currentUser = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  const isFollowed = currentUser?.followingIds.includes(user.id)

  const isCurrentUser = user.clerkId === nullSafe(auth().userId)

  const info = [
    {
      value: nullSafe(user?.posts.length, '0'),
      label: 'Posts',
      prefix: '',
    },
    {
      value: nullSafe(user?.followersIds.length, '0'),
      label: 'Followers',
      prefix: 'followers',
    },
    {
      value: nullSafe(user?.followingIds.length, '0'),
      label: 'Following',
      prefix: 'following',
    },
  ]

  return (
    <div className="mb-4 px-4 md:px-0">
      <div className="mb-4 flex items-center gap-4">
        <NextImage
          src={nullSafe(user?.profilePhoto)}
          alt="profile"
          className="h-20 w-20 rounded-full"
          useSkeleton
        />

        <div className="w-full">
          <p className="mb-1 line-clamp-2 font-semibold">
            {nullSafe(user?.firstName)} {nullSafe(user?.lastName)}
          </p>

          <p className="text-subtle-medium text-light-2">
            @{nullSafe(user?.username)}
          </p>
        </div>

        {!isCurrentUser && (
          <FollowOrUnFollowButton
            followId={nullSafe(user?.id)}
            isFollwed={isFollowed!}
            className="mb-auto"
          />
        )}
      </div>

      <div className="mb-4 flex items-center gap-4">
        {info.map(({ value, label, prefix }, index) => (
          <Link
            key={index}
            href={`/profile/${user.id}/${prefix}`}
            className="w-full text-center"
          >
            <p className="text-base-bold">{nullSafe(value)}</p>
            <p className="text-small-semibold">{nullSafe(label)}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
