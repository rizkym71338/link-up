import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { ImageInput, SubmitButton, TextInput, Textarea } from '@/components'
import { nullSafe, prisma } from '@/libs'
import { editPost } from '@/actions'

interface EditPostPageProps {
  params: { id: string }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const post = await prisma.post
    .findFirst({
      where: { id: params.id },
      include: { author: true },
    })
    .catch(() => notFound())

  if (!post) return notFound()

  if (post?.author?.clerkId !== auth().userId) return notFound()

  return (
    <form action={editPost.bind(null, nullSafe(post?.id))} className="px-4">
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
