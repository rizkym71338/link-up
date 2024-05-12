'use client'

import { useParams, usePathname } from 'next/navigation'

import { TabButton } from '@/components'
import { searchTabs } from '@/constants'

export const SearchTab = () => {
  const pathname = usePathname()
  const params = useParams()

  const currentPrefix = pathname.split('/')[2]

  return (
    <div className="flex justify-center gap-4 border-b border-dark-2 px-4 pb-4 md:px-0">
      {searchTabs.map(({ name, prefix }) => (
        <TabButton
          key={prefix}
          href={`/search/${prefix}/${params.query}`}
          label={name}
          isActive={currentPrefix === prefix}
        />
      ))}
    </div>
  )
}
