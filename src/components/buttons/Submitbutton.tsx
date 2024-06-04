'use client'

import { useFormStatus } from 'react-dom'

import { Loader } from '@/components'
import { cn } from '@/libs'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        'bg-brand my-4 flex w-full items-center justify-center rounded-md px-3 py-2 text-gray-50 transition-all',
        pending && 'cursor-not-allowed opacity-50',
      )}
    >
      <p>{pending ? 'Processing' : 'Submit'}</p>
      {pending && <Loader className="ml-3 h-5 border-gray-50" />}
    </button>
  )
}
