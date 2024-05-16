import Link from 'next/link'
import { notFound } from 'next/navigation'

import { findCurrentUser, findManyUserWithoutCurrentUser } from '@/services'
import { NextImage } from '@/components'

export default async function DirectMessagePage() {
  const currentUser = await findCurrentUser()

  if (!currentUser) return notFound()

  const users = await findManyUserWithoutCurrentUser()

  return (
    <section className="divide-y divide-dark-2">
      {users.length === 0 && <div className="text-center">No people found</div>}

      {users.map((user) => (
        <Link
          key={user.id}
          href={`/direct/${user.id}`}
          className="flex items-center gap-2 px-4 py-4 md:px-0"
        >
          <NextImage
            src={user.profilePhoto || ''}
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
