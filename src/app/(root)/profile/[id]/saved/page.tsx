import { notFound } from 'next/navigation'

import { ProfileCard, ProfilePostList, ProfileTab } from '@/components'
import { findUserById } from '@/services'

interface SavedPageProps {
  params: { id: string }
}

export default async function SavedPage({ params }: SavedPageProps) {
  const user = await findUserById(params.id)

  if (!user) return notFound()

  return (
    <section>
      <ProfileCard user={user} />

      <ProfileTab className="mb-4" />

      <ProfilePostList user={user} by="saved" />
    </section>
  )
}
