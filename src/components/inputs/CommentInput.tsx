'use client'

import { useState, useTransition } from 'react'

import { createComment } from '@/actions'
import { Loader } from '@/components'
import { cn } from '@/libs'

interface CommentInputProps {
  postId: string
  isCard?: boolean
}

export const CommentInput = ({ postId, isCard }: CommentInputProps) => {
  const [message, setMessage] = useState('')

  const [isPending, startTransition] = useTransition()

  const onClick = () => {
    if (message === '') return
    startTransition(async () => await createComment(postId, message))
  }

  return (
    <div
      className={cn(
        !isCard &&
          'sticky bottom-[53px] gap-2 border-t border-dark-2 bg-purple-2 py-3 md:bottom-0',
        'flex items-center gap-2 px-4 md:px-0',
      )}
    >
      <input
        type="text"
        placeholder="Add a comment..."
        className="w-full rounded-lg border-none bg-transparent pl-0 text-sm focus:outline-none"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button
        onClick={onClick}
        disabled={isPending || message === ''}
        className="cursor-pointer text-small-semibold text-purple-1"
      >
        {isPending ? <Loader className="h-5" /> : 'Send'}
      </button>
    </div>
  )
}
