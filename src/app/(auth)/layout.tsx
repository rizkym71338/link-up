import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Auth | LinkUp',
}

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <ClerkProvider>
      <main className="container flex min-h-screen items-center justify-center py-20">
        {children}
      </main>
    </ClerkProvider>
  )
}
