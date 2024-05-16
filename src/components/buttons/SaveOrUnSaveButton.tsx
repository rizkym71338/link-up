'use client'

import { useState } from 'react'
import { BookmarkIcon as BookmarkOutlineIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'
import { Post, SavedPost } from '@prisma/client'

import { saveOrUnSavePost } from '@/actions'

interface SaveOrUnSaveButtonProps {
  post: Post & { saves: SavedPost[] }
  isSaved: boolean
}

export const SaveOrUnSaveButton = (props: SaveOrUnSaveButtonProps) => {
  const { post } = props

  const [isSaved, setIsSaved] = useState(props.isSaved)

  const onClick = async () => {
    await saveOrUnSavePost(post.id)
    setIsSaved(!isSaved)
  }

  const Icon = () => {
    if (isSaved)
      return <BookmarkSolidIcon className="h-5 w-5 text-yellow-500" />
    return <BookmarkOutlineIcon className="h-5 w-5" />
  }

  return (
    <button onClick={onClick}>
      <Icon />
    </button>
  )
}
