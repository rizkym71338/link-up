import { cn } from '@/libs'

interface LoaderProps {
  className?: string
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div
      className={cn(
        'aspect-square animate-spin rounded-full border-t-4 border-solid border-purple-1',
        className,
      )}
    />
  )
}
