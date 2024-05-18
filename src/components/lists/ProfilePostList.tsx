'use client'

import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Post, User } from '@prisma/client'

import { Loader, ProfilePostCard } from '@/components'
import { getPosts } from '@/services'

interface ProfilePostListProps {
  user: User & { posts: Post[] }
  by?: 'liked' | 'saved'
}

export const ProfilePostList = ({ user, by }: ProfilePostListProps) => {
  const [data, setData] = useState({
    items: [] as any[],
    offset: 0,
    endReached: false,
  })

  const size = 10

  const loadMore = async () => {
    const response = await getPosts({
      authorId: by === undefined ? user.id : undefined,
      likedUserId: by === 'liked' ? user.id : undefined,
      savedUserId: by === 'saved' ? user.id : undefined,
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
    const fetch = async () => {
      const response = await getPosts({
        authorId: by === undefined ? user.id : undefined,
        likedUserId: by === 'liked' ? user.id : undefined,
        savedUserId: by === 'saved' ? user.id : undefined,
        size,
      })

      setData({
        items: response,
        offset: size,
        endReached: response.length < size,
      })
    }

    fetch()
  }, [by, user.id])

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={!data.endReached}
      loader={<Loader className="mx-auto my-4 h-8" />}
    >
      <div className="grid grid-cols-2 gap-1">
        {data.items.map((item: any) => (
          <ProfilePostCard key={item.id} post={item} />
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
