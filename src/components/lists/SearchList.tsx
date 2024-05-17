'use client'

import { Suspense, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useParams } from 'next/navigation'

import { Loader, UserCard } from '@/components'
import { searchUser } from '@/services'

export const SearchList = () => {
  const [users, setUsers] = useState<any>([])
  const [offset, setOffset] = useState(0)
  const [endReached, setEndReached] = useState(false)

  const params = useParams()
  const query = params.query as string

  const { ref } = useInView({
    onChange(inView) {
      if (inView && !endReached) loadMore()
    },
  })

  const loadMore = async () => {
    const newUsers = await searchUser(query, offset)

    if (newUsers.length === 0) return setEndReached(true)

    setUsers([...users, ...newUsers])
    setOffset(offset + 15)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const users = await searchUser(query)

      setUsers([...users])
      if (users.length < 15) setEndReached(true)
      setOffset(15)
    }

    fetchPosts()
  }, [query])

  return (
    <Suspense>
      <div className="divide-y divide-dark-2">
        {users.map((user: any) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      {endReached && users.length === 0 && (
        <div className="my-4 text-center text-small-semibold">
          No users found
        </div>
      )}
      {!endReached && (
        <div ref={ref} className="divide-y divide-dark-2">
          {Array.from({ length: 15 }).map((_, index) => (
            <SearchListSkeleton key={index} />
          ))}
        </div>
      )}
      {endReached && users.length > 0 && (
        <div className="my-4 text-center text-small-semibold">
          No more users
        </div>
      )}
    </Suspense>
  )
}

const SearchListSkeleton = () => {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="h-12 w-12 flex-none animate-pulse rounded-full bg-dark-2" />
      <div className="flex w-full flex-col gap-2">
        <div className="h-4 w-full animate-pulse rounded-md bg-dark-2" />
        <div className="h-3 w-full animate-pulse rounded-md bg-dark-2" />
      </div>
      <div className="h-12 w-12 flex-none animate-pulse rounded-md bg-dark-2" />
    </div>
  )
}
