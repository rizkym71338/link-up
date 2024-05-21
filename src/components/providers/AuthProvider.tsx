'use client'

import { ReactNode } from 'react'
import { Post, User } from '@prisma/client'

import { Loader } from '@/components'
import { authStore } from '@/stores'

interface AuthProviderProps {
  children: ReactNode
  currentUser: User & { posts: Post[] }
}

export const AuthProvider = ({ children, currentUser }: AuthProviderProps) => {
  const setUser = authStore(({ setUser }) => setUser)

  setUser(currentUser)

  const user = authStore(({ user }) => user)

  if (!user) return <Loader className="mx-auto my-4 h-8" />

  return children
}
