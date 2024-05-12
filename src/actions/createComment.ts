'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/libs'

export const createComment = async (postId: string, message: string) => {
  const user = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  await prisma.comment.create({
    data: {
      authorId: user?.id,
      postId,
      message,
    },
  })

  revalidatePath('')
}
