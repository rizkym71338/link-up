import { Post, User } from '@prisma/client'
import { auth } from '@clerk/nextjs/server'

import { NextImage, ProfileStatistic } from '@/components'
import { FollowOrUnFollowButton } from '@/components'
import { nullSafe } from '@/libs'

interface ProfileCardProps {
  user: User & { posts: Post[] }
  currentUser: User
}

export const ProfileCard = async ({ user, currentUser }: ProfileCardProps) => {
  const isFollowed = currentUser?.followingIds.includes(user.id)

  const isCurrentUser = user.clerkId === auth().userId

  return (
    <div className="mb-4 px-4 pt-4 md:px-0">
      <div className="mb-4 flex items-center gap-4">
        <NextImage
          src={nullSafe(user.profilePhoto)}
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

      <ProfileStatistic currentUser={user} />
    </div>
  )
}
