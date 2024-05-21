import axios from 'axios'

interface GetPostsProps {
  offset?: number
  size?: number
  authorId?: string
  likedUserId?: string
  savedUserId?: string
}

export const getPosts = async (props?: GetPostsProps) => {
  const response = await axios.get(`/api/posts`, { params: props })
  return response.data
}

interface GetPostProps {
  id: string
}

export const getPost = async ({ id }: GetPostProps) => {
  try {
    const response = await axios.get(`/api/posts/${id}`)
    return response.data
  } catch (error) {
    return null
  }
}
