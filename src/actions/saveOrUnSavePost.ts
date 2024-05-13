'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/libs'

export const saveOrUnSavePost = async (postId: string) => {
  const user = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  const savedPost = await prisma.savedPost.findFirst({
    where: { postId, userId: user?.id },
  })

  if (savedPost) {
    await prisma.savedPost.delete({ where: { id: savedPost.id } })
  } else {
    await prisma.savedPost.create({ data: { postId, userId: user?.id } })
  }

  revalidatePath('')
}
