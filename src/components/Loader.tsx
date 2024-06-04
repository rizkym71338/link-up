import { forwardRef } from 'react'
import { cn } from '@/libs'

interface LoaderProps {
  className?: string
}

const Loader = forwardRef<HTMLDivElement, LoaderProps>(({ className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'border-brand aspect-square animate-spin rounded-full border-t-4 border-solid',
        className,
      )}
    />
  )
})

Loader.displayName = 'Loader'

export { Loader }
