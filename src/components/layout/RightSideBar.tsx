import { User } from '@prisma/client'

import { UserCard } from '@/components'

interface RightSideBarProps {
  users: User[]
  currentUser: User
}

export const RightSideBar = async (props: RightSideBarProps) => {
  const { users, currentUser } = props

  return (
    <section className="custom-scrollbar sticky right-0 top-0 z-10 h-screen w-full max-w-[350px] overflow-auto border-l border-dark-2 p-4 max-lg:hidden">
      <h1 className="mb-4 text-heading3-bold">Suggested for you</h1>
      <div className="divide-y divide-dark-2">
        {users.map((user) => (
          <UserCard key={user.id} user={user} currentUser={currentUser} />
        ))}
      </div>
    </section>
  )
}
