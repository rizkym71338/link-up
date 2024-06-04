import { UserButton, useUser } from '@clerk/nextjs'

import { cn } from '@/libs'

interface ProfileMenuProps {
  className?: string
}

export const ProfileMenu = ({ className }: ProfileMenuProps) => {
  const { isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div
        className={cn(
          'aspect-square h-8 animate-pulse rounded-full bg-gray-200',
          className,
        )}
      />
    )
  }

  return (
    <button
      className={cn(
        'flex aspect-square items-center justify-center',
        className,
      )}
    >
      <UserButton afterSignOutUrl="/sign-in" />
    </button>
  )
}
