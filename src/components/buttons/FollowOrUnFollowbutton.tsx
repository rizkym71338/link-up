import { UserMinusIcon, UserPlusIcon } from '@heroicons/react/24/outline'

import { followOrUnFollowUser } from '@/actions'
import { IconSubmitButton } from '@/components'

interface FollowOrUnFollowButtonProps {
  followId: string
  isFollwed: boolean
}

export const FollowOrUnFollowButton = async ({
  followId,
  isFollwed,
}: FollowOrUnFollowButtonProps) => {
  const Icon = () => {
    if (isFollwed)
      return <UserMinusIcon className="h-8 w-8 cursor-pointer text-red-500" />
    return <UserPlusIcon className="h-8 w-8 cursor-pointer" />
  }

  return (
    <form action={followOrUnFollowUser.bind(null, followId)}>
      <IconSubmitButton className="h-8">
        <Icon />
      </IconSubmitButton>
    </form>
  )
}
