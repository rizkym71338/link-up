import { notFound } from 'next/navigation'

import { ProfileCard, ProfileTab, UserCard } from '@/components'
import { prisma } from '@/libs'

interface FollowersPageProps {
  params: { id: string }
}

export default async function FollowersPage({ params }: FollowersPageProps) {
  const user = await prisma.user
    .findFirst({
      where: { id: params.id },
      include: { posts: true },
    })
    .catch(() => notFound())

  if (!user) return notFound()

  const followers = await prisma.user.findMany({
    where: { followingIds: { has: params.id } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <section>
      <ProfileCard user={user as any} />

      <ProfileTab />

      {followers.length === 0 && (
        <div className="text-center">No followers</div>
      )}

      <div className="divide-y divide-dark-2">
        {followers.map((follower) => (
          <UserCard key={follower.id} user={follower} />
        ))}
      </div>
    </section>
  )
}
