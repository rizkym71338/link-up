import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { LeftSideBar, RightSideBar } from '@/components'
import { BottomBar, MainContainer } from '@/components'
import { cn, prisma } from '@/libs'
import '../globals.css'
import { Post, User } from '@prisma/client'

export const metadata: Metadata = {
  title: 'Vibe Zone',
  description: 'Next 14 Social Media App',
}

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const user = (await prisma.user.findFirst({
    where: { clerkId: userId },
  })) as User & { posts: Post[] }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(inter.className, 'bg-purple-2 text-light-1')}>
          <main className="flex">
            <LeftSideBar user={user} />
            <MainContainer>{children}</MainContainer>
            <RightSideBar />
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  )
}
