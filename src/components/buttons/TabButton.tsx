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
        'rounded-lg px-3 py-2 text-small-bold',
        isActive ? 'bg-purple-1' : 'bg-dark-2',
      )}
    >
      {label}
    </Link>
  )
}
