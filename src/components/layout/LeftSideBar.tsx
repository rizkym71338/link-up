'use client'

import Link from 'next/link'
import { Notification } from '@prisma/client'

import { Menu, NextImage, ProfileStatistic } from '@/components'
import { authStore } from '@/stores'

interface LeftSideBarProps {
  notifications: Notification[]
}

export const LeftSideBar = ({ notifications }: LeftSideBarProps) => {
  const auth = authStore((state) => state.user)

  return (
    <div className="custom-scrollbar sticky left-0 top-0 z-10 h-screen w-full max-w-[300px] overflow-auto border-r border-dark-2 bg-purple-2 p-4 max-md:hidden">
      <Link href="/">
        <NextImage
          src="/assets/logo.png"
          alt="logo"
          className="mx-auto mb-8"
          useSkeleton
          priority
        />
      </Link>

      <Link href={`/profile/${auth?.id}`}>
        {!auth && (
          <div className="mx-auto mb-2 h-16 w-16 animate-pulse rounded-full bg-dark-2" />
        )}
        {auth && (
          <NextImage
            src={auth?.profilePhoto || ''}
            alt="profile-photo"
            className="mx-auto mb-2 h-16 w-16 rounded-full"
            useSkeleton
          />
        )}
      </Link>

      <Link href={`/profile/${auth?.id}`}>
        {!auth && (
          <div className="mx-auto mb-1 h-4 w-1/2 animate-pulse rounded-md bg-dark-2" />
        )}
        {auth && (
          <p className="mb-1 text-center text-small-bold">
            {auth?.firstName} {auth?.lastName}
          </p>
        )}

        {!auth && (
          <div className="mx-auto mb-4 h-3 w-1/3 animate-pulse rounded-md bg-dark-2" />
        )}
        {auth && (
          <p className="mb-4 text-center text-subtle-medium text-light-2">
            @{auth?.username}
          </p>
        )}
      </Link>

      <ProfileStatistic className="mb-4" />

      <hr className="mb-4 border-dark-2" />

      <Menu notifications={notifications} />

      <hr className="my-4 border-dark-2" />

      <p className="text-center text-tiny-medium">
        © 2024 Vibe Zone | Created by Rizky Maulana
      </p>
    </div>
  )
}
