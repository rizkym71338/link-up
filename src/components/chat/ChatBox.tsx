'use client'

import * as Ably from 'ably'
import { useEffect, useState, useTransition } from 'react'
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react'

import { ChatHeader, ChatInput, ChatList, Loader } from '@/components'
import { createChat, readAllChat } from '@/actions'
import { getChats, getUser } from '@/services'
import { useParams, useRouter } from 'next/navigation'
import { authStore } from '@/stores'

interface ChatBoxProps {
  ABLY_KEY: string
}

export const ChatBox = ({ ABLY_KEY }: ChatBoxProps) => {
  const [data, setData] = useState({
    recipient: null as any,
    isLoading: true,
  })

  const params = useParams()
  const router = useRouter()

  const auth = authStore((state) => state.user)

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
    const fetch = async () => {
      const response = await getUser(params.id as string)

      if (!response) return router.replace('/404')

      setData((data) => ({ ...data, recipient: response, isLoading: false }))
    }

    fetch()
  }, [auth?.id, params.id, router])

  useEffect(() => {
    const readChat = async () =>
      await readAllChat({
        authorId: auth?.id as string,
        recipientId: data.recipient?.id as string,
      })
    readChat()
    scrollToBottom()
  }, [data.recipient?.id, auth?.id])

  const AblyPubSub = () => {
    const [messages, setMessages] = useState({
      data: [] as any,
      isLoading: true,
    })

    const [isPending, startTransition] = useTransition()

    const { channel } = useChannel('direct-message', (value) => {
      startTransition(async () => {
        const { author, recipient, message } = value.data

        const isAuthor = author.id === auth?.id
        const isRecipient = author.id === data.recipient?.id

        const chat = {
          author,
          recipient,
          message,
          isRead: isRecipient,
          createdAt: new Date(),
        }

        if (isRecipient || isAuthor) {
          setMessages((value) => ({ ...value, data: [...value.data, chat] }))
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

    useEffect(() => {
      const fetch = async () => {
        const response = await getChats({
          currentUserId: auth?.id as string,
          recipientId: data.recipient?.id as string,
        })

        setMessages({ data: response, isLoading: false })
      }

      fetch()
    }, [])

    if (messages.isLoading) return <Loader className="mx-auto my-4 h-8" />

    return (
      <section>
        <ChatHeader recipientUser={data.recipient} />

        <ChatList
          messages={messages}
          currentUser={auth as any}
          recipientUser={data.recipient}
        />

        <ChatInput
          channel={channel}
          isPending={isPending}
          currentUser={auth as any}
          recipientUser={data.recipient}
        />
      </section>
    )
  }

  if (data.isLoading) return <Loader className="mx-auto my-4 h-8" />

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="direct-message">
        <AblyPubSub />
      </ChannelProvider>
    </AblyProvider>
  )
}
