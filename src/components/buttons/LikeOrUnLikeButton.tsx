import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { LikedPost, Post } from '@prisma/client'

import { likeOrUnLikePost } from '@/actions'
import { IconSubmitButton } from '@/components'
import { nullSafe } from '@/libs'

interface LikeOrUnLikeButtonProps {
  post: Post & { likes: LikedPost[] }
  isLiked: boolean
}

export const LikeOrUnLikeButton = async ({
  post,
  isLiked,
}: LikeOrUnLikeButtonProps) => {
  const Icon = () => {
    if (isLiked) return <HeartSolidIcon className="h-5 w-5 text-red-500" />
    return <HeartOutlineIcon className="h-5 w-5" />
  }

  return (
    <form
      action={likeOrUnLikePost.bind(null, post.id)}
      className="flex items-center gap-2"
    >
      <IconSubmitButton>
        <Icon />
      </IconSubmitButton>
      <p>{nullSafe(post.likes.length, '0')}</p>
    </form>
  )
}
