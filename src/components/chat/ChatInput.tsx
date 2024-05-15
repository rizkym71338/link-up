'use client'

import * as Ably from 'ably'
import { useState } from 'react'
import { User } from '@prisma/client'

import { Loader } from '@/components'

interface ChatInputProps {
  currentUser: User
  recipientUser: User
  channel: Ably.RealtimeChannel
  isPending: boolean
}

export const ChatInput = (props: ChatInputProps) => {
  const { channel, isPending, currentUser, recipientUser } = props

  const [input, setInput] = useState('')

  const onClick = () => {
    channel.publish('direct-message', {
      author: currentUser,
      recipient: recipientUser,
      message: input,
    })
    setInput('')
  }

  return (
    <div className="fixed bottom-[53px] left-0 flex w-full justify-center bg-purple-2 md:bottom-0 md:pl-[316px] md:pr-4">
      <div className="flex w-full max-w-xl items-center gap-4 border-t border-dark-2 px-4 py-4 md:max-w-[544px] md:px-0">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full bg-transparent text-sm focus:outline-none"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDownCapture={(event) =>
            event.key === 'Enter' && !isPending && onClick()
          }
        />
        <button
          onClick={onClick}
          disabled={isPending || input === ''}
          className="text-small-semibold text-purple-1"
        >
          {isPending ? <Loader className="h-5" /> : 'Send'}
        </button>
      </div>
    </div>
  )
}
