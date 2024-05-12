import { auth } from '@clerk/nextjs/server'

import { UserCard } from '@/components'
import { prisma } from '@/libs'

export default async function PeoplePage() {
  const users = await prisma.user.findMany({
    where: { clerkId: { not: auth().userId } },
    orderBy: { createdAt: 'desc' },
  })

  if (users.length === 0)
    return <div className="text-center">No users found</div>

  return (
    <section className="divide-y divide-dark-2">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </section>
  )
}
