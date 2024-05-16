import { NextRequest } from 'next/server'

import { prisma } from '@/libs'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const size = Number(searchParams.get('size')) || 5
  const offset = Number(searchParams.get('offset')) || 0

  const posts = await prisma.post.findMany({
    include: { author: true, likes: true, saves: true, comments: true },
    orderBy: { createdAt: 'desc' },
    take: size,
    skip: offset,
  })

  return Response.json(posts)
}
