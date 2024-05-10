import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/libs'

export const createPost = async (formData: FormData) => {
  'use server'

  const { userId } = auth()
  const user = await prisma.user.findFirst({ where: { clerkId: userId } })

  await prisma.post.create({
    data: {
      authorId: user?.id,
      postPhoto: formData.get('photo') as string,
      caption: formData.get('caption') as string,
      tag: formData.get('tag') as string,
    },
  })

  redirect('/')
}
