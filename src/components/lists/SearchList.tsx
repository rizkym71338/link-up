'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import InfiniteScroll from 'react-infinite-scroller'

import { Loader, UserCard } from '@/components'
import { searchUser } from '@/services'

export const SearchList = () => {
  const [data, setData] = useState({
    items: [] as any[],
    offset: 0,
    endReached: false,
  })

  const size = 10

  const params = useParams()
  const query = params.query as string

  const loadMore = async () => {
    const response = await searchUser({ query, size, offset: data.offset })

    setData({
      items: [...data.items, ...response],
      offset: data.offset + size,
      endReached: response.length === 0,
    })
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await searchUser({ query, size })

      setData({
        items: response,
        offset: size,
        endReached: response.length < size,
      })
    }

    fetch()
  }, [query])

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={!data.endReached}
      loader={<Loader className="mx-auto my-4 h-8" />}
    >
      <div className="divide-y divide-dark-2">
        {data.items.map((item: any) => (
          <UserCard key={item.id} user={item} />
        ))}
      </div>
      {data.endReached && data.items.length === 0 && (
        <div className="py-4 text-center text-small-semibold text-light-2">
          No data
        </div>
      )}
      {data.endReached && data.items.length > 0 && (
        <div className="py-4 text-center text-small-semibold text-light-2">
          No more data
        </div>
      )}
    </InfiniteScroll>
  )
}
