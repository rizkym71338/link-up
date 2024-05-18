import axios from 'axios'

import { prisma } from '@/libs'

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

export const findPostById = async (postId: string) => {
  return await prisma.post.findFirst({
    where: { id: postId },
    include: {
      likes: true,
      author: true,
      saves: true,
      comments: { include: { author: true } },
    },
  })
}
