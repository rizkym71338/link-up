import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { LikedPost, Post, SavedPost, User } from '@prisma/client'
import { PencilSquareIcon } from '@heroicons/react/24/outline'

import { LikeOrUnLikeButton, NextImage, SaveOrUnSaveButton } from '@/components'
import { nullSafe } from '@/libs'

interface PostCardProps {
  post: Post & { author: User; likes: LikedPost[]; saves: SavedPost[] }
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="w-full rounded-lg bg-dark-1 p-4">
      <div className="mb-4 flex items-center gap-2">
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

        <div className="w-full">
          <p className="mb-1 text-small-semibold">
            {nullSafe(post.author?.firstName)} {nullSafe(post.author?.lastName)}
          </p>
          <p className="text-subtle-medium text-light-2">
            @{nullSafe(post.author?.username)}
          </p>
        </div>

        {auth().userId === nullSafe(post.author?.clerkId) && (
          <Link href={`/edit-post/${nullSafe(post.id)}`}>
            <PencilSquareIcon className="h-5 w-5 transition-all hover:text-purple-1" />
          </Link>
        )}
      </div>

      <p className="mb-4 text-body-normal">{nullSafe(post.caption)}</p>

      <NextImage
        src={nullSafe(post.postPhoto)}
        alt="post photo"
        className="mb-4 aspect-video w-full rounded-md bg-dark-2 object-cover"
        useSkeleton
      />

      <p className="mb-4 text-base text-purple-1">{nullSafe(post.tag)}</p>

      <div className="flex items-center justify-between text-small-semibold">
        <LikeOrUnLikeButton post={nullSafe(post)} />
        <SaveOrUnSaveButton post={nullSafe(post)} />
      </div>
    </div>
  )
}
