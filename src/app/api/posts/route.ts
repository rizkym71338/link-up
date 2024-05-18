import { NextRequest } from 'next/server'
import { Prisma } from '@prisma/client'

import { prisma } from '@/libs'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const size = Number(searchParams.get('size')) || 10
  const offset = Number(searchParams.get('offset')) || 0
  const authorId = searchParams.get('authorId')
  const savedUserId = searchParams.get('savedUserId')
  const likedUserId = searchParams.get('likedUserId')

  let where: Prisma.PostWhereInput = {}
  if (authorId) where.authorId = authorId
  if (savedUserId) where.saves = { some: { userId: savedUserId } }
  if (likedUserId) where.likes = { some: { userId: likedUserId } }

  const posts = await prisma.post.findMany({
    where,
    include: { author: true, likes: true, saves: true, comments: true },
    orderBy: { createdAt: 'desc' },
    take: size,
    skip: offset,
  })

  return Response.json(posts)
}
