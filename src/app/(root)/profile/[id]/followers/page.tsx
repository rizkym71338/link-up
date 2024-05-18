import { notFound } from 'next/navigation'

import { FollowerList, ProfileCard, ProfileTab } from '@/components'
import { findUserById } from '@/services'

interface FollowersPageProps {
  params: { id: string }
}

export default async function FollowersPage({ params }: FollowersPageProps) {
  const user = await findUserById(params.id)

  if (!user) return notFound()

  return (
    <section>
      <ProfileCard user={user} />

      <ProfileTab />

      <FollowerList user={user} />
    </section>
  )
}
