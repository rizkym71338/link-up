import { ReactNode } from 'react'
import { notFound, redirect } from 'next/navigation'
import { ClerkProvider } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

import { findCurrentUser, findManyUser, findManyNotification } from '@/services'
import { LeftSideBar, RightSideBar } from '@/components'
import { BottomBar, MainContainer } from '@/components'
import { nullSafe } from '@/libs'

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  if (!auth().userId) redirect('/sign-in')

  const currentUser = await findCurrentUser({ include: { posts: true } })

  if (!currentUser) return notFound()

  const users = await findManyUser({
    where: { clerkId: { not: currentUser.clerkId } },
  })

  const notifications = await findManyNotification({
    where: { recipientId: currentUser.id, isRead: false },
  })

  return (
    <ClerkProvider>
      <main className="flex">
        <LeftSideBar
          currentUser={nullSafe(currentUser)}
          notifications={notifications}
        />
        <MainContainer>{children}</MainContainer>
        <RightSideBar users={users} currentUser={currentUser} />
      </main>
      <BottomBar currentUser={currentUser} notifications={notifications} />
    </ClerkProvider>
  )
}
