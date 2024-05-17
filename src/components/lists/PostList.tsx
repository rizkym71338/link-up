'use client'

import { Suspense, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { PostCard } from '@/components'
import { getPosts } from '@/services'

export const PostList = () => {
  const [posts, setPosts] = useState<any>([])
  const [offset, setOffset] = useState(0)
  const [endReached, setEndReached] = useState(false)

  const { ref } = useInView({
    onChange(inView) {
      if (inView && !endReached) loadMore()
    },
  })

  const loadMore = async () => {
    const newPosts = await getPosts(offset)

    if (newPosts.length === 0) return setEndReached(true)

    setPosts([...posts, ...newPosts])
    setOffset(offset + 5)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts()

      setPosts([...posts])
      if (posts.length < 5) setEndReached(true)
      setOffset(5)
    }

    fetchPosts()
  }, [])

  return (
    <Suspense>
      <div className="divide-y divide-dark-2">
        {posts.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {endReached && posts.length === 0 && (
        <div className="py-4 text-center text-small-semibold">No Posts</div>
      )}
      {!endReached && (
        <div ref={ref} className="divide-y divide-dark-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      )}
      {endReached && posts.length > 0 && (
        <div className="py-4 text-center text-small-semibold">
          No more Posts
        </div>
      )}
    </Suspense>
  )
}

const PostCardSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col py-4">
      <div className="mb-4 flex items-center gap-4">
        <div className="h-8 w-8 flex-none rounded-full bg-dark-2" />
        <div className="h-4 w-full rounded-md bg-dark-2" />
        <div className="h-4 w-4 rounded-md bg-dark-2" />
      </div>
      <div className="mb-4 aspect-video w-full rounded-md bg-dark-2" />
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="h-5 w-5 rounded-md bg-dark-2" />
        <div className="h-5 w-5 rounded-md bg-dark-2" />
      </div>
      <div className="mb-2 h-4 w-full rounded-md bg-dark-2" />
      <div className="mb-2 h-4 w-full rounded-md bg-dark-2" />
      <div className="mb-4 h-3 w-full rounded-md bg-dark-2" />
      <div className="h-8 w-full rounded-md bg-dark-2" />
    </div>
  )
}
