'use client'

import Link from 'next/link'
import { Menu, MenuButton, MenuItem } from '@headlessui/react'
import { MenuItems, Transition } from '@headlessui/react'

import { nullSafe } from '@/libs'

interface DropdownMenuProps {
  button: JSX.Element
  items: {
    label: string
    asLink?: boolean
    href?: string
    onClick?: () => void
  }[]
}

export const DropdownMenu = ({ button, items }: DropdownMenuProps) => {
  return (
    <Menu>
      <MenuButton>{button}</MenuButton>
      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom end"
          className="w-32 origin-top-right divide-y divide-dark-2 rounded border border-dark-2 bg-purple-2 p-0 text-sm focus:outline-none"
        >
          {items.map(({ label, asLink, href, onClick }, index) => {
            return (
              <MenuItem key={index}>
                {asLink ? (
                  <Link
                    href={nullSafe(href)}
                    className="block w-full px-3 py-1.5 text-start hover:bg-dark-2"
                  >
                    {label}
                  </Link>
                ) : (
                  <button
                    className="w-full px-3 py-1.5 text-start hover:bg-dark-2"
                    onClick={onClick}
                  >
                    {label}
                  </button>
                )}
              </MenuItem>
            )
          })}
        </MenuItems>
      </Transition>
    </Menu>
  )
}
