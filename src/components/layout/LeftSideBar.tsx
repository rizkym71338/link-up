import Link from 'next/link'
import { Post, User } from '@prisma/client'

import { Menu, NextImage, ProfileStatistic } from '@/components'
import { nullSafe } from '@/libs'

interface LeftSideBarProps {
  user: User & { posts: Post[] }
}

export const LeftSideBar = ({ user }: LeftSideBarProps) => {
  return (
    <div className="custom-scrollbar sticky left-0 top-0 hidden h-screen w-full max-w-[300px] overflow-auto border-r border-dark-2 p-4 md:block">
      <Link href="/">
        <NextImage
          src="/assets/logo.png"
          alt="logo"
          className="mx-auto mb-8"
          useSkeleton
        />
      </Link>

      <Link href={`/profile/${user.id}`}>
        <NextImage
          src={nullSafe(user.profilePhoto)}
          alt="profile-photo"
          className="mx-auto mb-2 h-16 w-16 rounded-full"
          useSkeleton
        />
      </Link>

      <Link href={`/profile/${user.id}`}>
        <p className="mb-1 text-center text-small-bold">
          {user.firstName} {user.lastName}
        </p>

        <p className="mb-4 text-center text-subtle-medium text-light-2">
          @{user.username}
        </p>
      </Link>

      <ProfileStatistic user={user} className="mb-4" />

      <hr className="mb-4 border-dark-2" />

      <Menu user={user} />

      <hr className="my-4 border-dark-2" />

      <p className="text-center text-tiny-medium">
        © 2024 Vibe Zone | Created by Rizky Maulana
      </p>
    </div>
  )
}
