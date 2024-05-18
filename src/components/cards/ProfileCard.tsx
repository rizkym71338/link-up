'use client'

import { Post, User } from '@prisma/client'

import { NextImage, ProfileStatistic } from '@/components'
import { FollowOrUnFollowButton } from '@/components'
import { authStore } from '@/stores'

interface ProfileCardProps {
  user: User & { posts: Post[] }
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  const auth = authStore((state) => state.user)

  const isFollowed = auth?.followingIds.includes(user.id) || false

  const isCurrentUser = user.id === auth?.id

  return (
    <div className="mb-4 px-4 pt-4 md:px-0">
      <div className="mb-4 flex items-center gap-4">
        <NextImage
          src={user.profilePhoto || ''}
          alt="profile"
          className="h-20 w-20 rounded-full"
          useSkeleton
        />

        <div className="w-full">
          <p className="mb-1 line-clamp-2 font-semibold">
            {user.firstName} {user.lastName}
          </p>

          <p className="text-subtle-medium text-light-2">@{user.username}</p>
        </div>

        {!isCurrentUser && (
          <FollowOrUnFollowButton
            followId={user.id}
            isFollwed={isFollowed!}
            className="mb-auto"
          />
        )}
      </div>

      <ProfileStatistic user={user} />
    </div>
  )
}
