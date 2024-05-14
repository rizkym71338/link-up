import { Prisma } from '@prisma/client'

import { prisma } from '@/libs'

export const findManyPost = async (props?: Prisma.PostFindManyArgs) => {
  return await prisma.post.findMany({
    ...props,
    include: { ...props?.include },
    orderBy: { createdAt: 'desc' },
  })
}

export const findPost = async (props?: Prisma.PostFindFirstArgs) => {
  return await prisma.post.findFirst({
    ...props,
    include: {
      ...props?.include,
      comments: { include: { author: props?.include?.author } },
    },
  })
}
