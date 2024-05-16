'use client'

import * as Ably from 'ably'
import { useEffect, useState, useTransition } from 'react'
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react'
import { Chat, User } from '@prisma/client'

import { ChatHeader, ChatInput, ChatList } from '@/components'
import { createChat, readAllChat } from '@/actions'

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

  const scrollToBottom = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    }, 100)
  }

  useEffect(() => {
    const readChat = async () =>
      await readAllChat({
        authorId: recipientUser.id,
        recipientId: currentUser.id,
      })
    readChat()
    scrollToBottom()
  }, [currentUser.id, recipientUser.id])

  const AblyPubSub = () => {
    const [messages, setMessages] = useState<any>(chats)

    const [isPending, startTransition] = useTransition()

    const { channel } = useChannel('direct-message', (value) => {
      startTransition(async () => {
        const { author, recipient, message } = value.data

        const isAuthor = author.id === currentUser.id
        const isRecipient = author.id === recipientUser.id

        const chat = {
          author,
          recipient,
          message,
          isRead: isRecipient,
          createdAt: new Date(),
        }

        if (isRecipient || isAuthor) {
          setMessages((value: any) => [...value, chat])
          scrollToBottom()
        }

        if (isAuthor) {
          await createChat({
            authorId: author.id,
            recipientId: recipient.id,
            message,
          })
        }

        if (isRecipient) {
          setTimeout(async () => {
            await readAllChat({
              authorId: author.id,
              recipientId: recipient.id,
            })
          }, 100)
        }
      })
    })

    return (
      <section>
        <ChatHeader recipientUser={recipientUser} />

        <ChatList
          messages={messages}
          currentUser={currentUser}
          recipientUser={recipientUser}
        />

        <ChatInput
          channel={channel}
          isPending={isPending}
          currentUser={currentUser}
          recipientUser={recipientUser}
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
