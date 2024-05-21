import { Post, User } from '@prisma/client'
import { create } from 'zustand'

interface AuthStore {
  user?: User & { posts: Post[] }
  setUser: (user: User & { posts: Post[] }) => void
}

export const authStore = create<AuthStore>()((set) => ({
  user: undefined,
  setUser: (user) => set(() => ({ user })),
}))
