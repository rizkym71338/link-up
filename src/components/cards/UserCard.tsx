import Link from 'next/link'
import { UserPlusIcon } from '@heroicons/react/24/outline'
import { User } from '@prisma/client'

import { NextImage } from '@/components'
import { nullSafe } from '@/libs'

interface UserCardProps {
  user: User
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="flex items-center gap-2">
      <Link href={`/profile/${nullSafe(user?.id)}/posts`} className="flex-none">
        <NextImage
          src={nullSafe(user?.profilePhoto)}
          alt="profile photo"
          className="h-12 w-12 rounded-full"
          useSkeleton
        />
      </Link>

      <div className="w-full">
        <p className="mb-1 text-small-semibold">
          {nullSafe(user?.firstName)} {nullSafe(user?.lastName)}
        </p>
        <p className="text-subtle-medium text-light-2">
          @{nullSafe(user?.username)}
        </p>
      </div>

      <UserPlusIcon className="h-8 w-8 cursor-pointer transition-all hover:text-purple-1" />
    </div>
  )
}
