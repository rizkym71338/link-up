import { NextImage } from '@/components'
import { nullSafe, prisma } from '@/libs'

export default async function RootPage() {
  const posts = await prisma.post.findMany({
    include: { author: true, likes: true, saves: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <section className="flex flex-col gap-6">
      {posts.map((post) => (
        <div key={post.id} className="rounded-lg bg-dark-1 p-6">
          <NextImage
            src={nullSafe(post.postPhoto)}
            alt="post photo"
            className="aspect-video w-full rounded-lg bg-dark-2 object-cover"
            useSkeleton
          />
          <p>{nullSafe(post.caption)}</p>
          <p>{nullSafe(post.tag)}</p>
          <p>{nullSafe(post.author?.username)}</p>
        </div>
      ))}
    </section>
  )
}
