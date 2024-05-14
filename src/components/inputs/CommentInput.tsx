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
          'fixed bottom-[53px] left-0 flex w-full justify-center bg-purple-2 md:bottom-0 md:pl-[316px] md:pr-4',
      )}
    >
      <div
        className={cn(
          isCard
            ? 'flex items-center gap-4 px-4 md:px-0'
            : 'flex w-full max-w-xl items-center gap-4 border-t border-dark-2 px-4 py-4 md:max-w-[544px] md:px-0',
        )}
      >
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full bg-transparent pl-0 text-sm focus:outline-none"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDownCapture={(event) =>
            event.key === 'Enter' && !isPending && onClick()
          }
        />
        <button
          onClick={onClick}
          disabled={isPending || message === ''}
          className="text-small-semibold text-purple-1"
        >
          {isPending ? <Loader className="h-5" /> : 'Send'}
        </button>
      </div>
    </div>
  )
}
