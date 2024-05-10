import { redirect } from 'next/navigation'

import { ImageInput, SubmitButton, TextInput, Textarea } from '@/components'
import { nullSafe, prisma } from '@/libs'

interface EditPostPageProps {
  params: { id: string }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const post = await prisma.post.findFirst({
    where: { id: params.id },
  })

  const handlePublish = async (formData: FormData) => {
    'use server'

    await prisma.post.update({
      where: { id: post?.id },
      data: {
        postPhoto: formData.get('photo') as string,
        caption: formData.get('caption') as string,
        tag: formData.get('tag') as string,
      },
    })

    redirect('/')
  }

  return (
    <form action={handlePublish}>
      <ImageInput name="photo" defaultValue={nullSafe(post?.postPhoto)} />
      <Textarea
        name="caption"
        label="Caption"
        placeholder="What's is on your mind?"
        defaultValue={nullSafe(post?.caption)}
        required
      />
      <TextInput
        name="tag"
        label="Tag"
        placeholder="#Tag"
        defaultValue={nullSafe(post?.tag)}
        required
      />
      <SubmitButton />
    </form>
  )
}
