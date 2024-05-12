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
      <div className="mx-auto w-full max-w-xl py-4 pb-20 md:px-4">
        <h1 className="mb-4 px-4 text-heading3-bold md:px-0">{page?.title}</h1>
        {children}
      </div>
    </div>
  )
}
