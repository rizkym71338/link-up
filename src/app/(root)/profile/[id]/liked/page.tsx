import { notFound } from 'next/navigation'

import { ProfileCard, ProfilePostCard, ProfileTab } from '@/components'
import { findCurrentUser, findUserById } from '@/services'
import { findManyPostByLikedUserId } from '@/services'

interface LikedPageProps {
  params: { id: string }
}

export default async function LikedPage({ params }: LikedPageProps) {
  const currentUser = await findCurrentUser()

  if (!currentUser) return notFound()

  const user = await findUserById(params.id)

  if (!user) return notFound()

  const posts = await findManyPostByLikedUserId(user.id)

  return (
    <section>
      <ProfileCard user={user} currentUser={currentUser} />

      <ProfileTab className="mb-4" />

      {posts.length === 0 && <div className="text-center">No posts</div>}

      <div className="mb-4 grid grid-cols-2 gap-1">
        {posts.map((post) => (
          <ProfilePostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
