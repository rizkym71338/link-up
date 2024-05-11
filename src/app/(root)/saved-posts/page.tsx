import { auth } from '@clerk/nextjs/server'

import { PostCard } from '@/components'
import { prisma } from '@/libs'

export default async function SavedPostsPage() {
  const user = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  const posts = await prisma.post.findMany({
    where: { saves: { some: { userId: user?.id } } },
    include: { author: true, likes: true, saves: true },
    orderBy: { createdAt: 'desc' },
  })

  if (posts.length === 0)
    return <div className="text-center">No posts found</div>

  return (
    <section className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post as any} />
      ))}
    </section>
  )
}
