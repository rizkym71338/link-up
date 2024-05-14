import { notFound } from 'next/navigation'

import { findCurrentUser, searchUser } from '@/services'
import { UserCard } from '@/components'

interface SearchPageProps {
  params: { query: string }
}

export default async function SearchPage({ params }: SearchPageProps) {
  const currentUser = await findCurrentUser()

  if (!currentUser) return notFound()

  const users = await searchUser(params.query)

  return (
    <section className="divide-y divide-dark-2">
      {users.length === 0 && <div className="text-center">No people found</div>}

      {users.map((user) => (
        <UserCard key={user.id} user={user} currentUser={currentUser} />
      ))}
    </section>
  )
}
