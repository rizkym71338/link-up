import { auth } from '@clerk/nextjs/server'

import { UserCard } from '@/components'
import { prisma } from '@/libs'

export const RightSideBar = async () => {
  const users = await prisma.user.findMany({
    where: { clerkId: { not: auth().userId } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <section className="custom-scrollbar sticky right-0 top-0 z-10 h-screen w-full max-w-[350px] overflow-auto border-l border-dark-2 p-4 max-lg:hidden">
      <h1 className="mb-4 text-heading3-bold">Suggested for you</h1>
      <div className="divide-y divide-dark-2">
        {users.map((following) => (
          <UserCard key={following.id} user={following} />
        ))}
      </div>
    </section>
  )
}
