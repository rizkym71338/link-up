'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { TopBar } from '@/components'
import { pageTitles } from '@/constants'

interface MainContainerProps {
  children: ReactNode
}

export const MainContainer = ({ children }: MainContainerProps) => {
  const pathname = usePathname()
  const firstPathname = '/' + pathname.split('/')[1]

  const page = pageTitles.find((page) => page.url === firstPathname)

  return (
    <div className="w-full">
      <TopBar />
      <div className="mx-auto w-full max-w-xl p-4 pb-28">
        <h1 className="mb-4 text-heading3-bold">{page?.title}</h1>
        {children}
      </div>
    </div>
  )
}
