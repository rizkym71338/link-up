import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

import { LeftSideBar, RightSideBar } from '@/components'
import { BottomBar, MainContainer } from '@/components'
import { cn } from '@/libs'
import '../globals.css'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Vibe Zone',
  description: 'Next 14 Social Media App',
}

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(inter.className, 'bg-purple-2 text-light-1')}>
          <main className="flex">
            <LeftSideBar />
            <MainContainer>{children}</MainContainer>
            <RightSideBar />
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  )
}
