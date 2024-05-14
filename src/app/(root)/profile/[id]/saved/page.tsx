import { notFound } from 'next/navigation'

import { ProfileCard, ProfilePostCard, ProfileTab } from '@/components'
import { findCurrentUser, findUserById } from '@/services'
import { findManyPostBySavedUserId } from '@/services'

interface SavedPageProps {
  params: { id: string }
}

export default async function SavedPage({ params }: SavedPageProps) {
  const currentUser = await findCurrentUser()

  if (!currentUser) return notFound()

  const user = await findUserById(params.id)

  if (!user) return notFound()

  const posts = await findManyPostBySavedUserId(user.id)

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
