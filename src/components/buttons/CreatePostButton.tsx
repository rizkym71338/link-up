import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/outline'

import { cn } from '@/libs'

interface CreatePostButtonProps {
  className?: string
}

export const CreatePostButton = ({ className }: CreatePostButtonProps) => {
  return (
    <Link
      href="/create-post"
      className={cn(
        'flex items-center gap-2 rounded-lg bg-gradient-to-l from-pink-1 to-purple-1 px-3 py-2 text-small-semibold',
        className,
      )}
    >
      <PlusIcon className="h-5 w-5" />
      <p className="text-nowrap text-small-semibold">Create Post</p>
    </Link>
  )
}
