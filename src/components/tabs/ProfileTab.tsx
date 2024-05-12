'use client'

import { useParams, usePathname } from 'next/navigation'

import { TabButton } from '@/components'
import { profileTabs } from '@/constants'
import { nullSafe } from '@/libs'

export const ProfileTab = () => {
  const pathname = usePathname()
  const params = useParams()

  const currentPrefix = nullSafe(pathname.split('/')[3])

  return (
    <div className="mb-4 flex gap-4 border-b border-dark-2 px-4 pb-4 md:px-0">
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
