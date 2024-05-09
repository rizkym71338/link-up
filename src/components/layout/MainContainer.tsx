'use client'

import { ReactNode } from 'react'

import { TopBar } from '@/components'
import { usePathname } from 'next/navigation'
import { pageTitles } from '@/constants'

interface MainContainerProps {
  children: ReactNode
}

export const MainContainer = ({ children }: MainContainerProps) => {
  const pathname = usePathname()
  const firstPathname = '/' + pathname.split('/')[1]

  const page = pageTitles.find((page) => page.url === firstPathname)

  return (
    <section className="mx-auto flex max-w-3xl flex-1 flex-col px-4 md:px-10 lg:px-4 xl:px-20">
      <TopBar />
      <div className="mb-20 mt-6">
        <h1 className="mb-5 text-heading2-bold max-sm:text-heading3-bold">
          {page?.title}
        </h1>
        {children}
      </div>
    </section>
  )
}
