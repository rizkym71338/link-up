import { CustomImage } from '@/components'
import { prisma } from '@/libs'

export default async function RootPage() {
  const posts = await prisma.post.findMany({
    include: { author: true, likes: true, saves: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <section className="flex flex-col gap-6">
      {posts.map((post) => (
        <div key={post?.id} className="rounded-lg bg-dark-1 p-6">
          <CustomImage
            src={post?.postPhoto || ''}
            alt="post photo"
            className="aspect-square w-full rounded-lg bg-dark-2 object-cover"
          />
          <p>{post?.caption}</p>
          <p>{post?.tag}</p>
          <p>{post?.author?.username}</p>
        </div>
      ))}
    </section>
  )
}
