import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { LikedPost, Post, SavedPost, User, Comment } from '@prisma/client'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'

import { LikeOrUnLikeButton, SaveOrUnSaveButton } from '@/components'
import { DropdownMenu, NextImage, CommentInput } from '@/components'
import { nullSafe, prisma, timeAgo } from '@/libs'

interface PostCardProps {
  post: Post & {
    author: User
    likes: LikedPost[]
    saves: SavedPost[]
    comments: Comment[]
  }
}

export const PostCard = async ({ post }: PostCardProps) => {
  const user = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  const likedPost = await prisma.likedPost.findFirst({
    where: { postId: post.id, userId: user?.id },
  })

  const savedPost = await prisma.savedPost.findFirst({
    where: { postId: post.id, userId: user?.id },
  })

  const isCurrentUser = auth().userId === nullSafe(post.author?.clerkId)

  const dropdownItems: any = [{ label: 'Report Post' }]
  isCurrentUser &&
    dropdownItems.push({
      label: 'Edit Post',
      asLink: true,
      href: `/edit-post/${nullSafe(post.id)}`,
    })

  return (
    <div className="w-full py-4">
      <div className="mb-4 flex items-center gap-2 px-4 md:px-0">
        <Link
          href={`/profile/${nullSafe(post.author?.id)}`}
          className="flex-none"
        >
          <NextImage
            src={nullSafe(post.author?.profilePhoto)}
            alt="profile photo"
            className="h-8 w-8 rounded-full"
            useSkeleton
          />
        </Link>

        <Link href={`/profile/${nullSafe(post.author?.id)}`} className="w-full">
          <p className="text-small-semibold">
            {nullSafe(post.author?.firstName)} {nullSafe(post.author?.lastName)}{' '}
            <span className="text-subtle-medium text-light-2">
              • {timeAgo(post.createdAt)}
            </span>
          </p>
        </Link>

        <DropdownMenu
          button={<EllipsisHorizontalIcon className="h-5 w-5" />}
          items={dropdownItems}
        />
      </div>

      <Link href={`/post/${nullSafe(post.id)}`}>
        <NextImage
          src={nullSafe(post.postPhoto)}
          alt="post photo"
          className="mb-4 aspect-video w-full border-dark-2 bg-dark-2 object-cover md:rounded-md md:border"
          useSkeleton
        />
      </Link>

      <div className="mb-4 flex items-center justify-between px-4 text-small-semibold md:px-0">
        <LikeOrUnLikeButton post={nullSafe(post)} isLiked={!!likedPost} />
        <SaveOrUnSaveButton post={nullSafe(post)} isSaved={!!savedPost} />
      </div>

      <p className="mb-1 px-4 md:px-0">{nullSafe(post.caption)}</p>

      <p className="mb-2 px-4 text-sm text-purple-1 md:px-0">
        {nullSafe(post.tag)}
      </p>

      {post.comments.length !== 0 && (
        <Link href={`/post/${post.id}`}>
          <p className="mb-2 px-4 text-small-semibold md:px-0">
            View all {nullSafe(post.comments.length, '0')} comments
          </p>
        </Link>
      )}

      <CommentInput postId={post.id} isCard />
    </div>
  )
}
