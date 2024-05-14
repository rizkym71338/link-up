import { notFound } from 'next/navigation'

import { findCurrentUser, findUserById } from '@/services'
import { nullSafe, prisma } from '@/libs'
import { ChatBox } from '@/components'

interface DirectPageProps {
  params: { id: string }
}

export default async function DirectPage({ params }: DirectPageProps) {
  const currentUser = await findCurrentUser()

  const recipientUser = await findUserById(params.id)

  if (!currentUser || !recipientUser) return notFound()

  const chats = await prisma.chat.findMany({
    where: {
      authorId: { in: [currentUser.id, recipientUser.id] },
      recipientId: { in: [currentUser.id, recipientUser.id] },
    },
    include: { author: true, recipient: true },
  })

  return (
    <section>
      <ChatBox
        currentUser={currentUser}
        recipientUser={recipientUser}
        chats={nullSafe(chats)}
        ABLY_KEY={nullSafe(process.env.ABLY_KEY)}
      />
    </section>
  )
}
