'use client'

import * as Ably from 'ably'
import { useState, useTransition } from 'react'
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react'
import { Chat, User } from '@prisma/client'

import { BubbleChat, ChatInput, NextImage } from '@/components'
import { createChat } from '@/actions'
import { nullSafe } from '@/libs'

interface ChatBoxProps {
  currentUser: User
  recipientUser: User
  chats: Chat & { author: User; recipient: User }[]
  ABLY_KEY: string
}

export const ChatBox = (props: ChatBoxProps) => {
  const { currentUser, recipientUser, ABLY_KEY, chats } = props

  const client = new Ably.Realtime({
    key: ABLY_KEY,
    clientId: 'vibe-zone',
  })

  const AblyPubSub = () => {
    const [messages, setMessages] = useState<any>(chats)

    const [isPending, startTransition] = useTransition()

    const { channel } = useChannel('direct-message', (value) => {
      startTransition(async () => {
        const { author, recipient, message } = value.data

        const chat = {
          author,
          recipient,
          message,
          isRead: false,
          createdAt: new Date(),
        }

        if (author.id === currentUser.id) {
          await createChat({
            authorId: author.id,
            recipientId: recipient.id,
            message,
          })
        }

        if (author.id === recipientUser.id || author.id === currentUser.id) {
          setMessages((value: any) => [...value, chat])

          setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth',
            })
          }, 100)
        }
      })
    })

    return (
      <section>
        <div className="sticky top-0 z-10 flex items-center gap-4 border-b border-dark-2 bg-purple-2 px-4 py-4 md:top-[69px] md:px-0">
          <NextImage
            src={nullSafe(recipientUser.profilePhoto)}
            alt={nullSafe(recipientUser.username)}
            className="h-8 w-8 rounded-full"
            useSkeleton
          />
          <div className="mb-2 w-full">
            <p>
              {recipientUser.firstName} {recipientUser.lastName}
            </p>
            <p className="text-subtle-medium text-light-2">
              @{recipientUser.username}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1 px-4 pb-16 pt-4 md:px-0 md:pb-[64px] md:pt-4">
          {messages.map((message: any, index: number) => {
            const isAuthor = message.author.id === currentUser.id
            const user = isAuthor ? currentUser : recipientUser
            const isFirst =
              index > 0
                ? messages[index - 1].author.id !== message.author.id
                : true

            return (
              <BubbleChat
                key={index}
                isAuthor={isAuthor}
                isFirst={isFirst}
                message={message.message}
                createdAt={message.createdAt}
                user={user}
              />
            )
          })}
        </div>

        <ChatInput
          currentUser={currentUser}
          recipientUser={recipientUser}
          channel={channel}
          isPending={isPending}
        />
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
