'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'

import { ProfileMenu } from '@/components'

export const TopBar = () => {
  const [search, setSearch] = useState('')

  const router = useRouter()

  return (
    <div className="sticky top-0 z-10 flex items-center gap-4 border-b border-dark-2 bg-purple-2 p-6">
      <div className="relative flex w-full">
        <input
          type="text"
          className="search-bar"
          placeholder="Search post, people, ..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <MagnifyingGlassIcon
          className="search-icon aspect-square h-6"
          onClick={() => {}}
        />
      </div>

      <button
        className="create-post-btn"
        onClick={() => router.push('/create-post')}
      >
        <PlusIcon className="aspect-square h-6" />
        <p className="text-nowrap">Create Post</p>
      </button>

      <ProfileMenu className="scale-150" />
    </div>
  )
}
