import { notFound } from 'next/navigation'

import { findCurrentUser, findManyNotification } from '@/services'
import { NotificationCard } from '@/components'
import { nullSafe } from '@/libs'

export default async function NotificationPage() {
  const currentUser = await findCurrentUser()

  if (!currentUser) return notFound()

  const notifications = await findManyNotification({
    where: { recipientId: currentUser.id },
    include: { author: true, post: true },
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
