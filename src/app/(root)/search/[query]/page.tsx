import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'

import { UserCard } from '@/components'
import { prisma } from '@/libs'

interface SearchPageProps {
  params: { query: string }
}

export default async function SearchPage({ params }: SearchPageProps) {
  const user = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  if (!user) return notFound()

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: params.query, mode: 'insensitive' } },
        { firstName: { contains: params.query, mode: 'insensitive' } },
        { lastName: { contains: params.query, mode: 'insensitive' } },
      ],
      NOT: { clerkId: auth().userId },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <section className="divide-y divide-dark-2">
      {users.length === 0 && <div className="text-center">No people found</div>}

      {users.map((user) => (
        <UserCard key={user.id} user={user} currentUser={user} />
      ))}
    </section>
  )
}
