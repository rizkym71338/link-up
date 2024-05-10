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
        'my-4 flex w-full items-center justify-center rounded-lg bg-purple-1 px-3 py-2 transition-all hover:bg-pink-1',
        pending && 'cursor-not-allowed opacity-50',
      )}
    >
      <p>{pending ? 'Processing' : 'Submit'}</p>
      {pending && <Loader className="ml-3 h-5 border-light-1" />}
    </button>
  )
}
