import { redirect } from 'next/navigation'

import { prisma } from '@/libs'

export const editPost = async (postId: string, formData: FormData) => {
  'use server'

  await prisma.post.update({
    where: { id: postId },
    data: {
      postPhoto: formData.get('photo') as string,
      caption: formData.get('caption') as string,
      tag: formData.get('tag') as string,
    },
  })

  redirect('/')
}
