import { BookmarkIcon as BookmarkOutlineIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'
import { Post, SavedPost } from '@prisma/client'

import { saveOrUnSavePost } from '@/actions'
import { IconSubmitButton } from '@/components'

interface SaveOrUnSaveButtonProps {
  post: Post & { saves: SavedPost[] }
  isSaved: boolean
}

export const SaveOrUnSaveButton = async ({
  post,
  isSaved,
}: SaveOrUnSaveButtonProps) => {
  const Icon = () => {
    if (isSaved)
      return <BookmarkSolidIcon className="h-5 w-5 text-yellow-500" />
    return <BookmarkOutlineIcon className="h-5 w-5" />
  }

  return (
    <form action={saveOrUnSavePost.bind(null, post.id)}>
      <IconSubmitButton>
        <Icon />
      </IconSubmitButton>
    </form>
  )
}
