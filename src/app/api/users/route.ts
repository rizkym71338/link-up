import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'

import { prisma } from '@/libs'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const size = Number(searchParams.get('size')) || 15
  const offset = Number(searchParams.get('offset')) || 0
  const withSelf = searchParams.get('withSelf') == 'true'

  let where: Prisma.UserWhereInput = {}
  if (withSelf) where.clerkId = auth().userId

  const users = await prisma.user.findMany({
    where,
    include: { posts: true },
    orderBy: { createdAt: 'desc' },
    take: size,
    skip: offset,
  })

  return Response.json(users)
}
