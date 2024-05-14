import { notFound } from 'next/navigation'

import { ProfileCard, ProfilePostCard, ProfileTab } from '@/components'
import { findCurrentUser, findManyPost, findUser } from '@/services'
import { nullSafe } from '@/libs'

interface SavedPageProps {
  params: { id: string }
}

export default async function SavedPage({ params }: SavedPageProps) {
  const currentUser = await findCurrentUser()

  if (!currentUser) return notFound()

  const user = await findUser({
    where: { id: params.id },
    include: { posts: true },
  })

  if (!user) return notFound()

  const posts = await findManyPost({
    where: { saves: { some: { userId: user.id } } },
    include: { likes: true },
  })

  return (
    <section>
      <ProfileCard user={nullSafe(user)} currentUser={currentUser} />

      <ProfileTab className="mb-4" />

      {posts.length === 0 && <div className="text-center">No posts</div>}

      <div className="grid grid-cols-2 gap-1">
        {posts.map((post) => (
          <ProfilePostCard key={post.id} post={nullSafe(post)} />
        ))}
      </div>
    </section>
  )
}
