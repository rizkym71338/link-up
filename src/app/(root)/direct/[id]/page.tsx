import { notFound } from 'next/navigation'

import { findManyChatByAuthorAndRecipientId } from '@/services'
import { findCurrentUser, findUserById } from '@/services'
import { ChatBox } from '@/components'

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
      chats={chats}
      currentUser={currentUser}
      recipientUser={recipientUser}
      ABLY_KEY={process.env.ABLY_KEY || ''}
    />
  )
}
