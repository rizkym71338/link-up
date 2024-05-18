import axios from 'axios'
import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/libs'

export const findCurrentUser = async () => {
  return await prisma.user.findFirst({
    where: { clerkId: auth().userId },
    include: { posts: true },
  })
}

export const findUserById = async (userId: string) => {
  return await prisma.user.findFirst({
    where: { id: userId },
    include: { posts: true },
  })
}

export const findManyUserWithoutCurrentUser = async () => {
  return await prisma.user.findMany({
    where: { clerkId: { not: auth().userId } },
    orderBy: { createdAt: 'desc' },
  })
}

interface SearchUserProps {
  query: string
  offset?: number
  size?: number
}

export const searchUser = async (props?: SearchUserProps) => {
  const response = await axios.get(`/api/search`, { params: props })

  return response.data
}

interface FollowUserProps {
  id: string
  offset?: number
  size?: number
}

export const getFollowers = async (props?: FollowUserProps) => {
  const response = await axios.get(`/api/followers`, { params: props })

  return response.data
}

export const getFollowings = async (props?: FollowUserProps) => {
  const response = await axios.get(`/api/followings`, { params: props })

  return response.data
}
