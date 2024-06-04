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
        'bg-brand flex items-center gap-2 rounded-md px-3 py-2 text-small-semibold text-gray-50',
        className,
      )}
    >
      <PlusIcon className="h-5 w-5" />
      <p className="text-nowrap text-small-semibold">Create Post</p>
    </Link>
  )
}
