import { notFound } from 'next/navigation'

import { ProfileCard, ProfileTab, UserCard } from '@/components'
import { prisma } from '@/libs'

interface FollowingPageProps {
  params: { id: string }
}

export default async function FollowingPage({ params }: FollowingPageProps) {
  const user = await prisma.user
    .findFirst({
      where: { id: params.id },
      include: { posts: true },
    })
    .catch(() => notFound())

  if (!user) return notFound()

  const followings = await prisma.user.findMany({
    where: { followersIds: { has: params.id } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <section>
      <ProfileCard user={user as any} />

      <ProfileTab />

      {followings.length === 0 && (
        <div className="text-center">No followings</div>
      )}

      <div className="divide-y divide-dark-2">
        {followings.map((following) => (
          <UserCard key={following.id} user={following} />
        ))}
      </div>
    </section>
  )
}
