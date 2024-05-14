import { prisma } from '@/libs'

export const findManyPost = async () => {
  return await prisma.post.findMany({
    include: { author: true, likes: true, saves: true, comments: true },
    orderBy: { createdAt: 'desc' },
  })
}

export const findManyPostByAuthorId = async (authorId: string) => {
  return await prisma.post.findMany({
    where: { authorId },
    include: { author: true, likes: true, saves: true, comments: true },
    orderBy: { createdAt: 'desc' },
  })
}

export const findManyPostBySavedUserId = async (userId: string) => {
  return await prisma.post.findMany({
    where: { saves: { some: { userId } } },
    include: { author: true, likes: true, saves: true, comments: true },
    orderBy: { createdAt: 'desc' },
  })
}

export const findManyPostByLikedUserId = async (userId: string) => {
  return await prisma.post.findMany({
    where: { likes: { some: { userId } } },
    include: { author: true, likes: true, saves: true, comments: true },
    orderBy: { createdAt: 'desc' },
  })
}

export const findPostById = async (postId: string) => {
  return await prisma.post.findFirst({
    where: { id: postId },
    include: {
      likes: true,
      author: true,
      saves: true,
      comments: { include: { author: true } },
    },
  })
}
