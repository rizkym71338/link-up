import { PostCard } from '@/components'
import { prisma } from '@/libs'

export default async function RootPage() {
  const posts = await prisma.post.findMany({
    include: { author: true, likes: true, saves: true },
    orderBy: { createdAt: 'desc' },
  })

  if (posts.length === 0)
    return <div className="text-center">No posts found</div>

  return (
    <section className="divide-y divide-dark-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={post as any} />
      ))}
    </section>
  )
}
