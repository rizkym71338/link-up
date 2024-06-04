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
        'flex w-full items-center justify-center rounded-md px-3 py-2 text-center text-small-semibold',
        isActive ? 'bg-brand text-gray-50' : 'bg-gray-200',
      )}
    >
      {label}
    </Link>
  )
}
