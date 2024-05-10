import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { ImageInput, SubmitButton, TextInput, Textarea } from '@/components'
import { prisma } from '@/libs'

export default async function CreatePostPage() {
  const handlePublish = async (formData: FormData) => {
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

  return (
    <form action={handlePublish}>
      <ImageInput name="photo" />
      <Textarea
        name="caption"
        label="Caption"
        placeholder="What's is on your mind?"
        required
      />
      <TextInput name="tag" label="Tag" placeholder="#Tag" required />
      <SubmitButton />
    </form>
  )
}
