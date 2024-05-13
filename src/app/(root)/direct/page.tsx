import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'

import { NextImage } from '@/components'
import { nullSafe, prisma } from '@/libs'
import Link from 'next/link'

export default async function DirectMessagePage() {
  const currentUser = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  if (!currentUser) return notFound()

  const users = await prisma.user.findMany({
    where: { NOT: { clerkId: auth().userId } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <section className="-mt-4 divide-y divide-dark-2">
      {users.length === 0 && <div className="text-center">No people found</div>}

      {users.map((user) => (
        <Link
          key={user.id}
          href={`/direct/${user.id}`}
          className="flex items-center gap-2 px-4 py-4 md:px-0"
        >
          <NextImage
            src={nullSafe(user.profilePhoto)}
            alt="profile photo"
            className="h-12 w-12 rounded-full"
            useSkeleton
          />

          <div className="w-full">
            <p className="mb-1 text-small-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-subtle-medium text-light-2">@{user.username}</p>
          </div>
        </Link>
      ))}
    </section>
  )
}
