import { notFound } from 'next/navigation'

import { findCurrentUser, findManyUser, findUser } from '@/services'
import { ProfileCard, ProfileTab, UserCard } from '@/components'
import { nullSafe } from '@/libs'

interface FollowingPageProps {
  params: { id: string }
}

export default async function FollowingPage({ params }: FollowingPageProps) {
  const currentUser = await findCurrentUser()

  if (!currentUser) return notFound()

  const user = await findUser({
    where: { id: params.id },
    include: { posts: true },
  })

  const followings = await findManyUser({
    where: { followersIds: { has: params.id } },
  })

  return (
    <section>
      <ProfileCard user={nullSafe(user)} currentUser={currentUser} />

      <ProfileTab />

      {followings.length === 0 && (
        <div className="pt-4 text-center">No followings</div>
      )}

      <div className="divide-y divide-dark-2">
        {followings.map((following) => (
          <UserCard
            key={following.id}
            user={following}
            currentUser={currentUser}
          />
        ))}
      </div>
    </section>
  )
}
