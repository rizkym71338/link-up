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

export const searchUser = async (query: string) => {
  return prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: query, mode: 'insensitive' } },
        { firstName: { contains: query, mode: 'insensitive' } },
        { lastName: { contains: query, mode: 'insensitive' } },
      ],
      NOT: { clerkId: auth().userId },
    },
    orderBy: { createdAt: 'desc' },
  })
}
