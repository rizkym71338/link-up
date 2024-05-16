import Link from 'next/link'
import { LikedPost, Post } from '@prisma/client'
import { HeartIcon } from '@heroicons/react/24/solid'

import { NextImage } from '@/components'

interface ProfilePostCardProps {
  post: Post & { likes: LikedPost[] }
}

export const ProfilePostCard = ({ post }: ProfilePostCardProps) => {
  return (
    <Link
      href={`/post/${post.id}`}
      className="relative cursor-pointer overflow-hidden border-dark-2 md:rounded md:border"
    >
      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-all hover:opacity-100">
        <HeartIcon className="h-5 w-5 text-red-500" />
        <p className="text-small-semibold">{post.likes.length || '0'}</p>
      </div>
      <NextImage
        src={post.postPhoto || ''}
        alt={post.id}
        className="aspect-[4/3] w-full object-cover"
        useSkeleton
      />
    </Link>
  )
}
