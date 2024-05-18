'use client'

import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import { Loader, NotificationCard } from '@/components'
import { getNotifications } from '@/services'
import { authStore } from '@/stores'

export const NotificationList = () => {
  const [data, setData] = useState({
    items: [] as any[],
    offset: 0,
    endReached: false,
  })

  const size = 10

  const auth = authStore((state) => state.user)

  const loadMore = async () => {
    const response = await getNotifications({
      id: auth?.id || '',
      offset: data.offset,
      size,
    })

    setData({
      items: [...data.items, ...response],
      offset: data.offset + size,
      endReached: response.length === 0,
    })
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getNotifications({ id: auth?.id || '', size })

      setData({
        items: response,
        offset: size,
        endReached: response.length < size,
      })
    }

    fetchPosts()
  }, [auth?.id])

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={!data.endReached}
      loader={<Loader className="mx-auto my-4 h-8" />}
    >
      <div className="divide-y divide-dark-2">
        {data.items.map((item: any) => {
          const isFollowed =
            auth?.followingIds.includes(item.authorId || '') || false

          return (
            <NotificationCard
              key={item.id}
              notification={item}
              isFollowed={isFollowed}
            />
          )
        })}
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
