import { notFound } from 'next/navigation'

import { ProfileCard, ProfilePostList, ProfileTab } from '@/components'
import { findUserById } from '@/services'

interface ProfilePageProps {
  params: { id: string }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const user = await findUserById(params.id)

  if (!user) return notFound()

  return (
    <section>
      <ProfileCard user={user} />

      <ProfileTab className="mb-4" />

      <ProfilePostList user={user} />
    </section>
  )
}
