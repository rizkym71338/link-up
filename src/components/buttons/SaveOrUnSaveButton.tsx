import { BookmarkIcon as BookmarkOutlineIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'
import { auth } from '@clerk/nextjs/server'
import { Post, SavedPost } from '@prisma/client'

import { saveOrUnSavePost } from '@/actions'
import { prisma } from '@/libs'

interface SaveOrUnSaveButtonProps {
  post: Post & { saves: SavedPost[] }
}

export const SaveOrUnSaveButton = async ({ post }: SaveOrUnSaveButtonProps) => {
  const user = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  const isSaved = await prisma.savedPost.findFirst({
    where: { postId: post.id, userId: user?.id },
  })

  const Icon = () => {
    if (isSaved)
      return <BookmarkSolidIcon className="h-5 w-5 text-yellow-500" />
    return <BookmarkOutlineIcon className="h-5 w-5" />
  }

  return (
    <form action={saveOrUnSavePost.bind(null, post.id)}>
      <button type="submit">
        <Icon />
      </button>
    </form>
  )
}
