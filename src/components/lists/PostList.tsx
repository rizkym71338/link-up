'use client'

import { Suspense, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { PostCard, Loader } from '@/components'
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
      {!endReached && <Loader ref={ref} className="mx-auto my-4 h-8" />}
      {endReached && posts.length > 0 && (
        <div className="py-4 text-center text-small-semibold">
          No more Posts
        </div>
      )}
    </Suspense>
  )
}
