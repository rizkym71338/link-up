import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { PostCard } from '@/components'
import { nullSafe, prisma } from '@/libs'

export default async function RootPage() {
  const user = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  if (!user) return notFound()

  const posts = await prisma.post.findMany({
    include: { author: true, likes: true, saves: true, comments: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <section className="-mt-4 divide-y divide-dark-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={nullSafe(post)} user={user} />
      ))}
    </section>
  )
}
