'use server'

import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/libs'
import { revalidatePath } from 'next/cache'

export const likeOrUnLikePost = async (postId: string) => {
  const user = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  const likedPost = await prisma.likedPost.findFirst({
    where: { postId, userId: user?.id },
  })

  if (likedPost) {
    await prisma.likedPost.delete({ where: { id: likedPost.id } })
  } else {
    await prisma.likedPost.create({ data: { postId, userId: user?.id } })
  }

  revalidatePath('')
}
