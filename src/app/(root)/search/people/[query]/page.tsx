import Link from 'next/link'

import { UserCard } from '@/components'
import { prisma } from '@/libs'

interface SearchPageProps {
  params: { query: string }
}

export default async function SearchPage({ params }: SearchPageProps) {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: params.query, mode: 'insensitive' } },
        { firstName: { contains: params.query, mode: 'insensitive' } },
        { lastName: { contains: params.query, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-center gap-4">
        <Link href={`/search/posts/${params.query}`} className="tab bg-dark-2">
          Posts
        </Link>
        <Link
          href={`/search/people/${params.query}`}
          className="tab bg-purple-1"
        >
          People
        </Link>
      </div>
      {users.length === 0 && <div className="text-center">No people found</div>}
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </section>
  )
}
