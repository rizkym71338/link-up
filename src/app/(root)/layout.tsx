import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { ClerkProvider } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

import { LeftSideBar, RightSideBar } from '@/components'
import { BottomBar, MainContainer } from '@/components'
import { nullSafe, prisma } from '@/libs'

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  if (!auth().userId) redirect('/sign-in')

  const user = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  return (
    <ClerkProvider>
      <main className="flex">
        <LeftSideBar />
        <MainContainer>{children}</MainContainer>
        <RightSideBar />
      </main>
      <BottomBar user={nullSafe(user)} />
    </ClerkProvider>
  )
}
