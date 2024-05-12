import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { LikedPost, Post, SavedPost, User } from '@prisma/client'
import { PencilSquareIcon } from '@heroicons/react/24/outline'

import {
  DropdownMenu,
  LikeOrUnLikeButton,
  NextImage,
  SaveOrUnSaveButton,
} from '@/components'
import { nullSafe, prisma } from '@/libs'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'

interface PostCardProps {
  post: Post & { author: User; likes: LikedPost[]; saves: SavedPost[] }
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

  const dropdownItems: any = [{ label: 'Copy Link' }]
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
          href={`/profile/${nullSafe(post.author?.id)}/posts`}
          className="flex-none"
        >
          <NextImage
            src={nullSafe(post.author?.profilePhoto)}
            alt="profile photo"
            className="h-12 w-12 rounded-full"
            useSkeleton
          />
        </Link>

        <Link
          href={`/profile/${nullSafe(post.author?.id)}/posts`}
          className="w-full"
        >
          <p className="mb-1 text-small-semibold">
            {nullSafe(post.author?.firstName)} {nullSafe(post.author?.lastName)}
          </p>
          <p className="text-subtle-medium text-light-2">
            @{nullSafe(post.author?.username)}
          </p>
        </Link>

        <DropdownMenu
          button={<EllipsisHorizontalIcon className="h-5 w-5" />}
          items={dropdownItems}
        />
      </div>

      <NextImage
        src={nullSafe(post.postPhoto)}
        alt="post photo"
        className="mb-4 aspect-video w-full border border-dark-2 bg-dark-2 object-cover md:rounded-md"
        useSkeleton
      />

      <div className="mb-4 flex items-center justify-between px-4 text-small-semibold md:px-0">
        <LikeOrUnLikeButton post={nullSafe(post)} isLiked={!!likedPost} />
        <SaveOrUnSaveButton post={nullSafe(post)} isSaved={!!savedPost} />
      </div>

      <p className="mb-1 px-4 text-body-normal md:px-0">
        {nullSafe(post.caption)}
      </p>

      <p className="px-4 text-base text-purple-1 md:px-0">
        {nullSafe(post.tag)}
      </p>
    </div>
  )
}
