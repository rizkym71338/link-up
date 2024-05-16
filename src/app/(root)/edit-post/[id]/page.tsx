import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { ImageInput, SubmitButton, TextInput, Textarea } from '@/components'
import { findPostById } from '@/services'
import { editPost } from '@/actions'

interface EditPostPageProps {
  params: { id: string }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const post = await findPostById(params.id)

  if (!post) return notFound()

  if (post.author?.clerkId !== auth().userId) return notFound()

  return (
    <form action={editPost.bind(null, post.id)} className="px-4 pt-4">
      <ImageInput name="photo" defaultValue={post.postPhoto || ''} />
      <Textarea
        name="caption"
        label="Caption"
        placeholder="What's is on your mind?"
        defaultValue={post.caption || ''}
        required
      />
      <TextInput
        name="tag"
        label="Tag"
        placeholder="#Tag"
        defaultValue={post.tag || ''}
        required
      />
      <SubmitButton />
    </form>
  )
}
