import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { cn } from '@/libs'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Auth | Vibe Zone',
  description: 'Next 14 Social Media App',
}

const inter = Inter({ subsets: ['latin'] })

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            inter.className,
            'container flex min-h-screen items-center justify-center bg-purple-2 py-20',
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
