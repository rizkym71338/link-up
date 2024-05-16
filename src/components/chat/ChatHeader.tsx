'use client'

import { User } from '@prisma/client'

import { NextImage } from '@/components'

interface ChatHeaderProps {
  recipientUser: User
}

export const ChatHeader = ({ recipientUser }: ChatHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 flex items-center gap-4 border-b border-dark-2 bg-purple-2 px-4 py-4 md:top-[69px] md:px-0">
      <NextImage
        src={recipientUser.profilePhoto || ''}
        alt={recipientUser.username || ''}
        className="h-12 w-12 rounded-full"
        useSkeleton
      />
      <div className="mb-2 w-full">
        <p>
          {recipientUser.firstName} {recipientUser.lastName}
        </p>
        <p className="text-subtle-medium text-light-2">
          @{recipientUser.username}
        </p>
      </div>
    </div>
  )
}
