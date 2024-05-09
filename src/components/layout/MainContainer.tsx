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
    <section className="mx-auto flex flex-1 flex-col">
      <TopBar />
      <div className="mx-auto flex w-full max-w-lg flex-col gap-6 p-6 pb-20">
        <h1 className="text-heading2-bold">{page?.title}</h1>
        {children}
      </div>
    </section>
  )
}
