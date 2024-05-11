import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ProgressBarProvider } from '@/components'
import { cn } from '@/libs'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Vibe Zone',
  description: 'Next 14 Social Media App',
}

const inter = Inter({ subsets: ['latin'] })

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-purple-2 text-light-1')}>
        <ProgressBarProvider>{children}</ProgressBarProvider>
      </body>
    </html>
  )
}
