import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { ChatBox } from '@/components'
import { nullSafe, prisma } from '@/libs'

interface DirectPageProps {
  params: { id: string }
}

export default async function DirectPage({ params }: DirectPageProps) {
  const currentUser = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  const recipientUser = await prisma.user
    .findFirst({
      where: { id: params.id },
    })
    .catch(() => notFound())

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
