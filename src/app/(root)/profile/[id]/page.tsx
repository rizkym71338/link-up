import { notFound } from 'next/navigation'

import { ProfileCard, ProfilePostCard, ProfileTab } from '@/components'
import { findCurrentUser, findUserById } from '@/services'
import { findManyPostByAuthorId } from '@/services'

interface ProfilePageProps {
  params: { id: string }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const currentUser = await findCurrentUser()

  if (!currentUser) return notFound()

  const user = await findUserById(params.id)

  if (!user) return notFound()

  const posts = await findManyPostByAuthorId(params.id)

  return (
    <section>
      <ProfileCard user={user} currentUser={currentUser} />

      <ProfileTab className="mb-4" />

      {posts.length === 0 && <div className="text-center">No posts</div>}

      <div className="grid grid-cols-2 gap-1">
        {posts.map((post) => (
          <ProfilePostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
