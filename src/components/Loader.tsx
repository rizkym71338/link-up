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
        'aspect-square animate-spin rounded-full border-t-4 border-solid border-purple-1',
        className,
      )}
    />
  )
})

Loader.displayName = 'Loader'

export { Loader }
