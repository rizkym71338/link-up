'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 rounded-lg bg-purple-1 py-2.5 transition-all hover:bg-pink-1"
    >
      {pending ? 'Loading...' : 'Submit'}
    </button>
  )
}
