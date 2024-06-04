import Link from 'next/link'
import { Post } from '@prisma/client'

import { NextImage } from '@/components'

interface ProfilePostCardProps {
  post: Post
}

export const ProfilePostCard = ({ post }: ProfilePostCardProps) => {
  return (
    <Link
      href={`/post/${post.id}`}
      className="relative cursor-pointer overflow-hidden border-gray-100 md:rounded md:border"
    >
      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-all hover:opacity-100" />
      <NextImage
        src={post.postPhoto || ''}
        alt={post.id}
        className="aspect-[4/3] w-full object-cover"
        useSkeleton
      />
    </Link>
  )
}
