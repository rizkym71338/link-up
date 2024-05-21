'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { SubmitButton, TextInput, Textarea } from '@/components'
import { ImageInput, Loader } from '@/components'
import { editPost } from '@/actions'
import { getPost } from '@/services'
import { authStore } from '@/stores'

export default function EditPostPage() {
  const [data, setData] = useState({
    post: null as any,
    isLoading: true,
  })

  const params = useParams()
  const router = useRouter()

  const auth = authStore((state) => state.user)

  useEffect(() => {
    const fetch = async () => {
      const response = await getPost({ id: params.id as string })

      if (!response) return router.replace('/404')

      if (response.author?.id !== auth?.id) return router.replace('/404')

      setData({ post: response, isLoading: false })
    }

    fetch()
  }, [auth?.id, params.id, router])

  if (data.isLoading) return <Loader className="mx-auto my-4 h-8" />

  return (
    <form action={editPost.bind(null, data.post.id)} className="px-4 pt-4">
      <ImageInput name="photo" defaultValue={data.post.postPhoto || ''} />
      <Textarea
        name="caption"
        label="Caption"
        placeholder="What's is on your mind?"
        defaultValue={data.post.caption || ''}
        required
      />
      <TextInput
        name="tag"
        label="Tag"
        placeholder="#Tag"
        defaultValue={data.post.tag || ''}
        required
      />
      <SubmitButton />
    </form>
  )
}
