import Link from 'next/link'
import { Notification, Post, User } from '@prisma/client'

import { FollowOrUnFollowButton, NextImage } from '@/components'
import { nullSafe, timeAgo } from '@/libs'

interface NotificationCardProps {
  notification: Notification & { author: User; post: Post }
  isFollowed: boolean
}

export const NotificationCard = (props: NotificationCardProps) => {
  const { notification, isFollowed } = props

  return (
    <div className="flex items-center gap-2 px-4 py-4 md:px-0">
      <Link href={`/profile/${notification.authorId}`} className="flex-none">
        <NextImage
          src={nullSafe(notification.author?.profilePhoto)}
          alt="profile photo"
          className="h-12 w-12 rounded-full"
          useSkeleton
        />
      </Link>

      <Link href={`/profile/${notification.authorId}`} className="w-full">
        <p className="mb-1 text-sm">
          <span className="font-semibold">{notification.author?.username}</span>{' '}
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
}
