import { User } from '@prisma/client'

import { cn, nullSafe, time } from '@/libs'
import { NextImage } from '@/components'

interface ChatBubbleProps {
  user: User
  isAuthor: boolean
  isFirst: boolean
  message: string
  createdAt: Date
}

export const ChatBubble = (props: ChatBubbleProps) => {
  const { isAuthor, isFirst, message, user, createdAt } = props
  return (
    <div
      className={cn(
        'relative w-fit max-w-[250px] rounded-b-md bg-dark-1 p-4',
        isAuthor ? 'ml-auto mr-2 rounded-l-md' : 'ml-2 rounded-r-md',
        !isFirst && 'rounded-md',
      )}
    >
      <div
        className={cn(
          'absolute top-0 aspect-square h-4 overflow-hidden bg-dark-1',
          isAuthor ? '-right-4' : '-left-4',
          !isFirst && 'hidden',
        )}
      >
        <div
          className={cn(
            'h-full w-full translate-y-1/2 scale-[200%] rounded-full bg-purple-2',
            isAuthor ? 'translate-x-1/2' : '-translate-x-1/2',
          )}
        />
      </div>
      <div
        className={cn(
          'flex items-center gap-2 border-b border-dark-2 pb-3',
          !isFirst && 'hidden',
        )}
      >
        <NextImage
          src={nullSafe(user.profilePhoto)}
          alt="profile"
          className="h-5 w-5 rounded-full"
          useSkeleton
        />
        <p className="text-small-semibold text-light-2">
          {user.firstName} {user.lastName}
        </p>
      </div>
      <p className={cn('pb-2 text-sm', isFirst && 'pt-2')}>{message}</p>
      <p className="text-right text-tiny-medium text-light-2">
        {time(createdAt)}
      </p>
    </div>
  )
}
