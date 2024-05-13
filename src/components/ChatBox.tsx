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
        setMessages((previousMessages) => [...previousMessages, message])

        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          })
        }, 100)
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
        <div className="flex flex-col gap-4 px-4 pb-[70px] md:px-0 md:pb-[17px]">
          {messages.map((message: any) => {
            const isAuthor = message.data.author.id === currentUser.id
            const user = isAuthor ? currentUser : recipientUser
            return (
              <div
                key={message.id}
                className={cn(
                  'max-w-xs rounded-md bg-dark-1 p-4',
                  isAuthor && 'ml-auto',
                )}
              >
                <div className="flex items-center gap-2 border-b border-dark-2 pb-3">
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
                <p className="pt-2 text-sm">{message.data.message}</p>
              </div>
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
