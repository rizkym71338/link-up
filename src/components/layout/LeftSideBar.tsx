import Image from 'next/image'
import Link from 'next/link'

import { Menu } from '@/components'
import { User, Post } from '@prisma/client'

interface LeftSideBarProps {
  user: User & {
    posts: Post[]
  }
}

export const LeftSideBar = ({ user }: LeftSideBarProps) => {
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
        <Image src="/assets/logo.png" alt="logo" width={200} height={200} />
      </Link>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2">
          <Link href="/">
            <Image
              src={user.profilePhoto || ''}
              alt="profile-photo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>
          <p className="text-small-bold">{user.username}</p>
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
