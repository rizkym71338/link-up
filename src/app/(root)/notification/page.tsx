import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'

import { nullSafe, prisma, timeAgo } from '@/libs'
import Link from 'next/link'
import { FollowOrUnFollowButton, NextImage } from '@/components'

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
          <div
            key={notification.id}
            className="flex items-center gap-2 px-4 py-4 md:px-0"
          >
            <Link
              href={`/profile/${notification.authorId}`}
              className="flex-none"
            >
              <NextImage
                src={nullSafe(notification.author?.profilePhoto)}
                alt="profile photo"
                className="h-12 w-12 rounded-full"
                useSkeleton
              />
            </Link>

            <Link href={`/profile/${notification.authorId}`} className="w-full">
              <p className="mb-1 text-sm">
                <span className="font-semibold">
                  {notification.author?.username}
                </span>{' '}
                {notification.message}
              </p>
              <p className="text-subtle-medium text-light-2">
                {timeAgo(notification.createdAt)}
              </p>
            </Link>

            {notification.type === 'following' && (
              <FollowOrUnFollowButton
                followId={nullSafe(notification.authorId)}
                isFollwed={isFollowed}
              />
            )}

            {notification.type === 'likePost' && (
              <Link href={`/post/${notification.postId}`} className="flex-none">
                <NextImage
                  src={nullSafe(notification.post?.postPhoto)}
                  alt={nullSafe(notification.post?.caption)}
                  className="aspect-[4/3] h-12 w-fit rounded object-cover"
                  useSkeleton
                />
              </Link>
            )}
          </div>
        )
      })}
    </section>
  )
}
