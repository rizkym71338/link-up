'use client'

import Link from 'next/link'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'

import { LikeOrUnLikeButton, Loader, SaveOrUnSaveButton } from '@/components'
import { DropdownMenu, NextImage, CommentInput } from '@/components'
import { getPost } from '@/services'
import { timeAgo } from '@/libs'
import { authStore } from '@/stores'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface PostPageProps {
  params: { id: string }
}

export default function PostPage({ params }: PostPageProps) {
  const [data, setData] = useState({
    post: null as any,
    isLoading: true,
  })

  const auth = authStore((state) => state.user)

  const router = useRouter()

  const likedPost = data.post?.likes.find(
    (liked: any) => liked.userId === auth?.id && liked.postId === data.post.id,
  )

  const savedPost = data.post?.saves.find(
    (saved: any) => saved.postId === data.post.id && saved.userId === auth?.id,
  )

  const isCurrentUser = auth?.id === data.post?.author?.id

  const dropdownItems: any = [{ label: 'Report Post' }]
  isCurrentUser &&
    dropdownItems.push({
      label: 'Edit Post',
      asLink: true,
      href: `/edit-post/${data.post.id}`,
    })

  useEffect(() => {
    const fetch = async () => {
      const response = await getPost({ id: params.id })

      if (!response) return router.replace('/404')

      setData({ post: response, isLoading: false })
    }

    fetch()
  }, [params.id, router])

  if (data.isLoading) return <Loader className="mx-auto my-4 h-8" />

  return (
    <section className="pb-14 pt-4">
      <div className="mb-4 flex items-center gap-2 px-4 md:px-0">
        <Link href={`/profile/${data.post.author?.id}`} className="flex-none">
          <NextImage
            src={data.post.author?.profilePhoto || ''}
            alt="profile photo"
            className="h-8 w-8 rounded-full"
            useSkeleton
          />
        </Link>

        <Link href={`/profile/${data.post.author?.id}`} className="w-full">
          <p className="text-small-semibold">
            {data.post.author?.firstName} {data.post.author?.lastName}{' '}
            <span className="text-subtle-medium text-light-2">
              • {timeAgo(data.post.createdAt)}
            </span>
          </p>
        </Link>

        <DropdownMenu
          button={<EllipsisHorizontalIcon className="h-5 w-5" />}
          items={dropdownItems}
        />
      </div>

      <Link href={`/post/${data.post.id}`}>
        <NextImage
          src={data.post.postPhoto || ''}
          alt="post photo"
          className="mb-4 aspect-video w-full border-dark-2 bg-dark-2 object-cover md:rounded-md md:border"
          useSkeleton
        />
      </Link>

      <div className="mb-4 flex items-center justify-between px-4 text-small-semibold md:px-0">
        <LikeOrUnLikeButton post={data.post} isLiked={!!likedPost} />
        <SaveOrUnSaveButton post={data.post} isSaved={!!savedPost} />
      </div>

      <p className="mb-1 px-4 md:px-0">{data.post.caption}</p>

      <p className="mb-4 px-4 text-sm text-purple-1 md:px-0">{data.post.tag}</p>

      {data.post.comments.length !== 0 && (
        <div className="border-t border-dark-2 px-4 py-2 md:px-0">
          {data.post.comments.map((comment: any) => (
            <div key={comment.id} className="flex gap-2 py-2">
              <NextImage
                src={comment.author?.profilePhoto || ''}
                alt={comment.author?.username || ''}
                className="h-8 w-8 rounded-full"
                useSkeleton
              />
              <div className="w-full">
                <p className="text-sm">
                  <Link
                    href={`/profile/${comment.author?.id}`}
                    className="font-semibold"
                  >
                    {comment.author?.username}
                  </Link>{' '}
                  {comment.message}
                </p>
                <p className="text-tiny-medium text-light-2">
                  {timeAgo(comment.createdAt)}
                </p>
              </div>
              <EllipsisVerticalIcon className="h-5 w-5 cursor-pointer" />
            </div>
          ))}
        </div>
      )}

      <CommentInput postId={data.post.id} />
    </section>
  )
}
