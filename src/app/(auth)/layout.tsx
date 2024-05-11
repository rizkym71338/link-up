import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

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
        <body className={inter.className}>
          <main className="container flex min-h-screen items-center justify-center py-20">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
