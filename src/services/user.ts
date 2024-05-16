import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/libs'

export const findCurrentUser = async () => {
  return await prisma.user.findFirst({
    where: { clerkId: auth().userId },
    include: { posts: true },
  })
}

export const findUserById = async (userId: string) => {
  return await prisma.user.findFirst({
    where: { id: userId },
    include: { posts: true },
  })
}

export const findManyUserWithoutCurrentUser = async () => {
  return await prisma.user.findMany({
    where: { clerkId: { not: auth().userId } },
  })
}

export const findManyUserFollowingById = async (userId: string) => {
  return await prisma.user.findMany({
    where: { followersIds: { has: userId } },
  })
}

export const findManyUserFollowerById = async (userId: string) => {
  return await prisma.user.findMany({
    where: { followingIds: { has: userId } },
  })
}

export const searchUser = async (query: string, offset = 0) => {
  const response = await fetch(`/api/search?query=${query}&offset=${offset}`)

  return response.json()
}
