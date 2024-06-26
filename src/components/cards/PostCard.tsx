'use client'

import Link from 'next/link'
import { LikedPost, Post, SavedPost, User, Comment } from '@prisma/client'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'

import { LikeOrUnLikeButton, SaveOrUnSaveButton } from '@/components'
import { DropdownMenu, NextImage, CommentInput } from '@/components'
import { authStore } from '@/stores'
import { timeAgo } from '@/libs'

interface PostCardProps {
  post: Post & {
    author: User | null
    likes: LikedPost[]
    saves: SavedPost[]
    comments: Comment[]
  }
}

export const PostCard = ({ post }: PostCardProps) => {
  const auth = authStore((state) => state.user)

  const likedPost = post.likes.find(
    (liked) => liked.userId === auth?.id && liked.postId === post.id,
  )

  const savedPost = post.saves.find(
    (saved) => saved.postId === post.id && saved.userId === auth?.id,
  )

  const isCurrentUser = auth?.clerkId === post.author?.clerkId

  const dropdownItems: any = [{ label: 'Report Post' }]
  isCurrentUser &&
    dropdownItems.push({
      label: 'Edit Post',
      asLink: true,
      href: `/edit-post/${post.id}`,
    })

  return (
    <div className="w-full py-4">
      <div className="mb-4 flex items-center gap-2 px-4 md:px-0">
        <Link href={`/profile/${post.author?.id}`} className="flex-none">
          <NextImage
            src={post.author?.profilePhoto || ''}
            alt="profile photo"
            className="h-8 w-8 rounded-full"
            useSkeleton
          />
        </Link>

        <Link href={`/profile/${post.author?.id}`} className="w-full">
          <p className="text-small-semibold">
            {post.author?.firstName} {post.author?.lastName}{' '}
            <span className="text-subtle-medium text-gray-400">
              • {timeAgo(post.createdAt)}
            </span>
          </p>
        </Link>

        <DropdownMenu
          button={<EllipsisHorizontalIcon className="h-5 w-5" />}
          items={dropdownItems}
        />
      </div>

      <Link href={`/post/${post.id}`}>
        <NextImage
          src={post.postPhoto || ''}
          alt="post photo"
          className="mb-4 aspect-video w-full border-gray-100 bg-gray-200 object-cover md:rounded-md md:border"
          useSkeleton
        />
      </Link>

      <div className="mb-4 flex items-center justify-between px-4 text-small-semibold md:px-0">
        <LikeOrUnLikeButton post={post} isLiked={!!likedPost} />
        <SaveOrUnSaveButton post={post} isSaved={!!savedPost} />
      </div>

      <p className="mb-1 px-4 md:px-0">{post.caption}</p>

      <p className="text-brand mb-2 px-4 text-sm md:px-0">{post.tag}</p>

      {post.comments.length !== 0 && (
        <Link href={`/post/${post.id}`}>
          <p className="mb-2 px-4 text-small-semibold md:px-0">
            View {post.comments.length || '0'} comment
            {post.comments.length > 1 && 's'}
          </p>
        </Link>
      )}

      <CommentInput postId={post.id} isCard />
    </div>
  )
}
