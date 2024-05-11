'use client'

import { useTransition } from 'react'
import { UserMinusIcon, UserPlusIcon } from '@heroicons/react/24/outline'

import { followOrUnFollowUser } from '@/actions'
import { Loader } from '@/components'

interface FollowOrUnFollowButtonProps {
  followId: string
  isFollwed: boolean
}

export const FollowOrUnFollowButton = ({
  followId,
  isFollwed,
}: FollowOrUnFollowButtonProps) => {
  const [isPending, startTransition] = useTransition()

  const onClick = () => {
    startTransition(async () => await followOrUnFollowUser(followId))
  }

  const Icon = () => {
    if (isFollwed)
      return <UserMinusIcon className="h-8 w-8 cursor-pointer text-red-500" />
    return <UserPlusIcon className="h-8 w-8 cursor-pointer" />
  }

  return (
    <button onClick={onClick}>
      {isPending ? <Loader className="h-8" /> : <Icon />}
    </button>
  )
}
