'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export const SearchInput = () => {
  const [search, setSearch] = useState('')

  const Icon = () => {
    const icon = (
      <MagnifyingGlassIcon className="absolute right-3 top-2 h-5 w-5 cursor-pointer hover:text-pink-1" />
    )
    if (search === '') return icon
    return <Link href={`/search/posts/${search}`}>{icon}</Link>
  }

  return (
    <div className="relative flex w-full">
      <input
        type="search"
        className="w-full rounded-lg bg-dark-2 px-3 py-2 text-small-semibold focus:outline-none"
        placeholder="Search post, people, ..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <Icon />
    </div>
  )
}
