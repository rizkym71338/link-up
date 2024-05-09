import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'

import { Menu, CustomImage } from '@/components'
import { prisma } from '@/libs'

export const LeftSideBar = async () => {
  const { userId } = auth()

  const user = await prisma.user.findFirst({
    where: { clerkId: userId },
    include: {
      posts: true,
    },
  })

  const info = [
    {
      value: user?.posts?.length || '0',
      label: 'Posts',
    },
    {
      value: user?.followersIds?.length || '0',
      label: 'Followers',
    },
    {
      value: user?.followingIds?.length || '0',
      label: 'Following',
    },
  ]

  return (
    <div className="custom-scrollbar sticky left-0 top-0 hidden h-screen flex-col gap-6 overflow-auto px-10 py-6 md:flex">
      <Link href="/">
        <CustomImage src="/assets/logo.png" alt="logo" priority />
      </Link>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2">
          <CustomImage
            src={user?.profilePhoto || ''}
            alt="profile-photo"
            className="h-16 w-16 rounded-full bg-dark-1"
          />
          <p className="text-small-bold">{user?.username}</p>
        </div>

        <div className="flex justify-between">
          {info.map(({ value, label }, index) => (
            <div key={index} className="flex flex-col items-center">
              <p className="text-base-bold">{value}</p>
              <p className="text-tiny-medium">{label}</p>
            </div>
          ))}
        </div>

        <hr />

        <Menu />
      </div>
    </div>
  )
}
