'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/libs'

export const likeOrUnLikePost = async (postId: string) => {
  const user = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  if (!user) return

  const likedPost = await prisma.likedPost.findFirst({
    where: { postId, userId: user.id },
  })

  if (likedPost) {
    await prisma.likedPost.delete({ where: { id: likedPost.id } })

    const notification = await prisma.notification.findFirst({
      where: { type: 'likePost', authorId: user.id, postId },
    })
    if (notification)
      await prisma.notification.delete({ where: { id: notification.id } })
  } else {
    await prisma.likedPost.create({ data: { postId, userId: user?.id } })

    const post = await prisma.post.findFirst({ where: { id: postId } })

    await prisma.notification.create({
      data: {
        type: 'likePost',
        authorId: user.id,
        recipientId: post?.authorId,
        postId,
        message: 'liked your post',
        isRead: false,
      },
    })
  }

  revalidatePath('')
}
