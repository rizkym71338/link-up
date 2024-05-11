import { auth } from '@clerk/nextjs/server'
import { UserMinusIcon, UserPlusIcon } from '@heroicons/react/24/outline'

import { followOrUnFollowUser } from '@/actions'
import { prisma } from '@/libs'

interface FollowOrUnFollowButtonProps {
  followId: string
}

export const FollowOrUnFollowButton = async ({
  followId,
}: FollowOrUnFollowButtonProps) => {
  const user = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  const Icon = () => {
    if (user?.followingIds.includes(followId))
      return <UserMinusIcon className="h-8 w-8 cursor-pointer text-red-500" />
    return <UserPlusIcon className="h-8 w-8 cursor-pointer" />
  }

  return (
    <form action={followOrUnFollowUser.bind(null, followId)}>
      <button type="submit">
        <Icon />
      </button>
    </form>
  )
}
