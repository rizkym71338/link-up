'use client'

import { Zoom } from 'react-awesome-reveal'
import { User } from '@prisma/client'

import { ChatBubble } from '@/components'

interface ChatListProps {
  messages: any
  currentUser: User
  recipientUser: User
}

export const ChatList = (props: ChatListProps) => {
  const { messages, currentUser, recipientUser } = props

  return (
    <div className="flex flex-col gap-1 px-4 pb-16 pt-4 md:px-0 md:pb-[64px] md:pt-4">
      {messages.map((message: any, index: number) => {
        const isAuthor = message.author.id === currentUser.id
        const user = isAuthor ? currentUser : recipientUser
        const isFirst =
          index > 0 ? messages[index - 1].author.id !== message.author.id : true

        return (
          <Zoom key={index} duration={500} triggerOnce>
            <ChatBubble
              isAuthor={isAuthor}
              isFirst={isFirst}
              isRead={message.isRead}
              message={message.message}
              createdAt={message.createdAt}
              user={user}
            />
          </Zoom>
        )
      })}
    </div>
  )
}
