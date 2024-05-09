import { prisma } from '@/libs'
import Image from 'next/image'

export default async function RootPage() {
  const posts = await prisma.post.findMany({
    include: { author: true, likes: true, saves: true, _count: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="flex flex-col gap-6 p-20">
      {posts.map((post) => (
        <div key={post?.id} className="rounded-lg bg-dark-1 p-6">
          <Image
            src={post?.postPhoto!}
            alt="post photo"
            width={200}
            height={200}
            layout="responsive"
            className="rounded-lg"
          />
          <p>{post?.caption}</p>
          <p>{post?.tag}</p>
          <p>{post?.author?.username}</p>
        </div>
      ))}
    </main>
  )
}
