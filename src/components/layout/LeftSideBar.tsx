import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'

import { Menu, NextImage } from '@/components'
import { nullSafe, prisma } from '@/libs'

export const LeftSideBar = async () => {
  const { userId } = auth()

  const user = await prisma.user.findFirst({
    where: { clerkId: userId },
    include: { posts: true },
  })

  const info = [
    {
      value: nullSafe(user?.posts.length, '0'),
      label: 'Posts',
    },
    {
      value: nullSafe(user?.followersIds.length, '0'),
      label: 'Followers',
    },
    {
      value: nullSafe(user?.followingIds.length, '0'),
      label: 'Following',
    },
  ]

  return (
    <div className="custom-scrollbar sticky left-0 top-0 hidden h-screen w-full max-w-[300px] overflow-auto border-r border-dark-2 p-6 md:block">
      <Link href="/">
        <NextImage
          src="/assets/logo.png"
          alt="logo"
          className="mx-auto mb-6"
          useSkeleton
        />
      </Link>

      <NextImage
        src={nullSafe(user?.profilePhoto)}
        alt="profile-photo"
        className="mx-auto mb-4 h-16 w-16 rounded-full"
        useSkeleton
      />

      <p className="mb-4 text-center text-small-bold">
        {nullSafe(user?.username)}
      </p>

      <div className="mb-6 flex justify-between">
        {info.map(({ value, label }, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="text-base-bold">{nullSafe(value)}</p>
            <p className="text-tiny-medium">{nullSafe(label)}</p>
          </div>
        ))}
      </div>

      <hr className="mb-6 border-dark-2" />

      <Menu />

      <hr className="my-6 border-dark-2" />

      <p className="text-center text-tiny-medium">
        © 2024 Vibe Zone | Created by Rizky Maulana
      </p>
    </div>
  )
}
