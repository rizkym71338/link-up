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
      {!endReached && <Loader ref={ref} className="mx-auto my-4 h-8" />}
      {endReached && users.length > 0 && (
        <div className="my-4 text-center text-small-semibold">
          No more users
        </div>
      )}
    </Suspense>
  )
}
