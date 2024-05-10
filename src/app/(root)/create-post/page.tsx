import { ImageInput, SubmitButton, TextInput, Textarea } from '@/components'
import { createPost } from '@/actions'

export default async function CreatePostPage() {
  return (
    <form action={createPost}>
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
