import { notFound } from 'next/navigation'

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

  return (
    <section>
      <ChatBox
        currentUser={currentUser}
        recipientUser={recipientUser}
        ABLY_KEY={nullSafe(process.env.ABLY_KEY)}
      />
    </section>
  )
}
