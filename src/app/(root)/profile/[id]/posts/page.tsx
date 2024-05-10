import { PostCard, ProfileCard, ProfileTab } from '@/components'
import { prisma } from '@/libs'

interface ProfilePageProps {
  params: { id: string }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const user = await prisma.user.findFirst({
    where: { id: params.id },
    include: { posts: true },
  })

  const posts = await prisma.post.findMany({
    where: { authorId: params.id },
    include: { author: true, likes: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <section className="flex flex-col gap-4">
      <ProfileCard user={user as any} />

      <ProfileTab />

      {posts.map((post) => (
        <PostCard key={post.id} post={post as any} />
      ))}
    </section>
  )
}
