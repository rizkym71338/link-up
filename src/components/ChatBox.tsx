'use client'

import * as Ably from 'ably'
import { useState, useTransition } from 'react'
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react'
import { User } from '@prisma/client'

import { NextImage, Loader } from '@/components'
import { cn, nullSafe } from '@/libs'

interface ChatBoxProps {
  currentUser: User
  recipientUser: User
  ABLY_KEY: string
}

export const ChatBox = (props: ChatBoxProps) => {
  const { currentUser, recipientUser, ABLY_KEY } = props

  const client = new Ably.Realtime({
    key: ABLY_KEY,
    clientId: 'vibe-zone',
  })

  const AblyPubSub = () => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState<Ably.Message[]>([])

    const [isPending, startTransition] = useTransition()

    const { channel } = useChannel('direct-message', (message) => {
      startTransition(async () => {
        const { author } = message.data

        if (author.id === currentUser.id || author.id === recipientUser.id) {
          setMessages((previousMessages) => [...previousMessages, message])

          setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth',
            })
          }, 100)
        }
      })
    })

    const onClick = () => {
      channel.publish('direct-message', {
        author: currentUser,
        recipient: recipientUser,
        message: input,
      })
      setInput('')
    }

    return (
      <section>
        <div className="flex flex-col gap-1 px-4 pb-[70px] md:px-0 md:pb-[17px]">
          {messages.map((message: any, index) => {
            const isAuthor = message.data.author.id === currentUser.id
            const user = isAuthor ? currentUser : recipientUser
            let isFirst = true
            if (index > 0) {
              isFirst =
                messages[index - 1].data.author.id !== message.data.author.id
            }

            return (
              <BubbleChat
                key={message.id}
                isAuthor={isAuthor}
                isFirst={isFirst}
                message={message.data.message}
                user={user}
              />
            )
          })}
        </div>

        <div className="fixed bottom-[53px] flex w-full max-w-[544px] gap-4 border-t border-dark-2 bg-purple-2 px-4 py-4 md:bottom-0 md:px-0">
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
      </section>
    )
  }

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="direct-message">
        <AblyPubSub />
      </ChannelProvider>
    </AblyProvider>
  )
}

interface ChatBubbleProps {
  user: User
  isAuthor: boolean
  isFirst: boolean
  message: string
}

const BubbleChat = ({ isAuthor, isFirst, message, user }: ChatBubbleProps) => {
  return (
    <div
      className={cn(
        'relative w-fit max-w-xs rounded-b-md bg-dark-1 p-4',
        isAuthor ? 'ml-auto mr-2 rounded-l-md' : 'ml-2 rounded-r-md',
        !isFirst && 'rounded-md',
      )}
    >
      <div
        className={cn(
          'absolute top-0 aspect-square h-4 overflow-hidden bg-dark-1',
          isAuthor ? '-right-4' : '-left-4',
          !isFirst && 'hidden',
        )}
      >
        <div
          className={cn(
            'h-full w-full translate-y-1/2 scale-[200%] rounded-full bg-purple-2',
            isAuthor ? 'translate-x-1/2' : '-translate-x-1/2',
          )}
        />
      </div>
      <div
        className={cn(
          'flex items-center gap-2 border-b border-dark-2 pb-3',
          !isFirst && 'hidden',
        )}
      >
        <NextImage
          src={nullSafe(user.profilePhoto)}
          alt="profile"
          className="h-5 w-5 rounded-full"
          useSkeleton
        />
        <p className="text-small-semibold text-light-2">
          {user.firstName} {user.lastName}
        </p>
      </div>
      <p className={cn('text-sm', isFirst && 'pt-2')}>{message}</p>
    </div>
  )
}
