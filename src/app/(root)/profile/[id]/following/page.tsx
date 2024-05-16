import { notFound } from 'next/navigation'

import { ProfileCard, ProfileTab, UserCard } from '@/components'
import { findCurrentUser, findUserById } from '@/services'
import { findManyUserFollowingById } from '@/services'

interface FollowingPageProps {
  params: { id: string }
}

export default async function FollowingPage({ params }: FollowingPageProps) {
  const currentUser = await findCurrentUser()

  if (!currentUser) return notFound()

  const user = await findUserById(params.id)

  if (!user) return notFound()

  const followings = await findManyUserFollowingById(user.id)

  return (
    <section>
      <ProfileCard user={user} currentUser={currentUser} />

      <ProfileTab />

      {followings.length === 0 && (
        <div className="pt-4 text-center">No followings</div>
      )}

      <div className="divide-y divide-dark-2">
        {followings.map((following) => (
          <UserCard key={following.id} user={following} />
        ))}
      </div>
    </section>
  )
}
