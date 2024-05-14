'use client'

import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import { nullSafe } from '@/libs'

export const SearchInput = () => {
  const params = useParams()

  const linkRef = useRef<HTMLAnchorElement>(null)

  const [search, setSearch] = useState(nullSafe(params.query))

  const Icon = () => {
    const icon = (
      <MagnifyingGlassIcon className="absolute right-2.5 top-2 h-5 w-5 cursor-pointer hover:text-pink-1" />
    )
    if (search === '') return icon
    return (
      <Link passHref ref={linkRef} href={`/search/${search}`}>
        {icon}
      </Link>
    )
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && search !== '' && linkRef.current?.click()
  }

  return (
    <div className="relative flex w-full">
      <input
        type="text"
        className="w-full rounded-md bg-dark-2 px-3 py-2 text-small-semibold focus:outline-none"
        placeholder="Search post, people, ..."
        value={search}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <Icon />
    </div>
  )
}
