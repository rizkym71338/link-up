'use client'

import { useTransition } from 'react'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { LikedPost, Post } from '@prisma/client'

import { likeOrUnLikePost } from '@/actions'
import { Loader } from '@/components'
import { nullSafe } from '@/libs'

interface LikeOrUnLikeButtonProps {
  post: Post & { likes: LikedPost[] }
  isLiked: boolean
}

export const LikeOrUnLikeButton = ({
  post,
  isLiked,
}: LikeOrUnLikeButtonProps) => {
  const [isPending, startTransition] = useTransition()

  const onClick = () => {
    startTransition(async () => await likeOrUnLikePost(post.id))
  }

  const Icon = () => {
    if (isLiked) return <HeartSolidIcon className="h-5 w-5 text-red-500" />
    return <HeartOutlineIcon className="h-5 w-5" />
  }

  return (
    <button onClick={onClick} className="flex items-center gap-2">
      {isPending ? <Loader className="h-5" /> : <Icon />}
      <p>{nullSafe(post.likes.length, '0')}</p>
    </button>
  )
}
