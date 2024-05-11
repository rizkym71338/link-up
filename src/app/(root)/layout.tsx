import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { ClerkProvider } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

import { LeftSideBar, RightSideBar } from '@/components'
import { BottomBar, MainContainer } from '@/components'

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  if (!auth().userId) redirect('/sign-in')

  return (
    <ClerkProvider>
      <main className="flex">
        <LeftSideBar />
        <MainContainer>{children}</MainContainer>
        <RightSideBar />
      </main>
      <BottomBar />
    </ClerkProvider>
  )
}
