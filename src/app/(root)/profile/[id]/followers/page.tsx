import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

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

  const currentUser = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  if (!currentUser) return notFound()

  const followers = await prisma.user.findMany({
    where: { followingIds: { has: params.id } },
    orderBy: { createdAt: 'desc' },
  })

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
