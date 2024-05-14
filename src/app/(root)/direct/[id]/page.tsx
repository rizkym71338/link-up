import { notFound } from 'next/navigation'

import { findManyChatByAuthorAndRecipientId } from '@/services'
import { findCurrentUser, findUserById } from '@/services'
import { ChatBox } from '@/components'
import { nullSafe } from '@/libs'

interface DirectPageProps {
  params: { id: string }
}

export default async function DirectPage({ params }: DirectPageProps) {
  const currentUser = await findCurrentUser()

  const recipientUser = await findUserById(params.id)

  if (!currentUser || !recipientUser) return notFound()

  const chats = await findManyChatByAuthorAndRecipientId(
    currentUser.id,
    recipientUser.id,
  )

  return (
    <ChatBox
      currentUser={currentUser}
      recipientUser={recipientUser}
      chats={nullSafe(chats)}
      ABLY_KEY={nullSafe(process.env.ABLY_KEY)}
    />
  )
}
