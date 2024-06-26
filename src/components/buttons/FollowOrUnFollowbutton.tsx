'use client'

import { useState } from 'react'

import { followOrUnFollowUser } from '@/actions'
import { cn } from '@/libs'

interface FollowOrUnFollowButtonProps {
  followId: string
  isFollwed: boolean
  className?: string
}

export const FollowOrUnFollowButton = (props: FollowOrUnFollowButtonProps) => {
  const { followId, className } = props

  const [isFollowed, setIsFollowed] = useState(props.isFollwed)

  const onClick = () => {
    followOrUnFollowUser(followId)
    setIsFollowed(!isFollowed)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'text-small-semibold',
        isFollowed ? 'text-red-500' : 'text-brand',
        className,
      )}
    >
      {isFollowed ? 'Unfollow' : 'Follow'}
    </button>
  )
}
