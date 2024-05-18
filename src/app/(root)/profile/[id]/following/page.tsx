import { notFound } from 'next/navigation'

import { FollowingList, ProfileCard, ProfileTab } from '@/components'
import { findUserById } from '@/services'

interface FollowingPageProps {
  params: { id: string }
}

export default async function FollowingPage({ params }: FollowingPageProps) {
  const user = await findUserById(params.id)

  if (!user) return notFound()

  return (
    <section>
      <ProfileCard user={user} />

      <ProfileTab />

      <FollowingList user={user} />
    </section>
  )
}
