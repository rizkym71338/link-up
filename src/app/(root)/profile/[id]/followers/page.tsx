import { notFound } from 'next/navigation'

import { ProfileCard, ProfileTab, UserCard } from '@/components'
import { findCurrentUser, findUserById } from '@/services'
import { findManyUserFollowerById } from '@/services'

interface FollowersPageProps {
  params: { id: string }
}

export default async function FollowersPage({ params }: FollowersPageProps) {
  const currentUser = await findCurrentUser()

  if (!currentUser) return notFound()

  const user = await findUserById(params.id)

  if (!user) return notFound()

  const followers = await findManyUserFollowerById(user.id)

  return (
    <section>
      <ProfileCard user={user} currentUser={currentUser} />

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
