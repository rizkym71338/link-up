import Link from 'next/link'
import { UserPlusIcon } from '@heroicons/react/24/outline'

import { NextImage } from '@/components'
import { nullSafe, prisma } from '@/libs'

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
    <section className="flex flex-col gap-6">
      <div className="flex justify-center gap-6">
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
        <div key={user.id} className="flex items-center gap-4">
          <Link href={`/profile/${nullSafe(user?.id)}`} className="flex-none">
            <NextImage
              src={nullSafe(user?.profilePhoto)}
              alt="profile photo"
              className="h-12 w-12 rounded-full"
              useSkeleton
            />
          </Link>

          <div className="w-full">
            <p className="mb-1 text-small-semibold">
              {nullSafe(user?.firstName)} {nullSafe(user?.lastName)}
            </p>
            <p className="text-subtle-medium text-light-2">
              @{nullSafe(user?.username)}
            </p>
          </div>

          <UserPlusIcon className="h-8 w-8 cursor-pointer transition-all hover:text-purple-1" />
        </div>
      ))}
    </section>
  )
}
