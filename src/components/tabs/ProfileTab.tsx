'use client'

import { useParams, usePathname } from 'next/navigation'

import { TabButton } from '@/components'
import { profileTabs } from '@/constants'

export const ProfileTab = () => {
  const pathname = usePathname()
  const params = useParams()

  const currentPrefix = pathname.split('/')[3]

  return (
    <div className="flex justify-center gap-4">
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
