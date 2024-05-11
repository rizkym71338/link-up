'use client'

import { useFormStatus } from 'react-dom'
import { ReactNode } from 'react'

import { Loader } from '@/components'

interface IconSubmitButtonProps {
  children: ReactNode
  className?: string
}

export const IconSubmitButton = ({
  children,
  className = 'h-5',
}: IconSubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? <Loader className={className} /> : children}
    </button>
  )
}
