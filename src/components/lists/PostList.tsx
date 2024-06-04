'use client'

import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import { PostCard, Loader } from '@/components'
import { getPosts } from '@/services'

export const PostList = () => {
  const [data, setData] = useState({
    items: [] as any[],
    offset: 0,
    endReached: false,
  })

  const size = 10

  const loadMore = async () => {
    const response = await getPosts({ offset: data.offset, size })

    setData({
      items: [...data.items, ...response],
      offset: data.offset + size,
      endReached: response.length === 0,
    })
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await getPosts()

      setData({
        items: response,
        offset: size,
        endReached: response.length < size,
      })
    }

    fetch()
  }, [])

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={!data.endReached}
      loader={<Loader className="mx-auto my-4 h-8" />}
    >
      <div className="divide-y divide-gray-100">
        {data.items.map((item: any) => (
          <PostCard key={item.id} post={item} />
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
