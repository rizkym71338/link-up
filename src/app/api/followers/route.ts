import { NextRequest } from 'next/server'

import { prisma } from '@/libs'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const size = Number(searchParams.get('size')) || 15
  const offset = Number(searchParams.get('offset')) || 0
  const id = searchParams.get('id')

  const users = await prisma.user.findMany({
    where: { followingIds: { has: id } },
    orderBy: { createdAt: 'desc' },
    take: size,
    skip: offset,
  })

  return Response.json(users)
}
