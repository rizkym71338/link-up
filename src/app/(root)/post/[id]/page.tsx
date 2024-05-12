import Link from 'next/link'
import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'

import { LikeOrUnLikeButton, SaveOrUnSaveButton } from '@/components'
import { DropdownMenu, NextImage, CommentInput } from '@/components'
import { nullSafe, prisma, timeAgo } from '@/libs'

interface PostPageProps {
  params: { id: string }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await prisma.post
    .findFirst({
      where: { id: params.id },
      include: {
        likes: true,
        author: true,
        saves: true,
        comments: { include: { author: true } },
      },
    })
    .catch(() => notFound())

  if (!post) return notFound()

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
    <section className="relative">
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

      <p className="mb-4 px-4 text-sm text-purple-1 md:px-0">
        {nullSafe(post.tag)}
      </p>

      {post.comments.length !== 0 && (
        <div className="border-t border-dark-2 px-4 py-2 md:px-0">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex gap-2 py-2">
              <NextImage
                src={nullSafe(comment.author?.profilePhoto)}
                alt={nullSafe(comment.author?.username)}
                className="h-8 w-8 rounded-full"
                useSkeleton
              />
              <div>
                <p className="text-sm">
                  <Link
                    href={`/profile/${nullSafe(comment.author?.id)}`}
                    className="font-semibold"
                  >
                    {nullSafe(comment.author?.username)}
                  </Link>{' '}
                  {nullSafe(comment.message)}
                </p>
                <p className="text-tiny-medium text-light-2">
                  {timeAgo(comment.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <CommentInput postId={nullSafe(post.id)} />
    </section>
  )
}
