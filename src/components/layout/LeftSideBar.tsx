import Link from 'next/link'
import { Notification, Post, User } from '@prisma/client'

import { Menu, NextImage, ProfileStatistic } from '@/components'
import { nullSafe } from '@/libs'

interface LeftSideBarProps {
  currentUser: User & { posts: Post[] }
  notifications: Notification[]
}

export const LeftSideBar = (props: LeftSideBarProps) => {
  const { currentUser, notifications } = props

  return (
    <div className="custom-scrollbar sticky left-0 top-0 z-10 h-screen w-full max-w-[300px] overflow-auto border-r border-dark-2 bg-purple-2 p-4 max-md:hidden">
      <Link href="/">
        <NextImage
          src="/assets/logo.png"
          alt="logo"
          className="mx-auto mb-8"
          useSkeleton
        />
      </Link>

      <Link href={`/profile/${currentUser.id}`}>
        <NextImage
          src={nullSafe(currentUser.profilePhoto)}
          alt="profile-photo"
          className="mx-auto mb-2 h-16 w-16 rounded-full"
          useSkeleton
        />
      </Link>

      <Link href={`/profile/${currentUser.id}`}>
        <p className="mb-1 text-center text-small-bold">
          {currentUser.firstName} {currentUser.lastName}
        </p>

        <p className="mb-4 text-center text-subtle-medium text-light-2">
          @{currentUser.username}
        </p>
      </Link>

      <ProfileStatistic currentUser={currentUser} className="mb-4" />

      <hr className="mb-4 border-dark-2" />

      <Menu currentUser={currentUser} notifications={notifications} />

      <hr className="my-4 border-dark-2" />

      <p className="text-center text-tiny-medium">
        © 2024 Vibe Zone | Created by Rizky Maulana
      </p>
    </div>
  )
}
