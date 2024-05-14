import { notFound } from 'next/navigation'

import { findCurrentUser, findUser } from '@/services'
import { ChatBox } from '@/components'
import { nullSafe } from '@/libs'

interface DirectPageProps {
  params: { id: string }
}

export default async function DirectPage({ params }: DirectPageProps) {
  const currentUser = await findCurrentUser()

  const recipientUser = await findUser({ where: { id: params.id } })

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
