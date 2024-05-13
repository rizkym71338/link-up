import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { NotificationCard } from '@/components'
import { nullSafe, prisma } from '@/libs'

export default async function NotificationPage() {
  const currentUser = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  if (!currentUser) return notFound()

  const notifications = await prisma.notification.findMany({
    where: { recipientId: currentUser.id },
    include: { author: true, post: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <section className="-mt-4 divide-y divide-dark-2">
      {notifications.length === 0 && (
        <div className="text-center">No notification found</div>
      )}

      {notifications.map((notification) => {
        const isFollowed = currentUser?.followingIds.includes(
          nullSafe(notification.authorId),
        )

        return (
          <NotificationCard
            key={notification.id}
            notification={nullSafe(notification)}
            isFollowed={isFollowed}
          />
        )
      })}
    </section>
  )
}
