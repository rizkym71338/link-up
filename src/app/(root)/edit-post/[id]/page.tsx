import { ImageInput, SubmitButton, TextInput, Textarea } from '@/components'
import { nullSafe, prisma } from '@/libs'
import { editPost } from '@/actions'

interface EditPostPageProps {
  params: { id: string }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const post = await prisma.post.findFirst({
    where: { id: params.id },
  })

  return (
    <form action={editPost.bind(null, nullSafe(post?.id))}>
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
