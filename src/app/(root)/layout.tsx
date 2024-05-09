import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/libs'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Vibe Zone',
  description: 'Next 14 Social Media App',
}

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-purple-1')}>{children}</body>
    </html>
  )
}
