import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { User } from '@prisma/client'

import { FollowOrUnFollowButton, NextImage } from '@/components'
import { nullSafe, prisma } from '@/libs'

interface UserCardProps {
  user: User
}

export const UserCard = async ({ user }: UserCardProps) => {
  const currentUser = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  const isFollowed = currentUser?.followingIds.includes(user.id)

  return (
    <div className="flex items-center gap-2">
      <Link href={`/profile/${nullSafe(user?.id)}/posts`} className="flex-none">
        <NextImage
          src={nullSafe(user?.profilePhoto)}
          alt="profile photo"
          className="h-12 w-12 rounded-full"
          useSkeleton
        />
      </Link>

      <div className="w-full">
        <p className="mb-1 text-small-semibold">
          {nullSafe(user?.firstName)} {nullSafe(user?.lastName)}
        </p>
        <p className="text-subtle-medium text-light-2">
          @{nullSafe(user?.username)}
        </p>
      </div>

      {user.clerkId !== nullSafe(auth().userId) && (
        <FollowOrUnFollowButton
          followId={nullSafe(user?.id)}
          isFollwed={isFollowed!}
        />
      )}
    </div>
  )
}
