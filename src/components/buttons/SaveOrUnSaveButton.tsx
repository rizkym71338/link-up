'use client'

import { useTransition } from 'react'
import { BookmarkIcon as BookmarkOutlineIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'
import { Post, SavedPost } from '@prisma/client'

import { saveOrUnSavePost } from '@/actions'
import { Loader } from '@/components'

interface SaveOrUnSaveButtonProps {
  post: Post & { saves: SavedPost[] }
  isSaved: boolean
}

export const SaveOrUnSaveButton = (props: SaveOrUnSaveButtonProps) => {
  const { post, isSaved } = props

  const [isPending, startTransition] = useTransition()

  const onClick = () => {
    startTransition(async () => await saveOrUnSavePost(post.id))
  }

  const Icon = () => {
    if (isSaved)
      return <BookmarkSolidIcon className="h-5 w-5 text-yellow-500" />
    return <BookmarkOutlineIcon className="h-5 w-5" />
  }

  return (
    <button onClick={onClick}>
      {isPending ? <Loader className="h-5" /> : <Icon />}
    </button>
  )
}
