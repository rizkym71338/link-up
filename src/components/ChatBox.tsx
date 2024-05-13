'use client'

import * as Ably from 'ably'
import { useState } from 'react'
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react'
import { User } from '@prisma/client'
import { cn, nullSafe } from '@/libs'
import { NextImage } from './NextImage'

interface ChatBoxProps {
  currentUser: User
  recipientUser: User
}

export const ChatBox = ({ currentUser, recipientUser }: ChatBoxProps) => {
  const client = new Ably.Realtime({
    key: 'Tu38-w.BWycXA:ZXluv-OLNCJyN6225hLT0WH2-ahaBTiq8MlUkzsrlL4',
    clientId: 'vibe-zone',
  })

  const AblyPubSub = () => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState<Ably.Message[]>([])

    const { channel } = useChannel('direct-message', (message) => {
      setMessages((previousMessages) => [...previousMessages, message])
      window.scrollTo(0, document.body.scrollHeight)
    })

    return (
      <section>
        <div className="flex flex-col gap-4 px-4 md:px-0">
          {messages.map((message: any) => {
            const isAuthor = message.data.author.id === currentUser.id
            const user = isAuthor ? currentUser : recipientUser
            return (
              <div
                key={message.id}
                className={cn(
                  'w-fit rounded-lg bg-dark-1 px-3 py-2',
                  isAuthor && 'ml-auto',
                )}
              >
                <div className="mb-2 flex items-center gap-2">
                  <NextImage
                    src={nullSafe(user.profilePhoto)}
                    alt="profile"
                    className="h-4 w-4 rounded-full"
                    useSkeleton
                  />
                  <p className="text-subtle-medium text-light-2">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <p className="text-sm">{message.data.message}</p>
              </div>
            )
          })}
        </div>

        <div className="fixed bottom-[53px] flex w-full max-w-xl gap-4 border-t border-dark-2 bg-purple-2 px-4 py-4 md:bottom-0 md:px-0">
          <input
            type="text"
            className="w-full bg-transparent focus-within:outline-none"
            placeholder="Type a message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            onClick={() => {
              channel.publish('direct-message', {
                author: currentUser,
                recipient: recipientUser,
                message: input,
              })
              setInput('')
            }}
            className="font-semibold text-purple-1"
          >
            Send
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
