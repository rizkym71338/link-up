'use client'

import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { User } from '@prisma/client'

import { Loader, UserCard } from '@/components'
import { getFollowings } from '@/services'

interface FollowerListProps {
  user: User
}

export const FollowingList = ({ user }: FollowerListProps) => {
  const [data, setData] = useState({
    items: [] as any[],
    offset: 0,
    endReached: false,
  })

  const size = 10

  const loadMore = async () => {
    const response = await getFollowings({
      id: user.id,
      size,
      offset: data.offset,
    })

    setData({
      items: [...data.items, ...response],
      offset: data.offset + size,
      endReached: response.length === 0,
    })
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await getFollowings({ id: user.id, size })

      setData({
        items: response,
        offset: size,
        endReached: response.length < size,
      })
    }

    fetch()
  }, [user.id])

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={!data.endReached}
      loader={<Loader className="mx-auto my-4 h-8" />}
    >
      <div className="divide-y divide-gray-100">
        {data.items.map((item: any) => (
          <UserCard key={item.id} user={item} />
        ))}
      </div>
      {data.endReached && data.items.length === 0 && (
        <div className="py-4 text-center text-small-semibold text-gray-400">
          No data
        </div>
      )}
      {data.endReached && data.items.length > 0 && (
        <div className="py-4 text-center text-small-semibold text-gray-400">
          No more data
        </div>
      )}
    </InfiniteScroll>
  )
}
