import { notFound } from 'next/navigation'

import { ProfileCard, ProfilePostCard, ProfileTab } from '@/components'
import { prisma } from '@/libs'

interface LikedPageProps {
  params: { id: string }
}

export default async function LikedPage({ params }: LikedPageProps) {
  const user = await prisma.user
    .findFirst({
      where: { id: params.id },
      include: { posts: true },
    })
    .catch(() => notFound())

  if (!user) return notFound()

  const posts = await prisma.post.findMany({
    where: { likes: { some: { userId: user?.id } } },
    include: { likes: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <section>
      <ProfileCard user={user} />

      <ProfileTab />

      {posts.length === 0 && <div className="text-center">No posts</div>}

      <div className="grid grid-cols-2 gap-1 py-4">
        {posts.map((post) => (
          <ProfilePostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
