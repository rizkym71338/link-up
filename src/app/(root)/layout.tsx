import { ReactNode } from 'react'
import { notFound, redirect } from 'next/navigation'
import { ClerkProvider } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

import { LeftSideBar, RightSideBar } from '@/components'
import { BottomBar, MainContainer } from '@/components'
import { prisma } from '@/libs'

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  if (!auth().userId) redirect('/sign-in')

  const user = await prisma.user
    .findFirst({
      where: { clerkId: auth().userId },
      include: { posts: true },
    })
    .catch(() => notFound())

  if (!user) return notFound()

  const users = await prisma.user.findMany({
    where: { clerkId: { not: auth().userId } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <ClerkProvider>
      <main className="flex">
        <LeftSideBar user={user} />
        <MainContainer>{children}</MainContainer>
        <RightSideBar users={users} currentUser={user} />
      </main>
      <BottomBar user={user} />
    </ClerkProvider>
  )
}
