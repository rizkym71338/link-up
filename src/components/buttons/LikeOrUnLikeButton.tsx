import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { auth } from '@clerk/nextjs/server'
import { LikedPost, Post } from '@prisma/client'

import { likeOrUnLikePost } from '@/actions'
import { nullSafe, prisma } from '@/libs'

interface LikeOrUnLikeButtonProps {
  post: Post & { likes: LikedPost[] }
}

export const LikeOrUnLikeButton = async ({ post }: LikeOrUnLikeButtonProps) => {
  const user = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  const isLiked = await prisma.likedPost.findFirst({
    where: { postId: post.id, userId: user?.id },
  })

  const Icon = () => {
    if (isLiked) return <HeartSolidIcon className="h-5 w-5 text-red-500" />
    return <HeartOutlineIcon className="h-5 w-5" />
  }

  return (
    <form
      action={likeOrUnLikePost.bind(null, post.id)}
      className="flex items-center gap-2"
    >
      <button type="submit">
        <Icon />
      </button>
      <p>{nullSafe(post.likes.length, '0')}</p>
    </form>
  )
}
