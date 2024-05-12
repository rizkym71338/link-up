'use client'

import { useTransition } from 'react'

import { followOrUnFollowUser } from '@/actions'
import { Loader } from '@/components'
import { cn } from '@/libs'

interface FollowOrUnFollowButtonProps {
  followId: string
  isFollwed: boolean
  className?: string
}

export const FollowOrUnFollowButton = ({
  followId,
  isFollwed,
  className,
}: FollowOrUnFollowButtonProps) => {
  const [isPending, startTransition] = useTransition()

  const onClick = () => {
    startTransition(async () => await followOrUnFollowUser(followId))
  }

  return (
    <button
      onClick={onClick}
      className={cn('flex items-center gap-2', className)}
    >
      {isPending && (
        <Loader className={cn('h-5', isFollwed && 'border-red-500')} />
      )}
      <p
        className={cn(
          'text-small-semibold',
          isFollwed ? 'text-red-500' : 'text-purple-1',
        )}
      >
        {isFollwed ? 'Unfollow' : 'Follow'}
      </p>
    </button>
  )
}
