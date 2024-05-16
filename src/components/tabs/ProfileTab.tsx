'use client'

import { useParams, usePathname } from 'next/navigation'

import { TabButton } from '@/components'
import { profileTabs } from '@/constants'
import { cn } from '@/libs'

interface ProfileTabProps {
  className?: string
}

export const ProfileTab = ({ className }: ProfileTabProps) => {
  const pathname = usePathname()
  const params = useParams()

  const currentPrefix = pathname.split('/')[3] || ''

  return (
    <div
      className={cn(
        'flex gap-4 border-b border-dark-2 px-4 pb-4 md:px-0',
        className,
      )}
    >
      {profileTabs.map(({ name, prefix }) => (
        <TabButton
          key={prefix}
          href={`/profile/${params.id}/${prefix}`}
          label={name}
          isActive={currentPrefix === prefix}
        />
      ))}
    </div>
  )
}
