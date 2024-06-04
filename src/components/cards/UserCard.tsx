'use client'

import Link from 'next/link'
import { User } from '@prisma/client'

import { FollowOrUnFollowButton, NextImage } from '@/components'
import { authStore } from '@/stores'

interface UserCardProps {
  user: User
}

export const UserCard = ({ user }: UserCardProps) => {
  const auth = authStore((state) => state.user)

  const isFollowed = auth?.followingIds.includes(user.id) || false

  const isCurrentUser = user.id === auth?.id

  return (
    <div className="flex items-center gap-2 px-4 py-4 md:px-0">
      <Link href={`/profile/${user.id}`} className="flex-none">
        <NextImage
          src={user.profilePhoto || ''}
          alt="profile photo"
          className="h-12 w-12 rounded-full"
          useSkeleton
        />
      </Link>

      <Link href={`/profile/${user.id}`} className="w-full">
        <p className="mb-1 text-small-semibold">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-subtle-medium text-gray-400">@{user.username}</p>
      </Link>

      {!isCurrentUser && (
        <FollowOrUnFollowButton followId={user.id} isFollwed={isFollowed} />
      )}
    </div>
  )
}
