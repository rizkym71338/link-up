'use client'

import { ReactNode } from 'react'
import { Post, User } from '@prisma/client'

import { authStore } from '@/stores/auth'

interface AuthProviderProps {
  children: ReactNode
  currentUser: User & { posts: Post[] }
}

export const AuthProvider = ({ children, currentUser }: AuthProviderProps) => {
  const setUser = authStore((state) => state.setUser)

  setUser(currentUser)

  return children
}
