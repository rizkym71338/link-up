import Image from 'next/image'
import Link from 'next/link'

import { Menu } from '@/components'

const data = {
  name: 'Phuc Mai',
  avatar: '/assets/phucmai.png',
  posts: 1,
  followers: 100,
  following: 100,
}

export const LeftSideBar = () => {
  return (
    <div className="custom-scrollbar sticky left-0 top-0 hidden h-screen flex-col gap-6 overflow-auto px-10 py-6 md:flex">
      <Link href="/">
        <Image src="/assets/logo.png" alt="logo" width={200} height={200} />
      </Link>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2 text-light-1">
          <Link href="/">
            <Image
              src={data.avatar}
              alt="profile-photo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>
          <p className="text-small-bold">{data.name}</p>
        </div>

        <div className="flex justify-between text-light-1">
          <div className="flex flex-col items-center">
            <p className="text-base-bold">{data.posts}</p>
            <p className="text-tiny-medium">Posts</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">{data.followers}</p>
            <p className="text-tiny-medium">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">{data.following}</p>
            <p className="text-tiny-medium">Following</p>
          </div>
        </div>

        <hr />

        <Menu />
      </div>
    </div>
  )
}
