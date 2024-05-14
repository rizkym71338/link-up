import { notFound } from 'next/navigation'

import { findCurrentUser, findManyPost } from '@/services'
import { PostCard } from '@/components'
import { nullSafe } from '@/libs'

export default async function RootPage() {
  const currentUser = await findCurrentUser()

  if (!currentUser) return notFound()

  const posts = await findManyPost({
    include: { author: true, likes: true, saves: true, comments: true },
  })

  return (
    <section className="-mt-4 divide-y divide-dark-2">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={nullSafe(post)}
          currentUser={currentUser}
        />
      ))}
    </section>
  )
}
