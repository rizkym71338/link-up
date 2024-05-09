'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'

import { ProfileMenu } from '@/components'

export const TopBar = () => {
  const [search, setSearch] = useState('')

  const router = useRouter()

  return (
    <div className="mt-6 flex items-center gap-4">
      <Link href="/" className="md:hidden">
        <Image src="/assets/logo.png" alt="logo" width={200} height={200} />
      </Link>

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
