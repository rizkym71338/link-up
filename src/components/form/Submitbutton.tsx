'use client'

import { useFormStatus } from 'react-dom'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

import { cn } from '@/libs'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        'my-6 flex w-full items-center justify-center rounded-lg bg-purple-1 px-3 py-2.5 transition-all hover:bg-pink-1',
        pending && 'cursor-not-allowed opacity-50',
      )}
    >
      <p>{pending ? 'Processing' : 'Submit'}</p>
      {pending && <ArrowPathIcon className="ml-2 h-5 w-5 animate-spin" />}
    </button>
  )
}
