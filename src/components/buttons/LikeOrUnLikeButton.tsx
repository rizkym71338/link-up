'use client'

import { useState } from 'react'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { LikedPost, Post } from '@prisma/client'

import { likeOrUnLikePost } from '@/actions'

interface LikeOrUnLikeButtonProps {
  post: Post & { likes: LikedPost[] }
  isLiked: boolean
}

export const LikeOrUnLikeButton = (props: LikeOrUnLikeButtonProps) => {
  const { post } = props

  const [isLiked, setIsLiked] = useState(props.isLiked)
  const [likes, setLikes] = useState(post.likes.length || 0)

  const onClick = () => {
    likeOrUnLikePost(post.id)
    setIsLiked(!isLiked)
    setLikes(likes + (isLiked ? -1 : 1))
  }

  const Icon = () => {
    if (isLiked) return <HeartSolidIcon className="h-5 w-5 text-red-500" />
    return <HeartOutlineIcon className="h-5 w-5" />
  }

  return (
    <button onClick={onClick} className="flex items-center gap-2">
      <Icon />
      <p>{likes}</p>
    </button>
  )
}
