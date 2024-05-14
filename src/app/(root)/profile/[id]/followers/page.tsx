import { notFound } from 'next/navigation'

import { findCurrentUser, findManyUser, findUser } from '@/services'
import { ProfileCard, ProfileTab, UserCard } from '@/components'
import { nullSafe } from '@/libs'

interface FollowersPageProps {
  params: { id: string }
}

export default async function FollowersPage({ params }: FollowersPageProps) {
  const currentUser = await findCurrentUser()

  if (!currentUser) return notFound()

  const user = await findUser({
    where: { id: params.id },
    include: { posts: true },
  })

  const followers = await findManyUser({
    where: { followingIds: { has: params.id } },
  })

  return (
    <section>
      <ProfileCard user={nullSafe(user)} currentUser={currentUser} />

      <ProfileTab />

      {followers.length === 0 && (
        <div className="pt-4 text-center">No followers</div>
      )}

      <div className="divide-y divide-dark-2">
        {followers.map((follower) => (
          <UserCard
            key={follower.id}
            user={follower}
            currentUser={currentUser}
          />
        ))}
      </div>
    </section>
  )
}
