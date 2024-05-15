import { ReactNode } from 'react'
import { notFound, redirect } from 'next/navigation'
import { ClerkProvider } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

import { findCurrentUser, findManyNotificationNoRead } from '@/services'
import { BottomBar, MainContainer, LeftSideBar } from '@/components'

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  if (!auth().userId) redirect('/sign-in')

  const currentUser = await findCurrentUser()

  if (!currentUser) return notFound()

  const notifications = await findManyNotificationNoRead(currentUser.id)

  return (
    <ClerkProvider>
      <main className="flex">
        <LeftSideBar currentUser={currentUser} notifications={notifications} />
        <MainContainer>{children}</MainContainer>
      </main>
      <BottomBar currentUser={currentUser} notifications={notifications} />
    </ClerkProvider>
  )
}
