import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { User } from '@prisma/client'

import { FollowOrUnFollowButton, NextImage } from '@/components'
import { nullSafe } from '@/libs'

interface UserCardProps {
  user: User
  currentUser: User
}

export const UserCard = async ({ user, currentUser }: UserCardProps) => {
  const isFollowed = currentUser?.followingIds.includes(user.id)

  const isCurrentUser = user.clerkId === auth().userId

  return (
    <div className="flex items-center gap-2 px-4 py-4 md:px-0">
      <Link href={`/profile/${user.id}`} className="flex-none">
        <NextImage
          src={nullSafe(user.profilePhoto)}
          alt="profile photo"
          className="h-12 w-12 rounded-full"
          useSkeleton
        />
      </Link>

      <Link href={`/profile/${user.id}`} className="w-full">
        <p className="mb-1 text-small-semibold">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-subtle-medium text-light-2">@{user.username}</p>
      </Link>

      {!isCurrentUser && (
        <FollowOrUnFollowButton followId={user.id} isFollwed={isFollowed!} />
      )}
    </div>
  )
}
