'use client'

import { ReactNode } from 'react'

import { TopBar } from '@/components'

interface MainContainerProps {
  children: ReactNode
}

export const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div className="w-full">
      <TopBar />
      <div className="mx-auto w-full max-w-xl pb-[53px] md:px-4 md:pb-0">
        {children}
      </div>
    </div>
  )
}
