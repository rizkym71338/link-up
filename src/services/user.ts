import { auth } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'

import { prisma } from '@/libs'

export const findCurrentUser = async (props?: Prisma.UserFindFirstArgs) => {
  return await prisma.user.findFirst({
    ...props,
    include: { ...props?.include },
    where: { clerkId: auth().userId },
  })
}

export const findUser = async (props?: Prisma.UserFindFirstArgs) => {
  return await prisma.user.findFirst({
    ...props,
    include: { ...props?.include },
  })
}

export const findManyUser = async (props?: Prisma.UserFindManyArgs) => {
  return await prisma.user.findMany({
    ...props,
    include: { ...props?.include },
    orderBy: { createdAt: 'desc' },
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
