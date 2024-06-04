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
    <div className="custom-scrollbar sticky left-0 top-0 z-10 h-screen w-full max-w-[300px] overflow-auto border-r border-gray-100 bg-gray-50 p-4 max-md:hidden">
      <Link
        href="/"
        className="mb-3 flex items-center justify-center gap-2 border-b border-gray-100 pb-3"
      >
        <NextImage
          src="/assets/logo.png"
          alt="logo"
          className="h-10 w-fit flex-none"
          useSkeleton
          priority
        />
        <span className="text-brand text-heading3-bold">LinkUp</span>
      </Link>

      <Link href={`/profile/${auth?.id}`}>
        {!auth && (
          <div className="mx-auto mb-2 h-16 w-16 animate-pulse rounded-full bg-gray-200" />
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
          <div className="mx-auto mb-1 h-4 w-1/2 animate-pulse rounded-md bg-gray-200" />
        )}
        {auth && (
          <p className="mb-1 text-center text-small-bold">
            {auth?.firstName} {auth?.lastName}
          </p>
        )}

        {!auth && (
          <div className="mx-auto mb-4 h-3 w-1/3 animate-pulse rounded-md bg-gray-200" />
        )}
        {auth && (
          <p className="mb-4 text-center text-subtle-medium text-gray-400">
            @{auth?.username}
          </p>
        )}
      </Link>

      <ProfileStatistic className="mb-4" />

      <hr className="mb-4 border-gray-100" />

      <Menu notifications={notifications} />

      <hr className="my-4 border-gray-100" />

      <p className="text-center text-tiny-medium">
        © 2024 LinkUp | Powered by Alphadev
      </p>
    </div>
  )
}
