import Link from 'next/link'

import { cn } from '@/libs'

interface TabButtonProps {
  href: string
  label: string
  isActive?: boolean
}

export const TabButton = ({ href, label, isActive }: TabButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'w-full rounded-md px-3 py-2 text-center text-small-semibold',
        isActive ? 'bg-purple-1' : 'bg-dark-2',
      )}
    >
      {label}
    </Link>
  )
}
