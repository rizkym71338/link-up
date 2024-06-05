'use client'

import { Fragment, ReactNode } from 'react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

interface ProgressBarProviderProps {
  children: ReactNode
}

export const ProgressBarProvider = ({ children }: ProgressBarProviderProps) => {
  return (
    <Fragment>
      {children}
      <ProgressBar
        height="4px"
        color="#007BFF"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </Fragment>
  )
}
